import { db } from "./index";
import { users, annotations, customQuizzes, studyProgress } from "./schema";
import { INITIAL_USERS, INITIAL_ANNOTATIONS, INITIAL_QUIZZES } from "./seed-data";
import { eq } from "drizzle-orm";

let isSeeded = false;

export async function ensureDbSeeded() {
  if (isSeeded) return;

  try {
    // Check if users exist
    const existingUsers = await db.select().from(users).limit(1);
    if (existingUsers.length === 0) {
      // Seed users
      for (const u of INITIAL_USERS) {
        await db.insert(users).values(u).onConflictDoNothing();
      }

      // Seed annotations
      for (const a of INITIAL_ANNOTATIONS) {
        await db.insert(annotations).values(a).onConflictDoNothing();
      }

      // Seed quizzes
      for (const q of INITIAL_QUIZZES) {
        await db.insert(customQuizzes).values(q).onConflictDoNothing();
      }

      // Seed some initial study progress
      await db.insert(studyProgress).values([
        {
          id: "sp-1",
          userId: "user-aarav-11",
          syllabusTopicId: "c11-phys-u2-ch4",
          classGrade: "11",
          status: "mastered",
          confidence: 5,
          notes: "Revised Wegener's Continental Drift, 7 major plates, and convergent/divergent boundaries.",
        },
        {
          id: "sp-2",
          userId: "user-aarav-11",
          syllabusTopicId: "c11-ind-u2-ch3",
          classGrade: "11",
          status: "in_progress",
          confidence: 4,
          notes: "Memorized left/right bank tributaries of Ganga and Indus systems. Need to review Kaveri disputes.",
        },
      ]).onConflictDoNothing();
    }
    isSeeded = true;
  } catch (err) {
    console.warn("DB seed check (tables might not be created yet):", err);
  }
}
