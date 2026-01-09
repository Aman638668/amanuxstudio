
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

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

    // Check if it's a route (starts with /) or an ID
    if (target.startsWith('/')) {
      navigate(target);
      window.scrollTo(0, 0);
      return;
    }

    // Scroll Logic
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        scrollToSection(target);
      }, 100);
    } else {
      scrollToSection(target);
    }
  };

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Services', id: 'services' },
    { label: 'Portfolio', id: 'portfolio' },
    { label: 'Testimonials', id: 'testimonials' },
    { label: 'Blog', href: '/blog' }, // Keep Blog as a separate page
    { label: 'Contact', id: 'contact' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-white/90 backdrop-blur-md border-b border-gray-200">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button onClick={() => handleNavClick('home')} className="text-2xl font-bold text-gray-900">
              Aman UX Studio
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => item.href ? handleNavClick(item.href) : handleNavClick(item.id!)}
                className={`transition-colors font-medium text-gray-700 hover:text-blue-600`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => handleNavClick('contact')}>
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => item.href ? handleNavClick(item.href) : handleNavClick(item.id!)}
                  className="transition-colors font-medium text-left text-gray-700 hover:text-blue-600"
                >
                  {item.label}
                </button>
              ))}
              <Button className="bg-blue-600 hover:bg-blue-700 text-white mt-4" onClick={() => handleNavClick('contact')}>
                Get Started
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
