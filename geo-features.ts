export interface RiverFeature {
  id: string;
  name: string;
  hindiName?: string;
  type: "river";
  lengthKm: number;
  origin: string;
  outflow: string;
  basinAreaSqKm: number;
  classGrade: "11";
  ncertChapter: string;
  path: [number, number][]; // [lat, lng] points
  majorTributaries: string[];
  description: string;
  color: string;
}

export interface MountainFeature {
  id: string;
  name: string;
  type: "range" | "peak";
  elevationM: number;
  classGrade: "11";
  ncertChapter: string;
  coordinates: [number, number]; // [lat, lng]
  polyline?: [number, number][]; // for mountain ranges
  geologicalAge: string;
  highestPeak?: string;
  description: string;
  significance: string;
}

export interface SoilFeature {
  id: string;
  name: string;
  hindiName: string;
  type: "soil";
  color: string;
  fillOpacity: number;
  areaPercentage: string;
  polygon: [number, number][]; // boundary polygon
  characteristics: string[];
  cropsGrown: string[];
  distributionStates: string[];
  ncertChapter: string;
  description: string;
}

export interface TectonicFeature {
  id: string;
  name: string;
  type: "plate" | "boundary";
  boundaryType?: "convergent" | "divergent" | "transform";
  coordinates?: [number, number];
  polyline?: [number, number][];
  speedMmPerYear?: number;
  associatedFeatures: string;
  ncertChapter: string;
  description: string;
  color: string;
}

export interface ClimateZoneFeature {
  id: string;
  name: string;
  koppenCode: string;
  color: string;
  polygon: [number, number][];
  avgTempRange: string;
  annualRainfall: string;
  vegetation: string;
  worldRegions: string[];
  description: string;
}

export interface OceanCurrentFeature {
  id: string;
  name: string;
  type: "warm" | "cold";
  ocean: string;
  path: [number, number][];
  influence: string;
  color: string;
}

export interface EconomicMapItem {
  id: string;
  name: string;
  category: "iron_ore" | "coal" | "petroleum" | "port" | "airport";
  state: string;
  coordinates: [number, number];
  significance: string;
  cbseExamFrequency: "High" | "Very High" | "Guaranteed";
}

