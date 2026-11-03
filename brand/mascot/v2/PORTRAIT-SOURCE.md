# Redy 2.0 portrait — source of truth and tracing status

## Uploaded reference assets

All four assets below are now committed on `feat/redy-2-brand-refresh`:

| Role | Path | Review status |
| --- | --- | --- |
| Original generated portrait | `source/redy-2-portrait-reference.png` | Primary **visual reference** |
| Editable Bézier reconstruction | `redy-2-portrait-bezier-v13.svg` | Candidate; needs visual approval |
| Rendered vector preview | `previews/redy-2-svg-preview-v13.png` | QA preview of candidate |
| Original vs vector comparison | `previews/redy-2-reference-v13-comparison.png` | QA comparison |

The source PNG is the visual reference, while the SVG consists of editable vector paths, gradients and shapes rather than embedded raster artwork. **The SVG does not yet match the reference 1:1** and is not approved as a production icon.

## Validation before production

- Compare outline, goggles, eye placement, cheek patterns, smile and scarf at 100% and 200%.
- Verify SVG rendering at 512, 128, 64, 32 and 16 px on light/dark backgrounds.
- Export transparent icon variants from an *approved* SVG master, not the reference PNG or a design-board crop.
- Update website, mobile icons, favicon and brand exports only after passing the icon review.
- Preserve the older mascot art in Git history. Independent WeMail, WeGit and WeOpen product icons should not be overwritten.

Current site preview: `app/_components/sections/visual-system-section.tsx` shows the reference image and V13 SVG render side by side, and marks older full-body/Q art as pending replacement.
