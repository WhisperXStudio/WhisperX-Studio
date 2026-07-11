# WHISPERX | ARTIFACT FULL HTML FIRST LOCK

Status: **MANDATORY**  
Applies to: **all user-visible design, layout, motion, typography, component, page, module, responsive, visual-reference, and visual-polish work**

---

## 1. PURPOSE

WHISPERX must not jump directly from a prompt, screenshot, URL, or verbal design request into production React, Next.js, Tailwind, CSS, or component implementation.

Every user-visible design task must begin with a complete standalone HTML artifact that demonstrates the intended finished experience before production files are changed.

The required order is:

```text
REFERENCE / REQUIREMENT REVIEW
→ FULL STANDALONE HTML ARTIFACT
→ RENDERED VISUAL INSPECTION
→ RESPONSIVE AND MOTION REVIEW
→ ARTIFACT PASS
→ PRODUCTION IMPLEMENTATION
→ PRODUCTION VALIDATION
```

A design is not approved merely because its CSS tokens, components, or build pass.

---

## 2. GOVERNING RULE

For every user-visible design change, the agent must create or update a full HTML artifact first.

The agent must not begin by editing production UI files such as:

- `app/**/*.tsx`
- `components/**/*.tsx`
- production route layouts
- production visual CSS layers
- shared navigation or footer implementation
- production motion components

until the required HTML artifact exists and has passed the artifact gate.

Backend-only, security-only, CI-only, documentation-only, and non-visual data fixes are exempt.

---

## 3. REQUIRED ARTIFACT LOCATION

Every design task must create a dedicated folder:

```text
artifacts/full-html/<work-slug>/
├── index.html
├── ARTIFACT_REPORT.md
└── screenshots/
    ├── desktop-1440.png
    ├── tablet-1024.png
    └── mobile-390.png
```

`index.html` is mandatory.

The HTML must be standalone and reviewable without the production application. Prefer one file with embedded CSS and JavaScript so it can be opened directly and inspected independently.

External package CDN use is allowed only when necessary for a faithful prototype and must be declared in `ARTIFACT_REPORT.md`.

---

## 4. FULL HTML MEANS FULL EXPERIENCE

The artifact must include the complete intended page or module, not a partial sample.

It must include, where applicable:

- navigation;
- hero;
- every content section;
- cards, rows, rails, galleries, tables, filters, forms, and controls;
- detail states;
- primary and secondary calls to action;
- footer;
- background composition;
- imagery or original visual placeholders with final proportions;
- typography hierarchy;
- color system;
- spacing system;
- hover, focus, active, selected, disabled, loading, empty, error, and success states;
- desktop, tablet, and mobile layouts;
- motion and animation behavior;
- reduced-motion fallback;
- light and dark behavior when both are in scope.

A wireframe, skeleton, empty card wall, generic dashboard mockup, isolated hero, or component-only demo does not satisfy this lock.

---

## 5. REFERENCE RECONSTRUCTION RULE

When a reference URL, screenshot, Framer site, Figma file, video, or image is supplied, the artifact must reconstruct the reference structure before production implementation.

The artifact report must document:

1. reference source;
2. section-by-section mapping;
3. container widths;
4. grid and column behavior;
5. spacing rhythm;
6. typography roles and approximate scale;
7. color and surface stages;
8. image ratios and cropping behavior;
9. motion timing and choreography;
10. desktop, tablet, and mobile differences;
11. deliberate WHISPERX adaptations;
12. remaining visual deviations.

Do not describe a loose stylistic adaptation as a reconstruction.

Do not claim visual parity without rendered comparison evidence.

Do not copy proprietary source code, protected text, or proprietary assets. Reconstruct with original WHISPERX code, content, data, CSS-built visuals, licensed assets, or user-provided assets.

---

## 6. ARTIFACT QUALITY GATE

The artifact may pass only when all applicable checks are complete:

### Structure

- all requested sections are present;
- page order is correct;
- content density is representative;
- no major placeholder section remains;
- navigation and footer are included.

### Visual design

- composition has a clear focal point;
- typography hierarchy is intentional;
- spacing and alignment are coherent;
- backgrounds and imagery create depth;
- the result is not a generic template;
- the requested reference direction is visibly present.

### Interaction

- important hover and focus states exist;
- motion supports hierarchy rather than hiding weak layout;
- animation timing is consistent;
- reduced motion remains usable;
- interactive controls are understandable.

