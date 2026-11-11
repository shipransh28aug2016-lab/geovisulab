import { NextResponse } from "next/server";
import { store } from "@/db/store";

export const dynamic = "force-dynamic";

/**
 * Single-trip initial loader, documented in docs/geography-testing-report.md and called by
 * `src/app/page.tsx` as `GET /api/bootstrap?userId=...`.
 * Contract consumed by the frontend: `{ success, annotations, quizzes, progress, bookmarks }`
 * where `progress` is an ARRAY (page.tsx builds a map keyed by syllabusTopicId).
 */
export async function GET(req: Request) {
  const userId = new URL(req.url).searchParams.get("userId");
  try {
    const [annotations, quizzes, progress, bookmarks] = await Promise.all([
      store.listAnnotations(userId),
      store.listQuizzes(userId),
      store.listProgress(userId),
      store.listBookmarks(userId),
    ]);
    return NextResponse.json({ success: true, annotations, quizzes, progress, bookmarks });
  } catch (error) {
    console.error("GET /api/bootstrap error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to bootstrap session data", annotations: [], quizzes: [], progress: [], bookmarks: [] },
      { status: 500 }
    );
  }
}
