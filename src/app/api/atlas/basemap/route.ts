import { NextResponse } from "next/server";

import { BasemapError, basemapAttribution, loadBasemapLayer, loadBasemapManifest } from "@/lib/atlas/basemap";
import type { AtlasBasemapResponse, BasemapLayerDto } from "@/lib/atlas/api-types";

export const dynamic = "force-dynamic";

/** Every layer the basemap pipeline can produce, in draw order (bottom first). */
const KNOWN_LAYERS = ["land", "lakes", "coastline", "rivers", "graticule"] as const;

/**
 * `GET /api/atlas/basemap?layers=land,coastline,rivers` — the physical base map as GeoJSON.
 *
 * WHY THIS EXISTS INSTEAD OF A TILE URL. The obvious implementation points MapLibre at a third-party
 * raster or vector tile server. That was rejected for three reasons:
 *
 *   1. It breaks in any environment without outbound network access, including the sandboxed preview
 *      frame this app is reviewed in. Serving our own committed GeoJSON means the map is complete
 *      offline, in CI, and on a train.
 *   2. Provenance. Every layer here has a recorded upstream sha256, a licence and a modification note
 *      in the basemap manifest, and this route returns them. A tile URL gives the learner nothing to
 *      evaluate — and this project's whole premise is that a claim should be traceable.
 *   3. Honesty about content. The manifest is checked at build time to contain NO political or
 *      administrative boundary layer (validator rule E020), so a modern border cannot masquerade as a
 *      historical one. A third-party basemap would silently reintroduce exactly that.
 *
 * Total payload for all five layers is about 470 KB, fetched once and cached by the browser.
 */
export async function GET(req: Request) {
  const requested = new URL(req.url).searchParams.get("layers");
  const wanted = requested
    ? requested.split(",").map((l) => l.trim()).filter((l) => l.length > 0)
    : [...KNOWN_LAYERS];

  const unknown = wanted.filter((l) => !KNOWN_LAYERS.includes(l as (typeof KNOWN_LAYERS)[number]));
  if (unknown.length > 0) {
    return NextResponse.json(
      {
        success: false,
        error: `Unknown basemap layer(s): ${unknown.join(", ")}. Available: ${KNOWN_LAYERS.join(", ")}.`,
      },
      { status: 400 },
    );
  }

  try {
    const manifest = loadBasemapManifest();
    // Typed as the contract's DTO, not `unknown`: this is exactly the value the client parses, and an
    // `unknown` here would let a renamed field ship without any error on either side.
    const layers: Record<string, BasemapLayerDto> = {};
    for (const name of wanted) {
      const file = `${name}.geojson`;
      const entry = manifest.layers.find((l) => l.out === file);
      if (!entry) continue;
      layers[name] = {
        // The manifest entry travels with the geometry so the client can render attribution, licence
        // and the upstream sha256 without a second request.
        provenance: entry,
        data: loadBasemapLayer(file),
      };
    }

    const body: AtlasBasemapResponse = {
      success: true,
      attribution: basemapAttribution(),
      source: manifest.source,
      license: manifest.license,
      corridor: manifest.corridor,
      generatedAt: manifest.generatedAt,
      layers: wanted,
      data: layers,
    };
    return NextResponse.json(body);
  } catch (error) {
    if (error instanceof BasemapError) {
      // The basemap is a build artifact; if it is missing the deployment is incomplete, not the
      // request malformed.
      return NextResponse.json({ success: false, error: error.message }, { status: 503 });
    }
    console.error("GET /api/atlas/basemap error:", error);
    return NextResponse.json({ success: false, error: "Failed to read the basemap" }, { status: 500 });
  }
}
