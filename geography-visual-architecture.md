# CBSE Geography Interactive 2D/3D Visual Learning System
## Architectural & Engineering Specification

---

## 1. Architectural Philosophy: "Extend, Don't Destroy"

The platform bridges official NCERT pedagogy (CBSE Subject Code 029) with modern geospatial graphics. Rather than forcing all visualization types into a single graphics library, the system employs a tailored multi-engine architecture:

1. **3D WebGL Globe Engine (`Three.js`)**: Planetary geometry, orbital ray-casting, global coordinate graticules, 3D beacon pins, and dynamic vector lines.
2. **2D Interactive GIS Engine (`Leaflet`)**: Multilayer tile cartography, ICAR soil polygons, river lines, mountain peak markers, and draggable toolbars.
3. **Cutaway & Cross-Section Engine (`SVG + Canvas`)**: Sub-surface concentric Earth shells, seismic P and S wave propagation, and contour cross-section profile generator.
4. **Thermodynamic Model Engine**: Solar radiation angle of incidence and 100-unit global heat budget interactive calculation.
5. **Practical GIS & Spatial Analysis Lab**: Vector proximity buffer generation, attribute data linkage, and map scale math conversion.

---

## 2. Rendering Pipeline & Component Hierarchy

```
[ App Root (src/app/page.tsx) ]
  ├── [ Navbar (src/components/navbar.tsx) ]
  │     ├── Grade Switcher (Class 11 / Class 12 / All)
  │     ├── View Switcher (3D Globe / 2D Map)
  │     ├── Visual Lab Launchers (Earth Interior / Heat Budget / Practical Lab)
  │     ├── CBSE Map Practice Launcher
  │     └── Bilingual Toggle (English / हिन्दी)
  ├── [ Syllabus Navigator (src/components/syllabus-sidebar.tsx) ]
  │     ├── 2026-27 CBSE Curriculum Registry
  │     ├── Topic Mastery Progress Tracker
  │     └── Direct "Fly to on Map" & "Launch Simulator" Hooks
  ├── [ Visualizer Viewport ]
  │     ├── [ 3D Globe Mode (src/components/globe-3d.tsx) ]
  │     │     ├── Shared Canvas Earth Texture (Cached once)
  │     │     ├── Fast WebGL Buffer Lines (Tectonics & Rivers)
  │     │     └── 3D Glowing Beacons & Radial Outward Stems
  │     └── [ 2D Map Mode (src/components/interactive-map.tsx) ]
  │           ├── Basemap Switcher (Geo Dark / Topo Relief / Satellite)
  │           ├── Vector Layers (Rivers, Peaks, ICAR Soils, Faults)
  │           └── High-Visibility Radar Pulse Markers
  ├── [ Draggable Panels & Floating HUDs ]
  │     ├── Map Highlighter & Headquarters Panel (src/components/map-highlighter-panel.tsx)
  │     ├── Physical Layers Control Panel (src/components/layer-control-panel.tsx)
  │     └── Quick Regional Fly Toolbar
  └── [ Visual Simulators & Modals ]
        ├── Earth Interior & Seismic Wave Lab (src/components/visual-labs/earth-interior-simulator.tsx)
        ├── Solar Radiation & Heat Budget Model (src/components/visual-labs/insolation-heat-budget-simulator.tsx)
        ├── Practical Geography & GIS Lab (src/components/visual-labs/practical-geography-lab.tsx)
        └── CBSE Map Practice Engine (src/components/map-practice/cbse-map-practice-engine.tsx)
```

---

## 3. Performance & Low-Bandwidth Optimizations

- **0ms Texture Generation Overhead**: Procedural Earth canvas texture is generated once and cached globally (`cachedTexture`). Subsequent mounts reuse the existing WebGL texture.
- **BufferGeometry Vector Pipelines**: Tectonic boundaries and river paths use GPU-native lines rather than heavy extruded 3D tubes.
- **Single-Trip Bootstrap**: `/api/bootstrap` bundles annotations, bookmarks, progress, and quizzes in a single parallel query.
- **Draggable Float Consoles**: All floating panels feature smooth `translate3d` hardware acceleration with double-click reset capability.
- **Zen Mode**: 1-click maximized visual canvas that collapses all sidebars and toolbars for low-resolution monitors.