// -------------------------------------------------------------
// 1. RIVERS OF INDIA (NCERT Class 11 Drainage System)
// -------------------------------------------------------------
export const INDIAN_RIVERS: RiverFeature[] = [
  {
    id: "riv-ganga",
    name: "Ganga River System",
    hindiName: "गंगा नदी",
    type: "river",
    lengthKm: 2525,
    origin: "Gangotri Glacier at Gaumukh (Bhagirathi) + Alaknanda at Devprayag (Uttarakhand)",
    outflow: "Bay of Bengal (Meghna / Sunderbans Delta)",
    basinAreaSqKm: 861452,
    classGrade: "11",
    ncertChapter: "Class 11 - India: Physical Environment, Ch 3",
    color: "#0284c7",
    majorTributaries: ["Yamuna", "Ghaghara", "Gandak", "Kosi", "Son", "Damodar", "Ramganga"],
    description: "Largest river basin in India covering 26.2% of total area. Antecedent and perennial river system fed by Himalayan glaciers and peninsular uplands. Forms the world's largest delta (Sundarbans with Brahmaputra).",
    path: [
      [30.99, 78.94], // Gangotri
      [30.14, 78.60], // Devprayag
      [29.95, 78.16], // Haridwar
      [28.40, 79.40], // Bareilly vic.
      [26.46, 80.34], // Kanpur
      [25.43, 81.84], // Prayagraj (Sangam)
      [25.31, 83.00], // Varanasi
      [25.61, 85.13], // Patna
      [25.25, 87.01], // Bhagalpur
      [24.80, 87.93], // Farakka Barrage
      [23.23, 88.38], // Nadia / Hooghly
      [22.57, 88.36], // Kolkata
      [21.60, 88.10], // Ganga Sagar / Bay of Bengal
    ],
  },
  {
    id: "riv-yamuna",
    name: "Yamuna River",
    hindiName: "यमुना नदी",
    type: "river",
    lengthKm: 1376,
    origin: "Yamunotri Glacier on Banderpunch peak (Garhwal Himalaya)",
    outflow: "Confluence with Ganga at Triveni Sangam, Prayagraj",
    basinAreaSqKm: 366223,
    classGrade: "11",
    ncertChapter: "Class 11 - India: Physical Environment, Ch 3",
    color: "#0369a1",
    majorTributaries: ["Chambal", "Sind", "Betwa", "Ken", "Hindon", "Tons"],
    description: "Longest and westernmost right-bank tributary of the Ganga. Flows parallel to Ganga for over 1,300 km before uniting at Prayagraj.",
    path: [
      [31.01, 78.46], // Yamunotri
      [30.42, 77.62], // Paonta Sahib
      [28.66, 77.23], // Delhi
      [27.49, 77.67], // Mathura
      [27.18, 78.01], // Agra
      [26.76, 79.03], // Etawah (Chambal joins)
      [25.43, 81.84], // Prayagraj (joins Ganga)
    ],
  },
  {
    id: "riv-indus",
    name: "Indus (Sindhu) River System",
    hindiName: "सिंधु नदी",
    type: "river",
    lengthKm: 2880,
    origin: "Bokhar Chu glacier near Lake Manasarovar (Tibet)",
    outflow: "Arabian Sea (south of Karachi)",
    basinAreaSqKm: 1165000,
    classGrade: "11",
    ncertChapter: "Class 11 - India: Physical Environment, Ch 3",
    color: "#0891b2",
    majorTributaries: ["Jhelum", "Chenab", "Ravi", "Beas", "Satluj", "Zaskar", "Shyok", "Gilgit"],
    description: "One of the world's greatest antecedent rivers. Enters India in Ladakh, cuts a 5,200m gorge around Nanga Parbat, and receives the Panjnad (5 Punjab rivers) before draining into the Arabian Sea.",
    path: [
      [31.25, 81.50], // Manasarovar vic.
      [33.15, 78.50], // Demchok
      [34.15, 77.58], // Leh
      [34.90, 76.10], // Skardu vic.
      [35.30, 74.60], // Nanga Parbat Gorge
      [34.01, 72.30], // Attock
      [31.90, 71.00], // Dera Ismail Khan
      [29.35, 70.45], // Panjnad confluence
      [25.40, 68.35], // Hyderabad (Sindh)
      [23.95, 67.45], // Arabian Sea Delta
    ],
  },
  {
    id: "riv-brahmaputra",
    name: "Brahmaputra River System",
    hindiName: "ब्रह्मपुत्र नदी (त्सांगपो)",
    type: "river",
    lengthKm: 2900,
    origin: "Chemayungdung Glacier near Manasarovar Lake (Tibet)",
    outflow: "Bay of Bengal (meets Ganga as Padma / Meghna)",
    basinAreaSqKm: 580000,
    classGrade: "11",
    ncertChapter: "Class 11 - India: Physical Environment, Ch 3",
    color: "#0e7490",
    majorTributaries: ["Subansiri", "Kameng", "Manas", "Sankosh", "Teesta", "Dibang", "Lohit", "Dhansiri"],
    description: "Known as Tsangpo (The Purifier) in Tibet. Takes a sharp hairpin 'Syntaxial Bend' at Namcha Barwa (7,782 m), enters Arunachal Pradesh as Siang/Dihang, and forms Majuli, the world's largest inhabited river island in Assam.",
    path: [
      [30.50, 82.00], // Chemayungdung
      [29.28, 88.88], // Shigatse
      [29.35, 91.10], // Lhasa vic.
      [29.62, 94.95], // Namcha Barwa syntaxial bend
      [28.10, 95.30], // Pasighat (Arunachal)
      [27.47, 94.91], // Dibrugarh
      [26.95, 94.20], // Majuli Island
      [26.18, 91.75], // Guwahati
      [25.75, 89.90], // Dhubri (enters Bangladesh as Jamuna)
      [23.25, 90.65], // Chandpur confluence (Meghna)
      [22.20, 91.20], // Bay of Bengal Delta
    ],
  },
  {
    id: "riv-godavari",
    name: "Godavari River (Dakshin Ganga)",
    hindiName: "गोदावरी नदी (दक्षिण गंगा)",
    type: "river",
    lengthKm: 1465,
    origin: "Trimbakeshwar near Nashik in Western Ghats (Maharashtra)",
    outflow: "Bay of Bengal (at Yanam / Rajahmundry)",
    basinAreaSqKm: 312812,
    classGrade: "11",
    ncertChapter: "Class 11 - India: Physical Environment, Ch 3",
    color: "#2563eb",
    majorTributaries: ["Pravara", "Purna", "Penganga", "Wardha", "Wainganga", "Pranhita", "Indravati", "Sabari"],
    description: "Largest peninsular river in India, hence nicknamed 'Dakshin Ganga' or 'Vridha Ganga'. Covers Maharashtra, Telangana, Andhra Pradesh, Chhattisgarh, and Odisha.",
    path: [
      [19.93, 73.53], // Trimbakeshwar
      [19.87, 75.34], // Aurangabad/Paithan
      [19.00, 77.00], // Nanded
      [18.90, 78.50], // Nizamabad
      [18.75, 79.80], // Pranhita confluence
      [17.90, 81.30], // Bhadrachalam
      [17.00, 81.78], // Rajahmundry
      [16.45, 82.00], // Delta into Bay of Bengal
    ],
  },
  {
    id: "riv-narmada",
    name: "Narmada River",
    hindiName: "नर्मदा नदी",
    type: "river",
    lengthKm: 1312,
    origin: "Amarkantak Plateau (Madhya Pradesh)",
    outflow: "Arabian Sea (Gulf of Khambhat)",
    basinAreaSqKm: 98796,
    classGrade: "11",
    ncertChapter: "Class 11 - India: Physical Environment, Ch 3",
    color: "#4f46e5",
    majorTributaries: ["Hiran", "Orsang", "Barna", "Kolar", "Tawa", "Sher"],
    description: "Largest west-flowing peninsular river. Flows through a structural rift valley between the Vindhya Range (north) and Satpura Range (south). Cascades down Dhuandhar Falls at the Marble Rocks in Jabalpur and forms a wide estuary (no delta).",
    path: [
      [22.67, 81.75], // Amarkantak
      [23.18, 79.98], // Jabalpur (Dhuandhar Falls / Marble Rocks)
      [22.75, 77.75], // Hoshangabad (Narmadapuram)
      [22.25, 76.25], // Omkareshwar
      [21.83, 73.74], // Sardar Sarovar Dam (Kevadia)
      [21.70, 72.99], // Bharuch
      [21.60, 72.60], // Gulf of Khambhat / Arabian Sea
    ],
  },
  {
    id: "riv-krishna",
    name: "Krishna River",
    hindiName: "कृष्णा नदी",
    type: "river",
    lengthKm: 1401,
    origin: "Mahabaleshwar in Sahyadri / Western Ghats (Maharashtra)",
    outflow: "Bay of Bengal (Hamsaladeevi, Andhra Pradesh)",
    basinAreaSqKm: 258948,
    classGrade: "11",
    ncertChapter: "Class 11 - India: Physical Environment, Ch 3",
    color: "#3b82f6",
    majorTributaries: ["Koyna", "Tungabhadra", "Ghataprabha", "Malaprabha", "Bhima", "Musi"],
    description: "Second largest east-flowing peninsular river. Major multi-purpose projects include Nagarjuna Sagar and Srisailam Dams.",
    path: [
      [17.92, 73.66], // Mahabaleshwar
      [16.85, 74.58], // Sangli
      [16.20, 76.00], // Almatti vic.
      [16.15, 77.35], // Raichur / Tungabhadra confluence
      [16.07, 78.86], // Srisailam Dam
      [16.57, 79.31], // Nagarjuna Sagar
      [16.51, 80.64], // Vijayawada
      [15.78, 80.95], // Bay of Bengal Delta
    ],
  },
  {
    id: "riv-kaveri",
    name: "Kaveri (Cauvery) River",
    hindiName: "कावेरी नदी",
    type: "river",
    lengthKm: 800,
    origin: "Talakaveri in Brahmagiri Range, Western Ghats (Karnataka)",
    outflow: "Bay of Bengal (Poompuhar, Tamil Nadu)",
    basinAreaSqKm: 81155,
    classGrade: "11",
    ncertChapter: "Class 11 - India: Physical Environment, Ch 3",
    color: "#6366f1",
    majorTributaries: ["Harangi", "Hemavati", "Shimsha", "Arkavathy", "Kabini", "Bhavani", "Amaravati"],
    description: "Flows with less fluctuation in water volume compared to other peninsular rivers because its upper catchment gets rain from the Southwest Monsoon and lower catchment from the Northeast Monsoon. Forms Sivasamudram Falls and the rich 'Granary of South India' delta.",
    path: [
      [12.38, 75.49], // Talakaveri
      [12.42, 76.57], // Krishna Raja Sagara (KRS)
      [12.30, 76.65], // Mysuru / Srirangapatna
      [12.29, 77.16], // Sivasamudram Falls
      [11.80, 77.80], // Mettur Dam
      [11.35, 77.72], // Erode
      [10.82, 78.68], // Tiruchirappalli (Trichy)
      [10.78, 79.13], // Thanjavur Delta
      [11.14, 79.85], // Poompuhar / Bay of Bengal
    ],
  },
];

