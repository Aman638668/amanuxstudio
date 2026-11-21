import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  X, 
  ArrowRight, 
  Layers, 
  Zap, 
  RotateCcw, 
  Radio, 
  Compass, 
  Sliders, 
  Check, 
  Maximize2,
  Info,
  ChevronRight,
  ShieldCheck,
  MousePointer
} from 'lucide-react';
import { studioAudio } from '@/lib/studio-audio';

interface CraftModeProps {
  onClose: () => void;
  onExploreWork: () => void;
}

type SimulationMode = 'mesh' | 'vortex' | 'matrix';
type ForceMode = 'repel' | 'attract';
type ColorTheme = 'cyan' | 'emerald' | 'amber' | 'violet';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
  size: number;
  color: string;
  alpha: number;
  orbitAngle?: number;
  orbitRadius?: number;
}

interface BurstWave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  color: string;
}

const THEMES: Record<ColorTheme, { name: string; primary: string; secondary: string; glow: string; particleColors: string[] }> = {
  cyan: {
    name: 'Electric Cyan',
    primary: '#38bdf8',
    secondary: '#2563eb',
    glow: 'rgba(56, 189, 248, 0.25)',
    particleColors: ['#38bdf8', '#2563eb', '#60a5fa', '#ffffff', '#818cf8']
  },
  emerald: {
    name: 'Matrix Emerald',
    primary: '#34d399',
    secondary: '#059669',
    glow: 'rgba(52, 211, 153, 0.25)',
    particleColors: ['#34d399', '#10b981', '#6ee7b7', '#ffffff', '#059669']
  },
  amber: {
    name: 'Solar Amber',
    primary: '#fbbf24',
    secondary: '#d97706',
    glow: 'rgba(251, 191, 36, 0.25)',
    particleColors: ['#fbbf24', '#f59e0b', '#fde68a', '#ffffff', '#ea580c']
  },
  violet: {
    name: 'Cyber Violet',
    primary: '#c084fc',
    secondary: '#7c3aed',
    glow: 'rgba(192, 132, 252, 0.25)',
    particleColors: ['#c084fc', '#a855f7', '#e9d5ff', '#ffffff', '#6366f1']
  }
};

const PILLARS = [
  {
    num: "01",
    tag: "PERFORMANCE",
    title: "Sub-Second TTFB Engine",
    metric: "< 150ms",
    desc: "Clean database queries, Redis caching, and asset pruning to eliminate server bottlenecks."
  },
  {
    num: "02",
    tag: "CONVERSION UX",
    title: "Figma-to-Code Precision",
    metric: "+150% Leads",
    desc: "Bespoke layouts engineered around cognitive ergonomics, user trust, and friction-free checkouts."
  },
  {
    num: "03",
    tag: "FULL-STACK CMS",
    title: "Custom WordPress & WooCommerce",
    metric: "0 Bloat",
    desc: "Zero bloated theme builders. Lightweight custom architecture designed to scale with your business."
  },
  {
    num: "04",
    tag: "PARTNERSHIP",
    title: "Direct Developer Access",
    metric: "1-on-1",
    desc: "No account manager bureaucracy. You collaborate directly with Aman Sharma for rapid delivery."
  }
];

