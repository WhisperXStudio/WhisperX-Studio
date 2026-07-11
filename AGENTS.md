# AGENTS.md — WHISPERX Studio

This repository is a production e-marketplace and build studio for digital systems, components, marketing modules, galleries, design systems, skills, preview, export, and safe local installation.

## Required skill routing

For any task that changes UI structure, visual design, typography, color, layout, motion, accessibility, responsive behavior, marketing presentation, gallery composition, marketplace list/detail UX, preview, or install UX, read and apply:

- `.codex/skills/ui-ux-pro-max/SKILL.md`
- `data/ui-ux-pro-max.json`

Use `lib/design-intelligence.ts` when an inspectable product-specific design recommendation is useful.

## Product truth

- Marketplace catalog source: `data/marketplace-catalog.json`
- Studio registry source: `data/whisperx-registry.json`
- Design intelligence source: `data/ui-ux-pro-max.json`
- Global CSS and semantic tokens: `app/globals.css`
- UI UX recommendation route: `/design-intelligence`
- Runtime API: `/api/design-intelligence`

Do not create disconnected duplicate data models when an existing source can be extended.

## Engineering rules

1. Preserve working user-authored implementation.
2. Keep capability status honest. Never label simulated behavior as connected.
3. Use the existing pnpm package manager only.
4. Do not add a package when the same result can be implemented with current dependencies.
5. Keep client component boundaries small.
6. Use semantic tokens and accessible interaction states.
7. Validate mobile, tablet, desktop, keyboard, light mode, dark fallback, and reduced motion for UI work.
8. Run `pnpm validate` and `pnpm build` before claiming completion.
9. Do not suppress type, lint, schema, or build failures.
10. Do not write user files without explicit browser permission and a visible write plan.
