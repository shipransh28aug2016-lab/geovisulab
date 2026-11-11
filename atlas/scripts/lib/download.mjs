/**
 * Shared HTTP download for the Atlas data pipeline.
 *
 * WHY THERE ARE TWO PATHS. On a normal machine `fetch` is enough. In restricted CI/sandbox networks
 * Node's bundled CA store can reject a perfectly valid certificate chain ("unable to verify the first
 * certificate") while the system `curl`, using the OS trust store, succeeds. Rather than telling
 * contributors to set NODE_EXTRA_CA_CERTS or — worse — to disable TLS verification, we try `fetch`
 * first and fall back to `curl`. TLS verification is NEVER disabled on either path.
 */

import { spawn } from "node:child_process";

const HEADERS = {
  Accept: "application/vnd.github.raw",
  "User-Agent": "geovisulab-atlas-pipeline",
};

function curl(url) {
  return new Promise((resolve, reject) => {
    const args = ["-sSL", "--fail", "--retry", "2"];
    for (const [key, value] of Object.entries(HEADERS)) args.push("-H", `${key}: ${value}`);
    if (process.env.GITHUB_TOKEN) args.push("-H", `Authorization: Bearer ${process.env.GITHUB_TOKEN}`);
    args.push("-o", "-", url);

    const child = spawn("curl", args, { maxBuffer: undefined });
    const chunks = [];
    const errChunks = [];
    child.stdout.on("data", (c) => chunks.push(c));
    child.stderr.on("data", (c) => errChunks.push(c));
    child.on("error", (err) => reject(new Error(`curl could not be started: ${err.message}`)));
    child.on("close", (code) => {
      if (code === 0) resolve(Buffer.concat(chunks));
      else reject(new Error(`curl exited ${code}: ${Buffer.concat(errChunks).toString("utf8").slice(0, 400)}`));
    });
  });
}

/** Returns the response body as a Buffer. Throws with an actionable message on failure. */
export async function downloadBuffer(url) {
  try {
    const res = await fetch(url, {
      headers: {
        ...HEADERS,
        ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
      },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
    return Buffer.from(await res.arrayBuffer());
  } catch (err) {
    const reason = err?.cause?.message ?? err?.message ?? String(err);
    process.stderr.write(`[download] fetch failed (${reason}); retrying with curl\n`);
    return curl(url);
  }
}
