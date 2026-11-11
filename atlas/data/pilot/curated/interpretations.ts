/**
 * INTERPRETATIONS — the WHY/EVIDENCE dimension.
 *
 * This file is the reason the platform is not a map with dates on it. Every entry is a QUESTION that
 * scholarship has not settled, or has settled in a way a learner would never guess from a textbook
 * sentence. Each carries two or more POSITIONS, each position naming whose reading it is, what it
 * claims, what evidence supports it, how strong that support is, and which sources to check.
 *
 * Rules (docs/DATA_MODEL.md D-1, D-5):
 *  - Two disagreeing readings are TWO positions. They are never merged into a balanced-sounding
 *    average, and the platform never adjudicates in its own voice.
 *  - `strength` is graded, not numeric. There is no reliability score anywhere in this file.
 *  - A position whose strength is "contested" or "speculative" must still be shown, with its
 *    evidence — suppressing a weak argument is as dishonest as asserting it.
 *  - `openQuestions` says what would settle the matter, or why it cannot be settled. A question with
 *    no answer in the evidence is the honest end state, not a gap to paper over.
 *
 * `concerns` links each interpretation to the events, places, entities and features it bears on, so
 * the map, timeline and source panels can all surface it from any direction.
 */

import type { Interpretation } from "../../../../src/lib/atlas/model";