// -------------------------------------------------------------
// 2. MOUNTAINS, RANGES & PEAKS (NCERT Class 11 Physiography)
// -------------------------------------------------------------
export const INDIAN_MOUNTAINS: MountainFeature[] = [
  {
    id: "mt-k2",
    name: "Mt. K2 (Godwin Austen)",
    type: "peak",
    elevationM: 8611,
    classGrade: "11",
    ncertChapter: "Class 11 - India: Physical Environment, Ch 2",
    coordinates: [35.8808, 76.5133],
    geologicalAge: "Tertiary Alpine Orogeny",
    highestPeak: "8,611m (Second highest in the world)",
    description: "Located in the Karakoram Range. Highest peak in the Indian subcontinent (administered in Gilgit-Baltistan). Extremely steep pyramid of rock and ice.",
    significance: "Karakoram pass and Siachen Glacier region are geostrategically vital.",
  },
  {
    id: "mt-kanchenjunga",
    name: "Kanchenjunga",
    type: "peak",
    elevationM: 8586,
    classGrade: "11",
    ncertChapter: "Class 11 - India: Physical Environment, Ch 2",
    coordinates: [27.7025, 88.1475],
    geologicalAge: "Tertiary Alpine Orogeny",
    highestPeak: "8,586m (Highest peak within undisputed India)",
    description: "Third highest peak in the world, situated on the border of Sikkim (India) and Nepal. Features five mountain peaks symbolizing the 'Five Treasures of Snow'.",
    significance: "Crucial question in CBSE map work: located on Sikkim-Nepal border.",
  },
  {
    id: "mt-nanda-devi",
    name: "Nanda Devi",
    type: "peak",
    elevationM: 7816,
    classGrade: "11",
    ncertChapter: "Class 11 - India: Physical Environment, Ch 2",
    coordinates: [30.3758, 79.9708],
    geologicalAge: "Tertiary Alpine Orogeny",
    highestPeak: "7,816m (Second highest wholly within India)",
    description: "Located in Chamoli district of Uttarakhand. Part of the Greater Himalayas (Himadri) enclosed by a ring of peaks forming Nanda Devi Sanctuary.",
    significance: "UNESCO Biosphere Reserve, source of Rishi Ganga tributary.",
  },
  {
    id: "mt-guru-shikhar",
    name: "Guru Shikhar (Aravalli Range)",
    type: "peak",
    elevationM: 1722,
    classGrade: "11",
    ncertChapter: "Class 11 - India: Physical Environment, Ch 2",
    coordinates: [24.6500, 72.7800],
    geologicalAge: "Pre-Cambrian (Oldest fold mountain in India)",
    highestPeak: "1,722m on Mount Abu",
    description: "Highest point of the relict Aravalli Range. Runs 800 km from Delhi to Palanpur (Gujarat), acting as a barrier preventing eastward march of the Thar Desert.",
    significance: "Acts as a major climate divide: blocks the SW Monsoon Arabian branch causing low rainfall in western Rajasthan.",
  },
  {
    id: "mt-anamudi",
    name: "Anamudi Peak (Western Ghats)",
    type: "peak",
    elevationM: 2695,
    classGrade: "11",
    ncertChapter: "Class 11 - India: Physical Environment, Ch 2",
    coordinates: [10.1699, 77.0641],
    geologicalAge: "Precambrian Crystalline Shield (Deccan Horsts)",
    highestPeak: "2,695m (Highest peak in Peninsular India)",
    description: "Known as the 'Everest of South India', located in Eravikulam National Park, Idukki, Kerala. Junction of Anaimalai, Palani, and Cardamom hills.",
    significance: "Prominent question in CBSE 11 & 12 Board Exam Map Questions.",
  },
  {
    id: "mt-doda-betta",
    name: "Doda Betta (Nilgiri Hills)",
    type: "peak",
    elevationM: 2637,
    classGrade: "11",
    ncertChapter: "Class 11 - India: Physical Environment, Ch 2",
    coordinates: [11.4000, 76.7333],
    geologicalAge: "Precambrian Charnockite",
    highestPeak: "2,637m",
    description: "Second highest peak in South India, situated in the Nilgiris where Western Ghats and Eastern Ghats meet.",
    significance: "Nilgiri Biosphere Reserve node, key tourist and tea plantation region.",
  },
  {
    id: "mt-dhupgarh",
    name: "Dhupgarh (Satpura Range)",
    type: "peak",
    elevationM: 1350,
    classGrade: "11",
    ncertChapter: "Class 11 - India: Physical Environment, Ch 2",
    coordinates: [22.4500, 78.3667],
    geologicalAge: "Precambrian to Gondwana Block Mountain",
    highestPeak: "1,350m at Pachmarhi, MP",
    description: "Highest peak of the Satpura Range and Madhya Pradesh, located in Pachmarhi Biosphere Reserve.",
    significance: "Water divide between Narmada (north) and Tapi/Godavari (south).",
  },
  {
    id: "mt-mahendragiri",
    name: "Mahendragiri (Eastern Ghats)",
    type: "peak",
    elevationM: 1501,
    classGrade: "11",
    ncertChapter: "Class 11 - India: Physical Environment, Ch 2",
    coordinates: [18.9667, 84.3667],
    geologicalAge: "Precambrian Eastern Ghats Mobile Belt",
    highestPeak: "1,501m (Gajapati district, Odisha)",
    description: "Historic peak in Eastern Ghats mentioned in Ramayana. Discontinuous and deeply dissected by peninsular rivers.",
    significance: "CBSE map landmark for Eastern Ghats relief.",
  },

  // Mountain Ranges (Polylines)
  {
    id: "rng-himalayas-himadri",
    name: "Greater Himalayas (Himadri)",
    type: "range",
    elevationM: 6100,
    classGrade: "11",
    ncertChapter: "Class 11 - India: Physical Environment, Ch 2",
    coordinates: [30.50, 79.50],
    polyline: [
      [35.50, 74.80], // Nanga Parbat
      [34.30, 76.50], // Zoji La
      [31.80, 78.40], // Shipki La
      [30.40, 79.80], // Nanda Devi
      [28.60, 83.80], // Annapurna
      [27.98, 86.92], // Mt Everest
      [27.70, 88.15], // Kanchenjunga
      [27.60, 92.50], // Bhutan / Tawang
      [29.60, 95.00], // Namcha Barwa
    ],
    geologicalAge: "Young Fold Mountains (Tertiary)",
    highestPeak: "Mt Everest (8,848.86 m) & Kanchenjunga (8,586 m)",
    description: "Most continuous range of Himalayas, composed of granitic core. Average elevation over 6,000 m with perennial snow and source of perennial rivers.",
    significance: "Acts as a climatic barrier keeping dry Central Asian polar winds out and trapping Indian monsoons.",
  },
  {
    id: "rng-western-ghats",
    name: "Western Ghats (Sahyadris)",
    type: "range",
    elevationM: 1200,
    classGrade: "11",
    ncertChapter: "Class 11 - India: Physical Environment, Ch 2",
    coordinates: [14.00, 75.00],
    polyline: [
      [21.10, 73.80], // Tapi mouth / Dang
      [19.90, 73.50], // Kalsubai / Nashik
      [18.50, 73.40], // Khandala / Lonavala
      [15.50, 74.20], // Goa border
      [13.50, 75.20], // Kudremukh
      [11.50, 76.50], // Nilgiris
      [10.20, 77.10], // Anaimalai / Anamudi
      [8.50, 77.20],  // Agasthyamalai / Kanyakumari
    ],
    geologicalAge: "Fault-scarp of Peninsular Plateau (Precambrian / Deccan Trap)",
    highestPeak: "Anamudi (2,695m)",
    description: "Continuous mountain wall running 1,600 km parallel to western coast. Traversable only via passes: Thalghat, Bhorghat, and Palghat Gap. Global biodiversity hotspot.",
    significance: "Causes heavy orographic precipitation (250-400 cm) on its western windward slope and rain shadow on the Deccan.",
  },
  {
    id: "rng-aravalli",
    name: "Aravalli Range",
    type: "range",
    elevationM: 800,
    classGrade: "11",
    ncertChapter: "Class 11 - India: Physical Environment, Ch 2",
    coordinates: [26.00, 74.00],
    polyline: [
      [28.50, 77.15], // Delhi Ridge
      [27.80, 76.50], // Alwar
      [26.45, 74.63], // Ajmer
      [25.00, 73.50], // Kumbhalgarh
      [24.60, 72.75], // Mount Abu (Guru Shikhar)
      [23.80, 72.30], // Palanpur (Gujarat)
    ],
    geologicalAge: "Precambrian (Ancient Relict Fold Mountains)",
    highestPeak: "Guru Shikhar (1,722m)",
    description: "One of the oldest fold mountain systems in the world, now eroded into relict hills. Extends NE to SW for about 800 km.",
    significance: "CBSE Syllabus landmark: aligned parallel to the SW monsoon winds, yielding virtually no orographic lift for Rajasthan.",
  },
  {
    id: "rng-vindhya",
    name: "Vindhya & Satpura Ranges",
    type: "range",
    elevationM: 700,
    classGrade: "11",
    ncertChapter: "Class 11 - India: Physical Environment, Ch 2",
    coordinates: [23.00, 78.00],
    polyline: [
      [22.80, 74.50], // Jobat (Gujarat border)
      [22.90, 77.00], // Bhopal vic.
      [23.50, 80.00], // Katni
      [24.50, 82.50], // Kaimur Range
      [24.80, 84.00], // Rohtas (Bihar)
    ],
    geologicalAge: "Precambrian Escarpment",
    highestPeak: "Sadbhawna Shikhar (752m)",
    description: "Traditional boundary between North and South India. Forms the northern rim of the Narmada Rift Valley.",
    significance: "Separates the Indo-Gangetic Plains from the Deccan Plateau.",
  },
];

