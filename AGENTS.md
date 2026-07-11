# AGENTS.md — WHISPERX Studio

This repository is a production e-marketplace and build studio for digital systems, components, marketing modules, galleries, design systems, skills, preview, export, and safe local installation.

## Mandatory artifact-first and production-polish gates

Before any user-visible design, redesign, page, module, component-system, typography, color, layout, motion, responsive, visual-reference, or production-polish work, read and obey both:

- `WHISPERX_ARTIFACT_FULL_HTML_FIRST_LOCK.md`
- `WHISPERX_PRODUCTION_READY_SYSTEM_POLISH_LOCK.md`

The required workflow is:

```text
REFERENCE / REQUIREMENT REVIEW
→ FULL STANDALONE HTML ARTIFACT
→ RENDERED DESKTOP / TABLET / MOBILE INSPECTION
→ STATE / THEME / MOTION / ACCESSIBILITY REVIEW
→ ARTIFACT PASS
→ SYSTEM-WIDE PRODUCTION IMPLEMENTATION
→ FUNCTIONAL VALIDATION
→ PRODUCTION-TO-ARTIFACT COMPARISON
→ PRODUCTION POLISH RELEASE RESULT
```

Create each artifact under:

```text
artifacts/full-html/<work-slug>/index.html
artifacts/full-html/<work-slug>/ARTIFACT_REPORT.md
artifacts/full-html/<work-slug>/STATE_MATRIX.md
artifacts/full-html/<work-slug>/COMPONENT_INVENTORY.md
artifacts/full-html/<work-slug>/screenshots/
```

Do not edit production UI first. Do not call a CSS overlay, isolated hero, wireframe, generic card grid, or component demo a completed redesign. Do not claim visual parity or production readiness without rendered comparison evidence.

A system-wide request requires review of every relevant route, shared component, theme, responsive mode, interaction state, loading state, empty state, error state, permission state, motion mode, and accessibility condition defined by the production-polish lock.

If rendering or screenshot capture is unavailable, report exactly:

```text
NOT VISUALLY VERIFIED — PRODUCTION READINESS CANNOT BE CLAIMED
```

## Required skill routing

For any task that changes UI structure, visual design, typography, color, layout, motion, accessibility, responsive behavior, marketing presentation, gallery composition, marketplace list/detail UX, preview, or install UX, read and apply:

- `.codex/skills/ui-ux-pro-max/SKILL.md`
- `data/ui-ux-pro-max.json`
- `data/design-references.json`

Use `lib/design-intelligence.ts` when an inspectable product-specific design recommendation is useful.

## System-wide visual direction

The active WHISPERX visual system is an original Palmer-inspired editorial motion adaptation applied across every route through:

- `app/palmer-system.css`
- `app/palmer-parity.css`
- `app/palmer-marketplace.css`
- `app/palmer-detail.css`
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
- Editorial motion layers: `app/palmer-system.css`, `app/palmer-parity.css`, `app/palmer-marketplace.css`, and `app/palmer-detail.css`
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
7. Validate narrow mobile, mobile, tablet portrait, tablet landscape, laptop, desktop, keyboard, light mode, dark fallback, reduced motion, long content, zero data, many data, loading, empty, error, blocked, and permission conditions for UI work.
8. Create and pass the full standalone HTML artifact before production UI implementation.
9. Compare the production render against the approved artifact before claiming completion.
10. Review all relevant routes when the request says system-wide, all modules, every page, or full polish.
11. Run `pnpm validate` and `pnpm build` before claiming engineering completion.
12. Do not suppress type, lint, schema, test, runtime, or build failures.
13. Do not write user files without explicit browser permission and a visible write plan.
14. A successful build alone does not equal production readiness.
15. Use the exact production-polish classification defined in `WHISPERX_PRODUCTION_READY_SYSTEM_POLISH_LOCK.md`.
