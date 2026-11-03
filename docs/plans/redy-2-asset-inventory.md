# Redy 2.0 — Active asset inventory

This inventory records the current image dependency graph before introducing new master artwork.

## Website image entry points

- `app/_content/home.ts` — centralized static image imports for home sections.
  - `brand/mascot/standard/redy-full-body.png` — standard character (corrected in this PR).
  - `brand/mascot/chibi/redy-chibi.png` — chibi character (corrected in this PR).
  - `brand/logo/redy-logo-lockup-transparent.png` — hero wordmark.
  - `brand/icons/redy-icon-primary.png` — brand icon.
  - `brand/scenes/github-header-weopen.png` — hero scene.
  - `brand/banners/{wemail,wegit,weopen}-readme-header.png` — project headers.
  - `brand/icons/{wemail,wegit,weopen}-icon-minimal.png` — separate project icons; **do not overwrite these with Redy's face**.
- `app/_components/sections/visual-system-section.tsx` — captions and image alt text.
- `app/layout.tsx` — favicon metadata.
- `app/icon.png` and `app/apple-icon.png` — Next.js file-convention icons.
- `public/favicons/favicon-{16,32,48,64,96,128,192,256,512}x*.png` — multi-size favicons.
- `public/android-chrome-{192,512}x*.png`, `public/apple-touch-icon.png` — platform icons.
- `README.md` — GitHub header and README banner references.

## Brand assets to regenerate

1. `brand/logo/`: primary and lockup PNG/SVG.
2. `brand/mascot/`: standard and chibi with consistent anatomy.
3. `brand/icons/redy-*`: light, dark, mono and transparent variants.
4. `brand/stickers/`: community and twelve-expression sets.
5. `brand/scenes/`, `brand/banners/`: Redy-facing collateral while preserving product-specific identities.
6. `brand/exports/`: generated distribution copies; match masters exactly.
7. `brand/motion/`, `brand/merch/`, `brand/posters/`: validate current art and replace any outdated Redy figure.

## Release verification

- Search all active imports and Markdown image references for old Redy paths.
- Verify referenced files exist, dimensions match metadata, and transparent variants have alpha.
- Verify small icons visually at 16, 32 and 64px, not only by resampling.
- Run the repository test, lint and build scripts and record results in the PR.
- Keep this PR in draft until actual artwork is committed and tested.

## Scope note

The first code commits correct image roles using existing 1.0 assets. **They do not constitute the Redy 2.0 artwork migration.**
