/**
 * GEOGRAPHICAL FEATURES — the physical spine of the corridor.
 *
 * GEOMETRY IS REFERENCED, NOT INLINED. `geometryRef` points into the committed Natural Earth basemap
 * using the scheme `<layer>#name=<feature name>`, resolved by src/lib/atlas/basemap.ts and CHECKED by
 * atlas/scripts/validate.ts. Nothing large is inlined here, because this file is imported by the app
 * and inlining river geometry would put hundreds of kilobytes into a JS bundle for no benefit.
 *
 * THE MEASUREMENTS BELOW ARE DERIVED, NOT QUOTED. Every number in `measurements` was computed by this
 * project from the actual basemap geometry, and says so in `method`. That matters because the obvious
 * alternative — writing "Ganga: 2,525 km" — would be quoting a figure we have not verified from a
 * source we have not consulted, in a project whose whole premise is that claims are traceable.
 *
 * READ THE METHOD STRINGS. Natural Earth's "Ganges" record is 15 separate line parts (trunk,
 * distributaries, anabranches) clipped to our window. Its total mapped centreline is 3,642 km and its
 * longest single part is 2,106 km. Neither is the river's published length, and presenting either as
 * "the length of the Ganga" would be a lie of exactly the kind this file exists to avoid. So we record
 * what we actually measured, name the metric precisely, and let the learner see the difference between
 * a measured property of a dataset and a published fact about the world.
 */

import type { GeographicalFeature } from "../../../../src/lib/atlas/model";

const NE = "natural-earth";
/** The computation every derived measurement shares, so the caveat is stated once per measurement. */
function method(featureName: string, metric: string): string {
  return (
    `Computed by this project from atlas/data/pilot/basemap/rivers.geojson (Natural Earth 10m ` +
    `rivers_lake_centerlines, upstream sha256 bb854a900ecbd3b408df46d5e16e3e0f974ba55993f9d8b5c26e855273c0905a), ` +
    `feature name="${featureName}". ${metric} Great-circle distance summed over consecutive vertices. ` +
    `NOT a published river length and not comparable to one: Natural Earth generalizes geometry, a ` +
    `single named river record may contain several disconnected parts (trunk plus distributaries), and ` +
    `the corridor clip truncates rivers entering from outside the window, so every value is a lower ` +
    `bound on the real figure.`
  );
}
const AS_OF = "2026-11-11";

