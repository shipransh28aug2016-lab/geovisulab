/**
 * COVERAGE RECORDS — the machine-readable form of "we do not know".
 *
 * This is the file that stops the platform lying by omission. Without it, a map with nothing drawn
 * over a region is indistinguishable from a map asserting that nothing was there. With it, every gap
 * has an id, a bounding box, a time range, a completeness flag, a TYPED status and a note saying what
 * to tell the learner.
 *
 * The distinction that matters most, and the reason `status` is an enum rather than prose
 * (docs/DATA_MODEL.md D-3):
 *
 *   no-entity          nothing existed here in this period, as far as the evidence shows
 *   no-data            we have not looked, or the source we have does not cover it
 *   incomplete-coverage the source covers part of this, and we know which part is missing
 *   boundary-disputed  there was something here, and its extent is argued about
 *   sources-disagree   two or more sources say different things
 *   date-approximate   the thing is known, the date is not
 *   location-uncertain the thing is known, the position is not
 *
 * Turning `no-data` into `no-entity` is the single most common way a historical map lies, and it is
 * usually invisible when it happens. Making it a typed field means the interface cannot render the two
 * cases the same way, and a reviewer can query for it.
 *
 * The validator (atlas/scripts/validate.ts) checks that every coverage record is referenced by
 * something, and that nothing in the curated corpus asserts data over an area a record says is a gap
 * without acknowledging it.
 */

import type { CoverageRecord } from "../../../../src/lib/atlas/model";

/** The pilot corridor. Data outside it is out of scope, not absent. */
const CORRIDOR: [number, number, number, number] = [76.5, 19.8, 91.5, 31.5];
/** Corridor plus the basemap clip margin, for gaps that concern the imported base layers. */
const CLIP: [number, number, number, number] = [72.5, 15.8, 95.5, 35.5];

