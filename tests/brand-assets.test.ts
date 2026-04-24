import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();

function readPngDimensions(filePath: string) {
  const buffer = readFileSync(filePath);

  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
  };
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
    expect(checklist).toContain('- [x] T01 锁定 Redy 主 Logo 最终版');
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
    expect(checklist).toContain('- [x] T02 锁定 Redy 极简头像最终版');
  });

  it('ships the finalized T03 standard mascot and marks its checklist items complete', () => {
    const mascotPath = path.join(rootDir, 'brand/mascot/standard/redy-full-body.png');
    const mascotGuidePath = path.join(rootDir, 'brand/guidelines/redy-t03-standard-final.md');
    const checklistPath = path.join(rootDir, 'DeliveryChecklist.md');

    expect(readFileSync(mascotPath)).toBeTruthy();
    expect(readPngDimensions(mascotPath)).toEqual({ width: 800, height: 1000 });
    expect(readFileSync(mascotGuidePath, 'utf8')).toContain('T03 已锁定 Redy 标准立绘最终版');

    const checklist = readFileSync(checklistPath, 'utf8');
    expect(checklist).toContain('- [x] Redy 标准立绘');
    expect(checklist).toContain('- [x] `brand/mascot/standard/redy-full-body.png`');
    expect(checklist).toContain('- [x] 输出标准立绘');
    expect(checklist).toContain('- [x] 确认 Redy 标准立绘最终版');
    expect(checklist).toContain('- [x] T03 锁定 Redy 标准立绘最终版');
  });
});
