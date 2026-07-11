import fs from "node:fs"

const requiredRoutes = [
  "app/page.tsx",
  "app/marketplace/page.tsx",
  "app/marketplace/[slug]/page.tsx",
  "app/design-intelligence/page.tsx",
  "app/import/page.tsx",
  "app/library/page.tsx",
  "app/preview/page.tsx",
  "app/export/page.tsx",
  "app/install/page.tsx",
  "app/studio/page.tsx",
]

for (const route of requiredRoutes) {
  if (!fs.existsSync(route)) throw new Error(`missing required route ${route}`)
}

const css = fs.readFileSync("app/globals.css", "utf8")
const layout = fs.readFileSync("app/layout.tsx", "utf8")
const nav = fs.readFileSync("components/marketplace/marketplace-nav.tsx", "utf8")
const footer = fs.readFileSync("components/marketplace/marketplace-footer.tsx", "utf8")
const catalog = fs.readFileSync("components/marketplace/catalog-browser.tsx", "utf8")
const skill = fs.readFileSync(".codex/skills/ui-ux-pro-max/SKILL.md", "utf8")

const cssRequirements = [
  "--control-height",
  "--signal-soft",
  ".skip-link",
  ".ui-eyebrow",
  ".ui-action",
  ".ui-field",
  ".mobile-nav-strip",
  "button[aria-label]",
  "@media (prefers-reduced-motion: reduce)",
  ".dark [class~='bg-white']",
]

for (const marker of cssRequirements) {
  if (!css.includes(marker)) throw new Error(`global UI system is missing ${marker}`)
}

if (!layout.includes('href="#main-content"')) throw new Error("root layout is missing skip navigation")
if (!layout.includes("whisperx-theme")) throw new Error("root layout is missing theme bootstrap")
if (!nav.includes("usePathname")) throw new Error("navigation does not expose active route context")
if (!nav.includes("aria-current")) throw new Error("navigation does not expose aria-current")
if (!nav.includes("ThemeToggle")) throw new Error("navigation is missing the theme control")
if (!nav.includes("mobile-nav-strip")) throw new Error("navigation is missing the touch-friendly mobile strip")
if (!footer.includes("Design Intelligence")) throw new Error("footer is missing design intelligence navigation")
if (!catalog.includes("aria-pressed")) throw new Error("catalog filters do not expose selected state")
if (!catalog.includes('aria-live="polite"')) throw new Error("catalog results do not announce changes")
if (!catalog.includes("min-h-11")) throw new Error("catalog controls do not preserve 44px touch targets")
if (!skill.includes("Accessibility: contrast, keyboard")) throw new Error("UI UX Pro Max priority rules are unavailable")

console.log(`ui-system-ok routes=${requiredRoutes.length} theme=light-dark navigation=active accessibility=connected responsive=connected`)
