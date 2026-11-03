// Redy 2.0 的多尺度图标均为独立 SVG 源文件；小尺寸不得内嵌图片。
import { readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const root = path.join(process.cwd(), 'brand/icons/redy-2');

const variants = [
  { name: 'standard-v1.svg', viewBox: '0 0 512 512' },
  { name: 'micro-v1.svg', viewBox: '0 0 64 64' },
  { name: 'nano-v1.svg', viewBox: '0 0 32 32' },
];

describe('Redy 2.0 adaptive icon candidates', () => {
  it('ships three independent SVG masters with accessibility metadata', () => {
    for (const variant of variants) {
      const file = path.join(root, variant.name);
      expect(statSync(file).size).toBeGreaterThan(700);

      const svg = readFileSync(file, 'utf8');
      expect(svg).toContain(`viewBox="${variant.viewBox}"`);
      expect(svg).toMatch(/<title\b/);
      expect(svg).toMatch(/<desc\b/);
      expect(svg).toMatch(/<(path|ellipse)\b/);
      expect(svg).not.toMatch(/<image\b/i);
      expect(svg).not.toMatch(/data:image\//i);
      expect(svg).not.toMatch(/<script\b/i);
      expect(svg).not.toMatch(/<foreignObject\b/i);
      expect(svg).not.toMatch(/(?:https?:)?\/\/raw\.githubusercontent/i);
    }
  });

  it('preserves Redy recognition anchors in every scale variant', () => {
    for (const variant of variants) {
      const svg = readFileSync(path.join(root, variant.name), 'utf8');
      expect(svg).toMatch(/#[0-9a-fA-F]{6}/);
      expect(svg.toLowerCase()).toContain('goggle');
      expect(svg.toLowerCase()).toContain('cheek');
    }
  });

  it('documents non-destructive PNG exports and icon usage', () => {
    const doc = readFileSync(path.join(root, 'README.md'), 'utf8');
    const script = readFileSync(path.join(process.cwd(), 'scripts/export-redy-2-icons.py'), 'utf8');
    expect(doc).toContain('Status: **visual review required');
    expect(doc).toContain('nano-v1.svg');
    expect(doc).toContain('micro-v1.svg');
    expect(doc).toContain('standard-v1.svg');
    expect(script).toContain('16: "nano-v1.svg"');
    expect(script).toContain('32: "micro-v1.svg"');
    expect(script).toContain('512: "standard-v1.svg"');
  });
});
