import { NextResponse, type NextRequest } from "next/server";
import { parseSnapshotQuery, shapesForSnapshot, CorpusError } from "@/lib/atlas/corpus";

export const dynamic = "force-dynamic";

/** GET /api/atlas/snapshot?year=261&era=BCE | ?astronomical=-260 | ?edtf=1765-08-12 */
export async function GET(req: NextRequest) {
  const q = Object.fromEntries(req.nextUrl.searchParams.entries());
  try {
    const parsed = parseSnapshotQuery(q);
    if (!parsed.ok) return NextResponse.json({ error: parsed.reason }, { status: parsed.status });
    const { snapshot } = parsed;
    const shapes = shapesForSnapshot(snapshot);
    // Names for the legend / shape colouring: shape id -> entity id.
    const shapeEntity: Record<string, string> = {};
    for (const a of snapshot.assertions) if (a.shape) shapeEntity[a.shape] = a.subject;
    return NextResponse.json(
      { snapshot, shapes: { ...shapes, features: shapes.features }, shapeEntity },
      { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } },
    );
  } catch (err) {
    const status = err instanceof CorpusError ? 503 : 500;
    return NextResponse.json({ error: err instanceof Error ? err.message : "atlas error" }, { status });
  }
}
