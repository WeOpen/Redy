// 根布局集中维护全站 metadata、favicon 声明和 HTML 语言环境。
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import './globals.css';

export const metadata: Metadata = {
  applicationName: 'Redy',
  title: 'Redy | Open source, warm and ready.',
  description: 'Redy 是 WeOpen 的开源生态维护者、代码园丁与分支探险家，用于统一官网、GitHub、README、CLI 与社区传播中的品牌表达。',
  manifest: '/manifest.webmanifest',
  // 显式列出 favicon 尺寸，便于桌面浏览器选择清晰的大尺寸图标。
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicons/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicons/favicon-64x64.png', sizes: '64x64', type: 'image/png' },
      { url: '/favicons/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicons/favicon-128x128.png', sizes: '128x128', type: 'image/png' },
      { url: '/favicons/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicons/favicon-256x256.png', sizes: '256x256', type: 'image/png' },
      { url: '/favicons/favicon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    shortcut: [{ url: '/favicon.ico' }],
  },
};

/**
 * 输出 App Router 根布局，确保所有页面共享中文语言环境和全局样式。
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
