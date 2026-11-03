// V2 素材的构建前验证：确认上传原图、预览与真正的矢量路径均存在。
import { readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const assetRoot = path.join(process.cwd(), 'brand/mascot/v2');

const source = 'source/redy-2-portrait-reference.png';
const vector = 'redy-2-portrait-bezier-v13.svg';
const vectorV14 = 'redy-2-portrait-bezier-v14.svg';
const rendered = 'previews/redy-2-svg-preview-v13.png';
const comparison = 'previews/redy-2-reference-v13-comparison.png';

describe('Redy 2.0 portrait assets', () => {
  it('contains each uploaded source, vector and QA image', () => {
    for (const relativePath of [source, vector, vectorV14, rendered, comparison]) {
      expect(statSync(path.join(assetRoot, relativePath)).size).toBeGreaterThan(100);
    }
  });

  it('stores valid PNG file signatures and image dimensions', () => {
    for (const relativePath of [source, rendered, comparison]) {
      const file = readFileSync(path.join(assetRoot, relativePath));
      expect(file.subarray(0, 8).toString('hex')).toBe('89504e470d0a1a0a');
      // PNG 的 IHDR 中宽度和高度是从第 16 字节开始的 32 位大端整数。
      expect(file.readUInt32BE(16)).toBeGreaterThan(0);
      expect(file.readUInt32BE(20)).toBeGreaterThan(0);
    }
  });

  it('keeps the V13 file editable rather than embedding a PNG', () => {
    const svg = readFileSync(path.join(assetRoot, vector), 'utf8');

    expect(svg).toMatch(/<svg\b/);
    expect(svg).toMatch(/<path\b/);
    expect(svg).toMatch(/<(linearGradient|radialGradient)\b/);
    expect(svg).toMatch(/<title\b/);
    expect(svg).toMatch(/<desc\b/);
    expect(svg).not.toMatch(/<image\b/i);
    expect(svg).not.toMatch(/data:image\//i);
    expect(svg).not.toMatch(/<script\b/i);
    expect(svg).not.toMatch(/<foreignObject\b/i);
  });
  
  it('keeps the V14 portrait as editable Bézier geometry without embedded raster', () => {
    const svg = readFileSync(path.join(assetRoot, vectorV14), 'utf8');

    expect(svg).toContain('viewBox="0 0 1248 1248"');
    expect(svg).toMatch(/<title\b/);
    expect(svg).toMatch(/<desc\b/);
    expect(svg).toContain('id="goggle-left"');
    expect(svg).toContain('id="goggle-right"');
    expect(svg).toContain('id="mouth-expressive"');
    expect(svg).toContain('<radialGradient');
    expect(svg).toMatch(/<path\b/);
    expect(svg).not.toMatch(/<image\b/i);
    expect(svg).not.toMatch(/data:image\//i);
  });

});
