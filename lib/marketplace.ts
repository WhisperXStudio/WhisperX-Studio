import { z } from "zod"
import rawCatalog from "@/data/marketplace-catalog.json"
import type {
  ImportedMarketplaceRecord,
  MarketplaceCatalog,
  MarketplaceFile,
  MarketplaceItem,
  MarketplaceItemType,
} from "@/types/marketplace"

const fileSchema = z.object({
  path: z.string().min(1),
  language: z.enum(["tsx", "ts", "css", "json", "md", "html", "txt"]),
  content: z.string(),
})

const previewSchema = z.object({
  kind: z.enum(["hero", "section", "gallery", "dashboard", "component", "motion", "design-system"]),
  title: z.string().min(1),
  eyebrow: z.string().min(1),
  description: z.string().min(1),
  accent: z.string().min(1),
  background: z.string().min(1),
  highlights: z.array(z.string()),
})

const itemSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  name: z.string().min(1),
  summary: z.string().min(1),
  description: z.string().min(1),
  type: z.enum(["marketing", "gallery", "section", "component", "template", "motion", "design-system", "skill", "agent"]),
  status: z.enum(["PUBLISHED", "DRAFT", "IMPORTED", "VALIDATED", "PARTIAL", "BLOCKED"]),
  categoryId: z.string().min(1),
  subcategoryId: z.string().min(1),
  tags: z.array(z.string()),
  author: z.object({ name: z.string(), handle: z.string(), verified: z.boolean() }),
  pricing: z.object({ amount: z.number().nonnegative(), currency: z.enum(["USD", "THB"]), license: z.enum(["FREE", "COMMERCIAL", "ENTERPRISE"]) }),
  rating: z.number().min(0).max(5),
  reviews: z.number().int().nonnegative(),
  downloads: z.number().int().nonnegative(),
  featured: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
  compatibility: z.array(z.string()),
  dependencies: z.array(z.string()),
  capabilities: z.array(z.string()),
  preview: previewSchema,
  files: z.array(fileSchema).min(1),
  source: z.object({ kind: z.enum(["native", "file", "url", "generated"]), value: z.string() }),
})

const catalogSchema = z.object({
  schemaVersion: z.string(),
  generatedAt: z.string(),
  categories: z.array(z.object({
    id: z.string(),
    slug: z.string(),
    name: z.string(),
    description: z.string(),
    icon: z.string(),
    subcategories: z.array(z.object({ id: z.string(), slug: z.string(), name: z.string(), description: z.string() })),
  })),
  items: z.array(itemSchema),
})

const parsedCatalog = catalogSchema.parse(rawCatalog) as MarketplaceCatalog

export function getMarketplaceCatalog(): MarketplaceCatalog {
  return parsedCatalog
}

export function getMarketplaceItems(): MarketplaceItem[] {
  return parsedCatalog.items
}

export function getMarketplaceItem(slugOrId: string): MarketplaceItem | undefined {
  return parsedCatalog.items.find((item) => item.slug === slugOrId || item.id === slugOrId)
}

export function getFeaturedMarketplaceItems(limit = 6): MarketplaceItem[] {
  return parsedCatalog.items.filter((item) => item.featured).slice(0, limit)
}

export function getRelatedMarketplaceItems(item: MarketplaceItem, limit = 4): MarketplaceItem[] {
  return parsedCatalog.items
    .filter((candidate) => candidate.id !== item.id && (candidate.categoryId === item.categoryId || candidate.tags.some((tag) => item.tags.includes(tag))))
    .sort((a, b) => Number(b.categoryId === item.categoryId) - Number(a.categoryId === item.categoryId))
    .slice(0, limit)
}

export function formatMarketplacePrice(item: MarketplaceItem): string {
  if (item.pricing.amount === 0) return "Free"
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: item.pricing.currency,
    maximumFractionDigits: 0,
  }).format(item.pricing.amount)
}

export function isSafeMarketplacePath(path: string): boolean {
  if (!path || path.startsWith("/") || path.startsWith("\\")) return false
  const normalized = path.replaceAll("\\", "/")
  return !normalized.split("/").some((segment) => segment === ".." || segment === "" || segment.startsWith("."))
}

export function sanitizeMarketplaceFiles(files: MarketplaceFile[]): MarketplaceFile[] {
  return files.filter((file) => isSafeMarketplacePath(file.path))
}

function slugify(input: string): string {
  const slug = input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
  return slug || `import-${Date.now()}`
}

