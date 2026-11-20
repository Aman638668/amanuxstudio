import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ArrowUpRight, CheckCircle2, Sparkles } from 'lucide-react';
import { studioAudio } from '@/lib/studio-audio';

export const projects = [
  {
    num: "01",
    title: "Fairease Outsourcing",
    client: "Fairease Outsourcing Pvt. Ltd.",
    category: "Corporate & BPO",
    tagline: "High-Performance BPO Enterprise Platform",
    description: "Designed and engineered the full production corporate platform for Fairease Outsourcing. Engineered custom interactive service matrices, high-converting quotation funnels, dynamic inquiry capture, and aggressive on-page SEO speed optimization.",
    image: "/fairease.png",
    tags: ["WordPress", "Elementor Pro", "Enterprise Funnels", "Core Web Vitals", "Custom CSS"],
    results: ["+150% boost in qualified leads", "Sub-second load times", "100% mobile responsive"],
    link: "https://fairease.in/"
  },
  {
    num: "02",
    title: "Ireshh — Clothing Brand",
    client: "Ireshh Apparel",
    category: "E-Commerce",
    tagline: "0-to-1 Full Scale E-Commerce Store",
    description: "Built the complete online fashion brand storefront from scratch (0 to 1) and managing end-to-end site operations. Handled full store architecture, dynamic catalog matrix, automated payment gateways (Cards/UPI), auto shipping calculation, and frictionless mobile checkout.",
    image: "/ireshh.png",
    tags: ["WooCommerce", "WordPress", "0-to-1 Build", "Payment Integrations", "Full Management"],
    results: ["Built from 0 to 1", "End-to-end full site management", "Frictionless checkout UX"],
    link: "https://ireshh.com/"
  },
  {
    num: "03",
    title: "TicketDev Travel",
    client: "TicketDev Tours & Holidays",
    category: "Travel & Booking",
    tagline: "Modern Tour Booking & Itinerary Platform",
    description: "Designed and developed an ultra-clean, mobile-first travel booking platform featuring structured destination packages, one-click itinerary inquiries, and automated WhatsApp direct booking channels.",
    image: "/ticketdev-travels.png",
    tags: ["Travel Portal", "WhatsApp Automation", "Speed Tuning", "SEO Architecture"],
    results: ["300% sales growth", "50% mobile conversion lift", "99.9% production uptime"],
    link: "https://ticketdevtravels.com/"
  },
  {
    num: "04",
    title: "Friends Group",
    client: "Friends Group Conglomerate",
    category: "Corporate & BPO",
    tagline: "Multi-Industry Enterprise Portal",
    description: "Enterprise web portal consolidating three diverse business entities (construction, industrial manufacturing, and global trading) into a unified digital flagship with custom career applications and interactive portfolios.",
    image: "/friendsgroup.png",
    tags: ["Corporate Multi-Site", "Career Portal", "Custom WordPress", "Content Strategy"],
    results: ["250% brand engagement lift", "Consolidated 3 business units", "80% application rate"],
    link: "https://friendsgroup.co.in/"
  },
  {
    num: "05",
    title: "Expert VUW",
    client: "Expert VUW Consulting",
    category: "Finance & Legal",
    tagline: "Bespoke Consulting & Financial Advisory Web System",
    description: "Engineered a secure, authoritative digital presence for legal and finance experts. Features consultative lead-capture forms, dynamic service matrices, and SEO-targeted content clusters that dominate organic search.",
    image: "/expertvuw.png",
    tags: ["Finance Consulting", "Legal Portal", "High-Authority SEO", "Secure Forms"],
    results: ["200% increase in consultations", "3x search visibility", "90% faster page render"],
    link: "https://expertvuw.in/"
  }
];

const categories = ["All", "E-Commerce", "Corporate & BPO", "Travel & Booking", "Finance & Legal"];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="portfolio" className="py-24 md:py-32 bg-[#09090c] text-[#eeece8] relative">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#5b5fe0] mb-3">
              <span>[ 02 / SELECTED CLIENT ARCHITECTURES ]</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#eeece8]">
              Proof in Production.
            </h2>
          </div>
          <p className="text-white/60 max-w-md text-sm sm:text-base leading-relaxed">
            Real client systems engineered for high conversion, sub-second latency, and scalable commercial volume.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                studioAudio.playClick(750);
                setActiveCategory(cat);
              }}
              onMouseEnter={() => studioAudio.playHover()}
              className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider uppercase transition-all ${
                activeCategory === cat
                  ? 'bg-white text-black font-semibold shadow-md'
                  : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Chapter Showcase List */}
        <div className="space-y-20 md:space-y-28">
          {filteredProjects.map((project, idx) => (
            <motion.article
              key={project.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
              className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center group relative pt-6"
            >
              {/* Giant ghost numeral behind chapter */}
              <div className="absolute -top-12 -left-4 pointer-events-none select-none z-0">
                <span className="font-mono text-8xl md:text-9xl font-bold text-transparent stroke-text opacity-20">
                  {project.num}
                </span>
              </div>

              {/* Left Column: Project Narrative */}
              <div className="lg:col-span-6 relative z-10 space-y-5">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-[#5b5fe0] uppercase tracking-wider">
                    CASE STUDY {project.num}
                  </span>
                  <span className="text-white/20">·</span>
                  <span className="text-xs font-mono text-white/50 uppercase tracking-wider">
                    {project.category}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-4xl font-bold text-[#eeece8] tracking-tight group-hover:text-white transition-colors">
                  {project.title}
                </h3>

                <p className="text-sm sm:text-base text-white/65 leading-relaxed font-light">
                  {project.description}
                </p>

                {/* Key Business Results */}
                <div className="space-y-2 pt-2">
                  {project.results.map((res, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-[#eeece8]/90">
                      <CheckCircle2 className="w-4 h-4 text-[#3ddc84] flex-shrink-0" />
                      <span>{res}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 pt-3">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md text-[11px] font-mono tracking-wide bg-white/5 border border-white/10 text-white/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Direct Live Link */}
                <div className="pt-3">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => studioAudio.playHover()}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#eeece8] hover:text-[#5b5fe0] transition-colors group/link"
                    data-cursor="Visit"
                  >
                    <span>Launch Live Platform</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
                  </a>
                </div>
              </div>

              {/* Right Column: Visual Showcase Frame */}
              <div className="lg:col-span-6 relative z-10">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative rounded-2xl overflow-hidden border border-white/10 bg-[#141418] group/img shadow-2xl transition-all duration-500 hover:border-[#5b5fe0]/50"
                  data-cursor="Live Site"
                >
                  {/* Browser top-bar mockup */}
                  <div className="flex items-center justify-between px-4 py-2.5 bg-black/40 border-b border-white/5 backdrop-blur-sm">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                      <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                      <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                    </div>
                    <span className="text-[11px] font-mono text-white/40 tracking-wider truncate max-w-[200px]">
                      {project.link.replace('https://', '')}
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-white/40" />
                  </div>

                  {/* Image with zoom on hover */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover/img:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-black font-semibold text-xs shadow-lg">
                        <span>Visit {project.client}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </a>
              </div>

            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}
