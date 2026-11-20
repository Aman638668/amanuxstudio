import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, ArrowRight, MessageSquare } from 'lucide-react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { studioAudio } from '@/lib/studio-audio';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    studioAudio.playClick(850, 0.03);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavClick = (target: string) => {
    setIsMenuOpen(false);

    if (target.startsWith('/')) {
      navigate(target);
      window.scrollTo(0, 0);
      return;
    }

    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        scrollToSection(target);
      }, 150);
    } else {
      scrollToSection(target);
    }
  };

  const navItems = [
    { label: 'Work', id: 'portfolio', path: '/#portfolio' },
    { label: 'Services', href: '/services' },
    { label: 'About', id: 'about', path: '/#about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Resume', href: '/resume' },
  ];

  return (
    <header className="fixed top-3 sm:top-5 left-0 right-0 z-[100] px-4 sm:px-6 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Floating Capsule Island */}
        <nav
          className={`pointer-events-auto w-full flex items-center justify-between px-4 sm:px-5 py-2.5 rounded-full border transition-all duration-300 ${
            scrolled
              ? 'border-white/15 bg-[#09090c]/90 backdrop-blur-2xl shadow-2xl shadow-black/80'
              : 'border-white/10 bg-[#09090c]/70 backdrop-blur-xl shadow-xl'
          }`}
          role="navigation"
          aria-label="Main navigation"
        >
          {/* Studio Brand */}
          <button
            onClick={() => handleNavClick('home')}
            onMouseEnter={() => studioAudio.playHover()}
            className="flex items-center gap-3 text-left group"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-400 flex items-center justify-center text-white font-bold text-xs shadow-md shadow-blue-600/30 group-hover:scale-105 transition-transform">
              A
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-tight text-[#eeece8] group-hover:text-white transition-colors">
                AMAN UX STUDIO
              </span>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3ddc84] animate-pulse" />
                <span className="text-[10px] font-mono tracking-widest text-white/50 uppercase">
                  Available for Projects
                </span>
              </div>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => item.href ? handleNavClick(item.href) : handleNavClick(item.id!)}
                onMouseEnter={() => studioAudio.playHover()}
                className="px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider text-white/70 hover:text-white hover:bg-white/[0.06] transition-all"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => handleNavClick('contact')}
              onMouseEnter={() => studioAudio.playHover()}
              className="btn-studio-primary btn-studio-sm uppercase tracking-wider group"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

      </div>

      {/* Mobile Drawer Overlay */}
      {isMenuOpen && (
        <div className="pointer-events-auto lg:hidden max-w-7xl mx-auto mt-2 p-6 rounded-3xl border border-white/15 bg-[#0e0e14]/95 backdrop-blur-2xl shadow-2xl space-y-4">
          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => item.href ? handleNavClick(item.href) : handleNavClick(item.id!)}
                className="w-full text-left font-mono text-sm uppercase tracking-wider text-white/80 hover:text-white py-2.5 px-3 rounded-xl hover:bg-white/5 transition-colors flex items-center justify-between"
              >
                <span>{item.label}</span>
                <ArrowRight className="w-4 h-4 text-white/40" />
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10 space-y-3">
            <button
              onClick={() => handleNavClick('contact')}
              className="btn-studio-primary w-full text-center"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
            <a
              href="https://wa.me/919211104514"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-studio-secondary w-full text-center flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-[#3ddc84]" />
              <span>WhatsApp Direct (+91 92111-04514)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
