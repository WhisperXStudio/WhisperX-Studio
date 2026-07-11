# WHISPERX | ENGINEERING MERGE AND VISUAL RELEASE GATE AMENDMENT

Status: **MANDATORY**  
Applies to: **all user-visible implementation work governed by the WHISPERX artifact-first and production-polish locks**

This document amends and takes precedence over conflicting merge or stop conditions in:

- `WHISPERX_ARTIFACT_FULL_HTML_FIRST_LOCK.md`
- `WHISPERX_PRODUCTION_READY_SYSTEM_POLISH_LOCK.md`
- `AGENTS.md`

It does not weaken the artifact-first requirement and does not permit false production-readiness claims.

---

## 1. PURPOSE

WHISPERX uses separate gates for:

1. design approval;
2. engineering integration;
3. rendered visual verification;
4. production release.

A verified external preview or screenshot blocker must not force complete engineering work to remain indefinitely outside the target branch.

The required sequence is:

```text
REFERENCE / REQUIREMENT REVIEW
→ FULL STANDALONE HTML ARTIFACT
→ ARTIFACT PASS
→ PRODUCTION IMPLEMENTATION
→ ENGINEERING VALIDATION
→ ENGINEERING MERGE GATE
→ PRODUCTION RENDER
→ PRODUCTION-TO-ARTIFACT COMPARISON
→ VISUAL RELEASE GATE
→ PRODUCTION RELEASE GATE
```

The gates are independent. Passing an earlier gate does not imply that a later gate passed.

---

## 2. ARTIFACT GATE

Production UI implementation may begin only when one of these is true:

```text
ARTIFACT PASS
```

or:

```text
ARTIFACT PARTIAL — PRODUCT-OWNER ACCEPTED DOCUMENTED LIMITATIONS
```

The artifact must still contain the complete intended route or module, responsive decisions, state coverage, theme behavior, motion specification, and accessibility decisions.

This amendment does not permit skipping the full HTML artifact.

---

## 3. ENGINEERING MERGE GATE

A production implementation may be merged into the verified target branch before production screenshot comparison only when every applicable condition below is satisfied:

- the required HTML artifact exists and passed;
- artifact evidence and known limitations are committed;
- the implementation follows the approved artifact structure;
- TypeScript passes;
- lint passes;
- required schema and registry validation passes;
- required tests pass when available;
- production build passes;
- critical functional flows are implemented and truthfully classified;
- loading, empty, error, blocked, permission, and recovery states are present where applicable;
- no unresolved conflict exists;
- no secret or credential is introduced;
- no destructive file write occurs without explicit approval;
- no unsupported capability is presented as connected;
- the PR records the exact visual-verification status;
- the remaining visual blocker is external, verified, and documented;
- merge does not automatically deploy or publish a production release.

CI success alone is not sufficient. Artifact approval, engineering scope, state coverage, product truth, and blocker documentation are also required.

When these conditions pass, use exactly:

```text
ENGINEERING MERGE PASS — MERGE PERMITTED, PRODUCTION VISUAL VERIFICATION PENDING
```

This status permits normal merge into the verified branch. It does not permit a production-polish pass claim.

---

## 4. VERIFIED EXTERNAL VISUAL BLOCKERS

Examples of valid external blockers include:

- Vercel build-rate limit;
- preview deployment quota;
- deployment service outage;
- missing deployment permission outside repository control;
- screenshot service outage;
- unavailable browser automation infrastructure;
- product-owner-controlled environment not yet accessible.

The blocker must be supported by real evidence such as a deployment status, error URL, service response, or unavailable permission.

The following are not valid external blockers:

- source code that does not build;
- unresolved TypeScript or lint failures;
- broken routes;
- missing states;
- known layout defects;
- missing responsive work;
- absent artifact evidence;
- inability to describe what still needs visual verification.

---

## 5. REQUIRED MERGE RECORD WHEN VISUAL VERIFICATION IS PENDING

