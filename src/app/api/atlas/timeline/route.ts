import { NextResponse } from "next/server";
import { eventTimeline, corpusStatus } from "@/lib/atlas/corpus";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Never expose the server filesystem path.
    const { dataRoot: _dataRoot, ...status } = corpusStatus();
    void _dataRoot;
    return NextResponse.json(
      { events: eventTimeline(), status },
      { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } },
    );
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "atlas error" }, { status: 503 });
  }
}
