import Link from "next/link"
import { ArrowLeft, Search } from "lucide-react"
import { ProductionState } from "@/components/system/production-state"

export default function NotFound() {
  return (
    <main className="production-global-state">
      <div className="production-global-state__inner">
        <p className="production-global-state__code">404 / SYSTEM RECORD NOT FOUND</p>
        <h1>The path is missing.</h1>
        <p>The requested route or marketplace record is unavailable, unpublished, or no longer part of the current catalog.</p>
        <div className="mt-10">
          <ProductionState
            tone="empty"
            title="Recover through a known route."
            description="Use marketplace search to locate a typed system, or return to the product home."
          >
            <Link href="/marketplace" className="palmer-button palmer-button-solid">
              Search marketplace <Search className="size-4" aria-hidden="true" />
            </Link>
            <Link href="/" className="palmer-button palmer-button-ghost">
              WHISPERX home <ArrowLeft className="size-4" aria-hidden="true" />
            </Link>
          </ProductionState>
        </div>
      </div>
    </main>
  )
}
