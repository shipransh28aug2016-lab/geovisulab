/**
 * TEMPORAL-SPATIAL KNOWLEDGE MODEL
 * ================================
 *
 * This is the engineering heart of the platform. Everything the UI does is a projection of these
 * records; nothing meaningful is hard-coded into components.
 *
 * Design decisions (see docs/DATA_MODEL.md and docs/DECISION_LOG.md):
 *
 * D-1  CLAIMS ARE SEPARATE FROM ENTITIES. An empire does not "have" a border. A *source* asserts
 *      that a *subject* stood in a *relation* to a *shape* over a *time interval*. Two sources that
 *      disagree are two assertions; we never merge them or pick a winner.
 *
 * D-2  DATES ARE EDTF, STORED AS ASTRONOMICAL YEARS. "There is no year zero" is a property of the
 *      display layer, not the storage layer. See ./temporal/years.ts.
 *
 * D-3  UNCERTAINTY IS TYPED, NEVER NUMERIC. There is deliberately no "reliability score". A single
 *      number would imply that a 7th-century inscription and a 2019 journal article are commensurable
 *      on one scale. Instead we record what we actually know: date certainty, spatial precision,
 *      evidence type, review status, and — separately — coverage, so that "no polity existed here"
 *      can never be confused with "we have no data for here".
 *
 * D-4  EVERY FACTUAL CLAIM CARRIES A CITATION WITH A LOCATOR. A locator is what lets a reader find
 *      the exact spot: a page, a map sheet, an inscription number, a feature id, a table.
 *      A claim with no locator is a validation error, not a warning.
 *
 * D-5  CAUSATION IS GRADED. Historical-geographical explanation (Domain D) must say whether it is
 *      reporting correlation, plausible influence, demonstrated causation, or a contested reading.
 *      Geographical determinism is not a default.
 *
 * D-6  LANGUAGE IS PER-FIELD, NOT PER-FILE. `en` is required; `hi` is optional and its absence is
 *      recorded as a coverage gap rather than papered over with machine translation presented as
 *      scholarship. Bilingual mode renders both and marks untranslated fields.
 */

// ---------------------------------------------------------------------------
// Localisation
// ---------------------------------------------------------------------------

/** BCP-47 style tags used in this corpus. `und` = local name, language not recorded by the source. */
/**
 * Languages the corpus may carry a name or text in. "en" and "hi" are the two UI languages; the rest
 * exist because a place in this corridor genuinely has a name in them (Sanskrit and Pali for ancient
 * sources, Bengali and Nepali for the eastern and northern reaches, Urdu for the medieval and colonial
 * record). "und" is for a name whose language we cannot determine — recorded as undetermined rather
 * than guessed. Absence of a "hi" value is a COVERAGE GAP, never a reason to machine-translate.
 */
export type LanguageTag = "en" | "hi" | "sa" | "pi" | "pa" | "bn" | "ne" | "ta" | "te" | "ur" | "und";

/** Text in both interface languages. `hi` optional; see D-6. */
export interface LocalisedText {
  en: string;
  hi?: string;
}

export const hasHindi = (t: LocalisedText | undefined): boolean => Boolean(t?.hi && t.hi.trim().length > 0);

/** Resolve localised text for a language mode. `bilingual` returns both, joined for display. */
export function resolveText(
  value: LocalisedText | undefined,
  mode: LanguageMode,
  fallback = "—"
): string {
  if (!value) return fallback;
  const en = value.en?.trim() || "";
  const hi = value.hi?.trim() || "";
  if (mode === "en") return en || fallback;
  if (mode === "hi") return hi || en || fallback;
  // bilingual
  if (en && hi) return `${en} · ${hi}`;
  return en || hi || fallback;
}

export type LanguageMode = "en" | "hi" | "bilingual";
export const LANGUAGE_MODES: ReadonlyArray<{ id: LanguageMode; label: string }> = [
  { id: "en", label: "English" },
  { id: "hi", label: "हिंदी" },
  { id: "bilingual", label: "Bilingual / द्विभाषी" },
];

// ---------------------------------------------------------------------------
// Provenance
// ---------------------------------------------------------------------------

