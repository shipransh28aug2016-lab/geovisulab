import { NextResponse } from "next/server";
import { createHash } from "node:crypto";
import { store } from "@/db/store";

export interface IdempotencyOptions {
  scope: string;
  userId?: string | null;
  ttlSeconds?: number; // default: 86400 (24 hours)
  fallbackKey?: (body: any) => string | null;
}

export interface IdempotencyMeta {
  key: string | null;
  isIdempotent: boolean;
}

/**
 * Deterministically serialize any JavaScript value so identical objects
 * produce identical JSON strings regardless of key ordering.
 */
export function canonicalizeJson(obj: any): string {
  if (obj === null || typeof obj !== "object") {
    return JSON.stringify(obj);
  }
  if (Array.isArray(obj)) {
    return `[${obj.map((item) => canonicalizeJson(item)).join(",")}]`;
  }
  const keys = Object.keys(obj).sort();
  const pairs = keys.map((k) => `${JSON.stringify(k)}:${canonicalizeJson(obj[k])}`);
  return `{${pairs.join(",")}}`;
}

/**
 * Compute SHA-256 hash of a request payload.
 */
export function computePayloadHash(payload: any): string {
  const canonical = canonicalizeJson(payload ?? {});
  return createHash("sha256").update(canonical).digest("hex");
}

/**
 * Extract Idempotency Key from standard headers or request payload.
 */
export function extractIdempotencyKey(req: Request, body?: any): string | null {
  const headerKey =
    req.headers.get("Idempotency-Key") ||
    req.headers.get("idempotency-key") ||
    req.headers.get("X-Idempotency-Key") ||
    req.headers.get("x-idempotency-key");

  if (headerKey && headerKey.trim().length > 0) {
    return headerKey.trim().slice(0, 256);
  }

  if (body && typeof body === "object") {
    const bodyKey = body.idempotencyKey || body.idempotency_key;
    if (typeof bodyKey === "string" && bodyKey.trim().length > 0) {
      return bodyKey.trim().slice(0, 256);
    }
  }

  return null;
}

const STALE_LOCK_MS = 30_000; // 30 seconds for lock timeout if process crashed

/**
 * Wrap Next.js route mutation handler with production-grade idempotency enforcement.
 */
export async function withIdempotency(
  req: Request,
  options: IdempotencyOptions,
  handler: (body: any, meta: IdempotencyMeta) => Promise<NextResponse>
): Promise<NextResponse> {
  let body: any = null;
  let rawBodyText = "";

  try {
    rawBodyText = await req.clone().text();
    if (rawBodyText && rawBodyText.trim().length > 0) {
      body = JSON.parse(rawBodyText);
    }
  } catch {
    body = null;
  }

  // 1. Extract or determine Idempotency Key
  let key = extractIdempotencyKey(req, body);
  if (!key && options.fallbackKey && body) {
    key = options.fallbackKey(body);
  }

  // If no idempotency key is requested, proceed with normal execution
  // (Full backward compatibility for clients that don't send Idempotency-Key)
  if (!key) {
    return handler(body, { key: null, isIdempotent: false });
  }

  const scope = options.scope;
  const ttlSeconds = options.ttlSeconds ?? 86400; // 24 hours
  const requestHash = computePayloadHash(body);
  const recordId = `${scope}:${key}`;
  const now = new Date();
  const expiresAt = new Date(now.getTime() + ttlSeconds * 1000);

  // 2. Check for existing idempotency record
  const found = await store.findIdempotency(key, scope);

  if (found) {
    const existing = found;

    // Payload Mismatch Check: Same key used with different payload
    if (existing.requestHash !== requestHash) {
      return NextResponse.json(
        {
          success: false,
          error: "Idempotency key was previously used with a different request payload",
          code: "IDEMPOTENCY_PAYLOAD_MISMATCH",
          key,
        },
        {
          status: 422,
          headers: {
            "Idempotency-Key": key,
          },
        }
      );
    }

    // Completed: Replay saved response
    if (existing.status === "completed" && existing.responseBody) {
      const replayedResponse = NextResponse.json(existing.responseBody, {
        status: existing.statusCode ?? 200,
        headers: {
          "Idempotency-Key": key,
          "Idempotent-Replayed": "true",
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      });
      return replayedResponse;
    }

    // In Progress: Another request is currently executing
    if (existing.status === "in_progress") {
      const isStale = now.getTime() - existing.lockedAt.getTime() > STALE_LOCK_MS;

      if (!isStale) {
        // Wait briefly (up to 1.5 seconds) in case the in-flight request is just finishing
        for (let attempt = 0; attempt < 6; attempt++) {
          await new Promise((r) => setTimeout(r, 250));
          const polled = await store.findIdempotency(key, scope);

          if (polled && polled.status === "completed" && polled.responseBody) {
            return NextResponse.json(polled.responseBody, {
              status: polled.statusCode ?? 200,
              headers: {
                "Idempotency-Key": key,
                "Idempotent-Replayed": "true",
              },
            });
          }
        }

        // Still in progress after waiting: return 409 Conflict
        return NextResponse.json(
          {
            success: false,
            error: "A request with this idempotency key is currently being processed",
            code: "IDEMPOTENCY_IN_PROGRESS",
            key,
          },
          {
            status: 409,
            headers: {
              "Idempotency-Key": key,
              "Retry-After": "1",
            },
          }
        );
      }

      // Reclaim stale lock
      await store.updateIdempotency(recordId, { lockedAt: now, requestHash, expiresAt });
    }
  } else {
    // 3. Insert new in_progress lock
    try {
      await store.createIdempotency({
        id: recordId,
        key,
        scope,
        userId: options.userId || body?.userId || null,
        requestHash,
        status: "in_progress",
        createdAt: now,
        lockedAt: now,
        expiresAt,
      });
    } catch {
      // Concurrency race: Another request just inserted the lock row
      return NextResponse.json(
        {
          success: false,
          error: "A request with this idempotency key is currently being processed",
          code: "IDEMPOTENCY_IN_PROGRESS",
          key,
        },
        {
          status: 409,
          headers: {
            "Idempotency-Key": key,
            "Retry-After": "1",
          },
        }
      );
    }
  }

  // 4. Execute the mutation handler
  try {
    const response = await handler(body, { key, isIdempotent: true });

    // Read the response payload to store for replay
    let responseData: any = null;
    try {
      const cloned = response.clone();
      responseData = await cloned.json();
    } catch {
      responseData = { success: response.ok };
    }

    if (response.ok || (response.status >= 200 && response.status < 300)) {
      // Mark completed
      await store.updateIdempotency(recordId, {
        status: "completed",
        statusCode: response.status,
        responseBody: responseData,
        lockedAt: new Date(),
      });

      response.headers.set("Idempotency-Key", key);
      response.headers.set("Idempotent-Replayed", "false");
    } else {
      // Mark failed so subsequent calls can retry with same key
      await store.updateIdempotency(recordId, {
        status: "failed",
        statusCode: response.status,
        responseBody: responseData,
        lockedAt: new Date(),
      });

      response.headers.set("Idempotency-Key", key);
    }

    return response;
  } catch (handlerError) {
    // Handler crashed: reset to failed so user can retry
    await store.updateIdempotency(recordId, { status: "failed", lockedAt: new Date() });

    throw handlerError;
  }
}

/**
 * Periodically purge expired idempotency records to conserve space.
 */
export async function cleanupExpiredIdempotencyKeys(): Promise<number> {
  return store.purgeExpiredIdempotency(new Date());
}
