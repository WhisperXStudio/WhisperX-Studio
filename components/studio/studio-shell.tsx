import Link from "next/link";
import { StatusPill } from "@/components/studio/status-pill";
import { getDesignSpecSummary, getRegistry, buildInstallPlan } from "@/lib/studio-registry";

export function StudioShell() {
  const registry = getRegistry();
  const spec = getDesignSpecSummary();
  const plan = buildInstallPlan("install-planner");
  return <main className="min-h-screen bg-background text-foreground noise-overlay">
    <section className="mx-auto grid max-w-[1500px] gap-10 px-6 py-8 lg:grid-cols-[0.85fr_1.15fr] lg:px-12">
      <div className="sticky top-8 h-fit space-y-8">
        <Link href="/" className="font-mono text-xs uppercase tracking-[0.35em] text-muted-foreground">WHISPERX | STUDIO</Link>
        <h1 className="font-display text-7xl leading-[0.82] tracking-tight md:text-8xl lg:text-[9rem]">Studio<br/><span className="text-stroke text-red-500">X</span> system.</h1>
        <p className="max-w-xl text-lg text-muted-foreground">Connected frontend control surface for the verified lifecycle: import, parse, classify, normalize, validate, store, index, list, detail, preview, export, add, and install.</p>
        <nav className="flex flex-wrap gap-3 font-mono text-xs uppercase tracking-[0.18em]"><Link href="/import">Import</Link><Link href="/library">Library</Link><Link href="/preview">Preview</Link><Link href="/export">Export</Link></nav>
      </div>
      <div className="space-y-6 pt-4">
        <div className="grid gap-4 md:grid-cols-3">{registry.imports.map((entry) => <article key={entry.source} className="border border-border bg-card/70 p-5"><p className="mb-8 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">{entry.source}</p><StatusPill status={entry.status as any}/><p className="mt-4 text-sm text-muted-foreground">{entry.steps.length ? entry.steps.join(" → ") : "No executable lifecycle connected."}</p></article>)}</div>
        <section className="border border-border p-6"><div className="mb-8 flex items-start justify-between gap-6"><div><p className="font-mono text-xs uppercase tracking-[0.28em] text-red-400">Design lock</p><h2 className="mt-3 font-display text-5xl">{spec.id}</h2></div><StatusPill status="CONNECTED" /></div><pre className="overflow-auto rounded-sm bg-black/30 p-4 text-xs text-muted-foreground">{JSON.stringify(spec, null, 2)}</pre></section>
        <section className="grid gap-4 md:grid-cols-2">{registry.skills.map((skill) => <article key={skill.id} className="border border-border p-6"><div className="flex items-center justify-between gap-4"><h3 className="font-display text-3xl">{skill.name}</h3><StatusPill status={skill.status as any}/></div><p className="mt-4 text-sm text-muted-foreground">{skill.description}</p><p className="mt-6 font-mono text-xs text-muted-foreground">{skill.category} / {skill.subcategory}</p></article>)}</section>
        <section className="border border-red-500/30 p-6"><h2 className="font-display text-4xl">Install plan</h2><pre className="mt-4 overflow-auto bg-red-950/10 p-4 text-xs text-muted-foreground">{JSON.stringify(plan, null, 2)}</pre></section>
      </div>
    </section>
  </main>;
}
