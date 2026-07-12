import fs from "node:fs"

const systemCss = fs.readFileSync("app/artyverse-system.css", "utf8")
const layout = fs.readFileSync("app/layout.tsx", "utf8")
const experience = fs.readFileSync("components/artyverse/artyverse-experience-system.tsx", "utf8")
const motion = fs.readFileSync("lib/artyverse/motion-system.ts", "utf8")
const catalog = JSON.parse(fs.readFileSync("data/marketplace-catalog.json", "utf8"))

const requiredTokens = [
  "--av-canvas: #07080b",
  "--av-text: #f7f7f7",
  "--av-lime: #c6ff00",
  "--av-pink: #ff2db7",
  "--av-cyan: #30ebda",
  "--av-violet: #8c5cff",
  "--av-grid-columns: 12",
  "--av-instant: 120ms",
  "--av-cinematic: 1200ms",
]

const requiredSystemMarkers = [
  ".artyverse-container",
  ".artyverse-grid",
  ".av-control",
  ".av-button--primary",
  ".av-card",
  ".av-orbit-field",
  "@media (max-width: 1023px)",
  "@media (max-width: 767px)",
  "@media (prefers-reduced-motion: reduce)",
]

for (const marker of [...requiredTokens, ...requiredSystemMarkers]) {
  if (!systemCss.includes(marker)) throw new Error(`ARTYVERSE design system is missing ${marker}`)
}

const motionFamilies = ["orbit", "snap", "squish", "float", "warp", "mischief", "reward", "lock"]
for (const family of motionFamilies) {
  if (!motion.includes(`${family}:`)) throw new Error(`ARTYVERSE motion contract is missing ${family}`)
}

if (!layout.includes("Sora")) throw new Error("Sora display typography is not connected")
if (!layout.includes("Inter")) throw new Error("Inter body typography is not connected")
if (!layout.includes("Space_Mono")) throw new Error("Space Mono data typography is not connected")
if (!layout.includes("Noto_Sans_Thai")) throw new Error("Thai typography fallback is not connected")
if (!layout.includes('import "./artyverse-system.css"')) throw new Error("ARTYVERSE system layer is not loaded")
if (!layout.includes("<ArtyverseExperienceSystem>")) throw new Error("ARTYVERSE route experience is not connected")
if (!experience.includes('from "motion/react"')) throw new Error("ARTYVERSE motion runtime is missing")
if (!experience.includes('window.addEventListener("offline"')) throw new Error("Offline capability status is missing")
if (!Array.isArray(catalog.categories) || !Array.isArray(catalog.items)) throw new Error("Marketplace catalog cannot drive ARTYVERSE surfaces")

console.log(`artyverse-design-system-ok grid=12/8/4 motion=${motionFamilies.length} categories=${catalog.categories.length} items=${catalog.items.length}`)
