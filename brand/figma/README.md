# Redy Figma Source Handoff

## Status

No native `.fig` or `.figma` file is present in this repository. Stage 5 therefore provides a Figma-ready source handoff package rather than pretending a missing binary source file exists.

## Import Sources

| Figma Page | Import From | Notes |
| --- | --- | --- |
| `00 Foundations` | `brand/tokens/color.tokens.json`, `brand/tokens/motion.tokens.json` | Create variables for color and motion timing. |
| `01 Redy Master` | `brand/exports/svg/logo/weopen-redy-primary.svg`, `brand/exports/png/mascot/*` | Primary lockup, avatar, standard mascot, Q-version mascot. |
| `02 Product Icons` | `brand/exports/svg/icons/*`, `brand/exports/png/icons/*` | WeMail, WeGit, WeOpen icon and badge families. |
| `03 README and GitHub` | `brand/exports/png/banners/*`, `brand/exports/png/scenes/*` | Repository and organization header visuals. |
| `04 Usage Guidelines` | `brand/guidelines/*.md` | Usage rules, color rules, icon review, and delivery checklist. |

## Naming Rules

- Use component names in the form `Redy / Asset / Variant`.
- Keep WeMail, WeGit, and WeOpen grouped as sibling component sets.
- Bind all reusable colors to the matching token names from `color.tokens.json`.
- Add motion notes as component documentation rather than animating every asset in Figma.

## Handoff Boundary

This package is complete for repository handoff and Figma import. A future designer can create the native Figma file from these sources, but that file should be checked in only if the team chooses a storage policy for binary design sources.

