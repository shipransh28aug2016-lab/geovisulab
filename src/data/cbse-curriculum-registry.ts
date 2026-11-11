/**
 * CBSE Geography Curriculum Registry
 * Classes XI & XII
 */

export interface CurriculumTopic {
  id: string;
  classGrade: "11" | "12";
  book: string;
  bookHindi: string;
  unit: string;
  unitHindi: string;
  chapterNumber: number;
  chapterTitle: string;
  chapterTitleHindi: string;
  topic: string;
  subtopics: string[];
  learningObjective: string;
  visualizationType: "2d_map" | "3d_globe" | "cutaway_earth" | "radiation_model" | "flow_animation" | "terrain_profile" | "contour_lab" | "gis_lab" | "case_study" | "thematic_choropleth";
  interactiveMode: ("explore" | "explain" | "simulate" | "compare" | "map_practice" | "quiz" | "exam_mode" | "case_study")[];
  mapWork: {
    required: boolean;
    category?: "CLASS_XI_WORLD" | "CLASS_XI_INDIA" | "CLASS_XII_WORLD" | "CLASS_XII_INDIA";
    items: string[];
    itemsHindi: string[];
  };
  practicalRequirement?: string;
  syllabusStatus: "core_prescribed" | "formative_enrichment" | "board_evaluated";
  examTips: string;
  examTipsHindi: string;
  targetLocation?: {
    lat: number;
    lng: number;
    zoom: number;
    name: string;
  };
  associatedLayers: string[];
}

