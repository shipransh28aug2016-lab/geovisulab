import { describe, it, expect } from "vitest";
import { CBSE_CURRICULUM_REGISTRY } from "@/data/cbse-curriculum-registry";
import { CBSE_MAP_PRACTICE_ITEMS } from "@/data/cbse-map-practice-data";
import { NCERT_CONCEPT_EXPLANATIONS } from "@/data/ncert-concept-explanations";
import { CHARACTERISTICS_DEEP_DIVE_REGISTRY } from "@/data/ncert-characteristics-deep-dive";
import { INDIAN_RIVERS, INDIAN_MOUNTAINS, INDIAN_SOILS } from "@/data/geo-features";

describe("CBSE Geography Curriculum Registry & Pedagogy Audit (PGT 20y Authority)", () => {
  it("contains all 43 registered NCERT curriculum topics across Classes XI and XII", () => {
    expect(CBSE_CURRICULUM_REGISTRY.length).toBe(43);

    const class11 = CBSE_CURRICULUM_REGISTRY.filter((t) => t.classGrade === "11");
    const class12 = CBSE_CURRICULUM_REGISTRY.filter((t) => t.classGrade === "12");

    expect(class11.length).toBe(24);
    expect(class12.length).toBe(19);
  });

  it("covers all 6 prescribed NCERT textbooks without omission", () => {
    const books = new Set(CBSE_CURRICULUM_REGISTRY.map((t) => t.book));
    expect(books.has("Fundamentals of Physical Geography")).toBe(true);
    expect(books.has("India: Physical Environment")).toBe(true);
    expect(books.has("Fundamentals of Human Geography")).toBe(true);
    expect(books.has("India: People and Economy")).toBe(true);
    expect(books.has("Practical Work in Geography Part I")).toBe(true);
    expect(books.has("Practical Work in Geography Part II")).toBe(true);
  });

  it("verifies topic identifiers and codes are unique and structured", () => {
    const ids = new Set<string>();

    for (const t of CBSE_CURRICULUM_REGISTRY) {
      expect(ids.has(t.id)).toBe(false);
      ids.add(t.id);

      expect(t.topic.trim().length).toBeGreaterThan(0);
      expect(t.learningObjective.trim().length).toBeGreaterThan(0);
      expect(t.examTips.trim().length).toBeGreaterThan(0);
    }
  });

  it("verifies geographic coordinates of topics stay within realistic spherical limits", () => {
    for (const t of CBSE_CURRICULUM_REGISTRY) {
      if (t.targetLocation) {
        expect(t.targetLocation.lat).toBeGreaterThanOrEqual(-90);
        expect(t.targetLocation.lat).toBeLessThanOrEqual(90);
        expect(t.targetLocation.lng).toBeGreaterThanOrEqual(-180);
        expect(t.targetLocation.lng).toBeLessThanOrEqual(180);
      }
    }
  });
});

