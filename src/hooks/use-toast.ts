"use client";

/**
 * TOAST STATE.
 *
 * Extracted from `page.tsx`, where it was three lines with two defects:
 *
 *   1. Rapid toasts did not cancel the previous timer. Showing "Bookmarked" then "Progress updated"
 *      within three seconds meant the FIRST timer fired and dismissed the second toast early, so the
 *      learner never read it. The timer is now tracked and cleared on every new toast.
 *   2. The timer was never cleared on unmount, so a toast scheduled during navigation fired a state
 *      update on an unmounted component.
 *
 * `show` is stable across renders, so it is safe in a `useEffect` or `useCallback` dependency list —
 * which matters because seven call sites in the page depend on it.
 */

import { useCallback, useEffect, useRef, useState } from "react";

export interface Toast {
  message: string | null;
  /** Replaces any visible toast and restarts the timer. */
  show: (message: string) => void;
  dismiss: () => void;
}

export function useToast(durationMs = 3000): Toast {
  const [message, setMessage] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = useCallback(() => {
    if (timer.current !== null) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  }, []);

  const dismiss = useCallback(() => {
    clearTimer();
    setMessage(null);
  }, [clearTimer]);

  const show = useCallback(
    (next: string) => {
      clearTimer();
      setMessage(next);
      timer.current = setTimeout(() => {
        timer.current = null;
        setMessage(null);
      }, durationMs);
    },
    [clearTimer, durationMs],
  );

  useEffect(() => clearTimer, [clearTimer]);

  return { message, show, dismiss };
}
