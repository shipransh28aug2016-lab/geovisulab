/**
 * SOURCE REGISTER for the Ganga-Magadha-Eastern India pilot corpus.
 *
 * HONESTY RULES APPLIED HERE (docs/DATA_GOVERNANCE.md, docs/LICENCE_AUDIT.md):
 *
 *  1. No invented locators. Where we have not transcribed a specific page, the locator is a chapter,
 *     an inscription number, a dataset row, or an article of legislation — all of which a reader can
 *     check — and `verification` says exactly how far we got. Nothing is marked "consulted" unless
 *     the underlying bytes were actually read in this project. Only the two machine datasets qualify.
 *
 *  2. No claim in this corpus may rest on a source whose verification is `not-consulted`. The
 *     validator enforces that (atlas/scripts/validate.ts).
 *
 *  3. Primary and secondary are kept apart, because a 3rd-century BCE edict and a 2008 textbook are
 *     not the same kind of evidence and must not be presented as if they were.
 *
 *  4. There is no reliability score anywhere in this file, deliberately. See docs/DATA_MODEL.md D-3.
 */

import type { SourceRecord } from "../../../../src/lib/atlas/model";

const NOT_CONSULTED_NOTE =
  "Bibliographic reference identified and checked for existence, title, author and publisher. The " +
  "specific chapters cited below are standard, well-known divisions of the work; page-level locators " +
  "were NOT transcribed for this pilot and no page numbers are asserted anywhere in this corpus.";

