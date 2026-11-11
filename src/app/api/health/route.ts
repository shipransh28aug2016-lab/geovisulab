import { NextResponse } from "next/server";
import { storeKind } from "@/db/store";
import { isDbConfigured } from "@/db";

export const dynamic = "force-dynamic";

/**
 * Production healthcheck. Documented in docs/geography-testing-report.md as `GET /api/health`.
 * Also reports which storage adapter is live, so an operator can tell a Postgres-backed
 * deployment from the file-backed demo adapter at a glance (DECISION D-002).
 */
export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "geovisulab",
    storage: storeKind,
    databaseConfigured: isDbConfigured,
    time: new Date().toISOString(),
  });
}
