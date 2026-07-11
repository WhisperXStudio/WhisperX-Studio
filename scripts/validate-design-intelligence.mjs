import fs from "node:fs"

const dataset = JSON.parse(fs.readFileSync("data/ui-ux-pro-max.json", "utf8"))
const registry = JSON.parse(fs.readFileSync("data/whisperx-registry.json", "utf8"))

const requiredFiles = [
  ".codex/skills/ui-ux-pro-max/SKILL.md",
  ".codex/skills/ui-ux-pro-max/LICENSE",
  ".agents/skills/ui-ux-pro-max/SKILL.md",
  "lib/design-intelligence.ts",
  "app/api/design-intelligence/route.ts",
  "app/design-intelligence/page.tsx",
  "components/studio/design-intelligence-workbench.tsx",
]

for (const file of requiredFiles) {
  if (!fs.existsSync(file)) throw new Error(`design intelligence integration is missing ${file}`)
}

if (dataset.schemaVersion !== "1.0.0") throw new Error("unexpected design intelligence schema version")
if (dataset.source?.name !== "UI/UX Pro Max") throw new Error("design intelligence source is not UI/UX Pro Max")
if (dataset.source?.version !== "2.6.2") throw new Error("UI UX Pro Max source version is not pinned")
if (dataset.source?.license !== "MIT") throw new Error("UI UX Pro Max license metadata is missing")

const minimums = {
  profiles: 10,
  patterns: 9,
  styles: 12,
  palettes: 10,
  typography: 7,
  rules: 10,
  stacks: 5,
}

for (const [group, minimum] of Object.entries(minimums)) {
  if (!Array.isArray(dataset[group]) || dataset[group].length < minimum) {
    throw new Error(`${group} requires at least ${minimum} records`)
  }
}

const ids = (group) => new Set(dataset[group].map((entry) => entry.id))
const patternIds = ids("patterns")
const styleIds = ids("styles")
const paletteIds = ids("palettes")
const typographyIds = ids("typography")

for (const profile of dataset.profiles) {
  if (!patternIds.has(profile.patternId)) throw new Error(`profile:${profile.id} references missing pattern:${profile.patternId}`)
  if (!paletteIds.has(profile.paletteId)) throw new Error(`profile:${profile.id} references missing palette:${profile.paletteId}`)
  if (!typographyIds.has(profile.typographyId)) throw new Error(`profile:${profile.id} references missing typography:${profile.typographyId}`)
  for (const styleId of profile.styleIds) {
    if (!styleIds.has(styleId)) throw new Error(`profile:${profile.id} references missing style:${styleId}`)
  }
  if (!profile.checklist?.length || !profile.avoid?.length) throw new Error(`profile:${profile.id} requires checklist and anti-pattern guidance`)
}

const priorities = dataset.rules.map((rule) => rule.priority).sort((a, b) => a - b)
if (priorities.join(",") !== "1,2,3,4,5,6,7,8,9,10") throw new Error("quality-rule priorities must cover 1 through 10")

const skill = registry.skills.find((entry) => entry.id === "ui-ux-pro-max")
if (!skill || skill.status !== "CONNECTED") throw new Error("ui-ux-pro-max is not CONNECTED in the studio registry")
const workbench = registry.library.find((entry) => entry.id === "design-intelligence-workbench")
if (!workbench || workbench.status !== "CONNECTED") throw new Error("design intelligence workbench is not CONNECTED in the studio registry")

const canonicalSkill = fs.readFileSync(".codex/skills/ui-ux-pro-max/SKILL.md", "utf8")
for (const marker of ["UI UX Pro Max", "data/ui-ux-pro-max.json", "pnpm validate", "MIT"]) {
  if (!canonicalSkill.includes(marker)) throw new Error(`canonical skill is missing marker: ${marker}`)
}

console.log(`design-intelligence-ok profiles=${dataset.profiles.length} styles=${dataset.styles.length} palettes=${dataset.palettes.length} rules=${dataset.rules.length}`)
