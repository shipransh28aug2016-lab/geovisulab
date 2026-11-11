import { NextResponse } from "next/server";
import { store } from "@/db/store";
import { withIdempotency } from "@/lib/idempotency";

export const dynamic = "force-dynamic";

const VALID_STATUS = new Set(["not_started", "in_progress", "mastered"]);

/** `GET /api/study-progress?userId=...` — topic mastery rows. */
export async function GET(req: Request) {
  const userId = new URL(req.url).searchParams.get("userId");
  try {
    const progress = await store.listProgress(userId);
    return NextResponse.json({ success: true, total: progress.length, progress });
  } catch (error) {
    console.error("GET /api/study-progress error:", error);
    return NextResponse.json({ success: false, error: "Failed to load progress", progress: [] }, { status: 500 });
  }
}

/**
 * `POST /api/study-progress` — upsert mastery for one syllabus topic.
 * Body from page.tsx: `{ userId, syllabusTopicId, classGrade, status, notes }`.
 * Idempotent by (userId, syllabusTopicId) — enforced by a unique index in Postgres and by the
 * file adapter's upsert path.
 */
export async function POST(req: Request) {
  return withIdempotency(
    req,
    {
      scope: "study_progress",
      fallbackKey: (body) =>
        body?.userId && body?.syllabusTopicId ? `${body.userId}:${body.syllabusTopicId}:${body.status}` : null,
    },
    async (body) => {
      try {
        const status = String(body?.status ?? "not_started");
        if (!body?.userId || !body?.syllabusTopicId) {
          return NextResponse.json({ success: false, error: "userId and syllabusTopicId are required" }, { status: 400 });
        }
        if (!VALID_STATUS.has(status)) {
          return NextResponse.json(
            { success: false, error: `status must be one of ${[...VALID_STATUS].join(", ")}` },
            { status: 400 }
          );
        }
        const confidence = Number(body.confidence ?? 3);
        const row = await store.upsertProgress({
          userId: String(body.userId),
          syllabusTopicId: String(body.syllabusTopicId),
          classGrade: String(body.classGrade ?? "11"),
          status,
          confidence: Number.isFinite(confidence) ? Math.min(5, Math.max(1, confidence)) : 3,
          notes: body.notes != null ? String(body.notes) : null,
        });
        return NextResponse.json({ success: true, progress: row });
      } catch (error) {
        console.error("POST /api/study-progress error:", error);
        return NextResponse.json({ success: false, error: "Failed to record progress" }, { status: 500 });
      }
    }
  );
}
