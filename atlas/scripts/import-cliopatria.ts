/**
 * atlas:import — convert the pinned Cliopatria release into the Atlas temporal-spatial model,
 * scoped to the Ganga-Magadha-Eastern India knowledge corridor.
 *
 * WHAT IT DOES
 *   1. Reads `atlas/raw/cliopatria_polities_only_v021.geojson` (fetched and hash-verified by
 *      atlas:fetch — never a file of unknown provenance).
 *   2. Keeps only rows whose geometry touches the corridor bbox.
 *   3. Converts each row into: a ShapeRecord (geometry + edge precision), a HistoricalAssertion
 *      ("subject controls shape over validTime"), and one HistoricalEntity per distinct Name.
 *   4. Converts Cliopatria's integer years to EDTF. Cliopatria numbers years ASTRONOMICALLY
 *      (year 0 = 1 BCE), so `-600` is 601 BCE. See src/lib/atlas/temporal/years.ts.
 *   5. Writes an ANOMALY REPORT instead of quietly repairing upstream problems.
 *
 * WHAT IT DELIBERATELY DOES NOT DO
 *   - It does not smooth, merge or choose between overlapping rows. Two rows that overlap are two
 *     assertions; the platform shows the disagreement (docs/DATA_MODEL.md D-1).
 *   - It does not upgrade Cliopatria's precision. The upstream README states plainly that its maps
 *     "reflect only one version of the territory held by past polities", so every imported
 *     assertion is `boundary-approximate`, `dateCertainty: approximate`, `reviewStatus:
 *     imported-unreviewed`, `evidenceType: dataset-derived`. Nothing here becomes "verified".
 *   - It does not treat RELATION rows as territory. An alliance's extent is not a sovereign border;
 *     drawing it as one would be a category error. They are recorded and excluded, with counts.
 *
 * Usage: npx tsx atlas/scripts/import-cliopatria.ts [--corridor-only] [--skip-geojson]
 */

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { toEdtfYear } from "../../src/lib/atlas/temporal/years";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ATLAS_ROOT = path.resolve(HERE, "..");
const RAW_GEOJSON = path.join(ATLAS_ROOT, "raw", "cliopatria_polities_only_v021.geojson");
const OUT_DIR = path.join(ATLAS_ROOT, "data", "pilot", "cliopatria");

/**
 * Ganga-Magadha-Eastern India knowledge corridor.
 * West edge takes in the upper Ganga-Yamuna doab (Indraprastha / Kuru); north edge takes in the
 * Himalayan source region around Gangotri and Haridwar; east edge takes in the Bengal delta and the
 * Assam fringe; south edge takes in the Mahanadi delta and Kalinga (Dhauli, Jaugada) because
 * Ashoka's Kalinga war is the pivot on which Mauryan history turns, plus the Narmada-Son headwaters.
 */
const CORRIDOR: { west: number; south: number; east: number; north: number } = {
  west: 76.5,
  south: 19.8,
  east: 91.5,
  north: 31.5,
};

/**
 * The teaching core of the pilot. These entities are what Class VI-XII and UPSC syllabi actually ask
 * about in this corridor, so their geometry is COMMITTED (small, `shapes-focus.geojson`) and the map
 * works from a fresh clone without the 46 MB upstream download. Everything else in the corridor is
 * still imported, but as generated tiles only.
 */
const FOCUS_NAMES = new Set([
  "(Mahajanapadas)",
  "Janapada of Magadha",
  "Janapada of Anga",
  "Janapada of Vajji",
  "Janapada of Kāśī",
  "Janapada of Kosala",
  "Janapada of Malla",
  "Janapada of Vatsa",
  "Janapada of Surasena",
  "Janapada of Kuru",
  "Janapada of Pañcāla",
  "Janapada of Matsya",
  "Janapada of Cedī",
  "Magadha - Haryanka dynasty",
  "Magadha - Shaishunaga dynasty",
  "Nanda Empire",
  "Maurya Empire",
  "Shunga Empire",
  "Kushan Empire",
  "Eastern Kushans",
  "Gupta Empire",
  "Harsha's Empire",
  "Maukhari Dynasty",
  "Pala Empire",
  "Sena Dynasty",
  "Eastern Ganga Kingdom",
  "Sultanate of Bengal",
  "Nawabs of Bengal",
]);

