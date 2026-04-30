# Redy Export Package

This folder is the stage 5 delivery package for source-adjacent brand assets.

## Structure

| Folder | Contents | Primary Users |
| --- | --- | --- |
| `svg/` | Editable vector logo and project icon assets | Design, frontend, docs |
| `png/` | Ready-to-use bitmap assets for README, GitHub, site, CLI, and previews | Frontend, operations, community |

## Rules

- Use files in `svg/` when the target can render vector graphics.
- Use files in `png/` for GitHub README images, social previews, raster-only tools, and temporary presentation work.
- Treat `brand/tokens/color.tokens.json` and `brand/tokens/motion.tokens.json` as the token sources for future variants.
- Do not create a new visual language for a project-specific asset; extend the matching WeMail, WeGit, or WeOpen asset already included here.