describe("Physical Geography Scientific Integrity (NCERT Class XI Standard)", () => {
  it("enforces exact NCERT P-wave (105°-145°) and S-wave (105°-180°) shadow zones", () => {
    const shadowConcept = NCERT_CONCEPT_EXPLANATIONS["p-wave and s-wave shadow zones"];
    expect(shadowConcept).toBeDefined();

    // Check P-wave shadow zone is 105° to 145°
    expect(shadowConcept.detailedExplanation).toContain("105° and 145°");
    expect(shadowConcept.keyCharacteristics.some((k) => k.includes("105° and 145°"))).toBe(true);

    // Check S-wave shadow zone is continuous from 105° to 180°
    expect(shadowConcept.detailedExplanation).toContain("105° to 180°");
    expect(shadowConcept.keyCharacteristics.some((k) => k.includes("105° to 180°"))).toBe(true);

    const deepDive = CHARACTERISTICS_DEEP_DIVE_REGISTRY["s-wave shadow zone continuous"];
    expect(deepDive).toBeDefined();
    expect(deepDive.commonMisconceptionVsFactEn.fact).toContain("145°");
    expect(deepDive.commonMisconceptionVsFactEn.fact).toContain("105° to 180°");
  });

  it("validates the 100-Unit Global Heat Budget arithmetic equilibrium", () => {
    const albedoClouds = 27;
    const albedoScattering = 6;
    const albedoIce = 2;
    const totalAlbedo = albedoClouds + albedoScattering + albedoIce;
    expect(totalAlbedo).toBe(35);

    const absorbedAtmosphere = 14;
    const absorbedSurfaceDirect = 17;
    const absorbedSurfaceDiffuse = 34;
    const totalSurfaceAbsorbed = absorbedSurfaceDirect + absorbedSurfaceDiffuse;
    expect(totalSurfaceAbsorbed).toBe(51);

    const totalAbsorbed = absorbedAtmosphere + totalSurfaceAbsorbed;
    expect(totalAbsorbed).toBe(65);

    expect(totalAlbedo + totalAbsorbed).toBe(100);

    // Terrestrial radiation leaving earth: 51 units
    // 17 direct to space + 34 absorbed by atmosphere
    const terrestrialToSpace = 17;
    const terrestrialToAtmosphere = 34; // 23 latent heat + 9 convection + 2 radiation
    expect(terrestrialToSpace + terrestrialToAtmosphere).toBe(51);

    // Atmosphere total radiation to space: 14 (solar) + 34 (terrestrial) = 48 units
    const atmosphereToSpace = absorbedAtmosphere + terrestrialToAtmosphere;
    expect(atmosphereToSpace).toBe(48);

    // Total returning to space: 35 (albedo) + 17 (surface) + 48 (atmosphere) = 100 units
    expect(totalAlbedo + terrestrialToSpace + atmosphereToSpace).toBe(100);
  });

  it("validates Indian Standard Time (IST) 82°30'E calculation", () => {
    const istLongitude = 82.5; // 82° 30' E
    const minutesPerDegree = 4;
    const totalMinutes = istLongitude * minutesPerDegree;
    expect(totalMinutes).toBe(330); // 330 minutes

    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    expect(hours).toBe(5);
    expect(mins).toBe(30); // Exactly +5 hours 30 mins

    // Longitude difference between Gujarat (~68°E) and Arunachal Pradesh (~97°E) ~ 29°
    const spanDegrees = 97.4 - 68.1;
    const spanMinutes = spanDegrees * 4;
    expect(Math.round(spanMinutes / 60)).toBe(2); // ~2 hours time lag
  });

  it("validates Representative Fraction (R.F.) scale conversion", () => {
    const mapCm = 6.4;
    const rf = 50000; // 1:50,000 toposheet
    const groundKm = (mapCm * rf) / 100000;
    expect(groundKm).toBe(3.2); // Exact 3.2 km
  });
});

describe("CBSE Board Exam Map Work Categories (Subject Code 029 Blueprint)", () => {
  it("enforces strict un-mixed syllabus across all 4 map categories", () => {
    const xiWorld = CBSE_MAP_PRACTICE_ITEMS.filter((i) => i.category === "CLASS_XI_WORLD");
    const xiIndia = CBSE_MAP_PRACTICE_ITEMS.filter((i) => i.category === "CLASS_XI_INDIA");
    const xiiWorld = CBSE_MAP_PRACTICE_ITEMS.filter((i) => i.category === "CLASS_XII_WORLD");
    const xiiIndia = CBSE_MAP_PRACTICE_ITEMS.filter((i) => i.category === "CLASS_XII_INDIA");

    expect(xiWorld.length).toBe(5);
    expect(xiIndia.length).toBe(6);
    expect(xiiWorld.length).toBe(4);
    expect(xiiIndia.length).toBe(6);
    expect(CBSE_MAP_PRACTICE_ITEMS.length).toBe(21);

    for (const item of CBSE_MAP_PRACTICE_ITEMS) {
      expect(item.nameEn.length).toBeGreaterThan(0);
      expect(item.descriptionEn.length).toBeGreaterThan(0);
      expect(item.coordinates.length).toBe(2);
    }
  });

  it("verifies major river drainage, peaks, and soil orders exist in feature registers", () => {
    expect(INDIAN_RIVERS.length).toBeGreaterThanOrEqual(8);
    expect(INDIAN_MOUNTAINS.length).toBeGreaterThanOrEqual(12);
    expect(INDIAN_SOILS.length).toBeGreaterThanOrEqual(5);

    // Verify Ganga details
    const ganga = INDIAN_RIVERS.find((r) => r.name.includes("Ganga"));
    expect(ganga).toBeDefined();
    expect(ganga?.lengthKm).toBe(2525);
    expect(ganga?.origin).toContain("Gangotri");

    // Verify Kanchenjunga details
    const kj = INDIAN_MOUNTAINS.find((m) => m.name.includes("Kanchenjunga"));
    expect(kj).toBeDefined();
    expect(kj?.elevationM).toBe(8586);
  });
});
