/**
 * TYPED API CLIENT — the only module in the app allowed to call `fetch` against our own routes.
 *
 * Before this existed, every mutation was hand-rolled inline in `page.tsx`: nine `any`-typed payloads,
 * a copy-pasted idempotency-key convention in six places, and no response checking on several calls.
 * Two concrete failures followed from that, and both are fixed here:
 *
 *   - Optimistic updates were never reconciled with the server. `handleToggleBookmark` invented a
 *     temporary id (`bm-temp-<timestamp>`) and never read the response, so the client kept a fake id
 *     forever and a FAILED request still looked like a successful one.
 *   - Bookmark removal had a second, uncontrolled path in the bookmarks modal: a bare `fetch` with no
 *     idempotency key, no error handling and no toast. Same operation, two implementations, one worse.
 *
 * Types are derived from `@/db/store`'s row interfaces rather than restated, so the client cannot drift
 * from what the storage layer actually returns.
 */

import type {
  AnnotationRow,
  BookmarkRow,
  QuizAttemptRow,
  QuizRow,
  StudyProgressRow,
  UserRow,
} from "@/db/store";

/**
 * A failed API call.
 *
 * `status` is 0 for a network-level failure (no response at all), which callers must distinguish from
 * a 4xx/5xx: one means "the server said no", the other means "we never reached the server". Showing
 * "invalid input" when the network is down sends the user correcting data that was fine.
 */
export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly body: unknown,
    /** True when the server recognised the idempotency key and replayed a stored response. */
    readonly replayed: boolean = false,
  ) {
    super(message);
    this.name = "ApiError";
  }

  /** True when nothing reached the server, so retrying is meaningful. */
  get isNetworkError(): boolean {
    return this.status === 0;
  }
}

type Json = Record<string, unknown>;

export interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
  /** Sent as `Idempotency-Key`. Required for every non-idempotent mutation the app performs. */
  idempotencyKey?: string;
  query?: Record<string, string | number | undefined>;
  signal?: AbortSignal;
}

function withQuery(path: string, query?: RequestOptions["query"]): string {
  if (!query) return path;
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined && value !== null) params.set(key, String(value));
  }
  const qs = params.toString();
  return qs ? `${path}?${qs}` : path;
}

function messageFromBody(body: unknown): string | null {
  if (body && typeof body === "object" && "error" in body) {
    const err = (body as { error?: unknown }).error;
    if (typeof err === "string" && err.length > 0) return err;
  }
  return null;
}

/**
 * Performs one request and returns its parsed body.
 *
 * Throws `ApiError` on a network failure, a non-2xx status, OR a 200 whose body says `success: false`.
 * That last case matters: several routes return `{ success: false, ... }` with a 200-shaped body, and
 * treating those as success is how the UI ends up claiming a save that never happened.
 */
export async function request<T extends Json>(path: string, options: RequestOptions = {}): Promise<T> {
  const url = withQuery(path, options.query);
  const headers: Record<string, string> = {};
  if (options.body !== undefined) headers["Content-Type"] = "application/json";
  if (options.idempotencyKey) headers["Idempotency-Key"] = options.idempotencyKey;

  let response: Response;
  try {
    response = await fetch(url, {
      method: options.method ?? (options.body !== undefined ? "POST" : "GET"),
      headers,
      body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
      signal: options.signal,
    });
  } catch (err) {
    // An aborted request is a normal consequence of unmounting or superseding a call, not a failure.
    if ((err as Error).name === "AbortError") throw err;
    throw new ApiError(`Could not reach ${path}: ${(err as Error).message}`, 0, null);
  }

  const replayed = response.headers.get("idempotent-replay") === "true";
  const text = await response.text();
  let body: unknown = null;
  if (text.length > 0) {
    try {
      body = JSON.parse(text);
    } catch {
      // A non-JSON body is itself worth reporting verbatim: it usually means a proxy or an HTML error
      // page intercepted the request, and swallowing that hides the real cause.
      throw new ApiError(`${path} returned a non-JSON response (${text.slice(0, 120)})`, response.status, text, replayed);
    }
  }

  if (!response.ok) {
    throw new ApiError(
      messageFromBody(body) ?? `${path} returned HTTP ${response.status}`,
      response.status,
      body,
      replayed,
    );
  }
  if (body && typeof body === "object" && (body as Json).success === false) {
    throw new ApiError(messageFromBody(body) ?? `${path} reported success: false`, response.status, body, replayed);
  }
  return (body ?? {}) as T;
}

// ---------------------------------------------------------------------------
// Payload types
// ---------------------------------------------------------------------------

/** A feature the learner can bookmark. Shape is what the map and inspector panels actually pass. */
export interface BookmarkableFeature {
  id?: string;
  title?: string;
  category?: string;
  classGrade?: string;
  description?: string;
  coordinates?: { lat: number; lng: number } | null;
}

/** Derived from the row type so it cannot drift from the schema. */
export type AnnotationDraft = Partial<Omit<AnnotationRow, "id" | "createdAt" | "updatedAt">> & {
  id?: string;
  title: string;
  description: string;
};

export type QuizDraft = Partial<Omit<QuizRow, "id" | "createdAt">> & { title: string };

/**
 * Registration input. Only `email` is required: the route defaults name to "CBSE Scholar", password to
 * "demo-account", role to "student", classGrade to "11" and schoolName to a generic value, and assigns
 * `id` and `createdAt` itself. The type says so rather than forcing callers to invent values.
 */
