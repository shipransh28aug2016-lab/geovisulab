/**
 * PLACES — Ganga-Magadha-Eastern India knowledge corridor.
 *
 * Rules applied (docs/DATA_MODEL.md, docs/DATA_GOVERNANCE.md):
 *  - Coordinates come from `reference-coordinates` and EVERY place states `locationPrecisionKm`.
 *    The map renders that as an uncertainty circle. A pin is never allowed to imply exactness.
 *  - Identification of an ancient site with a modern town is a scholarly CLAIM, so it lives in
 *    `modernEquivalent` with its own citation, not in the coordinate field.
 *  - Historical names are dated where the evidence dates them, and left undated where it does not.
 *    Absence of a date is recorded as absence, never inferred.
 *  - `wikidata` is deliberately empty throughout: cross-reference identifiers could not be verified
 *    offline during this build, and a wrong Q-id is worse than no Q-id. Recorded as editorial debt.
 *  - Nothing here is a substitute for the polity geometry, which comes from Cliopatria via
 *    atlas/scripts/import-cliopatria.ts.
 */

import type { Place } from "../../../../src/lib/atlas/model";

const REF = { source: "reference-coordinates", locator: "reference position for the named place" } as const;

export const CURATED_PLACES: Place[] = [
  // ===========================================================================
  // MAGADHA — the pilot's centre of gravity
  // ===========================================================================
  {
    id: "place-rajagriha",
    canonicalName: { en: "Rajagriha", hi: "राजगृह" },
    alternateNames: [
      {
        text: "Girivraja",
        lang: "sa",
        script: "Devanagari: गिरिव्रज",
        sources: [
          {
            source: "thapar-early-india",
            locator: "chapters on the second urbanisation and the rise of Magadha",
            note: "Name used in early textual tradition for the same ringed-fortification site.",
          },
        ],
      },
      {
        text: "Vasumati / Bahunvada",
        lang: "sa",
        sources: [
          {
            source: "singh-ancient-india",
            locator: "chapters on early states and urban centres",
            note: "Alternative names attested in textual tradition; dating of their use is not established.",
          },
        ],
      },
      { text: "Rajgir", lang: "hi", script: "राजगीर", sources: [REF] },
    ],
    placeType: "administrative-centre",
    geometry: { type: "Point", coordinates: [85.418, 25.0268] },
    locationPrecisionKm: 2,
    elevationM: 73,
    modernEquivalent: {
      text: { en: "Rajgir, Nalanda district, Bihar", hi: "राजगीर, नालंदा ज़िला, बिहार" },
      sources: [{ source: "singh-ancient-india", locator: "chapters on early states and urban centres" }],
    },
    description: {
      en:
        "The early capital of Magadha, and the clearest example in the corridor of terrain deciding " +
        "settlement form. The old city was enclosed by a cyclopean stone wall running along the " +
        "crests of a ring of hills, with a separate walled area for the settlement inside; the " +
        "defence was the landscape, worked. It sits at the southern edge of the Ganga plain where " +
        "the plains meet the rocky uplands that run north-east towards the Rajmahal hills, close to " +
        "iron-bearing terrain and to the routes that ran between the Ganga and the peninsular " +
        "uplands. Nalanda lies a few kilometres north; Barabar's rock-cut caves a little further " +
        "west; the modern town of Rajgir occupies the same basin.",
      hi:
        "मगध की प्रारंभिक राजधानी, और इस क्षेत्र में इस बात का सबसे स्पष्ट उदाहरण कि भू-आकृति ने " +
        "बस्ती का स्वरूप कैसे तय किया। पुराना नगर पाँच पहाड़ियों की श्रृंखला की चोटियों पर बनी " +
        "विशाल पाषाण प्राचीर से घिरा था, और भीतर बस्ती के लिए अलग किलाबंद क्षेत्र था — अर्थात रक्षा " +
        "स्वयं परिदृश्य थी, जिसे श्रम से साधा गया। यह गंगा मैदान के दक्षिणी किनारे पर स्थित है, जहाँ " +
        "मैदान उस चट्टानी ऊँचे भाग से मिलते हैं जो राजमहल पहाड़ियों की ओर जाते हैं, तथा लौह-युक्त " +
        "भूमि और गंगा–प्रायद्वीपीय मार्गों के निकट है।",
    },
    relatedPlaces: ["place-nalanda", "place-barabar", "place-pataliputra", "place-bodhgaya"],
    sources: [
      REF,
      {
        source: "singh-ancient-india",
        locator: "chapters on early states, urbanisation and the archaeology of Rajgir",
        note: "Site identification and the hill-ring fortification description.",
      },
      {
        source: "ncert-tih-1",
        locator: "'Kings, Farmers and Towns'",
      },
    ],
    curriculum: [
      {
        level: "school",
        board: "CBSE",
        class: "12",
        subject: "history",
        book: "Themes in Indian History Part I",
        chapterRef: "Kings, Farmers and Towns",
        concept: "Early states and urbanisation",
        verifiedAgainst: "NCERT Class XII History syllabus chapter titles",
        verifiedDate: "2026-11-11",
      },
      { level: "upsc", upscPaper: "gs1", concept: "Mahajanapadas and the rise of Magadha" },
      { level: "upsc", upscPaper: "history-optional", concept: "Ancient Indian urbanisation" },
    ],
  },
  {
    id: "place-pataliputra",
    canonicalName: { en: "Pataliputra", hi: "पाटलिपुत्र" },
    alternateNames: [
      {
        text: "Pataligrama / Pataliputta",
        lang: "pi",
        script: "Pali",
        sources: [
          {
            source: "thapar-early-india",
            locator: "chapters on the rise of Magadha and the shift of the capital",
            note: "Pali tradition's name for the village that became the capital.",
          },
        ],
      },
      { text: "Palibothra", lang: "und", sources: [{ source: "megasthenes-indika", locator: "as preserved in Strabo and Arrian", note: "Greek rendering." }] },
      { text: "Kusumapura / Pushpapura", lang: "sa", sources: [{ source: "singh-ancient-india", locator: "chapters on early historic cities" }] },
      { text: "Patna", lang: "hi", script: "पटना", sources: [REF] },
    ],
    placeType: "city",
    geometry: { type: "Point", coordinates: [85.1376, 25.5941] },
    locationPrecisionKm: 3,
    elevationM: 53,
    modernEquivalent: {
      text: { en: "Patna, Bihar — with the excavated Mauryan remains at Kumhrar", hi: "पटना, बिहार — कुमहरार में उत्खनित मौर्य अवशेष सहित" },
      sources: [
        { source: "singh-ancient-india", locator: "chapters on early historic cities and the Kumhrar excavations" },
        {
          source: "reference-coordinates",
          locator: "Kumhrar site position taken separately as 85.148E, 25.586N",
          note: "The Mauryan pillared hall at Kumhrar is the specific excavated locus; the modern city is far larger than the ancient one.",
        },
      ],
    },
    description: {
      en:
        "The capital of Magadha from the later pre-Mauryan period through the Nanda, Maurya and much " +
        "of the Gupta period, and one of the largest cities of the ancient world. Its position is the " +
        "whole explanation: it stands where the Ganga is joined from the south by the Son, and it " +
        "commands both the river itself and the land route running along the southern bank. Control " +
        "of that junction meant control of movement between the upper and lower Ganga basin, of the " +
        "trade coming down the Son from the central Indian uplands, and of the crossing towards " +
        "Vaishali and north Bihar. Megasthenes describes it as a great city at the confluence of the " +
        "Ganges and the Eranboas (Son); Faxian, some seven centuries later, still admired its Mauryan " +
        "stone palace but found the city partly in ruins; Xuanzang, two centuries after that, found " +
        "it largely deserted. Those three accounts, read in sequence, are the single best documented " +
        "rise-and-decline of any city in this corridor.",
      hi:
        "मगध की राजधानी — उत्तर-मौर्य पूर्व काल से नंद, मौर्य और गुप्त काल के बहुतांश भाग तक — तथा " +
        "प्राचीन विश्व के विशालतम नगरों में से एक। इसका स्थान ही इसका पूर्ण स्पष्टीकरण है: यह वहीं " +
        "स्थित है जहाँ गंगा को दक्षिण से सोन मिलती है, और यह नदी तथा दक्षिणी तट के साथ चलने वाले " +
        "थलमार्ग दोनों को नियंत्रित करता है। इस संगम पर नियंत्रण का अर्थ था ऊपरी एवं निचले गंगा " +
        "बेसिन के बीच आवागमन, मध्य भारत के ऊँचे भागों से सोन के साथ आने वाले व्यापार, तथा वैशाली " +
        "और उत्तर बिहार की ओर जाने वाले मार्ग पर नियंत्रण। मेगस्थनीज़ इसे गंगा एवं एरानबोआस (सोन) के " +
        "संगम पर स्थित महानगर बताता है; फाह्यान सात शताब्दी बाद भी इसके मौर्य पाषाण प्रासाद की " +
        "प्रशंसा करता है पर नगर को आंशिक रूप से खंडहर पाता है; उसके दो सौ वर्ष बाद हुएनसांग इसे " +
        "प्रायः वीरान पाता है।",
    },
    relatedPlaces: ["place-rajagriha", "place-vaishali", "place-nalanda", "place-son-river", "place-ganga-river"],
    sources: [
      REF,
      { source: "megasthenes-indika", locator: "fragments preserved in Strabo Geographica XV and Arrian Indica", note: "Description of the city and the confluence." },
      { source: "faxian-record", locator: "account of Pataliputra and Ashoka's palace" },
      { source: "xuanzang-record", locator: "account of Mo-ho-la-ch'a / Pataliputra" },
      { source: "singh-ancient-india", locator: "chapters on early historic cities and Kumhrar" },
      { source: "ncert-tih-1", locator: "'Kings, Farmers and Towns'" },
    ],
    curriculum: [
      { level: "school", board: "CBSE", class: "12", subject: "history", book: "Themes in Indian History Part I", chapterRef: "Kings, Farmers and Towns", verifiedAgainst: "NCERT Class XII History chapter titles", verifiedDate: "2026-11-11" },
      { level: "school", board: "CBSE", class: "12", subject: "history", book: "Themes in Indian History Part II", chapterRef: "Through the Eyes of Travellers", verifiedAgainst: "NCERT Class XII History chapter titles", verifiedDate: "2026-11-11" },
      { level: "upsc", upscPaper: "gs1", concept: "Ancient Indian urbanisation; Mauryan administration" },
      { level: "upsc", upscPaper: "history-optional", concept: "Urban centres of early India; foreign travellers' accounts as sources" },
    ],
  },
  {
    id: "place-vaishali",
    canonicalName: { en: "Vaishali", hi: "वैशाली" },
    alternateNames: [
      { text: "Vesali", lang: "pi", script: "Pali", sources: [{ source: "thapar-early-india", locator: "chapters on gana-sanghas" }] },
    ],
    placeType: "city",
    geometry: { type: "Point", coordinates: [85.1326, 25.9878] },
    locationPrecisionKm: 2,
    elevationM: 50,
    modernEquivalent: {
      text: { en: "Vaishali (Basarh), Vaishali district, Bihar", hi: "वैशाली (बसरह), वैशाली ज़िला, बिहार" },
      sources: [{ source: "singh-ancient-india", locator: "chapters on early states and republican polities" }],
    },
    description: {
      en:
        "Capital of the Vajji (Vriji) confederacy, the best-documented gana-sangha — an oligarchic " +
        "republican polity rather than a monarchy — in the corridor. Vaishali lies north of the Ganga " +
        "on the plain between the river and the Himalayan foothills, on the route to the Gandak and " +
        "towards Nepal. The political contrast with Magadha is the point of the place: a confederacy " +
        "of clans deliberating in an assembly, immediately adjacent to a monarchy that was " +
        "consolidating power, and eventually defeated by it. Buddhist and Jain traditions both attach " +
        "strongly to it — the second Buddhist council is traditionally placed here.",
      hi:
        "वज्जि (वृजि) संघ की राजधानी — इस क्षेत्र में सबसे अधिक प्रमाणित गण-संघ, अर्थात एक " +
        "अल्पतंत्रीय गणतांत्रीय राजनीतिक व्यवस्था, न कि राजतंत्र। वैशाली गंगा के उत्तर में, नदी और " +
        "हिमालयी तराई के बीच के मैदान में, गंडक की ओर जाने वाले तथा नेपाल की दिशा के मार्ग पर स्थित " +
        "है। मगध से इसका राजनीतिक वैषम्य ही इस स्थान का महत्व है: कुलों का एक संघ जो सभा में विचार-विमर्श " +
        "करता था, ठीक उस राज्य के समीप जो अपनी शक्ति को केंद्रित कर रहा था और जिसने अंततः इसे पराजित किया।",
    },
    relatedPlaces: ["place-pataliputra", "place-gandak-river", "place-ganga-river"],
    sources: [
      REF,
      { source: "thapar-early-india", locator: "chapters on gana-sanghas and the Vajji confederacy" },
      { source: "singh-ancient-india", locator: "chapters on early states and republican polities" },
      { source: "ncert-tih-1", locator: "'Kings, Farmers and Towns'" },
    ],
    curriculum: [
      { level: "school", board: "CBSE", class: "12", subject: "history", chapterRef: "Kings, Farmers and Towns", verifiedAgainst: "NCERT Class XII History chapter titles", verifiedDate: "2026-11-11" },
      { level: "school", board: "CBSE", class: "6", subject: "social-science", concept: "Early republics and assemblies", verifiedAgainst: "NCERT Class VI Social Science treatment of early states", verifiedDate: "2026-11-11" },
      { level: "upsc", upscPaper: "gs1", concept: "Mahajanapadas; gana-sangha polity" },
    ],
  },
  {
    id: "place-nalanda",
    canonicalName: { en: "Nalanda Mahavihara", hi: "नालंदा महाविहार" },
    alternateNames: [{ text: "Nalanda", lang: "hi", script: "नालंदा", sources: [REF] }],
    placeType: "religious-site",
    geometry: { type: "Point", coordinates: [85.444, 25.1354] },
    locationPrecisionKm: 1,
    elevationM: 60,
    modernEquivalent: {
      text: { en: "Nalanda archaeological site, near Bihar Sharif, Nalanda district", hi: "नालंदा पुरातत्व स्थल, बिहार शरीफ के समीप, नालंदा ज़िला" },
      sources: [{ source: "xuanzang-record", locator: "account of Nalanda" }],
    },
    description: {
      en:
        "A great Buddhist monastic university that functioned for roughly eight centuries, from the " +
        "5th century CE until its destruction around the turn of the 13th century. It lies in the " +
        "hilly country south of the Ganga, a short distance north of Rajagriha, and was supported by " +
        "endowments of villages whose revenue fed it. Xuanzang describes thousands of monks and a " +
        "rigorous entrance examination; later Tibetan tradition preserves accounts of its libraries " +
        "burning for months. It is one of the corridor's few places where the textual record and " +
        "large-scale excavated remains can be compared directly.",
      hi:
        "एक विशाल बौद्ध monastic विश्वविद्यालय जो लगभग आठ शताब्दियों तक — ५वीं शताब्दी ईसवी से " +
        "लगभग १३वीं शताब्दी के आरंभ में इसके विनाश तक — कार्यरत रहा। यह गंगा के दक्षिण में पहाड़ी " +
        "क्षेत्र में, राजगृह से कुछ ही दूर उत्तर में स्थित है, और गाँवों की दान-भूमि से प्राप्त राजस्व " +
        "इसे पोषित करते थे। हुआनसांग यहाँ हज़ारों भिक्षुओं एवं कठोर प्रवेश-परीक्षा का वर्णन करता है; " +
        "परवर्ती तिब्बती परंपरा इसके पुस्तकालयों के महीनों जलने का उल्लेख सुरक्षित रखती है।",
    },
    relatedPlaces: ["place-rajagriha", "place-odantapuri", "place-vikramshila"],
    sources: [
      REF,
      { source: "xuanzang-record", locator: "account of Nalanda monastery" },
      { source: "tabaqat-i-nasiri", locator: "account of the destruction of the monasteries of Bihar", note: "Written decades after the event by a non-eyewitness; see the event record." },
      { source: "ncert-tih-2", locator: "'Through the Eyes of Travellers'" },
    ],
    curriculum: [
      { level: "school", board: "CBSE", class: "12", subject: "history", chapterRef: "Through the Eyes of Travellers", verifiedAgainst: "NCERT Class XII History chapter titles", verifiedDate: "2026-11-11" },
      { level: "upsc", upscPaper: "gs1", concept: "Ancient centres of learning; Buddhism and its institutions" },
    ],
  },
  {
    id: "place-bodhgaya",
    canonicalName: { en: "Bodh Gaya", hi: "बोधगया" },
    alternateNames: [
      { text: "Sambodhi / Uruvela", lang: "pi", sources: [{ source: "singh-ancient-india", locator: "chapters on Buddhism and its sacred geography" }] },
    ],
    placeType: "religious-site",
    geometry: { type: "Point", coordinates: [84.9911, 24.6961] },
    locationPrecisionKm: 1,
    elevationM: 106,
    description: {
      en:
        "The site of the Buddha's enlightenment, on the bank of the Niranjana (Phalgu), a seasonal " +
        "river that joins the Ganga system further north. The Mahabodhi temple complex marks it. Its " +
        "position south of the Ganga plain, at the edge of the rocky uplands near Gaya, places it on " +
        "the same north-south axis as Rajagriha — a route that mattered for the movement of monks, " +
        "pilgrims and goods between the plain and the peninsular uplands.",
      hi:
        "बुद्ध के ज्ञान-प्राप्ति का स्थान, निरंजना (फल्गु) नदी के तट पर — एक मौसमी नदी जो उत्तर में " +
        "आगे चलकर गंगा तंत्र से मिलती है। महाबोधि मंदिर परिसर इसकी पहचान करता है। गंगा मैदान के " +
        "दक्षिण में, गया के समीप चट्टानी ऊँचे भाग के किनारे इसका स्थान इसे राजगृह के समान ही " +
        "उत्तर-दक्षिण अक्ष पर रखता है।",
    },
    relatedPlaces: ["place-rajagriha", "place-gaya", "place-sarnath"],
    sources: [REF, { source: "singh-ancient-india", locator: "chapters on Buddhism and its sacred geography" }, { source: "ncert-tih-1", locator: "'Kings, Farmers and Towns'" }],
    curriculum: [{ level: "school", board: "CBSE", class: "12", subject: "history", chapterRef: "Kings, Farmers and Towns", verifiedAgainst: "NCERT Class XII History chapter titles", verifiedDate: "2026-11-11" }],
  },
  {
    id: "place-sarnath",
    canonicalName: { en: "Sarnath", hi: "सारनाथ" },
    alternateNames: [
      { text: "Isipatana / Rishivadana", lang: "pi", sources: [{ source: "singh-ancient-india", locator: "chapters on Buddhism" }] },
      { text: "Mrigadava (Deer Park)", lang: "sa", sources: [{ source: "singh-ancient-india", locator: "chapters on Buddhism" }] },
    ],
    placeType: "religious-site",
    geometry: { type: "Point", coordinates: [83.0247, 25.3811] },
    locationPrecisionKm: 1,
    elevationM: 71,
    description: {
      en:
        "Where the Buddha is held to have delivered his first sermon, about ten kilometres from " +
        "Varanasi on the Ganga's northern side. The excavated Ashokan lion capital found here was " +
        "adopted as the national emblem of India, which makes this one of the few places in the " +
        "corridor where an ancient object has a direct, documented line to a modern state symbol.",
      hi:
        "जहाँ बुद्ध ने अपना प्रथम उपदेश दिया माना जाता है — वाराणसी से लगभग दस किलोमीटर, गंगा के " +
        "उत्तरी ओर। यहाँ से प्राप्त उत्खनित अशोकीय सिंह-शीर्ष को भारत का राष्ट्रीय प्रतीक अपनाया " +
        "गया, जिससे यह इस क्षेत्र के उन कुछ स्थानों में से एक है जहाँ किसी प्राचीन वस्तु से आधुनिक " +
        "राज्य-प्रतीक तक की सीधी एवं प्रमाणित रेखा खिंची जा सकती है।",
    },
    relatedPlaces: ["place-varanasi", "place-bodhgaya"],
    sources: [REF, { source: "singh-ancient-india", locator: "chapters on Buddhism and the Mauryas" }, { source: "ncert-tih-1", locator: "'Kings, Farmers and Towns'" }],
    curriculum: [{ level: "school", board: "CBSE", class: "12", subject: "history", chapterRef: "Kings, Farmers and Towns", verifiedAgainst: "NCERT Class XII History chapter titles", verifiedDate: "2026-11-11" }],
  },
  {
    id: "place-varanasi",
    canonicalName: { en: "Varanasi", hi: "वाराणसी" },
    alternateNames: [
      { text: "Kashi / Kasi", lang: "sa", sources: [{ source: "thapar-early-india", locator: "chapters on the Mahajanapadas" }] },
      { text: "Banaras / Benares", lang: "en", sources: [{ source: "reference-coordinates", locator: "colonial and later English usage" }] },
    ],
    placeType: "city",
    geometry: { type: "Point", coordinates: [82.9739, 25.3176] },
    locationPrecisionKm: 3,
    elevationM: 81,
    description: {
      en:
        "The centre of the Kashi janapada and one of the oldest continuously inhabited cities in the " +
        "world, on the Ganga's left bank between the Varuna and the Assi. Its ghats are an unusually " +
        "clear example of a physical feature — a river bank and its flood regime — being turned into " +
        "a built, ritual landscape over centuries. It also sits on the corridor's main east-west " +
        "riverine and land axis, which is why it has been a commercial as well as a religious centre.",
      hi:
        "काशी जनपद का केंद्र तथा विश्व के सबसे पुराने निरंतर बसे नगरों में से एक — गंगा के बाएँ तट " +
        "पर, वरुणा एवं असि के बीच। इसके घाट इस बात का असाधारण स्पष्ट उदाहरण हैं कि किसी भौतिक विशेषता " +
        "— नदी तट एवं उसके बाढ़-शासन — को शताब्दियों में कैसे निर्मित, अनुष्ठानिक परिदृश्य में बदला " +
        "गया। यह क्षेत्र की मुख्य पूर्व-पश्चिम नदीय एवं थल धुरी पर भी स्थित है।",
    },
    relatedPlaces: ["place-sarnath", "place-ganga-river", "place-kaushambi"],
    sources: [REF, { source: "thapar-early-india", locator: "chapters on the Mahajanapadas and early cities" }, { source: "ncert-tih-1", locator: "'Kings, Farmers and Towns'" }],
    curriculum: [
      { level: "school", board: "CBSE", class: "12", subject: "geography", book: "India — People and Economy", chapterRef: "Human Settlements", verifiedAgainst: "NCERT Class XII Geography chapter titles", verifiedDate: "2026-11-11" },
      { level: "upsc", upscPaper: "gs1", concept: "Urbanisation; cultural geography of the Ganga" },
    ],
  },
  {
    id: "place-kushinagar",
    canonicalName: { en: "Kushinagar", hi: "कुशीनगर" },
    alternateNames: [{ text: "Kusinara", lang: "pi", sources: [{ source: "singh-ancient-india", locator: "chapters on Buddhism" }] }],
    placeType: "religious-site",
    geometry: { type: "Point", coordinates: [83.8897, 26.7397] },
    locationPrecisionKm: 2,
    elevationM: 79,
    description: {
      en:
        "Capital region of the Malla republic and, in Buddhist tradition, the place of the Buddha's " +
        "mahaparinibbana. It lies north of the Ganga on the plain draining towards the Gandak and " +
        "Ghaghara, on the route that ran north-west from Pataliputra and Vaishali towards the " +
        "Himalayan foothills.",
      hi:
        "मल्ल गणराज्य का राजधानी क्षेत्र तथा बौद्ध परंपरा में बुद्ध के महापरिनिर्वाण का स्थान। यह " +
        "गंगा के उत्तर में उस मैदान पर स्थित है जो गंडक एवं घाघरा की ओर अपवाहित होता है, तथा उस मार्ग " +
        "पर है जो पाटलिपुत्र एवं वैशाली से उत्तर-पश्चिम की ओर हिमालयी तराई तक जाता था।",
    },
    relatedPlaces: ["place-vaishali", "place-gandak-river", "place-ghaghara-river"],
    sources: [REF, { source: "singh-ancient-india", locator: "chapters on Buddhism and the Mallas" }],
    curriculum: [{ level: "school", board: "CBSE", class: "12", subject: "history", chapterRef: "Kings, Farmers and Towns", verifiedAgainst: "NCERT Class XII History chapter titles", verifiedDate: "2026-11-11" }],
  },
  {
    id: "place-shravasti",
    canonicalName: { en: "Shravasti", hi: "श्रावस्ती" },
    alternateNames: [{ text: "Savatthi", lang: "pi", sources: [{ source: "singh-ancient-india", locator: "chapters on early cities" }] }],
    placeType: "archaeological-site",
    geometry: { type: "Point", coordinates: [82.04, 27.51] },
    locationPrecisionKm: 2,
    elevationM: 118,
    modernEquivalent: {
      text: { en: "Sahet-Mahet, on the Uttar Pradesh side of the Rapti", hi: "साहेत-माहेत, राप्ती नदी के उत्तर प्रदेश पार्श्व पर" },
      sources: [{ source: "singh-ancient-india", locator: "chapters on early cities and the Kosalas" }],
    },
    description: {
      en:
        "Capital of Kosala, on the Rapti in the terai-margin plain north of the Ganga. It is one of " +
        "the largest early historic urban sites in north India, and both the Buddha and Mahavira are " +
        "recorded as having spent long periods here. Its position shows the pattern clearly: a major " +
        "city on a Himalayan tributary, connected to the Ganga axis by north-south routes.",
      hi:
        "कोसल की राजधानी, गंगा के उत्तर में तराई-सीमांत मैदान में राप्ती नदी पर स्थित। यह उत्तर भारत " +
        "के विशालतम प्रारंभिक ऐतिहासिक नगरीय स्थलों में से एक है, और बुद्ध एवं महावीर दोनों के यहाँ " +
        "दीर्घ काल रहने के प्रमाण मिलते हैं।",
    },
    relatedPlaces: ["place-vaishali", "place-kushinagar"],
    sources: [REF, { source: "singh-ancient-india", locator: "chapters on early cities and the Kosalas" }],
    curriculum: [{ level: "school", board: "CBSE", class: "12", subject: "history", chapterRef: "Kings, Farmers and Towns", verifiedAgainst: "NCERT Class XII History chapter titles", verifiedDate: "2026-11-11" }],
  },
  {
    id: "place-kaushambi",
    canonicalName: { en: "Kaushambi", hi: "कौशाम्बी" },
    placeType: "archaeological-site",
    geometry: { type: "Point", coordinates: [81.3761, 25.3373] },
    locationPrecisionKm: 2,
    elevationM: 87,
    description: {
      en:
        "Capital of the Vatsa janapada, on the Yamuna downstream of Prayaga. Its ramparts and an " +
        "Ashokan pillar survive. It is the clearest case in the corridor of a major city on the " +
        "Yamuna rather than the Ganga, which matters because the two rivers are the corridor's twin " +
        "axes and are often conflated.",
      hi:
        "वत्स जनपद की राजधानी, प्रयाग के downstream यमुना पर स्थित। इसकी किलाबंदी एवं एक अशोकीय स्तंभ " +
        "आज भी विद्यमान हैं। यह इस क्षेत्र में यमुना — न कि गंगा — पर बसे प्रमुख नगर का सबसे स्पष्ट " +
        "उदाहरण है।",
    },
    relatedPlaces: ["place-prayagraj", "place-mathura", "place-yamuna-river"],
    sources: [REF, { source: "singh-ancient-india", locator: "chapters on early cities and the Vatsas" }],
    curriculum: [{ level: "school", board: "CBSE", class: "12", subject: "history", chapterRef: "Kings, Farmers and Towns", verifiedAgainst: "NCERT Class XII History chapter titles", verifiedDate: "2026-11-11" }],
  },
  {
    id: "place-mathura",
    canonicalName: { en: "Mathura", hi: "मथुरा" },
    placeType: "city",
    geometry: { type: "Point", coordinates: [77.6737, 27.4924] },
    locationPrecisionKm: 2,
    elevationM: 174,
    description: {
      en:
        "Centre of the Surasena janapada, on the Yamuna. It later became a major Kushan provincial " +
        "capital and one of the two great schools of early Indian sculpture, alongside Gandhara. Its " +
        "position on the Yamuna at the head of the routes running west to the Punjab and south-west " +
        "to the Malwa plateau makes it a node rather than a periphery, and the Kushan material found " +
        "here is direct evidence of the corridor's connection to Central Asian trade.",
      hi:
        "शूरसेन जनपद का केंद्र, यमुना पर स्थित। यह परवर्ती काल में एक प्रमुख कुषाण प्रादेशिक राजधानी " +
        "एवं गंधार के साथ प्रारंभिक भारतीय मूर्तिकला के दो महान स्कूलों में से एक बना। पंजाब की ओर " +
        "पश्चिम तथा मालवा पठार की ओर दक्षिण-पश्चिम जाने वाले मार्गों के शीर्ष पर यमुना पर इसका स्थान " +
        "इसे परिधि नहीं बल्कि एक केंद्र-बिंदु बनाता है।",
    },
    relatedPlaces: ["place-indraprastha", "place-yamuna-river", "place-kaushambi"],
    sources: [REF, { source: "singh-ancient-india", locator: "chapters on the Kushans and early sculpture" }],
    curriculum: [{ level: "school", board: "CBSE", class: "12", subject: "history", chapterRef: "Kings, Farmers and Towns", verifiedAgainst: "NCERT Class XII History chapter titles", verifiedDate: "2026-11-11" }],
  },
  {
    id: "place-indraprastha",
    canonicalName: { en: "Indraprastha", hi: "इंद्रप्रस्थ" },
    alternateNames: [
      { text: "Delhi", lang: "en", sources: [REF] },
      { text: "Yoginipura / Dilli", lang: "sa", sources: [{ source: "reference-coordinates", locator: "medieval names of the same locality" }] },
    ],
    placeType: "city",
    geometry: { type: "Point", coordinates: [77.2467, 28.6062] },
    locationPrecisionKm: 4,
    elevationM: 216,
    modernEquivalent: {
      text: { en: "The Purana Qila area of modern Delhi", hi: "आधुनिक दिल्ली का पुराना क़िला क्षेत्र" },
      sources: [
        {
          source: "atlas-editorial-unsourced",
          locator: "identification of Indraprastha with the Purana Qila site",
          note:
            "This identification is traditional and widely repeated, and excavations at Purana Qila " +
            "have produced early historic material — but the strength of the link between the epic " +
            "city and this specific site is NOT established to the standard this platform requires. " +
            "Shown as an unsourced claim on purpose.",
        },
      ],
    },
    description: {
      en:
        "The Kuru region's principal centre, on the Yamuna at the crossing of the routes between the " +
        "Ganga doab and the north-west. What makes Indraprastha pedagogically useful is its " +
        "epistemic status: it is known chiefly from the Mahabharata tradition, its location is " +
        "identified by long-standing tradition rather than by decisive evidence, and the city that " +
        "grew on the same ground — Delhi — has been rebuilt many times. It is the corridor's best " +
        "teaching case for separating literary tradition from archaeological demonstration.",
      hi:
        "कुरु क्षेत्र का प्रमुख केंद्र, गंगा दोआब एवं उत्तर-पश्चिम के बीच के मार्गों के संगम पर यमुना के " +
        "तट पर। इंद्रप्रस्थ शैक्षणिक दृष्टि से इसलिए उपयोगी है क्योंकि इसकी ज्ञान-स्थिति ही प्रश्न है: " +
        "यह मुख्यतः महाभारत परंपरा से ज्ञात है, इसका स्थान निर्णायक प्रमाण से नहीं बल्कि दीर्घकालिक " +
        "परंपरा से पहचाना जाता है, और उसी भूमि पर बसा नगर — दिल्ली — कई बार बसाया एवं उजाड़ा गया है।",
    },
    relatedPlaces: ["place-mathura", "place-yamuna-river"],
    sources: [REF, { source: "singh-ancient-india", locator: "chapters on the later Vedic period and the Kurus" }],
    curriculum: [{ level: "school", board: "CBSE", class: "12", subject: "history", chapterRef: "Kings, Farmers and Towns", verifiedAgainst: "NCERT Class XII History chapter titles", verifiedDate: "2026-11-11" }],
  },
  {
    id: "place-champa",
    canonicalName: { en: "Champa", hi: "चम्पा" },
    alternateNames: [
      { text: "Champanagari", lang: "sa", sources: [{ source: "thapar-early-india", locator: "chapters on the Mahajanapadas" }] },
      { text: "Bhagalpur", lang: "hi", script: "भागलपुर", sources: [REF] },
    ],
    placeType: "administrative-centre",
    geometry: { type: "Point", coordinates: [86.9853, 25.1895] },
    locationPrecisionKm: 3,
    elevationM: 45,
    modernEquivalent: {
      text: { en: "Champanagar, near Bhagalpur, Bihar", hi: "चम्पानगर, भागलपुर के समीप, बिहार" },
      sources: [{ source: "thapar-early-india", locator: "chapters on the Mahajanapadas" }],
    },
    description: {
      en:
        "Capital of the Anga janapada, on the Ganga's southern bank near where the Vikramshila " +
        "monastery later stood, and close to the point where the river turns from a broadly " +
        "west-east course towards the delta. Anga was absorbed by Magadha, and Champa thereafter " +
        "served as a base for eastward expansion and for river trade towards Bengal.",
      hi:
        "अंग जनपद की राजधानी, गंगा के दक्षिणी तट पर, जहाँ बाद में विक्रमशिला विहार स्थित हुआ, तथा " +
        "उस बिंदु के समीप जहाँ नदी अपनी प्रायः पश्चिम-पूर्व धारा से डेल्टा की ओर मुड़ती है। अंग को " +
        "मगध ने अपने में मिला लिया, और तत्पश्चात चम्पा पूर्व की ओर विस्तार एवं बंगाल तक नदी-व्यापार " +
        "का आधार बना।",
    },
    relatedPlaces: ["place-vikramshila", "place-ganga-river", "place-mahasthangarh"],
    sources: [REF, { source: "thapar-early-india", locator: "chapters on the Mahajanapadas and Magadha's expansion" }],
    curriculum: [{ level: "school", board: "CBSE", class: "12", subject: "history", chapterRef: "Kings, Farmers and Towns", verifiedAgainst: "NCERT Class XII History chapter titles", verifiedDate: "2026-11-11" }],
  },

  // ===========================================================================
  // THE GANGA SYSTEM — physical geography spine of the pilot
  // ===========================================================================
  {
    id: "place-gaumukh",
    canonicalName: { en: "Gaumukh", hi: "गोमुख" },
    placeType: "river-confluence",
    geometry: { type: "Point", coordinates: [79.08, 30.9361] },
    locationPrecisionKm: 2,
    elevationM: 4000,
    description: {
      en:
        "The snout of the Gangotri glacier, from which the Bhagirathi issues. It is the conventional " +
        "source of the Ganga. The ~4,000 m elevation here versus ~50 m at Patna, over roughly 900 km " +
        "of river course, is the single number that explains the corridor: an enormous sediment load " +
        "carried down a very gentle gradient into a very flat plain.",
      hi:
        "गंगोत्री हिमनद का अग्रभाग, जहाँ से भागीरथी निकलती है। इसे परंपरागत रूप से गंगा का उद्गम " +
        "माना जाता है। यहाँ की लगभग ४,००० मीटर ऊँचाई एवं पटना पर लगभग ५० मीटर, लगभग ९०० किमी की " +
        "नदी-धारा में — यही एक संख्या पूरे क्षेत्र को समझाती है: अत्यंत मंद ढाल पर एक विशाल समतल " +
        "मैदान में ले जाया गया अपार अवसाद भार।",
    },
    relatedPlaces: ["place-devprayag", "place-gangotri", "place-ganga-river"],
    sources: [REF, { source: "ncert-india-physical", locator: "Ch 3 'Drainage System'" }],
    curriculum: [
      { level: "school", board: "CBSE", class: "11", subject: "geography", book: "India — Physical Environment", chapterRef: "Drainage System", verifiedAgainst: "NCERT Class XI Geography chapter titles", verifiedDate: "2026-11-11", registryTopicId: "c11-ind-ch3" },
      { level: "upsc", upscPaper: "geography-optional", concept: "Himalayan drainage; river capture and glacial sources" },
    ],
  },
  {
    id: "place-gangotri",
    canonicalName: { en: "Gangotri", hi: "गंगोत्री" },
    placeType: "religious-site",
    geometry: { type: "Point", coordinates: [78.94, 30.9946] },
    locationPrecisionKm: 2,
    elevationM: 3100,
    sources: [REF, { source: "ncert-india-physical", locator: "Ch 3 'Drainage System'" }],
    curriculum: [{ level: "school", board: "CBSE", class: "11", subject: "geography", chapterRef: "Drainage System", registryTopicId: "c11-ind-ch3", verifiedAgainst: "NCERT Class XI Geography chapter titles", verifiedDate: "2026-11-11" }],
  },
  {
    id: "place-devprayag",
    canonicalName: { en: "Devprayag", hi: "देवप्रयाग" },
    placeType: "river-confluence",
    geometry: { type: "Point", coordinates: [78.615, 30.1458] },
    locationPrecisionKm: 1,
    elevationM: 618,
    description: {
      en:
        "Where the Bhagirathi and the Alaknanda meet and the river is thereafter called the Ganga. The " +
        "confluence is in a steep, narrow gorge — a completely different physical world from the " +
        "plain 400 km downstream, and a useful contrast for teaching how the same river behaves " +
        "differently in its upper, middle and lower courses.",
      hi:
        "जहाँ भागीरथी एवं अलकनंदा मिलती हैं और तत्पश्चात नदी को गंगा कहा जाता है। यह संगम एक तीव्र, " +
        "संकीर्ण गर्ज में है — नीचे मैदान की तुलना में पूर्णतः भिन्न भौतिक संसार, और यह समझाने हेतु " +
        "उपयोगी विषमता है कि एक ही नदी अपनी ऊपरी, मध्य एवं निचली धारा में भिन्न व्यवहार करती है।",
    },
    relatedPlaces: ["place-gaumukh", "place-haridwar"],
    sources: [REF, { source: "ncert-india-physical", locator: "Ch 3 'Drainage System'" }],
    curriculum: [{ level: "school", board: "CBSE", class: "11", subject: "geography", chapterRef: "Drainage System", registryTopicId: "c11-ind-ch3", verifiedAgainst: "NCERT Class XI Geography chapter titles", verifiedDate: "2026-11-11" }],
  },
  {
    id: "place-haridwar",
    canonicalName: { en: "Haridwar", hi: "हरिद्वार" },
    placeType: "city",
    geometry: { type: "Point", coordinates: [78.1642, 29.9457] },
    locationPrecisionKm: 2,
    elevationM: 249,
    description: {
      en:
        "Where the Ganga leaves the Himalayan foothills and enters the Gangetic plain. This is the " +
        "physically decisive point in the whole corridor: the river's gradient drops abruptly, its " +
        "capacity to carry sediment collapses, and it begins to deposit. Everything downstream — the " +
        "alluvial plain, its soils, its agriculture, its cities, and therefore Magadha — follows from " +
        "this one transition.",
      hi:
        "जहाँ गंगा हिमालयी तराई छोड़कर गंगा मैदान में प्रवेश करती है। यह संपूर्ण क्षेत्र का भौतिक दृष्टि " +
        "से निर्णायक बिंदु है: नदी की ढाल अचानक गिरती है, अवसाद ले जाने की उसकी क्षमता ढह जाती है, और " +
        "वह निक्षेपण आरंभ करती है। इसके नीचे की सब कुछ — जलोढ़ मैदान, उसकी मिट्टी, उसकी कृषि, उसके " +
        "नगर, और इसलिए मगध — इसी एक संक्रमण से निकलता है।",
    },
    relatedPlaces: ["place-devprayag", "place-ganga-river"],
    sources: [REF, { source: "ncert-india-physical", locator: "Ch 2 'Physiography' and Ch 3 'Drainage System'" }],
    curriculum: [
      { level: "school", board: "CBSE", class: "11", subject: "geography", chapterRef: "Physiography", registryTopicId: "c11-ind-ch2", verifiedAgainst: "NCERT Class XI Geography chapter titles", verifiedDate: "2026-11-11" },
      { level: "school", board: "CBSE", class: "11", subject: "geography", chapterRef: "Drainage System", registryTopicId: "c11-ind-ch3", verifiedAgainst: "NCERT Class XI Geography chapter titles", verifiedDate: "2026-11-11" },
    ],
  },
  {
    id: "place-prayagraj",
    canonicalName: { en: "Prayagraj", hi: "प्रयागराज" },
    alternateNames: [
      { text: "Prayaga", lang: "sa", sources: [{ source: "prayaga-prashasti", locator: "the pillar itself stands here" }] },
      { text: "Allahabad", lang: "ur", script: "الٰہ آباد / इलाहाबाद", sources: [{ source: "reference-coordinates", locator: "Mughal and later name; renamed 2018" }] },
    ],
    placeType: "river-confluence",
    geometry: { type: "Point", coordinates: [81.8463, 25.4358] },
    locationPrecisionKm: 2,
    elevationM: 98,
    description: {
      en:
        "The Ganga-Yamuna confluence — the Prayaga of the inscriptions, on which stands the pillar " +
        "carrying Ashoka's edicts, Samudragupta's panegyric and a Mughal Persian inscription. Three " +
        "empires wrote on one stone at one river junction. It is also where the corridor's two river " +
        "axes meet, and where the Doab's agricultural surplus enters the Ganga system.",
      hi:
        "गंगा-यमुना संगम — लेखों का प्रयाग, जहाँ वह स्तंभ स्थित है जिस पर अशोक के अभिलेख, समुद्रगुप्त " +
        "की प्रशस्ति एवं एक मुग़ल फ़ारसी अभिलेख अंकित हैं। तीन साम्राज्यों ने एक नदी-संगम पर एक ही " +
        "पाषाण पर लिखा। यहीं क्षेत्र की दोनों नदीय धुरियाँ मिलती हैं।",
    },
    relatedPlaces: ["place-ganga-river", "place-yamuna-river", "place-kaushambi"],
    sources: [REF, { source: "prayaga-prashasti", locator: "the pillar at the confluence" }, { source: "ncert-india-physical", locator: "Ch 3 'Drainage System'" }],
    curriculum: [
      { level: "school", board: "CBSE", class: "12", subject: "history", chapterRef: "Kings, Farmers and Towns", verifiedAgainst: "NCERT Class XII History chapter titles", verifiedDate: "2026-11-11" },
      { level: "upsc", upscPaper: "gs1", concept: "Inscriptional evidence; river confluences as political sites" },
    ],
  },
  {
    id: "place-sonpur-confluence",
    canonicalName: { en: "Ganga-Gandak confluence (Sonpur / Hajipur)", hi: "गंगा-गंडक संगम (सोनपुर / हाजीपुर)" },
    placeType: "river-confluence",
    geometry: { type: "Point", coordinates: [85.1833, 25.7] },
    locationPrecisionKm: 3,
    description: {
      en:
        "Where the Gandak, coming south from the Himalaya, joins the Ganga — directly opposite the " +
        "Pataliputra reach of the river. This junction is why Pataliputra mattered: the Gandak opens " +
        "a route north into the terai and towards Nepal, and the Ganga runs east-west. A capital " +
        "placed here controls a crossroads of water.",
      hi:
        "जहाँ हिमालय से दक्षिण आती गंडक गंगा से मिलती है — ठीक नदी के पाटलिपुत्र खंड के सामने। यह संगम " +
        "ही पाटलिपुत्र के महत्व का कारण है: गंडक उत्तर में तराई एवं नेपाल की ओर मार्ग खोलती है, और गंगा " +
        "पूर्व-पश्चिम चलती है। यहाँ स्थित राजधानी जल का एक चौराहा नियंत्रित करती है।",
    },
    relatedPlaces: ["place-pataliputra", "place-gandak-river", "place-vaishali"],
    sources: [REF, { source: "ncert-india-physical", locator: "Ch 3 'Drainage System'" }],
    curriculum: [{ level: "school", board: "CBSE", class: "11", subject: "geography", chapterRef: "Drainage System", registryTopicId: "c11-ind-ch3", verifiedAgainst: "NCERT Class XI Geography chapter titles", verifiedDate: "2026-11-11" }],
  },
  {
    id: "place-farakka",
    canonicalName: { en: "Farakka", hi: "फरक्का" },
    placeType: "administrative-centre",
    geometry: { type: "Point", coordinates: [87.9294, 24.7988] },
    locationPrecisionKm: 2,
    elevationM: 24,
    description: {
      en:
        "The point where the Ganga enters West Bengal and, since the barrage commissioned in 1975, " +
        "the point where a substantial part of its dry-season flow is diverted into the Hooghly " +
        "distributary. Downstream of here the river divides into the Padma and the Hooghly and the " +
        "delta proper begins. Farakka is the corridor's best example of modern human geography " +
        "intervening in a physical system, and of that intervention being contested between states " +
        "and between countries.",
      hi:
        "वह बिंदु जहाँ गंगा पश्चिम बंगाल में प्रवेश करती है, और १९७५ में चालू हुए बैराज के बाद से, " +
        "जहाँ उसके शुष्क-मौसमी प्रवाह का पर्याप्त भाग हुगली वितरिका में मोड़ा जाता है। इसके नीचे नदी " +
        "पद्मा एवं हुगली में बँटती है और वास्तविक डेल्टा आरंभ होता है।",
    },
    relatedPlaces: ["place-sundarbans", "place-ganga-river"],
    sources: [
      REF,
      { source: "ncert-india-physical", locator: "Ch 3 'Drainage System' (delta and distributaries)" },
      {
        source: "atlas-editorial-unsourced",
        locator: "commissioning year of the Farakka Barrage and its diversion volumes",
        note: "The 1975 commissioning date is widely recorded, but the specific diversion volumes and the current sharing arrangement were not verified against a primary document during this pilot.",
      },
    ],
    curriculum: [
      { level: "school", board: "CBSE", class: "12", subject: "geography", book: "India — People and Economy", chapterRef: "Water Resources", verifiedAgainst: "NCERT Class XII Geography chapter titles", verifiedDate: "2026-11-11" },
      { level: "upsc", upscPaper: "gs1", concept: "Inter-state and trans-boundary water sharing" },
      { level: "upsc", upscPaper: "gs3", concept: "Water resource management; infrastructure" },
    ],
  },
  {
    id: "place-sundarbans",
    canonicalName: { en: "Sundarbans delta", hi: "सुंदरबन डेल्टा" },
    placeType: "region",
    geometry: { type: "Point", coordinates: [89.1833, 21.9497] },
    locationPrecisionKm: 20,
    description: {
      en:
        "The world's largest delta, built by the Ganga-Brahmaputra-Meghna system, and the corridor's " +
        "end point. Everything the river eroded in the Himalaya since the uplift began is, in effect, " +
        "here — and still moving. The delta's active subsidence, its tidal range, its mangrove " +
        "ecology and its extreme cyclone exposure make it the clearest place in the pilot to see " +
        "physical process and human settlement in continuous negotiation.",
      hi:
        "विश्व का विशालतम डेल्टा, गंगा-ब्रह्मपुत्र-मेघना तंत्र द्वारा निर्मित, तथा इस क्षेत्र का अंतिम " +
        "बिंदु। हिमालय के उत्थान के बाद से नदी ने जो कुछ अपरदित किया वह प्रभावी रूप से यहीं है — और " +
        "अभी भी चल रहा है। डेल्टा का सक्रिय अवसादन, उसकी ज्वारीय परास, मैंग्रोव पारिस्थितिकी एवं " +
        "अत्यंत चक्रवात-प्रवणता इसे पायलट में भौतिक प्रक्रिया एवं मानव बस्ती की निरंतर वार्ता देखने " +
        "का सबसे स्पष्ट स्थान बनाते हैं।",
    },
    relatedPlaces: ["place-farakka", "place-ganga-river", "place-tamralipta"],
    sources: [
      REF,
      { source: "ncert-fundamentals-physical", locator: "chapters on fluvial geomorphology: deltas and floodplains" },
      { source: "ncert-india-physical", locator: "Ch 3 'Drainage System'" },
    ],
    curriculum: [
      { level: "school", board: "CBSE", class: "11", subject: "geography", book: "Fundamentals of Physical Geography", chapterRef: "Fluvial landforms; deltas", verifiedAgainst: "NCERT Class XI Geography chapter titles", verifiedDate: "2026-11-11" },
      { level: "school", board: "CBSE", class: "12", subject: "geography", book: "India — People and Economy", chapterRef: "Human Settlements", verifiedAgainst: "NCERT Class XII Geography chapter titles", verifiedDate: "2026-11-11" },
      { level: "upsc", upscPaper: "geography-optional", concept: "Deltaic geomorphology; coastal hazards" },
    ],
  },
  {
    id: "place-tamralipta",
    canonicalName: { en: "Tamralipta", hi: "ताम्रलिप्ति" },
    alternateNames: [{ text: "Tamluk", lang: "bn", script: "তমলুক", sources: [REF] }],
    placeType: "port",
    geometry: { type: "Point", coordinates: [87.9242, 22.3039] },
    locationPrecisionKm: 2,
    elevationM: 6,
    description: {
      en:
        "An ancient port on the Rupnarayan-Hooghly, from which maritime trade ran south-east to Sri " +
        "Lanka and South-East Asia. Faxian and Xuanzang both mention it. Its importance, and its " +
        "decline, are both deltaic: a port on an actively building and shifting delta is eventually " +
        "left inland by the sediment it depended on. That is the corridor's clearest case of a " +
        "physical process ending a commercial centre.",
      hi:
        "रूपनारायण-हुगली पर स्थित एक प्राचीन पत्तन, जहाँ से समुद्री व्यापार दक्षिण-पूर्व में श्रीलंका " +
        "एवं दक्षिण-पूर्व एशिया तक जाता था। फाह्यान एवं हुआनसांग दोनों इसका उल्लेख करते हैं। इसका " +
        "महत्व तथा इसका ह्रास — दोनों ही डेल्टाई हैं: सक्रिय रूप से बनते एवं खिसकते डेल्टा पर स्थित " +
        "पत्तन अंततः उसी अवसाद द्वारा स्थल में छोड़ दिया जाता है जिस पर वह निर्भर था।",
    },
    relatedPlaces: ["place-sundarbans", "place-farakka"],
    sources: [REF, { source: "faxian-record", locator: "account of Tamralipti" }, { source: "xuanzang-record", locator: "account of Tamralipti" }, { source: "singh-ancient-india", locator: "chapters on early trade networks" }],
    curriculum: [{ level: "school", board: "CBSE", class: "12", subject: "history", chapterRef: "Through the Eyes of Travellers", verifiedAgainst: "NCERT Class XII History chapter titles", verifiedDate: "2026-11-11" }],
  },
  {
    id: "place-mahasthangarh",
    canonicalName: { en: "Mahasthangarh", hi: "महास्थानगढ़" },
    alternateNames: [{ text: "Pundranagara / Pundravardhana", lang: "sa", sources: [{ source: "singh-ancient-india", locator: "chapters on early urban sites in eastern India" }] }],
    placeType: "archaeological-site",
    geometry: { type: "Point", coordinates: [89.35, 24.9667] },
    locationPrecisionKm: 1,
    elevationM: 36,
    description: {
      en:
        "The earliest urban site so far identified in Bengal, with occupation reaching back to the " +
        "pre-Mauryan centuries and continuing for well over a millennium. A Brahmi inscription found " +
        "here records a grant for the relief of distress, and is among the earliest epigraphic " +
        "evidence for administration this far east. It marks the eastern limit of Magadhan and " +
        "Mauryan political reach in the pilot.",
      hi:
        "बंगाल में अब तक पहचाना गया सबसे प्राचीन नगरीय स्थल, जिसकी बस्ती मौर्य-पूर्व शताब्दियों तक " +
        "जाती है और एक सहस्राब्दी से अधिक तक चलती है। यहाँ प्राप्त एक ब्राह्मी अभिलेख संकट-राहत हेतु " +
        "अनुदान का उल्लेख करता है और इतनी पूर्व में प्रशासन के सबसे प्राचीन अभिलेखीय प्रमाणों में से है।",
    },
    relatedPlaces: ["place-champa", "place-ganga-river"],
    sources: [REF, { source: "singh-ancient-india", locator: "chapters on early urban sites in eastern India" }],
    curriculum: [{ level: "school", board: "CBSE", class: "12", subject: "history", chapterRef: "Kings, Farmers and Towns", verifiedAgainst: "NCERT Class XII History chapter titles", verifiedDate: "2026-11-11" }],
  },

  // ===========================================================================
  // INSCRIPTION SITES — where the primary evidence physically stands
  // ===========================================================================
  {
    id: "place-kalsi",
    canonicalName: { en: "Kalsi", hi: "कालसी" },
    placeType: "archaeological-site",
    geometry: { type: "Point", coordinates: [77.7253, 30.2928] },
    locationPrecisionKm: 1,
    elevationM: 655,
    description: {
      en:
        "The site of one of Ashoka's major rock edict engravings, at the Yamuna's exit from the " +
        "Himalaya into the Doab. Its position is not incidental: the major rock edicts were engraved " +
        "at the edges of the empire and along its main routes, so the map of the edicts is itself a " +
        "map of Mauryan communication.",
      hi:
        "अशोक के प्रमुख शिलालेखों में से एक के अंकन का स्थल, जहाँ यमुना हिमालय से निकलकर दोआब में " +
        "प्रवेश करती है। इसका स्थान आकस्मिक नहीं है: प्रमुख शिलालेख साम्राज्य के किनारों एवं उसके मुख्य " +
        "मार्गों पर अंकित किए गए थे, अतः इनका मानचित्र स्वयं मौर्य संचार का मानचित्र है।",
    },
    relatedPlaces: ["place-yamuna-river", "place-dhauli"],
    sources: [REF, { source: "ashokan-rock-edict-xiii", locator: "Kalsi engraving" }, { source: "thapar-early-india", locator: "chapters on the Mauryas and Ashokan edicts" }],
    curriculum: [
      { level: "school", board: "CBSE", class: "12", subject: "history", chapterRef: "Kings, Farmers and Towns", verifiedAgainst: "NCERT Class XII History chapter titles", verifiedDate: "2026-11-11" },
      { level: "upsc", upscPaper: "gs1", concept: "Ashokan edicts: distribution and significance" },
    ],
  },
  {
    id: "place-dhauli",
    canonicalName: { en: "Dhauli", hi: "धौली" },
    placeType: "archaeological-site",
    geometry: { type: "Point", coordinates: [85.8886, 20.2286] },
    locationPrecisionKm: 2,
    elevationM: 45,
    description: {
      en:
        "On the Daya river near Bhubaneswar, in the heart of ancient Kalinga. The Kalinga versions of " +
        "Ashoka's edicts here — with the separate edicts addressed to frontier peoples — replace parts " +
        "of the standard fourteen rock edicts. Reading the Dhauli text next to the Shahbazgarhi text " +
        "of the same edict set shows learners that 'the edicts' are not one uniform document.",
      hi:
        "भुवनेश्वर के समीप दया नदी पर, प्राचीन कलिंग के हृदय में। यहाँ अशोक के अभिलेखों के कलिंग " +
        "संस्करण — सीमांत जनसमूहों को संबोधित पृथक अभिलेखों सहित — मानक चौदह शिलालेखों के कुछ भागों " +
        "का स्थान लेते हैं। धौली के पाठ को उसी अभिलेख-समूह के शाहबाज़गढ़ी पाठ के साथ पढ़ना शिक्षार्थी " +
        "को दिखाता है कि 'अभिलेख' कोई एक समरूप दस्तावेज़ नहीं हैं।",
    },
    relatedPlaces: ["place-kalsi", "place-jaugada"],
    sources: [REF, { source: "ashokan-rock-edict-xiii", locator: "Dhauli engraving; the separate Kalinga edicts" }],
    curriculum: [{ level: "school", board: "CBSE", class: "12", subject: "history", chapterRef: "Kings, Farmers and Towns", verifiedAgainst: "NCERT Class XII History chapter titles", verifiedDate: "2026-11-11" }],
  },
  {
    id: "place-jaugada",
    canonicalName: { en: "Jaugada", hi: "जौगड़" },
    placeType: "archaeological-site",
    geometry: { type: "Point", coordinates: [85.3472, 19.9528] },
    locationPrecisionKm: 2,
    description: {
      en:
        "The second Kalinga engraving site, near the coast south of Dhauli, in a fortified Mauryan " +
        "outpost. Its coastal position is the point: Mauryan power in Kalinga reached both the river " +
        "valley and the sea.",
      hi:
        "दूसरा कलिंग अंकन स्थल, धौली के दक्षिण में तट के समीप, एक किलाबंद मौर्य चौकी में। इसका तटीय " +
        "स्थान ही महत्वपूर्ण है: कलिंग में मौर्य सत्ता नदी-घाटी एवं समुद्र दोनों तक पहुँची।",
    },
    relatedPlaces: ["place-dhauli"],
    sources: [REF, { source: "ashokan-rock-edict-xiii", locator: "Jaugada engraving" }],
    curriculum: [{ level: "school", board: "CBSE", class: "12", subject: "history", chapterRef: "Kings, Farmers and Towns", verifiedAgainst: "NCERT Class XII History chapter titles", verifiedDate: "2026-11-11" }],
  },
  {
    id: "place-barabar",
    canonicalName: { en: "Barabar Caves", hi: "बराबर गुफाएँ" },
    placeType: "religious-site",
    geometry: { type: "Point", coordinates: [85.058, 25.005] },
    locationPrecisionKm: 1,
    elevationM: 130,
    description: {
      en:
        "Rock-cut caves in granite hills south of the Ganga, granted by Ashoka and his grandson " +
        "Dasharatha to the Ajivika ascetics, and famous for their polished surfaces. Two dated " +
        "inscriptions from the same reigns are among the few absolutely datable anchors available for " +
        "early Indian rock-cut architecture.",
      hi:
        "गंगा के दक्षिण में ग्रेनाइट पहाड़ियों में चट्टान काटकर निर्मित गुफाएँ, जिन्हें अशोक एवं उसके " +
        "पौत्र दशरथ ने आजीविक श्रमणों को प्रदान किया, और जो अपनी पॉलिश की गई सतहों के लिए प्रसिद्ध " +
        "हैं। इन्हीं शासनकालों के दो दिनांकित अभिलेख प्रारंभिक भारतीय वास्तुकला हेतु उपलब्ध कुछ " +
        "निश्चित रूप से तिथि-निर्धारित आधारों में से हैं।",
    },
    relatedPlaces: ["place-rajagriha"],
    sources: [REF, { source: "singh-ancient-india", locator: "chapters on Mauryan art and architecture" }],
    curriculum: [{ level: "school", board: "CBSE", class: "12", subject: "history", chapterRef: "Kings, Farmers and Towns", verifiedAgainst: "NCERT Class XII History chapter titles", verifiedDate: "2026-11-11" }],
  },
  {
    id: "place-lauriya-nandangarh",
    canonicalName: { en: "Lauriya Nandangarh", hi: "लौरिया नंदनगढ़" },
    placeType: "archaeological-site",
    geometry: { type: "Point", coordinates: [84.3333, 26.9833] },
    locationPrecisionKm: 2,
    description: {
      en:
        "An Ashokan pillar and a large stupa site in the Champaran plain north of the Ganga, on the " +
        "route towards the Himalayan foothills. Its presence this far north-west of Pataliputra is " +
        "evidence of how far Mauryan inscriptional reach extended along the terai margin.",
      hi:
        "गंगा के उत्तर में चंपारण मैदान में एक अशोकीय स्तंभ एवं एक विशाल स्तूप स्थल, हिमालयी तराई की " +
        "ओर जाने वाले मार्ग पर। पाटलिपुत्र से इतनी उत्तर-पश्चिम में इसकी उपस्थिति इस बात का प्रमाण है " +
        "कि तराई-सीमांत के साथ मौर्य अभिलेखीय पहुँच कितनी दूर तक थी।",
    },
    relatedPlaces: ["place-pataliputra", "place-gandak-river"],
    sources: [REF, { source: "singh-ancient-india", locator: "chapters on Mauryan pillars and their distribution" }],
    curriculum: [{ level: "upsc", upscPaper: "gs1", concept: "Ashokan pillars: distribution" }],
  },

  // ===========================================================================
  // MEDIEVAL AND MODERN — the corridor does not stop at 1200 CE
  // ===========================================================================
  {
    id: "place-kannauj",
    canonicalName: { en: "Kannauj", hi: "कन्नौज" },
    alternateNames: [{ text: "Kanyakubja", lang: "sa", sources: [{ source: "thapar-early-india", locator: "chapters on post-Gupta north India" }] }],
    placeType: "city",
    geometry: { type: "Point", coordinates: [79.915, 27.06] },
    locationPrecisionKm: 2,
    elevationM: 143,
    description: {
      en:
        "Harsha's capital, on the Ganga between the Doab and the lower river. The shift of political " +
        "centre from Pataliputra to Kannauj across the 7th century is one of the corridor's major " +
        "structural changes, and it is documented from two directions: Banabhatta's court text and " +
        "Xuanzang's pilgrimage account.",
      hi:
        "हर्ष की राजधानी, दोआब एवं निचली नदी के बीच गंगा पर। ७वीं शताब्दी में राजनीतिक केंद्र का " +
        "पाटलिपुत्र से कन्नौज की ओर खिसकना इस क्षेत्र के प्रमुख संरचनात्मक परिवर्तनों में से एक है, और " +
        "यह दो दिशाओं से प्रमाणित है: बाणभट्ट का दरबारी ग्रंथ एवं हुआनसांग का तीर्थ-विवरण।",
    },
    relatedPlaces: ["place-ganga-river", "place-pataliputra"],
    sources: [REF, { source: "harshacharita", locator: "account of Harsha's court and campaigns" }, { source: "xuanzang-record", locator: "account of Kanyakubja" }, { source: "thapar-early-india", locator: "chapters on post-Gupta north India" }],
    curriculum: [{ level: "school", board: "CBSE", class: "12", subject: "history", chapterRef: "Kings, Farmers and Towns", verifiedAgainst: "NCERT Class XII History chapter titles", verifiedDate: "2026-11-11" }],
  },
  {
    id: "place-odantapuri",
    canonicalName: { en: "Odantapuri", hi: "ओदंतपुरी" },
    alternateNames: [{ text: "Bihar Sharif", lang: "hi", script: "बिहार शरीफ़", sources: [REF] }],
    placeType: "religious-site",
    geometry: { type: "Point", coordinates: [85.5178, 25.1938] },
    locationPrecisionKm: 3,
    description: {
      en:
        "A major Buddhist monastery, and the settlement whose name gives the modern state of Bihar " +
        "its own — 'Bihar' from vihara. The identification of the monastery's precise site with the " +
        "modern town is a matter of scholarly discussion, hence the wider precision radius here.",
      hi:
        "एक प्रमुख बौद्ध विहार, तथा वह बस्ती जिसके नाम से आधुनिक बिहार राज्य का अपना नाम पड़ा — " +
        "'बिहार' शब्द विहार से। आधुनिक नगर के साथ विहार के सटीक स्थल की पहचान विद्वानों में विवाद का " +
        "विषय है, अतः यहाँ अनिश्चितता-त्रिज्या अधिक रखी गई है।",
    },
    relatedPlaces: ["place-nalanda", "place-rajagriha"],
    sources: [
      REF,
      { source: "tabaqat-i-nasiri", locator: "account of the destruction of the monasteries" },
      {
        source: "reference-coordinates",
        locator: "positional precision widened to 3 km",
        note: "The site identification with Bihar Sharif is discussed rather than settled in the scholarship available to this pilot.",
      },
    ],
    curriculum: [{ level: "school", board: "CBSE", class: "12", subject: "history", chapterRef: "Through the Eyes of Travellers", verifiedAgainst: "NCERT Class XII History chapter titles", verifiedDate: "2026-11-11" }],
  },
  {
    id: "place-vikramshila",
    canonicalName: { en: "Vikramashila", hi: "विक्रमशिला" },
    placeType: "religious-site",
    geometry: { type: "Point", coordinates: [87.2833, 25.35] },
    locationPrecisionKm: 2,
    description: {
      en:
        "A Pala-founded Buddhist mahavihara on the Ganga's southern bank near Bhagalpur, later " +
        "destroyed alongside Nalanda and Odantapuri. Its riverside position on the main east-west " +
        "artery is consistent with the other great monasteries: they were built where traffic and " +
        "endowment revenue passed.",
      hi:
        "भागलपुर के समीप गंगा के दक्षिणी तट पर पाल-स्थापित एक बौद्ध महाविहार, जो बाद में नालंदा एवं " +
        "ओदंतपुरी के साथ नष्ट हुआ। मुख्य पूर्व-पश्चिम धमनी पर इसका नदीतटीय स्थान अन्य महान विहारों के " +
        "अनुरूप है: ये वहीं बनाए गए जहाँ आवागमन एवं दान-राजस्व गुज़रता था।",
    },
    relatedPlaces: ["place-champa", "place-nalanda"],
    sources: [REF, { source: "singh-ancient-india", locator: "chapters on early medieval eastern India" }],
    curriculum: [{ level: "upsc", upscPaper: "gs1", concept: "Pala period; Buddhist institutions" }],
  },
  {
    id: "place-buxar",
    canonicalName: { en: "Buxar", hi: "बक्सर" },
    placeType: "battlefield",
    geometry: { type: "Point", coordinates: [83.975, 25.57] },
    locationPrecisionKm: 2,
    description: {
      en:
        "On the Ganga's southern bank, upstream of Patna. The battle fought here in October 1764 is " +
        "the point at which the East India Company's position in Bengal and Bihar became a matter of " +
        "territorial revenue rather than trade alone, and it is followed directly in 1765 by the " +
        "grant of the diwani. Modern political geography of the corridor begins here.",
      hi:
        "गंगा के दक्षिणी तट पर, पटना के ऊपरी भाग में। अक्टूबर 1764 में यहाँ लड़ा गया युद्ध वह बिंदु है " +
        "जिससे बंगाल एवं बिहार में ईस्ट इंडिया कंपनी की स्थिति केवल व्यापार की नहीं बल्कि भू-राजस्व की " +
        "बन गई, और इसके ठीक बाद १७६५ में दीवानी अनुदान आता है। इस क्षेत्र का आधुनिक राजनीतिक भूगोल " +
        "यहीं से आरंभ होता है।",
    },
    relatedPlaces: ["place-arrha", "place-pataliputra"],
    sources: [REF, { source: "ncert-tih-2", locator: "chapters on colonialism and the countryside" }],
    curriculum: [
      { level: "school", board: "CBSE", class: "12", subject: "history", book: "Themes in Indian History Part III", chapterRef: "Colonialism and the Countryside", verifiedAgainst: "NCERT Class XII History Part III chapter titles", verifiedDate: "2026-11-11" },
      { level: "upsc", upscPaper: "gs1", concept: "British conquest of Bengal; the diwani" },
    ],
  },
  {
    id: "place-arrha",
    canonicalName: { en: "Arrah (Ara)", hi: "आरा" },
    placeType: "city",
    geometry: { type: "Point", coordinates: [84.662, 25.558] },
    locationPrecisionKm: 2,
    description: {
      en:
        "Between the Son and the Ganga, west of Patna. In 1857 it was the centre of Kunwar Singh's " +
        "sustained resistance, one of the longest and best-organised campaigns of the revolt anywhere " +
        "in India, and it is a good counterweight to narratives in which 1857 is only Delhi, Lucknow " +
        "and Kanpur.",
      hi:
        "सोन एवं गंगा के बीच, पटना के पश्चिम। १८५७ में यह कुँवर सिंह के सतत प्रतिरोध का केंद्र था — " +
        "भारत में कहीं भी हुए विद्रोह के सबसे दीर्घ एवं सुसंगठित अभियानों में से एक — और यह उन कथनों " +
        "का अच्छा प्रति-संतुलन है जिनमें १८५७ केवल दिल्ली, लखनऊ एवं कानपुर है।",
    },
    relatedPlaces: ["place-buxar", "place-son-river"],
    sources: [REF, { source: "ncert-tih-2", locator: "chapters on the Revolt of 1857" }],
    curriculum: [
      { level: "school", board: "CBSE", class: "12", subject: "history", book: "Themes in Indian History Part III", chapterRef: "Rebels and the Raj", verifiedAgainst: "NCERT Class XII History Part III chapter titles", verifiedDate: "2026-11-11" },
      { level: "upsc", upscPaper: "gs1", concept: "Revolt of 1857: regional leadership" },
    ],
  },
  {
    id: "place-champaran",
    canonicalName: { en: "Champaran", hi: "चंपारण" },
    placeType: "region",
    geometry: { type: "Point", coordinates: [84.5, 27.0] },
    locationPrecisionKm: 15,
    description: {
      en:
        "The terai district north of the Gandak where the 1917 satyagraha against indigo plantation " +
        "conditions took place. It is a place where an agricultural system imposed by colonial " +
        "commerce, a specific crop, a specific soil and water regime, and a political method all come " +
        "together — which is exactly the kind of connection this platform exists to show.",
      hi:
        "गंडक के उत्तर में तराई का वह ज़िला जहाँ १९१७ में नील बागान की स्थितियों के विरुद्ध सत्याग्रह " +
        "हुआ। यह वह स्थान है जहाँ औपनिवेशिक वाणिज्य द्वारा थोपी गई कृषि-व्यवस्था, एक विशिष्ट फसल, एक " +
        "विशिष्ट मृदा एवं जल-शासन, और एक राजनीतिक पद्धति — सब एक साथ आते हैं।",
    },
    relatedPlaces: ["place-lauriya-nandangarh", "place-gandak-river"],
    sources: [REF, { source: "ncert-tih-2", locator: "chapters on colonial rural economy and indigo" }],
    curriculum: [
      { level: "school", board: "CBSE", class: "12", subject: "history", book: "Themes in Indian History Part III", chapterRef: "Colonialism and the Countryside", verifiedAgainst: "NCERT Class XII History Part III chapter titles", verifiedDate: "2026-11-11" },
      { level: "upsc", upscPaper: "gs1", concept: "Champaran satyagraha; indigo cultivation" },
      { level: "upsc", upscPaper: "geography-optional", concept: "Agricultural geography of plantation crops" },
    ],
  },
  {
    id: "place-bokaro",
    canonicalName: { en: "Bokaro Steel City", hi: "बोकारो स्टील सिटी" },
    placeType: "city",
    geometry: { type: "Point", coordinates: [86.1511, 23.6693] },
    locationPrecisionKm: 4,
    elevationM: 210,
    description: {
      en:
        "A planned steel city on the Damodar, in the Jharia-Dhanbad coalfield region of the " +
        "Chotanagpur plateau. It is included in the pilot deliberately as the corridor's modern " +
        "counterpoint: the same river system that carried Magadha's grain and Patna's trade now " +
        "carries industrial water and effluent, on land whose mineral base drove both the creation of " +
        "Jharkhand and a century of extractive industry. It makes the Domain D question concrete — " +
        "how physical resources shape settlement, and what that shaping costs.",
      hi:
        "दामोदर नदी पर एक नियोजित इस्पात नगर, छोटा नागपुर पठार के झरिया-धनबाद कोयलाक्षेत्र में। इसे " +
        "पायलट में जानबूझकर इस क्षेत्र के आधुनिक प्रतिरूप के रूप में शामिल किया गया है: वही नदी तंत्र जो " +
        "कभी मगध का अनाज और पटना का व्यापार ले जाती थी, अब औद्योगिक जल एवं अपशिष्ट ले जाती है — ऐसी " +
        "भूमि पर जिसका खनिज आधार झारखंड के निर्माण एवं एक शताब्दी के निष्कर्षण उद्योग दोनों को " +
        "प्रेरित किया।",
    },
    relatedPlaces: ["place-damodar-river", "place-jamshedpur", "place-dhanbad"],
    sources: [
      REF,
      { source: "ncert-india-people-economy", locator: "chapters on industries and human settlements" },
      {
        source: "atlas-editorial-unsourced",
        locator: "plant commissioning date, capacity and current environmental indicators",
        note: "Deliberately not asserted. These figures must come from the plant operator and from a named, dated environmental dataset before they are shown with numbers.",
      },
    ],
    curriculum: [
      { level: "school", board: "CBSE", class: "12", subject: "geography", book: "India — People and Economy", chapterRef: "Manufacturing Industries", verifiedAgainst: "NCERT Class XII Geography chapter titles", verifiedDate: "2026-11-11" },
      { level: "school", board: "CBSE", class: "12", subject: "geography", book: "India — People and Economy", chapterRef: "Human Settlements", verifiedAgainst: "NCERT Class XII Geography chapter titles", verifiedDate: "2026-11-11" },
      { level: "upsc", upscPaper: "gs3", concept: "Industrial location; mineral-based industries" },
      { level: "upsc", upscPaper: "geography-optional", concept: "Industrial location theory; resource geography" },
    ],
  },
  {
    id: "place-jamshedpur",
    canonicalName: { en: "Jamshedpur", hi: "जमशेदपुर" },
    alternateNames: [{ text: "Sakchi", lang: "hi", sources: [{ source: "reference-coordinates", locator: "pre-founding name of the locality" }] }],
    placeType: "city",
    geometry: { type: "Point", coordinates: [86.2029, 22.8046] },
    locationPrecisionKm: 3,
    elevationM: 132,
    description: {
      en:
        "A company town founded at the confluence of the Subarnarekha and the Kharkai, chosen for its " +
        "proximity to coal, iron ore, water and the railway. It is the textbook case in Indian " +
        "economic geography of industrial location being decided by physical resource distribution — " +
        "and, since 2000, of a city whose existence is bound up with the creation of Jharkhand.",
      hi:
        "सुवर्णरेखा एवं खरकई के संगम पर बसा एक कंपनी-नगर, जिसे कोयला, लौह-अयस्क, जल एवं रेलमार्ग की " +
        "निकटता के कारण चुना गया। भारतीय आर्थिक भूगोल में यह औद्योगिक स्थान का निर्धारण भौतिक संसाधन " +
        "वितरण द्वारा होने का पाठ्यपुस्तकीय उदाहरण है।",
    },
    relatedPlaces: ["place-bokaro", "place-dhanbad"],
    sources: [REF, { source: "ncert-india-people-economy", locator: "chapters on industries" }],
    curriculum: [
      { level: "school", board: "CBSE", class: "12", subject: "geography", chapterRef: "Manufacturing Industries", verifiedAgainst: "NCERT Class XII Geography chapter titles", verifiedDate: "2026-11-11" },
      { level: "upsc", upscPaper: "gs3", concept: "Industrial location factors" },
    ],
  },
  {
    id: "place-dhanbad",
    canonicalName: { en: "Dhanbad / Jharia coalfield", hi: "धनबाद / झरिया कोयलाक्षेत्र" },
    placeType: "mining-site",
    geometry: { type: "Point", coordinates: [86.413, 23.7437] },
    locationPrecisionKm: 5,
    elevationM: 222,
    description: {
      en:
        "One of India's principal coking-coal fields, on the Damodar. Its long-running underground " +
        "fires, subsidence and displacement of settlements make it the corridor's sharpest case of a " +
        "human-environment relationship with visible, documented costs — and a Domain D example where " +
        "the causal chain from geology to settlement pattern to health outcome is short and " +
        "demonstrable.",
      hi:
        "भारत के प्रमुख कोकिंग-कोयला क्षेत्रों में से एक, दामोदर पर। इसके दीर्घकालिक भूमिगत अग्निकांड, " +
        "धँसाव एवं बस्तियों का विस्थापन इसे मानव-पर्यावरण संबंध का सबसे स्पष्ट उदाहरण बनाते हैं जिसकी " +
        "लागत दृश्य एवं प्रमाणित है।",
    },
    relatedPlaces: ["place-damodar-river", "place-bokaro"],
    sources: [
      REF,
      { source: "ncert-india-people-economy", locator: "chapters on mineral resources and industries" },
      {
        source: "atlas-editorial-unsourced",
        locator: "extent of underground fires, subsidence area, displacement figures",
        note: "These figures exist in the published literature and in government reports, but no specific dated report was consulted for this pilot. Shown as a gap rather than as a number.",
      },
    ],
    curriculum: [
      { level: "school", board: "CBSE", class: "12", subject: "geography", chapterRef: "Mineral and Energy Resources", verifiedAgainst: "NCERT Class XII Geography chapter titles", verifiedDate: "2026-11-11" },
      { level: "upsc", upscPaper: "gs3", concept: "Coal resources; mining and its environmental impact" },
      { level: "upsc", upscPaper: "geography-optional", concept: "Resource geography; environmental degradation" },
    ],
  },

  // ===========================================================================
  // RIVER REACHES — treated as places because they are named locations learners search for
  // ===========================================================================
  {
    id: "place-ganga-river",
    canonicalName: { en: "Ganga", hi: "गंगा" },
    alternateNames: [
      { text: "Ganges", lang: "en", sources: [{ source: "natural-earth", locator: "feature named 'Ganges' in ne_10m_rivers_lake_centerlines" }] },
      { text: "Bhagirathi (upper reach)", lang: "sa", sources: [{ source: "ncert-india-physical", locator: "Ch 3 'Drainage System'" }] },
      { text: "Padma (Bengal reach)", lang: "bn", sources: [{ source: "ncert-india-physical", locator: "Ch 3 'Drainage System'" }] },
    ],
    placeType: "region",
    geometry: { type: "Point", coordinates: [83.5, 26.0] },
    locationPrecisionKm: 60,
    description: {
      en:
        "The river itself, represented as a place because learners search for it. Its geometry is " +
        "carried by the GeographicalFeature record `feature-ganga`, which is derived from Natural " +
        "Earth's 10m river centre-lines and is drawn on the map. The point here is a label anchor, " +
        "not the river.",
      hi:
        "स्वयं नदी — इसे स्थान के रूप में दर्ज किया गया है क्योंकि शिक्षार्थी इसे खोजते हैं। इसकी ज्यामिति " +
        "GeographicalFeature अभिलेख `feature-ganga` द्वारा वहन की जाती है, जो नैचरल अर्थ की १०मी नदी " +
        "केंद्र-रेखाओं से व्युत्पन्न है और मानचित्र पर अंकित की जाती है। यहाँ का बिंदु एक लेबल-आधार है, नदी नहीं।",
    },
    relatedPlaces: ["place-gaumukh", "place-devprayag", "place-haridwar", "place-prayagraj", "place-farakka", "place-sundarbans"],
    sources: [REF, { source: "natural-earth", locator: "ne_10m_rivers_lake_centerlines, feature named 'Ganges'" }, { source: "ncert-india-physical", locator: "Ch 3 'Drainage System'" }],
    curriculum: [
      { level: "school", board: "CBSE", class: "6", subject: "geography", concept: "Major rivers of India", verifiedAgainst: "NCERT Class VI Social Science treatment of Indian rivers", verifiedDate: "2026-11-11" },
      { level: "school", board: "CBSE", class: "11", subject: "geography", chapterRef: "Drainage System", registryTopicId: "c11-ind-ch3", verifiedAgainst: "NCERT Class XI Geography chapter titles", verifiedDate: "2026-11-11" },
      { level: "upsc", upscPaper: "geography-optional", concept: "Himalayan drainage; Ganga basin" },
    ],
  },
  {
    id: "place-son-river",
    canonicalName: { en: "Son", hi: "सोन" },
    alternateNames: [{ text: "Sone", lang: "en", sources: [{ source: "natural-earth", locator: "feature named 'Son'" }] }],
    placeType: "region",
    geometry: { type: "Point", coordinates: [83.0, 23.8] },
    locationPrecisionKm: 40,
    description: {
      en:
        "The Ganga's largest southern tributary, rising in the Amarkantak uplands and running north " +
        "to join near Patna. It is the corridor's clearest demonstration of an asymmetric drainage " +
        "system: the Ganga receives large Himalayan tributaries from the north and comparatively " +
        "fewer, shorter peninsular ones from the south, and the Son is the main southern exception.",
      hi:
        "गंगा की सबसे बड़ी दक्षिणी सहायक नदी, जो अमरकंटक ऊँचे भाग से निकलकर उत्तर की ओर पटना के समीप " +
        "मिलती है। यह असममित अपवाह तंत्र का सबसे स्पष्ट प्रदर्शन है: गंगा को उत्तर से बड़ी हिमालयी " +
        "सहायक नदियाँ मिलती हैं और दक्षिण से तुलनात्मक रूप से कम एवं छोटी प्रायद्वीपीय नदियाँ।",
    },
    relatedPlaces: ["place-pataliputra", "place-arrha", "place-ganga-river"],
    sources: [REF, { source: "natural-earth", locator: "ne_10m_rivers_lake_centerlines, feature named 'Son'" }, { source: "ncert-india-physical", locator: "Ch 3 'Drainage System'" }],
    curriculum: [
      { level: "school", board: "CBSE", class: "11", subject: "geography", chapterRef: "Drainage System", registryTopicId: "c11-ind-ch3", verifiedAgainst: "NCERT Class XI Geography chapter titles", verifiedDate: "2026-11-11" },
      { level: "school", board: "CBSE", class: "11", subject: "geography", concept: "Left-bank vs right-bank tributaries", verifiedAgainst: "NCERT Class XI Geography Ch 3", verifiedDate: "2026-11-11" },
    ],
  },
  {
    id: "place-gandak-river",
    canonicalName: { en: "Gandak", hi: "गंडक" },
    alternateNames: [
      { text: "Narayani", lang: "ne", sources: [{ source: "ncert-india-physical", locator: "Ch 3 'Drainage System'" }] },
      { text: "Sapt Kosi (its upper system)", lang: "sa", sources: [{ source: "natural-earth", locator: "feature named 'Sapt'" }] },
    ],
    placeType: "region",
    geometry: { type: "Point", coordinates: [84.4, 27.5] },
    locationPrecisionKm: 40,
    description: {
      en:
        "A major left-bank Himalayan tributary joining the Ganga opposite Patna. Its channel on the " +
        "plain has shifted by kilometres within recorded history, which is why the Gandak-Kosi fan is " +
        "the corridor's standard example of an avulsing river and of the flood hazard that comes with " +
        "a very low gradient and a very high sediment load.",
      hi:
        "एक प्रमुख वाम-तटीय हिमालयी सहायक नदी जो पटना के सामने गंगा से मिलती है। मैदान पर इसकी धारा " +
        "ऐतिहासिक काल में किलोमीटरों खिसकी है, यही कारण है कि गंडक-कोसी पंख इस क्षेत्र में अवल्सनकारी " +
        "नदी का मानक उदाहरण है।",
    },
    relatedPlaces: ["place-sonpur-confluence", "place-vaishali", "place-champaran"],
    sources: [REF, { source: "natural-earth", locator: "ne_10m_rivers_lake_centerlines, features named 'Gandak' and 'Sapt'" }, { source: "ncert-india-physical", locator: "Ch 3 'Drainage System'" }],
    curriculum: [{ level: "school", board: "CBSE", class: "11", subject: "geography", chapterRef: "Drainage System", registryTopicId: "c11-ind-ch3", verifiedAgainst: "NCERT Class XI Geography chapter titles", verifiedDate: "2026-11-11" }],
  },
  {
    id: "place-ghaghara-river",
    canonicalName: { en: "Ghaghara", hi: "घाघरा" },
    alternateNames: [{ text: "Karnali (upper reach)", lang: "ne", sources: [{ source: "natural-earth", locator: "feature named 'Ghäghara'" }] }],
    placeType: "region",
    geometry: { type: "Point", coordinates: [82.5, 27.0] },
    locationPrecisionKm: 40,
    description: {
      en:
        "The Ganga's largest tributary by discharge, joining on the left bank in Bihar. Like the " +
        "Gandak and the Kosi it drains the southern Himalayan flank, and like them it builds an " +
        "enormous alluvial fan on reaching the plain.",
      hi:
        "प्रवाह की दृष्टि से गंगा की सबसे बड़ी सहायक नदी, जो बिहार में वाम तट पर मिलती है। गंडक एवं कोसी " +
        "की भाँति यह दक्षिणी हिमालयी ढाल का अपवाह करती है और मैदान पर पहुँचकर विशाल जलोढ़ पंख बनाती है।",
    },
    relatedPlaces: ["place-ganga-river", "place-kushinagar"],
    sources: [REF, { source: "natural-earth", locator: "ne_10m_rivers_lake_centerlines, feature named 'Ghäghara'" }, { source: "ncert-india-physical", locator: "Ch 3 'Drainage System'" }],
    curriculum: [{ level: "school", board: "CBSE", class: "11", subject: "geography", chapterRef: "Drainage System", registryTopicId: "c11-ind-ch3", verifiedAgainst: "NCERT Class XI Geography chapter titles", verifiedDate: "2026-11-11" }],
  },
  {
    id: "place-yamuna-river",
    canonicalName: { en: "Yamuna", hi: "यमुना" },
    alternateNames: [{ text: "Jumna", lang: "en", sources: [{ source: "natural-earth", locator: "feature named 'Yamuna'" }] }],
    placeType: "region",
    geometry: { type: "Point", coordinates: [78.5, 28.5] },
    locationPrecisionKm: 40,
    description: {
      en:
        "The corridor's second great axis, joining the Ganga at Prayagraj. The land between the two " +
        "— the Doab — is one of the most intensively farmed regions on earth and has been a " +
        "persistent seat of political power, which is why Indraprastha, Mathura, Kaushambi and " +
        "Kannauj all sit on it or beside it.",
      hi:
        "इस क्षेत्र की दूसरी महान धुरी, जो प्रयागराज में गंगा से मिलती है। दोनों के बीच की भूमि — दोआब — " +
        "पृथ्वी के सबसे सघन रूप से कृषि-युक्त क्षेत्रों में से एक है और लगातार राजनीतिक शक्ति का केंद्र " +
        "रही है, यही कारण है कि इंद्रप्रस्थ, मथुरा, कौशांबी एवं कन्नौज सभी इस पर या इसके पास स्थित हैं।",
    },
    relatedPlaces: ["place-prayagraj", "place-kalsi", "place-indraprastha"],
    sources: [REF, { source: "natural-earth", locator: "ne_10m_rivers_lake_centerlines, feature named 'Yamuna'" }, { source: "ncert-india-physical", locator: "Ch 3 'Drainage System'" }],
    curriculum: [
      { level: "school", board: "CBSE", class: "11", subject: "geography", chapterRef: "Drainage System", registryTopicId: "c11-ind-ch3", verifiedAgainst: "NCERT Class XI Geography chapter titles", verifiedDate: "2026-11-11" },
      { level: "upsc", upscPaper: "geography-optional", concept: "Doab regions; interfluves" },
    ],
  },
  {
    id: "place-damodar-river",
    canonicalName: { en: "Damodar", hi: "दामोदर" },
    placeType: "region",
    geometry: { type: "Point", coordinates: [87.0, 23.7] },
    locationPrecisionKm: 25,
    description: {
      en:
        "A peninsular river draining the Chotanagpur plateau eastwards to the Hooghly, historically " +
        "called the 'Sorrow of Bengal' for its floods. The Damodar Valley Corporation, established in " +
        "1948, made it India's first integrated multipurpose river-valley project. It is the " +
        "corridor's best example of a river being deliberately re-engineered, and of the coalfield " +
        "beside it driving an entire industrial geography.",
      hi:
        "छोटा नागपुर पठार से पूर्व की ओर हुगली तक अपवाहित होने वाली एक प्रायद्वीपीय नदी, जिसे उसकी " +
        "बाढ़ों के कारण ऐतिहासिक रूप से 'बंगाल का शोक' कहा गया। १९४८ में स्थापित दामोदर वैली " +
        "कॉर्पोरेशन ने इसे भारत की प्रथम एकीकृत बहुउद्देशीय नदी-घाटी परियोजना बनाया।",
    },
    relatedPlaces: ["place-bokaro", "place-dhanbad", "place-sundarbans"],
    sources: [
      REF,
      { source: "ncert-india-physical", locator: "Ch 3 'Drainage System' (peninsular drainage)" },
      { source: "ncert-india-people-economy", locator: "chapters on water resources" },
      {
        source: "atlas-editorial-unsourced",
        locator: "Damodar as a named feature and the barrage/dam inventory on it",
        note:
          "DOCUMENTED COVERAGE GAP. Natural Earth's 10m river layer does NOT carry the Damodar as a " +
          "named feature in this corridor, so this place is represented as a point only and no " +
          "river geometry is drawn for it. The Gomti, Punpun, Mahananda, Ajay, Mayurakshi, Kiul, " +
          "Alaknanda, Bhagirathi and Hooghly are in the same situation. See coverage record " +
          "cov-natural-earth-river-gaps.",
      },
    ],
    curriculum: [
      { level: "school", board: "CBSE", class: "11", subject: "geography", chapterRef: "Drainage System", registryTopicId: "c11-ind-ch3", verifiedAgainst: "NCERT Class XI Geography chapter titles", verifiedDate: "2026-11-11" },
      { level: "school", board: "CBSE", class: "12", subject: "geography", chapterRef: "Water Resources", verifiedAgainst: "NCERT Class XII Geography chapter titles", verifiedDate: "2026-11-11" },
      { level: "upsc", upscPaper: "gs3", concept: "Multipurpose river valley projects" },
    ],
  },
  {
    id: "place-thanesar",
    canonicalName: { en: "Thanesar", hi: "थानेसर" },
    alternateNames: [
      { text: "Sthanishvara", lang: "sa", sources: [{ source: "harshacharita", locator: "Bana's account of Harsha's family seat" }] },
    ],
    placeType: "city",
    geometry: { type: "Point", coordinates: [76.8281, 29.7367] },
    locationPrecisionKm: 2,
    elevationM: 258,
    description: {
      en:
        "Harsha's original capital, on the Sarasvati in the northern Doab, before the centre moved to " +
        "Kannauj. It sits at the corridor's north-western edge, which is exactly its significance: it " +
        "is the hinge between the Doab and the routes running north-west towards the Punjab. Reading " +
        "Thanesar and Kannauj together shows the seventh-century political centre in mid-move, and " +
        "Bana's Harshacharita is set at precisely this transition.",
      hi:
        "हर्ष की मूल राजधानी, उत्तरी दोआब में सरस्वती पर, केंद्र के कन्नौज चले जाने से पूर्व। यह क्षेत्र के " +
        "उत्तर-पश्चिमी किनारे पर स्थित है, यही इसका महत्व है: यह दोआब एवं पंजाब की ओर उत्तर-पश्चिम जाने " +
        "वाले मार्गों के बीच का कब्जा है।",
    },
    relatedPlaces: ["place-kannauj", "place-indraprastha", "place-yamuna-river"],
    sources: [
      REF,
      { source: "harshacharita", locator: "account of Harsha's accession and his family seat" },
      { source: "thapar-early-india", locator: "chapters on Harsha and the seventh century" },
    ],
    curriculum: [
      { level: "school", board: "CBSE", class: "12", subject: "history", chapterRef: "Through the Eyes of Travellers", verifiedAgainst: "NCERT Class XII History chapter titles", verifiedDate: "2026-11-11" },
      { level: "upsc", upscPaper: "gs1", concept: "Harsha; seventh-century north India" },
    ],
  },
  {
    id: "place-taxila",
    canonicalName: { en: "Taxila", hi: "तक्षशिला" },
    alternateNames: [
      { text: "Takshashila", lang: "sa", sources: [{ source: "singh-ancient-india", locator: "chapters on the north-west in the first millennium BCE" }] },
      { text: "Taxila (Gandhara)", lang: "pi", sources: [{ source: "megasthenes-indika", locator: "fragments on the north-west" }] },
    ],
    placeType: "city",
    geometry: { type: "Point", coordinates: [72.84, 33.74] },
    locationPrecisionKm: 5,
    elevationM: 549,
    description: {
      en:
        "OUTSIDE THE CORRIDOR — INCLUDED AS CONTEXT, AND MARKED AS SUCH. Taxila sits at 72.84 E, " +
        "33.74 N, which is beyond this corpus's western edge (76.5 E) and northern edge (31.5 N). It " +
        "is included because two events in the corridor cannot be told without it: Alexander's " +
        "campaign turns back from the north-west, and the treaty with Seleukos moves the Mauryan " +
        "frontier to the Hindu Kush and brings Megasthenes to Pataliputra. A major learning centre on " +
        "the route between the Iranian plateau and the Ganga, it is the corridor's principal point of " +
        "contact with Central and West Asian history. The map must render it distinctly from " +
        "in-corridor places so that a learner never concludes the pilot covers the north-west. It has " +
        "no imported Cliopatria geometry here, because the importer filters at the corridor bbox.",
      hi:
        "क्षेत्र के बाहर — संदर्भ हेतु शामिल, और वैसा ही चिह्नित। तक्षशिला ७२.८४ पू, ३३.७४ उ पर स्थित है, जो " +
        "इस सामग्री की पश्चिमी सीमा (७६.५ पू) एवं उत्तरी सीमा (३१.५ उ) से परे है। इसे इसलिए शामिल किया " +
        "गया है क्योंकि क्षेत्र की दो घटनाएँ इसके बिना नहीं कही जा सकतीं। मानचित्र को इसे क्षेत्र-अंतर्गत " +
        "स्थानों से स्पष्टतः भिन्न रूप में प्रस्तुत करना चाहिए।",
    },
    relatedPlaces: ["place-pataliputra", "place-indraprastha"],
    sources: [
      REF,
      { source: "singh-ancient-india", locator: "chapters on the north-west in the first millennium BCE" },
      { source: "thapar-early-india", locator: "chapters on Alexander's incursion and Mauryan external relations" },
      { source: "megasthenes-indika", locator: "the embassy route from the Seleukid court" },
    ],
    curriculum: [
      { level: "school", board: "CBSE", class: "12", subject: "history", chapterRef: "Kings, Farmers and Towns", verifiedAgainst: "NCERT Class XII History chapter titles", verifiedDate: "2026-11-11" },
      { level: "upsc", upscPaper: "gs1", concept: "North-west India and Central Asian contacts" },
      { level: "upsc", upscPaper: "history-optional", concept: "Gandhara; Taxila as a centre of learning" },
    ],
  },
  {
    id: "place-gaya",
    canonicalName: { en: "Gaya", hi: "गया" },
    placeType: "city",
    geometry: { type: "Point", coordinates: [85.0, 24.7955] },
    locationPrecisionKm: 2,
    elevationM: 111,
    description: {
      en:
        "On the Phalgu south of the Ganga, a major Hindu pilgrimage centre and close to Bodh Gaya. " +
        "Its position between Rajagriha and Bodh Gaya on the upland margin shows how religious " +
        "geography followed routes, not wilderness.",
      hi:
        "गंगा के दक्षिण में फल्गु पर स्थित एक प्रमुख हिंदू तीर्थ एवं बोधगया के समीप। राजगृह एवं बोधगया " +
        "के बीच ऊँचे भाग के किनारे इसका स्थान दर्शाता है कि धार्मिक भूगोल ने मार्गों का अनुसरण किया, " +
        "निर्जनता का नहीं।",
    },
    relatedPlaces: ["place-bodhgaya", "place-rajagriha"],
    sources: [REF, { source: "singh-ancient-india", locator: "chapters on sacred geography" }],
    curriculum: [{ level: "school", board: "CBSE", class: "12", subject: "geography", chapterRef: "Human Settlements", verifiedAgainst: "NCERT Class XII Geography chapter titles", verifiedDate: "2026-11-11" }],
  },
];

export const CURATED_PLACE_IDS = CURATED_PLACES.map((p) => p.id);
