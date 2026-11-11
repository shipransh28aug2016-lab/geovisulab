/**
 * CBSE Geography Map Practice Items Catalogue
 * Classes XI & XII
 * Categorized into 4 Distinct Syllabi
 */

export interface MapPracticeItem {
  id: string;
  nameEn: string;
  nameHi: string;
  category: "CLASS_XI_WORLD" | "CLASS_XI_INDIA" | "CLASS_XII_WORLD" | "CLASS_XII_INDIA";
  subCategory: string;
  coordinates: [number, number]; // [lat, lng]
  ncertChapter: string;
  descriptionEn: string;
  descriptionHi: string;
  examFrequency: "High" | "Very High" | "Guaranteed Board Item";
  options?: string[]; // for multiple choice identification
}

export const CBSE_MAP_PRACTICE_ITEMS: MapPracticeItem[] = [
  // =========================================================================
  // 1. CLASS XI WORLD
  // =========================================================================
  {
    id: "mxi-w-1",
    nameEn: "Mid-Atlantic Ridge",
    nameHi: "मध्य अटलांटिक कटक",
    category: "CLASS_XI_WORLD",
    subCategory: "Tectonic Divergent Boundary",
    coordinates: [25.0, -45.0],
    ncertChapter: "Class 11 - Fundamentals of Physical Geography, Ch 4",
    descriptionEn: "Submarine mountain ridge formed by divergent sea floor spreading where North American and Eurasian plates pull apart.",
    descriptionHi: "समुद्री पर्वत श्रृंखला जो अपसारी प्लेट संचलन और समुद्री अधस्तल विस्तार से बनती है।",
    examFrequency: "Very High",
    options: ["Mid-Atlantic Ridge", "Mariana Trench", "Java Trench", "East Pacific Rise"]
  },
  {
    id: "mxi-w-2",
    nameEn: "Mariana Trench (Challenger Deep)",
    nameHi: "मारियाना गर्त (चैलेंजर गर्त)",
    category: "CLASS_XI_WORLD",
    subCategory: "Deep Ocean Trench",
    coordinates: [11.3493, 142.1996],
    ncertChapter: "Class 11 - Fundamentals of Physical Geography, Ch 3 & 12",
    descriptionEn: "Deepest oceanic trench on Earth (~11,034 m) located in western Pacific Ocean formed by subduction of Pacific Plate.",
    descriptionHi: "पृथ्वी का सबसे गहरा महासागरीय गर्त (11,034 मीटर), जो प्रशांत प्लेट के क्षेपण से बनता है।",
    examFrequency: "Guaranteed Board Item",
    options: ["Java Trench", "Mariana Trench", "Puerto Rico Trench", "Aleutian Trench"]
  },
  {
    id: "mxi-w-3",
    nameEn: "Gulf Stream (Warm Current)",
    nameHi: "गल्फ स्ट्रीम (गर्म जलधारा)",
    category: "CLASS_XI_WORLD",
    subCategory: "Ocean Currents",
    coordinates: [35.0, -65.0],
    ncertChapter: "Class 11 - Fundamentals of Physical Geography, Ch 13",
    descriptionEn: "Powerful warm western boundary current flowing northward along the east coast of North America into North Atlantic Drift.",
    descriptionHi: "शक्तिशाली गर्म महासागरीय जलधारा जो उत्तरी अमेरिका के पूर्वी तट से होकर बहती है।",
    examFrequency: "Guaranteed Board Item",
    options: ["Gulf Stream", "Labrador Current", "Canaries Current", "Benguela Current"]
  },
  {
    id: "mxi-w-4",
    nameEn: "Labrador Current (Cold Current)",
    nameHi: "लेब्राडोर धारा (ठंडी जलधारा)",
    category: "CLASS_XI_WORLD",
    subCategory: "Ocean Currents",
    coordinates: [52.0, -52.0],
    ncertChapter: "Class 11 - Fundamentals of Physical Geography, Ch 13",
    descriptionEn: "Cold southward ocean current in the northwest Atlantic meeting warm Gulf Stream at Grand Banks, Newfoundland.",
    descriptionHi: "उत्तर-पश्चिम अटलांटिक की ठंडी धारा जो न्यूफ़ाउंडलैंड में गल्फ स्ट्रीम से मिलती है।",
    examFrequency: "Very High",
    options: ["Labrador Current", "Gulf Stream", "Oyashio Current", "Falkland Current"]
  },
  {
    id: "mxi-w-5",
    nameEn: "Mediterranean Climate Zone (Cs)",
    nameHi: "भूमध्यसागरीय जलवायु प्रदेश (Cs)",
    category: "CLASS_XI_WORLD",
    subCategory: "Köppen Climate Zones",
    coordinates: [38.0, 15.0],
    ncertChapter: "Class 11 - Fundamentals of Physical Geography, Ch 11",
    descriptionEn: "Subtropical dry-summer climate with mild rainy winters influenced by shifting Westerlies; famous for viticulture.",
    descriptionHi: "उपोष्ण शुष्क-ग्रीष्म जलवायु जहां शीतकाल में पछुआ पवनों से वर्षा होती है; अंगूर की खेती हेतु प्रसिद्ध।",
    examFrequency: "High",
    options: ["Mediterranean Zone (Cs)", "Equatorial Rainforest (Af)", "Hot Desert (BWh)", "Taiga (Dfc)"]
  },

  // =========================================================================
  // 2. CLASS XI INDIA
  // =========================================================================
  {
    id: "mxi-i-1",
    nameEn: "Mt. K2 (Godwin Austen, 8,611 m)",
    nameHi: "माउंट के2 (गॉडविन ऑस्टिन, 8,611 मी.)",
    category: "CLASS_XI_INDIA",
    subCategory: "Mountain Peaks",
    coordinates: [35.8808, 76.5133],
    ncertChapter: "Class 11 - India: Physical Environment, Ch 2",
    descriptionEn: "Second highest peak in the world, located in the Karakoram Range.",
    descriptionHi: "विश्व की दूसरी सर्वोच्च पर्वत चोटी, काराकोरम पर्वत श्रेणी में स्थित।",
    examFrequency: "Guaranteed Board Item",
    options: ["Mt. K2", "Kanchenjunga", "Nanda Devi", "Guru Shikhar"]
  },
  {
    id: "mxi-i-2",
    nameEn: "Kanchenjunga (8,586 m)",
    nameHi: "कंचनजंगा (8,586 मी.)",
    category: "CLASS_XI_INDIA",
    subCategory: "Mountain Peaks",
    coordinates: [27.7025, 88.1475],
    ncertChapter: "Class 11 - India: Physical Environment, Ch 2",
    descriptionEn: "Third highest mountain in the world, on the border of Sikkim and Nepal.",
    descriptionHi: "सिक्किम और नेपाल की सीमा पर स्थित विश्व की तीसरी सबसे ऊंची पर्वत चोटी।",
    examFrequency: "Guaranteed Board Item",
    options: ["Kanchenjunga", "Mt. K2", "Anamudi", "Doda Betta"]
  },
  {
    id: "mxi-i-3",
    nameEn: "Anamudi Peak (Western Ghats, 2,695 m)",
    nameHi: "अनामुडी चोटी (पश्चिमी घाट, 2,695 मी.)",
    category: "CLASS_XI_INDIA",
    subCategory: "Mountain Peaks",
    coordinates: [10.1699, 77.0641],
    ncertChapter: "Class 11 - India: Physical Environment, Ch 2",
    descriptionEn: "Highest peak in Peninsular India and Western Ghats, located in Kerala at junction of Anaimalai, Palani and Cardamom hills.",
    descriptionHi: "प्रायद्वीपीय भारत और पश्चिमी घाट की सर्वोच्च चोटी (केरल में स्थित)।",
    examFrequency: "Guaranteed Board Item",
    options: ["Anamudi", "Doda Betta", "Mahendragiri", "Guru Shikhar"]
  },
  {
    id: "mxi-i-4",
    nameEn: "Narmada River Rift Valley",
    nameHi: "नर्मदा नदी भ्रंश घाटी",
    category: "CLASS_XI_INDIA",
    subCategory: "Rivers & Drainage",
    coordinates: [22.25, 76.25],
    ncertChapter: "Class 11 - India: Physical Environment, Ch 3",
    descriptionEn: "Originates at Amarkantak, flows west through a structural rift valley between Vindhya and Satpura ranges into Arabian Sea.",
    descriptionHi: "अमरकंटक से निकलकर विंध्य और सतपुड़ा के बीच भ्रंश घाटी से पश्चिम की ओर बहने वाली नदी।",
    examFrequency: "Guaranteed Board Item",
    options: ["Narmada", "Tapi", "Godavari", "Mahanadi"]
  },
  {
    id: "mxi-i-5",
    nameEn: "Chilika Lake (Odisha)",
    nameHi: "चिल्का झील (ओडिशा)",
    category: "CLASS_XI_INDIA",
    subCategory: "Lakes & Wetlands",
    coordinates: [19.7, 85.3],
    ncertChapter: "Class 11 - India: Physical Environment, Ch 3",
    descriptionEn: "Largest brackish water lagoon in Asia and first Ramsar wetland site of India, situated south of Mahanadi delta.",
    descriptionHi: "एशिया की विशालतम खारे पानी की लैगून झील, भारत का प्रथम रामसर आर्द्रभूमि स्थल।",
    examFrequency: "Very High",
    options: ["Chilika Lake", "Wular Lake", "Sambhar Lake", "Kolleru Lake"]
  },
  {
    id: "mxi-i-6",
    nameEn: "Nilgiri Biosphere Reserve",
    nameHi: "नीलगिरि जीवमंडल निश्चय",
    category: "CLASS_XI_INDIA",
    subCategory: "Biosphere Reserves",
    coordinates: [11.55, 76.5],
    ncertChapter: "Class 11 - India: Physical Environment, Ch 5",
    descriptionEn: "First Biosphere Reserve established in India (1986) at tri-junction of Tamil Nadu, Kerala, and Karnataka in Western Ghats.",
    descriptionHi: "भारत का प्रथम जीवमंडल निश्चय (1986), तमिलनाडु, केरल और कर्नाटक की सीमा पर।",
    examFrequency: "Guaranteed Board Item",
    options: ["Nilgiri Biosphere", "Nanda Devi Biosphere", "Gulf of Mannar", "Sunderbans"]
  },

  // =========================================================================
  // 3. CLASS XII WORLD
  // =========================================================================
  {
    id: "mxii-w-1",
    nameEn: "Trans-Siberian Railway (St. Petersburg to Vladivostok)",
    nameHi: "ट्रांस-साइबेरियन रेलमार्ग (सेंट पीटर्सबर्ग से व्लादिवोस्तोक)",
    category: "CLASS_XII_WORLD",
    subCategory: "Trans-Continental Transport",
    coordinates: [55.7558, 37.6173],
    ncertChapter: "Class 12 - Fundamentals of Human Geography, Ch 7",
    descriptionEn: "Longest railway line in the world (9,332 km), connecting St. Petersburg in European Russia to Vladivostok on the Pacific coast.",
    descriptionHi: "विश्व का सबसे लंबा रेलमार्ग (9,332 किमी), सेंट पीटर्सबर्ग से प्रशांत तट पर व्लादिवोस्तोक तक।",
    examFrequency: "Guaranteed Board Item",
    options: ["Trans-Siberian Railway", "Trans-Canadian Railway", "Australian Trans-Continental", "Union Pacific"]
  },
  {
    id: "mxii-w-2",
    nameEn: "Suez Canal (Port Said to Port Tewfik)",
    nameHi: "स्वेज नहर (पोर्ट सईद से पोर्ट स्वेज)",
    category: "CLASS_XII_WORLD",
    subCategory: "Shipping Canals",
    coordinates: [30.5852, 32.2654],
    ncertChapter: "Class 12 - Fundamentals of Human Geography, Ch 7",
    descriptionEn: "Sea-level canal opened in 1869 linking Mediterranean Sea to Red Sea, shortening Liverpool to Mumbai route by 7,200 km.",
    descriptionHi: "1869 में खुली समुद्री नहर जो भूमध्य सागर और लाल सागर को जोड़ती है; लिवरपूल से मुंबई की दूरी 7,200 किमी घटाई।",
    examFrequency: "Guaranteed Board Item",
    options: ["Suez Canal", "Panama Canal", "Kiel Canal", "St. Lawrence Seaway"]
  },
  {
    id: "mxii-w-3",
    nameEn: "Panama Canal (Colon to Panama City)",
    nameHi: "पनामा नहर (कोलोन से पनामा सिटी)",
    category: "CLASS_XII_WORLD",
    subCategory: "Shipping Canals",
    coordinates: [9.1012, -79.6953],
    ncertChapter: "Class 12 - Fundamentals of Human Geography, Ch 7",
    descriptionEn: "72 km lock-system canal connecting Atlantic Ocean to Pacific Ocean across Isthmus of Panama, opened in 1914.",
    descriptionHi: "अटलांटिक और प्रशांत महासागर को जोड़ने वाली 72 किमी लंबी 6-लॉक नहर, 1914 में खुली।",
    examFrequency: "Guaranteed Board Item",
    options: ["Panama Canal", "Suez Canal", "Erie Canal", "Kiel Canal"]
  },
  {
    id: "mxii-w-4",
    nameEn: "North American Prairies (Commercial Grain)",
    nameHi: "उत्तरी अमेरिकी प्रेयरी (वाणिज्यिक अनाज कृषि)",
    category: "CLASS_XII_WORLD",
    subCategory: "Primary Activities",
    coordinates: [50.0, -105.0],
    ncertChapter: "Class 12 - Fundamentals of Human Geography, Ch 4",
    descriptionEn: "Extensive mechanized commercial wheat and maize farming in the temperate grasslands of North America.",
    descriptionHi: "उत्तरी अमेरिका के शीतोष्ण घास के मैदान जहां बड़े पैमाने पर यंत्रीकृत गेहूं की खेती होती है।",
    examFrequency: "Very High",
    options: ["Prairies", "Pampas", "Steppes", "Downs"]
  },

  // =========================================================================
  // 4. CLASS XII INDIA
  // =========================================================================
  {
    id: "mxii-i-1",
    nameEn: "Bailadila Iron Ore Mine (Bastar, Chhattisgarh)",
    nameHi: "बैलाडीला लौह अयस्क खदान (बस्तर, छत्तीसगढ़)",
    category: "CLASS_XII_INDIA",
    subCategory: "Mineral Mines",
    coordinates: [18.6667, 81.2500],
    ncertChapter: "Class 12 - India: People and Economy, Ch 5",
    descriptionEn: "Houses world-famous deposits of very high-grade haematite ore, exported via slurry pipeline to Visakhapatnam port for export to Japan.",
    descriptionHi: "उच्च कोटि का हेमेटाइट अयस्क, पाइपलाइन द्वारा विशाखापत्तनम पत्तन भेजा जाता है।",
    examFrequency: "Guaranteed Board Item",
    options: ["Bailadila", "Mayurbhanj", "Ratnagiri", "Bellary"]
  },
  {
    id: "mxii-i-2",
    nameEn: "Jharia Coalfield (Dhanbad, Jharkhand)",
    nameHi: "झरिया कोयला क्षेत्र (धनबाद, झारखंड)",
    category: "CLASS_XII_INDIA",
    subCategory: "Coalfields",
    coordinates: [23.7400, 86.4100],
    ncertChapter: "Class 12 - India: People and Economy, Ch 5",
    descriptionEn: "Most important storehouse of metallurgical grade coking coal in India, supplying blast furnaces of Bokaro and Jamshedpur.",
    descriptionHi: "भारत का सबसे बड़ा धातुकर्म कोकिंग कोयला भंडार, बोकारो और जमशेदपुर को आपूर्ति।",
    examFrequency: "Guaranteed Board Item",
    options: ["Jharia", "Raniganj", "Bokaro", "Neyveli"]
  },
  {
    id: "mxii-i-3",
    nameEn: "Digboi Oilfield (Tinsukia, Assam)",
    nameHi: "डिगबोई तेल क्षेत्र (तिनसुकिया, असम)",
    category: "CLASS_XII_INDIA",
    subCategory: "Petroleum Oilfields",
    coordinates: [27.3800, 95.6300],
    ncertChapter: "Class 12 - India: People and Economy, Ch 5",
    descriptionEn: "Oldest operating oil field in India and Asia, drilled in 1889 with historic refinery.",
    descriptionHi: "भारत और एशिया का सबसे पुराना तेल क्षेत्र और तेल शोधनागार, 1889 में खोजा गया।",
    examFrequency: "Guaranteed Board Item",
    options: ["Digboi", "Naharkatiya", "Mumbai High", "Ankleshwar"]
  },
  {
    id: "mxii-i-4",
    nameEn: "Kandla (Deendayal) Port (Gulf of Kachchh, Gujarat)",
    nameHi: "कांडला (दीनदयाल) पत्तन (कच्छ की खाड़ी, गुजरात)",
    category: "CLASS_XII_INDIA",
    subCategory: "Major Sea Ports",
    coordinates: [23.0033, 70.2181],
    ncertChapter: "Class 12 - India: People and Economy, Ch 8",
    descriptionEn: "Tidal port built post-partition to serve northwestern agricultural and industrial hinterland, relieving Mumbai port.",
    descriptionHi: "विभाजन के बाद कराची की क्षतिपूर्ति हेतु कच्छ की खाड़ी में निर्मित प्रमुख ज्वारीय पत्तन।",
    examFrequency: "Guaranteed Board Item",
    options: ["Kandla", "Marmagao", "Mumbai", "JNPT"]
  },
  {
    id: "mxii-i-5",
    nameEn: "Visakhapatnam Port (Andhra Pradesh)",
    nameHi: "विशाखापत्तनम पत्तन (आंध्र प्रदेश)",
    category: "CLASS_XII_INDIA",
    subCategory: "Major Sea Ports",
    coordinates: [17.6868, 83.2185],
    ncertChapter: "Class 12 - India: People and Economy, Ch 8",
    descriptionEn: "Deep landlocked natural harbour protected by Dolphin's Nose hill, specialized in Bailadila iron ore exports.",
    descriptionHi: "डॉल्फिन्स नोज़ पहाड़ी से सुरक्षित प्राकृतिक भू-आबद्ध गहरा पत्तन, बैलाडीला लौह अयस्क निर्यात हेतु।",
    examFrequency: "Guaranteed Board Item",
    options: ["Visakhapatnam", "Paradip", "Chennai", "Tuticorin"]
  },
  {
    id: "mxii-i-6",
    nameEn: "Narora Atomic Power Station (Bulandshahr, UP)",
    nameHi: "नरोरा परमाणु ऊर्जा संयंत्र (बुलंदशहर, उ. प्र.)",
    category: "CLASS_XII_INDIA",
    subCategory: "Nuclear Power Stations",
    coordinates: [28.1969, 78.3817],
    ncertChapter: "Class 12 - India: People and Economy, Ch 5",
    descriptionEn: "Nuclear power station in Uttar Pradesh operating two pressurized heavy water reactors (PHWR).",
    descriptionHi: "उत्तर प्रदेश में गंगा नदी किनारे स्थित परमाणु ऊर्जा संयंत्र।",
    examFrequency: "Guaranteed Board Item",
    options: ["Narora", "Rawatbhata", "Tarapur", "Kalpakkam"]
  }
];
