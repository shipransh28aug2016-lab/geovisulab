/**
 * Spatial Point Inspection Engine for CBSE Geography
 * Analyzes any clicked [latitude, longitude] on Earth / India to deliver:
 * 1. Exact geographic coordinates, hemispheres, and distance from Equator & Prime Meridian.
 * 2. Indian Physiographic Division & Geological Terrane.
 * 3. ICAR Soil Order and diagnostic agricultural characteristics.
 * 4. River Drainage Basin & Catchment watershed.
 * 5. Nearest Mountain Peak / Pass with elevation & distance.
 * 6. Nearest CBSE Board Exam landmark (Major Ports, Mines, Oilfields, Power plants).
 * 7. Nearest Railway Zone or National Geospatial Institute HQ.
 * 8. Köppen Climate Zone classification.
 * 9. Explicit NCERT chapter mapping & syllabus study tips.
 */

import { INDIAN_MOUNTAINS, INDIAN_RIVERS, INDIAN_SOILS, CBSE_MAP_ITEMS } from "./geo-features";
import { HEADQUARTERS_DATA } from "./headquarters-data";

export interface GeoLocationAnalysis {
  lat: number;
  lng: number;
  locationName: string;
  locationNameHi: string;
  isInsideIndia: boolean;
  stateOrRegion: string;
  physiographicDivision: string;
  physiographicDivisionHi: string;
  geologicalFormation: string;
  drainageBasin: string;
  drainageBasinHi: string;
  soilOrder: string;
  soilOrderHi: string;
  soilCharacteristics: string[];
  climateType: string;
  koppenCode: string;
  annualRainfallEst: string;
  nearestMountain?: {
    name: string;
    elevationM: number;
    distanceKm: number;
    direction: string;
  };
  nearestRiver?: {
    name: string;
    distanceKm: number;
    flowTo: string;
  };
  nearestBoardExamItem?: {
    name: string;
    category: string;
    state: string;
    distanceKm: number;
  };
  nearestHeadquarters?: {
    name: string;
    city: string;
    category: string;
    distanceKm: number;
  };
  ncertChapters: string[];
  cbseExamRelevance: string;
  cbseExamRelevanceHi: string;
}

// Great-circle Haversine distance in kilometers
export function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's mean radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

