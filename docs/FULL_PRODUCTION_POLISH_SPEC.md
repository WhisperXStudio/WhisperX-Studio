# ARTYVERSE X — Full Production Polish Specification

**Version:** 1.0  
**Date:** 12 July 2026  
**Status:** Production Baseline / Source of Truth  
**Target:** Figma, semantic HTML, React + TypeScript, desktop, tablet, mobile

> **Quality commitment** — ARTYVERSE X ต้องไม่ดูเหมือน template marketplace ทั่วไป ไม่ใช้ motion สำเร็จรูปแบบซ้ำ ๆ และไม่ส่งงานที่ “พอใช้ได้” งานต้องมี Brand Memory, Product Clarity, Motion Purpose, Responsive Integrity และ Implementation Fidelity จนผู้ใช้เปิดมาแล้วรู้สึกว้าว แต่ยังเร็ว อ่านง่าย และซื้อของได้จริง

---

## 0. Document Control

| Field | Value |
|---|---|
| Primary brand | ARTYVERSE |
| Campaign / experimental lockup | ARTYVERSE X / artyverse x |
| Product type | Multi-vendor e-marketplace + e-commerce |
| Platforms | Responsive web, desktop, tablet, mobile |
| Implementation | Framework-free HTML/CSS/JavaScript and React + TypeScript |
| Motion stack | CSS / Web Animations API, Motion for React; optional GSAP, Rive, dotLottie |
| Current React baseline | Vite production build passes; current JS bundle 107.38 kB gzip |
| Design tone | Modern, cute, clever, playful, slightly mischievous, premium; never childish |
| Accessibility target | WCAG 2.2 AA |
| Performance target | Core Web Vitals “good” at p75 on representative mobile traffic |

### Status language

- **LOCKED** — ห้ามเปลี่ยนโดยไม่ผ่าน design review
- **REQUIRED** — ต้องมีใน production
- **RECOMMENDED** — ใช้เป็นค่าเริ่มต้น เปลี่ยนได้เมื่อมีเหตุผลที่พิสูจน์ได้
- **EXPERIMENTAL** — ใช้เฉพาะแคมเปญหรือ feature flag
- **BLOCKER** — ห้าม release จนแก้ไข

---

## 1. Product Vision and Experience Promise

ARTYVERSE X คือ marketplace สำหรับ digital products, collectibles, creator drops และ limited editions ที่รวมความรู้สึก “ค้นพบของแปลกที่ใช่” เข้ากับความชัดเจนของ e-commerce ที่เชื่อถือได้ ผู้ใช้ต้องรู้สึกว่าสนุกตั้งแต่วินาทีแรก แต่ไม่หลงทาง ไม่สงสัยราคา ไม่กังวลเรื่องของแท้ และไม่ติดขั้นตอน checkout ที่ยืดเยื้อ

### 1.1 Experience promise

1. **Open with wonder** — First viewport ต้องมีเอกลักษณ์ภายใน 3 วินาทีโดยไม่รบกวนการอ่าน
2. **Make products the hero** — Effect ทุกอย่างต้องส่งสินค้า ไม่ใช่แย่งสินค้า
3. **Playful, not childish** — Orbit และ microcopy มีอารมณ์ขัน แต่ไม่ลดความน่าเชื่อถือ
4. **Fast enough to trust** — Motion ลื่นและตอบสนองทันที; loading ทุกจุดต้องสื่อสถานะจริง
5. **Clear enough to buy** — ราคา สต็อก ตัวเลือก ค่าจัดส่ง คืนเงิน COA และ seller ต้องเห็นได้ชัด
6. **Built as a system** — Figma, HTML และ React ต้องใช้ token, state และ component anatomy เดียวกัน

### 1.2 Non-goals

- ไม่ทำเป็น “neon cyberpunk template” ที่มีแต่ glow และ glass card
- ไม่ใช้ animation ทุก element เพียงเพราะทำได้
- ไม่ซ่อน action สำคัญไว้หลัง hover
- ไม่ทำ desktop แล้วค่อยย่อเป็น mobile
- ไม่ใช้ placeholder สีเทาไร้บุคลิกใน final production
- ไม่ใช้ copy ทั่วไป เช่น “Explore our products” เมื่อสามารถพูดแบบ ARTYVERSE ได้

---

## 2. Non-Negotiable Quality Bar

### 2.1 Anti-generic rules