export type SourceKind =
  | "dataset"
  | "book"
  | "article"
  | "map"
  | "document"
  | "archive"
  | "website"
  | "inscription"
  | "numismatic"
  | "excavation-report"
  | "thesis";

/** A locator is what makes a citation checkable. Free text, but never empty (D-4). */
export interface Citation {
  /** SourceRecord.id */
  source: string;
  /** Page, map sheet, inscription number, feature id, table, folio. Must be specific. */
  locator: string;
  /** Who is speaking in this source, or the original date wording before conversion. */
  note?: string;
  /** Exact transcribed wording, when we quote rather than paraphrase. */
  quoted?: string;
  /** Page/line range within the locator, where the source supports it. */
  span?: string;
}

export interface SourceRecord {
  id: string;
  kind: SourceKind;
  title: LocalisedText;
  /** Person(s) or institution responsible. */
  author?: string;
  publisher?: string;
  /** EDTF. */
  publicationDate?: string;
  url?: string;
  doi?: string;
  isbn?: string;
  /** Archive accession / call number, e.g. a National Archives of India cartographic record id. */
  archiveIdentifier?: string;
  /** SPDX or plain-text licence of the SOURCE ITSELF, tracked separately from our data. */
  license: string;
  /** The exact attribution string the licence requires. */
  attribution?: string;
  /** EDTF date we last checked the source was reachable / the edition we used. */
  accessDate?: string;
  /** Primary (produced at the time) vs secondary (later scholarship). */
  primary: boolean;
  /**
   * HOW FAR WE HAVE ACTUALLY GOT WITH THIS SOURCE. Without this field a bibliography is
   * indistinguishable from evidence, and a reader cannot tell whether a claim was checked against
   * the work or merely attributed to it. The validator counts these and the UI shows them.
   *   consulted          — read, and the locators used were checked against the text.
   *   reference-identified — the work exists and is correctly identified, but we have not
   *                          transcribed/verified the specific locators we cite for this pilot.
   *   not-consulted      — listed for the reader's further study only. No claim in this corpus
   *                          may rest on a source in this state.
   */
  verification: "consulted" | "reference-identified" | "not-consulted";
  /** Where this source speaks, spatially and temporally. Used to compute coverage gaps. */
  coverage?: {
    spatial?: BBox;
    /** EDTF interval. */
    temporal?: string;
    /** Does this source claim to be exhaustive within that coverage? */
    completeness?: "complete" | "partial" | "unknown";
  };
  notes?: string;
}

// ---------------------------------------------------------------------------
// Uncertainty vocabularies (D-3)
// ---------------------------------------------------------------------------

/** How sure the source is about WHEN. */
export type DateCertainty = "exact" | "approximate" | "uncertain" | "unknown";

/** How precisely the WHERE is known. Renders as distinct line styles, never colour alone. */
export type SpatialPrecision =
  | "point-surveyed"
  | "point-approximate"
  | "boundary-documented"
  | "boundary-approximate"
  | "frontier-zone"
  | "region-only"
  | "unknown";

/** What KIND of evidence backs a claim. */
export type EvidenceType =
  | "archaeological"
  | "epigraphic"
  | "textual"
  | "numismatic"
  | "cartographic"
  | "dataset-derived"
  | "scholarly-consensus";

/** Editorial state of a claim. */
export type ReviewStatus = "imported-unreviewed" | "curated" | "expert-reviewed" | "contested";

/**
 * What the map should say where there is nothing to draw.
 * CRITICAL: `no-entity` (a source tells us nothing was there) is a positive claim;
 * `no-data` (nobody has looked, or the source does not cover this area) is an absence of knowledge.
 * Conflating them turns a gap in our data into a false statement about history.
 */
export type CoverageStatus =
  | "no-entity"
  | "no-data"
  | "incomplete-coverage"
  | "boundary-disputed"
  | "sources-disagree"
  | "date-approximate"
  | "location-uncertain";

// ---------------------------------------------------------------------------
// Geometry
// ---------------------------------------------------------------------------

/** [west, south, east, north] in degrees. */
export type BBox = [number, number, number, number];

