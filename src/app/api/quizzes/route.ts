import { NextResponse } from "next/server";
import { store } from "@/db/store";
import { withIdempotency } from "@/lib/idempotency";

export const dynamic = "force-dynamic";

/**
 * `GET /api/quizzes?userId=...` — official quizzes plus quizzes authored by that user (teacher role).
 * Official quizzes carry `isOfficial: true` and are visible to everyone.
 */
export async function GET(req: Request) {
  const userId = new URL(req.url).searchParams.get("userId");
  try {
    const quizzes = await store.listQuizzes(userId);
    return NextResponse.json({ success: true, total: quizzes.length, quizzes });
  } catch (error) {
    console.error("GET /api/quizzes error:", error);
    return NextResponse.json({ success: false, error: "Failed to load quizzes", quizzes: [] }, { status: 500 });
  }
}

/**
 * `POST /api/quizzes` — author a practice quiz. Body: `{ ...quizData, userId }`.
 * Response `{ success, quiz }` is read by handleCreateQuiz in page.tsx.
 */
export async function POST(req: Request) {
  return withIdempotency(
    req,
    { scope: "create_quiz", fallbackKey: (body) => body?.id ?? null },
    async (body) => {
      try {
        if (!body?.title || !Array.isArray(body?.questions) || body.questions.length === 0) {
          return NextResponse.json(
            { success: false, error: "title and a non-empty questions array are required" },
            { status: 400 }
          );
        }
        const quiz = await store.createQuiz({
          id: String(body.id ?? `quiz-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`),
          userId: body.userId != null ? String(body.userId) : null,
          title: String(body.title),
          description: String(body.description ?? ""),
          classGrade: String(body.classGrade ?? "11"),
          chapterRef: String(body.chapterRef ?? "Unassigned"),
          difficulty: ["easy", "medium", "hard"].includes(body.difficulty) ? String(body.difficulty) : "medium",
          questions: body.questions,
          // Authored quizzes are never marked official by the client; only seeded content is.
          isOfficial: false,
        });
        return NextResponse.json({ success: true, quiz }, { status: 201 });
      } catch (error) {
        console.error("POST /api/quizzes error:", error);
        return NextResponse.json({ success: false, error: "Failed to create quiz" }, { status: 500 });
      }
    }
  );
}