const CLIOPATRIA_SOURCE_ID = "cliopatria-v0-2-1";
const SESHAT_PAPER_SOURCE_ID = "seshat-cliopatria-paper-2025";

interface CliopatriaProperties {
  Name: string;
  FromYear: number;
  ToYear: number;
  Area: number;
  Type: "POLITY" | "RELATION" | string;
  Wikipedia: string;
  Wikidata: string;
  SeshatID: string;
  Components: string;
  MemberOf: string;
}

interface Feature {
  type: "Feature";
  properties: CliopatriaProperties;
  geometry: { type: "Polygon" | "MultiPolygon"; coordinates: unknown };
}

/** [west, south, east, north] of a geometry, computed without pulling in a GIS dependency. */
function geometryBBox(geometry: Feature["geometry"]): [number, number, number, number] {
  let west = Infinity;
  let south = Infinity;
  let east = -Infinity;
  let north = -Infinity;
  const walk = (node: unknown): void => {
    if (!Array.isArray(node)) return;
    if (typeof node[0] === "number") {
      const [x, y] = node as [number, number];
      if (x < west) west = x;
      if (x > east) east = x;
      if (y < south) south = y;
      if (y > north) north = y;
      return;
    }
    for (const child of node) walk(child);
  };
  walk(geometry.coordinates);
  return [west, south, east, north];
}

function touchesCorridor(bbox: [number, number, number, number]): boolean {
  const [w, s, e, n] = bbox;
  return e >= CORRIDOR.west && w <= CORRIDOR.east && n >= CORRIDOR.south && s <= CORRIDOR.north;
}

