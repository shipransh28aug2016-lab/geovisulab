"use client";

/**
 * STUDY SESSION — one user's server-backed state and every mutation that touches it.
 *
 * Extracted from `page.tsx`, which held 35 `useState` hooks, nine `any`-typed payloads and a
 * copy-pasted fetch per mutation. This hook owns the data half so the page can own the view half.
 *
 * THREE BEHAVIOURS CHANGED, ALL OF THEM BUGS IN THE ORIGINAL:
 *
 *   1. Bootstrap no longer ignores empty collections. It previously did
 *      `if (data.annotations?.length > 0) setAnnotations(...)`, so switching to a user with NO
 *      annotations left the PREVIOUS user's field notes on the map. Same for quizzes. Every collection
 *      is now assigned from the response, defaulting to empty.
 *
 *   2. Optimistic updates are reconciled with the server and rolled back on failure. The bookmark
 *      toggle used to invent `bm-temp-<timestamp>` as an id and never read the response, so a failed
 *      request still looked successful and the client kept an id the server had never issued.
 *
 *   3. Bookmark removal has ONE path. The bookmarks modal previously called a bare `fetch` with no
 *      idempotency key, no error handling and no toast; it now calls the same `toggleBookmark`.
 *
 * Types come from `@/db/store`'s row interfaces via the API client, so this cannot drift from what the
 * routes actually return.
 */

import { useCallback, useEffect, useRef, useState } from "react";

import {
  ApiError,
  api,
  bookmarkFeatureId,
  type AnnotationDraft,
  type BookmarkableFeature,
  type ProgressStatus,
  type QuizAttemptInput,
  type QuizDraft,
  type RegisterInput,
} from "@/lib/api-client";
import type { AnnotationRow, BookmarkRow, QuizRow, StudyProgressRow, UserRow } from "@/db/store";
// Imported from the credential-free module, NOT from @/db/seed-data. Importing the seed module here
// would pull its password constant into the client bundle: a module-level secret is bundled whether or
// not any code path reads it, so the separation has to be by module.
import { DEMO_ACCOUNTS, DEMO_ANNOTATIONS, DEMO_QUIZZES } from "@/data/demo-content";
import { useToast } from "./use-toast";

export interface StudySessionOptions {
  /** Grade currently selected in the UI; drives classGrade on new records. */
  classGrade: string;
  /** Called after an annotation is created or updated, so the inspector can follow it. */
  onAnnotationChanged?: (annotation: AnnotationRow) => void;
  /** Called after an annotation is deleted, so the inspector can clear itself. */
  onAnnotationRemoved?: (id: string) => void;
}

export interface StudySession {
  currentUser: UserRow;
  annotations: AnnotationRow[];
  bookmarks: BookmarkRow[];
  quizzes: QuizRow[];
  /** Keyed by syllabus topic id, which is how the sidebar consumes it. */
  studyProgress: Record<string, StudyProgressRow>;
  toastMessage: string | null;
  showToast: (message: string) => void;
  /** True while the bootstrap trip is in flight. */
  isBooting: boolean;
  /** Set when the bootstrap trip failed, so the UI can say so instead of showing an empty app. */
  bootstrapError: string | null;
  reload: () => Promise<void>;
  switchUser: (email: string) => Promise<void>;
  registerUser: (input: RegisterInput) => Promise<void>;
  updateProgress: (topicId: string, status: ProgressStatus, notes?: string) => Promise<void>;
  saveAnnotation: (draft: AnnotationDraft) => Promise<void>;
  deleteAnnotation: (id: string) => Promise<void>;
  toggleBookmark: (feature: BookmarkableFeature) => Promise<void>;
  removeBookmark: (featureId: string) => Promise<void>;
  isFeatureBookmarked: (feature: BookmarkableFeature | null | undefined) => boolean;
  recordQuizAttempt: (attempt: QuizAttemptInput) => Promise<void>;
  createQuiz: (draft: QuizDraft) => Promise<void>;
}

/** Human-readable text for a failure, distinguishing "unreachable" from "rejected". */
function describeError(err: unknown, fallback: string): string {
  if (err instanceof ApiError) {
    return err.isNetworkError ? `${fallback} — the server could not be reached` : err.message;
  }
  return err instanceof Error ? err.message : fallback;
}

