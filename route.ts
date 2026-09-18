import { NextResponse } from "next/server";
import { db } from "@/db";
import { annotations } from "@/db/schema";
import { eq } from "drizzle-orm";
import { withIdempotency } from "@/lib/idempotency";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return withIdempotency(
    req,
    {
      scope: "update_annotation",
      fallbackKey: () => `update_annot_${id}`,
    },
    async (body) => {
      try {
        const existing = await db.select().from(annotations).where(eq(annotations.id, id)).limit(1);
        if (existing.length === 0) {
          return NextResponse.json({ success: false, error: "Annotation not found" }, { status: 404 });
        }

        const updated = {
          title: body?.title ?? existing[0].title,
          description: body?.description ?? existing[0].description,
          category: body?.category ?? existing[0].category,
          latitude: body?.latitude ? String(body.latitude) : existing[0].latitude,
          longitude: body?.longitude ? String(body.longitude) : existing[0].longitude,
          elevation: body?.elevation ?? existing[0].elevation,
          classGrade: body?.classGrade ?? existing[0].classGrade,
          chapterRef: body?.chapterRef ?? existing[0].chapterRef,
          markerColor: body?.markerColor ?? existing[0].markerColor,
          tags: body?.tags ?? existing[0].tags,
          updatedAt: new Date(),
        };

        await db.update(annotations).set(updated).where(eq(annotations.id, id));

        return NextResponse.json({ success: true, annotation: { ...existing[0], ...updated } });
      } catch (error) {
        console.error("PUT /api/annotations/[id] error:", error);
        return NextResponse.json({ success: false, error: "Failed to update annotation" }, { status: 500 });
      }
    }
  );
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await db.delete(annotations).where(eq(annotations.id, id));
    return NextResponse.json({ success: true, message: "Annotation deleted successfully" });
  } catch (error) {
    console.error("DELETE /api/annotations/[id] error:", error);
    return NextResponse.json({ success: false, error: "Failed to delete annotation" }, { status: 500 });
  }
}
