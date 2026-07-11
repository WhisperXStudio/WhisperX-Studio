export type MarketplaceItemType =
  | "marketing"
  | "gallery"
  | "section"
  | "component"
  | "template"
  | "motion"
  | "design-system"
  | "skill"
  | "agent"

export type MarketplaceStatus =
  | "PUBLISHED"
  | "DRAFT"
  | "IMPORTED"
  | "VALIDATED"
  | "PARTIAL"
  | "BLOCKED"

export type MarketplaceLicense = "FREE" | "COMMERCIAL" | "ENTERPRISE"

export interface MarketplaceTaxonomyNode {
  id: string
  slug: string
  name: string
  description: string
  icon: string
  subcategories: Array<{
    id: string
    slug: string
    name: string
    description: string
  }>
}

export interface MarketplaceFile {
  path: string
  language: "tsx" | "ts" | "css" | "json" | "md" | "html" | "txt"
  content: string
}

export interface MarketplacePreview {
  kind: "hero" | "section" | "gallery" | "dashboard" | "component" | "motion" | "design-system"
  title: string
  eyebrow: string
  description: string
  accent: string
  background: string
  highlights: string[]
}

export interface MarketplaceItem {
  id: string
  slug: string
  name: string
  summary: string
  description: string
  type: MarketplaceItemType
  status: MarketplaceStatus
  categoryId: string
  subcategoryId: string
  tags: string[]
  author: {
    name: string
    handle: string
    verified: boolean
  }
  pricing: {
    amount: number
    currency: "USD" | "THB"
    license: MarketplaceLicense
  }
  rating: number
  reviews: number
  downloads: number
  featured: boolean
  createdAt: string
  updatedAt: string
  compatibility: string[]
  dependencies: string[]
  capabilities: string[]
  preview: MarketplacePreview
  files: MarketplaceFile[]
  source: {
    kind: "native" | "file" | "url" | "generated"
    value: string
  }
}

export interface MarketplaceCatalog {
  schemaVersion: string
  generatedAt: string
  categories: MarketplaceTaxonomyNode[]
  items: MarketplaceItem[]
}

export interface ImportedMarketplaceRecord {
  id: string
  importedAt: string
  sourceType: "file" | "url" | "paste"
  sourceName: string
  status: "READY" | "WARNING" | "ERROR"
  warnings: string[]
  item: MarketplaceItem
}

export interface MarketplaceInstallResult {
  status: "INSTALLED" | "DOWNLOADED" | "BLOCKED"
  writtenFiles: string[]
  skippedFiles: string[]
  message: string
}
