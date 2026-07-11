# WHISPERX | PRODUCTION-READY SYSTEM POLISH LOCK

Status: **MANDATORY**  
Applies to: **all existing and future WHISPERX user-visible routes, modules, components, states, themes, responsive modes, motion, content presentation, and interaction flows**

---

## 1. PURPOSE

WHISPERX must be delivered as one coherent, production-ready product system rather than a collection of individually styled pages.

Every visual task must satisfy both:

1. `WHISPERX_ARTIFACT_FULL_HTML_FIRST_LOCK.md`
2. this production-ready system polish lock

The required sequence is:

```text
REFERENCE / REQUIREMENT REVIEW
→ FULL STANDALONE HTML ARTIFACT
→ ARTIFACT RESPONSIVE / STATE / MOTION REVIEW
→ ARTIFACT PASS
→ SYSTEM-WIDE PRODUCTION IMPLEMENTATION
→ FUNCTIONAL VALIDATION
→ VISUAL COMPARISON
→ PRODUCTION POLISH PASS
→ RELEASE GATE
```

A route is not complete because it renders, builds, or resembles the reference at one viewport.

---

## 2. SYSTEM-WIDE SCOPE

The lock applies to all current product surfaces, including:

- `/`
- `/marketplace`
- `/marketplace/[slug]`
- `/design-intelligence`
- `/import`
- `/library`
- `/preview`
- `/export`
- `/install`
- `/studio`
- all shared navigation, footer, dialogs, drawers, menus, filters, forms, cards, tables, galleries, alerts, tooltips, toasts, previews, loaders, and empty states
- every new route or module added later

A system-wide request means every relevant surface must be reviewed. Updating only the home page, hero, global CSS, or marketplace card grid is not a system-wide redesign.

---

## 3. COMPLETE DESIGN CONDITIONS

Every affected route or component must be designed and verified for all applicable conditions.

### 3.1 Interaction states

- default
- hover
- focus-visible
- active / pressed
- selected
- expanded / collapsed
- disabled
- loading
- processing
- success
- warning
- error
- partial
- blocked
- unsupported
- empty
- no results
- permission denied
- retry / recovery

No state may rely only on color.

### 3.2 Data conditions

- zero records
- one record
- many records
- long titles
- long descriptions
- missing optional metadata
- missing or failed image
- duplicate import
- incompatible package
- conflicting target file
- oversized source
- malformed JSON
- unavailable URL
- slow response
- interrupted operation

### 3.3 Viewport conditions

Minimum rendered review sizes:

```text
Desktop: 1440 × 1000
Laptop: 1280 × 800
Tablet landscape: 1024 × 768
Tablet portrait: 768 × 1024
Mobile: 390 × 844
Narrow mobile: 320 × 700
```

Required checks:

- no accidental horizontal overflow;
- no clipped headline or control;
- no hidden critical action;
- no unusable sticky section;
- no touch target smaller than 44 × 44px for primary interactions;
- correct mobile composition, not merely scaled desktop layout;
- readable line length and hierarchy;
- safe-area awareness where applicable.

### 3.4 Theme and preference conditions

- light mode
- dark mode or intentional dark fallback
- reduced motion
- increased text zoom up to 200%
- keyboard-only navigation
- visible focus
- high-contrast status communication

### 3.5 Language and content resilience

- English content
- Thai content when present
- mixed Latin and Thai strings
- long unbroken technical values
- dates, prices, counts, and status labels

Typography must preserve legibility, line height, wrapping, and hierarchy across these conditions.

---

## 4. FULL PRODUCTION POLISH STANDARD

Every page must include deliberate decisions for:

### 4.1 Composition

- clear information hierarchy;
- intentional section sequence;
- visual focal point;
- controlled density;
- balanced negative space;
- consistent content width;
- meaningful asymmetry where used;
- no arbitrary decorative blocks;
- no generic dashboard or card-grid fallback unless the content specifically requires it.

### 4.2 Typography

- explicit display, body, editorial, mono, and utility roles;
- responsive type scale;
- controlled line height and tracking;
- readable body copy;
- strong heading rhythm;
- no orphaned single-word lines in primary headlines where avoidable;
- correct font fallback for Thai and system text;
- no font loading layout collapse.

### 4.3 Color and surface

- semantic design tokens;
- sufficient contrast;
- deliberate background stages;
- clear elevation hierarchy;
- consistent border and shadow language;
- controlled accent colors;
- no random gradients or color decoration without purpose;
- no hard-coded color that breaks theme consistency without documented reason.

### 4.4 Imagery and visual assets

