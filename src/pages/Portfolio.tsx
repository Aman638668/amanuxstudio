import { useState } from 'react';
import Navigation from '@/components/Navigation';
import PageHeader from '@/components/PageHeader';
import Footer from '@/components/Footer';
import Seo from '@/components/Seo';
import { ExternalLink, ArrowRight, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projects } from '@/components/Portfolio';
import { studioAudio } from '@/lib/studio-audio';

const categories = ["All", "E-Commerce", "Corporate & BPO", "Travel & Booking", "Finance & Legal"];

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#09090c] text-[#eeece8] flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      <Seo
        title="Client Portfolio & Case Studies"
        description="Explore live production case studies by Aman UX Studio including Fairease Outsourcing, Ireshh, Ticketdev Travels, and Expertvuw Management Pvt Ltd."
        url="/portfolio"
      />
      <div className="ambient-grain" aria-hidden="true" />
      <Navigation />

      <PageHeader
        badge="SELECTED WORK"
        title="Featured Client Case Studies."
        description="Every website we build is configured for sub-second speed, lead generation, and measurable commercial results."
      />

      <main className="flex-grow py-20 container mx-auto px-6 max-w-7xl relative z-10 space-y-16">
        
        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 pb-8 border-b border-white/10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                studioAudio.playClick(750);
                setActiveCategory(cat);
              }}
              onMouseEnter={() => studioAudio.playHover()}
              className={`h-9 px-4 rounded-full text-xs font-medium tracking-wide transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white font-semibold shadow-md shadow-blue-600/30'
                  : 'bg-white/[0.04] text-white/70 hover:text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Case Studies Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <article
              key={project.num}
              className="group relative rounded-3xl border border-white/10 bg-white/[0.025] hover:bg-white/[0.05] p-6 sm:p-8 flex flex-col justify-between hover:border-blue-500/40 transition-all duration-300 shadow-xl overflow-hidden"
            >
              <div className="space-y-5">
                {/* Visual Frame */}
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative rounded-2xl overflow-hidden border border-white/10 bg-[#141418] aspect-[16/10] group/img shadow-xl"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover/img:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-600 text-white text-xs font-semibold shadow-lg">
                      <span>Visit Live Website</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </a>

                {/* Narrative */}
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-blue-400 mb-2">
                    <span className="uppercase tracking-wider">{project.category}</span>
                    <span className="text-white/30">CASE #{project.num}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-blue-300 transition-colors mb-2">
                    {project.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-normal mb-4">
                    {project.description}
                  </p>

                  {/* Results */}
                  <div className="space-y-1.5 pt-2 border-t border-white/5">
                    {project.results.map((res, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-white/90">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#3ddc84] shrink-0" />
                        <span>{res}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 border border-white/10 text-white/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-studio-primary btn-studio-sm font-semibold shrink-0"
                >
                  <span>Visit Site</span>
                  <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* CTA Bar */}
        <div className="rounded-3xl border border-white/15 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
          <div className="max-w-2xl mx-auto space-y-4">
            <h3 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              Have a Project in Mind?
            </h3>
            <p className="text-sm sm:text-base text-white/70 leading-relaxed font-normal">
              Whether you need an e-commerce storefront or a custom corporate rebuild, let's craft something exceptional.
            </p>
            <div className="pt-2">
              <Link to="/contact" className="btn-studio-primary group">
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
