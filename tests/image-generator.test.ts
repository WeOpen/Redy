import { describe, expect, it } from 'vitest';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import {
  buildImageOutputPath,
  extractImageUrls,
  isCliEntrypoint,
  normalizeGenerationPayload,
  parseEnvFile,
  toEnvReadErrorMessage,
} from '@/scripts/image-generator';

describe('image generator helpers', () => {
  it('parses IMAGE_API_BASE_URL and IMAGE_API_KEY from env text', () => {
    const env = parseEnvFile('IMAGE_API_BASE_URL=https://api.example.com\nIMAGE_API_KEY=secret\n');

    expect(env.IMAGE_API_BASE_URL).toBe('https://api.example.com');
    expect(env.IMAGE_API_KEY).toBe('secret');
  });

  it('extracts image URLs from b64_json fields', () => {
    const urls = extractImageUrls({
      data: [
        { b64_json: 'https://img.example.com/1.png' },
        { b64_json: 'https://img.example.com/2.png' },
      ],
    });

    expect(urls).toEqual([
      'https://img.example.com/1.png',
      'https://img.example.com/2.png',
    ]);
  });

  it('detects CLI entrypoint using file URLs', () => {
    const scriptPath = 'C:/repo/scripts/image-generator.ts';

    expect(isCliEntrypoint(pathToFileURL(scriptPath).href, scriptPath)).toBe(true);
    expect(isCliEntrypoint('file:///other.ts', scriptPath)).toBe(false);
    expect(isCliEntrypoint(pathToFileURL(scriptPath).href, undefined)).toBe(false);
  });

  it('maps env read errors without hiding non-missing failures', () => {
    expect(toEnvReadErrorMessage({ code: 'ENOENT' })).toBe('Missing .env.local file.');
    expect(toEnvReadErrorMessage(new Error('EACCES: permission denied'))).toBe(
      'Failed to read .env.local: EACCES: permission denied',
    );
  });

  it('builds a local image output path inside the image directory', () => {
    const outputPath = buildImageOutputPath(
      'http://154.36.152.121:9000/local/chatgpt/images/image-edit-abc.png',
      'D:/repo',
    );

    expect(outputPath).toBe(path.join('D:/repo', 'image', 'image-edit-abc.png'));
  });

  it('normalizes all documented optional generation parameters', () => {
    expect(
      normalizeGenerationPayload({
        prompt: 'red panda',
        model: 'gpt-5-4-thinking',
        size: '864x1536',
        image: ['https://img.example.com/ref-1.png', 'https://img.example.com/ref-2.png'],
        timeout_sec: 600,
        debug_chatgpt_token: 'debug-token',
        debug_account_tier: 'plus',
      }),
    ).toEqual({
      prompt: 'red panda',
      model: 'gpt-5-4-thinking',
      size: '864x1536',
      image: ['https://img.example.com/ref-1.png', 'https://img.example.com/ref-2.png'],
      timeout_sec: 600,
      debug_chatgpt_token: 'debug-token',
      debug_account_tier: 'plus',
    });
  });

  it('applies documented defaults when optional parameters are omitted', () => {
    expect(normalizeGenerationPayload({ prompt: 'red panda' })).toEqual({
      prompt: 'red panda',
      model: 'gpt-5-4-thinking',
      size: '1024x1024',
      timeout_sec: 300,
    });
  });

  it('rejects invalid prompt, model, size, timeout, image lists, and debug_account_tier', () => {
    expect(() => normalizeGenerationPayload({ prompt: '   ' })).toThrow('Missing prompt.');
    expect(() => normalizeGenerationPayload({ prompt: 'red panda', model: 'gpt-4o' })).toThrow(
      'Unsupported model.',
    );
    expect(() => normalizeGenerationPayload({ prompt: 'red panda', size: 'wide' })).toThrow(
      'Invalid size format.',
    );
    expect(() => normalizeGenerationPayload({ prompt: 'red panda', timeout_sec: 5 })).toThrow(
      'timeout_sec must be between 10 and 1800.',
    );
    expect(() => normalizeGenerationPayload({ prompt: 'red panda', image: [] })).toThrow(
      'image must be a non-empty array of URLs when provided.',
    );
    expect(
      () => normalizeGenerationPayload({ prompt: 'red panda', debug_account_tier: 'team' }),
    ).toThrow('debug_account_tier must be free or plus.');
  });
});
