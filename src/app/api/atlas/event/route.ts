import { NextResponse, type NextRequest } from "next/server";
import { loadCorpus } from "@/lib/atlas/corpus";

export const dynamic = "force-dynamic";

/** GET /api/atlas/place?event=<id> — full evidence record for one event. */
export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("event");
  if (!id) return NextResponse.json({ error: "event id required" }, { status: 400 });
  try {
    const corpus = loadCorpus();
    const event = corpus.events.find((e) => e.id === id);
    if (!event) return NextResponse.json({ error: "not found" }, { status: 404 });
    const srcIds = new Set(event.sources.map((s) => s.source));
    const sources = corpus.sources.filter((s) => srcIds.has(s.id));
    const entities = corpus.entities.filter((e) => event.entities.includes(e.id)).map((e) => ({ id: e.id, names: e.names }));
    return NextResponse.json({ event, sources, entities });
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "atlas error" }, { status: 503 });
  }
}
