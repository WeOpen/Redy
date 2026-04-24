# Image Generator Skill Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a project-local Claude skill that reads image generation API settings from `.env.local` and returns image URLs for prompt-based generation requests.

**Architecture:** Create a project skill directory with `SKILL.md` that delegates to a small local Node script. The script loads `.env.local`, validates `IMAGE_API_BASE_URL` and `IMAGE_API_KEY`, sends a POST request to `/v1/images/generations`, and prints a clean success or error response for Claude to use.

**Tech Stack:** Claude project skill, Node.js, built-in `fetch`, local `.env.local`, JSON API

---

### Task 1: Add a failing test for env loading and response parsing

**Files:**
- Create: `tests/image-generator.test.ts`
- Test: `tests/image-generator.test.ts`
- Modify: `package.json`

**Step 1: Write the failing test**

Create `tests/image-generator.test.ts` covering the future helper module. Test only the pure logic, not the remote API itself.

Use tests like:

```ts
import { describe, expect, it } from 'vitest';
import { extractImageUrls, parseEnvFile } from '@/scripts/image-generator';

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
});
```

**Step 2: Run test to verify it fails**

Run: `npm test -- --run tests/image-generator.test.ts`
Expected: FAIL because `@/scripts/image-generator` does not exist yet.

**Step 3: Write minimal implementation**

Do not implement yet. First confirm the test fails for the expected missing-module reason.

**Step 4: Commit**

Do not commit yet. Commit after implementation passes.

### Task 2: Implement the local image generator script

**Files:**
- Create: `scripts/image-generator.ts`
- Test: `tests/image-generator.test.ts`

**Step 1: Create the helper functions and CLI entrypoint**

Create `scripts/image-generator.ts` with:

1. A pure env parser:

```ts
export function parseEnvFile(text: string): Record<string, string> {
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'))
    .reduce<Record<string, string>>((acc, line) => {
      const index = line.indexOf('=');
      if (index === -1) return acc;
      const key = line.slice(0, index).trim();
      const value = line.slice(index + 1).trim();
      acc[key] = value;
      return acc;
    }, {});
}
```

2. A response parser:

```ts
export function extractImageUrls(payload: { data?: Array<{ b64_json?: string }> }): string[] {
  return (payload.data ?? [])
    .map((item) => item.b64_json)
    .filter((value): value is string => Boolean(value));
}
```

3. A small CLI flow that:
- reads `.env.local`
- validates `IMAGE_API_BASE_URL` and `IMAGE_API_KEY`
- reads a JSON argument from `process.argv[2]`
- sends `POST ${baseUrl}/v1/images/generations`
- prints JSON containing either `{ ok: true, urls: [...] }` or `{ ok: false, error: '...' }`

Use built-in `fetch`, `fs/promises`, and `path`. Keep implementation minimal.

**Step 2: Handle expected errors clearly**

Map these cases to readable messages:
- missing `.env.local`
- missing `IMAGE_API_BASE_URL`
- missing `IMAGE_API_KEY`
- `401` → `Image API authentication failed.`
- `429` → `Image API rate limit or queue timeout.`
- `503` → `Image API upstream account unavailable.`
- `504` → `Image API request timed out.`
- other non-2xx → include status code in the error message

**Step 3: Run focused tests to verify they pass**

Run: `npm test -- --run tests/image-generator.test.ts`
Expected: PASS

**Step 4: Commit**

```bash
git add scripts/image-generator.ts tests/image-generator.test.ts
git commit -m "feat: add image generator request script"
```

### Task 3: Add the project skill definition

**Files:**
- Create: `.claude/skills/image-generator/SKILL.md`
- Modify: `.gitignore`

**Step 1: Write the skill definition**

Create `.claude/skills/image-generator/SKILL.md` with frontmatter and concise instructions. The skill should:
- explain that it generates images via the configured API
- require `.env.local` with `IMAGE_API_BASE_URL` and `IMAGE_API_KEY`
- instruct Claude to call the local script with a JSON payload
- keep the first version focused on prompt-based generation only

Suggested structure:

