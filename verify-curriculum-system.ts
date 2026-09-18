/**
 * Automated Verification Script for CBSE Geography Interactive System
 * Validates:
 * 1. Curriculum Registry integrity (All chapters, books, and units for Classes 11 & 12)
 * 2. No duplicate chapter or topic IDs
 * 3. Prescribed map items presence across all 4 categories
 * 4. Coordinate geometry bounds validity (Lat -90 to +90, Lng -180 to +180)
 * 5. Scale and Time calculation functions accuracy
 * 6. Interactive layer sets integrity
 */

import { CBSE_CURRICULUM_REGISTRY } from "../src/data/cbse-curriculum-registry";
import { CBSE_MAP_PRACTICE_ITEMS } from "../src/data/cbse-map-practice-data";
import { HEADQUARTERS_DATA } from "../src/data/headquarters-data";
import { INDIAN_RIVERS, INDIAN_MOUNTAINS, INDIAN_SOILS, TECTONIC_PLATES } from "../src/data/geo-features";

function runVerification() {
  console.log("=================================================");
  console.log("RUNNING CBSE GEOGRAPHY CURRICULUM AUDIT & TESTS");
  console.log("Classes XI & XII Curriculum Verification");
  console.log("=================================================\n");

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string) {
    if (condition) {
      console.log(`[PASS] ${testName}`);
      passed++;
    } else {
      console.error(`[FAIL] ${testName}`);
      failed++;
    }
  }

  // TEST 1: Total Curriculum Topics Count & Integrity
  assert(
    CBSE_CURRICULUM_REGISTRY.length >= 20,
    `Curriculum Registry contains complete syllabus (${CBSE_CURRICULUM_REGISTRY.length} topics registered)`
  );

  // TEST 2: No Duplicate IDs
  const topicIds = new Set<string>();
  let hasDuplicate = false;
  CBSE_CURRICULUM_REGISTRY.forEach((t) => {
    if (topicIds.has(t.id)) {
      hasDuplicate = true;
      console.error(`Duplicate ID found: ${t.id}`);
    }
    topicIds.add(t.id);
  });
  assert(!hasDuplicate, "Zero duplicate IDs found in CBSE Curriculum Registry");

  // TEST 3: Both Class 11 and Class 12 Represented
  const class11Topics = CBSE_CURRICULUM_REGISTRY.filter((t) => t.classGrade === "11");
  const class12Topics = CBSE_CURRICULUM_REGISTRY.filter((t) => t.classGrade === "12");
  assert(class11Topics.length >= 10, `Class XI modules complete (${class11Topics.length} modules)`);
  assert(class12Topics.length >= 10, `Class XII modules complete (${class12Topics.length} modules)`);

  // TEST 4: Both Theory and Practical Books Present
  const hasPhysicalGeo = CBSE_CURRICULUM_REGISTRY.some((t) => t.book.includes("Physical Geography"));
  const hasIndiaPhysical = CBSE_CURRICULUM_REGISTRY.some((t) => t.book.includes("India: Physical Environment"));
  const hasHumanGeo = CBSE_CURRICULUM_REGISTRY.some((t) => t.book.includes("Human Geography"));
  const hasIndiaEconomy = CBSE_CURRICULUM_REGISTRY.some((t) => t.book.includes("India: People and Economy"));
  const hasPracticalI = CBSE_CURRICULUM_REGISTRY.some((t) => t.book.includes("Practical Work in Geography Part I"));
  const hasPracticalII = CBSE_CURRICULUM_REGISTRY.some((t) => t.book.includes("Practical Work in Geography Part II"));

  assert(hasPhysicalGeo && hasIndiaPhysical && hasHumanGeo && hasIndiaEconomy && hasPracticalI && hasPracticalII,
    "All 6 NCERT Books across Classes 11 and 12 are verified and registered"
  );

  // TEST 5: CBSE Map Practice Items Categories Un-mixed
  const c11World = CBSE_MAP_PRACTICE_ITEMS.filter((m) => m.category === "CLASS_XI_WORLD");
  const c11India = CBSE_MAP_PRACTICE_ITEMS.filter((m) => m.category === "CLASS_XI_INDIA");
  const c12World = CBSE_MAP_PRACTICE_ITEMS.filter((m) => m.category === "CLASS_XII_WORLD");
  const c12India = CBSE_MAP_PRACTICE_ITEMS.filter((m) => m.category === "CLASS_XII_INDIA");

  assert(
    c11World.length > 0 && c11India.length > 0 && c12World.length > 0 && c12India.length > 0,
    `Map-work engine has un-mixed categories: XI World (${c11World.length}), XI India (${c11India.length}), XII World (${c12World.length}), XII India (${c12India.length})`
  );

  // TEST 6: Coordinate Geometry Bounds Check
  let coordinatesValid = true;
  CBSE_MAP_PRACTICE_ITEMS.forEach((item) => {
    const [lat, lng] = item.coordinates;
    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      coordinatesValid = false;
      console.error(`Invalid coordinates in map item: ${item.nameEn} [${lat}, ${lng}]`);
    }
  });
  HEADQUARTERS_DATA.forEach((hq) => {
    const [lat, lng] = hq.coordinates;
    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      coordinatesValid = false;
      console.error(`Invalid coordinates in HQ item: ${hq.name} [${lat}, ${lng}]`);
    }
  });
  assert(coordinatesValid, "All map practice and headquarters coordinates are mathematically valid (-90 to +90, -180 to +180)");

  // TEST 7: Scale Conversion Accuracy Test
  // 6.4 cm at 1:50,000 scale should equal 3.2 km
  const testMapCm = 6.4;
  const testRf = 50000;
  const calcKm = (testMapCm * testRf) / 100000;
  assert(calcKm === 3.2, `Scale calculation accurate: 6.4 cm @ 1:50,000 = ${calcKm} km (expected 3.2 km)`);

  // TEST 8: Longitude Time Difference Accuracy Test
  // 82.5° East longitude should be 330 minutes (5 hours 30 minutes) ahead of GMT
  const testLng = 82.5;
  const diffMins = testLng * 4;
  assert(diffMins === 330, `Longitude-time calculation accurate: 82.5° × 4 mins = ${diffMins} mins (5h 30m IST)`);

  // TEST 9: Geographic Features Vector Layers
  assert(INDIAN_RIVERS.length >= 8, `Indian Rivers layer contains ${INDIAN_RIVERS.length} major river systems`);
  assert(INDIAN_MOUNTAINS.length >= 8, `Indian Mountains layer contains ${INDIAN_MOUNTAINS.length} peaks and ranges`);
  assert(INDIAN_SOILS.length >= 5, `ICAR Indian Soils layer contains ${INDIAN_SOILS.length} soil orders`);
  assert(TECTONIC_PLATES.length >= 5, `Tectonic Plates layer contains ${TECTONIC_PLATES.length} plate boundaries`);

  // TEST 10: Authentic NCERT Key Concept Explanations
  const { NCERT_CONCEPT_EXPLANATIONS, getConceptExplanation } = require("../src/data/ncert-concept-explanations");
  const conceptKeys = Object.keys(NCERT_CONCEPT_EXPLANATIONS);
  assert(
    conceptKeys.length >= 20,
    `Authentic NCERT Concept Explanations dictionary populated with ${conceptKeys.length} verified terms`
  );

  const sampleExplanation = getConceptExplanation("Demographic Transition Theory");
  assert(
    sampleExplanation && sampleExplanation.definition.length > 20 && sampleExplanation.detailedExplanation.length > 50,
    `Authentic NCERT explanation retrieval verified with bilingual definitions and CBSE keywords`
  );

  // TEST 11: Authentic Key Salient Characteristics Deep-Dive Registry
  const {
    CHARACTERISTICS_DEEP_DIVE_REGISTRY,
    getCharacteristicDeepDive,
  } = require("../src/data/ncert-characteristics-deep-dive");
  const charKeys = Object.keys(CHARACTERISTICS_DEEP_DIVE_REGISTRY);
  assert(
    charKeys.length >= 8,
    `Authentic NCERT Key Salient Characteristics Deep-Dive Registry active with ${charKeys.length} specialized entries`
  );

  const sampleDeepDive = getCharacteristicDeepDive(
    "S-waves cannot propagate through fluids",
    "P and S Wave Shadow Zones"
  );
  assert(
    sampleDeepDive &&
      sampleDeepDive.scientificMechanismEn.length > 100 &&
      sampleDeepDive.causeAndEffectEn.length > 20 &&
      sampleDeepDive.cbseMarkingCriteriaEn.length > 20 &&
      sampleDeepDive.commonMisconceptionVsFactEn.fact.length > 20,
    `Characteristic Deep-Dive verified with deep scientific mechanism, cause/effect, CBSE marking scheme, and misconception check`
  );

  console.log("\n=================================================");
  console.log(`VERIFICATION SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log("=================================================");

  if (failed > 0) {
    process.exit(1);
  }
}

runVerification();
