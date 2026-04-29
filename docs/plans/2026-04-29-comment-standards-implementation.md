# Chinese Comment Standards Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 更新项目中文注释规范，并为主要源码、测试和脚本补充受控高覆盖中文注释。

**Architecture:** 注释规范写入 `docs/project-standards.md`，源码注释遵循当前 App Router 分层：页面入口、内容层、布局层、区块层、测试和脚本分别说明职责。只添加解释职责、约束和关键逻辑的中文注释，不改变运行时代码结构。

**Tech Stack:** Next.js App Router, React, TypeScript, Vitest, Node.js scripts.

---

### Task 1: Add comment-standard regression test

**Files:**
- Modify: `tests/home-page.test.tsx`
- Modify: `docs/project-standards.md`

**Step 1: Write the failing test**

在 `tests/home-page.test.tsx` 中增加文档规范断言，读取 `docs/project-standards.md`，检查包含：

```ts
expect(projectStandards).toContain('文件注释');
expect(projectStandards).toContain('方法注释');
expect(projectStandards).toContain('行注释');
expect(projectStandards).toContain('中文注释');
```

**Step 2: Run test to verify it fails**

Run: `npx vitest run tests/home-page.test.tsx`
Expected: FAIL，因为当前规范还没有完整中文注释章节。

**Step 3: Update documentation minimally**

更新 `docs/project-standards.md` 的注释规范章节，加入文件注释、方法注释、行注释、中文注释和排除范围。

**Step 4: Run test to verify it passes**

Run: `npx vitest run tests/home-page.test.tsx`
Expected: PASS.

### Task 2: Add Chinese file comments to app layer

**Files:**
- Modify: `app/page.tsx`
- Modify: `app/layout.tsx`
- Modify: `app/not-found.tsx`
- Modify: `app/manifest.ts`
- Modify: `app/_content/home.ts`

**Step 1: Add file-level comments**

为每个文件顶部添加中文文件职责注释，说明：页面入口、根布局、404 页面、manifest、首页内容层。

**Step 2: Add targeted method comments**

为导出函数添加中文 JSDoc：`HomePage`、`RootLayout`、`manifest`、`NotFound`。

**Step 3: Verify app layer**

Run: `npx vitest run tests/home-page.test.tsx`
Expected: PASS.

### Task 3: Add Chinese comments to layout and motion components

**Files:**
- Modify: `app/_components/motion-effects.tsx`
- Modify: `app/_components/layout/topbar-nav.tsx`
- Modify: `app/_components/layout/floating-actions.tsx`

**Step 1: Add file and component comments**

添加中文文件头和导出组件 JSDoc。

**Step 2: Replace English comments**

把现有英文注释改成中文，尤其是 reduced-motion、入口动画、滚动激活阈值和进度条基线。

**Step 3: Verify behavior tests**

Run: `npx vitest run tests/home-page.test.tsx`
Expected: PASS.

### Task 4: Add Chinese comments to homepage section components

**Files:**
- Modify: `app/_components/sections/hero-section.tsx`
- Modify: `app/_components/sections/story-section.tsx`
- Modify: `app/_components/sections/traits-section.tsx`
- Modify: `app/_components/sections/visual-system-section.tsx`
- Modify: `app/_components/sections/use-cases-section.tsx`
- Modify: `app/_components/sections/voice-section.tsx`
- Modify: `app/_components/sections/site-footer.tsx`

**Step 1: Add section file comments**

说明每个区块组件承载的品牌内容和维护边界。

**Step 2: Add exported component JSDoc**

为每个默认导出组件添加中文 JSDoc。

**Step 3: Add minimal inline comments**

只在视觉钩子、映射数据或布局约束不明显的地方加短行注释。

**Step 4: Verify homepage tests**

Run: `npx vitest run tests/home-page.test.tsx`
Expected: PASS.

### Task 5: Add Chinese comments to tests and scripts

**Files:**
- Modify: `tests/setup.ts`
- Modify: `tests/home-page.test.tsx`
- Modify: `tests/brand-assets.test.ts`
- Modify: `tests/image-generator.test.ts`
- Modify: `scripts/image-generator.ts`
- Modify: `scripts/redy-welcome.ts`
- Modify: `next.config.ts`

**Step 1: Add file comments**

给测试、脚本和配置文件增加中文文件职责注释。

**Step 2: Add method/helper comments**

给测试 helper、脚本函数和关键配置加中文注释。

**Step 3: Preserve failing external baseline**

不修改 badge PNG 尺寸断言或品牌资产基线；本任务只处理注释规范和注释内容。

**Step 4: Verify targeted scope**

Run: `npx vitest run tests/home-page.test.tsx`
Expected: PASS.

Run: `npm run build`
Expected: PASS.

### Task 6: Final verification

**Files:**
- All touched files above

**Step 1: Search for remaining English task comments in touched source**

Use Grep for known English comments such as `Keep`, `Use`, `PNG dimensions`, `The word cloud` in touched files and convert remaining user-facing comments to Chinese where appropriate.

**Step 2: Run final targeted checks**

Run: `npx vitest run tests/home-page.test.tsx`
Expected: PASS.

Run: `npm run build`
Expected: PASS.

**Step 3: Report full-suite caveat**

If `npm test` is run, note the known existing `tests/brand-assets.test.ts` badge PNG dimension mismatch unless it has been fixed separately.