The PR or merge report must record:

- approved artifact path;
- production routes affected;
- engineering commands executed;
- engineering validation results;
- exact external blocker;
- blocker evidence URL or status;
- production comparison matrix status;
- known visual risks;
- next action required to complete visual verification;
- explicit statement that production readiness is not yet claimed.

The comparison document must remain:

```text
PENDING PRODUCTION VISUAL VERIFICATION
```

until real production renders are captured and reviewed.

---

## 6. POST-MERGE VISUAL GATE

After a production render becomes available, compare the merged implementation against the approved artifact at the required viewport and preference conditions.

Minimum review:

```text
1440 × 1000 desktop
1280 × 800 laptop
1024 × 768 tablet landscape
768 × 1024 tablet portrait
390 × 844 mobile
320 × 700 narrow mobile
light mode
dark mode or intentional dark fallback
reduced motion
keyboard and visible focus
```

Complete the production comparison matrix for:

- structure;
- spacing;
- typography;
- color and surface;
- imagery;
- motion;
- responsive behavior;
- interaction states;
- accessibility;
- functionality.

Only verified results may be marked `PASS`.

---

## 7. RELEASE CLASSIFICATION

Use exactly one status appropriate to the verified stopping point:

```text
ARTIFACT PASS — FULL HTML ARTIFACT APPROVED FOR PRODUCTION IMPLEMENTATION

ENGINEERING MERGE PASS — MERGE PERMITTED, PRODUCTION VISUAL VERIFICATION PENDING

PRODUCTION VISUAL PASS — MERGED PRODUCTION RENDER MATCHES THE APPROVED ARTIFACT WITHIN DOCUMENTED TOLERANCES

PRODUCTION POLISH PASS — ALL APPLICABLE SYSTEM, VISUAL, FUNCTIONAL, ACCESSIBILITY, BUILD, RUNTIME, AND RELEASE GATES VERIFIED

PRODUCTION POLISH CONDITIONAL — RELEASE PERMITTED WITH DOCUMENTED NON-BLOCKING LIMITATIONS

PRODUCTION POLISH BLOCKED — A VERIFIED BLOCKER PREVENTS THE CURRENT GATE

NOT PRODUCTION-READY — REQUIRED ENGINEERING OR VISUAL VALIDATION REMAINS INCOMPLETE
```

A project may hold `ENGINEERING MERGE PASS` and `NOT PRODUCTION-READY` at the same time. The first describes merge eligibility; the second describes release readiness.

---

## 8. MERGE AND RELEASE AUTHORITY

Under this amendment:

- a normal merge is permitted after `ENGINEERING MERGE PASS`;
- branch protection must still be respected;
- force-push remains prohibited;
- production deployment remains unauthorized unless explicitly approved;
- public release publication remains unauthorized unless explicitly approved;
- visual parity, production polish, and production-ready claims remain prohibited until the applicable visual and release gates pass.

Merging verified engineering work is not the same as releasing it.

---

## 9. UPDATED STOP CONDITIONS

The agent may stop at one of these verified points:

### Artifact stop

```text
ARTIFACT PASS
```

### Engineering integration stop

```text
ENGINEERING MERGE PASS — MERGE PERMITTED, PRODUCTION VISUAL VERIFICATION PENDING
```

### Visual validation stop

```text
PRODUCTION VISUAL PASS
```

### Release stop

```text
PRODUCTION POLISH PASS
```

When blocked, the report must name the exact current gate and next required action.

---

## 10. FINAL RULE

```text
HTML FIRST
→ ARTIFACT PASS
→ ENGINEERING PASS
→ MERGE WHEN SAFE
→ VISUAL VERIFY WHEN RENDERING IS AVAILABLE
→ RELEASE ONLY AFTER VISUAL AND RELEASE GATES PASS
```

Do not hold verified engineering work indefinitely because of an external preview quota.

Do not convert merge permission into a false production-readiness claim.
