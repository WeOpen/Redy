import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import './globals.css';

export const metadata: Metadata = {
  title: 'Redy | Open source, warm and ready.',
  description: 'Redy 是 WeOpen 的开源守护者，一套兼具温度、秩序与技术感的品牌角色系统。',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
