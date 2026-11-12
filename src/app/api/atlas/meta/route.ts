import { NextResponse } from "next/server";

import { CorpusError, CorpusNotBuiltError, corpusStatus, eventTimeline } from "@/lib/atlas/corpus";
import type { AtlasMetaResponse } from "@/lib/atlas/api-types";

export const dynamic = "force-dynamic";

/**
 * `GET /api/atlas/meta` — everything the atlas chrome needs before the learner picks a year.
 *
 * One trip returns the corpus status (which shape tier is available, what is missing, how many records
 * exist) and the event timeline the year scrubber draws its ticks from. Keeping these together means the
 * coverage banner and the scrubber are consistent with each other, which matters because the banner
 * explains why some ticks have no outlines on the map.
 *
 * Deliberately returns NO geometry: the timeline entries carry a single point each at most, and the
 * base layers come from `/api/atlas/basemap`.
 */
export async function GET() {
  try {
    const status = corpusStatus();
    if (!status.present) {
      // 503, not 200 with empty arrays. "The corpus has not been built" and "the corpus is empty
      // because nothing matched this year" are different facts and must not render the same way.
      return NextResponse.json(
        {
          success: false,
          error:
            "The atlas corpus has not been built in this deployment. Run `npm run atlas:build` " +
            "(or `npm run atlas:fetch` first on a clean clone) to generate it.",
          status,
        },
        { status: 503 },
      );
    }
    const body: AtlasMetaResponse = { success: true, status, timeline: eventTimeline() };
    return NextResponse.json(body);
  } catch (error) {
    if (error instanceof CorpusNotBuiltError) {
      return NextResponse.json({ success: false, error: error.message }, { status: 503 });
    }
    const message = error instanceof CorpusError ? error.message : "Failed to read the atlas corpus";
    console.error("GET /api/atlas/meta error:", error);
    // A corrupt corpus is a server fault; an absent one is a deployment state. Different statuses so
    // monitoring can tell them apart.
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
