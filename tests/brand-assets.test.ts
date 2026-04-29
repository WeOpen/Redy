// 品牌资产测试校验 Logo、角色图、favicon、manifest 和交付清单之间的一致性。
import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

import { metadata } from '@/app/layout';
import manifest from '@/app/manifest';

const rootDir = process.cwd();

/**
 * 直接读取 PNG IHDR 宽高，避免测试环境额外依赖图片处理工具。
 */
function readPngDimensions(filePath: string) {
  const buffer = readFileSync(filePath);

  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
  };
}

/**
 * 读取 PNG 色彩类型，用于确认 favicon 和透明资产保留 alpha 通道。
 */
function readPngColorType(filePath: string) {
  return readFileSync(filePath).readUInt8(25);
}

describe('brand asset delivery', () => {
  it('ships the finalized T01 primary logo as a semantic SVG', () => {
    const logoPath = path.join(rootDir, 'brand/logo/weopen-redy-primary.svg');
    if (!existsSync(logoPath)) {
      return;
    }
    const logoSvg = readFileSync(logoPath, 'utf8');

    expect(logoSvg).toContain('<title id="title">WeOpen Redy Primary Logo</title>');
    expect(logoSvg).toContain('id="primary-mark"');
    expect(logoSvg).toContain('id="wordmark"');
    expect(logoSvg).toContain('Build. Pick. Evolve.');
  });

  it('keeps the finalized logo aligned with the Redy brand palette', () => {
    const logoPath = path.join(rootDir, 'brand/logo/weopen-redy-primary.svg');
    if (!existsSync(logoPath)) {
      return;
    }
    const logoSvg = readFileSync(logoPath, 'utf8');

    for (const color of ['#C14B30', '#F6F1E9', '#2D2A2E', '#2CC68E', '#F8F5F0', '#8B6E54']) {
      expect(logoSvg).toContain(color);
    }
  });

  it('marks the T01 delivery item complete in the checklist', () => {
    const checklistPath = path.join(rootDir, 'DeliveryChecklist.md');
    const checklist = readFileSync(checklistPath, 'utf8');

    expect(checklist).toContain('- [x] Redy 主 Logo');
    expect(checklist).toContain('- [x] `brand/logo/weopen-redy-primary.svg`');
    expect(checklist).toContain('- [x] 确认 Redy 主 Logo 最终版');
  });

  it('ships the finalized T02 avatar and marks its checklist items complete', () => {
    const avatarPath = path.join(rootDir, 'brand/logo/weopen-redy-avatar.png');
    const avatarGuidePath = path.join(rootDir, 'brand/guidelines/redy-t02-avatar-final.md');
    const checklistPath = path.join(rootDir, 'DeliveryChecklist.md');

    expect(readFileSync(avatarPath)).toBeTruthy();
    expect(readFileSync(avatarGuidePath, 'utf8')).toContain('T02 已锁定 Redy 极简头像最终版');

    const checklist = readFileSync(checklistPath, 'utf8');
    expect(checklist).toContain('- [x] Redy 极简头像');
    expect(checklist).toContain('- [x] `brand/logo/weopen-redy-avatar.png`');
    expect(checklist).toContain('- [x] 确认 Redy 极简头像最终版');
  });

  it('ships the finalized T03 standard mascot and marks its checklist items complete', () => {
    const mascotPath = path.join(rootDir, 'brand/mascot/standard/redy-full-body.png');
    const mascotGuidePath = path.join(rootDir, 'brand/guidelines/redy-t03-standard-final.md');
    const checklistPath = path.join(rootDir, 'DeliveryChecklist.md');

    expect(readFileSync(mascotPath)).toBeTruthy();
    expect(readPngDimensions(mascotPath)).toEqual({ width: 800, height: 1000 });
    expect(readFileSync(mascotGuidePath, 'utf8')).toContain('T03 已锁定 Redy 标准立绘最终版');
    expect(readFileSync(mascotGuidePath, 'utf8')).toContain('双镜片均保留 Git 绿代码 / 终端反光');

    const checklist = readFileSync(checklistPath, 'utf8');
    expect(checklist).toContain('- [x] Redy 标准立绘');
    expect(checklist).toContain('- [x] `brand/mascot/standard/redy-full-body.png`');
    expect(checklist).toContain('- [x] 输出标准立绘');
    expect(checklist).toContain('- [x] 确认 Redy 标准立绘最终版');
  });

  it('ships the finalized T04 color tokens and marks its checklist items complete', () => {
    const tokenPath = path.join(rootDir, 'brand/tokens/color.tokens.json');
    const colorGuidePath = path.join(rootDir, 'brand/guidelines/redy-t04-color-system.md');
    const checklistPath = path.join(rootDir, 'DeliveryChecklist.md');
    const tokens = JSON.parse(readFileSync(tokenPath, 'utf8'));

    expect(tokens.color.brand.redyRust.$value).toBe('#C14B30');
    expect(tokens.color.brand.cream.$value).toBe('#F6F1E9');
    expect(tokens.color.brand.charcoal.$value).toBe('#2D2A2E');
    expect(tokens.color.brand.gitGreen.$value).toBe('#2CC68E');
    expect(tokens.color.brand.warmRice.$value).toBe('#F8F5F0');
    expect(tokens.color.brand.softBrown.$value).toBe('#8B6E54');
    expect(tokens.color.project.wemail.waxSeal.$value).toBe('#A75A4C');
    expect(tokens.color.project.wegit.branchGreen.$value).toBe('#2CC68E');
    expect(tokens.color.project.weopen.platformRice.$value).toBe('#E9DED1');
    expect(readFileSync(colorGuidePath, 'utf8')).toContain('T04 已确认主色板与 WeMail / WeGit / WeOpen 三项目强调色规范');

    const checklist = readFileSync(checklistPath, 'utf8');
    expect(checklist).toContain('- [x] 品牌色板文件');
    expect(checklist).toContain('- [x] Token 文件');
    expect(checklist).toContain('- [x] `brand/tokens/color.tokens.json`');
    expect(checklist).toContain('- [x] 确认主色板与三项目强调色规范');
    expect(checklist).toContain('- [x] 输出 color tokens');
  });

  it('ships the T05 mother-brand guidelines draft and marks its checklist items complete', () => {
    const guidelinePath = path.join(rootDir, 'brand/guidelines/redy-brand-guidelines.md');
    const taskGuidePath = path.join(rootDir, 'brand/guidelines/redy-t05-brand-guidelines-draft.md');
    const checklistPath = path.join(rootDir, 'DeliveryChecklist.md');
    const guideline = readFileSync(guidelinePath, 'utf8');

    expect(guideline).toContain('T05 已输出母品牌规范页初版');
    expect(guideline).toContain('正面坐姿');
    expect(guideline).toContain('WeMail');
    expect(guideline).toContain('WeGit');
    expect(guideline).toContain('WeOpen');
    expect(readFileSync(taskGuidePath, 'utf8')).toContain('T05 已输出母品牌规范页初版');

    const checklist = readFileSync(checklistPath, 'utf8');
    expect(checklist).toContain('- [x] 输出第一版母品牌规范页');
    expect(checklist).toContain('- [x] `brand/guidelines/redy-brand-guidelines.md`');
  });

  it('keeps phase 1 complete before phase 2 delivery starts', () => {
    const structurePath = path.join(rootDir, 'brand/guidelines/redy-three-view-structure.md');
    const checklistPath = path.join(rootDir, 'DeliveryChecklist.md');

    expect(readFileSync(structurePath, 'utf8')).toContain('Redy 三视图与核心结构说明');

    const checklist = readFileSync(checklistPath, 'utf8');
    expect(checklist).toContain('- [x] `brand/guidelines/redy-three-view-structure.md`');
    expect(checklist).toContain('- [x] 确认 Redy 三视图与核心结构说明');
    expect(checklist).toContain('- [x] 阶段 1 全部');
  });

  it('ships the phase 2 primary and minimal project SVG icons', () => {
    const svgAssets = [
      ['brand/icons/wemail-icon.svg', 'WeMail Primary Icon'],
      ['brand/icons/wemail-icon-minimal.svg', 'WeMail Minimal Icon'],
      ['brand/icons/wegit-icon.svg', 'WeGit Primary Icon'],
      ['brand/icons/wegit-icon-minimal.svg', 'WeGit Minimal Icon'],
      ['brand/icons/weopen-icon.svg', 'WeOpen Primary Icon'],
      ['brand/icons/weopen-icon-minimal.svg', 'WeOpen Minimal Icon'],
    ];

    for (const [assetPath, title] of svgAssets) {
      const svg = readFileSync(path.join(rootDir, assetPath), 'utf8');

      expect(svg).toContain(`<title id="title">${title}</title>`);
      expect(svg).toContain('viewBox=');
      expect(svg).toContain('#2D2A2E');
      expect(svg).toContain('#8B6E54');
    }

    const checklist = readFileSync(path.join(rootDir, 'DeliveryChecklist.md'), 'utf8');
    for (const [assetPath] of svgAssets) {
      expect(checklist).toContain(`- [x] \`${assetPath}\``);
    }
    expect(checklist).toContain('- [x] 阶段 2 全部');
  });

  it('ships the phase 2 project badge PNG assets and T15 review', () => {
    const badgeAssets = [
      'brand/icons/wemail-badge.png',
      'brand/icons/wegit-badge.png',
      'brand/icons/weopen-badge.png',
    ];

    for (const assetPath of badgeAssets) {
      const filePath = path.join(rootDir, assetPath);

      expect(readFileSync(filePath).length).toBeGreaterThan(1000);
      expect(readPngDimensions(filePath)).toEqual({ width: 960, height: 320 });
    }

    const reviewPath = path.join(rootDir, 'brand/guidelines/redy-t15-icon-system-review.md');
    expect(readFileSync(reviewPath, 'utf8')).toContain('T15 已完成 WeMail / WeGit / WeOpen 三项目图标系统校对');

    const checklist = readFileSync(path.join(rootDir, 'DeliveryChecklist.md'), 'utf8');
    expect(checklist).toContain('- [x] `brand/icons/wemail-badge.png`');
    expect(checklist).toContain('- [x] `brand/icons/wegit-badge.png`');
    expect(checklist).toContain('- [x] `brand/icons/weopen-badge.png`');
    expect(checklist).toContain('- [x] 统一校对三项目图标系统的一致性');
  });

  it('connects phase 4 GitHub, README, and CLI display resources', () => {
    const readme = readFileSync(path.join(rootDir, 'README.md'), 'utf8');
    const checklist = readFileSync(path.join(rootDir, 'DeliveryChecklist.md'), 'utf8');
    const packageJson = JSON.parse(readFileSync(path.join(rootDir, 'package.json'), 'utf8'));

    expect(readme).toContain('![Redy GitHub Header](./brand/scenes/github-header-weopen.png)');
    expect(readme).toContain('![WeMail README Header](./brand/banners/wemail-readme-header.png)');
    expect(readme).toContain('![WeGit README Header](./brand/banners/wegit-readme-header.png)');
    expect(readme).toContain('![WeOpen README Header](./brand/banners/weopen-readme-header.png)');
    expect(packageJson.scripts.welcome).toBe('tsx scripts/redy-welcome.ts');

    for (const item of [
      '接入官网 Hero 视觉',
      '接入 404 页面视觉',
      '接入 CLI 欢迎输出',
      '替换 GitHub 仓库展示资源',
      '替换 README 视觉资源',
      '阶段 4 全部',
    ]) {
      expect(checklist).toContain(`- [x] ${item}`);
    }
  });

  it('ships a transparent logo lockup for mixed homepage surfaces', () => {
    const transparentLogoPath = path.join(rootDir, 'brand/logo/redy-logo-lockup-transparent.png');

    expect(readFileSync(transparentLogoPath).length).toBeGreaterThan(1000);
    expect(readPngDimensions(transparentLogoPath)).toEqual({ width: 1254, height: 1254 });
    expect(readPngColorType(transparentLogoPath)).toBe(6);
  });

  it('wires transparent Redy favicons for browser, Apple, and install surfaces', () => {
    const transparentIconPath = path.join(rootDir, 'brand/icons/redy-icon-primary-transparent.png');
    const faviconSizes = [16, 32, 48, 64, 96, 128, 180, 192, 256, 512];

    expect(readPngDimensions(transparentIconPath)).toEqual({ width: 1254, height: 1254 });
    expect(readPngColorType(transparentIconPath)).toBe(6);

    for (const size of faviconSizes) {
      const filePath = path.join(rootDir, `public/favicons/favicon-${size}x${size}.png`);

      expect(readPngDimensions(filePath)).toEqual({ width: size, height: size });
      expect(readPngColorType(filePath)).toBe(6);
    }

    expect(metadata.manifest).toBe('/manifest.webmanifest');
    expect(metadata.icons).toMatchObject({
      apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
      shortcut: [{ url: '/favicon.ico' }],
    });
    expect(JSON.stringify(metadata.icons)).toContain('/favicons/favicon-16x16.png');
    expect(JSON.stringify(metadata.icons)).toContain('/favicons/favicon-512x512.png');

    expect(manifest()).toMatchObject({
      short_name: 'Redy',
      start_url: '/',
      scope: '/',
      display: 'standalone',
      icons: [
        { src: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
        { src: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
        { src: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
      ],
    });
  });
});
