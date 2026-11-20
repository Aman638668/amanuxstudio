import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

interface CosmicDotLoaderProps {
  onComplete: () => void;
  duration?: number; // default 5000ms
}

interface Particle3D {
  x: number;
  y: number;
  z: number;
  baseX: number;
  baseY: number;
  baseZ: number;
  vx: number;
  vy: number;
  vz: number;
  size: number;
  color: string;
  alpha: number;
  phase: "galaxy" | "solar" | "earth" | "ambient";
  meta?: any;
}

export const CosmicDotLoader: React.FC<CosmicDotLoaderProps> = ({
  onComplete,
  duration = 5000,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState<
    "galaxy" | "solar" | "earth"
  >("galaxy");
  const [isExiting, setIsExiting] = useState(false);

  // Mouse tracking
  const mouseRef = useRef({ x: 0, y: 0, prevX: 0, prevY: 0, speed: 0 });

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

    // Track mouse
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const nx = (e.clientX - rect.left - width / 2);
      const ny = (e.clientY - rect.top - height / 2);
      const dx = nx - mouseRef.current.x;
      const dy = ny - mouseRef.current.y;
      mouseRef.current.speed = Math.sqrt(dx * dx + dy * dy);
      mouseRef.current.x = nx;
      mouseRef.current.y = ny;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // -------------------------------------------------------------
    // GENERATE PARTICLES (100% DOTS - NO IMAGES)
    // -------------------------------------------------------------
    const galaxyParticles: Particle3D[] = [];
    const solarParticles: Particle3D[] = [];
    const earthParticles: Particle3D[] = [];

    // 1. GALAXY PARTICLES (Logarithmic Spiral of Dots)
    const GALAXY_COUNT = 1800;
    const GALAXY_ARMS = 4;
    for (let i = 0; i < GALAXY_COUNT; i++) {
      const arm = i % GALAXY_ARMS;
      const armOffset = (arm * (2 * Math.PI)) / GALAXY_ARMS;
      // Distance from center with higher density toward core
      const distance = Math.pow(Math.random(), 1.6) * 650 + 15;
      const angle = armOffset + distance * 0.0075 + (Math.random() - 0.5) * 0.38;
      
      const x = Math.cos(angle) * distance;
      const z = Math.sin(angle) * distance;
      // Flatter spiral disk with thick core bulge
      const spread = Math.max(8, 55 - distance * 0.07);
      const y = (Math.random() - 0.5) * spread;

      // Color scheme based on distance from galactic core
      let color = "#3b82f6"; // Royal blue
      let size = Math.random() * 1.8 + 0.8;
      let alpha = Math.random() * 0.7 + 0.3;

      if (distance < 70) {
        // Core: Brilliant white/gold
        color = Math.random() > 0.4 ? "#ffffff" : "#fef08a";
        size = Math.random() * 2.4 + 1.2;
        alpha = Math.random() * 0.4 + 0.6;
      } else if (distance < 240) {
        // Inner arms: Electric cyan & blue
        color = Math.random() > 0.5 ? "#38bdf8" : "#60a5fa";
      } else {
        // Outer fringe: Deep indigo & soft violet
        color = Math.random() > 0.5 ? "#818cf8" : "#2563eb";
        alpha = Math.random() * 0.5 + 0.25;
      }

      galaxyParticles.push({
        x, y, z,
        baseX: x, baseY: y, baseZ: z,
        vx: 0, vy: 0, vz: 0,
        size, color, alpha,
        phase: "galaxy",
        meta: { distance, angle, originalSpeed: 0.001 + (600 - distance) * 0.000008 }
      });
    }

    // 2. SOLAR SYSTEM PARTICLES (Sun, Orbits & Planets as Dots)
    // A. Sun (Central pulsating sphere of glowing dots)
    const SUN_COUNT = 240;
    for (let i = 0; i < SUN_COUNT; i++) {
      const phi = Math.acos(-1 + (2 * i) / SUN_COUNT);
      const theta = Math.sqrt(SUN_COUNT * Math.PI) * phi;
      const r = 30 + (Math.random() - 0.5) * 4;
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      solarParticles.push({
        x, y, z,
        baseX: x, baseY: y, baseZ: z,
        vx: 0, vy: 0, vz: 0,
        size: Math.random() * 2.2 + 1.2,
        color: Math.random() > 0.3 ? "#fbbf24" : "#ffffff",
        alpha: Math.random() * 0.4 + 0.6,
        phase: "solar",
        meta: { isSun: true, originalR: r }
      });
    }

    // B. Planets and their dotted orbital rings
    const PLANET_CONFIGS = [
      { name: "Mercury", r: 65, speed: 2.4, size: 2.8, color: "#94a3b8", count: 8 },
      { name: "Venus",   r: 95, speed: 1.8, size: 3.8, color: "#fef08a", count: 14 },
      { name: "Earth",   r: 140, speed: 1.3, size: 4.8, color: "#38bdf8", count: 26, isTarget: true },
      { name: "Mars",    r: 185, speed: 1.0, size: 3.2, color: "#f87171", count: 10 },
      { name: "Jupiter", r: 245, speed: 0.7, size: 8.0, color: "#fed7aa", count: 48 },
      { name: "Saturn",  r: 310, speed: 0.5, size: 6.8, color: "#fde68a", count: 38, hasRings: true },
      { name: "Uranus",  r: 370, speed: 0.35, size: 5.2, color: "#a5f3fc", count: 18 },
      { name: "Neptune", r: 430, speed: 0.25, size: 5.0, color: "#60a5fa", count: 18 },
    ];

    PLANET_CONFIGS.forEach((p) => {
      // Dotted orbital path
      const ORBIT_DOTS = Math.floor(p.r * 0.75);
      for (let od = 0; od < ORBIT_DOTS; od++) {
        const oAngle = (od / ORBIT_DOTS) * Math.PI * 2;
        solarParticles.push({
          x: Math.cos(oAngle) * p.r,
          y: 0,
          z: Math.sin(oAngle) * p.r,
          baseX: Math.cos(oAngle) * p.r,
          baseY: 0,
          baseZ: Math.sin(oAngle) * p.r,
          vx: 0, vy: 0, vz: 0,
          size: 0.9,
          color: p.isTarget ? "#38bdf8" : "#ffffff",
          alpha: p.isTarget ? 0.35 : 0.12,
          phase: "solar",
          meta: { isOrbit: true }
        });
      }

      // Planet body dots
      for (let pd = 0; pd < p.count; pd++) {
        const phi = Math.acos(-1 + (2 * pd) / p.count);
        const theta = Math.sqrt(p.count * Math.PI) * phi;
        const subR = (p.size * 0.8) * Math.random();
        solarParticles.push({
          x: 0, y: 0, z: 0,
          baseX: 0, baseY: 0, baseZ: 0,
          vx: 0, vy: 0, vz: 0,
          size: Math.random() * 1.5 + 1.0,
          color: p.color,
          alpha: 0.9,
          phase: "solar",
          meta: {
            isPlanet: true,
            orbitR: p.r,
            orbitSpeed: p.speed,
            initialAngle: Math.random() * Math.PI * 2,
            subX: subR * Math.sin(phi) * Math.cos(theta),
            subY: subR * Math.sin(phi) * Math.sin(theta),
            subZ: subR * Math.cos(phi),
            isTarget: p.isTarget
          }
        });
      }

      // Saturn Dotted Ring System
      if (p.hasRings) {
        const RING_DOTS = 120;
        for (let rd = 0; rd < RING_DOTS; rd++) {
          const rDist = p.size * 1.8 + Math.random() * (p.size * 1.4);
          const rAng = Math.random() * Math.PI * 2;
          solarParticles.push({
            x: 0, y: 0, z: 0,
            baseX: 0, baseY: 0, baseZ: 0,
            vx: 0, vy: 0, vz: 0,
            size: 0.8,
            color: "#fef08a",
            alpha: 0.5,
            phase: "solar",
            meta: {
              isSaturnRing: true,
              orbitR: p.r,
              orbitSpeed: p.speed,
              rDist,
              rAng
            }
          });
        }
      }
    });

    // 3. EARTH PARTICLES (100% Spherical Dot Matrix with Continents & Atmosphere)
    const EARTH_DOT_COUNT = 1500;
    const EARTH_RADIUS = 135;

    // Harmonic landmass test for continent dot classification
    const isLandmass = (lat: number, lon: number): boolean => {
      // Polar ice
      if (lat > 1.25 || lat < -1.2) return true;
      // Harmonic approximation of continents
      const h1 = Math.sin(lat * 2.2 + 0.4) * Math.cos(lon * 2.0);
      const h2 = Math.sin(lat * 4.2 + lon * 2.3) * 0.42;
      const h3 = Math.cos(lat * 1.8 - 0.5) * Math.sin(lon * 3.1) * 0.35;
      const h4 = Math.sin((lat + 0.2) * 3.4) * Math.cos((lon - 1.2) * 1.9) * 0.45;
      return h1 + h2 + h3 + h4 > 0.12;
    };

    // Fibonacci sphere distribution for uniform dots
    for (let i = 0; i < EARTH_DOT_COUNT; i++) {
      const y = 1 - (i / (EARTH_DOT_COUNT - 1)) * 2; // -1 to 1
      const radiusAtY = Math.sqrt(1 - y * y);
      const phi = (i * Math.PI * (3 - Math.sqrt(5))); // Golden angle

      const x = Math.cos(phi) * radiusAtY;
      const z = Math.sin(phi) * radiusAtY;

      const lat = Math.asin(y);
      const lon = Math.atan2(z, x);

      const isLand = isLandmass(lat, lon);

      let color = isLand ? "#34d399" : "#2563eb"; // Emerald continents vs Royal Blue oceans
      let size = isLand ? Math.random() * 1.8 + 1.4 : Math.random() * 1.2 + 0.8;
      let alpha = isLand ? Math.random() * 0.3 + 0.75 : Math.random() * 0.3 + 0.3;

      if (isLand && Math.random() > 0.6) {
        color = "#38bdf8"; // Vibrant cyan coastal accents
      }

      earthParticles.push({
        x: x * EARTH_RADIUS,
        y: y * EARTH_RADIUS,
        z: z * EARTH_RADIUS,
        baseX: x * EARTH_RADIUS,
        baseY: y * EARTH_RADIUS,
        baseZ: z * EARTH_RADIUS,
        vx: 0, vy: 0, vz: 0,
        size, color, alpha,
        phase: "earth",
        meta: { isLand, lat, lon }
      });
    }

    // Atmospheric Glowing Cloud/Aurora Dots Shell around Earth
    const ATMO_COUNT = 320;
    for (let i = 0; i < ATMO_COUNT; i++) {
      const phi = Math.acos(-1 + (2 * i) / ATMO_COUNT);
      const theta = Math.sqrt(ATMO_COUNT * Math.PI) * phi;
      const atmoR = EARTH_RADIUS + 14 + Math.random() * 12;

      const x = atmoR * Math.sin(phi) * Math.cos(theta);
      const y = atmoR * Math.sin(phi) * Math.sin(theta);
      const z = atmoR * Math.cos(phi);

      earthParticles.push({
        x, y, z,
        baseX: x, baseY: y, baseZ: z,
        vx: 0, vy: 0, vz: 0,
        size: Math.random() * 1.5 + 0.8,
        color: Math.random() > 0.4 ? "#67e8f9" : "#ffffff",
        alpha: Math.random() * 0.4 + 0.3,
        phase: "earth",
        meta: { isAtmosphere: true, orbitSpeed: 0.003 }
      });
    }

    // -------------------------------------------------------------
    // ANIMATION & TIMELINE LOOP (5.0 SECONDS TOTAL)
    // -------------------------------------------------------------
    const startTime = performance.now();
    let earthSpinAngle = 0;
    let galaxySpinAngle = 0;
    let solarTime = 0;

    const render = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const p = Math.min(1.0, elapsed / duration);
      setProgress(Math.floor(p * 100));

      // Determine current stage for UI
      if (p < 0.36) {
        setCurrentStage("galaxy");
      } else if (p < 0.68) {
        setCurrentStage("solar");
      } else {
        setCurrentStage("earth");
      }

      // Check for completion
      if (p >= 1.0) {
        setIsExiting(true);
        setTimeout(() => {
          onComplete();
        }, 300);
        return;
      }

      // Clear Canvas with subtle trail for motion smoothness
      ctx.fillStyle = "#06070a";
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // Mouse influence angles
      const mouseInfluenceX = (mouseRef.current.x / width) * 0.8;
      const mouseInfluenceY = (mouseRef.current.y / height) * 0.8;

      // CAMERA & STAGE INTERPOLATION
      // Stage 1 (0.00 - 0.36): Galaxy view with zoom slowly advancing
      // Stage 2 (0.36 - 0.68): Rapid zoom into solar system
      // Stage 3 (0.68 - 1.00): Deep zoom into Earth sphere
      let cameraDistance = 1100;
      let galaxyAlpha = 1.0;
      let solarAlpha = 0.0;
      let earthAlpha = 0.0;

      if (p < 0.36) {
        // Galaxy Stage
        const stageProgress = p / 0.36;
        cameraDistance = 1100 - stageProgress * 300; // 1100 -> 800
        galaxyAlpha = 1.0;
        solarAlpha = stageProgress * 0.4;
        earthAlpha = 0.0;
      } else if (p < 0.68) {
        // Solar System Zoom Stage
        const stageProgress = (p - 0.36) / 0.32;
        cameraDistance = 800 - stageProgress * 480; // 800 -> 320
        galaxyAlpha = Math.max(0.08, 1.0 - stageProgress * 0.92);
        solarAlpha = 1.0;
        earthAlpha = stageProgress * 0.5;
      } else {
        // Earth Zoom Stage
        const stageProgress = (p - 0.68) / 0.32;
        cameraDistance = 320 - stageProgress * 230; // 320 -> 90
        galaxyAlpha = Math.max(0.04, 0.08 - stageProgress * 0.04);
        solarAlpha = Math.max(0.0, 1.0 - stageProgress * 1.2);
        earthAlpha = Math.min(1.0, stageProgress * 1.5);
      }

      // Increment continuous orbital angles
      galaxySpinAngle += 0.003;
      solarTime += 0.015;
      earthSpinAngle += 0.008;

      // -----------------------------------------------------------
      // 1. RENDER GALAXY DOTS (With interactive mouse displacement!)
      // -----------------------------------------------------------
      if (galaxyAlpha > 0.01) {
        // 3D rotation matrix angles for Galaxy
        const rotX = 0.85 + mouseInfluenceY * 0.3;
        const rotY = galaxySpinAngle + mouseInfluenceX * 0.3;

        const cosX = Math.cos(rotX);
        const sinX = Math.sin(rotX);
        const cosY = Math.cos(rotY);
        const sinY = Math.sin(rotY);

        ctx.save();
        for (let i = 0; i < galaxyParticles.length; i++) {
          const pt = galaxyParticles[i];

          // Slow orbital rotation per arm star
          pt.meta.angle += pt.meta.originalSpeed;
          const gx = Math.cos(pt.meta.angle) * pt.meta.distance;
          const gz = Math.sin(pt.meta.angle) * pt.meta.distance;

          // 3D Rotation
          // Around Y axis
          const x1 = gx * cosY - gz * sinY;
          const z1 = gx * sinY + gz * cosY;
          // Around X axis
          const y2 = pt.y * cosX - z1 * sinX;
          const z2 = pt.y * sinX + z1 * cosX;

          // Perspective Projection
          const fov = 500;
          const depth = z2 + cameraDistance;
          if (depth <= 10) continue;

          const scale = fov / depth;
          let screenX = cx + x1 * scale;
          let screenY = cy + y2 * scale;

          // --- INTERACTIVE HOVER: Move stars on mouse hover! ---
          const mdx = screenX - (cx + mouseRef.current.x);
          const mdy = screenY - (cy + mouseRef.current.y);
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
          const hoverRadius = 150;

          if (mDist < hoverRadius && mDist > 0) {
            const force = (1 - mDist / hoverRadius) * 28;
            // Swirl + push away
            screenX += (mdx / mDist) * force + (-mdy / mDist) * (force * 0.5);
            screenY += (mdy / mDist) * force + (mdx / mDist) * (force * 0.5);
          }

          const dotRadius = Math.max(0.4, pt.size * scale * (1.2 - (p > 0.6 ? (p - 0.6) * 1.5 : 0)));

          // Render Dot
          ctx.beginPath();
          ctx.arc(screenX, screenY, dotRadius, 0, Math.PI * 2);
          ctx.fillStyle = pt.color;
          ctx.globalAlpha = pt.alpha * galaxyAlpha;
          ctx.fill();
        }
        ctx.restore();
      }

      // -----------------------------------------------------------
      // 2. RENDER SOLAR SYSTEM DOTS
      // -----------------------------------------------------------
      if (solarAlpha > 0.02) {
        const sRotX = 0.55 + mouseInfluenceY * 0.4;
        const sRotY = solarTime * 0.3 + mouseInfluenceX * 0.4;

        const cosSX = Math.cos(sRotX);
        const sinSX = Math.sin(sRotX);
        const cosSY = Math.cos(sRotY);
        const sinSY = Math.sin(sRotY);

        ctx.save();
        for (let i = 0; i < solarParticles.length; i++) {
          const pt = solarParticles[i];
          let worldX = 0;
          let worldY = 0;
          let worldZ = 0;

          if (pt.meta?.isSun) {
            // Sun pulsating flare
            const pulse = 1.0 + Math.sin(solarTime * 3 + i) * 0.06;
            worldX = pt.baseX * pulse;
            worldY = pt.baseY * pulse;
            worldZ = pt.baseZ * pulse;
          } else if (pt.meta?.isOrbit) {
            worldX = pt.baseX;
            worldY = pt.baseY;
            worldZ = pt.baseZ;
          } else if (pt.meta?.isPlanet) {
            const curAngle = pt.meta.initialAngle + solarTime * pt.meta.orbitSpeed;
            const planetCenterX = Math.cos(curAngle) * pt.meta.orbitR;
            const planetCenterZ = Math.sin(curAngle) * pt.meta.orbitR;
            worldX = planetCenterX + pt.meta.subX;
            worldY = pt.meta.subY;
            worldZ = planetCenterZ + pt.meta.subZ;
          } else if (pt.meta?.isSaturnRing) {
            const curAngle = solarTime * pt.meta.orbitSpeed;
            const saturnX = Math.cos(curAngle) * pt.meta.orbitR;
            const saturnZ = Math.sin(curAngle) * pt.meta.orbitR;
            worldX = saturnX + Math.cos(pt.meta.rAng) * pt.meta.rDist;
            worldY = (Math.sin(pt.meta.rAng) * pt.meta.rDist) * 0.2;
            worldZ = saturnZ + Math.sin(pt.meta.rAng) * pt.meta.rDist;
          }

          // 3D Rotation
          const x1 = worldX * cosSY - worldZ * sinSY;
          const z1 = worldX * sinSY + worldZ * cosSY;
          const y2 = worldY * cosSX - z1 * sinSX;
          const z2 = worldY * sinSX + z1 * cosSX;

          // Projection
          const fov = 500;
          const depth = z2 + (cameraDistance * 0.85);
          if (depth <= 10) continue;

          const scale = fov / depth;
          const screenX = cx + x1 * scale;
          const screenY = cy + y2 * scale;
          const dotRadius = Math.max(0.3, pt.size * scale);

          ctx.beginPath();
          ctx.arc(screenX, screenY, dotRadius, 0, Math.PI * 2);
          ctx.fillStyle = pt.color;
          ctx.globalAlpha = pt.alpha * solarAlpha;
          ctx.fill();
        }
        ctx.restore();
      }

      // -----------------------------------------------------------
      // 3. RENDER EARTH SPHERICAL DOT MATRIX (100% DOTS)
      // -----------------------------------------------------------
      if (earthAlpha > 0.05) {
        // Earth dynamic 3D rotation influenced by cursor
        const eRotX = 0.25 + mouseInfluenceY * 0.5;
        const eRotY = earthSpinAngle + mouseInfluenceX * 0.7;

        const cosEX = Math.cos(eRotX);
        const sinEX = Math.sin(eRotX);
        const cosEY = Math.cos(eRotY);
        const sinEY = Math.sin(eRotY);

        // Sorting dots by depth so front dots render cleanly over back dots
        const projectedEarthDots: {
          screenX: number;
          screenY: number;
          radius: number;
          color: string;
          alpha: number;
          z: number;
        }[] = [];

        for (let i = 0; i < earthParticles.length; i++) {
          const pt = earthParticles[i];

          // 3D rotation around Y then X
          const x1 = pt.baseX * cosEY - pt.baseZ * sinEY;
          const z1 = pt.baseX * sinEY + pt.baseZ * cosEY;
          const y2 = pt.baseY * cosEX - z1 * sinEX;
          const z2 = pt.baseY * sinEX + z1 * cosEX;

          // Camera zoom into Earth
          const fov = 500;
          const depth = z2 + 280; // Earth centered
          if (depth <= 10) continue;

          const scale = fov / depth;
          const screenX = cx + x1 * scale;
          const screenY = cy + y2 * scale;

          // Calculate lighting normal (sun light from top-left)
          const normZ = z2 / EARTH_RADIUS;
          // Fade back-facing dots slightly for 3D sphere volume shading
          let depthAlpha = normZ > 0 ? 0.95 : Math.max(0.15, 0.95 + normZ * 0.8);

          // Atmosphere pulsating shimmer
          if (pt.meta?.isAtmosphere) {
            depthAlpha = (Math.sin(elapsed * 0.005 + i) * 0.2 + 0.6) * earthAlpha;
          } else {
            depthAlpha *= earthAlpha;
          }

          // Hyperdrive dispersion burst in final 0.05 fraction
          let finalX = screenX;
          let finalY = screenY;
          if (p > 0.94) {
            const burstProgress = (p - 0.94) / 0.06;
            finalX += (x1 * burstProgress * 3.5);
            finalY += (y2 * burstProgress * 3.5);
            depthAlpha *= (1.0 - burstProgress);
          }

          projectedEarthDots.push({
            screenX: finalX,
            screenY: finalY,
            radius: Math.max(0.5, pt.size * scale * (p > 0.94 ? 1 + (p - 0.94) * 10 : 1)),
            color: pt.color,
            alpha: pt.alpha * depthAlpha,
            z: z2
          });
        }

        // Sort back-to-front
        projectedEarthDots.sort((a, b) => a.z - b.z);

        ctx.save();
        for (let i = 0; i < projectedEarthDots.length; i++) {
          const d = projectedEarthDots[i];
          if (d.alpha <= 0.01) continue;

          ctx.beginPath();
          ctx.arc(d.screenX, d.screenY, d.radius, 0, Math.PI * 2);
          ctx.fillStyle = d.color;
          ctx.globalAlpha = d.alpha;
          ctx.fill();
        }
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    // Keyboard ESC to skip
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
          key="cosmic-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className="fixed inset-0 z-[99999] bg-[#06070a] text-white flex flex-col justify-between select-none overflow-hidden"
        >
          {/* Pure HTML5 Canvas rendering dots */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full cursor-crosshair"
          />

          {/* Top Status & Skip Controls */}
          <header className="relative z-10 flex items-center justify-between px-6 sm:px-10 py-6 pointer-events-auto">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-ping" />
              <div className="text-xs font-mono tracking-widest text-[#94a3b8] uppercase">
                <span className="text-white font-semibold">AMAN UX STUDIO</span>
                <span className="mx-2 text-[#475569]">//</span>
                <span className="text-blue-400">COSMIC DOT SEQUENCE</span>
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
              transition={{ delay: 0.3, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/40 border border-blue-500/30 text-blue-300 text-[11px] font-mono tracking-wide backdrop-blur-md shadow-lg shadow-blue-950/50"
            >
              <Sparkles className="w-3 h-3 text-blue-400 animate-pulse" />
              <span>Hover cursor to deflect cosmic stars & rotate orbit</span>
            </motion.div>
          </div>

          {/* Bottom Telemetry Bar */}
          <footer className="relative z-10 px-6 sm:px-10 pb-8 pointer-events-none">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
              {/* Dynamic Stage Pill */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-400" />
                  <span className="text-xs font-mono uppercase tracking-widest text-blue-300 font-semibold">
                    {currentStage === "galaxy" && "STAGE 01 // SPIRAL GALAXY OF DOTS"}
                    {currentStage === "solar" && "STAGE 02 // HELIOSPHERE SOLAR SYSTEM"}
                    {currentStage === "earth" && "STAGE 03 // ORIGIN TARGET: PLANET EARTH"}
                  </span>
                </div>
                <p className="text-[11px] font-mono text-[#64748b] max-w-sm">
                  {currentStage === "galaxy" && "1,800 algorithmic stars responding to cursor gravity displacement."}
                  {currentStage === "solar" && "Planetary orbits and celestial bodies mapped in dynamic particle coordinates."}
                  {currentStage === "earth" && "1,500 spherical matrix dots forming continental landmasses & atmosphere."}
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
