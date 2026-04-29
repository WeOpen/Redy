// Web App Manifest 描述安装入口、主题色和 PWA 图标族。
import type { MetadataRoute } from 'next';

/**
 * 生成 Redy 站点的安装元数据，供浏览器和移动设备读取。
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Redy | Open source, warm and ready.',
    short_name: 'Redy',
    description: 'Redy is the warm open-source guardian for the WeOpen ecosystem.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#F8F5F0',
    theme_color: '#C14B30',
    // 安装图标与 public 中的透明 favicon 家族保持一致。
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