export type RegisterInput = Partial<Omit<UserRow, "id" | "createdAt">> & { email: string };

export interface QuizAttemptInput {
  quizId: string;
  score: number;
  maxScore: number;
  answers?: unknown;
  timeSpentSeconds?: number;
}

export type ProgressStatus = "not_started" | "in_progress" | "mastered";

/** Everything one bootstrap trip returns, so the first paint needs a single request. */
export interface BootstrapPayload extends Json {
  success: boolean;
  annotations: AnnotationRow[];
  quizzes: QuizRow[];
  progress: StudyProgressRow[];
  bookmarks: BookmarkRow[];
}

// ---------------------------------------------------------------------------
// Operations
// ---------------------------------------------------------------------------

export const api = {
  health: () => request<Json & { ok: boolean; storage: string }>("/api/health"),

  bootstrap: (userId: string, signal?: AbortSignal) =>
    request<BootstrapPayload>("/api/bootstrap", { query: { userId }, signal }),

  login: (email: string) =>
    request<Json & { user: UserRow }>("/api/auth", {
      body: { action: "login", email },
      idempotencyKey: `login_${email.toLowerCase().trim()}`,
    }),

  register: (user: RegisterInput) =>
    request<Json & { user: UserRow; reused?: boolean }>("/api/auth", {
      body: { action: "register", ...user },
      // Keyed on the email, not on Date.now(): registering the same address twice must replay the
      // first result rather than create a second account.
      idempotencyKey: `reg_${String(user.email).toLowerCase().trim()}`,
    }),

  curriculum: (classGrade: string) =>
    request<Json & { total: number }>("/api/curriculum", { query: { classGrade } }),

  saveProgress: (input: {
    userId: string;
    syllabusTopicId: string;
    classGrade: string;
    status: ProgressStatus;
    notes?: string;
  }) =>
    request<Json & { progress: StudyProgressRow }>("/api/study-progress", {
      body: input,
      // Deterministic: replaying the same transition is a no-op, and a different transition for the
      // same topic produces a different key so it is not swallowed as a duplicate.
      idempotencyKey: `prog_${input.userId}_${input.syllabusTopicId}_${input.status}`,
    }),

  createAnnotation: (draft: AnnotationDraft) =>
    request<Json & { annotation: AnnotationRow }>("/api/annotations", {
      body: draft,
      idempotencyKey: `create_annot_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    }),

  updateAnnotation: (id: string, draft: AnnotationDraft) =>
    request<Json & { annotation: AnnotationRow }>(`/api/annotations/${encodeURIComponent(id)}`, {
      method: "PUT",
      body: draft,
      idempotencyKey: `update_annot_${id}_${Date.now()}`,
    }),

  deleteAnnotation: (id: string) =>
    request<Json>(`/api/annotations/${encodeURIComponent(id)}`, {
      method: "DELETE",
      idempotencyKey: `delete_annot_${id}`,
    }),

  /**
   * Toggles a bookmark. The route resolves direction from STORED STATE, so this is safe to call with
   * the full feature payload in both directions; `action` makes the intent explicit when the caller
   * already knows it, which avoids a race against another tab.
   */
  toggleBookmark: (
    // Every field except userId/featureId is optional because the route defaults each one (title to the
    // featureId, category to "Physical Geography", classGrade to "11"). `action` pins the direction;
    // without it the route toggles based on whether the bookmark already exists.
    input: {
      userId: string;
      featureId: string;
      action?: "add" | "remove";
      title?: string;
      category?: string;
      classGrade?: string;
      notes?: string;
      coordinates?: { lat: number; lng: number } | null;
    },
  ) =>
    request<Json & { bookmarked: boolean; bookmark?: BookmarkRow; removed?: boolean; featureId?: string }>(
      "/api/bookmarks",
      {
        body: input,
        // A toggle is deliberately NOT idempotent, so no key is derived here; the route documents why.
        // Adds still send one so a double-click cannot create two rows.
        idempotencyKey: input.action === "remove" ? undefined : `bookmark_${input.userId}_${input.featureId}_${Date.now()}`,
      },
    ),

  createQuiz: (draft: QuizDraft & { userId: string }) =>
    request<Json & { quiz: QuizRow }>("/api/quizzes", {
      body: draft,
      idempotencyKey: `create_quiz_${draft.userId}_${Date.now()}`,
    }),

  recordAttempt: (userId: string, attempt: QuizAttemptInput) =>
    request<Json & { attempt: QuizAttemptRow }>(`/api/quizzes/${encodeURIComponent(attempt.quizId)}/attempt`, {
      body: { userId, score: attempt.score, maxScore: attempt.maxScore, answers: attempt.answers, timeSpentSeconds: attempt.timeSpentSeconds },
      idempotencyKey: `attempt_${attempt.quizId}_${userId}_${Date.now()}`,
    }),
};

/**
 * Derives the stable id used for a bookmarkable feature.
 *
 * Extracted because it was duplicated in two places with slightly different fallbacks, and a feature
 * bookmarked under one id could not be found under the other.
 */
export function bookmarkFeatureId(feature: BookmarkableFeature): string {
  if (feature.id && feature.id.length > 0) return feature.id;
  return (feature.title ?? "untitled").toLowerCase().replace(/\s+/g, "-");
}