// -------------------------------------------------------------
// 3. SOIL TYPES OF INDIA (ICAR CLASSIFICATION - NCERT Ch 6)
// -------------------------------------------------------------
export const INDIAN_SOILS: SoilFeature[] = [
  {
    id: "soil-alluvial",
    name: "Alluvial Soil (Khadar & Bhangar)",
    hindiName: "जलोढ़ मिट्टी",
    type: "soil",
    color: "#eab308",
    fillOpacity: 0.35,
    areaPercentage: "40.0% of India's Total Area",
    polygon: [
      [31.5, 74.5], [30.5, 77.0], [28.5, 78.5], [26.5, 81.0],
      [25.5, 85.5], [26.0, 90.0], [27.0, 94.0], [26.0, 93.5],
      [24.5, 88.5], [22.0, 88.0], [20.5, 86.5], [17.0, 82.5],
      [15.5, 80.5], [11.0, 79.8], [11.0, 79.4], [16.0, 80.0],
      [20.0, 85.0], [22.5, 87.0], [24.0, 85.0], [25.0, 80.0],
      [27.0, 76.5], [29.5, 74.0], [31.5, 74.5]
    ],
    characteristics: [
      "Transported / Azonal soil brought down by Himalayan and Peninsular rivers",
      "Rich in Potash and Lime, deficient in Nitrogen and Phosphorus",
      "Bhangar (Older alluvium, contains Kankar calcareous nodules)",
      "Khadar (Newer alluvium, fine-grained, highly fertile, annually replenished by floods)"
    ],
    cropsGrown: ["Rice", "Wheat", "Sugarcane", "Jute", "Cotton", "Oilseeds", "Pulses"],
    distributionStates: ["Punjab", "Haryana", "Uttar Pradesh", "Bihar", "West Bengal", "Assam", "Coastal deltas of AP and Odisha"],
    ncertChapter: "Class 11 - India: Physical Environment, Ch 6",
    description: "Most widespread and productive soil group in India supporting dense population centers in the Great Northern Plains.",
  },
  {
    id: "soil-black",
    name: "Black Soil (Regur / Cotton Soil)",
    hindiName: "काली / रेगुर मिट्टी",
    type: "soil",
    color: "#334155",
    fillOpacity: 0.45,
    areaPercentage: "16.6% of India's Total Area",
    polygon: [
      [24.5, 73.5], [24.0, 77.0], [22.5, 79.5], [20.5, 80.0],
      [18.0, 78.5], [15.5, 76.5], [15.0, 74.5], [17.5, 73.5],
      [20.5, 72.8], [22.5, 71.5], [23.5, 72.0], [24.5, 73.5]
    ],
    characteristics: [
      "Formed by weathering of basaltic Deccan lava during Cretaceous volcanic era",
      "Extremely clayey and fine-textured with high moisture-retention capacity",
      "Develops deep, wide cracks during dry season leading to 'self-ploughing' effect",
      "Rich in Iron, Lime, Calcium, Magnesium carbonates, and Alumina; low in Phosphorus & Nitrogen"
    ],
    cropsGrown: ["Cotton", "Soybean", "Sorghum (Jowar)", "Wheat", "Sugarcane", "Citrus fruits"],
    distributionStates: ["Maharashtra (entire Deccan plateau)", "Gujarat (Saurashtra)", "Madhya Pradesh (Malwa plateau)", "Northern Karnataka", "Telangana"],
    ncertChapter: "Class 11 - India: Physical Environment, Ch 6",
    description: "World-famous as Black Cotton Soil. Sticky when wet and difficult to work unless tilled immediately after first monsoon shower.",
  },
  {
    id: "soil-red",
    name: "Red and Yellow Soil",
    hindiName: "लाल और पीली मिट्टी",
    type: "soil",
    color: "#ef4444",
    fillOpacity: 0.35,
    areaPercentage: "18.5% of India's Total Area",
    polygon: [
      [24.5, 83.0], [23.0, 86.5], [20.5, 85.0], [18.0, 83.0],
      [14.5, 79.5], [11.5, 78.0], [9.0, 77.5], [9.5, 78.5],
      [13.0, 80.0], [17.0, 81.5], [21.5, 84.0], [24.0, 84.5],
      [24.5, 83.0]
    ],
    characteristics: [
      "Developed on crystalline igneous rocks (granite and gneiss) under low rainfall",
      "Red color due to wide diffusion of iron oxide in crystalline and metamorphic rocks",
      "Looks yellow when it occurs in a hydrated form",
      "Generally poor in nitrogen, phosphorus, and humus; responds well to fertilizers and irrigation"
    ],
    cropsGrown: ["Millets (Ragi, Bajra)", "Groundnut", "Tobacco", "Pulses", "Rice (in lowlands)"],
    distributionStates: ["Odisha", "Chhattisgarh", "Chota Nagpur Plateau (Jharkhand)", "Tamil Nadu", "Southern Karnataka"],
    ncertChapter: "Class 11 - India: Physical Environment, Ch 6",
    description: "Coarse-grained in uplands and fine-grained in plains. Well-drained soil ideal for dry farming and millets.",
  },
  {
    id: "soil-laterite",
    name: "Laterite Soil",
    hindiName: "लेटराइट मिट्टी",
    type: "soil",
    color: "#b91c1c",
    fillOpacity: 0.45,
    areaPercentage: "4.3% of India's Total Area",
    polygon: [
      [18.5, 73.2], [16.0, 73.8], [13.0, 74.8], [10.0, 76.2],
      [9.0, 77.0], [10.5, 77.2], [13.5, 75.8], [16.5, 74.4],
      [18.5, 73.2]
    ],
    characteristics: [
      "Derived from Latin word 'Later' meaning brick; hardens like rock upon drying",
      "Result of intense leaching due to heavy tropical rainfall and high temperature",
      "Silica and lime are leached away leaving behind oxides of iron and aluminium compounds",
      "Highly acidic (low pH) and deficient in humus, nitrogen, and phosphate"
    ],
    cropsGrown: ["Cashew nut", "Tea", "Coffee", "Rubber", "Tapioca", "Cinchona"],
    distributionStates: ["Western Ghats crest in Kerala & Karnataka", "Meghalaya Plateau", "Hills of Assam and Odisha"],
    ncertChapter: "Class 11 - India: Physical Environment, Ch 6",
    description: "Valuable building material as cut bricks. Crucial for plantation agriculture in the humid tropics.",
  },
  {
    id: "soil-arid",
    name: "Arid and Desert Soil",
    hindiName: "मरुस्थलीय / शुष्क मिट्टी",
    type: "soil",
    color: "#f59e0b",
    fillOpacity: 0.4,
    areaPercentage: "4.4% of India's Total Area",
    polygon: [
      [28.5, 70.0], [29.5, 73.5], [28.0, 75.0], [25.5, 73.0],
      [24.0, 71.0], [24.5, 69.5], [26.5, 69.5], [28.5, 70.0]
    ],
    characteristics: [
      "Sandy texture and saline nature due to dry climate, high evaporation, and low rainfall (<25 cm)",
      "Deficient in moisture and humus with normal to high phosphate content",
      "Lower horizons contain 'Kankar' layers restricting water infiltration",
      "Becomes highly productive with irrigation (e.g. Indira Gandhi Canal area)"
    ],
    cropsGrown: ["Bajra", "Guar", "Mustard", "Barley", "Jowar", "Cotton (with canal irrigation)"],
    distributionStates: ["Western Rajasthan", "Northern Gujarat (Kachchh)", "Southern Punjab & Haryana fringe"],
    ncertChapter: "Class 11 - India: Physical Environment, Ch 6",
    description: "Requires careful soil and water management. Successfully transformed by Rajasthan Canal (Indira Gandhi Nahar).",
  },
];