export const CURATED_FEATURES: GeographicalFeature[] = [
  // ===========================================================================
  // THE GANGA SYSTEM
  // ===========================================================================
  {
    id: "feature-ganga",
    featureType: "river",
    name: { en: "Ganga", hi: "गंगा" },
    geometryRef: "rivers.geojson#name=Ganges",
    attributes: {
      naturalEarthName: "Ganges",
      scalerank: 3,
      lineParts: 15,
      basin: "Ganga-Brahmaputra-Meghna",
      flowsInto: "Bay of Bengal",
    },
    spatialPrecision: "boundary-approximate",
    measurements: [
      {
        metric: "mapped-centreline-km-longest-part",
        value: 2106,
        unit: "km",
        asOf: AS_OF,
        method: method("Ganges", "Longest single connected part of the feature, in km."),
        sources: [{ source: NE, locator: "ne_10m_rivers_lake_centerlines, name='Ganges'" }],
      },
      {
        metric: "mapped-centreline-km-all-parts",
        value: 3642,
        unit: "km",
        asOf: AS_OF,
        method: method("Ganges", "Sum over all 15 parts of the feature, in km."),
        sources: [{ source: NE, locator: "ne_10m_rivers_lake_centerlines, name='Ganges'" }],
      },
    ],
    sources: [
      { source: NE, locator: "ne_10m_rivers_lake_centerlines, name='Ganges'" },
      { source: "ncert-india-physical", locator: "Ch 3 'Drainage System'" },
    ],
    license: "Public Domain",
    curriculum: [
      { level: "school", board: "CBSE", class: "6", subject: "geography", concept: "Major rivers of India", verifiedAgainst: "NCERT Class VI Social Science treatment of Indian rivers", verifiedDate: "2026-11-11" },
      { level: "school", board: "CBSE", class: "11", subject: "geography", chapterRef: "Drainage System", registryTopicId: "c11-ind-ch3", verifiedAgainst: "NCERT Class XI Geography chapter titles", verifiedDate: "2026-11-11" },
      { level: "upsc", upscPaper: "geography-optional", concept: "Himalayan drainage; the Ganga basin" },
    ],
  },
  {
    id: "feature-yamuna",
    featureType: "tributary",
    name: { en: "Yamuna", hi: "यमुना" },
    geometryRef: "rivers.geojson#name=Yamuna",
    attributes: { naturalEarthName: "Yamuna", scalerank: 6, lineParts: 3, joinsAt: "place-prayagraj", bank: "right" },
    spatialPrecision: "boundary-approximate",
    measurements: [
      { metric: "mapped-centreline-km-longest-part", value: 955, unit: "km", asOf: AS_OF, method: method("Yamuna", "Longest single connected part, in km."), sources: [{ source: NE, locator: "ne_10m_rivers_lake_centerlines, name='Yamuna'" }] },
    ],
    sources: [
      { source: NE, locator: "ne_10m_rivers_lake_centerlines, name='Yamuna'" },
      { source: "ncert-india-physical", locator: "Ch 3 'Drainage System'" },
    ],
    license: "Public Domain",
    curriculum: [{ level: "school", board: "CBSE", class: "11", subject: "geography", chapterRef: "Drainage System", registryTopicId: "c11-ind-ch3", verifiedAgainst: "NCERT Class XI Geography chapter titles", verifiedDate: "2026-11-11" }],
  },
  {
    id: "feature-son",
    featureType: "tributary",
    name: { en: "Son", hi: "सोन" },
    geometryRef: "rivers.geojson#name=Son",
    attributes: {
      naturalEarthName: "Son",
      scalerank: 9,
      lineParts: 1,
      joinsNear: "place-pataliputra",
      bank: "right",
      note: "The Ganga's largest southern (right-bank) tributary. Its confluence with the Ganga is the reason Pataliputra mattered.",
    },
    spatialPrecision: "boundary-approximate",
    measurements: [
      { metric: "mapped-centreline-km-longest-part", value: 749, unit: "km", asOf: AS_OF, method: method("Son", "Single connected part, in km."), sources: [{ source: NE, locator: "ne_10m_rivers_lake_centerlines, name='Son'" }] },
    ],
    sources: [
      { source: NE, locator: "ne_10m_rivers_lake_centerlines, name='Son'" },
      { source: "ncert-india-physical", locator: "Ch 3 'Drainage System'" },
    ],
    license: "Public Domain",
    curriculum: [
      { level: "school", board: "CBSE", class: "11", subject: "geography", chapterRef: "Drainage System", registryTopicId: "c11-ind-ch3", verifiedAgainst: "NCERT Class XI Geography chapter titles", verifiedDate: "2026-11-11" },
      { level: "upsc", upscPaper: "geography-optional", concept: "Right-bank tributaries of the Ganga" },
    ],
  },
  {
    id: "feature-ghaghara",
    featureType: "tributary",
    name: { en: "Ghaghara", hi: "घाघरा" },
    geometryRef: "rivers.geojson#name=Ghäghara",
    attributes: { naturalEarthName: "Ghäghara", scalerank: 7, lineParts: 1, bank: "left", upperName: "Karnali" },
    spatialPrecision: "boundary-approximate",
    measurements: [
      { metric: "mapped-centreline-km-longest-part", value: 1060, unit: "km", asOf: AS_OF, method: method("Ghäghara", "Single connected part, in km."), sources: [{ source: NE, locator: "ne_10m_rivers_lake_centerlines, name='Ghäghara'" }] },
    ],
    sources: [
      { source: NE, locator: "ne_10m_rivers_lake_centerlines, name='Ghäghara'" },
      { source: "ncert-india-physical", locator: "Ch 3 'Drainage System'" },
    ],
    license: "Public Domain",
    curriculum: [{ level: "school", board: "CBSE", class: "11", subject: "geography", chapterRef: "Drainage System", registryTopicId: "c11-ind-ch3", verifiedAgainst: "NCERT Class XI Geography chapter titles", verifiedDate: "2026-11-11" }],
  },
  {
    id: "feature-gandak",
    featureType: "tributary",
    name: { en: "Gandak", hi: "गंडक" },
    geometryRef: "rivers.geojson#name=Gandak",
    attributes: { naturalEarthName: "Gandak", scalerank: 9, lineParts: 1, bank: "left", joinsNear: "place-sonpur-confluence", upperSystem: "Narayani" },
    spatialPrecision: "boundary-approximate",
    measurements: [
      { metric: "mapped-centreline-km-longest-part", value: 655, unit: "km", asOf: AS_OF, method: method("Gandak", "Single connected part, in km."), sources: [{ source: NE, locator: "ne_10m_rivers_lake_centerlines, name='Gandak'" }] },
    ],
    sources: [
      { source: NE, locator: "ne_10m_rivers_lake_centerlines, name='Gandak'" },
      { source: "ncert-india-physical", locator: "Ch 3 'Drainage System'" },
    ],
    license: "Public Domain",
    curriculum: [{ level: "school", board: "CBSE", class: "11", subject: "geography", chapterRef: "Drainage System", registryTopicId: "c11-ind-ch3", verifiedAgainst: "NCERT Class XI Geography chapter titles", verifiedDate: "2026-11-11" }],
  },
  {
    id: "feature-kosi",
    featureType: "tributary",
    name: { en: "Kosi (Sapt Kosi)", hi: "कोसी (सप्त कोसी)" },
    geometryRef: "rivers.geojson#name=Sapt",
    attributes: {
      naturalEarthName: "Sapt",
      scalerank: 7,
      lineParts: 1,
      bank: "left",
      note:
        "Natural Earth carries this river under the name 'Sapt', from the Sapt Kosi — its seven " +
        "headstreams. Displayed as Kosi with the upstream name recorded, because a learner searching " +
        "for 'Kosi' must find it and a learner searching for 'Sapt' must not be confused.",
    },
    spatialPrecision: "boundary-approximate",
    measurements: [
      { metric: "mapped-centreline-km-longest-part", value: 774, unit: "km", asOf: AS_OF, method: method("Sapt", "Single connected part, in km."), sources: [{ source: NE, locator: "ne_10m_rivers_lake_centerlines, name='Sapt'" }] },
    ],
    sources: [
      { source: NE, locator: "ne_10m_rivers_lake_centerlines, name='Sapt'" },
      { source: "ncert-india-physical", locator: "Ch 3 'Drainage System'" },
    ],
    license: "Public Domain",
    curriculum: [
      { level: "school", board: "CBSE", class: "11", subject: "geography", chapterRef: "Drainage System", registryTopicId: "c11-ind-ch3", verifiedAgainst: "NCERT Class XI Geography chapter titles", verifiedDate: "2026-11-11" },
      { level: "upsc", upscPaper: "gs3", concept: "Flood management; the Kosi's channel migration" },
    ],
  },
  {
    id: "feature-chambal",
    featureType: "tributary",
    name: { en: "Chambal", hi: "चंबल" },
    geometryRef: "rivers.geojson#name=Chambal",
    attributes: { naturalEarthName: "Chambal", scalerank: 7, lineParts: 3, via: "Yamuna", bank: "right" },
    spatialPrecision: "boundary-approximate",
    measurements: [
      { metric: "mapped-centreline-km-longest-part", value: 544, unit: "km", asOf: AS_OF, method: method("Chambal", "Longest single connected part, in km."), sources: [{ source: NE, locator: "ne_10m_rivers_lake_centerlines, name='Chambal'" }] },
    ],
    sources: [
      { source: NE, locator: "ne_10m_rivers_lake_centerlines, name='Chambal'" },
      { source: "ncert-india-physical", locator: "Ch 3 'Drainage System'" },
    ],
    license: "Public Domain",
    curriculum: [{ level: "school", board: "CBSE", class: "11", subject: "geography", chapterRef: "Drainage System", registryTopicId: "c11-ind-ch3", verifiedAgainst: "NCERT Class XI Geography chapter titles", verifiedDate: "2026-11-11" }],
  },
  {
    id: "feature-brahmaputra",
    featureType: "river",
    name: { en: "Brahmaputra", hi: "ब्रह्मपुत्र" },
    geometryRef: "rivers.geojson#name=Brahmaputra",
    attributes: { naturalEarthName: "Brahmaputra", scalerank: 2, lineParts: 2, upperName: "Yarlung Tsangpo", joinsSystem: "Ganga-Brahmaputra-Meghna delta" },
    spatialPrecision: "boundary-approximate",
    measurements: [
      { metric: "mapped-centreline-km-longest-part", value: 1065, unit: "km", asOf: AS_OF, method: method("Brahmaputra", "Longest single connected part, in km."), sources: [{ source: NE, locator: "ne_10m_rivers_lake_centerlines, name='Brahmaputra'" }] },
    ],
    sources: [
      { source: NE, locator: "ne_10m_rivers_lake_centerlines, name='Brahmaputra'" },
      { source: "ncert-india-physical", locator: "Ch 3 'Drainage System'" },
    ],
    license: "Public Domain",
    curriculum: [{ level: "school", board: "CBSE", class: "11", subject: "geography", chapterRef: "Drainage System", registryTopicId: "c11-ind-ch3", verifiedAgainst: "NCERT Class XI Geography chapter titles", verifiedDate: "2026-11-11" }],
  },
  {
    id: "feature-tista",
    featureType: "tributary",
    name: { en: "Tista", hi: "तीस्ता" },
    geometryRef: "rivers.geojson#name=Tista",
    attributes: { naturalEarthName: "Tista", scalerank: 7, lineParts: 1 },
    spatialPrecision: "boundary-approximate",
    measurements: [
      { metric: "mapped-centreline-km-longest-part", value: 331, unit: "km", asOf: AS_OF, method: method("Tista", "Single connected part, in km."), sources: [{ source: NE, locator: "ne_10m_rivers_lake_centerlines, name='Tista'" }] },
    ],
    sources: [
      { source: NE, locator: "ne_10m_rivers_lake_centerlines, name='Tista'" },
      { source: "ncert-india-physical", locator: "Ch 3 'Drainage System'" },
    ],
    license: "Public Domain",
    curriculum: [{ level: "school", board: "CBSE", class: "11", subject: "geography", chapterRef: "Drainage System", registryTopicId: "c11-ind-ch3", verifiedAgainst: "NCERT Class XI Geography chapter titles", verifiedDate: "2026-11-11" }],
  },

  // ===========================================================================
  // LANDFORMS — regions, not lines. No inline geometry; described and located.
  // ===========================================================================
  {
    id: "feature-gangetic-plain",
    featureType: "plain",
    name: { en: "Ganga plain (middle and lower)", hi: "गंगा मैदान (मध्य एवं निचला)" },
    geometryRef: "land.geojson#all",
    attributes: {
      extent: "From the Yamuna-Ganga doab in the west to the Bengal delta in the east",
      origin: "Alluvial deposition by the Himalayan river systems since the uplift of the Himalaya",
      note:
        "The corridor's dominant landform and the reason it has supported dense settlement for three " +
        "millennia. No polygon boundary is asserted: the plain's edge is a gradation into the " +
        "peninsular upland and the Himalayan foothill, not a line. Represented as a region with a " +
        "bounding box only, and the map renders it as a soft extent rather than a border.",
    },
    spatialPrecision: "region-only",
    license: "Public Domain",
    sources: [
      { source: "ncert-india-physical", locator: "Ch 2 'Physiography' — the northern plains" },
      { source: NE, locator: "ne_10m_land, clipped to the corridor window" },
    ],
    curriculum: [
      { level: "school", board: "CBSE", class: "11", subject: "geography", chapterRef: "Physiography", registryTopicId: "c11-ind-ch2", verifiedAgainst: "NCERT Class XI Geography chapter titles", verifiedDate: "2026-11-11" },
      { level: "school", board: "CBSE", class: "6", subject: "geography", concept: "The northern plains of India", verifiedAgainst: "NCERT Class VI Social Science treatment of Indian landforms", verifiedDate: "2026-11-11" },
      { level: "upsc", upscPaper: "geography-optional", concept: "Physiography of India; the Indo-Gangetic plain" },
    ],
  },
  {
    id: "feature-ganga-delta",
    featureType: "delta",
    name: { en: "Ganga-Brahmaputra-Meghna delta", hi: "गंगा-ब्रह्मपुत्र-मेघना डेल्टा" },
    geometryRef: "coastline.geojson#all",
    attributes: {
      largestIn: "the world, by area",
      activeProcesses: "Sediment deposition, channel avulsion, tidal reworking, subsidence, cyclone-driven storm surge",
      note:
        "The corridor's end point and its clearest demonstration of a landform that is still being " +
        "made. Everything the river eroded upstream is being deposited here, and the delta's own " +
        "channels migrate on human timescales — which is why Tamralipta, once a port, is now inland.",
    },
    spatialPrecision: "region-only",
    license: "Public Domain",
    sources: [
      { source: "ncert-fundamentals-physical", locator: "chapters on fluvial geomorphology: deltas and floodplains" },
      { source: "ncert-india-physical", locator: "Ch 3 'Drainage System'" },
      { source: NE, locator: "ne_10m_coastline and ne_10m_rivers_lake_centerlines, delta reach" },
    ],
    curriculum: [
      { level: "school", board: "CBSE", class: "11", subject: "geography", book: "Fundamentals of Physical Geography", chapterRef: "Fluvial landforms; deltas", verifiedAgainst: "NCERT Class XI Geography chapter titles", verifiedDate: "2026-11-11" },
      { level: "upsc", upscPaper: "geography-optional", concept: "Deltaic geomorphology; coastal hazards and cyclones" },
    ],
  },
  {
    id: "feature-sundarbans",
    featureType: "wetland",
    name: { en: "Sundarbans mangrove", hi: "सुंदरबन मैंग्रोव" },
    geometry: { type: "Point", coordinates: [89.1833, 21.9497] },
    attributes: {
      note:
        "Mangrove ecology on the active delta front. Point-located only: no mangrove extent polygon is " +
        "asserted, because Natural Earth's land and lake layers do not carry mangrove extent and this " +
        "project has no licensed source for it. Recorded as a coverage gap rather than approximated " +
        "from the coastline.",
    },
    spatialPrecision: "point-approximate",
    license: "Public Domain",
    sources: [
      { source: "ncert-india-people-economy", locator: "chapters on natural vegetation and biodiversity" },
      { source: "reference-coordinates", locator: "central position of the Sundarbans" },
    ],
    curriculum: [
      { level: "school", board: "CBSE", class: "12", subject: "geography", book: "India — People and Economy", chapterRef: "Human Settlements", verifiedAgainst: "NCERT Class XII Geography chapter titles", verifiedDate: "2026-11-11" },
      { level: "upsc", upscPaper: "geography-optional", concept: "Mangrove ecology; coastal zone management" },
    ],
  },
  {
    id: "feature-chotanagpur-plateau",
    featureType: "plateau",
    name: { en: "Chotanagpur plateau", hi: "छोटा नागपुर पठार" },
    geometry: { type: "Point", coordinates: [85.5, 23.4] },
    attributes: {
      minerals: "Coal (Jharia, Bokaro), iron ore, bauxite, copper, mica",
      drainage: "Damodar, Subarnarekha, North Koel, South Koel",
      note:
        "The corridor's southern upland and the mineral base of Jharkhand. Point-located only: no " +
        "plateau boundary polygon is asserted, because Natural Earth's physical layers do not carry " +
        "physiographic province boundaries and this project has no licensed source for one. Drawing a " +
        "boundary from a textbook sketch map would be fabrication with a plausible appearance.",
    },
    spatialPrecision: "region-only",
    license: "Public Domain",
    sources: [
      { source: "ncert-india-physical", locator: "Ch 2 'Physiography' — the peninsular plateau" },
      { source: "ncert-india-people-economy", locator: "chapters on mineral and energy resources" },
      { source: "reference-coordinates", locator: "central position of the plateau" },
    ],
    curriculum: [
      { level: "school", board: "CBSE", class: "11", subject: "geography", chapterRef: "Physiography", registryTopicId: "c11-ind-ch2", verifiedAgainst: "NCERT Class XI Geography chapter titles", verifiedDate: "2026-11-11" },
      { level: "school", board: "CBSE", class: "12", subject: "geography", chapterRef: "Mineral and Energy Resources", verifiedAgainst: "NCERT Class XII Geography chapter titles", verifiedDate: "2026-11-11" },
      { level: "upsc", upscPaper: "geography-optional", concept: "Peninsular India; mineral belts and industrial location" },
    ],
  },
  {
    id: "feature-garhwal-himalaya",
    featureType: "mountain-range",
    name: { en: "Garhwal Himalaya (Ganga source region)", hi: "गढ़वाल हिमालय (गंगा उद्गम क्षेत्र)" },
    geometry: { type: "Point", coordinates: [79.1, 30.9] },
    attributes: {
      peaks: "Nanda Devi, Kamet, Bandarpunch",
      glaciers: "Gangotri, Satopanth",
      note:
        "The source region: high-relief, glacially fed, geologically young and actively rising. The " +
        "~4,000 m at Gaumukh against ~50 m at Patna over roughly 900 km of river course is the single " +
        "figure that explains the corridor — a vast sediment load carried down a very gentle gradient " +
        "onto a very flat plain. Point-located: no range boundary asserted, for the same reason as the " +
        "plateau.",
    },
    spatialPrecision: "region-only",
    license: "Public Domain",
    sources: [
      { source: "ncert-india-physical", locator: "Ch 2 'Physiography' — the Himalayas" },
      { source: "ncert-fundamentals-physical", locator: "chapters on geomorphology and the rock cycle" },
      { source: "reference-coordinates", locator: "central position of the Garhwal source region" },
    ],
    curriculum: [
      { level: "school", board: "CBSE", class: "11", subject: "geography", chapterRef: "Physiography", registryTopicId: "c11-ind-ch2", verifiedAgainst: "NCERT Class XI Geography chapter titles", verifiedDate: "2026-11-11" },
      { level: "school", board: "CBSE", class: "11", subject: "geography", book: "Fundamentals of Physical Geography", chapterRef: "Geomorphology", verifiedAgainst: "NCERT Class XI Geography chapter titles", verifiedDate: "2026-11-11" },
      { level: "upsc", upscPaper: "geography-optional", concept: "Himalayan geomorphology; glacial and fluvial systems" },
    ],
  },

  // ===========================================================================
  // DOCUMENTED GAPS — features we know matter and cannot honestly draw
  // ===========================================================================
  {
    id: "feature-damodar",
    featureType: "river",
    name: { en: "Damodar", hi: "दामोदर" },
    attributes: {
      status: "NO GEOMETRY AVAILABLE",
      formerName: "'Sorrow of Bengal' for its floods",
      engineered: "Damodar Valley Corporation, established 1948 — India's first integrated multipurpose river-valley project",
      note:
        "DOCUMENTED COVERAGE GAP, NOT AN ABSENT RIVER. Natural Earth's 10m river layer does not carry " +
        "the Damodar as a named feature anywhere in the corridor window. This was verified by " +
        "inspecting all 70 imported river features and listing every one of the 51 that carry a name. " +
        "So the platform cannot draw this river, and it will not approximate a course from memory or " +
        "from a sketch map: an invented polyline would look correct on screen and be unverifiable in " +
        "fact, which is the worst outcome for a product whose entire claim is traceability. The river " +
        "is therefore represented as a place point and this feature record with no geometry, and the " +
        "interface must render it as 'course not in our licensed data'.",
    },
    spatialPrecision: "unknown",
    license: "n/a — no geometry asserted",
    sources: [
      { source: NE, locator: "ne_10m_rivers_lake_centerlines — the Damodar is ABSENT from all 70 imported features", note: "Negative result verified by inspection; see coverage record cov-natural-earth-river-gaps." },
      { source: "ncert-india-physical", locator: "Ch 3 'Drainage System' (peninsular drainage)" },
      { source: "dvc-act-1948", locator: "Damodar Valley Corporation Act, 1948 (Act No. XIV of 1948)" },
    ],
    curriculum: [
      { level: "school", board: "CBSE", class: "12", subject: "geography", chapterRef: "Water Resources", verifiedAgainst: "NCERT Class XII Geography chapter titles", verifiedDate: "2026-11-11" },
      { level: "upsc", upscPaper: "gs3", concept: "Multipurpose river valley projects; flood management" },
    ],
  },
  {
    id: "feature-uttarapatha",
    featureType: "trade-route",
    name: { en: "Uttarapatha — the northern highway", hi: "उत्तरापथ — उत्तरी महामार्ग" },
    attributes: {
      status: "NO GEOMETRY ASSERTED",
      describedAs: "Running from the north-west through Taxila, along the Ganga's southern bank past Pataliputra, to the eastern ports",
      note:
        "DOCUMENTED GAP, DELIBERATE. The Uttarapatha is well attested in textual sources and its " +
        "general course is not in doubt, but this project has NO licensed dataset of ancient route " +
        "geometry and no digitised historic map whose terms permit redistribution. Cliopatria carries " +
        "polities, not routes; Natural Earth carries modern roads, which would be actively misleading " +
        "under an ancient map. Drawing a plausible line between the known nodes would produce exactly " +
        "the kind of confident fabrication this platform exists to avoid. So the route is taught as a " +
        "sequence of connected PLACES — which the corpus does have, sourced — and the geometry is " +
        "recorded as a gap. See coverage record cov-ancient-route-geometry.",
    },
    spatialPrecision: "unknown",
    license: "n/a — no geometry asserted",
    sources: [
      { source: "thapar-early-india", locator: "chapters on trade routes and riverine communication" },
      { source: "artha-shastra", locator: "adhikarana on roads and settlements", note: "Describes routes in prose; contains no geometry." },
      { source: "ncert-tih-1", locator: "'Kings, Farmers and Towns'" },
    ],
    curriculum: [
      { level: "school", board: "CBSE", class: "12", subject: "history", chapterRef: "Kings, Farmers and Towns", verifiedAgainst: "NCERT Class XII History chapter titles", verifiedDate: "2026-11-11" },
      { level: "upsc", upscPaper: "gs1", concept: "Ancient Indian trade routes; urbanisation" },
      { level: "upsc", upscPaper: "history-optional", concept: "Trade and exchange in early India" },
    ],
  },
];

export const CURATED_FEATURE_IDS = CURATED_FEATURES.map((f) => f.id);
