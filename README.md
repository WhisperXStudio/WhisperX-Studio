# ARTYVERSE

Clean rebuild of the multi-vendor marketplace and e-commerce frontend from `ARTYVERSE_X_FULL_PRODUCTION_POLISH_SPEC`.

This branch intentionally removes the previous WHISPERX/Palmer/Verse implementation and restarts from the approved ARTYVERSE production baseline.

## Locked foundation

- React 19 + TypeScript strict + Vite
- ARTYVERSE primary identity; ARTYVERSE X only for campaign surfaces
- Sora / Inter / Space Mono / Noto Sans Thai
- 4 / 8 / 12-column responsive system from 320px
- Server-trusted price, stock, totals, payment, order, permissions and COA
- Canonical JSON DOM/Builder API
- Reduced-motion support and WCAG 2.2 AA target

## Required commands

```bash
npm ci
npm run lint
npm run typecheck
npm test
npm run build
```