// -------------------------------------------------------------
// 4. GLOBAL TECTONIC PLATES & BOUNDARIES (NCERT Ch 4)
// -------------------------------------------------------------
export const TECTONIC_PLATES: TectonicFeature[] = [
  {
    id: "plate-pacific",
    name: "Pacific Plate",
    type: "plate",
    associatedFeatures: "Mariana Trench (11,034m), Hawaiian Hotspot, Pacific Ring of Fire",
    speedMmPerYear: 80,
    ncertChapter: "Class 11 - Fundamentals of Physical Geography, Ch 4",
    description: "Largest tectonic plate on Earth, entirely oceanic. Subducts beneath surrounding plates forming the volcanic Ring of Fire and deepest oceanic trenches.",
    color: "#ef4444",
  },
  {
    id: "plate-indo-australian",
    name: "Indo-Australian Plate",
    type: "plate",
    associatedFeatures: "Himalayan Collision Zone, Java Trench, Ninety East Ridge",
    speedMmPerYear: 50,
    ncertChapter: "Class 11 - Fundamentals of Physical Geography, Ch 4",
    description: "Broke away from Gondwanaland ~140 million years ago and drifted northwards. Collided with the Eurasian Plate ~50 million years ago, folding the Tethys geosyncline into the Himalayas.",
    color: "#3b82f6",
  },
  {
    id: "plate-eurasian",
    name: "Eurasian Plate",
    type: "plate",
    associatedFeatures: "Tibetan Plateau, Alps, Caucasus, Verkhoyansk Range",
    speedMmPerYear: 25,
    ncertChapter: "Class 11 - Fundamentals of Physical Geography, Ch 4",
    description: "Massive continental plate covering Europe and most of Asia. Underthrust by the northward-moving Indian plate.",
    color: "#10b981",
  },
  {
    id: "bnd-mid-atlantic",
    name: "Mid-Atlantic Ridge",
    type: "boundary",
    boundaryType: "divergent",
    color: "#ec4899",
    associatedFeatures: "Iceland volcanic rift, hydrothermal vents, magnetic striping",
    speedMmPerYear: 25,
    ncertChapter: "Class 11 - Fundamentals of Physical Geography, Ch 4",
    polyline: [
      [70.0, -18.0], [64.0, -20.0], [50.0, -30.0], [35.0, -40.0],
      [20.0, -45.0], [0.0, -25.0], [-15.0, -15.0], [-35.0, -15.0],
      [-50.0, -20.0]
    ],
    description: "Continuous submarine mountain chain extending ~16,000 km along the floor of the Atlantic Ocean. Plates pull apart as fresh basalt magma wells up from the asthenosphere creating new ocean floor (Sea Floor Spreading).",
  },
  {
    id: "bnd-himalayan-collision",
    name: "Himalayan Orogenic Belt (Continent-Continent Collision)",
    type: "boundary",
    boundaryType: "convergent",
    color: "#f97316",
    associatedFeatures: "Indus-Tsangpo Suture Zone, Main Central Thrust (MCT), Main Boundary Thrust (MBT)",
    speedMmPerYear: 45,
    ncertChapter: "Class 11 - Fundamentals of Physical Geography, Ch 4",
    polyline: [
      [36.0, 72.0], [34.5, 76.0], [31.0, 80.0], [28.5, 84.0],
      [27.5, 89.0], [29.5, 95.0], [26.0, 96.0], [20.0, 93.5]
    ],
    description: "Classic continent-continent convergent boundary. Because both plates are buoyant continental crust, neither can subduct deeply; crust buckles and thickens up to 70 km under the Tibetan Plateau.",
  },
  {
    id: "bnd-san-andreas",
    name: "San Andreas Fault Zone",
    type: "boundary",
    boundaryType: "transform",
    color: "#a855f7",
    associatedFeatures: "Strike-slip faulting, frequent shallow earthquakes in California",
    speedMmPerYear: 35,
    ncertChapter: "Class 11 - Fundamentals of Physical Geography, Ch 4",
    polyline: [
      [40.0, -124.5], [38.0, -122.5], [35.5, -119.8], [33.5, -116.0],
      [31.8, -114.5]
    ],
    description: "Transform plate boundary where Pacific Plate slides northwest relative to the North American Plate. Textbook example of strike-slip shearing with no creation or destruction of lithosphere.",
  },
  {
    id: "bnd-ring-of-fire",
    name: "Circum-Pacific Ring of Fire",
    type: "boundary",
    boundaryType: "convergent",
    color: "#ef4444",
    associatedFeatures: "75% of world's active volcanoes, 90% of all earthquakes, Mariana Trench, Krakatoa, Mt Fuji",
    speedMmPerYear: 85,
    ncertChapter: "Class 11 - Fundamentals of Physical Geography, Ch 4",
    polyline: [
      [-40.0, 175.0], [-15.0, 168.0], [0.0, 140.0], [15.0, 145.0],
      [35.0, 140.0], [52.0, 160.0], [58.0, -165.0], [60.0, -145.0],
      [45.0, -125.0], [20.0, -105.0], [0.0, -80.0], [-25.0, -70.0],
      [-55.0, -70.0]
    ],
    description: "Horseshoe-shaped 40,000 km basin of convergent subduction zones with high volcanic and seismic activity.",
  },
];

