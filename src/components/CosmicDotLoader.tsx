import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

interface CosmicDotLoaderProps {
  onComplete: () => void;
  duration?: number; // 8000ms for ultra-smooth cinematic transitions
}

// Cubic & quintic easing helpers
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const easeOutQuint = (t: number) => 1 - Math.pow(1 - t, 5);

const clamp = (val: number, min: number, max: number) =>
  Math.max(min, Math.min(max, val));

export const CosmicDotLoader: React.FC<CosmicDotLoaderProps> = ({
  onComplete,
  duration = 8000,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [hudPhase, setHudPhase] = useState("01 // SPIRAL GALAXY");
  const [isExiting, setIsExiting] = useState(false);

  // Smooth mouse coordinates
  const mouseRef = useRef({ x: 0, y: 0, smoothX: 0, smoothY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Retina / High-DPI handling
    const setupCanvasDpi = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    setupCanvasDpi();

    const handleResize = () => {
      setupCanvasDpi();
    };
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left - width / 2;
      mouseRef.current.y = e.clientY - rect.top - height / 2;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // -------------------------------------------------------------
    // GENERATE PARTICLES (100% DOTS - ZERO IMAGES)
    // -------------------------------------------------------------

    // 1. GALAXY PARTICLES
    const GALAXY_COUNT = 1600;
    const ARMS = 4;
    const galaxyParticles: {
      dist: number;
      angle: number;
      y: number;
      speed: number;
      size: number;
      color: string;
      alpha: number;
      isTarget: boolean;
    }[] = [];

    // Specific target star coordinates (the Sun in the Milky Way)
    const TARGET_DIST = 210;
    const TARGET_ANGLE = 0.85;
    const TARGET_Y = 8;

    // Star index 0 is designated as our TARGET STAR
    galaxyParticles.push({
      dist: TARGET_DIST,
      angle: TARGET_ANGLE,
      y: TARGET_Y,
      speed: 0.0006,
      size: 3.2,
      color: "#fbbf24", // Golden star
      alpha: 1.0,
      isTarget: true,
    });

    for (let i = 1; i < GALAXY_COUNT; i++) {
      const arm = i % ARMS;
      const armOffset = (arm * Math.PI * 2) / ARMS;
      const dist = Math.pow(Math.random(), 1.5) * 580 + 20;
      const angle = armOffset + dist * 0.0075 + (Math.random() - 0.5) * 0.35;
      const y = (Math.random() - 0.5) * Math.max(8, 55 - dist * 0.07);

      let color = "#3b82f6";
      let size = Math.random() * 1.7 + 0.8;
      let alpha = Math.random() * 0.6 + 0.25;

      if (dist < 60) {
        color = Math.random() > 0.4 ? "#ffffff" : "#fef08a";
        size = Math.random() * 2.2 + 1.2;
        alpha = Math.random() * 0.4 + 0.6;
      } else if (dist < 230) {
        color = Math.random() > 0.5 ? "#38bdf8" : "#60a5fa";
      } else {
        color = Math.random() > 0.5 ? "#818cf8" : "#2563eb";
        alpha = Math.random() * 0.4 + 0.2;
      }

      galaxyParticles.push({
        dist,
        angle,
        y,
        speed: 0.0006 + (600 - dist) * 0.000006,
        size,
        color,
        alpha,
        isTarget: false,
      });
    }

    // 2. SOLAR SYSTEM PARTICLES
    // Sun dots (240 dots)
    const SUN_COUNT = 240;
    const sunParticles: { x: number; y: number; z: number; r: number; color: string; size: number; alpha: number }[] = [];
    for (let i = 0; i < SUN_COUNT; i++) {
      const phi = Math.acos(-1 + (2 * i) / SUN_COUNT);
      const theta = Math.sqrt(SUN_COUNT * Math.PI) * phi;
      const r = 26 + (Math.random() - 0.5) * 4;
      sunParticles.push({
        x: r * Math.sin(phi) * Math.cos(theta),
        y: r * Math.sin(phi) * Math.sin(theta),
        z: r * Math.cos(phi),
        r,
        color: Math.random() > 0.35 ? "#fbbf24" : "#ffffff",
        size: Math.random() * 2.0 + 1.2,
        alpha: Math.random() * 0.4 + 0.6,
      });
    }

    // Planets and their dotted orbital rings
    const PLANET_CONFIGS = [
      { name: "Mercury", orbitR: 55, speed: 2.8, size: 2.4, color: "#94a3b8", count: 8 },
      { name: "Venus",   orbitR: 85, speed: 2.0, size: 3.4, color: "#fde68a", count: 12 },
      { name: "Earth",   orbitR: 130, speed: 1.4, size: 4.6, color: "#38bdf8", count: 26, isEarth: true },
      { name: "Mars",    orbitR: 175, speed: 1.1, size: 3.0, color: "#f87171", count: 10 },
      { name: "Jupiter", orbitR: 235, speed: 0.7, size: 7.2, color: "#fed7aa", count: 38 },
      { name: "Saturn",  orbitR: 295, speed: 0.5, size: 6.2, color: "#fef08a", count: 30, hasRings: true },
      { name: "Uranus",  orbitR: 350, speed: 0.35, size: 4.6, color: "#a5f3fc", count: 16 },
      { name: "Neptune", orbitR: 405, speed: 0.25, size: 4.4, color: "#60a5fa", count: 16 },
    ];

    const orbitDots: { orbitR: number; angle: number; color: string; isEarth: boolean }[] = [];
    const planetBodyDots: {
      orbitR: number;
      speed: number;
      initialAngle: number;
      subX: number;
      subY: number;
      subZ: number;
      color: string;
      size: number;
      isEarth: boolean;
      isRing?: boolean;
      ringDist?: number;
      ringAng?: number;
    }[] = [];

    PLANET_CONFIGS.forEach((p) => {
      // Dotted orbital path
      const dotsCount = Math.floor(p.orbitR * 0.65);
      for (let o = 0; o < dotsCount; o++) {
        orbitDots.push({
          orbitR: p.orbitR,
          angle: (o / dotsCount) * Math.PI * 2,
          color: p.isEarth ? "#38bdf8" : "#ffffff",
          isEarth: !!p.isEarth,
        });
      }

      // Planet body dots
      const initialAngle = p.isEarth ? 0.3 : Math.random() * Math.PI * 2;
      for (let d = 0; d < p.count; d++) {
        const phi = Math.acos(-1 + (2 * d) / p.count);
        const theta = Math.sqrt(p.count * Math.PI) * phi;
        const subR = (p.size * 0.75) * Math.random();
        planetBodyDots.push({
          orbitR: p.orbitR,
          speed: p.speed,
          initialAngle,
          subX: subR * Math.sin(phi) * Math.cos(theta),
          subY: subR * Math.sin(phi) * Math.sin(theta),
          subZ: subR * Math.cos(phi),
          color: p.color,
          size: Math.random() * 1.4 + 1.0,
          isEarth: !!p.isEarth,
        });
      }

      // Saturn Rings
      if (p.hasRings) {
        for (let r = 0; r < 80; r++) {
          planetBodyDots.push({
            orbitR: p.orbitR,
            speed: p.speed,
            initialAngle,
            subX: 0, subY: 0, subZ: 0,
            color: "#fef08a",
            size: 0.7,
            isEarth: false,
            isRing: true,
            ringDist: p.size * 1.6 + Math.random() * (p.size * 1.5),
            ringAng: Math.random() * Math.PI * 2,
          });
        }
      }
    });

    // 3. EARTH GLOBE PARTICLES (1,300 dots)
    const EARTH_DOT_COUNT = 1300;
    const FINAL_EARTH_RADIUS = 135;

    // Harmonic continent mask
    const isContinent = (lat: number, lon: number): boolean => {
      if (lat > 1.25 || lat < -1.2) return true; // Polar caps
      const h1 = Math.sin(lat * 2.2 + 0.4) * Math.cos(lon * 2.0);
      const h2 = Math.sin(lat * 4.2 + lon * 2.3) * 0.42;
      const h3 = Math.cos(lat * 1.8 - 0.5) * Math.sin(lon * 3.1) * 0.35;
      const h4 = Math.sin((lat + 0.2) * 3.4) * Math.cos((lon - 1.2) * 1.9) * 0.45;
      return h1 + h2 + h3 + h4 > 0.12;
    };

    const earthParticles: {
      x: number;
      y: number;
      z: number;
      color: string;
      size: number;
      alpha: number;
      isLand: boolean;
      isAtmosphere?: boolean;
      // Shatter physics
      vx: number;
      vy: number;
      vz: number;
    }[] = [];

    for (let i = 0; i < EARTH_DOT_COUNT; i++) {
      const y = 1 - (i / (EARTH_DOT_COUNT - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const phi = i * Math.PI * (3 - Math.sqrt(5)); // Golden angle

      const x = Math.cos(phi) * radiusAtY;
      const z = Math.sin(phi) * radiusAtY;
      const lat = Math.asin(y);
      const lon = Math.atan2(z, x);
      const land = isContinent(lat, lon);

      let color = land ? "#34d399" : "#2563eb";
      let size = land ? Math.random() * 1.8 + 1.3 : Math.random() * 1.2 + 0.8;
      let alpha = land ? Math.random() * 0.3 + 0.75 : Math.random() * 0.3 + 0.3;

      if (land && Math.random() > 0.6) {
        color = "#38bdf8"; // Cyan coasts
      }

      // Shatter direction is outward normal from sphere center
      const speed = Math.random() * 26 + 14;
      earthParticles.push({
        x: x * FINAL_EARTH_RADIUS,
        y: y * FINAL_EARTH_RADIUS,
        z: z * FINAL_EARTH_RADIUS,
        color,
        size,
        alpha,
        isLand: land,
        vx: x * speed + (Math.random() - 0.5) * 6,
        vy: y * speed + (Math.random() - 0.5) * 6,
        vz: z * speed + (Math.random() - 0.5) * 6,
      });
    }

    // Atmosphere dots (240 dots)
    const ATMO_COUNT = 240;
    for (let i = 0; i < ATMO_COUNT; i++) {
      const phi = Math.acos(-1 + (2 * i) / ATMO_COUNT);
      const theta = Math.sqrt(ATMO_COUNT * Math.PI) * phi;
      const atmoR = FINAL_EARTH_RADIUS + 15 + Math.random() * 10;
      const ax = atmoR * Math.sin(phi) * Math.cos(theta);
      const ay = atmoR * Math.sin(phi) * Math.sin(theta);
      const az = atmoR * Math.cos(phi);
      const speed = Math.random() * 30 + 16;
      earthParticles.push({
        x: ax,
        y: ay,
        z: az,
        color: Math.random() > 0.4 ? "#67e8f9" : "#ffffff",
        size: Math.random() * 1.4 + 0.8,
        alpha: Math.random() * 0.4 + 0.25,
        isLand: false,
        isAtmosphere: true,
        vx: (ax / atmoR) * speed,
        vy: (ay / atmoR) * speed,
        vz: (az / atmoR) * speed,
      });
    }

    // -------------------------------------------------------------
    // CONTINUOUS RENDER LOOP (8.0s)
    // -------------------------------------------------------------
    const startTime = performance.now();
    let galaxyRotAngle = 0;
    let solarClock = 0;
    let earthSpinAngle = 0;

    const render = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const p = Math.min(1.0, elapsed / duration);
      setProgress(Math.floor(p * 100));

      // Smooth mouse lerp
      mouseRef.current.smoothX += (mouseRef.current.x - mouseRef.current.smoothX) * 0.06;
      mouseRef.current.smoothY += (mouseRef.current.y - mouseRef.current.smoothY) * 0.06;
      const mx = mouseRef.current.smoothX;
      const my = mouseRef.current.smoothY;
      const normMx = mx / (width / 2);
      const normMy = my / (height / 2);

      // Continuous clock advances
      galaxyRotAngle += 0.002;
      solarClock += 0.012;
      earthSpinAngle += 0.006;

      // HUD Phase readout
      if (p < 0.25) {
        setHudPhase("01 // SPIRAL GALAXY // TARGETING SOLAR EMBRYO");
      } else if (p < 0.45) {
        setHudPhase("02 // CONTINUOUS APPROACH // GLIDING INTO TARGET DOT");
      } else if (p < 0.68) {
        setHudPhase("03 // SOLAR BLOOM // PLANETARY ORBITS FORMATION");
      } else if (p < 0.85) {
        setHudPhase("04 // APPROACHING ORBIT 03 // EXPANDING PLANET EARTH");
      } else {
        setHudPhase("05 // QUANTUM SHATTER // INITIALIZING AMAN UX STUDIO");
      }

      // Check completion
      if (p >= 1.0) {
        setIsExiting(true);
        setTimeout(onComplete, 300);
        return;
      }

      // Clear Canvas
      ctx.fillStyle = "#06070a";
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // =============================================================
      // STAGE 1: SPIRAL GALAXY & SMOOTH GLIDE TO TARGET STAR (0.00 -> 0.45)
      // =============================================================
      if (p < 0.48) {
        // Target star position in galaxy space
        const targetX = Math.cos(TARGET_ANGLE) * TARGET_DIST;
        const targetZ = Math.sin(TARGET_ANGLE) * TARGET_DIST;
        const targetY = TARGET_Y;

        // Camera progression:
        // 0.00 to 0.25: Stationary galaxy view
        // 0.25 to 0.45: Camera smoothly dives directly into (targetX, targetY, targetZ)
        let diveT = 0;
        if (p >= 0.25) {
          diveT = easeInOutCubic((p - 0.25) / 0.20);
        }

        const camDist = 1100 - diveT * 980; // 1100 down to 120
        const focusX = targetX * diveT;
        const focusY = targetY * diveT;
        const focusZ = targetZ * diveT;

        const gRotX = 0.82 + normMy * 0.25 * (1 - diveT);
        const gRotY = galaxyRotAngle + normMx * 0.25 * (1 - diveT);
        const cosX = Math.cos(gRotX);
        const sinX = Math.sin(gRotX);
        const cosY = Math.cos(gRotY);
        const sinY = Math.sin(gRotY);

        // Non-target stars fade as camera nears target star
        const bgFade = Math.max(0, 1.0 - Math.pow(diveT, 2) * 0.96);

        ctx.save();
        for (let i = 0; i < galaxyParticles.length; i++) {
          const pt = galaxyParticles[i];

          // Current position in rotating galaxy
          pt.angle += pt.speed;
          let gx = Math.cos(pt.angle) * pt.dist;
          let gz = Math.sin(pt.angle) * pt.dist;
          let gy = pt.y;

          if (pt.isTarget) {
            gx = targetX;
            gy = targetY;
            gz = targetZ;
          }

          // Offset by camera focal point
          const relX = gx - focusX;
          const relY = gy - focusY;
          const relZ = gz - focusZ;

          // 3D Rotation
          const x1 = relX * cosY - relZ * sinY;
          const z1 = relX * sinY + relZ * cosY;
          const y2 = relY * cosX - z1 * sinX;
          const z2 = relY * sinX + z1 * cosX;

          const depth = z2 + camDist;
          if (depth <= 15) continue;
          const scale = 500 / depth;

          let sx = cx + x1 * scale;
          let sy = cy + y2 * scale;

          // Interactive hover displacement on stars
          if (p < 0.30 && !pt.isTarget) {
            const dx = sx - (cx + mx);
            const dy = sy - (cy + my);
            const mDist = Math.sqrt(dx * dx + dy * dy);
            if (mDist < 160 && mDist > 0) {
              const force = (1 - mDist / 160) * 28;
              sx += (dx / mDist) * force;
              sy += (dy / mDist) * force;
            }
          }

          let dotRadius = Math.max(0.4, pt.size * scale);
          let dotAlpha = pt.alpha * bgFade;

          if (pt.isTarget) {
            dotAlpha = 1.0;
            // The target star expands smoothly as we arrive!
            if (p >= 0.25) {
              dotRadius = Math.max(dotRadius, 3.2 + diveT * 26);
            } else {
              // Gentle beacon pulse
              const pulse = 1.0 + Math.sin(elapsed * 0.007) * 0.35;
              dotRadius *= pulse;
            }

            // Beacon rings
            if (p < 0.45) {
              ctx.beginPath();
              ctx.arc(sx, sy, dotRadius * (1.6 + Math.sin(elapsed * 0.008) * 0.2), 0, Math.PI * 2);
              ctx.strokeStyle = "#fbbf24";
              ctx.globalAlpha = 0.4 * (1 - diveT * 0.8);
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }

          ctx.beginPath();
          ctx.arc(sx, sy, dotRadius, 0, Math.PI * 2);
          ctx.fillStyle = pt.color;
          ctx.globalAlpha = clamp(dotAlpha, 0, 1);
          ctx.fill();
        }
        ctx.restore();
      }

      // =============================================================
      // STAGE 2: TARGET STAR BLOOMS INTO SOLAR SYSTEM (0.42 -> 0.72)
      // =============================================================
      // In solar space, the Sun is centered at (0, 0, 0)
      // Earth position in orbit:
      const earthOrbitRadius = 130;
      const earthAngle = 0.3 + solarClock * 1.4;
      const earthX = Math.cos(earthAngle) * earthOrbitRadius;
      const earthZ = Math.sin(earthAngle) * earthOrbitRadius;

      if (p >= 0.42 && p < 0.74) {
        // Solar system bloom: 0.44 to 0.58
        const bloomT = easeOutQuint(clamp((p - 0.44) / 0.14, 0, 1));

        // Camera dive into Earth: 0.62 to 0.72
        const diveToEarthT = easeInOutCubic(clamp((p - 0.62) / 0.10, 0, 1));

        // Smooth camera transition from Sun center (0,0) to Earth (earthX, earthZ)
        const sCamDist = 720 - diveToEarthT * 490; // 720 down to 230
        const camFocusX = earthX * diveToEarthT;
        const camFocusZ = earthZ * diveToEarthT;

        const sRotX = 0.58 + normMy * 0.3 * (1 - diveToEarthT);
        const sRotY = solarClock * 0.25 + normMx * 0.3 * (1 - diveToEarthT);
        const cosSX = Math.cos(sRotX);
        const sinSX = Math.sin(sRotX);
        const cosSY = Math.cos(sRotY);
        const sinSY = Math.sin(sRotY);

        ctx.save();

        // 1. Sun Dots (Bloom out from the single target star!)
        for (let i = 0; i < sunParticles.length; i++) {
          const pt = sunParticles[i];
          const curR = 2 + (pt.r - 2) * bloomT;
          const pulse = 1.0 + Math.sin(solarClock * 3 + i) * 0.05;
          const wx = (pt.x / pt.r) * curR * pulse - camFocusX;
          const wy = (pt.y / pt.r) * curR * pulse;
          const wz = (pt.z / pt.r) * curR * pulse - camFocusZ;

          const x1 = wx * cosSY - wz * sinSY;
          const z1 = wx * sinSY + wz * cosSY;
          const y2 = wy * cosSX - z1 * sinSX;
          const z2 = wy * sinSX + z1 * cosSX;

          const depth = z2 + sCamDist;
          if (depth <= 15) continue;
          const scale = 500 / depth;

          const dotRadius = Math.max(0.4, pt.size * scale * (0.8 + bloomT * 0.4));
          const sunAlpha = pt.alpha * clamp(bloomT * 1.5, 0, 1) * (1 - diveToEarthT * 0.9);

          ctx.beginPath();
          ctx.arc(cx + x1 * scale, cy + y2 * scale, dotRadius, 0, Math.PI * 2);
          ctx.fillStyle = pt.color;
          ctx.globalAlpha = clamp(sunAlpha, 0, 1);
          ctx.fill();
        }

        // 2. Orbital Rings (Expand from center)
        if (bloomT > 0.1) {
          const ringExpansion = easeOutQuint(clamp((bloomT - 0.1) / 0.9, 0, 1));
          for (let i = 0; i < orbitDots.length; i++) {
            const pt = orbitDots[i];
            const curR = pt.orbitR * ringExpansion;
            const wx = Math.cos(pt.angle) * curR - camFocusX;
            const wz = Math.sin(pt.angle) * curR - camFocusZ;

            const x1 = wx * cosSY - wz * sinSY;
            const z1 = wx * sinSY + wz * cosSY;
            const y2 = -z1 * sinSX;
            const z2 = z1 * cosSX;

            const depth = z2 + sCamDist;
            if (depth <= 15) continue;
            const scale = 500 / depth;

            ctx.beginPath();
            ctx.arc(cx + x1 * scale, cy + y2 * scale, Math.max(0.3, 0.9 * scale), 0, Math.PI * 2);
            ctx.fillStyle = pt.color;
            ctx.globalAlpha = (pt.isEarth ? 0.35 : 0.12) * ringExpansion * (1 - diveToEarthT * 0.9);
            ctx.fill();
          }
        }

        // 3. Planets (Emerge and orbit)
        if (bloomT > 0.15) {
          const planetExpansion = easeOutQuint(clamp((bloomT - 0.15) / 0.85, 0, 1));
          for (let i = 0; i < planetBodyDots.length; i++) {
            const pt = planetBodyDots[i];
            const curAngle = pt.initialAngle + solarClock * pt.speed;
            const curR = pt.orbitR * planetExpansion;

            let px = Math.cos(curAngle) * curR;
            let py = 0;
            let pz = Math.sin(curAngle) * curR;

            if (pt.isRing) {
              px += Math.cos(pt.ringAng!) * (pt.ringDist! * planetExpansion);
              py += (Math.sin(pt.ringAng!) * pt.ringDist! * 0.2) * planetExpansion;
              pz += Math.sin(pt.ringAng!) * (pt.ringDist! * planetExpansion);
            } else {
              px += pt.subX * planetExpansion;
              py += pt.subY * planetExpansion;
              pz += pt.subZ * planetExpansion;
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

            let dotRadius = Math.max(0.4, pt.size * scale);
            let dotAlpha = 0.9 * planetExpansion;

            // When camera dives into Earth, the Earth dot expands!
            if (pt.isEarth) {
              dotRadius = Math.max(dotRadius, 2.8 + diveToEarthT * 22);
              dotAlpha = 1.0;
            } else {
              dotAlpha *= (1 - diveToEarthT * 0.92);
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
      // STAGE 3: EARTH EXPANDS INTO 3D GLOBE & SHATTERS (0.68 -> 1.00)
      // =============================================================
      if (p >= 0.68) {
        // Globe expansion from dot: 0.68 to 0.78
        const globeExpandT = easeOutQuint(clamp((p - 0.68) / 0.10, 0, 1));

        // Shatter explosion fraction: 0.86 to 1.00
        const isShattering = p >= 0.86;
        const shatterT = isShattering ? (p - 0.86) / 0.14 : 0;
        const shatterEase = Math.pow(shatterT, 1.5);

        // 3D Earth rotation + interactive mouse tilt
        const eRotX = 0.22 + normMy * 0.45;
        const eRotY = earthSpinAngle + normMx * 0.65;
        const cosEX = Math.cos(eRotX);
        const sinEX = Math.sin(eRotX);
        const cosEY = Math.cos(eRotY);
        const sinEY = Math.sin(eRotY);

        ctx.save();

        // Shockwave rings during shatter
        if (isShattering) {
          const blastR = shatterEase * (Math.max(width, height) * 0.9);
          const SHOCK_COUNT = 80;
          for (let s = 0; s < SHOCK_COUNT; s++) {
            const sang = (s / SHOCK_COUNT) * Math.PI * 2;
            const rx = cx + Math.cos(sang) * blastR;
            const ry = cy + Math.sin(sang) * blastR;
            ctx.beginPath();
            ctx.arc(rx, ry, Math.max(0.5, 2.2 * (1 - shatterEase)), 0, Math.PI * 2);
            ctx.fillStyle = "#38bdf8";
            ctx.globalAlpha = (1 - shatterEase) * 0.65;
            ctx.fill();
          }
        }

        // Render sorted Earth dots
        const projectedGlobe: {
          sx: number;
          sy: number;
          radius: number;
          color: string;
          alpha: number;
          z: number;
        }[] = [];

        for (let i = 0; i < earthParticles.length; i++) {
          const pt = earthParticles[i];

          // Globe expands outward from dot 0,0,0
          let curX = pt.x * globeExpandT;
          let curY = pt.y * globeExpandT;
          let curZ = pt.z * globeExpandT;

          // Shatter outward physics displacement
          if (isShattering) {
            curX += pt.vx * shatterEase * 28;
            curY += pt.vy * shatterEase * 28;
            curZ += pt.vz * shatterEase * 28;
          }

          const x1 = curX * cosEY - curZ * sinEY;
          const z1 = curX * sinEY + curZ * cosEY;
          const y2 = curY * cosEX - z1 * sinEX;
          const z2 = curY * sinEX + z1 * cosEX;

          const depth = z2 + 270;
          if (depth <= 15) continue;
          const scale = 500 / depth;

          const sx = cx + x1 * scale;
          const sy = cy + y2 * scale;

          // 3D volume lighting normal
          const normZ = z2 / (FINAL_EARTH_RADIUS * globeExpandT || 1);
          let dotAlpha = normZ > 0 ? 0.95 : Math.max(0.2, 0.95 + normZ * 0.75);

          if (pt.isAtmosphere) {
            dotAlpha = (Math.sin(elapsed * 0.005 + i) * 0.2 + 0.6) * globeExpandT;
          } else {
            dotAlpha *= globeExpandT;
          }

          // Fade out during shatter
          if (isShattering) {
            dotAlpha *= Math.max(0, 1 - shatterEase * 1.3);
          }

          if (dotAlpha <= 0.01) continue;

          projectedGlobe.push({
            sx,
            sy,
            radius: Math.max(0.4, pt.size * scale * (isShattering ? 1 + shatterEase * 1.5 : 1)),
            color: pt.color,
            alpha: clamp(pt.alpha * dotAlpha, 0, 1),
            z: z2,
          });
        }

        // Sort back to front for clean 3D globe depth
        projectedGlobe.sort((a, b) => a.z - b.z);

        for (let i = 0; i < projectedGlobe.length; i++) {
          const d = projectedGlobe[i];
          ctx.beginPath();
          ctx.arc(d.sx, d.sy, d.radius, 0, Math.PI * 2);
          ctx.fillStyle = d.color;
          ctx.globalAlpha = d.alpha;
          ctx.fill();
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

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
          key="cosmic-cinematic-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[99999] bg-[#06070a] text-white flex flex-col justify-between select-none overflow-hidden"
        >
          {/* High-DPI Pure HTML5 Canvas */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full cursor-crosshair"
          />

          {/* Top HUD Telemetry */}
          <header className="relative z-10 flex items-center justify-between px-6 sm:px-10 py-6 pointer-events-auto">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-ping" />
              <div className="text-xs font-mono tracking-widest text-[#94a3b8] uppercase">
                <span className="text-white font-semibold">AMAN UX STUDIO</span>
                <span className="mx-2 text-[#475569]">//</span>
                <span className="text-blue-400">COSMIC ORIGIN TRANSIT</span>
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

          {/* Interactive Hint */}
          <div className="relative z-10 text-center pointer-events-none mb-auto pt-4">
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-950/40 border border-blue-500/30 text-blue-300 text-[11px] font-mono tracking-wide backdrop-blur-md shadow-lg shadow-blue-950/50"
            >
              <Sparkles className="w-3 h-3 text-blue-400 animate-pulse" />
              <span>Hover cursor to deflect stellar particles & tilt orbit</span>
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
                  Seamless cosmic zoom: Galaxy → Target Star → Heliosphere → Earth Globe → Quantum Shatter.
                </p>
              </div>

              {/* Progress Bar & Percentage */}
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
