"use client"

import { useEffect, useMemo, useState } from "react"
import { AlertTriangle, Check, ChevronDown, Download, FileCode2, FolderDown, Loader2, PackageCheck, ShieldCheck, X } from "lucide-react"
import type { MarketplaceItem, MarketplaceInstallResult } from "@/types/marketplace"
import { isSafeMarketplacePath, sanitizeMarketplaceFiles } from "@/lib/marketplace"
import { ProductionState } from "@/components/system/production-state"

const LIBRARY_KEY = "wpx-marketplace-library-v2"

type DirectoryHandleLike = {
  getDirectoryHandle(name: string, options?: { create?: boolean }): Promise<DirectoryHandleLike>
  getFileHandle(name: string, options?: { create?: boolean }): Promise<{
    getFile(): Promise<File>
    createWritable(): Promise<{
      write(data: string): Promise<void>
      close(): Promise<void>
    }>
  }>
}

type FileSystemWindow = Window & { showDirectoryPicker?: () => Promise<DirectoryHandleLike> }

type InstallProgress = {
  current: number
  total: number
  path: string
}

function readLocalItems(): MarketplaceItem[] {
  try {
    const raw = localStorage.getItem(LIBRARY_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as unknown
    return Array.isArray(parsed) ? parsed as MarketplaceItem[] : []
  } catch {
    return []
  }
}

async function getTarget(root: DirectoryHandleLike, path: string) {
  const segments = path.split("/").filter(Boolean)
  const filename = segments.pop()
  if (!filename) throw new Error("Invalid target path")
  let directory = root
  for (const segment of segments) directory = await directory.getDirectoryHandle(segment, { create: true })
  return { directory, filename }
}

function downloadRecoveryManifest(item: MarketplaceItem, result: MarketplaceInstallResult, overwrite: boolean) {
  const payload = {
    schemaVersion: "1.0",
    generatedAt: new Date().toISOString(),
    item: {
      id: item.id,
      slug: item.slug,
      name: item.name,
      source: item.source,
    },
    policy: overwrite ? "overwrite-approved" : "skip-existing",
    result,
    recovery: {
      instruction: "Review writtenFiles and restore changed project files from version control or your project backup when reversal is required.",
      automaticRollback: false,
    },
  }
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement("a")
  anchor.href = url
  anchor.download = `${item.slug}.install-result.json`
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
  URL.revokeObjectURL(url)
}

export function InstallCenter({ nativeItems }: { nativeItems: MarketplaceItem[] }) {
  const [localItems, setLocalItems] = useState<MarketplaceItem[]>([])
  const [selectedId, setSelectedId] = useState(nativeItems[0]?.id ?? "")
  const [overwrite, setOverwrite] = useState(false)
  const [installing, setInstalling] = useState(false)
  const [progress, setProgress] = useState<InstallProgress | null>(null)
  const [result, setResult] = useState<MarketplaceInstallResult | null>(null)

  useEffect(() => setLocalItems(readLocalItems()), [])

  const items = useMemo(() => [...localItems, ...nativeItems.filter((item) => !localItems.some((local) => local.id === item.id))], [localItems, nativeItems])
  const selected = items.find((item) => item.id === selectedId) ?? items[0]
  const safeFiles = selected ? sanitizeMarketplaceFiles(selected.files) : []
  const unsafeFiles = selected ? selected.files.filter((file) => !isSafeMarketplacePath(file.path)) : []
  const progressPercent = progress?.total ? Math.round((progress.current / progress.total) * 100) : 0

  async function install() {
    if (!selected) return
    setInstalling(true)
    setResult(null)
    setProgress({ current: 0, total: safeFiles.length, path: "Waiting for project permission" })

    try {
      if (unsafeFiles.length) {
        setResult({ status: "BLOCKED", writtenFiles: [], skippedFiles: unsafeFiles.map((file) => file.path), message: "Unsafe relative paths were detected. Correct the package before installation." })
        return
      }

      const picker = (window as FileSystemWindow).showDirectoryPicker
      if (!picker) {
        setResult({ status: "BLOCKED", writtenFiles: [], skippedFiles: [], message: "This browser does not provide the File System Access API. Export the package and install it manually." })
        return
      }

      const root = await picker()
      const writtenFiles: string[] = []
      const skippedFiles: string[] = []

      for (const [index, file] of safeFiles.entries()) {
        setProgress({ current: index, total: safeFiles.length, path: file.path })
        const { directory, filename } = await getTarget(root, file.path)
        let exists = false
        try {
          const existingHandle = await directory.getFileHandle(filename)
          await existingHandle.getFile()
          exists = true
        } catch {
          exists = false
        }

        if (exists && !overwrite) {
          skippedFiles.push(file.path)
          setProgress({ current: index + 1, total: safeFiles.length, path: `${file.path} skipped` })
          continue
        }

        const handle = await directory.getFileHandle(filename, { create: true })
        const writable = await handle.createWritable()
        await writable.write(file.content)
        await writable.close()
        writtenFiles.push(file.path)
        setProgress({ current: index + 1, total: safeFiles.length, path: file.path })
      }

      setResult({
        status: "INSTALLED",
        writtenFiles,
        skippedFiles,
        message: skippedFiles.length
          ? `${writtenFiles.length} file${writtenFiles.length === 1 ? "" : "s"} installed. ${skippedFiles.length} existing file${skippedFiles.length === 1 ? " was" : "s were"} skipped.`
          : `${writtenFiles.length} file${writtenFiles.length === 1 ? "" : "s"} installed into the selected project folder.`,
      })
    } catch (error) {
      const message = error instanceof DOMException && error.name === "AbortError"
        ? "Folder selection was cancelled. No additional files were written."
        : error instanceof DOMException && error.name === "NotAllowedError"
          ? "Project-folder permission was denied. Review browser permissions and retry when ready."
          : error instanceof Error
            ? error.message
            : "Installation was cancelled or failed."
      setResult({ status: "BLOCKED", writtenFiles: [], skippedFiles: [], message })
    } finally {
      setInstalling(false)
      setProgress(null)
    }
  }

  if (!selected) {
    return (
      <ProductionState
        tone="empty"
        title="No installable systems are available."
        description="Import a valid source or restore the native marketplace catalog before opening the install center."
      />
    )
  }

  return (
    <div className="grid gap-8 xl:grid-cols-[390px_1fr]">
      <aside className="h-fit border border-black/10 bg-white p-5 architectural-shadow dark:border-white/15 dark:bg-[color:var(--surface-raised)] sm:p-7 xl:sticky xl:top-28">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[color:var(--signal)]">Install target</p>
            <h2 className="mt-4 font-display text-4xl">Choose a package.</h2>
          </div>
          <FolderDown className="size-5 text-[color:var(--signal)]" aria-hidden="true" />
        </div>

        <label className="relative mt-7 block">
          <span className="sr-only">Package to install</span>
          <select value={selected.id} onChange={(event) => { setSelectedId(event.target.value); setResult(null); setProgress(null) }} className="min-h-11 w-full appearance-none border border-black/10 bg-[color:var(--paper)] px-4 py-3 pr-10 text-base outline-none focus:border-[color:var(--signal)] focus:shadow-[var(--production-focus)] dark:border-white/15 sm:text-sm">
            {items.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-foreground/35" aria-hidden="true" />
        </label>

        <label className="mt-5 flex cursor-pointer items-start gap-3 border border-black/10 bg-[color:var(--paper-warm)] p-4 dark:border-white/15">
          <input type="checkbox" checked={overwrite} onChange={(event) => setOverwrite(event.target.checked)} className="mt-0.5 size-4 accent-red-600" />
          <span>
            <span className="block text-sm font-medium">Allow overwrite</span>
            <span className="mt-1 block text-xs leading-relaxed text-foreground/45">Existing target files are skipped by default. Enable this only after reviewing every path and source diff.</span>
          </span>
        </label>

        <button type="button" onClick={install} disabled={installing || unsafeFiles.length > 0} className="mt-5 flex min-h-11 w-full items-center justify-between bg-foreground px-5 py-4 font-mono text-[10px] uppercase tracking-[0.18em] text-background transition hover:bg-[color:var(--signal)] hover:text-white disabled:cursor-not-allowed disabled:opacity-45">
          {installing ? "Installing files" : "Select folder and install"}
          {installing ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : <FolderDown className="size-4" aria-hidden="true" />}
        </button>

        {progress ? (
          <div className="mt-5" role="status" aria-live="polite" aria-atomic="true">
            <div className="flex items-center justify-between gap-4 font-mono text-[8px] uppercase tracking-[0.14em] text-foreground/45">
              <span>{progress.path}</span>
              <span>{progress.current}/{progress.total}</span>
            </div>
            <div className="production-progress mt-3" aria-hidden="true"><span style={{ width: `${progressPercent}%` }} /></div>
          </div>
        ) : null}

        <div className="mt-6 flex gap-3 border border-emerald-600/25 bg-emerald-50 p-4 text-sm leading-relaxed text-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-100">
          <ShieldCheck className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          Installation requires explicit browser permission and a user-selected local folder. No server-side project access is assumed.
        </div>
      </aside>

      <section className="min-w-0 space-y-5" aria-busy={installing}>
        <div className="border border-black/10 bg-white p-5 dark:border-white/15 dark:bg-[color:var(--surface-raised)] sm:p-7">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[color:var(--signal)]">{selected.categoryId} / {selected.subcategoryId}</p>
              <h2 className="mt-5 font-display text-5xl tracking-[-0.04em]">{selected.name}</h2>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-foreground/48">{selected.summary}</p>
            </div>
            <span className="inline-flex min-h-11 w-fit items-center gap-2 border border-black/10 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.15em] text-foreground/50 dark:border-white/15"><PackageCheck className="size-3.5" aria-hidden="true" /> {safeFiles.length} safe files</span>
          </div>

          <div className="mt-8 grid gap-px bg-black/10 dark:bg-white/15 sm:grid-cols-3">
            {[
              ["Dependencies", selected.dependencies.length ? selected.dependencies.join(", ") : "None"],
              ["Compatibility", selected.compatibility.join(", ") || "Review required"],
              ["Write policy", overwrite ? "Overwrite enabled" : "Skip existing"],
            ].map(([label, value]) => (
              <div key={label} className="bg-[color:var(--paper)] p-4">
                <p className="font-mono text-[8px] uppercase tracking-[0.15em] text-foreground/32">{label}</p>
                <p className="mt-2 text-sm leading-relaxed">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {unsafeFiles.length > 0 ? (
          <ProductionState
            tone="blocked"
            title="Installation is blocked by unsafe paths."
            description="Package paths must remain relative to the approved project directory. Correct the package before requesting file-system permission."
            live="assertive"
          >
            <ul className="font-mono text-[10px]">{unsafeFiles.map((file) => <li key={file.path}>× {file.path}</li>)}</ul>
          </ProductionState>
        ) : null}

        <div className="border border-black/10 bg-white dark:border-white/15 dark:bg-[color:var(--surface-raised)]">
          <div className="flex items-center justify-between border-b border-black/10 px-5 py-4 dark:border-white/15">
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/38">Write manifest</p>
            <FileCode2 className="size-4 text-[color:var(--signal)]" aria-hidden="true" />
          </div>
          <div className="divide-y divide-black/10 dark:divide-white/15">
            {selected.files.map((file, index) => {
              const safe = isSafeMarketplacePath(file.path)
              return (
                <div key={file.path} className="grid grid-cols-[34px_1fr_auto] items-center gap-4 px-5 py-4">
                  <span className="font-mono text-[8px] text-foreground/30">{String(index + 1).padStart(2, "0")}</span>
                  <div className="min-w-0"><p className="break-all font-mono text-[10px]">{file.path}</p><p className="mt-1 font-mono text-[8px] uppercase tracking-[0.12em] text-foreground/35">{file.language} / {new Blob([file.content]).size.toLocaleString()} bytes</p></div>
                  <span className={`grid size-11 place-items-center border ${safe ? "border-emerald-600/25 text-emerald-700" : "border-red-500/25 text-red-700"}`} aria-label={safe ? "Safe relative path" : "Unsafe path"}>{safe ? <Check className="size-3.5" /> : <X className="size-3.5" />}</span>
                </div>
              )
            })}
          </div>
        </div>

        {result ? (
          <ProductionState
            tone={result.status === "BLOCKED" ? "blocked" : result.skippedFiles.length ? "warning" : "ready"}
            title={result.status === "BLOCKED" ? "Installation did not complete." : "Installation result is ready."}
            description={result.message}
            live="polite"
          >
            {(result.writtenFiles.length > 0 || result.skippedFiles.length > 0) ? (
              <div className="grid w-full gap-4 sm:grid-cols-2">
                <div><p className="font-mono text-[8px] uppercase tracking-[0.15em]">Written</p><ul className="mt-2 space-y-1 font-mono text-[10px]">{result.writtenFiles.map((file) => <li key={file}>+ {file}</li>)}</ul></div>
                <div><p className="font-mono text-[8px] uppercase tracking-[0.15em]">Skipped</p><ul className="mt-2 space-y-1 font-mono text-[10px]">{result.skippedFiles.map((file) => <li key={file}>– {file}</li>)}</ul></div>
              </div>
            ) : null}
            <button type="button" onClick={() => downloadRecoveryManifest(selected, result, overwrite)} className="palmer-button palmer-button-ghost">
              Download result manifest <Download className="size-4" aria-hidden="true" />
            </button>
          </ProductionState>
        ) : null}

        {unsafeFiles.length === 0 && !result && !installing ? (
          <div className="flex gap-3 border border-black/10 bg-[color:var(--paper-warm)] p-4 text-sm leading-relaxed text-foreground/55 dark:border-white/15" role="status">
            <AlertTriangle className="mt-0.5 size-4 shrink-0 text-[color:var(--state-warning)]" aria-hidden="true" />
            Direct installation does not create an automatic project backup. Commit or back up the target project before approving overwrite.
          </div>
        ) : null}
      </section>
    </div>
  )
}