export type PointGeometry = { type: "Point"; coordinates: [number, number] };
export type LineGeometry = { type: "LineString"; coordinates: Array<[number, number]> };
export type PolygonGeometry = { type: "Polygon"; coordinates: Array<Array<[number, number]>> };
export type MultiPolygonGeometry = { type: "MultiPolygon"; coordinates: Array<Array<Array<[number, number]>>> };
export type AtlasGeometry = PointGeometry | LineGeometry | PolygonGeometry | MultiPolygonGeometry;

/**
 * A named geometry an assertion can point at. Kept in a separate file (GeoJSON) so that polygons are
 * never inlined into TypeScript modules — see docs/SYSTEM_ARCHITECTURE.md on bundle size.
 */
export interface ShapeRecord {
  id: string;
  geometry: PolygonGeometry | MultiPolygonGeometry;
  edgePrecision: SpatialPrecision;
  /** Where the outline came from. */
  sources: Citation[];
  license: string;
}

// ---------------------------------------------------------------------------
// Entities
// ---------------------------------------------------------------------------

export type PlaceType =
  | "city"
  | "town"
  | "village"
  | "archaeological-site"
  | "fort"
  | "port"
  | "pass"
  | "river-confluence"
  | "religious-site"
  | "administrative-centre"
  | "region"
  | "battlefield"
  | "mining-site";

export interface AlternateName {
  text: string;
  lang: LanguageTag;
  /** Native script, when `text` is transliterated. */
  script?: string;
  /** EDTF interval during which this name is attested. Absent = the source does not date it. */
  validTime?: string;
  sources: Citation[];
}

export interface Place {
  id: string;
  canonicalName: LocalisedText;
  /**
   * Historical and variant names, each dated and sourced where the evidence allows. Optional because
   * many places have no recorded variant name, and requiring an empty array would make "we found
   * none" indistinguishable from "we filled the field in". Absence is data: it means no variant name
   * is recorded in this corpus, not that none exists.
   */
  alternateNames?: AlternateName[];
  placeType: PlaceType;
  geometry: PointGeometry;
  /** Radius of positional uncertainty in km. Rendered, not hidden. */
  locationPrecisionKm?: number;
  elevationM?: number;
  /** Present-day identification, itself a claim and therefore sourced. */
  modernEquivalent?: { text: LocalisedText; sources: Citation[] };
  description?: LocalisedText;
  relatedPlaces?: string[];
  sources: Citation[];
  wikidata?: string;
  curriculum?: CurriculumLink[];
}

export type EntityType =
  | "polity"
  | "empire"
  | "kingdom"
  | "gana-sangha"
  | "dynasty"
  | "administrative-unit"
  | "trade-network"
  | "cultural-region"
  | "company"
  | "colonial-possession";

export interface EntityName {
  text: string;
  lang: LanguageTag;
  /** EDTF interval during which this name was used for this entity. */
  validTime?: string;
  sources: Citation[];
}

export type RelationPredicate =
  /** Active territorial form used by imports: "<subject> controls <shape> over <validTime>". */
  | "controls"
  | "controlled-by"
  | "administered-by"
  | "claimed-by"
  | "legally-recognised-as"
  | "occupied-by"
  | "traded-with"
  | "connected-through"
  | "located-at"
  | "succeeded-by"
  | "migrated-from"
  | "migrated-to"
  | "capital-of"
  | "part-of"
  | "tributary-of";

export interface EntityRelation {
  predicate: RelationPredicate;
  /** id of a Place, HistoricalEntity or GeographicalFeature */
  object: string;
  /** EDTF */
  validTime: string;
  sources: Citation[];
  notes?: string;
  /**
   * False when `object` names a real entity that this corpus did not import, because it lies outside
   * the corridor. The relation is kept — a composite genuinely extending beyond the corridor is true
   * and worth showing — but the interface must render it as "outside this corridor" rather than as a
   * missing or non-existent entity. Omitted means resolved (curated relations set it explicitly).
   * This is the referential-integrity half of D-3: incomplete coverage is not absence.
   */
  resolvedInCorridor?: boolean;
}