- ทุกหน้าต้องมี **หนึ่ง memorable moment** และ **หนึ่ง conversion anchor**
- Section ต่อเนื่องต้องไม่ใช้ layout หรือ reveal pattern เหมือนกันเกินสอง section
- Card ทุกใบต้องมีข้อมูลจำเป็นก่อน decoration
- Glassmorphism ใช้เฉพาะ overlay, navigation หรือ contextual surface; ห้ามเป็นพื้นฐานทุก card
- Gradient ใช้เพื่อแสดงพลังงาน/สถานะ/brand transition ไม่ใช่ทาทุกพื้นผิว
- Mascot ต้องทำหน้าที่: guide, feedback, trust หรือ reward; ห้ามวางเพื่อความน่ารักอย่างเดียว
- Animation loop ต้องหยุดเมื่อออกนอก viewport และไม่ทำงานใน reduced motion
- Hero ต้องมี static first frame ที่ดูดีแม้ JavaScript ยังไม่ทำงาน

### 2.2 Production acceptance score

| Category | Weight | Release gate |
|---|---:|---|
| Brand distinctiveness | 15 | ไม่มี legacy name, generic template หรือ inconsistent tone |
| Visual craft | 15 | Alignment, hierarchy, spacing, asset quality ผ่าน review |
| Product clarity | 10 | ราคา ตัวเลือก สต็อก seller และ CTA ชัดเจน |
| Motion and interaction | 15 | Purposeful, smooth, reduced-motion complete |
| Responsive behavior | 10 | 320px–wide desktop ไม่มี overflow และไม่มี feature หาย |
| Accessibility | 10 | Keyboard, focus, semantics, contrast, screen reader |
| Performance | 10 | ผ่าน performance budgets และไม่มี animation jank |
| Engineering quality | 10 | Typed props, semantic HTML, reusable tokens, stable state |
| QA and release readiness | 5 | Test matrix และ Definition of Done ครบ |

**Release threshold:** อย่างน้อย 90/100 และไม่มี BLOCKER แม้คะแนนรวมผ่าน

---

## 3. Brand Architecture and Personality

### 3.1 Naming system

- **ARTYVERSE** — ชื่อผลิตภัณฑ์หลัก ใช้ใน navigation, SEO, legal, account และ transaction
- **ARTYVERSE X** — campaign, experimental drop, creator collaboration และ immersive experience
- **artyverse x** — editorial / lowercase lockup ใช้ใน fashion-forward campaign เท่านั้น
- **Orbit** — mascot / experience guide

**BLOCKER:** asset หรือข้อความใดที่ยังใช้ “ARTVERSE” ถือเป็น legacy และต้องเปลี่ยนก่อน release

### 3.2 Personality sliders

| Dimension | Target |
|---|---|
| Premium ↔ Mass | Premium-accessible 70/30 |
| Serious ↔ Playful | 45/55 |
| Minimal ↔ Expressive | 45/55; expressive moments on calm structure |
| Technical ↔ Human | 40/60 |
| Cute ↔ Childish | Cute 35; Childish 0 |
| Trendy ↔ Timeless | 45/55 |

### 3.3 Voice rules

- ประโยคสั้น อ่านได้ในหนึ่ง glance
- มุกอยู่ใน supporting copy ไม่อยู่ใน payment/legal decision
- ใช้คำที่มั่นใจ ไม่ใช้คำเว่อร์แบบไม่มีหลักฐาน
- Error ต้องบอกว่าเกิดอะไร ผู้ใช้ทำอะไรต่อ และข้อมูลสูญหายหรือไม่
- ความเร่งด่วนต้องอ้างอิงสต็อก/เวลา ไม่สร้าง fake scarcity

ตัวอย่าง:

- Cart empty: “ตะกร้าว่างขนาดนี้ Orbit เริ่มเป็นห่วงแล้วนะ”
- Stock low: “เหลือน้อยแล้วนะ ไม่ได้กดดัน แค่กระซิบดัง ๆ”
- Payment loading: “กำลังคุยกับธนาคารด้วยภาษาต่างดาว…”
- Success: “ได้ของแล้ว ทีนี้ทำเป็นใจเย็นได้”
- Sold out: “ช้าไปหนึ่งวงโคจร เจอกัน Drop หน้า”

---

## 4. Audience and Emotional Outcomes

