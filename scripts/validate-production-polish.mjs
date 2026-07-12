import fs from "node:fs"

const requiredFiles = [
  "WHISPERX_ARTIFACT_FULL_HTML_FIRST_LOCK.md",
  "WHISPERX_PRODUCTION_READY_SYSTEM_POLISH_LOCK.md",
  "artifacts/full-html/system-production-polish-v1/index.html",
  "artifacts/full-html/system-production-polish-v1/ARTIFACT_REPORT.md",
  "artifacts/full-html/system-production-polish-v1/STATE_MATRIX.md",
  "artifacts/full-html/system-production-polish-v1/COMPONENT_INVENTORY.md",
  "artifacts/full-html/system-production-polish-v1/PRODUCTION_COMPARISON.md",
  "artifacts/full-html/system-production-polish-v1/screenshots/desktop-1440.png",
  "artifacts/full-html/system-production-polish-v1/screenshots/tablet-1024.png",
  "artifacts/full-html/system-production-polish-v1/screenshots/mobile-390.png",
  "artifacts/full-html/system-production-polish-v1/screenshots/light.png",
  "artifacts/full-html/system-production-polish-v1/screenshots/dark.png",
  "artifacts/full-html/system-production-polish-v1/screenshots/reduced-motion.png",
  "artifacts/full-html/artyverse-x-integration-v1/index.html",
  "artifacts/full-html/artyverse-x-integration-v1/styles.css",
  "artifacts/full-html/artyverse-x-integration-v1/app.js",
  "artifacts/full-html/artyverse-x-integration-v1/ARTIFACT_REPORT.md",
  "artifacts/full-html/artyverse-x-integration-v1/STATE_MATRIX.md",
  "artifacts/full-html/artyverse-x-integration-v1/COMPONENT_INVENTORY.md",
  "components/system/production-state.tsx",
  "components/system/route-experience.tsx",
  "components/verse/verse-experience.tsx",
  "components/verse/verse.module.css",
  "app/production-polish.css",
  "app/loading.tsx",
  "app/error.tsx",
  "app/not-found.tsx",
]

for (const file of requiredFiles) {
  if (!fs.existsSync(file)) throw new Error(`missing production-polish file: ${file}`)
}

const layout = fs.readFileSync("app/layout.tsx", "utf8")
const hero = fs.readFileSync("components/palmer/palmer-module-hero.tsx", "utf8")
const states = fs.readFileSync("components/system/production-state.tsx", "utf8")
const routeExperience = fs.readFileSync("components/system/route-experience.tsx", "utf8")
const css = fs.readFileSync("app/production-polish.css", "utf8")
const library = fs.readFileSync("components/marketplace/local-library.tsx", "utf8")
const install = fs.readFileSync("components/marketplace/install-center.tsx", "utf8")
const artifact = fs.readFileSync("artifacts/full-html/system-production-polish-v1/ARTIFACT_REPORT.md", "utf8")
const verseArtifact = fs.readFileSync("artifacts/full-html/artyverse-x-integration-v1/ARTIFACT_REPORT.md", "utf8")
const verse = fs.readFileSync("components/verse/verse-experience.tsx", "utf8")
const nav = fs.readFileSync("components/marketplace/marketplace-nav.tsx", "utf8")

const requiredRoutes = [
  "app/page.tsx",
  "app/marketplace/page.tsx",
  "app/marketplace/[slug]/page.tsx",
  "app/design-intelligence/page.tsx",
  "app/verse/page.tsx",
  "app/import/page.tsx",
  "app/library/page.tsx",
  "app/preview/page.tsx",
  "app/export/page.tsx",
  "app/install/page.tsx",
  "app/studio/page.tsx",
]
for (const route of requiredRoutes) {
  if (!fs.existsSync(route)) throw new Error(`missing system route: ${route}`)
}

const assertions = [
  [layout.includes('import "./production-polish.css"'), "production polish CSS is not connected"],
  [layout.includes("<RouteExperience />"), "route experience is not connected"],
  [layout.includes('id="page-content"'), "skip-link target is missing"],
  [hero.includes("ProductionReadinessBand"), "module readiness band is missing"],
  [states.includes("ProductionStateTone"), "typed production states are missing"],
  [routeExperience.includes('window.addEventListener("offline"'), "offline recovery signal is missing"],
  [css.includes("@media (prefers-reduced-motion: reduce)"), "reduced-motion production fallback is missing"],
  [css.includes("--state-ready"), "semantic production state tokens are missing"],
  [library.includes('aria-live="polite"'), "library live feedback is missing"],
  [library.includes("storageAvailable"), "library storage fallback is missing"],
  [install.includes("InstallProgress"), "install progress evidence is missing"],
  [install.includes("downloadRecoveryManifest"), "install recovery manifest is missing"],
  [artifact.includes("ARTIFACT PASS"), "artifact has not passed its gate"],
  [verseArtifact.includes("ARTIFACT PASS"), "Verse integration artifact has not passed its gate"],
  [verse.includes('from "motion/react"'), "Verse motion integration is missing"],
  [verse.includes("getMarketplaceItems") === false, "Verse client component must receive existing catalog data instead of creating a duplicate catalog"],
  [nav.includes('href: "/verse"'), "Verse route is not exposed in shared navigation"],
]

for (const [passes, message] of assertions) {
  if (!passes) throw new Error(message)
}

for (const path of requiredFiles.filter((file) => file.endsWith(".png"))) {
  const size = fs.statSync(path).size
  if (size < 1_000) throw new Error(`render evidence is unexpectedly small: ${path}`)
}

console.log(`production-polish-ok routes=${requiredRoutes.length} evidence=${requiredFiles.length} states=8 verse=integrated`)
