import { NextResponse } from "next/server";
import { store } from "@/db/store";
import { withIdempotency } from "@/lib/idempotency";

export const dynamic = "force-dynamic";

/** `GET /api/bookmarks?userId=...` */
export async function GET(req: Request) {
  const userId = new URL(req.url).searchParams.get("userId");
  try {
    const bookmarks = await store.listBookmarks(userId);
    return NextResponse.json({ success: true, total: bookmarks.length, bookmarks });
  } catch (error) {
    console.error("GET /api/bookmarks error:", error);
    return NextResponse.json({ success: false, error: "Failed to load bookmarks", bookmarks: [] }, { status: 500 });
  }
}

/**
 * `POST /api/bookmarks` — TOGGLE semantics, because page.tsx uses one endpoint for both directions:
 *   add    -> { userId, featureId, title, category, classGrade, notes, coordinates? }
 *   remove -> { userId, featureId }
 * The route resolves the direction from stored state: present -> delete, absent -> create.
 * `action: "add" | "remove"` may be sent to make the intent explicit instead of toggling.
 */
export async function POST(req: Request) {
  return withIdempotency(
    req,
    {
      scope: "bookmark_toggle",
      // Deliberately NO fallbackKey. A toggle is not idempotent: the same (userId, featureId) pair
      // legitimately appears in both an "add" and a "remove" request with different payloads, so a
      // derived key would raise IDEMPOTENCY_PAYLOAD_MISMATCH on a valid removal. page.tsx already
      // sends a unique `Idempotency-Key` for adds; removals are safe to replay because deleting an
      // absent bookmark is a no-op that reports `removed: false`.
    },
    async (body) => {
      try {
        const userId = body?.userId != null ? String(body.userId) : null;
        const featureId = String(body?.featureId ?? "");
        if (!featureId) {
          return NextResponse.json({ success: false, error: "featureId is required" }, { status: 400 });
        }

        const existing = await store.findBookmark(userId, featureId);
        const intent: "add" | "remove" =
          body?.action === "add" ? "add" : body?.action === "remove" ? "remove" : existing ? "remove" : "add";

        if (intent === "remove") {
          const removed = await store.deleteBookmark(userId, featureId);
          return NextResponse.json({ success: true, bookmarked: false, removed, featureId });
        }

        const bookmark = await store.createBookmark({
          id: `bm-${userId ?? "anon"}-${featureId}`,
          userId,
          featureId,
          title: String(body.title ?? featureId),
          category: String(body.category ?? "Physical Geography"),
          classGrade: String(body.classGrade ?? "11"),
          coordinates:
            body.coordinates && typeof body.coordinates === "object"
              ? { lat: Number(body.coordinates.lat), lng: Number(body.coordinates.lng) }
              : null,
          notes: body.notes != null ? String(body.notes) : null,
        });
        return NextResponse.json({ success: true, bookmarked: true, bookmark }, { status: 201 });
      } catch (error) {
        console.error("POST /api/bookmarks error:", error);
        return NextResponse.json({ success: false, error: "Failed to update bookmark" }, { status: 500 });
      }
    }
  );
}
