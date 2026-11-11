/**
 * WHERE THE ATLAS DATA LIVES, AND WHO IS ALLOWED TO READ IT.
 *
 * Two rules live here because both `corpus.ts` and `basemap.ts` need them and neither should own
 * them. If the data root ever moves, this is the only file that changes — a constant duplicated into
 * two loaders is a constant that gets updated in one of them.
 *
 * SERVER ONLY. Everything under `atlas/data/` is read with `node:fs`. These collections are far too
 * large to ship to a browser: `assertions.json` alone is about 920 KB, and the corridor shape file is
 * 24.6 MB. They are build artifacts that a server process reads, filters by date, and reduces to the
 * few hundred records a single view actually needs before anything crosses the network. `atlas:build`
 * is what produces them (see docs/DATA_GOVERNANCE.md).
 *
 * The static `node:fs` import below is deliberate: it makes a client bundle that reaches this module
 * fail at BUILD time, which is loud and cheap, rather than at render time in a browser.
 * `assertServerOnly()` is a second line of defence for cases the bundler cannot catch, and exists to
 * turn a confusing crash into an error that names the mistake and the fix.
 */

import { existsSync } from "node:fs";
import path from "node:path";

/**
 * Repository root at runtime.
 *
 * Next.js sets the working directory to the project root in both `next dev` and `next start`, so this
 * resolves `atlas/data/...` correctly in both. DEPLOYMENT CAVEAT, stated rather than hidden: a
 * `next build --standalone` output copies only what the bundler traces, and these JSON files are read
 * dynamically, so they are NOT traced. Any production image must copy `atlas/data/pilot/` alongside
 * the application, or set `ATLAS_DATA_ROOT` to where it was copied. Failing loudly at first read is
 * better than serving an empty map and calling it coverage.
 */
const ROOT = process.env.ATLAS_DATA_ROOT?.trim()
  ? path.resolve(process.env.ATLAS_DATA_ROOT.trim())
  : path.join(process.cwd(), "atlas", "data", "pilot");

/** Curated, type-checked content authored by this project. */
export const CURATED_DIR = path.join(ROOT, "curated");
/** Imported Cliopatria entities, assertions, shapes and anomalies. */
export const CLIOPATRIA_DIR = path.join(ROOT, "cliopatria");
/** Natural Earth basemap layers plus their manifest. */
export const BASEMAP_DIR = path.join(ROOT, "basemap");
/** The 46 MB / 173 MB upstream downloads. Gitignored; never read at runtime. */
export const RAW_DIR = path.join(process.cwd(), "atlas", "raw");

/**
 * True when the atlas data directory is present and readable.
 *
 * Used by loaders to distinguish "the corpus has not been built" from "the corpus is empty because
 * nothing matched". Those are different facts and must never render the same way: the first is a
 * broken deployment, the second is a legitimate historical answer.
 */
export function atlasDataPresent(): boolean {
  if (typeof window !== "undefined") return false;
  return existsSync(CLIOPATRIA_DIR) && existsSync(BASEMAP_DIR);
}

/**
 * Throws when called from a browser.
 *
 * @param module Name used in the error, so the message points at the offending import.
 */
export function assertServerOnly(module: string): void {
  if (typeof window !== "undefined") {
    throw new Error(
      `${module} reads the atlas corpus from disk and must never be imported into a client bundle. ` +
        `The collections are hundreds of kilobytes to tens of megabytes. Fetch a filtered projection ` +
        `from a server route instead.`,
    );
  }
}
