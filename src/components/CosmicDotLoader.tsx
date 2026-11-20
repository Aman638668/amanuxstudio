import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

interface CosmicDotLoaderProps {
  onComplete: () => void;
  duration?: number; // 7500ms for cinematic smoothness
}

// 3D Dot definition
interface Dot3D {
  x: number;
  y: number;
  z: number;
  baseX: number;
  baseY: number;
  baseZ: number;
  size: number;
  color: string;
  alpha: number;
  // Shatter physics
  shatterVx?: number;
  shatterVy?: number;
  shatterVz?: number;
  type: "galaxy" | "sun" | "orbit" | "planet" | "earth" | "atmosphere";
  meta?: any;
}

// Cubic bezier / smooth easing functions
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const easeOutQuint = (t: number) => 1 - Math.pow(1 - t, 5);

const clamp = (val: number, min: number, max: number) =>
  Math.max(min, Math.min(max, val));

export const CosmicDotLoader: React.FC<CosmicDotLoaderProps> = ({
  onComplete,
  duration = 7500,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [hudPhase, setHudPhase] = useState("GALAXY");
  const [isExiting, setIsExiting] = useState(false);

  // Mouse tracking
  const mouseRef = useRef({ x: 0, y: 0, smoothX: 0, smoothY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left - width / 2;
      mouseRef.current.y = e.clientY - rect.top - height / 2;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // -------------------------------------------------------------
    // 1. GENERATE CONTINUOUS COSMIC PARTICLES (100% DOTS)
    // -------------------------------------------------------------
    
    // SPECIFIC TARGET DOT IN GALAXY (Our Sun's cosmic address!)
    const TARGET_STAR_POS = { x: 190, y: 12, z: 95 };

    // A. GALAXY PARTICLES (1,800 dots)
    const galaxyDots: Dot3D[] = [];
    const GALAXY_COUNT = 1800;
    const ARMS = 4;

    for (let i = 0; i < GALAXY_COUNT; i++) {
      const arm = i % ARMS;
      const armAngle = (arm * (2 * Math.PI)) / ARMS;
      const dist = Math.pow(Math.random(), 1.5) * 620 + 20;
      const angle = armAngle + dist * 0.0078 + (Math.random() - 0.5) * 0.35;

      const gx = Math.cos(angle) * dist;
      const gz = Math.sin(angle) * dist;
      const gy = (Math.random() - 0.5) * Math.max(8, 60 - dist * 0.08);

      let color = "#3b82f6";
      let size = Math.random() * 1.8 + 0.8;
      let alpha = Math.random() * 0.6 + 0.3;

      if (dist < 65) {
        color = Math.random() > 0.4 ? "#ffffff" : "#fef08a";
        size = Math.random() * 2.2 + 1.2;
        alpha = Math.random() * 0.4 + 0.6;
      } else if (dist < 250) {
        color = Math.random() > 0.5 ? "#38bdf8" : "#60a5fa";
      } else {
        color = Math.random() > 0.5 ? "#818cf8" : "#2563eb";
        alpha = Math.random() * 0.5 + 0.25;
      }

      galaxyDots.push({
        x: gx, y: gy, z: gz,
        baseX: gx, baseY: gy, baseZ: gz,
        size, color, alpha,
        type: "galaxy",
        meta: {
          dist,
          angle,
          orbitSpeed: 0.0008 + (650 - dist) * 0.000007,
          isTargetStar: i === 0, // Dot 0 is our anchor
        }
      });
    }

    // Force dot 0 to be our precise TARGET STAR
    galaxyDots[0].x = TARGET_STAR_POS.x;
    galaxyDots[0].y = TARGET_STAR_POS.y;
    galaxyDots[0].z = TARGET_STAR_POS.z;
    galaxyDots[0].baseX = TARGET_STAR_POS.x;
    galaxyDots[0].baseY = TARGET_STAR_POS.y;
    galaxyDots[0].baseZ = TARGET_STAR_POS.z;
    galaxyDots[0].color = "#fbbf24";
    galaxyDots[0].size = 3.2;
    galaxyDots[0].alpha = 1.0;

    // B. SOLAR SYSTEM PARTICLES (Emerge from the target dot!)
    // 1. Central Sun dots (260 dots)
    const sunDots: Dot3D[] = [];
    const SUN_COUNT = 260;
    for (let i = 0; i < SUN_COUNT; i++) {
      const phi = Math.acos(-1 + (2 * i) / SUN_COUNT);
      const theta = Math.sqrt(SUN_COUNT * Math.PI) * phi;
      const r = 28 + (Math.random() - 0.5) * 5;
      const sx = r * Math.sin(phi) * Math.cos(theta);
      const sy = r * Math.sin(phi) * Math.sin(theta);
      const sz = r * Math.cos(phi);
      sunDots.push({
        x: sx, y: sy, z: sz,
        baseX: sx, baseY: sy, baseZ: sz,
        size: Math.random() * 2.2 + 1.2,
        color: Math.random() > 0.35 ? "#fbbf24" : "#ffffff",
        alpha: Math.random() * 0.4 + 0.6,
        type: "sun",
        meta: { r }
      });
    }

    // 2. Planets & Orbital Ring Dots
    const planetDots: Dot3D[] = [];
    const orbitRingDots: Dot3D[] = [];

    const PLANET_CONFIGS = [
      { name: "Mercury", orbitR: 60, speed: 2.8, size: 2.4, color: "#94a3b8", count: 8 },
      { name: "Venus",   orbitR: 90, speed: 2.0, size: 3.4, color: "#fde68a", count: 12 },
      { name: "Earth",   orbitR: 135, speed: 1.4, size: 4.6, color: "#38bdf8", count: 28, isTargetEarth: true },
      { name: "Mars",    orbitR: 180, speed: 1.1, size: 3.0, color: "#f87171", count: 10 },
      { name: "Jupiter", orbitR: 240, speed: 0.7, size: 7.5, color: "#fed7aa", count: 42 },
      { name: "Saturn",  orbitR: 300, speed: 0.5, size: 6.4, color: "#fef08a", count: 32, hasRings: true },
      { name: "Uranus",  orbitR: 360, speed: 0.35, size: 4.8, color: "#a5f3fc", count: 16 },
      { name: "Neptune", orbitR: 420, speed: 0.25, size: 4.6, color: "#60a5fa", count: 16 },
    ];

    PLANET_CONFIGS.forEach((p) => {
      // Dotted orbital circle
      const ORBIT_DOT_COUNT = Math.floor(p.orbitR * 0.7);
      for (let o = 0; o < ORBIT_DOT_COUNT; o++) {
        const oAngle = (o / ORBIT_DOT_COUNT) * Math.PI * 2;
        orbitRingDots.push({
          x: Math.cos(oAngle) * p.orbitR,
          y: 0,
          z: Math.sin(oAngle) * p.orbitR,
          baseX: Math.cos(oAngle) * p.orbitR,
          baseY: 0,
          baseZ: Math.sin(oAngle) * p.orbitR,
          size: p.isTargetEarth ? 1.0 : 0.8,
          color: p.isTargetEarth ? "#38bdf8" : "#ffffff",
          alpha: p.isTargetEarth ? 0.35 : 0.12,
          type: "orbit",
          meta: { orbitR: p.orbitR, isTargetEarth: p.isTargetEarth }
        });
      }

      // Planet body dots
      const initialPhaseAngle = p.isTargetEarth ? 0.25 : Math.random() * Math.PI * 2;
      for (let d = 0; d < p.count; d++) {
        const phi = Math.acos(-1 + (2 * d) / p.count);
        const theta = Math.sqrt(p.count * Math.PI) * phi;
        const subR = (p.size * 0.75) * Math.random();
        planetDots.push({
          x: 0, y: 0, z: 0,
          baseX: 0, baseY: 0, baseZ: 0,
          size: Math.random() * 1.4 + 1.0,
          color: p.color,
          alpha: 0.9,
          type: "planet",
          meta: {
            name: p.name,
            orbitR: p.orbitR,
            orbitSpeed: p.speed,
            initialPhaseAngle,
            subX: subR * Math.sin(phi) * Math.cos(theta),
            subY: subR * Math.sin(phi) * Math.sin(theta),
            subZ: subR * Math.cos(phi),
            isTargetEarth: p.isTargetEarth
          }
        });
      }

      // Saturn Dotted Rings
      if (p.hasRings) {
        for (let r = 0; r < 90; r++) {
          const ringDist = p.size * 1.6 + Math.random() * (p.size * 1.5);
          const ringAng = Math.random() * Math.PI * 2;
          planetDots.push({
            x: 0, y: 0, z: 0,
            baseX: 0, baseY: 0, baseZ: 0,
            size: 0.7,
            color: "#fef08a",
            alpha: 0.5,
            type: "planet",
            meta: {
              isSaturnRing: true,
              orbitR: p.orbitR,
              orbitSpeed: p.speed,
              initialPhaseAngle,
              ringDist,
              ringAng
            }
          });
        }
      }
    });

    // C. EARTH GLOBE PARTICLES (1,400 dots Fibonacci Sphere)
    const earthGlobeDots: Dot3D[] = [];
    const EARTH_DOT_COUNT = 1400;
    const FINAL_EARTH_RADIUS = 135;

    // Harmonic continent mask function
    const isContinent = (lat: number, lon: number): boolean => {
      if (lat > 1.25 || lat < -1.2) return true; // Polar ice caps
      const h1 = Math.sin(lat * 2.2 + 0.4) * Math.cos(lon * 2.0);
      const h2 = Math.sin(lat * 4.2 + lon * 2.3) * 0.42;
      const h3 = Math.cos(lat * 1.8 - 0.5) * Math.sin(lon * 3.1) * 0.35;
      const h4 = Math.sin((lat + 0.2) * 3.4) * Math.cos((lon - 1.2) * 1.9) * 0.45;
      return h1 + h2 + h3 + h4 > 0.12;
    };

    for (let i = 0; i < EARTH_DOT_COUNT; i++) {
      const y = 1 - (i / (EARTH_DOT_COUNT - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const phi = i * Math.PI * (3 - Math.sqrt(5)); // Golden angle

      const x = Math.cos(phi) * radiusAtY;
      const z = Math.sin(phi) * radiusAtY;

      const lat = Math.asin(y);
      const lon = Math.atan2(z, x);
      const land = isContinent(lat, lon);

      let color = land ? "#34d399" : "#2563eb"; // Emerald continents vs Royal Blue ocean
      let size = land ? Math.random() * 1.8 + 1.3 : Math.random() * 1.2 + 0.8;
      let alpha = land ? Math.random() * 0.3 + 0.75 : Math.random() * 0.3 + 0.3;

      if (land && Math.random() > 0.6) {
        color = "#38bdf8"; // Cyan coasts
      }

      earthGlobeDots.push({
        x: x * FINAL_EARTH_RADIUS,
        y: y * FINAL_EARTH_RADIUS,
        z: z * FINAL_EARTH_RADIUS,
        baseX: x * FINAL_EARTH_RADIUS,
        baseY: y * FINAL_EARTH_RADIUS,
        baseZ: z * FINAL_EARTH_RADIUS,
        size, color, alpha,
        type: "earth",
        meta: { land, lat, lon }
      });
    }

    // Atmosphere Shimmer Dots Shell
    const ATMO_COUNT = 280;
    for (let i = 0; i < ATMO_COUNT; i++) {
      const phi = Math.acos(-1 + (2 * i) / ATMO_COUNT);
      const theta = Math.sqrt(ATMO_COUNT * Math.PI) * phi;
      const atmoR = FINAL_EARTH_RADIUS + 15 + Math.random() * 10;

      const ax = atmoR * Math.sin(phi) * Math.cos(theta);
      const ay = atmoR * Math.sin(phi) * Math.sin(theta);
      const az = atmoR * Math.cos(phi);

      earthGlobeDots.push({
        x: ax, y: ay, z: az,
        baseX: ax, baseY: ay, baseZ: az,
        size: Math.random() * 1.4 + 0.8,
        color: Math.random() > 0.4 ? "#67e8f9" : "#ffffff",
        alpha: Math.random() * 0.4 + 0.25,
        type: "atmosphere",
        meta: { isAtmosphere: true }
      });
    }

    // Combine all dots into an array for global shatter processing
    const allDotsMasterList: Dot3D[] = [
      ...galaxyDots,
      ...sunDots,
      ...orbitRingDots,
      ...planetDots,
      ...earthGlobeDots,
    ];

    // Assign outward radial shatter velocities
    allDotsMasterList.forEach((dot) => {
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;
      const speed = Math.random() * 32 + 12; // Explosive velocity
      dot.shatterVx = Math.cos(theta) * Math.cos(phi) * speed;
      dot.shatterVy = Math.sin(phi) * speed;
      dot.shatterVz = Math.sin(theta) * Math.cos(phi) * speed;
    });

    // -------------------------------------------------------------
    // CONTINUOUS ANIMATION TIMELINE (0.00 to 1.00)
    // -------------------------------------------------------------
    const startTime = performance.now();
    let galaxyRotationAngle = 0;
    let solarTime = 0;
    let earthSpinAngle = 0;

    const render = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const rawProgress = Math.min(1.0, elapsed / duration);
      setProgress(Math.floor(rawProgress * 100));

      // Smooth mouse interpolation
      mouseRef.current.smoothX += (mouseRef.current.x - mouseRef.current.smoothX) * 0.05;
      mouseRef.current.smoothY += (mouseRef.current.y - mouseRef.current.smoothY) * 0.05;

      const normMouseX = mouseRef.current.smoothX / (width / 2);
      const normMouseY = mouseRef.current.smoothY / (height / 2);

      // -------------------------------------------------------------
      // FIVE CONTINUOUS PHASE WINDOWS:
      // Window 1: 0.00 - 0.28 (Galaxy view + hover stars)
      // Window 2: 0.28 - 0.48 (Continuous zoom diving into TARGET STAR)
      // Window 3: 0.48 - 0.70 (Target star expands into Sun -> Solar system blooms!)
      // Window 4: 0.70 - 0.90 (Continuous zoom into Earth dot -> Expands into 3D Globe)
      // Window 5: 0.90 - 1.00 (All dots SHATTER outwards in cosmic shockwave -> Page loads!)
      // -------------------------------------------------------------
      
      let phaseLabel = "GALAXY";
      if (rawProgress < 0.28) {
        phaseLabel = "01 // SPIRAL GALAXY // TARGETING SOLAR EMBRYO";
      } else if (rawProgress < 0.48) {
        phaseLabel = "02 // WARP APPROACH // DIVING INTO SOLAR ORB";
      } else if (rawProgress < 0.70) {
        phaseLabel = "03 // HELIOSPHERE BLOOM // SOLAR SYSTEM FORMATION";
      } else if (rawProgress < 0.90) {
        phaseLabel = "04 // ORBIT 03 APPROACH // EXPANDING PLANET EARTH";
      } else {
        phaseLabel = "05 // QUANTUM SHATTER // INITIALIZING AMAN UX STUDIO";
      }
      setHudPhase(phaseLabel);

      if (rawProgress >= 1.0) {
        setIsExiting(true);
        setTimeout(() => {
          onComplete();
        }, 350);
        return;
      }

      // Clear Canvas
      ctx.fillStyle = "#06070a";
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      galaxyRotationAngle += 0.0025;
      solarTime += 0.012;
      earthSpinAngle += 0.007;

      // SHATTER SHOCKWAVE FRACTION (0.90 to 1.00)
      const isShattering = rawProgress >= 0.90;
      const shatterProgress = isShattering ? (rawProgress - 0.90) / 0.10 : 0;
      const shatterEase = Math.pow(shatterProgress, 1.4);

      // =============================================================
      // STAGE 1 & 2: GALAXY & SMOOTH DIVE TO TARGET STAR
      // =============================================================
      // Galaxy is fully visible from 0.00 to 0.28, then dives in from 0.28 to 0.48
      if (rawProgress < 0.55 && !isShattering) {
        // Camera distance smoothly moves from 1100 down to 0 at target star
        let gCamDist = 1100;
        let focusX = 0;
        let focusY = 0;
        let focusZ = 0;
        let gAlpha = 1.0;

        if (rawProgress < 0.28) {
          // Subtle initial drift
          const t = rawProgress / 0.28;
          gCamDist = 1100 - t * 120;
          gAlpha = 1.0;
        } else {
          // Smooth dive into TARGET_STAR_POS
          const t = easeInOutCubic((rawProgress - 0.28) / 0.20);
          gCamDist = 980 - t * 880; // 980 down to 100
          focusX = TARGET_STAR_POS.x * t;
          focusY = TARGET_STAR_POS.y * t;
          focusZ = TARGET_STAR_POS.z * t;
          // Fade non-target stars as we reach the target
          gAlpha = Math.max(0.0, 1.0 - Math.pow(t, 2) * 0.95);
        }

        const rotX = 0.82 + normMouseY * 0.25;
        const rotY = galaxyRotationAngle + normMouseX * 0.25;
        const cosX = Math.cos(rotX);
        const sinX = Math.sin(rotX);
        const cosY = Math.cos(rotY);
        const sinY = Math.sin(rotY);

        ctx.save();
        for (let i = 0; i < galaxyDots.length; i++) {
          const pt = galaxyDots[i];
          const isTarget = pt.meta?.isTargetStar;

          // Arm orbit update
          pt.meta.angle += pt.meta.orbitSpeed;
          let gx = Math.cos(pt.meta.angle) * pt.meta.dist;
          let gz = Math.sin(pt.meta.angle) * pt.meta.dist;
          let gy = pt.baseY;

          if (isTarget) {
            gx = TARGET_STAR_POS.x;
            gy = TARGET_STAR_POS.y;
            gz = TARGET_STAR_POS.z;
          }

          // Relative to camera focus point
          const relX = gx - focusX;
          const relY = gy - focusY;
          const relZ = gz - focusZ;

          // 3D Rotation
          const x1 = relX * cosY - relZ * sinY;
          const z1 = relX * sinY + relZ * cosY;
          const y2 = relY * cosX - z1 * sinX;
          const z2 = relY * sinX + z1 * cosX;

          const fov = 500;
          const depth = z2 + gCamDist;
          if (depth <= 15) continue;

          const scale = fov / depth;
          let screenX = cx + x1 * scale;
          let screenY = cy + y2 * scale;

          // Hover displacement on galaxy phase
          if (rawProgress < 0.35 && !isTarget) {
            const dx = screenX - (cx + mouseRef.current.smoothX);
            const dy = screenY - (cy + mouseRef.current.smoothY);
            const distToMouse = Math.sqrt(dx * dx + dy * dy);
            const hoverRadius = 140;
            if (distToMouse < hoverRadius && distToMouse > 0) {
              const force = (1 - distToMouse / hoverRadius) * 25;
              screenX += (dx / distToMouse) * force + (-dy / distToMouse) * (force * 0.4);
              screenY += (dy / distToMouse) * force + (dx / distToMouse) * (force * 0.4);
            }
          }

          // Size and glow
          let dotRadius = Math.max(0.4, pt.size * scale);
          let dotAlpha = pt.alpha * gAlpha;

          // The target star grows and pulses brilliantly as we approach!
          if (isTarget) {
            dotAlpha = 1.0;
            if (rawProgress >= 0.28) {
              const approachT = easeInOutCubic((rawProgress - 0.28) / 0.20);
              dotRadius = Math.max(dotRadius, 3.2 + approachT * 24); // Dot expands!
            } else {
              // Gentle pulsing beacon in galaxy
              const pulse = 1.0 + Math.sin(elapsed * 0.008) * 0.4;
              dotRadius *= pulse;
            }
          }

          ctx.beginPath();
          ctx.arc(screenX, screenY, dotRadius, 0, Math.PI * 2);
          ctx.fillStyle = pt.color;
          ctx.globalAlpha = clamp(dotAlpha, 0, 1);
          ctx.fill();

          // Subtle corona beacon ring around the target star during approach
          if (isTarget && rawProgress < 0.48) {
            ctx.beginPath();
            ctx.arc(screenX, screenY, dotRadius * 1.8, 0, Math.PI * 2);
            ctx.strokeStyle = "#fbbf24";
            ctx.globalAlpha = 0.4;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
        ctx.restore();
      }

      // =============================================================
      // STAGE 3: TARGET DOT BLOOMS INTO SOLAR SYSTEM (0.45 to 0.75)
      // =============================================================
      // Current Earth position in solar system space for seamless tracking:
      const earthOrbitR = 135;
      const earthSpeed = 1.4;
      const currentEarthAngle = 0.25 + solarTime * earthSpeed;
      const earthSolarX = Math.cos(currentEarthAngle) * earthOrbitR;
      const earthSolarZ = Math.sin(currentEarthAngle) * earthOrbitR;

      if (rawProgress >= 0.42 && rawProgress < 0.78 && !isShattering) {
        // Solar system bloom progress: 0.45 to 0.58
        const bloomT = easeOutQuint(clamp((rawProgress - 0.45) / 0.13, 0, 1));
        
        // Solar system exit / zoom to Earth progress: 0.65 to 0.75
        const zoomToEarthT = easeInOutCubic(clamp((rawProgress - 0.65) / 0.10, 0, 1));

        // Camera focus shifts from Sun center (0,0,0) directly to Earth (earthSolarX, 0, earthSolarZ)
        const sCamDist = 720 - zoomToEarthT * 480; // 720 down to 240
        const camFocusX = earthSolarX * zoomToEarthT;
        const camFocusZ = earthSolarZ * zoomToEarthT;

        const sRotX = 0.62 + normMouseY * 0.35;
        const sRotY = solarTime * 0.25 + normMouseX * 0.35;
        const cosSX = Math.cos(sRotX);
        const sinSX = Math.sin(sRotX);
        const cosSY = Math.cos(sRotY);
        const sinSY = Math.sin(sRotY);

        ctx.save();

        // 1. Render Sun dots (Blooms outward from the target dot!)
        for (let i = 0; i < sunDots.length; i++) {
          const pt = sunDots[i];
          // Sun expands smoothly from dot radius 2px to 30px
          const curR = 2 + (pt.meta.r - 2) * bloomT;
          const pulse = 1.0 + Math.sin(solarTime * 3 + i) * 0.05;
          const wx = (pt.baseX / pt.meta.r) * curR * pulse - camFocusX;
          const wy = (pt.baseY / pt.meta.r) * curR * pulse;
          const wz = (pt.baseZ / pt.meta.r) * curR * pulse - camFocusZ;

          const x1 = wx * cosSY - wz * sinSY;
          const z1 = wx * sinSY + wz * cosSY;
          const y2 = wy * cosSX - z1 * sinSX;
          const z2 = wy * sinSX + z1 * cosSX;

          const depth = z2 + sCamDist;
          if (depth <= 15) continue;
          const scale = 500 / depth;

          const dotRadius = Math.max(0.4, pt.size * scale * (0.8 + bloomT * 0.4));
          const sunAlpha = pt.alpha * clamp(bloomT * 1.5, 0, 1) * (1 - zoomToEarthT * 0.85);

          ctx.beginPath();
          ctx.arc(cx + x1 * scale, cy + y2 * scale, dotRadius, 0, Math.PI * 2);
          ctx.fillStyle = pt.color;
          ctx.globalAlpha = clamp(sunAlpha, 0, 1);
          ctx.fill();
        }

        // 2. Render Orbital Rings (Expand from center)
        if (bloomT > 0.15) {
          const ringExpansion = easeOutQuint(clamp((bloomT - 0.15) / 0.85, 0, 1));
          for (let i = 0; i < orbitRingDots.length; i++) {
            const pt = orbitRingDots[i];
            const curOrbitR = pt.meta.orbitR * ringExpansion;
            const wx = (pt.baseX / pt.meta.orbitR) * curOrbitR - camFocusX;
            const wy = 0;
            const wz = (pt.baseZ / pt.meta.orbitR) * curOrbitR - camFocusZ;

            const x1 = wx * cosSY - wz * sinSY;
            const z1 = wx * sinSY + wz * cosSY;
            const y2 = wy * cosSX - z1 * sinSX;
            const z2 = wy * sinSX + z1 * cosSX;

            const depth = z2 + sCamDist;
            if (depth <= 15) continue;
            const scale = 500 / depth;

            ctx.beginPath();
            ctx.arc(cx + x1 * scale, cy + y2 * scale, Math.max(0.3, pt.size * scale), 0, Math.PI * 2);
            ctx.fillStyle = pt.color;
            ctx.globalAlpha = pt.alpha * ringExpansion * (1 - zoomToEarthT * 0.85);
            ctx.fill();
          }
        }

        // 3. Render Planets (Unfurl from center outward)
        if (bloomT > 0.2) {
          const planetExpansion = easeOutQuint(clamp((bloomT - 0.2) / 0.8, 0, 1));
          for (let i = 0; i < planetDots.length; i++) {
            const pt = planetDots[i];
            const curAngle = pt.meta.initialPhaseAngle + solarTime * pt.meta.orbitSpeed;
            const curOrbitR = pt.meta.orbitR * planetExpansion;

            let px = Math.cos(curAngle) * curOrbitR;
            let py = 0;
            let pz = Math.sin(curAngle) * curOrbitR;

            if (pt.meta?.isSaturnRing) {
              px += Math.cos(pt.meta.ringAng) * (pt.meta.ringDist * planetExpansion);
              py += (Math.sin(pt.meta.ringAng) * pt.meta.ringDist * 0.2) * planetExpansion;
              pz += Math.sin(pt.meta.ringAng) * (pt.meta.ringDist * planetExpansion);
            } else {
              px += pt.meta.subX * planetExpansion;
              py += pt.meta.subY * planetExpansion;
              pz += pt.meta.subZ * planetExpansion;
            }

            const wx = px - camFocusX;
            const wy = py;
            const wz = pz - camFocusZ;

            const x1 = wx * cosSY - wz * sinSY;
            const z1 = wx * sinSY + wz * cosSY;
            const y2 = wy * cosSX - z1 * sinSX;
            const z2 = wy * sinSX + z1 * cosSX;

            const depth = z2 + sCamDist;
            if (depth <= 15) continue;
            const scale = 500 / depth;

            const isEarth = pt.meta?.isTargetEarth;
            let dotRadius = Math.max(0.4, pt.size * scale);
            let dotAlpha = pt.alpha * planetExpansion;

            // If it's Earth and we are zooming into it, Earth grows larger!
            if (isEarth) {
              dotRadius = Math.max(dotRadius, 2.5 + zoomToEarthT * 18);
              dotAlpha = 1.0;
            } else {
              dotAlpha *= (1 - zoomToEarthT * 0.9);
            }

            ctx.beginPath();
            ctx.arc(cx + x1 * scale, cy + y2 * scale, dotRadius, 0, Math.PI * 2);
            ctx.fillStyle = pt.color;
            ctx.globalAlpha = clamp(dotAlpha, 0, 1);
            ctx.fill();
          }
        }

        ctx.restore();
      }

      // =============================================================
      // STAGE 4: EARTH GLOBE OF DOTS (0.70 to 0.90)
      // =============================================================
      // Earth expands from that single Earth dot into the full 3D sphere!
      if (rawProgress >= 0.70 && rawProgress < 0.92 && !isShattering) {
        // Earth spherical expansion: 0.70 to 0.78
        const earthSphereExpansion = easeOutQuint(clamp((rawProgress - 0.70) / 0.08, 0, 1));
        
        // 3D rotation with mouse tilt
        const eRotX = 0.22 + normMouseY * 0.45;
        const eRotY = earthSpinAngle + normMouseX * 0.65;
        const cosEX = Math.cos(eRotX);
        const sinEX = Math.sin(eRotX);
        const cosEY = Math.cos(eRotY);
        const sinEY = Math.sin(eRotY);

        const projectedGlobeDots: {
          screenX: number;
          screenY: number;
          radius: number;
          color: string;
          alpha: number;
          z: number;
        }[] = [];

        for (let i = 0; i < earthGlobeDots.length; i++) {
          const pt = earthGlobeDots[i];

          // Expand from dot 0,0,0 outward to full radius!
          const curBaseX = pt.baseX * earthSphereExpansion;
          const curBaseY = pt.baseY * earthSphereExpansion;
          const curBaseZ = pt.baseZ * earthSphereExpansion;

          const x1 = curBaseX * cosEY - curBaseZ * sinEY;
          const z1 = curBaseX * sinEY + curBaseZ * cosEY;
          const y2 = curBaseY * cosEX - z1 * sinEX;
          const z2 = curBaseY * sinEX + z1 * cosEX;

          const depth = z2 + 270;
          if (depth <= 15) continue;
          const scale = 500 / depth;

          const screenX = cx + x1 * scale;
          const screenY = cy + y2 * scale;

          // 3D sphere volume shading
          const normZ = z2 / (FINAL_EARTH_RADIUS * earthSphereExpansion || 1);
          let dotAlpha = normZ > 0 ? 0.95 : Math.max(0.18, 0.95 + normZ * 0.78);

          if (pt.type === "atmosphere") {
            dotAlpha = (Math.sin(elapsed * 0.005 + i) * 0.2 + 0.6) * earthSphereExpansion;
          } else {
            dotAlpha *= earthSphereExpansion;
          }

          projectedGlobeDots.push({
            screenX,
            screenY,
            radius: Math.max(0.5, pt.size * scale),
            color: pt.color,
            alpha: pt.alpha * dotAlpha,
            z: z2
          });
        }

        // Sort back-to-front for clean sphere volume
        projectedGlobeDots.sort((a, b) => a.z - b.z);

        ctx.save();
        for (let i = 0; i < projectedGlobeDots.length; i++) {
          const d = projectedGlobeDots[i];
          if (d.alpha <= 0.02) continue;
          ctx.beginPath();
          ctx.arc(d.screenX, d.screenY, d.radius, 0, Math.PI * 2);
          ctx.fillStyle = d.color;
          ctx.globalAlpha = clamp(d.alpha, 0, 1);
          ctx.fill();
        }
        ctx.restore();
      }

      // =============================================================
      // STAGE 5: ALL DOTS SHATTER OUTWARD IN SHOCKWAVE (0.90 to 1.00)
      // =============================================================
      if (isShattering) {
        ctx.save();

        // Shockwave rings made of dots expanding from the center
        const shockwaveRadius = shatterEase * (Math.max(width, height) * 0.85);
        const RING_DOTS = 90;
        for (let s = 0; s < RING_DOTS; s++) {
          const sAng = (s / RING_DOTS) * Math.PI * 2;
          const rx = cx + Math.cos(sAng) * shockwaveRadius;
          const ry = cy + Math.sin(sAng) * shockwaveRadius;
          ctx.beginPath();
          ctx.arc(rx, ry, Math.max(0.5, 2.0 * (1 - shatterEase)), 0, Math.PI * 2);
          ctx.fillStyle = "#38bdf8";
          ctx.globalAlpha = Math.max(0, (1 - shatterEase) * 0.7);
          ctx.fill();
        }

        // Shatter all Earth & Celestial dots with explosive 3D velocity
        for (let i = 0; i < allDotsMasterList.length; i++) {
          const pt = allDotsMasterList[i];
          if (i % 2 !== 0 && pt.type === "galaxy") continue; // sample for performance

          // Propel outward
          const sx = pt.baseX + (pt.shatterVx || 0) * shatterEase * 22;
          const sy = pt.baseY + (pt.shatterVy || 0) * shatterEase * 22;
          const sz = pt.baseZ + (pt.shatterVz || 0) * shatterEase * 22;

          const depth = sz + 270;
          if (depth <= 10) continue;
          const scale = 500 / depth;

          const screenX = cx + sx * scale;
          const screenY = cy + sy * scale;

          if (screenX < -50 || screenX > width + 50 || screenY < -50 || screenY > height + 50) {
            continue;
          }

          const dotRadius = Math.max(0.4, pt.size * scale * (1 + shatterEase * 1.5));
          const shatterAlpha = pt.alpha * Math.max(0, 1 - shatterEase * 1.3);

          if (shatterAlpha <= 0.01) continue;

          ctx.beginPath();
          ctx.arc(screenX, screenY, dotRadius, 0, Math.PI * 2);
          ctx.fillStyle = pt.color;
          ctx.globalAlpha = clamp(shatterAlpha, 0, 1);
          ctx.fill();
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    // Escape key skip
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsExiting(true);
        setTimeout(onComplete, 200);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [duration, onComplete]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          key="cosmic-continuous-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[99999] bg-[#06070a] text-white flex flex-col justify-between select-none overflow-hidden"
        >
          {/* Pure HTML5 Canvas Dot Engine */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full cursor-crosshair"
          />

          {/* Top Telemetry Header */}
          <header className="relative z-10 flex items-center justify-between px-6 sm:px-10 py-6 pointer-events-auto">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-ping" />
              <div className="text-xs font-mono tracking-widest text-[#94a3b8] uppercase">
                <span className="text-white font-semibold">AMAN UX STUDIO</span>
                <span className="mx-2 text-[#475569]">//</span>
                <span className="text-blue-400">CONTINUOUS SCALE INTRO</span>
              </div>
            </div>

            <button
              onClick={() => {
                setIsExiting(true);
                setTimeout(onComplete, 200);
              }}
              className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-[#cbd5e1] hover:text-white transition-all backdrop-blur-md"
              title="Skip cosmic sequence"
            >
              <span>Skip Intro</span>
              <span className="text-[10px] text-[#64748b] bg-white/10 px-1.5 py-0.5 rounded">ESC</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </header>

          {/* Interactive Hint Indicator */}
          <div className="relative z-10 text-center pointer-events-none mb-auto pt-4">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/40 border border-blue-500/30 text-blue-300 text-[11px] font-mono tracking-wide backdrop-blur-md shadow-lg shadow-blue-950/50"
            >
              <Sparkles className="w-3 h-3 text-blue-400 animate-pulse" />
              <span>Hover cursor to guide stellar trajectory</span>
            </motion.div>
          </div>

          {/* Bottom Telemetry Footer */}
          <footer className="relative z-10 px-6 sm:px-10 pb-8 pointer-events-none">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                  <span className="text-xs font-mono uppercase tracking-widest text-blue-300 font-semibold">
                    {hudPhase}
                  </span>
                </div>
                <p className="text-[11px] font-mono text-[#64748b] max-w-md">
                  Seamless continuous zoom from cosmic spiral to terrestrial matrix dots.
                </p>
              </div>

              {/* Progress Percentage & Bar */}
              <div className="w-full sm:w-64 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#94a3b8]">TRANSIT TELEMETRY</span>
                  <span className="text-blue-400 font-bold">{progress}%</span>
                </div>
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-emerald-400 transition-all duration-100 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          </footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CosmicDotLoader;
