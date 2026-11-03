# Redy 2.0 · Portrait assets

The Redy 2.0 head portrait is being reconstructed from the individually generated PNG reference. This directory stores the reference, vector candidate and visual QA exports together.

| Asset | File | Purpose |
| --- | --- | --- |
| Source portrait | `source/redy-2-portrait-reference.png` | Fixed visual reference |
| SVG V13 | `redy-2-portrait-bezier-v13.svg` | Editable Bézier and gradient candidate |
| SVG preview | `previews/redy-2-svg-preview-v13.png` | Rendered appearance of SVG |
| Comparison | `previews/redy-2-reference-v13-comparison.png` | Before/after QA |

**Status: V13 candidate, not final brand master.** Earlier automated tracing introduced artifacts; V13 prioritizes clean scalable Bézier paths. The geometry and highlights still differ from the reference.

## Acceptance requirements

1. Check rendered V13 beside the PNG at identical crop and size.
2. Verify ears, three-tuft silhouette, gold/blue goggles, cheek arcs, eye alignment, muzzle and red Git scarf.
3. Review the actual SVG at 16, 32, 64, 128 and 512 px. Use a separate simplified mark for tiny sizes if necessary.
4. Check XML validity, accessibility title/description, transparent background and absence of embedded raster.
5. After visual approval, export and replace app icons, favicon families, logo lockups, website imagery, banners, stickers and brand distribution copies.
6. Validate builds, tests, light/dark contrast and broken image references before changing this PR from draft.

See `PORTRAIT-SOURCE.md` for the detailed source-of-truth policy.