| Audience | Primary need | Desired feeling | UX emphasis |
|---|---|---|---|
| New collector | เข้าใจสินค้าและความน่าเชื่อถือ | ตื่นเต้นแต่ปลอดภัย | Guided discovery, clear trust signals |
| Experienced collector | Limited info, serial, provenance | ควบคุมและทันเวลา | Fast filters, drop reactor, COA |
| Creator / seller | จัดการสินค้าและรายได้ | มีพลัง ไม่วุ่นวาย | Operational clarity, batch tools, signals |
| Marketplace admin | คุมคุณภาพและความเสี่ยง | เห็นภาพรวม ตัดสินใจเร็ว | Moderation, audit, severity patterns |
| Mobile-first shopper | ซื้อระหว่างเดินทาง | เร็ว ใช้นิ้วเดียวได้ | Thumb-zone CTA, sheets, haptics-ready |

---

## 5. Experience Narrative — Five Acts

### Act 01 — Enter the Verse
Logo และ product world ปรากฏเป็น cinematic first frame จากนั้น motion ค่อยเปิดข้อมูลสำคัญ ห้ามเริ่มด้วย splash screen ที่บังคับรอ

### Act 02 — Discover Something Weird
Product rail และ grid ทำให้ผู้ใช้เห็นความหลากหลาย แต่ filter / search / price ต้องเข้าถึงได้ทันที

### Act 03 — Catch the Drop
Drop Reactor แสดงเวลา สต็อก limit และเงื่อนไขแบบตรวจสอบได้; CTA ต้องไม่กระโดดหรือย้ายเมื่อ timer เปลี่ยน

### Act 04 — Verify the Real One
COA / serial / seller verification ใช้ Lock motion เพื่อสื่อ “ตรวจสอบและยืนยัน” พร้อม fallback เป็นข้อความ static

### Act 05 — Reward the Collector
Purchase success เชื่อมสินค้าเข้าสู่ collection progress, rewards และ next best action โดยไม่บังคับ upsell

---

## 6. Information Architecture and Screen Inventory

**Total target: 107 screens** — 95 desktop role screens + 12 mobile key flows

### 6.1 Storefront & Buyer — 24
Home, Category Landing, Search Results, Search Empty, Product Detail, Gallery Zoom, Shop/Artist Profile, Collection/Series, Limited Drop, Pre-order, Wishlist, Recently Viewed, Cart, Checkout Address, Checkout Delivery, Checkout Payment, Checkout Review, Payment Success, Payment Failed, Guest Tracking, COA Verify, Community Feed, Community Post Detail, Help Center.

### 6.2 Account & Orders — 20
Login, Register, OTP, Forgot Password, Reset Password, Account Overview, Profile, Address Book, Payment Methods, My Orders, Order Detail, Shipment Tracking, Return Request, Return Status, Reviews, Messages/Chat, Vouchers/Credits, Following/Saved Shops, Notifications/Preferences, Security/Sessions.

### 6.3 Seller Center — 26
Onboarding, KYC/Business Verification, Shop Profile, Dashboard, Product List, Product Basics, Media Gallery, Variants, Inventory, Pricing, Shipping Profile, Preview/Publish, Bulk Import, Orders, Order Detail, Fulfillment, Shipping Labels, Returns, Dispute Detail, Promotions, Coupon Builder, Drop/Pre-order Manager, Analytics, Finance/Payout, COA/Serial, Staff/Roles/Settings.

### 6.4 Admin & Operations — 25
Dashboard, User Management, User Detail, Seller Applications, Seller Detail, Product Moderation Queue, Product Moderation Detail, Categories, Brands/Collections, Orders, Order Detail, Payments, Refunds, Disputes, Commission/Fees, Campaign/Banners, CMS/Pages, Community Moderation, Shipping Rules, Tax/Invoice, Reports, Audit Logs, Integrations/Webhooks, Roles/Permissions, System Settings/Health.

### 6.5 Mobile Key Flows — 12
Home, Search/Filter Sheet, Product Detail, Limited Drop, Cart, Checkout, Payment/QR, Order Tracking, Account, Messages, Seller Quick Dashboard, Notifications/Orbit Center.

---

## 7. Responsive Layout System

### 7.1 Breakpoint contract

| Name | Range | Intent |
|---|---|---|
| Compact | 320–479 | one-thumb mobile, single column |
| Mobile | 480–767 | larger mobile, sheets and 2-up micro grids |
| Tablet | 768–1023 | 2-column product grid, compact navigation |
| Desktop | 1024–1279 | full navigation, 3-column content where appropriate |
| Wide | 1280–1599 | 4-column products, max-content rhythm |
| Cinema | 1600+ | content remains capped; atmosphere may extend |

### 7.2 Container and grid

- Max readable content: `1440px`
- Page inset: `clamp(20px, 5vw, 72px)`
- Desktop grid: 12 columns, 24px gutter
- Tablet grid: 8 columns, 20px gutter
- Mobile grid: 4 columns, 16px gutter
- Body copy line length: 45–75 characters
- Section rhythm: 84–150px desktop; 64–96px mobile
- Fixed header must not cover anchor targets; use `scroll-margin-top`

