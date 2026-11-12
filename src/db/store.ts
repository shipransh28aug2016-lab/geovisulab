import { and, eq, lt } from "drizzle-orm";
import { db, isDbConfigured, requireDb } from "@/db";
import {
  annotations,
  bookmarks,
  customQuizzes,
  idempotencyKeys,
  quizAttempts,
  studyProgress,
  users,
} from "@/db/schema";
import { INITIAL_ANNOTATIONS, INITIAL_QUIZZES, INITIAL_USERS } from "@/db/seed-data";
import { promises as fs } from "node:fs";
import path from "node:path";

/**
 * Storage facade for the legacy GeoSphere visualiser.
 *
 * DECISION D-002 (docs/DECISION_LOG.md): two adapters behind one interface.
 *   - `postgres` — the original Drizzle/pg behaviour, used whenever DATABASE_URL is set.
 *   - `file`     — a JSON document at `.data/store.json`, seeded from `@/db/seed-data`.
 *
 * The file adapter exists so the application is *demonstrably runnable* on an ordinary laptop or a
 * classroom machine with no database server, and so the Atlas pilot can be validated end to end.
 * It is NOT a production store: it is single-process, has no transactions, and no unique-index
 * guarantees. `store.kind` is exposed by `/api/health` so nobody mistakes one for the other.
 */

// ---------------------------------------------------------------------------
// Row types (kept structurally identical to src/db/schema.ts)
// ---------------------------------------------------------------------------

export interface UserRow {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: string;
  classGrade: string;
  avatarUrl?: string | null;
  schoolName?: string | null;
  createdAt?: Date;
}

export interface AnnotationRow {
  id: string;
  userId?: string | null;
  title: string;
  description: string;
  category: string;
  latitude: string;
  longitude: string;
  elevation?: string | null;
  classGrade: string;
  chapterRef: string;
  markerColor: string;
  tags?: string[] | null;
  isShared?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface StudyProgressRow {
  id: string;
  userId?: string | null;
  syllabusTopicId: string;
  classGrade: string;
  status: string;
  confidence?: number | null;
  notes?: string | null;
  lastStudiedAt?: Date;
  updatedAt?: Date;
}

export interface BookmarkRow {
  id: string;
  userId?: string | null;
  featureId: string;
  title: string;
  category: string;
  classGrade: string;
  coordinates?: { lat: number; lng: number } | null;
  notes?: string | null;
  createdAt?: Date;
}

export interface QuizRow {
  id: string;
  userId?: string | null;
  title: string;
  description: string;
  classGrade: string;
  chapterRef: string;
  difficulty: string;
  questions: unknown;
  isOfficial?: boolean;
  createdAt?: Date;
}

export interface QuizAttemptRow {
  id: string;
  userId?: string | null;
  quizId?: string | null;
  score: number;
  maxScore: number;
  answers?: unknown;
  timeSpentSeconds?: number | null;
  completedAt?: Date;
}

export interface IdempotencyRow {
  id: string;
  key: string;
  scope: string;
  userId?: string | null;
  requestHash: string;
  status: string;
  statusCode?: number | null;
  responseHeaders?: unknown;
  responseBody?: unknown;
  createdAt: Date;
  lockedAt: Date;
  expiresAt: Date;
}

export type StoreKind = "postgres" | "file";

export interface Store {
  readonly kind: StoreKind;

  listUsers(): Promise<UserRow[]>;
  findUserByEmail(email: string): Promise<UserRow | null>;
  findUserById(id: string): Promise<UserRow | null>;
  createUser(user: UserRow): Promise<UserRow>;

  listAnnotations(userId?: string | null): Promise<AnnotationRow[]>;
  findAnnotation(id: string): Promise<AnnotationRow | null>;
  createAnnotation(row: AnnotationRow): Promise<AnnotationRow>;
  updateAnnotation(id: string, patch: Partial<AnnotationRow>): Promise<AnnotationRow | null>;
  deleteAnnotation(id: string): Promise<boolean>;

  listProgress(userId?: string | null): Promise<StudyProgressRow[]>;
  upsertProgress(row: Omit<StudyProgressRow, "id"> & { id?: string }): Promise<StudyProgressRow>;