function detectLanguage(filename: string, contentType = ""): MarketplaceFile["language"] {
  const extension = filename.split(".").pop()?.toLowerCase()
  if (extension === "tsx") return "tsx"
  if (extension === "ts") return "ts"
  if (extension === "css") return "css"
  if (extension === "json" || contentType.includes("json")) return "json"
  if (extension === "md" || extension === "markdown") return "md"
  if (extension === "html" || extension === "htm" || contentType.includes("html")) return "html"
  return "txt"
}

function detectItemType(filename: string, content: string): MarketplaceItemType {
  const sample = `${filename} ${content.slice(0, 500)}`.toLowerCase()
  if (sample.includes("design token") || sample.includes("--color-") || sample.includes("tailwind")) return "design-system"
  if (sample.includes("agent") || sample.includes("workflow")) return "agent"
  if (sample.includes("gallery") || sample.includes("image")) return "gallery"
  if (sample.includes("hero") || sample.includes("campaign") || sample.includes("marketing")) return "marketing"
  if (sample.includes("motion") || sample.includes("keyframes") || sample.includes("animation")) return "motion"
  if (sample.includes("template") || sample.includes("page")) return "template"
  return "component"
}

export function normalizeImportedMarketplaceItem(input: {
  sourceType: "file" | "url" | "paste"
  sourceName: string
  content: string
  contentType?: string
}): ImportedMarketplaceRecord {
  const now = new Date().toISOString()
  const safeName = input.sourceName.split(/[\\/]/).pop() || "imported-item.txt"
  const language = detectLanguage(safeName, input.contentType)
  const type = detectItemType(safeName, input.content)
  const baseName = safeName.replace(/\.[^.]+$/, "") || "Imported item"
  const slug = slugify(baseName)
  const categoryId = type === "marketing" ? "marketing" : type === "gallery" || type === "motion" ? "gallery" : type === "design-system" ? "design" : type === "agent" || type === "skill" ? "automation" : type === "template" ? "templates" : "components"
  const subcategoryId = type === "marketing" ? "launch" : type === "gallery" ? "editorial" : type === "motion" ? "motion-gallery" : type === "design-system" ? "tokens" : type === "agent" ? "agents" : type === "template" ? "marketplace" : "data"
  const warnings: string[] = []
  if (input.content.length === 0) warnings.push("The imported source is empty.")
  if (input.content.length > 1_500_000) warnings.push("Large source detected; review bundle and runtime impact before installation.")
  if (/(api[_-]?key|secret|token|password)\s*[:=]/i.test(input.content)) warnings.push("Potential credential-like content detected. Review and remove secrets before saving or exporting.")

  const item: MarketplaceItem = {
    id: `import-${slug}-${Date.now()}`,
    slug: `${slug}-${Date.now().toString(36)}`,
    name: baseName.replace(/[-_]+/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase()),
    summary: `Imported ${type} package from ${input.sourceType}.`,
    description: `Normalized marketplace package created from ${input.sourceName}. Review the generated metadata, source file, dependencies, compatibility, and install targets before using it in a project.`,
    type,
    status: warnings.length ? "PARTIAL" : "IMPORTED",
    categoryId,
    subcategoryId,
    tags: [type, input.sourceType, language, "imported"],
    author: { name: "Imported source", handle: "@local", verified: false },
    pricing: { amount: 0, currency: "USD", license: "FREE" },
    rating: 0,
    reviews: 0,
    downloads: 0,
    featured: false,
    createdAt: now,
    updatedAt: now,
    compatibility: ["review-required"],
    dependencies: [],
    capabilities: ["preview", "export", "safe-install-plan"],
    preview: {
      kind: type === "marketing" ? "hero" : type === "gallery" ? "gallery" : type === "motion" ? "motion" : type === "design-system" ? "design-system" : "component",
      title: baseName.replace(/[-_]+/g, " "),
      eyebrow: `IMPORTED / ${input.sourceType.toUpperCase()}`,
      description: `Normalized from ${input.sourceName}`,
      accent: "#ef4444",
      background: "#0a0b0f",
      highlights: [language.toUpperCase(), type.toUpperCase(), warnings.length ? "REVIEW" : "READY"],
    },
    files: [{ path: `imports/${safeName}`, language, content: input.content }],
    source: { kind: input.sourceType === "paste" ? "generated" : input.sourceType, value: input.sourceName },
  }

  return {
    id: `record-${Date.now()}`,
    importedAt: now,
    sourceType: input.sourceType,
    sourceName: input.sourceName,
    status: input.content.length === 0 ? "ERROR" : warnings.length ? "WARNING" : "READY",
    warnings,
    item,
  }
}

export function serializeMarketplaceItem(item: MarketplaceItem, exportedAt = item.updatedAt): string {
  return JSON.stringify({ schemaVersion: "2.0.0", exportedAt, item }, null, 2)
}
