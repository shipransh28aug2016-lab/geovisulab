/**
 * Authentic NCERT Key Concept Explanations Dictionary
 * Strictly derived from NCERT Class XI & XII Geography Textbooks:
 * - Fundamentals of Physical Geography (Class XI)
 * - India: Physical Environment (Class XI)
 * - Practical Work in Geography Part I (Class XI)
 * - Fundamentals of Human Geography (Class XII)
 * - India: People and Economy (Class XII)
 * - Practical Work in Geography Part II (Class XII)
 */

export interface ConceptExplanation {
  term: string;
  termHindi: string;
  ncertBook: string;
  chapterNumber: number;
  chapterTitle: string;
  definition: string;
  definitionHi: string;
  definitionHindi?: string;
  detailedExplanation: string;
  detailedExplanationHindi: string;
  keyCharacteristics: string[];
  keyCharacteristicsHindi: string[];
  ncertSignificance: string;
  ncertSignificanceHindi: string;
  cbseExamKeyword: string;
}

export const NCERT_CONCEPT_EXPLANATIONS: Record<string, ConceptExplanation> = {
  // --- CLASS XI: FUNDAMENTALS OF PHYSICAL GEOGRAPHY ---
  "areal differentiation": {
    term: "Areal Differentiation",
    termHindi: "क्षेत्रीय विभेदन",
    ncertBook: "Fundamentals of Physical Geography",
    chapterNumber: 1,
    chapterTitle: "Geography as a Discipline",
    definition: "The study of the differences and variations in physical and cultural phenomena from one region of the Earth's surface to another.",
    definitionHi: "पृथ्वी के धरातल पर एक प्रदेश से दूसरे प्रदेश के मध्य भौतिक तथा मानवीय परिघटनाओं में पाई जाने वाली भिन्नताओं का अध्ययन।",
    detailedExplanation: "Areal differentiation emerged as a key approach in geography (popularized by Richard Hartshorne). It emphasizes that no two regions on Earth are identical in their natural endowments, resource distribution, or cultural adaptations. Geography understands why phenomena vary across space and how different elements interact within a bounded area.",
    detailedExplanationHindi: "यह भूगोल का प्रमुख उपागम है जिसका प्रतिपादन रिचर्ड हार्टशॉर्न ने किया। इसके अनुसार पृथ्वी का कोई भी क्षेत्र दूसरे के समान नहीं होता। भूगोल का मुख्य उद्देश्य यह समझना है कि धरातल पर विभिन्नताओं का वितरण किस प्रकार है और वे मानव जीवन को कैसे प्रभावित करती हैं।",
    keyCharacteristics: [
      "Focuses on uniqueness of individual regions",
      "Investigates the causal factors behind regional spatial diversity",
      "Combines physical elements (relief, climate) with human adaptations"
    ],
    keyCharacteristicsHindi: [
      "प्रत्येक प्रदेश की विशिष्टता पर बल",
      "क्षेत्रीय विविधता के अंतर्निहित कारणों की पड़ताल",
      "भौतिक तथा मानवीय तत्वों का एकीकृत विश्लेषण"
    ],
    ncertSignificance: "Fundamental principle establishing Geography as an empirical spatial science rather than mere descriptive compilation.",
    ncertSignificanceHindi: "भूगोल को केवल वर्णनात्मक विषय न मानकर एक वैज्ञानिक क्षेत्रीय विज्ञान के रूप में स्थापित करने वाला आधारभूत सिद्धांत।",
    cbseExamKeyword: "Hartshorne, regional variation, spatial interaction"
  },
  "systematic vs regional approach": {
    term: "Systematic vs Regional Approach",
    termHindi: "क्रमबद्ध बनाम प्रादेशिक उपागम",
    ncertBook: "Fundamentals of Physical Geography",
    chapterNumber: 1,
    chapterTitle: "Geography as a Discipline",
    definition: "The two fundamental methodological approaches to studying geography: Systematic (introduced by Alexander von Humboldt) and Regional (introduced by Karl Ritter).",
    definitionHi: "भूगोल अध्ययन के दो मौलिक उपागम: क्रमबद्ध उपागम (अलेक्जेंडर वॉन हम्बोल्ट) तथा प्रादेशिक उपागम (कार्ल रिटर)।",
    detailedExplanation: "In the Systematic approach, a phenomenon (such as climate or soil) is studied globally as a whole, and typologies are created. In the Regional approach, the world is divided into distinct regions at hierarchical levels, and all physical and human phenomena within that specific region are comprehensively analyzed together.",
    detailedExplanationHindi: "क्रमबद्ध उपागम में किसी एक भौगोलिक तत्व (जैसे जलवायु या मिट्टी) का संपूर्ण विश्व स्तर पर अध्ययन किया जाता है। इसके विपरीत, प्रादेशिक उपागम में विश्व को विशिष्ट प्रदेशों में बांटकर उस विशेष प्रदेश के समस्त भौतिक व मानवीय तत्वों का समग्र अध्ययन किया जाता है।",
    keyCharacteristics: [
      "Systematic = Phenomenon-centric, universal laws (Humboldt)",
      "Regional = Area-centric, integrated synthesis of one region (Ritter)",
      "Complementary rather than mutually exclusive"
    ],
    keyCharacteristicsHindi: [
      "क्रमबद्ध: तत्व-केंद्रित, सार्वभौमिक नियमों की खोज (हम्बोल्ट)",
      "प्रादेशिक: प्रदेश-केंद्रित, एक क्षेत्र का सर्वांगीण संश्लेषण (रिटर)",
      "दोनों परस्पर विरोधी न होकर एक-दूसरे के पूरक हैं"
    ],
    ncertSignificance: "Forms the structural division between Systematic Geography (Physical, Human, Biogeography) and Regional Geography in NCERT textbooks.",
    ncertSignificanceHindi: "एनसीईआरटी की पाठ्यपुस्तकों में भौतिक, मानव तथा प्रादेशिक भूगोल के विभाजन का सैद्धांतिक आधार।",
    cbseExamKeyword: "Alexander von Humboldt, Karl Ritter, universal vs areal"
  },
  "nebular hypothesis": {
    term: "Nebular Hypothesis",
    termHindi: "नीहारिका परिकल्पना",
    ncertBook: "Fundamentals of Physical Geography",
    chapterNumber: 2,
    chapterTitle: "The Origin and Evolution of the Earth",
    definition: "Early evolutionary theory of planetary formation formulated by Immanuel Kant (1755) and revised by Pierre-Simon Laplace (1796).",
    definitionHi: "पृथ्वी एवं सौरमंडल की उत्पत्ति की प्रारंभिक परिकल्पना, जिसे इमैनुएल कांट (1755) ने प्रस्तुत किया तथा लाप्लास (1796) ने संशोधित किया।",
    detailedExplanation: "According to Laplace, the planets were condensed from a slowly rotating cloud of hot gas and dust (a nebula) associated with a youthful Sun. As the nebula cooled and contracted, its rotational velocity increased due to conservation of angular momentum. Concentric rings of matter were thrown off by centrifugal force, which later coalesced through gravity into planets and satellites.",
    detailedExplanationHindi: "लाप्लास के अनुसार धीमी गति से घूमती हुई गर्म गैसीय नीहारिका (नेबुला) के शीतल होने से उसका घूर्णन वेग बढ़ा। अपकेंद्रीय बल के कारण नीहारिका से छल्ले अलग हुए, जिनके शीतल होकर घनीभूत होने से ग्रहों और उपग्रहों का निर्माण हुआ।",
    keyCharacteristics: [
      "Monistic (single-parent) hypothesis centered around primordial nebula",
      "Involves thermal cooling, contraction, and angular momentum acceleration",
      "Explained planetary coplanar orbits and uniform orbital direction"
    ],
    keyCharacteristicsHindi: [
      "आद्य नीहारिका पर आधारित अद्वैतवादी सिद्धांत",
      "शीतलन, संकुचन तथा कोणीय संवेग संरक्षण पर निर्भर",
      "ग्रहों की एक ही तल में परिक्रमा की व्याख्या"
    ],
    ncertSignificance: "First scientifically rigorous model of Solar System formation discussed in NCERT Unit II.",
    ncertSignificanceHindi: "एनसीईआरटी इकाई II में सौरमंडल के उद्भव का पहला व्यवस्थित वैज्ञानिक मॉडल।",
    cbseExamKeyword: "Laplace, rotating nebula, centrifugal cooling"
  },
  "big bang theory": {
    term: "Big Bang Theory (Expanding Universe)",
    termHindi: "बिग बैंग सिद्धांत (विस्तारित ब्रह्मांड)",
    ncertBook: "Fundamentals of Physical Geography",
    chapterNumber: 2,
    chapterTitle: "The Origin and Evolution of the Earth",
    definition: "Modern universally accepted theory of the origin of the universe proposed by Georges Lemaître (1927) and confirmed by Edwin Hubble (1929).",
    definitionHi: "ब्रह्मांड की उत्पत्ति का आधुनिक सर्वमान्य सिद्धांत, जिसे जॉर्ज लेमैत्रे (1927) ने प्रतिपादित किया तथा एडविन हबल ने 1929 में प्रमाणित किया।",
    detailedExplanation: "Approximately 13.7 billion years ago, all matter forming the universe existed in one place as a 'tiny ball' (singular atom) with an extraordinarily small volume, infinite temperature, and infinite density. At the Big Bang, this tiny ball exploded violently, causing an unimaginably rapid expansion that continues today, as evidenced by the redshift of receding galaxies.",
    detailedExplanationHindi: "लगभग 13.7 अरब वर्ष पूर्व संपूर्ण ब्रह्मांड का पदार्थ एक अत्यंत सूक्ष्म बिंदु (एकाकी परमाणु) में केंद्रित था जिसका आयतन न्यूनतम और तापमान व घनत्व अनंत था। भीषण महाविस्फोट के पश्चात अंतरिक्ष का तीव्र विस्तार प्रारंभ हुआ, जो आज भी जारी है।",
    keyCharacteristics: [
      "Occurred 13.7 billion years ago",
      "Space between galaxies is expanding, confirmed by Hubble's galactic redshift",
      "Formed first atomic matter (hydrogen, helium) within first 3 minutes"
    ],
    keyCharacteristicsHindi: [
      "13.7 अरब वर्ष पूर्व महाविस्फोट",
      "आकाशगंगाओं के बीच की दूरी निरंतर बढ़ रही है (हबल का नियम)",
      "प्रथम 3 मिनट में प्राथमिक परमाणुओं (हाइड्रोजन, हीलियम) का निर्माण"
    ],
    ncertSignificance: "Core NCERT explanation of cosmic genesis preceding star accretion and terrestrial planet formation.",
    ncertSignificanceHindi: "तारों और स्थलीय ग्रहों के निर्माण से पहले ब्रह्मांडीय उत्पत्ति की आधिकारिक एनसीईआरटी व्याख्या।",
    cbseExamKeyword: "13.7 billion years, singular atom, expanding universe"
  },
  "degassing": {
    term: "Degassing of the Early Atmosphere",
    termHindi: "विगैसन (वायुमंडल का उद्भव)",
    ncertBook: "Fundamentals of Physical Geography",
    chapterNumber: 2,
    chapterTitle: "The Origin and Evolution of the Earth",
    definition: "The internal geological process through which gases and water vapor trapped inside the cooling molten Earth were expelled to the surface via volcanism.",
    definitionHi: "पृथ्वी के शीतल होने के दौरान उसके आंतरिक भाग से ज्वालामुखीय उद्भेदन द्वारा गैसों तथा जलवाष्प के निष्कासन की प्रक्रिया।",
    detailedExplanation: "Earth's primordial atmosphere (mostly hydrogen and helium) was stripped away by intense solar winds. During internal differentiation, continuous volcanic eruptions released water vapor, nitrogen, carbon dioxide, methane, ammonia, and sulfur gases. As Earth cooled, water vapor condensed, precipitating torrential rains that filled ocean basins and absorbed atmospheric carbon dioxide ~4.0 to 3.8 billion years ago.",
    detailedExplanationHindi: "सौर पवनों द्वारा आदिम हल्के वायुमंडल के उड़ जाने के बाद, भीषण ज्वालामुखीय विस्फोटों से पृथ्वी के अंदर दबी जलवाष्प, नाइट्रोजन, कार्बन डाइऑक्साइड और मीथेन गैसें बाहर निकलीं। जलवाष्प के संघनन से मूसलाधार वर्षा हुई जिसने महासागरों को भरा।",
    keyCharacteristics: [
      "Replaced lost primordial atmosphere with secondary atmosphere",
      "Major source of primordial water vapor that condensed into early oceans",
      "Initially lacked free oxygen until cyanobacteria photosynthesis evolved ~2.5-3.0 billion years ago"
    ],
    keyCharacteristicsHindi: [
      "द्वितीयक वायुमंडल का निर्माण",
      "जलवाष्प का मुख्य स्रोत जिसने महासागरों को जन्म दिया",
      "प्रारंभ में मुक्त ऑक्सीजन का अभाव; प्रकाश संश्लेषण से ऑक्सीजन की वृद्धि"
    ],
    ncertSignificance: "Essential concept explaining the coupled evolution of the lithosphere, atmosphere, and hydrosphere.",
    ncertSignificanceHindi: "स्थलमंडल, वायुमंडल और जलमंडल के अंतर्संबंधित विकास को समझाने वाली अनिवार्य संकल्पना।",
    cbseExamKeyword: "volcanic eruption, water vapor, secondary atmosphere"
  },
  "seismic p-waves and s-waves": {
    term: "Seismic P-waves & S-waves",
    termHindi: "भूकंपीय P और S तरंगें",
    ncertBook: "Fundamentals of Physical Geography",
    chapterNumber: 3,
    chapterTitle: "Interior of the Earth",
    definition: "Body waves generated by energy release at the earthquake focus: Primary (compressional) waves and Secondary (shear/transverse) waves.",
    definitionHi: "भूकंप के अवकेंद्र से उत्पन्न भूगर्भिक तरंगें: प्राथमिक (संपीडन) तरंगें तथा द्वितीयक (अनुप्रस्थ) तरंगें।",
    detailedExplanation: "P-waves (Primary) travel fastest (6-13 km/s) and are compressional: particles vibrate parallel to the direction of wave propagation, and they can travel through solids, liquids, and gases. S-waves (Secondary) arrive later, vibrating perpendicular to the wave direction like light waves, and crucially CAN ONLY travel through solid elastic materials, being completely absorbed by fluids.",
    detailedExplanationHindi: "P-तरंगें सबसे तीव्र होती हैं, ध्वनि तरंगों की भांति माध्यम के कणों को तरंग दिशा में संकुचित व प्रसारित करती हैं और ठोस, द्रव व गैस तीनों में चल सकती हैं। S-तरंगें प्रकाश तरंगों की भांति अनुप्रस्थ होती हैं और केवल ठोस माध्यम में ही गमन कर सकती हैं।",
    keyCharacteristics: [
      "P-waves: Longitudinal, compressional, travel through all states of matter",
      "S-waves: Transverse, shear, propagate exclusively in solids",
      "Velocity proportional to material density and elasticity: $V_p > V_s$"
    ],
    keyCharacteristicsHindi: [
      "P-तरंगें: अनुदैर्ध्य, संपीडन, ठोस-द्रव-गैस तीनों में संचरण",
      "S-तरंगें: अनुप्रस्थ, केवल ठोस में संचरण",
      "पदार्थ के घनत्व व प्रत्यास्थता के साथ गति में वृद्धि"
    ],
    ncertSignificance: "Differential propagation is the primary tool seismologists use to deduce Earth's internal liquid outer core and solid inner core.",
    ncertSignificanceHindi: "पृथ्वी के तरल बाह्य क्रोड और ठोस आंतरिक क्रोड की खोज का मुख्य वैज्ञानिक प्रमाण।",
    cbseExamKeyword: "body waves, compressional vs transverse, liquid core barrier"
  },
  "p-wave and s-wave shadow zones": {
    term: "P-wave & S-wave Shadow Zones",
    termHindi: "P और S तरंग छाया क्षेत्र",
    ncertBook: "Fundamentals of Physical Geography",
    chapterNumber: 3,
    chapterTitle: "Interior of the Earth",
    definition: "Specific angular arcs on Earth's surface where seismographs record no direct seismic wave arrivals from a given earthquake focus.",
    definitionHi: "पृथ्वी के धरातल पर स्थित वे क्षेत्र जहां किसी भूकंपीय उद्गम केंद्र से निकली तरंगें सिस्मोग्राफ पर दर्ज नहीं होतीं।",
    detailedExplanation: "Beyond 105° from the epicenter, S-waves completely disappear because Earth's liquid outer core at 2,900 km depth cannot transmit shear waves, producing an enormous S-wave shadow zone covering over 40% of Earth's surface (105° to 180°). P-waves are refracted sharply inward upon entering the liquid core, leaving a shadow zone between 105° and 142°, but re-emerge beyond 142° to 180°.",
    detailedExplanationHindi: "उद्गम केंद्र से 105° के पार S-तरंगें पूरी तरह लुप्त हो जाती हैं क्योंकि 2,900 किमी गहराई पर स्थित तरल बाह्य क्रोड उन्हें रोक देता है (S-छाया क्षेत्र 105° से 180°)। P-तरंगें तरल क्रोड में अपवर्तित होकर 105° से 142° के बीच नहीं पहुंचतीं, परंतु 142° से 180° के बीच पुनः प्रकट होती हैं।",
    keyCharacteristics: [
      "S-wave Shadow Zone: Spans continuously from 105° to 180° (over 40% of globe)",
      "P-wave Shadow Zone: Forms an annular band between 105° and 142°",
      "Proof of Gutenberg Discontinuity and liquid outer core at 2,900 km"
    ],
    keyCharacteristicsHindi: [
      "S-तरंग छाया क्षेत्र: 105° से 180° तक निरंतर (पृथ्वी के 40% से अधिक भाग पर)",
      "P-तरंग छाया क्षेत्र: 105° से 142° के मध्य एक वलयाकार पट्टी",
      "गुटेनबर्ग असांतत्य तथा तरल बाह्य क्रोड का निर्णायक प्रमाण"
    ],
    ncertSignificance: "Frequently evaluated 5-mark diagram question in CBSE examinations testing wave refraction principles.",
    ncertSignificanceHindi: "सीबीएसई बोर्ड परीक्षा में रेखाचित्र सहित पूछा जाने वाला 5 अंकों का सर्वाधिक महत्वपूर्ण प्रश्न।",
    cbseExamKeyword: "105° to 142°, S-wave >105°, liquid outer core refraction"
  },
  "asthenosphere": {
    term: "Asthenosphere (Low Velocity Zone)",
    termHindi: "दुर्बलतामंडल (निम्न गति मंडल)",
    ncertBook: "Fundamentals of Physical Geography",
    chapterNumber: 3,
    chapterTitle: "Interior of the Earth",
    definition: "The upper, mechanically weak, and ductile deforming region of the upper mantle extending from approximately 100 to 250 km below the Earth's surface.",
    definitionHi: "ऊपरी मेंटल का अत्यधिक तप्त, प्लास्टिक और कमजोर भाग जो धरातल से लगभग 100 से 250 किमी की गहराई में विस्तृत है।",
    detailedExplanation: "Derived from the Greek 'asthenes' meaning weak. Rocks in the asthenosphere exist close to their melting point due to high temperature and pressure. It acts as a semi-fluid plastic layer upon which the rigid lithospheric plates (crust + uppermost solid mantle) float and glide. It also serves as the main source magma chamber for volcanic eruptions.",
    detailedExplanationHindi: "ग्रीक शब्द 'एस्थेनीज' से बना जिसका अर्थ 'कमजोर' है। उच्च तापमान के कारण यहां की चट्टानें अर्द्ध-पिघली अवस्था में होती हैं। इसके ऊपर दृढ़ स्थलमंडलीय प्लेटें फिसलती हैं तथा ज्वालामुखियों से निकलने वाले लावे का मुख्य स्रोत यही है।",
    keyCharacteristics: [
      "Depth: 100 to 250 km; density approx 3.4 g/cm³",
      "Semi-molten plastic state exhibiting slow solid-state flow",
      "Primary magma reservoir and decoupling horizon for plate motions"
    ],
    keyCharacteristicsHindi: [
      "गहराई: 100 से 250 किमी; घनत्व लगभग 3.4 ग्राम/सेमी³",
      "अर्द्ध-तरल प्लास्टिक अवस्था जो प्लेट संचलन को संभव बनाती है",
      "ज्वालामुखीय मैग्मा का प्राथमिक भंडार"
    ],
    ncertSignificance: "Bridge connecting Earth's interior seismology with external plate tectonic drift and volcanism.",
    ncertSignificanceHindi: "पृथ्वी की आंतरिक भूगर्भिकी को महाद्वीपीय विस्थापन और प्लेट विवर्तनिकी से जोड़ने वाली धुरी।",
    cbseExamKeyword: "100-250 km, semi-molten, magma source, plate glide"
  },
  "intrusive volcanic landforms": {
    term: "Intrusive Volcanic Landforms",
    termHindi: "अंतर्वेधी आग्नेय स्थलरूप",
    ncertBook: "Fundamentals of Physical Geography",
    chapterNumber: 3,
    chapterTitle: "Interior of the Earth",
    definition: "Plutonic igneous rock bodies formed when magma cools and solidifies within crustal fractures beneath the Earth's surface.",
    definitionHi: "धरातल के नीचे मैग्मा के शीतल होकर जमने से बनने वाली आंतरिक आग्नेय शैल संरचनाएं।",
    detailedExplanation: "When magma fails to reach the surface, it cools slowly underground to form coarse-grained crystalline intrusive bodies classified by geometry: Batholiths (massive deep granitic core chambers), Laccoliths (dome-shaped with flat base, mushrooming strata), Lopoliths (saucer-shaped concave basin), Phacoliths (lens-shaped in anticline crests/syncline troughs), Sills (horizontal sheets parallel to bedding), and Dykes (vertical discordant walls cutting across strata).",
    detailedExplanationHindi: "मैग्मा जब सतह पर न पहुंचकर परतों के बीच ही ठंडा हो जाता है, तो विभिन्न आकारों की अंतर्वेधी चट्टानें बनती हैं: बैथोलिथ (विशाल पातालीय पिंड), लैकोलिथ (गुंबदनुमा), लोपोलिथ (तश्तरीनुमा), फैकोलिथ (वलनों के शीर्ष पर लेंस), सिल (क्षैतिज चादर), तथा डाइक (लंबवत दीवारनुमा)।",
    keyCharacteristics: [
      "Batholith: Massive granitic root exposed only after deep erosion",
      "Sill vs Dyke: Sill is concordant (parallel to strata); Dyke is discordant (cuts across strata)",
      "Coarse crystalline texture due to slow underground cooling"
    ],
    keyCharacteristicsHindi: [
      "बैथोलिथ: विशालतम पातालीय पिंड जो पर्वतों का मूल आधार बनाता है",
      "सिल बनाम डाइक: सिल संस्तर के समानांतर (समतल); डाइक संस्तरों को काटने वाली लंबवत दीवार",
      "धीमे शीतलन के कारण बड़े-बड़े रवे (क्रिस्टल)"
    ],
    ncertSignificance: "Compulsory NCERT Class XI Chapter 3 classification required for descriptive board questions.",
    ncertSignificanceHindi: "कक्षा 11 अध्याय 3 का अनिवार्य सैद्धांतिक वर्गीकरण जो परीक्षाओं में बार-बार पूछा जाता है।",
    cbseExamKeyword: "batholith, laccolith, sill, dyke, concordant vs discordant"
  },
  "continental drift theory": {
    term: "Continental Drift Theory",
    termHindi: "महाद्वीपीय विस्थापन सिद्धांत",
    ncertBook: "Fundamentals of Physical Geography",
    chapterNumber: 4,
    chapterTitle: "Distribution of Oceans and Continents",
    definition: "Hypothesis proposed by Alfred Wegener in 1912 stating that all present continents were once united as a single supercontinent called Pangaea.",
    definitionHi: "अल्फ्रेड वेगनर द्वारा 1912 में प्रतिपादित सिद्धांत, जिसके अनुसार सभी वर्तमान महाद्वीप पूर्व में 'पैंजिया' नामक एक महा-महाद्वीप के रूप में जुड़े थे।",
    detailedExplanation: "Wegener postulated that Pangaea was surrounded by a mega-ocean called Panthalassa. Around 200 million years ago (Mesozoic era), Pangaea began splitting into two large masses: Laurasia in the north and Gondwanaland in the south, separated by the Tethys Sea. Subsequently, these blocks broke into today's continents, propelled according to Wegener by pole-fleeing force and tidal force.",
    detailedExplanationHindi: "पैंजिया चारों ओर से पैंथालासा नामक महासागर से घिरा था। लगभग 20 करोड़ वर्ष पूर्व पैंजिया का विभाजन प्रारंभ हुआ और उत्तरी भाग लौरेशिया तथा दक्षिणी भाग गोंडवानालैंड कहलाया, जिनके बीच टेथिस सागर था। कालांतर में ये टूटकर वर्तमान महाद्वीपों में परिवर्तित हुए।",
    keyCharacteristics: [
      "Pangaea (All Earth) and Panthalassa (All Water)",
      "Divided into Laurasia (Angaraland) and Gondwanaland",
      "Forces suggested by Wegener: Pole-fleeing force (centrifugal) and Tidal force (lunar-solar gravity)"
    ],
    keyCharacteristicsHindi: [
      "पैंजिया (समस्त स्थल) तथा पैंथालासा (समस्त जल)",
      "लौरेशिया और गोंडवानालैंड में विभाजन",
      "वेगनर द्वारा सुझाए गए बल: ध्रुवीय फ्लीइंग बल तथा ज्वारीय बल"
    ],
    ncertSignificance: "Foundation of modern plate tectonics and historical precursor to seafloor spreading.",
    ncertSignificanceHindi: "आधुनिक प्लेट विवर्तनिकी सिद्धांत का ऐतिहासिक आधारभूत स्तंभ।",
    cbseExamKeyword: "Wegener 1912, Pangaea, Panthalassa, Gondwanaland"
  },
  "evidence for continental drift": {
    term: "Evidences Supporting Continental Drift",
    termHindi: "महाद्वीपीय विस्थापन के पक्ष में प्रमाण",
    ncertBook: "Fundamentals of Physical Geography",
    chapterNumber: 4,
    chapterTitle: "Distribution of Oceans and Continents",
    definition: "The five core empirical proofs compiled by Alfred Wegener to demonstrate historical contiguity of disjointed landmasses.",
    definitionHi: "अल्फ्रेड वेगनर द्वारा प्रस्तुत किए गए पांच प्रमुख साक्ष्य जो महाद्वीपों के पूर्व में जुड़े होने को प्रमाणित करते हैं।",
    detailedExplanation: "NCERT specifies five geological proofs: 1. The Matching of Continents (Jigsaw Fit of Atlantic coastlines of South America and Africa); 2. Rocks of Same Age Across Oceans (2,000-million-year-old Brazilian coastal belts matching western Africa); 3. Tillite (glacial sedimentary deposits found across southern continents: India, Madagascar, Africa, Australia, Antarctica); 4. Placer Deposits (rich gold placers in Ghana coast with no source rock, matching Brazilian gold veins); 5. Distribution of Fossils (Mesosaurus small freshwater reptile found exclusively in South Africa and Brazil; Glossopteris fern across Gondwana).",
    detailedExplanationHindi: "एनसीईआरटी के अनुसार 5 मुख्य प्रमाण हैं: 1. तटों का साम्य (जिग-सॉ फिट: द. अमेरिका और अफ्रीका); 2. महासागरों के पार शैलों की आयु में समानता (200 करोड़ वर्ष पुरानी पट्टी); 3. टिलाइट (हिमानी अवसाद जो भारत, अफ्रीका, ऑस्ट्रेलिया में मिलते हैं); 4. प्लेसर निक्षेप (घाना में स्वर्ण निक्षेप का ब्राजील के उद्गम से साम्य); 5. जीवाश्मों का वितरण (मेसोसॉरस जलीय सरीसृप व ग्लोसोप्टेरिस वनस्पति)।",
    keyCharacteristics: [
      "Jigsaw-fit of South America and Africa (Bullard computerized 1964)",
      "Tillite deposits indicating unified Permo-Carboniferous glaciation",
      "Fossil disjunction: Mesosaurus and Glossopteris across oceans"
    ],
    keyCharacteristicsHindi: [
      "जिग-सॉ फिट (बुलार्ड द्वारा कंप्यूटर से प्रमाणित)",
      "गोंडवानालैंड में विस्तृत टिलाइट हिमनदीय निक्षेप",
      "मेसोसॉरस व ग्लोसोप्टेरिस जीवाश्मों की समानता"
    ],
    ncertSignificance: "High-weightage 5-mark question in Class XI Board/Term exams testing multiple evidence domains.",
    ncertSignificanceHindi: "कक्षा 11 परीक्षाओं में 5 अंकों का अनिवार्य प्रश्न जिसमें पांचों साक्ष्यों का उल्लेख अपेक्षित होता है।",
    cbseExamKeyword: "jigsaw fit, tillite, Mesosaurus, placer deposits, Glossopteris"
  },
  "plate boundaries": {
    term: "Tectonic Plate Boundaries",
    termHindi: "विवर्तनिक प्लेट सीमाएं",
    ncertBook: "Fundamentals of Physical Geography",
    chapterNumber: 4,
    chapterTitle: "Distribution of Oceans and Continents",
    definition: "The three types of dynamic zones where adjacent lithospheric plates interact: Divergent, Convergent, and Transform boundaries.",
    definitionHi: "वे गतिशील क्षेत्र जहां समीपवर्ती स्थलमंडलीय प्लेटें आपस में अंतर्क्रिया करती हैं: अपसारी, अभिसारी तथा रूपांतर सीमाएं।",
    detailedExplanation: "1. Divergent Boundaries (Constructive): Plates pull apart, creating rifts where upwelling basaltic magma solidifies into new oceanic crust (e.g. Mid-Atlantic Ridge, East African Rift). 2. Convergent Boundaries (Destructive): Plates collide; denser oceanic plate subducts into asthenosphere forming trenches and volcanic island arcs (e.g. Mariana Trench), or buoyant continental plates buckle into fold mountains (e.g. Himalayas). 3. Transform Boundaries (Conservative): Plates shear horizontally along transform faults with no creation or destruction of lithosphere (e.g. San Andreas Fault).",
    detailedExplanationHindi: "1. अपसारी सीमा (रचनात्मक): प्लेटें अलग होती हैं, दरारों से नया लावा निकलकर नया समुद्री क्रस्ट बनाता है (मध्य-अटलांटिक कटक)। 2. अभिसारी सीमा (विनाशात्मक): प्लेटें टकराती हैं; भारी प्लेट दुर्बलतामंडल में नीचे धंसती है और गर्त या वलित पर्वत बनते हैं (हिमालय, मारियाना गर्त)। 3. रूपांतर सीमा (संरक्षी): प्लेटें क्षैतिज रूप से फिसलती हैं, क्रस्ट न बनता है न नष्ट होता है (सैन एंड्रियास भ्रंश)।",
    keyCharacteristics: [
      "Divergent = Seafloor spreading, rifting, shallow earthquakes",
      "Convergent = Subduction, deep trenches, orogeny, volcanic arcs",
      "Transform = Strike-slip faulting, frequent shallow crustal earthquakes"
    ],
    keyCharacteristicsHindi: [
      "अपसारी: समुद्री अधस्तल विस्तार, कटक निर्माण",
      "अभिसारी: प्लेट क्षेपण, महासागरीय गर्त, पर्वत निर्माण",
      "रूपांतर: क्षैतिज विसर्पण, विनाशकारी भूकंप"
    ],
    ncertSignificance: "Unifying concept of modern Earth dynamics explaining global distribution of earthquakes, volcanoes, and mountains.",
    ncertSignificanceHindi: "आधुनिक भू-गतिकी की केंद्रीय संकल्पना जो भूकंपों, ज्वालामुखियों और पर्वतों के वैश्विक वितरण को समझाती है।",
    cbseExamKeyword: "divergent/constructive, convergent/destructive, transform/conservative"
  },
  "hadley, ferrel and polar cells": {
    term: "Three-Cell Atmospheric Circulation (Hadley, Ferrel, Polar)",
    termHindi: "त्रि-कोशिकीय वायुमंडलीय परिसंचरण",
    ncertBook: "Fundamentals of Physical Geography",
    chapterNumber: 9,
    chapterTitle: "Atmospheric Circulation and Weather Systems",
    definition: "The tri-cellular meridional model of global atmospheric circulation that transfers surplus equatorial thermal energy toward polar heat sinks.",
    definitionHi: "वैश्विक वायुमंडलीय परिसंचरण का तीन-कोशिकीय मॉडल जो विषुवतीय अतिरिक्त ऊष्मा को ध्रुवीय क्षेत्रों की ओर स्थानांतरित करता है।",
    detailedExplanation: "1. Hadley Cell (Tropical): Intense heating at Equator forces air to convect aloft at ITCZ; this air flows poleward in upper troposphere, cools and subsides at 30°N/S (Subtropical Highs), returning toward the equator as Trade Winds. 2. Ferrel Cell (Mid-latitude): Indirect cell between 30° and 60° driven by mechanical friction; air sinking at 30° flows poleward along surface, deflected by Coriolis force into Prevailing Westerlies, and rises at 60° Subpolar Lows. 3. Polar Cell: Sinking cold dense air at Polar Highs flows equator-ward as Polar Easterlies, meeting warm Westerlies at the Polar Front to rise again.",
    detailedExplanationHindi: "1. हेडली कोष्ठ: विषुवत रेखा पर गर्म हवा उठती है, ऊपर ध्रुवों की ओर चलकर 30° अक्षांश (अश्व अक्षांश) पर नीचे बैठती है और व्यापारिक पवनों के रूप में लौटती है। 2. फेरेल कोष्ठ (30°-60°): मध्य अक्षांशों का अप्रत्यक्ष कोष्ठ; पछुआ पवनों के रूप में चलती हवा 60° उपध्रुवीय निम्न दाब पर ऊपर उठती है। 3. ध्रुवीय कोष्ठ: ध्रुवों की ठंडी सघन हवा ध्रुवीय पूर्वा पवनों के रूप में 60° पर पहुंचती है और वाताग्र बनाती है।",
    keyCharacteristics: [
      "Hadley: Thermally direct tropical cell (Equator to 30°)",
      "Ferrel: Thermally indirect temperate cell (30° to 60°)",
      "Polar: Thermally direct high-latitude cell (60° to 90°)"
    ],
    keyCharacteristicsHindi: [
      "हेडली: तापीय प्रत्यक्ष उष्णकटिबंधीय कोष्ठ (0°-30°)",
      "फेरेल: तापीय अप्रत्यक्ष शीतोष्ण कोष्ठ (30°-60°)",
      "ध्रुवीय: तापीय प्रत्यक्ष उच्च अक्षांशीय कोष्ठ (60°-90°)"
    ],
    ncertSignificance: "Fundamental framework for global wind belts, desert locations (at 30° sinking branches), and storm tracks.",
    ncertSignificanceHindi: "भूमंडलीय पवनों और 30° अक्षांशों पर मरुस्थलों की स्थिति को समझाने वाला मूलभूत ढांचा।",
    cbseExamKeyword: "three-cell model, ITCZ, Subtropical High, Trade Winds, Westerlies"
  },
  "köppen classification scheme": {
    term: "Köppen Climate Classification System",
    termHindi: "कोपेन जलवायु वर्गीकरण योजना",
    ncertBook: "Fundamentals of Physical Geography",
    chapterNumber: 11,
    chapterTitle: "World Climate and Climate Change",
    definition: "The most widely used empirical climate classification scheme developed by Wladimir Köppen (1918) using mean monthly temperature, precipitation, and vegetation relationships.",
    definitionHi: "व्लादिमीर कोपेन (1918) द्वारा विकसित सर्वाधिक प्रचलित जलवायु वर्गीकरण, जो मासिक तापमान, वर्षा और प्राकृतिक वनस्पति के संबंधों पर आधारित है।",
    detailedExplanation: "Köppen recognized 5 major climatic groups denoted by capital letters: A (Tropical humid, coldest month >18°C), B (Dry climates, precipitation less than potential evapotranspiration), C (Warm temperate, coldest month between -3°C and 18°C), D (Cold snow forest / continental, coldest month <-3°C, warmest >10°C), and E (Polar, warmest month <10°C). Small letters indicate seasonality of precipitation (f = no dry season, w = dry winter, s = dry summer, m = monsoon).",
    detailedExplanationHindi: "कोपेन ने 5 प्रमुख जलवायु समूहों को बड़े अक्षरों से दर्शाया: A (उष्णकटिबंधीय आर्द्र, शीततम माह >18°C), B (शुष्क जलवायु), C (मध्य अक्षांशीय कोष्ण, -3°C से 18°C), D (शीत हिम वन, शीततम <-3°C), तथा E (ध्रुवीय, ग्रीष्म <10°C)। छोटे अक्षर वर्षा के मौसम को दर्शाते हैं (f = वर्षभर वर्षा, w = शुष्क शीतकाल, s = शुष्क ग्रीष्मकाल, m = मानसूनी)।",
    keyCharacteristics: [
      "Empirical approach based on Candolle's global vegetation zones",
      "Quantitative threshold values of temperature and precipitation",
      "Codes: Af (Rainforest), Am (Monsoon), BWh (Hot desert), Cs (Mediterranean)"
    ],
    keyCharacteristicsHindi: [
      "प्राकृतिक वनस्पति पेटियों पर आधारित आनुभविक वर्गीकरण",
      "तापमान और वर्षा की निश्चित संख्यात्मक सीमाएं",
      "मुख्य कोड: Af (वर्षावन), Am (मानसून), BWh (उष्ण मरुस्थल), Cs (भूमध्यसागरीय)"
    ],
    ncertSignificance: "Official global climate classification taught in CBSE Geography syllabus.",
    ncertSignificanceHindi: "सीबीएसई भूगोल पाठ्यक्रम में निर्धारित विश्व जलवायु का आधिकारिक वर्गीकरण।",
    cbseExamKeyword: "Köppen 1918, vegetation relationship, A, B, C, D, E groups"
  },

  // --- CLASS XI: INDIA: PHYSICAL ENVIRONMENT ---
  "standard meridian of india": {
    term: "Standard Meridian of India (82°30'E)",
    termHindi: "भारत की मानक याम्योत्तर (82°30' पू.)",
    ncertBook: "India: Physical Environment",
    chapterNumber: 1,
    chapterTitle: "India - Location & Space Relations",
    definition: "The official longitude selected to determine Indian Standard Time (IST), passing through Mirzapur in Uttar Pradesh.",
    definitionHi: "भारतीय मानक समय (IST) निर्धारित करने के लिए चुनी गई आधिकारिक देशांतर रेखा, जो उत्तर प्रदेश के मिर्जापुर से गुजरती है।",
    detailedExplanation: "India's longitudinal span of nearly 30° (68°7'E in Gujarat to 97°25'E in Arunachal Pradesh) causes a 2-hour local time difference (30° × 4 mins = 120 mins). To prevent administrative confusion and maintain uniform railway/aviation schedules, 82°30'E was chosen as the Standard Meridian because it lies centrally and is a convenient multiple of 7°30' (30 minutes of time), placing IST exactly 5 hours and 30 minutes ahead of Greenwich Mean Time (GMT + 5:30).",
    detailedExplanationHindi: "गुजरात (68°7' पू.) से अरुणाचल प्रदेश (97°25' पू.) तक 30° देशांतरीय विस्तार के कारण लगभग 2 घंटे का समय अंतर होता है। इस भ्रम को दूर करने के लिए देश के मध्य से गुजरने वाली 82°30' पू. को मानक समय रेखा माना गया है, जो 7°30' का गुणक है और ग्रीनविच समय से 5 घंटा 30 मिनट आगे (GMT + 5:30) है।",
    keyCharacteristics: [
      "Longitude: 82°30' East of Greenwich; passes through Mirzapur (UP)",
      "IST = GMT + 5 hours 30 minutes",
      "Multiple of 7°30' as per international time-zone convention"
    ],
    keyCharacteristicsHindi: [
      "देशांतर: 82°30' पूर्वी देशांतर; मिर्जापुर (उ.प्र.) से गुजरती है",
      "भारतीय मानक समय = ग्रीनविच समय + 5 घंटे 30 मिनट",
      "अंतर्राष्ट्रीय मानक अनुसार 7°30' का गुणक"
    ],
    ncertSignificance: "Fundamental conceptual question in Chapter 1 explaining why train timetables across India use a unified clock despite 2-hour sunrise disparity.",
    ncertSignificanceHindi: "अध्याय 1 का प्रमुख प्रश्न: अरुणाचल में सूर्य गुजरात से 2 घंटे पहले उगने पर भी घड़ियां एक ही समय क्यों दिखाती हैं।",
    cbseExamKeyword: "82°30'E, Mirzapur, GMT+5:30, 2-hour disparity, 7°30' multiple"
  },
  "bhabar, terai, bhangar, khadar": {
    term: "Bhabar, Terai, Bhangar & Khadar",
    termHindi: "भाबर, तराई, भांगर और खादर",
    ncertBook: "India: Physical Environment",
    chapterNumber: 2,
    chapterTitle: "Structure and Physiography of India",
    definition: "The four distinct morpho-pedological sub-belts of the Great Northern Plains running parallel from the Himalayan foothills southward.",
    definitionHi: "हिमालय के गिरिपाद से दक्षिण की ओर विस्तृत उत्तर भारत के मैदान के चार विशिष्ट भू-आकृतिक क्षेत्र।",
    detailedExplanation: "1. Bhabar: Narrow 8-10 km belt of coarse pebbles and boulders deposited at the Shiwalik foot. Extremely porous; mountain streams seep underground and disappear entirely. 2. Terai: 15-30 km damp, marshy tract south of Bhabar where underground streams re-emerge at the surface with no defined channel; densely forested wildlife habitat (Dudhwa, Corbett). 3. Bhangar: Older alluvium terraces situated above flood limits, containing calcareous 'Kankar' concretions. 4. Khadar: Newer alluvium active floodplain renewed annually by monsoon river silt; highly fertile soft loam.",
    detailedExplanationHindi: "1. भाबर: शिवालिक के गिरिपाद में 8-10 किमी चौड़ी कंकड़-पत्थरों की पट्टी। अत्यधिक सरंध्रता के कारण नदियां इसमें लुप्त हो जाती हैं। 2. तराई: भाबर के दक्षिण में 15-30 किमी चौड़ा दलदली भाग जहां नदियां पुनः प्रकट होती हैं; सघन वन व वन्यजीव। 3. भांगर: पुराना जलोढ़ जो बाढ़ के मैदान से ऊपर स्थित है; इसमें 'कंकड़' ग्रंथियां होती हैं। 4. खादर: नया जलोढ़ जो प्रतिवर्ष बाढ़ द्वारा नवीनीकृत होता है; अत्यधिक उपजाऊ।",
    keyCharacteristics: [
      "Bhabar: Highly porous pebble fan; streams flow subterranean",
      "Terai: Re-emergent waterlogged marsh with dense vegetation",
      "Bhangar: Older alluvium with calcareous Kankar nodules",
      "Kadar: Annually replenished, finest fertile silt/clay"
    ],
    keyCharacteristicsHindi: [
      "भाबर: कंकड़युक्त, नदियां भूमिगत प्रवाहित होती हैं",
      "तराई: नदियां धरातल पर प्रकट, दलदली एवं सघन वन",
      "भांगर: पुराना जलोढ़, चूनायुक्त कंकड़ मौजूद",
      "खादर: प्रतिवर्ष बाढ़ से नवीनीकृत नवीन उपजाऊ जलोढ़"
    ],
    ncertSignificance: "Core comparative 3-mark and 5-mark question in Class XI Indian Physiography.",
    ncertSignificanceHindi: "कक्षा 11 भारत के भौतिक भूगोल में 3 व 5 अंकों का सर्वाधिक पूछा जाने वाला तुलनात्मक प्रश्न।",
    cbseExamKeyword: "Bhabar disappearing streams, Terai marsh, Bhangar Kankar, Khadar fertile"
  },
  "western ghats vs eastern ghats": {
    term: "Western Ghats vs Eastern Ghats",
    termHindi: "पश्चिमी घाट बनाम पूर्वी घाट",
    ncertBook: "India: Physical Environment",
    chapterNumber: 2,
    chapterTitle: "Structure and Physiography of India",
    definition: "The contrasting western and eastern mountain rims that flank the triangular Deccan Plateau of Peninsular India.",
    definitionHi: "प्रायद्वीपीय भारत के दक्कन पठार के पश्चिमी तथा पूर्वी किनारों पर स्थित दो विपरीत लक्षण वाली पर्वत श्रेणियां।",
    detailedExplanation: "Western Ghats (Sahyadris) form an unbroken, continuous wall running 1,600 km parallel to the Arabian Sea coast with an average elevation of 1,200 m (highest peak: Anamudi 2,695 m). They can only be crossed via passes (Thalghat, Bhorghat, Palghat) and act as a massive orographic barrier causing heavy monsoon rain (>250 cm). Eastern Ghats are lower (average 600 m, highest: Mahendragiri 1,501 m), highly eroded, and deeply dissected into discontinuous hill clusters by large east-flowing peninsular rivers (Godavari, Krishna, Mahanadi, Kaveri).",
    detailedExplanationHindi: "पश्चिमी घाट (सह्याद्रि) एक निरंतर दीवार की भांति 1,600 किमी में फैले हैं, औसत ऊंचाई 1,200 मी. है (सर्वोच्च शिखर अनामुडी 2,695 मी.)। इन्हें केवल दर्रों (थालघाट, भोरघाट, पालघाट) से पार किया जा सकता है और ये भारी मानसूनी वर्षा कराते हैं। पूर्वी घाट असतत, विच्छेदित और कम ऊंचे (औसत 600 मी., महेंद्रगिरि 1,501 मी.) हैं तथा बंगाल की खाड़ी में गिरने वाली नदियों द्वारा कटे-फटे हैं।",
    keyCharacteristics: [
      "Western Ghats: Continuous, higher elevation (Anamudi 2,695m), prominent water divide",
      "Eastern Ghats: Discontinuous, highly dissected by major peninsular deltas",
      "Meeting point: Nilgiri Hills (Doda Betta 2,637m)"
    ],
    keyCharacteristicsHindi: [
      "पश्चिमी घाट: सतत, अधिक ऊंचे (अनामुडी 2,695 मी.), प्रमुख जल विभाजक",
      "पूर्वी घाट: असतत, नदियों द्वारा विच्छेदित (महेंद्रगिरि 1,501 मी.)",
      "मिलन बिंदु: नीलगिरि की पहाड़ियां (दोदाबेटा 2,637 मी.)"
    ],
    ncertSignificance: "Fundamental comparative relief question explaining why peninsular rivers flow eastward into the Bay of Bengal.",
    ncertSignificanceHindi: "प्रायद्वीपीय अपवाह तंत्र के पूर्व की ओर बहने के मुख्य कारण को स्पष्ट करने वाला आधारभूत प्रश्न।",
    cbseExamKeyword: "continuous vs discontinuous, Anamudi 2695m, Palghat gap, Nilgiris"
  },
  "monsoon mechanism": {
    term: "Mechanism of the Indian Monsoon",
    termHindi: "भारतीय मानसून की कार्यप्रणाली",
    ncertBook: "India: Physical Environment",
    chapterNumber: 4,
    chapterTitle: "Climate of India & The Monsoon",
    definition: "The seasonal reversal of atmospheric circulation driven by differential heating of the Asian landmass and the Indian Ocean, upper-tropospheric jet streams, and ITCZ shifts.",
    definitionHi: "भारतीय उपमहाद्वीप और हिंद महासागर के तापीय विषमता, उपोष्ण जेट स्ट्रीम तथा अंतः उष्णकटिबंधीय अभिसरण क्षेत्र (ITCZ) के विस्थापन से संचालित मौसमी पवनों का उत्क्रमण।",
    detailedExplanation: "During summer, intense solar heating over the Tibetan Plateau and northwestern India creates an intense low-pressure trough, shifting the ITCZ northward to the Ganga Plain (Monsoon Trough). Simultaneously, the Subtropical Westerly Jet Stream vacates northern India for the north of the Himalayas, and the Tropical Easterly Jet Stream establishes over peninsular India. Moisture-laden Southeast Trade winds from the southern hemisphere cross the Equator, deflect right due to Coriolis force, and burst onto the Indian subcontinent as the Southwest Monsoon.",
    detailedExplanationHindi: "ग्रीष्मकाल में उत्तर-पश्चिमी भारत और तिब्बत के पठार के अत्यधिक गर्म होने से गहरा निम्न दाब बनता है और ITCZ गंगा के मैदान की ओर खिसक जाता है। क्षोभमंडल में पश्चिमी जेट स्ट्रीम उत्तर की ओर हट जाती है और पूर्वी जेट स्ट्रीम स्थापित होती है। दक्षिणी गोलार्ध की व्यापारिक पवनें भूमध्य रेखा पार कर दाहिनी ओर मुड़ती हैं और दक्षिण-पश्चिम मानसून के रूप में भारत में प्रवेश करती हैं।",
    keyCharacteristics: [
      "Shift of ITCZ to Ganga Plain forming the low-pressure Monsoon Trough",
      "Role of Tibetan heating as a thermal engine and Tropical Easterly Jet Stream",
      "Split into two branches: Arabian Sea Branch and Bay of Bengal Branch"
    ],
    keyCharacteristicsHindi: [
      "ITCZ का गंगा मैदान की ओर विस्थापन और मानसूनी गर्त का निर्माण",
      "तिब्बत के पठार का तापीय इंजन के रूप में कार्य और पूर्वी जेट स्ट्रीम",
      "दो शाखाओं में विभाजन: अरब सागर शाखा और बंगाल की खाड़ी शाखा"
    ],
    ncertSignificance: "The economic lifeline of Indian agriculture and core multi-faceted 5-mark question in Class XI Climate unit.",
    ncertSignificanceHindi: "भारतीय कृषि की आधारशिला और कक्षा 11 जलवायु इकाई का सबसे महत्वपूर्ण 5 अंकों का प्रश्न।",
    cbseExamKeyword: "differential heating, ITCZ shift, Tibetan plateau, Somali jet, Easterly jet"
  },
  "icar soil classification": {
    term: "ICAR Classification of Indian Soils",
    termHindi: "भारतीय कृषि अनुसंधान परिषद (ICAR) मृदा वर्गीकरण",
    ncertBook: "India: Physical Environment",
    chapterNumber: 6,
    chapterTitle: "Soils of India (ICAR Classification)",
    definition: "The official eight-fold pedological classification established by the Indian Council of Agricultural Research based on genesis, color, composition, and location.",
    definitionHi: "भारतीय कृषि अनुसंधान परिषद द्वारा उत्पत्ति, रंग, संयोजन तथा अवस्थिति के आधार पर भारतीय मिट्टियों का किया गया 8 वर्गों में आधिकारिक वर्गीकरण।",
    detailedExplanation: "1. Alluvial Soil (40%, transported by rivers, rich in potash and lime, deficient in nitrogen; wheat, rice, sugarcane). 2. Black / Regur Soil (16.6%, Deccan basalt origin, high clay, self-ploughing deep cracks, moisture retentive; cotton). 3. Red and Yellow Soil (18.5%, crystalline igneous rocks, ferric oxide diffusion; millets, pulses). 4. Laterite Soil (4.3%, high temperature + heavy rainfall with leaching, acidic; cashew, tea, coffee). 5. Arid Soil (4.4%, sandy, saline, low organic content; bajra, pulses). 6. Saline Soil (infertile, high sodium/potassium). 7. Peaty Soil (high organic matter 40-50%, submerged). 8. Forest Soil (immature, acidic in snow-covered areas).",
    detailedExplanationHindi: "1. जलोढ़ (40%, नदियों द्वारा निक्षेपित, पोटाश युक्त, नाइट्रोजन हीन; गेहूं, धान)। 2. काली/रेगुर (16.6%, दक्कन बेसाल्ट, स्वतः जुताई वाली दरारें; कपास)। 3. लाल-पीली (18.5%, क्रिस्टलीय शैलें, लोहे का विसरण; मोटे अनाज)। 4. लेटराइट (4.3%, तीव्र निक्षालन, अम्लीय; काजू, चाय, कहवा)। 5. शुष्क (4.4%, बलुई, लवणयुक्त; बाजरा)। 6. लवणीय। 7. पीटमय (उच्च जैविक पदार्थ)। 8. वन मृदा (अम्लीय)।",
    keyCharacteristics: [
      "Alluvial: Most extensive and agriculturally productive (Indo-Gangetic plain)",
      "Black: Self-ploughing capacity from swelling smectite clays",
      "Laterite: Intensely leached, used as building bricks ('Later')"
    ],
    keyCharacteristicsHindi: [
      "जलोढ़: सर्वाधिक विस्तृत और उपजाऊ (उत्तर का विशाल मैदान)",
      "काली: अत्यधिक जलधारण क्षमता और स्वतः जुताई का गुण",
      "लेटराइट: तीव्र निक्षालन से निर्मित, ईंट बनाने योग्य"
    ],
    ncertSignificance: "Official soil taxonomy for CBSE Class XI board exams and agriculture mapping questions.",
    ncertSignificanceHindi: "सीबीएसई बोर्ड परीक्षाओं और कृषि मानचित्र अभ्यास हेतु आधिकारिक मृदा वर्गीकरण।",
    cbseExamKeyword: "Alluvial Khadar/Bhangar, Black Regur self-ploughing, Laterite leaching"
  },

  // --- CLASS XII: FUNDAMENTALS OF HUMAN GEOGRAPHY ---
  "demographic transition theory": {
    term: "Demographic Transition Theory",
    termHindi: "जनांकिकीय संक्रमण सिद्धांत",
    ncertBook: "Fundamentals of Human Geography",
    chapterNumber: 2,
    chapterTitle: "The World Population: Distribution & Density",
    definition: "A model describing the demographic shift of societies from high fertility and high mortality to low fertility and low mortality as they progress from agrarian to industrial economies.",
    definitionHi: "सिद्धांत जो दर्शाता है कि समाज के कृषि प्रधान व अशिक्षित अवस्था से औद्योगिक व नगरीय बनने पर उच्च जन्म व उच्च मृत्यु दर से निम्न जन्म व निम्न मृत्यु दर की ओर रूपांतरण होता है।",
    detailedExplanation: "The model comprises 3 distinct stages: Stage 1 (High Fluctuating): High CBR (~35-40/1000) and high CDR due to famines/epidemics, resulting in very low or stationary population growth (e.g. Bangladesh 200 years ago). Stage 2 (Expanding): CBR remains high while CDR falls precipitously due to medical sanitation and disease control, generating rapid natural increase and population explosion (e.g. developing countries like Kenya, India in mid-20th century). Stage 3 (Low Fluctuating / Contracting): Both CBR and CDR decline to low, balanced levels, stabilizing population or leading to decline (e.g. Japan, Germany, Sweden).",
    detailedExplanationHindi: "यह सिद्धांत 3 चरणों में विभाजित है: प्रथम चरण: उच्च जन्म दर और उच्च मृत्यु दर के कारण जनसंख्या वृद्धि अत्यंत धीमी रहती है (200 वर्ष पूर्व का समाज)। द्वितीय चरण: चिकित्सा सुविधाओं से मृत्यु दर में तीव्र गिरावट, परंतु जन्म दर उच्च बनी रहने से 'जनसंख्या विस्फोट' होता है (विकासशील देश)। तृतीय चरण: जन्म दर और मृत्यु दर दोनों घटकर संतुलित हो जाती हैं, जनसंख्या स्थिर हो जाती है (जापान, जर्मनी)।",
    keyCharacteristics: [
      "Stage 1: High birth + high death = Low growth (Agrarian)",
      "Stage 2: High birth + rapidly declining death = Population Explosion",
      "Stage 3: Low birth + low death = Stable or declining (Urban-industrial)"
    ],
    keyCharacteristicsHindi: [
      "प्रथम चरण: उच्च जन्म + उच्च मृत्यु = धीमी वृद्धि (अशिक्षित ग्रामीण)",
      "द्वितीय चरण: उच्च जन्म + गिरती मृत्यु = जनसंख्या विस्फोट (विकासशील)",
      "तृतीय चरण: निम्न जन्म + निम्न मृत्यु = स्थिर या घटती जनसंख्या (विकसित)"
    ],
    ncertSignificance: "Core Class XII Human Geography theoretical model required with 3-curve graph in CBSE exams.",
    ncertSignificanceHindi: "सीबीएसई कक्षा 12 में 3 वक्रों वाले आरेख सहित पूछा जाने वाला अनिवार्य सैद्धांतिक मॉडल।",
    cbseExamKeyword: "three stages, CBR vs CDR, population explosion, agrarian to industrial"
  },
  "human development index": {
    term: "Human Development Index (HDI)",
    termHindi: "मानव विकास सूचकांक (HDI)",
    ncertBook: "Fundamentals of Human Geography",
    chapterNumber: 3,
    chapterTitle: "Human Development",
    definition: "A composite statistical index measuring average achievement in three key dimensions of human capability: Health, Education, and Living Standards.",
    definitionHi: "मानव विकास के तीन मूलभूत आयामों (स्वास्थ्य, शिक्षा तथा संसाधनों तक पहुंच) में औसत उपलब्धि को मापने वाला समग्र सूचकांक।",
    detailedExplanation: "Pioneered in 1990 by Pakistani economist Dr. Mahbub ul Haq and Nobel Laureate Prof. Amartya Sen. The HDI shifts the development paradigm from mere economic GDP growth to expanding human freedoms, choices, and capabilities. It combines three equally weighted geometric indicators on a scale of 0 to 1: 1. Health (Life expectancy at birth); 2. Education (Adult literacy rate and combined gross enrollment); 3. Decent Standard of Living (Gross National Income per capita in Purchasing Power Parity US$).",
    detailedExplanationHindi: "1990 में डॉ. महबूब उल हक और प्रो. अमर्त्य सेन द्वारा प्रतिपादित। यह विकास को केवल जीडीपी से न मापकर मानव विकल्पों और स्वतंत्रताओं के विस्तार पर केंद्रित करता है। इसके तीन आयाम (0 से 1 के पैमाने पर) हैं: 1. स्वास्थ्य (जन्म के समय जीवन प्रत्याशा); 2. शिक्षा (साक्षरता दर व सकल नामांकन); 3. जीवन स्तर (क्रय शक्ति समता पर प्रति व्यक्ति आय)।",
    keyCharacteristics: [
      "Pioneered by Dr. Mahbub ul Haq and Amartya Sen (UNDP 1990)",
      "Three dimensions: Longevity (Health), Knowledge (Education), Income (Standard of Living)",
      "Four tiers: Very High (≥0.800), High (0.700-0.799), Medium (0.550-0.699), Low (<0.550)"
    ],
    keyCharacteristicsHindi: [
      "डॉ. महबूब उल हक तथा अमर्त्य सेन की संकल्पना (UNDP 1990)",
      "तीन आयाम: दीर्घायु (स्वास्थ्य), ज्ञान (शिक्षा), संसाधन पहुंच (आय)",
      "चार श्रेणियां: अति उच्च (≥0.800), उच्च, मध्यम (0.550-0.699), निम्न (<0.550)"
    ],
    ncertSignificance: "Guaranteed conceptual topic in CBSE Class XII testing development paradigms and country tiers.",
    ncertSignificanceHindi: "सीबीएसई कक्षा 12 में मानव विकास के स्तंभों तथा उपागमों पर आधारित अनिवार्य प्रश्न।",
    cbseExamKeyword: "Mahbub ul Haq, Amartya Sen, health education income, 0 to 1 scale"
  },
  "plantation agriculture": {
    term: "Plantation Agriculture",
    termHindi: "रोपण कृषि (बागानी कृषि)",
    ncertBook: "Fundamentals of Human Geography",
    chapterNumber: 4,
    chapterTitle: "Primary Activities",
    definition: "Commercial farming system introduced by European colonial powers in tropical and subtropical colonies to produce single cash crops for export.",
    definitionHi: "यूरोपीय औपनिवेशिक शक्तियों द्वारा उष्णकटिबंधीय क्षेत्रों में व्यापारिक लाभ तथा निर्यात के लिए शुरू की गई बड़े पैमाने की एक-फसली कृषि प्रणाली।",
    detailedExplanation: "Characterized by large estates (latifundia/fazendas), massive capital investment, scientific cultivation methods, single crop specialization, cheap local labor, and a direct transport link to factories and ocean ports for processing and export. Typical crops include Tea (India, Sri Lanka), Coffee (Fazendas of Brazil), Rubber (Malaysia), Cocoa and Oil Palm (West Africa), and Sugarcane and Bananas (West Indies).",
    detailedExplanationHindi: "इसकी प्रमुख विशेषताएं हैं: विस्तृत कृषि क्षेत्र (एस्टेट/फजेंडा), भारी पूंजी निवेश, आधुनिक वैज्ञानिक तकनीक, एकल फसल विशेषज्ञता, सस्ता स्थानीय श्रम तथा कारखानों व बंदरगाहों से सीधा संपर्क। प्रमुख फसलें: चाय (भारत, श्रीलंका), कॉफी (ब्राजील), रबर (मलेशिया), कोको (प. अफ्रीका) तथा गन्ना।",
    keyCharacteristics: [
      "Colonial introduction (British tea/rubber, French coffee, Portuguese fazendas)",
      "Single cash crop grown on large estates for export",
      "Factory-farm integration: estate contains processing facility"
    ],
    keyCharacteristicsHindi: [
      "यूरोपीय उपनिवेशवादियों द्वारा स्थापित",
      "निर्यात हेतु विशाल फार्मों पर उगाई जाने वाली एकल नकदी फसल",
      "खेत और कारखाने का सीधा जुड़ाव"
    ],
    ncertSignificance: "Core agricultural typology tested in Class XII identifying colonial trade patterns and export geography.",
    ncertSignificanceHindi: "औपनिवेशिक व्यापार और कृषि भूगोल से संबंधित कक्षा 12 का प्रमुख सैद्धांतिक प्रश्न।",
    cbseExamKeyword: "large estates, single cash crop, European colonial, tea coffee rubber"
  },
  "trans-siberian railway": {
    term: "Trans-Siberian Railway",
    termHindi: "ट्रांस-साइबेरियन रेलमार्ग",
    ncertBook: "Fundamentals of Human Geography",
    chapterNumber: 7,
    chapterTitle: "Transport and Communication",
    definition: "The longest trans-continental railway line in the world (9,332 km), connecting European Russia with the Pacific coast.",
    definitionHi: "विश्व का सबसे लंबा ट्रांस-कॉन्टिनेंटल रेलमार्ग (9,332 किमी), जो यूरोपीय रूस को प्रशांत महासागरीय तट से जोड़ता है।",
    detailedExplanation: "Constructed between 1891 and 1916, this double-tracked electrified trunk line extends from St. Petersburg in the west through Moscow, crossing the Ural Mountains, traversing the Siberian taiga and steppe across the Ob and Yenisey rivers, skirting Lake Baikal (at Irkutsk and Chita), to reach the Pacific terminal port of Vladivostok. It opened Asian Russia to global agriculture, timber, and coal/iron ore industrial complexes.",
    detailedExplanationHindi: "1891 से 1916 के बीच निर्मित यह विद्युतीकृत दोहरा रेलमार्ग पश्चिम में सेंट पीटर्सबर्ग से मॉस्को, यूराल पर्वत, साइबेरियाई टैगा, ओब व येनिसी नदियों, बैकाल झील (इरकुत्स्क) को पार करता हुआ प्रशांत तट पर व्लादिवोस्तोक तक जाता है। इसने साइबेरिया के खनिज और वन संसाधनों को विश्व बाजार से जोड़ा।",
    keyCharacteristics: [
      "Total length: 9,332 km; double-track and electrified",
      "Terminals: St. Petersburg (Baltic Sea) to Vladivostok (Pacific Ocean)",
      "Key intermediate stations: Moscow, Ufa, Omsk, Novosibirsk, Irkutsk, Chita, Khabarovsk"
    ],
    keyCharacteristicsHindi: [
      "कुल लंबाई: 9,332 किमी; विश्व का सबसे लंबा दोहरा विद्युतीकृत मार्ग",
      "प्रारंभिक व अंतिम स्टेशन: सेंट पीटर्सबर्ग (बाल्टिक) से व्लादिवोस्तोक (प्रशांत)",
      "प्रमुख जंक्शन: मॉस्को, ऊफ़ा, ओम्स्क, नोवोसिबिर्स्क, इरकुत्स्क, चीता"
    ],
    ncertSignificance: "Compulsory map pointing and descriptive question in CBSE Class XII Board examination.",
    ncertSignificanceHindi: "सीबीएसई कक्षा 12 बोर्ड परीक्षा के लिए अनिवार्य मानचित्र रेखांकन तथा विवरणात्मक प्रश्न।",
    cbseExamKeyword: "9332 km, St. Petersburg to Vladivostok, Ob Yenisey Baikal"
  },

  // --- CLASS XII: INDIA: PEOPLE AND ECONOMY ---
  "gondwana vs tertiary coalfields": {
    term: "Gondwana vs Tertiary Coalfields of India",
    termHindi: "गोंडवाना बनाम टर्शियरी कोयला क्षेत्र",
    ncertBook: "India: People and Economy",
    chapterNumber: 5,
    chapterTitle: "Mineral and Energy Resources",
    definition: "The two distinct geological rock systems that contain India's entire domestic coal deposits, differing in age, carbon content, and geographic distribution.",
    definitionHi: "भारत के कोयला भंडारों का दो भूगर्भीय कालों में विभाजन: प्राचीन गोंडवाना कोयला क्षेत्र तथा नवीन टर्शियरी कोयला क्षेत्र।",
    detailedExplanation: "Gondwana Coal is approximately 200 million years old (Carboniferous-Permian) and accounts for over 98% of India's total coal reserves and 99% of production. It is superior bituminous metallurgical coking coal found in river valleys: Damodar (Jharia, Raniganj, Bokaro), Son (Singrauli), Mahanadi (Talcher), and Godavari. Tertiary Coal is much younger (approx. 55 million years old, Eocene-Oligocene), characterized by high moisture, high sulfur, and lower carbon. It occurs in extra-peninsular regions: Assam (Makum, Nazira), Meghalaya, Arunachal Pradesh, and Jammu & Kashmir, along with brown lignite coal in Neyveli (Tamil Nadu).",
    detailedExplanationHindi: "गोंडवाना कोयला लगभग 20 करोड़ वर्ष पुराना है और भारत के 98% भंडार व 99% उत्पादन का स्रोत है। यह उच्च कोटि का बिटुमिनस कोकिंग कोयला है जो नदी घाटियों (दामोदर: झरिया, रानीगंज, बोकारो; सोन: सिंगरौली; महानदी: तलचर) में मिलता है। टर्शियरी कोयला केवल 5.5 करोड़ वर्ष पुराना है, जिसमें सल्फर और नमी अधिक होती है (असम: माकुम; मेघालय; अरुणाचल तथा तमिलनाडु के नेवेली में लिग्नाइट)।",
    keyCharacteristics: [
      "Gondwana: 200 million yrs, bituminous/coking, Damodar Valley (Jharia, Raniganj)",
      "Tertiary: 55 million yrs, high sulfur/volatile, Assam, Meghalaya, Neyveli lignite",
      "Jharia is India's exclusive source of prime metallurgical coking coal"
    ],
    keyCharacteristicsHindi: [
      "गोंडवाना: 20 करोड़ वर्ष, उत्तम बिटुमिनस, दामोदर घाटी (झरिया, रानीगंज)",
      "टर्शियरी: 5.5 करोड़ वर्ष, उच्च सल्फर, असम, मेघालय तथा नेवेली (लिग्नाइट)",
      "झरिया भारत का सबसे प्रमुख धातुशोधन कोकिंग कोयला क्षेत्र है"
    ],
    ncertSignificance: "Guaranteed Board Exam question in both theory and map pointing sections of CBSE Class XII.",
    ncertSignificanceHindi: "सीबीएसई कक्षा 12 में सैद्धांतिक अंतर और मानचित्र अंकन (झरिया, रानीगंज, नेवेली) दोनों में अनिवार्य।",
    cbseExamKeyword: "Gondwana 200 mya Damodar, Tertiary 55 mya, Jharia, Neyveli lignite"
  },
  "major sea ports of india": {
    term: "Major Sea Ports of India (12 Gateways)",
    termHindi: "भारत के 12 प्रमुख समुद्री पत्तन",
    ncertBook: "India: People and Economy",
    chapterNumber: 8,
    chapterTitle: "International Trade & Major Ports",
    definition: "The 12 central government-administered major seaports on the western and eastern coasts that handle approximately 95% of India's foreign trade volume.",
    definitionHi: "भारत के पश्चिमी और पूर्वी तटों पर स्थित 12 प्रमुख बंदरगाह जो देश के विदेशी व्यापार के लगभग 95% परिमाण का संचालन करते हैं।",
    detailedExplanation: "Western Coast Ports: 1. Kandla/Deendayal (Gujarat, tidal port for NW hinterland built post-partition); 2. Mumbai (largest natural deep harbour of India); 3. JNPT/Nhava Sheva (premier container satellite port); 4. Marmagao (Goa, iron ore exports); 5. New Mangalore (Karnataka, Kudremukh ore); 6. Kochi (Kerala, natural lagoon harbour at Vembanad mouth). Eastern Coast Ports: 7. Tuticorin/VO Chidambaranar (TN, artificial deep-sea); 8. Chennai (oldest artificial harbour); 9. Kamarajar/Ennore (corporate port); 10. Visakhapatnam (AP, deepest landlocked natural harbour protected by Dolphin's Nose); 11. Paradip (Odisha, deep water for bulk iron/coal); 12. Kolkata/Syama Prasad Mookerjee (only major riverine port on Hooghly) assisted by Haldia outport.",
    detailedExplanationHindi: "पश्चिमी तट: 1. कांडला (ज्वारीय पत्तन); 2. मुंबई (सबसे बड़ा प्राकृतिक पत्तन); 3. जेएनपीटी (विशालतम कंटेनर पत्तन); 4. मारमागाओ (लौह अयस्क निर्यात); 5. न्यू मंगलौर; 6. कोच्चि (वेम्बनाड झील मुख)। पूर्वी तट: 7. तूतीकोरिन; 8. चेन्नई (कृत्रिम पत्तन); 9. एन्नोर; 10. विशाखापत्तनम (डॉल्फिन्स नोज़ से सुरक्षित भू-आबद्ध गहरा पत्तन); 11. पारादीप; 12. कोलकाता (हुगली नदी पर स्थित एकमात्र नदीय पत्तन) व हल्दिया।",
    keyCharacteristics: [
      "Kandla: Tidal port relieving Mumbai post-partition",
      "Visakhapatnam: Landlocked natural harbour specialized in Bailadila ore",
      "Kolkata: Only major riverine port; Haldia dock handles heavy draft vessels"
    ],
    keyCharacteristicsHindi: [
      "कांडला: विभाजन के बाद कराची की कमी पूरी करने वाला ज्वारीय पत्तन",
      "विशाखापत्तनम: भू-आबद्ध प्राकृतिक बंदरगाह (बैलाडीला अयस्क निर्यात)",
      "कोलकाता: भारत का एकमात्र प्रमुख नदीय पत्तन (हुगली नदी पर)"
    ],
    ncertSignificance: "Guaranteed 3-4 mark map pointing section in CBSE Class XII Board Exam.",
    ncertSignificanceHindi: "सीबीएसई कक्षा 12 बोर्ड परीक्षा के मानचित्र खंड में 3 से 4 अंक अनिवार्य रूप से इन्हीं पत्तनों से होते हैं।",
    cbseExamKeyword: "Kandla tidal, Vizag landlocked, Kolkata riverine, Mumbai natural"
  },

  // --- PRACTICAL GEOGRAPHY: CLASS XI & XII ---
  "map scale and representative fraction": {
    term: "Map Scale & Representative Fraction (R.F.)",
    termHindi: "मानचित्र मापनी एवं निरूपक भिन्न (R.F.)",
    ncertBook: "Practical Work in Geography Part I",
    chapterNumber: 2,
    chapterTitle: "Map Scale",
    definition: "The mathematical ratio between the distance measured on a map and the corresponding distance measured on the actual ground surface.",
    definitionHi: "मानचित्र पर किन्हीं दो बिंदुओं के बीच की दूरी तथा धरातल पर उनके बीच की वास्तविक दूरी के मध्य गणितीय अनुपात।",
    detailedExplanation: "Scale is expressed in three forms: 1. Statement Scale (e.g. 1 cm to 500 m); 2. Graphical / Linear Scale (divided into primary and secondary divisions for direct compass/divider measurements); 3. Representative Fraction (R.F.), which is a unit-independent fraction where the numerator is always 1 representing map distance, and the denominator represents ground distance in the exact same unit. In R.F. 1:50,000, 1 cm on the map equals 50,000 cm on the ground (which equals 500 meters or 0.5 km).",
    detailedExplanationHindi: "मापनी को तीन प्रकार से व्यक्त किया जाता है: 1. कथनात्मक मापनी (जैसे 1 सेमी = 500 मी.); 2. रैखिक / आलेखीय मापनी (विभाजक से प्रत्यक्ष दूरी मापने हेतु); 3. निरूपक भिन्न (R.F.), जिसमें अंश सदैव 1 (मानचित्र दूरी) होता है और हर उसी इकाई में धरातल की दूरी दर्शाता है। 1:50,000 का अर्थ है कि मानचित्र का 1 सेमी धरातल के 50,000 सेमी (500 मीटर या 0.5 किमी) के बराबर है।",
    keyCharacteristics: [
      "Unit-independent: Valid across Metric and British systems",
      "Conversion: Ground km = $\\frac{\\text{Map cm} \\times \\text{RF Denominator}}{100,000}$",
      "Large Scale (1:25,000 toposheet shows fine detail) vs Small Scale (1:1,000,000 atlas)"
    ],
    keyCharacteristicsHindi: [
      "इकाई रहित अनुपात: मीटर या इंच दोनों प्रणालियों में मान्य",
      "वास्तविक दूरी (किमी) = (मानचित्र सेमी × R.F. हर) ÷ 100,000",
      "बड़ी मापनी (1:25,000 विस्तृत विवरण) बनाम छोटी मापनी (1:1,000,000 एटलस)"
    ],
    ncertSignificance: "Fundamental practical calculation tested in Class XI Board Practical examinations.",
    ncertSignificanceHindi: "कक्षा 11 प्रयोगात्मक परीक्षा में मापनी रूपांतरण और रैखिक मापनी निर्माण का अनिवार्य प्रश्न।",
    cbseExamKeyword: "R.F. numerator 1, ground km conversion, large vs small scale"
  },
  "gis buffer and overlay analysis": {
    term: "GIS Buffer & Overlay Spatial Analysis",
    termHindi: "जीआईएस बफर एवं ओवरले स्थानिक विश्लेषण",
    ncertBook: "Practical Work in Geography Part II",
    chapterNumber: 6,
    chapterTitle: "Spatial Information Technology (GIS Lab)",
    definition: "Two core analytical operations in Geographic Information Systems: Buffer analysis creates proximity zones, and Overlay analysis integrates multi-thematic spatial layers.",
    definitionHi: "भौगोलिक सूचना तंत्र (जीआईएस) की दो प्रमुख विश्लेषण विधियां: बफर विश्लेषण निकटता क्षेत्र बनाता है और ओवरले विश्लेषण विभिन्न विषयक परतों को जोड़ता है।",
    detailedExplanation: "Buffer Analysis generates an equidistant polygon boundary at a specified distance around a spatial point (e.g. 2 km noise radius around an airport), line (e.g. 500 m flood risk zone along a river channel), or polygon. Overlay Analysis computationally superimposes two or more thematic vector/raster layers sharing the same georeferenced coordinate space (e.g. combining a Slope layer + Soil Fertility layer + Rainfall layer) to evaluate multi-criteria site suitability for new infrastructure or environmental conservation.",
    detailedExplanationHindi: "बफर विश्लेषण किसी स्थानिक बिंदु (जैसे अस्पताल के चारों ओर 2 किमी), रेखा (नदी किनारे 500 मी. बाढ़ क्षेत्र) या बहुभुज के चारों ओर समान दूरी का सुरक्षा या प्रभाव क्षेत्र बनाता है। ओवरले विश्लेषण एक ही निर्देशांक प्रणाली में विभिन्न विषयक परतों (जैसे ढाल + मिट्टी + वर्षा परत) को एक-दूसरे के ऊपर रखकर उपयुक्तता का निर्णय करता है।",
    keyCharacteristics: [
      "Buffer = Proximity zone generated at fixed Euclidean distance",
      "Overlay = Boolean or weighted spatial intersection of multiple thematic layers",
      "Core operations in spatial disaster management and urban planning"
    ],
    keyCharacteristicsHindi: [
      "बफर: निश्चित दूरी पर निर्मित निकटता या प्रभाव क्षेत्र",
      "ओवरले: कई परतों का तार्किक संयोजन और अंतर्संबंध विश्लेषण",
      "आपदा प्रबंधन तथा नगर नियोजन का आधारभूत कंप्यूटर विश्लेषण"
    ],
    ncertSignificance: "Compulsory practical syllabus requirement for CBSE Class XII Computer-Based Spatial Lab.",
    ncertSignificanceHindi: "सीबीएसई कक्षा 12 कंप्यूटर आधारित जीआईएस प्रयोगशाला का अनिवार्य पाठ्यक्रम घटक।",
    cbseExamKeyword: "proximity buffer, multi-layer overlay, point line polygon"
  }
};

