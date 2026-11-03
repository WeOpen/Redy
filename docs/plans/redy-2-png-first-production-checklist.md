# Redy 2.0 — PNG-first image production checklist

Updated: 2026-11-03
Branch: `feat/redy-2-brand-refresh`; PR #1 remains draft.

## Decision

**Image-first production. Pause further SVG reconstruction and do not overwrite active old images until the new coherent PNG image family passes review.** After the PNG family is reviewed, implement code/path replacement, produce platform raster derivatives and run tests. Keep all historic versions retrievable in Git.

Status legend: [ ] generate, [ ] review, [ ] integrate. A filename here is a planned production output, **not proof it exists**.

## A. Character canon — create first

- [ ] A01: canonical front-facing head portrait, cropped to full ears/tuft and scarf, white and transparent PNG, 2048×2048 preferred
- [ ] A02: full-body front-facing neutral standing mascot, transparent PNG
- [ ] A03: full-body 3/4 front facing mascot, transparent PNG
- [ ] A04: full-body true profile, transparent PNG
- [ ] A05: full-body 3/4 rear, transparent PNG
- [ ] A06: full-body rear, transparent PNG
- [ ] A07: chibi mascot, transparent PNG, matching all anchor details
- [ ] A08: orthographic side-by-side verification board; only after standalone poses are consistent
- [ ] A09: palette, proportions, goggles states and Git scarf usage sheet

**Existing targets:** `brand/mascot/standard/redy-full-body.png`, `brand/mascot/chibi/redy-chibi.png`, `brand/logo/weopen-redy-avatar.png`. Existing candidate portraits under `brand/mascot/v2/` stay reference material. `brand/tmp/` is history/reference, not the live source.

Acceptance: same tuft shape, ear placement, eye spacing, cheek patch, lens construction, scarf emblem, tail rings and proportions across views. Do not assume AI-generated orthographic views are structurally consistent.

## B. Identity assets — source images, then deterministic exports

- [ ] B01: clean primary avatar PNG, square, transparent
- [ ] B02: simplified 16–32px readable face PNG *specifically designed* for tiny sizes
- [ ] B03: medium-complexity face PNG for 48–96px
- [ ] B04: 128px+ app/avatar portrait PNG
- [ ] B05: logo mark only PNG
- [ ] B06: horizontal `Redy` lockup PNG, light and transparent backgrounds
- [ ] B07: vertical lockup PNG
- [ ] B08: white/dark/reverse-color variants plus mono/duotone for real-use contexts

**Existing brand targets:** `brand/logo/redy-logo-primary.png`, `redy-logo-lockup.png`, `redy-logo-lockup-transparent.png`, `weopen-redy-avatar.png`; `brand/icons/redy-icon-primary.png`, `redy-icon-primary-transparent.png`, `redy-icon-chibi.png`, `redy-icon-monochrome-brown.png`, `redy-icon-duotone-accent-red.png`, `redy-icon-duotone-brown-ring.png`, `redy-icon-reverse-dark-bg.png`.

**Platform exports (generate, not draw separately):** `app/icon.png`, `app/apple-icon.png`, `app/favicon.ico`, `public/favicon.ico`, `public/apple-touch-icon.png`, `public/android-chrome-192x192.png`, `public/android-chrome-512x512.png`, and `public/favicons/favicon-{16,32,48,64,96,128,180,192,256,512}x*.png`. Platform icon padding, manifest and references must be checked after integration.

## C. Twelve expressions — make once, preserve historic packs

- [ ] C01 happy / `happy`
- [ ] C02 focus / `focus`
- [ ] C03 surprised / `surprised`
- [ ] C04 thinking / `thinking`
- [ ] C05 shy / `shy`
- [ ] C06 angry / `angry`
- [ ] C07 tired / `tired`
- [ ] C08 sweating / `sweating`
- [ ] C09 cute / `cute`
- [ ] C10 clap / `clap`
- [ ] C11 go / `go`
- [ ] C12 good night / `good-night`
- [ ] C13 one expression-pack overview and C14 individual-sticker overview, generated from the **same** 12 final singles