### 7.3 Responsive behavior rules

- Mobile is recomposed, not scaled desktop
- Primary action stays in thumb zone; destructive action never beside primary without separation
- Product image remains at least 1:1 or 4:5 with explicit aspect ratio
- Tables collapse into card rows or horizontal scroll with sticky labels
- Hover content must have tap/focus equivalent
- No horizontal overflow at 320px

---

## 8. Visual Foundations

### 8.1 Core colors

| Token | Dark | Light | Usage |
|---|---|---|---|
| canvas | #07080B | #F7F7F7 | page background |
| surface-1 | #0E1015 | #FFFFFF | cards / panels |
| surface-2 | #151820 | #F0F1F4 | nested surfaces |
| text-primary | #F7F7F7 | #0A0A0A | headings and body |
| text-muted | #999EAA | #626874 | secondary copy |
| border | rgba(255,255,255,.12) | rgba(10,10,10,.14) | structure |
| accent-lime | #C6FF00 | #76A800 when used as text | primary energy / CTA |
| accent-pink | #FF2DB7 | #C31183 when used as text | campaign / limited |
| cyan | #30EBDA | #087F78 | information / tracking |
| violet | #8C5CFF | #6140C8 | mystery / community |
| danger | #FF3D5A | #C6233F | destructive / failed |

**Rule:** Neon Lime / Pink แบบเต็มใช้กับ fills, outlines และ short labels; body text บน light theme ใช้ semantic darkened values ที่ผ่าน contrast review

### 8.2 Typography

- Display: **Sora** 700–800
- Body/UI: **Inter** 400–600
- Code/Data: **Space Mono** 400–700
- Fallback: system sans / ui-monospace

| Token | CSS | Line height | Use |
|---|---|---:|---|
| display-xl | `clamp(3.75rem,8vw,7.5rem)` | .88–.96 | hero only |
| display-lg | `clamp(2.75rem,6vw,5.75rem)` | .92 | campaign / drop |
| heading-1 | `clamp(2.25rem,4vw,4rem)` | 1.0 | page titles |
| heading-2 | `clamp(1.75rem,3vw,3rem)` | 1.08 | section titles |
| body-lg | 18px | 1.6 | intro copy |
| body | 16px | 1.55 | normal content |
| label | 12px | 1.2 | chips / controls |
| micro | 10px | 1.2 | non-critical metadata |

### 8.3 Spacing, radius, elevation

- Spacing primitive: 4px
- Main sequence: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 120, 150
- Control radius: 10–16px
- Card radius: 20–24px
- Feature panel: 28–36px
- Pill: 999px
- Use 1 elevation per hierarchy; do not stack multiple heavy shadows
- Blur is atmospheric and must not reduce text sharpness

### 8.4 Z-index contract

| Layer | Range |
|---|---:|
| Base content | 0–9 |
| Sticky content | 10–19 |
| Header / dock | 40–59 |
| Drawer / modal | 60–79 |
| Toast / cursor / debug | 90–109 |

---

## 9. Image, 3D and Placeholder Direction

### 9.1 Required placeholder library

- Product Hero — 16:9 / 3:2
- Square Product — 1:1
- Product Portrait — 4:5
- Wide Campaign — 3:1
- Gallery — 1:1 and 4:3
- Packaging — transparent PNG/WebP on stage
- Creator Avatar — 1:1 safe area
- Mobile Mockup — 9:19.5
- COA / Serial Card — 3:4

### 9.2 Art direction

- Product visuals use controlled studio light and one dominant color story
- Abstract neon objects must resemble a sellable product, not random generative art
- Every asset has dark and light surface compatibility
- Product image background cannot carry essential text
- Final export: AVIF/WebP + PNG only when transparency is required
- No visible legacy “ARTVERSE” naming

### 9.3 Loading strategy

- Hero image preload with responsive `srcset`
- Below-fold images `loading=lazy` and `decoding=async`
- Width/height or aspect-ratio required to prevent CLS
- Use low-quality placeholder / dominant color, not layout skeleton for product art

---

## 10. Motion Operating System

### 10.1 Motion families

