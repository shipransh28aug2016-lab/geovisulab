/**
 * LEARNING CONTENT — the four depth modes over ONE connected knowledge base.
 *
 * The requirement this file exists to satisfy, and the two ways it is usually failed:
 *
 *   "Depth modes must not be four separate databases."
 *   "Depth modes must not be 'more text' at higher levels."
 *
 * So the same subject appears at several depths, each entry `subject`-linked to the SAME underlying
 * record (place / event / feature / interpretation). Nothing is duplicated and nothing is forked: a
 * Discover entry and a Research entry on Pataliputra point at one `place-pataliputra` record, one set
 * of sources, one geometry and one uncertainty radius. What changes between them is STRUCTURE:
 *
 *   discover   what it is and where — one idea, concrete, on the map
 *   understand how it connects — rivers to cities, routes to settlements, cause to consequence
 *   analyse    why, and on what evidence — competing readings, precision, what would settle it
 *   research   the state of the question — historiography, source criticism, open problems
 *
 * `analyticalFocus` is what makes this checkable rather than aspirational: it states what the mode
 * asks the learner to DO. A reviewer can read the four entries for one subject and confirm that the
 * higher modes add analysis and not adjectives. `questions` always carry `feedback` that explains the
 * reasoning, because a right/wrong verdict teaches nothing about a contested date.
 *
 * Note the deliberate overlap: several questions at analyse and research level have no single correct
 * answer and are marked `short-answer` or `source-evaluation`. Their feedback names what a good answer
 * must engage with, not what it must conclude.
 */

import type { LearningContent } from "../../../../src/lib/atlas/model";