**Targets:** `brand/stickers/expressions/redy-expression-{01..12}-*.png`, historic `expressions/v2/` and `expressions/v3/`, plus `redy-expression-pack-v1.png`, `redy-expression-singles-preview.png`, `expressions/v3/redy-expression-pack-v3-preview.png`.

Do not regenerate all 36 historical individual images: create 12 new current masters in a `v4/` directory and only migrate active references. Keep v1/v2/v3 for history.

## D. Eight community stickers

- [ ] D01 hello
- [ ] D02 good job
- [ ] D03 cherry-pick
- [ ] D04 merge done
- [ ] D05 hmm
- [ ] D06 404
- [ ] D07 coding
- [ ] D08 break
- [ ] D09 community sticker-pack overview
- [ ] D10 individual-stickers preview

**Targets:** `brand/stickers/redy-sticker-01-hello.png` to `redy-sticker-08-break.png`, `redy-community-sticker-pack-v1.png`, `redy-individual-stickers-preview.png`.

## E. Website & GitHub visuals

- [ ] E01 homepage GitHub/hero scene with new Redy and project nodes
- [ ] E02 dedicated 404 illustration (not a reused `brand/tmp/` sheet)
- [ ] E03 WeMail README banner (only Redy mother-brand artwork changes; preserve WeMail identity)
- [ ] E04 WeGit README banner (preserve WeGit identity)
- [ ] E05 WeOpen README banner (preserve WeOpen identity)
- [ ] E06 optional social/share preview image if a real metadata reference is added

**Targets:** `brand/scenes/github-header-weopen.png`, `brand/banners/{wemail,wegit,weopen}-readme-header.png`; homepage refs in `app/_content/home.ts` and `app/_components/sections/*`; 404 is `app/not-found.tsx`, currently importing `brand/tmp/redy-shape-d-chibi-sheet.png`. `README.md` references GitHub and README banners. Full website checks at desktop/mobile/light/dark.

## F. Promotional and merchandise

- [ ] F01 updated event poster, *new filename* `brand/posters/redy-event-poster-kv-v2.png`
- [ ] F02 updated merch sampling overview, *new filename* `brand/merch/redy-merch-sampling-board-v2.png`
- [ ] F03–F06 optional isolated T-shirt, tote, mug and sticker mockups for practical handoff

The old `brand/posters/redy-event-poster-kv-v1.png` is explicitly locked in its companion MD; do not overwrite it.

## G. Derivative exports / migration (no new concept art)

- [ ] G01 regenerate `brand/exports/png/logo/`
- [ ] G02 regenerate Redy-facing `brand/exports/png/icons/`
- [ ] G03 regenerate `brand/exports/png/mascot/`
- [ ] G04 regenerate `brand/exports/png/scenes/` and `brand/exports/png/banners/`
- [ ] G05 regenerate favicon/app/PWA raster sizes with correct alpha/safe area
- [ ] G06 update text docs, metadata, import paths and asset tests
- [ ] G07 test actual image existence, responsive crop, light/dark, 16/32/64 readability and build
- [ ] G08 merge PR only after the whole image migration is reviewed and CI passes

**Do not blindly replace** `brand/icons/{wemail,wegit,weopen}-*.png`, related badges or `brand/exports/png/icons/` product files. These are independent product marks. Inspect banners/badges before deciding whether they contain outdated Redy character elements.

## SVG scope is paused

Existing SVG candidates and SVG assets remain in version control, but new SVG work and SVG icon replacement are **out of scope for this PNG-first pass**. The animated SVG can be revisited after the image system is final.

## Suggested production order and minimum approvals

1. A01, then A02–A09; lock character consistency.
2. B01–B08; lock avatar, icons, identity.
3. C01–C14, D01–D10; build expressions and sticker system.
4. E01–E05, F01–F02; produce ecosystem scenes and collateral.
5. G01–G08; replace active files, regenerate duplicates and validate PR.

**Creative outputs versus file count:** the repository has many old versions, previews, duplicate exports and size derivatives. Do not plan 1 independent generation for each checked-in binary. One approved source image can yield multiple variants and sizes without re-illustrating.
