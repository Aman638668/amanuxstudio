import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Portfolio from '@/components/Portfolio';
import WhyChooseUs from '@/components/WhyChooseUs';
import Testimonials from '@/components/Testimonials';
import RecentBlogs from '@/components/RecentBlogs';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Seo from '@/components/Seo';
import { CraftMode } from '@/components/studio/CraftMode';
import CosmicDotLoader from '@/components/CosmicDotLoader';

export default function Index() {
  const [experienceMode, setExperienceMode] = useState<'studio' | 'craft'>('studio');
  const [showCosmicLoader, setShowCosmicLoader] = useState(true);

  // Disable background scrolling while cosmic loader is active
  useEffect(() => {
    if (showCosmicLoader) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showCosmicLoader]);

  const handleExploreWork = () => {
    const el = document.getElementById('portfolio');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#09090c] text-[#eeece8] selection:bg-blue-600 selection:text-white relative font-sans overflow-x-hidden">
      {/* Smooth Continuous Cosmic Dot Loader (Home Page Only) */}
      <AnimatePresence mode="wait">
        {showCosmicLoader && (
          <CosmicDotLoader
            key="home-cosmic-loader"
            duration={8000}
            onComplete={() => setShowCosmicLoader(false)}
          />
        )}
      </AnimatePresence>

      <Seo
        title="Web Design & UI/UX Development Studio"
        description="Aman UX Studio creates custom, high-converting websites, bespoke WordPress solutions, and clean UI/UX designs for growing businesses and startups."
      />

      {/* Tactile Ambient Film Grain Overlay */}
      <div className="ambient-grain" aria-hidden="true" />

      {/* Global Studio Navigation */}
      <Navigation />

      {/* Hero Section */}
      <Hero onOpenCraft={() => setExperienceMode('craft')} />

      {/* Portfolio / Client Chapters */}
      <Portfolio />

      {/* Services / Disciplines */}
      <Services />

      {/* Identity / About */}
      <About />

      {/* Why Us / Reality Check */}
      <WhyChooseUs />

      {/* Testimonials */}
      <Testimonials />

      {/* Recent Blog Insights */}
      <RecentBlogs />

      {/* Direct Contact & Inquiry Form */}
      <Contact />

      {/* Footer */}
      <Footer />

      {/* Interactive Craft Mode Story Overlay */}
      <AnimatePresence>
        {experienceMode === 'craft' && (
          <CraftMode
            onClose={() => setExperienceMode('studio')}
            onExploreWork={handleExploreWork}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
