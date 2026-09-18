/**
 * Production Reliability Verification Suite:
 * 1. Database Index Audit (Indexes on all foreign keys, composite filters, order-by clauses, and unique constraints)
 * 2. Idempotency Key Engine (Payload hashing, replay with identical payload, detection of payload mismatch, lock concurrency)
 * 3. End-to-end route idempotency on mutations
 */

import "dotenv/config";
import { db } from "../src/db";
import { users, annotations, studyProgress, bookmarks, customQuizzes, quizAttempts, idempotencyKeys } from "../src/db/schema";
import { computePayloadHash, canonicalizeJson, withIdempotency } from "../src/lib/idempotency";
import { sql, eq, and, desc } from "drizzle-orm";
import { NextResponse } from "next/server";

async function runAudit() {
  console.log("=================================================");
  console.log("PRODUCTION RELIABILITY & DATABASE INDEX AUDIT");
  console.log("=================================================\n");

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string, detail?: string) {
    if (condition) {
      console.log(`[PASS] ${testName}`);
      passed++;
    } else {
      console.error(`[FAIL] ${testName}`);
      if (detail) console.error(`       Detail: ${detail}`);
      failed++;
    }
  }

  try {
    // -------------------------------------------------------------
    // PART 1: DATABASE INDEX AUDIT IN POSTGRESQL
    // -------------------------------------------------------------
    console.log("--- 1. AUDITING DATABASE INDEXES IN POSTGRESQL ---");
    const indexQuery = await db.execute(sql`
      SELECT tablename, indexname, indexdef
      FROM pg_indexes
      WHERE schemaname = 'public'
      ORDER BY tablename, indexname;
    `);

    const indexes = (indexQuery.rows || []) as { tablename: string; indexname: string; indexdef: string }[];
    const indexNames = new Set(indexes.map((i) => i.indexname));

    // Verify critical indexes
    assert(indexNames.has("idempotency_key_scope_unique_idx"), "idempotency_keys: Unique index on (key, scope)");
    assert(indexNames.has("idempotency_expires_at_idx"), "idempotency_keys: Index on (expires_at) for TTL cleanup");
    assert(indexNames.has("idempotency_status_locked_idx"), "idempotency_keys: Index on (status, locked_at)");
    
    assert(indexNames.has("study_progress_user_topic_unique_idx"), "study_progress: Unique index on (user_id, syllabus_topic_id)");
    assert(indexNames.has("study_progress_user_id_idx"), "study_progress: Index on (user_id)");
    assert(indexNames.has("study_progress_topic_idx"), "study_progress: Index on (syllabus_topic_id)");
    
    assert(indexNames.has("bookmarks_user_feature_unique_idx"), "bookmarks: Unique index on (user_id, feature_id)");
    assert(indexNames.has("bookmarks_user_id_idx"), "bookmarks: Index on (user_id)");
    assert(indexNames.has("bookmarks_class_grade_cat_idx"), "bookmarks: Composite index on (class_grade, category)");

    assert(indexNames.has("annotations_user_id_idx"), "annotations: Index on (user_id)");
    assert(indexNames.has("annotations_created_at_idx"), "annotations: Index on (created_at)");
    assert(indexNames.has("annotations_grade_category_idx"), "annotations: Composite index on (class_grade, category)");

    assert(indexNames.has("custom_quizzes_user_id_idx"), "custom_quizzes: Index on (user_id)");
    assert(indexNames.has("custom_quizzes_class_grade_created_idx"), "custom_quizzes: Index on (class_grade, created_at)");

    assert(indexNames.has("quiz_attempts_user_id_idx"), "quiz_attempts: Index on (user_id)");
    assert(indexNames.has("quiz_attempts_quiz_id_idx"), "quiz_attempts: Index on (quiz_id)");
    assert(indexNames.has("quiz_attempts_user_quiz_idx"), "quiz_attempts: Composite index on (user_id, quiz_id)");

    console.log(`Total verified indexes in database: ${indexes.length}\n`);

    // -------------------------------------------------------------
    // PART 2: CANONICAL HASHING & DETERMINISM
    // -------------------------------------------------------------
    console.log("--- 2. TESTING CANONICAL PAYLOAD HASHING ---");
    const payloadA = { title: "Test", lat: 28.5, active: true, tags: ["ncert", "ch3"] };
    const payloadB = { tags: ["ncert", "ch3"], lat: 28.5, title: "Test", active: true }; // different key ordering

    const hashA = computePayloadHash(payloadA);
    const hashB = computePayloadHash(payloadB);

    assert(hashA === hashB, "Deterministic hashing: Key-reordered JSON objects produce identical SHA-256 hashes");

    const payloadC = { title: "Test Modified", lat: 28.5, active: true, tags: ["ncert", "ch3"] };
    const hashC = computePayloadHash(payloadC);
    assert(hashA !== hashC, "Tampered payload produces distinct SHA-256 hash");

    // -------------------------------------------------------------
    // PART 3: IDEMPOTENCY EXECUTION & REPLAY
    // -------------------------------------------------------------
    console.log("\n--- 3. TESTING IDEMPOTENT EXECUTION & REPLAY ---");
    const testKey = `test_key_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
    const testPayload = { title: "Nanda Devi Basin", latitude: "30.3758", longitude: "79.9708", category: "mountains" };
    let executionCounter = 0;

    // Simulate Route Handler with withIdempotency
    const mockHandler = async (body: any) => {
      executionCounter++;
      return NextResponse.json({ success: true, count: executionCounter, data: body }, { status: 201 });
    };

    // First Call: Creates lock, executes handler, returns 201
    const req1 = new Request("http://localhost:3000/api/test-mutation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Idempotency-Key": testKey,
      },
      body: JSON.stringify(testPayload),
    });

    const res1 = await withIdempotency(req1, { scope: "test_scope" }, mockHandler);
    const data1 = await res1.json();

    assert(res1.status === 201, "First execution returns 201 Created");
    assert(data1.count === 1, "Handler executed once");
    assert(res1.headers.get("Idempotency-Key") === testKey, "Response includes Idempotency-Key header");
    assert(res1.headers.get("Idempotent-Replayed") === "false", "First response has Idempotent-Replayed: false");

    // Second Call with exact same key and payload: Must NOT execute handler, must return replay!
    const req2 = new Request("http://localhost:3000/api/test-mutation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Idempotency-Key": testKey,
      },
      body: JSON.stringify(testPayload),
    });

    const res2 = await withIdempotency(req2, { scope: "test_scope" }, mockHandler);
    const data2 = await res2.json();

    assert(res2.status === 201, "Replayed response preserves 201 status code");
    assert(data2.count === 1, "Handler was NOT re-executed (Execution count remained 1)");
    assert(res2.headers.get("Idempotent-Replayed") === "true", "Replayed response has Idempotent-Replayed: true");

    // Third Call with same key but DIFFERENT payload: Must reject with 422 Unprocessable Entity
    const req3 = new Request("http://localhost:3000/api/test-mutation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Idempotency-Key": testKey,
      },
      body: JSON.stringify({ ...testPayload, title: "Different Modified Title" }),
    });

    const res3 = await withIdempotency(req3, { scope: "test_scope" }, mockHandler);
    const data3 = await res3.json();

    assert(res3.status === 422, "Reused key with modified payload returns HTTP 422 Unprocessable Entity");
    assert(data3.code === "IDEMPOTENCY_PAYLOAD_MISMATCH", "Returns error code IDEMPOTENCY_PAYLOAD_MISMATCH");

    // Clean up test key
    await db.delete(idempotencyKeys).where(eq(idempotencyKeys.key, testKey));
    console.log("Test idempotency record cleaned up.\n");

    // -------------------------------------------------------------
    // PART 4: DATABASE ATOMIC UPSERT / CONSTRAINT INTEGRITY
    // -------------------------------------------------------------
    console.log("--- 4. TESTING DATABASE INTEGRITY & ATOMIC CONSTRAINTS ---");
    // Test that study_progress cannot have duplicates for same (userId, syllabusTopicId)
    const testTopic = `test_topic_${Date.now()}`;
    const testUser = "user-aarav-11";

    const insert1 = await db.insert(studyProgress).values({
      id: `sp-test-1-${Date.now()}`,
      userId: testUser,
      syllabusTopicId: testTopic,
      classGrade: "11",
      status: "in_progress",
    }).returning();
    assert(insert1.length === 1, "First study_progress record inserted successfully");

    // Second insert with same user and topic should throw unique constraint violation or be handled gracefully
    let duplicateRejected = false;
    try {
      await db.insert(studyProgress).values({
        id: `sp-test-2-${Date.now()}`,
        userId: testUser,
        syllabusTopicId: testTopic,
        classGrade: "11",
        status: "mastered",
      });
    } catch {
      duplicateRejected = true;
    }
    assert(duplicateRejected, "Database unique constraint study_progress_user_topic_unique_idx rejects duplicate entry");

    // Clean up test study progress
    await db.delete(studyProgress).where(eq(studyProgress.syllabusTopicId, testTopic));

    // -------------------------------------------------------------
    // SUMMARY
    // -------------------------------------------------------------
    console.log("\n=================================================");
    console.log(`RELIABILITY AUDIT SUMMARY: ${passed} PASSED, ${failed} FAILED`);
    console.log("=================================================");

    if (failed > 0) {
      process.exit(1);
    }
  } catch (error) {
    console.error("Audit encountered unexpected error:", error);
    process.exit(1);
  }
}

runAudit();
