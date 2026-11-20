import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
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
    { label: 'Work', id: 'portfolio' },
    { label: 'Services', href: '/services' },
    { label: 'About', id: 'about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Resume', href: '/resume' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        scrolled
          ? 'bg-[#09090c]/85 backdrop-blur-xl border-b border-white/10 py-3 shadow-xl shadow-black/40'
          : 'bg-transparent border-b border-white/5 py-5'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          
          {/* Studio Brand */}
          <button
            onClick={() => handleNavClick('home')}
            onMouseEnter={() => studioAudio.playHover()}
            className="flex items-center gap-2.5 text-left group"
            data-cursor="Home"
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-blue-600 to-sky-400 flex items-center justify-center text-white font-bold text-xs shadow-md shadow-blue-600/30 group-hover:scale-105 transition-transform">
              A
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight text-[#eeece8] group-hover:text-white transition-colors">
                AMAN UX STUDIO
              </span>
              <span className="text-[10px] font-mono tracking-widest text-white/50 uppercase">
                Web Design &amp; UI/UX
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => item.href ? handleNavClick(item.href) : handleNavClick(item.id!)}
                onMouseEnter={() => studioAudio.playHover()}
                className="transition-colors font-mono text-xs uppercase tracking-wider text-white/70 hover:text-white"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Direct CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => handleNavClick('contact')}
              onMouseEnter={() => studioAudio.playHover()}
              className="btn-studio-primary btn-studio-sm uppercase tracking-wider group"
              data-cursor="Book Call"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-6 border-t border-white/10 pt-4 space-y-3 bg-[#0d0d12]/95 backdrop-blur-2xl rounded-2xl p-6 border shadow-2xl">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => item.href ? handleNavClick(item.href) : handleNavClick(item.id!)}
                className="block w-full text-left font-mono text-sm uppercase tracking-wider text-white/80 hover:text-white py-2"
              >
                {item.label}
              </button>
            ))}
            <div className="pt-4 border-t border-white/10">
              <button
                onClick={() => handleNavClick('contact')}
                className="btn-studio-primary w-full text-center"
              >
                <span>Get in Touch</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </nav>
  );
}