| Family | Character | Primary use |
|---|---|---|
| Orbit | curved, gravitational | mascot, product path, background energy |
| Snap | fast, precise | button, tabs, filters, quantity |
| Squish | tactile compression | tap, add, save, mobile feedback |
| Float | slow, weighted | hero product and ambient objects |
| Warp | continuous spatial change | route, modal, shared element |
| Mischief | tiny playful offset | mascot, empty/error, microcopy |
| Reward | energy into destination | purchase, coupon, achievement |
| Lock | rotate and settle | COA, payment, security |

### 10.2 Duration tokens

| Token | Duration | Use |
|---|---:|---|
| instant | 120ms | visual confirmation |
| quick | 180ms | hover / tap / toggle |
| responsive | 280ms | cards / drawers / tabs |
| expressive | 480ms | overlay / shared transition |
| story | 800ms | section sequence |
| cinematic | 1200ms | hero / campaign reveal |

Easing:

```css
--ease-snap: cubic-bezier(.2,.9,.25,1);
--ease-orbit: cubic-bezier(.16,1,.3,1);
--ease-exit: cubic-bezier(.7,0,.84,0);
```

### 10.3 Motion constraints

- Animate transform and opacity first
- Layout animation must have stable start/end dimensions
- Maximum 3 continuous decorative loops visible on desktop; 1 on mobile
- Blur animation forbidden on mobile interaction path
- Scroll-linked transforms must clamp and never block scroll
- Every expressive branch implements reduced-motion alternative
- Do not animate price, stock or legal text in a way that delays comprehension

---

## 11. Story Motion Specifications

### 11.1 Hero / Enter the Verse

Sequence: atmosphere visible immediately → brand lockup 0–200ms → headline 120–600ms → product/Orbit 180–900ms → CTA 450–760ms. The page must remain actionable if animation is interrupted.

Desktop: pointer-reactive depth capped at 4° rotation and 12px translation.  
Mobile: no cursor tracking; use scroll/tilt impression with transform under 8px.

### 11.2 Product discovery

Cards reveal in 40–70ms stagger only when at least two cards are visible. Filter transition uses layout continuity; hidden cards are removed from focus order.

### 11.3 Add to cart

Source product compresses 0.96 → highlight travels to cart → count updates → toast announces result. Total feedback under 650ms; cart data updates immediately, animation is decorative.

### 11.4 COA lock

Searching state uses slow rotation; success uses one settle + lime state; failure stops and explains next action. No infinite spinner after request timeout.

### 11.5 Purchase reward

Confirm payment first, then reward animation. Confetti replacement: controlled particles / orbit trail with max 1.2s and no audio autoplay.

---

## 12. Custom Node Component System

Each Node is a Figma component family, an HTML contract, and a typed React component. Variants must use the same names across all layers.

### 12.1 OrbitPortal

**Purpose:** mascot/context surface for onboarding, loading, empty, success and error.  
**Anatomy:** stage, Orbit visual, orbit rings, title, support copy, actions, live status.  
**States:** idle, tracking, opening, loading, success, error, sleep.  
**HTML:** `section` or `aside`, `role=status` only for live feedback.  
**React:** `OrbitPortal({state,title,description,primaryAction,secondaryAction,reducedMotion})`.

### 12.2 ProductCapsule

**Anatomy:** visual stage, edition badge, product identity, creator, price, inventory, actions, save state.  
**Variants:** standard, featured, limited, preorder, sold-out, owned, mystery.  
**States:** default, hover/focus, selected, adding, added, unavailable, error.  
**Rule:** price and availability are never hover-only.

### 12.3 MagneticCTA

Desktop magnetic response within 14px radius; mobile uses squish only. Variants: primary, secondary, ghost, danger. States: idle, hover/focus, pressed, holding, loading, success, disabled.

### 12.4 DropReactor

Combines countdown, stock, edition limit, campaign copy and action. Timer must use server-derived end time. When expired, switch state atomically to ended / waitlist.

### 12.5 OrbitRail

Responsive product carousel with DOM order matching reading order. Keyboard arrows optional only when focus is inside; visible previous/next controls required.

### 12.6 WarpTabs

Uses shared active indicator and content transition. Implements `role=tablist`, arrow-key behavior, `aria-selected` and associated tabpanel.

### 12.7 LootReveal

Hold → charge → open → result. Must provide alternate simple button for reduced motion and keyboard users. Never used for paid result ambiguity.

### 12.8 CollectorPulse

Collection level, progress, reward and next milestone. Uses real numeric text in addition to visual ring.

### 12.9 SellerSignal

Operational signal with severity: info, attention, warning, critical. Every pulse is finite; critical state also has text/icon and is not color-only.

### 12.10 Supporting production components

