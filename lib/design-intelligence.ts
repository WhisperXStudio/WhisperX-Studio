import intelligence from "@/data/ui-ux-pro-max.json"

export type DesignIntelligenceInput = {
  brief: string
  productType?: string
  stack?: string
}

export type DesignRecommendation = {
  source: typeof intelligence.source
  profile: (typeof intelligence.profiles)[number]
  pattern: (typeof intelligence.patterns)[number]
  styles: Array<(typeof intelligence.styles)[number]>
  palette: (typeof intelligence.palettes)[number]
  typography: (typeof intelligence.typography)[number]
  rules: Array<(typeof intelligence.rules)[number]>
  stack: (typeof intelligence.stacks)[number]
  confidence: number
  matchedTerms: string[]
  generatedAt: string
}

function normalize(value: string) {
  return value.trim().toLowerCase().replace(/[^\p{L}\p{N}+#.-]+/gu, " ")
}

function tokens(value: string) {
  return new Set(normalize(value).split(/\s+/).filter((token) => token.length > 1))
}

function scoreText(query: string, keywords: readonly string[], label: string) {
  const normalizedQuery = normalize(query)
  const queryTokens = tokens(query)
  let score = normalizedQuery.includes(normalize(label)) ? 12 : 0
  const matched: string[] = []

  for (const keyword of keywords) {
    const normalizedKeyword = normalize(keyword)
    if (normalizedQuery.includes(normalizedKeyword)) {
      score += normalizedKeyword.includes(" ") ? 8 : 5
      matched.push(keyword)
      continue
    }

    const keywordTokens = [...tokens(keyword)]
    const overlap = keywordTokens.filter((token) => queryTokens.has(token)).length
    if (overlap > 0) {
      score += overlap * 2
      matched.push(keyword)
    }
  }

  return { score, matched }
}

function findRequired<T extends { id: string }>(items: readonly T[], id: string, label: string): T {
  const match = items.find((item) => item.id === id)
  if (!match) throw new Error(`UI UX Pro Max dataset is missing ${label}:${id}`)
  return match
}

export function recommendDesign(input: DesignIntelligenceInput): DesignRecommendation {
  const query = [input.brief, input.productType, input.stack].filter(Boolean).join(" ")
  const ranked = intelligence.profiles
    .map((profile) => {
      const result = scoreText(query, profile.keywords, `${profile.id} ${profile.name}`)
      const explicitProduct = input.productType ? normalize(input.productType) : ""
      const explicitMatch = explicitProduct && [profile.id, profile.name].some((value) => normalize(value).includes(explicitProduct) || explicitProduct.includes(normalize(value)))
      return {
        profile,
        score: result.score + (explicitMatch ? 24 : 0),
        matched: result.matched,
      }
    })
    .sort((a, b) => b.score - a.score)

  const winner = ranked[0] ?? {
    profile: intelligence.profiles[0],
    score: 0,
    matched: [] as string[],
  }

  const profile = winner.profile
  const pattern = findRequired(intelligence.patterns, profile.patternId, "pattern")
  const styles = profile.styleIds.map((id) => findRequired(intelligence.styles, id, "style"))
  const palette = findRequired(intelligence.palettes, profile.paletteId, "palette")
  const typography = findRequired(intelligence.typography, profile.typographyId, "typography")
  const requestedStack = normalize(input.stack ?? "nextjs")
  const stack = intelligence.stacks.find((entry) => normalize(entry.id) === requestedStack || normalize(entry.name).includes(requestedStack)) ?? intelligence.stacks[0]
  const maximum = Math.max(...ranked.map((entry) => entry.score), 1)
  const confidence = Math.min(0.99, Math.max(0.35, winner.score / (maximum + 4)))

  return {
    source: intelligence.source,
    profile,
    pattern,
    styles,
    palette,
    typography,
    rules: intelligence.rules.filter((rule) => rule.priority <= 7),
    stack,
    confidence: Number(confidence.toFixed(2)),
    matchedTerms: [...new Set(winner.matched)].slice(0, 12),
    generatedAt: new Date().toISOString(),
  }
}

export function getDesignIntelligenceCatalog() {
  return intelligence
}
