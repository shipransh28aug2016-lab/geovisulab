import { NextResponse } from "next/server";
import { CBSE_CURRICULUM_REGISTRY } from "@/data/cbse-curriculum-registry";

export const dynamic = "force-dynamic";

/**
 * Machine-readable CBSE 2026-27 curriculum registry.
 * Documented as `GET /api/curriculum` -> `{ success, total, topics }`.
 * Optional filters: `?classGrade=11|12`, `?subject=...`, `?q=...` (substring match on title/keywords).
 */
export async function GET(req: Request) {
  const params = new URL(req.url).searchParams;
  const classGrade = params.get("classGrade");
  const q = params.get("q")?.trim().toLowerCase();

  let topics = CBSE_CURRICULUM_REGISTRY;
  if (classGrade && classGrade !== "all") {
    topics = topics.filter((t) => String(t.classGrade) === classGrade);
  }
  if (q) {
    topics = topics.filter((t) => JSON.stringify(t).toLowerCase().includes(q));
  }
  return NextResponse.json({ success: true, total: topics.length, topics });
}
