// 图片生成脚本负责读取本地代理配置、规范化请求载荷并下载生成结果。
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

// 允许的模型和调试账号层级集中定义，供校验逻辑与类型推导共用。
const SUPPORTED_MODELS = ['gpt-5-3', 'gpt-5-4-thinking', 'gpt-5-4-thinkin'] as const;
const DEBUG_ACCOUNT_TIERS = ['free', 'plus'] as const;

type SupportedModel = (typeof SUPPORTED_MODELS)[number];
type DebugAccountTier = (typeof DEBUG_ACCOUNT_TIERS)[number];

type GenerationPayloadInput = {
  prompt?: unknown;
  model?: unknown;
  size?: unknown;
  image?: unknown;
  timeout_sec?: unknown;
  debug_chatgpt_token?: unknown;
  debug_account_tier?: unknown;
};

type GenerationPayload = {
  prompt: string;
  model: SupportedModel;
  size: string;
  timeout_sec: number;
  image?: string[];
  debug_chatgpt_token?: string;
  debug_account_tier?: DebugAccountTier;
};

/**
 * 解析 .env.local 文本，保留脚本需要的键值对并忽略空行与注释。
 */
export function parseEnvFile(text: string): Record<string, string> {
  const env: Record<string, string> = {};

  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim();

    if (!line || line.startsWith('#')) {
      continue;
    }

    const separatorIndex = line.indexOf('=');

    if (separatorIndex === -1) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim();

    if (!key) {
      continue;
    }

    env[key] = value;
  }

  return env;
}

/**
 * 从图片接口响应中提取可下载地址，过滤缺失或空字符串结果。
 */
export function extractImageUrls(payload: { data?: Array<{ b64_json?: string }> }): string[] {
  return (payload.data ?? []).flatMap((item) => {
    const value = item.b64_json;
    return typeof value === 'string' && value ? [value] : [];
  });
}

/**
 * 判断当前模块是否由命令行直接执行，避免测试导入时触发主流程。
 */
export function isCliEntrypoint(moduleUrl: string, argv1?: string): boolean {
  if (!argv1) {
    return false;
  }

  return moduleUrl === pathToFileURL(argv1).href;
}

/**
 * 将 .env.local 读取异常转换为稳定错误文案，便于 CLI 和测试断言复用。
 */
export function toEnvReadErrorMessage(error: unknown): string {
  if (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    error.code === 'ENOENT'
  ) {
    return 'Missing .env.local file.';
  }

  if (error instanceof Error && error.message) {
    return `Failed to read .env.local: ${error.message}`;
  }

  return 'Failed to read .env.local.';
}

/**
 * 生成本地图片保存路径，并沿用接口返回文件名保持来源可追溯。
 */
export function buildImageOutputPath(imageUrl: string, cwd: string): string {
  const parsedUrl = new URL(imageUrl);
  const fileName = path.basename(parsedUrl.pathname) || `generated-${Date.now()}.png`;
  return path.join(cwd, 'image', fileName);
}

/**
 * 规范化图片生成参数，在系统边界处拦截缺失值和不支持的选项。
 */
