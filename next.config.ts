// Next.js 配置根据部署环境切换 GitHub Pages 静态导出路径。
import type { NextConfig } from 'next';

const repo = 'Redy';
// GitHub Actions 构建产物会发布到 /Redy，本地开发保持根路径。
const isGithubActions = process.env.GITHUB_ACTIONS === 'true';

const nextConfig: NextConfig = {
  output: isGithubActions ? 'export' : undefined,
  basePath: isGithubActions ? `/${repo}` : '',
  assetPrefix: isGithubActions ? `/${repo}/` : undefined,
  images: {
    // 静态导出无法使用 Next 图片优化服务，因此保留原始图片路径。
    unoptimized: true,
  },
};

export default nextConfig;
