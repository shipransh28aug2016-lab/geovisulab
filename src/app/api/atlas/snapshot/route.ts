import { NextResponse } from "next/server";

import {
  CorpusError,
  CorpusNotBuiltError,
  parseSnapshotQuery,
  shapesForSnapshot,
} from "@/lib/atlas/corpus";
import type { AtlasSnapshotResponse } from "@/lib/atlas/api-types";

export const dynamic = "force-dynamic";

/**
 * `GET /api/atlas/snapshot` — everything the corridor held in one year.
 *
 *   ?year=261&era=BCE      historical notation, as a learner writes it
 *   ?year=1765&era=CE      (era also accepts BC and AD)
 *   ?astronomical=-260     the numbering the corpus stores
 *   ?edtf=1765-08-12       an exact date, e.g. the grant of the diwani
 *
 * A bare `?year=-260` is REJECTED with 400. Historical and astronomical numbering differ by one for
 * every year at or before 1 BCE, so an unlabelled negative year is ambiguous and guessing would place
 * the Kalinga war a year out. The response explains how to disambiguate instead of picking silently.
 *
 * This is the route that makes the imported corpus usable: the collections are about 1 MB of JSON and
 * the corridor geometry is 24.6 MB, none of which may reach a browser. Filtering happens on the server
 * and a single year costs at most 12 shapes and about 0.36 MB — the measurement that retired the tile
 * server.
 */
export async function GET(req: Request) {
  const params = Object.fromEntries(new URL(req.url).searchParams.entries());

  try {
    const parsed = parseSnapshotQuery(params);
    if (!parsed.ok) {
      return NextResponse.json({ success: false, error: parsed.reason }, { status: parsed.status });
    }

    const shapes = shapesForSnapshot(parsed.snapshot);
    const { snapshot } = parsed;

    const body: AtlasSnapshotResponse = {
      success: true,
      // The year in BOTH numbering systems, with display strings already rendered by the temporal
      // engine, so no client has to reimplement the BCE conversion or the no-year-zero rule.
      year: {
        astronomical: snapshot.astronomicalYear,
        historical: snapshot.historicalNotation,
        display: snapshot.displayYear,
        century: snapshot.century,
        query: snapshot.query,
      },
      counts: snapshot.counts,
      /** How many matched records carry each kind of date certainty. Render this; do not flatten it. */
      certainty: snapshot.certainty,
      entities: snapshot.entities,
      assertions: snapshot.assertions,
      events: snapshot.events,
      places: snapshot.places,
      /**
       * Geometry plus an explicit statement of how complete it is. `tier` is "focus" when only the
       * committed 145-shape subset is present, and `missing` lists the asserted shapes that could not
       * be supplied. The client must show that, because a map with one polity missing at the moment of
       * a war fought there is worse than a map that says it is incomplete.
       */
      shapes: {
        tier: shapes.tier,
        requested: shapes.requested,
        found: shapes.found,
        missing: shapes.missing,
        approxBytes: shapes.approxBytes,
        note: shapes.note,
        data: { type: "FeatureCollection", features: shapes.features },
      },
      /** Records considered and excluded, so a partial answer is never mistaken for a complete one. */
      exclusions: snapshot.exclusions,
      bounds: snapshot.bounds,
      generatedAt: snapshot.generatedAt,
    };
    return NextResponse.json(body);
  } catch (error) {
    if (error instanceof CorpusNotBuiltError) {
      return NextResponse.json({ success: false, error: error.message }, { status: 503 });
    }
    if (error instanceof CorpusError) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
    console.error("GET /api/atlas/snapshot error:", error);
    return NextResponse.json({ success: false, error: "Failed to build the atlas snapshot" }, { status: 500 });
  }
}
