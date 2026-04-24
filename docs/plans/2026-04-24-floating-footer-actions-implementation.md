# Floating Footer Actions Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the footer text links with a fixed bottom-right vertical action dock containing icon buttons for scroll-to-top and repository navigation.

**Architecture:** Keep the existing footer copy intact and remove only the inline text action row. Add a small fixed-position action group near the end of `HomePage`, render inline SVG icons for YAGNI, and style the dock in `app/globals.css` with responsive sizing plus focus/hover states.

**Tech Stack:** Next.js 16, React 19, TypeScript, CSS, Vitest, Testing Library

---

### Task 1: Add a failing regression test for the floating action dock

**Files:**
- Modify: `tests/home-page.test.tsx:108-116`
- Test: `tests/home-page.test.tsx`

**Step 1: Write the failing test**

Replace the old footer link assertion with a new test that verifies the fixed dock semantics:

```tsx
it('renders a floating action dock for scroll-to-top and repository navigation', () => {
  render(<HomePage />);

  expect(screen.getByRole('link', { name: /回到顶部/i })).toHaveAttribute('href', '#hero');
  expect(screen.getByRole('link', { name: /打开 github 仓库/i })).toHaveAttribute(
    'href',
    'https://github.com/WeOpen/Redy',
  );
});
```

Then add one DOM-level assertion in the same test:

```tsx
const dock = document.querySelector('.floating-actions');
expect(dock).not.toBeNull();
```

**Step 2: Run test to verify it fails**

Run: `npm test -- --run tests/home-page.test.tsx`
Expected: FAIL because `.floating-actions` does not exist and the old footer links do not have the new labels.

**Step 3: Write minimal implementation**

Do not implement yet. This task ends once the failure is confirmed.

**Step 4: Commit**

Do not commit yet. Commit after the implementation task passes.

### Task 2: Replace footer text actions with a floating icon dock

**Files:**
- Modify: `app/page.tsx:299-311`
- Modify: `app/globals.css:992-1030`
- Test: `tests/home-page.test.tsx`

**Step 1: Implement the minimal JSX change**

In `app/page.tsx`, replace the inline footer action block:

```tsx
<div className="footer__actions">
  <a href="#hero">回到顶部</a>
  <a href="https://github.com/WeOpen/Redy" target="_blank" rel="noreferrer">
    Explore the repository
  </a>
</div>
```

With two pieces:

1. Keep the footer with copy only.
2. Add a fixed floating dock after `</footer>` but before `</main>`:

```tsx
<div className="floating-actions" aria-label="快捷操作">
  <a className="floating-actions__button" href="#hero" aria-label="回到顶部">
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 5l-6 6 1.4 1.4 3.6-3.6V19h2V8.8l3.6 3.6L18 11z" />
    </svg>
  </a>
  <a
    className="floating-actions__button"
    href="https://github.com/WeOpen/Redy"
    target="_blank"
    rel="noreferrer"
    aria-label="打开 GitHub 仓库"
  >
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.59 2 12.25c0 4.53 2.87 8.38 6.84 9.74.5.1.68-.22.68-.49 0-.24-.01-1.05-.01-1.91-2.78.62-3.37-1.21-3.37-1.21-.46-1.19-1.11-1.51-1.11-1.51-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.35 1.12 2.92.86.09-.67.35-1.12.63-1.38-2.22-.26-4.55-1.14-4.55-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.72 0 0 .84-.28 2.75 1.05A9.3 9.3 0 0 1 12 6.96c.85 0 1.7.12 2.5.36 1.9-1.33 2.74-1.05 2.74-1.05.56 1.42.21 2.46.1 2.72.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.95.68 1.92 0 1.39-.01 2.5-.01 2.84 0 .27.18.6.69.49A10.25 10.25 0 0 0 22 12.25C22 6.59 17.52 2 12 2z" />
    </svg>
  </a>
</div>
```

**Step 2: Implement the minimal CSS**

In `app/globals.css`, remove the old `.footer__actions` block and add styles like:

```css
.floating-actions {
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 30;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.floating-actions__button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  border-radius: 18px;
  border: 1px solid rgba(139, 110, 84, 0.18);
  background: rgba(250, 249, 245, 0.82);
  box-shadow: 0 18px 40px rgba(83, 56, 33, 0.14);
  backdrop-filter: blur(16px);
  color: var(--text);
  transition: transform 160ms ease, border-color 160ms ease, background 160ms ease;
}

.floating-actions__button svg {
  width: 22px;
  height: 22px;
  fill: currentColor;
}

.floating-actions__button:hover,
.floating-actions__button:focus-visible {
  transform: translateY(-2px);
  border-color: rgba(193, 75, 48, 0.34);
  background: rgba(255, 252, 247, 0.94);
}

@media (max-width: 720px) {
  .floating-actions {
    right: 14px;
    bottom: 14px;
    gap: 8px;
  }

  .floating-actions__button {
    width: 46px;
    height: 46px;
    border-radius: 16px;
  }
}
```

Keep changes minimal and aligned with the existing visual language.

**Step 3: Run the focused test to verify it passes**

Run: `npm test -- --run tests/home-page.test.tsx`
Expected: PASS

**Step 4: Run full verification**

Run: `npm test && npm run build`
Expected: both commands PASS

**Step 5: Commit**

```bash
git add app/page.tsx app/globals.css tests/home-page.test.tsx
git commit -m "feat: add floating footer action dock"
```

### Task 3: Verify the floating dock in preview

**Files:**
- Verify: `app/page.tsx`
- Verify: `app/globals.css`

**Step 1: Reload preview**

Use preview tooling to reload the existing dev server page.
Expected: updated page loads successfully

**Step 2: Check text and structure**

Use the accessibility snapshot to confirm:
- footer copy still renders
- floating action dock links exist
- aria labels are present

**Step 3: Check visual placement**

Use screenshot verification to confirm:
- dock is fixed in the bottom-right corner
- dock is vertically stacked
- dock does not overlap the main CTA area in the hero section

**Step 4: Check for console errors**

Use console log inspection.
Expected: no new errors

**Step 5: Commit if needed**

If preview-driven tweaks were required, create a new commit instead of amending:

```bash
git add app/page.tsx app/globals.css tests/home-page.test.tsx
git commit -m "fix: refine floating footer action dock"
```
