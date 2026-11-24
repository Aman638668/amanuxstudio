import { useState, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ArrowUpRight, CheckCircle2, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { studioAudio } from '@/lib/studio-audio';

export const projects = [
  {
    num: "01",
    title: "Fairease Outsourcing",
    client: "Fairease Outsourcing Pvt. Ltd.",
    category: "Corporate & BPO",
    tagline: "Corporate Website & Lead Generation Funnel",
    description: "Designed and built the full production corporate website for Fairease Outsourcing. Structured clean service showcases, quotation inquiry forms, and optimized loading speed and Google on-page SEO.",
    image: "/fairease.png",
    tags: ["WordPress", "Elementor Pro", "SEO Optimization", "Fast Loading", "Custom CSS"],
    results: ["+150% boost in online inquiries", "Sub-second load times", "100% mobile responsive"],
    metric: "+150% Inquiries",
    link: "https://fairease.in/"
  },
  {
    num: "02",
    title: "Ireshh",
    client: "Ireshh",
    category: "E-Commerce",
    tagline: "0-to-1 Full Scale E-Commerce Store",
    description: "Built the complete online fashion brand storefront from scratch (0 to 1) and managing end-to-end site operations. Handled full store design, product variations, payment gateways (Cards/UPI), automated shipping, and frictionless checkout.",
    image: "/ireshh.png",
    tags: ["WooCommerce", "WordPress", "0-to-1 Build", "Payment Integrations", "Full Management"],
    results: ["Built from 0 to 1", "End-to-end full site management", "Frictionless checkout UX"],
    metric: "0-to-1 Store Build",
    link: "https://ireshh.com/"
  },
  {
    num: "03",
    title: "Ticketdev Travels",
    client: "Ticketdev Travels",
    category: "Travel & Booking",
    tagline: "Modern Tour Booking & Itinerary Website",
    description: "Designed and developed an ultra-clean, mobile-friendly travel booking website featuring holiday packages, easy itinerary inquiries, and automated WhatsApp direct booking.",
    image: "/ticketdev-travels.png",
    tags: ["Travel Website", "WhatsApp Automation", "Speed Tuning", "SEO Optimization"],
    results: ["300% sales growth", "50% mobile conversion lift", "99.9% uptime"],
    metric: "300% Sales Growth",
    link: "https://ticketdevtravels.com/"
  },
  {
    num: "04",
    title: "Friends Group",
    client: "Friends Group Conglomerate",
    category: "Corporate & BPO",
    tagline: "Multi-Business Corporate Website",
    description: "Corporate multi-page website consolidating three business divisions (construction, manufacturing, and trading) into a unified online brand with career forms and company showcases.",
    image: "/friendsgroup.png",
    tags: ["Corporate Website", "Career Portal", "Custom WordPress", "Content Layout"],
    results: ["250% brand engagement lift", "Consolidated 3 business units", "80% application rate"],
    metric: "3 Units Consolidated",
    link: "https://friendsgroup.co.in/"
  },
  {
    num: "05",
    title: "Expertvuw Management Pvt Ltd",
    client: "Expertvuw Management Pvt Ltd",
    category: "Finance & Legal",
    tagline: "Consulting & Financial Advisory Website",
    description: "Designed a clean, professional website for legal and finance advisors. Features consultation inquiry forms, service breakdowns, and SEO-optimized pages that rank high on Google.",
    image: "/expertvuw.png",
    tags: ["Finance Website", "Legal Portal", "SEO Optimization", "Clean UI"],
    results: ["200% increase in inquiries", "3x search visibility", "90% faster page render"],
    metric: "3x Search Visibility",
    link: "https://expertvuw.in/"
  }
];

const categories = ["All", "E-Commerce", "Corporate & BPO", "Travel & Booking", "Finance & Legal"];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter(p => p.category === activeCategory);

  // Keep selected index valid when category filter changes
  const activeProject = filteredProjects[selectedIndex] || filteredProjects[0] || projects[0];

  const handleSelectProject = (index: number) => {
    studioAudio.playClick(800);
    setSelectedIndex(index);
  };

  const handleNextProject = () => {
    studioAudio.playClick(880);
    setSelectedIndex((prev) => (prev + 1) % filteredProjects.length);
  };

  const handlePrevProject = () => {
    studioAudio.playClick(720);
    setSelectedIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
  };

  return (
    <section id="portfolio" className="py-20 md:py-28 bg-[#09090c] text-[#eeece8] relative">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Section Editorial Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 pb-8 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-blue-400 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>[ 02 / CLIENT WORK &amp; CASE STUDIES ]</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#eeece8]">
              Selected Case Studies.
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="text-[#94a3b8] max-w-md text-xs sm:text-sm leading-relaxed">
              Explore real-world platforms built for growing companies. Tested for sub-second speeds, clean code, and measurable conversion growth.
            </p>
            <Link
              to="/portfolio"
              className="text-xs font-mono text-blue-400 hover:text-blue-300 inline-flex items-center gap-1 font-semibold whitespace-nowrap"
            >
              <span>View All ({projects.length})</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                studioAudio.playClick(750);
                setActiveCategory(cat);
                setSelectedIndex(0);
              }}
              onMouseEnter={() => studioAudio.playHover()}
              className={`h-8 px-4 rounded-full text-xs font-mono tracking-wider whitespace-nowrap transition-all duration-200 border ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white font-semibold border-blue-500 shadow-md shadow-blue-900/40'
                  : 'bg-[#0e0e14] text-[#94a3b8] hover:text-white hover:bg-white/5 border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* =========================================================================
            COMPACT INTERACTIVE MASTER-DETAIL STAGE (Replaces 4,000px Long Scroll)
           ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Project Selector List (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-2.5">
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#64748b] px-2 mb-2 flex items-center justify-between">
              <span>Client Projects Directory</span>
              <span>{filteredProjects.length} Available</span>
            </div>

            {filteredProjects.map((proj, idx) => {
              const isSelected = activeProject.num === proj.num;
              return (
                <button
                  key={proj.num}
                  onClick={() => handleSelectProject(idx)}
                  onMouseEnter={() => studioAudio.playHover()}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl transition-all duration-300 relative border overflow-hidden group ${
                    isSelected
                      ? 'bg-[#12121c] border-blue-500/50 shadow-xl shadow-blue-950/20'
                      : 'bg-[#0e0e14]/70 border-white/5 hover:border-white/15 hover:bg-[#12121c]/40'
                  }`}
                >
                  {/* Active Blue Indicator Pill */}
                  {isSelected && (
                    <motion.div
                      layoutId="active-project-indicator"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}

                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-mono font-bold transition-colors ${isSelected ? 'text-blue-400' : 'text-[#64748b] group-hover:text-[#94a3b8]'}`}>
                        {proj.num}
                      </span>
                      <div>
                        <h4 className={`text-base sm:text-lg font-bold transition-colors ${isSelected ? 'text-white' : 'text-[#cbd5e1] group-hover:text-white'}`}>
                          {proj.title}
                        </h4>
                        <span className="text-[11px] font-mono text-[#64748b] block mt-0.5">
                          {proj.category}
                        </span>
                      </div>
                    </div>

                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold bg-blue-600/10 border border-blue-500/20 text-blue-300 whitespace-nowrap shrink-0">
                      {proj.metric}
                    </span>
                  </div>
                </button>
              );
            })}

            {/* Quick Next/Prev Controls */}
            <div className="flex items-center justify-between pt-3 px-2 text-xs font-mono text-[#94a3b8]">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handlePrevProject}
                  className="w-8 h-8 rounded-xl bg-[#0e0e14] border border-white/10 hover:border-blue-500/40 flex items-center justify-center text-white transition-all"
                  title="Previous Case Study"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextProject}
                  className="w-8 h-8 rounded-xl bg-[#0e0e14] border border-white/10 hover:border-blue-500/40 flex items-center justify-center text-white transition-all"
                  title="Next Case Study"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <span className="text-[11px] text-[#64748b] ml-2">
                  Navigate Projects
                </span>
              </div>

              <span>
                {activeProject.num} / {String(filteredProjects.length).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* Right Column: Active Project Showcase Window (lg:col-span-7) */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.num}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="rounded-3xl bg-[#0e0e14] border border-white/10 p-6 sm:p-8 shadow-2xl relative overflow-hidden"
              >
                {/* Background Watermark Numeral */}
                <div className="absolute top-2 right-4 pointer-events-none select-none z-0">
                  <span className="font-mono text-8xl sm:text-9xl font-extrabold text-white/[0.03]">
                    {activeProject.num}
                  </span>
                </div>

                <div className="relative z-10 space-y-6">
                  {/* Browser Mockup Frame */}
                  <a
                    href={activeProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block relative rounded-2xl overflow-hidden border border-white/10 bg-[#09090c] group shadow-xl hover:border-blue-500/40 transition-all duration-300"
                  >
                    {/* Traffic Lights Top Bar */}
                    <div className="flex items-center justify-between px-4 py-2.5 bg-black/60 border-b border-white/5 backdrop-blur-sm">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                      </div>
                      <span className="text-[11px] font-mono text-[#94a3b8] tracking-wider truncate max-w-[220px]">
                        {activeProject.link.replace('https://', '')}
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#64748b] group-hover:text-blue-400 transition-colors" />
                    </div>

                    {/* Preview Image */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                      <img
                        src={activeProject.image}
                        alt={activeProject.title}
                        className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-600 text-white font-semibold text-xs shadow-xl">
                          <span>Open Live Site</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </a>

                  {/* Project Details */}
                  <div>
                    <div className="flex items-center gap-2 mb-2 text-xs font-mono text-blue-400">
                      <span>CASE STUDY {activeProject.num}</span>
                      <span>•</span>
                      <span className="text-[#94a3b8]">{activeProject.category}</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#eeece8] tracking-tight leading-snug mb-2">
                      {activeProject.title}
                    </h3>
                    <p className="text-xs font-mono text-[#64748b] mb-4">
                      Client: {activeProject.client}
                    </p>

                    <p className="text-sm sm:text-base text-[#94a3b8] leading-relaxed mb-6 font-normal">
                      {activeProject.description}
                    </p>

                    {/* Verified Commercial Results */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-6">
                      {activeProject.results.map((res, i) => (
                        <div key={i} className="flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.025] border border-white/5 text-xs text-[#cbd5e1]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span className="truncate">{res}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech Stack Tags & CTA Button */}
                    <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex flex-wrap gap-1.5">
                        {activeProject.tags.slice(0, 4).map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-[#14141e] border border-white/10 text-[#94a3b8]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <a
                        href={activeProject.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-studio-primary px-5 py-2.5 text-xs font-mono inline-flex items-center gap-1.5 shrink-0"
                      >
                        <span>Visit Live Platform</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* Bottom Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-[#0e0e14] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-2 text-[#94a3b8]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Looking for a custom WordPress, WooCommerce, or UI/UX platform?</span>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/portfolio" className="text-blue-400 hover:text-blue-300 font-semibold inline-flex items-center gap-1">
              Browse All Projects <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
            <Link to="/contact" className="text-white hover:text-blue-400 font-semibold underline underline-offset-4">
              Book Consultation
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