SmartHeader, SearchCommand, FilterDock, CheckoutStepper, COALock, QuantityControl, PriceBlock, SellerTrustCard, ShippingTimeline, ReturnStatus, ToastStack, BottomOrbNav, EmptyState, ErrorBoundarySurface.

---

## 13. Core Component State Contract

| Component | Required states | Required accessibility |
|---|---|---|
| Button | default, hover, focus, pressed, loading, success, disabled | button semantics, visible focus, disabled state |
| Input | empty, filled, focus, valid, invalid, disabled, read-only | label, description, error association |
| Product card | default, focus, saved, adding, added, unavailable | article, logical heading, actionable controls |
| Modal/sheet | opening, open, closing | focus trap, return focus, escape |
| Toast | info, success, warning, error | polite/assertive live regions by severity |
| Skeleton | loading, timeout | hidden from AT; meaningful status outside |
| Tabs | default, selected, focus | full ARIA tabs pattern |
| Menu | closed, open | keyboard navigation and dismissal |

---

## 14. Page and Journey Requirements

### 14.1 Product detail

Above the fold must include product name, price, seller, availability, primary media, selected variant, quantity and primary CTA. Shipping/return/COA summary must appear before long description.

### 14.2 Cart and checkout

- Cart groups products by seller when marketplace rules differ
- Total breakdown is visible before payment
- Checkout is Address → Delivery → Payment → Review
- Preserve entered data after recoverable errors
- Double-submit protection on payment
- Success page shows order reference and tracking next action

### 14.3 Seller center

Operational clarity over decoration. Alerts use SellerSignal; destructive actions require confirmation and state consequences. Bulk operations show progress, failures and downloadable error report.

### 14.4 Admin

High-density screens use calm surfaces, sticky filters and audit context. No ambient mascot motion in moderation or risk workflows except static helper states.

---

## 15. Desktop Interaction Patterns

- Pointer attraction only for large CTA; never for form controls
- Product depth uses 3D transform under 4° and resets on leave/blur
- Hover reveals secondary action while all critical data remains visible
- Header compresses after scroll but preserves target size
- Command search opens with keyboard shortcut only when not conflicting with browser/AT
- Shared-element transition may connect product card to detail media; fallback is normal route change

---

## 16. Mobile Interaction Patterns

- BottomOrbNav for core destinations when application mode requires persistent navigation
- Swipe product rail with snap and visible progress
- Filter uses bottom sheet with Apply and Clear actions pinned in thumb zone
- Hold-to-confirm reserved for high-risk or loot interaction; normal purchase uses button
- Pull-to-refresh is optional; loading state must not depend on it
- Haptic spec is documented but implementation is progressive enhancement
- Touch targets minimum 44×44px; 48px preferred

---

## 17. Semantic HTML Implementation Contract

### 17.1 Structure

Use `header`, `nav`, `main`, `section`, `article`, `aside`, `footer`, real `button` and real links. Div-only implementation is rejected.

### 17.2 State

- Visual state: `data-state`, `data-variant`, `data-size`
- Selection: `aria-current`, `aria-selected`, checked inputs
- Disclosure: `aria-expanded`, `aria-controls`
- Feedback: `aria-live`, role status/alert by severity
- Native form validation enhanced, not replaced

### 17.3 Motion

- CSS transitions for local states
- Web Animations API for finite orchestrated sequences
- IntersectionObserver for reveal and lazy activation
- ResizeObserver only when layout-dependent behavior is unavoidable
- Clean up observers/listeners on removal

### 17.4 Progressive enhancement

Core browse, product detail, cart forms and content remain usable without expressive JavaScript. Motion does not gate navigation or checkout.

---

## 18. React + TypeScript Implementation Contract

### 18.1 Stack

- React 19 + TypeScript
- Vite build baseline
- `motion/react` for gestures, layout, presence and scroll-linked values
- Route-level code splitting for marketplace areas

### 18.2 Component rules

- Typed props; no `any` in public component API
- Controlled/uncontrolled behavior documented
- Stable keys from domain IDs
- Semantic DOM preserved inside motion wrappers
- Central motion config and `useReducedMotion`
- Business state separated from animation state
- Error boundaries around route and async domain surfaces

### 18.3 Example interface

```ts
export type ProductCapsuleVariant =
  | 'standard' | 'featured' | 'limited'
  | 'preorder' | 'sold-out' | 'owned' | 'mystery';

export interface ProductCapsuleProps {
  id: string;
  title: string;
  price: Money;
  image: ProductImage;
  seller: SellerSummary;
  availability: Availability;
  variant?: ProductCapsuleVariant;
  saved?: boolean;
  onAdd?: (id: string) => Promise<void>;
}
```

