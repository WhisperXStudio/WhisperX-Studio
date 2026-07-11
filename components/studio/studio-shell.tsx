import Link from "next/link"
import { ArrowUpRight, BadgeCheck, Braces, Download, FolderDown, Import, Library, MonitorSmartphone, PackageCheck, Workflow } from "lucide-react"
import { MarketplaceFooter } from "@/components/marketplace/marketplace-footer"
import { MarketplaceNav } from "@/components/marketplace/marketplace-nav"
import { getMarketplaceCatalog } from "@/lib/marketplace"
import { getDesignSpecSummary } from "@/lib/studio-registry"

const stages = [
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

      <section className="relative overflow-hidden border-b border-black/10 px-5 py-14 lg:px-10 lg:py-20">
        <div className="absolute inset-0 paper-grid opacity-35" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-[1800px] gap-12 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[color:var(--signal)]">WHISPERX / SYSTEM STUDIO</p>
            <h1 className="mt-7 max-w-6xl font-display text-[clamp(4.5rem,10vw,9rem)] leading-[0.78] tracking-[-0.06em]">One context.<br /><span className="italic text-[color:var(--signal)]">Every surface.</span></h1>
            <p className="mt-9 max-w-3xl text-lg leading-relaxed text-foreground/52">A connected control surface for taxonomy, JSON catalog data, imports, previews, exports, user library packages, and safe local project installation.</p>
          </div>
          <div className="grid gap-px bg-black/10 sm:grid-cols-2">
            {[
              [catalog.items.length, "market systems"],
              [catalog.categories.length, "categories"],
              [catalog.items.reduce((sum, item) => sum + item.files.length, 0), "source files"],
              [catalog.schemaVersion, "schema"],
            ].map(([value, label]) => (
              <div key={String(label)} className="bg-white p-5">
                <p className="font-display text-4xl">{value}</p>
                <p className="mt-2 font-mono text-[8px] uppercase tracking-[0.16em] text-foreground/35">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-12 lg:px-10 lg:py-18">
        <div className="mx-auto grid max-w-[1800px] gap-8 xl:grid-cols-[340px_1fr]">
          <aside className="h-fit border border-black/10 bg-white p-6 architectural-shadow xl:sticky xl:top-28">
            <Workflow className="size-5 text-[color:var(--signal)]" />
            <h2 className="mt-6 font-display text-4xl">Build lifecycle.</h2>
            <p className="mt-4 text-sm leading-relaxed text-foreground/48">Each surface shares the same catalog identity and source data. Browser-local features remain honestly separated from server-backed capabilities.</p>
            <div className="mt-7 space-y-2">
              {stages.map(({ name, href, icon: Icon, status }, index) => (
                <Link key={name} href={href} className="group flex items-center justify-between border border-black/10 p-4 transition hover:border-[color:var(--signal)] hover:bg-[color:var(--paper-warm)]">
                  <span className="flex items-center gap-3"><span className="font-mono text-[8px] text-foreground/30">{String(index + 1).padStart(2, "0")}</span><Icon className="size-3.5 text-[color:var(--signal)]" /><span className="text-sm">{name}</span></span>
                  <span className="font-mono text-[7px] uppercase tracking-[0.13em] text-foreground/35 group-hover:text-[color:var(--signal)]">{status}</span>
                </Link>
              ))}
            </div>
          </aside>

          <div className="min-w-0 space-y-6">
            <section className="border border-black/10 bg-white p-6 sm:p-8">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[color:var(--signal)]">Catalog runtime</p>
                  <h2 className="mt-5 font-display text-5xl tracking-[-0.04em]">JSON drives the market.</h2>
                  <p className="mt-4 max-w-3xl text-sm leading-relaxed text-foreground/48">Categories, subcategories, products, preview metadata, files, dependencies, compatibility, licenses, status, and install manifests originate from one validated catalog.</p>
                </div>
                <span className="inline-flex w-fit items-center gap-2 border border-emerald-600/25 bg-emerald-50 px-3 py-2 font-mono text-[8px] uppercase tracking-[0.14em] text-emerald-800"><BadgeCheck className="size-3.5" /> Connected</span>
              </div>
              <div className="mt-8 grid gap-px bg-black/10 sm:grid-cols-2 xl:grid-cols-3">
                {catalog.categories.map((category) => (
                  <Link key={category.id} href={`/marketplace?category=${category.id}`} className="group min-h-[220px] bg-[color:var(--paper)] p-5 transition hover:bg-[color:var(--paper-warm)]">
                    <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-foreground/32">{category.subcategories.length} subcategories</p>
                    <h3 className="mt-14 font-display text-4xl">{category.name}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-foreground/44">{category.description}</p>
                    <span className="mt-6 inline-flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.14em] text-foreground/40 group-hover:text-[color:var(--signal)]">Open market <ArrowUpRight className="size-3.5" /></span>
                  </Link>
                ))}
              </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-[.75fr_1.25fr]">
              <div className="border border-black/10 bg-[color:var(--paper-warm)] p-6 sm:p-8">
                <Braces className="size-5 text-[color:var(--signal)]" />
                <p className="mt-7 font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/38">Design reference</p>
                <h2 className="mt-4 font-display text-4xl">{designSpec.id}</h2>
                <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.14em] text-foreground/35">Version {designSpec.version}</p>
                <div className="mt-7 flex flex-wrap gap-2">
                  {designSpec.target.map((target) => <span key={target} className="border border-black/10 bg-white/60 px-2.5 py-2 font-mono text-[8px] uppercase tracking-[0.12em] text-foreground/42">{target}</span>)}
                </div>
              </div>
              <div className="min-w-0 border border-black/10 bg-white p-6 sm:p-8">
                <div className="flex items-center justify-between gap-4"><p className="font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/38">System status</p><PackageCheck className="size-4 text-[color:var(--signal)]" /></div>
                <div className="mt-6 divide-y divide-black/10">
                  {[
                    ["Native marketplace catalog", "CONNECTED", "Validated at import time through Zod."],
                    ["File and paste import", "CONNECTED", "Browser-local normalization and storage."],
                    ["Public URL import", "CONNECTED", "Guarded server fetch with protocol, host, type, size, and timeout controls."],
                    ["Responsive preview", "CONNECTED", "Metadata-driven preview across viewport and theme states."],
                    ["Direct project install", "CONNECTED", "Browser File System Access API with explicit user permission."],
                    ["Cloud account sync", "UNSUPPORTED", "No backend identity or remote persistence is claimed."],
                  ].map(([name, status, note]) => (
                    <div key={name} className="grid gap-2 py-4 sm:grid-cols-[1fr_auto] sm:items-start">
                      <div><h3 className="text-sm font-medium">{name}</h3><p className="mt-1 text-xs leading-relaxed text-foreground/42">{note}</p></div>
                      <span className={`w-fit border px-2.5 py-1.5 font-mono text-[7px] uppercase tracking-[0.14em] ${status === "CONNECTED" ? "border-emerald-600/25 text-emerald-800" : "border-black/10 text-foreground/38"}`}>{status}</span>
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
