import { NextResponse } from "next/server";
import { loadBasemapLayer, loadBasemapManifest, basemapAttribution } from "@/lib/atlas/basemap";

export const dynamic = "force-static";

const LAYERS = ["land", "lakes", "rivers", "coastline", "graticule"] as const;

export async function GET() {
  try {
    const manifest = loadBasemapManifest();
    const layers: Record<string, unknown> = {};
    for (const name of LAYERS) layers[name] = loadBasemapLayer(`${name}.geojson`);
    return NextResponse.json(
      { corridor: manifest.corridor, clipWindow: manifest.clipWindow, attribution: basemapAttribution(), layers },
      { headers: { "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800" } },
    );
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "basemap error" }, { status: 503 });
  }
}
