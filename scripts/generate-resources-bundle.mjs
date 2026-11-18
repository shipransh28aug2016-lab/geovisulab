import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

// Import data modules using tsx/node
async function generateBundle() {
  const { CBSE_CURRICULUM_REGISTRY } = await import(path.join(root, "src/data/cbse-curriculum-registry.ts"));
  const {
    INDIAN_RIVERS,
    INDIAN_MOUNTAINS,
    INDIAN_SOILS,
    TECTONIC_PLATES,
    CLIMATE_ZONES,
    OCEAN_CURRENTS,
    CBSE_MAP_ITEMS,
  } = await import(path.join(root, "src/data/geo-features.ts"));
  const { HEADQUARTERS_DATA } = await import(path.join(root, "src/data/headquarters-data.ts"));
  const { CBSE_MAP_PRACTICE_ITEMS } = await import(path.join(root, "src/data/cbse-map-practice-data.ts"));
  const { NCERT_CONCEPT_EXPLANATIONS } = await import(path.join(root, "src/data/ncert-concept-explanations.ts"));
  const { CHARACTERISTICS_DEEP_DIVE_REGISTRY } = await import(path.join(root, "src/data/ncert-characteristics-deep-dive.ts"));
  const { CURATED_EVENTS } = await import(path.join(root, "atlas/data/pilot/curated/events.ts"));
  const { CURATED_PLACES } = await import(path.join(root, "atlas/data/pilot/curated/places.ts"));
  const { CURATED_INTERPRETATIONS } = await import(path.join(root, "atlas/data/pilot/curated/interpretations.ts"));
  const { CURATED_LEARNING } = await import(path.join(root, "atlas/data/pilot/curated/learning.ts"));

  const data = {
    curriculum: CBSE_CURRICULUM_REGISTRY,
    features: {
      rivers: INDIAN_RIVERS,
      mountains: INDIAN_MOUNTAINS,
      soils: INDIAN_SOILS,
      plates: TECTONIC_PLATES,
      climates: CLIMATE_ZONES,
      currents: OCEAN_CURRENTS,
      economic: CBSE_MAP_ITEMS,
      headquarters: HEADQUARTERS_DATA,
    },
    mapPractice: CBSE_MAP_PRACTICE_ITEMS,
    concepts: NCERT_CONCEPT_EXPLANATIONS,
    deepDives: CHARACTERISTICS_DEEP_DIVE_REGISTRY,
    atlas: {
      events: CURATED_EVENTS,
      places: CURATED_PLACES,
      interpretations: CURATED_INTERPRETATIONS,
      learning: CURATED_LEARNING,
    },
  };

  const outputJs = `// Auto-generated standalone data bundle for GeoVisuLab
// Generated on ${new Date().toISOString()}
window.GEOVISULAB_DATA = ${JSON.stringify(data, null, 2)};
`;

  const outputPath = path.join(root, "resources.js");
  fs.writeFileSync(outputPath, outputJs, "utf8");
  console.log(`[build:data] Written ${Buffer.byteLength(outputJs)} bytes to resources.js`);
}

generateBundle().catch((err) => {
  console.error("[build:data] Error:", err);
  process.exit(1);
});
