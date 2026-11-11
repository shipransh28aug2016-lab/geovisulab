/**
 * EVENTS — Ganga-Magadha-Eastern India knowledge corridor.
 *
 * TEMPORAL CONVENTION (docs/DATA_MODEL.md D-2, src/lib/atlas/temporal/):
 *  Dates are EDTF over ASTRONOMICAL year integers, where astronomical 0 = historical 1 BCE. So
 *  545 BCE is written "-0544" and 326 BCE is "-0325". Every one of these strings below was computed
 *  from the historical year, never typed by hand, and the validator cross-checks them. User-facing
 *  strings are produced by formatTemporal() and never contain a year zero.
 *
 * HONESTY CONVENTION:
 *  `dateCertainty` reflects how the evidence actually behaves, not how confident the narration feels.
 *  Several dates here are CONTESTED rather than merely approximate, and those get a `disputedDate`
 *  interpretation with both candidate positions named. The Buddha's and Mahavira's deaths are the
 *  clearest case: the long and short chronologies differ by roughly a century, and this corpus does
 *  not pick a winner (docs/DATA_MODEL.md D-5).
 *
 * `effects.ended` deliberately does NOT reference Cliopatra shape IDs. Cliopatra's own from/to years
 *  for Magadha are a separate sampling of the same history, and asserting that a curated event ended
 *  a dataset row we did not adjudicate would manufacture a link. The validator enforces that rule.
 */

import type { HistoricalEvent } from "../../../../src/lib/atlas/model";

