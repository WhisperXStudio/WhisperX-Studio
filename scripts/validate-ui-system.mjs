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
const palmerCss = fs.readFileSync("app/palmer-system.css", "utf8")
const parityCss = fs.readFileSync("app/palmer-parity.css", "utf8")
const marketCss = fs.readFileSync("app/palmer-marketplace.css", "utf8")
const layout = fs.readFileSync("app/layout.tsx", "utf8")
const home = fs.readFileSync("components/palmer/palmer-home-experience.tsx", "utf8")
const marketHero = fs.readFileSync("components/palmer/palmer-marketplace-hero.tsx", "utf8")
const moduleHero = fs.readFileSync("components/palmer/palmer-module-hero.tsx", "utf8")
const nav = fs.readFileSync("components/marketplace/marketplace-nav.tsx", "utf8")
const footer = fs.readFileSync("components/marketplace/marketplace-footer.tsx", "utf8")
const catalog = fs.readFileSync("components/marketplace/catalog-browser.tsx", "utf8")
const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"))
const skill = fs.readFileSync(".codex/skills/ui-ux-pro-max/SKILL.md", "utf8")
const references = JSON.parse(fs.readFileSync("data/design-references.json", "utf8"))

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

const parityRequirements = [
  ".palmer-hero-stage",
  ".palmer-profile-stage",
  ".palmer-works-stage",
  ".palmer-capabilities-stage",
  ".palmer-practice-stage",
  ".palmer-module-hero",
  "@media (prefers-reduced-motion: reduce)",
]

for (const marker of parityRequirements) {
  if (!parityCss.includes(marker)) throw new Error(`Palmer parity layer is missing ${marker}`)
}

const marketRequirements = [
  ".palmer-market-hero",
  ".palmer-market-facts",
  ".palmer-market-intro",
  ".palmer-market-import-cta",
  "#catalog",
]

for (const marker of marketRequirements) {
  if (!marketCss.includes(marker)) throw new Error(`Palmer marketplace layer is missing ${marker}`)
}

if (!palmerCss.includes(".palmer-rolling-link")) throw new Error("rolling-link foundation is missing")
if (!layout.includes('href="#page-content"')) throw new Error("root layout is missing skip navigation")
if (!layout.includes("whisperx-theme")) throw new Error("root layout is missing theme bootstrap")
if (!layout.includes("Inter_Tight")) throw new Error("root layout is missing the tight display typeface")
if (!layout.includes('import "./palmer-parity.css"')) throw new Error("root layout is missing the Palmer parity layer")
if (!layout.includes('import "./palmer-marketplace.css"')) throw new Error("root layout is missing the marketplace composition layer")
if (packageJson.dependencies?.motion !== "12.42.2") throw new Error("Motion for React is not pinned")
if (!home.includes('from "motion/react"')) throw new Error("home experience is not using Motion for React")
if (!home.includes("useScroll")) throw new Error("home experience is missing scroll-linked motion")
if (!home.includes("useReducedMotion")) throw new Error("home experience is missing reduced-motion support")
if (!marketHero.includes('from "motion/react"')) throw new Error("marketplace hero is not using Motion for React")
if (!catalog.includes("AnimatePresence")) throw new Error("catalog layout changes are not animated with Motion")
if (!catalog.includes("layout")) throw new Error("catalog cards are missing layout animation")
if (!moduleHero.includes("palmer-module-hero")) throw new Error("module hero system is missing")
if (!nav.includes('id="page-content"')) throw new Error("navigation is missing the post-header skip target")
if (!nav.includes("usePathname")) throw new Error("navigation does not expose active route context")
if (!nav.includes("aria-current")) throw new Error("navigation does not expose aria-current")
if (!nav.includes("ThemeToggle")) throw new Error("navigation is missing the theme control")
if (!nav.includes("palmer-rolling-link")) throw new Error("navigation is missing rolling text interaction")
if (!nav.includes("layoutId")) throw new Error("navigation is missing shared active-state motion")
if (!footer.includes("Design Intelligence")) throw new Error("footer is missing design intelligence navigation")
if (!footer.includes("palmer-footer")) throw new Error("footer is missing the Palmer closing stage")
if (!catalog.includes("aria-pressed")) throw new Error("catalog filters do not expose selected state")
if (!catalog.includes('aria-live="polite"')) throw new Error("catalog results do not announce changes")
if (!catalog.includes("min-h-11")) throw new Error("catalog controls do not preserve 44px touch targets")
if (!skill.includes("Accessibility: contrast, keyboard")) throw new Error("UI UX Pro Max priority rules are unavailable")

const palmerReference = references.references?.find((entry) => entry.id === "palmer-editorial-motion")
if (!palmerReference) throw new Error("Palmer design reference is not registered")
if (palmerReference.status !== "CONNECTED") throw new Error("Palmer design reference is not connected")
if (palmerReference.copiedCode || palmerReference.copiedAssets) throw new Error("external code or assets must not be copied")

console.log(`ui-system-ok routes=${requiredRoutes.length} motion=connected parity=connected modules=connected accessibility=connected responsive=connected`)