export const CURATED_COVERAGE: CoverageRecord[] = [
  // ===========================================================================
  // TERRAIN AND ELEVATION — blocks part of experience F
  // ===========================================================================
  {
    id: "cov-no-elevation-data",
    source: "natural-earth",
    area: CORRIDOR,
    from: "-3400",
    until: "2024",
    completeness: "unknown",
    status: "no-data",
    notes: {
      en:
        "NO ELEVATION OR TERRAIN DATA EXISTS IN THIS PROJECT. Natural Earth's vector layers carry " +
        "coastlines, rivers and lakes but no heights; there is no digital elevation model, no " +
        "contours, and no bathymetry anywhere in the committed data. This blocks the two highest-value " +
        "3D Learning Studio scenes the requirements ask for — Himalayan relief and river-basin " +
        "drainage in three dimensions — and it blocks cross-sections, slope analysis, line-of-sight " +
        "and any quantitative statement about terrain. STATUS: BLOCKED BY DATA, not by effort. The " +
        "existing Three.js globe in the legacy visualiser renders a textured sphere; it is not " +
        "terrain-driven and must not be described as relief. Candidate sources exist (SRTM, ASTER GDEM, " +
        "Copernicus GLO-30) but each needs its own licence check and none has been fetched, so no " +
        "elevation figure appears anywhere in this corpus. The Gaumukh (~4,000 m) and Patna (~50 m) " +
        "elevations on the place records are widely published reference heights for those " +
        "settlements, marked as such, and are NOT derived from any DEM.",
      hi:
        "इस परियोजना में कोई ऊँचाई या भू-आकृति आँकड़े विद्यमान नहीं हैं। नैचरल अर्थ की सदिश परतें तटरेखा, " +
        "नदियाँ एवं झीलें रखती हैं पर ऊँचाइयाँ नहीं; कोई डिजिटल एलिवेशन मॉडल, कोई समोच्च रेखाएँ एवं कोई " +
        "बैथीमेट्री कहीं नहीं है। यह आवश्यकताओं द्वारा माँगी गई दो उच्चतम-मूल्य 3D शिक्षण दृश्यों — " +
        "हिमालयी उच्चावच एवं त्रिविम में नदी-बेसिन अपवाह — को रोकता है। स्थिति: आँकड़ों द्वारा अवरुद्ध, " +
        "प्रयास द्वारा नहीं।",
    },
  },

  // ===========================================================================
  // HISTORICAL MAPS — blocks part of experience E
  // ===========================================================================
  {
    id: "cov-no-historical-maps",
    source: "atlas-editorial-unsourced",
    area: CORRIDOR,
    from: "1500",
    until: "1947",
    completeness: "unknown",
    status: "no-data",
    notes: {
      en:
        "NO SCANNED HISTORICAL MAPS ARE AVAILABLE TO THIS PROJECT, so the Source Explorer experience " +
        "cannot show a primary cartographic document. The National Archives of India holds substantial " +
        "Survey of India material from roughly 1700-1900, and access to a collection does not imply " +
        "permission to redistribute images from it; the same is true of Survey of India and NRSC/Bhuvan " +
        "material, none of whose terms this project has cleared. No IIIF endpoint has been identified " +
        "with confirmed redistribution rights, so Mirador has not been added and would have nothing to " +
        "display. STATUS: BLOCKED BY LICENCE AND ACCESS, and this is the correct outcome — scraping " +
        "or hotlinking protected archival scans to make the interface look complete is explicitly " +
        "prohibited by this project's own rules. What the Source Explorer CAN do today is present " +
        "inscriptional and textual sources with their metadata, locators and verification state, which " +
        "is real evidence rather than a picture of evidence.",
      hi:
        "इस परियोजना के लिए कोई स्कैन किया गया ऐतिहासिक मानचित्र उपलब्ध नहीं है, अतः स्रोत-अन्वेषक अनुभव " +
        "प्राथमिक मानचित्र-दस्तावेज़ नहीं दिखा सकता। भारत के राष्ट्रीय अभिलेखागार में लगभग १७००–१९०० का " +
        "पर्याप्त सर्वे ऑफ़ इंडिया सामग्री है, और किसी संग्रह तक पहुँच का अर्थ उसकी छवियों के पुनर्वितरण " +
        "की अनुमति नहीं है। स्थिति: लाइसेंस एवं पहुँच द्वारा अवरुद्ध।",
    },
  },

  // ===========================================================================
  // NATURAL EARTH — verified negative results
  // ===========================================================================
  {
    id: "cov-natural-earth-river-gaps",
    source: "natural-earth",
    area: CLIP,
    from: "2024",
    until: "2024",
    completeness: "partial",
    status: "incomplete-coverage",
    notes: {
      en:
        "RIVERS PRESENT IN THE PHYSICAL WORLD BUT ABSENT FROM THE IMPORTED DATA. Verified by " +
        "inspecting all 70 imported river features and listing each of the 51 that carry a name. " +
        "Named and historically significant rivers of this corridor that Natural Earth 10m does NOT " +
        "carry: Damodar, Gomti, Punpun, Mahananda, Ajay, Mayurakshi, Kiul, Alaknanda, Bhagirathi, " +
        "Hooghly. Present and verified: Ganga, Yamuna, Son, Ghaghara, Gandak, Sapt Kosi, Chambal, " +
        "Betwa, Tista, Brahmaputra, Narmada, Mahanadi, Godavari, Krishna, Tapi, Indus, Sutlej, Chenab, " +
        "Jhelum, Ravi, Beas, Mahi, Banas. CONSEQUENCE: the Damodar — the river of the coalfield, of " +
        "Bokaro and of the 1948 valley project — cannot be drawn. It is represented as a place point " +
        "and a geometry-less feature record. NOTE ALSO that the 50m layers were tried first and " +
        "rejected: they carry only ten rivers in this corridor and omit the Son, the Ghaghara, the " +
        "Gandak and the Kosi entirely, which for a Ganga pilot is unusable. Upstream names are " +
        "anglicised or carry diacritics ('Ganges', 'Ghäghara', 'Mahäna Nadï', 'Sapt'), so display " +
        "names require a localisation pass that must not silently rename the underlying data.",
      hi:
        "भौतिक संसार में उपस्थित पर आयातित आँकड़ों में अनुपस्थित नदियाँ। सभी ७० आयातित नदी-फीचरों की " +
        "जाँच द्वारा सत्यापित। इस क्षेत्र की नामित एवं ऐतिहासिक दृष्टि से महत्वपूर्ण नदियाँ जो नैचरल अर्थ " +
        "१०मी में नहीं हैं: दामोदर, गोमती, पुनपुन, महानंदा, अजय, मयूराक्षी, कियूल, अलकनंदा, भागीरथी, " +
        "हुगली। परिणाम: दामोदर — कोयलाक्षेत्र, बोकारो एवं १९४८ की घाटी परियोजना की नदी — अंकित नहीं की " +
        "जा सकती।",
    },
  },
  {
    id: "cov-no-soil-or-vegetation",
    source: "natural-earth",
    area: CORRIDOR,
    from: "2024",
    until: "2024",
    completeness: "unknown",
    status: "no-data",
    notes: {
      en:
        "No soil-zone, land-use or natural-vegetation layer is committed. Natural Earth does carry a " +
        "10m land-cover-ish layer set that was not fetched, and the legacy visualiser has its own " +
        "five ICAR soil orders as static content, but neither is a dated, sourced polygon layer for " +
        "this corridor. The alluvial-soil discussion in the curriculum mapping therefore runs on prose " +
        "and reference, not on a drawable layer. STATUS: available in principle, not integrated.",
      hi:
        "कोई मृदा-क्षेत्र, भूमि-उपयोग या प्राकृतिक वनस्पति परत समर्पित नहीं है। पाठ्यक्रम-मानचित्रण में " +
        "जलोढ़ मृदा की चर्चा इसलिए गद्य एवं संदर्भ पर चलती है, अंकन-योग्य परत पर नहीं।",
    },
  },

  // ===========================================================================
  // CLIOPATRIA — the imported polity dataset's real limits
  // ===========================================================================
  {
    id: "cov-cliopatria-magadha-thin",
    source: "cliopatria-v0-2-1",
    area: [84.0, 24.0, 86.5, 26.5],
    from: "-0600",
    until: "-0300",
    completeness: "partial",
    status: "incomplete-coverage",
    notes: {
      en:
        "MAGADHA — THE PILOT'S OWN SUBJECT — IS THINLY SAMPLED. The Janapada of Magadha has 2 rows and " +
        "a 13-vertex polygon of about 5,040 km²; the Haryanka dynasty has 3 rows; the Shaishunaga " +
        "dynasty 3; the Nandas 3. By contrast the Gupta Empire has 19 rows and the Pala Empire 25. So " +
        "the map can show the fourth-to-twelfth centuries CE at genuine temporal resolution but the " +
        "sixth-to-fourth centuries BCE — the period the pilot is named after — as only a handful of " +
        "snapshots. The 21 temporal-gap anomalies in anomalies.json are this fact expressed " +
        "per-entity. CONSEQUENCE: the curated corpus, not the dataset, carries the chronology for " +
        "early Magadha, and any scrubbing animation across 600-400 BCE will show large jumps. That is " +
        "a property of the evidence and must be rendered as such, never smoothed into apparent " +
        "continuity.",
      hi:
        "मगध — स्वयं पायलट का विषय — विरल नमूनाकृत है। मगध जनपद के २ पंक्तियाँ एवं लगभग ५,०४० वर्ग किमी " +
        "का १३-शीर्ष बहुभुज है; हर्यंक वंश की ३; शैशुनाग वंश की ३; नंदों की ३। इसके विपरीत गुप्त " +
        "साम्राज्य की १९ एवं पाल साम्राज्य की २५ पंक्तियाँ हैं। परिणाम: मानचित्र चौथी–द्वादश शताब्दी ईसवी " +
        "को वास्तविक कालिक विस्तार पर दिखा सकता है परंतु छठी–चौथी शताब्दी ईसा पूर्व को केवल कुछ " +
        "स्नैपशॉट के रूप में।",
    },
  },
  {
    id: "cov-cliopatria-boundary-precision",
    source: "cliopatria-v0-2-1",
    area: CORRIDOR,
    from: "-3400",
    until: "2024",
    completeness: "partial",
    status: "boundary-disputed",
    notes: {
      en:
        "EVERY IMPORTED BOUNDARY IS APPROXIMATE AND THE DATASET SAYS SO. The upstream README states " +
        "that borders 'reflect only one version of the territory held by past polities'. Accordingly " +
        "every assertion this project derives carries spatialPrecision 'boundary-approximate', " +
        "dateCertainty 'approximate', evidenceType 'dataset-derived' and reviewStatus " +
        "'imported-unreviewed'. No imported edge may ever be labelled 'treaty-line', 'documented' or " +
        "'verified'. The dataset also has no per-row citation, locator, precision or review status — " +
        "its properties are Name, FromYear, ToYear, Area, Type, Wikipedia, Wikidata, SeshatID, " +
        "Components and MemberOf only — so the dataset release itself (DOI 10.5281/zenodo.13363121) " +
        "is cited as the source for every derived claim, with the row identified by name and year " +
        "range as the locator.",
      hi:
        "प्रत्येक आयातित सीमा अनुमानित है और डेटासेट स्वयं ऐसा कहता है। तदनुसार इस परियोजना द्वारा " +
        "व्युत्पन्न प्रत्येक कथन spatialPrecision 'boundary-approximate' एवं reviewStatus " +
        "'imported-unreviewed' रखता है। किसी आयातित किनारे को कभी 'treaty-line' या 'सत्यापित' नहीं " +
        "कहा जा सकता।",
    },
  },
  {
    id: "cov-cliopatria-relations-excluded",
    source: "cliopatria-v0-2-1",
    area: CORRIDOR,
    from: "-3400",
    until: "2024",
    completeness: "partial",
    status: "incomplete-coverage",
    notes: {
      en:
        "82 UPSTREAM ROWS OF Type=RELATION WERE DELIBERATELY EXCLUDED from territorial assertions — " +
        "14 anomaly records, one per entity, including the 19-row Gupta-Vakataka Alliance. A RELATION " +
        "row is the spatial extent of a relationship, not territory a polity held. Rendering an " +
        "alliance's extent as a sovereign border would assert something the source does not say, and " +
        "would do it in the visual register a learner trusts most. The excluded rows are reported, " +
        "counted and named in anomalies.json, not discarded silently.",
      hi:
        "Type=RELATION की ८२ ऊपरी पंक्तियों को जानबूझकर क्षेत्रीय कथनों से बाहर रखा गया — १४ विसंगति " +
        "अभिलेख, प्रति इकाई एक, जिसमें १९-पंक्ति गुप्त-वाकाटक मित्रता शामिल है। RELATION पंक्ति किसी " +
        "संबंध का स्थानिक विस्तार है, किसी राजनीतिक सत्ता द्वारा धारित क्षेत्र नहीं।",
    },
  },
  {
    id: "cov-cliopatria-out-of-corridor-components",
    source: "cliopatria-v0-2-1",
    area: CORRIDOR,
    from: "-3400",
    until: "2024",
    completeness: "partial",
    status: "incomplete-coverage",
    notes: {
      en:
        "10 RELATION OBJECTS DO NOT RESOLVE because the entity they name lies outside the corridor and " +
        "was never imported — for example the composite British Empire's components 'Kingdom of Great " +
        "Britain', and the French republics' component 'French Africa'. Each such relation is kept, " +
        "because a composite genuinely extending beyond this corridor is true and worth showing, but " +
        "carries resolvedInCorridor:false and a citation note explaining it. The interface must render " +
        "these as 'outside this corridor', never as a missing or non-existent entity. This is " +
        "incomplete coverage of THIS PROJECT, not an absence in the world.",
      hi:
        "१० संबंध-वस्तुएँ हल नहीं होतीं क्योंकि जिस इकाई का वे नाम लेती हैं वह इस क्षेत्र के बाहर है और " +
        "कभी आयात नहीं हुई। प्रत्येक ऐसा संबंध रखा गया है पर resolvedInCorridor:false एवं एक व्याख्यात्मक " +
        "उद्धरण-टिप्पणी के साथ। इंटरफ़ेस इन्हें 'इस क्षेत्र के बाहर' के रूप में प्रस्तुत करे, कभी लुप्त " +
        "इकाई के रूप में नहीं।",
    },
  },

  // ===========================================================================
  // CHRONOLOGY — dates that cannot be fixed
  // ===========================================================================
  {
    id: "cov-contested-chronology",
    source: "bechert-dating-buddha",
    area: CORRIDOR,
    from: "-0600",
    until: "-0300",
    completeness: "partial",
    status: "sources-disagree",
    notes: {
      en:
        "THE SIXTH-TO-FOURTH CENTURY BCE FRAMEWORK IS CONTESTED, NOT MERELY IMPRECISE. The Buddha's " +
        "death is placed at c. 483 BCE by the long chronology and c. 400 BCE or later by the short " +
        "chronology; a three-volume specialist symposium devoted to this one question did not resolve " +
        "it. Mahavira's date is contingent on the Buddha's, because both traditions fix an interval " +
        "between them, so moving one moves the other. Ashoka's consecration (c. 268 BCE, with 269 and " +
        "265 also argued) anchors the Kalinga war, which is dated by regnal year and not " +
        "independently. Net effect: roughly a century of uncertainty propagates across the corridor's " +
        "entire early chronology. The timeline shows intervals and the interpretations are recorded as " +
        "positions, because collapsing this to single years would be more confidently wrong than " +
        "saying nothing.",
      hi:
        "छठी–चौथी शताब्दी ईसा पूर्व की रूपरेखा विवादित है, केवल अनिश्चित नहीं। बुद्ध की मृत्यु दीर्घ " +
        "काल-गणना द्वारा लगभग ४८३ ईसा पूर्व एवं ह्रस्व काल-गणना द्वारा लगभग ४०० ईसा पूर्व या बाद रखी " +
        "जाती है। महावीर की तिथि बुद्ध की तिथि पर आश्रित है। सकल प्रभाव: लगभग एक शताब्दी की अनिश्चितता " +
        "पूरे क्षेत्र की प्रारंभिक काल-गणना में फैलती है।",
    },
  },
  {
    id: "cov-nalanda-destruction-date",
    source: "tabaqat-i-nasiri",
    area: [85.0, 24.9, 87.5, 25.5],
    from: "1190",
    until: "1205",
    completeness: "partial",
    status: "date-approximate",
    notes: {
      en:
        "The destruction of Nalanda, Odantapuri and Vikramashila cannot be dated to a year. The " +
        "narrative source was composed about four decades after the events by a non-eyewitness and " +
        "gives no year; the archaeology confirms destruction by fire but a burn layer cannot be dated " +
        "absolutely without an associated datable object. The widely circulated '1193' is more precise " +
        "than the evidence supports. The corpus records a span of 1193-1200 CE as approximate.",
      hi:
        "नालंदा, ओदंतपुरी एवं विक्रमशिला के विनाश को किसी वर्ष में तिथिबद्ध नहीं किया जा सकता। व्यापक रूप " +
        "से प्रचलित '११९३' प्रमाण की समर्थन-क्षमता से अधिक सटीक है।",
    },
  },
  {
    id: "cov-bihar-1912-primary-unconsulted",
    source: "bihar-province-1912",
    area: [83.0, 19.8, 88.5, 27.5],
    from: "1912",
    until: "1936",
    completeness: "partial",
    status: "date-approximate",
    notes: {
      en:
        "The separation of Bihar and Orissa from the Bengal Presidency on 22 March 1912 is very widely " +
        "recorded and commemorated as Bihar Day, but the primary gazette notification was NOT " +
        "consulted during this pilot. So the date is marked approximate, the notification is listed as " +
        "a source with verification 'not-consulted', and NO claim in the corpus rests on it. This is a " +
        "worked example of an honest gap: the event is real, the date is widely agreed, and the " +
        "platform still says which document it has not read.",
      hi:
        "२२ मार्च १९१२ को बंगाल प्रेसीडेंसी से बिहार एवं उड़ीसा का पृथक्करण अत्यंत व्यापक रूप से अंकित है " +
        "और बिहार दिवस के रूप में मनाया जाता है, परंतु प्राथमिक राजपत्र अधिसूचना इस पायलट के दौरान " +
        "परामृष्ट नहीं की गई। अतः तिथि अनुमानित चिह्नित है और कोई दावा उस पर निर्भर नहीं करता।",
    },
  },

  // ===========================================================================
  // ANCIENT ROUTES AND SITES
  // ===========================================================================
  {
    id: "cov-ancient-route-geometry",
    source: "atlas-editorial-unsourced",
    area: CORRIDOR,
    from: "-0600",
    until: "1200",
    completeness: "unknown",
    status: "no-data",
    notes: {
      en:
        "NO LICENSED GEOMETRY EXISTS FOR ANCIENT TRADE OR MILITARY ROUTES. The Uttarapatha and the " +
        "riverine routes of the Ganga system are well attested in textual sources and their general " +
        "course is not seriously in doubt, but Cliopatria carries polities rather than routes, and " +
        "Natural Earth carries modern roads which would be actively misleading under an ancient map. " +
        "Digitising routes from a textbook sketch map would produce a confident-looking unverifiable " +
        "polyline — the exact failure mode this project forbids. Routes are therefore taught as " +
        "sequences of connected PLACES, which the corpus does hold with sources, and the geometry is " +
        "recorded here as a gap. STATUS: technically possible, blocked by absence of licensed source " +
        "geometry.",
      hi:
        "प्राचीन व्यापार या सैन्य मार्गों हेतु कोई लाइसेंस-प्राप्त ज्यामिति विद्यमान नहीं है। उत्तरापथ एवं " +
        "गंगा तंत्र के नदीय मार्ग ग्रंथ-स्रोतों में सुप्रमाणित हैं, पर क्लिओपैट्रिया राजनीतिक सत्ताएँ रखता है " +
        "मार्ग नहीं, और नैचरल अर्थ आधुनिक सड़कें रखता है जो प्राचीन मानचित्र के नीचे सक्रिय रूप से भ्रामक " +
        "होंगी। अतः मार्ग जुड़े हुए स्थानों के अनुक्रम के रूप में पढ़ाए जाते हैं।",
    },
  },
  {
    id: "cov-site-extents",
    source: "singh-ancient-india",
    area: CORRIDOR,
    from: "-0600",
    until: "1300",
    completeness: "partial",
    status: "location-uncertain",
    notes: {
      en:
        "ARCHAEOLOGICAL SITE EXTENTS ARE NOT ASSERTED. Every place in the curated corpus carries a " +
        "single reference point plus an explicit locationPrecisionKm, never a polygon. Excavated " +
        "boundaries exist for some sites (Rajgir's hill-ring wall, Nalanda's monastery complex, " +
        "Mahasthangarh's rampart) but this project holds no licensed geometry for any of them, and " +
        "drawing a boundary from a description in a secondary work would fabricate precision. So the " +
        "map renders each site as a disc of the stated radius, which is a true statement about our " +
        "knowledge rather than a false statement about the site. Odantapuri carries the widest radius " +
        "(3 km) because its identification with Bihar Sharif is discussed rather than settled.",
      hi:
        "पुरातात्विक स्थलों के विस्तार अभिकथित नहीं हैं। संकलित सामग्री का प्रत्येक स्थान एक संदर्भ बिंदु " +
        "तथा स्पष्ट locationPrecisionKm रखता है, कभी बहुभुज नहीं। अतः मानचित्र प्रत्येक स्थल को कथित त्रिज्या " +
        "के वृत्त के रूप में प्रस्तुत करता है, जो हमारे ज्ञान के विषय में एक सत्य कथन है।",
    },
  },

  // ===========================================================================
  // QUANTITATIVE AND MODERN DATA
  // ===========================================================================
  {
    id: "cov-population-not-transcribed",
    source: "census-india-2011",
    area: CORRIDOR,
    from: "2011",
    until: "2011",
    completeness: "unknown",
    status: "no-data",
    notes: {
      en:
        "NO POPULATION FIGURE WAS TRANSCRIBED FROM ANY CENSUS DURING THIS BUILD, so none appears in " +
        "this corpus. The reference year would in any case be 2011: that is the most recent Census " +
        "whose Primary Census Abstract has been published, since the 2021 Census was postponed and its " +
        "abstract was not available to this project. Any population number eventually shown for a " +
        "place in one of India's fastest-urbanising regions would therefore be at least fourteen years " +
        "old, and must carry that year visibly — the platform's standing rule is that no quantitative " +
        "layer appears without source, reference year, unit, coverage and method. Until figures are " +
        "transcribed and checked, the platform shows nothing rather than a plausible number.",
      hi:
        "इस निर्माण के दौरान किसी जनगणना से कोई जनसंख्या आँकड़ा अनुरूपित नहीं किया गया, अतः इस सामग्री में " +
        "कोई आँकड़ा नहीं दिखता। संदर्भ वर्ष किसी भी स्थिति में २०११ होगा, क्योंकि २०२१ की जनगणना " +
        "स्थगित हुई और उसका प्राथमिक सार इस परियोजना को उपलब्ध नहीं था।",
    },
  },
  {
    id: "cov-industrial-figures-unverified",
    source: "atlas-editorial-unsourced",
    area: [85.5, 23.0, 87.5, 24.5],
    from: "1948",
    until: "2024",
    completeness: "unknown",
    status: "no-data",
    notes: {
      en:
        "THE MODERN INDUSTRIAL PLACES CARRY NO NUMBERS. Bokaro's commissioning date and capacity, " +
        "Jharia's underground-fire extent and subsidence area, displacement figures, and the Farakka " +
        "Barrage's diversion volumes all exist in published literature and government reports, but no " +
        "specific dated report was consulted for this pilot, so none is asserted. Each place cites " +
        "atlas-editorial-unsourced for exactly these items and the interface must show an unsourced " +
        "badge. Showing a number we have not read is worse than showing a labelled gap.",
      hi:
        "आधुनिक औद्योगिक स्थान कोई संख्याएँ नहीं रखते। बोकारो की आरंभ तिथि एवं क्षमता, झरिया के भूमिगत " +
        "अग्निकांड का विस्तार एवं धँसाव क्षेत्र, विस्थापन आँकड़े, तथा फरक्का बैराज की अपवाह मात्राएँ सभी " +
        "प्रकाशित साहित्य में हैं, पर इस पायलट हेतु कोई विशिष्ट दिनांकित रिपोर्ट परामृष्ट नहीं की गई।",
    },
  },

  // ===========================================================================
  // LANGUAGE COVERAGE
  // ===========================================================================
  {
    id: "cov-hindi-partial",
    source: "atlas-editorial-unsourced",
    area: CORRIDOR,
    from: "-3400",
    until: "2024",
    completeness: "partial",
    status: "incomplete-coverage",
    notes: {
      en:
        "HINDI COVERAGE IS PARTIAL AND UNEVEN, AND MACHINE TRANSLATION IS NOT USED TO FILL IT. Every " +
        "place description, event summary, interpretation position and feature note in this corpus has " +
        "an authored hi value. But graded causal claims (CausalClaim.claim and its note) are English " +
        "only, and several alternate-name entries carry a script label without a Hindi gloss. D-6 " +
        "records absence of a hi value as a coverage gap rather than substituting a translation, " +
        "because an unreviewed machine translation of a historiographical argument is a factual claim " +
        "nobody has checked. The bilingual mode must render these fields in English with a visible " +
        "'translation not yet available' marker, never silently. The validator counts these and the " +
        "number can only fall as real Hindi text is authored.",
      hi:
        "हिंदी कवरेज आंशिक एवं असमान है, और इसे भरने हेतु मशीन अनुवाद का उपयोग नहीं किया जाता। इस सामग्री " +
        "में प्रत्येक स्थान-विवरण, घटना-सारांश, व्याख्या-स्थिति एवं विशेषता-टिप्पणी का एक लिखित हिंदी मान " +
        "है। परंतु श्रेणीकृत कारण-दावे केवल अंग्रेज़ी में हैं। D-6 हिंदी मान की अनुपस्थिति को एक कवरेज अंतर " +
        "के रूप में दर्ज करता है, अनुवाद को प्रतिस्थापित नहीं करता।",
    },
  },
  {
    id: "cov-curriculum-unverified-against-official",
    source: "atlas-editorial-unsourced",
    area: CORRIDOR,
    from: "2026",
    until: "2026",
    completeness: "partial",
    status: "incomplete-coverage",
    notes: {
      en:
        "CURRICULUM MAPPINGS ARE CHECKED AGAINST NCERT BOOK AND CHAPTER TITLES, NOT AGAINST THE " +
        "CURRENT OFFICIAL CBSE SYLLABUS DOCUMENT OR THE UPSC SYLLABUS. No official syllabus PDF was " +
        "retrieved during this build — the sandbox's network access does not include cbse.gov.in or " +
        "upsc.gov.in — so every CurriculumLink records what it was verified against and when, and one " +
        "Class VIII mapping is explicitly marked provisional in its note. UPSC links name a paper and a " +
        "concept but carry no syllabus code, no weightage and no question-bank reference, because none " +
        "could be checked. Claiming UPSC coverage from keyword presence is prohibited by this " +
        "project's own rules; the honest state is 'mapped to a named paper and concept, pending " +
        "verification against the published syllabus'.",
      hi:
        "पाठ्यक्रम-मानचित्रण NCERT पुस्तक एवं अध्याय शीर्षकों के विरुद्ध जाँचे गए हैं, वर्तमान आधिकारिक CBSE " +
        "पाठ्यक्रम दस्तावेज़ या UPSC पाठ्यक्रम के विरुद्ध नहीं। इस निर्माण के दौरान कोई आधिकारिक " +
        "पाठ्यक्रम PDF प्राप्त नहीं किया गया, अतः प्रत्येक CurriculumLink यह दर्ज करता है कि वह किसके " +
        "विरुद्ध और कब सत्यापित हुआ।",
    },
  },

  // ===========================================================================
  // SCOPE — what this corpus is not
  // ===========================================================================
  {
    id: "cov-context-places-outside-corridor",
    source: "reference-coordinates",
    area: [68.0, 30.0, 76.5, 35.0],
    from: "-0600",
    until: "0700",
    completeness: "partial",
    status: "incomplete-coverage",
    notes: {
      en:
        "A SMALL NUMBER OF PLACE RECORDS LIE OUTSIDE THE CORRIDOR BBOX AND ARE KEPT AS CONTEXT. " +
        "Currently one: place-taxila (72.84E, 33.74N), beyond both the western and northern edges. It " +
        "is present because two corridor events — Alexander's withdrawal and the treaty with Seleukos — " +
        "cannot be told without the north-west, and because that treaty is what brings Megasthenes, " +
        "the corridor's most important foreign primary source, to Pataliputra. The record says so in " +
        "its own description, has no imported Cliopatria geometry (the importer filters at the " +
        "corridor bbox), and the interface must render it distinctly so no learner concludes the pilot " +
        "covers the north-west. Any future context record must be added here.",
      hi:
        "कुछ स्थान-अभिलेख क्षेत्र bbox के बाहर हैं और संदर्भ हेतु रखे गए हैं। वर्तमान में एक: तक्षशिला " +
        "(७२.८४ पू, ३३.७४ उ), पश्चिमी एवं उत्तरी दोनों किनारों से परे। यह इसलिए है क्योंकि क्षेत्र की दो " +
        "घटनाएँ — अलेक्ज़ेंडर की वापसी एवं सेल्यूकस के साथ संधि — उत्तर-पश्चिम के बिना नहीं कही जा " +
        "सकतीं।",
    },
  },
  {
    id: "cov-corridor-scope",
    source: "atlas-editorial-unsourced",
    area: [-180, -90, 180, 90],
    from: "-3400",
    until: "2024",
    completeness: "partial",
    status: "no-data",
    notes: {
      en:
        "EVERYTHING OUTSIDE THE CORRIDOR BBOX (76.5-91.5E, 19.8-31.5N) IS OUT OF SCOPE, NOT ABSENT. " +
        "This is one pilot covering the Ganga-Magadha-Eastern India corridor. It is not an " +
        "India-to-UPSC atlas and must never be presented as one. Whole regions of India — the " +
        "north-west beyond Taxila, the Deccan south of 19.8N, the entire south, the north-east beyond " +
        "91.5E — have no curated content, and the imported Cliopatria geometry outside the corridor " +
        "was filtered out at import time. A learner opening this platform and finding nothing about " +
        "the Cholas' Tamil heartland, Vijayanagara, the Marathas or Kerala is seeing a scope decision, " +
        "not a historical fact. Full coverage requires a sustained, source-verified content programme; " +
        "the Phase 3 order is recorded in docs/PRODUCT_REQUIREMENTS.md.",
      hi:
        "क्षेत्र bbox (७६.५–९१.५ पू, १९.८–३१.५ उ) के बाहर की हर चीज़ दायरे से बाहर है, अनुपस्थित नहीं। " +
        "यह एक पायलट है जो गंगा-मगध-पूर्वी भारत क्षेत्र को आवृत करता है। यह भारत-से-UPSC एटलस नहीं है और " +
        "इसे कभी वैसा प्रस्तुत नहीं किया जाना चाहिए। पूर्ण कवरेज हेतु एक सतत, स्रोत-सत्यापित सामग्री " +
        "कार्यक्रम की आवश्यकता है।",
    },
  },
];

export const CURATED_COVERAGE_IDS = CURATED_COVERAGE.map((c) => c.id);
