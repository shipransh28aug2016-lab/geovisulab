import { NextResponse } from "next/server";
import { store } from "@/db/store";
import { withIdempotency } from "@/lib/idempotency";

export const dynamic = "force-dynamic";

/** `GET /api/annotations?userId=...` — list field-note pins. */
export async function GET(req: Request) {
  const userId = new URL(req.url).searchParams.get("userId");
  try {
    const annotations = await store.listAnnotations(userId);
    return NextResponse.json({ success: true, total: annotations.length, annotations });
  } catch (error) {
    console.error("GET /api/annotations error:", error);
    return NextResponse.json({ success: false, error: "Failed to load annotations", annotations: [] }, { status: 500 });
  }
}

/**
 * `POST /api/annotations` — drop a field note on the map.
 * Response `{ success, annotation }` is read directly by handleSaveAnnotation in page.tsx.
 */
export async function POST(req: Request) {
  return withIdempotency(
    req,
    { scope: "create_annotation", fallbackKey: (body) => body?.id ?? null },
    async (body) => {
      try {
        if (!body?.title || body.latitude === undefined || body.longitude === undefined) {
          return NextResponse.json(
            { success: false, error: "title, latitude and longitude are required" },
            { status: 400 }
          );
        }
        const now = new Date();
        const annotation = await store.createAnnotation({
          id: String(body.id ?? `annot-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`),
          userId: body.userId ?? null,
          title: String(body.title),
          description: String(body.description ?? ""),
          category: String(body.category ?? "general"),
          latitude: String(body.latitude),
          longitude: String(body.longitude),
          elevation: body.elevation != null ? String(body.elevation) : null,
          classGrade: String(body.classGrade ?? "11"),
          chapterRef: String(body.chapterRef ?? "Unassigned"),
          markerColor: String(body.markerColor ?? "#3b82f6"),
          tags: Array.isArray(body.tags) ? body.tags.map(String) : [],
          isShared: body.isShared !== false,
          createdAt: now,
          updatedAt: now,
        });
        return NextResponse.json({ success: true, annotation }, { status: 201 });
      } catch (error) {
        console.error("POST /api/annotations error:", error);
        return NextResponse.json({ success: false, error: "Failed to create annotation" }, { status: 500 });
      }
    }
  );
}
