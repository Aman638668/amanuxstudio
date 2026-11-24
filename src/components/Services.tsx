import { Globe, Search, Palette, ShoppingCart, Layers, ShieldCheck, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { studioAudio } from '@/lib/studio-audio';

export const services = [
  {
    id: "web-development",
    icon: Globe,
    title: "Custom Web Development",
    description: "Modern, responsive websites and web applications built with React, Next.js, TypeScript, and modern frontend tools.",
    features: ["Modern React & Next.js", "Clean, Maintainable Code", "API & Database Integration", "Fast Sub-Second Load Times"]
  },
  {
    id: "wordpress",
    icon: Layers,
    title: "WordPress & Elementor Development",
    description: "Custom corporate websites like Fairease and Expertvuw Management Pvt Ltd with clean design, zero plugin bloat, and easy client editing.",
    features: ["Custom Elementor Pro Layouts", "Speed Hardened & Zero Bloat", "Quote & Lead Capture Forms", "Built-In Security & SSL"]
  },
  {
    id: "ecommerce",
    icon: ShoppingCart,
    title: "E-Commerce Stores (WooCommerce)",
    description: "End-to-end online clothing and retail stores built from scratch (like Ireshh) with UPI/Card payments and mobile checkout.",
    features: ["Built from 0 to 1", "Payment Gateways (UPI & Cards)", "Product Variations & Inventory", "Smooth Mobile Checkout"]
  },
  {
    id: "ui-ux-design",
    icon: Palette,
    title: "UI/UX Design in Figma",
    description: "User-friendly website layouts and interactive Figma prototypes designed to eliminate customer confusion and increase sales.",
    features: ["Figma Wireframes & Prototypes", "Design Systems & Style Guides", "Mobile-First UX Layouts", "Clean Visual Hierarchy"]
  },
  {
    id: "seo-performance",
    icon: Search,
    title: "SEO & Speed Optimization",
    description: "On-page SEO, rich schema markup, and Google Core Web Vitals speed optimization to help you rank higher on Google.",
    features: ["90+ Google PageSpeed Score", "Google Search Console Setup", "XML Sitemaps & Robots.txt", "On-Page Keyword Structure"]
  },
  {
    id: "maintenance-security",
    icon: ShieldCheck,
    title: "Website Maintenance & Support",
    description: "Ongoing website updates, cloud backups, domain & DNS management, and uptime monitoring so your website never crashes.",
    features: ["Regular Plugin & Core Updates", "Automatic Cloud Backups", "Cloudflare & SSL Setup", "Direct Developer Support"]
  }
];

export default function Services() {
  return (
    <section id="services" className="py-24 md:py-32 bg-[#09090c] text-[#eeece8] relative border-t border-white/5">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-blue-400 mb-3">
              <span>[ 03 / SERVICES &amp; EXPERTISE ]</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#eeece8]">
              What We Do.
            </h2>
          </div>
          <p className="text-white/70 max-w-md text-sm sm:text-base leading-relaxed font-normal">
            End-to-end web design and development services tailored to help your brand launch, grow, and convert online.
          </p>
        </div>
        
        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="group relative rounded-2xl border border-white/10 bg-white/[0.03] p-8 flex flex-col justify-between hover:bg-white/[0.06] hover:border-blue-500/40 transition-all duration-300 shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:text-white group-hover:bg-blue-600 transition-colors">
                    <service.icon className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-mono text-white/30">0{index + 1}</span>
                </div>

                <h3 className="text-xl font-bold text-[#eeece8] mb-3 group-hover:text-white transition-colors">
                  {service.title}
                </h3>

                <p className="text-white/70 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                  {service.description}
                </p>

                <ul className="space-y-2 mb-8 border-t border-white/5 pt-4">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-xs text-white/80 font-normal">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <Link
                  to={`/services#${service.id}`}
                  onMouseEnter={() => studioAudio.playHover()}
                  className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-blue-400 hover:text-blue-300 transition-colors group/link"
                >
                  <span>Explore Service Details</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom View All Link */}
        <div className="mt-16 text-center">
          <Link
            to="/services"
            onMouseEnter={() => studioAudio.playHover()}
            className="btn-studio-secondary font-mono uppercase tracking-wider text-xs group"
          >
            <span>View Full Services &amp; Deliverables</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

      </div>
    </section>
  );
}