// Cardinal direction from point 1 to point 2
export function getCompassBearing(lat1: number, lon1: number, lat2: number, lon2: number): string {
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const y = Math.sin(dLon) * Math.cos((lat2 * Math.PI) / 180);
  const x =
    Math.cos((lat1 * Math.PI) / 180) * Math.sin((lat2 * Math.PI) / 180) -
    Math.sin((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.cos(dLon);
  const brng = ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
  const sectors = ["N", "NE", "E", "SE", "S", "SW", "W", "NW", "N"];
  return sectors[Math.round(brng / 45)];
}

// Point-in-polygon algorithm (Ray-casting)
function isPointInPolygon(point: [number, number], vs: [number, number][]): boolean {
  const x = point[0];
  const y = point[1];
  let inside = false;
  for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
    const xi = vs[i][0];
    const yi = vs[i][1];
    const xj = vs[j][0];
    const yj = vs[j][1];
    const intersect = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

// Minimum distance from point to a polyline
function minDistanceToPolyline(point: [number, number], polyline: [number, number][]): number {
  let minD = Infinity;
  for (let i = 0; i < polyline.length; i++) {
    const d = haversineKm(point[0], point[1], polyline[i][0], polyline[i][1]);
    if (d < minD) minD = d;
  }
  return minD;
}

export function inspectGeographicPoint(lat: number, lng: number): GeoLocationAnalysis {
  // 1. Determine if inside Indian mainland / territorial bounds
  // India approx: Lat 6.5°N - 37.5°N, Lng 68.0°E - 97.5°E
  const isInsideIndia = lat >= 6.5 && lat <= 37.5 && lng >= 68.0 && lng <= 97.5;

  let stateOrRegion = "Global Waters / Continental Terrain";
  let locationName = `${lat.toFixed(3)}°N, ${lng.toFixed(3)}°E`;
  let locationNameHi = `${lat.toFixed(3)}° उ., ${lng.toFixed(3)}° पू.`;
  let physiographicDivision = "Open Terrestrial / Marine Basin";
  let physiographicDivisionHi = "खुला स्थलीय / महासागरीय बेसिन";
  let geologicalFormation = "Global Lithospheric Plate";
  let drainageBasin = "Global Oceanic Catchment";
  let drainageBasinHi = "वैश्विक महासागरीय जलसंभर";
  let soilOrder = "Global Soil System";
  let soilOrderHi = "वैश्विक मृदा प्रणाली";
  let soilCharacteristics = ["Global pedological zone based on zonal climate and weathering"];
  let climateType = "Global Climate Regime";
  let koppenCode = "Af / Aw / BWh / Cs";
  let annualRainfallEst = "Variable with planetary wind belts";
  let cbseExamRelevance = "Study global pressure belts and plate tectonic margins in Class 11 Physical Geography.";
  let cbseExamRelevanceHi = "कक्षा 11 भौतिक भूगोल के अंतर्गत भूमंडलीय पवन पेटियों व विवर्तनिक प्लेटों का अध्ययन करें।";

  const ncertChapters: string[] = [];

  if (isInsideIndia) {
    // Determine Indian State / Region and Physiographic Realm
    if (lat >= 30.0 && lng <= 80.0) {
      stateOrRegion = "Northern Himalayan Realm (Ladakh / J&K / Himachal / Uttarakhand)";
      physiographicDivision = "Northern & North-Eastern Mountain System (Greater & Lesser Himalayas)";
      physiographicDivisionHi = "उत्तरी तथा उत्तर-पूर्वी पर्वतमाला (हिमाद्रि, हिमाचल एवं शिवालिक)";
      geologicalFormation = "Tertiary Alpine Young Fold Mountains (Sedimentary & Granitic Core)";
      climateType = "Highland / Cold Alpine Alpine Tundra (Köppen ET/H)";
      koppenCode = "H / ET";
      annualRainfallEst = "Snowfall + 80-150 cm rainfall; Winter rain from Western Disturbances";
      ncertChapters.push("Class 11 - India Physical: Ch 2 Structure & Physiography", "Class 11 - India Physical: Ch 4 Climate");
      cbseExamRelevance = "Core Himalayan antecedent drainage and glacial landform zone; check for Karakoram and Zaskar passes.";
      cbseExamRelevanceHi = "हिमालयी पूर्ववर्ती अपवाह और हिमनदीय स्थलरूप क्षेत्र; काराकोरम और ज़ोजिला दर्रों से संबंधित।";
    } else if (lat >= 25.0 && lat < 30.0 && lng >= 73.0 && lng <= 89.0) {
      stateOrRegion = "Indo-Gangetic Plain (Punjab, Haryana, Uttar Pradesh, Bihar)";
      physiographicDivision = "Northern Plains (Indo-Gangetic Alluvial Trough)";
      physiographicDivisionHi = "उत्तर का विशाल मैदान (गंगा-सिंधु का जलोढ़ गर्त)";
      geologicalFormation = "Pleistocene to Holocene Aggradational Foredeep Basin (depth up to 2,000m)";
      climateType = "Subtropical Monsoon with dry winter (Köppen Cwg)";
      koppenCode = "Cwg";
      annualRainfallEst = "60-120 cm (decreases from East to West); Vital for Rabi wheat & Kharif paddy";
      ncertChapters.push("Class 11 - India Physical: Ch 2 Physiography", "Class 11 - India Physical: Ch 3 Drainage", "Class 12 - India: People & Economy: Ch 3 Agriculture");
      cbseExamRelevance = "Highest agricultural density and population concentration; contrast Khadar (fertile new flood alluvium) vs Bhangar (old alluvium with Kankar).";
      cbseExamRelevanceHi = "सर्वाधिक कृषि घनत्व व जनसंख्या संकेंद्रण; खादर (नवीन उपजाऊ जलोढ़) और भांगर (कंकड़युक्त पुराना जलोढ़) का क्षेत्र।";
    } else if (lat >= 23.0 && lat <= 29.5 && lng <= 73.5) {
      stateOrRegion = "Thar Desert / Marusthali (Western Rajasthan & Kachchh)";
      physiographicDivision = "Great Indian Desert (Marusthali & Rajasthan Bagar)";
      physiographicDivisionHi = "भारतीय महामरुस्थल (मरुस्थली एवं राजस्थान बागर)";
      geologicalFormation = "Permian to Mesozoic marine sediments covered by Pleistocene wind-blown aeolian sand";
      climateType = "Hot Arid Subtropical Desert (Köppen BWhw)";
      koppenCode = "BWhw";
      annualRainfallEst = "< 25 cm; Erratic precipitation with dry desiccating winds (Loo in summer)";
      ncertChapters.push("Class 11 - India Physical: Ch 2 Physiography", "Class 11 - India Physical: Ch 6 Soils", "Class 12 - Ch 6 Indira Gandhi Canal");
      cbseExamRelevance = "Inland drainage of Luni river, shifting barchan dunes, arid soils, and Indira Gandhi Canal irrigation command area.";
      cbseExamRelevanceHi = "लूनी नदी का आंतरिक अपवाह, बरखान बालू के टीले तथा इंदिरा गांधी नहर कमान क्षेत्र का सतत विकास।";
    } else if (lat >= 22.0 && lat <= 27.0 && lng >= 83.0 && lng <= 88.5) {
      stateOrRegion = "Chota Nagpur Plateau (Jharkhand, Odisha, West Bengal, Chhattisgarh)";
      physiographicDivision = "Central Highlands / Chota Nagpur Crystalline Plateau";
      physiographicDivisionHi = "मध्य उच्चभूमि / छोटानागपुर का पठार";
      geologicalFormation = "Archaean Gneiss and Gondwana Down-faulted Coal Basins (Damodar Valley)";
      climateType = "Tropical Savanna / Wet & Dry (Köppen Aw/Am)";
      koppenCode = "Aw";
      annualRainfallEst = "120-150 cm during Southwest Monsoon";
      ncertChapters.push("Class 12 - India Economy: Ch 5 Minerals & Energy", "Class 12 - Ch 6 Manufacturing Industries");
      cbseExamRelevance = "India's mineral heartland (Ruhr of India); Jharia coal, Mayurbhanj iron ore, and integrated steel plants cluster.";
      cbseExamRelevanceHi = "भारत का खनिज हृदय स्थल; झरिया कोयला, मयूरभंज लौह अयस्क और इस्पात कारखानों का केंद्र।";
    } else if (lat <= 22.0 && lat >= 12.0 && lng >= 73.0 && lng <= 77.5) {
      stateOrRegion = "Western Deccan / Maharashtra & Karnataka Plateau";
      physiographicDivision = "Peninsular Deccan Plateau (Deccan Lava Traps)";
      physiographicDivisionHi = "दक्कन का पठार (दक्कन लावा ट्रैप / रेगुर क्षेत्र)";
      geologicalFormation = "Cretaceous Basaltic Flood Lava Eruptions (66 million years ago)";
      climateType = "Tropical Semi-Arid Steppe in rain-shadow (Köppen BShw)";
      koppenCode = "BShw / Am";
      annualRainfallEst = "50-80 cm in rain-shadow; >250 cm on windward crest of Western Ghats";
      ncertChapters.push("Class 11 - India Physical: Ch 2 Physiography", "Class 11 - India Physical: Ch 6 Soils", "Class 12 - Ch 3 Land Resources");
      cbseExamRelevance = "Classic black regur soil region characterized by self-ploughing fissures, supporting major cotton and soybean cultivation.";
      cbseExamRelevanceHi = "काली रेगुर मिट्टी का क्षेत्र, जिसमें स्वतः जुताई वाली दरारें पड़ती हैं और कपास की खेती होती है।";
    } else if (lat <= 16.0 && lng >= 74.0 && lng <= 77.5) {
      stateOrRegion = "Western Ghats / Sahyadris (Karnataka & Kerala)";
      physiographicDivision = "Western Coastal Plain & Sahyadri Scarp";
      physiographicDivisionHi = "पश्चिमी तटीय मैदान एवं सह्याद्रि भ्रंश कगार";
      geologicalFormation = "Precambrian Granulite & Charnockite Horst (Fault-Scarp)";
      climateType = "Tropical Monsoon with short dry season (Köppen Am)";
      koppenCode = "Am";
      annualRainfallEst = "250-400 cm; Heavy orographic monsoon rainfall";
      ncertChapters.push("Class 11 - India Physical: Ch 2 Physiography", "Class 11 - India Physical: Ch 5 Natural Vegetation", "Class 11 - Ch 14 Biodiversity");
      cbseExamRelevance = "Global biodiversity hotspot; Anamudi peak (2,695m highest in South India), laterite soil, and tea/coffee/rubber plantations.";
      cbseExamRelevanceHi = "वैश्विक जैव-विविधता हॉटस्पॉट; अनामुडी चोटी (2,695 मी.), लेटराइट मिट्टी और कहवा/चाय बागान।";
    } else if (lat <= 17.0 && lng >= 78.0 && lng <= 84.0) {
      stateOrRegion = "Eastern Ghats & Coastal Andhra / Tamil Nadu";
      physiographicDivision = "Eastern Coastal Plain & Discontinuous Eastern Ghats";
      physiographicDivisionHi = "पूर्वी तटीय मैदान एवं विच्छेदित पूर्वी घाट";
      geologicalFormation = "Precambrian Khondalite-Charnockite Mobile Belt flanked by river deltas";
      climateType = "Tropical Wet & Dry with winter rainfall on Coromandel Coast (Köppen As)";
      koppenCode = "As";
      annualRainfallEst = "90-130 cm; Coromandel receives heavy winter rain from Retreating NE Monsoon";
      ncertChapters.push("Class 11 - India Physical: Ch 2 Physiography", "Class 11 - India Physical: Ch 4 Climate", "Class 12 - Ch 8 Ports");
      cbseExamRelevance = "Coromandel coast winter rainfall mechanism and fertile deltas of Godavari, Krishna, and Kaveri rivers.";
      cbseExamRelevanceHi = "कोरोमंडल तट पर लौटते मानसून (उत्तर-पूर्वी) से शीतकालीन वर्षा और कृष्णा-गोदावरी के उपजाऊ डेल्टा।";
    } else if (lng >= 89.0) {
      stateOrRegion = "North-Eastern India (Assam, Meghalaya, Arunachal Pradesh)";
      physiographicDivision = "Northeastern Hills & Brahmaputra Valley";
      physiographicDivisionHi = "उत्तर-पूर्वी पहाड़ियां एवं ब्रह्मपुत्र घाटी";
      geologicalFormation = "Garo-Rajmahal Gap, Shillong Plateau (Peninsular Outlier), and Tertiary Syntaxial Fold Belts";
      climateType = "Humid Subtropical Heavy Monsoon (Köppen Cwa/Am)";
      koppenCode = "Cwa";
      annualRainfallEst = "200-1100 cm (Mawsynram/Cherrapunji receives world's highest precipitation)";
      ncertChapters.push("Class 11 - India Physical: Ch 3 Drainage", "Class 11 - India Physical: Ch 4 Climate", "Class 12 - Ch 5 Digboi Oil");
      cbseExamRelevance = "Mawsynram highest rainfall spot, Brahmaputra braided floodplains, Majuli river island, and Digboi oldest oilfield.";
      cbseExamRelevanceHi = "मौसिनराम (विश्व की सर्वाधिक वर्षा), ब्रह्मपुत्र का गुंफित प्रवाह, माजुली नदी द्वीप और डिगबोई तेल क्षेत्र।";
    } else {
      stateOrRegion = "Central Peninsular India (Madhya Pradesh / Telangana)";
      physiographicDivision = "Central Highlands / Peninsular Plateau Basin";
      physiographicDivisionHi = "मध्य उच्चभूमि / प्रायद्वीपीय पठार";
      geologicalFormation = "Precambrian Crystalline Shield and Gondwana Sedimentary Rifts";
      climateType = "Tropical Savanna (Köppen Aw)";
      koppenCode = "Aw";
      annualRainfallEst = "90-130 cm";
      ncertChapters.push("Class 11 - India Physical: Ch 2 Physiography", "Class 11 - India Physical: Ch 3 Drainage");
      cbseExamRelevance = "Water divide between north-flowing Chambal/Son tributaries and east-flowing peninsular Godavari/Krishna systems.";
      cbseExamRelevanceHi = "उत्तर बहने वाली चंबल/सोन और दक्षिण-पूर्व बहने वाली गोदावरी नदियों का जल विभाजक।";
    }

    // 2. Determine Nearest River System
    let nearestRiv = null;
    let minRivDist = Infinity;
    for (const r of INDIAN_RIVERS) {
      const d = minDistanceToPolyline([lat, lng], r.path);
      if (d < minRivDist) {
        minRivDist = d;
        nearestRiv = {
          name: r.name,
          distanceKm: d,
          flowTo: r.outflow,
        };
      }
    }

    // 3. Determine Nearest Mountain Peak / Range
    let nearestMt = null;
    let minMtDist = Infinity;
    for (const m of INDIAN_MOUNTAINS) {
      const d = haversineKm(lat, lng, m.coordinates[0], m.coordinates[1]);
      if (d < minMtDist) {
        minMtDist = d;
        const bearing = getCompassBearing(lat, lng, m.coordinates[0], m.coordinates[1]);
        nearestMt = {
          name: m.name,
          elevationM: m.elevationM,
          distanceKm: d,
          direction: bearing,
        };
      }
    }

    // 4. Determine Nearest CBSE Board Exam Landmark
    let nearestBoard = null;
    let minBoardDist = Infinity;
    for (const b of CBSE_MAP_ITEMS) {
      const d = haversineKm(lat, lng, b.coordinates[0], b.coordinates[1]);
      if (d < minBoardDist) {
        minBoardDist = d;
        nearestBoard = {
          name: b.name,
          category: b.category.replace("_", " ").toUpperCase(),
          state: b.state,
          distanceKm: d,
        };
      }
    }

    // 5. Determine Nearest Headquarters
    let nearestHq = null;
    let minHqDist = Infinity;
    for (const h of HEADQUARTERS_DATA) {
      const d = haversineKm(lat, lng, h.coordinates[0], h.coordinates[1]);
      if (d < minHqDist) {
        minHqDist = d;
        nearestHq = {
          name: h.shortName,
          city: h.city,
          category: h.categoryLabel,
          distanceKm: d,
        };
      }
    }

    // 6. Match ICAR Soil Order
    let matchedSoil = null;
    for (const s of INDIAN_SOILS) {
      if (isPointInPolygon([lat, lng], s.polygon)) {
        matchedSoil = s;
        break;
      }
    }

    if (matchedSoil) {
      soilOrder = matchedSoil.name;
      soilOrderHi = matchedSoil.hindiName;
      soilCharacteristics = matchedSoil.characteristics;
    } else {
      // Pedological deduction based on region
      if (lat >= 25.0 && lng >= 75.0 && lng <= 88.0) {
        soilOrder = "Alluvial Soil (Indo-Gangetic Khadar & Bhangar)";
        soilOrderHi = "जलोढ़ मिट्टी (खादर एवं भांगर)";
        soilCharacteristics = [
          "Transported riverine sediment rich in Potash and Lime",
          "Deficient in Nitrogen, Phosphorus, and Organic Humus",
          "Supports intensive cropping: Wheat, Rice, Sugarcane, Jute"
        ];
      } else if (lat <= 24.0 && lat >= 16.0 && lng <= 78.0) {
        soilOrder = "Black Soil (Regur / Deccan Basalt Trap)";
        soilOrderHi = "काली / रेगुर मिट्टी (दक्कन बेसाल्ट लावा)";
        soilCharacteristics = [
          "Developed by weathering of Cretaceous volcanic basalt",
          "Rich in smectite clay with self-ploughing deep cracks",
          "Prime cotton and soybean soil with high moisture retention"
        ];
      } else if (lat <= 16.0 && lng <= 76.5) {
        soilOrder = "Laterite Soil (Western Ghats Crest)";
        soilOrderHi = "लेटराइट मिट्टी (पश्चिमी घाट शिखर)";
        soilCharacteristics = [
          "Formed under intense tropical leaching (silica leached away)",
          "Acidic, rich in bauxite and iron oxides, used for cut bricks",
          "Cashew, coffee, tea, and rubber plantation soil"
        ];
      } else if (lng <= 73.0 && lat >= 24.0) {
        soilOrder = "Arid and Desert Soil (Thar Marusthali)";
        soilOrderHi = "मरुस्थलीय / शुष्क मिट्टी (थार मरुस्थल)";
        soilCharacteristics = [
          "Sandy texture, highly saline with low organic moisture",
          "Lower kankar horizon restricts water infiltration",
          "Highly productive under Indira Gandhi canal irrigation"
        ];
      } else {
        soilOrder = "Red and Yellow Soil (Peninsular Igneous Crystalline)";
        soilOrderHi = "लाल और पीली मिट्टी (क्रिस्टलीय आग्नेय शैल)";
        soilCharacteristics = [
          "Developed on Archaean granite and gneiss under low rainfall",
          "Red color derived from iron oxide diffusion; yellow when hydrated",
          "Suitable for millets (Ragi, Bajra), groundnut, and pulses"
        ];
      }
    }

    // Determine Drainage Basin
    if (lat >= 24.5 && lng >= 77.0 && lng <= 88.5) {
      drainageBasin = "Ganga River Basin (Bay of Bengal Drainage)";
      drainageBasinHi = "गंगा नदी द्रोणी (बंगाल की खाड़ी अपवाह)";
    } else if (lat >= 30.0 && lng <= 78.0) {
      drainageBasin = "Indus River Basin (Arabian Sea Drainage)";
      drainageBasinHi = "सिंधु नदी द्रोणी (अरब सागर अपवाह)";
    } else if (lng >= 89.0) {
      drainageBasin = "Brahmaputra River Basin (Bay of Bengal Drainage)";
      drainageBasinHi = "ब्रह्मपुत्र नदी द्रोणी (बंगाल की खाड़ी अपवाह)";
    } else if (lat >= 21.0 && lat <= 23.5 && lng <= 78.0) {
      drainageBasin = "Narmada & Tapi Rift Valley Basin (Arabian Sea Estuary Drainage)";
      drainageBasinHi = "नर्मदा एवं तापी भ्रंश घाटी बेसिन (अरब सागर ज्वारनदमुख)";
    } else if (lat >= 17.0 && lat <= 20.5 && lng >= 74.0) {
      drainageBasin = "Godavari Basin (Dakshin Ganga, Bay of Bengal Drainage)";
      drainageBasinHi = "गोदावरी नदी द्रोणी (दक्षिण गंगा, बंगाल की खाड़ी अपवाह)";
    } else if (lat >= 14.5 && lat <= 17.5 && lng >= 74.0) {
      drainageBasin = "Krishna River Basin (Bay of Bengal Drainage)";
      drainageBasinHi = "कृष्णा नदी द्रोणी (बंगाल की खाड़ी अपवाह)";
    } else if (lat <= 14.0 && lng >= 75.0) {
      drainageBasin = "Kaveri Basin (Granary of South India, Bay of Bengal)";
      drainageBasinHi = "कावेरी नदी द्रोणी (दक्षिण का धान्यागार)";
    } else {
      drainageBasin = "Peninsular Coastal Catchment Basin";
      drainageBasinHi = "प्रायद्वीपीय तटीय जलसंभर क्षेत्र";
    }

    locationName = `${stateOrRegion.split("(")[0].trim()} (${lat.toFixed(2)}°N, ${lng.toFixed(2)}°E)`;
    locationNameHi = `${stateOrRegion.split("(")[0].trim()} (${lat.toFixed(2)}° उ., ${lng.toFixed(2)}° पू.)`;

    return {
      lat,
      lng,
      locationName,
      locationNameHi,
      isInsideIndia: true,
      stateOrRegion,
      physiographicDivision,
      physiographicDivisionHi,
      geologicalFormation,
      drainageBasin,
      drainageBasinHi,
      soilOrder,
      soilOrderHi,
      soilCharacteristics,
      climateType,
      koppenCode,
      annualRainfallEst,
      nearestMountain: nearestMt || undefined,
      nearestRiver: nearestRiv || undefined,
      nearestBoardExamItem: nearestBoard || undefined,
      nearestHeadquarters: nearestHq || undefined,
      ncertChapters,
      cbseExamRelevance,
      cbseExamRelevanceHi,
    };
  }

  // Global / Oceanic location
  return {
    lat,
    lng,
    locationName,
    locationNameHi,
    isInsideIndia: false,
    stateOrRegion: lat > 0 ? "Northern Hemisphere Planetary Zone" : "Southern Hemisphere Planetary Zone",
    physiographicDivision: "Global Oceanic / Continental Crust",
    physiographicDivisionHi: "वैश्विक महासागरीय / महाद्वीपीय क्रस्ट",
    geologicalFormation: "Major Lithospheric Tectonic Plate Margin",
    drainageBasin: "Open Oceanic Marine Waters",
    drainageBasinHi: "खुला महासागरीय जलक्षेत्र",
    soilOrder: "Submarine Pelagic / Zonal Terrestrial",
    soilOrderHi: "समुद्री निक्षेप / क्षेत्रीय मृदा",
    soilCharacteristics: ["Governed by global Köppen climatic regimes and marine sedimentation"],
    climateType: lat > 60 ? "Polar / Cold (Köppen E/D)" : lat < 23.5 && lat > -23.5 ? "Tropical Warm (Köppen A)" : "Temperate Mid-Latitude (Köppen C/B)",
    koppenCode: lat > 60 ? "ET/EF" : lat < 23.5 && lat > -23.5 ? "Af/Am" : "Cs/Cfb",
    annualRainfallEst: "Varies by global atmospheric general circulation cell",
    ncertChapters: ["Class 11 - Fundamentals of Physical Geography: Ch 4 Oceans & Continents", "Class 11 - Ch 11 World Climate"],
    cbseExamRelevance: "Analyze global plate divergence, sea floor spreading, and planetary wind circulation belts.",
    cbseExamRelevanceHi: "वैश्विक प्लेट विवर्तनिकी, समुद्री अधस्तल विस्तार तथा भूमंडलीय पवन पेटियों का अध्ययन करें।",
  };
}