### 18.4 Build baseline

The current React prototype compiles successfully with Vite. Current production output is approximately **107.38 kB gzip JavaScript** and **4.22 kB gzip CSS**. Future modules must be route-split so the initial experience remains inside the performance budget.

---

## 19. Package Governance

| Need | Preferred | Rule |
|---|---|---|
| Component/state motion | Motion for React | default React motion layer |
| HTML local motion | CSS + WAAPI | no framework dependency |
| Complex scroll story | GSAP + ScrollTrigger | isolated story modules only |
| Interactive mascot | Rive | state machine, loaded on demand |
| Decorative loops | dotLottie | pause offscreen; no critical info |

- No two libraries solving the same local animation problem
- Optional libraries are dynamically imported
- Package version upgrades require visual regression and reduced-motion test
- Third-party component kit may provide primitives, but ARTYVERSE anatomy and styling remain custom

---

## 20. Accessibility and Inclusive Motion

- Target WCAG 2.2 AA
- One H1 per page; heading order logical
- Visible focus on every actionable control
- Keyboard reaches every action and can escape overlays
- Screen reader names include product and action context
- Color is never the only signal
- Error summary links to invalid fields
- `prefers-reduced-motion` disables orbit, parallax, continuous rotation and large shared transforms
- Reduced motion keeps state transitions via instant/dissolve feedback
- Avoid rapid flashing; no autoplay audio
- Thai and English copy must render with correct font fallback and line height

---

## 21. Performance Budgets

| Metric / asset | Target |
|---|---|
| LCP | ≤2.5s p75 representative mobile |
| INP | ≤200ms p75 |
| CLS | ≤0.10 |
| Initial JS | ≤170 kB gzip, excluding optional media engines |
| Route chunk | ≤70 kB gzip preferred |
| Hero visual | ≤350 kB mobile, ≤650 kB desktop preferred |
| Font payload | ≤100 kB initial subset |
| Main-thread long task | avoid >50ms during interaction |
| Active ambient loops | 3 desktop, 1 mobile |

Performance review is required on a throttled mobile profile. Lighthouse score alone is not acceptance evidence; inspect waterfall, CPU and real interaction.

---

## 22. SEO, Metadata and Social Sharing

- Unique title and description per indexable route
- Canonical URL, Open Graph and social image
- Structured data: Organization, Product, Offer, BreadcrumbList; seller data only when verified
- Product availability and price reflect server state
- Search/filter URLs have crawl strategy; avoid index explosion
- Semantic pagination or load-more fallback for infinite lists
- Images have descriptive alt text; decorative atmosphere uses empty alt

---

## 23. Data, Security and Transaction Integrity

- Server is source of truth for price, stock, discount, countdown and order status
- Never trust client quantity or total
- Idempotency key for payment/order submission
- CSRF protection appropriate to architecture
- Output encoding and sanitization for creator content
- CSP defined; no unsafe inline scripts in production without nonce strategy
- Do not store sensitive payment data in localStorage
- Session expiry and retry behavior are designed, not left to browser errors
- Audit logs for seller/admin high-impact actions

---

## 24. Analytics and Experimentation

Required event families:

- discovery: `view_item_list`, `select_item`, `search`, `filter_apply`
- product: `view_item`, `save_item`, `view_seller`, `verify_coa`
- commerce: `add_to_cart`, `remove_from_cart`, `begin_checkout`, `add_shipping_info`, `add_payment_info`, `purchase`
- campaign: `view_promotion`, `select_promotion`, `drop_waitlist`
- account/seller: `return_request`, `message_send`, `product_publish`, `payout_view`

Events include stable IDs and context; never send private free-text or payment secrets. Animation impressions are not analytics events unless tied to a business question.

---

## 25. Figma Production Structure and Handoff

Because Starter file pages are limited, organize into three pages with sections:

1. **WPX OS / ARTYVERSE Foundations** — brand, variables, typography, effects, motion language, custom nodes
2. **E‑Marketplace Desktop System** — Storefront, Account, Seller, Admin
3. **E‑Marketplace Mobile & Flow** — mobile screens, responsive rules, prototype flows

### Required Figma practices

- Auto Layout for structural relationships
- Variables for color, spacing, radius, typography where supported
- Component properties and variants use code-aligned naming
- Layer names are meaningful; no `Frame 123` in handoff
- Component descriptions include HTML tag and React mapping
- Prototype examples include default and reduced motion
- Every key section gets screenshot QA before handoff
- Code Connect mapping added after component APIs stabilize

---