export const CURATED_INTERPRETATIONS: Interpretation[] = [
  // ===========================================================================
  // THE CENTRAL QUESTION OF THE CORRIDOR
  // ===========================================================================
  {
    id: "interp-why-magadha",
    question: {
      en: "Why did Magadha, and not one of the other fifteen great realms, become the centre of the first Indian empires?",
      hi: "सोलह महाजनपदों में से कोई अन्य नहीं, मगध ही प्रथम भारतीय साम्राज्यों का केंद्र क्यों बना?",
    },
    concerns: [
      "event-second-urbanisation",
      "event-haryanka-magadha",
      "event-capital-shift-pataliputra",
      "place-rajagriha",
      "place-pataliputra",
      "cliopatria-janapada-of-magadha",
      "cliopatria-magadha-haryanka-dynasty",
    ],
    positions: [
      {
        label: {
          en: "The geographical-advantage explanation (the standard account)",
          hi: "भौगोलिक-लाभ व्याख्या (मानक कथन)",
        },
        claim: {
          en:
            "Magadha rose because of where it was: fertile alluvial soil giving an agricultural " +
            "surplus, iron ore within reach for tools and weapons, timber from the surrounding forests " +
            "for building and for elephants in war, and the Ganga carrying trade and troops. The " +
            "geography made the empire.",
          hi:
            "मगध इसलिए उभरा क्योंकि वह जहाँ था वहीं था: उपजाऊ जलोढ़ मृदा जिससे कृषि अधिशेष मिला, " +
            "उपकरण एवं आयुध हेतु लौह-अयस्क निकट ही, निर्माण एवं युद्ध में हाथियों हेतु आसपास के " +
            "वनों से लकड़ी, तथा व्यापार और सेना को ले जाती गंगा। भूगोल ने साम्राज्य बनाया।",
        },
        evidence: {
          en:
            "Each element is separately well attested. The alluvium is visible on any physical map; " +
            "iron-working in the region is archaeologically established for the period; the Ganga is " +
            "navigable and the cities of the period are on it; Rajagriha sits near upland terrain and " +
            "Pataliputra on the Ganga-Son confluence. The correlation between the corridor's " +
            "river network and its early cities is strong enough to plot.",
          hi:
            "प्रत्येक तत्व पृथक रूप से सुप्रमाणित है। जलोढ़ किसी भी भौतिक मानचित्र पर दृश्य है; इस " +
            "क्षेत्र में लौह-कर्म उस काल हेतु पुरातात्विक रूप से सिद्ध है; गंगा नौगम्य है और काल के " +
            "नगर उसी पर हैं।",
        },
        strength: "plausible-influence",
        sources: [
          { source: "thapar-early-india", locator: "chapters on the rise of Magadha" },
          { source: "singh-ancient-india", locator: "chapters on early states, iron and agriculture" },
          { source: "ncert-india-physical", locator: "Ch 3 'Drainage System'" },
        ],
      },
      {
        label: {
          en: "The multi-causal, anti-determinist reading",
          hi: "बहु-कारणीय, नियतिवाद-विरोधी पाठ",
        },
        claim: {
          en:
            "The physical setting was a necessary condition and not a sufficient one. Equally fertile " +
            "and equally well-watered land existed elsewhere in the Ganga valley without producing an " +
            "empire at this moment. What made the difference was a sequence of political decisions — " +
            "annexing Anga, moving the capital to the river junction, defeating the Vajji " +
            "confederacy — combined with the administrative capacity to convert surplus into power. " +
            "Geography enabled; it did not compel.",
          hi:
            "भौतिक परिस्थिति एक आवश्यक शर्त थी, पर्याप्त नहीं। गंगा घाटी में अन्यत्र भी समान रूप से " +
            "उपजाऊ एवं समान रूप से जल-संपन्न भूमि थी जिसने इस क्षण कोई साम्राज्य नहीं बनाया। अंतर " +
            "राजनीतिक निर्णयों की एक श्रृंखला ने किया — अंग को मिला लेना, राजधानी को नदी-संगम पर " +
            "ले जाना, वज्जि संघ को पराजित करना — साथ में वह प्रशासनिक क्षमता जिसने अधिशेष को शक्ति में " +
            "बदला। भूगोल ने सक्षम किया; विवश नहीं किया।",
        },
        evidence: {
          en:
            "The counter-example is the strongest part of this reading: other janapadas in the same " +
            "river system — Kashi, Kosala, Vatsa, the Vajji confederacy — had comparable physical " +
            "endowments and did not consolidate. The documented sequence of Magadhan expansion is " +
            "political and military, and the move from Rajagriha to Pataliputra is a change of " +
            "strategy, not a change of landscape. The Vajji case is instructive in the other " +
            "direction: a polity with a strong position that lost because of its internal structure.",
          hi:
            "विपरीत उदाहरण इस पाठ का सबसे सशक्त भाग है: उसी नदी तंत्र के अन्य जनपद — काशी, कोसल, वत्स, " +
            "वज्जि संघ — के पास तुलनीय भौतिक संसाधन थे और उन्होंने एकीकरण नहीं किया। मगध विस्तार का " +
            "प्रमाणित क्रम राजनीतिक एवं सैन्य है, और राजगृह से पाटलिपुत्र का स्थानांतरण रणनीति में " +
            "परिवर्तन है, परिदृश्य में नहीं।",
        },
        strength: "plausible-influence",
        sources: [
          { source: "thapar-early-india", locator: "chapters on the rise of Magadha, and on the limits of geographical explanation" },
          { source: "singh-ancient-india", locator: "chapters on early states and their political structures" },
        ],
      },
      {
        label: {
          en: "Strict geographical determinism",
          hi: "कठोर भौगोलिक नियतिवाद",
        },
        claim: {
          en:
            "Given the Ganga valley's soil, rainfall and navigability, the emergence of a large " +
            "centralised state there was inevitable, and Magadha's particular success was a matter of " +
            "which of the well-endowed polities happened to consolidate first.",
          hi:
            "गंगा घाटी की मृदा, वर्षा एवं नौगम्यता को देखते हुए वहाँ एक बड़े केंद्रीकृत राज्य का उदय " +
            "अनिवार्य था, और मगध की विशिष्ट सफलता केवल इस बात का संयोग थी कि अच्छी तरह संपन्न " +
            "राजनीतिक सत्ताओं में से किसने पहले एकीकरण किया।",
        },
        evidence: {
          en:
            "This position is stated here because it is the implicit assumption of most popular " +
            "accounts and of a good deal of examination material. Its evidential basis is the " +
            "correlation between river systems and early states — which is real — read as causation " +
            "and as inevitability, which does not follow.",
          hi:
            "यह स्थिति यहाँ इसलिए दर्ज है क्योंकि यह अधिकांश लोकप्रिय कथनों एवं काफी मात्रा में " +
            "परीक्षा-सामग्री की अंतर्निहित धारणा है। इसका प्रमाण-आधार नदी तंत्रों एवं प्रारंभिक राज्यों के " +
            "बीच का सह-संबंध है — जो वास्तविक है — परंतु उसे कार्य-कारण एवं अनिवार्यता के रूप में पढ़ा " +
            "जाता है, जो तर्कसंगत नहीं है।",
        },
        strength: "contested",
        sources: [
          { source: "thapar-early-india", locator: "chapters on the rise of Magadha — the argument against environmental determinism" },
        ],
      },
    ],
    openQuestions: {
      en:
        "What would settle it: quantified agricultural yield data for the first millennium BCE, which " +
        "does not exist; and comparable political histories of the other janapadas at the same " +
        "resolution, which the sources do not provide. The question is therefore unlikely to be " +
        "settled by new evidence, only re-framed. A learner who can say 'the geography made it " +
        "possible, the politics made it actual' has understood more than one who can list four " +
        "advantages.",
      hi:
        "इसे क्या निपटाएगा: प्रथम सहस्राब्दी ईसा पूर्व हेतु परिमाणीकृत कृषि-उपज आँकड़े, जो विद्यमान नहीं " +
        "हैं; तथा समान विस्तार में अन्य जनपदों के तुलनीय राजनीतिक इतिहास, जो स्रोत प्रदान नहीं करते। " +
        "अतः यह प्रश्न नए प्रमाण से निपटने की संभावना नहीं रखता, केवल पुनः-प्रस्तुत होने की।",
    },
    curriculum: [
      { level: "school", board: "CBSE", class: "12", subject: "history", chapterRef: "Kings, Farmers and Towns", verifiedAgainst: "NCERT Class XII History chapter titles", verifiedDate: "2026-11-11" },
      { level: "upsc", upscPaper: "gs1", concept: "Rise of Magadha; causes and historiographical debate" },
      { level: "upsc", upscPaper: "history-optional", concept: "Environmental determinism vs multi-causal explanation in early Indian history" },
    ],
  },

  // ===========================================================================
  // CHRONOLOGY — the contested dates
  // ===========================================================================
  {
    id: "interp-buddha-dates",
    question: {
      en: "When did the Buddha die?",
      hi: "बुद्ध की मृत्यु कब हुई?",
    },
    concerns: ["event-parinibbana-buddha", "place-kushinagar", "place-bodhgaya", "place-sarnath"],
    positions: [
      {
        label: { en: "The long chronology", hi: "दीर्घ काल-गणना" },
        claim: {
          en: "The Buddha died around 483 BCE, roughly 400 years before the Mahavamsa's own era.",
          hi: "बुद्ध की मृत्यु लगभग ४८३ ईसा पूर्व हुई।",
        },
        evidence: {
          en:
            "Rests on the Sinhala chronicle tradition of Sri Lanka, which gives a chain of regnal " +
            "lengths from the Buddha's death down to a fixed point, combined with counting back from " +
            "Ashoka's consecration. It was the standard date in textbooks for most of the twentieth " +
            "century.",
          hi:
            "यह श्रीलंका की सिंहली वंशावली परंपरा पर आधारित है, जो बुद्ध के निर्वाण से एक निश्चित बिंदु " +
            "तक शासन-काल की एक श्रृंखला देती है, तथा अशोक के राज्याभिषेक से पीछे की ओर गिनती के साथ।",
        },
        strength: "contested",
        sources: [
          { source: "mahavamsa", locator: "chronological framework of the early books" },
          { source: "bechert-dating-buddha", locator: "contributions arguing for the traditional date" },
        ],
      },
      {
        label: { en: "The short chronology", hi: "ह्रस्व काल-गणना" },
        claim: {
          en:
            "The Buddha died around 400 BCE or later — perhaps as late as the early fourth century " +
            "BCE — roughly a century after the traditional date.",
          hi: "बुद्ध की मृत्यु लगभग ४०० ईसा पूर्व या उसके बाद हुई — परंपरागत तिथि से लगभग एक शताब्दी पश्चात।",
        },
        evidence: {
          en:
            "Argued from internal evidence in the Pali canon — the apparent sequence of textual layers " +
            "and the genealogies of the early councils — and from a re-examination of the synchronism " +
            "with Ashoka's reign that the long chronology depends on. It became the majority " +
            "specialist position after the Göttingen symposium of the 1980s-90s.",
          hi:
            "पालि त्रिपिटक के आंतरिक प्रमाण — पाठ-परतों का प्रतीत होने वाला क्रम एवं प्रारंभिक " +
            "संगीतियों की वंशावलियाँ — एवं अशोक के शासनकाल से समकालिकता की पुनःपरीक्षा से तर्कित।",
        },
        strength: "plausible-influence",
        sources: [{ source: "bechert-dating-buddha", locator: "contributions arguing for a later date; the symposium's overall outcome" }],
      },
      {
        label: { en: "The unresolved position", hi: "अनिर्णीत स्थिति" },
        claim: {
          en:
            "No date can currently be established. The two candidates differ by about a century, and " +
            "the evidence does not decide between them.",
          hi: "वर्तमान में कोई तिथि स्थापित नहीं की जा सकती। दोनों उम्मीदवार लगभग एक शताब्दी भिन्न हैं।",
        },
        evidence: {
          en:
            "A three-volume symposium of specialists was devoted to this single question and did not " +
            "resolve it. There is no inscription, no astronomical record and no archaeological " +
            "sequence that fixes the date absolutely. Everything rests on textual chronologies whose " +
            "internal consistency is itself disputed.",
          hi:
            "केवल इसी प्रश्न पर तीन खंडों का एक विशेषज्ञ संगोष्ठी-सम्मेलन समर्पित किया गया और वह इसे हल " +
            "नहीं कर सका। कोई अभिलेख, कोई खगोलीय अभिलेख एवं कोई पुरातात्विक अनुक्रम इस तिथि को " +
            "निरपेक्ष रूप से निश्चित नहीं करता।",
        },
        strength: "demonstrated",
        sources: [{ source: "bechert-dating-buddha", locator: "Parts 1-3, overall outcome" }],
      },
    ],
    openQuestions: {
      en:
        "An absolutely datable inscription or an independently datable archaeological sequence at one " +
        "of the early Buddhist sites would settle it. Neither exists. Note the consequence for " +
        "everything else: because the long chronology counts back from the Buddha to fix other dates, " +
        "moving his death by a century moves Mahavira, and shifts the whole sixth-century framework " +
        "the Mahajanapadas are placed in. This single unresolved question propagates through the " +
        "entire corridor's chronology, which is why the timeline shows an interval and not a year.",
      hi:
        "प्रारंभिक बौद्ध स्थलों में से किसी एक पर निरपेक्ष रूप से तिथि-निर्धारणीय अभिलेख या स्वतंत्र रूप " +
        "से तिथि-निर्धारणीय पुरातात्विक अनुक्रम इसे निपटा देगा। दोनों विद्यमान नहीं हैं। ध्यान दें: " +
        "चूँकि दीर्घ काल-गणना अन्य तिथियों को निश्चित करने हेतु बुद्ध से पीछे गिनती है, उनकी मृत्यु को एक " +
        "शताब्दी खिसकाना महावीर को खिसकाता है और पूरी छठी-शताब्दी रूपरेखा को बदल देता है।",
    },
    curriculum: [
      { level: "school", board: "CBSE", class: "12", subject: "history", chapterRef: "Kings, Farmers and Towns", verifiedAgainst: "NCERT Class XII History chapter titles", verifiedDate: "2026-11-11" },
      { level: "upsc", upscPaper: "history-optional", concept: "Chronological problems of early Indian history" },
      { level: "upsc", upscPaper: "gs1", concept: "Buddhism; sources and their limits" },
    ],
  },
  {
    id: "interp-mahavira-dates",
    question: {
      en: "When did Mahavira die, and does his date depend on the Buddha's?",
      hi: "महावीर की मृत्यु कब हुई, और क्या उनकी तिथि बुद्ध की तिथि पर निर्भर है?",
    },
    concerns: ["event-mahavira-nirvana", "event-parinibbana-buddha", "place-rajagriha"],
    positions: [
      {
        label: { en: "Traditional Jain chronology", hi: "परंपरागत जैन काल-गणना" },
        claim: { en: "Mahavira died around 527 BCE at Pavapuri.", hi: "महावीर की मृत्यु लगभग ५२७ ईसा पूर्व पावापुरी में हुई।" },
        evidence: {
          en: "The date long used in general histories, derived from the Jain tradition of interval counts.",
          hi: "सामान्य इतिहासों में लंबे समय तक प्रयुक्त तिथि, जैन परंपरा की अंतराल-गणना से व्युत्पन्न।",
        },
        strength: "contested",
        sources: [{ source: "singh-ancient-india", locator: "chapters on Jainism and Mahavira" }],
      },
      {
        label: { en: "Chronology derived from the Buddha's", hi: "बुद्ध की तिथि से व्युत्पन्न काल-गणना" },
        claim: {
          en:
            "If the Buddha died around 400 BCE or later, Mahavira's death moves correspondingly later, " +
            "to roughly the late fifth century BCE, because both traditions fix an interval between " +
            "the two teachers.",
          hi:
            "यदि बुद्ध की मृत्यु लगभग ४०० ईसा पूर्व या बाद हुई, तो महावीर की मृत्यु भी तदनुसार बाद खिसकती " +
            "है — लगभग पाँचवीं शताब्दी ईसा पूर्व के अंत में — क्योंकि दोनों परंपराएँ दोनों शिक्षकों के बीच " +
            "एक अंतराल निश्चित करती हैं।",
        },
        evidence: {
          en:
            "Jain and Buddhist sources both record a fixed relationship between the two lives, so the " +
            "dates are not independent: moving one moves the other. This is a case where a date is " +
            "contingent rather than merely uncertain, and the platform should say which.",
          hi:
            "जैन एवं बौद्ध स्रोत दोनों दोनों जीवन के बीच एक निश्चित संबंध दर्ज करते हैं, अतः तिथियाँ " +
            "स्वतंत्र नहीं हैं। यह ऐसा प्रकरण है जहाँ तिथि केवल अनिश्चित नहीं बल्कि आश्रित है।",
        },
        strength: "plausible-influence",
        sources: [{ source: "bechert-dating-buddha", locator: "contributions on the interval between Mahavira and the Buddha" }],
      },
    ],
    openQuestions: {
      en:
        "Included chiefly to teach contingency: this date is not independently disputed, it is " +
        "downstream of another dispute. Learners who see that structure once will recognise it " +
        "elsewhere — it is extremely common in ancient chronology.",
      hi:
        "मुख्यतः आश्रितता सिखाने हेतु शामिल: यह तिथि स्वतंत्र रूप से विवादित नहीं, बल्कि एक अन्य विवाद के " +
        "अधीन है। शिक्षार्थी जो यह संरचना एक बार देख लेते हैं वे उसे अन्यत्र पहचान लेंगे।",
    },
    curriculum: [{ level: "upsc", upscPaper: "gs1", concept: "Jainism; ancient Indian chronology" }],
  },
  {
    id: "interp-ashoka-accession",
    question: {
      en: "In which year was Ashoka consecrated?",
      hi: "अशोक का राज्याभिषेक किस वर्ष हुआ?",
    },
    concerns: ["event-ashoka-accession", "event-kalinga-war", "place-pataliputra"],
    positions: [
      {
        label: { en: "c. 268 BCE", hi: "लगभग २६८ ईसा पूर्व" },
        claim: { en: "The consecration occurred in 268 BCE.", hi: "राज्याभिषेक २६८ ईसा पूर्व में हुआ।" },
        evidence: { en: "The most commonly cited reconstruction; the Kalinga war then falls in the eighth regnal year, c. 261 BCE." },
        strength: "plausible-influence",
        sources: [{ source: "thapar-early-india", locator: "chapters on Ashoka's chronology" }],
      },
      {
        label: { en: "c. 269 or 265 BCE", hi: "लगभग २६९ या २६५ ईसा पूर्व" },
        claim: { en: "The consecration occurred a year earlier or a few years later.", hi: "राज्याभिषेक एक वर्ष पूर्व या कुछ वर्ष बाद हुआ।" },
        evidence: {
          en:
            "Alternative reconstructions that arise from the same re-examination of the Ashokan " +
            "synchronism which moves the Buddha's date. A difference of a few years here shifts the " +
            "Kalinga war by the same amount, because the war is dated by regnal year, not " +
            "independently.",
          hi:
            "वैकल्पिक पुनर्निर्माण जो अशोकीय समकालिकता की उसी पुनःपरीक्षा से उठते हैं जो बुद्ध की तिथि " +
            "खिसकाती है। यहाँ कुछ वर्षों का अंतर कलिंग युद्ध को उतना ही खिसका देता है, क्योंकि युद्ध की " +
            "तिथि राज्य-वर्ष से निर्धारित होती है, स्वतंत्र रूप से नहीं।",
        },
        strength: "plausible-influence",
        sources: [{ source: "bechert-dating-buddha", locator: "contributions re-examining the Ashokan synchronism" }],
      },
    ],
    openQuestions: {
      en:
        "Ashoka's own edicts date by regnal year and never name an absolute era, so every absolute " +
        "date attached to him is a reconstruction from later king-lists. The practical consequence for " +
        "this platform: the Kalinga war is shown as c. 261 BCE with a span, and the dependency is " +
        "stated rather than hidden behind a confident year.",
      hi:
        "अशोक के अपने अभिलेख राज्य-वर्ष से तिथि देते हैं और कभी कोई निरपेक्ष संवत् नहीं नामित करते, अतः " +
        "उनसे जुड़ी प्रत्येक निरपेक्ष तिथि परवर्ती राज-सूचियों से पुनर्निर्माण है।",
    },
    curriculum: [{ level: "upsc", upscPaper: "history-optional", concept: "Chronology of the Mauryas" }],
  },
  {
    id: "interp-kharavela-date",
    question: {
      en: "When did Kharavela rule Kalinga?",
      hi: "खारवेळ ने कलिंग पर कब शासन किया?",
    },
    concerns: ["event-kharavela-kalinga", "place-dhauli"],
    positions: [
      {
        label: { en: "Second century BCE", hi: "द्वितीय शताब्दी ईसा पूर्व" },
        claim: { en: "Kharavela ruled in the second century BCE.", hi: "खारवेळ ने द्वितीय शताब्दी ईसा पूर्व में शासन किया।" },
        evidence: {
          en:
            "Based on palaeographic comparison of the Hathigumpha inscription with other dated " +
            "inscriptions, and on one particular identification of the kings named in it.",
          hi:
            "हाथीगुम्फा अभिलेख की अन्य दिनांकित अभिलेखों के साथ लिपि-तुलना, एवं उसमें नामित राजाओं की " +
            "एक विशिष्ट पहचान पर आधारित।",
        },
        strength: "plausible-influence",
        sources: [{ source: "thapar-early-india", locator: "chapters on post-Mauryan regional states" }],
      },
      {
        label: { en: "First century BCE to first century CE", hi: "प्रथम शताब्दी ईसा पूर्व से प्रथम शताब्दी ईसवी" },
        claim: { en: "Kharavela ruled considerably later than usually assumed.", hi: "खारवेळ ने सामान्यतः माने जाने से काफी बाद शासन किया।" },
        evidence: {
          en:
            "Different identifications of the same named opponents — the reading of a damaged line " +
            "changes which foreign king is meant, and therefore which century the inscription " +
            "belongs to.",
          hi:
            "उन्हीं नामित प्रतिद्वंद्वियों की भिन्न पहचान — एक क्षतिग्रस्त पंक्ति का पाठ यह बदल देता है कि " +
            "किस विदेशी राजा का अभिप्राय है, और इसलिए अभिलेख किस शताब्दी का है।",
        },
        strength: "plausible-influence",
        sources: [{ source: "singh-ancient-india", locator: "chapters on Kharavela and the Hathigumpha inscription" }],
      },
    ],
    openQuestions: {
      en:
        "A single legible reading of the damaged line that names Kharavela's contemporary would settle " +
        "it, and the stone does not currently permit one. The spread between the two positions is over " +
        "a century, which is why the timeline shows a wide band rather than a marker.",
      hi:
        "क्षतिग्रस्त पंक्ति का एक पाठनीय पाठ, जो खारवेळ के समकालीन को नामित करे, इसे निपटा देगा — और " +
        "पाषाण वर्तमान में उसकी अनुमति नहीं देता।",
    },
    curriculum: [{ level: "upsc", upscPaper: "history-optional", concept: "Post-Mauryan regional states; Kharavela" }],
  },

  // ===========================================================================
  // EVIDENCE AND ITS LIMITS
  // ===========================================================================
  {
    id: "interp-kalinga-edict",
    question: {
      en: "Does Rock Edict XIII record a genuine change of heart, or a political statement?",
      hi: "क्या शिलालेख XIII हृदय-परिवर्तन का वास्तविक अभिलेख है, या एक राजनीतिक कथन?",
    },
    concerns: ["event-kalinga-war", "place-dhauli", "place-jaugada", "place-kalsi", "cliopatria-kalinga", "cliopatria-maurya-empire"],
    positions: [
      {
        label: { en: "The edict at its word", hi: "अभिलेख को उसके शब्दों में स्वीकार करना" },
        claim: {
          en:
            "Ashoka was genuinely moved by the suffering the conquest caused and genuinely changed his " +
            "policy thereafter.",
          hi: "विजय से हुए कष्ट से अशोक वास्तव में विचलित हुए और तत्पश्चात उन्होंने वास्तव में अपनी नीति बदली।",
        },
        evidence: {
          en:
            "The inscription itself, in the first person, naming the numbers deported and killed and " +
            "stating remorse. The policy change is corroborated by the absence of further large-scale " +
            "campaigning in the remaining edicts, and by the extensive non-military administration " +
            "the later edicts describe.",
          hi:
            "स्वयं अभिलेख, प्रथम पुरुष में, निर्वासित एवं मारे गए लोगों की संख्या नामित करता हुआ और " +
            "पश्चाताप व्यक्त करता हुआ। नीतिगत परिवर्तन शेष अभिलेखों में आगे के बड़े सैन्य अभियानों की " +
            "अनुपस्थिति से पुष्ट होता है।",
        },
        strength: "plausible-influence",
        sources: [{ source: "ashokan-rock-edict-xiii", locator: "Rock Edict XIII, the emperor's own statement" }],
      },
      {
        label: { en: "The inscription as political communication", hi: "राजनीतिक संचार के रूप में अभिलेख" },
        claim: {
          en:
            "The edict is a carefully composed public statement about how the king wished to be seen " +
            "to rule, issued in a newly conquered and strategically vital region.",
          hi:
            "अभिलेख इस विषय में सावधानीपूर्वक रचा गया सार्वजनिक कथन है कि राजा कैसे शासन करते दिखना " +
            "चाहते थे, और यह एक नव-विजित एवं रणनीतिक दृष्टि से महत्वपूर्ण क्षेत्र में जारी किया गया।",
        },
        evidence: {
          en:
            "The distribution is the decisive fact. The remorse edict is engraved IN Kalinga, at " +
            "Dhauli and Jaugada, in a modified version that replaces parts of the standard set and " +
            "adds separate edicts addressed to frontier officials and peoples. A purely private " +
            "remorse would not have been published there, in that form, to that audience. It also " +
            "carries the casualty figures, which serve the same document's purpose: they make the " +
            "remorse proportionate and therefore credible.",
          hi:
            "वितरण ही निर्णायक तथ्य है। पश्चाताप का अभिलेख कलिंग में ही, धौली एवं जौगड़ पर, एक संशोधित " +
            "संस्करण में अंकित है जो मानक समूह के कुछ भागों का स्थान लेता है और सीमांत अधिकारियों एवं " +
            "जनसमूहों को संबोधित पृथक अभिलेख जोड़ता है। पूर्णतः निजी पश्चाताप वहाँ उस रूप में उस " +
            "श्रोता-वर्ग हेतु प्रकाशित नहीं किया जाता।",
        },
        strength: "plausible-influence",
        sources: [
          { source: "thapar-early-india", locator: "chapters on Ashoka's dhamma and its political function" },
          { source: "ashokan-rock-edict-xiii", locator: "the separate Kalinga edicts at Dhauli and Jaugada" },
        ],
      },
      {
        label: { en: "Separating the policy from the sentiment", hi: "नीति को भावना से पृथक करना" },
        claim: {
          en:
            "The change in policy is documented and testable; the change in the king's inner state is " +
            "not. Both can be taught, but only one can be evidenced.",
          hi:
            "नीति में परिवर्तन प्रमाणित एवं परीक्षणयोग्य है; राजा की आंतरिक स्थिति में परिवर्तन नहीं। दोनों " +
            "पढ़ाए जा सकते हैं, पर केवल एक प्रमाणित किया जा सकता है।",
        },
        evidence: {
          en:
            "This is the distinction the platform adopts as its default presentation. It requires no " +
            "new evidence: it follows from what an inscription can and cannot establish. Note also " +
            "that the casualty figures are an official statement by the party responsible, recorded " +
            "for its own purposes — they are the best available evidence and they are not a neutral " +
            "census, and both of those things are true at once.",
          hi:
            "यह वही विभेद है जिसे मंच अपनी पूर्वनिर्धारित प्रस्तुति के रूप में अपनाता है। इसके लिए किसी नए " +
            "प्रमाण की आवश्यकता नहीं है। यह भी ध्यान दें कि हताहतों की संख्याएँ उत्तरदायी पक्ष का अपने " +
            "ही प्रयोजन हेतु आधिकारिक कथन हैं।",
        },
        strength: "demonstrated",
        sources: [
          { source: "singh-ancient-india", locator: "chapters on Ashoka and the limits of his edicts as evidence" },
          { source: "ashokan-rock-edict-xiii", locator: "Rock Edict XIII and the Kalinga versions" },
        ],
      },
    ],
    openQuestions: {
      en:
        "Sincerity is not a testable historical claim. What IS testable, and what the platform shows, " +
        "is the pattern of publication: which versions were engraved where, for which audience, with " +
        "which passages added or omitted. That pattern is evidence about the document; it is not " +
        "evidence about the king's heart, and no amount of reading will make it so.",
      hi:
        "ईमानदारी एक परीक्षणयोग्य ऐतिहासिक दावा नहीं है। जो परीक्षणयोग्य है वह प्रकाशन का प्रतिरूप है: " +
        "कौन से संस्करण कहाँ, किस श्रोता हेतु, किन अंशों को जोड़कर या हटाकर अंकित किए गए।",
    },
    curriculum: [
      { level: "school", board: "CBSE", class: "12", subject: "history", chapterRef: "Kings, Farmers and Towns", verifiedAgainst: "NCERT Class XII History chapter titles", verifiedDate: "2026-11-11" },
      { level: "upsc", upscPaper: "gs1", concept: "Ashoka's dhamma; nature of the edicts" },
      { level: "upsc", upscPaper: "history-optional", concept: "Ashokan edicts as historical sources; critical reading" },
    ],
  },
  {
    id: "interp-megasthenes-reliability",
    question: {
      en: "How far can Megasthenes be used as evidence for Mauryan India?",
      hi: "मौर्य भारत हेतु प्रमाण के रूप में मेगस्थनीज़ का उपयोग किस सीमा तक किया जा सकता है?",
    },
    concerns: ["place-pataliputra", "event-seleukid-treaty", "cliopatria-maurya-empire"],
    positions: [
      {
        label: { en: "Substantial reliance", hi: "पर्याप्त निर्भरता" },
        claim: {
          en:
            "Megasthenes was an eyewitness at the Mauryan court, so his account of Pataliputra, its " +
            "administration and its social divisions is direct evidence of high value.",
          hi:
            "मेगस्थनीज़ मौर्य दरबार में प्रत्यक्षदर्शी थे, अतः पाटलिपुत्र, उसके प्रशासन एवं उसके सामाजिक " +
            "विभाजनों का उनका विवरण उच्च मूल्य का प्रत्यक्ष प्रमाण है।",
        },
        evidence: {
          en:
            "He lived at Pataliputra as Seleukos' envoy, and his descriptions of the city's size, its " +
            "position at the confluence and its wooden palisade are specific enough to be checked " +
            "against archaeology at Kumhrar.",
          hi:
            "वे सेल्यूकस के दूत के रूप में पाटलिपुत्र में रहे, और नगर के आकार, संगम पर उसके स्थान एवं " +
            "उसकी काष्ठमय प्राचीर के उनके वर्णन इतने विशिष्ट हैं कि कुमहरार के पुरातत्व से जाँचे जा सकते हैं।",
        },
        strength: "plausible-influence",
        sources: [{ source: "megasthenes-indika", locator: "fragments on Pataliputra and Mauryan administration" }],
      },
      {
        label: { en: "Heavy qualification", hi: "गहन सीमांकन" },
        claim: {
          en:
            "The Indika survives only in fragments quoted by later authors with their own agendas, its " +
            "categories are Greek rather than Mauryan, and even ancient readers distrusted parts of " +
            "it.",
          hi:
            "इंडिका केवल परवर्ती लेखकों द्वारा उद्धृत खंडों में बचा है जिनके अपने प्रयोजन थे, इसकी " +
            "श्रेणियाँ मौर्य नहीं बल्कि यूनानी हैं, और प्राचीन पाठक भी इसके कुछ भागों पर संदेह करते थे।",
        },
        evidence: {
          en:
            "Three separate problems, each documented. (1) Transmission: the original is lost and what " +
            "survives comes through Strabo, Arrian and Diodorus, who quote selectively. (2) " +
            "Categories: his division of Indian society into seven classes does not map onto any " +
            "category attested in Indian sources, and may be his own or his informants' " +
            "systematisation. (3) Contemporary distrust: Strabo explicitly says Megasthenes is not " +
            "reliable on some matters, which is a judgement from a near-contemporary, not a modern " +
            "one.",
          hi:
            "तीन पृथक समस्याएँ, प्रत्येक प्रमाणित। (१) हस्तांतरण: मूल ग्रंथ लुप्त है और जो बचा है वह " +
            "स्ट्रैबो, अरियन एवं डायोडोरस के माध्यम से आता है जो चयनात्मक रूप से उद्धृत करते हैं। (२) " +
            "श्रेणियाँ: भारतीय समाज के सात वर्गों में उनका विभाजन किसी भारतीय स्रोत में प्रमाणित श्रेणी से " +
            "मेल नहीं खाता। (३) समकालीन अविश्वास: स्ट्रैबो स्पष्ट रूप से कहते हैं कि कुछ विषयों में " +
            "मेगस्थनीज़ विश्वसनीय नहीं हैं।",
        },
        strength: "demonstrated",
        sources: [
          { source: "megasthenes-indika", locator: "the transmission history and Strabo's judgement" },
          { source: "thapar-early-india", locator: "chapters on foreign accounts as sources for the Mauryas" },
        ],
      },
    ],
    openQuestions: {
      en:
        "Not a question that can be closed, but a discipline that can be applied: every use of " +
        "Megasthenes on this platform names the preserving author and book, never a page of " +
        "'Megasthenes', because there is no such page. Learners who notice that a source's own " +
        "transmission is part of its evidence have learned something that transfers to every ancient " +
        "text they will ever read.",
      hi:
        "यह ऐसा प्रश्न नहीं जिसे बंद किया जा सके, बल्कि एक अनुशासन है जिसे लागू किया जा सकता है: इस मंच पर " +
        "मेगस्थनीज़ के प्रत्येक उपयोग में संरक्षक लेखक एवं ग्रंथ का नाम दिया जाता है, कभी 'मेगस्थनीज़' का " +
        "पृष्ठ नहीं, क्योंकि ऐसा कोई पृष्ठ है नहीं।",
    },
    curriculum: [
      { level: "school", board: "CBSE", class: "12", subject: "history", chapterRef: "Through the Eyes of Travellers", verifiedAgainst: "NCERT Class XII History chapter titles", verifiedDate: "2026-11-11" },
      { level: "upsc", upscPaper: "gs1", concept: "Foreign accounts as sources; Megasthenes" },
      { level: "upsc", upscPaper: "history-optional", concept: "Critical evaluation of the Indika" },
    ],
  },
  {
    id: "interp-nalanda-date",
    question: {
      en: "Can the destruction of Nalanda be dated to a year?",
      hi: "क्या नालंदा के विनाश को किसी वर्ष में तिथिबद्ध किया जा सकता है?",
    },
    concerns: ["event-nalanda-destruction", "place-nalanda", "place-odantapuri", "place-vikramshila"],
    positions: [
      {
        label: { en: "The conventional date", hi: "परंपरागत तिथि" },
        claim: { en: "Nalanda was destroyed in 1193 CE.", hi: "नालंदा का विनाश ११९३ ईसवी में हुआ।" },
        evidence: {
          en:
            "This specific year circulates widely in general accounts and online. It derives from " +
            "reading the Tabaqat-i-Nasiri's narrative as a precise date.",
          hi:
            "यह विशिष्ट वर्ष सामान्य कथनों एवं इंटरनेट पर व्यापक रूप से प्रचलित है। यह तबक़ात-इ-नासिरी के " +
            "विवरण को एक सटीक तिथि के रूप में पढ़ने से व्युत्पन्न है।",
        },
        strength: "speculative",
        sources: [{ source: "tabaqat-i-nasiri", locator: "account of the destruction of the monasteries of Bihar" }],
      },
      {
        label: { en: "The supportable position", hi: "समर्थनीय स्थिति" },
        claim: {
          en:
            "The destruction happened around the turn of the thirteenth century, within a span of " +
            "several years, and cannot be dated to a specific year.",
          hi:
            "विनाश तेरहवीं शताब्दी के आरंभ के आसपास, कुछ वर्षों के परिसर के भीतर हुआ, और इसे किसी " +
            "विशिष्ट वर्ष में तिथिबद्ध नहीं किया जा सकता।",
        },
        evidence: {
          en:
            "Two independent limits. The narrative source was composed roughly four decades after the " +
            "events, by an author who was not an eyewitness here, and gives no year. The archaeology " +
            "at Nalanda confirms destruction by fire but a burn layer cannot be dated to a year " +
            "without an associated datable object, and none fixes this one. So the honest form is a " +
            "span, and the platform shows 1193-1200 CE as approximate rather than 1193 as fact.",
          hi:
            "दो स्वतंत्र सीमाएँ। कथात्मक स्रोत घटनाओं के लगभग चार दशक बाद रचा गया, ऐसे लेखक द्वारा जो " +
            "यहाँ प्रत्यक्षदर्शी नहीं था, और वह कोई वर्ष नहीं देता। नालंदा का पुरातत्व अग्नि द्वारा विनाश " +
            "की पुष्टि करता है परंतु एक दग्ध परत को वर्ष में तिथिबद्ध नहीं किया जा सकता।",
        },
        strength: "demonstrated",
        sources: [
          { source: "tabaqat-i-nasiri", locator: "composition date and the author's distance from the events" },
          { source: "singh-ancient-india", locator: "chapters on early medieval eastern India and Nalanda" },
        ],
      },
    ],
    openQuestions: {
      en:
        "A datable inscription or coin sealed in the destruction layer would settle it. This is the " +
        "pilot's worked example of precision honesty: the widely circulated answer is more specific " +
        "than the evidence supports, and the platform says so instead of repeating it.",
      hi:
        "विनाश-परत में सीलबद्ध कोई दिनांकित अभिलेख या सिक्का इसे निपटा देगा। यह सटीकता की ईमानदारी का " +
        "व्यावहारिक उदाहरण है: व्यापक रूप से प्रचलित उत्तर प्रमाण की समर्थन-क्षमता से अधिक विशिष्ट है।",
    },
    curriculum: [
      { level: "school", board: "CBSE", class: "12", subject: "history", chapterRef: "Through the Eyes of Travellers", verifiedAgainst: "NCERT Class XII History chapter titles", verifiedDate: "2026-11-11" },
      { level: "upsc", upscPaper: "gs1", concept: "Medieval India; Nalanda" },
      { level: "upsc", upscPaper: "history-optional", concept: "Dating problems; limits of narrative and archaeological evidence" },
    ],
  },
  {
    id: "interp-indraprastha-site",
    question: {
      en: "Is Indraprastha the Purana Qila site?",
      hi: "क्या इंद्रप्रस्थ पुराना क़िला स्थल है?",
    },
    concerns: ["place-indraprastha", "place-yamuna-river"],
    positions: [
      {
        label: { en: "Traditional identification", hi: "परंपरागत पहचान" },
        claim: {
          en:
            "Indraprastha, the city of the Mahabharata tradition, was located at what is now the " +
            "Purana Qila area of Delhi.",
          hi:
            "महाभारत परंपरा का नगर इंद्रप्रस्थ वर्तमान दिल्ली के पुराना क़िला क्षेत्र में स्थित था।",
        },
        evidence: {
          en:
            "A long and continuous local tradition, supported by the fact that excavations at Purana " +
            "Qila have produced early historic occupation material — so there was certainly a " +
            "settlement of the right general period at the right general place.",
          hi:
            "एक दीर्घ एवं अखंड स्थानीय परंपरा, इस तथ्य से समर्थित कि पुराना क़िला में उत्खनन से प्रारंभिक " +
            "ऐतिहासिक बस्ती का सामग्री-प्रमाण मिला है — अतः सही सामान्य काल की एक बस्ती सही सामान्य " +
            "स्थान पर निश्चित रूप से थी।",
        },
        strength: "contested",
        sources: [
          {
            source: "atlas-editorial-unsourced",
            locator: "identification of Indraprastha with the Purana Qila site",
            note: "Deliberately marked unsourced on the place record itself; this position states the case for the identification.",
          },
        ],
      },
      {
        label: { en: "The evidential objection", hi: "प्रमाण-संबंधी आपत्ति" },
        claim: {
          en:
            "The presence of an early historic settlement does not demonstrate that it was the " +
            "Indraprastha of the epic, and the epic city is not independently attested outside the " +
            "literary tradition.",
          hi:
            "एक प्रारंभिक ऐतिहासिक बस्ती की उपस्थिति यह प्रमाणित नहीं करती कि वह काव्य का इंद्रप्रस्थ थी, " +
            "और काव्य का नगर साहित्यिक परंपरा के बाहर स्वतंत्र रूप से प्रमाणित नहीं है।",
        },
        evidence: {
          en:
            "The link runs from a literary text, through an unbroken local tradition, to a mound that " +
            "does contain early material. Every step is reasonable and none is decisive. Contrast " +
            "Pataliputra, where a named site, a foreign eyewitness account and excavated Mauryan " +
            "structures converge.",
          hi:
            "यह संबंध एक साहित्यिक ग्रंथ से, एक अटूट स्थानीय परंपरा के माध्यम से, एक ऐसे टीले तक जाता है " +
            "जिसमें प्रारंभिक सामग्री है। प्रत्येक चरण युक्तिसंगत है और कोई भी निर्णायक नहीं। पाटलिपुत्र " +
            "की तुलना करें, जहाँ एक नामित स्थल, एक विदेशी प्रत्यक्षदर्शी विवरण एवं उत्खनित मौर्य संरचनाएँ " +
            "एक साथ मिलती हैं।",
        },
        strength: "demonstrated",
        sources: [{ source: "singh-ancient-india", locator: "chapters on the later Vedic period and the Kurus" }],
      },
    ],
    openQuestions: {
      en:
        "An inscription naming the settlement would settle it. Absent that, this is the corridor's " +
        "cleanest teaching case for separating literary tradition from archaeological demonstration — " +
        "and for noticing that 'widely believed and long attested' is not the same as 'established'. " +
        "The place record carries an explicit unsourced marker so the interface can show it.",
      hi:
        "बस्ती का नाम देने वाला कोई अभिलेख इसे निपटा देगा। उसके अभाव में, यह साहित्यिक परंपरा को " +
        "पुरातात्विक प्रदर्शन से पृथक करने का सबसे स्वच्छ शिक्षण-प्रकरण है।",
    },
    curriculum: [
      { level: "school", board: "CBSE", class: "12", subject: "history", chapterRef: "Kings, Farmers and Towns", verifiedAgainst: "NCERT Class XII History chapter titles", verifiedDate: "2026-11-11" },
      { level: "upsc", upscPaper: "history-optional", concept: "Literary vs archaeological evidence; site identification" },
    ],
  },
  {
    id: "interp-gupta-power-base",
    question: {
      en: "Where was the original Gupta power base?",
      hi: "गुप्त शक्ति का मूल आधार कहाँ था?",
    },
    concerns: ["event-gupta-foundation", "place-pataliputra", "place-prayagraj", "cliopatria-gupta-empire"],
    positions: [
      {
        label: { en: "Pataliputra", hi: "पाटलिपुत्र" },
        claim: { en: "The early Guptas ruled from Pataliputra, the old Magadhan capital.", hi: "प्रारंभिक गुप्त पाटलिपुत्र से शासन करते थे, जो पुरानी मगध राजधानी थी।" },
        evidence: {
          en:
            "The conventional identification, resting on Pataliputra's continued prominence as a " +
            "capital in the region and on later Gupta activity there.",
          hi:
            "परंपरागत पहचान, जो इस क्षेत्र की राजधानी के रूप में पाटलिपुत्र की निरंतर प्रमुखता एवं वहाँ " +
            "परवर्ती गुप्त गतिविधि पर आधारित है।",
        },
        strength: "plausible-influence",
        sources: [{ source: "thapar-early-india", locator: "chapters on the rise of the Guptas" }],
      },
      {
        label: { en: "The Prayaga region", hi: "प्रयाग क्षेत्र" },
        claim: {
          en:
            "The dynasty's earliest power lay in the Prayaga area rather than at Pataliputra.",
          hi: "वंश की प्रारंभिक शक्ति पाटलिपुत्र के बजाय प्रयाग क्षेत्र में थी।",
        },
        evidence: {
          en:
            "Argued from where the dynasty's own inscriptions actually are: the great dynastic record " +
            "is Harishena's composition on the pillar at Prayaga, and the earliest securely Gupta " +
            "epigraphic activity clusters there rather than at Patna. The absence of evidence at " +
            "Pataliputra for the dynasty's founding generation is the point.",
          hi:
            "वंश के अपने अभिलेख वास्तव में कहाँ हैं इससे तर्कित: महान राजवंश-अभिलेख प्रयाग के स्तंभ पर " +
            "हरिसेण की रचना है, और प्रारंभिक सुरक्षित गुप्त अभिलेखीय गतिविधि पाटना के बजाय वहाँ " +
            "एकत्रित होती है।",
        },
        strength: "plausible-influence",
        sources: [{ source: "singh-ancient-india", locator: "chapters on the Guptas and their inscriptions" }, { source: "prayaga-prashasti", locator: "the pillar and its inscription layers" }],
      },
    ],
    openQuestions: {
      en:
        "Cliopatria samples this polity from 324 CE without recording a capital, so the imported " +
        "geometry cannot settle it either. This is a case where the platform shows a wider positional " +
        "uncertainty on the founding event (30 km rather than 3 km) than on later Gupta events, " +
        "because that is what the evidence supports.",
      hi:
        "क्लिओपैट्रिया इस राजनीतिक सत्ता का नमूनाकरण ३२४ ईसवी से करता है पर किसी राजधानी को दर्ज नहीं " +
        "करता, अतः आयातित ज्यामिति भी इसे निपटा नहीं सकती।",
    },
    curriculum: [{ level: "upsc", upscPaper: "history-optional", concept: "Origins of the Gupta dynasty" }],
  },

  // ===========================================================================
  // PHYSICAL GEOGRAPHY AS A HISTORICAL EXPLANATION
  // ===========================================================================
  {
    id: "interp-pataliputra-decline",
    question: {
      en: "Why did Pataliputra decline?",
      hi: "पाटलिपुत्र का ह्रास क्यों हुआ?",
    },
    concerns: ["place-pataliputra", "event-faxian-visit", "event-xuanzang-visit", "event-harsha-accession", "place-ganga-river", "place-son-river"],
    positions: [
      {
        label: { en: "The riverine explanation", hi: "नदीय व्याख्या" },
        claim: {
          en:
            "Pataliputra declined because the rivers that made it moved. Channel shift and siltation at " +
            "the Ganga-Son confluence degraded the very junction the city was built to control.",
          hi:
            "पाटलिपुत्र का ह्रास इसलिए हुआ क्योंकि जिन नदियों ने इसे बनाया वे खिसक गईं। गंगा-सोन संगम पर " +
            "धारा-परिवर्तन एवं गाद-भराव ने उसी संगम को क्षरित कर दिया जिस पर यह नगर नियंत्रण हेतु बना था।",
        },
        evidence: {
          en:
            "The physical case is sound in general: this reach of the Ganga carries an enormous " +
            "sediment load on a very low gradient, its tributary confluences migrate, and the Son in " +
            "particular has a documented history of channel change. Cities at confluences are exposed " +
            "to exactly this.",
          hi:
            "भौतिक पक्ष सामान्यतः ठोस है: गंगा का यह खंड अत्यंत मंद ढाल पर अपार अवसाद भार ले जाता है, " +
            "इसकी सहायक नदियों के संगम प्रवास करते हैं, और विशेष रूप से सोन में धारा-परिवर्तन का प्रमाणित " +
            "इतिहास है।",
        },
        strength: "plausible-influence",
        sources: [{ source: "ncert-india-physical", locator: "Ch 3 'Drainage System' — confluences, siltation and channel migration" }],
      },
      {
        label: { en: "The political and economic explanation", hi: "राजनीतिक एवं आर्थिक व्याख्या" },
        claim: {
          en:
            "Pataliputra declined because power moved. The political centre shifted upstream to " +
            "Kannauj, and with it the routes, the revenue and the patronage that sustained a great " +
            "city. The river junction stayed where it was.",
          hi:
            "पाटलिपुत्र का ह्रास इसलिए हुआ क्योंकि शक्ति चली गई। राजनीतिक केंद्र ऊपर की ओर कन्नौज खिसका, " +
            "और उसके साथ वे मार्ग, राजस्व एवं आश्रय चले गए जो एक महानगर को धारित करते हैं। नदी-संगम " +
            "वहीं रहा।",
        },
        evidence: {
          en:
            "This is what the two dated primary observers actually report. Faxian, c. 400 CE, admires " +
            "Ashoka's stone palace but finds the city partly ruined. Xuanzang, c. 635 CE, finds it " +
            "largely deserted and describes Kannauj as a splendid capital instead. The documentary " +
            "sequence tracks the political shift, not a change in the river.",
          hi:
            "दो दिनांकित प्राथमिक प्रेक्षक वास्तव में यही बताते हैं। फाह्यान, लगभग ४०० ईसवी, अशोक के " +
            "पाषाण प्रासाद की सराहना करता है पर नगर को आंशिक रूप से खंडहर पाता है। हुआनसांग, लगभग ६३५ " +
            "ईसवी, इसे प्रायः वीरान पाता है और इसके बजाय कन्नौज को वैभवशाली राजधानी बताता है।",
        },
        strength: "plausible-influence",
        sources: [
          { source: "faxian-record", locator: "account of Pataliputra, c. 400 CE" },
          { source: "xuanzang-record", locator: "accounts of Pataliputra and Kanyakubja, c. 635 CE" },
          { source: "thapar-early-india", locator: "chapters on the shift of political centre to Kannauj" },
        ],
      },
    ],
    openQuestions: {
      en:
        "Settling this needs palaeochannel reconstruction of the Son and Ganga around Patna over the " +
        "first millennium CE — borehole and sediment work that this project has not consulted and " +
        "cannot substitute for. What the platform CAN do is put the two dated travellers' accounts " +
        "side by side at their own dates, which is the Compare Time experience, and let the learner " +
        "see that the documentary sequence tracks politics. Presenting the riverine explanation as " +
        "settled would be exactly the kind of confident physical determinism this project refuses.",
      hi:
        "इसे निपटाने हेतु प्रथम सहस्राब्दी ईसवी में पटना के आसपास सोन एवं गंगा के पुरातन-धारा " +
        "पुनर्निर्माण की आवश्यकता है — बोरहोल एवं अवसाद कार्य जो इस परियोजना ने परामृष्ट नहीं किया। मंच " +
        "जो कर सकता है वह है दो दिनांकित यात्रियों के विवरणों को उनकी अपनी तिथियों पर साथ रखना।",
    },
    curriculum: [
      { level: "school", board: "CBSE", class: "12", subject: "history", chapterRef: "Through the Eyes of Travellers", verifiedAgainst: "NCERT Class XII History chapter titles", verifiedDate: "2026-11-11" },
      { level: "school", board: "CBSE", class: "12", subject: "geography", book: "India — People and Economy", chapterRef: "Human Settlements", verifiedAgainst: "NCERT Class XII Geography chapter titles", verifiedDate: "2026-11-11" },
      { level: "upsc", upscPaper: "gs1", concept: "Urbanisation and de-urbanisation in ancient India" },
      { level: "upsc", upscPaper: "geography-optional", concept: "Site and situation; river channel migration and settlement" },
    ],
  },
  {
    id: "interp-gupta-golden-age",
    question: {
      en: "Was the Gupta period a 'Golden Age'?",
      hi: "क्या गुप्त काल एक 'स्वर्ण युग' था?",
    },
    concerns: ["event-gupta-foundation", "event-samudragupta-campaigns", "event-huna-incursions", "cliopatria-gupta-empire"],
    positions: [
      {
        label: { en: "The traditional characterisation", hi: "परंपरागत विशेषण" },
        claim: {
          en:
            "The Gupta period was a high point of Indian civilisation: classical Sanskrit literature, " +
            "major advances in mathematics and astronomy, mature sculpture and temple architecture, and " +
            "the great monastic universities.",
          hi:
            "गुप्त काल भारतीय सभ्यता का उच्च बिंदु था: शास्त्रीय संस्कृत साहित्य, गणित एवं खगोल में प्रमुख " +
            "उन्नति, परिपक्व मूर्तिकला एवं मंदिर वास्तुकला, और महान monastic विश्वविद्यालय।",
        },
        evidence: {
          en:
            "The cultural achievements are real and datable: Kalidasa's poetry, the decimal " +
            "numeration, Aryabhata's astronomy, the Sarnath and Mathura sculpture, the beginnings of " +
            "structural temple building, Nalanda's foundation. None of this is in dispute.",
          hi:
            "सांस्कृतिक उपलब्धियाँ वास्तविक एवं तिथि-निर्धारणीय हैं: कालिदास का काव्य, दशमलव संख्या-पद्धति, " +
            "आर्यभट का खगोल, साँची एवं मथुरा की मूर्तिकला, नालंदा की स्थापना। इनमें से कोई विवादित नहीं है।",
        },
        strength: "demonstrated",
        sources: [{ source: "singh-ancient-india", locator: "chapters on Gupta-period culture and science" }],
      },
      {
        label: { en: "The critical qualification", hi: "आलोचनात्मक सीमांकन" },
        claim: {
          en:
            "'Golden Age' describes the achievements of an elite and conceals the rest: the same period " +
            "shows the proliferation of grants that tied cultivators to land, sharpening social " +
            "hierarchy, and a political structure that was never as centrally held as the phrase " +
            "implies.",
          hi:
            "'स्वर्ण युग' एक अभिजात वर्ग की उपलब्धियों का वर्णन करता है और शेष को छिपाता है: इसी काल में " +
            "उन अनुदानों का प्रसार दिखता है जिन्होंने कृषकों को भूमि से बांधा, सामाजिक पदानुक्रम को तीव्र " +
            "किया, और एक ऐसी राजनीतिक संरचना जो कभी इतनी केंद्रीय नहीं थी जितना यह वाक्यांश संकेत करता है।",
        },
        evidence: {
          en:
            "The land-grant record itself, the inscriptional evidence for social stratification, and " +
            "the political map: the empire was a core with subordinate and tributary regions, as " +
            "Harishena's own list of submitted and reinstated rulers shows. Cliopatria's sampled " +
            "geometry for this polity fluctuates substantially across nineteen in-corridor rows, which " +
            "is not what a stable universal empire looks like.",
          hi:
            "स्वयं भूमि-अनुदान अभिलेख, सामाजिक स्तरीकरण हेतु अभिलेखीय प्रमाण, एवं राजनीतिक मानचित्र: " +
            "साम्राज्य एक केंद्र था जिसके अधीनस्थ एवं करद क्षेत्र थे, जैसा हरिसेण की समर्पित एवं पुनर्स्थापित " +
            "शासकों की अपनी सूची दर्शाती है।",
        },
        strength: "plausible-influence",
        sources: [
          { source: "thapar-early-india", locator: "chapters on Gupta society, land grants and political structure" },
          { source: "prayaga-prashasti", locator: "the list of uprooted, submitted and reinstated rulers" },
          { source: "cliopatria-v0-2-1", locator: "entity 'Gupta Empire' — 19 sampled rows in-corridor, area fluctuating between them" },
        ],
      },
    ],
    openQuestions: {
      en:
        "This is a historiographical question rather than an empirical one, and the useful outcome is " +
        "not a verdict but a habit: whenever a period is called golden, ask for whom. The platform " +
        "presents both positions and lets the learner hold them at once — the achievements were real " +
        "and the phrase is misleading, and neither statement cancels the other.",
      hi:
        "यह एक ऐतिहासिकी प्रश्न है, अनुभवजन्य नहीं, और उपयोगी परिणाम कोई निर्णय नहीं बल्कि एक आदत है: " +
        "जब भी किसी काल को स्वर्ण कहा जाए, पूछें कि किसके लिए।",
    },
    curriculum: [
      { level: "school", board: "CBSE", class: "6", subject: "social-science", concept: "The Gupta period", verifiedAgainst: "NCERT Class VI Our Pasts I", verifiedDate: "2026-11-11" },
      { level: "school", board: "CBSE", class: "12", subject: "history", chapterRef: "Kings, Farmers and Towns", verifiedAgainst: "NCERT Class XII History chapter titles", verifiedDate: "2026-11-11" },
      { level: "upsc", upscPaper: "gs1", concept: "Gupta period: the 'Golden Age' debate" },
      { level: "upsc", upscPaper: "history-optional", concept: "Historiography of the Gupta period" },
    ],
  },
  {
    id: "interp-monsoon-and-settlement",
    question: {
      en: "How far does the monsoon explain the corridor's settlement pattern?",
      hi: "इस क्षेत्र की बस्ती-प्रतिरूप की व्याख्या मानसून किस सीमा तक करता है?",
    },
    concerns: ["place-ganga-river", "place-haridwar", "place-sundarbans", "place-varanasi", "place-champaran"],
    positions: [
      {
        label: { en: "Rainfall as the primary constraint", hi: "वर्षा मुख्य नियंत्रक के रूप में" },
        claim: {
          en:
            "Settlement density in the Ganga basin follows rainfall and soil: the wet, alluvial middle " +
            "and lower basin supports dense agricultural settlement, and the drier western margins do " +
            "not.",
          hi:
            "गंगा बेसिन में बस्ती का घनत्व वर्षा एवं मृदा का अनुसरण करता है: गीला जलोढ़ मध्य एवं निचला " +
            "बेसिन सघन कृषि बस्ती को धारित करता है, और शुष्क पश्चिमी किनारे नहीं।",
        },
        evidence: {
          en:
            "The correlation is real and observable on the map: the great cities of the corridor sit " +
            "on the river in the high-rainfall alluvial plain, and the population distribution of the " +
            "modern states follows the same pattern. The physical geography curriculum teaches exactly " +
            "this relationship.",
          hi:
            "सह-संबंध वास्तविक एवं मानचित्र पर प्रेक्षणयोग्य है: क्षेत्र के महानगर उच्च-वर्षा जलोढ़ मैदान में " +
            "नदी पर स्थित हैं, और आधुनिक राज्यों का जनसंख्या वितरण उसी प्रतिरूप का अनुसरण करता है।",
        },
        strength: "plausible-influence",
        sources: [
          { source: "ncert-india-physical", locator: "Ch 4 'Climate' (monsoon) and Ch 3 'Drainage System'" },
          { source: "census-india-2011", locator: "district population distribution across Bihar, West Bengal and eastern UP", note: "Reference year 2011; no figure was transcribed for this pilot." },
        ],
      },
      {
        label: { en: "Infrastructure and history as the stronger determinants", hi: "अवसंरचना एवं इतिहास अधिक सशक्त निर्धारक के रूप में" },
        claim: {
          en:
            "Within the same rainfall zone, settlement density tracks canals, railways, land tenure and " +
            "administrative history far more closely than it tracks rainfall, which is near-uniform " +
            "across much of the plain.",
          hi:
            "उसी वर्षा-क्षेत्र के भीतर, बस्ती का घनत्व वर्षा की अपेक्षा नहरों, रेलमार्गों, भूमि-स्वामित्व एवं " +
            "प्रशासनिक इतिहास का बहुत अधिक निकटता से अनुसरण करता है — वर्षा तो मैदान के अधिकांश भाग में " +
            "लगभग एकसमान है।",
        },
        evidence: {
          en:
            "The Permanent Settlement of 1793 applied to Bengal, Bihar and Orissa — one rainfall zone, " +
            "three very different subsequent agrarian histories. Champaran's indigo system and the " +
            "Damodar's industrial towns are both explained by institutions and engineering, not by " +
            "precipitation. Rainfall sets a floor; history determines the pattern above it.",
          hi:
            "१७९३ का स्थायी बंदोबस्त बंगाल, बिहार एवं उड़ीसा पर लागू हुआ — एक वर्षा-क्षेत्र, तीन अत्यंत " +
            "भिन्न परवर्ती कृषि-इतिहास। चंपारण की नील व्यवस्था एवं दामोदर के औद्योगिक नगर दोनों " +
            "संस्थाओं एवं अभियांत्रिकी से समझाए जाते हैं, वर्षा से नहीं।",
        },
        strength: "demonstrated",
        sources: [
          { source: "ncert-india-people-economy", locator: "chapters on land resources, agriculture and human settlements" },
          { source: "ncert-tih-2", locator: "chapters on colonialism and the countryside" },
          { source: "regulation-i-1793", locator: "Regulation I of 1793", note: "Listed for reference; the regulation text was not consulted for this pilot." },
        ],
      },
    ],
    openQuestions: {
      en:
        "Both positions are defensible at different scales, and the honest answer is scale-dependent: " +
        "monsoon and alluvium explain why the basin supports dense settlement at all, institutions and " +
        "infrastructure explain where within it. A learner who can say which factor operates at which " +
        "scale has understood the corridor's Domain B material properly.",
      hi:
        "दोनों स्थितियाँ भिन्न मापनियों पर समर्थनीय हैं, और ईमानदार उत्तर मापनी-आश्रित है: मानसून एवं " +
        "जलोढ़ यह समझाते हैं कि बेसिन सघन बस्ती को धारित क्यों करता है, संस्थाएँ एवं अवसंरचना यह कि उसके " +
        "भीतर कहाँ।",
    },
    curriculum: [
      { level: "school", board: "CBSE", class: "11", subject: "geography", book: "India — Physical Environment", chapterRef: "Climate", verifiedAgainst: "NCERT Class XI Geography chapter titles", verifiedDate: "2026-11-11", registryTopicId: "c11-ind-ch4" },
      { level: "school", board: "CBSE", class: "12", subject: "geography", book: "India — People and Economy", chapterRef: "Human Settlements", verifiedAgainst: "NCERT Class XII Geography chapter titles", verifiedDate: "2026-11-11" },
      { level: "upsc", upscPaper: "geography-optional", concept: "Population distribution; determinants of settlement pattern" },
      { level: "upsc", upscPaper: "gs1", concept: "Physical and human geography of the Ganga basin" },
    ],
  },
];

export const CURATED_INTERPRETATION_IDS = CURATED_INTERPRETATIONS.map((i) => i.id);