// -------------------------------------------------------------
// 5. GLOBAL CLIMATE ZONES & KÖPPEN SYSTEM (NCERT Ch 11)
// -------------------------------------------------------------
export const CLIMATE_ZONES: ClimateZoneFeature[] = [
  {
    id: "clim-af",
    name: "Equatorial Rainforest Climate",
    koppenCode: "Af (Tropical Wet)",
    color: "#15803d",
    avgTempRange: "25°C - 27°C (low annual range < 3°C)",
    annualRainfall: "2000 - 3500 mm (convectional rain daily around 4 PM)",
    vegetation: "Dense multi-layered broadleaf evergreen rainforest with epiphytes and lianas",
    worldRegions: ["Amazon Basin", "Congo Basin", "Indonesian Archipelago", "Western Ghats coastal plain"],
    description: "Perpetual summer with high humidity, uniform temperatures, and no dry season under the equatorial low pressure belt.",
    polygon: [
      [8.0, -80.0], [8.0, -50.0], [-5.0, -45.0], [-10.0, -70.0], [0.0, -80.0], [8.0, -80.0]
    ],
  },
  {
    id: "clim-am",
    name: "Tropical Monsoon Climate",
    koppenCode: "Am / Aw (Monsoon & Savanna)",
    color: "#22c55e",
    avgTempRange: "18°C - 32°C (distinct hot, wet and cool seasons)",
    annualRainfall: "1000 - 2500 mm (concentrated in summer SW Monsoon)",
    vegetation: "Tropical moist and dry deciduous forests (Sal, Teak, Sandalwood) shedding leaves in dry winter",
    worldRegions: ["Indian Subcontinent", "Southeast Asia", "Northern Australia"],
    description: "Dominated by seasonal reversal of planetary winds driven by differential thermal heating between Asian landmass and Indian Ocean.",
    polygon: [
      [28.0, 70.0], [28.0, 88.0], [22.0, 92.0], [10.0, 80.0], [8.0, 77.0], [18.0, 72.0], [28.0, 70.0]
    ],
  },
  {
    id: "clim-bwh",
    name: "Subtropical Hot Desert Climate",
    koppenCode: "BWh (Arid Hot Desert)",
    color: "#f59e0b",
    avgTempRange: "30°C - 45°C summer, diurnal range up to 20°C",
    annualRainfall: "< 250 mm (erratic, scarce, high potential evapotranspiration)",
    vegetation: "Xerophytic scrub, acacias, cacti with deep roots and waxy leaves",
    worldRegions: ["Sahara Desert", "Arabian Peninsula", "Thar Desert (India/Pak)", "Atacama", "Great Australian Desert"],
    description: "Located under the Subtropical High Pressure Belts (Horse Latitudes) on the western margins of continents where descending air warms adiabatically.",
    polygon: [
      [32.0, -15.0], [32.0, 35.0], [18.0, 38.0], [18.0, -15.0], [32.0, -15.0]
    ],
  },
  {
    id: "clim-cs",
    name: "Mediterranean Climate",
    koppenCode: "Cs (Dry-summer Subtropical)",
    color: "#eab308",
    avgTempRange: "10°C in winter to 24°C in summer",
    annualRainfall: "400 - 900 mm (concentrated exclusively in mild winter)",
    vegetation: "Sclerophyllous scrub (Maquis/Chaparral), olive, cork oak, citrus fruits (oranges, lemons, grapes)",
    worldRegions: ["Mediterranean Basin", "Central California", "Central Chile", "Cape Town (South Africa)", "SW Australia"],
    description: "Famous for winter rain from westerly depressions and hot dry sunny summers. World center for viticulture and citrus orchards.",
    polygon: [
      [44.0, -8.0], [44.0, 36.0], [33.0, 36.0], [33.0, -8.0], [44.0, -8.0]
    ],
  },
  {
    id: "clim-dfc",
    name: "Taiga / Boreal Coniferous Forest",
    koppenCode: "Dfc / Dfd (Cold Continental)",
    color: "#0284c7",
    avgTempRange: "-30°C in winter to 15°C in brief summer",
    annualRainfall: "350 - 600 mm (mostly summer rain and winter snow)",
    vegetation: "Continuous belt of evergreen needleleaf softwoods (Pine, Spruce, Fir, Larch)",
    worldRegions: ["Siberia (Russia)", "Canada", "Scandinavia"],
    description: "World's largest terrestrial biome. Prime source of commercial softwood lumber, pulp, and paper industries.",
    polygon: [
      [68.0, 30.0], [68.0, 160.0], [55.0, 150.0], [55.0, 30.0], [68.0, 30.0]
    ],
  },
];