export interface HistoricalEntity {
  id: string;
  names: EntityName[];
  entityType: EntityType;
  /** EDTF interval for the entity's existence. */
  existence: string;
  dateCertainty: DateCertainty;
  relations: EntityRelation[];
  description?: LocalisedText;
  wikidata?: string;
  /** Seshat Global History Databank polity id, when Cliopatria supplies one. */
  seshatId?: string;
  sources: Citation[];
  curriculum?: CurriculumLink[];
}

/**
 * The heart of the model (D-1): "According to <sources>, <subject> <relation> <shape|object>
 * from <start> to <end>."
 */
export interface HistoricalAssertion {
  id: string;
  relation: RelationPredicate;
  /** HistoricalEntity.id */
  subject: string;
  /** ShapeRecord.id — for territorial relations. */
  shape?: string;
  /** Place/HistoricalEntity/GeographicalFeature id — for relational predicates. */
  object?: string;
  /** EDTF. Inclusive of the end year unless the source says the change happened on that date. */
  validTime: string;
  dateCertainty: DateCertainty;
  spatialPrecision: SpatialPrecision;
  evidenceType: EvidenceType;
  reviewStatus: ReviewStatus;
  sources: Citation[];
  notes?: LocalisedText;
}

// ---------------------------------------------------------------------------
// Events, features, interpretations
// ---------------------------------------------------------------------------

export type EventType =
  | "political-change"
  | "battle"
  | "treaty"
  | "accession"
  | "foundation"
  | "migration"
  | "environmental"
  | "economic"
  | "cultural"
  | "administrative"
  | "annexation"
  | "revolt";

/**
 * A graded causal claim (docs/DATA_MODEL.md D-5).
 *
 * This exists because "X caused Y" is the single most common way a history product quietly lies.
 * Grading the claim makes the difference between a demonstrated mechanism and an attractive story
 * visible to the learner and checkable by a reviewer. Geographical determinism is NOT the default:
 * a physical setting that enabled something did not compel it.
 */
export interface CausalClaim {
  claim: LocalisedText;
  claimStrength: ClaimStrength;
  sources: Citation[];
  /** Why this claim sits at this strength and not one higher. Required in practice by reviewers. */
  note?: LocalisedText;
}

export interface HistoricalEvent {
  id: string;
  title: LocalisedText;
  eventType: EventType;
  /** EDTF date or interval. */
  date: string;
  dateCertainty: DateCertainty;
  location?: {
    /** Place.id when the event happened at a place the corpus knows. Links rather than duplicates. */
    placeId?: string;
    geometry: PointGeometry;
    precisionKm: number;
    sources: Citation[];
  };
  /** HistoricalEntity ids involved. */
  entities: string[];
  /** Place ids involved. */
  places: string[];
  /** Assertion ids this event started or ended. */
  effects: string[];
  /** Written in our own words from the cited sources. */
  summary: LocalisedText;
  /**
   * Graded causes. Empty is a legitimate value — many events have no documented cause, and
   * inventing one is worse than leaving the array empty (docs/DATA_MODEL.md D-5).
   */
  causes?: CausalClaim[];
  /**
   * Why this event matters to the corridor, in our own words. Kept separate from `summary` because
   * summary describes what happened and significance describes why a learner should care — and the
   * DEPTH modes extend significance, not summary (see LearningContent.analyticalFocus).
   */
  significance?: LocalisedText;
  /** Where accounts differ, say so and attribute each account. */
  competingAccounts?: Array<{
    account: LocalisedText;
    sources: Citation[];
  }>;
  /** 1-5: when it appears on the timeline at low zoom. */
  importance: number;
  sources: Citation[];
  curriculum?: CurriculumLink[];
}

export type FeatureType =
  | "river"
  | "tributary"
  | "river-basin"
  | "delta"
  | "floodplain"
  | "mountain-range"
  | "peak"
  | "mountain-pass"
  | "plain"
  | "plateau"
  | "valley"
  | "desert"
  | "glacier"
  | "coast"
  | "lake"
  | "wetland"
  | "forest"
  | "soil-zone"
  | "mineral-belt"
  | "trade-route"
  | "canal"
  | "urban-area";