/** Lowercase-hyphen slug, matching the model's permanent-ID rule. */
function slug(name: string): string {
  return name
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[()]/g, "")
    .replace(/[^a-z0-9\u0900-\u097F]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

/**
 * Permanent shape id: `<entity-slug>-<year>`.
 * BCE years are written the way a reader writes them (astronomical -40 -> `41bce`), CE years as four
 * digits. Once published an id must never change, so this rule is frozen and unit-tested.
 */
export function shapeId(entitySlug: string, fromYearAstronomical: number): string {
  const yearPart =
    fromYearAstronomical <= 0
      ? `${1 - fromYearAstronomical}bce`
      : String(fromYearAstronomical).padStart(4, "0");
  return `cliopatria-${entitySlug}-${yearPart}`;
}

/**
 * Round coordinates to 4 decimal places (~11 m). The source's own positional accuracy for ancient
 * polities is measured in tens of kilometres, so this loses nothing real and roughly halves the
 * bytes. Recorded as a modification because CC-BY 4.0 requires that changes be indicated.
 */
function roundCoordinates(node: unknown): unknown {
  if (!Array.isArray(node)) return node;
  if (typeof node[0] === "number") return (node as number[]).map((v) => Math.round(v * 1e4) / 1e4);
  return node.map(roundCoordinates);
}

interface Anomaly {
  kind:
    | "year-zero"
    | "group-name-collision"
    | "temporal-self-overlap"
    | "temporal-gap"
    | "relation-row-excluded"
    | "duplicate-entity-id"
    | "relation-object-out-of-corridor"
    | "missing-wikidata"
    | "non-finite-area";
  entity: string;
  detail: string;
  rowsAffected: number;
  /** What the pipeline did about it. Never "fixed silently". */
  action: string;
}

async function main() {
  const args = process.argv.slice(2);
  const skipGeojson = args.includes("--skip-geojson");

  let raw: string;
  try {
    raw = await readFile(RAW_GEOJSON, "utf8");
  } catch {
    console.error(
      `[atlas:import] missing ${path.relative(process.cwd(), RAW_GEOJSON)}\n` +
        `Run "npm run atlas:fetch" first. The raw upstream file is gitignored on purpose:\n` +
        `it is 173 MB and it is not ours to redistribute as-is.`
    );
    process.exit(1);
  }

  const collection = JSON.parse(raw) as { type: string; features: Feature[] };
  const all = collection.features;
  console.log(`[atlas:import] read ${all.length} upstream rows`);

  const inCorridor = all.filter((f) => touchesCorridor(geometryBBox(f.geometry)));
  console.log(`[atlas:import] ${inCorridor.length} rows touch the corridor bbox`);

  const anomalies: Anomaly[] = [];
  const seenKinds = new Map<string, Anomaly>();
  const record = (a: Anomaly) => {
    const key = `${a.kind}|${a.entity}`;
    const existing = seenKinds.get(key);
    if (existing) {
      existing.rowsAffected += a.rowsAffected;
      return;
    }
    seenKinds.set(key, a);
    anomalies.push(a);
  };

  // ---------------------------------------------------------------------------
  // Group rows by entity name
  // ---------------------------------------------------------------------------
  const byName = new Map<string, Feature[]>();
  for (const f of inCorridor) {
    const name = f.properties.Name;
    const list = byName.get(name);
    if (list) list.push(f);
    else byName.set(name, [f]);
  }

  // Detect group/member name collisions: "(Mahajanapadas)" is a group whose Components include a
  // member literally named "Mahajanapadas". Drawing both would show a small polygon labelled with
  // the same name as the large composite. We import both faithfully and report the collision.
  for (const name of byName.keys()) {
    if (name.startsWith("(") && name.endsWith(")") && byName.has(name.slice(1, -1))) {
      record({
        kind: "group-name-collision",
        entity: name,
        detail:
          `Upstream has both the composite "${name}" and a member named "${name.slice(1, -1)}". ` +
          `They are different records with different geometry but near-identical labels.`,
        rowsAffected: byName.get(name)!.length + byName.get(name.slice(1, -1))!.length,
        action:
          "Both imported unchanged. The member rows are excluded from the committed focus tier so " +
          "the teaching map does not show two contradictory shapes with the same name. Flagged for " +
          "upstream review.",
      });
    }
  }

  const sortedNames = [...byName.keys()].sort();

  // ---------------------------------------------------------------------------
  // Permanent entity ids, with stable duplicate numbering
  // ---------------------------------------------------------------------------
  // slug() strips parentheses, so an upstream composite "(X)" and a member polity "X" collapse to
  // the SAME slug. That is not merely a labelling annoyance to report: two entities sharing a primary
  // key means every assertion and shape hanging off the second silently attaches to the first. So the
  // id is disambiguated by appending -2, -3, ... in sorted-name order.
  //
  // The rule depends on sort order and occurrence count only. It deliberately does NOT depend on
  // parsing upstream naming conventions (e.g. "parentheses means composite"), because a frozen id
  // rule that breaks when the source changes its punctuation is not a frozen id rule. Only names that
  // actually produce an entity consume a number, so a name dropped for having no POLITY rows cannot
  // shift anybody else's id.
  const nameToId = new Map<string, string>();
  {
    const slugCount = new Map<string, number>();
    for (const name of sortedNames) {
      const rows = byName.get(name)!;
      const polityCount = rows.filter((r) => r.properties.Type === "POLITY").length;
      if (polityCount === 0) continue;
      const base = `cliopatria-${slug(name)}`;
      const seen = (slugCount.get(base) ?? 0) + 1;
      slugCount.set(base, seen);
      const id = seen === 1 ? base : `${base}-${seen}`;
      nameToId.set(name, id);
      if (seen > 1) {
        record({
          kind: "duplicate-entity-id",
          entity: name,
          detail:
            `Slug of "${name}" collides with an earlier entity. Distinct upstream records with ` +
            `distinct geometry and date ranges.`,
          rowsAffected: polityCount,
          action:
            `Assigned the disambiguated id "${id}"; the first entity in sorted order keeps "${base}". ` +
            `Deterministic across runs.`,
        });
      }
    }
  }

  // ---------------------------------------------------------------------------
  // Build entities, assertions and shapes
  // ---------------------------------------------------------------------------
  const entities: unknown[] = [];
  const assertions: unknown[] = [];
  const corridorFeatures: unknown[] = [];
  const focusFeatures: unknown[] = [];
  let relationRowsExcluded = 0;

  for (const name of sortedNames) {
    const rows = byName
      .get(name)!
      .slice()
      .sort((a, b) => a.properties.FromYear - b.properties.FromYear || a.properties.ToYear - b.properties.ToYear);

    const polityRows = rows.filter((r) => r.properties.Type === "POLITY");
    const relRows = rows.filter((r) => r.properties.Type !== "POLITY");

    if (relRows.length > 0) {
      relationRowsExcluded += relRows.length;
      record({
        kind: "relation-row-excluded",
        entity: name,
        detail:
          `Upstream Type=${relRows[0].properties.Type}. This is the extent of a relationship ` +
          `(e.g. an alliance), not the territory a polity held.`,
        rowsAffected: relRows.length,
        action:
          "Excluded from territorial assertions. Rendering a relationship extent as a sovereign " +
          "border would misrepresent the source.",
      });
    }

    if (polityRows.length === 0) continue;

    // ---- temporal integrity checks on the upstream rows --------------------
    for (const r of polityRows) {
      if (r.properties.FromYear === 0 || r.properties.ToYear === 0) {
        record({
          kind: "year-zero",
          entity: name,
          detail:
            `Row spans ${r.properties.FromYear}..${r.properties.ToYear}. Upstream documents its years ` +
            `only as "negative for BCE, positive for CE", which leaves year 0 undefined; but six rows ` +
            `across the dataset end at 0 and each is followed by a row starting at 1, which is only ` +
            `contiguous under astronomical numbering.`,
          rowsAffected: 1,
          action:
            "Read as astronomical (year 0 = 1 BCE), matching the convention the rest of the dataset " +
            "demonstrates. Recorded in DATA_SOURCE_REGISTER.md as an upstream documentation defect.",
        });
      }
      if (!Number.isFinite(r.properties.Area)) {
        record({
          kind: "non-finite-area",
          entity: name,
          detail: `Row ${r.properties.FromYear}..${r.properties.ToYear} has Area=${r.properties.Area}`,
          rowsAffected: 1,
          action: "Area omitted from the derived record rather than defaulted to 0.",
        });
      }
    }
    for (let i = 1; i < polityRows.length; i++) {
      const prev = polityRows[i - 1].properties;
      const cur = polityRows[i].properties;
      if (cur.FromYear <= prev.ToYear) {
        record({
          kind: "temporal-self-overlap",
          entity: name,
          detail: `Rows ${prev.FromYear}..${prev.ToYear} and ${cur.FromYear}..${cur.ToYear} overlap.`,
          rowsAffected: 2,
          action:
            "Both kept as separate assertions. The platform shows two simultaneous claims about the " +
            "same polity rather than picking one — that is a property of the source, not a bug.",
        });
      } else if (cur.FromYear > prev.ToYear + 1) {
        record({
          kind: "temporal-gap",
          entity: name,
          detail:
            `No row covers ${prev.ToYear + 1}..${cur.FromYear - 1}. Upstream samples at varying ` +
            `timesteps, so a gap means "not sampled", NOT "the polity did not exist".`,
          rowsAffected: 1,
          action:
            "Left as a gap. The map renders it as `no-data`, never as `no-entity` " +
            "(docs/DATA_MODEL.md D-3).",
        });
      }
    }

    // ---- entity record ----------------------------------------------------
    const first = polityRows[0].properties;
    const last = polityRows[polityRows.length - 1].properties;
    const wikidata = polityRows.map((r) => r.properties.Wikidata).find((w) => w && w.length > 0);
    if (!wikidata) {
      record({
        kind: "missing-wikidata",
        entity: name,
        detail: "No Wikidata identifier on any row, so no independent cross-reference is possible.",
        rowsAffected: polityRows.length,
        action: "Entity published without a wikidata field. Not guessed.",
      });
    }

    const isGroup = name.startsWith("(") && name.endsWith(")");
    // Shape and assertion ids are built from this, so the disambiguation above propagates to them.
    const entitySlug = nameToId.get(name)!.replace(/^cliopatria-/, "");
    const components = first.Components
      ? first.Components.split(";").map((c) => c.trim()).filter(Boolean)
      : [];

    entities.push({
      id: `cliopatria-${entitySlug}`,
      names: [
        {
          text: name.replace(/^\(|\)$/g, ""),
          lang: "en",
          validTime: `${toEdtfYear(first.FromYear)}/${toEdtfYear(last.ToYear)}`,
          sources: [
            {
              source: CLIOPATRIA_SOURCE_ID,
              locator: `Name="${name}", ${polityRows.length} rows, ${first.FromYear}..${last.ToYear}`,
              note: "Name as recorded by the dataset; not independently verified by this project.",
            },
          ],
        },
      ],
      entityType: isGroup ? "cultural-region" : "polity",
      existence: `${toEdtfYear(first.FromYear)}/${toEdtfYear(last.ToYear)}`,
      // The dataset samples at varying timesteps from approximate sources. Never claim exactness.
      dateCertainty: "approximate",
      relations: components.map((component) => {
        // Resolve through nameToId so a disambiguated component still points at the right entity.
        const resolved = nameToId.get(component);
        if (!resolved) {
          // The component is a real upstream entity but lies outside the corridor bbox, so it was
          // never imported. Keeping the reference is right — the composite genuinely extends beyond
          // this corridor — but keeping it SILENTLY is not: the id would not resolve and a reader
          // would see a broken link. So the relation carries its own explanation, and the case is
          // reported once per entity as an anomaly. This is "incomplete coverage", never "no entity".
          record({
            kind: "relation-object-out-of-corridor",
            entity: name,
            detail:
              `Component "${component}" is a real Cliopatria entity but falls outside the corridor ` +
              `bbox (${CORRIDOR.west}-${CORRIDOR.east}E, ${CORRIDOR.south}-${CORRIDOR.north}N), so it ` +
              `was not imported.`,
            rowsAffected: 1,
            action:
              `Relation kept with an unresolved object id and an explanatory citation note. The ` +
              `interface must render it as "outside this corridor", not as a missing entity.`,
          });
        }
        return {
          predicate: "part-of",
          object: resolved ?? `cliopatria-${slug(component)}`,
          resolvedInCorridor: resolved !== undefined,
          validTime: `${toEdtfYear(first.FromYear)}/${toEdtfYear(last.ToYear)}`,
          sources: [
            {
              source: CLIOPATRIA_SOURCE_ID,
              locator: `Components field of Name="${name}"`,
              note: resolved
                ? undefined
                : `Object "${component}" is outside the corridor and was not imported. ` +
                  `Incomplete coverage of this project, not absence of the entity.`,
            },
          ],
        };
      }),
      wikidata: wikidata || undefined,
      seshatId: first.SeshatID || undefined,
      sources: [
        {
          source: CLIOPATRIA_SOURCE_ID,
          locator: `Name="${name}"`,
        },
        ...(first.SeshatID
          ? [
              {
                source: SESHAT_PAPER_SOURCE_ID,
                locator: `Seshat polity id ${first.SeshatID}`,
                note: "Cross-reference only; the structured polity data lives at seshat-db.org.",
              },
            ]
          : []),
      ],
    });

    // ---- one assertion + one shape per row --------------------------------
    // The composite "(Mahajanapadas)" IS in focus: showing the sixteen janapadas as one labelled
    // region is exactly what Class VI-XII teaching needs. The colliding bare "Mahajanapadas" member
    // row is NOT in focus, so the teaching map never shows two contradictory shapes with one label.
    const inFocus = FOCUS_NAMES.has(name);
    for (const r of polityRows) {
      const p = r.properties;
      const id = shapeId(entitySlug, p.FromYear);
      const bbox = geometryBBox(r.geometry);
      const rounded = roundCoordinates(r.geometry.coordinates);

      assertions.push({
        id: `${id}-controls`,
        relation: "controls",
        subject: `cliopatria-${entitySlug}`,
        shape: id,
        // Cliopatria's ToYear is INCLUSIVE, and our EDTF interval end is inclusive of that year,
        // so the mapping is direct: no off-by-one, no year-zero drift.
        validTime: `${toEdtfYear(p.FromYear)}/${toEdtfYear(p.ToYear)}`,
        dateCertainty: "approximate",
        spatialPrecision: "boundary-approximate",
        evidenceType: "dataset-derived",
        reviewStatus: "imported-unreviewed",
        // Keep per-assertion citations SHORT. The upstream caveats ("only one version of the
        // territory held by past polities", varying timesteps) live once on the SourceRecord and are
        // rendered from there; repeating them 1,700 times inflated the corpus to 1.5 MB of prose
        // with zero added information.
        sources: [
          {
            source: CLIOPATRIA_SOURCE_ID,
            locator: `Name="${p.Name}", FromYear=${p.FromYear}, ToYear=${p.ToYear}`,
          },
        ],
      });

      const tileFeature = {
        type: "Feature",
        geometry: { type: r.geometry.type, coordinates: rounded },
        properties: {
          id,
          entity: `cliopatria-${entitySlug}`,
          name: name.replace(/^\(|\)$/g, ""),
          group: isGroup,
          // Integer astronomical years, so the map can filter by the selected year with a cheap
          // numeric comparison instead of parsing dates on every frame.
          from_year: p.FromYear,
          to_year: p.ToYear,
          area_km2: Number.isFinite(p.Area) ? Math.round(p.Area) : null,
          precision: "boundary-approximate",
          review: "imported-unreviewed",
          source: CLIOPATRIA_SOURCE_ID,
          bbox: bbox.map((v) => Math.round(v * 1e3) / 1e3),
        },
      };
      corridorFeatures.push(tileFeature);
      if (inFocus) focusFeatures.push(tileFeature);
    }
  }

  // ---------------------------------------------------------------------------
  // Write outputs
  // ---------------------------------------------------------------------------
  await mkdir(OUT_DIR, { recursive: true });

  const importManifest = {
    id: CLIOPATRIA_SOURCE_ID,
    name: "Cliopatria",
    publisher: "Seshat Global History Databank",
    url: "https://github.com/Seshat-Global-History-Databank/cliopatria",
    version: "v0.2.1",
    license: "CC-BY-4.0",
    attribution:
      "Cliopatria: a geospatial dataset of worldwide polities from 3400 BCE to 2024 CE, Seshat Global History Databank, licensed CC BY 4.0. Boundaries reflect one version of historical territory and are approximate.",
    modifications:
      "Filtered to the Ganga-Magadha-Eastern India corridor bbox " +
      `[${CORRIDOR.west}, ${CORRIDOR.south}, ${CORRIDOR.east}, ${CORRIDOR.north}]; coordinates rounded to 4 decimal places (~11 m); ` +
      "integer years converted to EDTF under astronomical numbering; RELATION rows excluded from " +
      "territorial assertions; no geometry was merged, smoothed or editorially altered.",
    yearConvention: "astronomical",
    corridor: CORRIDOR,
    recordsImported: assertions.length,
    entitiesImported: entities.length,
    relationRowsExcluded,
    focusNames: [...FOCUS_NAMES].sort(),
    importedAt: new Date().toISOString(),
  };

  const sources = [
    {
      id: CLIOPATRIA_SOURCE_ID,
      kind: "dataset",
      title: { en: "Cliopatria — worldwide polities 3400 BCE to 2024 CE", hi: "क्लिओपेट्रिया — विश्व राजनीतिक सत्ताएँ 3400 ईसा पूर्व से 2024 ईसवी तक" },
      author: "Seshat Global History Databank",
      publisher: "Seshat Global History Databank / Zenodo",
      url: "https://github.com/Seshat-Global-History-Databank/cliopatria",
      doi: "10.5281/zenodo.13363121",
      license: "CC-BY-4.0",
      attribution: importManifest.attribution,
      accessDate: new Date().toISOString().slice(0, 10),
      primary: false,
      coverage: {
        // Cliopatria is worldwide; the corridor filter is OURS, not the source's.
        spatial: [-180, -90, 180, 90],
        temporal: "-3399/2024",
        completeness: "partial",
      },
      notes:
        "A compiled secondary dataset, not a primary source. Its own README warns that border " +
        "uncertainties and differing opinions on names, territorial changes and durations are common, " +
        "and that users are solely responsible for assessing suitability. We surface that warning " +
        "rather than presenting the shapes as settled history.",
    },
    {
      id: SESHAT_PAPER_SOURCE_ID,
      kind: "article",
      title: { en: "Cliopatria: an open-source geospatial dataset of historical polities" },
      publisher: "Scientific Data (Nature Portfolio)",
      publicationDate: "2025",
      doi: "10.1038/s41597-025-04516-9",
      license: "CC-BY-4.0",
      accessDate: new Date().toISOString().slice(0, 10),
      primary: false,
      notes:
        "Describes the dataset's initial format, construction and source material. Cited so a reader " +
        "can audit how the borders were compiled. Not independently read for this pilot — see " +
        "docs/DATA_SOURCE_REGISTER.md, status: reference located, full text not yet reviewed.",
    },
  ];

  const write = async (file: string, data: unknown) => {
    const target = path.join(OUT_DIR, file);
    await writeFile(target, JSON.stringify(data, null, 2));
    const { statSync } = await import("node:fs");
    const kb = statSync(target).size / 1024;
    console.log(`[atlas:import] wrote ${path.relative(process.cwd(), target)} (${kb.toFixed(0)} KB)`);
  };

  await write("import.json", importManifest);
  await write("sources.json", sources);
  await write("entities.json", entities);
  await write("assertions.json", assertions);
  await write("anomalies.json", {
    generatedAt: new Date().toISOString(),
    policy:
      "Upstream data problems are REPORTED, not silently repaired. Each entry says what the pipeline " +
      "did and why. `atlas:validate` fails if an anomaly is present but unexplained.",
    corridor: CORRIDOR,
    rowsInCorridor: inCorridor.length,
    anomalies,
  });

  if (!skipGeojson) {
    const fc = (features: unknown[]) => ({ type: "FeatureCollection", features });
    await write("shapes-focus.geojson", fc(focusFeatures));
    // Corridor-wide geometry is ~25 MB after rounding. Generated and gitignored. Kept only for
    // offline re-analysis; the app serves the 1.3 MB focus tier through the API, date-filtered.
    const corridorPath = path.join(OUT_DIR, "shapes-corridor.geojson");
    await writeFile(corridorPath, JSON.stringify(fc(corridorFeatures)));
    const { statSync } = await import("node:fs");
    console.log(
      `[atlas:import] wrote ${path.relative(process.cwd(), corridorPath)} ` +
        `(${(statSync(corridorPath).size / 1e6).toFixed(1)} MB, gitignored — not served to browsers)`
    );
  }

  console.log(
    `\n[atlas:import] ${entities.length} entities, ${assertions.length} assertions, ` +
      `${focusFeatures.length} focus shapes, ${anomalies.length} anomaly classes, ` +
      `${relationRowsExcluded} RELATION rows excluded`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
