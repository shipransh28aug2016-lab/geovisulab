import { store } from "./store";
import { INITIAL_USERS, INITIAL_ANNOTATIONS, INITIAL_QUIZZES } from "./seed-data";

/**
 * Seeds the demo corpus (accounts, field notes, official quizzes) on first run.
 *
 * Rewritten for DECISION D-002: it used to talk to Drizzle directly and swallowed every error, so a
 * missing database looked like "already seeded". It now goes through `@/db/store`, which means it
 * works identically on Postgres and on the file adapter, and it reports what it actually did.
 */
let isSeeded = false;

export interface SeedResult {
  seeded: boolean;
  storage: "postgres" | "file";
  created: { users: number; annotations: number; quizzes: number };
}

export async function ensureDbSeeded(): Promise<SeedResult> {
  const result: SeedResult = { seeded: isSeeded, storage: store.kind, created: { users: 0, annotations: 0, quizzes: 0 } };
  if (isSeeded) return result;

  const existingUsers = await store.listUsers();
  if (existingUsers.length === 0) {
    for (const u of INITIAL_USERS) {
      await store.createUser(u);
      result.created.users += 1;
    }
  }

  const existingAnnotations = await store.listAnnotations();
  if (existingAnnotations.length === 0) {
    for (const a of INITIAL_ANNOTATIONS) {
      await store.createAnnotation(a as never);
      result.created.annotations += 1;
    }
  }

  const existingQuizzes = await store.listQuizzes();
  if (existingQuizzes.length === 0) {
    for (const q of INITIAL_QUIZZES) {
      await store.createQuiz(q as never);
      result.created.quizzes += 1;
    }
  }

  const existingProgress = await store.listProgress("user-aarav-11");
  if (existingProgress.length === 0) {
    await store.upsertProgress({
      userId: "user-aarav-11",
      syllabusTopicId: "c11-phys-ch4",
      classGrade: "11",
      status: "mastered",
      confidence: 5,
      notes: "Revised Wegener's Continental Drift, 7 major plates, and convergent/divergent boundaries.",
    });
    await store.upsertProgress({
      userId: "user-aarav-11",
      syllabusTopicId: "c11-ind-ch3",
      classGrade: "11",
      status: "in_progress",
      confidence: 4,
      notes: "Memorized left/right bank tributaries of Ganga and Indus systems. Need to review Kaveri disputes.",
    });
  }

  isSeeded = true;
  result.seeded = true;
  return result;
}