### Responsive

- desktop at 1440px inspected;
- tablet at 1024px inspected;
- mobile at 390px inspected;
- no accidental horizontal overflow;
- mobile composition is redesigned where needed rather than merely compressed.

### Accessibility

- semantic landmarks are present;
- keyboard focus is visible;
- text contrast is usable;
- controls have accessible names;
- touch targets are usable.

---

## 7. ARTIFACT REPORT

Every artifact must include `ARTIFACT_REPORT.md` with this minimum evidence:

```text
Work scope:
Reference source:
Artifact path:
Sections completed:
Responsive widths inspected:
Motion included:
Light mode:
Dark mode:
Keyboard inspection:
Accessibility inspection:
Known deviations:
Artifact result: PASS | PARTIAL | BLOCKED
Production implementation allowed: YES | NO
```

Production implementation is allowed only when:

```text
Artifact result: PASS
Production implementation allowed: YES
```

---

## 8. PRODUCTION IMPLEMENTATION RULE

After the HTML artifact passes:

1. map each artifact section to production components;
2. preserve the approved visual hierarchy;
3. preserve proportions, spacing, and section order;
4. use the repository's existing package manager and supported packages;
5. use shared components where they preserve the artifact result;
6. do not weaken the design merely to fit existing components;
7. do not replace the artifact with a generic card grid;
8. keep product data and capability status honest;
9. validate production output against the artifact screenshots.

If production constraints require a visual change, update the artifact and report first, then implement the revised artifact.

---

## 9. REQUIRED COMPARISON

Before claiming completion, compare the production render against the approved HTML artifact at:

- 1440px desktop;
- 1024px tablet;
- 390px mobile.

The completion report must identify:

- exact artifact path;
- exact production routes;
- matched sections;
- intentional differences;
- unresolved deviations;
- screenshot evidence when available.

A successful TypeScript check, lint, test, or build does not replace visual comparison.

---

## 10. MOTION AND PACKAGE RULE

Use existing production-ready packages when they improve fidelity and maintainability.

For WHISPERX, Motion for React may be used for:

- entrance choreography;
- scroll-linked movement;
- shared layout transitions;
- staggered reveals;
- gesture and hover behavior;
- presence transitions;
- reduced-motion-aware animation.

Motion must be represented in the HTML artifact before it is translated into production components.

Do not add animation after implementation as decoration for an unapproved layout.

---

## 11. PROHIBITED SHORTCUTS

The following do not satisfy this lock:

- editing global CSS first and calling it a redesign;
- applying one visual skin across unchanged pages;
- producing only a hero section;
- generating a component gallery instead of the requested page;
- using lorem ipsum for major content areas;
- replacing imagery with empty gray rectangles;
- using build success as proof of design quality;
- claiming "inspired", "reconstructed", "matching", or "production polished" without rendered evidence;
- merging visual work before the HTML artifact exists;
- skipping tablet or mobile review;
- hiding missing sections behind future-work language.

---

## 12. CHANGE CLASSIFICATION

Use these statuses exactly:

- `ARTIFACT PASS` — complete HTML artifact rendered and reviewed;
- `ARTIFACT PARTIAL` — artifact exists but required sections or states are incomplete;
- `ARTIFACT BLOCKED` — a verified dependency prevents completion;
- `IMPLEMENTATION PASS` — production implementation matches the approved artifact within documented tolerances;
- `IMPLEMENTATION PARTIAL` — production implementation exists but visual deviations remain;
- `NOT VISUALLY VERIFIED` — production output has not been rendered and compared.

---

## 13. AGENT STOP CONDITIONS

For visual work, the agent must not report completion until both are true:

```text
ARTIFACT PASS
IMPLEMENTATION PASS
```

If browser rendering or screenshot capture is unavailable, the exact final status must include:

```text
NOT VISUALLY VERIFIED
```

Do not merge or claim visual parity solely from source inspection.

---

## 14. FINAL COMMAND

For every new page, redesign, module, visual reference reconstruction, typography change, layout change, component-system change, motion change, or full-polish request:

1. create the complete standalone HTML artifact first;
2. render and inspect it at desktop, tablet, and mobile widths;
3. document the artifact result;
4. begin production implementation only after `ARTIFACT PASS`;
5. compare production output against the artifact;
6. report exact evidence and remaining deviations;
7. never claim matching design without rendered proof.

**HTML first. Production second. Evidence before claims.**