// -------------------------------------------------------------
// 6. OCEAN CURRENTS (NCERT Class 11 Ch 13)
// -------------------------------------------------------------
export const OCEAN_CURRENTS: OceanCurrentFeature[] = [
  {
    id: "cur-gulf-stream",
    name: "Gulf Stream (Warm Current)",
    type: "warm",
    ocean: "North Atlantic Ocean",
    color: "#ef4444",
    influence: "Warms Western Europe by up to 5-10°C; keeps ports like Murmansk ice-free year-round.",
    path: [
      [25.0, -80.0], [32.0, -75.0], [38.0, -65.0], [43.0, -50.0], [50.0, -35.0], [55.0, -15.0]
    ],
  },
  {
    id: "cur-labrador",
    name: "Labrador Current (Cold Current)",
    type: "cold",
    ocean: "North Atlantic Ocean",
    color: "#3b82f6",
    influence: "Meets Gulf Stream at Grand Banks, Newfoundland, generating dense fog and richest cod fisheries.",
    path: [
      [65.0, -60.0], [58.0, -55.0], [50.0, -52.0], [44.0, -50.0]
    ],
  },
  {
    id: "cur-kuroshio",
    name: "Kuroshio (Japan Current - Warm)",
    type: "warm",
    ocean: "North Pacific Ocean",
    color: "#ef4444",
    influence: "Warms the Pacific coast of Japan; meets cold Oyashio Current creating fishing grounds.",
    path: [
      [15.0, 125.0], [25.0, 128.0], [33.0, 136.0], [38.0, 145.0], [42.0, 155.0]
    ],
  },
  {
    id: "cur-benguela",
    name: "Benguela Current (Cold Current)",
    type: "cold",
    ocean: "South Atlantic Ocean",
    color: "#3b82f6",
    influence: "Flows along southwest Africa, producing desiccation responsible for Namib Desert.",
    path: [
      [-35.0, 18.0], [-28.0, 13.0], [-20.0, 10.0], [-12.0, 8.0]
    ],
  },
  {
    id: "cur-peru",
    name: "Peru / Humboldt Current (Cold Current)",
    type: "cold",
    ocean: "South Pacific Ocean",
    color: "#3b82f6",
    influence: "Causes hyper-arid Atacama desert; suppression during El Niño disrupts global climate and anchovy fisheries.",
    path: [
      [-40.0, -75.0], [-30.0, -73.0], [-20.0, -72.0], [-10.0, -78.0], [-4.0, -82.0]
    ],
  },
];

