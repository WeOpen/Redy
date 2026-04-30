# Redy Motion Guidelines

## Status

T27 motion tokens are now defined in `brand/tokens/motion.tokens.json`. This file explains how to apply them across the site, README visuals, CLI states, and future sticker or loading work.

## Motion Personality

Redy motion should feel calm, warm, and observant. The system favors soft entrances, tiny technical pulses, and restrained mascot gestures. Avoid elastic cartoon bounce, constant shaking, loud confetti, or motion that makes Redy feel noisy.

## Core Patterns

| Pattern | Token | Use |
| --- | --- | --- |
| Soft appear | `motion.pattern.softAppear` | Hero details, empty states, cards, banner elements |
| Goggle glint | `motion.pattern.goggleGlint` | Loading, active processing, terminal-style moments |
| Branch pulse | `motion.pattern.branchPulse` | Merge success, Git activity, commit-node feedback |
| Tiny wave | `motion.pattern.tinyWave` | Q-version Redy hello, onboarding, light welcome |

## Timing Rules

- Use `motion.duration.fast` for simple controls.
- Use `motion.duration.base` for normal site transitions.
- Use `motion.duration.slow` for Redy, illustrations, or page-level reveals.
- Use `motion.duration.ambient` only for subtle loops such as lens glints.

## Accessibility Rules

- Respect `prefers-reduced-motion`.
- Decorative loops stop after three cycles unless the UI is still actively loading.
- Reduced-motion fallbacks should preserve state clarity through opacity, color, or static icon changes.
- Motion must never be the only signal for success, error, or active state.

