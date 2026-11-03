# Redy 2.0 | Responsive icon candidate family

Status: **visual review required — not the active production favicon or app icon.**

The Redy 2.0 mascot illustration is intentionally too detailed to simply shrink to 16px. These are **three independently drawn, editable SVG variants**, all anchored in the approved rust-red panda/goggles/cream-cheek silhouette of the V14 portrait. These marks are simplified **derivatives**, not claims of a pixel-perfect SVG reproduction of the portrait.

| Size range | File | Recommended use |
| --- | --- | --- |
| 16 px | `nano-v1.svg` | Browser tabs and tiny status marks |
| 32–96 px | `micro-v1.svg` | Small avatars, toolbar, compact favicon sizes |
| 128 px+ | `standard-v1.svg` | Social avatars, app launch artwork, documentation and brand touchpoints |

All source SVGs contain paths/shapes and editable fills only, with no embedded PNG, scripts, remote fonts or bitmap filters. Backgrounds remain transparent; icon strokes, proportions and details differ at each scale. Treat all three as candidates until inspected at their native pixel sizes on light and dark backgrounds.

## Source artwork

V14 editable portrait: `brand/mascot/v2/redy-2-portrait-bezier-v14.svg`.

Independently generated full-detail PNG reference: **not yet committed** on this branch; do not treat the earlier V13 reference as the latest portrait.

## Reproducible icon PNG exports

From the repository root:

```bash
python -m pip install cairosvg pillow
python scripts/export-redy-2-icons.py --output-dir /tmp/redy-2-icon-exports
```

This chooses nano for 16px, micro for 32–96px and standard for 128–512px. Exported PNGs live outside the repository until the icon family passes visual review. When CI runs, it also uploads an artifact with the exported PNGs for inspection.

## Release gate

1. Inspect each image at **actual** 16, 32, 64, 128 and 512 px rather than only pixel-enlarged previews.
2. Check against V14 for red panda silhouette, tuft, goggles, eye placement and scarf. Tiny glyphs such as the Git branch may be removed below 128px.
3. Verify dark/light background contrast and PWA safe zone.
4. Select the final SVG family, then copy exported PNGs into `public/favicons/`, `public/android-chrome-*.png`, `app/icon.png`, `app/apple-icon.png` and distribution folders.
5. Update metadata paths and tests only after the final exports are actually committed; retain old versions through Git history.
