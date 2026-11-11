import { NextResponse } from "next/server";
import { store } from "@/db/store";
import { withIdempotency } from "@/lib/idempotency";

export const dynamic = "force-dynamic";

/**
 * `POST /api/quizzes/[id]/attempt` — record a completed attempt.
 * Body from page.tsx: `{ userId, score, maxScore, answers }`. Response `{ success, attempt }`.
 */
export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return withIdempotency(
    req,
    { scope: "quiz_attempt", fallbackKey: (body) => (body?.userId ? `${id}:${body.userId}` : null) },
    async (body) => {
      try {
        const score = Number(body?.score);
        const maxScore = Number(body?.maxScore);
        if (!Number.isFinite(score) || !Number.isFinite(maxScore) || maxScore <= 0) {
          return NextResponse.json({ success: false, error: "numeric score and maxScore are required" }, { status: 400 });
        }
        const attempt = await store.recordAttempt({
          id: `attempt-${id}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`,
          userId: body?.userId != null ? String(body.userId) : null,
          quizId: id,
          score,
          maxScore,
          answers: body?.answers ?? null,
          timeSpentSeconds: Number.isFinite(Number(body?.timeSpentSeconds)) ? Number(body.timeSpentSeconds) : 0,
        });
        return NextResponse.json({ success: true, attempt }, { status: 201 });
      } catch (error) {
        console.error(`POST /api/quizzes/${id}/attempt error:`, error);
        return NextResponse.json({ success: false, error: "Failed to record attempt" }, { status: 500 });
      }
    }
  );
}