export const CURATED_SOURCES: SourceRecord[] = [
  // ===========================================================================
  // PRIMARY — epigraphic
  // ===========================================================================
  {
    id: "ashokan-rock-edict-xiii",
    kind: "inscription",
    title: {
      en: "Ashoka's Rock Edict XIII (the 'Kalinga Edict')",
      hi: "अशोक का शिलालेख XIII ('कलिंग शिलालेख')",
    },
    author: "Issued in the name of Devanampiya Piyadasi (Ashoka), Mauryan emperor",
    publisher: "Major rock edict corpus, separately engraved at Shahbazgarhi, Mansehra, Kalsi, Girnar, Dhauli, Jaugada and Erragudi",
    publicationDate: "-0259",
    license: "Public domain (ancient inscription); transcriptions and editions carry their own terms",
    primary: true,
    verification: "reference-identified",
    coverage: {
      spatial: [76.5, 19.8, 91.5, 31.5],
      temporal: "-0268/-0232",
      completeness: "partial",
    },
    notes:
      "The single most important primary source for the pilot's pivotal event. It is the emperor's own " +
      "account of the conquest of Kalinga, of the number of people killed and deported, and of his " +
      "subsequent remorse. Two things must be said alongside it whenever it is used: (a) it is a " +
      "royal proclamation, so it is an official statement about the king's own change of heart, not a " +
      "neutral report; and (b) the Kalinga versions at Dhauli and Jaugada differ from the north-west " +
      "versions — they omit some edicts and carry separate edicts addressed to frontier peoples. " +
      "Locators used in this corpus are edict number and engraving site, not page numbers. " +
      NOT_CONSULTED_NOTE,
  },
  {
    id: "prayaga-prashasti",
    kind: "inscription",
    title: {
      en: "Prayaga Prashasti — the Allahabad Pillar Inscription of Samudragupta",
      hi: "प्रयाग प्रशस्ति — समुद्रगुप्त का इलाहाबाद स्तंभ लेख",
    },
    author: "Composed by the court poet Harishena",
    publisher: "Engraved on an Ashokan pillar at Prayaga (present-day Prayagraj)",
    publicationDate: "0335~/0380~",
    license: "Public domain (ancient inscription)",
    primary: true,
    verification: "reference-identified",
    coverage: { spatial: [76.5, 19.8, 91.5, 31.5], temporal: "0320/0400", completeness: "partial" },
    notes:
      "A panegyric: its purpose is praise, so its list of conquered and tributary rulers is a claim " +
      "about the king's reach, not a map of administered territory. It is nevertheless the backbone " +
      "of Gupta-period political geography, and it is physically located in this corridor — on the " +
      "Ganga-Yamuna confluence. The pillar also carries an earlier Ashokan edict and a later " +
      "Mughal Persian inscription, which is itself a lesson in how one monument accumulates layers. " +
      NOT_CONSULTED_NOTE,
  },

  // ===========================================================================
  // PRIMARY — textual, ancient and medieval
  // ===========================================================================
  {
    id: "megasthenes-indika",
    kind: "document",
    title: { en: "Indika (Account of India)", hi: "इंडिका (भारत-विवरण)" },
    author: "Megasthenes, Seleukid envoy at the Mauryan court in Pataliputra",
    publicationDate: "-0295~",
    license: "Public domain (ancient text)",
    primary: true,
    verification: "reference-identified",
    coverage: { spatial: [84.0, 24.5, 86.5, 26.5], temporal: "-0310/-0280", completeness: "partial" },
    notes:
      "The original is LOST. Everything we have survives as quotations and paraphrases inside later " +
      "Greek and Roman authors — chiefly Strabo's Geographica, Arrian's Indica and Diodorus Siculus. " +
      "Consequences that must be shown to learners rather than hidden: the text is fragmentary, it " +
      "reaches us through other people's purposes, its divisions of society are reported in Greek " +
      "terms that may not map onto Mauryan reality, and Strabo himself says Megasthenes is not always " +
      "reliable. Citations in this corpus give the preserving author and book, never a page of " +
      "'Megasthenes'. " + NOT_CONSULTED_NOTE,
  },
  {
    id: "artha-shastra",
    kind: "document",
    title: { en: "Arthashastra", hi: "अर्थशास्त्र" },
    author: "Attributed to Kautilya / Chanakya; a text with multiple layers of composition",
    publicationDate: "-0300~",
    license: "Public domain (ancient text)",
    primary: true,
    verification: "reference-identified",
    notes:
      "Attributed to a single author and a single moment, but scholarship treats it as a layered " +
      "composition spanning centuries, so dating any given prescription to 'the Mauryan period' is " +
      "unsafe. It describes administration, settlement, roads, rivers, mines and forest produce — " +
      "which is why it is so often used as evidence for Mauryan economic geography. Every use in this " +
      "corpus says 'as described in the Arthashastra', not 'as was the case'. Chapter-level locators " +
      "only (adhikarana and adhyaya), and only where the chapter is uncontroversial. " +
      NOT_CONSULTED_NOTE,
  },
  {
    id: "faxian-record",
    kind: "document",
    title: { en: "Record of Buddhist Kingdoms (Fo guo ji)", hi: "बौद्ध राज्यों का विवरण (फो-क्वो-ची)" },
    author: "Faxian (Fa-Hien), Chinese Buddhist pilgrim",
    publicationDate: "0414~",
    license: "Public domain (ancient text)",
    primary: true,
    verification: "reference-identified",
    coverage: { spatial: [84.0, 24.5, 86.5, 26.5], temporal: "0399/0414", completeness: "partial" },
    notes:
      "A first-person travel account, written after the journey, and translated from Chinese — so what " +
      "we read in English or Hindi is a translation of a translation. Faxian describes Pataliputra's " +
      "Mauryan stone palace as magnificent but the city itself as partly ruined, which is direct " +
      "evidence for the decline of the old capital between Mauryan and Gupta times. He also describes " +
      "the Ganga lands as prosperous and mild-governed. Locate him in time: he travels roughly " +
      "399-414 CE. " + NOT_CONSULTED_NOTE,
  },
  {
    id: "xuanzang-record",
    kind: "document",
    title: {
      en: "Great Tang Records on the Western Regions (Da Tang Xiyu ji)",
      hi: "पश्चिमी प्रदेशों का महा-तांग विवरण (दा तांग शी-यू ची)",
    },
    author: "Xuanzang (Hiuen Tsang), Chinese Buddhist pilgrim; compiled with Bianji",
    publicationDate: "0646",
    license: "Public domain (ancient text)",
    primary: true,
    verification: "reference-identified",
    coverage: { spatial: [83.5, 24.0, 87.0, 27.0], temporal: "0630/0644", completeness: "partial" },
    notes:
      "Xuanzang was in the Ganga valley roughly 630-644 CE, during and just after Harsha's reign. He " +
      "describes Pataliputra as largely deserted, Nalanda as a flourishing great monastery with " +
      "thousands of monks, and Kannauj as Harsha's capital. Comparing him with Faxian, two hundred " +
      "years earlier, on the SAME cities is one of the best-documented before/after pairs available " +
      "for this corridor, and the platform's Compare Time experience uses exactly that. " +
      NOT_CONSULTED_NOTE,
  },
  {
    id: "harshacharita",
    kind: "document",
    title: { en: "Harshacharita", hi: "हर्षचरित" },
    author: "Banabhatta (Bana), court poet of Harsha",
    publicationDate: "0630~",
    license: "Public domain (ancient text)",
    primary: true,
    verification: "reference-identified",
    notes:
      "A court biography in ornate Sanskrit prose by an author in Harsha's patronage, so it is " +
      "evidence for how the king wished to be remembered at least as much as for what happened. It is " +
      "also famously incomplete — the narrative breaks off. Used here for the political geography of " +
      "7th-century Kannauj and Thanesar and for the practice of reading a court text critically. " +
      NOT_CONSULTED_NOTE,
  },
  {
    id: "tabaqat-i-nasiri",
    kind: "document",
    title: { en: "Tabaqat-i-Nasiri", hi: "तबक़ात-इ-नासिरी" },
    author: "Minhaj-i-Siraj Juzjani",
    publicationDate: "1260",
    license: "Public domain (medieval text); modern editions and translations carry their own terms",
    primary: true,
    verification: "reference-identified",
    notes:
      "Written about four decades after the events it describes for eastern India, by a historian who " +
      "was not an eyewitness to the destruction of Bihar's great monasteries. Its account of the " +
      "sack of Nalanda and Odantapuri and of the killing of monks is the principal narrative source " +
      "for that event, and therefore the date usually attached to it (c. 1193-1200 CE) inherits its " +
      "approximation. Archaeology at Nalanda corroborates destruction by fire but cannot date it to a " +
      "year. The corpus marks this event's date as approximate for that reason. " + NOT_CONSULTED_NOTE,
  },
  {
    id: "mahavamsa",
    kind: "document",
    title: { en: "Mahavamsa (and the older Dipavamsa)", hi: "महावंस (एवं दीपवंस)" },
    author: "Anonymous Sinhala Buddhist monastic chroniclers",
    publicationDate: "0500~",
    license: "Public domain (ancient text)",
    primary: true,
    verification: "reference-identified",
    notes:
      "A Sri Lankan dynastic and monastic chronicle composed centuries after the events it reports " +
      "for Magadha. It is the source of the traditional 'long chronology' for the Buddha's death and " +
      "for Chandragupta Maurya's date, and it is therefore essential — and equally essential to say " +
      "that its early chronology is internally inconsistent and that modern scholarship does not " +
      "accept its dates at face value. Cited for what it CLAIMS, never as settled fact. " +
      NOT_CONSULTED_NOTE,
  },

  // ===========================================================================
  // SECONDARY — scholarship
  // ===========================================================================
  {
    id: "bechert-dating-buddha",
    kind: "book",
    title: { en: "The Dating of the Historical Buddha, Parts 1-3", hi: "ऐतिहासिक बुद्ध का काल-निर्धारण, भाग १–३" },
    author: "Heinz Bechert (ed.), with contributions from many specialists",
    publisher: "Symposien zur Buddhismusforschung IV-VI; Vandenhoeck & Ruprecht, Göttingen",
    publicationDate: "1991/1997",
    license: "All rights reserved — cited for reference only, no text reproduced",
    primary: false,
    verification: "reference-identified",
    notes:
      "Proceedings of the Göttingen symposium on the Buddha's dates. Cited because the pilot " +
      "deliberately presents the Buddha's and Mahavira's death dates as CONTESTED rather than picking " +
      "one. The traditional long chronology (Buddha c. 483 BCE, from the Mahavamsa tradition) and the " +
      "short chronology (c. 400 BCE or later) differ by roughly a century, and the symposium did not " +
      "settle the question. No claim in this corpus asserts a single year for either death. " +
      NOT_CONSULTED_NOTE,
  },
  {
    id: "thapar-early-india",
    kind: "book",
    title: {
      en: "The Penguin History of Early India: From the Origins to AD 1300",
      hi: "प्रारंभिक भारत का इतिहास: उद्गम से १३०० ईसवी तक",
    },
    author: "Romila Thapar",
    publisher: "Penguin Books India",
    publicationDate: "2002",
    isbn: "978-0-14-302989-7",
    license: "All rights reserved — cited for reference only, no text reproduced",
    primary: false,
    verification: "reference-identified",
    notes:
      "Used for the second urbanisation, the nature of the gana-sanghas (the Vajji confederacy as a " +
      "republican polity), Magadha's rise, and the argument that Magadha's advantage was not simply " +
      "'fertile land' but a combination of iron, timber, riverine communication and political " +
      "strategy. Chapters cited by title, never by page. " + NOT_CONSULTED_NOTE,
  },
  {
    id: "singh-ancient-india",
    kind: "book",
    title: {
      en: "A History of Ancient and Early Medieval India: From the Stone Age to the 12th Century",
      hi: "प्राचीन एवं प्रारंभिक मध्यकालीन भारत का इतिहास",
    },
    author: "Upinder Singh",
    publisher: "Pearson Education India",
    publicationDate: "2008",
    isbn: "978-81-317-1120-0",
    license: "All rights reserved — cited for reference only, no text reproduced",
    primary: false,
    verification: "reference-identified",
    notes:
      "Used for archaeological site identification (Rajgir, Vaishali, Pataliputra, Nalanda), for the " +
      "material evidence behind the textual chronologies, and for the explicit distinction the book " +
      "draws between what archaeology shows and what texts claim. Chapter-level locators only. " +
      NOT_CONSULTED_NOTE,
  },

  // ===========================================================================
  // CURRICULUM — the works this platform is aligned to, not copied from
  // ===========================================================================
  {
    id: "ncert-tih-1",
    kind: "book",
    title: { en: "Themes in Indian History, Part I (Class XII)", hi: "भारतीय इतिहास के कुछ विषय, भाग I (कक्षा XII)" },
    author: "NCERT",
    publisher: "National Council of Educational Research and Training",
    license: "NCERT terms — textbook content is NOT reproduced on this platform; only chapter titles and learning outcomes are referenced",
    primary: false,
    verification: "reference-identified",
    notes:
      "Referenced for curriculum alignment: 'Bricks, Beads and Bones' (early states), 'Kings, " +
      "Farmers and Towns' (early states and urbanisation, including the Mahajanapadas and " +
      "Pataliputra), and 'Kings and Chronicles'. No textbook text is copied here. Chapter titles are " +
      "the locator. " + NOT_CONSULTED_NOTE,
  },
  {
    id: "ncert-tih-2",
    kind: "book",
    title: { en: "Themes in Indian History, Part II (Class XII)", hi: "भारतीय इतिहास के कुछ विषय, भाग II (कक्षा XII)" },
    author: "NCERT",
    publisher: "National Council of Educational Research and Training",
    license: "NCERT terms — referenced, not reproduced",
    primary: false,
    verification: "reference-identified",
    notes:
      "Referenced for 'Through the Eyes of Travellers' — the chapter in which Faxian, Xuanzang and " +
      "Al-Biruni are read as evidence. That chapter is the natural home for the Compare Time " +
      "experience built here. " + NOT_CONSULTED_NOTE,
  },
  {
    id: "ncert-india-physical",
    kind: "book",
    title: {
      en: "India — Physical Environment (Class XI)",
      hi: "भारत — भौतिक पर्यावरण (कक्षा XI)",
    },
    author: "NCERT",
    publisher: "National Council of Educational Research and Training",
    license: "NCERT terms — referenced, not reproduced",
    primary: false,
    verification: "reference-identified",
    notes:
      "Chapter titles used as locators: Ch 2 'Physiography', Ch 3 'Drainage System' (the Ganga basin, " +
      "its left-bank and right-bank tributaries, the delta), Ch 4 'Climate' (monsoon), Ch 6 'Soils' " +
      "(alluvial soils of the northern plain). The legacy GeoSphere visualiser in this repository is " +
      "already aligned to this book; the Atlas reuses that alignment rather than inventing a second " +
      "one. " + NOT_CONSULTED_NOTE,
  },
  {
    id: "ncert-fundamentals-physical",
    kind: "book",
    title: {
      en: "Fundamentals of Physical Geography (Class XI)",
      hi: "भौतिक भूगोल के मूल सिद्धांत (कक्षा XI)",
    },
    author: "NCERT",
    publisher: "National Council of Educational Research and Training",
    license: "NCERT terms — referenced, not reproduced",
    primary: false,
    verification: "reference-identified",
    notes:
      "Referenced for fluvial geomorphology (river profiles, floodplains, deltas, meanders) and for " +
      "the monsoon and heat-budget material that the existing visual-lab simulators already cover. " +
      NOT_CONSULTED_NOTE,
  },
  {
    id: "ncert-india-people-economy",
    kind: "book",
    title: {
      en: "India — People and Economy (Class XII)",
      hi: "भारत — लोग और अर्थव्यवस्था (कक्षा XII)",
    },
    author: "NCERT",
    publisher: "National Council of Educational Research and Training",
    license: "NCERT terms — referenced, not reproduced",
    primary: false,
    verification: "reference-identified",
    notes:
      "Referenced for human-geography alignment: population distribution and density, land resources " +
      "and agriculture, water resources, and human settlements — the Domain B material as it applies " +
      "to this corridor. " + NOT_CONSULTED_NOTE,
  },

  // ===========================================================================
  // QUANTITATIVE — every number in the corpus must name its reference year
  // ===========================================================================
  {
    id: "census-india-2011",
    kind: "dataset",
    title: { en: "Census of India 2011 — Primary Census Abstract", hi: "भारत की जनगणना 2011 — प्राथमिक जनगणना सार" },
    author: "Office of the Registrar General and Census Commissioner, India",
    publisher: "Government of India",
    publicationDate: "2011",
    url: "https://censusindia.gov.in/",
    license: "Government of India data; attribution required",
    attribution: "Source: Census of India 2011, Office of the Registrar General & Census Commissioner, India.",
    primary: false,
    verification: "reference-identified",
    coverage: { spatial: [68.0, 6.0, 97.5, 37.5], temporal: "2011", completeness: "complete" },
    notes:
      "CRITICAL CAVEAT THAT MUST TRAVEL WITH EVERY FIGURE: 2011 is the most recent Census whose " +
      "Primary Census Abstract has been published. The 2021 Census was postponed and, at the time of " +
      "writing, its primary abstract was not available to this project. Any population figure shown " +
      "for a place in this corridor is therefore AT LEAST fourteen years old, in one of the fastest " +
      "urbanising regions in India. The platform never displays such a number without its reference " +
      "year attached, and every use here says 'as of 2011'. No figure in this pilot was transcribed " +
      "from the Census during this build; where a population number appears it is marked as requiring " +
      "verification rather than presented as a Census quotation.",
  },

  // ===========================================================================
  // LEGISLATIVE / OFFICIAL RECORDS — modern political geography
  // ===========================================================================
  {
    id: "bihar-reorganisation-act-2000",
    kind: "document",
    title: { en: "Bihar Reorganisation Act, 2000 (Act No. 30 of 2000)", hi: "बिहार पुनर्गठन अधिनियम, 2000 (अधिनियम सं. 30 सन् 2000)" },
    author: "Parliament of India",
    publisher: "Ministry of Law and Justice, Government of India",
    publicationDate: "2000-08-25",
    license: "Government of India; public record",
    primary: true,
    verification: "reference-identified",
    notes:
      "The statute that created the State of Jharkhand by separating its districts from Bihar, with " +
      "effect from 15 November 2000. Cited by Act number and section, not by page. This is the modern " +
      "political-geography layer that the Atlas must NOT project backwards: the same land that is " +
      "Jharkhand today was part of Bihar from 1912, part of the Bengal Presidency before that, and " +
      "part of quite different polities before 1765. " + NOT_CONSULTED_NOTE,
  },
  {
    id: "bihar-province-1912",
    kind: "document",
    title: {
      en: "Creation of the Province of Bihar and Orissa, 22 March 1912",
      hi: "बिहार एवं उड़ीसा प्रांत की स्थापना, 22 मार्च 1912",
    },
    author: "Government of India (British administration)",
    publisher: "Home Department, Government of India",
    publicationDate: "1912-03-22",
    license: "Public record",
    primary: true,
    verification: "not-consulted",
    notes:
      "The date on which Bihar and Orissa were separated from the Bengal Presidency is very widely " +
      "recorded and is commemorated as Bihar Day. It is listed here for the reader, but the primary " +
      "gazette notification was NOT consulted during this pilot, and therefore NO claim in the corpus " +
      "rests on this record — the event that cites it carries dateCertainty 'uncertain' and an explicit " +
      "note that the primary notification is outstanding. This is what an honest gap looks like.",
  },

  // ===========================================================================
  // MACHINE DATASETS — the only two sources we actually consulted
  // ===========================================================================
  {
    id: "natural-earth",
    kind: "dataset",
    title: { en: "Natural Earth — 10m physical layers (land, coastline, rivers, lakes)", hi: "नैचरल अर्थ — 10मी भौतिक परतें" },
    author: "Natural Earth / nvkelso contributors",
    publisher: "Public domain map dataset",
    url: "https://github.com/nvkelso/natural-earth-vector",
    license: "Public Domain",
    attribution:
      "Base layers made with Natural Earth, a public domain map dataset. Modern political boundaries are excluded by design.",
    accessDate: "2026-11-11",
    primary: false,
    verification: "consulted",
    coverage: { spatial: [-180, -90, 180, 90], completeness: "complete" },
    notes:
      "CONSULTED: the files were downloaded, hash-recorded and clipped by atlas/scripts/" +
      "fetch-natural-earth.mjs, and their contents inspected. Only physical layers are used. Admin-0 " +
      "countries, admin-1 provinces and boundary lines were deliberately EXCLUDED — a modern " +
      "political basemap under a 600 BCE map teaches the wrong thing. Documented gap found by " +
      "inspection: at 10m scale Natural Earth names the Son, Gandak, Ghäghara, Sapt Kosi, Tista, " +
      "Chambal, Betwa and Yamuna, but does NOT carry the Damodar, Gomti, Punpun, Mahananda, Ajay, " +
      "Mayurakshi, Kiul, Alaknanda, Bhagirathi or Hooghly as named features. Those are recorded as a " +
      "coverage gap, not filled with invented geometry.",
  },
  {
    id: "treaty-of-allahabad-1765",
    kind: "document",
    title: { en: "Treaty of Allahabad, 12 August 1765", hi: "इलाहाबाद की संधि, 12 अगस्त 1765" },
    author: "East India Company; Shuja-ud-Daula, Nawab of Awadh; Shah Alam II",
    publisher: "East India Company records",
    publicationDate: "1765-08-12",
    license: "Public record",
    primary: true,
    verification: "not-consulted",
    notes:
      "The instrument by which the diwani of Bengal, Bihar and Orissa passed to the Company after " +
      "Buxar. Listed for the reader; the original instrument was NOT consulted during this pilot, so " +
      "no claim in the corpus depends on it. The Buxar event cites NCERT for its narrative and marks " +
      "the diwani date as approximate.",
  },
  {
    id: "regulation-i-1793",
    kind: "document",
    title: {
      en: "Permanent Settlement — Regulation I of 1793 (Cornwallis Code)",
      hi: "स्थायी बंदोबस्त — 1793 का विनियम I (कॉर्नवालिस संहिता)",
    },
    author: "Government of Bengal, under Lord Cornwallis",
    publisher: "Bengal Regulations",
    publicationDate: "1793-03-22",
    license: "Public record",
    primary: true,
    verification: "not-consulted",
    notes:
      "The regulation that fixed the land revenue demand in perpetuity on the zamindars of Bengal, " +
      "Bihar and Orissa. Its consequences for the corridor's agrarian geography — property, " +
      "indigo, indebtedness, and the structure of rural society that the 1857 revolt and the " +
      "Champaran satyagraha later exposed — are treated at length in NCERT Class XII History Part II. " +
      "The regulation text itself was not consulted for this pilot.",
  },
  {
    id: "dvc-act-1948",
    kind: "document",
    title: {
      en: "Damodar Valley Corporation Act, 1948 (Act No. XIV of 1948)",
      hi: "दामोदर वैली कॉर्पोरेशन अधिनियम, 1948 (अधिनियम सं. XIV सन् 1948)",
    },
    author: "Parliament of India (Constituent Assembly, Legislative)",
    publisher: "Ministry of Law and Justice, Government of India",
    publicationDate: "1948",
    license: "Government of India; public record",
    primary: true,
    verification: "reference-identified",
    notes:
      "The statute establishing India's first integrated multipurpose river-valley development " +
      "corporation, for flood control, irrigation, power and navigation on the Damodar. Cited by Act " +
      "number. " + NOT_CONSULTED_NOTE,
  },
  {
    id: "reference-coordinates",
    kind: "document",
    title: {
      en: "Atlas reference coordinates for named places",
      hi: "नामित स्थानों हेतु एटलस संदर्भ निर्देशांक",
    },
    author: "GeoVisuLab Atlas editorial",
    publisher: "This project",
    license: "CC0-1.0 (this project's own compilation of widely published reference positions)",
    primary: false,
    verification: "reference-identified",
    notes:
      "WHAT THIS IS AND IS NOT. Point positions for named places in this corpus are widely published " +
      "reference coordinates for the modern settlement or the identified archaeological site, given to " +
      "roughly 0.01 degrees. They are NOT survey data, NOT a geodetic control point, and NOT the " +
      "ancient site's excavated boundary. Each place therefore carries an explicit " +
      "`locationPrecisionKm`, and the map draws that as a visible uncertainty circle rather than as a " +
      "pin that implies exactness. Where a place is identified with a modern town (Pataliputra with " +
      "Patna, Kashi with Varanasi, Girivraja with Rajgir), that identification is ITSELF a scholarly " +
      "claim and is sourced separately under `modernEquivalent`. Where an ancient site's exact " +
      "location is disputed, `locationPrecisionKm` is set large and the dispute is recorded in the " +
      "place's notes.",
  },
  {
    id: "atlas-editorial-unsourced",
    kind: "website",
    title: {
      en: "Atlas editorial note — NOT YET SOURCED",
      hi: "एटलस संपादकीय टिप्पणी — अब तक अस्रोतित",
    },
    author: "GeoVisuLab Atlas editorial",
    license: "n/a",
    primary: false,
    verification: "not-consulted",
    notes:
      "This is not a source. It is a marker. Where content in this corpus cites it, the platform MUST " +
      "display an 'unsourced' badge and the claim MUST NOT be presented as established. The validator " +
      "counts these citations and reports them as an editorial debt, so the number can only go down " +
      "as real sources are found. Shipping a history product with a way to say 'we do not yet have a " +
      "source for this' beats shipping one that quietly asserts everything.",
  },
];

export const CURATED_SOURCE_IDS = CURATED_SOURCES.map((s) => s.id);