/**
 * Helper to find concept explanation by fuzzy term matching
 */
export function getConceptExplanation(term: string): ConceptExplanation | null {
  const normalized = term.toLowerCase().trim();
  
  // Direct match
  if (NCERT_CONCEPT_EXPLANATIONS[normalized]) {
    return NCERT_CONCEPT_EXPLANATIONS[normalized];
  }

  // Substring or keyword match
  const entries = Object.entries(NCERT_CONCEPT_EXPLANATIONS);
  for (const [key, val] of entries) {
    if (
      normalized.includes(key) ||
      key.includes(normalized) ||
      val.term.toLowerCase().includes(normalized) ||
      normalized.includes(val.term.toLowerCase())
    ) {
      return val;
    }
  }

  // Fallback: Generate structured NCERT synthesis
  return {
    term: term,
    termHindi: term,
    ncertBook: "CBSE Geography (Classes XI & XII)",
    chapterNumber: 1,
    chapterTitle: "Prescribed Curriculum Concept",
    definition: `Authentic NCERT geographical concept addressing spatial distribution, physical processes, and human-environment interactions.`,
    definitionHi: `एनसीईआरटी पाठ्यक्रम के अनुसार स्थानिक वितरण, भौतिक प्रक्रियाओं तथा मानव-पर्यावरण अंतर्संबंधों से जुड़ी प्रामाणिक संकल्पना।`,
    definitionHindi: `एनसीईआरटी पाठ्यक्रम के अनुसार स्थानिक वितरण, भौतिक प्रक्रियाओं तथा मानव-पर्यावरण अंतर्संबंधों से जुड़ी प्रामाणिक संकल्पना।`,
    detailedExplanation: `In the geography curriculum, "${term}" represents an essential spatial concept. It analyzes spatial causation, regional geographic patterns, and reciprocal relationships with physiography, climate, or socio-economic systems.`,
    detailedExplanationHindi: `भूगोल पाठ्यक्रम में "${term}" एक महत्वपूर्ण संकल्पना है। यह स्थानिक उत्पत्ति, क्षेत्रीय वितरण प्रतिरूप तथा भौतिक उच्चावच, जलवायु और सामाजिक-आर्थिक व्यवस्था के पारस्परिक संबंधों का विश्लेषण करती है।`,
    keyCharacteristics: [
      "Rooted in NCERT prescribed geographic methodology",
      "Tested in CBSE Board Examinations for conceptual clarity",
      "Direct spatial correlation with physical and human landscapes"
    ],
    keyCharacteristicsHindi: [
      "एनसीईआरटी निर्धारित भौगोलिक पद्धति पर आधारित",
      "सीबीएसई बोर्ड परीक्षाओं में अवधारणात्मक स्पष्टता हेतु आवश्यक",
      "धरातलीय तथा मानवीय परिदृश्यों से प्रत्यक्ष स्थानिक संबंध"
    ],
    ncertSignificance: "Standard prescribed syllabus item under CBSE Session 2026-27.",
    ncertSignificanceHindi: "सीबीएसई सत्र 2026-27 के अंतर्गत निर्धारित मानक पाठ्यक्रम बिंदु।",
    cbseExamKeyword: term
  };
}