export const CURATED_EVENTS: HistoricalEvent[] = [
  // ===========================================================================
  // c. 600 BCE — the second urbanisation
  // ===========================================================================
  {
    id: "event-second-urbanisation",
    eventType: "economic",
    entities: ["cliopatria-mahajanapadas"],
    importance: 4,
    title: {
      en: "Second urbanisation in the middle Ganga valley",
      hi: "मध्य गंगा घाटी में द्वितीय नगरीकरण",
    },
    date: "-0599/-0299",
    dateCertainty: "approximate",
    location: {
      placeId: "place-rajagriha",
      geometry: { type: "Point", coordinates: [85.0, 25.5] },
      precisionKm: 150,
      sources: [REF_C("thapar-early-india", "chapters on the second urbanisation")],
    },
    summary: {
      en:
        "Over roughly the sixth to fourth centuries BCE, fortified towns and cities reappeared in the " +
        "middle Ganga valley after the long interval since the Indus cities. The concentration is " +
        "striking: of the sixteen great realms named in early Buddhist and Jain tradition, most sit in " +
        "this corridor, on the Ganga and its major tributaries. What the evidence supports is a " +
        "combination — iron tools clearing and ploughing the wet alluvium, paddy agriculture producing " +
        "a genuine surplus, river transport making that surplus movable, and the resulting competition " +
        "between polities rewarding centralisation. What the evidence does NOT support is any single " +
        "factor doing the work, and in particular not 'fertile land', since equally fertile land " +
        "exists elsewhere without cities arising at this moment.",
      hi:
        "लगभग छठी से चौथी शताब्दी ईसा पूर्व के बीच, सिंधु नगरों के बाद के लंबे अंतराल के पश्चात मध्य " +
        "गंगा घाटी में किलाबंद नगर और नगरियाँ पुनः प्रकट हुईं। यह एकाग्रता उल्लेखनीय है: प्रारंभिक " +
        "बौद्ध एवं जैन परंपरा में नामित सोलह महाजनपदों में से अधिकांश इसी क्षेत्र में, गंगा एवं उसकी " +
        "प्रमुख सहायक नदियों पर स्थित हैं। प्रमाण जो समर्थन करता है वह एक संयोजन है — लौह उपकरणों द्वारा " +
        "गीली जलोढ़ भूमि को साफ़ करना और जोतना, धान कृषि से वास्तविक अधिशेष, नदी परिवहन द्वारा उस " +
        "अधिशेष को गतिशील बनाना, और परिणामी प्रतिस्पर्धा का केंद्रीकरण को पुरस्कृत करना।",
    },
    causes: [
      {
        claim: {
          en:
          "Iron-working in the middle Ganga valley made possible the clearing of dense forest and the " +
          "deep ploughing of heavy alluvium, which raised agricultural yields enough to support " +
          "non-farming populations." },
        claimStrength: "plausible-influence",
        sources: [
          { source: "singh-ancient-india", locator: "chapters on iron, agriculture and the second urbanisation" },
          { source: "thapar-early-india", locator: "chapters on the second urbanisation" },
        ],
        note: {
          en:
          "Archaeology firmly establishes both iron and intensified agriculture in the right period and " +
          "place, but it does not establish a rate or a mechanism sufficient to say the surplus would " +
          "not have arisen without iron. Held as a plausible influence, not a demonstrated cause." },
      },
      {
        claim: {
          en:
          "Riverine transport along the Ganga and its tributaries lowered the cost of moving " +
          "agricultural surplus, building material and troops over long distances, which made large " +
          "territorial states viable for the first time in this region." },
        claimStrength: "demonstrated",
        sources: [
          { source: "ncert-india-physical", locator: "Ch 3 'Drainage System' — the navigable lower Ganga" },
          { source: "thapar-early-india", locator: "chapters on trade routes and riverine communication" },
        ],
        note: {
          en:
          "The physical fact is not in dispute: the lower Ganga is navigable and the cities and capitals " +
          "of the period are on it. The map in this pilot demonstrates the spatial correlation directly." },
      },
      {
        claim: {
          en:
          "Competition between the sixteen great realms, and between Magadha and the Vajji " +
          "confederacy in particular, drove political centralisation and the accumulation of resources " +
          "in one polity." },
        claimStrength: "plausible-influence",
        sources: [{ source: "thapar-early-india", locator: "chapters on the rise of Magadha" }],
        note: { en: "Inferred from the outcome and from later textual accounts of the conflict, rather than directly documented for the period." },
      },
      {
        claim: {
          en:
          "The geographical setting of the middle Ganga valley — its rainfall, soil, and river network " +
          "— determined that cities and states would arise here and made their form inevitable." },
        claimStrength: "contested",
        sources: [
          { source: "thapar-early-india", locator: "chapters on the rise of Magadha, and on the limits of geographical explanation" },
        ],
        note: {
          en:
          "Explicitly graded as contested, because geographical determinism is the default narrative " +
          "this pilot exists to complicate. The physical setting enabled; it did not compel. The " +
          "identical setting did not produce the same outcome in every century before or after." },
      },
    ],
    effects: [],
    significance: {
      en:
        "This is the process that makes everything else in the pilot intelligible. Without the surplus " +
        "and the connectivity it created there is no Magadha, no Mauryan state, no Pataliputra, and no " +
        "reason for a Buddha or a Mahavira to be heard by urban audiences.",
      hi:
        "यह वह प्रक्रिया है जो पायलट की अन्य सब कुछ को बुद्धिगम्य बनाती है। इसके द्वारा सृजित अधिशेष एवं " +
        "संपर्क-क्षमता के बिना न मगध है, न मौर्य राज्य, न पाटलिपुत्र, और न ही किसी बुद्ध या महावीर को " +
        "नगरीय श्रोता मिलने का कोई कारण।",
    },
    places: ["place-rajagriha", "place-pataliputra", "place-vaishali", "place-ganga-river", "place-varanasi"],
    sources: [
      { source: "thapar-early-india", locator: "chapters on the second urbanisation and the rise of Magadha" },
      { source: "singh-ancient-india", locator: "chapters on iron, agriculture and early cities" },
      { source: "ncert-tih-1", locator: "'Kings, Farmers and Towns'" },
      { source: "natural-earth", locator: "river geometry underlying the navigability argument" },
    ],
    curriculum: [
      { level: "school", board: "CBSE", class: "12", subject: "history", chapterRef: "Kings, Farmers and Towns", verifiedAgainst: "NCERT Class XII History chapter titles", verifiedDate: "2026-11-11" },
      { level: "school", board: "CBSE", class: "9", subject: "history", concept: "Early Indian states and cities", verifiedAgainst: "NCERT Class IX India and the Contemporary World I", verifiedDate: "2026-11-11" },
      { level: "upsc", upscPaper: "gs1", concept: "Second urbanisation; Mahajanapadas" },
      { level: "upsc", upscPaper: "history-optional", concept: "Causes of the rise of Magadha" },
    ],
  },

  // ===========================================================================
  // BUDDHA AND MAHAVIRA — contested dates, presented as contested
  // ===========================================================================
  {
    id: "event-parinibbana-buddha",
    eventType: "cultural",
    entities: ["cliopatria-janapada-of-malla"],
    importance: 4,
    title: {
      en: "Mahaparinibbana of the Buddha at Kushinagar",
      hi: "कुशीनगर में बुद्ध का महापरिनिर्वाण",
    },
    date: "-0482~/-0399~",
    dateCertainty: "uncertain",
    location: {
      placeId: "place-kushinagar",
      geometry: { type: "Point", coordinates: [83.8897, 26.7397] },
      precisionKm: 2,
      sources: [{ source: "reference-coordinates", locator: "Kushinagar reference position" }],
    },
    summary: {
      en:
        "The Buddha's death, in the Malla country north of the Ganga. The event is securely located and " +
        "firmly attested in Buddhist textual tradition; its DATE is one of the most contested in Indian " +
        "chronology. The 'long chronology', resting on the Mahavamsa tradition and on Ashokan " +
        "regnal reckoning, gives c. 483 BCE. The 'short chronology', argued from the internal " +
        "evidence of the Pali canon and from the synchronism with Ashoka's consecration, gives c. 400 " +
        "BCE or later. A symposium of specialists devoted to this single question did not resolve it. " +
        "The interval shown on the timeline is therefore roughly a century wide, on purpose.",
      hi:
        "गंगा के उत्तर मल्ल देश में बुद्ध की मृत्यु। यह घटना स्थान की दृष्टि से निश्चित है और बौद्ध " +
        "ग्रंथ-परंपरा में दृढ़ता से प्रमाणित है; परंतु इसकी तिथि भारतीय काल-गणना के सबसे विवादित " +
        "प्रश्नों में से एक है। 'दीर्घ काल-गणना', जो महावंस परंपरा एवं अशोकीय शासन-गणना पर आधारित है, " +
        "लगभग ४८३ ईसा पूर्व देती है। 'ह्रस्व काल-गणना', जो पालि त्रिपिटक के आंतरिक प्रमाण एवं अशोक के " +
        "राज्याभिषेक के समकालिकता-संबंध से तर्कित है, लगभग ४०० ईसा पूर्व या उसके बाद देती है। केवल इसी " +
        "प्रश्न पर विशेषज्ञों का एक संगोष्ठी-सम्मेलन इसे हल नहीं कर सका।",
    },
    causes: [],
    effects: [],
    significance: {
      en:
        "Beyond its religious importance, this is the pilot's teaching case for how a date can be " +
        "contested rather than merely imprecise. Learners see one event with two documented candidate " +
        "centuries, the evidence behind each, and a platform that refuses to choose.",
      hi:
        "इसके धार्मिक महत्व के अतिरिक्त, यह इस पायलट का शिक्षण-प्रकरण है कि किस प्रकार एक तिथि केवल " +
        "अनिश्चित नहीं बल्कि विवादित हो सकती है। शिक्षार्थी एक घटना को दो प्रमाणित संभावित शताब्दियों के " +
        "साथ देखते हैं।",
    },
    places: ["place-kushinagar", "place-bodhgaya", "place-sarnath", "place-vaishali"],
    sources: [
      { source: "bechert-dating-buddha", locator: "Parts 1-3, the Göttingen symposium on the Buddha's dates" },
      { source: "mahavamsa", locator: "early chronological books" },
      { source: "singh-ancient-india", locator: "chapters on the Buddha and his dates" },
      { source: "ncert-tih-1", locator: "'Kings, Farmers and Towns'" },
    ],
    curriculum: [
      { level: "school", board: "CBSE", class: "12", subject: "history", chapterRef: "Kings, Farmers and Towns", verifiedAgainst: "NCERT Class XII History chapter titles", verifiedDate: "2026-11-11" },
      { level: "upsc", upscPaper: "gs1", concept: "Buddhism; ancient Indian chronology" },
      { level: "upsc", upscPaper: "history-optional", concept: "Chronological problems of early India" },
    ],
  },
  {
    id: "event-mahavira-nirvana",
    eventType: "cultural",
    entities: ["cliopatria-janapada-of-malla"],
    importance: 3,
    title: { en: "Nirvana of Mahavira at Pavapuri", hi: "पावापुरी में महावीर का निर्वाण" },
    date: "-0526~/-0467~",
    dateCertainty: "uncertain",
    location: {
      placeId: "place-rajagriha",
      geometry: { type: "Point", coordinates: [85.37, 25.16] },
      precisionKm: 5,
      sources: [
        {
          source: "reference-coordinates",
          locator: "Pavapuri reference position, 85.37E 25.16N",
          note: "Pavapuri lies south-east of Rajgir in the same hill-and-lake basin.",
        },
      ],
    },
    summary: {
      en:
        "The death of the twenty-fourth Tirthankara, in the Malla country near Rajagriha. Jain " +
        "tradition gives a date in the late sixth century BCE; scholarly reconstruction places it " +
        "roughly a century later, in parallel with the debate over the Buddha's dates, since both " +
        "chronologies rest partly on the same Mahavamsa-derived framework. The interval here spans the " +
        "traditional date of c. 527 BCE and the reconstructed range c. 468 BCE or later.",
      hi:
        "चौबीसवें तीर्थंकर की मृत्यु, राजगृह के समीप मल्ल देश में। जैन परंपरा छठी शताब्दी ईसा पूर्व के " +
        "अंत की तिथि देती है; विद्वत्तापूर्ण पुनर्निर्माण इसे लगभग एक शताब्दी बाद रखता है — बुद्ध की " +
        "तिथियों पर विवाद के समानांतर, क्योंकि दोनों काल-गणनाएँ आंशिक रूप से एक ही महावंस-व्युत्पन्न " +
        "ढाँचे पर आधारित हैं।",
    },
    causes: [],
    effects: [],
    places: ["place-rajagriha", "place-vaishali"],
    sources: [
      { source: "singh-ancient-india", locator: "chapters on Jainism and Mahavira" },
      { source: "thapar-early-india", locator: "chapters on the sramana traditions" },
      { source: "bechert-dating-buddha", locator: "contributions on the chronology of the two teachers" },
    ],
    curriculum: [
      { level: "school", board: "CBSE", class: "12", subject: "history", chapterRef: "Kings, Farmers and Towns", verifiedAgainst: "NCERT Class XII History chapter titles", verifiedDate: "2026-11-11" },
      { level: "upsc", upscPaper: "gs1", concept: "Jainism; ancient Indian chronology" },
    ],
  },

  // ===========================================================================
  // MAGADHA DYNASTIES
  // ===========================================================================
  {
    id: "event-haryanka-magadha",
    eventType: "administrative",
    entities: ["cliopatria-magadha-haryanka-dynasty", "cliopatria-janapada-of-magadha"],
    importance: 3,
    title: { en: "Magadha under the Haryanka line", hi: "हर्यंक वंश के अधीन मगध" },
    date: "-0544~/-0412~",
    dateCertainty: "approximate",
    location: { placeId: "place-rajagriha", geometry: { type: "Point", coordinates: [85.418, 25.0268] }, precisionKm: 2, sources: [{ source: "reference-coordinates", locator: "Rajgir reference position" }] },
    summary: {
      en:
        "The dynasty under which Magadha became the dominant polity of the middle Ganga, beginning at " +
        "Rajagriha. Its regnal dates are reconstructed from Buddhist and Jain king-lists, which do not " +
        "agree with each other, so every year attached to this period is approximate by necessity. " +
        "Bimbisara's expansion towards Anga and his relationship with the Vajji confederacy are the " +
        "best-documented elements.",
      hi:
        "वह वंश जिसके अधीन मगध मध्य गंगा का प्रमुख राजनीतिक सत्ता बना, और जिसका आरंभ राजगृह से हुआ। " +
        "इसके शासन-काल की तिथियाँ बौद्ध एवं जैन राज-सूचियों से पुनर्निर्मित हैं, जो आपस में सहमत नहीं " +
        "हैं, अतः इस काल से जुड़ा प्रत्येक वर्ष अनिवार्यतः अनुमानित है।",
    },
    causes: [
      {
        claim: {
          en:
          "Rajagriha's position inside a defensible ring of hills, near iron-bearing upland terrain and " +
          "on the routes between the Ganga plain and the peninsular uplands, gave the early Magadhan " +
          "rulers a strategic base from which to expand." },
        claimStrength: "plausible-influence",
        sources: [
          { source: "thapar-early-india", locator: "chapters on the rise of Magadha" },
          { source: "singh-ancient-india", locator: "chapters on early states and Rajgir" },
        ],
        note: {
          en:
          "The terrain is observable and the fortification survives. That it explains Magadha's success " +
          "rather than merely accompanying it is an inference; other hill-ring sites did not become " +
          "imperial capitals." },
      },
    ],
    effects: [],
    places: ["place-rajagriha", "place-champa", "place-vaishali"],
    sources: [
      { source: "thapar-early-india", locator: "chapters on the rise of Magadha" },
      { source: "cliopatria-v0-2-1", locator: "entities 'Magadha — Haryanka Dynasty'; note the dataset's own from/to years differ from the dates here" },
    ],
    curriculum: [
      { level: "school", board: "CBSE", class: "12", subject: "history", chapterRef: "Kings, Farmers and Towns", verifiedAgainst: "NCERT Class XII History chapter titles", verifiedDate: "2026-11-11" },
      { level: "upsc", upscPaper: "gs1", concept: "Rise of Magadha; Mahajanapadas" },
    ],
  },
  {
    id: "event-capital-shift-pataliputra",
    eventType: "administrative",
    entities: ["cliopatria-magadha-haryanka-dynasty", "cliopatria-janapada-of-magadha"],
    importance: 4,
    title: { en: "Capital of Magadha shifts from Rajagriha to Pataliputra", hi: "मगध की राजधानी राजगृह से पाटलिपुत्र स्थानांतरित" },
    date: "-0492~/-0460~",
    dateCertainty: "approximate",
    location: { placeId: "place-pataliputra", geometry: { type: "Point", coordinates: [85.1376, 25.5941] }, precisionKm: 3, sources: [{ source: "reference-coordinates", locator: "Patna reference position" }] },
    summary: {
      en:
        "The move from a hill-ring fortress to an open city on a great river confluence. It is usually " +
        "placed in the reign of Udayin and is reported in Buddhist tradition. The change of site is a " +
        "change of strategy: defence by terrain gives way to control of movement. From Pataliputra, " +
        "Magadha sits on the Ganga itself, at the junction with the Son from the south and within " +
        "reach of the Gandak crossing to Vaishali and north Bihar.",
      hi:
        "पहाड़ी-वलय किले से एक महान नदी-संगम पर बसे खुले नगर की ओर यह स्थानांतरण। इसे सामान्यतः उदायिन " +
        "के शासनकाल में रखा जाता है और बौद्ध परंपरा में इसका उल्लेख है। स्थल का यह परिवर्तन रणनीति का " +
        "परिवर्तन है: भू-आकृति द्वारा रक्षा का स्थान आवागमन पर नियंत्रण लेता है।",
    },
    causes: [
      {
        claim: {
          en:
          "Pataliputra's position at the Ganga-Son confluence gave control of both east-west river " +
          "traffic and the southern route from the uplands, and the move was made for that reason." },
        claimStrength: "plausible-influence",
        sources: [
          { source: "thapar-early-india", locator: "chapters on the shift of the Magadhan capital" },
          { source: "megasthenes-indika", locator: "fragments on the city's position at the confluence" },
        ],
        note: {
          en:
          "The strategic value of the site is demonstrable from the physical geography, and Megasthenes " +
          "records the confluence. But no source states the motive for the move; the causal link is a " +
          "reasonable modern reading, not a documented decision." },
      },
    ],
    effects: [],
    significance: {
      en:
        "One of the clearest where-explains-when links in the pilot, and the one to show first: the " +
        "river junction is visible on the map, and the capital that moved to it stayed a capital for " +
        "nearly a thousand years.",
      hi:
        "पायलट के सबसे स्पष्ट 'कहाँ' से 'कब' समझाने वाले संबंधों में से एक, और सबसे पहले दिखाने योग्य।",
    },
    places: ["place-pataliputra", "place-rajagriha", "place-son-river", "place-ganga-river"],
    sources: [
      { source: "thapar-early-india", locator: "chapters on the rise of Magadha" },
      { source: "singh-ancient-india", locator: "chapters on early historic cities" },
      { source: "natural-earth", locator: "ne_10m_rivers_lake_centerlines — Ganga and Son confluence geometry" },
    ],
    curriculum: [
      { level: "school", board: "CBSE", class: "12", subject: "history", chapterRef: "Kings, Farmers and Towns", verifiedAgainst: "NCERT Class XII History chapter titles", verifiedDate: "2026-11-11" },
      { level: "school", board: "CBSE", class: "8", subject: "history", concept: "Ancient capitals and rivers", verifiedAgainst: "NCERT Class VIII Our Pasts III", verifiedDate: "2026-11-11" },
      { level: "upsc", upscPaper: "gs1", concept: "Rise of Magadha; historical urbanisation" },
    ],
  },
  {
    id: "event-magadha-vajji-conflict",
    eventType: "battle",
    entities: ["cliopatria-janapada-of-vajji", "cliopatria-magadha-haryanka-dynasty", "cliopatria-magadha-shaishunaga-dynasty"],
    importance: 3,
    title: { en: "Magadhan campaigns against the Vajji confederacy", hi: "वज्जि संघ के विरुद्ध मगध के अभियान" },
    date: "-0489~/-0360~",
    dateCertainty: "uncertain",
    location: { placeId: "place-vaishali", geometry: { type: "Point", coordinates: [85.1326, 25.9878] }, precisionKm: 5, sources: [{ source: "reference-coordinates", locator: "Vaishali reference position" }] },
    summary: {
      en:
        "The struggle between the Magadhan monarchy and the Vajji oligarchic confederacy, reported in " +
        "Buddhist and Jain sources and ending with Magadha's absorption of Vaishali. The date range is " +
        "deliberately wide and marked uncertain: the sources describe the conflict but do not date it, " +
        "and its outcome is inferred from the later position of Magadha rather than from a record of a " +
        "decisive event.",
      hi:
        "मगध के राजतंत्र एवं वज्जि अल्पतंत्रीय संघ के बीच संघर्ष, जिसका उल्लेख बौद्ध एवं जैन स्रोतों में " +
        "मिलता है और जो वैशाली के मगध में विलय पर समाप्त हुआ। तिथि-परिसर जानबूझकर विस्तृत एवं अनिश्चित " +
        "रखा गया है: स्रोत संघर्ष का वर्णन करते हैं पर उसकी तिथि नहीं देते।",
    },
    causes: [
      {
        claim: {
          en:
          "Two incompatible forms of political organisation — a centralising monarchy and a " +
          "deliberative clan confederacy — occupying adjacent territory on the same river system were " +
          "bound to come into conflict." },
        claimStrength: "contested",
        sources: [{ source: "thapar-early-india", locator: "chapters on gana-sanghas and Magadha" }],
        note: {
          en:
          "Graded contested on purpose. This is a retrospective narrative of inevitability imposed on " +
          "an event whose actual course is not documented; the sources report conflict, not structural " +
          "necessity." },
      },
    ],
    effects: [],
    places: ["place-vaishali", "place-pataliputra", "place-gandak-river"],
    sources: [
      { source: "thapar-early-india", locator: "chapters on gana-sanghas and the Vajji confederacy" },
      { source: "singh-ancient-india", locator: "chapters on early states and republican polities" },
    ],
    curriculum: [
      { level: "school", board: "CBSE", class: "12", subject: "history", chapterRef: "Kings, Farmers and Towns", verifiedAgainst: "NCERT Class XII History chapter titles", verifiedDate: "2026-11-11" },
      { level: "upsc", upscPaper: "gs1", concept: "Mahajanapadas; early republican traditions" },
    ],
  },
  {
    id: "event-nanda-dynasty",
    eventType: "administrative",
    entities: ["cliopatria-nanda-empire"],
    importance: 3,
    title: { en: "Nanda rule over Magadha", hi: "मगध पर नंद शासन" },
    date: "-0344~/-0321~",
    dateCertainty: "approximate",
    location: { placeId: "place-pataliputra", geometry: { type: "Point", coordinates: [85.1376, 25.5941] }, precisionKm: 3, sources: [{ source: "reference-coordinates", locator: "Patna reference position" }] },
    summary: {
      en:
        "The dynasty that extended Magadhan power well beyond the middle Ganga and is reported to have " +
        "maintained a very large army — the report of which is said to have influenced Alexander's " +
        "troops' refusal to march further east after the Hydaspes. Regnal dates are reconstructed and " +
        "disputed; the range shown is the commonly cited one.",
      hi:
        "वह वंश जिसने मगध की शक्ति को मध्य गंगा से बहुत आगे विस्तारित किया और जिसकी बहुत बड़ी सेना " +
        "रखने की सूचना मिलती है — जिसका प्रभाव हाइडास्पेस के बाद अलेक्ज़ेंडर के सैनिकों द्वारा पूर्व की " +
        "ओर आगे बढ़ने से इनकार पर बताया जाता है। शासन-तिथियाँ पुनर्निर्मित एवं विवादित हैं।",
    },
    causes: [],
    effects: [],
    places: ["place-pataliputra", "place-ganga-river"],
    sources: [
      { source: "thapar-early-india", locator: "chapters on the Nandas and the transition to the Mauryas" },
      { source: "singh-ancient-india", locator: "chapters on the Nandas" },
      { source: "cliopatria-v0-2-1", locator: "entity 'Nanda Empire' — the dataset's own year sampling for this polity" },
    ],
    curriculum: [
      { level: "school", board: "CBSE", class: "12", subject: "history", chapterRef: "Kings, Farmers and Towns", verifiedAgainst: "NCERT Class XII History chapter titles", verifiedDate: "2026-11-11" },
      { level: "upsc", upscPaper: "gs1", concept: "Nanda and Mauryan periods" },
    ],
  },
  {
    id: "event-alexander-hydaspes",
    eventType: "battle",
    entities: [],
    importance: 2,
    title: { en: "Battle of the Hydaspes; Alexander's army turns back", hi: "हाइडास्पेस का युद्ध; अलेक्ज़ेंडर की सेना लौटती है" },
    date: "-0325",
    dateCertainty: "exact",
    location: { geometry: { type: "Point", coordinates: [72.9, 32.9] }, precisionKm: 40, sources: [{ source: "reference-coordinates", locator: "Jhelum river reach near the traditional battle site", note: "OUTSIDE the corridor bbox — the corridor covers 76.5-91.5E. Shown for context only." }] },
    summary: {
      en:
        "Alexander defeats Porus on the Jhelum and his army then refuses to march east towards the " +
        "Ganga. The date is one of the few absolutely secure ones available for this period, fixed by " +
        "Greek and Babylonian sources. Its relevance to the corridor is entirely negative and " +
        "therefore important: Alexander does not reach the Ganga valley, and the polity that meets " +
        "whatever pressure his withdrawal leaves behind is the nascent Mauryan state.",
      hi:
        "अलेक्ज़ेंडर झेलम पर पोरस को पराजित करता है और तत्पश्चात उसकी सेना गंगा की ओर पूर्व में बढ़ने से " +
        "इनकार कर देती है। यह तिथि इस काल हेतु उपलब्ध कुछ निरपेक्ष रूप से निश्चित तिथियों में से एक है। " +
        "इस क्षेत्र से इसकी प्रासंगिकता पूर्णतः नकारात्मक है और इसलिए महत्वपूर्ण है: अलेक्ज़ेंडर गंगा घाटी तक " +
        "नहीं पहुँचता।",
    },
    causes: [],
    effects: [],
    significance: {
      en:
        "A useful check on the common framing of 326 BCE as a threshold of Indian history. It is a " +
        "threshold for the north-west, and barely registers in the middle Ganga valley.",
      hi:
        "३२६ ईसा पूर्व को भारतीय इतिहास की सीमा-रेखा के रूप में प्रचलित कथन पर एक उपयोगी जाँच। यह " +
        "उत्तर-पश्चिम हेतु सीमा-रेखा है, मध्य गंगा घाटी में इसका प्रभाव नगण्य है।",
    },
    places: ["place-taxila"],
    sources: [
      { source: "thapar-early-india", locator: "chapters on Alexander's incursion and its aftermath" },
      { source: "singh-ancient-india", locator: "chapters on the north-west in the fourth century BCE" },
    ],
    curriculum: [
      { level: "school", board: "CBSE", class: "12", subject: "history", chapterRef: "Kings, Farmers and Towns", verifiedAgainst: "NCERT Class XII History chapter titles", verifiedDate: "2026-11-11" },
      { level: "upsc", upscPaper: "gs1", concept: "Greek sources for ancient Indian history" },
    ],
  },
  {
    id: "event-mauryan-foundation",
    eventType: "foundation",
    entities: ["cliopatria-nanda-empire", "cliopatria-maurya-empire"],
    importance: 5,
    title: { en: "Foundation of Mauryan rule at Pataliputra", hi: "पाटलिपुत्र में मौर्य शासन की स्थापना" },
    date: "-0321~/-0320~",
    dateCertainty: "approximate",
    location: { placeId: "place-pataliputra", geometry: { type: "Point", coordinates: [85.1376, 25.5941] }, precisionKm: 3, sources: [{ source: "reference-coordinates", locator: "Patna reference position" }] },
    summary: {
      en:
        "Chandragupta overthrows the Nandas and establishes the Mauryan state, with Pataliputra as its " +
        "capital. 322 and 321 BCE are both cited; the two-year span is shown rather than a false " +
        "precision. The event is the hinge of the corridor: within a few decades the state controlling " +
        "the Ganga-Son confluence controls most of the subcontinent.",
      hi:
        "चंद्रगुप्त नंदों को परास्त कर मौर्य राज्य की स्थापना करता है, जिसकी राजधानी पाटलिपुत्र होती है। " +
        "३२२ एवं ३२१ ईसा पूर्व दोनों उद्धृत किए जाते हैं; झूठी सटीकता के बजाय दो-वर्षीय परिसर दिखाया गया " +
        "है। यह घटना इस क्षेत्र का कब्जा है।",
    },
    causes: [],
    effects: [],
    places: ["place-pataliputra", "place-taxila", "place-rajagriha"],
    sources: [
      { source: "thapar-early-india", locator: "chapters on the foundation of the Mauryan state" },
      { source: "singh-ancient-india", locator: "chapters on the Mauryas" },
      { source: "megasthenes-indika", locator: "fragments on the Mauryan court at Pataliputra" },
      { source: "artha-shastra", locator: "adhikarana on administration, roads and settlements", note: "Layered composition; describes an ideal administration rather than a dated Mauryan one." },
      { source: "cliopatria-v0-2-1", locator: "entity 'Maurya Empire' — the dataset samples this polity from astronomical year -318, i.e. 319 BCE" },
    ],
    curriculum: [
      { level: "school", board: "CBSE", class: "6", subject: "social-science", concept: "The Mauryan Empire", verifiedAgainst: "NCERT Class VI Our Pasts I", verifiedDate: "2026-11-11" },
      { level: "school", board: "CBSE", class: "12", subject: "history", chapterRef: "Kings, Farmers and Towns", verifiedAgainst: "NCERT Class XII History chapter titles", verifiedDate: "2026-11-11" },
      { level: "upsc", upscPaper: "gs1", concept: "Mauryan Empire: rise and administration" },
      { level: "upsc", upscPaper: "history-optional", concept: "Sources for Mauryan history; Chandragupta" },
    ],
  },
  {
    id: "event-seleukid-treaty",
    eventType: "treaty",
    entities: ["cliopatria-maurya-empire"],
    importance: 3,
    title: { en: "Treaty between Chandragupta and Seleukos Nikator", hi: "चंद्रगुप्त एवं सेल्यूकस निकेटर के बीच संधि" },
    date: "-0304~/-0302~",
    dateCertainty: "approximate",
    location: { placeId: "place-taxila", geometry: { type: "Point", coordinates: [72.84, 33.74] }, precisionKm: 5, sources: [{ source: "reference-coordinates", locator: "Taxila reference position", note: "At the western edge of the corridor bbox." }] },
    summary: {
      en:
        "The settlement of the conflict between the Mauryan and Seleukid states, usually placed around " +
        "303 BCE. Greek sources report that the territories of Arachosia, Gedrosia, Paropamisadai and " +
        "part of the Hindu Kush passed to Chandragupta, that a marriage alliance was made, and that " +
        "Seleukos sent Megasthenes as ambassador. This is the event that brings the corridor's most " +
        "important foreign primary source into existence.",
      hi:
        "मौर्य एवं सेल्यूकिद राज्यों के बीच संघर्ष का निपटारा, जिसे सामान्यतः लगभग ३०३ ईसा पूर्व रखा जाता " +
        "है। ग्रीक स्रोत बताते हैं कि अराकोसिया, गेड्रोसिया, पारोपामिसदाई एवं हिंदुकुश का कुछ भाग " +
        "चंद्रगुप्त को प्राप्त हुआ, एक वैवाहिक मित्रता हुई, और सेल्यूकस ने मेगस्थनीज़ को राजदूत भेजा।",
    },
    causes: [],
    effects: [],
    significance: {
      en:
        "Two consequences matter here: the Mauryan frontier moves to the Hindu Kush, and the Greek " +
        "account of Pataliputra exists at all. The second is why we can quote Megasthenes about the " +
        "city's size and its confluence.",
      hi:
        "यहाँ दो परिणाम महत्वपूर्ण हैं: मौर्य सीमा हिंदुकुश तक पहुँचती है, और पाटलिपुत्र का ग्रीक विवरण " +
        "अस्तित्व में आता है।",
    },
    places: ["place-taxila", "place-pataliputra"],
    sources: [
      { source: "megasthenes-indika", locator: "the embassy that produced the Indika" },
      { source: "thapar-early-india", locator: "chapters on Mauryan external relations" },
      { source: "singh-ancient-india", locator: "chapters on the Mauryas and the Seleukids" },
    ],
    curriculum: [
      { level: "school", board: "CBSE", class: "12", subject: "history", chapterRef: "Kings, Farmers and Towns", verifiedAgainst: "NCERT Class XII History chapter titles", verifiedDate: "2026-11-11" },
      { level: "upsc", upscPaper: "gs1", concept: "Foreign accounts as sources for ancient India" },
    ],
  },
  {
    id: "event-ashoka-accession",
    eventType: "accession",
    entities: ["cliopatria-maurya-empire"],
    importance: 4,
    title: { en: "Ashoka's consecration as Mauryan emperor", hi: "अशोक का मौर्य सम्राट के रूप में राज्याभिषेक" },
    date: "-0268~/-0267~",
    dateCertainty: "approximate",
    location: { placeId: "place-pataliputra", geometry: { type: "Point", coordinates: [85.1376, 25.5941] }, precisionKm: 3, sources: [{ source: "reference-coordinates", locator: "Patna reference position" }] },
    summary: {
      en:
        "Commonly given as c. 268 BCE, with some reconstructions placing it in 269 or 265. The date " +
        "matters beyond itself because it is the anchor from which several other chronologies — " +
        "including the Buddha's — are counted backwards, which is why moving it moves everything.",
      hi:
        "इसे सामान्यतः लगभग २६८ ईसा पूर्व दिया जाता है, और कुछ पुनर्निर्माण इसे २६९ या २६५ में रखते " +
        "हैं। यह तिथि स्वयं से आगे महत्वपूर्ण है क्योंकि कई अन्य काल-गणनाएँ — बुद्ध की सहित — इसी से " +
        "पीछे की ओर गिनी जाती हैं।",
    },
    causes: [],
    effects: [],
    places: ["place-pataliputra", "place-kalsi", "place-dhauli"],
    sources: [
      { source: "ashokan-rock-edict-xiii", locator: "the edicts themselves date by regnal year from the consecration" },
      { source: "thapar-early-india", locator: "chapters on Ashoka" },
      { source: "bechert-dating-buddha", locator: "contributions on the Ashokan synchronism" },
    ],
    curriculum: [
      { level: "school", board: "CBSE", class: "6", subject: "social-science", concept: "Ashoka and the Mauryan Empire", verifiedAgainst: "NCERT Class VI Our Pasts I", verifiedDate: "2026-11-11" },
      { level: "school", board: "CBSE", class: "12", subject: "history", chapterRef: "Kings, Farmers and Towns", verifiedAgainst: "NCERT Class XII History chapter titles", verifiedDate: "2026-11-11" },
      { level: "upsc", upscPaper: "gs1", concept: "Ashoka; Mauryan administration" },
    ],
  },

  // ===========================================================================
  // THE PIVOT — Kalinga
  // ===========================================================================
  {
    id: "event-kalinga-war",
    eventType: "battle",
    entities: ["cliopatria-maurya-empire", "cliopatria-kalinga"],
    importance: 5,
    title: { en: "Ashoka's conquest of Kalinga", hi: "अशोक द्वारा कलिंग विजय" },
    date: "-0261~/-0260~",
    dateCertainty: "approximate",
    location: {
      placeId: "place-dhauli",
      geometry: { type: "Point", coordinates: [85.8, 20.3] },
      precisionKm: 40,
      sources: [
        { source: "ashokan-rock-edict-xiii", locator: "the edict names Kalinga but not a battlefield" },
        { source: "reference-coordinates", locator: "the Daya valley near Dhauli, the conventional location" },
      ],
    },
    summary: {
      en:
        "The Mauryan conquest of Kalinga, dated to roughly Ashoka's eighth regnal year — c. 261 BCE, " +
        "with 260 also cited. Its importance is that it is documented by the conqueror himself. Rock " +
        "Edict XIII states that a hundred and fifty thousand people were deported, a hundred thousand " +
        "were killed, and many times that number perished; that the king felt remorse; and that he " +
        "thereafter pursued conquest by righteousness. The edict was engraved at Shahbazgarhi and " +
        "Mansehra in the north-west, at Kalsi, Girnar, and — in modified form — at Dhauli and Jaugada " +
        "in Kalinga itself. Those figures are an official statement by the party responsible, recorded " +
        "for its own purposes; they are the best evidence available and they are not a neutral census. " +
        "Both things are true and the platform says both.",
      hi:
        "कलिंग की मौर्य विजय, जिसे लगभग अशोक के अष्टम राज्य-वर्ष में रखा जाता है — लगभग २६१ ईसा पूर्व, " +
        "और २६० भी उद्धृत किया जाता है। इसका महत्व यह है कि इसका प्रमाण स्वयं विजेता द्वारा सुरक्षित है। " +
        "शिलालेख XIII कहता है कि एक लाख पचास हज़ार लोगों को निर्वासित किया गया, एक लाख मारे गए, और उससे " +
        "कई गुना अधिक नष्ट हुए; कि राजा को पश्चाताप हुआ; और कि तत्पश्चात उसने धर्म-विजय का मार्ग अपनाया। " +
        "ये आँकड़े उत्तरदायी पक्ष का अपने ही प्रयोजन हेतु किया गया आधिकारिक कथन हैं।",
    },
    causes: [
      {
        claim: {
          en:
          "Kalinga controlled the coastal route and the river mouths between the Ganga delta and the " +
          "peninsular south, so it was a strategic obstacle to Mauryan communication down the eastern " +
          "coast and to the trade running through it." },
        claimStrength: "plausible-influence",
        sources: [
          { source: "thapar-early-india", locator: "chapters on Mauryan expansion and Kalinga" },
          { source: "singh-ancient-india", locator: "chapters on the Mauryas" },
        ],
        note: {
          en:
          "The physical geography is evident on the map — Kalinga sits between the delta and the " +
          "peninsula, on the coast, with river access inland. No source states that this was Ashoka's " +
          "reason." },
      },
      {
        claim: {
          en:
          "Kalinga was the last significant independent territory within reach of the Mauryan core, and " +
          "its conquest completed the empire." },
        claimStrength: "correlation-only",
        sources: [{ source: "thapar-early-india", locator: "chapters on the extent of Mauryan power" }],
        note: {
          en:
          "True as a description of the resulting map, but it does not establish motive, and the " +
          "empire's southern limit is not clearly defined in the sources." },
      },
    ],
    effects: [],
    significance: {
      en:
        "This is the pilot's reference event, chosen because it has all four dimensions in unusually " +
        "clear form. WHERE: Kalinga, on the coast between the delta and the peninsula. WHEN: one " +
        "datable year in a reign that is itself approximately dated. WHAT: an empire, a conquest, and " +
        "a stated change of policy. WHY/EVIDENCE: a first-person primary inscription, with the " +
        "interpretive problem attached to it in the open. It is also the event that justifies the " +
        "corridor's southern boundary — the whole Mauryan narrative turns on it.",
      hi:
        "यह पायलट की संदर्भ घटना है, क्योंकि इसमें चारों विमाएँ असामान्य रूप से स्पष्ट हैं। कहाँ: कलिंग। " +
        "कब: एक तिथि-निर्धारणीय वर्ष। क्या: एक साम्राज्य, एक विजय, और नीति में परिवर्तन का कथन। " +
        "क्यों/प्रमाण: एक प्रथम-पुरुष प्राथमिक अभिलेख, जिसकी व्याख्या-समस्या खुले में संलग्न है।",
    },
    places: ["place-dhauli", "place-jaugada", "place-kalsi", "place-pataliputra"],
    sources: [
      { source: "ashokan-rock-edict-xiii", locator: "Rock Edict XIII; the separate Kalinga edicts at Dhauli and Jaugada" },
      { source: "thapar-early-india", locator: "chapters on Ashoka's dhamma and the Kalinga war" },
      { source: "singh-ancient-india", locator: "chapters on the Mauryas and Ashoka" },
      { source: "ncert-tih-1", locator: "'Kings, Farmers and Towns'" },
      { source: "cliopatria-v0-2-1", locator: "entity 'Kalinga' — the dataset's own territorial sampling for the region" },
    ],
    curriculum: [
      { level: "school", board: "CBSE", class: "6", subject: "social-science", concept: "Ashoka's change after Kalinga", verifiedAgainst: "NCERT Class VI Our Pasts I", verifiedDate: "2026-11-11" },
      { level: "school", board: "CBSE", class: "8", subject: "history", concept: "The Mauryan Empire and its inscriptions", verifiedAgainst: "NCERT Class VIII Our Pasts III", verifiedDate: "2026-11-11" },
      { level: "school", board: "CBSE", class: "12", subject: "history", chapterRef: "Kings, Farmers and Towns", verifiedAgainst: "NCERT Class XII History chapter titles", verifiedDate: "2026-11-11" },
      { level: "upsc", upscPaper: "gs1", concept: "Ashoka's dhamma; the Kalinga war and its significance" },
      { level: "upsc", upscPaper: "history-optional", concept: "Ashokan edicts as historical sources; Kalinga" },
    ],
  },
  {
    id: "event-kharavela-kalinga",
    eventType: "political-change",
    entities: ["cliopatria-kalinga"],
    importance: 2,
    title: { en: "Kharavela of Kalinga", hi: "कलिंग के खारवेळ" },
    date: "-0199~/-0100~",
    dateCertainty: "uncertain",
    location: { placeId: "place-dhauli", geometry: { type: "Point", coordinates: [85.85, 20.27] }, precisionKm: 5, sources: [{ source: "reference-coordinates", locator: "Udayagiri-Khandagiri, near Bhubaneswar" }] },
    summary: {
      en:
        "A ruler of Kalinga known from the Hathigumpha inscription, who is described as having " +
        "campaigns far beyond the region including against Magadha. His date is genuinely unresolved: " +
        "proposals range across more than a century, from the second century BCE to the first century " +
        "CE, depending on palaeography, on the identity of the kings named in the inscription, and on " +
        "which reading of a damaged line is accepted.",
      hi:
        "हाथीगुम्फा अभिलेख से ज्ञात कलिंग का एक शासक, जिसे इस क्षेत्र से बहुत दूर तक — मगध के विरुद्ध भी — " +
        "अभियान करने वाला बताया गया है। इसकी तिथि वास्तव में अनिर्णीत है: प्रस्ताव एक शताब्दी से अधिक " +
        "में फैले हैं, द्वितीय शताब्दी ईसा पूर्व से प्रथम शताब्दी ईसवी तक।",
    },
    causes: [],
    effects: [],
    significance: {
      en:
        "Included to show that the corridor's south-east is not merely the object of other powers' " +
        "campaigns. Kalinga recovers and projects power after the Mauryas — which is why the corridor " +
        "was extended south to include it.",
      hi:
        "यह दिखाने हेतु शामिल कि इस क्षेत्र का दक्षिण-पूर्व केवल अन्य शक्तियों के अभियानों का लक्ष्य नहीं " +
        "है। मौर्यों के बाद कलिंग पुनः उभरता है और शक्ति का प्रक्षेपण करता है।",
    },
    places: ["place-dhauli", "place-jaugada"],
    sources: [
      { source: "thapar-early-india", locator: "chapters on post-Mauryan regional states and Kharavela" },
      { source: "singh-ancient-india", locator: "chapters on the Hathigumpha inscription" },
    ],
    curriculum: [{ level: "upsc", upscPaper: "history-optional", concept: "Post-Mauryan regional states; Kharavela" }],
  },
  {
    id: "event-shunga-succession",
    eventType: "political-change",
    entities: ["cliopatria-maurya-empire", "cliopatria-shunga-empire"],
    importance: 3,
    title: { en: "Pushyamitra Shunga supplants the Mauryas", hi: "पुष्यमित्र शुंग मौर्यों का स्थान लेता है" },
    date: "-0184",
    dateCertainty: "approximate",
    location: { placeId: "place-pataliputra", geometry: { type: "Point", coordinates: [85.1376, 25.5941] }, precisionKm: 3, sources: [{ source: "reference-coordinates", locator: "Patna reference position" }] },
    summary: {
      en:
        "The end of Mauryan rule and the beginning of the Shunga dynasty, conventionally placed around " +
        "185 BCE. The Mauryan state that had controlled the whole corridor contracts to its eastern " +
        "core. The date is conventional rather than documented.",
      hi:
        "मौर्य शासन का अंत एवं शुंग वंश का आरंभ, जिसे परंपरागत रूप से लगभग १८५ ईसा पूर्व रखा जाता है। " +
        "तिथि प्रलेखित नहीं बल्कि परंपरागत है।",
    },
    causes: [],
    effects: [],
    places: ["place-pataliputra"],
    sources: [
      { source: "thapar-early-india", locator: "chapters on the end of the Mauryas and the Shungas" },
      { source: "cliopatria-v0-2-1", locator: "entities 'Maurya Empire' and 'Shunga Empire' — the dataset's boundary between the two" },
    ],
    curriculum: [
      { level: "school", board: "CBSE", class: "12", subject: "history", chapterRef: "Kings, Farmers and Towns", verifiedAgainst: "NCERT Class XII History chapter titles", verifiedDate: "2026-11-11" },
      { level: "upsc", upscPaper: "gs1", concept: "Post-Mauryan period" },
    ],
  },

  // ===========================================================================
  // KUSHANS AND GUPTAS
  // ===========================================================================
  {
    id: "event-gupta-foundation",
    eventType: "foundation",
    entities: ["cliopatria-gupta-empire"],
    importance: 4,
    title: { en: "Foundation of the Gupta state", hi: "गुप्त राज्य की स्थापना" },
    date: "0319~/0320",
    dateCertainty: "approximate",
    location: { placeId: "place-pataliputra", geometry: { type: "Point", coordinates: [85.1376, 25.5941] }, precisionKm: 30, sources: [{ source: "reference-coordinates", locator: "the Ganga basin generally — the exact seat of the earliest Guptas is not established" }] },
    summary: {
      en:
        "The Gupta era, beginning around 319-320 CE, is one of the few securely anchored points in " +
        "early Indian chronology, and other dates are counted from it. What is NOT secure is the " +
        "location of the dynasty's earliest power base: Pataliputra is conventionally named, but the " +
        "evidence for where Chandragupta I actually ruled from is thin, and Prayaga is a serious " +
        "alternative given where his son's inscription stands. The precision radius here reflects that.",
      hi:
        "लगभग ३१९–३२० ईसवी से आरंभ होने वाला गुप्त संवत् प्रारंभिक भारतीय काल-गणना के कुछ सुरक्षित रूप " +
        "से आधारित बिंदुओं में से एक है। जो सुरक्षित नहीं है वह वंश के प्रारंभिक शक्ति-आधार का स्थान है: " +
        "पाटलिपुत्र को परंपरागत रूप से नामित किया जाता है, परंतु चंद्रगुप्त प्रथम ने वास्तव में कहाँ से " +
        "शासन किया इसके प्रमाण क्षीण हैं, और प्रयाग एक गंभीर विकल्प है।",
    },
    causes: [],
    effects: [],
    places: ["place-pataliputra", "place-prayagraj"],
    sources: [
      { source: "thapar-early-india", locator: "chapters on the rise of the Guptas" },
      { source: "singh-ancient-india", locator: "chapters on the Guptas" },
      { source: "cliopatria-v0-2-1", locator: "entity 'Gupta Empire' — sampled by the dataset across 19 rows, its earliest in-corridor" },
    ],
    curriculum: [
      { level: "school", board: "CBSE", class: "6", subject: "social-science", concept: "The Gupta period", verifiedAgainst: "NCERT Class VI Our Pasts I", verifiedDate: "2026-11-11" },
      { level: "school", board: "CBSE", class: "12", subject: "history", chapterRef: "Kings, Farmers and Towns", verifiedAgainst: "NCERT Class XII History chapter titles", verifiedDate: "2026-11-11" },
      { level: "upsc", upscPaper: "gs1", concept: "Gupta period; the 'Golden Age' question" },
      { level: "upsc", upscPaper: "history-optional", concept: "Origins and power base of the Guptas" },
    ],
  },
  {
    id: "event-samudragupta-campaigns",
    eventType: "battle",
    entities: ["cliopatria-gupta-empire"],
    importance: 4,
    title: { en: "Samudragupta's campaigns across the corridor", hi: "समुद्रगुप्त के अभियान — पूरे क्षेत्र में" },
    date: "0335~/0380",
    dateCertainty: "approximate",
    location: { placeId: "place-prayagraj", geometry: { type: "Point", coordinates: [81.8463, 25.4358] }, precisionKm: 300, sources: [{ source: "prayaga-prashasti", locator: "the inscription lists the campaigns but gives no single location" }] },
    summary: {
      en:
        "Recorded in Harishena's panegyric on the Allahabad pillar: nine rulers of Aryavarta " +
        "'uprooted', twelve rulers of Dakshinapatha submitted and then reinstated, frontier kingdoms " +
        "and tribal republics offering tribute and obeisance, and distant kings including a ruler of " +
        "Sri Lanka seeking favour. Read across the corridor, the list is a political map: the Ganga " +
        "heartland is annexed, the peninsular and coastal regions are made subordinate, and the " +
        "Himalayan margin is treated as a frontier. It is a praise-poem, so the verbs describe the " +
        "inscription's claims, not verified administration.",
      hi:
        "इलाहाबाद स्तंभ पर हरिसेण की प्रशस्ति में अंकित: आर्यावर्त के नौ शासक 'उन्मूलित', दक्षिणापथ के " +
        "बारह शासक समर्पण के बाद पुनर्स्थापित, सीमांत राज्यों एवं जनजातीय गणराज्यों द्वारा कर एवं " +
        "वंदना, तथा श्रीलंका के शासक सहित दूरस्थ राजाओं द्वारा अनुग्रह-प्रार्थना। पूरे क्षेत्र में पढ़ा जाए " +
        "तो यह सूची एक राजनीतिक मानचित्र है।",
    },
    causes: [],
    effects: [],
    significance: {
      en:
        "The best available example in the corridor of source TYPE changing what a claim means. The " +
        "same inscription can be read as a record of administration or as a record of a court's " +
        "self-presentation, and the difference is not a matter of opinion — it is a matter of what a " +
        "panegyric is for.",
      hi:
        "इस क्षेत्र में स्रोत-प्रकार का अर्थ बदलने का सबसे अच्छा उपलब्ध उदाहरण। वही अभिलेख प्रशासन के " +
        "अभिलेख के रूप में या दरबार के आत्म-प्रस्तुतिकरण के अभिलेख के रूप में पढ़ा जा सकता है।",
    },
    places: ["place-prayagraj", "place-pataliputra", "place-varanasi", "place-kannauj"],
    sources: [
      { source: "prayaga-prashasti", locator: "Harishena's composition on the Allahabad pillar" },
      { source: "thapar-early-india", locator: "chapters on Samudragupta" },
      { source: "singh-ancient-india", locator: "chapters on the Guptas" },
      { source: "cliopatria-v0-2-1", locator: "entity 'Gupta Empire' — the dataset's area growth across these rows" },
    ],
    curriculum: [
      { level: "school", board: "CBSE", class: "6", subject: "social-science", concept: "The Gupta period", verifiedAgainst: "NCERT Class VI Our Pasts I", verifiedDate: "2026-11-11" },
      { level: "school", board: "CBSE", class: "12", subject: "history", chapterRef: "Kings, Farmers and Towns", verifiedAgainst: "NCERT Class XII History chapter titles", verifiedDate: "2026-11-11" },
      { level: "upsc", upscPaper: "gs1", concept: "Gupta Empire; inscriptional evidence" },
      { level: "upsc", upscPaper: "history-optional", concept: "Prayaga Prashasti as a historical source" },
    ],
  },
  {
    id: "event-faxian-visit",
    eventType: "cultural",
    entities: ["cliopatria-gupta-empire"],
    importance: 3,
    title: { en: "Faxian's pilgrimage through the Ganga lands", hi: "फाह्यान की गंगा-भूमि यात्रा" },
    date: "0399/0414",
    dateCertainty: "exact",
    location: { placeId: "place-pataliputra", geometry: { type: "Point", coordinates: [85.1376, 25.5941] }, precisionKm: 100, sources: [{ source: "faxian-record", locator: "the itinerary in the record itself" }] },
    summary: {
      en:
        "The Chinese pilgrim Faxian travels in India roughly 399-414 CE and describes Pataliputra, " +
        "Vaishali, Kashi, Tamralipta and the Buddhist establishments of the middle Ganga. His account " +
        "of Pataliputra is the crucial detail: Ashoka's stone palace and the Mauryan works are " +
        "admired, but the city itself is in part deserted. Roughly four centuries after Ashoka, the " +
        "old capital is already fading.",
      hi:
        "चीनी यात्री फाह्यान लगभग ३९९–४१४ ईसवी में भारत की यात्रा करता है और पाटलिपुत्र, वैशाली, काशी, " +
        "ताम्रलिप्ति एवं मध्य गंगा के बौद्ध प्रतिष्ठानों का वर्णन करता है। पाटलिपुत्र का उसका विवरण " +
        "निर्णायक विवरण है: अशोक का पाषाण प्रासाद सराहा गया है, परंतु नगर स्वयं आंशिक रूप से वीरान है।",
    },
    causes: [],
    effects: [],
    places: ["place-pataliputra", "place-varanasi", "place-vaishali", "place-tamralipta", "place-nalanda"],
    sources: [
      { source: "faxian-record", locator: "the itinerary and the account of Pataliputra" },
      { source: "ncert-tih-2", locator: "'Through the Eyes of Travellers'" },
    ],
    curriculum: [
      { level: "school", board: "CBSE", class: "12", subject: "history", chapterRef: "Through the Eyes of Travellers", verifiedAgainst: "NCERT Class XII History chapter titles", verifiedDate: "2026-11-11" },
      { level: "upsc", upscPaper: "gs1", concept: "Foreign travellers' accounts as sources" },
      { level: "upsc", upscPaper: "history-optional", concept: "Chinese pilgrims: Faxian, Xuanzang, I-tsing" },
    ],
  },
  {
    id: "event-huna-incursions",
    eventType: "political-change",
    entities: ["cliopatria-gupta-empire"],
    importance: 2,
    title: { en: "Huna incursions into the Ganga valley", hi: "गंगा घाटी में हूण आक्रमण" },
    date: "0455~/0530",
    dateCertainty: "approximate",
    location: { placeId: "place-kannauj", geometry: { type: "Point", coordinates: [82.0, 26.5] }, precisionKm: 250, sources: [{ source: "thapar-early-india", locator: "chapters on the Hunas and the decline of the Guptas" }] },
    summary: {
      en:
        "Repeated incursions from the north-west through the middle of the fifth century and after, " +
        "which the later Guptas resisted with mixed success. Their effect on the corridor is the " +
        "erosion of Gupta control over the upper and middle Ganga, and the increasing weight of " +
        "regional powers. The precise extent and dating of each incursion are not established.",
      hi:
        "पाँचवीं शताब्दी के मध्य एवं तत्पश्चात उत्तर-पश्चिम से बार-बार आक्रमण, जिनका प्रतिरोध परवर्ती " +
        "गुप्तों ने मिश्रित सफलता के साथ किया। इस क्षेत्र पर इनका प्रभाव ऊपरी एवं मध्य गंगा पर गुप्त " +
        "नियंत्रण का क्षरण एवं क्षेत्रीय शक्तियों का बढ़ता भार है।",
    },
    causes: [
      {
        claim: {
          en:
          "The cost of defending the north-western frontier against the Hunas drained the Gupta state's " +
          "resources and weakened its hold on the Ganga heartland." },
        claimStrength: "plausible-influence",
        sources: [{ source: "thapar-early-india", locator: "chapters on the decline of the Guptas" }],
        note: {
          en:
          "Correlated in time and consistent with the evidence, but the mechanism is inferred rather " +
          "than documented; Gupta decline also has internal causes in the literature." },
      },
    ],
    effects: [],
    places: ["place-kannauj", "place-mathura", "place-indraprastha"],
    sources: [
      { source: "thapar-early-india", locator: "chapters on the Hunas and the post-Gupta transition" },
      { source: "singh-ancient-india", locator: "chapters on the end of the Gupta period" },
    ],
    curriculum: [
      { level: "school", board: "CBSE", class: "12", subject: "history", chapterRef: "Kings, Farmers and Towns", verifiedAgainst: "NCERT Class XII History chapter titles", verifiedDate: "2026-11-11" },
      { level: "upsc", upscPaper: "gs1", concept: "Post-Gupta period; Central Asian incursions" },
    ],
  },
  {
    id: "event-harsha-accession",
    eventType: "accession",
    entities: ["cliopatria-harsha-s-empire", "cliopatria-gupta-empire"],
    importance: 3,
    title: { en: "Harsha establishes his capital at Kannauj", hi: "हर्ष कन्नौज को अपनी राजधानी बनाता है" },
    date: "0606~/0647",
    dateCertainty: "approximate",
    location: { placeId: "place-kannauj", geometry: { type: "Point", coordinates: [79.915, 27.06] }, precisionKm: 3, sources: [{ source: "reference-coordinates", locator: "Kannauj reference position" }] },
    summary: {
      en:
        "Harsha rules from Thanesar and then from Kannauj, roughly 606 to 647 CE. Two independent " +
        "sources describe the same court from opposite sides: Banabhatta, inside it, writing praise; " +
        "Xuanzang, visiting it, recording what he saw. Reading them against each other is the exercise " +
        "this event exists to set up. Politically, the corridor's centre of gravity has now moved " +
        "upstream from Pataliputra to Kannauj.",
      hi:
        "हर्ष थानेश्वर से और फिर कन्नौज से शासन करता है, लगभग ६०६ से ६४७ ईसवी तक। दो स्वतंत्र स्रोत एक " +
        "ही दरबार का विपरित पक्षों से वर्णन करते हैं: बाणभट्ट, उसके भीतर से, स्तुति लिखता हुआ; और " +
        "हुआनसांग, उसका आगंतुक, जो उसने देखा उसे दर्ज करता है। राजनीतिक रूप से क्षेत्र का गुरुत्व-केंद्र अब " +
        "पाटलिपुत्र से ऊपर की ओर कन्नौज चला गया है।",
    },
    causes: [],
    effects: [],
    places: ["place-kannauj", "place-pataliputra", "place-nalanda", "place-thanesar"],
    sources: [
      { source: "harshacharita", locator: "Bana's account of Harsha's court and accession" },
      { source: "xuanzang-record", locator: "accounts of Kanyakubja and of the king" },
      { source: "thapar-early-india", locator: "chapters on Harsha and the seventh century" },
    ],
    curriculum: [
      { level: "school", board: "CBSE", class: "12", subject: "history", chapterRef: "Through the Eyes of Travellers", verifiedAgainst: "NCERT Class XII History chapter titles", verifiedDate: "2026-11-11" },
      { level: "upsc", upscPaper: "gs1", concept: "Harsha; seventh-century north India" },
      { level: "upsc", upscPaper: "history-optional", concept: "Harshacharita and Xuanzang as sources" },
    ],
  },
  {
    id: "event-xuanzang-visit",
    eventType: "cultural",
    entities: ["cliopatria-harsha-s-empire"],
    importance: 3,
    title: { en: "Xuanzang's stay in the Ganga valley", hi: "गंगा घाटी में हुआनसांग का प्रवास" },
    date: "0630/0644",
    dateCertainty: "exact",
    location: { placeId: "place-nalanda", geometry: { type: "Point", coordinates: [85.444, 25.1354] }, precisionKm: 80, sources: [{ source: "xuanzang-record", locator: "the itinerary in the record" }] },
    summary: {
      en:
        "Xuanzang studies at Nalanda for an extended period and travels widely in the valley. He " +
        "describes Nalanda as a vast, richly endowed monastery with thousands of monks and a " +
        "demanding admission test; Kannauj as Harsha's splendid capital; Pataliputra as largely " +
        "deserted. Set against Faxian's account of the same places two centuries earlier, this is the " +
        "corridor's best documented pair of observations of the same cities at different times.",
      hi:
        "हुआनसांग नालंदा में दीर्घ काल तक अध्ययन करता है और घाटी में व्यापक यात्रा करता है। वह नालंदा का " +
        "वर्णन एक विशाल, समृद्ध दान-संपन्न विहार के रूप में करता है जिसमें हज़ारों भिक्षु एवं कठिन प्रवेश " +
        "परीक्षा है; कन्नौज को हर्ष की वैभवशाली राजधानी बताता है; पाटलिपुत्र को प्रायः वीरान।",
    },
    causes: [],
    effects: [],
    significance: {
      en:
        "The core of the Compare Time experience: two dated primary observers, the same cities, two " +
        "hundred and sixteen years apart, both describing Pataliputra's decline and Nalanda's rise.",
      hi:
        "समय-तुलना अनुभव का केंद्र: दो दिनांकित प्राथमिक प्रेक्षक, वे ही नगर, दो सौ सोलह वर्ष के " +
        "अंतर पर।",
    },
    places: ["place-nalanda", "place-pataliputra", "place-kannauj", "place-varanasi", "place-tamralipta"],
    sources: [
      { source: "xuanzang-record", locator: "accounts of Nalanda, Kanyakubja, Pataliputra and Tamralipti" },
      { source: "faxian-record", locator: "the earlier account of the same places, for comparison" },
      { source: "ncert-tih-2", locator: "'Through the Eyes of Travellers'" },
    ],
    curriculum: [
      { level: "school", board: "CBSE", class: "12", subject: "history", chapterRef: "Through the Eyes of Travellers", verifiedAgainst: "NCERT Class XII History chapter titles", verifiedDate: "2026-11-11" },
      { level: "upsc", upscPaper: "gs1", concept: "Foreign travellers' accounts as sources" },
      { level: "upsc", upscPaper: "history-optional", concept: "Nalanda; Xuanzang's account" },
    ],
  },

  // ===========================================================================
  // MEDIEVAL AND MODERN
  // ===========================================================================
  {
    id: "event-pala-empire",
    eventType: "foundation",
    entities: ["cliopatria-pala-empire"],
    importance: 3,
    title: { en: "Rise of the Pala dynasty in Bengal and Bihar", hi: "बंगाल एवं बिहार में पाल वंश का उत्थान" },
    date: "0750~",
    dateCertainty: "approximate",
    location: { placeId: "place-mahasthangarh", geometry: { type: "Point", coordinates: [89.35, 24.9667] }, precisionKm: 60, sources: [{ source: "singh-ancient-india", locator: "chapters on the Palas and early medieval eastern India" }] },
    summary: {
      en:
        "The Pala dynasty takes power in Bengal around the mid-eighth century and rules much of the " +
        "lower and middle Ganga for four centuries, patronising Nalanda, Vikramashila, Somapura and " +
        "Odantapuri. The corridor's centre of gravity moves decisively east, downstream, towards the " +
        "delta. Cliopatra samples this polity densely — twenty-five rows in-corridor — so the map can " +
        "show its changing extent across the period at real resolution.",
      hi:
        "पाल वंश आठवीं शताब्दी के मध्य के आसपास बंगाल में सत्ता ग्रहण करता है और चार शताब्दियों तक " +
        "निचली एवं मध्य गंगा के अधिकांश पर शासन करता है, तथा नालंदा, विक्रमशिला, सोमपुर एवं ओदंतपुरी को " +
        "आश्रय देता है। क्षेत्र का गुरुत्व-केंद्र निर्णायक रूप से पूर्व की ओर, डेल्टा की दिशा में चला जाता है।",
    },
    causes: [
      {
        claim: {
          en:
          "The wealth of the delta — its agricultural surplus and its control of south-east Asian " +
          "maritime trade through ports like Tamralipta — supported a major eastern state once the " +
          "older centres of the middle Ganga weakened." },
        claimStrength: "plausible-influence",
        sources: [
          { source: "singh-ancient-india", locator: "chapters on the Palas and eastern Indian trade" },
          { source: "ncert-india-physical", locator: "Ch 3 'Drainage System' — the delta" },
        ],
        note: {
          en:
          "The physical and economic preconditions are demonstrable; that they explain the rise of this " +
          "particular dynasty, at this particular moment, is an inference." },
      },
    ],
    effects: [],
    places: ["place-mahasthangarh", "place-vikramshila", "place-nalanda", "place-sundarbans", "place-tamralipta"],
    sources: [
      { source: "singh-ancient-india", locator: "chapters on the Palas" },
      { source: "thapar-early-india", locator: "chapters on early medieval eastern India" },
      { source: "cliopatria-v0-2-1", locator: "entity 'Pala Empire' — 25 sampled rows in-corridor, peak area 1,362,437 km² as computed by the dataset" },
    ],
    curriculum: [
      { level: "school", board: "CBSE", class: "12", subject: "history", chapterRef: "Kings, Farmers and Towns", verifiedAgainst: "NCERT Class XII History chapter titles", verifiedDate: "2026-11-11" },
      { level: "upsc", upscPaper: "gs1", concept: "Early medieval regional kingdoms" },
      { level: "upsc", upscPaper: "history-optional", concept: "Pala period; eastern India" },
    ],
  },
  {
    id: "event-nalanda-destruction",
    eventType: "political-change",
    entities: ["cliopatria-sena-dynasty"],
    importance: 4,
    title: { en: "Destruction of Nalanda, Odantapuri and Vikramashila", hi: "नालंदा, ओदंतपुरी एवं विक्रमशिला का विनाश" },
    date: "1193~/1200~",
    dateCertainty: "approximate",
    location: { placeId: "place-nalanda", geometry: { type: "Point", coordinates: [85.444, 25.1354] }, precisionKm: 60, sources: [{ source: "tabaqat-i-nasiri", locator: "the account of the monasteries of Bihar" }] },
    summary: {
      en:
        "The great monastic universities of the eastern Ganga are destroyed within a few years of each " +
        "other around the turn of the thirteenth century. The narrative source is Minhaj-i-Siraj's " +
        "Tabaqat-i-Nasiri, written about four decades later by a historian who was not an eyewitness " +
        "here. Archaeology at Nalanda confirms destruction by fire but cannot date it to a year. The " +
        "date is therefore given as approximate over a span, and NOT as the single year 1193 that is " +
        "commonly circulated.",
      hi:
        "पूर्वी गंगा के महान monastic विश्वविद्यालय तेरहवीं शताब्दी के आरंभ के आसपास कुछ ही वर्षों के भीतर " +
        "नष्ट कर दिए जाते हैं। कथात्मक स्रोत मिन्हाज-इ-सिराज का तबक़ात-इ-नासिरी है, जो लगभग चार दशक बाद " +
        "एक ऐसे इतिहासकार द्वारा लिखा गया जो यहाँ प्रत्यक्षदर्शी नहीं था। नालंदा में पुरातत्व अग्नि द्वारा " +
        "विनाश की पुष्टि करता है परंतु उसे किसी वर्ष में तिथिबद्ध नहीं कर सकता।",
    },
    causes: [
      {
        claim: {
          en:
          "The monasteries' destruction ended Buddhist institutional life in eastern India and removed " +
          "a major centre of learning, literacy and long-distance scholarly exchange from the corridor." },
        claimStrength: "demonstrated",
        sources: [
          { source: "tabaqat-i-nasiri", locator: "account of the destruction and the killing of monks" },
          { source: "singh-ancient-india", locator: "chapters on the end of Buddhist institutional life in India" },
        ],
        note: { en: "The outcome is documented from both narrative and archaeological directions." },
      },
      {
        claim: {
          en:
          "Buddhist institutions in the region were already in long decline before the destruction, so " +
          "the event completed a process rather than starting one." },
        claimStrength: "plausible-influence",
        sources: [{ source: "thapar-early-india", locator: "chapters on the later history of Buddhism in India" }],
        note: { en: "Widely argued; the rate and extent of prior decline are matters of ongoing scholarship." },
      },
    ],
    effects: [],
    significance: {
      en:
        "The pilot's clearest case for date precision honesty. A specific year is in circulation and " +
        "is not supportable at that precision; the platform shows the span and says why.",
      hi:
        "तिथि-सटीकता की ईमानदारी हेतु पायलट का सबसे स्पष्ट प्रकरण। एक विशिष्ट वर्ष प्रचलन में है और उस " +
        "सटीकता पर समर्थनीय नहीं है; मंच परिसर दिखाता है और कारण बताता है।",
    },
    places: ["place-nalanda", "place-odantapuri", "place-vikramshila"],
    sources: [
      { source: "tabaqat-i-nasiri", locator: "account of the destruction of the monasteries of Bihar" },
      { source: "singh-ancient-india", locator: "chapters on early medieval eastern India" },
      { source: "thapar-early-india", locator: "chapters on the later history of Buddhism" },
    ],
    curriculum: [
      { level: "school", board: "CBSE", class: "12", subject: "history", chapterRef: "Through the Eyes of Travellers", verifiedAgainst: "NCERT Class XII History chapter titles", verifiedDate: "2026-11-11" },
      { level: "upsc", upscPaper: "gs1", concept: "Medieval India; centres of learning" },
      { level: "upsc", upscPaper: "history-optional", concept: "Sources for early medieval Indian history" },
    ],
  },
  {
    id: "event-chola-kalinga-campaign",
    eventType: "battle",
    entities: ["cliopatria-eastern-ganga-kingdom", "cliopatria-sena-dynasty"],
    importance: 2,
    title: { en: "Chola campaigns in Kalinga", hi: "कलिंग में चोल अभियान" },
    date: "1070~/1120",
    dateCertainty: "approximate",
    location: { placeId: "place-dhauli", geometry: { type: "Point", coordinates: [85.8, 20.3] }, precisionKm: 60, sources: [{ source: "reference-coordinates", locator: "the Kalinga coast generally" }] },
    summary: {
      en:
        "The Chola dynasty of the far south projects naval and military power into Kalinga and across " +
        "the Bay of Bengal. Recorded in Tamil inscriptions and in the Kalingattuparani. It matters here " +
        "because it shows the corridor's south-east connected to a peninsular maritime state, not only " +
        "to northern land powers — and because Kalinga is again the pivot, five centuries after Ashoka, " +
        "this time as the object of a southern empire.",
      hi:
        "सुदूर दक्षिण का चोल वंश कलिंग एवं बंगाल की खाड़ी के पार नौसेना एवं सैन्य शक्ति का प्रक्षेपण करता " +
        "है। तमिल अभिलेखों एवं कलिंगत्तुपारणि में अंकित। यह यहाँ महत्वपूर्ण है क्योंकि यह दर्शाता है कि " +
        "इस क्षेत्र का दक्षिण-पूर्व केवल उत्तरी थल-शक्तियों से नहीं बल्कि एक प्रायद्वीपीय समुद्री राज्य से " +
        "भी जुड़ा था।",
    },
    causes: [],
    effects: [],
    places: ["place-dhauli", "place-jaugada"],
    sources: [
      { source: "thapar-early-india", locator: "chapters on the Cholas and their eastern campaigns" },
      { source: "singh-ancient-india", locator: "chapters on early medieval south India and the eastern coast" },
      { source: "cliopatria-v0-2-1", locator: "entity 'Eastern Ganga Kingdom' — the polity the dataset samples in this region during the period" },
    ],
    curriculum: [{ level: "upsc", upscPaper: "gs1", concept: "Chola administration and maritime power" }, { level: "upsc", upscPaper: "history-optional", concept: "Early medieval south India" }],
  },
  {
    id: "event-bengal-sultanate",
    eventType: "foundation",
    entities: ["cliopatria-sultanate-of-bengal"],
    importance: 3,
    title: { en: "Independent Sultanate of Bengal", hi: "स्वतंत्र बंगाल सल्तनत" },
    date: "1342~/1538",
    dateCertainty: "approximate",
    location: { placeId: "place-mahasthangarh", geometry: { type: "Point", coordinates: [89.35, 24.9667] }, precisionKm: 80, sources: [{ source: "cliopatria-v0-2-1", locator: "entity 'Sultanate of Bengal' — 9 sampled rows in-corridor" }] },
    summary: {
      en:
        "Bengal separates from Delhi under the Ilyas Shahi line and remains largely independent until " +
        "Mughal incorporation. The delta's agricultural and commercial weight supports a state of its " +
        "own — the same physical fact that supported the Palas, now under a different political and " +
        "religious order. Cliopatra samples this polity across nine in-corridor rows, so the changing " +
        "extent of Bengal against its neighbours is visible on the map year by year.",
      hi:
        "इलियास शाही वंश के अधीन बंगाल दिल्ली से पृथक हो जाता है और मुग़ल विलय तक अधिकांशतः स्वतंत्र " +
        "रहता है। डेल्टा का कृषि एवं व्यापारिक भार स्वयं का एक राज्य धारण करता है — वही भौतिक तथ्य जिसने " +
        "पालों को धारित किया था, अब भिन्न राजनीतिक एवं धार्मिक व्यवस्था के अधीन।",
    },
    causes: [],
    effects: [],
    places: ["place-mahasthangarh", "place-sundarbans", "place-ganga-river"],
    sources: [
      { source: "cliopatria-v0-2-1", locator: "entity 'Sultanate of Bengal'; 9 sampled rows in-corridor" },
      { source: "thapar-early-india", locator: "chapters on medieval regional kingdoms" },
    ],
    curriculum: [
      { level: "school", board: "CBSE", class: "7", subject: "history", concept: "Regional states of medieval India", verifiedAgainst: "NCERT Class VII Our Pasts II", verifiedDate: "2026-11-11" },
      { level: "upsc", upscPaper: "gs1", concept: "Medieval India: regional kingdoms" },
    ],
  },
  {
    id: "event-diwani-grant",
    eventType: "administrative",
    entities: ["cliopatria-british-empire-2", "cliopatria-nawabs-of-bengal"],
    importance: 4,
    title: { en: "The Company receives the diwani of Bengal, Bihar and Orissa", hi: "कंपनी को बंगाल, बिहार एवं उड़ीसा की दीवानी प्राप्त" },
    date: "1765-08-12",
    dateCertainty: "exact",
    location: { placeId: "place-prayagraj", geometry: { type: "Point", coordinates: [81.8463, 25.4358] }, precisionKm: 3, sources: [{ source: "reference-coordinates", locator: "Allahabad, where the treaty was concluded" }] },
    summary: {
      en:
        "After Buxar, Shah Alam II grants the East India Company the right to collect the land revenue " +
        "of Bengal, Bihar and Orissa. The corridor's economy is now administered by a company whose " +
        "shareholders are in London. This is the moment at which the physical geography of the Ganga " +
        "plain — its soils, its crops, its rainfall regime — becomes an object of revenue calculation.",
      hi:
        "बक्सर के बाद, शाह आलम द्वितीय ईस्ट इंडिया कंपनी को बंगाल, बिहार एवं उड़ीसा का भू-राजस्व " +
        "एकत्र करने का अधिकार प्रदान करते हैं। इस क्षेत्र की अर्थव्यवस्था अब एक ऐसी कंपनी द्वारा संचालित " +
        "होती है जिसके अंशधारक लंदन में हैं। यही वह क्षण है जब गंगा मैदान का भौतिक भूगोल राजस्व-गणना " +
        "का विषय बनता है।",
    },
    causes: [
      {
        claim: {
          en:
          "The Company's victory at Buxar in October 1764 removed the military obstacle to revenue " +
          "control, and the diwani followed within ten months." },
        claimStrength: "demonstrated",
        sources: [{ source: "ncert-tih-2", locator: "chapters on colonialism and the countryside" }],
        note: { en: "Documented and dated on both sides." },
      },
    ],
    effects: [],
    significance: {
      en:
        "The beginning of the modern layer of the corridor, and the hinge between the historical " +
        "geography that Cliopatra can sample and the modern geography that the Census can.",
      hi:
        "इस क्षेत्र की आधुनिक परत का आरंभ, तथा उस ऐतिहासिक भूगोल के बीच का कब्जा जिसे क्लिओपैट्रा नमूना कर " +
        "सकता है और उस आधुनिक भूगोल के जिसे जनगणना कर सकती है।",
    },
    places: ["place-prayagraj", "place-buxar", "place-pataliputra"],
    sources: [
      { source: "ncert-tih-2", locator: "chapters on colonialism and the countryside" },
      { source: "treaty-of-allahabad-1765", locator: "Treaty of Allahabad, 12 August 1765", note: "Listed for reference; the original instrument was not consulted for this pilot." },
      { source: "cliopatria-v0-2-1", locator: "entity 'British Empire' — the dataset's own territorial sampling from this period" },
    ],
    curriculum: [
      { level: "school", board: "CBSE", class: "8", subject: "history", chapterRef: "From Trade to Territory", verifiedAgainst: "NCERT Class VIII Our Pasts III", verifiedDate: "2026-11-11" },
      { level: "school", board: "CBSE", class: "12", subject: "history", book: "Themes in Indian History Part III", chapterRef: "Colonialism and the Countryside", verifiedAgainst: "NCERT Class XII History Part III chapter titles", verifiedDate: "2026-11-11" },
      { level: "upsc", upscPaper: "gs1", concept: "British expansion in India; the diwani" },
      { level: "upsc", upscPaper: "history-optional", concept: "Economic impact of British rule in Bengal" },
    ],
  },
  {
    id: "event-permanent-settlement",
    eventType: "administrative",
    entities: ["cliopatria-british-empire-2"],
    importance: 4,
    title: { en: "Permanent Settlement of the land revenue", hi: "भू-राजस्व का स्थायी बंदोबस्त" },
    date: "1793-03-22",
    dateCertainty: "exact",
    location: { geometry: { type: "Point", coordinates: [87.0, 25.0] }, precisionKm: 200, sources: [{ source: "ncert-tih-2", locator: "chapters on colonialism and the countryside — the settlement applied to Bengal, Bihar and Orissa" }] },
    summary: {
      en:
        "The land revenue demand on the zamindars of Bengal, Bihar and Orissa is fixed in perpetuity. " +
        "The consequences for this corridor are profound and specifically geographical: property rights " +
        "are redefined on an agricultural plain, the cultivator's position is weakened, revenue " +
        "pressure drives the extension of commercial crops including indigo in Champaran, and a " +
        "landholding structure is created that survives into the twentieth century and shapes both the " +
        "1857 revolt in Arrah and the 1917 satyagraha in Champaran.",
      hi:
        "बंगाल, बिहार एवं उड़ीसा के ज़मींदारों पर भू-राजस्व की मांग स्थायी रूप से निश्चित कर दी जाती है। " +
        "इस क्षेत्र हेतु इसके परिणाम गहरे एवं विशेष रूप से भौगोलिक हैं: एक कृषि मैदान पर संपत्ति अधिकार " +
        "पुनर्परिभाषित होते हैं, कृषक की स्थिति दुर्बल होती है, राजस्व दबाव चंपारण में नील सहित व्यावसायिक " +
        "फसलों के विस्तार को प्रेरित करता है, और एक भूमि-स्वामित्व संरचना बनती है जो बीसवीं शताब्दी तक " +
        "जीवित रहती है।",
    },
    causes: [
      {
        claim: {
          en:
          "Fixing the revenue in perpetuity gave the Company a predictable income and created a " +
          "landed class with an interest in British rule." },
        claimStrength: "demonstrated",
        sources: [{ source: "ncert-tih-2", locator: "chapters on colonialism and the countryside" }],
      },
      {
        claim: {
          en:
          "The settlement's structure directly produced the conditions of the Champaran indigo " +
          "cultivation that the 1917 satyagraha confronted." },
        claimStrength: "plausible-influence",
        sources: [{ source: "ncert-tih-2", locator: "chapters on indigo cultivation and rural resistance" }],
        note: {
          en:
          "The connection is well argued in the literature but runs through many intervening steps — " +
          "subinfeudation, indebtedness, European planter entry — over more than a century." },
      },
    ],
    effects: [],
    places: ["place-champaran", "place-arrha", "place-ganga-river"],
    sources: [
      { source: "regulation-i-1793", locator: "Regulation I of 1793", note: "Listed for reference; the regulation text was not consulted for this pilot." },
      { source: "ncert-tih-2", locator: "chapters on colonialism and the countryside" },
    ],
    curriculum: [
      { level: "school", board: "CBSE", class: "12", subject: "history", book: "Themes in Indian History Part III", chapterRef: "Colonialism and the Countryside", verifiedAgainst: "NCERT Class XII History Part III chapter titles", verifiedDate: "2026-11-11" },
      { level: "upsc", upscPaper: "gs1", concept: "Land revenue systems under British rule" },
      { level: "upsc", upscPaper: "geography-optional", concept: "Agrarian structure; land tenure and land use" },
    ],
  },
  {
    id: "event-bihar-province-1912",
    eventType: "administrative",
    entities: ["cliopatria-british-raj"],
    importance: 2,
    title: { en: "Bihar and Orissa separated from the Bengal Presidency", hi: "बंगाल प्रेसीडेंसी से बिहार एवं उड़ीसा पृथक" },
    date: "1912-03-22~",
    dateCertainty: "approximate",
    location: { placeId: "place-pataliputra", geometry: { type: "Point", coordinates: [85.1376, 25.5941] }, precisionKm: 100, sources: [{ source: "reference-coordinates", locator: "Patna, the new provincial capital" }] },
    summary: {
      en:
        "A new province is created, with Patna as its capital. The date of 22 March 1912 is very " +
        "widely recorded and is commemorated as Bihar Day, but the primary gazette notification was " +
        "not consulted during this pilot — so the date is marked approximate and the record that would " +
        "settle it is listed as a source with verification 'not-consulted', and NO claim rests on it. " +
        "This is an honest gap: the platform knows what it does not know.",
      hi:
        "एक नए प्रांत का निर्माण होता है, जिसकी राजधानी पटना है। २२ मार्च १९१२ की तिथि अत्यंत व्यापक रूप " +
        "से अंकित है और इसे बिहार दिवस के रूप में मनाया जाता है, परंतु प्राथमिक राजपत्र अधिसूचना इस " +
        "पायलट के दौरान परामृष्ट नहीं की गई — अतः तिथि अनुमानित चिह्नित है और कोई दावा उस पर निर्भर " +
        "नहीं करता।",
    },
    causes: [],
    effects: [],
    significance: {
      en:
        "Included as a worked example of an honest citation gap. The event is real, the date is widely " +
        "agreed, and yet the primary document has not been read — so the platform says exactly that " +
        "instead of presenting a confident date with a confident-sounding but unverified source.",
      hi:
        "ईमानदार उद्धरण-अंतर के एक व्यावहारिक उदाहरण के रूप में शामिल। घटना वास्तविक है, तिथि व्यापक रूप " +
        "से सहमत है, फिर भी प्राथमिक दस्तावेज़ पढ़ा नहीं गया — अतः मंच ठीक यही कहता है।",
    },
    places: ["place-pataliputra", "place-gaya", "place-champaran"],
    sources: [
      { source: "bihar-province-1912", locator: "the gazette notification of 1912", note: "NOT consulted for this pilot; no claim rests on it." },
      { source: "census-india-2011", locator: "historical administrative geography context", note: "Used only to confirm the modern district structure, not the 1912 date." },
    ],
    curriculum: [{ level: "upsc", upscPaper: "gs1", concept: "Administrative geography of colonial India" }],
  },
  {
    id: "event-champaran-satyagraha",
    eventType: "revolt",
    entities: ["cliopatria-british-raj"],
    importance: 4,
    title: { en: "Champaran satyagraha", hi: "चंपारण सत्याग्रह" },
    date: "1917-04/1917-10",
    dateCertainty: "approximate",
    location: { placeId: "place-champaran", geometry: { type: "Point", coordinates: [84.5, 27.0] }, precisionKm: 15, sources: [{ source: "ncert-tih-2", locator: "chapters on colonial rural economy and indigo" }] },
    summary: {
      en:
        "Gandhi's first satyagraha in India, against the conditions of indigo cultivation imposed on " +
        "the ryots of the Champaran terai. It is included in the pilot because it is the corridor's " +
        "best documented case of a physical-geographical fact — a specific soil, a specific water " +
        "regime, a specific crop suited to both — being converted by colonial commerce into a system " +
        "of coercion, and then being resisted by a political method invented on the spot.",
      hi:
        "भारत में गांधी का प्रथम सत्याग्रह, चंपारण के तराई क्षेत्र के रय्यतों पर थोपी गई नील खेती की " +
        "स्थितियों के विरुद्ध। इसे पायलट में इसलिए शामिल किया गया क्योंकि यह एक भौतिक-भौगोलिक तथ्य — एक " +
        "विशिष्ट मृदा, एक विशिष्ट जल-शासन, दोनों के अनुरूप एक विशिष्ट फसल — को औपनिवेशिक वाणिज्य द्वारा " +
        "जबरदस्ती की व्यवस्था में बदले जाने का सबसे अच्छी तरह प्रमाणित प्रकरण है।",
    },
    causes: [
      {
        claim: {
          en:
          "The Champaran terai's soil and water regime suited indigo, which made it profitable for " +
          "European planters, which in turn produced the tinkathia system that forced cultivation on " +
          "a fixed share of each holding." },
        claimStrength: "demonstrated",
        sources: [{ source: "ncert-tih-2", locator: "chapters on indigo cultivation and rural resistance" }],
        note: {
          en:
          "The chain from physical suitability to economic exploitation is documented in the " +
          "curriculum's own treatment of the agrarian economy; it is the pilot's clearest " +
          "environment-to-society causal claim." },
      },
      {
        claim: {
          en:
          "The Permanent Settlement of 1793 created the landholding structure within which the " +
          "tinkathia system became possible." },
        claimStrength: "plausible-influence",
        sources: [{ source: "ncert-tih-2", locator: "chapters on colonialism and the countryside" }],
        note: { en: "Well argued, but the connection runs through more than a century of intervening change." },
      },
    ],
    effects: [],
    places: ["place-champaran", "place-gandak-river", "place-arrha"],
    sources: [
      { source: "ncert-tih-2", locator: "chapters on colonialism and the countryside; indigo" },
      { source: "natural-earth", locator: "terai-margin and Gandak plain context" },
    ],
    curriculum: [
      { level: "school", board: "CBSE", class: "8", subject: "history", chapterRef: "The Changing World of Visual Arts / Rural Life and Society", verifiedAgainst: "NCERT Class VIII Our Pasts III", verifiedDate: "2026-11-11", note: "Class VIII treatment of colonial rural economy; exact chapter mapping to be confirmed against the current syllabus." },
      { level: "school", board: "CBSE", class: "12", subject: "history", book: "Themes in Indian History Part III", chapterRef: "Colonialism and the Countryside", verifiedAgainst: "NCERT Class XII History Part III chapter titles", verifiedDate: "2026-11-11" },
      { level: "upsc", upscPaper: "gs1", concept: "Champaran satyagraha; peasant movements" },
      { level: "upsc", upscPaper: "gs3", concept: "Agriculture: plantation crops and rural economy" },
    ],
  },
  {
    id: "event-jharkhand-formation",
    eventType: "administrative",
    entities: ["cliopatria-republic-of-india"],
    importance: 3,
    title: { en: "Creation of the State of Jharkhand", hi: "झारखंड राज्य की स्थापना" },
    date: "2000-11-15",
    dateCertainty: "exact",
    location: { placeId: "place-jamshedpur", geometry: { type: "Point", coordinates: [85.32, 23.61] }, precisionKm: 150, sources: [{ source: "bihar-reorganisation-act-2000", locator: "the Act's schedules of transferred districts; Ranchi as capital" }] },
    summary: {
      en:
        "Eighteen districts of southern Bihar are separated to form Jharkhand, with Ranchi as capital, " +
        "under the Bihar Reorganisation Act, 2000, effective 15 November 2000. The state is defined by " +
        "its physical geography as much as by its history: the Chotanagpur plateau, its coal, iron " +
        "ore, bauxite and forest, and the Damodar and Subarnarekha systems draining it. Bokaro, " +
        "Jamshedpur and Dhanbad all sit inside it. It is the corridor's clearest modern example of " +
        "mineral geology determining the shape of a political unit — and of the extraction that " +
        "determination brought.",
      hi:
        "दक्षिणी बिहार के अठारह ज़िले पृथक कर झारखंड का निर्माण होता है, जिसकी राजधानी राँची है, बिहार " +
        "पुनर्गठन अधिनियम, 2000 के अधीन, 15 नवंबर 2000 से प्रभावी। यह राज्य अपने भौतिक भूगोल द्वारा " +
        "उतना ही परिभाषित है जितना अपने इतिहास द्वारा: छोटा नागपुर पठार, उसका कोयला, लौह-अयस्क, " +
        "बॉक्साइट एवं वन, तथा उसे अपवाहित करने वाले दामोदर एवं सुवर्णरेखा तंत्र।",
    },
    causes: [
      {
        claim: {
          en:
          "The Chotanagpur plateau's mineral endowment — coal at Jharia, iron ore, bauxite, and the " +
          "water and rail access to move it — determined where heavy industry was located, which in " +
          "turn shaped the region's economic identity and its demand for separate statehood." },
        claimStrength: "demonstrated",
        sources: [
          { source: "ncert-india-people-economy", locator: "chapters on mineral resources and industries" },
          { source: "bihar-reorganisation-act-2000", locator: "schedules of transferred districts" },
        ],
        note: {
          en:
          "The strongest causal claim in the modern part of the corpus, because the chain is short and " +
          "every link is observable on the map: coalfield, river, railway, plant, city, district." },
      },
    ],
    effects: [],
    places: ["place-bokaro", "place-jamshedpur", "place-dhanbad", "place-damodar-river"],
    sources: [
      { source: "bihar-reorganisation-act-2000", locator: "Bihar Reorganisation Act, 2000 (Act No. 30 of 2000), s.3 and the schedules" },
      { source: "ncert-india-people-economy", locator: "chapters on mineral resources and industries" },
      { source: "census-india-2011", locator: "district boundaries of Bihar and Jharkhand as of the 2011 Census", note: "Reference year 2011. Any population figure shown must carry this year." },
    ],
    curriculum: [
      { level: "school", board: "CBSE", class: "10", subject: "social-science", concept: "Federalism and the creation of new states", verifiedAgainst: "NCERT Class X Democratic Politics II", verifiedDate: "2026-11-11" },
      { level: "school", board: "CBSE", class: "12", subject: "geography", chapterRef: "Mineral and Energy Resources", verifiedAgainst: "NCERT Class XII Geography chapter titles", verifiedDate: "2026-11-11" },
      { level: "upsc", upscPaper: "gs1", concept: "Regionalism; formation of new states" },
      { level: "upsc", upscPaper: "gs3", concept: "Mineral resources; industrial development" },
      { level: "upsc", upscPaper: "geography-optional", concept: "Resource geography; regional planning" },
    ],
  },
  {
    id: "event-dvc-establishment",
    eventType: "administrative",
    entities: ["cliopatria-republic-of-india"],
    importance: 2,
    title: { en: "Damodar Valley Corporation established", hi: "दामोदर वैली कॉर्पोरेशन की स्थापना" },
    date: "1948",
    dateCertainty: "exact",
    location: { placeId: "place-damodar-river", geometry: { type: "Point", coordinates: [87.0, 23.7] }, precisionKm: 60, sources: [{ source: "dvc-act-1948", locator: "the Act establishes the Corporation for the Damodar valley" }] },
    summary: {
      en:
        "India's first integrated multipurpose river-valley project, modelled on the Tennessee Valley " +
        "Authority, for flood control, irrigation, power and navigation on a river long called the " +
        "'Sorrow of Bengal'. It is the corridor's clearest case of a physical system being deliberately " +
        "re-engineered by a modern state — and a documented one, since the enabling Act is a public " +
        "record cited by number.",
      hi:
        "भारत की प्रथम एकीकृत बहुउद्देशीय नदी-घाटी परियोजना, टेनेसी वैली अथॉरिटी के अनुरूप, एक ऐसी नदी पर " +
        "बाढ़ नियंत्रण, सिंचाई, विद्युत एवं नौवहन हेतु जिसे लंबे समय तक 'बंगाल का शोक' कहा गया। यह एक " +
        "आधुनिक राज्य द्वारा किसी भौतिक तंत्र को जानबूझकर पुनः अभियंत्रित करने का सबसे स्पष्ट प्रकरण है।",
    },
    causes: [
      {
        claim: {
          en:
          "The Damodar's flood regime — a steep plateau catchment feeding a very flat deltaic plain — " +
          "made periodic catastrophic flooding of the coalfield and the farmland downstream " +
          "structurally likely, and this motivated a valley-wide engineering intervention rather than " +
          "local embankments." },
        claimStrength: "demonstrated",
        sources: [
          { source: "dvc-act-1948", locator: "the Act's stated purposes for the Damodar valley" },
          { source: "ncert-india-people-economy", locator: "chapters on water resources and flood management" },
        ],
        note: {
          en:
          "The physical argument is observable on the map — the gradient change is visible between the " +
          "plateau and the plain — and the legislative purpose is on the record." },
      },
    ],
    effects: [],
    places: ["place-damodar-river", "place-bokaro", "place-dhanbad", "place-sundarbans"],
    sources: [
      { source: "dvc-act-1948", locator: "Damodar Valley Corporation Act, 1948 (Act No. XIV of 1948)" },
      { source: "ncert-india-people-economy", locator: "chapters on water resources" },
      { source: "ncert-india-physical", locator: "Ch 3 'Drainage System'" },
    ],
    curriculum: [
      { level: "school", board: "CBSE", class: "11", subject: "geography", chapterRef: "Drainage System", registryTopicId: "c11-ind-ch3", verifiedAgainst: "NCERT Class XI Geography chapter titles", verifiedDate: "2026-11-11" },
      { level: "school", board: "CBSE", class: "12", subject: "geography", chapterRef: "Water Resources", verifiedAgainst: "NCERT Class XII Geography chapter titles", verifiedDate: "2026-11-11" },
      { level: "upsc", upscPaper: "gs3", concept: "Multipurpose river valley projects; flood management" },
      { level: "upsc", upscPaper: "geography-optional", concept: "River basin management; applied geomorphology" },
    ],
  },
];

function REF_C(source: string, locator: string, note?: string) {
  return { source, locator, note } as const;
}

export const CURATED_EVENT_IDS = CURATED_EVENTS.map((e) => e.id);
