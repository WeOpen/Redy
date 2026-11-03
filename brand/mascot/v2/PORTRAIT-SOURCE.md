# Redy 2.0 portrait — approved raster reference and tracing workflow

Reference: single forward-facing head portrait generated in the Redy 2.0 design conversation (2026-11-03), showing gold-rimmed blue goggles, orange-red three-tuft forelock, cream ears and muzzle, glossy brown eyes, smile and red Git scarf.

**Source binary status:** the original PNG is not yet committed to this repository. Do not substitute the earlier geometric SVG for this reference. The raster source and vector-trace export are available as conversation artifacts and must be imported into this branch together, using:
- `brand/mascot/v2/source/redy-2-portrait-reference.png`
- `brand/mascot/v2/redy-2-portrait-vector-trace.svg`

**Important:** automated color-contour vector tracing preserves image geometry better than a newly invented geometric icon, but introduces many polygon paths, hard color banding, and potential artifacts. It is an intermediate tracing asset, not a production-grade hand-optimized SVG master.

Review the SVG at 100%, 50%, 25% and 16–64 px. For final delivery, redraw smooth paths, fix gradients and edge fidelity, and validate against the PNG overlay. Only then update active site references and icon exports. The PR stays draft until the source PNG and approved vector master are actually committed.
