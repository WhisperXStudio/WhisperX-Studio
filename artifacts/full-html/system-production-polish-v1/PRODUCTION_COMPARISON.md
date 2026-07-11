# Production-to-Artifact Comparison

Status: **PRODUCTION POLISH CONDITIONAL**  
Reviewed head: `056f43502ae79d27d9af7cf4615269cbc7fbea0b`  
CI render run: `29168167280`  
Evidence bundle: GitHub Actions artifact `8252793045`  
Evidence digest: `sha256:22414911955060abcc2c0bfa347f5c96abc69555221a98f730d080f67e9fc7d5`

## Render scope

The production application was built and rendered through Playwright after scrolling each route to settle viewport-triggered motion. The suite captured 45 full-page PNG files covering:

- all 10 public product routes at 1440 × 1000;
- all 10 routes at 768 × 1024;
- all 10 routes at 390 × 844;
- Home at 1280 × 800, 1024 × 768, and 320 × 700;
- all 10 routes in the intentional dark fallback;
- reduced-motion Home;
- 200% text-zoom Home with reduced motion.

Every captured route returned an HTTP status below 400, produced no browser page error, and passed the horizontal-overflow assertion.

## Result matrix

| Area | Result | Evidence / limitation |
|---|---|---|
| Structure | PASS | All 10 routes rendered with the approved editorial hierarchy, shared navigation, module context, route-specific content, and shared footer. |
| Spacing | PASS | Full-page renders completed at desktop, tablet, mobile, laptop, narrow mobile, and text-zoom conditions without detected horizontal overflow. |
| Typography | PASS | Display, editorial, body, mono, utility, responsive scale, and 200% text-zoom composition were rendered. |
| Color and surface | PASS | Paper, ink, signal, semantic status, raised surfaces, and intentional dark fallback were captured across every route. |
| Imagery | PASS | Production uses original CSS-built system visuals and catalog preview compositions; no copied proprietary image was introduced. |
| Motion | CONDITIONAL | `motion/react`, scroll-linked movement, reveal, shared-layout feedback, and reduced-motion paths are implemented. Static screenshots verify settled states; motion timing was not video-reviewed in this execution. |
| Responsive | PASS | All routes passed desktop, tablet, and mobile screenshot and overflow checks; Home also passed 1280, 1024, and 320 widths. |
| States | PASS | Shared ready, information, processing, warning, error, blocked, unsupported, empty, loading, route-error, not-found, offline, permission, and recovery patterns are implemented. |
| Accessibility | CONDITIONAL | Semantic landmarks, skip navigation, keyboard focus, accessible names, live regions, reduced motion, 44px controls, and text zoom are implemented and rendered. A manual screen-reader audit and full assistive-technology matrix remain outside this execution. |
| Functionality | CONDITIONAL | Build/runtime routes, typed catalog, library storage fallback, preview, deterministic export, install planning, unsafe-path blocking, install progress, and recovery manifest are implemented. Real folder writes require an explicit user gesture and browser File System Access permission, so that final write operation remains a manual acceptance test. |

## Defects repaired during comparison

- Removed a hydration mismatch in exported marketplace JSON by making the default export timestamp deterministic between server and client renders.
- Replaced screenshot-only route capture with a Playwright render pass that scrolls and settles viewport-triggered motion before capturing.
- Added page-error and horizontal-overflow assertions to the production evidence suite.
- Added deterministic light, dark, reduced-motion, and text-zoom evidence modes without changing normal user preference behavior.

## Remaining limitations

- Browser file writes cannot be completed by unattended CI because the folder picker requires direct user interaction and permission.
- Screenshot evidence confirms settled composition, not the perceived quality of animation timing; a human video/motion review is still recommended.
- Vercel publication is separate from repository readiness and remains subject to account deployment availability and authorization.

## Exact result

**PRODUCTION POLISH CONDITIONAL — IMPLEMENTED, SYSTEM-WIDE BUILD AND RENDER GATES VERIFIED; MANUAL FILE-WRITE AND ASSISTIVE-TECHNOLOGY ACCEPTANCE REMAIN DOCUMENTED.**