export function CraftMode({ onClose, onExploreWork }: CraftModeProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mode, setMode] = useState<SimulationMode>('mesh');
  const [force, setForce] = useState<ForceMode>('repel');
  const [theme, setTheme] = useState<ColorTheme>('cyan');
  const [density, setDensity] = useState<'normal' | 'dense'>('normal');
  const [showPillars, setShowPillars] = useState(false);
  const [activePillar, setActivePillar] = useState(0);
  const [fps, setFps] = useState(60);
  const [particleCount, setParticleCount] = useState(140);
  const [lastBurstCoords, setLastBurstCoords] = useState<{ x: number; y: number } | null>(null);

  const mouseRef = useRef({
    x: -1000,
    y: -1000,
    isDown: false,
    radius: 170
  });

  const burstsRef = useRef<BurstWave[]>([]);
  const particlesRef = useRef<Particle[]>([]);

  // Initialize and spawn particles based on density & theme
  const initParticles = useCallback((width: number, height: number, curDensity: 'normal' | 'dense', curTheme: ColorTheme) => {
    const count = curDensity === 'dense'
      ? Math.min(Math.floor((width * height) / 7000), 220)
      : Math.min(Math.floor((width * height) / 12000), 140);

    setParticleCount(count);
    const colors = THEMES[curTheme].particleColors;
    const newParticles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const orbitRadius = Math.random() * (Math.min(width, height) * 0.4) + 40;
      const orbitAngle = Math.random() * Math.PI * 2;

      newParticles.push({
        x,
        y,
        baseX: x,
        baseY: y,
        vx: (Math.random() - 0.5) * 1.0,
        vy: (Math.random() - 0.5) * 1.0,
        size: Math.random() * 2.2 + 1.0,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.6 + 0.4,
        orbitRadius,
        orbitAngle
      });
    }

    particlesRef.current = newParticles;
  }, []);

  // Spawn shockwave ring on canvas click
  const triggerBurst = (x: number, y: number) => {
    studioAudio.playClick(940, 0.05);
    setLastBurstCoords({ x, y });
    const currentColor = THEMES[theme].primary;

    burstsRef.current.push({
      x,
      y,
      radius: 0,
      maxRadius: 260,
      alpha: 0.9,
      color: currentColor
    });

    // Push away near particles violently
    particlesRef.current.forEach((p) => {
      const dx = p.x - x;
      const dy = p.y - y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 260 && dist > 0) {
        const power = (1 - dist / 260) * 18;
        p.vx += (dx / dist) * power;
        p.vy += (dy / dist) * power;
      }
    });
  };

  // Main Canvas Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const setupDpi = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };
    setupDpi();

    initParticles(width, height, density, theme);

    const handleResize = () => {
      setupDpi();
      initParticles(width, height, density, theme);
    };
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const handleMouseDown = (e: MouseEvent) => {
      mouseRef.current.isDown = true;
      triggerBurst(e.clientX, e.clientY);
    };
    window.addEventListener('mousedown', handleMouseDown);

    const handleMouseUp = () => {
      mouseRef.current.isDown = false;
    };
    window.addEventListener('mouseup', handleMouseUp);

    // Touch support for tablets/mobile
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouseRef.current.x = e.touches[0].clientX - rect.left;
        mouseRef.current.y = e.touches[0].clientY - rect.top;
      }
    };
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        triggerBurst(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    window.addEventListener('touchstart', handleTouchStart, { passive: true });

    // FPS Meter tracking
    let lastTime = performance.now();
    let frameCount = 0;
    let vortexAngle = 0;

    const render = (time: number) => {
      frameCount++;
      if (time - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (time - lastTime)));
        frameCount = 0;
        lastTime = time;
      }

      vortexAngle += 0.015;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Trailing clear for fluid kinetic motion
      ctx.fillStyle = mode === 'vortex' ? 'rgba(9, 9, 12, 0.22)' : 'rgba(9, 9, 12, 0.38)';
      ctx.fillRect(0, 0, width, height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const particles = particlesRef.current;
      const bursts = burstsRef.current;

      // 1. Render Shockwave Bursts
      for (let b = bursts.length - 1; b >= 0; b--) {
        const burst = bursts[b];
        burst.radius += 5.5;
        burst.alpha *= 0.94;

        if (burst.radius > burst.maxRadius || burst.alpha <= 0.02) {
          bursts.splice(b, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(burst.x, burst.y, burst.radius, 0, Math.PI * 2);
        ctx.strokeStyle = burst.color;
        ctx.globalAlpha = burst.alpha;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Echo ring
        ctx.beginPath();
        ctx.arc(burst.x, burst.y, Math.max(0.1, burst.radius * 0.65), 0, Math.PI * 2);
        ctx.strokeStyle = '#ffffff';
        ctx.globalAlpha = burst.alpha * 0.5;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      ctx.globalAlpha = 1.0;

      // 2. Physics & Particle Updates by Simulation Mode
      if (mode === 'mesh') {
        // Constellation Network with Spring Connections
        const maxDist = density === 'dense' ? 95 : 120;

        for (let i = 0; i < particles.length; i++) {
          const pi = particles[i];

          // Connect neighbors
          for (let j = i + 1; j < particles.length; j++) {
            const pj = particles[j];
            const dx = pi.x - pj.x;
            const dy = pi.y - pj.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < maxDist) {
              const alpha = (1 - dist / maxDist) * 0.18;
              ctx.beginPath();
              ctx.strokeStyle = THEMES[theme].primary;
              ctx.globalAlpha = alpha;
              ctx.lineWidth = 0.8;
              ctx.moveTo(pi.x, pi.y);
              ctx.lineTo(pj.x, pj.y);
              ctx.stroke();
            }
          }

          // Connect to cursor if near
          if (mx > 0 && my > 0) {
            const cdx = pi.x - mx;
            const cdy = pi.y - my;
            const cdist = Math.sqrt(cdx * cdx + cdy * cdy);
            if (cdist < mouseRef.current.radius) {
              ctx.beginPath();
              ctx.strokeStyle = '#ffffff';
              ctx.globalAlpha = (1 - cdist / mouseRef.current.radius) * 0.35;
              ctx.lineWidth = 1.2;
              ctx.moveTo(pi.x, pi.y);
              ctx.lineTo(mx, my);
              ctx.stroke();

              const forceMult = force === 'repel' ? 1 : -1;
              const f = (1 - cdist / mouseRef.current.radius) * 3.5 * forceMult;
              pi.x += (cdx / cdist) * f;
              pi.y += (cdy / cdist) * f;
            }
          }

          // Inertia
          pi.x += pi.vx;
          pi.y += pi.vy;

          if (pi.x < 0 || pi.x > width) pi.vx *= -1;
          if (pi.y < 0 || pi.y > height) pi.vy *= -1;

          // Draw particle dot
          ctx.beginPath();
          ctx.arc(pi.x, pi.y, pi.size, 0, Math.PI * 2);
          ctx.fillStyle = pi.color;
          ctx.globalAlpha = pi.alpha;
          ctx.fill();
        }

      } else if (mode === 'vortex') {
        // Celestial Gravitational Swirl around Cursor / Center
        const centerX = mx > 0 && mx < width ? mx : width / 2;
        const centerY = my > 0 && my < height ? my : height / 2;

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.orbitAngle = (p.orbitAngle || 0) + (0.015 + (i % 5) * 0.003);

          const curR = p.orbitRadius || 120;
          const targetX = centerX + Math.cos(p.orbitAngle) * curR;
          const targetY = centerY + Math.sin(p.orbitAngle) * (curR * 0.7);

          // Smooth lerp to orbit
          p.x += (targetX - p.x) * 0.06;
          p.y += (targetY - p.y) * 0.06;

          // Orbit stream line
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 1.2, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.fill();

          // Trailing filament to center
          if (i % 6 === 0) {
            ctx.beginPath();
            ctx.strokeStyle = THEMES[theme].primary;
            ctx.globalAlpha = 0.08;
            ctx.lineWidth = 0.6;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(centerX, centerY);
            ctx.stroke();
          }
        }

        // Center gravity core
        ctx.beginPath();
        ctx.arc(centerX, centerY, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.globalAlpha = 0.8;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(centerX, centerY, 16 + Math.sin(vortexAngle * 4) * 3, 0, Math.PI * 2);
        ctx.strokeStyle = THEMES[theme].primary;
        ctx.globalAlpha = 0.35;
        ctx.lineWidth = 1.5;
        ctx.stroke();

      } else if (mode === 'matrix') {
        // 2D Quantum Matrix with Magnetic Coordinate Distortion
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          
          let dx = 0;
          let dy = 0;

          if (mx > 0 && my > 0) {
            const diffX = p.baseX - mx;
            const diffY = p.baseY - my;
            const dist = Math.sqrt(diffX * diffX + diffY * diffY);

            if (dist < 180 && dist > 0) {
              const push = (1 - dist / 180) * 45 * (force === 'repel' ? 1 : -1);
              dx = (diffX / dist) * push;
              dy = (diffY / dist) * push;
            }
          }

          p.x += (p.baseX + dx - p.x) * 0.12;
          p.y += (p.baseY + dy - p.y) * 0.12;

          // Matrix coordinate crosshair
          const crossSize = p.size * 1.5;
          ctx.strokeStyle = p.color;
          ctx.globalAlpha = p.alpha * 0.7;
          ctx.lineWidth = 1;

          ctx.beginPath();
          ctx.moveTo(p.x - crossSize, p.y);
          ctx.lineTo(p.x + crossSize, p.y);
          ctx.moveTo(p.x, p.y - crossSize);
          ctx.lineTo(p.x, p.y + crossSize);
          ctx.stroke();
        }
      }

      ctx.globalAlpha = 1.0;
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchStart);
    };
  }, [mode, force, theme, density, initParticles]);

  const handleResetCanvas = () => {
    studioAudio.playClick(640);
    if (canvasRef.current) {
      initParticles(window.innerWidth, window.innerHeight, density, theme);
      toast.success("Simulation re-seeded!");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[120] bg-[#09090c] text-[#eeece8] flex flex-col justify-between overflow-hidden select-none font-sans"
    >
      {/* Interactive Canvas Plane */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 cursor-crosshair z-0"
        title="Click anywhere to trigger kinetic shockwaves"
      />

      {/* =========================================================================
          TOP HUD BAR: Telemetry & Controls
         ========================================================================= */}
      <header className="relative z-20 px-6 py-5 border-b border-white/10 bg-[#09090c]/80 backdrop-blur-xl">
        <div className="container mx-auto max-w-7xl flex items-center justify-between gap-4">
          
          {/* Studio Brand & Telemetry Badge */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-400 flex items-center justify-center text-white font-bold text-xs shadow-md shadow-blue-600/30">
              A
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-white tracking-wider">AMAN UX STUDIO</span>
                <span className="text-[#475569]">//</span>
                <span className="text-xs font-mono text-blue-400 uppercase">2D KINETIC SANDBOX</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-mono text-[#64748b] mt-0.5">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{fps} FPS</span>
                </span>
                <span>•</span>
                <span>{particleCount} PARTICLES</span>
                <span>•</span>
                <span className="capitalize">{mode} Engine</span>
              </div>
            </div>
          </div>

          {/* Right Action Hub */}
          <div className="flex items-center gap-2.5">
            {/* Toggle Studio Engineering Architecture Drawer */}
            <button
              onClick={() => {
                studioAudio.playClick(780);
                setShowPillars(!showPillars);
              }}
              className={`px-3.5 py-1.5 rounded-full border text-xs font-mono uppercase tracking-wider transition-all inline-flex items-center gap-1.5 ${
                showPillars 
                  ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-600/30' 
                  : 'bg-white/5 border-white/10 text-[#94a3b8] hover:text-white hover:bg-white/10'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Engineering Architecture</span>
              <span className="sm:hidden">Specs</span>
            </button>

            {/* Exit to Main Website */}
            <button
              onClick={() => {
                studioAudio.playClick(500);
                onClose();
              }}
              className="px-4 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-white inline-flex items-center gap-1.5 transition-all"
            >
              <span>Exit</span>
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </header>

      {/* =========================================================================
          INTERACTIVE CENTER CLICK HINT
         ========================================================================= */}
      <div className="relative z-10 pointer-events-none mx-auto text-center mt-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0e0e14]/80 border border-white/10 backdrop-blur-md text-[11px] font-mono text-[#94a3b8] shadow-xl">
          <MousePointer className="w-3 h-3 text-blue-400 animate-bounce" />
          <span>Click anywhere to generate shockwave blast · Move cursor to deflect field</span>
        </div>
      </div>

      {/* =========================================================================
          COLLAPSIBLE ENGINEERING ARCHITECTURE SIDEBAR (Drawer)
         ========================================================================= */}
      <AnimatePresence>
        {showPillars && (
          <motion.aside
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute left-6 top-24 z-30 w-full max-w-sm rounded-3xl bg-[#0e0e14]/95 border border-white/15 p-6 shadow-2xl backdrop-blur-2xl pointer-events-auto"
          >
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <h3 className="font-bold text-white text-xs font-mono uppercase tracking-wider">
                  Production Engineering Standards
                </h3>
              </div>
              <button
                onClick={() => setShowPillars(false)}
                className="text-[#64748b] hover:text-white transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3 mb-6">
              {PILLARS.map((pillar, idx) => (
                <div
                  key={pillar.num}
                  onClick={() => {
                    studioAudio.playClick(800 + idx * 50);
                    setActivePillar(idx);
                  }}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    activePillar === idx
                      ? 'bg-blue-600/15 border-blue-500/40 text-white shadow-lg'
                      : 'bg-white/[0.02] border-white/5 text-[#94a3b8] hover:bg-white/[0.05]'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                    <span className="text-blue-400 font-bold">[{pillar.num} // {pillar.tag}]</span>
                    <span className="text-emerald-400 font-semibold">{pillar.metric}</span>
                  </div>
                  <h4 className="text-sm font-bold text-[#eeece8] mb-1">{pillar.title}</h4>
                  <p className="text-xs text-[#94a3b8] leading-relaxed font-normal">{pillar.desc}</p>
                </div>
              ))}
            </div>

            <div className="pt-2 flex items-center justify-between gap-3">
              <button
                onClick={() => {
                  studioAudio.playClick(920);
                  onClose();
                  onExploreWork();
                }}
                className="w-full btn-studio-primary py-2.5 text-xs font-mono inline-flex items-center justify-center gap-1.5 shadow-xl"
              >
                <span>View Real Case Studies</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* =========================================================================
          BOTTOM FLOATING WORKSTATION DOCK (Interactive Simulator Controls)
         ========================================================================= */}
      <footer className="relative z-20 px-4 sm:px-6 pb-6 pt-3 pointer-events-none">
        <div className="container mx-auto max-w-7xl flex flex-col items-center">
          
          {/* Main Floating Glass Capsule Control Dock */}
          <div className="pointer-events-auto p-2 sm:p-2.5 rounded-full bg-[#0e0e14]/90 border border-white/15 backdrop-blur-2xl shadow-2xl flex flex-wrap items-center justify-center gap-2 sm:gap-4 max-w-full">
            
            {/* Mode Selectors */}
            <div className="flex items-center bg-black/40 p-1 rounded-full border border-white/10">
              <button
                onClick={() => {
                  studioAudio.playClick(720);
                  setMode('mesh');
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-mono tracking-wide transition-all ${
                  mode === 'mesh' ? 'bg-blue-600 text-white font-semibold shadow-md shadow-blue-600/40' : 'text-[#94a3b8] hover:text-white'
                }`}
                title="Constellation Network Mode"
              >
                Mesh Network
              </button>
              <button
                onClick={() => {
                  studioAudio.playClick(760);
                  setMode('vortex');
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-mono tracking-wide transition-all ${
                  mode === 'vortex' ? 'bg-blue-600 text-white font-semibold shadow-md shadow-blue-600/40' : 'text-[#94a3b8] hover:text-white'
                }`}
                title="Gravitational Vortex Mode"
              >
                Orbital Vortex
              </button>
              <button
                onClick={() => {
                  studioAudio.playClick(800);
                  setMode('matrix');
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-mono tracking-wide transition-all ${
                  mode === 'matrix' ? 'bg-blue-600 text-white font-semibold shadow-md shadow-blue-600/40' : 'text-[#94a3b8] hover:text-white'
                }`}
                title="Coordinate Matrix Mode"
              >
                Coordinate Grid
              </button>
            </div>

            <div className="h-6 w-px bg-white/10 hidden sm:block" />

            {/* Force Field Toggle: Repel vs Attract */}
            {mode !== 'vortex' && (
              <div className="flex items-center gap-1 bg-black/40 p-1 rounded-full border border-white/10">
                <button
                  onClick={() => {
                    studioAudio.playClick(680);
                    setForce('repel');
                  }}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-mono transition-all ${
                    force === 'repel' ? 'bg-white/20 text-white font-bold' : 'text-[#64748b] hover:text-white'
                  }`}
                >
                  Repel
                </button>
                <button
                  onClick={() => {
                    studioAudio.playClick(740);
                    setForce('attract');
                  }}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-mono transition-all ${
                    force === 'attract' ? 'bg-white/20 text-white font-bold' : 'text-[#64748b] hover:text-white'
                  }`}
                >
                  Attract
                </button>
              </div>
            )}

            {/* Density Preset */}
            <button
              onClick={() => {
                studioAudio.playClick(820);
                const nextDensity = density === 'normal' ? 'dense' : 'normal';
                setDensity(nextDensity);
                initParticles(window.innerWidth, window.innerHeight, nextDensity, theme);
              }}
              className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-[#94a3b8] hover:text-white transition-all hidden md:inline-flex items-center gap-1.5"
              title="Toggle Particle Density"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>{density === 'dense' ? 'High Density' : 'Balanced'}</span>
            </button>

            {/* Theme Swatches */}
            <div className="flex items-center gap-1.5 bg-black/40 px-2 py-1.5 rounded-full border border-white/10">
              {(Object.keys(THEMES) as ColorTheme[]).map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    studioAudio.playClick(860);
                    setTheme(t);
                    initParticles(window.innerWidth, window.innerHeight, density, t);
                  }}
                  className={`w-5 h-5 rounded-full transition-transform ${
                    theme === t ? 'scale-125 ring-2 ring-white shadow-lg' : 'opacity-60 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: THEMES[t].primary }}
                  title={`Color: ${THEMES[t].name}`}
                />
              ))}
            </div>

            {/* Shockwave Blast Trigger */}
            <button
              onClick={() => {
                triggerBurst(window.innerWidth / 2, window.innerHeight / 2);
              }}
              className="px-3.5 py-1.5 rounded-full bg-blue-600/30 hover:bg-blue-600 border border-blue-500/40 text-blue-300 hover:text-white text-xs font-mono transition-all inline-flex items-center gap-1.5"
              title="Trigger center shockwave"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Shockwave</span>
            </button>

            {/* Reset Particles */}
            <button
              onClick={handleResetCanvas}
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-[#94a3b8] hover:text-white flex items-center justify-center transition-all"
              title="Re-seed particle positions"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

          </div>

          {/* Quick Deep-Link Action to Selected Work */}
          <div className="mt-3 pointer-events-auto flex items-center gap-4 text-xs font-mono">
            <button
              onClick={() => {
                studioAudio.playClick(900);
                onClose();
                onExploreWork();
              }}
              className="text-[#94a3b8] hover:text-white inline-flex items-center gap-1.5 transition-colors underline underline-offset-4"
            >
              <span>Done exploring? Jump to Client Case Studies</span>
              <ArrowRight className="w-3.5 h-3.5 text-blue-400" />
            </button>
          </div>

        </div>
      </footer>
    </motion.div>
  );
}
