import { ProductionReadinessBand, type ProductionStateTone } from "@/components/system/production-state"

type ModuleKind =
  | "home"
  | "marketplace"
  | "detail"
  | "import"
  | "library"
  | "preview"
  | "export"
  | "install"
  | "studio"
  | "design-intelligence"

interface ContextItem {
  label: string
  value: string
  tone?: ProductionStateTone
}

const contexts: Record<ModuleKind, ContextItem[]> = {
  home: [
    { label: "Product scope", value: "Full system", tone: "ready" },
    { label: "Data truth", value: "Typed catalog", tone: "ready" },
    { label: "Motion", value: "Reduced-motion safe", tone: "ready" },
    { label: "Delivery", value: "Inspect before install", tone: "info" },
  ],
  marketplace: [
    { label: "Search + filters", value: "Connected", tone: "ready" },
    { label: "Taxonomy", value: "Category + subcategory", tone: "ready" },
    { label: "Result states", value: "Empty + recovery", tone: "ready" },
    { label: "Source", value: "Validated JSON", tone: "info" },
  ],
  detail: [
    { label: "Product truth", value: "Visible", tone: "ready" },
    { label: "Files", value: "Inspectable", tone: "ready" },
    { label: "Install impact", value: "Review required", tone: "warning" },
    { label: "External execution", value: "Not implied", tone: "blocked" },
  ],
  import: [
    { label: "Methods", value: "File / paste / URL", tone: "ready" },
    { label: "Validation", value: "Before acceptance", tone: "ready" },
    { label: "Persistence", value: "Browser local", tone: "info" },
    { label: "Unsafe source", value: "Blocked", tone: "blocked" },
  ],
  library: [
    { label: "Native records", value: "Connected", tone: "ready" },
    { label: "User records", value: "Browser local", tone: "info" },
    { label: "Removal", value: "Explicit action", tone: "warning" },
    { label: "Cloud sync", value: "Unsupported", tone: "unsupported" },
  ],
  preview: [
    { label: "Viewports", value: "Desktop / tablet / mobile", tone: "ready" },
    { label: "Themes", value: "Light / dark", tone: "ready" },
    { label: "Imported code", value: "Not executed", tone: "blocked" },
    { label: "Fallback", value: "Metadata preview", tone: "info" },
  ],
  export: [
    { label: "Outputs", value: "Package / manifest / catalog", tone: "ready" },
    { label: "Delivery", value: "Browser download", tone: "ready" },
    { label: "Remote publish", value: "Unsupported", tone: "unsupported" },
    { label: "Failure path", value: "Retry available", tone: "info" },
  ],
  install: [
    { label: "Target", value: "User-selected folder", tone: "ready" },
    { label: "File plan", value: "Visible before write", tone: "ready" },
    { label: "Conflicts", value: "Skip / rename / approve", tone: "warning" },
    { label: "Permission", value: "Required", tone: "blocked" },
  ],
  studio: [
    { label: "Catalog", value: "Connected", tone: "ready" },
    { label: "Build lifecycle", value: "Unified", tone: "ready" },
    { label: "Capability truth", value: "Visible", tone: "ready" },
    { label: "Release", value: "Evidence gated", tone: "warning" },
  ],
  "design-intelligence": [
    { label: "Engine", value: "Deterministic local", tone: "ready" },
    { label: "Output", value: "Inspectable", tone: "ready" },
    { label: "External AI", value: "Not claimed", tone: "blocked" },
    { label: "Export", value: "Portable guidance", tone: "info" },
  ],
}

export function ModuleProductionContext({ kind }: { kind: ModuleKind }) {
  return (
    <div className="production-system-meta">
      <ProductionReadinessBand items={contexts[kind]} label={`${kind} production context`} />
    </div>
  )
}
