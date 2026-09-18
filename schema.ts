import { pgTable, text, timestamp, integer, boolean, jsonb, index, uniqueIndex } from "drizzle-orm/pg-core";

export const users = pgTable(
  "users",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    password: text("password").notNull(),
    role: text("role").notNull().default("student"), // 'student' | 'teacher'
    classGrade: text("class_grade").notNull().default("11"), // '11' | '12'
    avatarUrl: text("avatar_url"),
    schoolName: text("school_name").default("Delhi Public School / Kendriya Vidyalaya"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("users_role_grade_idx").on(table.role, table.classGrade),
    index("users_created_at_idx").on(table.createdAt),
  ]
);

export const annotations = pgTable(
  "annotations",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").references(() => users.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    description: text("description").notNull(),
    category: text("category").notNull(), // 'rivers' | 'mountains' | 'soils' | 'tectonics' | 'climate' | 'minerals' | 'ports'
    latitude: text("latitude").notNull(),
    longitude: text("longitude").notNull(),
    elevation: text("elevation"),
    classGrade: text("class_grade").notNull().default("11"),
    chapterRef: text("chapter_ref").notNull(),
    markerColor: text("marker_color").notNull().default("#3b82f6"),
    tags: text("tags").array(),
    isShared: boolean("is_shared").default(true).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    index("annotations_user_id_idx").on(table.userId),
    index("annotations_created_at_idx").on(table.createdAt),
    index("annotations_grade_category_idx").on(table.classGrade, table.category),
    index("annotations_category_idx").on(table.category),
  ]
);

export const studyProgress = pgTable(
  "study_progress",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").references(() => users.id, { onDelete: "cascade" }),
    syllabusTopicId: text("syllabus_topic_id").notNull(),
    classGrade: text("class_grade").notNull(), // '11' | '12'
    status: text("status").notNull().default("not_started"), // 'not_started' | 'in_progress' | 'mastered'
    confidence: integer("confidence").default(3), // 1 to 5
    notes: text("notes"),
    lastStudiedAt: timestamp("last_studied_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    // Unique index on (userId, syllabusTopicId) guarantees idempotency and atomic upserts
    uniqueIndex("study_progress_user_topic_unique_idx").on(table.userId, table.syllabusTopicId),
    index("study_progress_user_id_idx").on(table.userId),
    index("study_progress_topic_idx").on(table.syllabusTopicId),
    index("study_progress_status_idx").on(table.status),
    index("study_progress_last_studied_idx").on(table.lastStudiedAt),
  ]
);

export const bookmarks = pgTable(
  "bookmarks",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").references(() => users.id, { onDelete: "cascade" }),
    featureId: text("feature_id").notNull(),
    title: text("title").notNull(),
    category: text("category").notNull(),
    classGrade: text("class_grade").notNull(),
    coordinates: jsonb("coordinates"), // { lat: number, lng: number }
    notes: text("notes"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    // Unique index on (userId, featureId) prevents duplicate bookmarks and accelerates O(1) toggle lookup
    uniqueIndex("bookmarks_user_feature_unique_idx").on(table.userId, table.featureId),
    index("bookmarks_user_id_idx").on(table.userId),
    index("bookmarks_created_at_idx").on(table.createdAt),
    index("bookmarks_class_grade_cat_idx").on(table.classGrade, table.category),
  ]
);

export const customQuizzes = pgTable(
  "custom_quizzes",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").references(() => users.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    description: text("description").notNull(),
    classGrade: text("class_grade").notNull(), // '11' | '12'
    chapterRef: text("chapter_ref").notNull(),
    difficulty: text("difficulty").notNull().default("medium"), // 'easy' | 'medium' | 'hard'
    questions: jsonb("questions").notNull(), // Array of question objects
    isOfficial: boolean("is_official").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("custom_quizzes_user_id_idx").on(table.userId),
    index("custom_quizzes_class_grade_created_idx").on(table.classGrade, table.createdAt),
    index("custom_quizzes_created_at_idx").on(table.createdAt),
    index("custom_quizzes_is_official_idx").on(table.isOfficial),
  ]
);

export const quizAttempts = pgTable(
  "quiz_attempts",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").references(() => users.id, { onDelete: "cascade" }),
    quizId: text("quiz_id").references(() => customQuizzes.id, { onDelete: "cascade" }),
    score: integer("score").notNull(),
    maxScore: integer("max_score").notNull(),
    answers: jsonb("answers"),
    timeSpentSeconds: integer("time_spent_seconds").default(0),
    completedAt: timestamp("completed_at").defaultNow().notNull(),
  },
  (table) => [
    index("quiz_attempts_user_id_idx").on(table.userId),
    index("quiz_attempts_quiz_id_idx").on(table.quizId),
    index("quiz_attempts_user_quiz_idx").on(table.userId, table.quizId),
    index("quiz_attempts_completed_at_idx").on(table.completedAt),
  ]
);

export const idempotencyKeys = pgTable(
  "idempotency_keys",
  {
    id: text("id").primaryKey(), // compound key `${scope}:${key}`
    key: text("key").notNull(),
    scope: text("scope").notNull(), // e.g. 'create_annotation', 'study_progress', 'quiz_attempt'
    userId: text("user_id").references(() => users.id, { onDelete: "cascade" }),
    requestHash: text("request_hash").notNull(), // SHA-256 of canonicalized request payload
    status: text("status").notNull().default("in_progress"), // 'in_progress' | 'completed' | 'failed'
    statusCode: integer("status_code"),
    responseHeaders: jsonb("response_headers"),
    responseBody: jsonb("response_body"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    lockedAt: timestamp("locked_at").defaultNow().notNull(),
    expiresAt: timestamp("expires_at").notNull(),
  },
  (table) => [
    uniqueIndex("idempotency_key_scope_unique_idx").on(table.key, table.scope),
    index("idempotency_expires_at_idx").on(table.expiresAt),
    index("idempotency_user_id_idx").on(table.userId),
    index("idempotency_status_locked_idx").on(table.status, table.lockedAt),
  ]
);
