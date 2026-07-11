import Link from "next/link"
import { ArrowUpRight, BadgeCheck, Braces, BrainCircuit, Download, FolderDown, Import, Library, MonitorSmartphone, PackageCheck, Workflow } from "lucide-react"
import { MarketplaceFooter } from "@/components/marketplace/marketplace-footer"
import { MarketplaceNav } from "@/components/marketplace/marketplace-nav"
import { PalmerModuleHero } from "@/components/palmer/palmer-module-hero"
import { getMarketplaceCatalog } from "@/lib/marketplace"
import { getDesignSpecSummary } from "@/lib/studio-registry"

const stages = [
  { name: "Design AI", href: "/design-intelligence", icon: BrainCircuit, status: "CONNECTED" },
  { name: "Import", href: "/import", icon: Import, status: "CONNECTED" },
  { name: "Library", href: "/library", icon: Library, status: "CONNECTED" },
  { name: "Preview", href: "/preview", icon: MonitorSmartphone, status: "CONNECTED" },
  { name: "Export", href: "/export", icon: Download, status: "CONNECTED" },
  { name: "Install", href: "/install", icon: FolderDown, status: "CONNECTED" },
]

export function StudioShell() {
  const catalog = getMarketplaceCatalog()
  const designSpec = getDesignSpecSummary()

  return (
    <main className="min-h-screen bg-[color:var(--paper)]">
      <MarketplaceNav />
      <PalmerModuleHero
        eyebrow="WHISPERX / SYSTEM STUDIO"
        title="One context."
        accent="Every surface."
        description="A connected operating surface for design intelligence, taxonomy, typed catalog records, imports, responsive previews, portable exports, browser-local packages, and user-approved project installation."
        rail={[
          { title: `${catalog.items.length} market systems`, body: "Published records sharing one typed catalog identity." },
          { title: `${catalog.categories.length} categories`, body: "Structured taxonomy with visible subcategory context." },
          { title: `${catalog.items.reduce((sum, item) => sum + item.files.length, 0)} source files`, body: "Inspectable file manifests and package contents." },
          { title: `Schema ${catalog.schemaVersion}`, body: "Validated runtime data rather than disconnected page mocks." },
        ]}
        backHref="/"
        backLabel="Home"
      />

      <section className="palmer-module-content">
        <div className="grid gap-8 xl:grid-cols-[360px_1fr]">
          <aside className="h-fit border border-black/10 bg-white/80 p-6 shadow-[0_24px_70px_rgba(12,12,14,.08)] backdrop-blur-xl xl:sticky xl:top-28">
            <Workflow className="size-5 text-[color:var(--signal)]" />
            <h2 className="mt-6 font-display text-5xl">Build lifecycle.</h2>
            <p className="mt-4 text-sm leading-relaxed text-foreground/50">Every stage reads the same catalog identity while local-only and unsupported behavior remains explicitly labeled.</p>
            <div className="mt-7 border-t border-black/10">
              {stages.map(({ name, href, icon: Icon, status }, index) => (
                <Link key={name} href={href} className="group grid min-h-20 grid-cols-[2rem_1.2rem_1fr_auto] items-center gap-3 border-b border-black/10 transition hover:pl-2 hover:text-[color:var(--signal)]">
                  <span className="font-mono text-[9px] text-foreground/30">{String(index + 1).padStart(2, "0")}</span>
                  <Icon className="size-4" />
                  <span className="font-display text-2xl tracking-tight">{name}</span>
                  <span className="font-mono text-[8px] uppercase tracking-[0.13em] text-foreground/35 group-hover:text-[color:var(--signal)]">{status}</span>
                </Link>
              ))}
            </div>
          </aside>

          <div className="min-w-0 space-y-8">
            <section className="border border-black/10 bg-white p-6 sm:p-9">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="palmer-kicker">CATALOG RUNTIME</p>
                  <h2 className="palmer-display mt-5 text-5xl sm:text-7xl">JSON drives the market.</h2>
                  <p className="mt-5 max-w-3xl text-sm leading-relaxed text-foreground/50">Categories, products, preview metadata, files, dependencies, compatibility, licenses, status, and install manifests originate from one validated catalog.</p>
                </div>
                <span className="inline-flex w-fit items-center gap-2 border border-emerald-600/25 bg-emerald-50 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.14em] text-emerald-800"><BadgeCheck className="size-3.5" /> Connected</span>
              </div>

              <div className="mt-9 border-t border-black/10">
                {catalog.categories.map((category, index) => (
                  <Link key={category.id} href={`/marketplace?category=${category.id}`} className="group grid min-h-36 grid-cols-[3rem_1fr_auto] items-center gap-5 border-b border-black/10 py-5 transition hover:px-3 hover:bg-[color:var(--paper-warm)]">
                    <span className="font-mono text-[9px] text-foreground/30">{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <h3 className="font-display text-4xl sm:text-5xl">{category.name}</h3>
                      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-foreground/46">{category.description}</p>
                    </div>
                    <ArrowUpRight className="size-5 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[color:var(--signal)]" />
                  </Link>
                ))}
              </div>
            </section>

            <section className="grid gap-8 lg:grid-cols-[.72fr_1.28fr]">
              <div className="border border-black/10 bg-[color:var(--paper-warm)] p-7 sm:p-9">
                <Braces className="size-5 text-[color:var(--signal)]" />
                <p className="mt-8 palmer-kicker">DESIGN REFERENCE</p>
                <h2 className="mt-5 font-display text-5xl">{designSpec.id}</h2>
                <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/38">Version {designSpec.version}</p>
                <div className="mt-7 flex flex-wrap gap-2">
                  {designSpec.target.map((target) => <span key={target} className="border border-black/10 bg-white/70 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.12em] text-foreground/44">{target}</span>)}
                </div>
                <Link href="/design-intelligence" className="palmer-button palmer-button-solid mt-8">Open design intelligence <ArrowUpRight className="size-4" /></Link>
              </div>

              <div className="min-w-0 border border-black/10 bg-white p-7 sm:p-9">
                <div className="flex items-center justify-between gap-4"><p className="palmer-kicker">SYSTEM STATUS</p><PackageCheck className="size-5 text-[color:var(--signal)]" /></div>
                <div className="mt-7 divide-y divide-black/10">
                  {[
                    ["UI UX Pro Max agent skill", "CONNECTED", "Pinned operating instructions and local reference data."],
                    ["Design intelligence runtime", "CONNECTED", "Typed local recommendation engine and interactive workbench."],
                    ["Native marketplace catalog", "CONNECTED", "Validated through the repository schema gates."],
                    ["File, paste, and URL import", "CONNECTED", "Guarded normalization and browser-local persistence."],
                    ["Responsive preview", "CONNECTED", "Inspectable viewport and theme presentation contexts."],
                    ["Direct project install", "CONNECTED", "Explicit browser permission and visible write targets."],
                    ["Cloud account sync", "UNSUPPORTED", "No backend identity or remote persistence is claimed."],
                  ].map(([name, status, note]) => (
                    <div key={name} className="grid gap-3 py-5 sm:grid-cols-[1fr_auto] sm:items-start">
                      <div><h3 className="font-display text-2xl">{name}</h3><p className="mt-2 text-xs leading-relaxed text-foreground/44">{note}</p></div>
                      <span className={`w-fit border px-2.5 py-1.5 font-mono text-[8px] uppercase tracking-[0.14em] ${status === "CONNECTED" ? "border-emerald-600/25 text-emerald-800" : "border-black/10 text-foreground/38"}`}>{status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>

      <MarketplaceFooter />
    </main>
  )
}