export const CBSE_CURRICULUM_REGISTRY: CurriculumTopic[] = [
  // =========================================================================
  // CLASS XI - BOOK 1: FUNDAMENTALS OF PHYSICAL GEOGRAPHY
  // =========================================================================
  {
    id: "c11-phys-ch1",
    classGrade: "11",
    book: "Fundamentals of Physical Geography",
    bookHindi: "भौतिक भूगोल के मूल सिद्धांत",
    unit: "Unit I: Geography as a Discipline",
    unitHindi: "इकाई I: भूगोल एक विषय के रूप में",
    chapterNumber: 1,
    chapterTitle: "Geography as a Discipline",
    chapterTitleHindi: "भूगोल एक विषय के रूप में",
    topic: "Spatial Perspective, Branches of Geography and Geoinformatics",
    subtopics: [
      "Areal Differentiation and Spatial Organization",
      "Systematic (Humboldt) vs Regional (Ritter) Approaches",
      "Physical Geography vs Human Geography Branches",
      "Geoinformatics: Cartography, GIS, Remote Sensing and GPS"
    ],
    learningObjective: "Understand geography as an integrating spatial discipline synthesizing natural and social sciences.",
    visualizationType: "3d_globe",
    interactiveMode: ["explore", "explain", "compare"],
    mapWork: {
      required: true,
      category: "CLASS_XI_WORLD",
      items: ["Prime Meridian", "Equator", "Tropic of Cancer", "International Date Line"],
      itemsHindi: ["प्रधान मध्याह्न रेखा", "भूमध्य रेखा", "कर्क रेखा", "अंतर्राष्ट्रीय तिथि रेखा"]
    },
    practicalRequirement: "Introduction to cartographic scales and projection graticules.",
    syllabusStatus: "core_prescribed",
    examTips: "Highlight Geography as an empirical and synthesizing discipline. Differentiate between systematic and regional geography.",
    examTipsHindi: "भूगोल को समाकलक विज्ञान के रूप में व्याख्या करें। क्रमबद्ध और प्रादेशिक उपागम का अंतर स्पष्ट करें।",
    targetLocation: { lat: 20.5937, lng: 78.9629, zoom: 4, name: "Global Earth Grid" },
    associatedLayers: ["tectonics", "climate"]
  },
  {
    id: "c11-phys-ch2",
    classGrade: "11",
    book: "Fundamentals of Physical Geography",
    bookHindi: "भौतिक भूगोल के मूल सिद्धांत",
    unit: "Unit II: The Earth",
    unitHindi: "इकाई II: पृथ्वी",
    chapterNumber: 2,
    chapterTitle: "The Origin and Evolution of the Earth",
    chapterTitleHindi: "पृथ्वी की उत्पत्ति एवं विकास",
    topic: "Planetary Formation, Geological Time Scale and Degassing",
    subtopics: [
      "Nebular Hypothesis (Kant & Laplace) and Big Bang Theory (Lemaitre)",
      "Evolution of Lithosphere: Differentiation of Heavy & Light Materials",
      "Evolution of Atmosphere: Loss of Primordial Atmosphere and Degassing",
      "Evolution of Hydrosphere: Condensation of Water Vapour and Ancient Oceans",
      "Origin of Life (3.8 billion years ago) and Photosynthesis"
    ],
    learningObjective: "Trace the chronological stages of Earth's origin from stellar nebulae to life-supporting spheres.",
    visualizationType: "3d_globe",
    interactiveMode: ["explore", "explain", "simulate"],
    mapWork: {
      required: false,
      items: [],
      itemsHindi: []
    },
    syllabusStatus: "core_prescribed",
    examTips: "Focus on 'Degassing'—the volcanic process that released water vapor and gases to create the early atmosphere.",
    examTipsHindi: "'विगैसों' (Degassing) प्रक्रिया का वर्णन करें जिसके द्वारा पृथ्वी के भीतर से जलवाष्प और गैसें निकलीं।",
    targetLocation: { lat: 0, lng: 0, zoom: 2, name: "Primordial Earth" },
    associatedLayers: ["tectonics"]
  },
  {
    id: "c11-phys-ch3",
    classGrade: "11",
    book: "Fundamentals of Physical Geography",
    bookHindi: "भौतिक भूगोल के मूल सिद्धांत",
    unit: "Unit II: The Earth",
    unitHindi: "इकाई II: पृथ्वी",
    chapterNumber: 3,
    chapterTitle: "Interior of the Earth",
    chapterTitleHindi: "पृथ्वी की आंतरिक संरचना",
    topic: "Earthquake Waves, Internal Layers, Discontinuities and Volcanic Landforms",
    subtopics: [
      "Direct vs Indirect Sources of Earth's Interior",
      "Seismic P-waves (compressional, all media) and S-waves (transverse, solid only)",
      "P-wave Shadow Zone (105° to 142°) and Complete S-wave Shadow Zone (>105°)",
      "Crust (Continental SIAL vs Oceanic SIMA)",
      "Mantle & Asthenosphere (Low Velocity Zone, Source of Magma)",
      "Core: Liquid Outer Core vs Solid Inner Core (NIFE)",
      "Intrusive Volcanic Landforms: Batholiths, Laccoliths, Lopoliths, Phacoliths, Sills, Dykes"
    ],
    learningObjective: "Analyze seismic wave refraction to deduce Earth's internal concentric shells and shadow zones.",
    visualizationType: "cutaway_earth",
    interactiveMode: ["explore", "explain", "simulate", "quiz"],
    mapWork: {
      required: true,
      category: "CLASS_XI_WORLD",
      items: ["Pacific Ring of Fire", "Mid-Atlantic Ridge", "Mariana Trench"],
      itemsHindi: ["प्रशांत महासागरीय अग्नि-वलय", "मध्य अटलांटिक कटक", "मारियाना गर्त"]
    },
    syllabusStatus: "core_prescribed",
    examTips: "Draw the seismic wave shadow zone. Explain why S-waves cannot travel through the outer core, proving it is molten.",
    examTipsHindi: "भूकंपीय छाया क्षेत्र का रेखाचित्र बनाएं। बताएं कि S-तरंगें तरल बाह्य क्रोड से क्यों नहीं गुजर सकतीं।",
    targetLocation: { lat: 28.0, lng: 84.0, zoom: 4, name: "Subduction & Mantle Plume" },
    associatedLayers: ["tectonics"]
  },
  {
    id: "c11-phys-ch4",
    classGrade: "11",
    book: "Fundamentals of Physical Geography",
    bookHindi: "भौतिक भूगोल के मूल सिद्धांत",
    unit: "Unit II: The Earth",
    unitHindi: "इकाई II: पृथ्वी",
    chapterNumber: 4,
    chapterTitle: "Distribution of Oceans and Continents",
    chapterTitleHindi: "महासागरों और महाद्वीपों का वितरण",
    topic: "Continental Drift, Sea Floor Spreading and Plate Tectonics",
    subtopics: [
      "Alfred Wegener's Continental Drift (Pangaea, Panthalassa, Gondwanaland, Laurasia)",
      "Evidences: Jigsaw Fit, Fossils (Glossopteris, Mesosaurus), Tillite, Placer Deposits",
      "Sea Floor Spreading (Harry Hess): Paleomagnetism and Mid-Ocean Ridges",
      "Modern Plate Tectonics (McKenzie, Parker, Morgan): 7 Major and Minor Plates",
      "Divergent Boundaries (Rifting), Convergent Boundaries (Subduction), Transform Faults (Shearing)",
      "Northward Drift of the Indian Plate and Himalayan Orogeny"
    ],
    learningObjective: "Model plate tectonic boundaries and reconstruct the 140-million-year journey of the Indian Plate.",
    visualizationType: "3d_globe",
    interactiveMode: ["explore", "explain", "simulate", "compare", "map_practice"],
    mapWork: {
      required: true,
      category: "CLASS_XI_WORLD",
      items: [
        "Pacific Plate", "North American Plate", "South American Plate", "Eurasian Plate",
        "African Plate", "Indo-Australian Plate", "Antarctic Plate", "Nazca Plate", "Cocos Plate", "Arabian Plate"
      ],
      itemsHindi: [
        "प्रशांत प्लेट", "उत्तरी अमेरिकी प्लेट", "दक्षिणी अमेरिकी प्लेट", "यूरेशियाई प्लेट",
        "अफ्रीकी प्लेट", "इंडो-ऑस्ट्रेलियन प्लेट", "अंटार्कटिक प्लेट", "नाज़का प्लेट", "कोकोस प्लेट", "अरब प्लेट"
      ]
    },
    syllabusStatus: "core_prescribed",
    examTips: "Differentiate between divergent (constructive), convergent (destructive), and transform (conservative) margins with diagrams.",
    examTipsHindi: "अपसारी, अभिसारी और रूपांतर सीमा का अंतर रेखाचित्र सहित याद करें।",
    targetLocation: { lat: 25.0, lng: -45.0, zoom: 3, name: "Mid-Atlantic Ridge" },
    associatedLayers: ["tectonics"]
  },
  {
    id: "c11-phys-ch5",
    classGrade: "11",
    book: "Fundamentals of Physical Geography",
    bookHindi: "भौतिक भूगोल के मूल सिद्धांत",
    unit: "Unit III: Landforms",
    unitHindi: "इकाई III: भू-आकृतियाँ",
    chapterNumber: 5,
    chapterTitle: "Geomorphic Processes",
    chapterTitleHindi: "भू-आकृतिक प्रक्रियाएं",
    topic: "Endogenic & Exogenic Forces, Weathering, Mass Movement and Soil Formation",
    subtopics: [
      "Endogenic Forces: Diastrophism (Epeirogenic & Orogenic) and Volcanism",
      "Exogenic Forces: Denudation, Weathering (Physical, Chemical, Biological)",
      "Mass Movements: Slow (Creep, Solifluction) vs Rapid (Slump, Debris Slide, Landslide)",
      "Pedogenesis: Factors of Soil Formation (Parent Rock, Topography, Climate, Biological Activity, Time)"
    ],
    learningObjective: "Distinguish between internal building forces and surface gradation agents altering Earth's relief.",
    visualizationType: "terrain_profile",
    interactiveMode: ["explore", "explain", "simulate"],
    mapWork: {
      required: false,
      items: [],
      itemsHindi: []
    },
    syllabusStatus: "core_prescribed",
    examTips: "Explain the active factors (Climate, Organisms) vs passive factors (Parent material, Relief, Time) of soil formation.",
    examTipsHindi: "मृदा निर्माण के सक्रिय (जलवायु, जैव तत्व) और निष्क्रिय (मूल शैल, उच्चावच, समय) कारकों का विश्लेषण करें।",
    targetLocation: { lat: 30.3758, lng: 79.9708, zoom: 6, name: "Himalayan Slopes & Landslides" },
    associatedLayers: ["mountains", "soils"]
  },
  {
    id: "c11-phys-ch6",
    classGrade: "11",
    book: "Fundamentals of Physical Geography",
    bookHindi: "भौतिक भूगोल के मूल सिद्धांत",
    unit: "Unit III: Landforms",
    unitHindi: "इकाई III: भू-आकृतियाँ",
    chapterNumber: 6,
    chapterTitle: "Landforms and their Evolution",
    chapterTitleHindi: "भू-आकृतियां तथा उनका विकास",
    topic: "Running Water, Groundwater, Glaciers, Waves and Wind Landforms",
    subtopics: [
      "Fluvial Landforms: Youth (Gorges, V-shaped valleys, Waterfalls), Mature (Meanders, Oxbow lakes), Old (Deltas, Floodplains)",
      "Karst Topography: Sinkholes, Lapies, Caves, Stalactites, Stalagmites, Pillars",
      "Glacial Landforms: Cirques, Aretes, U-shaped Valleys, Hanging Valleys, Moraines, Eskers, Drumlins",
      "Coastal Landforms: Cliffs, Wave-cut Platforms, Bars, Spits, Lagoons",
      "Aeolian Landforms: Pediments, Mushroom Rocks, Yardangs, Barchans, Seifs, Loess"
    ],
    learningObjective: "Identify geomorphic landforms and classify them into erosional versus depositional stages.",
    visualizationType: "contour_lab",
    interactiveMode: ["explore", "explain", "compare", "quiz"],
    mapWork: {
      required: true,
      category: "CLASS_XI_WORLD",
      items: ["Grand Canyon", "Sunderban Delta", "Thar Erg Barchans"],
      itemsHindi: ["ग्रैंड कैनियन", "सुंदरबन डेल्टा", "थार मरुस्थलीय बालुका स्तूप"]
    },
    practicalRequirement: "Contour profile construction of V-shaped valley, U-shaped valley, and conical hill.",
    syllabusStatus: "core_prescribed",
    examTips: "Contrast V-shaped fluvial valleys with U-shaped glacial valleys. Explain how stalactites and stalagmites meet to form pillars.",
    examTipsHindi: "नदी निर्मित V-आकार घाटी और हिमानी निर्मित U-आकार घाटी का तुलनात्मक विश्लेषण करें।",
    targetLocation: { lat: 30.1444, lng: 78.7844, zoom: 7, name: "Upper Ganga Gorge & Valleys" },
    associatedLayers: ["rivers", "mountains"]
  },
  {
    id: "c11-phys-ch7",
    classGrade: "11",
    book: "Fundamentals of Physical Geography",
    bookHindi: "भौतिक भूगोल के मूल सिद्धांत",
    unit: "Unit IV: Climate",
    unitHindi: "इकाई IV: जलवायु",
    chapterNumber: 7,
    chapterTitle: "Composition and Structure of Atmosphere",
    chapterTitleHindi: "वायुमंडल का संघटन तथा संरचना",
    topic: "Atmospheric Gases, Water Vapour, Dust Particles and Concentric Thermal Layers",
    subtopics: [
      "Gaseous Composition: Nitrogen (78%), Oxygen (21%), Argon (0.93%), Carbon Dioxide (0.04%)",
      "Greenhouse Effect and Ozone Layer Filter in Stratosphere",
      "Troposphere: Height (8km poles, 18km equator), Normal Lapse Rate (6.5°C per 1000m)",
      "Stratosphere: Isothermal lower boundary, Ozone concentration, Jet cruising",
      "Mesosphere: Coldest layer (-100°C), Meteorite ablation",
      "Thermosphere & Ionosphere: Radio wave reflection (Kennelly-Heaviside layer), Auroras",
      "Exosphere: Gradual dissipation into interplanetary vacuum"
    ],
    learningObjective: "Model the vertical temperature gradient across atmospheric strata and explain the ozone protective shield.",
    visualizationType: "radiation_model",
    interactiveMode: ["explore", "explain", "simulate"],
    mapWork: {
      required: false,
      items: [],
      itemsHindi: []
    },
    syllabusStatus: "core_prescribed",
    examTips: "Remember the normal lapse rate: temperature decreases by 1°C for every 165 meters (or 6.5°C per km) in troposphere.",
    examTipsHindi: "सामान्य ह्रास दर याद रखें: क्षोभमंडल में प्रति 165 मीटर पर 1°C (या 6.5°C प्रति किमी) तापमान घटता है।",
    targetLocation: { lat: 20.0, lng: 78.0, zoom: 4, name: "Atmospheric Column" },
    associatedLayers: ["climate"]
  },
  {
    id: "c11-phys-ch8",
    classGrade: "11",
    book: "Fundamentals of Physical Geography",
    bookHindi: "भौतिक भूगोल के मूल सिद्धांत",
    unit: "Unit IV: Climate",
    unitHindi: "इकाई IV: जलवायु",
    chapterNumber: 8,
    chapterTitle: "Solar Radiation, Heat Balance and Temperature",
    chapterTitleHindi: "सौर विकिरण, ऊष्मा संतुलन एवं तापमान",
    topic: "Insolation, Earth-Sun Geometry, Terrestrial Heat Budget and Temperature Inversion",
    subtopics: [
      "Solar Radiation: Shortwave Insolation (2 calories/cm²/min Solar Constant)",
      "Factors Governing Insolation: Angle of Sun's Rays, Length of Day, Atmospheric Transparency",
      "Global Heat Budget: 100 Incoming Solar Units -> 35 Albedo -> 65 Absorbed (14 Atmosphere, 51 Earth) -> Terrestrial Re-radiation Balance",
      "Heating & Cooling Mechanisms: Conduction, Convection, Advection, Terrestrial Longwave Radiation",
      "Factors Controlling Temperature: Latitude, Altitude, Distance from Sea (Continentality), Ocean Currents, Air Mass",
      "Temperature Inversion: Long winter nights, clear sky, calm air, valley inversions (frost risk)"
    ],
    learningObjective: "Calculate the thermal balance sheet of Earth and explain temperature inversions in mountainous valleys.",
    visualizationType: "radiation_model",
    interactiveMode: ["explore", "explain", "simulate", "compare"],
    mapWork: {
      required: true,
      category: "CLASS_XI_WORLD",
      items: ["Tropic of Cancer", "Equator", "Tropic of Capricorn", "Arctic Circle"],
      itemsHindi: ["कर्क रेखा", "भूमध्य रेखा", "मकर रेखा", "आर्कटिक वृत्त"]
    },
    practicalRequirement: "Isotherm interpretation and temperature anomaly graphs.",
    syllabusStatus: "core_prescribed",
    examTips: "Heat Budget balance sheet question: Explain why Earth neither continuously warms nor indefinitely cools.",
    examTipsHindi: "पृथ्वी के ऊष्मा बजट का संतुलन आरेख तैयार करें: 100 इकाइयां प्राप्त और 100 इकाइयां अंतरिक्ष में वापस।",
    targetLocation: { lat: 0, lng: 0, zoom: 3, name: "Sub-solar Point & Insolation" },
    associatedLayers: ["climate"]
  },
  {
    id: "c11-phys-ch9",
    classGrade: "11",
    book: "Fundamentals of Physical Geography",
    bookHindi: "भौतिक भूगोल के मूल सिद्धांत",
    unit: "Unit IV: Climate",
    unitHindi: "इकाई IV: जलवायु",
    chapterNumber: 9,
    chapterTitle: "Atmospheric Circulation and Weather Systems",
    chapterTitleHindi: "वायुमंडलीय परिसंचरण तथा मौसम प्रणालियां",
    topic: "Pressure Belts, Coriolis Force, Planetary Wind Cells, Air Masses and Cyclones",
    subtopics: [
      "Atmospheric Pressure and Isobars, Pressure Gradient Force",
      "Coriolis Force (Ferrel's Law): Right deflect in Northern, Left in Southern hemisphere",
      "Global Pressure Belts: Equatorial Low (Doldrums), Subtropical Highs (Horse Latitudes), Subpolar Lows, Polar Highs",
      "Three-Cell Circulation Model: Hadley Cell, Ferrel Cell, Polar Cell",
      "Planetary Winds: Northeast & Southeast Trades, Prevailing Westerlies, Polar Easterlies",
      "Air Masses (cT, cP, mT, mP) and Fronts (Warm, Cold, Stationary, Occluded Fronts)",
      "Tropical Cyclones: Sea surface temp >27°C, Coriolis force, Eye, Eyewall, Latent Heat of Condensation",
      "Extra-tropical (Mid-latitude) Cyclones vs Tropical Cyclones"
    ],
    learningObjective: "Simulate atmospheric general circulation, wind vectors, and tropical cyclone spiral structures.",
    visualizationType: "flow_animation",
    interactiveMode: ["explore", "explain", "simulate", "compare"],
    mapWork: {
      required: true,
      category: "CLASS_XI_WORLD",
      items: [
        "Equatorial Doldrums", "Horse Latitudes", "Northeast Trades", "Westerlies Belt", "Bay of Bengal Cyclone Tracks"
      ],
      itemsHindi: [
        "विषुवतीय शांत पेटी (डोलड्रम)", "अश्व अक्षांश", "उत्तर-पूर्वी व्यापारिक पवनें", "पछुआ पवनें", "बंगाल की खाड़ी चक्रवात मार्ग"
      ]
    },
    syllabusStatus: "core_prescribed",
    examTips: "Contrast Tropical Cyclones (thermal origin, move east-to-west, eye present) with Extra-tropical Cyclones (frontal origin, west-to-east).",
    examTipsHindi: "उष्णकटिबंधीय चक्रवात और शीतोष्ण कटिबंधीय चक्रवात का तुलनात्मक अंतर याद करें।",
    targetLocation: { lat: 15.0, lng: 88.0, zoom: 4, name: "Bay of Bengal Tropical Cyclone" },
    associatedLayers: ["climate"]
  },
  {
    id: "c11-phys-ch10",
    classGrade: "11",
    book: "Fundamentals of Physical Geography",
    bookHindi: "भौतिक भूगोल के मूल सिद्धांत",
    unit: "Unit IV: Climate",
    unitHindi: "इकाई IV: जलवायु",
    chapterNumber: 10,
    chapterTitle: "Water in the Atmosphere",
    chapterTitleHindi: "वायुमंडल में जल",
    topic: "Humidity, Dew Point, Condensation Forms, Cloud Classification and Precipitation",
    subtopics: [
      "Humidity Types: Absolute Humidity (g/m³), Specific Humidity, Relative Humidity (RH %)",
      "Dew Point, Latent Heat of Evaporation and Sublimation",
      "Condensation Forms: Dew, Frost, Fog, Mist, Smog",
      "Cloud Classification: Cirrus (high), Cumulus (fluffy), Stratus (layered), Nimbus (rain-bearing)",
      "Precipitation Mechanisms: Convectional Rain (4 o'clock rain), Orographic Rain (windward wet / leeward rain-shadow), Cyclonic / Frontal Rain",
      "Global Precipitation Distribution: Equator wet (>200cm), Subtropical deserts (<25cm)"
    ],
    learningObjective: "Model relative humidity variations with temperature and analyze orographic vs convectional rainfall.",
    visualizationType: "flow_animation",
    interactiveMode: ["explore", "explain", "simulate", "quiz"],
    mapWork: {
      required: true,
      category: "CLASS_XI_WORLD",
      items: ["Amazon Basin (>200 cm)", "Sahara Desert (<25 cm)", "Cherrapunji / Mawsynram"],
      itemsHindi: ["अमेज़न बेसिन (>200 सेमी)", "सहारा मरुस्थल (<25 सेमी)", "चेरापूंजी / मौसिनराम"]
    },
    practicalRequirement: "Hythergraph and climograph analysis.",
    syllabusStatus: "core_prescribed",
    examTips: "Explain the orographic rainfall mechanism: windward slope receives heavy precipitation while leeward slope forms rain-shadow zone.",
    examTipsHindi: "पर्वतीय वर्षा का क्रियाविधि समझाइए: पवनमुखी ढाल पर भारी वर्षा और पवनविमुख ढाल पर वृष्टि छाया क्षेत्र।",
    targetLocation: { lat: 25.2986, lng: 91.5822, zoom: 6, name: "Mawsynram Meghalaya (Rainiest Spot)" },
    associatedLayers: ["climate"]
  },
  {
    id: "c11-phys-ch11",
    classGrade: "11",
    book: "Fundamentals of Physical Geography",
    bookHindi: "भौतिक भूगोल के मूल सिद्धांत",
    unit: "Unit IV: Climate",
    unitHindi: "इकाई IV: जलवायु",
    chapterNumber: 11,
    chapterTitle: "World Climate and Climate Change",
    chapterTitleHindi: "विश्व की जलवायु एवं जलवायु परिवर्तन",
    topic: "Köppen Climate Classification System, Global Biomes and Greenhouse Warming",
    subtopics: [
      "Wladimir Köppen's Scheme (1918): Mean Monthly Temperature and Precipitation empirical boundaries",
      "Group A (Tropical Humid): Af (Tropical Wet), Am (Monsoon), Aw (Savanna)",
      "Group B (Dry Climates): BWh (Subtropical Desert), BWk (Mid-latitude Desert), BSh/BSk (Steppe)",
      "Group C (Warm Temperate): Cs (Mediterranean, dry summer), Cw (China type), Cfb (Marine West Coast)",
      "Group D (Cold Snow Forest): Df (Humid Continental), Dw (Taiga / Boreal)",
      "Group E (Polar): ET (Tundra), EF (Ice Cap)",
      "Group H (Highland Climates)",
      "Climate Change: Milankovitch Cycles, Sunspots, Volcanism, Anthropogenic Greenhouse Gases (CO2, CH4, CFCs), Global Warming Impacts"
    ],
    learningObjective: "Decode Köppen letter codes and map global biomes from equatorial rainforests to polar icecaps.",
    visualizationType: "thematic_choropleth",
    interactiveMode: ["explore", "explain", "compare", "map_practice"],
    mapWork: {
      required: true,
      category: "CLASS_XI_WORLD",
      items: [
        "Equatorial Rainforest Belt (Af)", "Sahara Desert (BWh)", "Mediterranean Basin (Cs)",
        "Siberian Taiga (Dfc)", "Greenland Ice Cap (EF)"
      ],
      itemsHindi: [
        "विषुवतीय वर्षावन पेटी (Af)", "सहारा मरुस्थल (BWh)", "भूमध्यसागरीय बेसिन (Cs)",
        "साइबेरियाई टैगा (Dfc)", "ग्रीनलैंड हिमटोपी (EF)"
      ]
    },
    syllabusStatus: "core_prescribed",
    examTips: "Mediterranean Climate (Cs) is unique: dry hot summers and moist mild winters due to shifting westerly winds. Vital for viticulture.",
    examTipsHindi: "भूमध्यसागरीय जलवायु (Cs) की मुख्य विशेषता: शुष्क ग्रीष्मकाल और पछुआ पवनों से वर्षा वाला शीतकाल। खट्टे फलों व अंगूर की खेती।",
    targetLocation: { lat: 38.0, lng: 15.0, zoom: 4, name: "Mediterranean Climate Realm" },
    associatedLayers: ["climate"]
  },
  {
    id: "c11-phys-ch12",
    classGrade: "11",
    book: "Fundamentals of Physical Geography",
    bookHindi: "भौतिक भूगोल के मूल सिद्धांत",
    unit: "Unit V: Water (Oceans)",
    unitHindi: "इकाई V: जल (महासागर)",
    chapterNumber: 12,
    chapterTitle: "Water (Oceans) - Submarine Relief and Hydrology",
    chapterTitleHindi: "जल (महासागर) - जलमंडल एवं महासागरीय उच्चावच",
    topic: "Hydrological Cycle, Submarine Relief Divisions, Ocean Temperature and Salinity",
    subtopics: [
      "Global Water Inventory: 97.25% Oceans, 2.05% Icecaps/Glaciers, 0.68% Groundwater, 0.01% Lakes/Rivers",
      "Major Ocean Floor Relief: Continental Shelf (richest fishing & petroleum), Continental Slope, Deep Sea Abyssal Plain, Oceanic Deep/Trench",
      "Minor Relief: Mid-Oceanic Ridges, Seamounts, Guyots, Submarine Canyons, Atolls",
      "Ocean Temperature: Horizontal Gradient (decreasing poleward) and Vertical Stratification (Thermocline layer 100-1000m)",
      "Ocean Salinity: Average 35‰; Drivers: Evaporation, Precipitation, Fresh river water inflow; High in Red Sea (41‰) & Dead Sea (238‰), Low in Baltic (3-15‰)"
    ],
    learningObjective: "Profile the continental margin cross-section and map global salinity variation anomalies.",
    visualizationType: "terrain_profile",
    interactiveMode: ["explore", "explain", "simulate"],
    mapWork: {
      required: true,
      category: "CLASS_XI_WORLD",
      items: ["Mariana Trench", "Java (Sunda) Trench", "Mid-Atlantic Ridge", "Red Sea High Salinity Basin"],
      itemsHindi: ["मारियाना गर्त", "सुंडा गर्त", "मध्य अटलांटिक कटक", "लाल सागर उच्च लवणता बेसिन"]
    },
    syllabusStatus: "core_prescribed",
    examTips: "Remember: Continental Shelf is shallow (up to 200m depth) and provides sunlight penetration, forming prime fishing banks (e.g. Dogger Bank).",
    examTipsHindi: "महाद्वीपीय मग्नतट छिछला (200 मीटर तक) होता है, जहां सूर्य का प्रकाश पहुंचता है और मत्स्य बैंक बनते हैं।",
    targetLocation: { lat: 11.3493, lng: 142.1996, zoom: 5, name: "Mariana Trench (Challenger Deep 11,034m)" },
    associatedLayers: ["tectonics"]
  },
  {
    id: "c11-phys-ch13",
    classGrade: "11",
    book: "Fundamentals of Physical Geography",
    bookHindi: "भौतिक भूगोल के मूल सिद्धांत",
    unit: "Unit V: Water (Oceans)",
    unitHindi: "इकाई V: जल (महासागर)",
    chapterNumber: 13,
    chapterTitle: "Movements of Ocean Water",
    chapterTitleHindi: "महासागरीय जल संचलन",
    topic: "Waves, Tides (Spring & Neap), Warm & Cold Ocean Currents and Gyres",
    subtopics: [
      "Wave Characteristics: Wave Crest, Trough, Wave Height, Wavelength, Wave Period",
      "Tides: Gravitational pull of Moon and Sun; Spring Tides (Syzygy - New/Full Moon, highest range) vs Neap Tides (Quadrature - 1st/3rd Quarter Moon)",
      "Ocean Currents Drivers: Planetary Winds, Coriolis Force, Density/Salinity Differences, Continents Configuration",
      "Warm Currents: Gulf Stream, North Atlantic Drift, Kuroshio, Brazilian Current, Agulhas Current",
      "Cold Currents: Labrador Current, Canaries Current, Benguela Current, Peru (Humboldt) Current, California Current, Oyashio",
      "Current Confluences & Fishing Grounds: Gulf Stream + Labrador Current at Newfoundland (Grand Banks)"
    ],
    learningObjective: "Simulate oceanic gyres, tidal gravitational alignments, and explain fog/fishery mixing zones.",
    visualizationType: "flow_animation",
    interactiveMode: ["explore", "explain", "simulate", "map_practice"],
    mapWork: {
      required: true,
      category: "CLASS_XI_WORLD",
      items: [
        "Gulf Stream", "Labrador Current", "Kuroshio Current", "Oyashio Current",
        "Benguela Current", "Peru (Humboldt) Current", "Canaries Current", "Falkland Current"
      ],
      itemsHindi: [
        "गल्फ स्ट्रीम (गर्म)", "लेब्राडोर धारा (ठंडी)", "क्यूरोशियो धारा (गर्म)", "ओयाशियो धारा (ठंडी)",
        "बेंगुएला धारा (ठंडी)", "पेरू/हम्बोल्ट धारा (ठंडी)", "कनारी धारा (ठंडी)", "फ़ॉकलैंड धारा (ठंडी)"
      ]
    },
    syllabusStatus: "core_prescribed",
    examTips: "CBSE Board favorite: Convergence of warm Gulf Stream and cold Labrador Current creates thick fog, hazardous navigation, but world's richest cod fishery.",
    examTipsHindi: "गर्म गल्फ स्ट्रीम और ठंडी लेब्राडोर धारा का मिलन घना कोहरा पैदा करता है और विश्व प्रसिद्ध न्यूफ़ाउंडलैंड मत्स्य क्षेत्र बनाता है।",
    targetLocation: { lat: 45.0, lng: -50.0, zoom: 4, name: "Grand Banks Newfoundland (Current Mixing)" },
    associatedLayers: ["climate"]
  },
  {
    id: "c11-phys-ch14",
    classGrade: "11",
    book: "Fundamentals of Physical Geography",
    bookHindi: "भौतिक भूगोल के मूल सिद्धांत",
    unit: "Unit VI: Life on the Earth",
    unitHindi: "इकाई VI: पृथ्वी पर जीवन",
    chapterNumber: 14,
    chapterTitle: "Biodiversity and Conservation",
    chapterTitleHindi: "जैव विविधता एवं संरक्षण",
    topic: "Genetic, Species & Ecosystem Diversity, Global Hotspots and In-situ / Ex-situ Conservation",
    subtopics: [
      "Levels of Biodiversity: Genetic, Species, and Ecosystem Diversity",
      "Importance: Ecological Stability, Economic Resources, Scientific and Aesthetic Value",
      "Megadiverse Nations and Biodiversity Hotspots (Norman Myers criteria: High endemism >1500 species, >70% habitat loss)",
      "India's 4 Hotspots: Western Ghats, Eastern Himalayas, Indo-Burma, Sundaland (Nicobar)",
      "Threats: Habitat Loss, Fragmentation, Invasive Alien Species, Over-exploitation, Global Warming",
      "Conservation Strategies: In-situ (National Parks, Wildlife Sanctuaries, Biosphere Reserves) vs Ex-situ (Botanical Gardens, Seed Banks, Zoos)"
    ],
    learningObjective: "Map Earth's ecological hotspots and compare in-situ biosphere reserve zoning with ex-situ sanctuaries.",
    visualizationType: "2d_map",
    interactiveMode: ["explore", "explain", "compare", "case_study"],
    mapWork: {
      required: true,
      category: "CLASS_XI_WORLD",
      items: ["Western Ghats Hotspot", "Eastern Himalayas Hotspot", "Amazon Basin Hotspot", "Madagascar Hotspot"],
      itemsHindi: ["पश्चिमी घाट हॉटस्पॉट", "पूर्वी हिमालय हॉटस्पॉट", "अमेज़न बेसिन", "मेडागास्कर हॉटस्पॉट"]
    },
    syllabusStatus: "core_prescribed",
    examTips: "Remember criteria for Biodiversity Hotspots: must contain at least 1,500 species of vascular plants as endemics and have lost at least 70% of primary habitat.",
    examTipsHindi: "हॉटस्पॉट के मानदंड: कम से कम 1,500 स्थानिक संवहनी पौधे प्रजातियां और 70% से अधिक मूल पर्यावास नष्ट।",
    targetLocation: { lat: 10.1699, lng: 77.0641, zoom: 6, name: "Western Ghats Biodiversity Hotspot" },
    associatedLayers: ["mountains"]
  },

  // =========================================================================
  // CLASS XI - BOOK 2: INDIA: PHYSICAL ENVIRONMENT
  // =========================================================================
  {
    id: "c11-ind-ch1",
    classGrade: "11",
    book: "India: Physical Environment",
    bookHindi: "भारत: भौतिक पर्यावरण",
    unit: "Unit I: Introduction",
    unitHindi: "इकाई I: प्रस्तावना",
    chapterNumber: 1,
    chapterTitle: "India - Location & Space Relations",
    chapterTitleHindi: "भारत - स्थिति एवं विस्तार",
    topic: "Latitudinal & Longitudinal Extent, Standard Meridian (82°30'E) and Frontiers",
    subtopics: [
      "Mainland Extent: 8°4'N to 37°6'N Latitude, 68°7'E to 97°25'E Longitude (approx 30° span)",
      "North-South Distance (Indira Col to Kanyakumari: 3,214 km) vs East-West (Kibithu to Ghuar Mota: 2,933 km)",
      "Southernmost Point: Indira Point (Pyrmalion Point) at 6°45'N in Great Nicobar (submerged in 2004 tsunami)",
      "Standard Meridian of India: 82°30'E (Mirzapur, UP), IST = GMT + 5:30 (avoids 2-hour sunrise disparity between Arunachal and Gujarat)",
      "Tropic of Cancer (23°30'N) passing through 8 States: Gujarat, Rajasthan, MP, Chhattisgarh, Jharkhand, West Bengal, Tripura, Mizoram",
      "Total Area: 3.28 million sq km (2.42% of world's land area, 7th largest)",
      "Land Frontier (15,200 km) and Coastline (7,516.6 km including islands)",
      "Territorial Waters (12 nautical miles) and EEZ (200 nautical miles)"
    ],
    learningObjective: "Locate India's geographic extremes, calculate longitudinal local time differentials, and trace the Tropic of Cancer.",
    visualizationType: "2d_map",
    interactiveMode: ["explore", "explain", "simulate", "map_practice"],
    mapWork: {
      required: true,
      category: "CLASS_XI_INDIA",
      items: [
        "Standard Meridian 82°30'E", "Tropic of Cancer (8 States)", "Indira Col (37°6'N)",
        "Kanyakumari (8°4'N)", "Indira Point (6°45'N)", "Kibithu (97°25'E)", "Ghuar Mota (68°7'E)",
        "Palk Strait", "Gulf of Mannar", "10 Degree Channel"
      ],
      itemsHindi: [
        "मानक याम्योत्तर 82°30' पू.", "कर्क रेखा (8 राज्य)", "इंदिरा कोल", "कन्याकुमारी",
        "इंदिरा प्वाइंट", "किबिथू", "गुहार मोती", "पाक जलडमरूमध्य", "मन्नार की खाड़ी", "10 डिग्री चैनल"
      ]
    },
    practicalRequirement: "Calculate local time using longitudinal distance ($1^\\circ = 4$ minutes).",
    syllabusStatus: "core_prescribed",
    examTips: "Why is 82°30'E chosen as Standard Meridian? It is centrally located in India and a multiple of 7°30' (half hour standard zone).",
    examTipsHindi: "82°30' पू. को भारत की मानक याम्योत्तर क्यों चुना गया? यह देश के मध्य से गुजरती है और 7°30' का गुणक है।",
    targetLocation: { lat: 25.1500, lng: 82.5833, zoom: 5, name: "Mirzapur IST 82°30'E Meridian" },
    associatedLayers: ["mountains", "rivers"]
  },
  {
    id: "c11-ind-ch2",
    classGrade: "11",
    book: "India: Physical Environment",
    bookHindi: "भारत: भौतिक पर्यावरण",
    unit: "Unit II: Physiography",
    unitHindi: "इकाई II: भू-आकृति विज्ञान",
    chapterNumber: 2,
    chapterTitle: "Structure and Physiography of India",
    chapterTitleHindi: "संरचना तथा भू-आकृति विज्ञान",
    topic: "Three Geological Divisions and Six Physiographic Divisions",
    subtopics: [
      "Three Geological Divisions: Peninsular Block (ancient stable crystalline shield), Himalayas and Extra-Peninsular mountains (flexible, young fold mountains), Indo-Ganga-Brahmaputra Plains (aggradational trough)",
      "Six Physiographic Divisions:",
      "1. Northern and Northeastern Mountains: Greater Himalayas (Himadri, avg 6000m), Lesser Himalayas (Himachal, Duns: Dehradun), Shiwaliks (outer foothills), Purvanchal (Patkai Bum, Naga, Mizo hills)",
      "2. Northern Plains: Bhabar (porous pebble zone, disappearing streams), Terai (marshy re-emergence), Bhangar (old alluvium, Kankar), Khadar (new fertile floodplain)",
      "3. Peninsular Plateau: Central Highlands (Malwa, Bundelkhand, Chota Nagpur) and Deccan Plateau (Western Ghats: continuous Sahyadris, Anamudi 2695m vs Eastern Ghats: discontinuous, Mahendragiri 1501m)",
      "4. Indian Desert: Marusthali and Bagar, Thar desert with shifting barchans, Luni river basin",
      "5. Coastal Plains: Western Coastal Plain (narrow, submerged, lagoons/Kayals in Kerala) vs Eastern Coastal Plain (broad, emergent, fertile deltas of Mahanadi, Godavari, Krishna, Kaveri)",
      "6. Islands: Andaman and Nicobar (volcanic, Barren Island, 10 Degree Channel) and Lakshadweep (coral atolls, 9 Degree Channel, Kavaratti)"
    ],
    learningObjective: "Analyze Indian relief across mountain passes, structural rift valleys, and coastal delta dynamics.",
    visualizationType: "terrain_profile",
    interactiveMode: ["explore", "explain", "simulate", "compare", "map_practice"],
    mapWork: {
      required: true,
      category: "CLASS_XI_INDIA",
      items: [
        "Mt. K2 (Godwin Austen)", "Kanchenjunga", "Nanda Devi", "Guru Shikhar (Aravalli)",
        "Anamudi (Western Ghats)", "Doda Betta (Nilgiri)", "Mahendragiri (Eastern Ghats)",
        "Dhupgarh (Satpura)", "Karakoram Pass", "Zoji La", "Shipki La", "Nathu La", "Bomdi La", "Palghat Gap", "Thalghat", "Bhorghat"
      ],
      itemsHindi: [
        "माउंट के2", "कंचनजंगा", "नंदा देवी", "गुरु शिखर", "अनामुडी", "दोदाबेटा", "महेंद्रगिरि",
        "धूपगढ़", "काराकोरम दर्रा", "ज़ोजिला", "शिपकी ला", "नाथूला", "बोमडिला", "पालघाट दर्रा", "थालघाट", "भोरघाट"
      ]
    },
    practicalRequirement: "Construction of topographic cross-profile from Himalayas to Deccan.",
    syllabusStatus: "core_prescribed",
    examTips: "Contrast Western Ghats (higher average elevation, continuous, source of major rivers) with Eastern Ghats (discontinuous, dissected by east-flowing rivers).",
    examTipsHindi: "पश्चिमी घाट (ऊंचे, सतत, प्रमुख नदियों के उद्गम) और पूर्वी घाट (असतत, बंगाल की खाड़ी में गिरने वाली नदियों द्वारा विच्छेदित) का अंतर स्पष्ट करें।",
    targetLocation: { lat: 27.9881, lng: 86.9250, zoom: 6, name: "Himalayas & Physiography" },
    associatedLayers: ["mountains", "rivers"]
  },
  {
    id: "c11-ind-ch3",
    classGrade: "11",
    book: "India: Physical Environment",
    bookHindi: "भारत: भौतिक पर्यावरण",
    unit: "Unit II: Physiography",
    unitHindi: "इकाई II: भू-आकृति विज्ञान",
    chapterNumber: 3,
    chapterTitle: "Drainage System of India",
    chapterTitleHindi: "अपवाह तंत्र",
    topic: "Himalayan vs Peninsular River Systems, Watersheds and Drainage Patterns",
    subtopics: [
      "Drainage Patterns: Dendritic, Radial (Amarkantak), Trellis, Centripetal (Loktak)",
      "Water Divide: Northern divide (Indus-Ganga), Peninsular divide (Western Ghats)",
      "Himalayan Drainage (Perennial, Antecedent, Youthful, Meanders & Deltas):",
      "  - Indus System: Origin Bokhar Chu (Tibet), 2880 km, Jhelum, Chenab (largest tributary), Ravi, Beas, Satluj",
      "  - Ganga System: Bhagirathi + Alaknanda at Devprayag, 2525 km; Right bank: Yamuna, Son; Left bank: Ramganga, Gomti, Ghaghara, Gandak, Kosi",
      "  - Brahmaputra System: Tsangpo (Chemayungdung glacier), 2900 km, Syntaxial bend at Namcha Barwa, enters Arunachal as Dihang, Majuli island, Jamuna in Bangladesh",
      "Peninsular Drainage (Older, graded, superimposed, seasonal):",
      "  - East-flowing (form deltas into Bay of Bengal): Godavari (Dakshin Ganga, 1465km), Krishna (1401km), Mahanadi (851km), Kaveri (800km, rainfall in both SW and NE monsoons)",
      "  - West-flowing (rift valleys into Arabian Sea, form estuaries): Narmada (Amarkantak, 1312km, Dhuandhar falls) and Tapi (Multai, Betul, 724km)"
    ],
    learningObjective: "Trace source-to-mouth courses, left/right tributaries, and delineate major river catchment basins.",
    visualizationType: "flow_animation",
    interactiveMode: ["explore", "explain", "simulate", "map_practice", "quiz"],
    mapWork: {
      required: true,
      category: "CLASS_XI_INDIA",
      items: [
        "Indus", "Ganga", "Brahmaputra", "Yamuna", "Narmada", "Tapi", "Godavari",
        "Krishna", "Kaveri", "Mahanadi", "Wular Lake", "Chilika Lake", "Sambhar Lake", "Vembanad Lake", "Kolleru Lake", "Pulicat Lake"
      ],
      itemsHindi: [
        "सिंधु", "गंगा", "ब्रह्मपुत्र", "यमुना", "नर्मदा", "तापी", "गोदावरी",
        "कृष्णा", "कावेरी", "महानदी", "वुलर झील", "चिल्का झील", "सांभर झील", "वेम्बनाड झील", "कोल्लेरू झील", "पुलिकट झील"
      ]
    },
    syllabusStatus: "core_prescribed",
    examTips: "Why do Narmada and Tapi not form deltas? They flow through structural rift valleys of hard rock and deposit minimal silt; fast currents flush directly into estuaries.",
    examTipsHindi: "नर्मदा और तापी डेल्टा क्यों नहीं बनाती हैं? ये भ्रंश घाटी से तीव्र गति से बहती हैं और ज्वारनदमुख (एश्चुअरी) बनाती हैं।",
    targetLocation: { lat: 25.3176, lng: 82.9739, zoom: 6, name: "Ganga River Basin" },
    associatedLayers: ["rivers"]
  },
  {
    id: "c11-ind-ch4",
    classGrade: "11",
    book: "India: Physical Environment",
    bookHindi: "भारत: भौतिक पर्यावरण",
    unit: "Unit III: Climate, Vegetation and Soil",
    unitHindi: "इकाई III: जलवायु, वनस्पति एवं मृदा",
    chapterNumber: 4,
    chapterTitle: "Climate of India & The Monsoon",
    chapterTitleHindi: "जलवायु एवं मानसून",
    topic: "Monsoon Mechanism, Jet Streams, El Niño/ENSO and Four Seasons",
    subtopics: [
      "Factors Determining India's Climate: Latitude, Himalayan Barrier, Distribution of Land & Sea, Relief",
      "Mechanism of Southwest Monsoon: Differential heating of land and sea, Shift of ITCZ to Ganga plains, Heating of Tibetan Plateau, Tropical Easterly Jet Stream, Somali Jet",
      "Winter Weather Mechanism: Subtropical Westerly Jet Stream south of Himalayas, Western Cyclonic Disturbances from Mediterranean causing winter rain in NW India (vital for Rabi wheat)",
      "El Niño and Southern Oscillation (ENSO): Warming of Peruvian coast suppresses Indian monsoon rainfall",
      "Four Seasons: Cold Weather (Dec-Feb), Hot Weather (Mar-May, Loo, Kalbaisakhi/Norwesters, Mango showers), Southwest Monsoon Season (Jun-Sep, Arabian Sea & Bay of Bengal branches), Retreating / Northeast Monsoon (Oct-Nov, Coromandel coast winter rain)",
      "Rainfall Distribution: Heavy (>200cm: Western Ghats, Northeast), Medium (100-200cm: Ganga valley), Low (50-100cm: Deccan, Punjab), Inadequate (<50cm: Western Rajasthan, Ladakh)"
    ],
    learningObjective: "Simulate the seasonal onset, trajectory, and burst of the Southwest Monsoon over the subcontinent.",
    visualizationType: "flow_animation",
    interactiveMode: ["explore", "explain", "simulate", "compare", "map_practice"],
    mapWork: {
      required: true,
      category: "CLASS_XI_INDIA",
      items: [
        "Mawsynram (highest rainfall)", "Thar Desert (<25 cm rainfall)",
        "Coromandel Coast (Winter rainfall)", "Isohyet 100 cm", "Isohyet 200 cm",
        "Arabian Sea Monsoon Branch", "Bay of Bengal Monsoon Branch"
      ],
      itemsHindi: [
        "मौसिनराम (सर्वाधिक वर्षा)", "थार मरुस्थल (<25 सेमी)",
        "कोरोमंडल तट (शीतकालीन वर्षा)", "100 सेमी समवर्षा रेखा", "200 सेमी समवर्षा रेखा",
        "अरब सागर मानसूनी शाखा", "बंगाल की खाड़ी मानसूनी शाखा"
      ]
    },
    practicalRequirement: "Preparation and interpretation of Indian climographs.",
    syllabusStatus: "core_prescribed",
    examTips: "Why does Tamil Nadu / Coromandel Coast remain dry during SW monsoon but receive rain in Oct-Nov? It lies parallel to the Bay of Bengal branch and in the rain-shadow of the Arabian branch; retreats pick moisture over Bay of Bengal.",
    examTipsHindi: "तमिलनाडु तट को दक्षिण-पश्चिम मानसून से वर्षा क्यों नहीं मिलती? यह अरब सागर शाखा के वृष्टि छाया क्षेत्र में है। इसे लौटते उत्तर-पूर्वी मानसून से वर्षा मिलती है।",
    targetLocation: { lat: 8.5241, lng: 76.9366, zoom: 6, name: "Onset of Monsoon Kerala Coast" },
    associatedLayers: ["climate"]
  },
  {
    id: "c11-ind-ch5",
    classGrade: "11",
    book: "India: Physical Environment",
    bookHindi: "भारत: भौतिक पर्यावरण",
    unit: "Unit III: Climate, Vegetation and Soil",
    unitHindi: "इकाई III: जलवायु, वनस्पति एवं मृदा",
    chapterNumber: 5,
    chapterTitle: "Natural Vegetation of India",
    chapterTitleHindi: "प्राकृतिक वनस्पति",
    topic: "Forest Types, Wildlife Sanctuaries and UNESCO Biosphere Reserves",
    subtopics: [
      "Forest Classification (Rainfall & Relief):",
      "  1. Tropical Evergreen & Semi-Evergreen (>200cm, Rosewood, Mahogany, Ebony; Western Ghats, NE Hills)",
      "  2. Tropical Deciduous / Monsoon (70-200cm, Moist: Teak, Sal, Shisham vs Dry: Tendu, Palas, Khair; most widespread 65%)",
      "  3. Tropical Thorn (<50cm, Babool, Ber, Wild Date, Khejri, Cacti; Rajasthan, Gujarat, dry Deccan)",
      "  4. Montane Forests (Northern temperate: Oak, Chestnut, Chir Pine, Deodar, Silver Fir vs Southern Sholas: Nilgiri, Anaimalai)",
      "  5. Littoral and Swamp / Mangrove Forests (Sundari trees, saline water breathing pneumatophores; Sunderbans delta, Mahanadi, Godavari deltas)",
      "Forest Conservation: National Forest Policy 1988 (target 33% geographical area, current ~24.6% per FSI report)",
      "Wildlife Protection Act 1972: 18 Biosphere Reserves (12 in UNESCO World Network of Biosphere Reserves: Nilgiri, Gulf of Mannar, Sunderbans, Nanda Devi, Nokrek, Pachmarhi, Simlipal, Achanakmar-Amarkantak, Great Nicobar, Agasthyamalai, Kanchenjunga, Panna)"
    ],
    learningObjective: "Correlate precipitation isohyets with forest canopy types and map UNESCO Biosphere Reserves.",
    visualizationType: "2d_map",
    interactiveMode: ["explore", "explain", "compare", "map_practice"],
    mapWork: {
      required: true,
      category: "CLASS_XI_INDIA",
      items: [
        "Tropical Evergreen Forest Belt", "Tropical Deciduous Forest Belt", "Mangrove Forests (Sunderbans)",
        "Nilgiri Biosphere Reserve", "Nanda Devi Biosphere Reserve", "Gulf of Mannar Biosphere Reserve",
        "Sunderbans Biosphere Reserve", "Kaziranga National Park", "Jim Corbett National Park", "Gir National Park"
      ],
      itemsHindi: [
        "उष्णकटिबंधीय सदाबहार वन पेटी", "उष्णकटिबंधीय पर्णपाती वन पेटी", "मैंग्रोव वन (सुंदरबन)",
        "नीलगिरि जीवमंडल निश्चय", "नंदा देवी जीवमंडल निश्चय", "मन्नार की खाड़ी",
        "सुंदरबन जीवमंडल", "काजीरंगा राष्ट्रीय उद्यान", "जिम कॉर्बेट राष्ट्रीय उद्यान", "गिर राष्ट्रीय उद्यान"
      ]
    },
    syllabusStatus: "core_prescribed",
    examTips: "Compulsory map question: Locate Nilgiri Biosphere Reserve (tri-junction of TN, Kerala, Karnataka) and Sunderbans Mangroves.",
    examTipsHindi: "मानचित्र में नीलगिरि जीवमंडल निश्चय (तमिलनाडु, केरल, कर्नाटक की सीमा पर) और सुंदरबन मैंग्रोव वन अंकित करें।",
    targetLocation: { lat: 11.5500, lng: 76.5000, zoom: 7, name: "Nilgiri Biosphere Reserve" },
    associatedLayers: ["mountains"]
  },
  {
    id: "c11-ind-ch6",
    classGrade: "11",
    book: "India: Physical Environment",
    bookHindi: "भारत: भौतिक पर्यावरण",
    unit: "Unit III: Climate, Vegetation and Soil",
    unitHindi: "इकाई III: जलवायु, वनस्पति एवं मृदा",
    chapterNumber: 6,
    chapterTitle: "Soils of India (ICAR Classification)",
    chapterTitleHindi: "मृदा (भारतीय कृषि अनुसंधान परिषद वर्गीकरण)",
    topic: "Eight Soil Orders, Physical Characteristics, Agricultural Crops and Soil Erosion",
    subtopics: [
      "ICAR Soil Classification (1953):",
      "  1. Alluvial Soil (40% area, Khadar newer flood alluvium vs Bhangar older alluvium with Kankar, rich in potash, deficient in nitrogen; Wheat, Rice, Sugarcane)",
      "  2. Black Soil / Regur / Black Cotton Soil (16.6% area, Cretaceous basalt lava origin, clayey, self-ploughing deep cracks, rich in lime, iron, magnesia; Cotton, Soybean)",
      "  3. Red and Yellow Soil (18.5% area, crystalline igneous granite/gneiss, iron diffusion gives red color, hydrated gives yellow; Millets, Groundnut)",
      "  4. Laterite Soil (4.3% area, from Latin 'Later' brick, intense tropical leaching in high rain/temp, acidic, rich in iron/bauxite; Cashew, Coffee, Tea, Rubber)",
      "  5. Arid and Desert Soil (4.4% area, sandy, saline, low moisture/humus; Bajra, Pulses with canal irrigation)",
      "  6. Saline / Usara Soil (arid tracts with bad drainage, capillary action deposits sodium/magnesium salts; gypsum treatment)",
      "  7. Peaty / Marshy Soil (high rainfall and humidity, heavy organic matter and humus 40-50%; Kerala Kari, Bihar)",
      "  8. Forest and Mountain Soil (heterogeneous, acidic with low humus in snow zones)",
      "Soil Degradation and Erosion: Sheet erosion, Gully erosion (Chambal ravines/badlands); Conservation: Contour bunding, Terracing, Shelterbelts"
    ],
    learningObjective: "Delineate the distribution of ICAR soil orders and assess agricultural crop suitability.",
    visualizationType: "thematic_choropleth",
    interactiveMode: ["explore", "explain", "compare", "map_practice"],
    mapWork: {
      required: true,
      category: "CLASS_XI_INDIA",
      items: [
        "Alluvial Soil (Northern Plains)", "Black / Regur Soil (Deccan Traps)",
        "Red and Yellow Soil", "Laterite Soil (Western Ghats & Meghalaya)", "Arid Soil (Thar Rajasthan)"
      ],
      itemsHindi: [
        "जलोढ़ मिट्टी (उत्तरी मैदान)", "काली / रेगुर मिट्टी (दक्कन ट्रैप)",
        "लाल और पीली मिट्टी", "लेटराइट मिट्टी (पश्चिमी घाट व मेघालय)", "शुष्क मिट्टी (राजस्थान)"
      ]
    },
    syllabusStatus: "core_prescribed",
    examTips: "Why is black soil called 'self-ploughing'? During dry season it shrinks and develops wide deep cracks, enabling natural aeration; during rains it swells and becomes sticky.",
    examTipsHindi: "काली मिट्टी को 'स्वतः जुताई वाली मिट्टी' क्यों कहते हैं? शुष्क मौसम में इसमें चौड़ी दरारें पड़ जाती हैं जिससे वायु संचरण होता है।",
    targetLocation: { lat: 19.5000, lng: 76.0000, zoom: 6, name: "Deccan Traps Black Soil Realm" },
    associatedLayers: ["soils"]
  },

  // =========================================================================
  // CLASS XI - BOOK 3: PRACTICAL WORK IN GEOGRAPHY PART I
  // =========================================================================
  {
    id: "c11-prac-ch1-2",
    classGrade: "11",
    book: "Practical Work in Geography Part I",
    bookHindi: "भूगोल में प्रयोगात्मक कार्य भाग 1",
    unit: "Practical Skills",
    unitHindi: "प्रयोगात्मक कौशल",
    chapterNumber: 1,
    chapterTitle: "Introduction to Maps and Map Scale",
    chapterTitleHindi: "मानचित्र का परिचय एवं मापनी",
    topic: "Scale Conversion, Representative Fraction (R.F.) and Distance Measurement",
    subtopics: [
      "Types of Maps: Physical (Topographical, Relief, Geological) vs Cultural (Political, Population, Cadastral)",
      "Methods of Representing Scale: Statement of Scale, Representative Fraction (R.F.), Graphical / Linear Scale",
      "Conversion of Scales: Metric system (cm to km, R.F. 1:50,000 means 1 cm = 500 m)",
      "Construction of Plain Graphical Scale and Comparative Scale",
      "Measurement of Curved Distance using Opisometer / Thread and Rotameter"
    ],
    learningObjective: "Convert between statement scale, RF scale, and graphic scales with accurate real-world distance calculation.",
    visualizationType: "contour_lab",
    interactiveMode: ["simulate", "compare", "quiz"],
    mapWork: {
      required: true,
      category: "CLASS_XI_INDIA",
      items: ["Survey of India Toposheet 1:50,000 scale bar", "Cadastral village scale 1:4,000"],
      itemsHindi: ["भारतीय सर्वेक्षण विभाग 1:50,000 मापनी बार", "भूकर (कैडस्ट्रल) मापनी"]
    },
    practicalRequirement: "Laboratory scale conversion exercises and construction of linear graphic scales.",
    syllabusStatus: "core_prescribed",
    examTips: "Compulsory practical calculation: Given an R.F. 1:50,000, calculate distance on ground if map measurement is 6.4 cm (6.4 × 0.5 km = 3.2 km).",
    examTipsHindi: "प्रयोगात्मक गणना: R.F. 1:50,000 पर यदि मानचित्र पर दूरी 6.4 सेमी है, तो धरातल पर वास्तविक दूरी = 3.2 किमी।",
    targetLocation: { lat: 30.3398, lng: 78.0489, zoom: 7, name: "Survey of India Dehradun" },
    associatedLayers: ["mountains"]
  },
  {
    id: "c11-prac-ch3",
    classGrade: "11",
    book: "Practical Work in Geography Part I",
    bookHindi: "भूगोल में प्रयोगात्मक कार्य भाग 1",
    unit: "Practical Skills",
    unitHindi: "प्रयोगात्मक कौशल",
    chapterNumber: 3,
    chapterTitle: "Latitude, Longitude and Time",
    chapterTitleHindi: "अक्षांश, देशांतर और समय",
    topic: "Coordinate Geometry, Local Time Calculation and International Date Line",
    subtopics: [
      "Parallels of Latitude: Angular distance north/south of Equator, Equator to Poles (0° to 90°)",
      "Meridians of Longitude: Semi-circles from Pole to Pole, Prime Meridian (0° Greenwich)",
      "Earth Rotation & Time Calculation: 360° in 24 hours -> 15° per hour -> 1° = 4 minutes",
      "Greenwich Mean Time (GMT/UTC) and Indian Standard Time (IST = GMT + 5 hrs 30 mins based on 82°30'E)",
      "International Date Line (180° Meridian): Zigzag trajectory over Bering Strait and Pacific islands to avoid land splits, Gain a day westward / Lose a day eastward"
    ],
    learningObjective: "Calculate local time for global cities from longitude coordinates and determine calendar day across the IDL.",
    visualizationType: "3d_globe",
    interactiveMode: ["explore", "simulate", "quiz"],
    mapWork: {
      required: true,
      category: "CLASS_XI_WORLD",
      items: ["Prime Meridian 0°", "International Date Line 180°", "IST 82°30'E", "Bering Strait"],
      itemsHindi: ["प्रधान मध्याह्न रेखा 0°", "अंतर्राष्ट्रीय तिथि रेखा 180°", "भारतीय मानक समय 82°30' पू.", "बेरिंग जलडमरूमध्य"]
    },
    practicalRequirement: "Time calculation practical problems based on longitudinal degrees.",
    syllabusStatus: "core_prescribed",
    examTips: "Practical board exam question: If it is 12:00 noon at Greenwich (0°), what is the local time at New Orleans (90°W)? 90 × 4 = 360 mins = 6 hours behind -> 6:00 AM.",
    examTipsHindi: "समय गणना: यदि ग्रीनविच (0°) पर दोपहर 12 बजे हैं, तो 90° प. पर समय क्या होगा? 90 × 4 = 360 मिनट (6 घंटे पीछे) = प्रातः 6:00 बजे।",
    targetLocation: { lat: 51.4769, lng: 0.0000, zoom: 3, name: "Greenwich Prime Meridian" },
    associatedLayers: ["climate"]
  },
  {
    id: "c11-prac-ch4",
    classGrade: "11",
    book: "Practical Work in Geography Part I",
    bookHindi: "भूगोल में प्रयोगात्मक कार्य भाग 1",
    unit: "Practical Skills",
    unitHindi: "प्रयोगात्मक कौशल",
    chapterNumber: 4,
    chapterTitle: "Map Projections",
    chapterTitleHindi: "मानचित्र प्रक्षेप",
    topic: "Conical Projection with One Standard Parallel and Mercator's Projection",
    subtopics: [
      "Definition and Need of Map Projections: Transferring curved spherical earth onto 2D plane",
      "Classification: Based on developable surface (Cylindrical, Conical, Zenithal/Azimuthal), Qualities (Homolographic/Equal Area, Orthomorphic/True Shape, True Distance)",
      "Conical Projection with One Standard Parallel: Construction steps, standard parallel is true to scale, pole is an arc, suitable for mid-latitude countries with east-west extent (e.g. Trans-Siberian corridor, USA)",
      "Mercator's Cylindrical Projection: Parallels and meridians are straight intersecting at 90°, true shape preserved (orthomorphic), Rhumb lines (Loxodromes) are straight lines, extreme distortion at poles (Greenland appears size of Africa), universally used for Marine Navigation"
    ],
    learningObjective: "Compare projective geometric distortion across Conical vs Mercator projections and plot navigation loxodromes.",
    visualizationType: "contour_lab",
    interactiveMode: ["explore", "explain", "simulate", "compare"],
    mapWork: {
      required: true,
      category: "CLASS_XI_WORLD",
      items: ["Standard Parallel 45°N on Conic", "Mercator Equatorial belt", "Greenland distortion comparison"],
      itemsHindi: ["शंकु प्रक्षेप मानक अक्षांश 45° उ.", "मर्केटर भूमध्यरेखीय पेटी", "ग्रीनलैंड विरूपण तुलना"]
    },
    practicalRequirement: "Mathematical calculation and graphical drafting of Conic with one standard parallel.",
    syllabusStatus: "core_prescribed",
    examTips: "Why is Mercator's projection chosen for marine navigation charts? Any straight line drawn on it represents a line of constant compass bearing (Rhumb line / Loxodrome).",
    examTipsHindi: "नौवहन के लिए मर्केटर प्रक्षेप क्यों उपयुक्त है? क्योंकि इस पर खींची गई सीधी रेखा स्थिर दिक्सूचक कोण (एकदिश नौपथ) दर्शाती है।",
    targetLocation: { lat: 45.0, lng: 0.0, zoom: 3, name: "Conic Standard Parallel 45°N" },
    associatedLayers: ["tectonics"]
  },
  {
    id: "c11-prac-ch5",
    classGrade: "11",
    book: "Practical Work in Geography Part I",
    bookHindi: "भूगोल में प्रयोगात्मक कार्य भाग 1",
    unit: "Practical Skills",
    unitHindi: "प्रयोगात्मक कौशल",
    chapterNumber: 5,
    chapterTitle: "Topographical Maps & Contours",
    chapterTitleHindi: "स्थलाकृतिक मानचित्र एवं समोच्च रेखाएं",
    topic: "Survey of India Toposheets, Contour Patterns and Cross-Section Profiles",
    subtopics: [
      "Survey of India Toposheet Series: Million Sheets (1:1,000,000, 4°×4°), Degree Sheets (1:250,000, 1°×1°), Half-degree (1:100,000), Quadrant Sheets (1:50,000, 15'×15')",
      "Contour Lines: Imaginary lines connecting points of equal height above Mean Sea Level (MSL), Contour Interval (standard 20m in 1:50,000)",
      "Landform Contour Signatures:",
      "  - Gentle Slope (widely spaced contours) vs Steep Slope (closely spaced contours)",
      "  - Conical Hill (concentric circular contours with values increasing inward)",
      "  - Plateau (outer steep slope with flat wide central summit)",
      "  - V-shaped Valley (contours bend with 'V' pointing upstream toward higher elevation)",
      "  - Ridge / Spur ('V' pointing downstream toward lower elevation)",
      "  - Waterfall / Cliff (contours merge or touch each other)",
      "Conventional Signs and Symbols (Blue: Water, Green: Forest, Yellow: Agriculture, Red: Settlements & Roads, Brown: Contours)"
    ],
    learningObjective: "Interpret Survey of India toposheet conventional symbols and generate elevation profiles from contour intervals.",
    visualizationType: "contour_lab",
    interactiveMode: ["explore", "simulate", "compare", "quiz"],
    mapWork: {
      required: true,
      category: "CLASS_XI_INDIA",
      items: ["Survey of India Toposheet 1:50,000 conventional signs", "Dehradun Toposheet 53 J/3"],
      itemsHindi: ["भारतीय सर्वेक्षण विभाग रूढ़ चिह्न", "देहरादून टोपोशीट"]
    },
    practicalRequirement: "Drawing cross-section profile along a given line AB on a toposheet.",
    syllabusStatus: "core_prescribed",
    examTips: "Contour V-rule: When contours cross a river, they form a 'V' pointing UPSTREAM towards higher ground. For a spur, 'V' points downstream.",
    examTipsHindi: "समोच्च रेखाओं का V-नियम: नदी घाटी में समोच्च रेखा का 'V' मोड़ नदी के बहाव की विपरीत दिशा (उच्च भूमि) की ओर होता है।",
    targetLocation: { lat: 30.3165, lng: 78.0322, zoom: 8, name: "Dehradun Topographic Quadrangle" },
    associatedLayers: ["mountains", "rivers"]
  },

  // =========================================================================
  // CLASS XII - BOOK 1: FUNDAMENTALS OF HUMAN GEOGRAPHY
  // =========================================================================
  {
    id: "c12-hum-ch1",
    classGrade: "12",
    book: "Fundamentals of Human Geography",
    bookHindi: "मानव भूगोल के मूल सिद्धांत",
    unit: "Unit I: Human Geography",
    unitHindi: "इकाई I: मानव भूगोल",
    chapterNumber: 1,
    chapterTitle: "Human Geography: Nature & Scope",
    chapterTitleHindi: "मानव भूगोल: प्रकृति एवं विषय क्षेत्र",
    topic: "Environmental Determinism, Possibilism and Neo-Determinism",
    subtopics: [
      "Definitions: Ratzel ('Anthropogeographie'), Ellen Churchill Semple, Paul Vidal de la Blache",
      "Environmental Determinism (Naturalisation of Humans): Primitive humans subservient to nature's dictates",
      "Possibilism (Humanisation of Nature): Technology creates possibilities from nature (bridges, air conditioning)",
      "Neo-Determinism / 'Stop and Go Determinism' (Griffith Taylor): Traffic light analogy—humans can modify nature within limits without causing environmental breakdown",
      "Schools of Thought: Welfare/Humanistic School, Radical School (Marxian), Behavioural School"
    ],
    learningObjective: "Critique the continuum of human-environment interactions from determinism to sustainable neo-determinism.",
    visualizationType: "case_study",
    interactiveMode: ["explore", "explain", "compare"],
    mapWork: {
      required: false,
      items: [],
      itemsHindi: []
    },
    syllabusStatus: "core_prescribed",
    examTips: "Griffith Taylor's Neo-Determinism is crucial: neither is there a situation of absolute necessity (determinism) nor absolute freedom (possibilism).",
    examTipsHindi: "ग्रिफ़िथ टेलर का नवनिश्चयवाद (रुको और जाओ निश्चयवाद): प्रकृति के नियमों का पालन करके ही प्रकृति पर विजय प्राप्त की जा सकती है।",
    targetLocation: { lat: 28.6139, lng: 77.2090, zoom: 4, name: "Human Geography Concepts" },
    associatedLayers: ["minerals"]
  },
  {
    id: "c12-hum-ch2",
    classGrade: "12",
    book: "Fundamentals of Human Geography",
    bookHindi: "मानव भूगोल के मूल सिद्धांत",
    unit: "Unit II: People",
    unitHindi: "इकाई II: लोग",
    chapterNumber: 2,
    chapterTitle: "The World Population: Distribution, Density & Growth",
    chapterTitleHindi: "विश्व जनसंख्या: वितरण, घनत्व और वृद्धि",
    topic: "Population Density Patterns, Demographic Transition Theory and Migration",
    subtopics: [
      "Arithmetic Density = Total Population / Total Land Area (person/km²)",
      "Densely Populated Belts (>200 persons/km²): East Asia, South Asia, NW Europe, NE USA",
      "Sparsely Populated (<1 person/km²): Hot Deserts (Sahara), Cold Deserts (Tundra/Antarctica), High Mountains",
      "Factors Influencing Distribution: Geographical (Water, Relief, Climate, Soils), Economic (Minerals, Urbanisation, Industrialisation), Socio-Cultural",
      "Components of Population Change: Crude Birth Rate (CBR), Crude Death Rate (CDR), Migration (Push vs Pull factors)",
      "Demographic Transition Theory (3 Stages):",
      "  - Stage 1: High CBR, High CDR -> Slow growth (Agrarian, e.g. Bangladesh centuries ago)",
      "  - Stage 2: High CBR, Rapidly declining CDR -> Population explosion (Developing nations)",
      "  - Stage 3: Low CBR, Low CDR -> Stable or declining growth (Urbanised industrial nations, Japan, Germany)"
    ],
    learningObjective: "Simulate demographic transition trajectories across countries and map global high/low density clusters.",
    visualizationType: "thematic_choropleth",
    interactiveMode: ["explore", "explain", "simulate", "compare", "map_practice"],
    mapWork: {
      required: true,
      category: "CLASS_XII_WORLD",
      items: [
        "East Asia High Density Region", "South Asia High Density Region", "North-Western Europe High Density Region",
        "North-Eastern USA High Density Region", "Sahara Desert Sparsely Populated", "Siberian Cold Desert Sparsely Populated"
      ],
      itemsHindi: [
        "पूर्वी एशिया सघन जनसंख्या क्षेत्र", "दक्षिण एशिया सघन जनसंख्या क्षेत्र", "उत्तर-पश्चिमी यूरोप",
        "उत्तर-पूर्वी यूएसए", "सहारा मरुस्थल विरल क्षेत्र", "साइबेरियाई शीत मरुस्थल"
      ]
    },
    syllabusStatus: "core_prescribed",
    examTips: "Demographic transition diagram is a guaranteed question: draw the 3 stages showing CBR, CDR, and natural increase curves.",
    examTipsHindi: "जनांकिकीय संक्रमण सिद्धांत के तीनों चरणों का आरेख बनाकर जन्म दर, मृत्यु दर और जनसंख्या वृद्धि स्पष्ट करें।",
    targetLocation: { lat: 31.2304, lng: 121.4737, zoom: 4, name: "East Asian High Density Belt" },
    associatedLayers: ["climate"]
  },
  {
    id: "c12-hum-ch3",
    classGrade: "12",
    book: "Fundamentals of Human Geography",
    bookHindi: "मानव भूगोल के मूल सिद्धांत",
    unit: "Unit II: People",
    unitHindi: "इकाई II: लोग",
    chapterNumber: 3,
    chapterTitle: "Human Development",
    chapterTitleHindi: "मानव विकास",
    topic: "HDI Concept (Mahbub ul Haq & Amartya Sen), Four Pillars and Approaches",
    subtopics: [
      "Concept: Expansion of people's choices and improvement in their lives (freedom, capabilities)",
      "Pioneers: Dr. Mahbub ul Haq (created Human Development Index 1990) and Prof. Amartya Sen (Capability Approach)",
      "Four Pillars of Human Development: Equity, Sustainability, Productivity, Empowerment",
      "Four Approaches: Income Approach, Welfare Approach, Basic Needs Approach (ILO 6 basic needs: health, education, food, water, sanitation, housing), Capability Approach",
      "Measuring HDI: Composite geometric index (0 to 1) based on Health (Life Expectancy at birth), Education (Expected & Mean Years of Schooling), Decent Standard of Living (GNI per capita in PPP$)",
      "Global Ranking Categories: Very High (≥0.800), High (0.700-0.799), Medium (0.550-0.699), Low (<0.550)"
    ],
    learningObjective: "Compare HDI components globally and evaluate how social sector investment outperforms mere GDP growth.",
    visualizationType: "thematic_choropleth",
    interactiveMode: ["explore", "explain", "compare"],
    mapWork: {
      required: true,
      category: "CLASS_XII_WORLD",
      items: ["Norway (High HDI)", "Switzerland", "Niger (Low HDI)", "India (Medium HDI)"],
      itemsHindi: ["नॉर्वे (उच्च मानव विकास)", "स्विट्जरलैंड", "नाइजर (निम्न मानव विकास)", "भारत (मध्यम मानव विकास)"]
    },
    syllabusStatus: "core_prescribed",
    examTips: "Explain the four pillars of human development: Equity (equal access to opportunities), Sustainability (continuity in availability), Productivity (labor capability), Empowerment (power to make choices).",
    examTipsHindi: "मानव विकास के चार स्तंभ याद करें: समता, सतत पोषणीयता, उत्पादकता और सशक्तीकरण।",
    targetLocation: { lat: 60.4720, lng: 8.4689, zoom: 4, name: "Norway - High HDI Benchmark" },
    associatedLayers: ["climate"]
  },
  {
    id: "c12-hum-ch4",
    classGrade: "12",
    book: "Fundamentals of Human Geography",
    bookHindi: "मानव भूगोल के मूल सिद्धांत",
    unit: "Unit III: Human Activities",
    unitHindi: "इकाई III: मानव क्रियाएं",
    chapterNumber: 4,
    chapterTitle: "Primary Activities",
    chapterTitleHindi: "प्राथमिक क्रियाएं",
    topic: "Hunting-Gathering, Pastoralism, Agriculture Types and Mining",
    subtopics: [
      "Hunting & Gathering: Northern Canada, Northern Eurasia, Amazon basin, Kalahari Bushmen",
      "Pastoralism: Nomadic Herding (Transhumance: Gujjars, Bakarwals, Gaddis) vs Commercial Livestock Rearing (ranches, New Zealand, Australia, Argentina, USA)",
      "Agriculture Systems:",
      "  - Primitive Subsistence (Shifting / Slash-and-burn: Jhuming in NE India, Milpa in Central America, Ladang in Malaysia)",
      "  - Intensive Subsistence: Wet paddy dominant (high population density, manual labor) vs Crops other than paddy",
      "  - Plantation Agriculture: European colonial legacy, single cash crop (Tea in India/Sri Lanka, Coffee/Fazendas in Brazil, Rubber in Malaysia, Sugarcane in Cuba)",
      "  - Extensive Commercial Grain: Mid-latitude grasslands, highly mechanized, low per-hectare but high per-capita yield (Prairies, Pampas, Velds, Downs, Steppes)",
      "  - Dairy Farming: Urban proximate, high capital and labor (NW Europe, Canada, SE Australia)",
      "  - Mediterranean Agriculture: Viticulture (grapes for wine), citrus fruits, olive oil",
      "  - Market Gardening and Truck Farming (distance covered by truck overnight to urban markets)",
      "Mining: Surface (Open-cast) vs Underground (Shaft method)"
    ],
    learningObjective: "Map worldwide agricultural regions from shifting cultivation to commercial grain belts and dairy farming.",
    visualizationType: "2d_map",
    interactiveMode: ["explore", "explain", "compare", "map_practice"],
    mapWork: {
      required: true,
      category: "CLASS_XII_WORLD",
      items: [
        "Major Commercial Grain Farming Belts: Prairies, Pampas, Steppes, Downs, Velds",
        "Nomadic Herding Tundra Zone", "Commercial Dairy Region of NW Europe"
      ],
      itemsHindi: [
        "विस्तृत वाणिज्यिक अनाज कृषि: प्रेयरी, पंपास, स्टेपीज, डाउन्स, वेल्ड्स",
        "चलवासी पशुचारण क्षेत्र", "उत्तर-पश्चिमी यूरोप डेयरी कृषि"
      ]
    },
    syllabusStatus: "core_prescribed",
    examTips: "Compulsory map question: Locate the world's temperate grasslands (Prairies in North America, Pampas in Argentina, Steppes in Eurasia, Downs in Australia).",
    examTipsHindi: "विश्व के शीतोष्ण घास के मैदानों को मानचित्र पर अंकित करें: प्रेयरी, पंपास, स्टेपी, वेल्ड और डाउन्स।",
    targetLocation: { lat: 50.0, lng: -105.0, zoom: 4, name: "North American Prairies Grain Belt" },
    associatedLayers: ["soils"]
  },
  {
    id: "c12-hum-ch5",
    classGrade: "12",
    book: "Fundamentals of Human Geography",
    bookHindi: "मानव भूगोल के मूल सिद्धांत",
    unit: "Unit III: Human Activities",
    unitHindi: "इकाई III: मानव क्रियाएं",
    chapterNumber: 5,
    chapterTitle: "Secondary Activities",
    chapterTitleHindi: "द्वितीयक क्रियाएं",
    topic: "Manufacturing Classifications, Industrial Location Factors and High-Tech Parks",
    subtopics: [
      "Manufacturing: Adding value to raw materials by transforming them into finished goods",
      "Factors Governing Industrial Location: Access to Raw Materials, Energy, Market, Labor Supply, Transportation, Government Policy, Agglomeration Economies",
      "Classification of Industries:",
      "  - By Size: Cottage/Household, Small Scale, Large Scale",
      "  - By Inputs/Raw Material: Agro-based, Mineral-based (Metallic & Non-metallic), Chemical-based, Forest-based, Animal-based",
      "  - By Output: Basic Industries (Iron & Steel) vs Consumer Goods",
      "  - By Ownership: Public Sector, Private Sector, Joint Sector",
      "Footloose Industries: Can be located in a wide variety of places, not dependent on any specific raw material, rely on component parts and road transport",
      "Traditional Large-Scale Industrial Regions: Ruhr Basin (Germany) 'Rust Bowl' transition",
      "High Technology Industry (Technopoles & Silicon Valleys: Silicon Valley in San Francisco, Silicon Forest, Bengaluru)"
    ],
    learningObjective: "Evaluate industrial location optimization using Weber's least-cost theory and contrast footloose vs heavy industries.",
    visualizationType: "case_study",
    interactiveMode: ["explore", "explain", "simulate"],
    mapWork: {
      required: true,
      category: "CLASS_XII_WORLD",
      items: ["Ruhr Industrial Region (Germany)", "Silicon Valley (California)", "Great Lakes Manufacturing Belt"],
      itemsHindi: ["रूर औद्योगिक प्रदेश (जर्मनी)", "सिलिकॉन वैली (कैलिफ़ोर्निया)", "महान झील औद्योगिक प्रदेश"]
    },
    syllabusStatus: "core_prescribed",
    examTips: "What are 'Footloose Industries'? Industries that can be set up anywhere because their raw materials and products are light and non-weight-losing.",
    examTipsHindi: "'स्वच्छंद उद्योग' (Footloose Industries) क्या हैं? जो किसी विशिष्ट कच्चे माल पर निर्भर नहीं होते और प्रदूषण रहित होते हैं।",
    targetLocation: { lat: 51.4556, lng: 7.0116, zoom: 6, name: "Ruhr Industrial Region Germany" },
    associatedLayers: ["minerals"]
  },
  {
    id: "c12-hum-ch6",
    classGrade: "12",
    book: "Fundamentals of Human Geography",
    bookHindi: "मानव भूगोल के मूल सिद्धांत",
    unit: "Unit III: Human Activities",
    unitHindi: "इकाई III: मानव क्रियाएं",
    chapterNumber: 6,
    chapterTitle: "Tertiary and Quaternary Activities",
    chapterTitleHindi: "तृतीयक और चतुर्थ क्रियाकलाप",
    topic: "Services, Trade & Commerce, Tourism, Quaternary R&D, BPO and Digital Divide",
    subtopics: [
      "Tertiary Activities: Production of specialized services rather than tangible goods (Teachers, Doctors, Lawyers, Plumbers)",
      "Trade & Commerce: Retail Trading (Fixed stores, consumer cooperatives) vs Wholesale Trading; Periodic Markets in rural areas",
      "Transport & Communication: Nodes and Links, Isochrone lines (lines joining places equal in terms of time taken to reach them)",
      "Tourism: Largest tertiary activity; Factors: Demand (higher living standards) and Transport infrastructure; Tourist Attractions: Climate, Landscape, History & Art, Culture",
      "Quaternary Activities: Knowledge-oriented services, research, information collection, data analysis, specialized software developers ('White collar' jobs)",
      "Quinary Activities: Highest-level decision makers, policy architects, government executives, top scientists ('Gold collar' jobs)",
      "Business Process Outsourcing (BPO) and Knowledge Process Outsourcing (KPO) to India and Philippines (cost arbitrage, skilled English manpower)",
      "The Digital Divide: Imbalance in telecommunications and ICT access between developed and developing worlds, and rural vs urban areas"
    ],
    learningObjective: "Differentiate between service hierarchies from retail tertiary to elite quinary decision-making.",
    visualizationType: "case_study",
    interactiveMode: ["explore", "explain", "compare"],
    mapWork: {
      required: false,
      items: [],
      itemsHindi: []
    },
    syllabusStatus: "core_prescribed",
    examTips: "Distinguish between Quaternary ('White collar', research & information) and Quinary ('Gold collar', top policy and decision making).",
    examTipsHindi: "चतुर्थक (अनुसंधान, ज्ञान आधारित) और पंचमक (सर्वोच्च नीति निर्माता, गोल्ड कॉलर) क्रियाकलापों का अंतर स्पष्ट करें।",
    targetLocation: { lat: 12.9716, lng: 77.5946, zoom: 6, name: "Bengaluru Tech & BPO Hub" },
    associatedLayers: ["ports"]
  },
  {
    id: "c12-hum-ch7",
    classGrade: "12",
    book: "Fundamentals of Human Geography",
    bookHindi: "मानव भूगोल के मूल सिद्धांत",
    unit: "Unit III: Human Activities",
    unitHindi: "इकाई III: मानव क्रियाएं",
    chapterNumber: 7,
    chapterTitle: "Transport and Communication",
    chapterTitleHindi: "परिवहन एवं संचार",
    topic: "Trans-Continental Railways, Major Sea Routes, Canals and Pipelines",
    subtopics: [
      "Trans-Continental Railways:",
      "  - Trans-Siberian Railway: St. Petersburg (west) to Vladivostok (Pacific coast), 9,332 km, world's longest, electrified double-track across Urals and Ob-Yenisey",
      "  - Trans-Canadian Railway: Halifax to Vancouver, 7,050 km, economic artery of Canada carrying wheat and meat",
      "  - Australian Trans-Continental Railway: Sydney (east) to Perth (west) across Nullarbor Plain",
      "Major Ocean Waterways:",
      "  - North Atlantic Sea Route: Connects NE USA and NW Europe ('Big Trunk Route', handles 1/4th of world's maritime trade)",
      "  - Mediterranean-Asiatic (Suez) Route: Connects Europe with Asia and Australasia",
      "  - Cape of Good Hope Route: High-tonnage alternative around southern tip of Africa",
      "Important Shipping Canals:",
      "  - Suez Canal (Opened 1869, 160 km, Mediterranean Sea to Red Sea, sea-level canal without locks, shortened Liverpool to Mumbai by 7,200 km)",
      "  - Panama Canal (Opened 1914, 72 km, Atlantic to Pacific across Isthmus of Panama, 6-lock system lifting ships 26m over Gatun Lake, shortened NY to San Francisco by 13,000 km)",
      "Inland Waterways: Rhine Waterway (busiest in Europe), St. Lawrence Seaway (Great Lakes commercial waterway), Danube, Volga, Mississippi",
      "Pipelines: Liquid and gas transport; 'Big Inch' oil pipeline from Gulf of Mexico to NE USA"
    ],
    learningObjective: "Trace trans-continental rail arteries and navigate inter-oceanic canal chokepoints on the 3D globe.",
    visualizationType: "flow_animation",
    interactiveMode: ["explore", "explain", "simulate", "map_practice"],
    mapWork: {
      required: true,
      category: "CLASS_XII_WORLD",
      items: [
        "Trans-Siberian Railway (St. Petersburg to Vladivostok)",
        "Trans-Canadian Railway (Halifax to Vancouver)",
        "Australian Trans-Continental Railway (Perth to Sydney)",
        "Suez Canal (Port Said and Port Tewfik)",
        "Panama Canal (Colon and Panama City)",
        "North Atlantic Ocean Sea Route ('Big Trunk Route')",
        "Cape of Good Hope Route"
      ],
      itemsHindi: [
        "ट्रांस-साइबेरियन रेलमार्ग (सेंट पीटर्सबर्ग से व्लादिवोस्तोक)",
        "ट्रांस-कनाडियन रेलमार्ग (हैलिफ़ैक्स से वैंकूवर)",
        "ऑस्ट्रेलियाई ट्रांस-कॉन्टिनेंटल रेलमार्ग (पर्थ से सिडनी)",
        "स्वेज नहर (पोर्ट सईद और पोर्ट स्वेज)",
        "पनामा नहर (कोलोन और पनामा सिटी)",
        "उत्तरी अटलांटिक समुद्री मार्ग ('बिग ट्रंक रूट')",
        "केप ऑफ गुड होप मार्ग"
      ]
    },
    syllabusStatus: "core_prescribed",
    examTips: "Suez Canal vs Panama Canal comparison: Suez has no locks (sea level) connecting Mediterranean and Red Sea; Panama uses a 3-tier lock system across Gatun Lake.",
    examTipsHindi: "स्वेज नहर (बिना लॉक, समुद्र तल, 1869) और पनामा नहर (6 लॉक प्रणाली, 1914) का तुलनात्मक विश्लेषण याद करें।",
    targetLocation: { lat: 30.5852, lng: 32.2654, zoom: 6, name: "Suez Canal Global Chokepoint" },
    associatedLayers: ["ports"]
  },
  {
    id: "c12-hum-ch8",
    classGrade: "12",
    book: "Fundamentals of Human Geography",
    bookHindi: "मानव भूगोल के मूल सिद्धांत",
    unit: "Unit IV: International Trade",
    unitHindi: "इकाई IV: अंतर्राष्ट्रीय व्यापार",
    chapterNumber: 8,
    chapterTitle: "International Trade",
    chapterTitleHindi: "अंतर्राष्ट्रीय व्यापार",
    topic: "Bilateral vs Multilateral Trade, Balance of Trade, Ports as Gateways",
    subtopics: [
      "Basis of International Trade: Difference in National Resources (Geology, Mineral, Climate), Population Factors (Cultural diversity, Size), Economic Development, Foreign Investment, Transport",
      "Important Aspects of International Trade: Volume, Composition, and Direction of Trade",
      "Balance of Trade: Favourable (Exports > Imports) vs Unfavourable / Deficit (Imports > Exports)",
      "Types of International Trade: Bilateral (between 2 countries) vs Multilateral (between multiple countries)",
      "Free Trade and Dumping: Selling commodity abroad below domestic cost of production",
      "World Trade Organisation (WTO, formed 1 Jan 1995 replacing GATT, Geneva HQ)",
      "Major Regional Trade Blocs: EU, NAFTA/USMCA, ASEAN, SAFTA, MERCOSUR, OPEC",
      "Ports as Gateways of International Trade: Cargo handling facilities, Hinterland connectivity",
      "Types of Ports according to cargo handled: Industrial Ports (bulk cargo, ores, oil), Commercial Ports (general manufactured cargo), Comprehensive Ports",
      "Types of Ports according to location: Inland Ports (Kolkata on Hooghly river, Duisburg on Rhine, Manchester) vs Outports (Haldia for Kolkata, Piraeus for Athens)"
    ],
    learningObjective: "Map international trade flows and classify maritime gateway ports by cargo specialization.",
    visualizationType: "flow_animation",
    interactiveMode: ["explore", "explain", "compare", "map_practice"],
    mapWork: {
      required: true,
      category: "CLASS_XII_WORLD",
      items: [
        "Major Inland Port: Kolkata Port", "Major Outport: Haldia Port",
        "Major Oil Port: Maracaibo (Venezuela)", "Port of Call: Honolulu", "Entrepot Port: Singapore", "Naval Port: Kochi"
      ],
      itemsHindi: [
        "प्रमुख आंतरिक पत्तन: कोलकाता पत्तन", "बाह्य पत्तन: हल्दिया पत्तन",
        "तेल पत्तन: माराकाइबो", "मार्ग पत्तन: होनोलूलू", "आंत्रपो पत्तन: सिंगापुर", "नौसेना पत्तन: कोच्चि"
      ]
    },
    syllabusStatus: "core_prescribed",
    examTips: "Define Entrepot Ports: Collection centers where goods are brought from different countries for re-export (e.g. Singapore, Rotterdam).",
    examTipsHindi: "आंत्रपो पत्तन (Entrepot Ports): वे पत्तन जहां विभिन्न देशों से वस्तुएं पुनर्नियात के लिए एकत्र की जाती हैं (उदा. सिंगापुर)।",
    targetLocation: { lat: 1.3521, lng: 103.8198, zoom: 6, name: "Singapore Entrepot Port" },
    associatedLayers: ["ports"]
  },

  // =========================================================================
  // CLASS XII - BOOK 2: INDIA: PEOPLE AND ECONOMY
  // =========================================================================
  {
    id: "c12-ind-ch1",
    classGrade: "12",
    book: "India: People and Economy",
    bookHindi: "भारत: लोग और अर्थव्यवस्था",
    unit: "Unit I: People",
    unitHindi: "इकाई I: लोग",
    chapterNumber: 1,
    chapterTitle: "Population: Distribution, Density, Growth & Composition",
    chapterTitleHindi: "जनसंख्या: वितरण, घनत्व, वृद्धि एवं संघटन",
    topic: "2011 Census Statistics, Density Ranking, Four Growth Phases and Occupational Structure",
    subtopics: [
      "Distribution: UP most populous (16.5% of India), followed by Maharashtra, Bihar, West Bengal",
      "Density of Population (2011 Census: 382 persons/km²): Highest state Bihar (1,106), lowest Arunachal Pradesh (17); Highest UT Delhi (11,320)",
      "Physiological Density = Total Population / Net Cultivated Area",
      "Agricultural Density = Total Agricultural Population / Net Cultivated Area",
      "Four Distinct Phases of Population Growth:",
      "  - Phase I (1901-1921): Stagnant/Stationary growth (High birth & high death rate; 1921 'Year of the Great Divide' with negative growth -0.31%)",
      "  - Phase II (1921-1951): Steady growth (Mortality decline due to sanitation and epidemic control)",
      "  - Phase III (1951-1981): Population Explosion (Mortality dropped sharply, fertility remained high; growth rate over 2.2% annually)",
      "  - Phase IV (1981-2011): High growth with definite signs of slowing down (Declining birth rates, increased literacy)",
      "Linguistic Composition: Indo-Aryan (73%), Dravidian (20%), Austroasiatic / Nishada (1.38%), Sino-Tibetan / Kirata (0.85%)",
      "Religious Composition: Hindus (79.8%), Muslims (14.2%), Christians (2.3%), Sikhs (1.7%), Buddhists (0.7%), Jains (0.4%)",
      "Occupational Structure: Main Workers (>183 days/yr), Marginal Workers (<183 days), Non-workers; Primary sector still occupies ~54.6% workforce"
    ],
    learningObjective: "Visualize state-wise population density choropleth maps and calculate physiological density ratios.",
    visualizationType: "thematic_choropleth",
    interactiveMode: ["explore", "explain", "simulate", "map_practice"],
    mapWork: {
      required: true,
      category: "CLASS_XII_INDIA",
      items: [
        "State with Highest Population Density: Bihar (1,106 persons/km²)",
        "State with Lowest Population Density: Arunachal Pradesh (17 persons/km²)",
        "State with Highest Total Population: Uttar Pradesh"
      ],
      itemsHindi: [
        "सर्वाधिक जनसंख्या घनत्व वाला राज्य: बिहार (1,106)",
        "न्यूनतम जनसंख्या घनत्व वाला राज्य: अरुणाचल प्रदेश (17)",
        "सर्वाधिक जनसंख्या वाला राज्य: उत्तर प्रदेश"
      ]
    },
    syllabusStatus: "core_prescribed",
    examTips: "Guaranteed Board Question: Name the state with highest (Bihar) and lowest (Arunachal Pradesh) population density in India as per 2011 Census.",
    examTipsHindi: "2011 की जनगणना अनुसार सर्वाधिक जनसंख्या घनत्व वाला राज्य (बिहार) और न्यूनतम वाला राज्य (अरुणाचल प्रदेश) याद रखें।",
    targetLocation: { lat: 25.6, lng: 85.1, zoom: 6, name: "Bihar - Highest Population Density" },
    associatedLayers: ["climate"]
  },
  {
    id: "c12-ind-ch2",
    classGrade: "12",
    book: "India: People and Economy",
    bookHindi: "भारत: लोग और अर्थव्यवस्था",
    unit: "Unit II: Human Settlements",
    unitHindi: "इकाई II: मानव बस्तियां",
    chapterNumber: 2,
    chapterTitle: "Human Settlements",
    chapterTitleHindi: "मानव बस्तियां",
    topic: "Rural Settlement Types and Functional Classification of Indian Towns",
    subtopics: [
      "Types of Rural Settlements in India:",
      "  1. Clustered / Agglomerated / Nucleated (Compact living, fertile alluvium of Northern Plains, security in Bundelkhand & Nagaland)",
      "  2. Semi-clustered / Fragmented (Social segregation, landlord caste dominates core, lower castes live on fringes; Gujarat plains)",
      "  3. Hamleted (Fragmented into units called Panna, Para, Palli, Nagla, Dhani; middle/lower Ganga plain)",
      "  4. Dispersed / Isolated (Isolated huts/dhanis in remote hills and forests; Meghalaya, Uttarakhand, Himachal Pradesh, Kerala)",
      "Urban Settlements & Evolution: Ancient Towns (>2000 yrs: Varanasi, Prayagraj, Madurai), Medieval Towns (Headquarters of kingdoms: Delhi, Hyderabad, Agra, Jaipur, Lucknow), Modern Towns (British ports & cantonments: Mumbai, Kolkata, Chennai, Goa)",
      "Functional Classification of Towns:",
      "  - Administrative Towns: New Delhi, Chandigarh, Gandhinagar, Bhopal",
      "  - Industrial Towns: Jamshedpur, Bhilai, Durgapur, Bokaro",
      "  - Transport Cities & Ports: Kandla, Visakhapatnam, Kochi, Mughal Sarai railway junction",
      "  - Commercial Towns: Mumbai, Kolkata, Saharanpur",
      "  - Mining Towns: Raniganj, Jharia, Ankleshwar, Digboi, Singrauli",
      "  - Garrison / Cantonment Towns: Ambala, Jalandhar, Babina, Mhow",
      "  - Educational Towns: Roorkee, Varanasi, Aligarh, Pilani, Kota",
      "  - Religious and Cultural Towns: Varanasi, Ayodhya, Haridwar, Tirupati, Puri, Amritsar, Pushkar",
      "  - Tourist Towns: Shimla, Mussoorie, Nainital, Ooty, Mount Abu"
    ],
    learningObjective: "Classify Indian towns by functional specialization and analyze rural settlement morphological patterns.",
    visualizationType: "2d_map",
    interactiveMode: ["explore", "explain", "compare", "map_practice"],
    mapWork: {
      required: true,
      category: "CLASS_XII_INDIA",
      items: [
        "Administrative Town: New Delhi / Chandigarh",
        "Industrial Town: Jamshedpur / Bhilai",
        "Mining Town: Jharia / Digboi",
        "Religious & Cultural Town: Varanasi / Amritsar"
      ],
      itemsHindi: [
        "प्रशासनिक नगर: नई दिल्ली / चंडीगढ़",
        "औद्योगिक नगर: जमशेदपुर / भिलाई",
        "खनन नगर: झरिया / डिगबोई",
        "धार्मिक एवं सांस्कृतिक नगर: वाराणसी / अमृतसर"
      ]
    },
    syllabusStatus: "core_prescribed",
    examTips: "Match the following question in CBSE 12: Jamshedpur (Industrial), Chandigarh (Administrative), Jharia (Mining), Varanasi (Religious).",
    examTipsHindi: "नगरों का प्रकार्यात्मक वर्गीकरण: जमशेदपुर (औद्योगिक), चंडीगढ़ (प्रशासनिक), झरिया (खनन), वाराणसी (धार्मिक)।",
    targetLocation: { lat: 22.8046, lng: 86.2029, zoom: 7, name: "Jamshedpur Industrial Steel City" },
    associatedLayers: ["minerals", "ports"]
  },
  {
    id: "c12-ind-ch3",
    classGrade: "12",
    book: "India: People and Economy",
    bookHindi: "भारत: लोग और अर्थव्यवस्था",
    unit: "Unit III: Resources and Development",
    unitHindi: "इकाई III: संसाधन एवं विकास",
    chapterNumber: 3,
    chapterTitle: "Land Resources and Agriculture",
    chapterTitleHindi: "भू-संसाधन तथा कृषि",
    topic: "Land Use Categories, Three Cropping Seasons and Major Food & Cash Crops",
    subtopics: [
      "Nine Land-Use Records Categories: Forests, Barren/Wasteland, Non-agricultural uses, Permanent pastures, Miscellaneous tree crops, Culturable wasteland, Current fallow (<1 yr), Fallow other than current (1-5 yrs), Net Sown Area (NSA ~45.5%)",
      "Three Cropping Seasons in India:",
      "  - Kharif (June-Sept, SW monsoon): Rice, Cotton, Jute, Jowar, Bajra, Maize",
      "  - Rabi (Oct-March, winter): Wheat, Gram, Mustard, Barley",
      "  - Zaid (April-June, summer): Watermelons, Cucumbers, Vegetables, Fodder",
      "Major Foodgrains & Cash Crops (Climatic requirements and Leading producing states):",
      "  - Rice: Tropical crop, 20-30°C, >100cm rainfall, alluvial clay; Leading: West Bengal, UP, Punjab",
      "  - Wheat: Temperate crop, 10-15°C at sowing, 21-26°C at harvest, 50-75cm rain; Leading: UP, MP, Punjab",
      "  - Cotton: Tropical/subtropical, 21-30°C, 210 frost-free days, black soil; Leading: Gujarat, Maharashtra, Telangana",
      "  - Jute: Golden fiber, high temperature, >150cm rain, flood alluvium; Leading: West Bengal (80%), Bihar, Assam",
      "  - Sugarcane: Hot humid climate, 21-27°C, 75-100cm rain; Leading: Uttar Pradesh, Maharashtra, Karnataka",
      "  - Tea: Tropical beverage, 20-30°C, >150cm well-distributed rain, well-drained acidic soil on hill slopes; Leading: Assam (Surma & Brahmaputra valleys), West Bengal (Darjeeling)",
      "  - Coffee: Arabica & Robusta, 15-28°C, 150-200cm rain on shaded slopes; Leading: Karnataka (Nilgiri & Baba Budan Hills ~70%), Kerala, Tamil Nadu"
    ],
    learningObjective: "Synthesize crop agro-climatic boundaries and plot leading Indian states for wheat, rice, cotton, tea, and jute.",
    visualizationType: "thematic_choropleth",
    interactiveMode: ["explore", "explain", "compare", "map_practice"],
    mapWork: {
      required: true,
      category: "CLASS_XII_INDIA",
      items: [
        "Leading Rice State: West Bengal", "Leading Wheat State: Uttar Pradesh",
        "Leading Cotton State: Gujarat", "Leading Jute State: West Bengal",
        "Leading Sugarcane State: Uttar Pradesh", "Leading Tea State: Assam", "Leading Coffee State: Karnataka"
      ],
      itemsHindi: [
        "चावल का प्रमुख उत्पादक राज्य: पश्चिम बंगाल", "गेहूं का प्रमुख उत्पादक: उत्तर प्रदेश",
        "कपास का प्रमुख उत्पादक: गुजरात", "जूट का प्रमुख उत्पादक: पश्चिम बंगाल",
        "गन्ना का प्रमुख उत्पादक: उत्तर प्रदेश", "चाय का प्रमुख उत्पादक: असम", "कॉफ़ी का प्रमुख उत्पादक: कर्नाटक"
      ]
    },
    syllabusStatus: "core_prescribed",
    examTips: "Compulsory CBSE 12 map question: Locate the largest producing states of Rice (WB), Wheat (UP), Cotton (Gujarat), and Tea (Assam).",
    examTipsHindi: "मानचित्र में प्रमुख उत्पादक राज्य अंकित करें: चावल (प. बंगाल), गेहूं (उ. प्र.), कपास (गुजरात), चाय (असम)।",
    targetLocation: { lat: 26.5, lng: 93.5, zoom: 6, name: "Assam Tea Plantations" },
    associatedLayers: ["soils"]
  },
  {
    id: "c12-ind-ch4",
    classGrade: "12",
    book: "India: People and Economy",
    bookHindi: "भारत: लोग और अर्थव्यवस्था",
    unit: "Unit III: Resources and Development",
    unitHindi: "इकाई III: संसाधन एवं विकास",
    chapterNumber: 4,
    chapterTitle: "Water Resources",
    chapterTitleHindi: "जल संसाधन",
    topic: "Surface vs Groundwater, Irrigation Demand, River Basin Degradation and Watershed Management",
    subtopics: [
      "Water Availability: India has 4% of world's freshwater but supports 17.5% of world's population; Total annual precipitation ~4,000 billion m³",
      "Surface Water: Ganga and Brahmaputra basins account for 60% of total surface water; Lagoons & backwaters (Kayals) in Kerala, Odisha, WB",
      "Groundwater Resources: High development (>85%) in Punjab, Haryana, Rajasthan, Tamil Nadu causing water table depletion, fluoride and arsenic contamination",
      "Irrigation Demands: Agriculture consumes 89% surface water and 92% groundwater; Need for irrigation due to spatial-temporal monsoon variability",
      "Watershed Management Programmes: Haryali (Central Gov), Neeru-Meeru (AP), Arvary Pani Sansad (Alwar, Rajasthan)",
      "Rainwater Harvesting: Mandatory rooftop harvesting in Tamil Nadu; Traditional: Johads, Tankas, Baolis"
    ],
    learningObjective: "Map groundwater over-exploitation zones and analyze community watershed conservation models.",
    visualizationType: "case_study",
    interactiveMode: ["explore", "explain", "compare"],
    mapWork: {
      required: true,
      category: "CLASS_XII_INDIA",
      items: ["Over-exploited Groundwater States: Punjab & Haryana", "Rainwater Harvesting Model: Alwar (Arvary Pani Sansad)"],
      itemsHindi: ["अति-शोषित भूजल राज्य: पंजाब व हरियाणा", "जल संचयन मॉडल: अलवर"]
    },
    syllabusStatus: "core_prescribed",
    examTips: "Describe the success of 'Arvary Pani Sansad' in Alwar, Rajasthan, where local community built check dams (Johads) and revived dried riverbeds.",
    examTipsHindi: "अलवर (राजस्थान) में 'अरवरी पानी संसद' के अंतर्गत चेक डैम (जोहड़) बनाकर सूखे नदी नालों को पुनर्जीवित करने का उदाहरण दें।",
    targetLocation: { lat: 27.5530, lng: 76.6346, zoom: 7, name: "Alwar Watershed Conservation" },
    associatedLayers: ["rivers"]
  },
  {
    id: "c12-ind-ch5",
    classGrade: "12",
    book: "India: People and Economy",
    bookHindi: "भारत: लोग और अर्थव्यवस्था",
    unit: "Unit III: Resources and Development",
    unitHindi: "इकाई III: संसाधन एवं विकास",
    chapterNumber: 5,
    chapterTitle: "Mineral and Energy Resources",
    chapterTitleHindi: "खनिज तथा ऊर्जा संसाधन",
    topic: "Metallic & Non-Metallic Minerals, Gondwana Coalfields, Petroleum Basins and Nuclear Stations",
    subtopics: [
      "Mineral Belts of India: North-Eastern Plateau (Chota Nagpur: Iron, Coal, Bauxite, Manganese), South-Western Plateau (Karnataka, Goa, Tamil Nadu: Iron, Bauxite), North-Western (Aravallis Rajasthan & Gujarat: Copper, Zinc, Petroleum)",
      "Iron Ore (Haematite & Magnetite):",
      "  - Odisha-Jharkhand Belt: Mayurbhanj (Gurumahisani, Badampahar) and Kendujhar",
      "  - Durg-Bastar-Chandrapur Belt: Bailadila in Bastar, Chhattisgarh (very high-grade haematite exported via Vizag to Japan)",
      "  - Ballari-Chitradurga-Chikkamagaluru-Tumakuru Belt: Kudremukh deposits in Karnataka (100% export, slurry pipeline to Mangaluru)",
      "  - Maharashtra-Goa Belt: Ratnagiri and Marmagao port exports",
      "Bauxite (Aluminium ore): Amarkantak plateau, Maikal hills, Koraput (Odisha is largest producer Panchpatmali deposits)",
      "Copper: Khetri mines (Rajasthan), Balaghat (MP), Singhbhum (Jharkhand)",
      "Manganese: Odisha, Karnataka, MP (Balaghat), Maharashtra (Nagpur-Bhandara)",
      "Coal (Fossil Fuel):",
      "  - Gondwana Coalfields (200 million yrs old, metallurgical coking coal, Damodar valley): Raniganj (WB, oldest mine 1774), Jharia (Jharkhand, largest coking coal), Bokaro, Singrauli (MP), Talcher (Odisha)",
      "  - Tertiary Coal (55 million yrs old): Assam, Meghalaya, Arunachal; Lignite brown coal in Neyveli (Tamil Nadu)",
      "Petroleum (Mineral Oil):",
      "  - Assam: Digboi (oldest oilfield in India, 1889), Naharkatiya, Moran-Hugrijan",
      "  - Gujarat: Ankleshwar (Cambay basin), Kalol, Mehsana",
      "  - Offshore: Mumbai High (discovered 1974, 'Sagar Samrat' platform, 160km offshore), Bassein",
      "Nuclear Power Stations: Narora (UP), Rawatbhata (Rajasthan), Tarapur (Maharashtra, oldest 1969), Kakrapar (Gujarat), Kaiga (Karnataka), Kalpakkam (Tamil Nadu), Kudankulam (TN)"
    ],
    learningObjective: "Locate prescribed CBSE Board mineral mines, coalfields, oilfields, and atomic power stations.",
    visualizationType: "2d_map",
    interactiveMode: ["explore", "explain", "compare", "map_practice", "quiz"],
    mapWork: {
      required: true,
      category: "CLASS_XII_INDIA",
      items: [
        "Iron Ore Mines: Mayurbhanj, Bailadila, Ratnagiri, Bellary",
        "Bauxite Mines: Katni, Bilaspur, Koraput",
        "Copper Mines: Hazaribagh, Singhbhum, Khetri",
        "Coal Mines: Raniganj, Jharia, Bokaro, Neyveli",
        "Oil Fields: Digboi, Naharkatiya, Mumbai High, Bassien, Ankleshwar",
        "Nuclear Power Stations: Narora, Rawatbhata, Tarapur, Kaiga, Kalpakkam"
      ],
      itemsHindi: [
        "लौह अयस्क खदानें: मयूरभंज, बैलाडीला, रत्नागिरि, बेल्लारी",
        "बॉक्साइट खदानें: कटनी, बिलासपुर, कोरापुट",
        "तांबा खदानें: हज़ारीबाग, सिंहभूम, खेतड़ी",
        "कोयला खदानें: रानीगंज, झरिया, बोकारो, नेवेली (लिग्नाइट)",
        "तेल क्षेत्र: डिगबोई, नहरकटिया, मुंबई हाई, बेसिन, अंकलेश्वर",
        "परमाणु ऊर्जा संयंत्र: नरोरा, रावतभाटा, तारापुर, कैगा, कलपक्कम"
      ]
    },
    syllabusStatus: "board_evaluated",
    examTips: "Guaranteed 5-mark map pointing questions in CBSE 12: Bailadila iron mine (Chhattisgarh), Jharia coalfield (Jharkhand), Digboi oilfield (Assam), and Narora atomic power station (UP).",
    examTipsHindi: "बोर्ड परीक्षा के अनिवार्य मानचित्र बिंदु: बैलाडीला (लौह अयस्क, छत्तीसगढ़), झरिया (कोयला, झारखंड), डिगबोई (तेल, असम), नरोरा (परमाणु ऊर्जा, उ. प्र.)।",
    targetLocation: { lat: 18.6667, lng: 81.2500, zoom: 7, name: "Bailadila Iron Ore Belt" },
    associatedLayers: ["minerals"]
  },
  {
    id: "c12-ind-ch6",
    classGrade: "12",
    book: "India: People and Economy",
    bookHindi: "भारत: लोग और अर्थव्यवस्था",
    unit: "Unit III: Resources and Development",
    unitHindi: "इकाई III: संसाधन एवं विकास",
    chapterNumber: 6,
    chapterTitle: "Planning and Sustainable Development",
    chapterTitleHindi: "नियोजन एवं सततपोषणीय विकास",
    topic: "Target Area Planning, Bharmaur ITDP Case Study and Indira Gandhi Canal",
    subtopics: [
      "Approaches to Planning: Sectoral Planning vs Target Area / Target Group Planning (Drought Prone Area Programme, Hill Area Development Programme)",
      "Case Study 1: Integrated Tribal Development Project (ITDP) in Bharmaur Region (Chamba, Himachal Pradesh):",
      "  - Gaddis tribal community practicing transhumance, remote mountainous isolation, harsh climate",
      "  - Development Interventions: Transport connectivity, schools, healthcare, potable water, electricity",
      "  - Social Outcomes: Female literacy jumped from 1.88% in 1971 to 65% in 2011; Decline in gender gap and sex ratio improvement",
      "Case Study 2: Indira Gandhi Canal (Nahar) Command Area (Rajasthan):",
      "  - Originates at Harike Barrage (Punjab) at confluence of Satluj and Beas rivers",
      "  - Stage I (Ganganagar, Hanumangarh, Bikaner) and Stage II (Jaisalmer, Barmer, Jodhpur)",
      "  - Positive Ecological & Economic Impact: Afforestation, pasture development, greening of desert, wheat and cotton cultivation",
      "  - Negative Environmental Consequences: Waterlogging, soil salinisation (Kallar/Reh), canal siltation",
      "  - Measures for Sustainable Development: Strict water management, pasture development, shelterbelts, lining of watercourses"
    ],
    learningObjective: "Evaluate regional development interventions and contrast tribal upliftment with canal-induced salinization.",
    visualizationType: "case_study",
    interactiveMode: ["explore", "explain", "compare", "case_study"],
    mapWork: {
      required: true,
      category: "CLASS_XII_INDIA",
      items: ["Bharmaur Tribal Area (Himachal Pradesh)", "Indira Gandhi Canal Command Area (Rajasthan)", "Harike Barrage"],
      itemsHindi: ["भरमौर जनजातीय क्षेत्र (हिमाचल प्रदेश)", "इंदिरा गांधी नहर कमान क्षेत्र (राजस्थान)", "हरिके बैराज"]
    },
    syllabusStatus: "core_prescribed",
    examTips: "Sustainable development measures for Indira Gandhi Canal: lining of channels, pasture development, shelterbelt plantation, and promoting crops with low water requirements (gram, bajra).",
    examTipsHindi: "इंदिरा गांधी नहर क्षेत्र में सतत विकास के उपाय: जल वाहिकाओं को पक्का करना, चरागाह विकास, रक्षक मेखलाएं और कम जल वाली फसलें।",
    targetLocation: { lat: 27.5, lng: 72.0, zoom: 6, name: "Indira Gandhi Canal Command Area" },
    associatedLayers: ["soils", "rivers"]
  },
  {
    id: "c12-ind-ch7",
    classGrade: "12",
    book: "India: People and Economy",
    bookHindi: "भारत: लोग और अर्थव्यवस्था",
    unit: "Unit IV: Transport, Communication & International Trade",
    unitHindi: "इकाई IV: परिवहन, संचार एवं अंतर्राष्ट्रीय व्यापार",
    chapterNumber: 7,
    chapterTitle: "Transport and Communication in India",
    chapterTitleHindi: "परिवहन तथा संचार",
    topic: "Roadways (Golden Quadrilateral), Railway Zones, Inland Waterways and Oil Pipelines",
    subtopics: [
      "Roadways (India has 2nd largest road network ~6.2 million km):",
      "  - Golden Quadrilateral (5,846 km connecting Delhi-Mumbai-Chennai-Kolkata)",
      "  - North-South Corridor (Srinagar to Kanyakumari, 4,000 km) and East-West Corridor (Silchar to Porbandar, 3,300 km) intersecting at Jhansi",
      "  - National Highways (NHAI), State Highways, Border Roads (BRO: highest motorable passes)",
      "Railways (Introduced 1853 Mumbai to Thane 34km; 16 Railway Zones):",
      "  - Track Gauges: Broad Gauge (1.676m, >90%), Metre Gauge (1.000m), Narrow Gauge (0.762m & 0.610m hill toy trains)",
      "  - Key Zone HQs: Northern (New Delhi), Western (Mumbai Churchgate), Central (Mumbai CSMT), Eastern (Kolkata), Southern (Chennai), South Central (Secunderabad), East Coast (Bhubaneswar)",
      "Inland Waterways (IWAI formed 1986):",
      "  - National Waterway 1 (NW-1): Ganga River from Prayagraj to Haldia (1,620 km, deepest multi-modal terminals at Varanasi, Sahibganj, Haldia)",
      "  - National Waterway 2 (NW-2): Brahmaputra River from Sadiya to Dhubri (891 km)",
      "  - National Waterway 3 (NW-3): West Coast Canal in Kerala from Kottapuram to Kollam (205 km)",
      "Oil and Gas Pipelines:",
      "  - Naharkatiya-Nunmati-Barauni Pipeline (first 1,152 km oil pipeline)",
      "  - Hazira-Vijaipur-Jagdishpur (HVJ) Gas Pipeline (1,750 km linking offshore gas to fertilizer plants in MP and UP)",
      "Air Transport (Pawan Hans helicopter, AAI international hubs)"
    ],
    learningObjective: "Map multimodal corridors connecting the Golden Quadrilateral, Railway Zone HQs, and National Waterways.",
    visualizationType: "flow_animation",
    interactiveMode: ["explore", "explain", "simulate", "map_practice"],
    mapWork: {
      required: true,
      category: "CLASS_XII_INDIA",
      items: [
        "Northern Railway HQ: New Delhi", "Western Railway HQ: Mumbai Churchgate",
        "Central Railway HQ: Mumbai CSMT", "Eastern Railway HQ: Kolkata",
        "Southern Railway HQ: Chennai", "South Central Railway HQ: Secunderabad",
        "National Waterway 1: Prayagraj to Haldia", "National Waterway 2: Sadiya to Dhubri",
        "Golden Quadrilateral Super Highways", "HVJ Gas Pipeline"
      ],
      itemsHindi: [
        "उत्तर रेलवे मुख्यालय: नई दिल्ली", "पश्चिम रेलवे मुख्यालय: मुंबई चर्चगेट",
        "मध्य रेलवे मुख्यालय: मुंबई सीएसएमटी", "पूर्व रेलवे मुख्यालय: कोलकाता",
        "दक्षिण रेलवे मुख्यालय: चेन्नई", "दक्षिण मध्य रेलवे: सिकंदराबाद",
        "राष्ट्रीय जलमार्ग 1: प्रयागराज से हल्दिया", "राष्ट्रीय जलमार्ग 2: सादिया से धुबरी",
        "स्वर्णिम चतुर्भुज", "एचवीजे गैस पाइपलाइन"
      ]
    },
    syllabusStatus: "board_evaluated",
    examTips: "Map pointing favorites in CBSE 12: Railway Zone HQs (New Delhi, Mumbai, Kolkata, Chennai, Gorakhpur, Secunderabad) and NW-1 / NW-2 terminal points.",
    examTipsHindi: "बोर्ड परीक्षा के पसंदीदा बिंदु: रेलवे जोन मुख्यालय (नई दिल्ली, मुंबई, कोलकाता, चेन्नई, गोरखपुर, सिकंदराबाद) और राष्ट्रीय जलमार्ग 1 व 2।",
    targetLocation: { lat: 28.6448, lng: 77.2167, zoom: 5, name: "Northern Railway HQ New Delhi" },
    associatedLayers: ["ports"]
  },
  {
    id: "c12-ind-ch8",
    classGrade: "12",
    book: "India: People and Economy",
    bookHindi: "भारत: लोग और अर्थव्यवस्था",
    unit: "Unit IV: Transport, Communication & International Trade",
    unitHindi: "इकाई IV: परिवहन, संचार एवं अंतर्राष्ट्रीय व्यापार",
    chapterNumber: 8,
    chapterTitle: "International Trade & Major Sea Ports",
    chapterTitleHindi: "अंतर्राष्ट्रीय व्यापार एवं प्रमुख समुद्री पत्तन",
    topic: "Trade Composition, 12 Major Sea Ports and International Airports",
    subtopics: [
      "Composition of India's Foreign Trade: Import of crude petroleum, electronics, gold, capital goods; Export of refined petroleum products, gems & jewelry, chemicals, engineering goods, agricultural commodities",
      "Major Sea Ports of India (Handling ~95% foreign trade by volume):",
      "  - Western Coast Ports: Kandla / Deendayal (Gujarat, tidal port for NW hinterland), Mumbai (largest natural deep harbour), JNPT / Nhava Sheva (premier container port), Marmagao (Goa, iron ore exports), New Mangalore (Karnataka, Kudremukh ore), Kochi (Kerala, natural harbour at Vembanad mouth)",
      "  - Eastern Coast Ports: Tuticorin / VO Chidambaranar (TN, artificial deep-sea), Chennai (oldest artificial harbour), Kamarajar / Ennore (corporate port), Visakhapatnam (AP, landlocked natural harbour for Bailadila ore), Paradip (Odisha, deep water for coal/iron), Syama Prasad Mookerjee Kolkata (riverine on Hooghly) & Haldia dock",
      "International Airports of India: Delhi (Indira Gandhi IGI), Mumbai (Chhatrapati Shivaji Maharaj CSMIA), Kolkata (Netaji Subhash Chandra Bose), Chennai (Meenambakkam), Bengaluru (Kempegowda), Hyderabad (Rajiv Gandhi), Ahmedabad, Amritsar (Raja Sansi / Guru Ram Das), Thiruvananthapuram, Kochi"
    ],
    learningObjective: "Locate India's 12 major seaport gateways and map their natural versus artificial harbour advantages.",
    visualizationType: "2d_map",
    interactiveMode: ["explore", "explain", "compare", "map_practice", "quiz"],
    mapWork: {
      required: true,
      category: "CLASS_XII_INDIA",
      items: [
        "Major Ports: Kandla, Mumbai, JNPT, Marmagao, New Mangalore, Kochi, Tuticorin, Chennai, Visakhapatnam, Paradip, Haldia, Kolkata",
        "International Airports: Ahmedabad, Amritsar, Bengaluru, Chennai, Delhi, Goa, Guwahati, Hyderabad, Kolkata, Mumbai, Thiruvananthapuram"
      ],
      itemsHindi: [
        "प्रमुख पत्तन: कांडला, मुंबई, जेएनपीटी, मारमागाओ, न्यू मंगलौर, कोच्चि, तूतीकोरिन, चेन्नई, विशाखापत्तनम, पारादीप, हल्दिया, कोलकाता",
        "अंतर्राष्ट्रीय हवाई अड्डे: अहमदाबाद, अमृतसर, बेंगलुरु, चेन्नई, दिल्ली, गोवा, गुवाहाटी, हैदराबाद, कोलकाता, मुंबई, तिरुवनंतपुरम"
      ]
    },
    syllabusStatus: "board_evaluated",
    examTips: "Guaranteed 3 to 4 points in Board Exam Map: Major Ports (Kandla, Marmagao, Visakhapatnam, Paradip, Tuticorin) and Airports (Delhi, Mumbai, Kolkata, Chennai).",
    examTipsHindi: "बोर्ड परीक्षा में अनिवार्य रूप से पूछे जाने वाले बिंदु: कांडला, विशाखापत्तनम, पारादीप, मारमागाओ पत्तन और दिल्ली, मुंबई, कोलकाता, चेन्नई हवाई अड्डे।",
    targetLocation: { lat: 18.9500, lng: 72.8500, zoom: 6, name: "Mumbai & JNPT Port Complex" },
    associatedLayers: ["ports"]
  },
  {
    id: "c12-ind-ch9",
    classGrade: "12",
    book: "India: People and Economy",
    bookHindi: "भारत: लोग और अर्थव्यवस्था",
    unit: "Unit V: Geographical Perspective on Selected Issues",
    unitHindi: "इकाई V: चयनित मुद्दों पर भौगोलिक परिप्रेक्ष्य",
    chapterNumber: 9,
    chapterTitle: "Geographical Perspective on Selected Issues and Problems",
    chapterTitleHindi: "भौगोलिक परिप्रेक्ष्य में चयनित मुद्दे एवं समस्याएं",
    topic: "Pollution (Air, Water, Land, Noise), Urban Waste, Slums (Dharavi) and Land Degradation",
    subtopics: [
      "Environmental Pollution: Nature, sources, pollutants, and spatial concentration",
      "  - Water Pollution: Industrial effluents, domestic sewage, agricultural runoff; Most polluted rivers: Ganga (Kanpur, Varanasi) and Yamuna (Delhi to Agra)",
      "  - Air Pollution: Combustion of fossil fuels, vehicular emissions, dust, smog (respiratory illnesses in Indo-Gangetic belt)",
      "  - Noise Pollution: Traffic, factories, construction (>85 dB threshold)",
      "Urban Waste Disposal: Inadequate solid waste management, landfill leaching, open dumping hazards",
      "Rural-Urban Migration & Urban Slums: Push factors (rural unemployment, drought) and Pull factors; Case study of Dharavi (Mumbai): Asia's largest informal settlement, dense living vs vibrant recycling micro-economy",
      "Land Degradation: Soil erosion, waterlogging, alkalisation/salinisation (Reh/Kallar), desertification; Wasteland reclamation"
    ],
    learningObjective: "Analyze spatial pollution hot-spots along the Ganga-Yamuna river corridor and evaluate slum urban dynamics.",
    visualizationType: "case_study",
    interactiveMode: ["explore", "explain", "compare", "case_study"],
    mapWork: {
      required: true,
      category: "CLASS_XII_INDIA",
      items: ["Most Polluted River Stretch: Yamuna (Delhi-Agra)", "Asia's Largest Slum Settlement: Dharavi (Mumbai)"],
      itemsHindi: ["सर्वाधिक प्रदूषित नदी खंड: यमुना (दिल्ली-आगरा)", "एशिया की विशालतम कच्ची बस्ती: धारावी (मुंबई)"]
    },
    syllabusStatus: "core_prescribed",
    examTips: "Case study question on Dharavi: Highlight contrast between severe overcrowding and the $1 billion informal leather, pottery and recycling industry.",
    examTipsHindi: "धारावी (मुंबई) कच्ची बस्ती: उच्च जनसंख्या घनत्व, एक कमरे में 10-15 लोग, और अनौपचारिक कुटीर व पुनर्चक्रण उद्योग की आर्थिक भूमिका।",
    targetLocation: { lat: 19.0400, lng: 72.8500, zoom: 8, name: "Dharavi Slum Cluster Mumbai" },
    associatedLayers: ["rivers"]
  },

  // =========================================================================
  // CLASS XII - BOOK 3: PRACTICAL WORK IN GEOGRAPHY PART II
  // =========================================================================
  {
    id: "c12-prac-ch1-2",
    classGrade: "12",
    book: "Practical Work in Geography Part II",
    bookHindi: "भूगोल में प्रयोगात्मक कार्य भाग 2",
    unit: "GIS & Statistical Lab",
    unitHindi: "जीआईएस एवं सांख्यिकी प्रयोगशाला",
    chapterNumber: 1,
    chapterTitle: "Processing of Data and Thematic Mapping",
    chapterTitleHindi: "आंकड़ों का प्रक्रमण एवं विषयक मानचित्रण",
    topic: "Statistical Measures (Mean, Median, Mode) and Thematic Maps (Dot, Choropleth, Isopleth)",
    subtopics: [
      "Sources of Data: Primary Data (field surveys, interviews) vs Secondary Data (Census of India, meteorological reports)",
      "Measures of Central Tendency: Mean (Arithmetic average), Median (Middle positional value), Mode (Most frequently occurring value)",
      "Measures of Dispersion: Range, Quartile Deviation, Mean Deviation, Standard Deviation",
      "Thematic Maps Construction:",
      "  - Dot Map: Discrete absolute quantities (e.g. population dots where 1 dot = 100,000 people), dot size and placement rules",
      "  - Choropleth Map: Shading based on statistical density, ratio, or percentages (e.g. state-wise population density or literacy rates), class intervals",
      "  - Isopleth Map: Lines connecting equal values (Isotherms, Isobars, Isohyets), requires continuous data"
    ],
    learningObjective: "Compute statistical parameters and generate interactive Choropleth, Dot, and Isopleth thematic maps.",
    visualizationType: "thematic_choropleth",
    interactiveMode: ["simulate", "compare", "quiz"],
    mapWork: {
      required: true,
      category: "CLASS_XII_INDIA",
      items: ["Choropleth Map of India Population Density 2011", "Dot Map of Rural Population"],
      itemsHindi: ["भारत जनसंख्या घनत्व वर्णमात्री (कोरॉपलेथ) मानचित्र", "ग्रामीण जनसंख्या बिंदु मानचित्र"]
    },
    practicalRequirement: "Tabulation of frequency distributions and hand-drawn choropleth map drafting.",
    syllabusStatus: "core_prescribed",
    examTips: "Practical board exam question: Calculate mean and median for a given dataset of agricultural yields across 7 states.",
    examTipsHindi: "प्रयोगात्मक परीक्षा प्रश्न: 7 राज्यों के कृषि उत्पादन आंकड़ों से समांतर माध्य और माध्यिका की गणना करें।",
    targetLocation: { lat: 20.5937, lng: 78.9629, zoom: 5, name: "All India Statistical Base" },
    associatedLayers: ["soils", "climate"]
  },
  {
    id: "c12-prac-ch6",
    classGrade: "12",
    book: "Practical Work in Geography Part II",
    bookHindi: "भूगोल में प्रयोगात्मक कार्य भाग 2",
    unit: "GIS & Statistical Lab",
    unitHindi: "जीआईएस एवं सांख्यिकी प्रयोगशाला",
    chapterNumber: 6,
    chapterTitle: "Spatial Information Technology (GIS Lab)",
    chapterTitleHindi: "स्थानिक सूचना प्रौद्योगिकी (जीआईएस लैब)",
    topic: "Geographic Information System (GIS), Vector vs Raster Data, Buffers and Overlay Analysis",
    subtopics: [
      "Definition of GIS: Computer-based system for capturing, storing, manipulating, analyzing, managing, and presenting spatial and geographic data",
      "Components of GIS: Hardware, Software (QGIS, ArcGIS), Data (Spatial & Attribute), People, Methods",
      "Spatial Data Models: Vector (Points: wells, cities; Lines: rivers, roads; Polygons: districts, lakes) vs Raster (Grid cells/pixels with digital numbers, elevation DEMs, satellite imagery)",
      "Attribute Data: Tabular alphanumeric non-spatial information linked to geometric spatial features (e.g. district name, population, crop yield)",
      "Spatial Analysis Functions:",
      "  - Proximity / Buffer Analysis: Creating a zone of specified distance around a point, line, or polygon (e.g. 500m buffer zone along river banks for flood hazard)",
      "  - Overlay Analysis: Combining multiple thematic layers (Soil layer + Rainfall layer + Slope layer) to determine optimal agricultural or industrial site suitability",
      "  - Network Analysis: Finding shortest route, service area coverage for emergency ambulances or freight logistics"
    ],
    learningObjective: "Perform interactive GIS buffer queries, link attribute tables to vector geometry, and execute multi-layer spatial overlays.",
    visualizationType: "gis_lab",
    interactiveMode: ["simulate", "explore", "compare"],
    mapWork: {
      required: true,
      category: "CLASS_XII_INDIA",
      items: ["5km River Hazard Buffer Query", "Multi-layer Land Suitability Overlay"],
      itemsHindi: ["5 किमी नदी बाढ़ बफर विश्लेषण", "भूमि उपयुक्तता बहु-परत ओवरले"]
    },
    practicalRequirement: "Computer-based GIS laboratory workflow exercise.",
    syllabusStatus: "core_prescribed",
    examTips: "Explain the difference between Spatial Data (where an object is: coordinates, shape) and Attribute Data (what an object is: characteristics, census figures).",
    examTipsHindi: "स्थानिक आंकड़े (स्थिति, निर्देशांक, आकार) और गुणधर्म या विवरणात्मक आंकड़े (विशेषताएं, तालिका) का अंतर स्पष्ट करें।",
    targetLocation: { lat: 17.4721, lng: 78.4419, zoom: 7, name: "NRSC ISRO Hyderabad GIS Center" },
    associatedLayers: ["rivers", "mountains", "minerals", "ports"]
  }
];
