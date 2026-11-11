import { NextResponse } from "next/server";
import { store } from "@/db/store";
import { withIdempotency } from "@/lib/idempotency";

export const dynamic = "force-dynamic";

/**
 * `PUT /api/annotations/[id]` and `DELETE /api/annotations/[id]`.
 *
 * Original file reached for the Drizzle client directly; it now goes through `@/db/store` so it works
 * on both adapters (DECISION D-002). Response contract is unchanged:
 * `{ success, annotation }` for PUT — page.tsx replaces the row in local state with it.
 */
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return withIdempotency(
    req,
    {
      scope: "update_annotation",
      fallbackKey: () => `update_annot_${id}`,
    },
    async (body) => {
      try {
        const existing = await store.findAnnotation(id);
        if (!existing) {
          return NextResponse.json({ success: false, error: "Annotation not found" }, { status: 404 });
        }

        const updated = await store.updateAnnotation(id, {
          title: body?.title ?? existing.title,
          description: body?.description ?? existing.description,
          category: body?.category ?? existing.category,
          latitude: body?.latitude !== undefined ? String(body.latitude) : existing.latitude,
          longitude: body?.longitude !== undefined ? String(body.longitude) : existing.longitude,
          elevation: body?.elevation ?? existing.elevation ?? null,
          classGrade: body?.classGrade ?? existing.classGrade,
          chapterRef: body?.chapterRef ?? existing.chapterRef,
          markerColor: body?.markerColor ?? existing.markerColor,
          tags: Array.isArray(body?.tags) ? body.tags.map(String) : (existing.tags ?? []),
        });

        return NextResponse.json({ success: true, annotation: updated ?? { ...existing } });
      } catch (error) {
        console.error("PUT /api/annotations/[id] error:", error);
        return NextResponse.json({ success: false, error: "Failed to update annotation" }, { status: 500 });
      }
    }
  );
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const deleted = await store.deleteAnnotation(id);
    if (!deleted) {
      return NextResponse.json({ success: false, error: "Annotation not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "Annotation deleted successfully" });
  } catch (error) {
    console.error("DELETE /api/annotations/[id] error:", error);
    return NextResponse.json({ success: false, error: "Failed to delete annotation" }, { status: 500 });
  }
}
