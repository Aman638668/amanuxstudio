import { useState } from 'react';
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
import { CustomCursor } from '@/components/studio/CustomCursor';
import { StudioDock } from '@/components/studio/StudioDock';
import { CraftMode } from '@/components/studio/CraftMode';

export default function Index() {
  const [experienceMode, setExperienceMode] = useState<'studio' | 'craft'>('studio');

  const handleExploreWork = () => {
    const el = document.getElementById('portfolio');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#09090c] text-[#eeece8] selection:bg-blue-600 selection:text-white relative font-sans overflow-x-hidden">
      <Seo
        title="Web Design &amp; UI/UX Development Studio"
        description="Aman UX Studio creates custom, high-converting websites, bespoke WordPress solutions, and clean UI/UX designs for growing businesses and startups."
      />

      {/* Tactile Ambient Film Grain Overlay */}
      <div className="ambient-grain" aria-hidden="true" />

      {/* Spring Magnetic Cursor (Desktop) */}
      <CustomCursor />

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

      {/* Floating System Dock Controls */}
      <StudioDock
        mode={experienceMode}
        onToggleMode={(newMode) => setExperienceMode(newMode)}
      />

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
