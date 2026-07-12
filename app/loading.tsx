import { ProductionSkeleton } from "@/components/system/production-state"

export default function Loading() {
  return (
    <main className="production-global-state" aria-busy="true">
      <div className="production-global-state__inner">
        <p className="production-global-state__code">WHISPERX / ROUTE TRANSITION</p>
        <h1>Loading the system.</h1>
        <p>Preparing typed records, layout, interaction state, and local capability context.</p>
        <div className="mt-10">
          <ProductionSkeleton rows={5} label="Loading WHISPERX content" />
        </div>
      </div>
    </main>
  )
}
