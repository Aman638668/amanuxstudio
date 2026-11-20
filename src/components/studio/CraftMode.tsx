import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronRight, ChevronLeft, X } from 'lucide-react';
import { studioAudio } from '@/lib/studio-audio';

interface CraftModeProps {
  onClose: () => void;
  onExploreWork: () => void;
}

const chapters = [
  {
    num: "01",
    subtitle: "Design & UX Philosophy",
    title: "We design websites that convert, not bloated templates.",
    body: "Many websites struggle with cluttered themes and slow plugins. Aman UX Studio designs custom, user-friendly layouts in Figma and develops fast, clean websites that turn visitors into inquiries and paying customers.",
    hint: "Move your cursor to interact with the background particles"
  },
  {
    num: "02",
    subtitle: "Fast Loading & SEO",
    title: "Speed is the foundation of every successful website.",
    body: "Slow websites lose visitors and rank lower on Google. We optimize every page for fast sub-second load times, clean code structure, and strong technical SEO to maximize your visibility.",
    hint: "Optimized for 90+ Google Core Web Vitals"
  },
  {
    num: "03",
    subtitle: "WordPress & E-Commerce",
    title: "Clean storefronts and corporate websites that scale.",
    body: "From 0-to-1 online clothing stores with UPI/Card checkout (like Ireshh) to corporate portals with lead funnels (like Fairease), we build robust solutions tailored to your business needs.",
    hint: "Trusted by Fairease, Ireshh, TicketDev & more"
  },
  {
    num: "04",
    subtitle: "Direct 1-on-1 Partnership",
    title: "Work directly with the developer building your site.",
    body: "No junior account managers, no confusing agency markups. You collaborate directly with Aman Sharma for transparent communication, fast turnarounds, and ongoing support.",
    hint: "Ready to start your project?"
  }
];

export function CraftMode({ onClose, onExploreWork }: CraftModeProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [currentChapter, setCurrentChapter] = useState(0);
  const mouseRef = useRef({ x: -1000, y: -1000, radius: 140 });

  // Interactive Particle Simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const particleCount = Math.min(Math.floor((width * height) / 12000), 120);
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      baseX: number;
      baseY: number;
      color: string;
    }> = [];

    const colors = ['#2563eb', '#eeece8', '#60a5fa', '#3ddc84'];

    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      particles.push({
        x,
        y,
        baseX: x,
        baseY: y,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        size: Math.random() * 2.2 + 0.8,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Connect near particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(238, 236, 232, ${0.12 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.7;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Update and draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce on boundaries
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Mouse interaction (repulsion)
        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouseRef.current.radius) {
          const force = (mouseRef.current.radius - dist) / mouseRef.current.radius;
          p.x -= (dx / dist) * force * 4;
          p.y -= (dy / dist) * force * 4;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const nextChapter = () => {
    studioAudio.playClick(880);
    setCurrentChapter((prev) => (prev + 1) % chapters.length);
  };

  const prevChapter = () => {
    studioAudio.playClick(640);
    setCurrentChapter((prev) => (prev - 1 + chapters.length) % chapters.length);
  };

  const ch = chapters[currentChapter];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[120] bg-[#09090c] text-[#eeece8] flex flex-col justify-between p-6 md:p-12 overflow-hidden select-none"
    >
      {/* Background Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-auto" />

      {/* Top Bar */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-[#3ddc84] animate-pulse" />
            <span>AMAN UX STUDIO · INTERACTIVE OVERVIEW</span>
          </div>
        </div>

        <button
          onClick={() => {
            studioAudio.playClick(500);
            onClose();
          }}
          className="btn-studio-secondary !h-9 !px-4 !text-xs tracking-wider uppercase font-semibold"
          data-cursor="Close"
        >
          <span>Exit to Website</span>
          <X className="w-4 h-4 ml-1" />
        </button>
      </div>

      {/* Ghost Chapter Number in background */}
      <div className="absolute right-6 md:right-20 top-1/2 -translate-y-1/2 pointer-events-none select-none">
        <span className="font-bold text-[140px] md:text-[280px] leading-none text-transparent stroke-text opacity-15">
          {ch.num}
        </span>
      </div>

      {/* Chapter Content Overlay */}
      <div className="relative z-10 max-w-2xl my-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentChapter}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.55, ease: [0.19, 1, 0.22, 1] }}
          >
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-blue-400 uppercase mb-4">
              <span>Overview {ch.num}</span>
              <span>/</span>
              <span>04</span>
              <span>·</span>
              <span className="text-white/60">{ch.subtitle}</span>
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#eeece8] leading-[1.08] mb-6">
              {ch.title}
            </h2>

            <p className="text-base sm:text-lg text-white/75 leading-relaxed max-w-xl mb-8 font-normal">
              {ch.body}
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-xs text-white/60 font-mono mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <span>{ch.hint}</span>
            </div>

            <div className="flex items-center gap-4">
              {currentChapter === chapters.length - 1 ? (
                <button
                  onClick={() => {
                    studioAudio.playClick(920);
                    onClose();
                    onExploreWork();
                  }}
                  className="btn-studio-primary group"
                  data-cursor="Launch"
                >
                  <span>View Client Work</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              ) : (
                <button
                  onClick={nextChapter}
                  className="btn-studio-primary group"
                  data-cursor="Next"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              )}

              <button
                onClick={() => {
                  studioAudio.playClick(500);
                  onClose();
                }}
                className="btn-studio-secondary"
              >
                Close
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Chapter Progress Bar */}
      <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-6">
        <div className="flex items-center gap-2">
          {chapters.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                studioAudio.playClick(700 + idx * 60);
                setCurrentChapter(idx);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentChapter ? 'w-10 bg-blue-500' : 'w-4 bg-white/20 hover:bg-white/40'
              }`}
              title={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={prevChapter}
            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 text-white/70 hover:text-white transition-colors"
            title="Previous"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextChapter}
            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 text-white/70 hover:text-white transition-colors"
            title="Next"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
