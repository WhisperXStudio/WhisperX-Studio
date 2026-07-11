import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowUpRight, BadgeCheck, Box, Braces, CalendarDays, Check, Download, FileCode2, PackageCheck, ShieldCheck, Star, type LucideIcon } from "lucide-react"
import { MarketplaceFooter } from "@/components/marketplace/marketplace-footer"
import { MarketplaceNav } from "@/components/marketplace/marketplace-nav"
import { PreviewCanvas } from "@/components/marketplace/preview-canvas"
import { ProductActions } from "@/components/marketplace/product-actions"
import { formatMarketplacePrice, getMarketplaceItem, getMarketplaceItems, getRelatedMarketplaceItems } from "@/lib/marketplace"

export function generateStaticParams() {
  return getMarketplaceItems().map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const item = getMarketplaceItem(slug)
  if (!item) return { title: "Product not found" }
  return {
    title: item.name,
    description: item.summary,
    openGraph: {
      title: item.name,
      description: item.summary,
      type: "website",
    },
  }
}

export default async function MarketplaceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const item = getMarketplaceItem(slug)
  if (!item) notFound()
  const related = getRelatedMarketplaceItems(item)
  const technicalSections: Array<{ title: string; values: string[]; icon: LucideIcon }> = [
    { title: "Compatibility", values: item.compatibility, icon: PackageCheck },
    { title: "Dependencies", values: item.dependencies.length ? item.dependencies : ["No runtime dependencies"], icon: Box },
    { title: "Capabilities", values: item.capabilities, icon: Check },
    { title: "Source", values: [`${item.source.kind}: ${item.source.value}`], icon: Braces },
  ]

  return (
    <main className="min-h-screen bg-[color:var(--paper)]">
      <MarketplaceNav />

      <section className="border-b border-black/10 px-5 py-8 lg:px-10">
        <div className="mx-auto flex max-w-[1800px] flex-wrap items-center justify-between gap-4">
          <Link href="/marketplace" className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-foreground/45 transition hover:text-[color:var(--signal)]">
            <ArrowLeft className="size-3.5" /> Back to market
          </Link>
          <div className="flex flex-wrap items-center gap-3 font-mono text-[9px] uppercase tracking-[0.16em] text-foreground/38">
            <span>{item.categoryId}</span>
            <span className="text-[color:var(--signal)]">×</span>
            <span>{item.subcategoryId}</span>
            <span className="text-[color:var(--signal)]">×</span>
            <span>{item.type}</span>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-b border-black/10 px-5 py-16 lg:px-10 lg:py-24">
        <div className="absolute inset-0 paper-grid opacity-35" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-[1800px] gap-12 lg:grid-cols-[1.25fr_.75fr] lg:items-start">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 border border-[color:var(--signal)] px-3 py-2 font-mono text-[9px] uppercase tracking-[0.16em] text-[color:var(--signal)]">
                <BadgeCheck className="size-3.5" /> {item.status}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-foreground/38">Updated {new Date(item.updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
            </div>
            <h1 className="mt-10 max-w-6xl font-display text-[clamp(4.5rem,10vw,9.5rem)] leading-[0.78] tracking-[-0.06em]">{item.name}</h1>
            <p className="mt-10 max-w-3xl text-lg leading-relaxed text-foreground/55 sm:text-xl">{item.summary}</p>
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-black/10 pt-6 font-mono text-[9px] uppercase tracking-[0.16em] text-foreground/42">
              <span className="flex items-center gap-2"><Star className="size-3.5 fill-current text-[color:var(--signal)]" /> {item.rating.toFixed(1)} / {item.reviews} reviews</span>
              <span className="flex items-center gap-2"><Download className="size-3.5" /> {item.downloads.toLocaleString()} installs</span>
              <span className="flex items-center gap-2"><CalendarDays className="size-3.5" /> {new Date(item.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}</span>
            </div>
          </div>

          <aside className="border border-black/10 bg-white p-6 architectural-shadow sm:p-8 lg:sticky lg:top-28">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/35">License / price</p>
                <p className="mt-4 font-display text-5xl">{formatMarketplacePrice(item)}</p>
              </div>
              <span className="border border-black/10 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.15em] text-foreground/50">{item.pricing.license}</span>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-foreground/48">Review files, dependencies, compatibility, and target paths before adding this system to a project.</p>
            <div className="mt-8">
              <ProductActions item={item} />
            </div>
            <div className="mt-8 border-t border-black/10 pt-6">
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-foreground/35">Creator</p>
              <div className="mt-4 flex items-center justify-between gap-4">
                <div>
                  <p className="font-medium">{item.author.name}</p>
                  <p className="mt-1 font-mono text-[9px] text-foreground/38">{item.author.handle}</p>
                </div>
                {item.author.verified && <BadgeCheck className="size-4 text-[color:var(--signal)]" aria-label="Verified creator" />}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-b border-black/10 px-5 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1800px]">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[color:var(--signal)]">Responsive preview</p>
              <h2 className="mt-5 font-display text-6xl tracking-[-0.045em]">Inspect the system.</h2>
            </div>
            <Link href={`/preview?item=${item.slug}`} className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-foreground/50 hover:text-[color:var(--signal)]">Open full preview <ArrowUpRight className="size-3.5" /></Link>
          </div>
          <PreviewCanvas item={item} />
        </div>
      </section>

      <section className="border-b border-black/10 bg-[color:var(--paper-warm)] px-5 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-[1800px] gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[color:var(--signal)]">Product system</p>
            <h2 className="mt-6 font-display text-6xl leading-[0.9] tracking-[-0.045em]">Narrative, code, and install reality.</h2>
            <p className="mt-7 text-base leading-relaxed text-foreground/52">{item.description}</p>
            <div className="mt-9 flex flex-wrap gap-2">
              {item.tags.map((tag) => <span key={tag} className="border border-black/10 bg-white/60 px-3 py-2 font-mono text-[8px] uppercase tracking-[0.15em] text-foreground/48">{tag}</span>)}
            </div>
          </div>

          <div className="grid gap-px bg-black/10 sm:grid-cols-2">
            {technicalSections.map(({ title, values, icon: Icon }) => (
              <article key={title} className="bg-white p-6">
                <Icon className="size-4 text-[color:var(--signal)]" />
                <h3 className="mt-6 font-display text-3xl">{title}</h3>
                <ul className="mt-5 space-y-2 text-sm text-foreground/50">
                  {values.map((value) => <li key={value} className="flex gap-2"><span className="text-[color:var(--signal)]">×</span><span>{value}</span></li>)}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 px-5 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1800px]">
          <div className="grid gap-10 lg:grid-cols-[.55fr_1.45fr]">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[color:var(--signal)]">File manifest</p>
              <h2 className="mt-5 font-display text-5xl tracking-[-0.04em]">What will be written.</h2>
              <div className="mt-8 flex items-start gap-3 border border-emerald-600/25 bg-emerald-50 p-4 text-sm leading-relaxed text-emerald-900">
                <ShieldCheck className="mt-0.5 size-4 shrink-0" />
                Paths are validated before direct project installation. Existing-file overwrite confirmation depends on the browser file-system implementation and user approval.
              </div>
            </div>
            <div className="space-y-4">
              {item.files.map((file) => (
                <details key={file.path} className="group border border-black/10 bg-white" open={item.files.length === 1}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4">
                    <span className="flex items-center gap-3"><FileCode2 className="size-4 text-[color:var(--signal)]" /><span className="font-mono text-[10px]">{file.path}</span></span>
                    <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-foreground/35">{file.language}</span>
                  </summary>
                  <pre className="max-h-[460px] overflow-auto border-t border-black/10 bg-[#17191f] p-5 text-[11px] leading-relaxed text-zinc-200"><code>{file.content}</code></pre>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-[color:var(--paper-cool)] px-5 py-16 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-[1800px]">
            <div className="flex items-end justify-between gap-4 border-b border-black/10 pb-6">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[color:var(--signal)]">Related systems</p>
                <h2 className="mt-5 font-display text-5xl tracking-[-0.04em]">Continue the build.</h2>
              </div>
              <Link href="/marketplace" className="font-mono text-[9px] uppercase tracking-[0.16em] text-foreground/48 hover:text-[color:var(--signal)]">View all</Link>
            </div>
            <div className="mt-6 grid gap-px bg-black/10 md:grid-cols-2 xl:grid-cols-4">
              {related.map((relatedItem) => (
                <Link key={relatedItem.id} href={`/marketplace/${relatedItem.slug}`} className="group min-h-[330px] bg-white p-6 transition hover:bg-[color:var(--paper-warm)]">
                  <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-foreground/35">{relatedItem.type}</p>
                  <h3 className="mt-16 font-display text-4xl leading-[0.92]">{relatedItem.name}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-foreground/48">{relatedItem.summary}</p>
                  <span className="mt-8 inline-flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.16em] text-foreground/40 transition group-hover:text-[color:var(--signal)]">Inspect <ArrowUpRight className="size-3.5" /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <MarketplaceFooter />
    </main>
  )
}
