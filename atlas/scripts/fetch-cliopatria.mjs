/**
 * atlas:fetch — download the pinned Cliopatria release into `atlas/raw/` (gitignored).
 *
 * WHY THIS EXISTS. The Ganga-Magadha pilot needs real, licensed historical polity geometry rather
 * than invented shapes. Cliopatria (Seshat Global History Databank) is CC-BY 4.0 and covers
 * 3400 BCE - 2024 CE, including the Mahajanapadas, Magadha's dynasties, the Nanda, Maurya, Shunga,
 * Kushan, Gupta, Harsha, Pala, Sena and Bengal polities. See docs/DATA_SOURCE_REGISTER.md.
 *
 * The download is content-addressed: the SHA-256 of both the archive and the GeoJSON inside it are
 * pinned below. If upstream changes, this script FAILS rather than silently importing different
 * borders into a history teaching product. Re-pinning is a deliberate, reviewable act.
 *
 * Nothing here scrapes a protected resource or bypasses an access restriction: it reads a public
 * file from a public repository under a permissive licence, and records the attribution we owe.
 *
 * Usage:  node atlas/scripts/fetch-cliopatria.mjs [--force]
 */

import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { inflateRawSync } from "node:zlib";
import { fileURLToPath } from "node:url";
import { downloadBuffer } from "./lib/download.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const RAW_DIR = path.resolve(HERE, "..", "raw");

/** Pinned upstream. Bump deliberately, then re-run the whole pipeline and review the diff. */
const PIN = {
  repo: "Seshat-Global-History-Databank/cliopatria",
  ref: "main",
  file: "cliopatria.geojson.zip",
  zipSha256: "e10a4e429fca708788ff9e7572a95fce801fae55852d217cffabc1c59cd4eed4",
  innerFile: "cliopatria_polities_only_v021.geojson",
  innerSha256: "fc6f0d1e4cc42f45da83522b3696db6f2cc85ec0d12259a85c89b31347b8fc0a",
  version: "v0.2.1",
  license: "CC-BY-4.0",
  attribution:
    "Cliopatria: a geospatial dataset of worldwide polities from 3400 BCE to 2024 CE, Seshat Global History Databank. Licensed CC BY 4.0.",
  doi: "10.1038/s41597-025-04516-9",
};

const force = process.argv.includes("--force");

function sha256(buf) {
  return createHash("sha256").update(buf).digest("hex");
}

/**
 * Minimal ZIP reader for a single stored/deflated entry. Avoids adding an archive dependency for a
 * one-file download, and avoids shelling out to `unzip`, which is not present on every dev machine.
 */
function readZipEntry(buf, wantedName) {
  // Walk End Of Central Directory -> central directory -> local headers.
  let eocd = -1;
  for (let i = buf.length - 22; i >= 0 && i > buf.length - 22 - 65536; i--) {
    if (buf.readUInt32LE(i) === 0x06054b50) {
      eocd = i;
      break;
    }
  }
  if (eocd < 0) throw new Error("Not a ZIP archive: EOCD signature not found");
  const entries = buf.readUInt16LE(eocd + 10);
  let offset = buf.readUInt32LE(eocd + 16);

  for (let n = 0; n < entries; n++) {
    if (buf.readUInt32LE(offset) !== 0x02014b50) throw new Error("Corrupt central directory");
    const method = buf.readUInt16LE(offset + 10);
    const compressedSize = buf.readUInt32LE(offset + 20);
    const nameLen = buf.readUInt16LE(offset + 28);
    const extraLen = buf.readUInt16LE(offset + 30);
    const commentLen = buf.readUInt16LE(offset + 32);
    const localOffset = buf.readUInt32LE(offset + 42);
    const name = buf.subarray(offset + 46, offset + 46 + nameLen).toString("utf8");

    if (name === wantedName || name.endsWith(`/${wantedName}`)) {
      const localNameLen = buf.readUInt16LE(localOffset + 26);
      const localExtraLen = buf.readUInt16LE(localOffset + 28);
      const dataStart = localOffset + 30 + localNameLen + localExtraLen;
      const data = buf.subarray(dataStart, dataStart + compressedSize);
      if (method === 0) return Buffer.from(data);
      if (method === 8) return inflateRawSync(data);
      throw new Error(`Unsupported ZIP compression method ${method} for ${name}`);
    }
    offset += 46 + nameLen + extraLen + commentLen;
  }
  throw new Error(`Entry "${wantedName}" not found in archive`);
}

async function main() {
  await mkdir(RAW_DIR, { recursive: true });
  const zipPath = path.join(RAW_DIR, PIN.file);
  const geojsonPath = path.join(RAW_DIR, PIN.innerFile);
  const manifestPath = path.join(RAW_DIR, "cliopatria-manifest.json");

  if (existsSync(geojsonPath) && !force) {
    const existing = await readFile(geojsonPath);
    if (sha256(existing) === PIN.innerSha256) {
      console.log(`[atlas:fetch] already present and hash-verified: ${path.relative(process.cwd(), geojsonPath)}`);
      return;
    }
    console.warn("[atlas:fetch] existing file failed hash check — re-downloading");
  }

  console.log(`[atlas:fetch] downloading ${PIN.file} from ${PIN.repo}@${PIN.ref} (~46 MB)…`);
  const url = `https://api.github.com/repos/${PIN.repo}/contents/${PIN.file}?ref=${PIN.ref}`;
  const zipBuf = await downloadBuffer(url);

  const zipHash = sha256(zipBuf);
  if (zipHash !== PIN.zipSha256) {
    throw new Error(
      `\n[atlas:fetch] REFUSING TO IMPORT: checksum mismatch.\n` +
        `  expected ${PIN.zipSha256}\n  got      ${zipHash}\n` +
        `Upstream changed, or the download was corrupted. Re-pin deliberately in this file, then\n` +
        `re-run atlas:import and review the border diff before shipping anything to learners.`
    );
  }
  await writeFile(zipPath, zipBuf);
  console.log(`[atlas:fetch] archive checksum OK`);

  const inner = readZipEntry(zipBuf, PIN.innerFile);
  const innerHash = sha256(inner);
  if (innerHash !== PIN.innerSha256) {
    throw new Error(`[atlas:fetch] inner GeoJSON checksum mismatch: expected ${PIN.innerSha256}, got ${innerHash}`);
  }
  await writeFile(geojsonPath, inner);
  console.log(`[atlas:fetch] ${PIN.innerFile} checksum OK (${(inner.length / 1e6).toFixed(1)} MB)`);

  await writeFile(
    manifestPath,
    JSON.stringify({ ...PIN, zipSha256: zipHash, innerSha256: innerHash, fetchedAt: new Date().toISOString() }, null, 2)
  );
  console.log(`[atlas:fetch] manifest written: ${path.relative(process.cwd(), manifestPath)}`);
  console.log(`[atlas:fetch] next: npm run atlas:import`);
}

main().catch((err) => {
  console.error(err.message ?? err);
  process.exit(1);
});
