import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, LayoutGrid, ArrowUpRight, Check } from 'lucide-react';
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
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 p-1.5 rounded-full border border-white/10 bg-[#0d0d12]/85 backdrop-blur-xl shadow-2xl shadow-black/60 text-[#eeece8] max-w-[95vw]"
      role="toolbar"
      aria-label="Aman UX Studio floating controls"
    >
      {/* Sound Equalizer Pill */}
      <button
        onClick={handleSoundToggle}
        onMouseEnter={() => studioAudio.playHover()}
        className="h-9 px-3 rounded-full flex items-center gap-1.5 hover:bg-white/10 transition-colors text-white/70 hover:text-white"
        title={soundActive ? 'Mute micro-sound' : 'Enable ambient sound'}
        data-cursor="Sound"
      >
        <span className="text-[11px] font-mono tracking-wider hidden sm:inline opacity-60">AUDIO</span>
        <div className="flex items-end gap-[2px] h-3">
          {[0.5, 1, 0.35, 0.85].map((scale, i) => (
            <motion.span
              key={i}
              className={`w-[2.5px] rounded-full transition-colors ${
                soundActive ? 'bg-[#5b5fe0]' : 'bg-white/40'
              }`}
              animate={
                soundActive
                  ? { height: ['3px', `${scale * 13}px`, '3px'] }
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

      {/* Mode Switcher: Studio (Editorial) vs Craft (3D Interactive) */}
      <div className="flex items-center bg-white/[0.04] rounded-full p-0.5 border border-white/5">
        <button
          onClick={() => {
            studioAudio.playClick(600);
            onToggleMode('studio');
          }}
          onMouseEnter={() => studioAudio.playHover()}
          className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-all ${
            mode === 'studio'
              ? 'bg-[#eeece8] text-[#0a0a0c] font-semibold shadow'
              : 'text-white/60 hover:text-white'
          }`}
          data-cursor="Mode"
        >
          <LayoutGrid className="w-3 h-3" />
          <span>Studio</span>
        </button>
        <button
          onClick={() => {
            studioAudio.playClick(980);
            onToggleMode('craft');
          }}
          onMouseEnter={() => studioAudio.playHover()}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all ${
            mode === 'craft'
              ? 'bg-[#5b5fe0] text-white font-semibold shadow-lg shadow-[#5b5fe0]/40'
              : 'text-white/60 hover:text-white'
          }`}
          data-cursor="Experience"
        >
          <Sparkles className="w-3 h-3 text-amber-300" />
          <span>Craft Story</span>
        </button>
      </div>

      <div className="w-[1px] h-4 bg-white/10 hidden md:block" />

      {/* Quick Nav Anchors (Desktop) */}
      <div className="hidden md:flex items-center gap-1">
        {[
          { label: 'Work', id: 'portfolio' },
          { label: 'Services', id: 'services' },
          { label: 'About', id: 'about' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            onMouseEnter={() => studioAudio.playHover()}
            className={`px-2.5 py-1 text-xs rounded-full transition-colors ${
              activeSection === item.id
                ? 'text-white font-semibold bg-white/10'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="w-[1px] h-4 bg-white/10" />

      {/* Direct Contact CTA */}
      <button
        onClick={() => scrollTo('contact')}
        onMouseEnter={() => studioAudio.playHover()}
        className="flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-medium bg-gradient-to-r from-blue-500/20 to-[#5b5fe0]/30 border border-[#5b5fe0]/40 text-[#eeece8] hover:bg-[#5b5fe0] hover:text-white hover:border-[#5b5fe0] transition-all group"
        data-cursor="Contact"
      >
        <span>Inquire</span>
        <ArrowUpRight className="w-3 h-3 text-blue-300 group-hover:text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </button>
    </motion.aside>
  );
}