```md
---
name: image-generator
description: Generate images from prompts using the project-local image API configuration.
---

Use this skill when the user asks to generate an image for this project.

Requirements:
- `.env.local` must define `IMAGE_API_BASE_URL` and `IMAGE_API_KEY`

Default behavior:
- Use prompt-based generation
- Default `model` to `gpt-5-3`
- Default `size` to `1024x1024`
- Default `timeout_sec` to `300`

Run:
`node --import tsx scripts/image-generator.ts '{"prompt":"...","size":"1024x1024","model":"gpt-5-3","timeout_sec":300}'`

Return:
- the generated image URLs on success
- a clear error message on failure
```

Do not reference unsupported image-to-image behavior yet.

**Step 2: Ignore local env secrets if not already ignored**

Update `.gitignore` to include:

```gitignore
.env.local
```

**Step 3: Verify the skill files exist**

Run: `git status --short .claude/skills/image-generator/SKILL.md .gitignore`
Expected: both files listed as modified/untracked

**Step 4: Commit**

```bash
git add .claude/skills/image-generator/SKILL.md .gitignore
git commit -m "feat: add project image generator skill"
```

### Task 4: Add runtime support for TypeScript script execution

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`

**Step 1: Add the minimal dependency**

Add `tsx` as a dev dependency so the TypeScript script can run directly:

```json
"devDependencies": {
  ...,
  "tsx": "^4.19.0"
}
```

**Step 2: Install dependencies**

Run: `npm install`
Expected: PASS and update `package-lock.json`

**Step 3: Verify existing tests still pass**

Run: `npm test`
Expected: PASS

**Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "build: add tsx for local skill scripts"
```

### Task 5: Add an env example and manual verification path

**Files:**
- Create: `.env.example`
- Verify: `.env.local` (local only, never commit)
- Verify: `scripts/image-generator.ts`
- Verify: `.claude/skills/image-generator/SKILL.md`

**Step 1: Add `.env.example`**

Create:

```dotenv
IMAGE_API_BASE_URL=
IMAGE_API_KEY=
```

**Step 2: Copy values locally into `.env.local`**

Create a local-only `.env.local` with the real base URL and API key. Do not add it to git.

**Step 3: Run a manual dry run for missing config handling**

Run with `.env.local` temporarily absent or incomplete only if safe in the current workspace, otherwise simulate with a controlled test input.
Expected: script returns a clear config error

**Step 4: Run a real request after local env is configured**

Run:

```bash
node --import tsx scripts/image-generator.ts '{"prompt":"一只温润极客风的红熊猫，在开源森林里观察分支，插画风","size":"1024x1024","model":"gpt-5-3","timeout_sec":300}'
```

Expected: JSON with `ok: true` and one or more image URLs

**Step 5: Commit**

```bash
git add .env.example scripts/image-generator.ts tests/image-generator.test.ts .claude/skills/image-generator/SKILL.md .gitignore package.json package-lock.json
git commit -m "feat: add local image generation skill"
```

### Task 6: Final verification

**Files:**
- Verify: `.claude/skills/image-generator/SKILL.md`
- Verify: `scripts/image-generator.ts`
- Verify: `tests/image-generator.test.ts`
- Verify: `.env.example`
- Verify: `.gitignore`
- Verify: `package.json`

**Step 1: Run full test suite**

Run: `npm test`
Expected: PASS

**Step 2: Run production build to confirm no regression**

Run: `npm run build`
Expected: PASS

**Step 3: Run the script with a valid local configuration**

Run the manual image generation command again.
Expected: returns image URL JSON

**Step 4: Review the diff**

Run: `git diff -- .claude/skills/image-generator/SKILL.md scripts/image-generator.ts tests/image-generator.test.ts .env.example .gitignore package.json package-lock.json`
Expected: only the intended skill, script, tests, env example, ignore rule, and runtime dependency changes

**Step 5: Final commit**

```bash
git add .claude/skills/image-generator/SKILL.md scripts/image-generator.ts tests/image-generator.test.ts .env.example .gitignore package.json package-lock.json
git commit -m "feat: add prompt-based image generation skill"
```
