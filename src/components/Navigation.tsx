import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, FileText } from 'lucide-react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (sectionId: string) => {
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
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Services', href: '/services' },
    { label: 'Portfolio', id: 'portfolio' },
    { label: 'Why Us', id: 'why-us' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-white/95 backdrop-blur-md border-b border-gray-200 transition-all">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => handleNavClick('home')}
              className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent hover:opacity-90 transition-opacity"
            >
              Aman UX Studio
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-7">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => item.href ? handleNavClick(item.href) : handleNavClick(item.id!)}
                className="transition-colors font-medium text-sm text-gray-700 hover:text-blue-600"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* CTA & Resume Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              to="/resume"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-blue-600 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <FileText className="h-4 w-4 text-blue-600" />
              Resume
            </Link>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
              onClick={() => handleNavClick('contact')}
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-gray-700 hover:text-blue-600 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100 animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => item.href ? handleNavClick(item.href) : handleNavClick(item.id!)}
                  className="transition-colors font-medium text-left text-gray-700 hover:text-blue-600 py-1"
                >
                  {item.label}
                </button>
              ))}

              <div className="pt-2 flex flex-col gap-2">
                <Link
                  to="/resume"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <FileText className="h-4 w-4 text-blue-600" />
                  View Resume &amp; Experience
                </Link>
                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white w-full"
                  onClick={() => handleNavClick('contact')}
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
