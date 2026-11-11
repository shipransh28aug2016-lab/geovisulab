import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

/**
 * Postgres connection for the legacy GeoSphere visualiser.
 *
 * DECISION D-002 (see docs/DECISION_LOG.md): this module used to `throw` at import time when
 * `DATABASE_URL` was absent, which made every API route 500 and left the UI silently falling back
 * to hard-coded seed state. `db` is now nullable and `isDbConfigured` tells callers which storage
 * backend is live. `@/db/store` is the only module that touches `db` directly.
 */
const databaseUrl = process.env.DATABASE_URL;

export const isDbConfigured: boolean = Boolean(databaseUrl);

const globalForDb = globalThis as typeof globalThis & {
  __arenaNextJsPostgresqlPool?: Pool | null;
  __arenaNextJsPostgresqlDb?: NodePgDatabase | null;
};

function createPool(): Pool | null {
  if (!databaseUrl) return null;
  return new Pool({ connectionString: databaseUrl });
}

export const pool: Pool | null =
  globalForDb.__arenaNextJsPostgresqlPool !== undefined
    ? globalForDb.__arenaNextJsPostgresqlPool
    : (globalForDb.__arenaNextJsPostgresqlPool = createPool());

export const db: NodePgDatabase | null =
  globalForDb.__arenaNextJsPostgresqlDb !== undefined
    ? globalForDb.__arenaNextJsPostgresqlDb
    : (globalForDb.__arenaNextJsPostgresqlDb = pool ? drizzle(pool) : null);

/** Throws a descriptive error if a caller assumes Postgres without checking. */
export function requireDb(): NodePgDatabase {
  if (!db) {
    throw new Error(
      "DATABASE_URL is not configured; this code path requires the Postgres adapter. " +
        "Use @/db/store, which falls back to the file adapter."
    );
  }
  return db;
}