export interface GeographicalFeature {
  id: string;
  featureType: FeatureType;
  name: LocalisedText;
  /** Inline for small features; `geometryRef` for anything large (kept out of the JS bundle). */
  geometry?: LineGeometry | PolygonGeometry | MultiPolygonGeometry | PointGeometry;
  geometryRef?: string;
  attributes?: Record<string, string | number | boolean>;
  /** EDTF interval during which this feature is/was as described. Rivers move; deltas grow. */
  validTime?: string;
  spatialPrecision: SpatialPrecision;
  /** Quantitative attributes MUST carry their reference year (see docs/DATA_GOVERNANCE.md). */
  measurements?: Array<{
    metric: string;
    value: number;
    unit: string;
    /** EDTF — the year the measurement refers to, not the year it was published. */
    asOf: string;
    method?: string;
    sources: Citation[];
  }>;
  sources: Citation[];
  license: string;
  curriculum?: CurriculumLink[];
}

/** Strength of a historical-geographical explanation (D-5). */
export type ClaimStrength =
  | "demonstrated"
  | "plausible-influence"
  | "correlation-only"
  | "contested"
  | "speculative";

export interface InterpretationPosition {
  /** Whose reading this is. */
  label: LocalisedText;
  claim: LocalisedText;
  evidence: LocalisedText;
  strength: ClaimStrength;
  sources: Citation[];
}

/**
 * Domain D: an explicit question about how geography and history relate, with each documented
 * reading shown side by side and graded. The platform never asserts a single causal story where
 * scholarship has not.
 */
export interface Interpretation {
  id: string;
  question: LocalisedText;
  /** Place / entity / feature ids this bears on. */
  concerns: string[];
  positions: InterpretationPosition[];
  /** What would settle it, or why it cannot be settled with current evidence. */
  openQuestions?: LocalisedText;
  curriculum?: CurriculumLink[];
}

// ---------------------------------------------------------------------------
// Coverage — how "nothing here" is represented honestly
// ---------------------------------------------------------------------------

export interface CoverageRecord {
  id: string;
  /** SourceRecord.id whose coverage this describes. */
  source: string;
  area: BBox;
  /** EDTF interval the source covers. */
  from: string;
  until: string;
  /** Does the source claim to be exhaustive here? */
  completeness: "complete" | "partial" | "unknown";
  /** What to tell the user where this source has nothing to show. */
  status: CoverageStatus;
  notes?: LocalisedText;
}

// ---------------------------------------------------------------------------
// Curriculum
// ---------------------------------------------------------------------------

export type EducationLevel = "school" | "undergraduate" | "upsc";

export interface CurriculumLink {
  level: EducationLevel;
  board?: "CBSE" | "ICSE" | "State" | "NCERT";
  /** "6".."12" */
  class?: string;
  subject?: "history" | "geography" | "social-science" | "civics";
  /** id in CBSE_CURRICULUM_REGISTRY when the link is to the legacy visualiser's taxonomy. */
  registryTopicId?: string;
  book?: string;
  unit?: string;
  chapterRef?: string;
  learningOutcome?: string;
  concept?: string;
  upscPaper?: "prelims" | "gs1" | "gs2" | "gs3" | "history-optional" | "geography-optional";
  /**
   * Honest mapping requires naming what it was checked against and when. A link without these two
   * fields is a claim we have not verified — the validator flags it (see docs/CURRICULUM_TAXONOMY.md).
   */
  verifiedAgainst?: string;
  verifiedDate?: string;
  /**
   * Free-text qualification of the mapping — most importantly, a way to say the mapping is PROVISIONAL.
   * Without this field the only way to express doubt is to omit verifiedAgainst, which loses the
   * reason. A link carrying a note that says "to be confirmed" is honest; one carrying a confident
   * verifiedAgainst that nobody checked is not (docs/CURRICULUM_TAXONOMY.md).
   */
  note?: string;
}

// ---------------------------------------------------------------------------
// Learning depth
// ---------------------------------------------------------------------------

export type DepthMode = "discover" | "understand" | "analyse" | "research";

