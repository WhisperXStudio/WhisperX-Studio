---
name: ui-ux-pro-max
description: UI/UX design intelligence for WHISPERX web interfaces. Apply for page composition, components, design systems, color, typography, motion, accessibility, responsive behavior, marketing surfaces, galleries, marketplace list/detail flows, preview, export, and install UX.
license: MIT
metadata:
  upstream: https://github.com/nextlevelbuilder/ui-ux-pro-max-skill
  upstream-version: "2.6.2"
  upstream-commit: 3da52ff1cab1be91848072ec1be5f493d730fd5f
  integration: whisperx-runtime-adapter
---

# UI UX Pro Max — WHISPERX Integration

Use this skill whenever a change affects how WHISPERX looks, feels, moves, communicates hierarchy, or is operated by keyboard, pointer, touch, or assistive technology.

## Required workflow

1. Read the current route, its data source, and connected components before changing UI.
2. Inspect `data/ui-ux-pro-max.json` and run the local recommendation engine in `lib/design-intelligence.ts` for the relevant product type.
3. Preserve the current light editorial marketplace identity unless the task explicitly requests a different product direction.
4. Build from semantic tokens in `app/globals.css`; avoid repeated raw colors where a token exists.
5. Validate desktop, tablet, mobile, light, dark fallback, keyboard focus, and reduced motion.
6. Keep capability labels honest: connected, partial, simulated, blocked, or unsupported.
7. Run `pnpm validate` and `pnpm build` before completion.

## Priority rules

Apply in this order:

1. Accessibility: contrast, keyboard, accessible names, labels, heading order.
2. Touch and interaction: 44px targets, visible feedback, no hover-only core action.
3. Performance: reserve media space, lazy load below fold, use transform/opacity for motion.
4. Style selection: match product type, use one icon language, keep one primary CTA.
5. Responsive layout: mobile-first, no horizontal overflow, controlled line length.
6. Typography and color: semantic tokens, readable body text, tabular figures for metrics.
7. Motion: 150–300ms microinteractions, meaningful transitions, reduced-motion fallback.
8. Forms and feedback: persistent labels, local errors, loading and recovery states.
9. Navigation: predictable back behavior, linkable routes, visible active context.
10. Data visualization: labels, legends, accessible colors, text/table fallback.

## WHISPERX defaults

For the digital systems marketplace use:

- Pattern: Feature-rich Marketplace
- Styles: Swiss Modernism 2.0 + Editorial Grid + Exaggerated Minimalism
- Palette: Signal Paper
- Typography: Instrument Serif + Instrument Sans + JetBrains Mono
- Motion: editorial reveal, controlled marquee, metadata hover, responsive preview transitions
- Avoid: generic SaaS dashboard, equal card wall, purple AI gradient, excessive pills, decorative glass everywhere

## Runtime integration

- Dataset: `data/ui-ux-pro-max.json`
- Engine: `lib/design-intelligence.ts`
- API: `GET|POST /api/design-intelligence`
- Workbench: `/design-intelligence`
- Validation: `scripts/validate-design-intelligence.mjs`

The runtime adapter is deterministic and inspectable. It does not claim LLM generation and does not require external API keys.

## Attribution

Adapted from UI/UX Pro Max by NextLevelBuilder, licensed under MIT. The pinned source revision and license are recorded in this directory and in the runtime dataset.