- purposeful art direction;
- consistent crop and aspect ratio;
- responsive image behavior;
- alt text for meaningful images;
- decorative images hidden from assistive technology;
- optimized file format and dimensions;
- graceful placeholder or fallback;
- no copied proprietary assets without permission.

### 4.5 Components

Every reusable component must define:

- purpose;
- variants;
- size options where needed;
- content limits;
- responsive behavior;
- interaction states;
- accessibility behavior;
- motion behavior;
- empty and error behavior;
- theming behavior;
- dependency and ownership boundary.

A component is not production-ready when only its default visual state exists.

### 4.6 Motion and animation

Motion must:

- communicate hierarchy, navigation, continuity, feedback, or state change;
- use `motion/react`, existing approved packages, or a justified native implementation;
- preserve content accessibility when JavaScript is unavailable;
- respect `prefers-reduced-motion`;
- avoid excessive simultaneous animation;
- avoid scroll-jacking;
- avoid blocking input;
- avoid continuous GPU-heavy effects without value;
- use consistent duration, easing, spring, and stagger tokens;
- preserve layout stability.

Every major animation must have a reduced-motion equivalent.

---

## 5. MODULE COMPLETION REQUIREMENTS

### 5.1 Home

Must include a complete narrative from product identity to capabilities, featured systems, process, proof, and next action.

### 5.2 Marketplace list

Must include usable search, category, subcategory, price, status, sorting, result count, empty state, reset, keyboard states, responsive layout, and stable item transition.

### 5.3 Marketplace detail

Must include product identity, preview, status, pricing or license, creator, files, dependencies, compatibility, capabilities, source, install implications, related systems, and safe next actions.

### 5.4 Import

Must include file, paste, and URL conditions where supported; validation; progress; warnings; errors; duplicate handling; limits; accepted result; and recovery.

### 5.5 Library

Must include native and user records, search, source distinction, remove, export, empty state, and honest persistence description.

### 5.6 Preview

Must include viewport, theme, state, source truth, fallback behavior, and clear separation between metadata preview and executing imported code.

### 5.7 Export

Must include format selection, scope, manifest clarity, generated file naming, success, failure, and browser download behavior.

### 5.8 Install

Must include target selection, file plan, dependency plan, conflict policy, permission, progress, written and skipped files, error recovery, and rollback or documented recovery path.

### 5.9 Studio

Must present one connected system view for catalog, taxonomy, design intelligence, import, library, preview, export, install, status, and unsupported capabilities.

### 5.10 Design Intelligence

Must show inputs, recommendation reasoning, palette, typography, layout, motion, accessibility, stack guidance, anti-patterns, and exportable or inspectable output without presenting deterministic logic as an external AI service.

---

## 6. ENGINEERING PRODUCTION CONDITIONS

Production-ready means all applicable conditions below are verified:

- correct package manager and deterministic lockfile;
- no unresolved TypeScript error;
- no lint error hidden by blanket suppression;
- valid JSON and schema consumption;
- no hydration failure;
- no broken route;
- no missing import;
- no unhandled promise rejection;
- no obvious global listener or timer leak;
- safe browser-only API access;
- safe path handling for import, export, and install;
- no secret committed or logged;
- no unsupported capability presented as connected;
- no destructive overwrite without explicit approval;
- no production deployment triggered without authority.

---

## 7. ACCESSIBILITY GATE

Required where applicable:

- semantic landmarks;
- logical heading order;
- skip navigation;
- keyboard access to every interactive control;
- visible focus;
- accessible names for icon buttons;
- labels and instructions for forms;
- error association and recovery guidance;
- `aria-current`, `aria-expanded`, `aria-pressed`, and live regions where appropriate;
- no keyboard trap;
- no critical information conveyed by motion, color, or hover alone;
- reduced-motion fallback;
- contrast appropriate to the text and control role.

Accessibility may not be deferred as a final cosmetic pass.

---

## 8. PERFORMANCE AND STABILITY GATE

Review and repair:

- excessive client-component scope;
- unnecessary package or runtime dependency;
- unoptimized large image;
- avoidable layout shift;
- excessive animation work;
- repeated expensive filtering or rendering;
- unstable React keys;
- avoidable hydration mismatch;
- long-running main-thread work;
- failure when localStorage, File System Access API, network, or optional browser feature is unavailable.

Progressive enhancement is required for optional browser APIs.

---

## 9. SEO, METADATA, AND PRODUCT TRUST

Every public route must have appropriate:

- title;
- description;
- canonical metadata where applicable;
- Open Graph metadata where applicable;
- index / no-index intent;
- meaningful headings;
- link labels;
- capability wording that matches reality.