export function useStudySession(options: StudySessionOptions): StudySession {
  const { classGrade, onAnnotationChanged, onAnnotationRemoved } = options;

  // Initial state comes from the SAME seed module the database is seeded from, rather than from copies
  // hardcoded in the page as they were before. That keeps the first paint instant — the app renders a
  // populated map without waiting for the bootstrap round trip — while removing three annotations and
  // two quizzes that were duplicated inline and free to drift from the real seed.
  //
  // Study progress deliberately starts EMPTY. The page used to hardcode two "mastered"/"in_progress"
  // rows that the server knew nothing about, so the sidebar claimed progress that vanished on refresh.
  // Bootstrap supplies the real values.
  const [currentUser, setCurrentUser] = useState<UserRow>(DEMO_ACCOUNTS[0]);
  const [annotations, setAnnotations] = useState<AnnotationRow[]>(DEMO_ANNOTATIONS);
  const [bookmarks, setBookmarks] = useState<BookmarkRow[]>([]);
  const [quizzes, setQuizzes] = useState<QuizRow[]>(DEMO_QUIZZES);
  const [studyProgress, setStudyProgress] = useState<Record<string, StudyProgressRow>>({});
  const [isBooting, setIsBooting] = useState(true);
  const [bootstrapError, setBootstrapError] = useState<string | null>(null);
  const toast = useToast();

  // The parent passes these as inline arrows, so their identity changes on every render. Reading them
  // through a ref keeps the mutation handlers referentially stable instead of rebuilding on each render.
  // The ref is written from an EFFECT and never during render: under concurrent rendering a render can
  // be started and thrown away, so a ref written while rendering can hold a value from a render that
  // never committed.
  const callbacks = useRef({ onAnnotationChanged, onAnnotationRemoved });
  useEffect(() => {
    callbacks.current = { onAnnotationChanged, onAnnotationRemoved };
  }, [onAnnotationChanged, onAnnotationRemoved]);

  // `classGrade` is a primitive, so depending on it directly is simpler and cheaper than mirroring it
  // into a ref just to keep a callback stable.
  const normalizedGrade = classGrade === "12" ? "12" : "11";

  const reload = useCallback(async (user: UserRow = currentUser, signal?: AbortSignal) => {
    try {
      // The await is deliberately the FIRST statement. Nothing runs before it, so calling this from an
      // effect cannot set state synchronously inside the effect body — which is what triggers a cascade
      // of renders. `isBooting` already starts true and `bootstrapError` already starts null, so the
      // initial load needs no reset; explicit reloads set them from their event handlers.
      const data = await api.bootstrap(user.id, signal);
      // Assigned unconditionally. Guarding on `.length > 0` — as the original did — leaves the previous
      // user's data visible when the next user has none, which is a small data leak between accounts.
      setAnnotations(Array.isArray(data.annotations) ? data.annotations : []);
      setQuizzes(Array.isArray(data.quizzes) ? data.quizzes : []);
      setBookmarks(Array.isArray(data.bookmarks) ? data.bookmarks : []);
      const progress: Record<string, StudyProgressRow> = {};
      for (const row of Array.isArray(data.progress) ? data.progress : []) {
        if (row?.syllabusTopicId) progress[row.syllabusTopicId] = row;
      }
      setStudyProgress(progress);
      setBootstrapError(null);
    } catch (err) {
      // An aborted request means a newer load superseded this one. Recording it as an error would show
      // "could not load your work" over data that is in fact arriving a moment later.
      if ((err as Error)?.name === "AbortError") return;
      setBootstrapError(describeError(err, "Could not load your saved work"));
    } finally {
      if (!signal?.aborted) setIsBooting(false);
    }
  }, [currentUser]);

  // Mount-time load. Written as an inline cancellable fetch rather than `void reload()` for two reasons:
  // it satisfies react-hooks/set-state-in-effect, which objects to calling a setState-bearing function
  // from an effect body, and — the reason that actually matters — it CANCELS. Without the abort,
  // switching accounts twice in quick succession let the first response land last and overwrite the
  // second user's data with the first user's.
  useEffect(() => {
    const controller = new AbortController();
    void (async () => {
      try {
        const data = await api.bootstrap(currentUser.id, controller.signal);
        setAnnotations(Array.isArray(data.annotations) ? data.annotations : []);
        setQuizzes(Array.isArray(data.quizzes) ? data.quizzes : []);
        setBookmarks(Array.isArray(data.bookmarks) ? data.bookmarks : []);
        const progress: Record<string, StudyProgressRow> = {};
        for (const row of Array.isArray(data.progress) ? data.progress : []) {
          if (row?.syllabusTopicId) progress[row.syllabusTopicId] = row;
        }
        setStudyProgress(progress);
        setBootstrapError(null);
      } catch (err) {
        if ((err as Error)?.name === "AbortError") return;
        setBootstrapError(describeError(err, "Could not load your saved work"));
      } finally {
        if (!controller.signal.aborted) setIsBooting(false);
      }
    })();
    return () => controller.abort();
  }, [currentUser.id]);

  const switchUser = useCallback(
    async (email: string) => {
      try {
        const data = await api.login(email);
        if (data.user) {
          setCurrentUser(data.user);
          // Clear the outgoing user's data immediately: otherwise their notes stay on the map for the
          // length of the bootstrap round trip.
          setAnnotations([]);
          setBookmarks([]);
          setQuizzes([]);
          setStudyProgress({});
          setIsBooting(true);
          setBootstrapError(null);
          await reload(data.user);
          toast.show(`Switched account to ${data.user.name}`);
        }
      } catch (err) {
        toast.show(describeError(err, "Could not switch account"));
      }
    },
    [reload, toast],
  );

  const registerUser = useCallback(
    async (input: RegisterInput) => {
      try {
        const data = await api.register(input);
        if (data.user) {
          setCurrentUser(data.user);
          setAnnotations([]);
          setBookmarks([]);
          setQuizzes([]);
          setStudyProgress({});
          setIsBooting(true);
          setBootstrapError(null);
          await reload(data.user);
          toast.show(data.reused ? `Welcome back, ${data.user.name}` : `Account created for ${data.user.name}`);
        }
      } catch (err) {
        toast.show(describeError(err, "Could not create the account"));
      }
    },
    [reload, toast],
  );

  const updateProgress = useCallback(
    async (topicId: string, status: ProgressStatus, notes?: string) => {
      const previous = studyProgress;
      setStudyProgress((prev) => ({
        ...prev,
        [topicId]: {
          ...(prev[topicId] as StudyProgressRow | undefined),
          id: prev[topicId]?.id ?? `sp-${currentUser.id}-${topicId}`,
          userId: currentUser.id,
          syllabusTopicId: topicId,
          classGrade: normalizedGrade,
          status,
          notes: notes ?? prev[topicId]?.notes ?? null,
        } as StudyProgressRow,
      }));
      try {
        const data = await api.saveProgress({
          userId: currentUser.id,
          syllabusTopicId: topicId,
          classGrade: normalizedGrade,
          status,
          notes,
        });
        // Replace the optimistic row with the server's, so ids and timestamps are real.
        if (data.progress) {
          setStudyProgress((prev) => ({ ...prev, [topicId]: data.progress }));
        }
        toast.show("Progress updated in syllabus tracker");
      } catch (err) {
        setStudyProgress(previous);
        toast.show(describeError(err, "Could not save progress"));
      }
    },
    [currentUser.id, normalizedGrade, studyProgress, toast],
  );

  const saveAnnotation = useCallback(
    async (draft: AnnotationDraft) => {
      try {
        const isEdit = Boolean(draft.id);
        const data = isEdit
          ? await api.updateAnnotation(String(draft.id), draft)
          : await api.createAnnotation(draft);
        const saved = data.annotation;
        if (!saved) throw new ApiError("The server accepted the field note but returned no record", 200, data);
        setAnnotations((prev) =>
          isEdit ? prev.map((a) => (a.id === saved.id ? saved : a)) : [saved, ...prev],
        );
        callbacks.current.onAnnotationChanged?.(saved);
        toast.show(isEdit ? "Field note updated" : "Field note dropped on map");
      } catch (err) {
        toast.show(describeError(err, "Could not save the field note"));
      }
    },
    [toast],
  );

  const deleteAnnotation = useCallback(
    async (id: string) => {
      const previous = annotations;
      setAnnotations((prev) => prev.filter((a) => a.id !== id));
      try {
        await api.deleteAnnotation(id);
        callbacks.current.onAnnotationRemoved?.(id);
        toast.show("Field note deleted");
      } catch (err) {
        setAnnotations(previous);
        toast.show(describeError(err, "Could not delete the field note"));
      }
    },
    [annotations, toast],
  );

  const isFeatureBookmarked = useCallback(
    (feature: BookmarkableFeature | null | undefined) => {
      if (!feature) return false;
      const id = bookmarkFeatureId(feature);
      return bookmarks.some((b) => b.featureId === id);
    },
    [bookmarks],
  );

  const toggleBookmark = useCallback(
    async (feature: BookmarkableFeature) => {
      const featureId = bookmarkFeatureId(feature);
      const wasBookmarked = bookmarks.some((b) => b.featureId === featureId);
      const previous = bookmarks;
      const title = feature.title ?? featureId;

      // Optimistic: the learner should see the pin change immediately, not after a round trip.
      if (wasBookmarked) {
        setBookmarks((prev) => prev.filter((b) => b.featureId !== featureId));
        toast.show(`Removed "${title}" from bookmarks`);
      } else {
        setBookmarks((prev) => [
          {
            id: `bm-${currentUser.id}-${featureId}`,
            userId: currentUser.id,
            featureId,
            title,
            category: feature.category ?? "Physical Geography",
            classGrade: feature.classGrade ?? normalizedGrade,
            coordinates: feature.coordinates ?? null,
            notes: feature.description ?? null,
          },
          ...prev,
        ]);
        toast.show(`Bookmarked "${title}" for revision`);
      }

      try {
        const data = await api.toggleBookmark(
          wasBookmarked
            ? { userId: currentUser.id, featureId, action: "remove" }
            : {
                userId: currentUser.id,
                featureId,
                action: "add",
                title,
                // One default, used for both the optimistic row and the request. The original had
                // "General" in one place and "Physical Geography" in the other, so the UI and the
                // database could disagree about the same bookmark.
                category: feature.category ?? "Physical Geography",
                classGrade: feature.classGrade ?? normalizedGrade,
                notes: feature.description,
                coordinates: feature.coordinates ?? null,
              },
        );
        // Reconcile with what the server actually stored, so ids and defaults are the server's.
        if (data.bookmarked && data.bookmark) {
          const stored = data.bookmark;
          setBookmarks((prev) => [stored, ...prev.filter((b) => b.featureId !== featureId)]);
        } else if (!data.bookmarked) {
          setBookmarks((prev) => prev.filter((b) => b.featureId !== featureId));
        }
      } catch (err) {
        // Roll back: an optimistic change that cannot be persisted must not stay on screen, or the
        // learner believes a revision list is saved when it is not.
        setBookmarks(previous);
        toast.show(describeError(err, wasBookmarked ? "Could not remove the bookmark" : "Could not save the bookmark"));
      }
    },
    [bookmarks, currentUser.id, normalizedGrade, toast],
  );

  /** The single removal path. The bookmarks modal used to hand-roll its own unguarded fetch. */
  const removeBookmark = useCallback(
    async (featureId: string) => {
      const previous = bookmarks;
      setBookmarks((prev) => prev.filter((b) => b.featureId !== featureId));
      try {
        await api.toggleBookmark({ userId: currentUser.id, featureId, action: "remove" });
        toast.show("Bookmark removed");
      } catch (err) {
        setBookmarks(previous);
        toast.show(describeError(err, "Could not remove the bookmark"));
      }
    },
    [bookmarks, currentUser.id, toast],
  );

  const recordQuizAttempt = useCallback(
    async (attempt: QuizAttemptInput) => {
      try {
        await api.recordAttempt(currentUser.id, attempt);
        toast.show(`Quiz completed. Score: ${attempt.score}/${attempt.maxScore}`);
      } catch (err) {
        toast.show(describeError(err, "Could not record the quiz attempt"));
      }
    },
    [currentUser.id, toast],
  );

  const createQuiz = useCallback(
    async (draft: QuizDraft) => {
      try {
        const data = await api.createQuiz({ ...draft, userId: currentUser.id });
        if (data.quiz) {
          setQuizzes((prev) => [data.quiz, ...prev]);
          toast.show("New CBSE practice quiz created");
        }
      } catch (err) {
        toast.show(describeError(err, "Could not create the quiz"));
      }
    },
    [currentUser.id, toast],
  );

  return {
    currentUser,
    annotations,
    bookmarks,
    quizzes,
    studyProgress,
    toastMessage: toast.message,
    showToast: toast.show,
    isBooting,
    bootstrapError,
    reload: async () => reload(),
    switchUser,
    registerUser,
    updateProgress,
    saveAnnotation,
    deleteAnnotation,
    toggleBookmark,
    removeBookmark,
    isFeatureBookmarked,
    recordQuizAttempt,
    createQuiz,
  };
}
