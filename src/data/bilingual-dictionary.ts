/**
 * CBSE Geography Academic Bilingual Dictionary (English <-> Hindi)
 * Classes XI & XII
 */

export interface TermTranslation {
  en: string;
  hi: string;
  definitionEn: string;
  definitionHi: string;
}

export const GEOGRAPHY_DICTIONARY: Record<string, TermTranslation> = {
  // Physical Geography Terms
  "continental_drift": {
    en: "Continental Drift",
    hi: "महाद्वीपीय विस्थापन",
    definitionEn: "Wegener's hypothesis that all continents were once part of a single supercontinent (Pangaea) that fragmented and drifted apart.",
    definitionHi: "अल्फ्रेड वेगनर का सिद्धांत कि सभी महाद्वीप पहले एक विशाल भूखंड (पैंजिया) का हिस्सा थे जो कालांतर में टूटकर अलग हुए।"
  },
  "plate_tectonics": {
    en: "Plate Tectonics",
    hi: "प्लेट विवर्तनिकी",
    definitionEn: "Theory that Earth's outer shell is divided into large rigid lithospheric plates moving over the semi-fluid asthenosphere.",
    definitionHi: "सिद्धांत जिसके अनुसार पृथ्वी का स्थलमंडल अनेक दृढ़ विवर्तनिक प्लेटों में विभाजित है जो दुर्बलतामंडल पर तैरती हैं।"
  },
  "divergent_boundary": {
    en: "Divergent Boundary",
    hi: "अपसारी सीमा",
    definitionEn: "Constructive margin where two plates move apart, allowing basaltic magma to well up and create new oceanic crust.",
    definitionHi: "रचनात्मक प्लेट सीमा जहां दो प्लेटें एक-दूसरे से दूर खिसकती हैं और नया समुद्री क्रस्ट बनता है।"
  },
  "convergent_boundary": {
    en: "Convergent Boundary",
    hi: "अभिसारी सीमा",
    definitionEn: "Destructive margin where plates collide, causing subduction of heavier oceanic plate or folding into mountain ranges.",
    definitionHi: "विनाशात्मक प्लेट सीमा जहां दो प्लेटें टकराती हैं और पर्वत निर्माण अथवा गर्त का निर्माण होता है।"
  },
  "transform_fault": {
    en: "Transform Fault",
    hi: "रूपांतर भ्रंश",
    definitionEn: "Conservative boundary where plates slide past each other horizontally without creating or destroying crust.",
    definitionHi: "संरक्षी प्लेट सीमा जहां प्लेटें एक-दूसरे के समानांतर क्षैतिज रूप से खिसकती हैं।"
  },
  "earthquake_shadow_zone": {
    en: "Earthquake Shadow Zone",
    hi: "भूकंपीय छाया क्षेत्र",
    definitionEn: "Specific geographic zones where seismographs do not detect earthquake waves (P-waves: 105°-142°; S-waves: >105°).",
    definitionHi: "पृथ्वी का वह विशिष्ट भाग जहां सिस्मोग्राफ पर भूकंपीय तरंगें दर्ज नहीं होतीं (P-तरंग: 105°-142°; S-तरंग: 105° से अधिक)।"
  },
  "mohorovicic_discontinuity": {
    en: "Mohorovicic Discontinuity",
    hi: "मोहोरोविसिक असांतत्य (मोहो)",
    definitionEn: "Boundary separating Earth's crust from the denser underlying mantle.",
    definitionHi: "पृथ्वी के क्रस्ट और मेंटल को अलग करने वाली संक्रमण सीमा।"
  },
  "heat_budget": {
    en: "Heat Budget of the Earth",
    hi: "पृथ्वी का ऊष्मा बजट",
    definitionEn: "The balance between incoming shortwave solar radiation and outgoing longwave terrestrial radiation.",
    definitionHi: "पृथ्वी द्वारा प्राप्त लघु-तरंग सौर विकिरण और वापस विकरित दीर्घ-तरंग स्थलीय विकिरण के बीच संतुलन।"
  },
  "albedo": {
    en: "Albedo",
    hi: "एल्बिडो / धवलता",
    definitionEn: "The fraction of incoming solar radiation reflected back into space without heating the Earth (~35%).",
    definitionHi: "सौर विकिरण का वह भाग जो पृथ्वी को गर्म किए बिना अंतरिक्ष में परावर्तित हो जाता है (लगभग 35%)।"
  },
  "temperature_inversion": {
    en: "Temperature Inversion",
    hi: "तापमान का व्युत्क्रमण",
    definitionEn: "Condition in which temperature increases with altitude instead of decreasing, typical on clear, calm winter nights.",
    definitionHi: "वह दशा जिसमें ऊंचाई बढ़ने पर तापमान घटने के बजाय बढ़ता है; शांत शीतकालीन रातों में घाटियों में सामान्य।"
  },
  "coriolis_force": {
    en: "Coriolis Force (Ferrel's Law)",
    hi: "कोरिओलिस बल (फेरेल का नियम)",
    definitionEn: "Apparent deflective force caused by Earth's rotation, turning moving air right in Northern hemisphere and left in Southern.",
    definitionHi: "पृथ्वी के घूर्णन से उत्पन्न आभासी बल जो पवनों को उत्तरी गोलार्ध में दाईं ओर और दक्षिणी गोलार्ध में बाईं ओर मोड़ता है।"
  },
  "hadley_cell": {
    en: "Hadley Cell",
    hi: "हेडली सेल / कोष्ठ",
    definitionEn: "Low-latitude atmospheric circulation pattern rising at ITCZ and sinking at subtropical high pressure belts.",
    definitionHi: "विषुवतीय निम्न वायुदाब से उठकर उपोष्ण उच्च वायुदाब पेटी (अश्व अक्षांश) में नीचे बैठने वाला परिसंचरण कोष्ठ।"
  },
  "relative_humidity": {
    en: "Relative Humidity (RH)",
    hi: "सापेक्ष आर्द्रता",
    definitionEn: "The ratio of actual water vapor in the air to the maximum saturation capacity at that temperature, expressed in %.",
    definitionHi: "किसी निश्चित तापमान पर वायु में उपस्थित वास्तविक जलवाष्प और उसकी कुल आर्द्रता सामर्थ्य का प्रतिशत अनुपात।"
  },
  "orographic_rainfall": {
    en: "Orographic Rainfall",
    hi: "पर्वतीय वर्षा",
    definitionEn: "Precipitation produced when moisture-laden winds are forced to rise over mountain barriers, leaving a leeward rain-shadow.",
    definitionHi: "वर्षा जो तब होती है जब आर्द्र पवनें पर्वत से टकराकर ऊपर उठती हैं; पवनविमुख ढाल पर वृष्टि छाया बनती है।"
  },
  "antecedent_river": {
    en: "Antecedent Drainage",
    hi: "पूर्ववर्ती अपवाह",
    definitionEn: "A river system that existed before the tectonic uplift of mountain ranges and cut deep gorges to maintain its course (e.g. Indus, Sutlej, Brahmaputra).",
    definitionHi: "नदी जो हिमालय के उत्थान से पूर्व विद्यमान थी और पर्वतों को काटकर गहरे गार्ज बनाती हुई अपना मार्ग बनाए रखती है।"
  },
  "regur_soil": {
    en: "Black / Regur Soil",
    hi: "काली / रेगुर मिट्टी",
    definitionEn: "Basaltic Deccan lava soil with high clay content, notable for self-ploughing cracks and cotton cultivation.",
    definitionHi: "दक्कन लावा से निर्मित अत्यधिक चिकनी मिट्टी, जो सूखने पर गहरी दरारें (स्वतः जुताई) बनाती है और कपास के लिए उत्तम है।"
  },
  "transhumance": {
    en: "Transhumance",
    hi: "ऋतु प्रवास",
    definitionEn: "Seasonal migration of pastoral herders and their livestock between plains in winter and high mountain pastures in summer (e.g. Gujjars, Gaddis).",
    definitionHi: "पशुपालकों का अपने पशुओं के साथ ऋतु परिवर्तन के अनुसार शीतकाल में मैदानी भागों और ग्रीष्मकाल में पर्वतीय चरागाहों की ओर प्रवास।"
  },
  "demographic_transition": {
    en: "Demographic Transition",
    hi: "जनांकिकीय संक्रमण सिद्धांत",
    definitionEn: "Theory describing how societies transition from high birth and high death rates to low birth and low death rates alongside development.",
    definitionHi: "सिद्धांत जो दर्शाता है कि विकास के साथ समाज उच्च जन्म व उच्च मृत्यु दर से निम्न जन्म व निम्न मृत्यु दर की ओर अग्रसर होता है।"
  },
  "human_development_index": {
    en: "Human Development Index (HDI)",
    hi: "मानव विकास सूचकांक",
    definitionEn: "Composite measure of health, education, and per capita income formulated by Dr. Mahbub ul Haq and Amartya Sen.",
    definitionHi: "स्वास्थ्य, शिक्षा और प्रति व्यक्ति आय को मिलाकर बनाया गया समग्र सूचकांक (डॉ. महबूब उल हक और अमर्त्य सेन)।"
  },
  "representative_fraction": {
    en: "Representative Fraction (R.F.)",
    hi: "निरूपक भिन्न",
    definitionEn: "Cartographic scale expressed as a unitless fraction (1:50,000 means 1 unit on map equals 50,000 units on ground).",
    definitionHi: "इकाई रहित अनुपात जिसमें अंश मानचित्र दूरी और हर धरातल की वास्तविक दूरी दर्शाता है (1:50,000)।"
  },
  "gis_buffer": {
    en: "GIS Buffer Analysis",
    hi: "जीआईएस बफर विश्लेषण",
    definitionEn: "Spatial proximity operation that creates an equidistant boundary zone around a geographic point, line, or polygon.",
    definitionHi: "स्थानिक विश्लेषण जिसमें किसी बिंदु, रेखा (सड़क/नदी) या बहुभुज के चारों ओर निश्चित दूरी का क्षेत्र निर्मित किया जाता है।"
  }
};

export type LanguageCode = "en" | "hi";

export function getLocalizedTerm(key: string, lang: LanguageCode): string {
  const entry = GEOGRAPHY_DICTIONARY[key];
  if (!entry) return key;
  return lang === "hi" ? entry.hi : entry.en;
}