export const CURATED_LEARNING: LearningContent[] = [
  // ===========================================================================
  // PATALIPUTRA — the flagship subject, all four depths
  // ===========================================================================
  {
    id: "learn-pataliputra-discover",
    subject: "place-pataliputra",
    depthMode: "discover",
    title: { en: "Pataliputra: the city at the river junction", hi: "पाटलिपुत्र: नदी-संगम का नगर" },
    body: {
      en:
        "Find Patna on the map. Now look at the rivers. The Ganga runs past it from west to east, and " +
        "the Son comes up from the south to meet it almost exactly there. Pataliputra — the ancient " +
        "name for the same place — was built at that junction. Two thousand five hundred years ago it " +
        "was one of the largest cities in the world, and it was the capital of the Mauryan empire, " +
        "which at its greatest stretched from Afghanistan in the north-west to Bengal in the east. " +
        "Zoom out and you can see why the junction mattered: the Ganga is the road, and Pataliputra " +
        "sits where a second road joins it.",
      hi:
        "मानचित्र पर पटना खोजिए। अब नदियों को देखिए। गंगा उसके पास से पश्चिम से पूर्व बहती है, और सोन " +
        "दक्षिण से आकर ठीक वहीं उससे मिलती है। पाटलिपुत्र — उसी स्थान का प्राचीन नाम — उसी संगम पर बसाया " +
        "गया था। ढाई हज़ार वर्ष पूर्व यह विश्व के विशालतम नगरों में से एक था, और यह मौर्य साम्राज्य की " +
        "राजधानी थी जो अपने चरम पर उत्तर-पश्चिम में अफ़ग़ानिस्तान से पूर्व में बंगाल तक फैला था। ज़ूम आउट " +
        "कीजिए और आप देख पाएँगे कि संगम क्यों महत्वपूर्ण था: गंगा ही मार्ग है, और पाटलिपुत्र वहीं है जहाँ " +
        "एक दूसरा मार्ग उससे आ मिलता है।",
    },
    concepts: ["confluence", "capital city", "river transport"],
    analyticalFocus: {
      en: "Locate the city, then locate the two rivers that meet there. Say what each river is for.",
      hi: "नगर का स्थान बताइए, फिर उन दो नदियों का स्थान बताइए जो वहाँ मिलती हैं। प्रत्येक नदी का कार्य बताइए।",
    },
    questions: [
      {
        id: "q-pat-d1",
        prompt: { en: "Which two rivers meet at Pataliputra?", hi: "पाटलिपुत्र में कौन सी दो नदियाँ मिलती हैं?" },
        kind: "map-based",
        options: [
          { en: "Ganga and Son", hi: "गंगा और सोन" },
          { en: "Ganga and Yamuna", hi: "गंगा और यमुना" },
          { en: "Ganga and Gandak", hi: "गंगा और गंडक" },
          { en: "Son and Narmada", hi: "सोन और नर्मदा" },
        ],
        correctIndex: 0,
        feedback: {
          en:
            "Ganga and Son. The Gandak also joins the Ganga nearby — about 40 km north-west, opposite " +
            "Sonpur — which is why Pataliputra controlled a whole cluster of junctions and not just " +
            "one. The Yamuna joins the Ganga much further west, at Prayagraj.",
          hi:
            "गंगा और सोन। गंडक भी समीप ही गंगा से मिलती है — लगभग ४० किमी उत्तर-पश्चिम, सोनपुर के सामने " +
            "— यही कारण है कि पाटलिपुत्र केवल एक नहीं बल्कि संगमों के पूरे समूह को नियंत्रित करता था। " +
            "यमुना बहुत पश्चिम में, प्रयागराज में गंगा से मिलती है।",
        },
        sources: [{ source: "natural-earth", locator: "ne_10m_rivers_lake_centerlines — Ganga, Son and Gandak confluences" }],
      },
      {
        id: "q-pat-d2",
        prompt: {
          en: "Pataliputra is the ancient name of which modern city?",
          hi: "पाटलिपुत्र किस आधुनिक नगर का प्राचीन नाम है?",
        },
        kind: "multiple-choice",
        options: [
          { en: "Patna", hi: "पटना" },
          { en: "Varanasi", hi: "वाराणसी" },
          { en: "Rajgir", hi: "राजगीर" },
          { en: "Prayagraj", hi: "प्रयागराज" },
        ],
        correctIndex: 0,
        feedback: {
          en:
            "Patna. Rajgir is ancient Rajagriha, the EARLIER capital of Magadha — a different city " +
            "about 100 km south-east. Varanasi is Kashi, and Prayagraj is Prayaga. All four are in " +
            "this corridor and all four were important, so keeping the pairs straight matters.",
          hi:
            "पटना। राजगीर प्राचीन राजगृह है, मगध की पूर्ववर्ती राजधानी — लगभग १०० किमी दक्षिण-पूर्व में " +
            "एक भिन्न नगर। वाराणसी काशी है और प्रयागराज प्रयाग है।",
        },
        sources: [{ source: "singh-ancient-india", locator: "chapters on early historic cities" }],
      },
    ],
    sources: [
      { source: "reference-coordinates", locator: "Patna reference position" },
      { source: "ncert-tih-1", locator: "'Kings, Farmers and Towns'" },
    ],
  },
  {
    id: "learn-pataliputra-understand",
    subject: "place-pataliputra",
    depthMode: "understand",
    title: {
      en: "Why here? Connecting rivers, routes and the rise of a capital",
      hi: "यहीं क्यों? नदियों, मार्गों एवं एक राजधानी के उदय को जोड़ना",
    },
    body: {
      en:
        "Magadha's first capital was Rajagriha, inside a ring of hills — a place you could defend " +
        "because the landscape defended it. Then, some time around 490-460 BCE, the capital moved to " +
        "Pataliputra, which has no hills at all. That looks like a worse choice until you ask what each " +
        "site is FOR. Rajagriha controls a place; Pataliputra controls movement. From the " +
        "Ganga-Son confluence a ruler could send grain, soldiers and messages east to Bengal, west " +
        "towards the Doab, south up the Son into the central Indian uplands, and north across the " +
        "river towards Vaishali and the Gandak route to Nepal. A state that wants to grow needs the " +
        "second kind of site. The move from a hill fort to a river junction is therefore not a decline " +
        "in defensive thinking but a change in what the state was trying to do — and you can see the " +
        "same logic in Varanasi, Kannauj and Prayagraj, all of which sit on the river rather than " +
        "above it.",
      hi:
        "मगध की पहली राजधानी राजगृह थी, पहाड़ियों की एक श्रृंखला के भीतर — ऐसा स्थान जिसे आप रक्षा कर सकते " +
        "थे क्योंकि परिदृश्य उसकी रक्षा करता था। फिर लगभग ४९०–४६० ईसा पूर्व के आसपास राजधानी पाटलिपुत्र " +
        "चली गई, जहाँ कोई पहाड़ी नहीं है। यह एक खराब चुनाव तब तक दिखता है जब तक आप यह न पूछें कि प्रत्येक " +
        "स्थल किसलिए है। राजगृह एक स्थान को नियंत्रित करता है; पाटलिपुत्र आवागमन को नियंत्रित करता है। " +
        "गंगा-सोन संगम से एक शासक अनाज, सैनिक एवं संदेश पूर्व में बंगाल, पश्चिम में दोआब की ओर, दक्षिण " +
        "में सोन के साथ मध्य भारत के ऊँचे भाग, और उत्तर में नदी पार वैशाली एवं नेपाल जाने वाले गंडक मार्ग " +
        "तक भेज सकता था।",
    },
    concepts: ["site and situation", "defensive terrain", "riverine communication", "hinterland"],
    analyticalFocus: {
      en:
        "Compare two capitals of the SAME state — Rajagriha and Pataliputra — using the map. For each, " +
        "list what it controls. Then explain the move as a change of purpose, not as progress or " +
        "decline.",
      hi:
        "मानचित्र का उपयोग करते हुए एक ही राज्य की दो राजधानियों — राजगृह एवं पाटलिपुत्र — की तुलना " +
        "कीजिए। प्रत्येक हेतु सूची बनाइए कि वह क्या नियंत्रित करता है। तत्पश्चात इस स्थानांतरण को " +
        "उन्नति या ह्रास के रूप में नहीं बल्कि प्रयोजन में परिवर्तन के रूप में समझाइए।",
    },
    questions: [
      {
        id: "q-pat-u1",
        prompt: {
          en: "Put these in the order they became the centre of power in the middle Ganga.",
          hi: "मध्य गंगा में शक्ति के केंद्र बनने के क्रम में इन्हें रखिए।",
        },
        kind: "sequence",
        options: [
          { en: "Rajagriha (Haryanka Magadha)", hi: "राजगृह (हर्यंक मगध)" },
          { en: "Pataliputra (Mauryan empire)", hi: "पाटलिपुत्र (मौर्य साम्राज्य)" },
          { en: "Kannauj (Harsha)", hi: "कन्नौज (हर्ष)" },
        ],
        correctOrder: ["0", "1", "2"],
        feedback: {
          en:
            "Rajagriha, then Pataliputra, then Kannauj. Notice the direction of travel: the centre of " +
            "power moves from the hills onto the river, and then UPSTREAM along the river. Each move is " +
            "a change in what the state needed to control, and all three cities are still on the same " +
            "physical corridor. The move to Kannauj is roughly a thousand years after the move to " +
            "Pataliputra.",
          hi:
            "राजगृह, फिर पाटलिपुत्र, फिर कन्नौज। गति की दिशा पर ध्यान दीजिए: शक्ति का केंद्र पहाड़ियों से " +
            "नदी पर आता है, और फिर नदी के साथ ऊपर की ओर जाता है। प्रत्येक स्थानांतरण इस बात में परिवर्तन " +
            "है कि राज्य को क्या नियंत्रित करने की आवश्यकता थी।",
        },
        sources: [{ source: "thapar-early-india", locator: "chapters on the rise of Magadha and the post-Gupta shift to Kannauj" }],
      },
      {
        id: "q-pat-u2",
        prompt: {
          en:
            "Rajagriha had a defensible hill ring. Pataliputra had none. Why was the less defensible " +
            "site chosen?",
          hi:
            "राजगृह के पास रक्षा-योग्य पहाड़ी वलय था। पाटलिपुत्र के पास कोई नहीं था। कम रक्षा-योग्य स्थल " +
            "क्यों चुना गया?",
        },
        kind: "short-answer",
        feedback: {
          en:
            "A good answer does two things. First, it identifies what Pataliputra gains: control of the " +
            "Ganga's east-west traffic, of the Son route to the south, and of the crossing north " +
            "towards Vaishali and the Gandak. Second, it recognises the trade-off rather than ignoring " +
            "it — an open city on a plain is harder to defend, and the answer should say what " +
            "compensated (walls, garrison, and above all the wealth that river control produced, which " +
            "paid for both). An answer that says only 'because it was fertile' has described the " +
            "region, not the site.",
          hi:
            "एक अच्छा उत्तर दो कार्य करता है। पहला, वह पहचानता है कि पाटलिपुत्र क्या प्राप्त करता है: " +
            "गंगा के पूर्व-पश्चिम आवागमन, दक्षिण जाने वाले सोन मार्ग, एवं उत्तर में वैशाली की ओर जाने वाले " +
            "मार्ग पर नियंत्रण। दूसरा, वह इस तुलना को नजरअंदाज करने के बजाय स्वीकार करता है।",
        },
        sources: [{ source: "thapar-early-india", locator: "chapters on the shift of the Magadhan capital" }],
      },
    ],
    sources: [
      { source: "thapar-early-india", locator: "chapters on the rise of Magadha" },
      { source: "natural-earth", locator: "Ganga, Son and Gandak confluence geometry" },
    ],
  },
  {
    id: "learn-pataliputra-analyse",
    subject: "place-pataliputra",
    depthMode: "analyse",
    title: {
      en: "Three travellers, one city: reading decline from dated testimony",
      hi: "तीन यात्री, एक नगर: दिनांकित साक्ष्य से ह्रास का पाठ",
    },
    body: {
      en:
        "Three dated observers describe Pataliputra across roughly six and a half centuries, and the " +
        "sequence is the evidence. Megasthenes, a Seleukid envoy at the Mauryan court around 300 BCE, " +
        "describes a great city at the confluence with a wooden palisade and a large population — " +
        "though the original Indika is lost and we only have him through later Greek authors who " +
        "quoted selectively. Faxian, a Chinese pilgrim travelling roughly 399-414 CE, still admires " +
        "Ashoka's stone palace but finds the city partly ruined. Xuanzang, there around 630-644 CE, " +
        "finds it largely deserted and describes Kannauj as the splendid capital instead. Read the " +
        "three together and you have a decline curve with three fixed points on it — which is far more " +
        "than most ancient cities offer. But note what the evidence does NOT establish: it dates the " +
        "decline, it does not explain it. Whether the cause was the rivers moving, power shifting " +
        "upstream to Kannauj, or both, is an open question that this platform presents as two argued " +
        "positions rather than one answer.",
      hi:
        "तीन दिनांकित प्रेक्षक लगभग साढ़े छह शताब्दियों में पाटलिपुत्र का वर्णन करते हैं, और यही अनुक्रम " +
        "प्रमाण है। मेगस्थनीज़, लगभग ३०० ईसा पूर्व में मौर्य दरबार में सेल्यूकिद दूत, संगम पर एक महानगर का " +
        "वर्णन करता है — यद्यपि मूल इंडिका लुप्त है और हमारे पास केवल परवर्ती यूनानी लेखकों के चयनात्मक " +
        "उद्धरण हैं। फाह्यान, लगभग ३९९–४१४ ईसवी में यात्रा करता हुआ, अशोक के पाषाण प्रासाद की सराहना " +
        "करता है पर नगर को आंशिक रूप से खंडहर पाता है। हुआनसांग, लगभग ६३०–६४४ ईसवी में, इसे प्रायः वीरान " +
        "पाता है और इसके बजाय कन्नौज को वैभवशाली राजधानी बताता है।",
    },
    concepts: ["primary source", "source criticism", "transmission of texts", "urban decline", "correlation vs causation"],
    analyticalFocus: {
      en:
        "Work with the three accounts side by side at their own dates. For each: what does it actually " +
        "say, how far from the events was its author, and through what route has it reached us? Then " +
        "state what the sequence CAN establish and what it cannot. Finally compare the two explanations " +
        "for the decline and say what evidence would distinguish between them.",
      hi:
        "तीनों विवरणों को उनकी अपनी तिथियों पर साथ लेकर कार्य कीजिए। प्रत्येक हेतु: वह वास्तव में क्या " +
        "कहता है, उसका लेखक घटनाओं से कितनी दूर था, और वह किस मार्ग से हम तक पहुँचा है? तत्पश्चात " +
        "बताइए कि यह अनुक्रम क्या स्थापित कर सकता है और क्या नहीं।",
    },
    questions: [
      {
        id: "q-pat-a1",
        prompt: {
          en: "Which source has the weakest transmission, and why?",
          hi: "किस स्रोत की हस्तांतरण-परंपरा सबसे दुर्बल है, और क्यों?",
        },
        kind: "source-evaluation",
        options: [
          { en: "Megasthenes — original lost, survives only in selective later quotations", hi: "मेगस्थनीज़ — मूल लुप्त, केवल चयनात्मक परवर्ती उद्धरणों में बचा" },
          { en: "Faxian — first-person account, written after the journey, translated from Chinese", hi: "फाह्यान — प्रथम-पुरुष विवरण, यात्रा के बाद लिखित, चीनी से अनूदित" },
          { en: "Xuanzang — first-person account, compiled with a colleague, translated from Chinese", hi: "हुआनसांग — प्रथम-पुरुष विवरण, एक सहयोगी के साथ संकलित, चीनी से अनूदित" },
        ],
        correctIndex: 0,
        feedback: {
          en:
            "Megasthenes. The Indika is lost; what survives comes through Strabo, Arrian and Diodorus, " +
            "who quote for their own purposes. Worse, Strabo himself says Megasthenes is unreliable on " +
            "some matters — a near-contemporary's judgement, not a modern one. That said, all three " +
            "have problems: Faxian and Xuanzang reach us as translations of translations. The point is " +
            "not that Megasthenes is worthless but that his evidence has an extra layer of other " +
            "people's selection in it, and any claim resting on him must say so.",
          hi:
            "मेगस्थनीज़। इंडिका लुप्त है; जो बचा है वह स्ट्रैबो, अरियन एवं डायोडोरस के माध्यम से आता है, " +
            "जो अपने प्रयोजन हेतु उद्धृत करते हैं। उससे भी बुरा, स्ट्रैबो स्वयं कहते हैं कि मेगस्थनीज़ कुछ " +
            "विषयों में विश्वसनीय नहीं हैं।",
        },
        sources: [{ source: "megasthenes-indika", locator: "transmission history; Strabo's judgement" }],
      },
      {
        id: "q-pat-a2",
        prompt: {
          en:
            "The three accounts date Pataliputra's decline. Do they explain it? Say precisely what the " +
            "sequence establishes and what it leaves open.",
          hi:
            "ये तीन विवरण पाटलिपुत्र के ह्रास की तिथि देते हैं। क्या वे इसकी व्याख्या भी करते हैं? ठीक-ठीक " +
            "बताइए कि यह अनुक्रम क्या स्थापित करता है और क्या खुला छोड़ता है।",
        },
        kind: "short-answer",
        feedback: {
          en:
            "Establishes: that Pataliputra was large and functioning c. 300 BCE, partly ruined by c. " +
            "400 CE, and largely deserted by c. 635 CE; and that by the seventh century political " +
            "prestige had moved to Kannauj. Leaves open: WHY. The riverine explanation (channel shift " +
            "and siltation degrading the Ganga-Son junction the city was built to control) and the " +
            "political explanation (power, revenue and patronage moving upstream) are both consistent " +
            "with all three accounts. Distinguishing them needs palaeochannel reconstruction around " +
            "Patna — borehole and sediment work this project has not consulted. An answer that " +
            "confidently picks one has over-read the evidence.",
          hi:
            "स्थापित करता है: कि पाटलिपुत्र लगभग ३०० ईसा पूर्व में विशाल एवं कार्यरत था, लगभग ४०० ईसवी तक " +
            "आंशिक रूप से खंडहर, और लगभग ६३५ ईसवी तक प्रायः वीरान। खुला छोड़ता है: क्यों। नदीय व्याख्या " +
            "एवं राजनीतिक व्याख्या दोनों तीनों विवरणों के अनुरूप हैं।",
        },
        sources: [
          { source: "faxian-record", locator: "account of Pataliputra" },
          { source: "xuanzang-record", locator: "accounts of Pataliputra and Kanyakubja" },
        ],
      },
    ],
    sources: [
      { source: "megasthenes-indika", locator: "fragments on Pataliputra" },
      { source: "faxian-record", locator: "account of Pataliputra, c. 400 CE" },
      { source: "xuanzang-record", locator: "account of Pataliputra, c. 635 CE" },
    ],
  },
  {
    id: "learn-pataliputra-research",
    subject: "place-pataliputra",
    depthMode: "research",
    title: {
      en: "Pataliputra: the state of the question",
      hi: "पाटलिपुत्र: प्रश्न की वर्तमान स्थिति",
    },
    body: {
      en:
        "At research level the subject is not the city but the evidence. Four problems are live. " +
        "FIRST, the physical city is barely recoverable: the Mauryan palisade and the pillared hall " +
        "excavated at Kumhrar are the principal structural remains, and alluvial aggradation plus the " +
        "modern city of Patna above them make large-scale excavation impossible, so the archaeology " +
        "cannot independently test what the texts say. SECOND, Megasthenes' seven-class division of " +
        "Indian society maps onto no category attested in Indian sources and may be his own or his " +
        "informants' systematisation — a case where a source's categories are the object of study " +
        "rather than a window onto its subject. THIRD, the identification of the 'Eranboas' with the " +
        "Son rests on Greek transmission of an Indic river name and is treated as secure but is not " +
        "independently demonstrated. FOURTH, the decline chronology is three points, not a curve: " +
        "between Faxian and Xuanzang there is a gap of over two centuries in which nothing here is " +
        "observed at all, and the interval is exactly when most of the change must have happened. The " +
        "honest position is that Pataliputra's rise is well evidenced, its decline is dated but " +
        "unexplained, and its internal structure is largely irrecoverable.",
      hi:
        "शोध स्तर पर विषय नगर नहीं बल्कि प्रमाण है। चार समस्याएँ विद्यमान हैं। पहली, भौतिक नगर की पुनर्प्राप्ति " +
        "प्रायः असंभव है: कुमहरार में उत्खनित मौर्य प्राचीर एवं स्तंभ-मंडप प्रमुख संरचनात्मक अवशेष हैं, और " +
        "जलोढ़ निक्षेपण तथा उनके ऊपर बसा आधुनिक पटना नगर बड़े पैमाने पर उत्खनन को असंभव बनाते हैं। दूसरी, " +
        "मेगस्थनीज़ का भारतीय समाज का सात-वर्गीय विभाजन किसी भारतीय स्रोत में प्रमाणित श्रेणी से मेल नहीं " +
        "खाता। तीसरी, 'एरानबोआस' की सोन के साथ पहचान यूनानी हस्तांतरण पर आधारित है। चौथी, ह्रास की " +
        "काल-गणना तीन बिंदु है, वक्र नहीं।",
    },
    concepts: ["historiography", "source criticism", "archaeological limits", "evidential gaps", "category imposition"],
    analyticalFocus: {
      en:
        "For each of the four problems, classify it: is it a limit of the SOURCES, of the ARCHAEOLOGY, " +
        "or of the QUESTIONS being asked? Then state which one, if resolved, would most change the " +
        "account of Pataliputra — and what kind of new evidence that would require.",
      hi:
        "चारों समस्याओं में से प्रत्येक को वर्गीकृत कीजिए: क्या यह स्रोतों की सीमा है, पुरातत्व की, या " +
        "पूछे जा रहे प्रश्नों की? तत्पश्चात बताइए कि किसके हल होने से पाटलिपुत्र का विवरण सबसे अधिक " +
        "बदलेगा — और उसके लिए किस प्रकार के नए प्रमाण की आवश्यकता होगी।",
    },
    questions: [
      {
        id: "q-pat-r1",
        prompt: {
          en:
            "Why can't the archaeology of Pataliputra settle the decline question, even in principle?",
          hi: "पाटलिपुत्र का पुरातत्व ह्रास के प्रश्न को क्यों नहीं निपटा सकता, यहाँ तक कि सिद्धांततः भी?",
        },
        kind: "short-answer",
        feedback: {
          en:
            "Two reasons, and a strong answer gives both. (1) Deposition: the Ganga's floodplain has " +
            "aggraded continuously, so Mauryan and Gupta levels lie deep under waterlogged alluvium, " +
            "and modern Patna sits above them — excavation at that depth under a living city is not " +
            "practicable. (2) Even if excavated, abandonment is not an archaeological event with a " +
            "date: a city empties gradually and leaves an absence of material rather than a deposit, " +
            "and absences are notoriously hard to date. This is why the decline rests on the three " +
            "textual observations and nothing else — and why those observations, being three discrete " +
            "visits, cannot distinguish a steady decline from a collapse and partial recovery.",
          hi:
            "दो कारण, और एक सशक्त उत्तर दोनों देता है। (१) निक्षेपण: गंगा के बाढ़ मैदान में लगातार " +
            "निक्षेपण हुआ है, अतः मौर्य एवं गुप्त स्तर जल-संतृप्त जलोढ़ के गहरे नीचे हैं और आधुनिक पटना " +
            "उनके ऊपर बसा है। (२) उत्खनित होने पर भी, परित्याग कोई दिनांक-युक्त पुरातात्विक घटना नहीं " +
            "है: एक नगर धीरे-धीरे खाली होता है और सामग्री की अनुपस्थिति छोड़ता है, निक्षेप नहीं।",
        },
        sources: [{ source: "singh-ancient-india", locator: "chapters on early historic cities and the Kumhrar excavations" }],
      },
      {
        id: "q-pat-r2",
        prompt: {
          en:
            "A textbook states that Megasthenes described Mauryan society as divided into seven " +
            "classes. What must a careful historian add to that sentence?",
          hi:
            "एक पाठ्यपुस्तक कहती है कि मेगस्थनीज़ ने मौर्य समाज को सात वर्गों में विभक्त बताया। एक सावधान " +
            "इतिहासकार को उस वाक्य में क्या जोड़ना चाहिए?",
        },
        kind: "source-evaluation",
        feedback: {
          en:
            "At least three qualifications. (1) Megasthenes did not write what we read — his text is " +
            "lost and the seven classes reach us through later Greek authors summarising him. (2) The " +
            "division maps onto no category attested in Indian sources of the period, so it is at least " +
            "as much evidence about Greek habits of classification as about Mauryan society; a Greek " +
            "observer looking for a social taxonomy would find or impose one. (3) Strabo, writing " +
            "within living memory of the tradition, explicitly distrusts parts of Megasthenes. The " +
            "sentence is not false, but as written it presents a fragmentary, filtered, disputed " +
            "source as a straightforward description of a society — which is the most common way " +
            "ancient evidence is misrepresented at exactly the level where it gets memorised.",
          hi:
            "कम से कम तीन सीमांकन। (१) मेगस्थनीज़ ने वह नहीं लिखा जो हम पढ़ते हैं — उनका ग्रंथ लुप्त है। " +
            "(२) यह विभाजन उस काल के किसी भारतीय स्रोत में प्रमाणित श्रेणी से मेल नहीं खाता, अतः यह मौर्य " +
            "समाज के विषय में उतना ही प्रमाण है जितना वर्गीकरण की यूनानी आदतों के विषय में। (३) स्ट्रैबो " +
            "मेगस्थनीज़ के कुछ भागों पर स्पष्ट रूप से संदेह करते हैं।",
        },
        sources: [
          { source: "megasthenes-indika", locator: "transmission history; the seven classes; Strabo's judgement" },
          { source: "thapar-early-india", locator: "chapters on foreign accounts as sources for the Mauryas" },
        ],
      },
    ],
    sources: [
      { source: "singh-ancient-india", locator: "chapters on early historic cities and Kumhrar" },
      { source: "megasthenes-indika", locator: "fragments and their transmission" },
      { source: "thapar-early-india", locator: "chapters on the Mauryas and their sources" },
    ],
  },

  // ===========================================================================
  // THE KALINGA WAR — evidence at four depths
  // ===========================================================================
  {
    id: "learn-kalinga-discover",
    subject: "event-kalinga-war",
    depthMode: "discover",
    title: { en: "The war a king wrote about afterwards", hi: "वह युद्ध जिसके विषय में राजा ने बाद में लिखा" },
    body: {
      en:
        "Around 261 BCE the Mauryan emperor Ashoka conquered Kalinga — the coastal region that is now " +
        "Odisha, marked on the map in the south-east of this corridor. Then he did something almost no " +
        "conqueror has ever done: he had a message cut into rock in which he described what he had " +
        "done and said he regretted it. The message gives numbers — a hundred and fifty thousand people " +
        "deported, a hundred thousand killed, and many times that number dead. The same message was " +
        "engraved in several places across the empire, and in Kalinga itself, at Dhauli and Jaugada. " +
        "Find those two places on the map. They are where the conqueror published his remorse, to the " +
        "people he had just conquered.",
      hi:
        "लगभग २६१ ईसा पूर्व में मौर्य सम्राट अशोक ने कलिंग को जीत लिया — तटीय क्षेत्र जो अब ओडिशा है और इस " +
        "क्षेत्र के दक्षिण-पूर्व में मानचित्र पर अंकित है। तत्पश्चात उन्होंने वह किया जो लगभग किसी विजेता ने " +
        "कभी नहीं किया: उन्होंने एक संदेश चट्टान पर खुदवाया जिसमें उन्होंने बताया कि उन्होंने क्या किया और " +
        "कहा कि उन्हें इसका पश्चाताप है। वही संदेश साम्राज्य में कई स्थानों पर, और स्वयं कलिंग में, धौली " +
        "एवं जौगड़ पर अंकित किया गया। मानचित्र पर वे दोनों स्थान खोजिए।",
    },
    concepts: ["empire", "inscription", "edict", "conquest"],
    analyticalFocus: {
      en:
        "Find the seven engraving sites on the map and notice where they are: at the edges of the " +
        "empire and along its main routes, not in its middle.",
      hi:
        "मानचित्र पर सात अंकन स्थल खोजिए और ध्यान दीजिए कि वे कहाँ हैं: साम्राज्य के किनारों पर एवं उसके " +
        "मुख्य मार्गों पर, उसके मध्य में नहीं।",
    },
    questions: [
      {
        id: "q-kal-d1",
        prompt: {
          en: "Where did Ashoka have his remorse engraved, in relation to the people he conquered?",
          hi: "अशोक ने अपना पश्चाताप किनके संबंध में कहाँ अंकित करवाया, जिन्हें उन्होंने जीता था?",
        },
        kind: "map-based",
        options: [
          { en: "In Kalinga itself, at Dhauli and Jaugada", hi: "स्वयं कलिंग में, धौली एवं जौगड़ पर" },
          { en: "Only at the capital, Pataliputra", hi: "केवल राजधानी पाटलिपुत्र में" },
          { en: "Only in the north-west at Shahbazgarhi", hi: "केवल उत्तर-पश्चिम में शाहबाज़गढ़ी पर" },
        ],
        correctIndex: 0,
        feedback: {
          en:
            "In Kalinga itself, and in a MODIFIED version: the Dhauli and Jaugada engravings omit parts " +
            "of the standard fourteen edicts and add separate edicts addressed to frontier officials and " +
            "peoples. Hold on to that fact — at the next level up it becomes the most important thing " +
            "about this inscription.",
          hi:
            "स्वयं कलिंग में, और एक संशोधित संस्करण में: धौली एवं जौगड़ के अंकन मानक चौदह अभिलेखों के कुछ " +
            "भागों को छोड़ देते हैं और सीमांत अधिकारियों एवं जनसमूहों को संबोधित पृथक अभिलेख जोड़ते हैं।",
        },
        sources: [{ source: "ashokan-rock-edict-xiii", locator: "the Dhauli and Jaugada engravings; the separate Kalinga edicts" }],
      },
    ],
    sources: [{ source: "ashokan-rock-edict-xiii", locator: "Rock Edict XIII" }, { source: "ncert-tih-1", locator: "'Kings, Farmers and Towns'" }],
  },
  {
    id: "learn-kalinga-understand",
    subject: "event-kalinga-war",
    depthMode: "understand",
    title: {
      en: "Why Kalinga? Reading the map for a strategic reason",
      hi: "कलिंग क्यों? एक रणनीतिक कारण हेतु मानचित्र का पाठ",
    },
    body: {
      en:
        "Look at where Kalinga sits. To its north is the Ganga delta, already under Mauryan control. To " +
        "its south-west is the peninsula. Along its coast runs the route between the two, and up its " +
        "river valleys — the Mahanadi and its tributaries — runs the route inland. A state controlling " +
        "the Ganga heartland but not Kalinga has a gap on its south-eastern flank, on both the land " +
        "route and the sea route. That is the strategic logic, and it is visible on the map without " +
        "anyone having to assert it. But notice the distinction this platform insists on: the " +
        "geography explains why Kalinga MATTERED to a Mauryan emperor. It does not tell us that this " +
        "is why Ashoka attacked, because no source states his reason. 'It was strategically located' " +
        "is an observation about the map, and 'he attacked because of its location' is a claim about a " +
        "decision — and only the second one needs evidence about the decision.",
      hi:
        "देखिए कि कलिंग कहाँ स्थित है। इसके उत्तर में गंगा डेल्टा है, जो पहले से मौर्य नियंत्रण में था। इसके " +
        "दक्षिण-पश्चिम में प्रायद्वीप है। इसके तट के साथ दोनों के बीच का मार्ग चलता है, और इसकी नदी " +
        "घाटियों — महानदी एवं उसकी सहायक नदियों — के साथ भीतर जाने वाला मार्ग। जो राज्य गंगा के हृदय-क्षेत्र " +
        "को नियंत्रित करता है पर कलिंग को नहीं, उसके दक्षिण-पूर्वी पार्श्व में थलमार्ग एवं समुद्री मार्ग दोनों " +
        "पर एक अंतर रह जाता है। परंतु उस विभेद पर ध्यान दीजिए जिस पर यह मंच बल देता है: भूगोल यह समझाता " +
        "है कि कलिंग एक मौर्य सम्राट के लिए क्यों महत्वपूर्ण था। यह नहीं बताता कि अशोक ने इसीलिए आक्रमण किया।",
    },
    concepts: ["strategic location", "flank", "coastal and inland routes", "explanation vs motive"],
    analyticalFocus: {
      en:
        "Use the map to state Kalinga's position relative to the Mauryan core, its coast and its river " +
        "access inland. Then write separately: (a) what the geography shows, and (b) what the geography " +
        "does NOT show about Ashoka's decision.",
      hi:
        "मानचित्र का उपयोग करते हुए मौर्य केंद्र, उसके तट एवं भीतर जाने वाले नदीय मार्ग के सापेक्ष कलिंग की " +
        "स्थिति बताइए। तत्पश्चात पृथक रूप से लिखिए: (क) भूगोल क्या दिखाता है, और (ख) भूगोल अशोक के " +
        "निर्णय के विषय में क्या नहीं दिखाता।",
    },
    questions: [
      {
        id: "q-kal-u1",
        prompt: {
          en: "Which river gives Kalinga access inland from its coast?",
          hi: "कौन सी नदी कलिंग को उसके तट से भीतरी भाग तक पहुँच देती है?",
        },
        kind: "map-based",
        options: [
          { en: "Mahanadi", hi: "महानदी" },
          { en: "Godavari", hi: "गोदावरी" },
          { en: "Narmada", hi: "नर्मदा" },
          { en: "Kaveri", hi: "कावेरी" },
        ],
        correctIndex: 0,
        feedback: {
          en:
            "The Mahanadi, which reaches the Bay of Bengal near the delta it builds. Natural Earth " +
            "carries it in this corridor (imported under the name 'Mahäna Nadï', 789 km of mapped " +
            "centreline in 2 parts). The Godavari and Krishna lie south of the corridor's boundary and " +
            "the Narmada runs into the Arabian Sea on the other side of the peninsula entirely.",
          hi:
            "महानदी, जो बंगाल की खाड़ी में उसके बनाए डेल्टा के समीप पहुँचती है। नैचरल अर्थ इसे इस क्षेत्र में " +
            "रखता है ('Mahäna Nadï' नाम से आयातित)। गोदावरी एवं कृष्णा क्षेत्र की सीमा के दक्षिण में हैं।",
        },
        sources: [{ source: "natural-earth", locator: "ne_10m_rivers_lake_centerlines, name='Mahäna Nadï'" }],
      },
      {
        id: "q-kal-u2",
        prompt: {
          en:
            "A student writes: 'Ashoka attacked Kalinga because it controlled the coastal route.' What " +
            "is the problem with this sentence?",
          hi:
            "एक विद्यार्थी लिखता है: 'अशोक ने कलिंग पर आक्रमण किया क्योंकि यह तटीय मार्ग को नियंत्रित करता " +
            "था।' इस वाक्य में क्या समस्या है?",
        },
        kind: "short-answer",
        feedback: {
          en:
            "The sentence presents an inference as a documented motive. No source states Ashoka's " +
            "reason for attacking. What is documented is the position of Kalinga — which makes the " +
            "inference reasonable, and the platform records it as a 'plausible influence', not as a " +
            "demonstrated cause. A corrected version: 'Kalinga controlled the coastal route between " +
            "the delta and the peninsula, which is why a Mauryan emperor would have wanted it; the " +
            "edict does not say that this was why he attacked.' That is longer, and it is the only " +
            "version that is both true and useful.",
          hi:
            "यह वाक्य एक अनुमान को प्रमाणित उद्देश्य के रूप में प्रस्तुत करता है। कोई स्रोत अशोक का आक्रमण का " +
            "कारण नहीं बताता। जो प्रमाणित है वह कलिंग की स्थिति है — जो इस अनुमान को युक्तिसंगत बनाती है, " +
            "और मंच इसे 'सुसंगत प्रभाव' के रूप में दर्ज करता है, प्रदर्शित कारण के रूप में नहीं।",
        },
        sources: [{ source: "thapar-early-india", locator: "chapters on Mauryan expansion and Kalinga" }],
      },
    ],
    sources: [
      { source: "thapar-early-india", locator: "chapters on Mauryan expansion and Kalinga" },
      { source: "natural-earth", locator: "coastline and Mahanadi geometry" },
    ],
  },
  {
    id: "learn-kalinga-analyse",
    subject: "event-kalinga-war",
    depthMode: "analyse",
    title: {
      en: "One inscription, two readings: was the remorse real?",
      hi: "एक अभिलेख, दो पाठ: क्या पश्चाताप वास्तविक था?",
    },
    body: {
      en:
        "The edict says the king felt remorse. The question at this level is what kind of evidence that " +
        "is. Consider the publication pattern: the remorse passage appears in the standard set of " +
        "fourteen rock edicts engraved across the empire, and the Kalinga engravings at Dhauli and " +
        "Jaugada are a MODIFIED version that drops some edicts and adds separate ones addressed to " +
        "frontier officials and peoples. So the text expressing regret for conquering Kalinga was " +
        "published, in an adapted form, in Kalinga, to an audience that included the officials now " +
        "administering it. Two readings follow. One takes the edict at its word: the numbers, the " +
        "remorse and the subsequent turn to ruling by moral authority were genuine, and the " +
        "publication in Kalinga was how a ruler communicates a change of policy. The other reads the " +
        "same facts as political communication: a newly conquered, strategically vital region is " +
        "precisely where you would publish a statement that the conqueror now rules by righteousness " +
        "rather than force. Both readings use the identical evidence. The platform does not choose " +
        "between them, and the reason it cannot is instructive: sincerity is not a testable historical " +
        "claim.",
      hi:
        "अभिलेख कहता है कि राजा को पश्चाताप हुआ। इस स्तर पर प्रश्न यह है कि यह किस प्रकार का प्रमाण है। " +
        "प्रकाशन के प्रतिरूप पर विचार कीजिए: पश्चाताप का अंश साम्राज्य भर में अंकित चौदह शिलालेखों के " +
        "मानक समूह में आता है, और धौली एवं जौगड़ के कलिंग अंकन एक संशोधित संस्करण हैं जो कुछ अभिलेख " +
        "छोड़ते हैं और सीमांत अधिकारियों एवं जनसमूहों को संबोधित पृथक अभिलेख जोड़ते हैं। अतः कलिंग को जीतने " +
        "के पश्चाताप को व्यक्त करने वाला पाठ कलिंग में ही, एक अनुकूलित रूप में, एक ऐसे श्रोता-वर्ग हेतु " +
        "प्रकाशित हुआ जिसमें वहाँ के नए प्रशासक अधिकारी भी शामिल थे। दोनों पाठ एक समान प्रमाण का उपयोग " +
        "करते हैं। मंच इनमें से कोई नहीं चुनता।",
    },
    concepts: ["primary source", "official proclamation", "audience", "publication pattern", "testability"],
    analyticalFocus: {
      en:
        "Set the two readings against the SAME evidence and identify which facts each uses. Then " +
        "separate the two claims the edict makes — a change of policy, and a change of heart — and say " +
        "which is testable and how.",
      hi:
        "दोनों पाठों को एक ही प्रमाण के सामने रखिए और पहचानिए कि प्रत्येक किन तथ्यों का उपयोग करता है। " +
        "तत्पश्चात अभिलेख के दो दावों — नीति में परिवर्तन, एवं हृदय में परिवर्तन — को पृथक कीजिए और " +
        "बताइए कि कौन परीक्षणयोग्य है और कैसे।",
    },
    questions: [
      {
        id: "q-kal-a1",
        prompt: {
          en: "Which part of the edict's claim is testable from evidence we have?",
          hi: "अभिलेख के दावे का कौन सा भाग हमारे पास उपलब्ध प्रमाण से परीक्षणयोग्य है?",
        },
        kind: "source-evaluation",
        options: [
          { en: "That large-scale military campaigning stops appearing in the later edicts", hi: "कि परवर्ती अभिलेखों में बड़े पैमाने पर सैन्य अभियान आना बंद हो जाते हैं" },
          { en: "That the king genuinely felt remorse", hi: "कि राजा को वास्तव में पश्चाताप हुआ" },
          { en: "That exactly 100,000 people were killed", hi: "कि ठीक १,००,००० लोग मारे गए" },
        ],
        correctIndex: 0,
        feedback: {
          en:
            "The absence of further large-scale campaigning. That is a checkable property of a corpus " +
            "of documents: you can read the remaining edicts and confirm no further conquest is " +
            "described. Sincerity is not checkable at all. The casualty figures are the weakest case: " +
            "they are round numbers issued by the party responsible, in a document with a persuasive " +
            "purpose, and there is no independent means of testing them — they are the best available " +
            "evidence AND they are not a neutral census, and both are true at once.",
          hi:
            "आगे के बड़े सैन्य अभियानों की अनुपस्थिति। यह दस्तावेज़ों के एक समूह की परीक्षण-योग्य विशेषता " +
            "है। ईमानदारी बिल्कुल परीक्षण-योग्य नहीं है। हताहतों की संख्याएँ सबसे दुर्बल प्रकरण हैं: ये " +
            "उत्तरदायी पक्ष द्वारा जारी गोलाकार संख्याएँ हैं और उन्हें परखने का कोई स्वतंत्र साधन नहीं है।",
        },
        sources: [{ source: "ashokan-rock-edict-xiii", locator: "Rock Edict XIII and the corpus of major rock edicts" }],
      },
      {
        id: "q-kal-a2",
        prompt: {
          en:
            "Why does the fact that the remorse edict was published IN Kalinga, in modified form, cut " +
            "both ways?",
          hi:
            "यह तथ्य कि पश्चाताप का अभिलेख कलिंग में ही संशोधित रूप में प्रकाशित हुआ, दोनों ओर क्यों " +
            "काटता है?",
        },
        kind: "short-answer",
        feedback: {
          en:
            "For the political-communication reading: you publish a statement that the conqueror now " +
            "rules by righteousness precisely where you have just conquered, to an audience that " +
            "includes the officials administering it — that is what legitimation looks like. For the " +
            "sincere reading: a ruler who wanted only to legitimise conquest would not necessarily " +
            "publish the casualty figures and his own remorse in the conquered territory, where the " +
            "people who lost relatives could read it; that is a strange choice for pure propaganda. " +
            "The same fact supports both, which is exactly why the platform presents two positions " +
            "instead of a verdict. Learners who can hold both at once are doing historical reasoning; " +
            "learners who pick the one their textbook implied are memorising.",
          hi:
            "राजनीतिक-संचार पाठ के पक्ष में: आप ठीक वहीं यह कथन प्रकाशित करते हैं कि विजेता अब धर्म से " +
            "शासन करता है जहाँ आपने अभी विजय प्राप्त की है। ईमानदार पाठ के पक्ष में: केवल वैधीकरण चाहने " +
            "वाला शासक विजित प्रदेश में हताहतों की संख्या एवं अपना पश्चाताप प्रकाशित करना आवश्यक नहीं " +
            "समझता। वही तथ्य दोनों का समर्थन करता है, यही कारण है कि मंच निर्णय के बजाय दो स्थितियाँ " +
            "प्रस्तुत करता है।",
        },
        sources: [
          { source: "ashokan-rock-edict-xiii", locator: "the Kalinga versions at Dhauli and Jaugada; the separate edicts" },
          { source: "thapar-early-india", locator: "chapters on Ashoka's dhamma and its political function" },
        ],
      },
    ],
    sources: [
      { source: "ashokan-rock-edict-xiii", locator: "Rock Edict XIII; the Dhauli and Jaugada versions" },
      { source: "thapar-early-india", locator: "chapters on Ashoka's dhamma" },
    ],
  },
  {
    id: "learn-kalinga-research",
    subject: "event-kalinga-war",
    depthMode: "research",
    title: {
      en: "Kalinga: precision, provenance and what the corpus will not assert",
      hi: "कलिंग: सटीकता, स्रोत-प्रमाण एवं जो यह सामग्री अभिकथित नहीं करेगी",
    },
    body: {
      en:
        "Four technical matters a researcher must handle before quoting this event. (1) PRECISION. The " +
        "war is dated to Ashoka's eighth regnal year, and regnal years are counted from a consecration " +
        "that is itself reconstructed — c. 268 BCE, with 269 and 265 also argued. So '261 BCE' inherits " +
        "the uncertainty of the accession date; the corpus records -0261/-0260 with certainty " +
        "'approximate' rather than a single year. (2) THE YEAR-ZERO TRAP. The corpus stores years as " +
        "astronomical integers in which 0 = 1 BCE, matching EDTF and matching Cliopatria's own " +
        "convention. Any pipeline touching this date must convert for display only and record the " +
        "original, or it will silently be out by one year in every BCE date. Cliopatria has exactly six " +
        "rows ending at year 0, each restarting at year 1 — that is the convention proving itself. " +
        "(3) PROVENANCE OF THE NUMBERS. The casualty figures exist in one document class, issued by the " +
        "responsible party, in round numbers, with a persuasive purpose, and no independent means of " +
        "verification. They may be used; they may not be treated as a census. (4) THE IMPORTED " +
        "GEOMETRY IS NOT THIS EVENT. Cliopatria samples a polity called Kalinga from astronomical year " +
        "-318 to -171, which is 319 to 172 BCE — a span that INCLUDES 261 BCE, so the dataset's " +
        "Kalinga outline does not represent a post-conquest Mauryan province and its boundary is " +
        "labelled 'boundary-approximate' throughout. Overlaying the two without saying so would " +
        "imply an agreement between sources that does not exist.",
      hi:
        "इस घटना को उद्धृत करने से पूर्व एक शोधकर्ता को चार तकनीकी विषय संभालने होंगे। (१) सटीकता। युद्ध अशोक " +
        "के अष्टम राज्य-वर्ष में तिथिबद्ध है, और राज्य-वर्ष एक ऐसे राज्याभिषेक से गिने जाते हैं जो स्वयं " +
        "पुनर्निर्मित है। अतः '२६१ ईसा पूर्व' राज्याभिषेक तिथि की अनिश्चितता को उत्तराधिकार में पाता है। " +
        "(२) शून्य-वर्ष का जाल। यह सामग्री वर्षों को खगोलीय पूर्णांक के रूप में संग्रहीत करती है जिसमें ० = " +
        "१ ईसा पूर्व है। (३) संख्याओं का स्रोत-प्रमाण। (४) आयातित ज्यामिति यह घटना नहीं है।",
    },
    concepts: ["regnal chronology", "astronomical year numbering", "EDTF", "provenance", "source independence", "geometry provenance"],
    analyticalFocus: {
      en:
        "Take the sentence 'Ashoka conquered Kalinga in 261 BCE, killing 100,000 people' and rewrite it " +
        "so that every element carries the precision its evidence supports. Then identify which two " +
        "elements would be falsified by a one-year error in the accession date.",
      hi:
        "'अशोक ने २६१ ईसा पूर्व में कलिंग जीता, १,००,००० लोगों को मारकर' — इस वाक्य को पुनः लिखिए ताकि " +
        "प्रत्येक तत्व वह सटीकता रखे जिसका उसका प्रमाण समर्थन करता है। तत्पश्चात पहचानिए कि राज्याभिषेक " +
        "तिथि में एक वर्ष की त्रुटि से कौन से दो तत्व असत्य हो जाएँगे।",
    },
    questions: [
      {
        id: "q-kal-r1",
        prompt: {
          en:
            "Cliopatria records a Kalinga polity from astronomical year -318 to -171. What does this " +
            "imply about the 261 BCE conquest, and what must the platform NOT do with it?",
          hi:
            "क्लिओपैट्रिया खगोलीय वर्ष −३१८ से −१७१ तक एक कलिंग राजनीतिक सत्ता दर्ज करता है। इसका २६१ ईसा " +
            "पूर्व की विजय के विषय में क्या निहितार्थ है, और मंच को इसके साथ क्या नहीं करना चाहिए?",
        },
        kind: "source-evaluation",
        feedback: {
          en:
            "First convert correctly: -318 astronomical = 319 BCE, -171 = 172 BCE. So the dataset " +
            "samples a Kalinga polity across a span that CONTAINS 261 BCE. It implies nothing about the " +
            "conquest — Cliopatria records sampled extents of polities, not events, and has no " +
            "event-level data at all. What the platform must not do is overlay the curated event on the " +
            "imported outline in a way that implies the two sources agree, or that the outline shows " +
            "Kalinga's extent at the moment of conquest. It is a separate dataset with its own " +
            "approximations, sampled at its own timesteps, and the 21 temporal-gap anomalies in the " +
            "import manifest are that sampling made visible. A gap between samples means 'not sampled', " +
            "never 'did not exist'.",
          hi:
            "पहले सही रूपांतरण कीजिए: −३१८ खगोलीय = ३१९ ईसा पूर्व, −१७१ = १७२ ईसा पूर्व। अतः डेटासेट एक " +
            "ऐसे परिसर में कलिंग सत्ता का नमूनाकरण करता है जिसमें २६१ ईसा पूर्व समाहित है। इसका विजय के " +
            "विषय में कोई निहितार्थ नहीं है — क्लिओपैट्रिया राजनीतिक सत्ताओं के नमूनाकृत विस्तार दर्ज करता " +
            "है, घटनाएँ नहीं।",
        },
        sources: [
          { source: "cliopatria-v0-2-1", locator: "entity 'Kalinga', rows spanning astronomical -318 to -171" },
          { source: "reference-coordinates", locator: "year-convention conversion: astronomical 0 = 1 BCE" },
        ],
      },
      {
        id: "q-kal-r2",
        prompt: {
          en:
            "Why does this project store years as astronomical integers (where 0 = 1 BCE) and only " +
            "convert to 'BCE' notation at display time?",
          hi:
            "यह परियोजना वर्षों को खगोलीय पूर्णांक के रूप में (जहाँ ० = १ ईसा पूर्व) क्यों संग्रहीत करती है और " +
            "केवल प्रदर्शन के समय 'ईसा पूर्व' संकेतन में क्यों बदलती है?",
        },
        kind: "short-answer",
        feedback: {
          en:
            "Because arithmetic on historical year notation is wrong by one for every BCE date. There " +
            "is no year 0 in historical notation, so 1 BCE is immediately followed by 1 CE: the " +
            "interval between them is one year, but 1 - (-1) suggests two. Astronomical numbering " +
            "inserts year 0, which makes subtraction, sorting and interval comparison correct " +
            "everywhere, and it is the convention EDTF uses and the convention Cliopatria's data " +
            "already follows — which is why six of its rows end at year 0 and restart at year 1. The " +
            "rule is: compute in astronomical, display in historical, never render a zero year with an era marker, and always " +
            "record the original representation when a source gives one. A test suite in this project " +
            "sweeps every year from -3400 to 2024 and fails if 'year 0' reaches a learner in English or " +
            "Hindi.",
          hi:
            "क्योंकि ऐतिहासिक वर्ष-संकेतन पर अंकगणित प्रत्येक ईसा पूर्व तिथि हेतु एक से गलत है। ऐतिहासिक " +
            "संकेतन में वर्ष ० नहीं है, अतः १ ईसा पूर्व के तुरंत बाद १ ईसवी आता है। खगोलीय संख्यांकन वर्ष ० " +
            "सम्मिलित करता है, जिससे घटाव, क्रमबद्धन एवं अंतराल-तुलना सर्वत्र सही होती है।",
        },
        sources: [{ source: "cliopatria-v0-2-1", locator: "year convention: astronomical numbering, 0 = 1 BCE" }],
      },
    ],
    sources: [
      { source: "ashokan-rock-edict-xiii", locator: "Rock Edict XIII; regnal-year dating" },
      { source: "bechert-dating-buddha", locator: "contributions re-examining the Ashokan synchronism" },
      { source: "cliopatria-v0-2-1", locator: "entity 'Kalinga' rows; year convention" },
    ],
  },

  // ===========================================================================
  // THE GANGA SYSTEM — physical geography at three depths
  // ===========================================================================
  {
    id: "learn-ganga-discover",
    subject: "feature-ganga",
    depthMode: "discover",
    title: { en: "Following the Ganga from ice to sea", hi: "गंगा को बर्फ़ से समुद्र तक अनुसरण करना" },
    body: {
      en:
        "Start at the top of the map, in the mountains. At Gaumukh, about 4,000 metres above sea " +
        "level, meltwater comes out of the Gangotri glacier and becomes the Bhagirathi. It meets the " +
        "Alaknanda at Devprayag, and from there the river is called the Ganga. At Haridwar it leaves " +
        "the mountains and flows out onto an enormous flat plain — and from there to the sea it drops " +
        "only about 200 metres over more than 1,500 kilometres. That gentle slope is the whole story. " +
        "A river that slow cannot carry its sediment away, so it drops it, building the plain that " +
        "millions of people farm, and at the end a delta that is still growing. Pan down the map and " +
        "watch the river join the Yamuna at Prayagraj, take the Gandak and the Ghaghara from the north " +
        "and the Son from the south, widen, split, and finally reach the Bay of Bengal.",
      hi:
        "मानचित्र के शीर्ष से, पहाड़ों में आरंभ कीजिए। गोमुख में, समुद्र तल से लगभग ४,००० मीटर ऊपर, गंगोत्री " +
        "हिमनद से पिघलाव-जल निकलकर भागीरथी बनता है। यह देवप्रयाग में अलकनंदा से मिलता है, और वहाँ से नदी " +
        "को गंगा कहा जाता है। हरिद्वार में यह पहाड़ छोड़कर एक विशाल समतल मैदान में निकलती है — और वहाँ से " +
        "समुद्र तक १,५०० किलोमीटर से अधिक में केवल लगभग २०० मीटर गिरती है। वही मंद ढाल पूरी कहानी है।",
    },
    concepts: ["glacier", "confluence", "gradient", "alluvial plain", "delta"],
    analyticalFocus: {
      en:
        "Pan from Gaumukh to the Sundarbans and name each tributary as you reach its confluence. Note " +
        "which come from the north and which from the south.",
      hi:
        "गोमुख से सुंदरबन तक पैन कीजिए और प्रत्येक संगम पर पहुँचकर सहायक नदी का नाम बताइए। ध्यान दीजिए कि " +
        "कौन उत्तर से आती हैं और कौन दक्षिण से।",
    },
    questions: [
      {
        id: "q-gan-d1",
        prompt: {
          en: "Which tributaries join the Ganga from the NORTH?",
          hi: "उत्तर से कौन सी सहायक नदियाँ गंगा से मिलती हैं?",
        },
        kind: "map-based",
        options: [
          { en: "Gandak, Ghaghara, Kosi", hi: "गंडक, घाघरा, कोसी" },
          { en: "Son, Chambal, Yamuna", hi: "सोन, चंबल, यमुना" },
          { en: "Narmada, Tapi, Mahanadi", hi: "नर्मदा, तापी, महानदी" },
        ],
        correctIndex: 0,
        feedback: {
          en:
            "Gandak, Ghaghara and Kosi — all left-bank, all from the Himalaya, all carrying enormous " +
            "sediment loads and all building huge alluvial fans where they reach the plain. The Son, " +
            "Chambal and Yamuna are the right-bank, peninsular group. The asymmetry matters: the " +
            "Himalayan tributaries are longer, carry far more water and sediment, and migrate their " +
            "channels, which is why the great cities and the great flood hazards are both on that " +
            "side.",
          hi:
            "गंडक, घाघरा एवं कोसी — सभी वाम-तटीय, सभी हिमालय से, सभी अपार अवसाद भार ले जाती हैं और मैदान " +
            "पर पहुँचकर विशाल जलोढ़ पंख बनाती हैं। सोन, चंबल एवं यमुना दक्षिण-तटीय, प्रायद्वीपीय समूह हैं।",
        },
        sources: [
          { source: "natural-earth", locator: "ne_10m_rivers_lake_centerlines — Gandak, Ghäghara, Sapt (Kosi), Son, Chambal, Yamuna" },
          { source: "ncert-india-physical", locator: "Ch 3 'Drainage System'" },
        ],
      },
    ],
    sources: [{ source: "natural-earth", locator: "ne_10m_rivers_lake_centerlines, name='Ganges'" }, { source: "ncert-india-physical", locator: "Ch 3 'Drainage System'" }],
  },
  {
    id: "learn-ganga-understand",
    subject: "feature-ganga",
    depthMode: "understand",
    title: {
      en: "Gradient, sediment and the plain that made cities possible",
      hi: "ढाल, अवसाद एवं वह मैदान जिसने नगरों को संभव बनाया",
    },
    body: {
      en:
        "Two numbers explain the corridor. The river leaves the Himalaya at Haridwar about 250 m above " +
        "sea level and reaches the delta at sea level, so over roughly 1,500 km its average gradient is " +
        "about 1 in 6,000 — nearly flat. And it arrives carrying sediment eroded from the fastest-" +
        "rising mountain range on earth. A heavily loaded river on a nearly flat surface cannot hold " +
        "one channel: it deposits, its bed rises, it breaches its banks and finds a steeper path, and " +
        "the channel moves. That single mechanism produces almost everything distinctive about this " +
        "region. It produces the alluvial plain and its fertile soils, which produced the agricultural " +
        "surplus that made cities and states possible from around 600 BCE. It produces the huge " +
        "alluvial fans of the Gandak and the Kosi. It produces the floods that gave the Damodar the " +
        "name 'Sorrow of Bengal'. It produces the delta, which is still building and still shifting — " +
        "which is why Tamralipta, once a working seaport, is now inland. And it explains why Pataliputra " +
        "declined: a city built to control a river junction is exposed if the junction moves.",
      hi:
        "दो संख्याएँ इस क्षेत्र की व्याख्या करती हैं। नदी हरिद्वार में हिमालय से समुद्र तल से लगभग २५० मीटर " +
        "ऊपर निकलती है और डेल्टा पर समुद्र तल पर पहुँचती है, अतः लगभग १,५०० किमी में इसकी औसत ढाल लगभग " +
        "६,००० में १ है — प्रायः समतल। और यह पृथ्वी के सबसे तेज़ी से उठने वाले पर्वत-श्रेणी से अपरदित अवसाद " +
        "लेकर आती है। लगभग समतल सतह पर भारी अवसाद-युक्त नदी एक धारा नहीं रख सकती। यही एक क्रियाविधि इस " +
        "क्षेत्र की लगभग हर विशिष्ट विशेषता उत्पन्न करती है।",
    },
    concepts: ["gradient", "sediment load", "deposition", "channel avulsion", "alluvial fan", "delta progradation"],
    analyticalFocus: {
      en:
        "Trace ONE mechanism — deposition on a low gradient — through at least four separate outcomes " +
        "in this corridor, spanning physical and human geography. State for each whether the link is " +
        "direct or runs through other causes.",
      hi:
        "एक क्रियाविधि — मंद ढाल पर निक्षेपण — को इस क्षेत्र के कम से कम चार पृथक परिणामों में, भौतिक एवं " +
        "मानव भूगोल दोनों में, अनुरेखित कीजिए। प्रत्येक हेतु बताइए कि संबंध प्रत्यक्ष है या अन्य कारणों से " +
        "होकर जाता है।",
    },
    questions: [
      {
        id: "q-gan-u1",
        prompt: {
          en: "Tamralipta was a seaport and is now inland. What process explains this?",
          hi: "ताम्रलिप्ति एक समुद्री पत्तन था और अब स्थल में है। कौन सी प्रक्रिया इसे समझाती है?",
        },
        kind: "short-answer",
        feedback: {
          en:
            "Delta progradation: the Ganga-Meghna system has continued depositing sediment at its " +
            "mouth, building new land seaward and leaving formerly coastal settlements inland. The " +
            "coastline has effectively moved away from the port. A complete answer also notes the " +
            "second factor — channel migration within the delta can leave a port cut off from the " +
            "navigable water it depended on, independently of the coast moving — and that both are " +
            "consequences of the same sediment load on the same low gradient. Both Faxian and Xuanzang " +
            "mention Tamralipta as a working port, so the change is documented within the last " +
            "sixteen centuries.",
          hi:
            "डेल्टा प्रग्रेडेशन: गंगा-मेघना तंत्र अपने मुख पर अवसाद निक्षेपित करता रहा है, समुद्र की ओर नई भूमि " +
            "बनाता रहा है और पूर्व में तटीय बस्तियों को स्थल में छोड़ता रहा है। एक पूर्ण उत्तर दूसरा कारक भी " +
            "बताता है — डेल्टा के भीतर धारा-प्रवास एक पत्तन को उस नौगम्य जल से काट सकता है जिस पर वह " +
            "निर्भर था।",
        },
        sources: [
          { source: "faxian-record", locator: "account of Tamralipti" },
          { source: "xuanzang-record", locator: "account of Tamralipti" },
          { source: "ncert-fundamentals-physical", locator: "chapters on fluvial geomorphology: deltas" },
        ],
      },
    ],
    sources: [
      { source: "ncert-india-physical", locator: "Ch 3 'Drainage System'" },
      { source: "ncert-fundamentals-physical", locator: "chapters on fluvial geomorphology" },
      { source: "natural-earth", locator: "river and coastline geometry" },
    ],
  },
  {
    id: "learn-ganga-analyse",
    subject: "feature-ganga",
    depthMode: "analyse",
    title: {
      en: "What a dataset measurement is not: the 3,642 km problem",
      hi: "डेटासेट माप क्या नहीं है: ३,६४० किमी की समस्या",
    },
    body: {
      en:
        "This platform computes river lengths from its own basemap rather than quoting published " +
        "figures, and the result is instructive. The Natural Earth 'Ganges' record inside our clip " +
        "window consists of 15 separate connected line parts — trunk, distributaries and anabranches. " +
        "Summing all of them gives 3,642 km. Taking only the longest single part gives 2,106 km. The " +
        "published length of the Ganga is usually given as about 2,525 km from Gaumukh to the Bay of " +
        "Bengal. None of our three numbers matches it, and all three are correct statements about what " +
        "they actually measure. The reasons for the mismatch are structural, not errors: the dataset " +
        "generalises geometry, which shortens sinuous reaches; a named river record bundles parts that " +
        "are hydrologically distinct; and our clip window cuts the river where it crosses the boundary, " +
        "so every value is a lower bound. The lesson generalises far beyond rivers. Any number on a " +
        "map comes with a definition of what was measured, a source, a reference date and a method — " +
        "and the number is meaningless without all four. That is why every measurement in this corpus " +
        "carries them explicitly, and why we did not simply write '2,525 km' because it is the familiar " +
        "figure.",
      hi:
        "यह मंच प्रकाशित आँकड़ों को उद्धृत करने के बजाय अपने ही आधार-मानचित्र से नदी की लंबाई की गणना करता " +
        "है, और परिणाम शिक्षाप्रद है। हमारी क्लिप विंडो के भीतर नैचरल अर्थ का 'गंगा' अभिलेख १५ पृथक " +
        "संयुक्त रेखा-भागों से बना है — मुख्य धारा, वितरिकाएँ एवं शाखाएँ। सभी का योग ३,६४२ किमी देता है। " +
        "केवल सबसे लंबे एकल भाग को लेने पर २,१०६ किमी मिलते हैं। गंगा की प्रकाशित लंबाई सामान्यतः गोमुख से " +
        "बंगाल की खाड़ी तक लगभग २,५२५ किमी दी जाती है। हमारी तीनों संख्याएँ इससे मेल नहीं खातीं, और तीनों " +
        "उसके विषय में सही कथन हैं जो वे वास्तव में मापती हैं।",
    },
    concepts: ["generalisation", "measurement definition", "reference date", "lower bound", "data provenance"],
    analyticalFocus: {
      en:
        "For each of the three figures (3,642 / 2,106 / 2,525 km) state precisely what was measured, " +
        "over what extent, from what source, and why the others differ. Then explain which you would " +
        "use to answer 'how long is the Ganga?' and which to answer 'how much of the Ganga system lies " +
        "in this corridor?'",
      hi:
        "तीनों आँकड़ों (३,६४२ / २,१०६ / २,५२५ किमी) में से प्रत्येक हेतु ठीक-ठीक बताइए कि क्या मापा गया, " +
        "किस विस्तार पर, किस स्रोत से, और अन्य क्यों भिन्न हैं। तत्पश्चात समझाइए कि 'गंगा कितनी लंबी है?' " +
        "के उत्तर हेतु आप किसका उपयोग करेंगे।",
    },
    questions: [
      {
        id: "q-gan-a1",
        prompt: {
          en: "Why is 3,642 km larger than the published length of the Ganga?",
          hi: "३,६४२ किमी गंगा की प्रकाशित लंबाई से बड़ी क्यों है?",
        },
        kind: "source-evaluation",
        options: [
          { en: "It sums 15 separate line parts, including distributaries, not one river course", hi: "यह वितरिकाओं सहित १५ पृथक रेखा-भागों का योग है, एक नदी-धारा नहीं" },
          { en: "The published figure is wrong", hi: "प्रकाशित आँकड़ा गलत है" },
          { en: "Our calculation used the wrong Earth radius", hi: "हमारी गणना ने पृथ्वी की गलत त्रिज्या उपयोग की" },
        ],
        correctIndex: 0,
        feedback: {
          en:
            "The first. The metric is 'total mapped centreline of all parts of the feature named " +
            "Ganges within the clip window', which is a well-defined and reproducible quantity — it is " +
            "simply not 'the length of the river', because the delta's distributaries are not the " +
            "river's course. This is the most common failure mode in quantitative geography: a correct " +
            "computation answering a different question than the one asked. Note the two effects work " +
            "in opposite directions — bundling distributaries inflates the total, while generalisation " +
            "and clipping deflate each part — so the numbers are not simply 'too big'.",
          hi:
            "पहला। यह मेट्रिक 'क्लिप विंडो के भीतर गंगा नामक फीचर के सभी भागों की कुल अंकित केंद्र-रेखा' है, " +
            "जो एक सुपरिभाषित एवं पुनरुत्पादनीय राशि है — यह केवल 'नदी की लंबाई' नहीं है। यह परिमाणात्मक " +
            "भूगोल की सबसे सामान्य विफलता-प्रणाली है: एक सही गणना जो पूछे गए प्रश्न से भिन्न प्रश्न का " +
            "उत्तर देती है।",
        },
        sources: [{ source: "natural-earth", locator: "ne_10m_rivers_lake_centerlines, name='Ganges' — 15 line parts" }],
      },
    ],
    sources: [{ source: "natural-earth", locator: "ne_10m_rivers_lake_centerlines, upstream sha256 recorded in the basemap manifest" }],
  },

  // ===========================================================================
  // WHY MAGADHA — the corridor's central debate at two depths
  // ===========================================================================
  {
    id: "learn-magadha-analyse",
    subject: "interp-why-magadha",
    depthMode: "analyse",
    title: {
      en: "Why Magadha? Sorting advantages from causes",
      hi: "मगध क्यों? लाभों को कारणों से पृथक करना",
    },
    body: {
      en:
        "The standard answer lists four advantages: fertile alluvial soil, iron within reach, timber " +
        "and elephants from the forests, and the Ganga for transport. Each is true and each is visible " +
        "on this map. But the list has a logical problem, and spotting it is the whole exercise. " +
        "Advantages explain why Magadha COULD have risen. They do not explain why it DID, because the " +
        "other janapadas shared most of them — Kashi, Kosala, Vatsa and the Vajji confederacy all sat " +
        "on the same river system, on the same alluvium, under the same monsoon. A factor present " +
        "equally in the winner and the losers cannot be what separated them. So the real question is " +
        "what Magadha had that the others did not, or what it did that they did not: annexing Anga and " +
        "taking the eastern trade, moving the capital from a hill fort to a river junction, defeating " +
        "the Vajji confederacy, and building the administrative capacity to turn surplus into standing " +
        "power. Those are decisions and their consequences, not endowments.",
      hi:
        "मानक उत्तर चार लाभ गिनता है: उपजाऊ जलोढ़ मृदा, पहुँच में लौह, वनों से लकड़ी एवं हाथी, और परिवहन " +
        "हेतु गंगा। प्रत्येक सत्य है और प्रत्येक इस मानचित्र पर दृश्य है। परंतु इस सूची में एक तार्किक समस्या " +
        "है, और उसे पहचानना ही पूरा अभ्यास है। लाभ यह समझाते हैं कि मगध क्यों उभर सकता था। वे यह नहीं " +
        "समझाते कि वह क्यों उभरा, क्योंकि अन्य जनपद उनमें से अधिकांश साझा करते थे। जो कारक विजेता एवं " +
        "पराजित दोनों में समान रूप से उपस्थित हो वह उन्हें पृथक करने वाला नहीं हो सकता।",
    },
    concepts: ["necessary vs sufficient condition", "counter-example", "endowment vs decision", "environmental determinism"],
    analyticalFocus: {
      en:
        "For each of the four standard advantages, ask: did the other janapadas also have it? Use the " +
        "map to check. Then separate Magadha's ENDOWMENTS from its DECISIONS and say which category " +
        "actually discriminates between it and its rivals.",
      hi:
        "चारों मानक लाभों में से प्रत्येक हेतु पूछिए: क्या अन्य जनपदों के पास भी वह था? जाँचने हेतु मानचित्र " +
        "का उपयोग कीजिए। तत्पश्चात मगध के संसाधनों को उसके निर्णयों से पृथक कीजिए।",
    },
    questions: [
      {
        id: "q-mag-a1",
        prompt: {
          en: "Which of the four standard advantages best discriminates Magadha from its rivals?",
          hi: "चार मानक लाभों में से कौन मगध को उसके प्रतिद्वंद्वियों से सबसे अच्छा पृथक करता है?",
        },
        kind: "multiple-choice",
        options: [
          { en: "None of them — all were shared with neighbouring janapadas", hi: "कोई नहीं — सभी पड़ोसी जनपदों के साथ साझा थे" },
          { en: "Fertile alluvial soil", hi: "उपजाऊ जलोढ़ मृदा" },
          { en: "The Ganga for transport", hi: "परिवण हेतु गंगा" },
          { en: "Iron ore within reach", hi: "पहुँच में लौह-अयस्क" },
        ],
        correctIndex: 0,
        feedback: {
          en:
            "None of them, and that is the point. Kashi sat on the Ganga at Varanasi; Kosala on the " +
            "Rapti in the same terai-margin plain; Vatsa on the Yamuna; Vajji north of the Ganga with " +
            "the Gandak crossing. All four were on the same alluvium under the same monsoon. Iron is " +
            "the strongest candidate for a real differential, since the uplands south of the plain " +
            "were closer to Magadha than to Kosala or Vajji — but it is still a difference of degree, " +
            "not a factor the others entirely lacked. The honest conclusion is that endowments set the " +
            "conditions and decisions determined the outcome.",
          hi:
            "कोई नहीं, और यही बात है। काशी वाराणसी में गंगा पर थी; कोसल उसी तराई-सीमांत मैदान में राप्ती " +
            "पर; वत्स यमुना पर; वज्जि गंगा के उत्तर में गंडक के मार्ग के साथ। ईमानदार निष्कर्ष यह है कि " +
            "संसाधनों ने परिस्थितियाँ निर्धारित कीं और निर्णयों ने परिणाम।",
        },
        sources: [{ source: "thapar-early-india", locator: "chapters on the rise of Magadha and on the limits of geographical explanation" }],
      },
      {
        id: "q-mag-a2",
        prompt: {
          en:
            "'The Ganga valley's geography made a large centralised state there inevitable.' Assess " +
            "this claim.",
          hi: "'गंगा घाटी के भूगोल ने वहाँ एक बड़े केंद्रीकृत राज्य को अनिवार्य बना दिया।' इस दावे का मूल्यांकन कीजिए।",
        },
        kind: "short-answer",
        feedback: {
          en:
            "A strong answer identifies the two separate moves being smuggled in. First, correlation " +
            "read as causation: early states do cluster on river systems, but that pattern is equally " +
            "consistent with rivers being chosen BY states that had other reasons to form. Second, and " +
            "worse, 'possible' read as 'inevitable': the claim asserts a necessity that no evidence " +
            "could establish, since we observe one outcome and cannot run the counterfactual. The " +
            "decisive counter-evidence is temporal as well as spatial — the same valley under the same " +
            "geography did not produce a centralised state in the preceding millennium, and produced " +
            "several competing ones afterwards. This platform records the deterministic version with " +
            "claimStrength 'contested' rather than deleting it, because learners will meet it " +
            "elsewhere and are better served by seeing it argued with than by never seeing it.",
          hi:
            "एक सशक्त उत्तर उन दो पृथक चालों को पहचानता है जो चुपके से शामिल की जा रही हैं। पहली, सह-संबंध " +
            "को कार्य-कारण के रूप में पढ़ना। दूसरी, और अधिक बुरी, 'संभव' को 'अनिवार्य' के रूप में पढ़ना। " +
            "निर्णायक प्रति-प्रमाण कालिक भी है — उसी घाटी में उसी भूगोल के अधीन पूर्ववर्ती सहस्राब्दी में " +
            "केंद्रीकृत राज्य नहीं बना।",
        },
        sources: [{ source: "thapar-early-india", locator: "chapters on the rise of Magadha — the argument against environmental determinism" }],
      },
    ],
    sources: [
      { source: "thapar-early-india", locator: "chapters on the rise of Magadha" },
      { source: "singh-ancient-india", locator: "chapters on early states and their political structures" },
    ],
  },
  {
    id: "learn-magadha-research",
    subject: "interp-why-magadha",
    depthMode: "research",
    title: {
      en: "Why Magadha? Historiography and the limits of the evidence",
      hi: "मगध क्यों? ऐतिहासिकी एवं प्रमाण की सीमाएँ",
    },
    body: {
      en:
        "The debate turns on evidence that is thin in a specific way. For the sixth to fourth centuries " +
        "BCE we have no inscriptions from Magadha at all — the epigraphic record for the corridor " +
        "begins with Ashoka, two centuries after the events in question. What we have instead is: " +
        "Buddhist and Jain canonical and commentarial literature, composed later and with doctrinal " +
        "purposes; later Sanskrit textual tradition; king-lists that do not agree with each other; and " +
        "archaeology, which for this period yields settlement sequences and material culture but no " +
        "documents. The consequences for the determinism question are severe. Political decisions " +
        "cannot be evidenced directly, so any account that centres them is inference from outcome. " +
        "Endowments can be observed but not dated to the century, so any account that centres them " +
        "cannot show they became decisive when they are said to have. Both readings are therefore " +
        "under-determined by the evidence, which is why the corpus records this as a live " +
        "interpretation with graded positions rather than as a settled explanation, and why the " +
        "imported Cliopatria geometry for Magadha — 2 rows for the janapada, 3 for the Haryanka " +
        "dynasty — cannot arbitrate either.",
      hi:
        "यह विवाद एक विशिष्ट प्रकार से क्षीण प्रमाण पर टिका है। छठी से चौथी शताब्दी ईसा पूर्व हेतु हमारे पास " +
        "मगध से कोई अभिलेख नहीं है — इस क्षेत्र हेतु अभिलेखीय अभिलेख अशोक से आरंभ होता है, प्रश्नांकित " +
        "घटनाओं के दो शताब्दी बाद। इसके स्थान पर हमारे पास है: बौद्ध एवं जैन धार्मिक एवं भाष्य साहित्य; " +
        "परवर्ती संस्कृत ग्रंथ परंपरा; आपस में सहमत न होने वाली राज-सूचियाँ; एवं पुरातत्व।",
    },
    concepts: ["epigraphic silence", "source genre", "under-determination", "king-lists", "archaeological resolution"],
    analyticalFocus: {
      en:
        "Classify each available source genre for sixth-to-fourth century BCE Magadha by what it can " +
        "and cannot evidence. Then state which specific finding would most change the debate, and " +
        "assess how likely that finding is.",
      hi:
        "छठी–चौथी शताब्दी ईसा पूर्व के मगध हेतु प्रत्येक उपलब्ध स्रोत-शैली को इस आधार पर वर्गीकृत कीजिए कि " +
        "वह क्या प्रमाणित कर सकती है और क्या नहीं। तत्पश्चात बताइए कि कौन सी विशिष्ट खोज इस विवाद को सबसे " +
        "अधिक बदलेगी।",
    },
    questions: [
      {
        id: "q-mag-r1",
        prompt: {
          en:
            "Why does the absence of pre-Ashokan inscriptions in this corridor particularly damage the " +
            "determinism debate, rather than merely limiting it?",
          hi:
            "इस क्षेत्र में अशोक-पूर्व अभिलेखों की अनुपस्थिति नियतिवाद-विवाद को केवल सीमित करने के बजाय विशेष " +
            "रूप से क्यों क्षति पहुँचाती है?",
        },
        kind: "short-answer",
        feedback: {
          en:
            "Because the two competing explanations need exactly the kinds of evidence that inscriptions " +
            "would supply and nothing else can. The decision-centred account needs records of policy — " +
            "annexation, taxation, military organisation, administrative appointment — and only a " +
            "contemporary documentary record provides those. The endowment-centred account needs to " +
            "show that a factor became decisive AT A DATE, which requires contemporaneous quantified " +
            "evidence of production or exchange. Neither exists for this period. So the debate is not " +
            "merely unresolved; it is structurally unresolvable on present evidence, because both " +
            "positions are under-determined in the same way and no available source class can break the " +
            "symmetry. That is a stronger and more useful conclusion than 'historians disagree', and it " +
            "is the kind of statement a research-level learner should be able to make and defend.",
          hi:
            "क्योंकि दो प्रतिस्पर्धी व्याख्याओं को ठीक उन प्रकार के प्रमाणों की आवश्यकता है जो अभिलेख प्रदान " +
            "करते हैं और कोई अन्य नहीं। अतः यह विवाद केवल अनिर्णीत नहीं है; यह वर्तमान प्रमाण पर संरचनात्मक " +
            "रूप से अनिर्णेय है, क्योंकि दोनों स्थितियाँ एक ही प्रकार से अल्प-निर्धारित हैं।",
        },
        sources: [
          { source: "thapar-early-india", locator: "chapters on the sources for early Magadha" },
          { source: "singh-ancient-india", locator: "chapters on the archaeological sequence for the middle Ganga" },
        ],
      },
    ],
    sources: [
      { source: "thapar-early-india", locator: "chapters on the rise of Magadha and its sources" },
      { source: "singh-ancient-india", locator: "chapters on early states, iron and the archaeological sequence" },
      { source: "cliopatria-v0-2-1", locator: "entities 'Janapada of Magadha' (2 rows) and 'Magadha - Haryanka dynasty' (3 rows)" },
    ],
  },
];

export const CURATED_LEARNING_IDS = CURATED_LEARNING.map((l) => l.id);
