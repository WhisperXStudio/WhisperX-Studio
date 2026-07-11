"use client"

import { useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, RotateCcw } from "lucide-react"
import { ProductionState } from "@/components/system/production-state"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("WHISPERX route error", {
      message: error.message,
      digest: error.digest,
    })
  }, [error])

  return (
    <main className="production-global-state">
      <div className="production-global-state__inner">
        <p className="production-global-state__code">WHISPERX / RECOVERY</p>
        <ProductionState
          tone="error"
          title="This route could not complete."
          description="The failure is contained to this route. Retry the render or return to the marketplace without losing browser-local records."
          live="assertive"
        >
          <button type="button" onClick={reset} className="palmer-button palmer-button-solid">
            Retry route <RotateCcw className="size-4" aria-hidden="true" />
          </button>
          <Link href="/marketplace" className="palmer-button palmer-button-ghost">
            Marketplace <ArrowLeft className="size-4" aria-hidden="true" />
          </Link>
        </ProductionState>
        {error.digest ? (
          <p className="mt-5 font-mono text-[9px] uppercase tracking-[0.15em] text-foreground/40">
            Recovery reference: {error.digest}
          </p>
        ) : null}
      </div>
    </main>
  )
}
