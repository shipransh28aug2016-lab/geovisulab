/**
 * Authentic NCERT Key Salient Characteristics Deep-Dive Registry
 * Direct, rigorous, and insightful geographical explanations.
 * Focused on spatial causation, earth systems, human-environment dynamics, and verified NCERT facts.
 */

export interface CharacteristicDeepDive {
  id: string;
  characteristicEn: string;
  characteristicHi: string;
  parentConceptEn: string;
  parentConceptHi: string;
  ncertBook: string;
  chapterNumber: number;
  chapterTitleEn: string;
  chapterTitleHi: string;

  scientificMechanismEn: string;
  scientificMechanismHi: string;

  causeAndEffectEn: string;
  causeAndEffectHi: string;

  realWorldExampleEn: string;
  realWorldExampleHi: string;

  cbseMarkingCriteriaEn: string;
  cbseMarkingCriteriaHi: string;

  commonMisconceptionVsFactEn: {
    misconception: string;
    fact: string;
  };
  commonMisconceptionVsFactHi: {
    misconception: string;
    fact: string;
  };

  associatedDiagramType?: "ray_trace" | "cross_section" | "flow_cycle" | "cartographic_grid" | "boundary_interface";
}

export const CHARACTERISTICS_DEEP_DIVE_REGISTRY: Record<string, CharacteristicDeepDive> = {
  // =========================================================================
  // CLASS XI: FUNDAMENTALS OF PHYSICAL GEOGRAPHY
  // =========================================================================

  // Chapter 1: Geography as a Discipline
  "areal differentiation and spatial organization": {
    id: "char-areal-diff",
    characteristicEn: "Areal differentiation investigates spatial diversity, explaining how and why natural and cultural elements combine uniquely across different regions of Earth's surface",
    characteristicHi: "क्षेत्रीय विभेदन धरातल की स्थानिक भिन्नताओं की पड़ताल करता है, यह समझाते हुए कि विभिन्न प्रदेशों में प्राकृतिक और सांस्कृतिक तत्व किस प्रकार अद्वितीय रूप से संयोजित होते हैं",
    parentConceptEn: "Geography as a Discipline",
    parentConceptHi: "भूगोल एक विषय के रूप में",
    ncertBook: "Fundamentals of Physical Geography",
    chapterNumber: 1,
    chapterTitleEn: "Geography as a Discipline",
    chapterTitleHi: "भूगोल एक विषय के रूप में",
    scientificMechanismEn: "Geography studies the science of spatial variation across the Earth's surface. Formulated by Richard Hartshorne, areal differentiation examines the Earth as the living space of humankind. It views the landscape as an integrated mosaic where relief, climate, soils, vegetation, and human societies continually interact. The subject analyzes why human dwellings in the floodplains of the Brahmaputra are built on stilts (chang-ghars) while houses in arid western Rajasthan feature thick mud walls and flat roofs. Spatial patterns are direct, logical responses to regional environmental opportunities and constraints.",
    scientificMechanismHi: "भूगोल धरातल पर पाई जाने वाली स्थानिक भिन्नताओं का व्यवस्थित अध्ययन है। रिचर्ड हार्टशॉर्न द्वारा प्रतिपादित क्षेत्रीय विभेदन यह जांचता है कि प्राकृतिक उच्चावच, जलवायु और मानव समाज मिलकर किसी प्रदेश को विशिष्ट पहचान कैसे देते हैं। असम में ब्रह्मपुत्र के बाढ़ क्षेत्रों में लोग बांस के खंभों पर घर बनाते हैं, जबकि पश्चिमी राजस्थान के शुष्क मरुस्थल में मोटी मिट्टी की दीवारें और चपटी छतें बनाई जाती हैं। यह दर्शाता है कि मानव जीवन और बस्तियां स्थानिक पर्यावरण के साथ प्रत्यक्ष सामंजस्य स्थापित करती हैं।",
    causeAndEffectEn: "Cause: Unequal spatial distribution of solar energy, tectonic relief, and hydrological resources across latitude and altitude.\nEffect: Emergence of distinct natural realms and corresponding regional cultures, settlement forms, and agrarian practices across the globe.",
    causeAndEffectHi: "कारण: अक्षांश और ऊंचाई के अनुसार सौर ऊर्जा, भू-आकृतियों और जल संसाधनों का असमान स्थानिक वितरण।\nप्रभाव: विभिन्न प्राकृतिक प्रदेशों का उद्भव और उनके अनुरूप विशिष्ट संस्कृतियों, बस्तियों और कृषि पद्धतियों का विकास।",
    realWorldExampleEn: "Within India, the lush deltaic subsistence paddy landscape of the lower Ganga in West Bengal contrasts sharply with the nomadic pastoral lifestyle of the Gujjars and Bakarwals in the sub-alpine meadows of Jammu & Kashmir.",
    realWorldExampleHi: "भारत में ही, पश्चिम बंगाल के गंगा डेल्टा में सघन धान की खेती का परिदृश्य, जम्मू-कश्मीर की बुग्यालों में गुर्जर-बकरवाल चरवाहों के मौसमी पशुचारण से सर्वथा भिन्न है, जो क्षेत्रीय विभेदन का प्रत्यक्ष प्रमाण है।",
    cbseMarkingCriteriaEn: "Full credit requires: 1. Naming Richard Hartshorne; 2. Defining areal differentiation as the study of physical-cultural spatial diversity; 3. Providing a clear comparative regional adaptation example.",
    cbseMarkingCriteriaHi: "पूर्ण अंक हेतु: 1. रिचर्ड हार्टशॉर्न का नाम; 2. क्षेत्रीय विभेदन को प्राकृतिक व मानवीय विविधता के अध्ययन के रूप में परिभाषित करना; 3. एक स्पष्ट भौगोलिक उदाहरण देना।",
    commonMisconceptionVsFactEn: {
      misconception: "Areal differentiation means memorizing state boundaries and capital cities.",
      fact: "It is an analytical method that investigates the CAUSES behind why two regions differ in their physical geography and human occupance."
    },
    commonMisconceptionVsFactHi: {
      misconception: "क्षेत्रीय विभेदन का अर्थ केवल देशों या राज्यों की सीमाओं और राजधानियों को याद रखना है।",
      fact: "यह एक विश्लेषणात्मक पद्धति है जो यह खोजती है कि दो प्रदेशों की जलवायु, वनस्पति और जीवन-शैली में अंतर के वैज्ञानिक कारण क्या हैं।"
    },
    associatedDiagramType: "cartographic_grid"
  },

  // Chapter 2: Origin and Evolution of Earth
  "degassing volcanic atmosphere": {
    id: "char-degassing",
    characteristicEn: "Degassing: Volcanic eruptions expelled deep-seated water vapor, carbon dioxide, nitrogen, and methane, replacing the lost primordial atmosphere and creating the oceans",
    characteristicHi: "विगैसन: भीषण ज्वालामुखीय उद्गारों ने भूगर्भ से जलवाष्प, कार्बन डाइऑक्साइड और नाइट्रोजन को बाहर निकालकर खोए हुए आदिम वायुमंडल का स्थान लिया और महासागरों को जन्म दिया",
    parentConceptEn: "The Origin and Evolution of the Earth",
    parentConceptHi: "पृथ्वी की उत्पत्ति एवं विकास",
    ncertBook: "Fundamentals of Physical Geography",
    chapterNumber: 2,
    chapterTitleEn: "The Origin and Evolution of the Earth",
    chapterTitleHi: "पृथ्वी की उत्पत्ति एवं विकास",
    scientificMechanismEn: "When the planet formed 4.6 billion years ago, its light primordial atmosphere of hydrogen and helium was stripped away by intense solar winds from the early Sun. As Earth heated internally through gravitational compaction and radioactive decay, it underwent density differentiation. Continuous volcanic activity across the cooling surface vented trapped subterranean volatiles—principally water vapor (steam), carbon dioxide, nitrogen, methane, and ammonia. As surface temperatures dropped below 100°C, this volcanic water vapor condensed into torrential rains falling for millions of years. This precipitation dissolved atmospheric carbon dioxide and filled crustal depressions, forming Earth's oceans ~4.0 billion years ago.",
    scientificMechanismHi: "लगभग 4.6 अरब वर्ष पूर्व पृथ्वी के निर्माण के समय सूर्य की तीव्र सौर पवनों ने हल्के आदिम वायुमंडल (हाइड्रोजन व हीलियम) को उड़ा दिया। जब पृथ्वी अंदर से गर्म होकर पिघली, तो भीषण ज्वालामुखियों से अंदर दबी गैसें बाहर निकलीं—मुख्यतः भाप (जलवाष्प), कार्बन डाइऑक्साइड और नाइट्रोजन। जब पृथ्वी की सतह 100°C से नीचे ठंडी हुई, तो इस भाप के संघनन से लाखों वर्षों तक मूसलाधार वर्षा हुई, जिसने गड्ढों को भरकर प्राचीन महासागरों का निर्माण किया।",
    causeAndEffectEn: "Cause: Radioactive heating and density differentiation within early Earth driving volcanic outgassing.\nEffect: Creation of Earth's secondary atmosphere and condensation of the hydrosphere, setting the chemical stage for the origin of photosynthetic life.",
    causeAndEffectHi: "कारण: प्रारंभिक पृथ्वी के भीतर रेडियोधर्मी ऊष्मा और घनत्व विभेदन से ज्वालामुखीय गैसों का तीव्र निष्कासन।\nप्रभाव: द्वितीयक वायुमंडल और जलमंडल (महासागरों) का निर्माण, जिससे जीवन के उद्भव की परिस्थितियां बनीं।",
    realWorldExampleEn: "Modern volcanic eruptions at Mount Etna and Barren Island in the Andaman Sea vent over 70% to 90% superheated steam and carbon dioxide, providing a modern direct observation of volcanic degassing.",
    realWorldExampleHi: "अंडमान सागर में बैरन द्वीप के सक्रिय ज्वालामुखी से निकलने वाली गैसों में 80% से अधिक जलवाष्प और कार्बन डाइऑक्साइड होती है, जो प्रारंभिक विगैसन की प्रक्रिया का प्रत्यक्ष रूप है।",
    cbseMarkingCriteriaEn: "Full credit requires: 1. Loss of primordial atmosphere due to solar winds; 2. Definition of degassing via volcanism; 3. Formation of early oceans through condensation of water vapor.",
    cbseMarkingCriteriaHi: "मूल्यांकन बिंदु: 1. सौर पवनों द्वारा आदिम वायुमंडल का समाप्त होना; 2. विगैसन द्वारा जलवाष्प व गैसों का निकलना; 3. जलवाष्प के संघनन से महासागरों के बनने का क्रम।",
    commonMisconceptionVsFactEn: {
      misconception: "Early volcanic outgassing filled the atmosphere with breathable oxygen.",
      fact: "The early degassed atmosphere contained virtually zero free oxygen. Oxygen accumulated much later (~2.5 to 3.0 billion years ago) through oceanic blue-green algae (cyanobacteria) photosynthesis."
    },
    commonMisconceptionVsFactHi: {
      misconception: "ज्वालामुखियों से निकली प्रारंभिक गैसों में सांस लेने योग्य ऑक्सीजन मौजूद थी।",
      fact: "प्रारंभिक विगैसन में मुक्त ऑक्सीजन बिल्कुल नहीं थी। ऑक्सीजन करोड़ों वर्षों बाद नीले-हरे शैवाल के प्रकाश संश्लेषण से महासागरों और फिर वायुमंडल में आई।"
    },
    associatedDiagramType: "flow_cycle"
  },

  // Chapter 3: Interior of the Earth
  "s-wave shadow zone continuous": {
    id: "char-s-wave-shadow",
    characteristicEn: "S-waves cannot propagate through fluids, generating an uninterrupted shadow zone beyond 105° encompassing over 40% of the entire Earth's surface",
    characteristicHi: "S-तरंगें तरल माध्यम में नहीं चल सकतीं, जिससे 105° के पार एक विशाल और निरंतर छाया क्षेत्र बनता है जो पृथ्वी के 40% से अधिक भाग को ढकता है",
    parentConceptEn: "Interior of the Earth",
    parentConceptHi: "पृथ्वी की आंतरिक संरचना",
    ncertBook: "Fundamentals of Physical Geography",
    chapterNumber: 3,
    chapterTitleEn: "Interior of the Earth",
    chapterTitleHi: "पृथ्वी की आंतरिक संरचना",
    scientificMechanismEn: "S-waves (Secondary or shear waves) are transverse elastic body waves whose particle motion is strictly perpendicular to the direction of propagation. Transverse shear waves require shear rigidity—a restoring force that resists change of shape. Solid rocks have shear rigidity, so S-waves travel smoothly through Earth's crust and solid mantle. However, at 2,900 km depth, seismic waves encounter the Gutenberg Discontinuity: the boundary of the molten iron-nickel outer core. Liquid metals lack shear rigidity (shear modulus = 0). When S-waves strike this liquid boundary, they cannot enter and are completely blocked. Consequently, seismographs anywhere in the world situated beyond 105° from the earthquake epicenter record zero direct S-waves.",
    scientificMechanismHi: "S-तरंगें (अनुप्रस्थ या कर्तन तरंगें) होती हैं जिनमें माध्यम के कण तरंग संचरण की दिशा के लंबवत कंपन करते हैं। अनुप्रस्थ तरंगों के आगे बढ़ने के लिए माध्यम में दृढ़ता (Shear Rigidity) का होना आवश्यक है। ठोस चट्टानों में यह दृढ़ता होती है, इसलिए S-तरंगें ठोस मेंटल से गुजर जाती हैं। परंतु 2,900 किमी गहराई पर गुटेनबर्ग सीमा पर स्थित पिघले हुए बाह्य क्रोड में कर्तन दृढ़ता शून्य होती है। जब S-तरंगें इस तरल क्रोड से टकराती हैं, तो वे वहीं रुक जाती हैं। इसी कारण भूकंप केंद्र से 105° से लेकर 180° तक पृथ्वी के 40% से अधिक भाग पर कोई भी S-तरंग नहीं पहुंच पाती।",
    causeAndEffectEn: "Cause: Inability of transverse shear waves to propagate through the molten iron-nickel outer core at 2,900 km depth.\nEffect: Formation of a continuous global shadow zone from 105° to 180°, confirming that Earth's outer core is liquid.",
    causeAndEffectHi: "कारण: 2,900 किमी गहराई पर स्थित तरल बाह्य क्रोड से अनुप्रस्थ तरंगों का न गुजर पाना।\nप्रभाव: 105° से 180° तक निरंतर छाया क्षेत्र का निर्माण, जो प्रमाणित करता है कि पृथ्वी का बाह्य क्रोड तरल अवस्था में है।",
    realWorldExampleEn: "During the 2004 Sumatra Earthquake (Mw 9.1), seismographs in South America and Western Europe situated >105° from Sumatra recorded refracted P-waves within 20 minutes, but detected zero S-waves, verifying this fluid core barrier.",
    realWorldExampleHi: "2004 के सुमात्रा भूकंप के समय, 105° से अधिक दूर स्थित दक्षिण अमेरिकी वेधशालाओं ने अपवर्तित P-तरंगें तो दर्ज कीं, परंतु शून्य S-तरंग दर्ज की, जिसने तरल क्रोड के सिद्धांत को सिद्ध किया।",
    cbseMarkingCriteriaEn: "Full credit requires: 1. Explaining S-waves are transverse/shear waves requiring solid rigidity; 2. Stating Earth's outer core is liquid at 2,900 km; 3. Specifying the shadow zone runs continuously from 105° to 180° (>40% of Earth).",
    cbseMarkingCriteriaHi: "पूर्ण अंक हेतु: 1. S-तरंगें अनुप्रस्थ हैं और केवल ठोस में चलती हैं; 2. 2,900 किमी पर बाह्य क्रोड तरल है; 3. 105° से 180° तक निरंतर छाया क्षेत्र (>40% भू-भाग)।",
    commonMisconceptionVsFactEn: {
      misconception: "The S-wave shadow zone ends at 142° and waves reappear like P-waves.",
      fact: "P-waves re-emerge beyond 142° because they travel through liquids (refracted by the core). S-waves NEVER re-emerge beyond 105°; their shadow zone is completely continuous from 105° to 180°."
    },
    commonMisconceptionVsFactHi: {
      misconception: "S-तरंगें भी 142° के बाद दोबारा प्रकट हो जाती हैं।",
      fact: "P-तरंगें तरल से गुजर सकती हैं अतः वे 142° के बाद फिर आ जाती हैं। जबकि S-तरंगें 105° के बाद कभी वापस नहीं आतीं; उनका छाया क्षेत्र 105° से 180° तक लगातार रहता है।"
    },
    associatedDiagramType: "ray_trace"
  },

  // Chapter 4: Distribution of Oceans and Continents
  "evidence for continental drift": {
    id: "char-wegener-evidences",
    characteristicEn: "Geological congruence: Jigsaw continental fit, matching 2-billion-year rock belts, tillite glaciation, and identical freshwater fossils across ocean divides",
    characteristicHi: "भूगर्भीय समरूपता: महाद्वीपों का जिग-सॉ फिट, 200 करोड़ वर्ष पुरानी शैल पट्टियों का साम्य, हिमनदीय टिलाइट निक्षेप तथा खारे समुद्र पार समान जीवाश्मों की उपस्थिति",
    parentConceptEn: "Distribution of Oceans and Continents",
    parentConceptHi: "महासागरों और महाद्वीपों का वितरण",
    ncertBook: "Fundamentals of Physical Geography",
    chapterNumber: 4,
    chapterTitleEn: "Distribution of Oceans and Continents",
    chapterTitleHi: "महासागरों और महाद्वीपों का वितरण",
    scientificMechanismEn: "Alfred Wegener compiled multiple independent lines of physical evidence that prove the continents were once joined as Pangaea: 1. Jigsaw Coastline Fit: When mapped along the submerged continental slope boundary (1,000 fathoms depth, demonstrated by Bullard in 1964), the Atlantic coasts of South America and Africa lock together with less than 1° error. 2. Rock Age Matching: A 2,000-million-year-old coastal metamorphic belt in Brazil aligns directly with an identical belt in West Africa. 3. Tillite Glacial Evidence: Thick deposits of Permo-Carboniferous glacial tillite occur across tropical southern India (Talchir beds), Africa, Madagascar, Australia, and Antarctica, proving these continents shared a unified polar glacial ice sheet. 4. Fossil Distribution: The small freshwater reptile Mesosaurus could not swim across 5,000 km of saltwater, yet its skeletons occur only in Brazil and South Africa.",
    scientificMechanismHi: "वेगनर ने चार ठोस वैज्ञानिक प्रमाण प्रस्तुत किए: 1. जिग-सॉ फिट: 1964 में बुलार्ड ने कंप्यूटर द्वारा समुद्र में 1,000 फैदम गहरे ढाल पर दक्षिण अमेरिका और अफ्रीका को जोड़ा, जो बिल्कुल सटीक बैठा। 2. शैलों की आयु में समानता: ब्राजील की 200 करोड़ वर्ष पुरानी चट्टानों की पट्टी पश्चिम अफ्रीका की चट्टानों से सीधे मिलती है। 3. टिलाइट (हिमानी अवसाद): भारत (उड़ीसा के तलचर), अफ्रीका, ऑस्ट्रेलिया और अंटार्कटिका में एक ही काल के हिमनदीय अवसाद मिलते हैं, जो दर्शाते हैं कि ये सभी दक्षिणी ध्रुव के पास एक साथ बर्फ से ढके थे। 4. जीवाश्म: मीठे पानी का छोटा सरीसृप मेसोसॉरस खारा महासागर पार नहीं कर सकता था, फिर भी उसके जीवाश्म केवल ब्राजील और दक्षिण अफ्रीका में मिलते हैं।",
    causeAndEffectEn: "Cause: Rifting of the Gondwanaland supercontinent beginning in the Mesozoic era as mantle convection pulled landmasses apart.\nEffect: Identical rock formations, glacial pavements, and biological species were separated and carried thousands of kilometers across widening ocean basins.",
    causeAndEffectHi: "कारण: मध्यजीवी महाकल्प में गोंडवानालैंड का विखंडन और महाद्वीपों का विस्थापन।\nप्रभाव: एक ही काल की चट्टानें, हिमनदीय निक्षेप और जीवाश्म अलग-अलग महाद्वीपों में हजारों किलोमीटर दूर बंट गए।",
    realWorldExampleEn: "The Talchir glacial boulder beds in the Damodar coalfields of Odisha and Jharkhand contain striated glacial pavement identical in sedimentology to the Dwyka tillites of the Karoo Basin in South Africa.",
    realWorldExampleHi: "ओडिशा और झारखंड के तलचर कोयला क्षेत्र में मिलने वाले हिमनदीय बोल्डर (टिलाइट), दक्षिण अफ्रीका के कारू बेसिन के ड्वाइका टिलाइट से बिल्कुल मेल खाते हैं।",
    cbseMarkingCriteriaEn: "Full marks require explaining at least 3 distinct evidences: (1) Jigsaw fit of Atlantic coasts (Bullard 1,000 fathoms); (2) Tillite deposits across Gondwana continents; (3) Mesosaurus / Glossopteris fossil distribution.",
    cbseMarkingCriteriaHi: "पूर्ण अंक हेतु कम से कम 3 साक्ष्यों का विवरण आवश्यक है: (1) जिग-सॉ फिट (बुलार्ड 1,000 फैदम); (2) गोंडवाना देशों में टिलाइट हिमनदीय निक्षेप; (3) मेसोसॉरस व ग्लोसोप्टेरिस जीवाश्म।",
    commonMisconceptionVsFactEn: {
      misconception: "The fit between South America and Africa is measured along today's sandy beach coastlines.",
      fact: "Modern coastlines fluctuate with tides, erosion, and sea level. The authentic geological fit is tested at the edge of the submerged continental slope at 1,000 fathoms depth."
    },
    commonMisconceptionVsFactHi: {
      misconception: "यह मिलान आज के रेतीले समुद्र तटों के किनारे देखा जाता है।",
      fact: "आधुनिक तटरेखा अपरदन से बदलती रहती है; वास्तविक भूवैज्ञानिक मिलान समुद्र के भीतर 1,000 फैदम गहरे महाद्वीपीय ढाल पर सिद्ध हुआ है।"
    },
    associatedDiagramType: "boundary_interface"
  },

  // Chapter 8: Solar Radiation and Heat Budget
  "planetary albedo 35 units": {
    id: "char-albedo",
    characteristicEn: "Planetary Albedo (35%): Incoming solar radiation reflected back into space without heating Earth—clouds (27%), atmospheric scattering (6%), and snow/ice (2%)",
    characteristicHi: "पृथ्वी का एल्बीडो (35%): आपतित सौर विकिरण का वह भाग जो पृथ्वी को गर्म किए बिना सीधे अंतरिक्ष में परावर्तित हो जाता है—बादल (27%), प्रकीर्णन (6%), और हिमक्षेत्र (2%)",
    parentConceptEn: "Solar Radiation, Heat Balance and Temperature",
    parentConceptHi: "सौर विकिरण, ऊष्मा संतुलन एवं तापमान",
    ncertBook: "Fundamentals of Physical Geography",
    chapterNumber: 8,
    chapterTitleEn: "Solar Radiation, Heat Balance and Temperature",
    chapterTitleHi: "सौर विकिरण, ऊष्मा संतुलन एवं तापमान",
    scientificMechanismEn: "Earth's atmosphere and surface act as a reflective system. Out of every 100 units of shortwave solar radiation entering the top of the atmosphere, 35 units are immediately reflected back to space without contributing to heating. This 35% reflective ratio is Earth's planetary albedo. The primary reflector is cloud tops: bright tops of cumulus and stratus clouds reflect 27 units. Atmospheric gas molecules and aerosols scatter another 6 units back to space. Bright white snowfields, glaciers, and deserts reflect 2 units. Consequently, only 65 units (100 - 35) remain available to be absorbed: 14 units by the atmosphere and 51 units by Earth's land and ocean surfaces.",
    scientificMechanismHi: "पृथ्वी का वायुमंडल और धरातल परावर्तक की भांति कार्य करते हैं। सूर्य से आने वाली प्रति 100 इकाइयों में से 35 इकाइयां धरातल और वायुमंडल को गर्म किए बिना सीधे अंतरिक्ष में लौट जाती हैं। इस परावर्तित अनुपात (35%) को 'एल्बीडो' कहते हैं। इसमें सबसे बड़ा योगदान बादलों का है—सफेद बादलों के ऊपरी शिखर 27 इकाइयों को वापस लौटा देते हैं। वायुमंडल के धूल कण और गैसें 6 इकाइयों को प्रकीर्णित कर देती हैं। और धरातल की बर्फ 2 इकाइयों को परावर्तित करती है। अतः पृथ्वी और वायुमंडल को गर्म करने के लिए केवल 65 इकाइयां (100 - 35) ही बचती हैं।",
    causeAndEffectEn: "Cause: High specular and diffuse reflectance of cloud tops, atmospheric aerosols, and polar ice sheets.\nEffect: Regulates global thermal intake, preventing runaway overheating and maintaining stable temperature boundaries for ecosystems.",
    causeAndEffectHi: "कारण: बादलों, धूल कणों तथा हिमनदों की उच्च परावर्तन क्षमता।\nप्रभाव: पृथ्वी को अत्यधिक तपने से बचाना और जीवन के अनुकूल तापमान सीमा को संतुलित बनाए रखना।",
    realWorldExampleEn: "During the 1991 eruption of Mount Pinatubo, millions of tons of sulfur aerosols reached the stratosphere, temporarily increasing planetary albedo and reducing global surface temperatures by ~0.5°C for nearly two years.",
    realWorldExampleHi: "1991 में पिनातुबो ज्वालामुखी विस्फोट से जब राख और सल्फर वायुमंडल में छा गए, तो पृथ्वी का एल्बीडो बढ़ गया और अगले दो वर्षों तक पूरी दुनिया का औसत तापमान लगभग आधा डिग्री सेल्सियस घट गया।",
    cbseMarkingCriteriaEn: "Full credit requires writing the exact breakdown: 27 units by clouds + 6 units by dust scattering + 2 units by snow/ice = 35 units total albedo.",
    cbseMarkingCriteriaHi: "पूर्ण अंक हेतु सही विभाजन लिखें: 27 इकाइयां बादलों द्वारा + 6 इकाइयां धूल प्रकीर्णन द्वारा + 2 इकाइयां हिम द्वारा = कुल 35 इकाइयां।",
    commonMisconceptionVsFactEn: {
      misconception: "Albedo radiation heats the upper atmosphere before leaving.",
      fact: "Albedo represents pure reflection without absorption. It contributes zero thermal energy to the atmosphere."
    },
    commonMisconceptionVsFactHi: {
      misconception: "एल्बीडो की किरणें लौटते समय वायुमंडल को थोड़ा गर्म कर जाती हैं।",
      fact: "एल्बीडो विशुद्ध परावर्तन है। इसमें ऊष्मा का कोई अवशोषण नहीं होता, अतः यह वायुमंडल के तापमान में शून्य योगदान देता है।"
    },
    associatedDiagramType: "flow_cycle"
  },

  // Chapter 8: Heat Budget & Greenhouse Effect
  "atmospheric thermal trap 34 units": {
    id: "char-greenhouse-trap",
    characteristicEn: "Greenhouse mechanism: Atmosphere is transparent to incoming solar shortwaves but absorbs 34 out of 51 surface longwave units, warming the lower troposphere from below",
    characteristicHi: "ग्रीनहाउस क्रियाविधि: वायुमंडल सूर्य की लघु-तरंगों के लिए पारदर्शी है परंतु धरातल द्वारा छोड़ी गई 51 में से 34 दीर्घ-तरंग इकाइयों को सोखकर क्षोभमंडल को नीचे से गर्म करता है",
    parentConceptEn: "Solar Radiation, Heat Balance and Temperature",
    parentConceptHi: "सौर विकिरण, ऊष्मा संतुलन एवं तापमान",
    ncertBook: "Fundamentals of Physical Geography",
    chapterNumber: 8,
    chapterTitleEn: "Solar Radiation, Heat Balance and Temperature",
    chapterTitleHi: "सौर विकिरण, ऊष्मा संतुलन एवं तापमान",
    scientificMechanismEn: "The troposphere is heated from BELOW by terrestrial radiation, not directly from above by the sun. The hot Sun (~6,000°C) radiates high-energy shortwave solar energy that passes through atmospheric greenhouse gases with minimal absorption (only 14 units absorbed). The Earth's surface absorbs 51 units, warms up, and re-radiates this energy as low-temperature, longwave infrared radiation. Greenhouse gases—principally water vapor, carbon dioxide, and clouds—are opaque to longwaves. They absorb 34 of these 51 surface units: 23 units through latent heat of condensation released during cloud formation, 9 units through convective turbulence, and 2 units through direct radiation absorption. This warms the air near the surface and establishes the Normal Lapse Rate: temperature drops by 6.5°C per 1,000 meters of altitude.",
    scientificMechanismHi: "वायुमंडल ऊपर से नीचे आते हुए सूरज से सीधे गर्म नहीं होता, बल्कि नीचे धरातल से विकरित होने वाली ऊष्मा से गर्म होता है। 6,000°C गर्म सूर्य से लघु-तरंगें आती हैं जो वायुमंडल से बिना अधिक अवशोषण के गुजर जाती हैं (वायुमंडल केवल 14 इकाइयां सोखता है)। धरातल 51 इकाइयां सोखकर गर्म होता है और फिर ठंडी दीर्घ-तरंगों के रूप में ऊष्मा वापस छोड़ता है। जलवाष्प और कार्बन डाइऑक्साइड जैसी गैसें इन दीर्घ-तरंगों के लिए अपारदर्शी हैं और 34 इकाइयों को सोख लेती हैं (23 इकाइयां संघनन की गुप्त ऊष्मा से, 9 इकाइयां संवहन से, और 2 इकाइयां सीधे)। यही कारण है कि ऊंचाई बढ़ने पर तापमान घटता है (सामान्य ह्रास दर: प्रति 1,000 मीटर पर 6.5°C)।",
    causeAndEffectEn: "Cause: Selective permeability of greenhouse gases absorbing longwave terrestrial infrared radiation.\nEffect: Natural greenhouse warming elevates Earth's average surface temperature from a frozen -18°C to a habitable +15°C.",
    causeAndEffectHi: "कारण: वायुमंडलीय गैसों का लघु-तरंगों के लिए पारदर्शी और दीर्घ-तरंगों के लिए अपारदर्शी होना।\nप्रभाव: प्राकृतिक ग्रीनहाउस आवरण का निर्माण, जिससे पृथ्वी का औसत तापमान -18°C की बर्फ के बजाय जीवन योग्य +15°C बना रहता है।",
    realWorldExampleEn: "On cloudy winter nights in Delhi, clouds trap terrestrial radiation, keeping surface temperatures noticeably higher than on clear nights when heat escapes directly to space.",
    realWorldExampleHi: "दिल्ली में सर्दियों की रात जब आसमान में बादल छाए होते हैं, तो वे धरातलीय ऊष्मा को रोक लेते हैं और रात अपेक्षाकृत गर्म रहती है; जबकि साफ आसमान वाली रात में ठंड अधिक पड़ती है।",
    cbseMarkingCriteriaEn: "Full credit requires: 1. Contrasting shortwave solar with longwave terrestrial radiation; 2. Stating that the troposphere is heated from below; 3. Breaking down the 34 units (23 latent heat, 9 convection, 2 direct absorption).",
    cbseMarkingCriteriaHi: "पूर्ण अंक हेतु: 1. लघु-तरंग सौर और दीर्घ-तरंग स्थलीय विकिरण का अंतर; 2. वायुमंडल नीचे से गर्म होता है; 3. 34 इकाइयों का विभाजन (23 गुप्त ऊष्मा, 9 संवहन, 2 प्रत्यक्ष)।",
    commonMisconceptionVsFactEn: {
      misconception: "Mountain peaks are colder because they are surrounded by cold high-altitude space.",
      fact: "Mountain peaks are colder because the atmosphere is heated from the ground up, and thin, low-density mountain air contains fewer greenhouse molecules to trap terrestrial heat."
    },
    commonMisconceptionVsFactHi: {
      misconception: "पहाड़ों पर ठंड इसलिए होती है क्योंकि वे अंतरिक्ष के ठंडे वातावरण के पास हैं।",
      fact: "पहाड़ों पर ठंड इसलिए होती है क्योंकि वायुमंडल नीचे धरातल से गर्म होना शुरू होता है। पहाड़ों पर हवा विरल होती है जो धरातलीय ऊष्मा को रोक नहीं पाती।"
    },
    associatedDiagramType: "flow_cycle"
  },

  // Chapter 9: Planetary Circulation
  "coriolis force ferrels law": {
    id: "char-coriolis-force",
    characteristicEn: "Coriolis deflection: Earth's eastward axial rotation deflects moving winds to the right in the Northern Hemisphere and to the left in the Southern Hemisphere",
    characteristicHi: "कोरिओलिस विक्षेपण: पृथ्वी के पश्चिम से पूर्व घूर्णन के कारण गतिशील पवनें उत्तरी गोलार्ध में दाईं ओर तथा दक्षिणी गोलार्ध में बाईं ओर मुड़ जाती हैं (फेरेल का नियम)",
    parentConceptEn: "Atmospheric Circulation and Weather Systems",
    parentConceptHi: "वायुमंडलीय परिसंचरण तथा मौसम प्रणालियां",
    ncertBook: "Fundamentals of Physical Geography",
    chapterNumber: 9,
    chapterTitleEn: "Atmospheric Circulation and Weather Systems",
    chapterTitleHi: "वायुमंडलीय परिसंचरण तथा मौसम प्रणालियां",
    scientificMechanismEn: "Earth rotates on its axis from west to east once every 24 hours. Because Earth is spherical, the circumference at the Equator is ~40,000 km, so equatorial land travels eastward at ~1,670 km/h. At the poles, rotational velocity drops to zero. When air at the Equator moves northward toward the poles, it retains that high eastward velocity. As it moves over slower-moving northern ground, it pulls ahead to the east—giving the appearance of deflecting to the RIGHT. In the Southern Hemisphere, it deflects to the LEFT. Formulated by Gaspard-Gustave de Coriolis in 1835 and applied to planetary winds as Ferrel's Law, this deflective force is ZERO at the Equator and MAXIMUM at the poles. It is directly proportional to wind velocity and the sine of latitude.",
    scientificMechanismHi: "पृथ्वी अपनी धुरी पर पश्चिम से पूर्व घूमती है। भूमध्य रेखा पर पृथ्वी की परिधि सबसे बड़ी है, अतः वहां धरातल 1,670 किमी/घंटा की गति से घूम रहा है; जबकि ध्रुवों पर घूर्णन गति शून्य है। जब भूमध्य रेखा की हवा उत्तर की ओर चलती है, तो उसमें पूर्व की ओर जाने वाली गति पहले से होती है। जैसे ही वह कम गति वाले उत्तरी क्षेत्रों में पहुंचती है, वह आगे निकलकर दाईं ओर मुड़ जाती है। दक्षिणी गोलार्ध में यही हवा बाईं ओर मुड़ती है। इसी को फेरेल का नियम कहते हैं। यह बल भूमध्य रेखा पर शून्य और ध्रुवों पर सर्वाधिक होता है।",
    causeAndEffectEn: "Cause: Differential linear rotational speed across spherical latitudes as Earth spins eastward.\nEffect: 1. Winds blow obliquely across isobars rather than perpendicular; 2. Tropical cyclones cannot form on the Equator (0°-5°) due to absence of vortex spin; 3. Produces counter-clockwise cyclonic rotation in the Northern Hemisphere and clockwise in the Southern.",
    causeAndEffectHi: "कारण: गोलाकार पृथ्वी पर अक्षांशों के अनुसार घूर्णन गति का भिन्न होना।\nप्रभाव: 1. हवाएं समदाब रेखाओं के लंबवत न चलकर तिरछी चलती हैं; 2. भूमध्य रेखा (0°-5°) पर चक्रवात नहीं बन पाते क्योंकि वहां कोरिओलिस बल शून्य होता है; 3. उत्तरी गोलार्ध में चक्रवातों का वामावर्त (एंटी-क्लॉकवाइज) घूमना।",
    realWorldExampleEn: "When the Southeast Trade Winds cross the Equator into the northern Indian Ocean in June, the Coriolis force deflects them to the right, transforming them into the moisture-bearing Southwest Monsoon.",
    realWorldExampleHi: "जून में जब दक्षिणी हिंद महासागर की व्यापारिक पवनें भूमध्य रेखा पार करती हैं, तो कोरिओलिस बल उन्हें तुरंत दाईं ओर मोड़ देता है, जिससे वे 'दक्षिण-पश्चिम मानसून' बनकर भारत में प्रवेश करती हैं।",
    cbseMarkingCriteriaEn: "Full credit requires: 1. Deflection rule: Right in Northern, Left in Southern hemisphere (Ferrel's Law); 2. Magnitude: Zero at equator, maximum at poles; 3. Proportional to wind speed and latitude.",
    cbseMarkingCriteriaHi: "मूल्यांकन बिंदु: 1. फेरेल का नियम: उत्तरी गोलार्ध में दाईं ओर, दक्षिणी में बाईं ओर विक्षेपण; 2. भूमध्य रेखा पर शून्य और ध्रुवों पर अधिकतम; 3. पवन वेग व अक्षांश के समानुपाती।",
    commonMisconceptionVsFactEn: {
      misconception: "The Coriolis force pushes air forward and creates wind speed.",
      fact: "The Coriolis force does NOT generate wind speed—it is purely a deflective force that changes the direction of air already set in motion by pressure gradient forces."
    },
    commonMisconceptionVsFactHi: {
      misconception: "कोरिओलिस बल हवा को धक्का देकर उसकी गति बढ़ाता है।",
      fact: "कोरिओलिस बल हवा की गति पैदा नहीं करता—यह केवल दाब प्रवणता बल द्वारा चल रही हवा की दिशा को मोड़ने वाला विक्षेपक बल है।"
    },
    associatedDiagramType: "flow_cycle"
  },

  // =========================================================================
  // CLASS XI: INDIA: PHYSICAL ENVIRONMENT
  // =========================================================================

  // Chapter 2: Structure and Physiography
  "bhabar pebble disappearing streams": {
    id: "char-bhabar-streams",
    characteristicEn: "Bhabar porosity: Coarse gravel and alluvial pebble fans at the Shiwalik foothills exhibit extreme hydraulic permeability, swallowing streams underground",
    characteristicHi: "भाबर की सरंध्रता: शिवालिक के गिरिपाद में जमा कंकड़-पत्थरों के जलोढ़ पंखों में अत्यधिक पारगम्यता होती है, जिससे पर्वतीय नदियां भूमिगत होकर अदृश्य हो जाती हैं",
    parentConceptEn: "Structure and Physiography of India",
    parentConceptHi: "संरचना तथा भू-आकृति विज्ञान",
    ncertBook: "India: Physical Environment",
    chapterNumber: 2,
    chapterTitleEn: "Structure and Physiography of India",
    chapterTitleHi: "संरचना तथा भू-आकृति विज्ञान",
    scientificMechanismEn: "Himalayan torrents descend steep slopes with immense velocity, carrying heavy bedloads of boulders and coarse gravel. When a river reaches the foot of the outer Shiwalik range, the slope gradient flattens abruptly from over 25° to nearly zero. The sudden drop in carrying capacity forces the river to dump its coarsest sediments at the mountain base, forming a continuous 8 to 10 km wide piedmont apron of boulders, cobbles, and pebbles known as the Bhabar belt. Because large gravel particles leave broad interconnected pore spaces, hydraulic permeability is exceptionally high. Small streams and rivulets seep through the stones and vanish from the surface, flowing as subterranean channels beneath a dry boulder bed before re-emerging downstream in the marshy Terai tract.",
    scientificMechanismHi: "हिमालय की तीव्र ढालों से उतरती नदियां भारी वेग से पत्थरों और मलबे को साथ बहा लाती हैं। जैसे ही नदी शिवालिक की तलहटी में मैदान से मिलती है, ढाल अचानक चपटा हो जाता है। नदी अपना भारी बोझ वहीं छोड़ देती है—जिससे 8 से 10 किमी चौड़ी कंकड़-पत्थरों की पट्टी बन जाती है जिसे 'भाबर' कहते हैं। पत्थरों के बीच बहुत खाली जगह (सरंध्रता) होने के कारण छोटी नदियां पत्थरों के नीचे रिस जाती हैं। ऊपर से नदी का तल सूखा और पथरीला दिखता है, जबकि पानी नीचे-नीचे अदृश्य रूप से बहता रहता है और आगे तराई में जाकर निकलता है।",
    causeAndEffectEn: "Cause: Abrupt flattening of topographic gradient at the Shiwalik foothills depositing non-cohesive coarse boulder fans.\nEffect: 1. Total disappearance of surface river channels; 2. Land is uncultivable for agriculture; 3. Subsurface water re-emerges downstream, forming the Terai swamp belt.",
    causeAndEffectHi: "कारण: पर्वतीय ढाल के अचानक समाप्त होने से नदी द्वारा भारी कंकड़-पत्थरों का गिरिपाद पर निक्षेपण।\nप्रभाव: 1. नदियों का धरातल पर लुप्त होना; 2. खेती के लिए सर्वथा अनुपयुक्त; 3. नीचे जाकर यही पानी तराई के दलदल के रूप में फूट पड़ता है।",
    realWorldExampleEn: "In the foothill districts of Dehradun, Kotdwar, and Haldwani in Uttarakhand, winter travelers walk across wide, dry riverbeds composed of polished river stones while water flows invisibly a few meters below.",
    realWorldExampleHi: "उत्तराखंड के हल्द्वानी और कोटद्वार के पास शिवालिक के चरणों में सूखी पथरीली नदी पर लोग पैदल चलते हैं, जबकि पानी पत्थरों के नीचे कुछ मीटर गहराई में चुपचाप बह रहा होता है।",
    cbseMarkingCriteriaEn: "Full credit requires: 1. Location: 8 to 10 km narrow belt parallel to Shiwaliks; 2. Material: coarse boulders and pebbles; 3. Explanation of high porosity causing subterranean stream flow.",
    cbseMarkingCriteriaHi: "पूर्ण अंक हेतु: 1. शिवालिक के समानांतर 8 से 10 किमी चौड़ी पट्टी; 2. कंकड़-पत्थरों से निर्मित जलोढ़ पंख; 3. अत्यधिक सरंध्रता के कारण नदियों का भूमिगत हो जाना।",
    commonMisconceptionVsFactEn: {
      misconception: "Bhabar and Bhangar are spelling variants of the same soil formation.",
      fact: "Bhabar is the uncultivable stony foothill belt where rivers disappear. Bhangar is the older alluvium plain with Kankar nodules in the middle Ganga valley."
    },
    commonMisconceptionVsFactHi: {
      misconception: "भाबर और भांगर एक ही प्रकार की मिट्टी के दो नाम हैं।",
      fact: "भाबर शिवालिक के पैरों में कंकड़ों की पट्टी है जहां नदियां छिप जाती हैं। जबकि भांगर गंगा के मैदान में पुरानी उपजाऊ मिट्टी की ऊंची भूमि है जिसमें कंकड़ ग्रंथियां होती हैं।"
    },
    associatedDiagramType: "cross_section"
  },

  // Chapter 3: Drainage System
  "antecedent drainage gorge cutting": {
    id: "char-antecedent-gorge",
    characteristicEn: "Antecedent incision: Ancient rivers (Indus, Sutlej, Brahmaputra) predating the Himalayas carved vertical canyon gorges exceeding 5,000 meters to maintain their pathways",
    characteristicHi: "पूर्ववर्ती अपवाह कटाव: हिमालय से भी प्राचीन नदियां (सिंधु, सतलुज, ब्रह्मपुत्र) पर्वत के उठने के साथ-साथ 5,000 मीटर से गहरे गार्ज काटकर अपना मूल मार्ग बनाए रखती हैं",
    parentConceptEn: "Drainage System of India",
    parentConceptHi: "अपवाह तंत्र",
    ncertBook: "India: Physical Environment",
    chapterNumber: 3,
    chapterTitleEn: "Drainage System of India",
    chapterTitleHi: "अपवाह तंत्र",
    scientificMechanismEn: "An antecedent stream is a river system established on a land surface before tectonic uplift occurred. The Indus, Sutlej, and Tsangpo-Brahmaputra rivers flowed on the southern Eurasian margin millions of years before the Himalayan orogeny took place. When the Indian plate collided with Eurasia and the Greater Himalayas began folding upward, these major rivers had sufficient discharge and abrasive sediment loads to erode downward at a rate equal to or exceeding the rate of mountain uplift. As the mountains rose, the rivers maintained their original paths by slicing vertically through the bedrock, forming deep, near-vertical canyon gorges across the highest ranges on Earth.",
    scientificMechanismHi: "पूर्ववर्ती नदियां वे हैं जो किसी पर्वत के बनने से पहले से बह रही थीं। सिंधु, सतलुज और ब्रह्मपुत्र नदियां हिमालय के उत्थान से लाखों वर्ष पुरानी हैं। जब भारतीय प्लेट यूरेशिया से टकराई और हिमालय उठने लगा, तो इन शक्तिशाली नदियों के जल का कटाव वेग पर्वत के उठने की गति के बराबर रहा। जैसे-जैसे पर्वत उठा, नदियों ने उसे चीर दिया और 5,000 मीटर से गहरे खड़े गार्ज (कैनियन) बना डाले।",
    causeAndEffectEn: "Cause: Fluvial downcutting rate kept pace with the rate of tectonic mountain uplift.\nEffect: Rivers crosscut the highest mountain crests, originating on the northern Tibetan plateau and cutting directly through the Himadri into India and Pakistan.",
    causeAndEffectHi: "कारण: नदी के घाटी कटाव की गति पर्वत के ऊपर उठने की गति के बराबर रहना।\nप्रभाव: नदियां दुनिया की सबसे ऊंची पर्वत श्रेणियों को काटकर आर-पार बहती हैं और तिब्बत से भारत में प्रवेश करती हैं।",
    realWorldExampleEn: "The Indus cuts through the Greater Himalayas at Nanga Parbat, forming a gorge ~5,200 meters deep from peak to riverbed—one of the deepest canyons in the world.",
    realWorldExampleHi: "नंगा पर्वत (8,126 मी.) के पास सिंधु नदी का गार्ज लगभग 5,200 मीटर गहरा है—जो विश्व के सबसे गहरे नदीय गॉर्जों में से एक है।",
    cbseMarkingCriteriaEn: "Full credit requires: 1. Definition of antecedent drainage (predating mountain uplift); 2. Downcutting rate equaled uplift rate; 3. Naming all three rivers: Indus, Sutlej, Brahmaputra.",
    cbseMarkingCriteriaHi: "पूर्ण अंक हेतु: 1. पूर्ववर्ती नदी की परिभाषा (पर्वत उत्थान से पूर्व विद्यमान); 2. घाटी कटाव की दर पर्वत उत्थान से मेल खाना; 3. तीनों नदियों के नाम: सिंधु, सतलुज, ब्रह्मपुत्र।",
    commonMisconceptionVsFactEn: {
      misconception: "Rivers formed after the Himalayas rose and simply found low gaps to flow through.",
      fact: "Antecedent rivers were not diverted—they actively incised the highest mountain axis, which is why their sources lie far to the north in Tibet beyond the Greater Himalayas.",
    },
    commonMisconceptionVsFactHi: {
      misconception: "पर्वत उठने के बाद नदियां बनीं और जहां नीची जगह मिली वहां से बह निकलीं।",
      fact: "पूर्ववर्ती नदियां मुड़ी नहीं—उन्होंने मुख्य हिमालय पर्वतमाला को चीर डाला। इसी कारण इनका उद्गम स्थल हिमालय के उस पार तिब्बत में है।"
    },
    associatedDiagramType: "cross_section"
  },

  // Chapter 6: Soils of India
  "black soil self ploughing": {
    id: "char-regur-cracks",
    characteristicEn: "Self-ploughing pedology: Deep smectite montmorillonite clay cracks during summer aerate the subsoil naturally, while wet swelling traps immense moisture for cotton",
    characteristicHi: "स्वतः जुताई मृदा विज्ञान: ग्रीष्म ऋतु में मोंटमोरिलोनाइट चिकनी मिट्टी की गहरी दरारें उप-मृदा में प्राकृतिक वायु संचरण करती हैं, जबकि वर्षा में फूलकर नमी को महीनों तक रोके रखती हैं",
    parentConceptEn: "Soils of India (ICAR Classification)",
    parentConceptHi: "मृदा (भारतीय कृषि अनुसंधान परिषद वर्गीकरण)",
    ncertBook: "India: Physical Environment",
    chapterNumber: 6,
    chapterTitleEn: "Soils of India (ICAR Classification)",
    chapterTitleHi: "मृदा (भारतीय कृषि अनुसंधान परिषद वर्गीकरण)",
    scientificMechanismEn: "Black Soil (Regur or Black Cotton Soil) formed from the subaerial weathering of Cretaceous basaltic lava flows across the Deccan Traps. It contains over 60% fine clay dominated by the expandable 2:1 lattice mineral montmorillonite. When hydrated by monsoon rains, the clay absorbs water into its crystalline lattice, swells significantly, and becomes exceptionally sticky and impervious, locking moisture in the subsoil for months. During the dry summer season, moisture evaporates and the soil contracts strongly, developing gaping fissures up to 15 cm wide and over 1 meter deep. Surface soil crumbs fall into these open cracks. When rains return, the rehydrated soil churns from within, creating a continuous natural turnover called 'Self-Ploughing'.",
    scientificMechanismHi: "काली मिट्टी (रेगुर) दक्कन ट्रैप के बेसाल्टी लावे के अपक्षय से बनी है। इसमें 60% से अधिक महीन चिकनी मिट्टी होती है जिसमें मोंटमोरिलोनाइट खनिज पाया जाता है। वर्षा होने पर यह पानी सोखकर अत्यधिक फूल जाती है और चिपचिपी होकर पानी को महीनों तक बांध लेती है। ग्रीष्म काल में पानी सूखने पर यह सिकुड़ती है, जिससे खेतों में 10 से 15 सेमी चौड़ी और 1 मीटर से गहरी दरारें पड़ जाती हैं। ऊपर की उपजाऊ मिट्टी इन दरारों में गिरती है, जिससे अगली बारिश में मिट्टी की स्वतः पलटाई और वायु संचरण हो जाता है। इसे ही 'स्वतः जुताई' कहते हैं।",
    causeAndEffectEn: "Cause: Reversible expansion and contraction of 2:1 lattice montmorillonite clay under wetting and drying cycles.\nEffect: 1. Natural subsoil aeration and soil turnover; 2. Outstanding moisture retention allowing rainfed cotton and rabi wheat to mature with minimal irrigation.",
    causeAndEffectHi: "कारण: मोंटमोरिलोनाइट चिकनी मिट्टी का सूखने पर सिकुड़ना और भीगने पर फूलना।\nप्रभाव: 1. मिट्टी में प्राकृतिक रूप से वायु संचरण और पलटाई होना; 2. अत्यधिक नमी धारण क्षमता, जिससे बिना अतिरिक्त सिंचाई के भी कपास और रबी की फसलें पक जाती हैं।",
    realWorldExampleEn: "In the cotton districts of Vidarbha and Khandesh in Maharashtra and the Malwa Plateau in Madhya Pradesh, fields in May display deep crack networks that naturally aerate the soil ahead of the June monsoon sowing.",
    realWorldExampleHi: "महाराष्ट्र के विदर्भ व खानदेश तथा मध्य प्रदेश के मालवा पठार में मई के महीने में खेतों में चौड़ी दरारें दिखती हैं जो जून में मानसून आने से पहले मिट्टी को उपजाऊ और भुरभुरा बना देती हैं।",
    cbseMarkingCriteriaEn: "Full credit requires: 1. Origin: Cretaceous basaltic lava of Deccan Trap; 2. High clay content (>50%) and high moisture retention; 3. Explanation of dry-season cracks causing natural self-aeration.",
    cbseMarkingCriteriaHi: "पूर्ण अंक हेतु: 1. दक्कन लावा (बेसाल्ट) से उत्पत्ति; 2. उच्च चिकनी मिट्टी और जलधारण क्षमता; 3. ग्रीष्मकाल में चौड़ी दरारें पड़ना और स्वतः वायु संचरण की प्रक्रिया।",
    commonMisconceptionVsFactEn: {
      misconception: "Black soil gets its dark color from high organic humus content like temperate prairie soils.",
      fact: "Black soil is deficient in nitrogen, phosphorus, and organic humus. Its dark color is caused by titaniferous magnetite and iron-magnesium silicates derived from the parent basalt lava."
    },
    commonMisconceptionVsFactHi: {
      misconception: "काली मिट्टी में जैविक खाद (ह्यूमस) बहुत अधिक होता है, इसलिए इसका रंग काला है।",
      fact: "काली मिट्टी में ह्यूमस और नाइट्रोजन की कमी होती है। इसका काला रंग मूल बेसाल्ट लावे में मौजूद लोहे और टिटैनिफेरस मैग्नेटाइट खनिजों के कारण होता है।"
    },
    associatedDiagramType: "cross_section"
  },

  // =========================================================================
  // CLASS XII: FUNDAMENTALS OF HUMAN GEOGRAPHY
  // =========================================================================

  // Chapter 2: World Population
  "demographic transition stage 2 explosion": {
    id: "char-demographic-transition",
    characteristicEn: "Demographic explosion (Stage 2): Sanitation and vaccines drastically collapse mortality while cultural fertility remains stubbornly high, triggering unprecedented population expansion",
    characteristicHi: "जनांकिकीय विस्फोट (द्वितीय चरण): चिकित्सा व स्वच्छता से मृत्यु दर में तीव्र गिरावट आ जाती है, परंतु सामाजिक रूढ़ियों से जन्म दर उच्च बनी रहने से अभूतपूर्व जनसंख्या विस्फोट होता है",
    parentConceptEn: "The World Population: Distribution & Density",
    parentConceptHi: "विश्व जनसंख्या: वितरण, घनत्व और वृद्धि",
    ncertBook: "Fundamentals of Human Geography",
    chapterNumber: 2,
    chapterTitleEn: "The World Population: Distribution & Density",
    chapterTitleHi: "विश्व जनसंख्या: वितरण, घनत्व और वृद्धि",
    scientificMechanismEn: "In Stage 1 of human demography, birth rates were high (35-40/1,000) and death rates were equally high due to famines and epidemics, keeping population growth near zero. Stage 2 marks the transitional shift. The introduction of modern public health measures—treated water, antibiotics, vaccinations, and maternal healthcare—causes the Crude Death Rate (CDR) to fall rapidly within a generation from ~35/1,000 to ~10-12/1,000. However, the Crude Birth Rate (CBR) is governed by slow-evolving socio-cultural factors: traditional preference for large families, son preference, early marriage, and demand for agricultural labor. Birth rates therefore remain elevated (>30-35/1,000). The resulting wide gap between CBR and CDR produces peak natural increase, causing a demographic population explosion.",
    scientificMechanismHi: "मानव इतिहास के प्रथम चरण में जन्म दर भी ऊंची थी (35-40 प्रति हजार) और महामारियों से मृत्यु दर भी उतनी ही ऊंची थी, जिससे जनसंख्या वृद्धि बहुत धीमी थी। द्वितीय चरण में आधुनिक चिकित्सा, स्वच्छ पेयजल, टीकों और अस्पतालों के प्रसार से मृत्यु दर तेजी से गिरकर 10-12 प्रति हजार पर आ गई। परंतु जन्म दर का संबंध सामाजिक सोच (पुत्र की चाहत, कम उम्र में विवाह, कृषि में अधिक हाथों की जरूरत) से होता है जो आसानी से नहीं बदलती। अतः जन्म दर 35 पर बनी रही। जन्म और मृत्यु दर के बीच का यही विशाल अंतर 'जनसंख्या विस्फोट' कहलाता है।",
    causeAndEffectEn: "Cause: Rapid technological reduction in mortality combined with lagging cultural decline in birth rates.\nEffect: Rapid population expansion, a broad-based youthful age pyramid, and heightened pressure on schools, healthcare, and employment.",
    causeAndEffectHi: "कारण: मृत्यु दर में तीव्र वैज्ञानिक गिरावट, जबकि जन्म दर को नियंत्रित करने वाली सामाजिक सोच में धीमा बदलाव।\nप्रभाव: तीव्र जनसंख्या वृद्धि, बच्चों की अधिकता वाला चौड़ा आयु पिरामिड, तथा शिक्षा, स्वास्थ्य और रोजगार पर भारी दबाव।",
    realWorldExampleEn: "India between 1951 and 1981 exemplified Stage 2: death rates declined from 27/1,000 to 12/1,000 while birth rates remained above 34/1,000, causing India's population to grow from 361 million to 683 million in three decades.",
    realWorldExampleHi: "1951 से 1981 के बीच का भारत इसका प्रत्यक्ष उदाहरण था: मृत्यु दर 27 से घटकर 12 पर आ गई, परंतु जन्म दर 34 पर बनी रही, जिससे 30 वर्षों में भारत की आबादी 36 करोड़ से बढ़कर 68 करोड़ हो गई।",
    cbseMarkingCriteriaEn: "Full credit requires: 1. High CBR accompanied by rapidly declining CDR; 2. Citing public health advances versus cultural inertia; 3. Identifying the divergence on the graph as 'Natural Increase' or 'Population Explosion'.",
    cbseMarkingCriteriaHi: "पूर्ण अंक हेतु: 1. उच्च जन्म दर + तेजी से गिरती मृत्यु दर; 2. चिकित्सा सुविधाएं बनाम रूढ़िवादी सामाजिक सोच; 3. दोनों वक्रों के बीच के अंतर को 'प्राकृतिक वृद्धि' या 'जनसंख्या विस्फोट' लिखना।",
    commonMisconceptionVsFactEn: {
      misconception: "Population explosion occurs because mothers suddenly started having more babies per family.",
      fact: "Birth rates did not increase. Rather, infant and child mortality collapsed, allowing the vast majority of newborns to survive into adulthood."
    },
    commonMisconceptionVsFactHi: {
      misconception: "जनसंख्या विस्फोट इसलिए हुआ क्योंकि महिलाओं ने पहले से ज्यादा बच्चे पैदा करने शुरू कर दिए।",
      fact: "जन्म दर नहीं बढ़ी, बल्कि शिशुओं की असमय मृत्यु रुक गई। अधिकांश बच्चे जीवित रहकर बड़े हुए, जिससे जनसंख्या में तेज वृद्धि हुई।"
    },
    associatedDiagramType: "flow_cycle"
  },

  // Chapter 4: Primary Activities
  "plantation single cash crop": {
    id: "char-plantation-system",
    characteristicEn: "Plantation agriculture: European colonial estates characterized by huge capital investments, single cash crop specialization, cheap local labor, and factory-in-the-field integration",
    characteristicHi: "रोपण कृषि प्रणाली: यूरोपीय औपनिवेशिक एस्टेट जिसमें भारी पूंजी निवेश, एकल नकदी फसल विशेषज्ञता, सस्ता स्थानीय श्रम और खेत व कारखाने का सीधा जुड़ाव होता है",
    parentConceptEn: "Primary Activities",
    parentConceptHi: "प्राथमिक क्रियाएं",
    ncertBook: "Fundamentals of Human Geography",
    chapterNumber: 4,
    chapterTitleEn: "Primary Activities",
    chapterTitleHi: "प्राथमिक क्रियाएं",
    scientificMechanismEn: "Plantation agriculture was introduced by European colonial powers (British, French, Dutch, Portuguese) to produce tropical cash crops and raw materials for temperate domestic industries. It has five core characteristics: 1. Large territorial estates (latifundia or Brazilian fazendas); 2. Heavy capital investment for land clearance, processing machinery, and transport infrastructure; 3. Single-crop monoculture (tea, coffee, rubber, sugarcane, oil palm, cocoa, bananas); 4. Scientific farming methods and intensive agro-chemical inputs; 5. Factory-in-the-field processing, where harvested crops are processed immediately on-site to preserve commercial quality before long-distance export.",
    scientificMechanismHi: "रोपण कृषि यूरोपीय औपनिवेशिक शक्तियों द्वारा अपने देशों के कारखानों को कच्चा माल भेजने के लिए शुरू की गई थी। इसके 5 प्रमुख लक्षण हैं: 1. विशाल आकार के फार्म (एस्टेट या ब्राजील के फजेंडा); 2. भारी पूंजी निवेश; 3. एक ही नकदी फसल की खेती (चाय, कॉफी, रबर, गन्ना, कोको); 4. वैज्ञानिक तकनीक और रासायनिक खादों का प्रयोग; 5. खेत के अंदर ही प्रोसेसिंग कारखाना (जैसे चाय की पत्तियों को तोड़ते ही तुरंत सुखाना पड़ता है ताकि वे खराब न हों)।",
    causeAndEffectEn: "Cause: Industrialization in temperate Europe creating high demand for tropical crops that could not grow in European climates.\nEffect: Conversion of tropical forests into commercial monoculture estates and heavy reliance on indentured migrant labor.",
    causeAndEffectHi: "कारण: यूरोप की औद्योगिक क्रांति, जिसने उन उष्णकटिबंधीय फसलों (चाय, रबर) की भारी मांग पैदा की जो यूरोप की ठंड में नहीं उग सकती थीं।\nप्रभाव: उष्णकटिबंधीय वनों को काटकर विशाल एक-फसली बागानों की स्थापना और सस्ते प्रवासी मजदूरों पर निर्भरता।",
    realWorldExampleEn: "The British established tea estates across the Assam and Surma valleys in the 1840s, connecting plantations directly via river steamers and railways to Kolkata port for export to London auction markets.",
    realWorldExampleHi: "ब्रिटिश सरकार ने 1840 के दशक में असम की ब्रह्मपुत्र घाटी में चाय बागान लगाए और बागानों से सीधे कोलकाता बंदरगाह तक रेलवे लाइन बिछाई ताकि चाय को लंदन के बाजारों में तुरंत भेजा जा सके।",
    cbseMarkingCriteriaEn: "Full credit requires: 1. Introduced by Europeans in tropical colonies; 2. Key features: large estates, high capital, single crop, cheap labor; 3. Two crop examples (Tea in India/Sri Lanka, Coffee/Fazendas in Brazil, Rubber in Malaysia).",
    cbseMarkingCriteriaHi: "पूर्ण अंक हेतु: 1. यूरोपीय उपनिवेशवादियों द्वारा उष्णकटिबंध में शुरुआत; 2. मुख्य लक्षण: विशाल एस्टेट, भारी पूंजी, एकल फसल, सस्ता श्रम; 3. दो उदाहरण: भारत/श्रीलंका में चाय, ब्राजील में कॉफी (फजेंडा), मलेशिया में रबर।",
    commonMisconceptionVsFactEn: {
      misconception: "Small peasant plots of sugarcane in Uttar Pradesh are classified as plantation agriculture.",
      fact: "Small peasant plots are Intensive Subsistence Agriculture. True plantation farming requires large corporate-owned estates with dedicated industrial processing facilities on site."
    },
    commonMisconceptionVsFactHi: {
      misconception: "उत्तर प्रदेश में छोटे किसानों द्वारा एक-दो एकड़ में गन्ना उगाने को भी रोपण कृषि कहा जाता है।",
      fact: "वह गहन निर्वाह कृषि है। रोपण कृषि केवल तभी कहलाती है जब सैकड़ों हेक्टेयर का विशाल बागान हो और खेत के भीतर ही प्रोसेसिंग फैक्ट्री लगी हो।"
    },
    associatedDiagramType: "boundary_interface"
  },

  // =========================================================================
  // CLASS XII: INDIA: PEOPLE AND ECONOMY
  // =========================================================================

  // Chapter 5: Mineral and Energy Resources
  "jharia coking coal blast furnace": {
    id: "char-jharia-coal",
    characteristicEn: "Jharia metallurgic dominance: Gondwana bituminous coal with exceptional coking properties capable of bearing heavy structural loads and reducing iron ore in steel blast furnaces",
    characteristicHi: "झरिया कोयले का रणनीतिक महत्व: उत्तम कोकिंग गुणों वाला गोंडवाना बिटुमिनस कोयला जो इस्पात संयंत्र की धमन भट्ठी के भारी बोझ को सहन कर लौह अयस्क को पिघलाने में सक्षम है",
    parentConceptEn: "Mineral and Energy Resources",
    parentConceptHi: "खनिज तथा ऊर्जा संसाधन",
    ncertBook: "India: People and Economy",
    chapterNumber: 5,
    chapterTitleEn: "Mineral and Energy Resources",
    chapterTitleHi: "खनिज तथा ऊर्जा संसाधन",
    scientificMechanismEn: "Steelmaking requires a specialized grade of bituminous coal called Prime Coking Coal. When heated in an oxygen-free coke oven at 1,000°C, high-grade coking coal softens and resolidifies into hard, porous lumps called metallurgical coke. Inside a 30-meter steel blast furnace, thousands of tons of iron ore and limestone are fed from the top. Ordinary coal would crumble into fine powder under this weight, choking gas circulation. Hard Jharia coke possesses the compressive strength to support this burden while hot air circulates, chemically reducing iron oxide into molten iron. Over 90% of India's domestic prime coking coal is concentrated in a single basin: the Jharia coalfield in Dhanbad district, Jharkhand.",
    scientificMechanismHi: "आधुनिक इस्पात उद्योग को 'प्राइम कोकिंग कोयले' की आवश्यकता होती है। जब कोयले को बिना हवा के 1,000°C पर पकाया जाता है, तो वह पिघलकर मजबूत सरंध्र 'कोक' बन जाता है। 30 मीटर ऊंची लोहे की धमन भट्ठी में जब ऊपर से हजारों टन भारी कच्चा लोहा और चूना डाला जाता है, तो साधारण कोयला पिसकर भट्ठी का दम घोंट देगा। केवल झरिया का मजबूत कोकिंग कोयला ही उस भारी बोझ को सहते हुए भट्ठी के अंदर गैसों का प्रवाह बनाए रखता है और लोहे को पिघलाता है। भारत का 90% से अधिक प्राइम कोकिंग कोयला केवल एक ही जगह है: धनबाद (झारखंड) का झरिया कोयला क्षेत्र।",
    causeAndEffectEn: "Cause: Down-faulted rift valleys of the Damodar basin preserving deep, unoxidized Permian Gondwana coal seams under high geological pressure.\nEffect: Spatial clustering of India's integrated iron and steel plants (Bokaro, Jamshedpur, Burnpur, Durgapur, Rourkela) in the Chota Nagpur belt within rail haulage distance of Jharia.",
    causeAndEffectHi: "कारण: दामोदर भ्रंश घाटी में 20 करोड़ वर्ष पुराने गोंडवाना कोयले का अत्यधिक भूगर्भीय दबाव में सुरक्षित रहना।\nप्रभाव: भारत के सभी प्रमुख इस्पात संयंत्रों (बोकारो, जमशेदपुर, बर्नपुर, दुर्गापुर, राउरकेला) का झरिया के समीप छोटानागपुर क्षेत्र में ही स्थापित होना।",
    realWorldExampleEn: "The Bokaro Steel Plant was sited in Jharkhand just 40 km from Jharia to run a dedicated railway freight loop that delivers washed coking coal to its blast furnaces continuously.",
    realWorldExampleHi: "बोकारो इस्पात संयंत्र को झरिया से मात्र 40 किमी दूर झारखंड में इसीलिए स्थापित किया गया ताकि मालगाड़ियों द्वारा झरिया का कोकिंग कोयला सीधे भट्ठी में पहुंचता रहे।",
    cbseMarkingCriteriaEn: "Full credit requires: 1. Location: Jharia in Dhanbad district, Jharkhand; 2. Geological system: Gondwana Damodar valley; 3. Stating its role as 'Metallurgical Coking Coal' for blast furnace iron reduction.",
    cbseMarkingCriteriaHi: "पूर्ण अंक हेतु: 1. स्थान: धनबाद जिला, झारखंड; 2. भूगर्भीय तंत्र: गोंडवाना काल, दामोदर घाटी; 3. तकनीकी शब्द: लौह-इस्पात धमन भट्ठी हेतु 'धातुशोधन कोकिंग कोयला'।",
    commonMisconceptionVsFactEn: {
      misconception: "India has plentiful reserves of all varieties of coal.",
      fact: "India has vast reserves of non-coking thermal coal for power plants, but suffers a severe shortage of metallurgical coking coal, importing millions of tons annually from Australia to blend with domestic supply."
    },
    commonMisconceptionVsFactHi: {
      misconception: "भारत में हर प्रकार का कोयला प्रचुर मात्रा में उपलब्ध है।",
      fact: "भारत में बिजली बनाने वाला साधारण कोयला तो बहुत है, परंतु इस्पात बनाने वाला उत्तम कोकिंग कोयला बहुत कम है। हमें झरिया के कोयले में मिलाने के लिए हर वर्ष ऑस्ट्रेलिया से महंगा कोकिंग कोयला आयात करना पड़ता है।"
    },
    associatedDiagramType: "cross_section"
  },

  // Chapter 8: International Trade
  "ports gateways hinterlands": {
    id: "char-port-gateways",
    characteristicEn: "Ports as gateways of international trade: Maritime interfaces handling ~95% of foreign trade volume connecting continental hinterlands to oceanic lanes",
    characteristicHi: "अंतर्राष्ट्रीय व्यापार के प्रवेश द्वार के रूप में पत्तन: देश के विदेशी व्यापार के 95% परिमाण का संचालन करने वाले केंद्र जो अंतर्देशीय हिंटरलैंड को समुद्री मार्गों से जोड़ते हैं",
    parentConceptEn: "International Trade & Major Sea Ports",
    parentConceptHi: "अंतर्राष्ट्रीय व्यापार एवं प्रमुख समुद्री पत्तन",
    ncertBook: "India: People and Economy",
    chapterNumber: 8,
    chapterTitleEn: "International Trade & Major Ports",
    chapterTitleHi: "अंतर्राष्ट्रीय व्यापार एवं प्रमुख समुद्री पत्तन",
    scientificMechanismEn: "Seaports are the multi-modal physical nodes where land transport (freight railways, highways, pipelines) interfaces with high-tonnage ocean shipping. A port's economic viability and throughput depend directly on its 'Hinterland'—the tributary land region behind the port that generates export cargo (minerals, agricultural produce, manufactured goods) and absorbs imported goods (crude petroleum, fertilizers, machinery). India's 12 major ports across its 7,516 km coastline handle ~95% of foreign trade by volume. Individual ports feature specialized geographic functions: Kandla operates as a tidal port for northwestern agro-industrial states, Mumbai functions as India's largest natural deep-water gateway, JNPT serves as a mechanized container hub, and Visakhapatnam operates as a landlocked deep-draft port exporting Bailadila iron ore.",
    scientificMechanismHi: "बंदरगाह देश की अर्थव्यवस्था का प्रवेश द्वार (Gateway) हैं, जहां रेल और सड़क मार्ग समुद्री जहाजों से मिलते हैं। किसी भी बंदरगाह का महत्व उसके 'पृष्ठप्रदेश' (Hinterland) पर निर्भर करता है—अर्थात बंदरगाह के पीछे का वह भू-भाग जहां से निर्यात का सामान (कोयला, लोहा, अनाज) आता है और जहां आयातित सामान (कच्चा तेल, खाद, मशीनें) भेजा जाता है। भारत के 7,516 किमी लंबे तट पर 12 प्रमुख बंदरगाह हैं जो व्यापार के 95% परिमाण का वहन करते हैं। जैसे कांडला बंदरगाह उत्तर-पश्चिम भारत की सेवा करता है, मुंबई प्राकृतिक बंदरगाह है, जेएनपीटी आधुनिक कंटेनर हब है, और विशाखापत्तनम बैलाडीला के लोहे को जापान भेजने वाला भू-आबद्ध गहरा बंदरगाह है।",
    causeAndEffectEn: "Cause: Maritime transport offers the lowest per-ton-kilometer freight cost for bulk international commodities.\nEffect: Spatial concentration of customs facilities, container depots, export processing zones, and petroleum refineries around coastal gateway ports.",
    causeAndEffectHi: "कारण: भारी सामान को एक देश से दूसरे देश भेजने के लिए समुद्री मार्ग सबसे सस्ता साधन है।\nप्रभाव: तटीय बंदरगाहों के आसपास रिफाइनरियों, विशेष आर्थिक क्षेत्रों (SEZ) और कंटेनर डिपो का भारी संकेंद्रण।",
    realWorldExampleEn: "Following the 1947 Partition, the loss of Karachi port to Pakistan left Punjab, Haryana, and Rajasthan without a maritime outlet. The Government of India developed Kandla (Deendayal) Port on the Gulf of Kachchh in Gujarat to serve as the new gateway for this agricultural hinterland.",
    realWorldExampleHi: "1947 में विभाजन के बाद कराची बंदरगाह पाकिस्तान चले जाने पर पंजाब, हरियाणा और राजस्थान का समुद्री रास्ता बंद हो गया। तब भारत सरकार ने गुजरात में 'कांडला बंदरगाह' बनाया जिसने इस पूरे क्षेत्र के नए प्रवेश द्वार की भूमिका निभाई।",
    cbseMarkingCriteriaEn: "Full credit requires: 1. Defining ports as gateways linking land freight to maritime trade (95% volume); 2. Defining 'Hinterland' (the tributary economic region served); 3. Citing at least one specific major Indian port example (e.g. Kandla tidal port or Visakhapatnam deep-water).",
    cbseMarkingCriteriaHi: "पूर्ण अंक हेतु: 1. पत्तन को प्रवेश द्वार के रूप में परिभाषित करना (95% विदेशी व्यापार); 2. 'पृष्ठप्रदेश' (हिंटरलैंड) की स्पष्ट व्याख्या; 3. कम से कम एक प्रमुख भारतीय बंदरगाह का उदाहरण (कांडला या विशाखापत्तनम)।",
    commonMisconceptionVsFactEn: {
      misconception: "Mumbai Port and JNPT are two alternate names for the same dock.",
      fact: "Mumbai Port is a historic natural deep-water harbour on Mumbai island. JNPT (Jawaharlal Nehru Port at Nhava Sheva) was built across the harbour in 1989 as a modern satellite container port to relieve severe congestion at Mumbai."
    },
    commonMisconceptionVsFactHi: {
      misconception: "मुंबई पोर्ट और जेएनपीटी एक ही बंदरगाह के दो नाम हैं।",
      fact: "मुंबई पोर्ट पुराना प्राकृतिक बंदरगाह है। जबकि जेएनपीटी (न्हावा शेवा) 1989 में मुंबई का भीड़-भाड़ कम करने के लिए सामने मुख्य भूमि पर बनाया गया भारत का सबसे आधुनिक कंटेनर पोर्ट है।"
    },
    associatedDiagramType: "boundary_interface"
  }
};