  listBookmarks(userId?: string | null): Promise<BookmarkRow[]>;
  findBookmark(userId: string | null | undefined, featureId: string): Promise<BookmarkRow | null>;
  createBookmark(row: BookmarkRow): Promise<BookmarkRow>;
  deleteBookmark(userId: string | null | undefined, featureId: string): Promise<boolean>;

  listQuizzes(userId?: string | null): Promise<QuizRow[]>;
  createQuiz(row: QuizRow): Promise<QuizRow>;
  recordAttempt(row: QuizAttemptRow): Promise<QuizAttemptRow>;

  findIdempotency(key: string, scope: string): Promise<IdempotencyRow | null>;
  createIdempotency(row: IdempotencyRow): Promise<void>;
  updateIdempotency(id: string, patch: Partial<IdempotencyRow>): Promise<void>;
  purgeExpiredIdempotency(now: Date): Promise<number>;
}

// ---------------------------------------------------------------------------
// Postgres adapter — original behaviour, unchanged semantics
// ---------------------------------------------------------------------------

function createPostgresStore(): Store {
  const d = () => requireDb();
  return {
    kind: "postgres",

    async listUsers() {
      return (await d().select().from(users)) as UserRow[];
    },
    async findUserByEmail(email) {
      const rows = await d().select().from(users).where(eq(users.email, email)).limit(1);
      return (rows[0] as UserRow) ?? null;
    },
    async findUserById(id) {
      const rows = await d().select().from(users).where(eq(users.id, id)).limit(1);
      return (rows[0] as UserRow) ?? null;
    },
    async createUser(user) {
      await d()
        .insert(users)
        .values({
          id: user.id,
          name: user.name,
          email: user.email,
          password: user.password ?? "demo-account",
          role: user.role,
          classGrade: user.classGrade,
          avatarUrl: user.avatarUrl ?? null,
          schoolName: user.schoolName ?? null,
        })
        .onConflictDoNothing();
      return (await this.findUserById(user.id)) ?? user;
    },

    async listAnnotations(userId) {
      const q = userId
        ? d().select().from(annotations).where(eq(annotations.userId, userId))
        : d().select().from(annotations);
      return (await q) as AnnotationRow[];
    },
    async findAnnotation(id) {
      const rows = await d().select().from(annotations).where(eq(annotations.id, id)).limit(1);
      return (rows[0] as AnnotationRow) ?? null;
    },
    async createAnnotation(row) {
      await d().insert(annotations).values(row as never).onConflictDoNothing();
      return (await this.findAnnotation(row.id)) ?? row;
    },
    async updateAnnotation(id, patch) {
      await d().update(annotations).set(patch as never).where(eq(annotations.id, id));
      return this.findAnnotation(id);
    },
    async deleteAnnotation(id) {
      const existing = await this.findAnnotation(id);
      if (!existing) return false;
      await d().delete(annotations).where(eq(annotations.id, id));
      return true;
    },

    async listProgress(userId) {
      const q = userId
        ? d().select().from(studyProgress).where(eq(studyProgress.userId, userId))
        : d().select().from(studyProgress);
      return (await q) as StudyProgressRow[];
    },
    async upsertProgress(row) {
      const id = row.id ?? `sp-${row.userId ?? "anon"}-${row.syllabusTopicId}`;
      await d()
        .insert(studyProgress)
        .values({ ...row, id } as never)
        .onConflictDoUpdate({
          target: [studyProgress.userId, studyProgress.syllabusTopicId],
          set: {
            status: row.status,
            classGrade: row.classGrade,
            notes: row.notes ?? null,
            confidence: row.confidence ?? 3,
            lastStudiedAt: new Date(),
            updatedAt: new Date(),
          },
        });
      const rows = await d()
        .select()
        .from(studyProgress)
        .where(
          and(eq(studyProgress.userId, row.userId ?? ""), eq(studyProgress.syllabusTopicId, row.syllabusTopicId))
        )
        .limit(1);
      return (rows[0] as StudyProgressRow) ?? { ...row, id };
    },

    async listBookmarks(userId) {
      const q = userId
        ? d().select().from(bookmarks).where(eq(bookmarks.userId, userId))
        : d().select().from(bookmarks);
      return (await q) as BookmarkRow[];
    },
    async findBookmark(userId, featureId) {
      const rows = await d()
        .select()
        .from(bookmarks)
        .where(and(eq(bookmarks.userId, userId ?? ""), eq(bookmarks.featureId, featureId)))
        .limit(1);
      return (rows[0] as BookmarkRow) ?? null;
    },
    async createBookmark(row) {
      await d().insert(bookmarks).values(row as never).onConflictDoNothing();
      return row;
    },
    async deleteBookmark(userId, featureId) {
      const existing = await this.findBookmark(userId, featureId);
      if (!existing) return false;
      await d()
        .delete(bookmarks)
        .where(and(eq(bookmarks.userId, userId ?? ""), eq(bookmarks.featureId, featureId)));
      return true;
    },

    async listQuizzes(userId) {
      const q = userId ? d().select().from(customQuizzes).where(eq(customQuizzes.userId, userId)) : d().select().from(customQuizzes);
      return (await q) as QuizRow[];
    },
    async createQuiz(row) {
      await d().insert(customQuizzes).values(row as never).onConflictDoNothing();
      return row;
    },
    async recordAttempt(row) {
      await d().insert(quizAttempts).values(row as never).onConflictDoNothing();
      return row;
    },

    async findIdempotency(key, scope) {
      const rows = await d()
        .select()
        .from(idempotencyKeys)
        .where(and(eq(idempotencyKeys.key, key), eq(idempotencyKeys.scope, scope)))
        .limit(1);
      return (rows[0] as IdempotencyRow) ?? null;
    },
    async createIdempotency(row) {
      await d().insert(idempotencyKeys).values(row as never);
    },
    async updateIdempotency(id, patch) {
      await d().update(idempotencyKeys).set(patch as never).where(eq(idempotencyKeys.id, id));
    },
    async purgeExpiredIdempotency(now) {
      const res = await d().delete(idempotencyKeys).where(lt(idempotencyKeys.expiresAt, now));
      return Number((res as unknown as { rowCount?: number })?.rowCount ?? 0);
    },
  };
}

// ---------------------------------------------------------------------------
// File adapter — single JSON document, atomic-ish write, dev/demo only
// ---------------------------------------------------------------------------

interface FileDocument {
  version: 1;
  users: UserRow[];
  annotations: AnnotationRow[];
  studyProgress: StudyProgressRow[];
  bookmarks: BookmarkRow[];
  customQuizzes: QuizRow[];
  quizAttempts: QuizAttemptRow[];
  idempotencyKeys: IdempotencyRow[];
}

// Serverless filesystems (Vercel) are read-only except /tmp, so the demo file adapter lives there.
// Set DATABASE_URL for durable storage; the file adapter is ephemeral by design.
const FILE_PATH = process.env.VERCEL
  ? path.join("/tmp", "geovisulab-store.json")
  : path.join(process.cwd(), ".data", "store.json");

function reviveDates<T>(row: T): T {
  if (!row || typeof row !== "object") return row;
  const out = { ...(row as Record<string, unknown>) };
  for (const key of ["createdAt", "updatedAt", "lastStudiedAt", "lockedAt", "expiresAt", "completedAt"]) {
    const value = out[key];
    if (typeof value === "string") out[key] = new Date(value);
  }
  return out as T;
}

function emptyDocument(): FileDocument {
  return {
    version: 1,
    users: INITIAL_USERS.map((u) => ({ ...u })) as UserRow[],
    annotations: INITIAL_ANNOTATIONS.map((a) => ({ ...a })) as AnnotationRow[],
    studyProgress: [],
    bookmarks: [],
    customQuizzes: INITIAL_QUIZZES.map((q) => ({ ...q })) as QuizRow[],
    quizAttempts: [],
    idempotencyKeys: [],
  };
}

function createFileStore(): Store {
  let cache: FileDocument | null = null;
  /**
   * Single-flight first load. `/api/bootstrap` fans out four store calls with `Promise.all`, so a
   * plain `if (cache) return cache` let several callers initialise at once and race on the same
   * temp file (observed as ENOENT on rename). One in-flight promise fixes it.
   */
  let loading: Promise<FileDocument> | null = null;
  let writeChain: Promise<void> = Promise.resolve();
  let tmpCounter = 0;

  async function load(): Promise<FileDocument> {
    try {
      const raw = await fs.readFile(FILE_PATH, "utf8");
      const parsed = JSON.parse(raw) as FileDocument;
      return {
        ...emptyDocument(),
        ...parsed,
        users: (parsed.users ?? []).map(reviveDates),
        annotations: (parsed.annotations ?? []).map(reviveDates),
        studyProgress: (parsed.studyProgress ?? []).map(reviveDates),
        bookmarks: (parsed.bookmarks ?? []).map(reviveDates),
        customQuizzes: (parsed.customQuizzes ?? []).map(reviveDates),
        quizAttempts: (parsed.quizAttempts ?? []).map(reviveDates),
        idempotencyKeys: (parsed.idempotencyKeys ?? []).map(reviveDates),
      };
    } catch {
      const fresh = emptyDocument();
      await persist(fresh);
      return fresh;
    }
  }

  function read(): Promise<FileDocument> {
    if (cache) return Promise.resolve(cache);
    if (!loading) {
      loading = load().then((doc) => {
        cache = doc;
        return doc;
      });
    }
    return loading;
  }

  async function persist(doc: FileDocument): Promise<void> {
    await fs.mkdir(path.dirname(FILE_PATH), { recursive: true });
    // Unique temp name per write so concurrent persists can never collide on rename.
    const tmp = `${FILE_PATH}.${process.pid}.${(tmpCounter += 1)}.tmp`;
    await fs.writeFile(tmp, JSON.stringify(doc, null, 2), "utf8");
    try {
      await fs.rename(tmp, FILE_PATH);
    } catch (err) {
      await fs.rm(tmp, { force: true });
      throw err;
    }
  }

  /** Serialise read-modify-write so concurrent requests in one process don't clobber each other. */
  async function mutate<T>(fn: (doc: FileDocument) => T | Promise<T>): Promise<T> {
    const run = writeChain.then(async () => {
      const doc = await read();
      const result = await fn(doc);
      await persist(doc);
      return result;
    });
    writeChain = run.then(
      () => undefined,
      () => undefined
    );
    return run;
  }

  const byUser = <T extends { userId?: string | null }>(rows: T[], userId?: string | null) =>
    userId ? rows.filter((r) => r.userId === userId) : rows;

  return {
    kind: "file",

    async listUsers() {
      return (await read()).users;
    },
    async findUserByEmail(email) {
      const doc = await read();
      return doc.users.find((u) => u.email.toLowerCase() === email.toLowerCase()) ?? null;
    },
    async findUserById(id) {
      const doc = await read();
      return doc.users.find((u) => u.id === id) ?? null;
    },
    async createUser(user) {
      return mutate((doc) => {
        if (!doc.users.some((u) => u.id === user.id)) {
          doc.users.push({ ...user, createdAt: user.createdAt ?? new Date() });
        }
        return doc.users.find((u) => u.id === user.id) ?? user;
      });
    },

    async listAnnotations(userId) {
      return byUser((await read()).annotations, userId);
    },
    async findAnnotation(id) {
      return (await read()).annotations.find((a) => a.id === id) ?? null;
    },
    async createAnnotation(row) {
      return mutate((doc) => {
        const now = new Date();
        const record: AnnotationRow = {
          ...row,
          markerColor: row.markerColor || "#3b82f6",
          isShared: row.isShared !== false,
          createdAt: now,
          updatedAt: now,
        };
        const idx = doc.annotations.findIndex((a) => a.id === row.id);
        if (idx >= 0) doc.annotations[idx] = record;
        else doc.annotations.unshift(record);
        return record;
      });
    },
    async updateAnnotation(id, patch) {
      return mutate((doc) => {
        const idx = doc.annotations.findIndex((a) => a.id === id);
        if (idx < 0) return null;
        doc.annotations[idx] = { ...doc.annotations[idx], ...patch, updatedAt: new Date() };
        return doc.annotations[idx];
      });
    },
    async deleteAnnotation(id) {
      return mutate((doc) => {
        const before = doc.annotations.length;
        doc.annotations = doc.annotations.filter((a) => a.id !== id);
        return doc.annotations.length < before;
      });
    },

    async listProgress(userId) {
      return byUser((await read()).studyProgress, userId);
    },
    async upsertProgress(row) {
      return mutate((doc) => {
        const now = new Date();
        const idx = doc.studyProgress.findIndex(
          (p) => p.userId === (row.userId ?? null) && p.syllabusTopicId === row.syllabusTopicId
        );
        if (idx >= 0) {
          doc.studyProgress[idx] = {
            ...doc.studyProgress[idx],
            ...row,
            id: doc.studyProgress[idx].id,
            confidence: row.confidence ?? doc.studyProgress[idx].confidence ?? 3,
            lastStudiedAt: now,
            updatedAt: now,
          };
          return doc.studyProgress[idx];
        }
        const created: StudyProgressRow = {
          ...row,
          id: row.id ?? `sp-${row.userId ?? "anon"}-${row.syllabusTopicId}`,
          confidence: row.confidence ?? 3,
          lastStudiedAt: now,
          updatedAt: now,
        };
        doc.studyProgress.push(created);
        return created;
      });
    },

    async listBookmarks(userId) {
      return byUser((await read()).bookmarks, userId);
    },
    async findBookmark(userId, featureId) {
      return (
        (await read()).bookmarks.find((b) => b.userId === (userId ?? null) && b.featureId === featureId) ?? null
      );
    },
    async createBookmark(row) {
      return mutate((doc) => {
        const record: BookmarkRow = { ...row, createdAt: row.createdAt ?? new Date() };
        const idx = doc.bookmarks.findIndex((b) => b.userId === row.userId && b.featureId === row.featureId);
        if (idx >= 0) doc.bookmarks[idx] = record;
        else doc.bookmarks.unshift(record);
        return record;
      });
    },
    async deleteBookmark(userId, featureId) {
      return mutate((doc) => {
        const before = doc.bookmarks.length;
        doc.bookmarks = doc.bookmarks.filter((b) => !(b.userId === (userId ?? null) && b.featureId === featureId));
        return doc.bookmarks.length < before;
      });
    },

    async listQuizzes(userId) {
      const doc = await read();
      const official = doc.customQuizzes.filter((q) => q.isOfficial);
      const mine = byUser(doc.customQuizzes, userId).filter((q) => !q.isOfficial);
      return [...mine, ...official];
    },
    async createQuiz(row) {
      return mutate((doc) => {
        const record: QuizRow = { ...row, isOfficial: row.isOfficial ?? false, createdAt: row.createdAt ?? new Date() };
        doc.customQuizzes.unshift(record);
        return record;
      });
    },
    async recordAttempt(row) {
      return mutate((doc) => {
        const record: QuizAttemptRow = { ...row, completedAt: row.completedAt ?? new Date() };
        doc.quizAttempts.unshift(record);
        return record;
      });
    },

    async findIdempotency(key, scope) {
      return (await read()).idempotencyKeys.find((r) => r.key === key && r.scope === scope) ?? null;
    },
    async createIdempotency(row) {
      await mutate((doc) => {
        doc.idempotencyKeys = doc.idempotencyKeys.filter((r) => r.id !== row.id);
        doc.idempotencyKeys.push(row);
      });
    },
    async updateIdempotency(id, patch) {
      await mutate((doc) => {
        const idx = doc.idempotencyKeys.findIndex((r) => r.id === id);
        if (idx >= 0) doc.idempotencyKeys[idx] = { ...doc.idempotencyKeys[idx], ...patch };
      });
    },
    async purgeExpiredIdempotency(now) {
      return mutate((doc) => {
        const before = doc.idempotencyKeys.length;
        doc.idempotencyKeys = doc.idempotencyKeys.filter((r) => new Date(r.expiresAt) >= now);
        return before - doc.idempotencyKeys.length;
      });
    },
  };
}

// ---------------------------------------------------------------------------
// Singleton
// ---------------------------------------------------------------------------

const globalForStore = globalThis as typeof globalThis & { __geovisulabStore?: Store };

export const store: Store =
  globalForStore.__geovisulabStore ??
  (globalForStore.__geovisulabStore = isDbConfigured ? createPostgresStore() : createFileStore());

export const storeKind: StoreKind = store.kind;
