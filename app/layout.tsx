import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import './globals.css';

export const metadata: Metadata = {
  title: 'Redy | Open source, warm and ready.',
  description: 'Redy 是 WeOpen 的开源生态维护者、代码园丁与分支探险家，用于统一官网、GitHub、README、CLI 与社区传播中的品牌表达。',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
