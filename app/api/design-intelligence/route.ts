import { NextResponse } from "next/server"
import { z } from "zod"
import { getDesignIntelligenceCatalog, recommendDesign } from "@/lib/design-intelligence"

const RecommendationRequest = z.object({
  brief: z.string().trim().min(3).max(4000),
  productType: z.string().trim().max(120).optional(),
  stack: z.string().trim().max(80).optional(),
})

export async function GET() {
  const catalog = getDesignIntelligenceCatalog()
  return NextResponse.json({
    source: catalog.source,
    profiles: catalog.profiles.map(({ id, name, keywords }) => ({ id, name, keywords })),
    stacks: catalog.stacks.map(({ id, name }) => ({ id, name })),
  })
}

export async function POST(request: Request) {
  let payload: unknown
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 })
  }

  const parsed = RecommendationRequest.safeParse(payload)
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid design brief.", issues: parsed.error.flatten() },
      { status: 422 },
    )
  }

  return NextResponse.json(recommendDesign(parsed.data))
}