Do not claim cloud sync, AI generation, remote repository write, production deployment, security certification, or real-time integration unless it is actually connected and verified.

---

## 10. ARTIFACT EVIDENCE

Before production implementation, the artifact must provide:

```text
artifacts/full-html/<work-slug>/
├── index.html
├── ARTIFACT_REPORT.md
├── STATE_MATRIX.md
├── COMPONENT_INVENTORY.md
└── screenshots/
    ├── desktop-1440.png
    ├── tablet-1024.png
    ├── mobile-390.png
    ├── light.png
    ├── dark.png
    └── reduced-motion.png
```

The report must identify:

- scope;
- reference sources;
- original adaptations;
- page and section inventory;
- component inventory;
- state coverage;
- responsive decisions;
- motion specification;
- accessibility decisions;
- known limitations;
- artifact result: `PASS`, `PARTIAL`, or `BLOCKED`.

Production work may begin only after `ARTIFACT PASS` or explicit product-owner acceptance of documented limitations.

---

## 11. PRODUCTION COMPARISON EVIDENCE

After implementation, compare production against the approved artifact at the same viewport sizes.

Required result matrix:

| Area | Result |
|---|---|
| Structure | PASS / PARTIAL / BLOCKED |
| Spacing | PASS / PARTIAL / BLOCKED |
| Typography | PASS / PARTIAL / BLOCKED |
| Color and surface | PASS / PARTIAL / BLOCKED |
| Imagery | PASS / PARTIAL / BLOCKED |
| Motion | PASS / PARTIAL / BLOCKED |
| Responsive | PASS / PARTIAL / BLOCKED |
| States | PASS / PARTIAL / BLOCKED |
| Accessibility | PASS / PARTIAL / BLOCKED |
| Functionality | PASS / PARTIAL / BLOCKED |

Do not claim visual parity, full polish, or production readiness without rendered comparison evidence.

When screenshot tooling is unavailable, report exactly:

```text
NOT VISUALLY VERIFIED — PRODUCTION READINESS CANNOT BE CLAIMED
```

---

## 12. REQUIRED VALIDATION

Use the repository's actual scripts. The expected gate is:

```text
DEPENDENCY INSTALL
→ TYPECHECK
→ LINT
→ REGISTRY VALIDATION
→ MARKETPLACE VALIDATION
→ DESIGN VALIDATION
→ DESIGN INTELLIGENCE VALIDATION
→ UI SYSTEM VALIDATION
→ TESTS WHEN AVAILABLE
→ PRODUCTION BUILD
→ DEVELOPMENT RUNTIME
→ PRODUCTION RUNTIME
→ ROUTE CHECKS
→ RESPONSIVE / THEME / MOTION / ACCESSIBILITY REVIEW
```

Do not report a command as passed unless it was executed successfully.

---

## 13. RELEASE CLASSIFICATION

Use exactly one result for a system-polish task:

```text
PRODUCTION POLISH PASS — ALL APPLICABLE SYSTEM, STATE, VISUAL, FUNCTIONAL, ACCESSIBILITY, BUILD, AND RUNTIME GATES VERIFIED

PRODUCTION POLISH CONDITIONAL — IMPLEMENTED, NON-BLOCKING LIMITATIONS DOCUMENTED

PRODUCTION POLISH BLOCKED — VERIFIED BLOCKER PREVENTS COMPLETION

NOT PRODUCTION-READY — REQUIRED VALIDATION OR VISUAL EVIDENCE REMAINS INCOMPLETE
```

A successful build alone does not qualify as `PRODUCTION POLISH PASS`.

---

## 14. PROHIBITED SHORTCUTS

Do not:

- polish only one page when the request is system-wide;
- replace reconstruction with a global CSS overlay;
- call a hero-only artifact a full artifact;
- call a component gallery a complete product page;
- skip empty, loading, error, disabled, and permission states;
- use placeholder copy or image where real production content exists;
- hide overflow instead of fixing layout;
- suppress type or lint failures;
- delete tests to pass CI;
- claim a package or integration is connected when it is not;
- claim pixel parity without comparison screenshots;
- merge solely because CI is green;
- deploy production without explicit authority.

---

## 15. FINAL RULE

For every WHISPERX user-visible task:

```text
FULL HTML FIRST
→ ALL APPLICABLE VARIANTS AND STATES
→ ARTIFACT PASS
→ SYSTEM-WIDE IMPLEMENTATION
→ FUNCTIONAL AND VISUAL VALIDATION
→ PRODUCTION POLISH RESULT
```

Anything less must be reported as `PARTIAL`, `BLOCKED`, or `NOT PRODUCTION-READY`.