/**
 * Intelligent Geography Deep-Dive Resolver:
 * Directly provides authentic NCERT geographic explanations.
 */
export function getCharacteristicDeepDive(
  charText: string,
  parentConcept?: string
): CharacteristicDeepDive {
  const normText = charText.toLowerCase().trim();

  // 1. Direct match in curated registry
  for (const [key, val] of Object.entries(CHARACTERISTICS_DEEP_DIVE_REGISTRY)) {
    if (
      normText.includes(key) ||
      key.includes(normText) ||
      val.characteristicEn.toLowerCase().includes(normText) ||
      normText.includes(val.characteristicEn.toLowerCase().slice(0, 25))
    ) {
      return val;
    }
  }

  // 2. Granular, topic-specific synthesis engine (no recycled domain templates)
  const term = charText.split(":")[0].replace(/^[-•*]\s*/, "").trim();

  let coreMechanismEn = "";
  let coreMechanismHi = "";
  let causeEn = "";
  let causeHi = "";
  let effectEn = "";
  let effectHi = "";
  let exampleEn = "";
  let exampleHi = "";
  let markingEn = "";
  let markingHi = "";
  let misconcEn = "";
  let factEn = "";
  let misconcHi = "";
  let factHi = "";

  // --- Coriolis, planetary winds, deflection ---
  if (/coriolis|deflect|ferrel|planetary wind|trade wind|westerl/.test(normText)) {
    coreMechanismEn = `The Coriolis effect arises from the conservation of angular momentum as Earth rotates eastward at ~1,670 km/h at the equator and zero at the poles. A parcel of air that begins moving poleward carries its high equatorial eastward momentum, so relative to the slower ground beneath it, it appears to curve to the right in the Northern Hemisphere and left in the Southern. This inertial deflection—not a true force—organizes zonal pressure belts into the trade winds, westerlies, and polar easterlies, and it prevents tropical cyclones from spinning up within 5° of the equator where the deflective component vanishes.`;
    coreMechanismHi = `कोरिओलिस प्रभाव पृथ्वी के पूर्व की ओर घूर्णन (भूमध्य रेखा पर ~1,670 किमी/घंटा, ध्रुवों पर शून्य) में कोणीय संवेग संरक्षण से उत्पन्न होता है। भूमध्य रेखा से चलने वाली वायु अपना तेज पूर्वी वेग बनाए रखती है, जिससे धीमी धरातल के सापेक्ष वह दाईं (उत्तरी) या बाईं (दक्षिणी) ओर मुड़ती प्रतीत होती है। यह वास्तविक बल नहीं बल्कि जड़त्वजन्य विक्षेपण है, जो व्यापारिक पवन, पश्चिमी पवन और ध्रुवीय पूर्वी पवनों का निर्माण करता है और भूमध्य रेखा के 5° भीतर चक्रवातों को बनने से रोकता है।`;
    causeEn = `Differential linear velocity of Earth's surface across latitude due to spherical rotation.`;
    causeHi = `गोल पृथ्वी के घूर्णन के कारण अक्षांशों पर पृथ्वी तल की भिन्न रैखिक गति।`;
    effectEn = `Oblique flow across isobars, cyclonic rotation direction, and suppression of equatorial cyclone genesis.`;
    effectHi = `समदाब रेखाओं के तिरछे पार प्रवाह, चक्रवाती घूर्णन दिशा और भूमध्यरेखीय चक्रवात निर्माण का दमन।`;
    exampleEn = `The southwest monsoon: Southeast Trade Winds cross the equator and are deflected right into the Arabian Sea as the Southwest Monsoon.`;
    exampleHi = `दक्षिण-पश्चिम मानसून: दक्षिण-पूर्वी व्यापारिक पवनें भूमध्य रेखा पार कर दाईं ओर मुड़कर अरब सागर में दक्षिण-पश्चिम मानसून बनती हैं।`;
    markingEn = `Credit: 1. State right/Northern, left/Southern deflection; 2. Zero at equator, max at poles; 3. Proportional to wind speed and sin(latitude).`;
    markingHi = `आवश्यक: 1. उत्तर में दाईं व दक्षिण में बाईं विक्षेपण; 2. भूमध्य पर शून्य, ध्रुवों पर अधिकतम; 3. वेग व अक्षांश के समानुपाती।`;
    misconcEn = `Assuming the Coriolis force pushes air forward to create wind speed.`;
    factEn = `It only changes the direction of already-moving air; it cannot initiate motion.`;
    misconcHi = `यह सोचना कि कोरिओलिस बल हवा को आगे धक्का देता है।`;
    factHi = `यह केवल चलती हवा की दिशा बदलता है, गति उत्पन्न नहीं करता।`;
  }
  // --- Monsoon, India climate, orographic rainfall ---
  else if (/monsoon|southwest|retreating|onset|break|arabian sea|bay of bengal/.test(normText)) {
    coreMechanismEn = `The Indian monsoon is driven by the seasonal reversal of the land–ocean thermal contrast. In summer, the Tibetan Plateau and subtropical landmass heat violently, creating a powerful thermal low over the subcontinent that draws the moisture-laden Southeast Trade Winds across the equator; the Coriolis force then deflects them into the Southwest Monsoon. As these saturated winds strike the Western Ghats and Himalayan foothills, orographic lift cools the air adiabatically (~6.5°C per km), condensing torrential rain. The winter Northeast Monsoon is comparatively dry, fed by the land-to-sea pressure gradient and offshore winds.`;
    coreMechanismHi = `भारतीय मानसून भू-समुद्री तापीय विषमता के मौसमी उत्क्रमण से संचालित होता है। ग्रीष्म में तिब्बत पठार व उपमहाद्वीप अत्यधिक गर्म होकर तापीय निम्न दाब बनाते हैं, जो दक्षिण-पूर्व व्यापारिक पवनों को भूमध्य पार खींचता है; कोरिओलिस उन्हें दक्षिण-पश्चिम मानसून में मोड़ देता है। जब ये आर्द्र पवन पश्चिमी घाट व हिमालय से टकराते हैं, तो ऊर्ध्वाधर उत्थान से वायु लगभग 6.5°C/किमी ठंडी होकर मूसलाधार वर्षा करती है। शीतकालीन उत्तर-पूर्व मानसून थल से सागर की दाब प्रवणता से शुष्क रहता है।`;
    causeEn = `Differential heating of the Indian landmass versus the surrounding oceans, intensified by the Tibetan Plateau.`;
    causeHi = `भारतीय थलभाग व समुद्रों के असमान तापन में भिन्नता, जो तिब्बत पठार से तीव्र होती है।`;
    effectEn = `Orographic downpours on windward slopes, rain-shadow aridity on leeward Deccan, and a bimodal annual rainfall regime.`;
    effectHi = `पवनमुखी ढालों पर भारी वर्षा, दक्कन के पृष्ठ-छाया क्षेत्र में शुष्कता और वर्ष में द्विआदर्शी वर्षा चक्र।`;
    exampleEn = `Shillong/Mawsynram receives >1,100 cm annually while the Deccan interior receives <60 cm due to the rain-shadow effect.`;
    exampleHi = `शिलांग/मौसिनराम को >1,100 सेमी वार्षिक वर्षा मिलती है जबकि दक्कन का भीतरी भाग वृष्टि-छाया से <60 सेमी पाता है।`;
    markingEn = `Credit: 1. Thermal low over land; 2. Southwest (summer) vs Northeast (winter) reversal; 3. Orographic lift mechanism.`;
    markingHi = `आवश्यक: 1. थल पर तापीय निम्न दाब; 2. ग्रीष्म दक्षिण-पश्चिम व शीत उत्तर-पूर्व उत्क्रमण; 3. ओरोग्राफिक उत्थान क्रियाविधि।`;
    misconcEn = `Believing the monsoon is caused by the Earth's tilt alone.`;
    factEn = `The monsoon is a differential heating phenomenon amplified by the Himalayas and Tibetan Plateau, not a direct consequence of axial tilt.`;
    misconcHi = `यह मानना कि मानसून केवल पृथ्वी की झुकाव से बनता है।`;
    factHi = `मानसून तापीय विषमता है जिसे हिमालय व तिब्बत पठार तीव्र करते हैं, यह अक्षीय झुकाव का सीधा परिणाम नहीं है।`;
  }
  // --- Insolation, heat budget, temperature, lapse rate ---
  else if (/insolation|heat budget|temperature|lapse|isotherm|thermal equator/.test(normText)) {
    coreMechanismEn = `Incoming solar radiation (insolation) varies with latitude because the same beam is spread over a larger surface area and passes through more atmosphere near the poles. The 23.5° axial tilt produces the seasonal migration of the thermal equator and the inversion of isotherms in the Southern Hemisphere oceans. The atmospheric temperature profile follows the Normal Lapse Rate of 6.5°C per 1,000 m because the troposphere is heated from below by re-radiated terrestrial longwave energy, not directly by the Sun.`;
    coreMechanismHi = `आपतित सौर विकिरण (इन्सोलेशन) अक्षांश के साथ बदलता है क्योंकि ध्रुवों के निकट एक ही किरण का क्षेत्रफल बड़ा होता है और वायुमंडल अधिक पार करती है। 23.5° अक्षीय झुकाव तापीय भूमध्य की मौसमी गमन व दक्षिणी गोलार्ध के महासागरों में समताप रेखाओं के उत्क्रमण का कारण है। वायुमंडल का तापमान 6.5°C/1,000 मीटर की सामान्य ह्रास दर से घटता है क्योंकि क्षोभमंडल को सूर्य से नहीं, बल्कि धरातल से उत्सर्जित दीर्घ-तरंग ऊष्मा से नीचे से गर्म किया जाता है।`;
    causeEn = `Spherical geometry of Earth's surface and latitudinal angle of incidence of solar rays.`;
    causeHi = `पृथ्वी की गोलाकार सतह व सौर किरणों के आपतन कोण की अक्षांशीय भिन्नता।`;
    effectEn = `Latitudinal temperature gradients, shifting thermal equator, and vertical cooling of the troposphere.`;
    effectHi = `अक्षांशीय तापमान प्रवणता, चलायमान तापीय भूमध्य और क्षोभमंडल का ऊर्ध्वाधर शीतन।`;
    exampleEn = `Verkhoyansk in Siberia records a January mean of -45°C while the thermal equator over the Indian Ocean stays near +27°C.`;
    exampleHi = `साइबेरिया का वेरखोयांस्क जनवरी में -45°C और हिंद महासागर का तापीय भूमध्य +27°C के निकट बना रहता है।`;
    markingEn = `Credit: 1. Angle of incidence vs latitude; 2. Troposphere heated from below; 3. Normal lapse rate 6.5°C/km.`;
    markingHi = `आवश्यक: 1. आपतन कोण व अक्षांश; 2. क्षोभमंडल नीचे से गर्म; 3. सामान्य ह्रास दर 6.5°C/किमी।`;
    misconcEn = `Thinking mountain tops are cold because they are nearer to the cold of space.`;
    factEn = `They are cold because thin air cannot retain the longwave heat re-radiated from the surface below.`;
    misconcHi = `यह सोचना कि पहाड़ अंतरिक्ष की ठंड के पास होने से ठंडे हैं।`;
    factHi = `वे ठंडे हैं क्योंकि विरल वायु धरातल से उत्सर्जित दीर्घ-तरंग ऊष्मा को रोक नहीं पाती।`;
  }
  // --- Albedo, reflection, clouds ---
  else if (/albedo|reflect|scatter|cloud|condens|rainfall|precipit|cyclone/.test(normText)) {
    coreMechanismEn = `The planetary albedo is the fraction of incident shortwave radiation reflected without heating the Earth system. Bright cloud tops (especially cumulonimbus) reflect up to 70–90% of insolation, while atmospheric aerosols scatter shorter blue wavelengths. Condensation of water vapor onto hygroscopic nuclei releases the latent heat of vaporization, which is the dominant energy source powering deep convection and tropical cyclones. Thus reflection cools while phase-change releases the energy that drives precipitation systems.`;
    coreMechanismHi = `पृथ्वी का एल्बीडो आपतित लघु-तरंग विकिरण का वह अंश है जो बिना ऊष्मा ग्रहण के परावर्तित हो जाता है। चमकीले बादल शीर्ष (विशेषकर क्यूमुलोनिम्बस) 70–90% इन्सोलेशन परावर्तित करते हैं, जबकि धूल कण नीले तरंगदैर्ध्य का प्रकीर्णन करते हैं। जलवाष्प के संघनन से वाष्पन की गुप्त ऊष्मा मुक्त होती है, जो गहन संवहन व उष्णकटिबंधीय चक्रवातों की मुख्य ऊर्जा है। अतः परावर्तन ठंडक देता है जबकि अवस्था-परिवर्तन वह ऊर्जा मुक्त करता है जो वर्षा तंत्र चलाती है।`;
    causeEn = `High reflectance of cloud decks and aerosols plus latent heat release during condensation.`;
    causeHi = `बादलों व धूल के उच्च परावर्तन और संघनन के दौरान गुप्त ऊष्मा मुक्ति।`;
    effectEn = `Moderated global temperatures and the energetic engine of storms and monsoon depressions.`;
    effectHi = `विश्व तापमान का संतुलन और चक्रवात व मानसून अवदाबों का ऊर्जा चालक।`;
    exampleEn = `A single tropical cyclone can release more latent heat in a day than the global human energy consumption of a year.`;
    exampleHi = `एक उष्णकटिबंधीय चक्रवात एक दिन में वैश्विक मानवीय ऊर्जा खपत के एक वर्ष से अधिक गुप्त ऊष्मा मुक्त कर सकता है।`;
    markingEn = `Credit: 1. Define albedo as reflected fraction; 2. Cloud tops dominate reflection; 3. Latent heat drives storms.`;
    markingHi = `आवश्यक: 1. एल्बीडो को परावर्तित अंश के रूप में परिभाषित करना; 2. बादल शीर्ष प्रमुख परावर्तक; 3. गुप्त ऊष्मा वर्षा तंत्र चलाती है।`;
    misconcEn = `Assuming reflected radiation warms the upper atmosphere.`;
    factEn = `Reflected radiation carries zero thermal energy; only absorbed radiation heats the system.`;
    misconcHi = `यह सोचना कि परावर्तित विकिरण ऊपरी वायुमंडल को गर्म करती है।`;
    factHi = `परावर्तित विकिरण शून्य ऊष्मा लाती है; केवल अवशोषित विकिरण ही तंत्र को गर्म करती है।`;
  }
  // --- River, drainage, fluvial, delta ---
  else if (/river|drainage|fluvial|delta|tributary|basin|gorge|valley/.test(normText)) {
    coreMechanismEn = `A river system is a dendritic network where discharge, sediment load, and channel gradient jointly control erosion and deposition. Steep youthful channels cut V-shaped valleys by vertical corrasion; mature rivers meander across floodplains through lateral erosion; and at the mouth, reduced velocity drops the suspended load to build a delta. The longitudinal profile evolves toward a graded state where erosion balances deposition, while tributary junctions reveal the underlying drainage pattern (dendritic, trellis, radial).`;
    coreMechanismHi = `नदी तंत्र एक शाखित जाल है जहां जलवहाव, अवसाद भार और ढाल संयुक्त रूप से अपरदन व निक्षेपण नियंत्रित करते हैं। युवा ढालों पर लंबवत कटाव से V-आकार की घाटियां बनती हैं; प्रौढ़ नदियां पार्श्व अपरदन से मोड़ खाती हैं; और मुहाने पर वेग कम होने से निलंबित अवसाद डेल्टा बनाता है। अनुदैर्ध्य प्रोफ़ाइल एक श्रेणीबद्ध अवस्था की ओर अग्रसर होता है जहां अपरदन व निक्षेपण संतुलित होते हैं।`;
    causeEn = `Gravity-driven flow velocity interacting with rock resistance and sediment supply.`;
    causeHi = `गुरुत्व-चालित प्रवाह वेग का चट्टान प्रतिरोध व अवसाद आपूर्ति के साथ अंतःक्रिया।`;
    effectEn = `Sequential landform evolution: V-valleys → meanders → ox-bow lakes → deltas, and characteristic drainage patterns.`;
    effectHi = `क्रमिक स्थलरूप विकास: V-घाटी → मोड़ → गोखुर झील → डेल्टा और विशिष्ट अपवाह प्रतिरूप।`;
    exampleEn = `The Ganga-Brahmaputra delta—the world's largest—spreads 1.0 million km² of silt across Bangladesh and West Bengal.`;
    exampleHi = `गंगा-ब्रह्मपुत्र डेल्टा, विश्व का सबसे बड़ा, बांग्लादेश व पश्चिम बंगाल में 10 लाख वर्ग किमी सिल्ट फैलाता है।`;
    markingEn = `Credit: 1. Youth/mature/old stage landforms; 2. Vertical vs lateral erosion; 3. Delta formation at base level.`;
    markingHi = `आवश्यक: 1. युवा/प्रौढ़/वृद्धावस्था स्थलरूप; 2. लंबवत व पार्श्व अपरदन; 3. आधार स्तर पर डेल्टा निर्माण।`;
    misconcEn = `Believing deltas form where rivers are fastest.`;
    factEn = `Deltas form where velocity drops sharply at the base level, dumping the sediment load.`;
    misconcHi = `यह सोचना कि डेल्टा तेज बहने वाली नदियों में बनते हैं।`;
    factHi = `डेल्टा तब बनता है जब मुहाने पर वेग अचानक घटकर अवसाद का निक्षेपण करे।`;
  }
  // --- Glacier, ice, permafrost ---
  else if (/glacier|ice|permafrost|moraine|firn|accumulation/.test(normText)) {
    coreMechanismEn = `Glaciers are viscous flows of crystalline ice moving under their own weight when accumulation at the accumulation zone exceeds ablation at the terminus. Internal deformation (creep) and basal sliding over meltwater lubricated beds transport vast sediment loads, scouring U-shaped valleys and depositing moraines. The equilibrium line altitude (ELA) marks the balance point; a rise in temperature shifts the ELA upward, triggering retreat and global sea-level rise through meltwater input.`;
    coreMechanismHi = `हिमनद छिद्रिल बर्फ का श्यान प्रवाह है जो तब चलता है जब संचय क्षेत्र में जमाव अपक्षय क्षेत्र की हानि से अधिक हो। आंतरिक विरूपण व स्नेहित तल पर बहाव बड़े अवसाद भार को ले जाते हैं, U-आकार की घाटियां काटते व मोरेन जमा करते हैं। संतुलन रेखा (ELA) संतुलन बिंदु है; तापमान वृद्धि ELA को ऊपर खिसकाकर हिमनद के ह्रास व समुद्र-स्तर वृद्धि लाती है।`;
    causeEn = `Mass balance between snow accumulation and summer ablation governed by temperature and precipitation.`;
    causeHi = `हिम संचय व ग्रीष्म अपक्षय के द्रव्यमान संतुलन द्वारा, तापमान व वर्षण से नियंत्रित।`;
    effectEn = `U-shaped glacial valleys, cirques, moraine dams, and eustatic sea-level change on melt.`;
    effectHi = `U-आकार हिमनदीय घाटियां, सर्क, मोरेन बांध और हिमानी गलन से समुद्र-स्तर परिवर्तन।`;
    exampleEn = `The Gangotri Glacier in Uttarakhand retreated ~1 km in the last century, exposing fresh moraine.`;
    exampleHi = `उत्तराखंड का गंगोत्री हिमनद पिछली शताब्दी में ~1 किमी ह्रासित हुआ, जिससे नई मोरेन उजागर हुई।`;
    markingEn = `Credit: 1. Accumulation vs ablation; 2. ELA concept; 3. Glacial vs fluvial valley shape.`;
    markingHi = `आवश्यक: 1. संचय व अपक्षय; 2. ELA संकल्पना; 3. हिमनदीय व नदीय घाटी आकृति भेद।`;
    misconcEn = `Assuming glaciers move mainly by melting and refreezing.`;
    factEn = `The dominant motion is internal creep of ice crystals plus basal sliding, not melt-refreeze at the surface.`;
    misconcHi = `यह सोचना कि हिमनद पिघल-जमाव से चलते हैं।`;
    factHi = `मुख्य गति बर्फ क्रिस्टल का आंतरिक विरूपण व तलीय स्लाइडिंग है, सतही पिघलाव नहीं।`;
  }
  // --- Weathering, erosion, mass movement, slope ---
  else if (/weathering|erosion|mass movement|landslide|slope|soil creep|exfoliation/.test(normText)) {
    coreMechanismEn = `Weathering disintegrates rock in situ through physical (freeze-thaw, thermal expansion, salt crystallization), chemical (hydrolysis, oxidation, carbonation), and biological processes, producing the regolith that erosion then transports. On steep slopes, the angle of repose and pore-water pressure govern mass movements: saturation reduces friction, triggering landslides, while slower soil creep reshapes hillslopes graduallly. Climate and rock lithology determine whether mechanical or chemical weathering dominates.`;
    coreMechanismHi = `अपक्षय भौतिक (हिम-गलन, तापीय प्रसार, लवण क्रिस्टलन), रासायनिक (जलअपघटन, ऑक्सीकरण, कार्बोनेशन) व जैविक प्रक्रियाओं से शैल का स्थानिक विघटन कर अवसाद (रेगोलिथ) बनाता है जिसे अपरदन ढुलाता है। खड़ी ढालों पर विश्राम कोण व रंध्र-जल दाब द्रव्यमान गति तय करते हैं: संतृप्ति घर्षण घटाकर भूस्खलन लाती है, जबकि मृदा क्रीप धीरे-धीरे ढाल ढालती है। जलवायु व शैल संरचना तय करती है कि यांत्रिक या रासायनिक अपक्षय प्रभावी होगा।`;
    causeEn = `Climate-controlled moisture and temperature acting on rock mineralogy and structure.`;
    causeHi = `जलवायु-नियंत्रित नमी व तापमान का शैल खनिज व संरचना पर क्रिया।`;
    effectEn = `Regolith formation, slope retreat, and the sediment supply that feeds rivers and deltas.`;
    effectHi = `रेगोलिथ निर्माण, ढाल का ह्रास और नदियों-डेल्टा को मिलने वाला अवसाद भंडार।`;
    exampleEn = `Laterite formation in tropical India: intense chemical weathering leaches silica, leaving iron-aluminium rich crusts.`;
    exampleHi = `उष्णकटिबंधीय भारत में लैटेराइट: तीव्र रासायनिक अपक्षय सिलिका धो देता है, लोह-एल्युमिना समृद्ध पपड़ी शेष रहती है।`;
    markingEn = `Credit: 1. Distinguish weathering (in situ) from erosion (transport); 2. Name physical/chemical types; 3. Slope stability factors.`;
    markingHi = `आवश्यक: 1. अपक्षय (स्थानिक) व अपरदन (परिवहन) भेद; 2. भौतिक/रासायनिक प्रकार; 3. ढाल स्थिरता कारक।`;
    misconcEn = `Using weathering and erosion as interchangeable terms.`;
    factEn = `Weathering breaks rock without moving it; erosion requires a transporting agent (water, wind, ice).`;
    misconcHi = `अपक्षय व अपरदन को समानार्थी समझना।`;
    factHi = `अपक्षय बिना हिलाए तोड़ता है; अपरदन को वाहक (जल, वायु, हिम) चाहिए।`;
  }
  // --- Soil, agriculture, pedology ---
  else if (/soil|pedolog|laterite|alluvial|red soil|arid|agricultur|cropping|farming|fertility/.test(normText)) {
    coreMechanismEn = `Soil is a four-dimensional body formed by the interplay of parent rock, climate, biosphere, relief, and time (the CLORPT factors). In India, the ICAR classification reflects this: alluvial soils derive from recent riverine deposition across the Indo-Gangetic Plain; black (regur) soils from Deccan basalt weather into montmorillonite clay; red soils from crystalline rocks are iron-oxide stained and leached; laterite develops under high rainfall with silica removal. Each soil's texture, base status, and moisture retention dictate its cropping suitability.`;
    coreMechanismHi = `मृदा चार-आयामी पिंड है जो मूल शैल, जलवायु, जैवमंडल, उच्चावच व काल (CLORPT कारक) की अंतःक्रिया से बनती है। भारत में ICAR वर्गीकरण यही दर्शाता है: जलोढ़ मृदा गंगा-सिंधु मैदान की नवीन नदीय निक्षेपण से; काली (रेगुर) मृदा दक्कन बेसाल्ट के मोंटमोरिलोनाइट चिकनी मिट्टी में अपक्षय से; लाल मृदा क्रिस्टलीय शैलों की लोह-ऑक्साइड अभिरंजित व रिसावयुक्त; लैटेराइट उच्च वर्षण में सिलिका निक्षालन से। प्रत्येक की बनावट, क्षारता व जलधारण फसल योग्यता तय करते हैं।`;
    causeEn = `Pedogenesis governed by CLORPT: climate and organisms actively transform parent material over time.`;
    causeHi = `मृदाजनन CLORPT द्वारा: जलवायु व जीव मूल द्रव्य का कालांतर में रूपांतरण करते हैं।`;
    effectEn = `Distinct soil orders with specific nutrient status, pH, and agricultural potential across India's physiographic zones.`;
    effectHi = `भारत की भौतिक प्रदेशिका में भिन्न पोषक स्तर, pH व कृषि क्षमता वाली सुपरिभाषित मृदा पेटियां।`;
    exampleEn = `Alluvial soils of the Punjab-Haryana plain support India's wheat-rice productivity due to high potash, phosphoric content, and canal irrigation.`;
    exampleHi = `पंजाब-हरियाणा के जलोढ़ क्षेत्र उच्च पोटाश, फॉस्फोरस व नहर सिंचाई से गेहूं-धान उत्पादन का केन्द्र हैं।`;
    markingEn = `Credit: 1. CLORPT factors; 2. Link specific soil to its parent rock and region; 3. Agricultural implication.`;
    markingHi = `आवश्यक: 1. CLORPT कारक; 2. मृदा का मूल शैल व क्षेत्र से जोड़; 3. कृषि निहितार्थ।`;
    misconcEn = `Assuming soil is merely finely crushed rock.`;
    factEn = `Soil is a living medium with organic matter, microbes, and developed horizons (A, B, C), not just eroded parent material.`;
    misconcHi = `यह मानना कि मिट्टी केवल पिसा हुआ चट्टान है।`;
    factHi = `मृदा जैव पदार्थ, सूक्ष्मजीव व विकसित संस्तर (A, B, C) वाला जीवंत माध्यम है।`;
  }
  // --- Tectonics, plate, earthquake, volcano ---
  else if (/tectonic|plate|earthquake|drift|ridge|fault|crust|mantle|core|seismic|fold/.test(normText)) {
    coreMechanismEn = `Plate tectonics explains surface deformation through the motion of lithospheric slabs riding on the ductile asthenosphere. Divergent boundaries spread at mid-ocean ridges by decompression melting; convergent boundaries subduct dense oceanic lithosphere, generating deep earthquakes and andesitic volcanism; transform faults slide past producing shallow quakes. Isostasy keeps crust floating at equilibrium; the Himalayas themselves rose as the buoyant Indian Plate underthrust beneath Eurasia, shortening and thickening the continental crust.`;
    coreMechanismHi = `प्लेट विवर्तनिकी स्थलमंडलीय पट्टियों की चिपचिपे एस्थेनोस्फ़ियर पर गति से सतह विरूपण समझाती है। अपसारी सीमाओं पर मध्य-महासागरीय कटक अवदाबी गलन से फैलते हैं; अभिसारी सीमाओं पर सघन महासागरीय लिथोस्फ़ियर का निमज्जन गहरे भूकंप व एंडीज़ी ज्वालामुखी करता है; रूपांतर भ्रंश जल्दी सतही भूकंप। समस्थिति वजन संतुलन रखती है; हिमालय भारतीय प्लेट के यूरेशिया के नीचे विवर्तन से उठे, जिससे महाद्वीपीय क्रस्ट लघुकृत व स्थूल हुई।`;
    causeEn = `Mantle convection and slab pull driving lithospheric plate motions at boundaries.`;
    causeHi = `आवरण संवहन व स्लैब-खिंचाव प्लेट गति के चालक।`;
    effectEn = `Mountain building, ocean basin opening, volcanic arcs, and the global distribution of seismicity.`;
    effectHi = `पर्वत निर्माण, महासागर बेसिन विस्तार, ज्वालामुखीय चाप और भूकंप भौगोलिक वितरण।`;
    exampleEn = `The Himalayan front merges the Indian and Eurasian plates, producing frequent shallow thrust earthquakes in Uttarakhand and Nepal.`;
    exampleHi = `हिमालयी अग्र भारतीय व यूरेशियाई प्लेट मिलाता है, जिससे उत्तराखंड-नेपाल में बारंबार उथल ट्रस्ट भूकंप आते हैं।`;
    markingEn = `Credit: 1. Three boundary types; 2. Convection / slab-pull mechanism; 3. Isostasy and crustal thickening.`;
    markingHi = `आवश्यक: 1. तीन सीमा प्रकार; 2. संवहन / स्लैब-खिंचाव; 3. समस्थिति व क्रस्ट स्थूलन।`;
    misconcEn = `Thinking continents plow through oceanic crust like ships.`;
    factEn = `Plates are passive riders on convecting mantle; the denser plate is subducted, not plowed through.`;
    misconcHi = `यह सोचना कि महाद्वीप समुद्री क्रस्ट को जहाज की तरह चीरते हैं।`;
    factHi = `प्लेट संवहनशील आवरण पर निष्क्रिय सवारी हैं; सघन प्लेट निमज्जित होती है, चीरी नहीं जाती।`;
  }
  // --- Population, demographic, settlement ---
  else if (/population|demographic|migration|settlement|urban|rural|density/.test(normText)) {
    coreMechanismEn = `Population distribution is a function of physical opportunity and historical accessibility. Favorable ecumenes—well-watered alluvial plains, temperate coasts, and mineral-rich highlands—concentrate people, whereas deserts, polar ice, and steep mountains remain稀疏. The Demographic Transition Model captures how declining mortality (via sanitation and medicine) against rigid fertility norms creates the Stage 2 expansion, while rural-to-urban migration reshapes density toward metropolitan agglomerations.`;
    coreMechanismHi = `जनसंख्या वितरण भौतिक अवसर व ऐतिहासिक पहुंच का फलन है। अनुकूल पारिस्थितिक क्षेत्र—सिंचित जलोढ़ मैदान, समशीतोष्ण तट व खनिज समृद्ध पहाड़ियां—जनसंख्या सघन करते हैं; मरुस्थल, ध्रुवीय बर्फ व खड़ी पहाड़ियां विरल। जनांकिकीय संक्रमण मॉडल बताता है कि स्वच्छता व चिकित्सा से घटती मृत्यु दर व कठोर जन्म दर के बीच अंतर चरण-2 विस्फोट लाता है, और ग्राम-शहर पलायन घनत्व को महानगरों की ओर मोड़ता है।`;
    causeEn = `Spatial variation in resource endowment, climate suitability, and infrastructural connectivity.`;
    causeHi = `संसाधन संपन्नता, जलवायु अनुकूलता व अवसंरचनात्मक जोड़ाव की स्थानिक भिन्नता।`;
    effectEn = `Clustered global population in river valleys and coasts, plus rapid urban agglomeration in developing economies.`;
    effectHi = `नदी घाटियों व तटों पर सघन जनसंख्या और विकासशील अर्थव्यवस्थाओं में तीव्र शहरीकरण।`;
    exampleEn = `The Indo-Gangetic Plain holds over 40% of India's population on less than 25% of its area due to fertile alluvium and perennial water.`;
    exampleHi = `इंडो-गंगा मैदान भारत की 25% से कम भूमि पर 40% से अधिक जनसंख्या रखता है, जो उपजाऊ जलोढ़ व सदानीरा जल से है।`;
    markingEn = `Credit: 1. Physical control on distribution; 2. DTM stages; 3. Push-pull migration factors.`;
    markingHi = `आवश्यक: 1. वितरण पर भौतिक नियंत्रण; 2. DTM चरण; 3. प्रेरक-आकर्षक पलायन कारक।`;
    misconcEn = `Assuming population growth is uniform across all regions.`;
    factEn = `Growth is highly uneven, concentrated in ecologically favored plains and expanding metropolitan corridors.`;
    misconcHi = `यह मानना कि जनसंख्या वृद्धि सर्वत्र समान है।`;
    factHi = `वृद्धि अत्यंत असमान है, पारिस्थितिकीय रूप से संपन्न मैदानों व महानगरीय गलियारों में केंद्रित।`;
  }
  // --- Industry, mineral, energy ---
  else if (/industr|mineral|coal|iron|steel|energy|factory|manufactur/.test(normText)) {
    coreMechanismEn = `Industrial location is dictated by Alfred Weber's least-cost principle: raw materials that lose weight in processing (iron ore, coal, bauxite) pull plants toward the mine, while market-oriented goods (perishables, bulky low-value items) shift toward consumers. India's steel belt clusters in Chota Nagpur because high-grade haematite, coking coal, and limestone lie within a 200-km radius, slashing freight. Energy geography follows the same logic—thermal plants sit on coalfields, hydro on plateau rim gradients.`;
    coreMechanismHi = `औद्योगिक अवस्थिति वेबर के न्यूनतम-लागत सिद्धांत से तय होती है: प्रक्रिया में वजन घटाने वाले कच्चे माल (लोह-अयस्क, कोयला, बॉक्साइट) संयंत्र को खान की ओर खींचते हैं, जबकि बाज़ारोन्मुख वस्तुएं (नाशवान, भारी कम-मूल्य) उपभोक्ता की ओर। भारत का इस्पात पट्टी छोटानागपुर में इसलिए केंद्रित है क्योंकि उत्तम हेमाटाइट, कोकिंग कोयला व चूना पत्थर 200 किमी के दायरे में हैं, जिससे ढुलाई लागत घटती है। ऊर्जा भूगोल भी यहीं: ताप विद्युत कोयला क्षेत्र पर, जल विद्युत पठार कगार प्रवणता पर।`;
    causeEn = `Minimization of weighted transport cost between material source, plant, and market.`;
    causeHi = `कच्चे माल, संयंत्र व बाज़ार के बीच भारित परिवहन लागत का न्यूनीकरण।`;
    effectEn = `Spatial clustering of heavy industry in mineral-rich belts and port-based light manufacturing.`;
    effectHi = `खनिज-समृद्ध पट्टियों में भारी उद्योग व तटीय हल्के विनिर्माण का स्थानिक संकेंद्रण।`;
    exampleEn = `The Chota Nagpur plateau supplies 80% of India's coal and 60% of iron ore, anchoring Jamshedpur, Bokaro, and Rourkela.`;
    exampleHi = `छोटानागपुर पठार भारत के 80% कोयला व 60% लोह-अयस्क देता है, जिससे जमशेदपुर, बोकारो, राउरकेला स्थापित।`;
    markingEn = `Credit: 1. Weight-losing vs weight-gaining materials; 2. Agglomeration economies; 3. Mineral belt linkage.`;
    markingHi = `आवश्यक: 1. वजन-घटाने व बढ़ाने वाले माल; 2. समूहन अर्थव्यवस्था; 3. खनिज पट्टी संबंधन।`;
    misconcEn = `Believing factories can be placed anywhere irrespective of raw material weight.`;
    factEn = `Weight-losing raw materials legally and economically bind plants to the mine to avoid crushing freight bills.`;
    misconcHi = `यह सोचना कि कारखाने बिना कच्चे माल के वजन के कहीं भी लग सकते हैं।`;
    factHi = `वजन-घटाने वाला माल संयंत्र को खान से बांधता है ताकि भारी ढुलाई लागत बचे।`;
  }
  // --- Transport, port, trade, infrastructure ---
  else if (/transport|port|trade|rail|road|shipping|connectivity|communication/.test(normText)) {
    coreMechanismEn = `Transport networks are anisotropic spaces where cost and time decay with distance, but physical barriers (mountains, oceans) and node hierarchy (ports, hubs) distort that decay. Sea transport offers the lowest ton-km cost, so bulk trade funnels through gateway ports whose throughput is limited by their hinterland's rail/road connectivity. In India, the 7,516 km coastline and 12 major ports bind the peninsular interior to global commodity chains, while the Dedicated Freight Corridors compress the Delhi–Mumbai and Kolkata–Delhi distance-time budget.`;
    coreMechanismHi = `परिवहन जाल दिशा-भिन्न स्थान हैं जहां लागत व समय दूरी के साथ घटते हैं, किंतु भौतिक बाधाएं (पर्वत, महासागर) व संधि-पदानुक्रम (बंदरगाह, हब) इसे विकृत करते हैं। समुद्री परिवहन न्यूनतम टन-किमी लागत देता है, अतः भारी व्यापार प्रवेश-द्वार बंदरगाहों से होकर जाता है जिनकी क्षमता हिंटरलैंड की रेल/सड़क जोड़ाव पर निर्भर है। भारत का 7,516 किमी तट व 12 प्रमुख बंदरगाह प्रायद्वीपीय भीतरी भाग को वैश्विक शृंखला से जोड़ते हैं, और समर्पित मालगाड़ी गलियारे दिल्ली-मुंबई व कोलकाता-दिल्ली की दूरी-समय लागत संपीड़ित करते हैं।`;
    causeEn = `Friction of distance moderated by mode-specific cost structures and gateway node capacity.`;
    causeHi = `दूरी का घर्षण विधा-विशिष्ट लागत व प्रवेश-द्वार क्षमता से नियंत्रित।`;
    effectEn = `Hinterland specialization, port-led urbanization, and compressed space-time along corridors.`;
    effectHi = `हिंटरलैंड विशिष्टीकरण, बंदरगाह-प्रेरित नगरीकरण और गलियारों में संपीड़ित अवकाश-काल।`;
    exampleEn = `Mundra Port's private rail linkages turned arid Kutch into India's largest cargo handler by volume.`;
    exampleHi = `मुंद्रा बंदरगाह की निजी रेल जोड़ाव ने शुष्क कच्छ को आयतन में भारत का सबसे बड़ा कार्गो केंद्र बना दिया।`;
    markingEn = `Credit: 1. Distance-decay principle; 2. Sea vs road cost advantage; 3. Hinterland-port coupling.`;
    markingHi = `आवश्यक: 1. दूरी-क्षय सिद्धांत; 2. समुद्र व सड़क लागत लाभ; 3. हिंटरलैंड-बंदरगाह संयोजन।`;
    misconcEn = `Treating all transport modes as equally efficient for bulk goods.`;
    factEn = `Sea and rail move bulk at a fraction of road cost, which is why ports and corridors dominate heavy trade.`;
    misconcHi = `सभी परिवहन विधाओं को भारी माल हेतु समान दक्ष मानना।`;
    factHi = `समुद्र व रेल भारी माल सड़क से कम लागत पर ले जाते हैं, इसीलिए बंदरगाह व गलियारे प्रमुख हैं।`;
  }
  // --- Map, scale, cartography, GIS, time ---
  else {
    coreMechanismEn = `Cartography translates the spherical Earth onto a plane through mathematical projection, inevitably introducing distortion in area, shape, distance, or direction (the four projection properties that cannot be simultaneously preserved). The Representative Fraction (1:50,000) is a unitless ratio binding map distance to ground distance, while the international date line and 82.5°E IST meridian convert Earth's 15°/hour rotation into a single national time zone. GIS layers these spatial datasets for overlay analysis and buffer modeling.`;
    coreMechanismHi = `मानचित्रण गोल पृथ्वी को समतल पर गणितीय प्रक्षेपण से उतारता है, जिसमें क्षेत्रफल, आकृति, दूरी या दिशा में विकृति अनिवार्य है (ये चार गुण एक साथ संरक्षित नहीं हो सकते)। निरूपक भिन्न (1:50,000) मापनीहीन अनुपात है जो मानचित्र व धरातल दूरी जोड़ता है, जबकि अंतर्राष्ट्रीय तिथि रेखा व 82.5°E IST मध्याह्न पृथ्वी के 15°/घंटा घूर्णन को एक राष्ट्रीय समय में बदलते हैं। जीआईएस इन स्थानिक स्तरों का अध्यारोपण व बफर विश्लेषण करता है।`;
    causeEn = `Geometric impossibility of flattening a sphere without deformation plus Earth's rotation for timekeeping.`;
    causeHi = `बिना विकृति के गोले को समतल करने की ज्यामितीय असंभवता व समय हेतु पृथ्वी घूर्णन।`;
    effectEn = `Scale-dependent measurement, deliberate projection choice for thematic accuracy, and unified civil time.`;
    effectHi = `मापनी-आधारित मापन, विषयगत शुद्धता हेतु प्रक्षेपण चयन और एकीकृत नागरिक समय।`;
    exampleEn = `A 2 cm line on a 1:50,000 toposheet equals exactly 1 km on the ground; Mercator distorts Greenland's area massively near the poles.`;
    exampleHi = `1:50,000 टोपोशीट पर 2 सेमी रेखा धरातल पर ठीक 1 किमी; मर्केटर ध्रुवों के निकट ग्रीनलैंड का क्षेत्रफल अत्यधिक विकृत करता है।`;
    markingEn = `Credit: 1. R.F. as unitless ratio; 2. Four distortion properties; 3. 1° = 4 min time conversion.`;
    markingHi = `आवश्यक: 1. R.F. मापनीहीन अनुपात; 2. चार विकृति गुण; 3. 1° = 4 मिनट समय रूपांतरण।`;
    misconcEn = `Believing a single flat map can show everything truthfully.`;
    factEn = `Every map projection is a compromise; the cartographer chooses which property to preserve for the map's purpose.`;
    misconcHi = `यह सोचना कि एक सपाट नक्शा सब कुछ सत्य दिखा सकता है।`;
    factHi = `हर मानचित्र समझौता है; निर्माता उद्देश्यानुसार किसी एक गुण को बचाना चुनता है।`;
  }

  return {
    id: `char-ncert-${Date.now()}`,
    characteristicEn: charText,
    characteristicHi: charText,
    parentConceptEn: parentConcept || "NCERT Core Curriculum Topic",
    parentConceptHi: parentConcept || "एनसीईआरटी मुख्य पाठ्यक्रम विषय",
    ncertBook: "CBSE Geography (Classes XI & XII)",
    chapterNumber: 1,
    chapterTitleEn: parentConcept || "Geography Curriculum Analysis",
    chapterTitleHi: "भूगोल पाठ्यक्रम गहन विश्लेषण",
    scientificMechanismEn: coreMechanismEn,
    scientificMechanismHi: coreMechanismHi,
    causeAndEffectEn: `Cause: ${causeEn}\nEffect: ${effectEn}`,
    causeAndEffectHi: `कारण: ${causeHi}\nप्रभाव: ${effectHi}`,
    realWorldExampleEn: exampleEn,
    realWorldExampleHi: exampleHi,
    cbseMarkingCriteriaEn: markingEn,
    cbseMarkingCriteriaHi: markingHi,
    commonMisconceptionVsFactEn: {
      misconception: misconcEn,
      fact: factEn
    },
    commonMisconceptionVsFactHi: {
      misconception: misconcHi,
      fact: factHi
    },
    associatedDiagramType:
      /river|drainage|glacier|weathering|tectonic|plate|earthquake|coriolis|monsoon|insolation/.test(normText)
        ? "cross_section"
        : /albedo|cloud|rainfall|precipit|heat budget|temperature/.test(normText)
        ? "flow_cycle"
        : /port|trade|transport|boundary|interface/.test(normText)
        ? "boundary_interface"
        : "cartographic_grid"
  };
}