// -------------------------------------------------------------
// 7. CBSE CLASS 12 BOARD EXAM MAP ITEMS (Mines, Ports, Air)
// -------------------------------------------------------------
export const CBSE_MAP_ITEMS: EconomicMapItem[] = [
  // Iron Ore Mines
  {
    id: "mine-bailadila",
    name: "Bailadila Iron Ore Mine",
    category: "iron_ore",
    state: "Chhattisgarh (Bastar district)",
    coordinates: [18.6667, 81.2500],
    significance: "Very high-grade haematite ore. Exported via Vizag port to Japan and South Korea.",
    cbseExamFrequency: "Guaranteed",
  },
  {
    id: "mine-mayurbhanj",
    name: "Mayurbhanj (Gurumahisani / Badampahar)",
    category: "iron_ore",
    state: "Odisha",
    coordinates: [22.2500, 86.2500],
    significance: "Supplies high-grade iron ore to Tata Steel plant at Jamshedpur.",
    cbseExamFrequency: "Very High",
  },
  {
    id: "mine-bellary",
    name: "Ballari - Chitradurga Iron Ore Belt",
    category: "iron_ore",
    state: "Karnataka",
    coordinates: [15.1394, 76.9214],
    significance: "Houses world's largest deposits of magnetite and haematite ore.",
    cbseExamFrequency: "High",
  },
  {
    id: "mine-ratnagiri",
    name: "Ratnagiri Iron Ore Deposits",
    category: "iron_ore",
    state: "Maharashtra",
    coordinates: [16.9902, 73.3120],
    significance: "Exported through Marmagao and Redi ports.",
    cbseExamFrequency: "High",
  },

  // Coalfields
  {
    id: "coal-jharia",
    name: "Jharia Coalfield",
    category: "coal",
    state: "Jharkhand (Dhanbad)",
    coordinates: [23.7400, 86.4100],
    significance: "Exclusive source of prime coking coal for blast furnaces in India.",
    cbseExamFrequency: "Guaranteed",
  },
  {
    id: "coal-raniganj",
    name: "Raniganj Coalfield",
    category: "coal",
    state: "West Bengal",
    coordinates: [23.6200, 87.1300],
    significance: "Oldest commercial coal mining site in India (started 1774).",
    cbseExamFrequency: "Very High",
  },
  {
    id: "coal-neyveli",
    name: "Neyveli Lignite Mine",
    category: "coal",
    state: "Tamil Nadu (Cuddalore)",
    coordinates: [11.5300, 79.4800],
    significance: "Largest deposit of brown coal (lignite) used for thermal power in South India.",
    cbseExamFrequency: "Guaranteed",
  },

  // Petroleum Oilfields
  {
    id: "oil-digboi",
    name: "Digboi Oilfield & Refinery",
    category: "petroleum",
    state: "Assam (Tinsukia)",
    coordinates: [27.3800, 95.6300],
    significance: "Oldest continuously operating oil well in Asia (drilled in 1889).",
    cbseExamFrequency: "Guaranteed",
  },
  {
    id: "oil-mumbai-high",
    name: "Mumbai High (Offshore)",
    category: "petroleum",
    state: "Offshore Maharashtra (160 km west)",
    coordinates: [19.4167, 71.3333],
    significance: "India's largest crude oil field discovered in 1974 with 'Sagar Samrat' platform.",
    cbseExamFrequency: "Very High",
  },
  {
    id: "oil-ankleshwar",
    name: "Ankleshwar Oilfield",
    category: "petroleum",
    state: "Gujarat (Bharuch)",
    coordinates: [21.6264, 73.0039],
    significance: "Major onshore oil field in the Cambay basin.",
    cbseExamFrequency: "High",
  },

  // Major Sea Ports
  {
    id: "port-kandla",
    name: "Kandla (Deendayal) Port",
    category: "port",
    state: "Gujarat (Gulf of Kachchh)",
    coordinates: [23.0033, 70.2181],
    significance: "Tidal port built post-independence to compensate for loss of Karachi.",
    cbseExamFrequency: "Guaranteed",
  },
  {
    id: "port-mumbai",
    name: "Mumbai & JNPT (Nhava Sheva)",
    category: "port",
    state: "Maharashtra",
    coordinates: [18.9500, 72.8500],
    significance: "Mumbai is the largest natural port; JNPT is the largest container hub.",
    cbseExamFrequency: "Guaranteed",
  },
  {
    id: "port-marmagao",
    name: "Marmagao Port",
    category: "port",
    state: "Goa (Zuai estuary)",
    coordinates: [15.4167, 73.8000],
    significance: "Leading iron ore exporting port of India.",
    cbseExamFrequency: "Very High",
  },
  {
    id: "port-kochi",
    name: "Kochi (Cochin) Port",
    category: "port",
    state: "Kerala (Vembanad Lake)",
    coordinates: [9.9667, 76.2667],
    significance: "Natural harbour located at the mouth of Vembanad Lake, called Queen of Arabian Sea.",
    cbseExamFrequency: "Very High",
  },
  {
    id: "port-vizag",
    name: "Visakhapatnam Port",
    category: "port",
    state: "Andhra Pradesh",
    coordinates: [17.6868, 83.2185],
    significance: "Deepest landlocked protected harbour handling iron ore and petroleum.",
    cbseExamFrequency: "Guaranteed",
  },
  {
    id: "port-paradip",
    name: "Paradip Port",
    category: "port",
    state: "Odisha (Mahanadi Delta)",
    coordinates: [20.2644, 86.6714],
    significance: "Deep-water port specialized in bulk iron ore and coal exports.",
    cbseExamFrequency: "Very High",
  },
  {
    id: "port-haldia",
    name: "Haldia & Kolkata Port",
    category: "port",
    state: "West Bengal (Hooghly River)",
    coordinates: [22.0667, 88.0667],
    significance: "Kolkata is the only major riverine port in India; Haldia built downstream to handle heavy draft.",
    cbseExamFrequency: "Guaranteed",
  },

  // International Airports
  {
    id: "air-delhi",
    name: "Indira Gandhi International Airport (DEL)",
    category: "airport",
    state: "New Delhi",
    coordinates: [28.5562, 77.1000],
    significance: "Busiest airport in India and key northern aviation hub.",
    cbseExamFrequency: "Guaranteed",
  },
  {
    id: "air-mumbai",
    name: "Chhatrapati Shivaji Maharaj Airport (BOM)",
    category: "airport",
    state: "Mumbai, Maharashtra",
    coordinates: [19.0896, 72.8656],
    significance: "Historic gateway of India for international air travel.",
    cbseExamFrequency: "Guaranteed",
  },
  {
    id: "air-chennai",
    name: "Chennai International Airport (MAA)",
    category: "airport",
    state: "Chennai, Tamil Nadu",
    coordinates: [12.9941, 80.1709],
    significance: "Premier air terminal for South India.",
    cbseExamFrequency: "Very High",
  },
];
