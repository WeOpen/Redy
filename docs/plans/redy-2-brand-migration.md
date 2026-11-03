# Redy 2.0 — Brand migration and PR checklist

Status: implementation branch; NOT production-approved.
Branch: `feat/redy-2-brand-refresh`
Target: `main`

## Locked visual direction
- B+C hybrid: clean geometric mascot with expressive IP personality.
- Red panda, approximately 3.0-head proportions.
- Signature asymmetric three-tuft forelock, exposed expressive eyes, warm rust fur, cream cheeks, striped tail.
- Forehead-mounted dual blue-lens goggles; terminal / Git states only when needed.
- Red Git scarf in the base costume. Backpack, tools, laptop, map and lantern are optional scene props.
- Core palette candidates: rust `#D24B31`, cream `#F6EDE3`, charcoal `#2D2A2E`, warm brown `#C07B4F`, Git green `#2CC68E`, tech blue `#5B8FF9`.
- Generated concept sheets are references, not clean production assets. Their text, proportions, and details must be checked.

## Deliverables and acceptance
1. Master artwork: transparent, consistent front / 3-quarter / profile / back; verified goggles, facial marks, scarf, paws, tail, silhouette.
2. SVG master assets: readable, editable paths; no raster image embedded in SVG; transparent and light/dark variants.
3. Icon family: 16, 32, 48, 64, 128, 192, 256, 512 px PNG, apple-touch and app icons. Small sizes must use a simplified icon rather than a scaled illustration.
4. Mascot family: full-body standard, chibi, portrait and 12 core expressions; consistent anatomy.
5. Branded collateral: logo lockups, GitHub header, README banners, community stickers, merch previews and other current assets.
6. Website: replace all active old-image references and refresh accessibility text; avoid outdated references to 1.0.
7. Documentation: update brand guidelines, asset inventories, export manifest, README, attribution and migration notes.
8. Tests: run build, lint, tests, asset-path check and small-size visual review. Confirm no broken references or unexpected changes to independent WeMail/WeGit marks.
9. Review: compare screenshots at desktop/mobile and light/dark; submit PR with before/after, asset inventory, checks and rollback notes.

## Replacement map (audit first)
- `brand/logo/`, `brand/icons/redy-*`, `brand/mascot/`, `brand/stickers/`, `brand/scenes/`, `brand/banners/`
- `brand/exports/png/`, `brand/exports/svg/`, `brand/motion/`, `brand/merch/`, `brand/posters/`
- `app/icon.png`, `app/apple-icon.png`, `public/favicons/`, `public/android-chrome-*.png`, `public/apple-touch-icon.png`
- `app/_content/home.ts`, relevant components, README and brand documentation.

## Guardrails
- Preserve originals in git history; do not delete historical source material until replacement coverage is verified.
- Do not treat a generated design board as the vector master or claim it is production-ready.
- Do not merge without a reviewed diff and successful checks.
