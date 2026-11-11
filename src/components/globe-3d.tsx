"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import {
  RotateCcw,
  Compass,
  Sparkles,
  ZoomIn,
  ZoomOut,
  MapPin,
  GripHorizontal,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { INDIAN_MOUNTAINS, INDIAN_RIVERS, TECTONIC_PLATES, CBSE_MAP_ITEMS } from "@/data/geo-features";
import { HEADQUARTERS_DATA, HeadquartersFeature } from "@/data/headquarters-data";

interface Globe3DProps {
  onSelectFeature?: (feature: any) => void;
  activeLayers: {
    rivers: boolean;
    mountains: boolean;
    soils: boolean;
    tectonics: boolean;
    climate: boolean;
    mapItems: boolean;
  };
  focusCoords?: { lat: number; lng: number } | null;
  highlightedHq?: HeadquartersFeature | null;
  highlightAllCategory?: string | null;
}

// Global cached procedural canvas texture so it generates once across unmounts/reloads
let cachedTexture: THREE.CanvasTexture | null = null;

function getSharedEarthTexture(): THREE.CanvasTexture {
  if (cachedTexture) return cachedTexture;

  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Deep ocean base gradient
  const oceanGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
  oceanGrad.addColorStop(0, "#081b2e");
  oceanGrad.addColorStop(0.5, "#0b2545");
  oceanGrad.addColorStop(1, "#081b2e");
  ctx.fillStyle = oceanGrad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Graticules / Coordinate Grid
  ctx.lineWidth = 1;
  ctx.strokeStyle = "rgba(56, 189, 248, 0.15)";
  for (let lat = -80; lat <= 80; lat += 20) {
    const y = ((90 - lat) / 180) * canvas.height;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }
  for (let lng = -180; lng <= 180; lng += 30) {
    const x = ((lng + 180) / 360) * canvas.width;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }

  // Key CBSE Parallels:
  // Equator (0°)
  const eqY = (90 / 180) * canvas.height;
  ctx.lineWidth = 2.5;
  ctx.strokeStyle = "rgba(250, 204, 21, 0.75)";
  ctx.beginPath();
  ctx.moveTo(0, eqY);
  ctx.lineTo(canvas.width, eqY);
  ctx.stroke();
  ctx.fillStyle = "#facc15";
  ctx.font = "bold 13px sans-serif";
  ctx.fillText("Equator 0°", 30, eqY - 4);

  // Tropic of Cancer (23.5°N)
  const cancerY = ((90 - 23.5) / 180) * canvas.height;
  ctx.lineWidth = 2;
  ctx.strokeStyle = "rgba(244, 63, 94, 0.75)";
  ctx.setLineDash([8, 6]);
  ctx.beginPath();
  ctx.moveTo(0, cancerY);
  ctx.lineTo(canvas.width, cancerY);
  ctx.stroke();
  ctx.fillStyle = "#f43f5e";
  ctx.fillText("Tropic of Cancer 23°30' N", 30, cancerY - 4);

  // Tropic of Capricorn (23.5°S)
  const capricornY = ((90 - -23.5) / 180) * canvas.height;
  ctx.strokeStyle = "rgba(59, 130, 246, 0.65)";
  ctx.beginPath();
  ctx.moveTo(0, capricornY);
  ctx.lineTo(canvas.width, capricornY);
  ctx.stroke();
  ctx.setLineDash([]);

  // 82°30'E Standard Meridian (IST)
  const istX = ((82.5 + 180) / 360) * canvas.width;
  ctx.lineWidth = 2;
  ctx.strokeStyle = "rgba(16, 185, 129, 0.85)";
  ctx.beginPath();
  ctx.moveTo(istX, ((90 - 38) / 180) * canvas.height);
  ctx.lineTo(istX, ((90 - 7) / 180) * canvas.height);
  ctx.stroke();
  ctx.fillStyle = "#10b981";
  ctx.fillText("82°30'E IST", istX + 6, cancerY + 24);

  // Continents vector shapes
  const drawLand = (coords: [number, number][], fillColor = "#163832", strokeColor = "#34d399") => {
    ctx.beginPath();
    coords.forEach(([lat, lng], i) => {
      const x = ((lng + 180) / 360) * canvas.width;
      const y = ((90 - lat) / 180) * canvas.height;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.fillStyle = fillColor;
    ctx.fill();
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 1.2;
    ctx.stroke();
  };

  // India
  drawLand([
    [35.5, 74.0], [37.0, 75.5], [36.0, 78.0], [33.0, 79.5],
    [31.0, 81.0], [28.5, 84.0], [27.5, 89.0], [28.0, 97.0],
    [24.0, 94.0], [22.0, 92.0], [21.5, 87.5], [17.5, 83.0],
    [13.0, 80.2], [10.0, 79.8], [8.1, 77.5], [10.5, 76.0],
    [15.0, 73.8], [19.0, 72.8], [21.0, 72.5], [23.5, 68.5],
    [24.5, 71.0], [27.0, 70.0], [31.5, 74.5], [35.5, 74.0]
  ], "#064e3b", "#10b981");

  // Eurasia
  drawLand([
    [70, 20], [72, 80], [68, 140], [60, 165], [45, 140],
    [35, 120], [22, 110], [10, 105], [5, 100], [20, 90],
    [30, 60], [30, 35], [40, 25], [50, 10], [60, 5], [70, 20]
  ], "#1e293b", "#475569");

  // Africa
  drawLand([
    [35, -5], [37, 10], [32, 32], [12, 51], [2, 45],
    [-12, 40], [-25, 33], [-34, 25], [-34, 18], [-20, 12],
    [-5, 9], [5, 2], [5, -10], [15, -17], [28, -12], [35, -5]
  ], "#334155", "#64748b");

  // Australia
  drawLand([
    [-12, 131], [-15, 145], [-25, 153], [-38, 145],
    [-35, 116], [-22, 114], [-15, 124], [-12, 131]
  ], "#334155", "#64748b");

  // North America
  drawLand([
    [70, -165], [72, -120], [60, -75], [45, -60], [30, -80],
    [25, -80], [18, -95], [10, -85], [15, -95], [20, -105],
    [32, -118], [48, -125], [60, -145], [70, -165]
  ], "#1e293b", "#475569");

  // South America
  drawLand([
    [10, -75], [5, -50], [-10, -35], [-25, -45],
    [-40, -60], [-55, -68], [-45, -75], [-20, -70],
    [-5, -80], [5, -78], [10, -75]
  ], "#334155", "#64748b");

  // Label India
  ctx.fillStyle = "#34d399";
  ctx.font = "bold 22px sans-serif";
  const indiaX = ((78 + 180) / 360) * canvas.width;
  const indiaY = ((90 - 22) / 180) * canvas.height;
  ctx.fillText("BHARAT / INDIA", indiaX - 70, indiaY);

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  cachedTexture = tex;
  return tex;
}

export default function Globe3D({
  onSelectFeature,
  activeLayers,
  focusCoords,
  highlightedHq,
  highlightAllCategory,
}: Globe3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // Draggable Globe Navigation HUD
  const [globeHudPos, setGlobeHudPos] = useState({ x: 0, y: 0 });
  const [isDraggingGlobeHud, setIsDraggingGlobeHud] = useState(false);
  const [isGlobeHudCollapsed, setIsGlobeHudCollapsed] = useState(false);
  const globeHudDragStartRef = useRef({ mouseX: 0, mouseY: 0, startX: 0, startY: 0 });

  useEffect(() => {
    if (!isDraggingGlobeHud) return;
    const onMove = (e: MouseEvent) => {
      const dx = e.clientX - globeHudDragStartRef.current.mouseX;
      const dy = e.clientY - globeHudDragStartRef.current.mouseY;
      setGlobeHudPos({
        x: globeHudDragStartRef.current.startX + dx,
        y: globeHudDragStartRef.current.startY + dy,
      });
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const dx = e.touches[0].clientX - globeHudDragStartRef.current.mouseX;
        const dy = e.touches[0].clientY - globeHudDragStartRef.current.mouseY;
        setGlobeHudPos({
          x: globeHudDragStartRef.current.startX + dx,
          y: globeHudDragStartRef.current.startY + dy,
        });
      }
    };
    const onUp = () => setIsDraggingGlobeHud(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", onUp);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onUp);
    };
  }, [isDraggingGlobeHud]);

  // Three.js instances
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const globeGroupRef = useRef<THREE.Group | null>(null);
  const markersGroupRef = useRef<THREE.Group | null>(null);
  const boundariesGroupRef = useRef<THREE.Group | null>(null);
  const reqIdRef = useRef<number | null>(null);

  // Interaction tracking
  const isDraggingRef = useRef(false);
  const prevMousePosRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef({ x: 0.35, y: -2.25 }); // Centered on India

  // Fast coordinate conversion
  const latLngToVector3 = (lat: number, lng: number, radius: number): THREE.Vector3 => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);
    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);
    return new THREE.Vector3(x, y, z);
  };

  // Instant fly to target
  const flyTo = useCallback((lat: number, lng: number) => {
    const targetY = -(lng * (Math.PI / 180)) - Math.PI / 2;
    const targetX = lat * (Math.PI / 180);
    targetRotationRef.current = {
      x: Math.max(-1.2, Math.min(1.2, targetX)),
      y: targetY,
    };
    setAutoRotate(false);
  }, []);

  useEffect(() => {
    if (focusCoords) {
      flyTo(focusCoords.lat, focusCoords.lng);
    }
  }, [focusCoords, flyTo]);

  // Fast Initial Mount
  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 500;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 2.6;
    cameraRef.current = camera;

    // 3. Renderer with powerPreference: 'high-performance'
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    container.innerHTML = "";
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);
    const sunLight = new THREE.DirectionalLight(0xffffff, 2.0);
    sunLight.position.set(5, 3, 5);
    scene.add(sunLight);

    // 5. Globe Group
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);
    globeGroupRef.current = globeGroup;
    globeGroup.rotation.x = 0.35;
    globeGroup.rotation.y = -2.25;

    // Fast Earth Mesh
    const radius = 1.0;
    const globeGeo = new THREE.SphereGeometry(radius, 32, 32);
    const globeTexture = getSharedEarthTexture();
    const globeMat = new THREE.MeshStandardMaterial({
      map: globeTexture,
      roughness: 0.8,
      metalness: 0.1,
    });
    const globeMesh = new THREE.Mesh(globeGeo, globeMat);
    globeGroup.add(globeMesh);

    // Atmosphere Glow
    const atmosphereGeo = new THREE.SphereGeometry(radius * 1.02, 24, 24);
    const atmosphereMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.15,
      side: THREE.BackSide,
    });
    const atmosphereMesh = new THREE.Mesh(atmosphereGeo, atmosphereMat);
    scene.add(atmosphereMesh);

    // Markers and Lines Groups
    const markersGroup = new THREE.Group();
    globeGroup.add(markersGroup);
    markersGroupRef.current = markersGroup;

    const boundariesGroup = new THREE.Group();
    globeGroup.add(boundariesGroup);
    boundariesGroupRef.current = boundariesGroup;

    // Immediate first render frame so screen is never blank
    renderer.render(scene, camera);

    // Resize Handler
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      if (w === 0 || h === 0) return;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // Animation loop
    const animate = () => {
      reqIdRef.current = requestAnimationFrame(animate);

      if (globeGroupRef.current) {
        if (autoRotate && !isDraggingRef.current) {
          globeGroupRef.current.rotation.y += 0.002;
        } else if (!isDraggingRef.current) {
          globeGroupRef.current.rotation.y +=
            (targetRotationRef.current.y - globeGroupRef.current.rotation.y) * 0.06;
          globeGroupRef.current.rotation.x +=
            (targetRotationRef.current.x - globeGroupRef.current.rotation.x) * 0.06;
        }
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      if (reqIdRef.current) cancelAnimationFrame(reqIdRef.current);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      globeGeo.dispose();
      globeMat.dispose();
      atmosphereGeo.dispose();
      atmosphereMat.dispose();
    };
  }, []);

  // Shared reusable geometries & materials for markers
  const markerGeoRef = useRef(new THREE.SphereGeometry(0.018, 8, 8));
  const pinGeoRef = useRef(new THREE.SphereGeometry(0.025, 10, 10));

  // Update Markers
  useEffect(() => {
    if (!markersGroupRef.current) return;
    const group = markersGroupRef.current;

    while (group.children.length > 0) {
      group.remove(group.children[0]);
    }

    const radius = 1.008;

    const addMarker = (
      lat: number,
      lng: number,
      color: number,
      data: any,
      isLarge = false
    ) => {
      const pos = latLngToVector3(lat, lng, radius);
      const geo = isLarge ? pinGeoRef.current : markerGeoRef.current;
      const mat = new THREE.MeshBasicMaterial({ color });
      const marker = new THREE.Mesh(geo, mat);
      marker.position.copy(pos);
      marker.userData = data;
      group.add(marker);
    };

    // Mountains
    if (activeLayers.mountains) {
      INDIAN_MOUNTAINS.forEach((m) => {
        addMarker(m.coordinates[0], m.coordinates[1], 0x10b981, {
          title: m.name,
          category: "Mountain / Peak",
          elevation: `${m.elevationM} m`,
          description: m.description,
          significance: m.significance,
          ncertChapter: m.ncertChapter,
        });
      });
    }

    // Rivers (Sources and Deltas)
    if (activeLayers.rivers) {
      INDIAN_RIVERS.forEach((r) => {
        const origin = r.path[0];
        const mouth = r.path[r.path.length - 1];
        addMarker(origin[0], origin[1], 0x0284c7, {
          title: `${r.name} (Source: ${r.origin})`,
          category: "River Origin",
          length: `${r.lengthKm} km`,
          description: r.description,
          ncertChapter: r.ncertChapter,
        });
        addMarker(mouth[0], mouth[1], 0x38bdf8, {
          title: `${r.name} (Delta / Outflow)`,
          category: "River Mouth",
          length: `${r.lengthKm} km`,
          description: r.description,
          ncertChapter: r.ncertChapter,
        });
      });
    }

    // Class 12 Map Items (Mines & Ports)
    if (activeLayers.mapItems) {
      CBSE_MAP_ITEMS.forEach((item) => {
        const color =
          item.category === "iron_ore"
            ? 0xf59e0b
            : item.category === "coal"
            ? 0x64748b
            : item.category === "petroleum"
            ? 0xa855f7
            : 0x06b6d4;

        addMarker(
          item.coordinates[0],
          item.coordinates[1],
          color,
          {
            title: item.name,
            category: `CBSE Class 12 Map Item (${item.category.toUpperCase()})`,
            state: item.state,
            description: item.significance,
            ncertChapter: "Class 12 - India: People and Economy, Ch 5 & 8",
          },
          false
        );
      });
    }

    // Headquarters & Highlighter markers
    const hqsToRender: HeadquartersFeature[] = [];
    if (highlightedHq) {
      hqsToRender.push(highlightedHq);
    }
    if (highlightAllCategory) {
      HEADQUARTERS_DATA.filter((h) => h.category === highlightAllCategory).forEach((h) => {
        if (!hqsToRender.some((item) => item.id === h.id)) {
          hqsToRender.push(h);
        }
      });
    }

    hqsToRender.forEach((hq) => {
      const isPrimary = highlightedHq?.id === hq.id;
      addMarker(
        hq.coordinates[0],
        hq.coordinates[1],
        isPrimary ? 0x10b981 : 0x38bdf8,
        {
          id: hq.id,
          title: `${hq.shortName} (${hq.name})`,
          category: hq.categoryLabel,
          headquartersCity: hq.city,
          state: `${hq.city}, ${hq.state}`,
          parentMinistry: hq.parentMinistryOrBody,
          establishedYear: hq.establishedYear,
          jurisdictionOrScope: hq.jurisdictionOrScope,
          cbseExamRelevance: hq.cbseExamRelevance,
          description: hq.significance,
          ncertChapter: hq.ncertChapterRef,
          classGrade: hq.classGrade,
          isHeadquarters: true,
        },
        true
      );
    });

    // 5. Tectonic Nodes (Mid-Atlantic Ridge & Major Plate Boundaries Clickable Pins)
    TECTONIC_PLATES.forEach((feat) => {
      if (feat.polyline && feat.polyline.length > 0) {
        // Place prominent clickable 3D beacon near center of boundary
        const midIdx = Math.floor(feat.polyline.length / 2);
        const centerCoord = feat.polyline[midIdx];
        const isDivergent = feat.boundaryType === "divergent";
        addMarker(
          centerCoord[0],
          centerCoord[1],
          isDivergent ? 0xec4899 : 0xf97316,
          {
            title: feat.name,
            category: "Plate Tectonics / Boundary",
            boundaryType: feat.boundaryType,
            speed: feat.speedMmPerYear ? `${feat.speedMmPerYear} mm/year` : undefined,
            associatedFeatures: feat.associatedFeatures,
            description: feat.description,
            ncertChapter: feat.ncertChapter,
            classGrade: "11",
          },
          true
        );
      }
    });
  }, [activeLayers, highlightedHq, highlightAllCategory]);

  // Fast Line Boundaries
  useEffect(() => {
    if (!boundariesGroupRef.current) return;
    const group = boundariesGroupRef.current;

    while (group.children.length > 0) {
      group.remove(group.children[0]);
    }

    const radius = 1.004;

    // Fast WebGL Lines for Tectonics
    if (activeLayers.tectonics) {
      TECTONIC_PLATES.forEach((feat) => {
        if (feat.polyline) {
          const points = feat.polyline.map(([lat, lng]) =>
            latLngToVector3(lat, lng, radius)
          );
          const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
          const lineMat = new THREE.LineBasicMaterial({
            color: feat.boundaryType === "divergent" ? 0xec4899 : 0xf97316,
            linewidth: 2,
          });
          const line = new THREE.Line(lineGeo, lineMat);
          group.add(line);
        }
      });
    }

    // Fast WebGL Lines for Rivers
    if (activeLayers.rivers) {
      INDIAN_RIVERS.forEach((river) => {
        const points = river.path.map(([lat, lng]) =>
          latLngToVector3(lat, lng, radius)
        );
        const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
        const lineMat = new THREE.LineBasicMaterial({
          color: 0x06b6d4,
          linewidth: 2,
        });
        const line = new THREE.Line(lineGeo, lineMat);
        group.add(line);
      });
    }
  }, [activeLayers]);

  // Mouse Orbit
  const onMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    prevMousePosRef.current = { x: e.clientX, y: e.clientY };
    setAutoRotate(false);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;

    if (isDraggingRef.current && globeGroupRef.current) {
      const deltaX = e.clientX - prevMousePosRef.current.x;
      const deltaY = e.clientY - prevMousePosRef.current.y;

      globeGroupRef.current.rotation.y += deltaX * 0.006;
      globeGroupRef.current.rotation.x += deltaY * 0.006;
      globeGroupRef.current.rotation.x = Math.max(
        -1.3,
        Math.min(1.3, globeGroupRef.current.rotation.x)
      );

      targetRotationRef.current = {
        x: globeGroupRef.current.rotation.x,
        y: globeGroupRef.current.rotation.y,
      };

      prevMousePosRef.current = { x: e.clientX, y: e.clientY };
    }

    // Raycast hover
    if (cameraRef.current && markersGroupRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(new THREE.Vector2(mouseX, mouseY), cameraRef.current);
      const intersects = raycaster.intersectObjects(markersGroupRef.current.children, true);
      if (intersects.length > 0 && intersects[0].object.userData.title) {
        setHoveredItem(intersects[0].object.userData.title);
      } else {
        setHoveredItem(null);
      }
    }
  };

  const onMouseUp = () => {
    isDraggingRef.current = false;
  };

  const onClick = (e: React.MouseEvent) => {
    if (!containerRef.current || !cameraRef.current || !markersGroupRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(new THREE.Vector2(mouseX, mouseY), cameraRef.current);
    const intersects = raycaster.intersectObjects(markersGroupRef.current.children, true);
    if (intersects.length > 0 && intersects[0].object.userData.title) {
      if (onSelectFeature) {
        onSelectFeature(intersects[0].object.userData);
      }
    }
  };

  const handleZoom = (delta: number) => {
    if (!cameraRef.current) return;
    cameraRef.current.position.z = Math.max(1.6, Math.min(4.5, cameraRef.current.position.z + delta));
  };

  return (
    <div className="relative w-full h-full min-h-[500px] bg-radial from-slate-900 via-slate-950 to-black select-none overflow-hidden">
      {/* 3D Canvas */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onClick={onClick}
        onWheel={(e) => handleZoom(e.deltaY * 0.0015)}
      />

      {/* Hover Info Tag */}
      {hoveredItem && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 pointer-events-none z-20 px-4 py-2 rounded-full bg-slate-900/90 backdrop-blur-md border border-emerald-500/50 text-emerald-400 text-sm font-semibold shadow-xl flex items-center gap-2 animate-bounce">
          <MapPin className="w-4 h-4 text-emerald-400" />
          <span>{hoveredItem}</span>
          <span className="text-xs text-slate-400 font-normal">Click to inspect</span>
        </div>
      )}

      {/* Draggable HUD Floating Controls */}
      <div
        className="absolute bottom-6 left-6 z-20 select-none max-w-xs"
        style={{
          transform: `translate3d(${globeHudPos.x}px, ${globeHudPos.y}px, 0)`,
          touchAction: isDraggingGlobeHud ? "none" : "auto",
        }}
      >
        <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700/70 rounded-2xl p-2 shadow-2xl flex flex-col gap-1.5 text-xs text-slate-300">
          <div className="flex items-center justify-between pb-1.5 border-b border-slate-700/50 text-emerald-400">
            <div
              onMouseDown={(e) => {
                e.preventDefault();
                setIsDraggingGlobeHud(true);
                globeHudDragStartRef.current = {
                  mouseX: e.clientX,
                  mouseY: e.clientY,
                  startX: globeHudPos.x,
                  startY: globeHudPos.y,
                };
              }}
              onTouchStart={(e) => {
                if (e.touches.length > 0) {
                  setIsDraggingGlobeHud(true);
                  globeHudDragStartRef.current = {
                    mouseX: e.touches[0].clientX,
                    mouseY: e.touches[0].clientY,
                    startX: globeHudPos.x,
                    startY: globeHudPos.y,
                  };
                }
              }}
              onDoubleClick={() => setGlobeHudPos({ x: 0, y: 0 })}
              className="flex items-center gap-1.5 cursor-grab active:cursor-grabbing font-medium"
              title="Drag globe navigation console anywhere (Double-click to reset)"
            >
              <GripHorizontal className="w-3.5 h-3.5 text-emerald-400" />
              <Compass className="w-3.5 h-3.5" />
              <span>3D Globe View</span>
            </div>

            <div className="flex items-center gap-1">
              {(globeHudPos.x !== 0 || globeHudPos.y !== 0) && (
                <button
                  onClick={() => setGlobeHudPos({ x: 0, y: 0 })}
                  className="p-1 text-slate-400 hover:text-white rounded"
                  title="Reset position"
                >
                  <RotateCcw className="w-2.5 h-2.5" />
                </button>
              )}
              <button
                onClick={() => setIsGlobeHudCollapsed(!isGlobeHudCollapsed)}
                className="p-1 text-slate-400 hover:text-white rounded"
                title={isGlobeHudCollapsed ? "Expand" : "Collapse"}
              >
                {isGlobeHudCollapsed ? (
                  <ChevronUp className="w-3.5 h-3.5" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>

          {!isGlobeHudCollapsed && (
            <div className="flex flex-col gap-1.5 pt-1">
              <button
                onClick={() => flyTo(22.0, 78.5)}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 transition text-left"
              >
                <Sparkles className="w-3.5 h-3.5 shrink-0" />
                <span>Center on India</span>
              </button>
              <button
                onClick={() => {
                  flyTo(25.0, -45.0);
                  if (onSelectFeature) {
                    onSelectFeature({
                      title: "Mid-Atlantic Ridge",
                      category: "Tectonic Divergent Boundary",
                      boundaryType: "divergent",
                      speed: "25 mm/year",
                      elevation: "-2,500m (submarine rift)",
                      associatedFeatures: "Iceland volcanic rift, hydrothermal vents, symmetric magnetic striping",
                      description: "Continuous submarine mountain chain extending ~16,000 km along the floor of the Atlantic Ocean where North American and Eurasian plates pull apart as basalt magma wells up from the asthenosphere (Sea Floor Spreading).",
                      ncertChapter: "Class 11 - Fundamentals of Physical Geography, Ch 4: Plate Tectonics",
                      classGrade: "11",
                    });
                  }
                }}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 transition text-left"
              >
                <span>Mid-Atlantic Ridge</span>
              </button>
              <button
                onClick={() => {
                  flyTo(15.0, 140.0);
                  if (onSelectFeature) {
                    onSelectFeature({
                      title: "Circum-Pacific Ring of Fire & Mariana Trench",
                      category: "Convergent Subduction Zone",
                      boundaryType: "convergent",
                      elevation: "-11,034m (Challenger Deep)",
                      associatedFeatures: "75% of world active volcanoes, 90% of all earthquakes, island arcs",
                      description: "Horseshoe-shaped 40,000 km basin of convergent subduction zones where the oceanic Pacific Plate plunges beneath surrounding continental plates.",
                      ncertChapter: "Class 11 - Fundamentals of Physical Geography, Ch 4: Plate Tectonics",
                      classGrade: "11",
                    });
                  }
                }}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 transition text-left"
              >
                <span>Ring of Fire / Mariana</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Floating Zoom & Rotate controls (Positioned below the layers panel so it never overrides) */}
      <div className="absolute top-20 right-4 z-20 flex flex-col gap-2">
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className={`p-2 rounded-xl border backdrop-blur-md transition shadow-lg flex items-center gap-1.5 text-xs font-medium ${
            autoRotate
              ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-300"
              : "bg-slate-900/90 border-slate-700 text-slate-300 hover:bg-slate-800"
          }`}
          title="Toggle Auto Rotation"
        >
          <RotateCcw className={`w-3.5 h-3.5 ${autoRotate ? "animate-spin" : ""}`} />
          <span className="hidden sm:inline">{autoRotate ? "Rotate On" : "Rotate Off"}</span>
        </button>

        <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700/60 rounded-xl p-1 flex flex-col gap-1 shadow-lg">
          <button
            onClick={() => handleZoom(-0.4)}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleZoom(0.4)}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bottom status bar */}
      <div className="absolute bottom-2 right-6 z-20 text-[11px] text-slate-400/80 bg-slate-950/60 backdrop-blur px-3 py-1 rounded-full border border-slate-800/60 flex items-center gap-3">
        <span>Drag to Orbit</span>
        <span>•</span>
        <span>Scroll to Zoom</span>
        <span>•</span>
        <span>Click 3D beacon to inspect NCERT notes</span>
      </div>
    </div>
  );
}
