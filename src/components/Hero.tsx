import { motion } from 'framer-motion';
import { ArrowRight, FileDown, Calculator, Sparkles } from 'lucide-react';
import { studioAudio } from '@/lib/studio-audio';

interface HeroProps {
  onOpenEstimator?: () => void;
  onOpenCraft?: () => void;
}

export default function Hero({ onOpenEstimator, onOpenCraft }: HeroProps) {
  const handleOpenTool = onOpenEstimator || onOpenCraft;
  const scrollToSection = (sectionId: string) => {
    studioAudio.playClick(850, 0.03);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const titleWords = ["Designing", "&", "Building", "Websites", "That", "Convert."];

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col bg-[#09090c] text-[#eeece8] relative overflow-hidden pt-32 pb-16 sm:pt-36 md:pt-40 md:pb-24"
    >
      {/* Subtle radial ambient mist */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-blue-600/15 via-indigo-600/10 to-transparent blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-emerald-500/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10 my-auto">
        <div>
          
          {/* Live Availability & Interactive Mode Badges */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
            className="flex flex-wrap items-center gap-3 mb-8"
          >
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3ddc84] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3ddc84]"></span>
              </span>
              <span className="text-xs font-mono tracking-wider uppercase text-white/80">
                Available for New Projects · Web Developer &amp; UI/UX
              </span>
            </div>

            {handleOpenTool && (
              <button
                onClick={handleOpenTool}
                onMouseEnter={() => studioAudio.playHover()}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-xs font-mono uppercase tracking-wider text-blue-300 hover:bg-blue-500/20 hover:text-white transition-all group shadow-sm hover:border-blue-400/50"
              >
                <Calculator className="w-3.5 h-3.5 text-blue-400 group-hover:scale-110 transition-transform" />
                <span>Scope &amp; Cost Estimator</span>
              </button>
            )}
          </motion.div>

          {/* Kinetic Editorial Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-[#eeece8] leading-[1.06] mb-8">
            <span className="flex flex-wrap gap-x-3 sm:gap-x-5 gap-y-1">
              {titleWords.map((word, i) => (
                <span key={i} className="inline-block overflow-hidden py-1">
                  <motion.span
                    initial={{ y: '110%', rotate: 3 }}
                    animate={{ y: 0, rotate: 0 }}
                    transition={{
                      duration: 0.9,
                      ease: [0.19, 1, 0.22, 1],
                      delay: 0.1 + i * 0.07,
                    }}
                    className={`inline-block origin-bottom-left ${
                      word === "Websites"
                        ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-sky-200 to-white"
                        : word === "Convert."
                        ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400"
                        : ""
                    }`}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </span>
          </h1>

          {/* Studio Subheading / Value Proposition */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.19, 1, 0.22, 1] }}
            className="text-lg sm:text-xl md:text-2xl text-white/70 mb-10 max-w-3xl leading-relaxed font-normal"
          >
            Aman UX Studio is a digital studio led by web developer Aman Sharma. We design and build clean, high-converting websites, custom WordPress solutions, and intuitive UI/UX for growing brands.
          </motion.p>

          {/* Action Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.19, 1, 0.22, 1] }}
            className="flex flex-wrap items-center gap-3 sm:gap-4 mb-16"
          >
            <button
              onClick={() => scrollToSection('contact')}
              onMouseEnter={() => studioAudio.playHover()}
              className="btn-studio-primary group"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            {handleOpenTool && (
              <button
                onClick={handleOpenTool}
                onMouseEnter={() => studioAudio.playHover()}
                className="btn-studio-secondary flex items-center gap-2 border-blue-500/30 text-blue-300 hover:text-white hover:border-blue-400/60 bg-blue-500/5 hover:bg-blue-500/10"
              >
                <Calculator className="w-4 h-4 text-blue-400" />
                <span>Estimate Scope &amp; Price</span>
              </button>
            )}

            <button
              onClick={() => scrollToSection('portfolio')}
              onMouseEnter={() => studioAudio.playHover()}
              className="btn-studio-secondary"
            >
              <span>View Our Work</span>
            </button>

            <a
              href="/Aman_Sharma_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => studioAudio.playHover()}
              className="btn-studio-secondary text-white/75 hover:text-white"
            >
              <FileDown className="w-4 h-4 text-white/60" />
              <span>Resume PDF</span>
            </a>
          </motion.div>

          {/* Studio Metrics Strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-white/10"
          >
            <div>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-[#eeece8]">50+</div>
              <div className="text-xs text-white/60 tracking-wider uppercase font-mono mt-1">Websites Delivered</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-[#3ddc84]">&lt; 1s</div>
              <div className="text-xs text-white/60 tracking-wider uppercase font-mono mt-1">Fast Loading Speed</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-[#eeece8]">100%</div>
              <div className="text-xs text-white/60 tracking-wider uppercase font-mono mt-1">On-Time Delivery</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-blue-400">98%</div>
              <div className="text-xs text-white/60 tracking-wider uppercase font-mono mt-1">Client Satisfaction</div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
