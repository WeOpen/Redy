// CLI 欢迎脚本输出 Redy 项目启动时的品牌化状态文案。
import { fileURLToPath } from 'node:url';

// 欢迎文案保持逐行数组，便于测试和 CLI 输出共享同一份内容。
export const REDY_WELCOME_LINES = [
  '+-- Redy ------------------------+',
  '|      |  Redy is online.        |',
  '|   >_ |  Open source, warm.     |',
  '+--------------------------------+',
  '',
  '[WeOpen] Initializing environment...',
  '[Redy] Scanning branches...',
  '[Redy] Cherry-picking the best bits...',
  "[Redy] Ready. Let's build something open.",
];

/**
 * 拼接 Redy CLI 欢迎文案，供脚本入口和测试断言复用。
 */
export function renderRedyWelcome() {
  return REDY_WELCOME_LINES.join('\n');
}

/**
 * 判断当前文件是否由 CLI 直接运行，避免测试导入时打印欢迎语。
 */
function isCliEntrypoint(metaUrl: string, argvPath: string | undefined) {
  return Boolean(argvPath) && fileURLToPath(metaUrl) === argvPath;
}

if (isCliEntrypoint(import.meta.url, process.argv[1])) {
  console.log(renderRedyWelcome());
}