export function normalizeGenerationPayload(input: GenerationPayloadInput): GenerationPayload {
  const prompt = typeof input.prompt === 'string' ? input.prompt.trim() : '';

  if (!prompt) {
    throw new Error('Missing prompt.');
  }

  const model = (input.model ?? 'gpt-5-4-thinking') as SupportedModel;

  if (!SUPPORTED_MODELS.includes(model)) {
    throw new Error('Unsupported model.');
  }

  const size = typeof input.size === 'string' ? input.size.trim() : '1024x1024';

  if (!/^[0-9]{2,5}x[0-9]{2,5}$/.test(size)) {
    throw new Error('Invalid size format.');
  }

  const timeoutValue = input.timeout_sec ?? 300;

  if (typeof timeoutValue !== 'number' || !Number.isInteger(timeoutValue) || timeoutValue < 10 || timeoutValue > 1800) {
    throw new Error('timeout_sec must be between 10 and 1800.');
  }

  const payload: GenerationPayload = {
    prompt,
    model,
    size,
    timeout_sec: timeoutValue,
  };

  if (input.image !== undefined) {
    if (!Array.isArray(input.image) || input.image.length === 0) {
      throw new Error('image must be a non-empty array of URLs when provided.');
    }

    const images = input.image.map((item) => (typeof item === 'string' ? item.trim() : ''));

    if (images.some((item) => !item)) {
      throw new Error('image must be a non-empty array of URLs when provided.');
    }

    payload.image = images;
  }

  if (input.debug_chatgpt_token !== undefined) {
    if (typeof input.debug_chatgpt_token !== 'string' || !input.debug_chatgpt_token.trim()) {
      throw new Error('debug_chatgpt_token must be a non-empty string.');
    }

    payload.debug_chatgpt_token = input.debug_chatgpt_token.trim();
  }

  if (input.debug_account_tier !== undefined) {
    if (
      typeof input.debug_account_tier !== 'string' ||
      !DEBUG_ACCOUNT_TIERS.includes(input.debug_account_tier as DebugAccountTier)
    ) {
      throw new Error('debug_account_tier must be free or plus.');
    }

    payload.debug_account_tier = input.debug_account_tier as DebugAccountTier;
  }

  return payload;
}

/**
 * 执行图片生成命令：读取配置、请求本地代理、下载图片并输出 JSON 结果。
 */
async function main(): Promise<void> {
  try {
    const envPath = path.resolve(process.cwd(), '.env.local');
    let envText: string;

    try {
      envText = await readFile(envPath, 'utf8');
    } catch (error) {
      throw new Error(toEnvReadErrorMessage(error));
    }

    const env = parseEnvFile(envText);
    const baseUrl = env.IMAGE_API_BASE_URL;
    const apiKey = env.IMAGE_API_KEY;

    if (!baseUrl) {
      throw new Error('Missing IMAGE_API_BASE_URL.');
    }

    if (!apiKey) {
      throw new Error('Missing IMAGE_API_KEY.');
    }

    const rawPayload = process.argv[2];

    if (!rawPayload) {
      throw new Error('Missing request payload.');
    }

    const payload = normalizeGenerationPayload(JSON.parse(rawPayload) as GenerationPayloadInput);
    // 脚本只访问仓库本地配置的图片代理，不直接绑定具体模型服务商。
    const response = await fetch(`${baseUrl}/v1/images/generations`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Image API authentication failed.');
      }

      if (response.status === 429) {
        throw new Error('Image API rate limit or queue timeout.');
      }

      if (response.status === 503) {
        throw new Error('Image API upstream account unavailable.');
      }

      if (response.status === 504) {
        throw new Error('Image API request timed out.');
      }

      throw new Error(`Image API request failed with status ${response.status}.`);
    }

    const result = await response.json() as { data?: Array<{ b64_json?: string }> };
    const urls = extractImageUrls(result);
    const cwd = process.cwd();
    const imageDir = path.join(cwd, 'image');
    const saved: string[] = [];

    if (urls.length > 0) {
      await mkdir(imageDir, { recursive: true });
    }

    for (const imageUrl of urls) {
      const outputPath = buildImageOutputPath(imageUrl, cwd);
      const imageResponse = await fetch(imageUrl);

      if (!imageResponse.ok) {
        throw new Error(`Failed to download generated image with status ${imageResponse.status}.`);
      }

      const buffer = Buffer.from(await imageResponse.arrayBuffer());
      await writeFile(outputPath, buffer);
      saved.push(outputPath);
    }

    process.stdout.write(`${JSON.stringify({ ok: true, urls, files: saved })}\n`);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error.';
    process.stdout.write(`${JSON.stringify({ ok: false, error: message })}\n`);
  }
}

if (isCliEntrypoint(import.meta.url, process.argv[1])) {
  void main();
}