## 26. QA Matrix

### 26.1 Automated

- TypeScript strict build
- ESLint / formatter
- Unit tests for state transitions and formatters
- Component interaction tests
- axe accessibility checks
- Playwright E2E for browse → cart → checkout → success and error recovery
- Visual regression at 390, 768, 1280 and 1440 widths
- Bundle size and performance budget check in CI

### 26.2 Manual

- Keyboard-only journey
- Screen reader smoke test
- 200% zoom and text spacing
- Reduced motion
- Slow 4G / offline / request timeout
- Touch device without hover
- Long Thai/English names, prices and addresses
- Empty, one-item, many-item and sold-out data
- Payment retry and double-click prevention

### 26.3 Browser support

Current stable and previous major versions of Chrome, Edge, Firefox and Safari; iOS Safari and Android Chrome representative devices. Graceful fallback required for unsupported visual APIs.

---

## 27. Definition of Done

A screen or component is done only when:

- Design, responsive and all required states exist
- Copy is real or production-shaped, not lorem ipsum
- Image/asset has final ratio, alt and loading behavior
- Keyboard/focus/semantics verified
- Reduced motion verified
- Loading, empty, error, success and offline behavior defined where relevant
- HTML and React mapping documented
- Analytics event and data requirements documented
- Visual regression approved
- Performance budget has no regression
- No legacy ARTVERSE naming
- Product owner, design and engineering acceptance complete

---

## Appendix A — Token Starter

```css
:root {
  --color-canvas: #07080b;
  --color-surface-1: #0e1015;
  --color-surface-2: #151820;
  --color-text: #f7f7f7;
  --color-muted: #999eaa;
  --color-lime: #c6ff00;
  --color-pink: #ff2db7;
  --color-cyan: #30ebda;
  --color-violet: #8c5cff;
  --radius-control: 14px;
  --radius-card: 22px;
  --radius-feature: 32px;
  --duration-quick: 180ms;
  --duration-responsive: 280ms;
  --duration-expressive: 480ms;
  --ease-snap: cubic-bezier(.2,.9,.25,1);
  --ease-orbit: cubic-bezier(.16,1,.3,1);
}
```

## Appendix B — Release Blockers

- Legacy ARTVERSE text in product visuals, source code, metadata or Figma
- Checkout action without double-submit protection
- Motion without reduced-motion branch
- Critical action available only on hover
- Missing focus or keyboard escape from overlay
- Product image without dimensions/aspect ratio
- Price/stock/countdown sourced only from client
- Horizontal overflow at 320px
- Visual asset or copy that looks like a generic template

## Appendix C — Final Experience Review Prompt

Before release, reviewers answer:

1. เปิดมาแล้วจำได้ไหมว่าเป็น ARTYVERSE X โดยไม่เห็นชื่อ?
2. สิ่งที่ว้าวช่วยสินค้าและเรื่องราว หรือแค่โชว์ effect?
3. ผู้ใช้ซื้อของได้เร็วพอเมื่อไม่สนใจ animation หรือไม่?
4. Mobile ให้ความรู้สึกออกแบบเฉพาะ ไม่ใช่ desktop ที่ถูกบีบหรือไม่?
5. ทุก state ดูตั้งใจเท่ากับ happy path หรือไม่?
6. HTML, React และ Figma ใช้ภาษา component/state เดียวกันหรือไม่?
7. ถ้าปิด motion งานยังดู premium และใช้งานครบหรือไม่?

**Final lock:** งานที่ “สวยแต่ใช้ไม่ได้”, “ใช้ได้แต่จำไม่ได้” หรือ “ว้าวแต่ช้า” ยังไม่ถือว่าเสร็จ

## Appendix E — Production Sign-off

Release approval ต้องมีหลักฐานจากแต่ละ discipline:

| Owner | Required evidence | Approval gate |
|---|---|---|
| Product | Journey acceptance, scope and business rules | All P0 journeys accepted |
| Design | Responsive, states, motion, visual regression | 90/100 quality score; no blocker |
| Frontend | Build, semantics, component API, bundle report | CI green and budgets pass |
| Backend / Commerce | Price, stock, order, payment integrity | Server source of truth verified |
| QA | E2E, browser, data edge cases | No P0/P1 defect |
| Accessibility | Keyboard, screen reader, reduced motion | WCAG 2.2 AA target evidence |
| Performance | CWV lab + representative profile | Budgets pass or approved exception |
| Security | CSP, session, sanitization, audit | No open critical/high issue |
| Content | Thai/English copy, legal, metadata | Production copy signed off |