export const DEPTH_MODES: ReadonlyArray<{
  id: DepthMode;
  label: LocalisedText;
  audience: LocalisedText;
}> = [
  {
    id: "discover",
    label: { en: "Discover", hi: "खोज" },
    audience: { en: "Class VI–VIII", hi: "कक्षा ६–८" },
  },
  {
    id: "understand",
    label: { en: "Understand", hi: "समझ" },
    audience: { en: "Class IX–X", hi: "कक्षा ९–१०" },
  },
  {
    id: "analyse",
    label: { en: "Analyse", hi: "विश्लेषण" },
    audience: { en: "Class XI–XII & undergraduate", hi: "कक्षा ११–१२ एवं स्नातक" },
  },
  {
    id: "research",
    label: { en: "Research", hi: "शोध" },
    audience: { en: "UPSC & advanced learners", hi: "यूपीएससी एवं उच्च शिक्षार्थी" },
  },
];

/** Ordered, so "show everything at least as deep as the current mode" is a simple comparison. */
export const DEPTH_ORDER: ReadonlyArray<DepthMode> = ["discover", "understand", "analyse", "research"];

export function depthAtLeast(mode: DepthMode, minimum: DepthMode): boolean {
  return DEPTH_ORDER.indexOf(mode) >= DEPTH_ORDER.indexOf(minimum);
}

/**
 * Depth-moded explanatory content attached to any record.
 *
 * IMPORTANT (docs/PRODUCT_REQUIREMENTS.md): depth modes are not "more text for older students".
 * Higher modes must add analytical structure — comparison, evidence handling, uncertainty, and
 * questions — not merely longer prose. `analyticalFocus` exists so a reviewer can check that.
 */
export interface LearningContent {
  id: string;
  /** id of the Place / HistoricalEntity / GeographicalFeature / Interpretation this explains. */
  subject: string;
  depthMode: DepthMode;
  title: LocalisedText;
  body: LocalisedText;
  /** Concepts introduced, for glossary linking and curriculum mapping. */
  concepts?: string[];
  /** What this mode asks the learner to DO, beyond reading. */
  analyticalFocus?: LocalisedText;
  /** Questions, each with feedback rather than only a right/wrong verdict. */
  questions?: Array<{
    id: string;
    prompt: LocalisedText;
    kind: "multiple-choice" | "map-based" | "sequence" | "source-evaluation" | "short-answer";
    options?: LocalisedText[];
    correctIndex?: number;
    /**
     * For sequence questions: the zero-based indices of `options` in the correct order, as strings —
     * e.g. ["2","0","3","1"] means the third option comes first. Indices rather than copied text so
     * the answer cannot drift out of step with the options when wording is edited, and so the
     * validator can check that it is a permutation of the option count.
     */
    correctOrder?: string[];
    feedback: LocalisedText;
    sources?: Citation[];
  }>;
  sources?: Citation[];
}

// ---------------------------------------------------------------------------
// Corpus
// ---------------------------------------------------------------------------

/** A whole pilot corpus, as loaded from `atlas/data/<corpus>/`. */
export interface AtlasCorpus {
  id: string;
  title: LocalisedText;
  /** BBox the corpus is scoped to. Data outside it is out of scope, not absent. */
  bounds: BBox;
  /** EDTF interval the corpus covers. */
  temporalExtent: [string, string];
  generatedAt: string;
  sources: SourceRecord[];
  places: Place[];
  entities: HistoricalEntity[];
  assertions: HistoricalAssertion[];
  events: HistoricalEvent[];
  features: GeographicalFeature[];
  interpretations: Interpretation[];
  coverage: CoverageRecord[];
  learning: LearningContent[];
  /** Manifest of every third-party dataset, with its own licence (see docs/LICENCE_AUDIT.md). */
  imports: DatasetImport[];
}

/**
 * A third-party dataset this corpus draws on. Kept separate from `sources` because a dataset import
 * carries redistribution obligations that a book citation does not.
 */
export interface DatasetImport {
  id: string;
  name: string;
  publisher: string;
  url: string;
  /** Pinned version/commit/release the corpus was built from. */
  version: string;
  license: string;
  attribution: string;
  /** What we did to it. Required by CC-BY: changes must be indicated. */
  modifications: string;
  /** Year-numbering convention the upstream uses — see ./temporal/years.ts. */
  yearConvention: "astronomical" | "historical" | "undocumented";
  recordsImported: number;
  importedAt: string;
}
