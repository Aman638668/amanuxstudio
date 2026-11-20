import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, LayoutGrid, ArrowUpRight } from 'lucide-react';
import { studioAudio } from '@/lib/studio-audio';

interface StudioDockProps {
  mode: 'studio' | 'craft';
  onToggleMode: (newMode: 'studio' | 'craft') => void;
}

export function StudioDock({ mode, onToggleMode }: StudioDockProps) {
  const [soundActive, setSoundActive] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    setSoundActive(studioAudio.getStatus());

    const handleScroll = () => {
      const sections = ['home', 'portfolio', 'services', 'about', 'contact'];
      const scrollPos = window.scrollY + 200;
      for (const s of sections) {
        const el = document.getElementById(s);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(s);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const nextState = studioAudio.toggle();
    setSoundActive(nextState);
  };

  const scrollTo = (id: string) => {
    studioAudio.playClick(840, 0.03);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.aside
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1], delay: 0.3 }}
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1.5 p-1.5 rounded-full border border-white/15 bg-[#0e0e14]/90 backdrop-blur-2xl shadow-2xl shadow-black/80 text-[#eeece8] max-w-[95vw]"
      role="toolbar"
      aria-label="Aman UX Studio navigation dock"
    >
      {/* Sound Equalizer Pill */}
      <button
        onClick={handleSoundToggle}
        onMouseEnter={() => studioAudio.playHover()}
        className="h-8 px-2.5 rounded-full flex items-center gap-1.5 hover:bg-white/10 transition-colors text-white/70 hover:text-white"
        title={soundActive ? 'Mute sound effects' : 'Enable sound effects'}
        data-cursor="Audio"
      >
        <span className="text-[10px] font-mono tracking-wider hidden sm:inline opacity-60">SOUND</span>
        <div className="flex items-end gap-[2px] h-3">
          {[0.5, 1, 0.35, 0.85].map((scale, i) => (
            <motion.span
              key={i}
              className={`w-[2px] rounded-full transition-colors ${
                soundActive ? 'bg-blue-500' : 'bg-white/40'
              }`}
              animate={
                soundActive
                  ? { height: ['3px', `${scale * 12}px`, '3px'] }
                  : { height: '3px' }
              }
              transition={
                soundActive
                  ? { repeat: Infinity, duration: 0.8, delay: i * 0.15, ease: 'easeInOut' }
                  : { duration: 0.2 }
              }
            />
          ))}
        </div>
      </button>

      <div className="w-[1px] h-4 bg-white/10" />

      {/* Segmented Mode Switcher */}
      <div className="relative flex items-center bg-white/[0.06] rounded-full p-0.5 border border-white/5">
        <button
          onClick={() => {
            studioAudio.playClick(600);
            onToggleMode('studio');
          }}
          onMouseEnter={() => studioAudio.playHover()}
          className={`relative z-10 flex items-center gap-1.5 h-7 px-3 rounded-full text-xs font-medium transition-colors ${
            mode === 'studio' ? 'text-black font-semibold' : 'text-white/60 hover:text-white'
          }`}
          data-cursor="Site"
        >
          {mode === 'studio' && (
            <motion.div
              layoutId="dockModePill"
              className="absolute inset-0 bg-white rounded-full shadow-sm"
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-1">
            <LayoutGrid className="w-3 h-3" />
            <span>Site</span>
          </span>
        </button>

        <button
          onClick={() => {
            studioAudio.playClick(980);
            onToggleMode('craft');
          }}
          onMouseEnter={() => studioAudio.playHover()}
          className={`relative z-10 flex items-center gap-1.5 h-7 px-3 rounded-full text-xs font-medium transition-colors ${
            mode === 'craft' ? 'text-white font-semibold' : 'text-white/60 hover:text-white'
          }`}
          data-cursor="Interactive"
        >
          {mode === 'craft' && (
            <motion.div
              layoutId="dockModePill"
              className="absolute inset-0 bg-blue-600 rounded-full shadow-md shadow-blue-600/40"
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            <span>Interactive</span>
          </span>
        </button>
      </div>

      <div className="w-[1px] h-4 bg-white/10 hidden md:block" />

      {/* Quick Nav Anchors (Desktop) */}
      <div className="hidden md:flex items-center gap-0.5">
        {[
          { label: 'Work', id: 'portfolio' },
          { label: 'Services', id: 'services' },
          { label: 'About', id: 'about' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            onMouseEnter={() => studioAudio.playHover()}
            className={`h-7 px-2.5 text-xs rounded-full transition-all ${
              activeSection === item.id
                ? 'text-white font-semibold bg-white/15'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="w-[1px] h-4 bg-white/10" />

      {/* Direct Contact CTA Button */}
      <button
        onClick={() => scrollTo('contact')}
        onMouseEnter={() => studioAudio.playHover()}
        className="h-8 px-4 rounded-full text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/30 transition-all active:scale-95 flex items-center gap-1.5 group"
        data-cursor="Contact"
      >
        <span>Contact</span>
        <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </button>
    </motion.aside>
  );
}
