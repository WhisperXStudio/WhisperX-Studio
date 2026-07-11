# AGENTS.md — WHISPERX Studio

This repository is a production e-marketplace and build studio for digital systems, components, marketing modules, galleries, design systems, skills, preview, export, and safe local installation.

## Required skill routing

For any task that changes UI structure, visual design, typography, color, layout, motion, accessibility, responsive behavior, marketing presentation, gallery composition, marketplace list/detail UX, preview, or install UX, read and apply:

- `.codex/skills/ui-ux-pro-max/SKILL.md`
- `data/ui-ux-pro-max.json`
- `data/design-references.json`

Use `lib/design-intelligence.ts` when an inspectable product-specific design recommendation is useful.

## System-wide visual direction

The active WHISPERX visual system is an original Palmer-inspired editorial motion adaptation applied across every route through:

- `app/palmer-system.css`
- `components/system/palmer-motion-system.tsx`
- `app/layout.tsx`
- shared navigation and footer components

Use the reference for design principles only. Do not copy external source code, proprietary assets, project imagery, names, or page text. Preserve WHISPERX product truth, routes, accessibility, and safe-install behavior.

Required characteristics:

- tight grotesk display typography with serif editorial accents;
- numbered sections and split information rails;
- alternating paper, color, and ink-black stages;
- rolling navigation text and measured reveal motion;
- asymmetric composition with clear operational metadata;
- visible keyboard focus, 44px targets, dark fallback, and reduced motion.

## Product truth

- Marketplace catalog source: `data/marketplace-catalog.json`
- Studio registry source: `data/whisperx-registry.json`
- Design intelligence source: `data/ui-ux-pro-max.json`
- Design reference registry: `data/design-references.json`
- Global CSS and semantic tokens: `app/globals.css`
- Editorial motion layer: `app/palmer-system.css`
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
