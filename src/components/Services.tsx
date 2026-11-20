import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Globe, Search, Palette, ShoppingCart, Layers, ShieldCheck, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { studioAudio } from '@/lib/studio-audio';

export const services = [
  {
    id: "web-development",
    icon: Globe,
    title: "Custom Full-Stack Web Engineering",
    description: "High-performance web applications and dynamic customer portals built with modern React, Next.js, TypeScript, and Supabase.",
    features: ["Modern React & Next.js Ecosystem", "TypeScript & Supabase Auth/DB", "Custom API & Webhook Pipelines", "Sub-second Load Times"]
  },
  {
    id: "wordpress",
    icon: Layers,
    title: "Bespoke WordPress & Headless CMS",
    description: "Hardened, high-converting corporate flagships like Fairease and Expert VUW with zero plugin bloat and effortless editorial control.",
    features: ["Custom Theme & Elementor Pro", "Zero Plugin Bloat / Speed Hardened", "Lead Capture & Quote Funnels", "Enterprise Security Hardening"]
  },
  {
    id: "ecommerce",
    icon: ShoppingCart,
    title: "E-Commerce Architecture (0-to-1)",
    description: "Complete online storefronts engineered from scratch (like Ireshh Apparel) with payment gateways (UPI/Cards), inventory automation, and frictionless checkout.",
    features: ["0-to-1 Store Blueprint", "Automated UPI & Card Gateways", "Dynamic Shipping & Order Sync", "High-Converting Mobile UX"]
  },
  {
    id: "ui-ux-design",
    icon: Palette,
    title: "UX/UI Systems & Interactive Prototypes",
    description: "Conversion-centric wireframing and high-fidelity Figma prototypes designed to eliminate hesitation and maximize customer lifetime value.",
    features: ["Figma Design Systems & Tokens", "Conversion Funnel Mapping", "Interactive Micro-Interactions", "WCAG 2.1 AA Accessibility"]
  },
  {
    id: "seo-performance",
    icon: Search,
    title: "Technical SEO & Speed Architecture",
    description: "Deep technical on-page SEO, rich JSON-LD schema matrices, and Core Web Vitals optimization to win competitive search real estate.",
    features: ["90+ Mobile Core Web Vitals", "JSON-LD Structured Data", "Dynamic XML Sitemaps", "Semantic HTML Hierarchy"]
  },
  {
    id: "maintenance-security",
    icon: ShieldCheck,
    title: "Dedicated Care, Security & Velocity",
    description: "Proactive engineering maintenance, DNS & Cloudflare edge security, automated database backups, and 24/7 uptime vigilance.",
    features: ["Automated Cloud Backups", "Edge Firewall & SSL Management", "Weekly Dependency Audits", "24/7 Production Monitoring"]
  }
];

export default function Services() {
  return (
    <section id="services" className="py-24 md:py-32 bg-[#09090c] text-[#eeece8] relative border-t border-white/5">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#5b5fe0] mb-3">
              <span>[ 03 / SPECIALIZED DISCIPLINES ]</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#eeece8]">
              Capabilities &amp; Craft.
            </h2>
          </div>
          <p className="text-white/60 max-w-md text-sm sm:text-base leading-relaxed font-light">
            End-to-end technical execution tailored to your growth goals. From concept to 0-to-1 launch and scaling.
          </p>
        </div>
        
        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="group relative rounded-2xl border border-white/10 bg-white/[0.02] p-8 flex flex-col justify-between hover:bg-white/[0.04] hover:border-[#5b5fe0]/40 transition-all duration-300 shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#5b5fe0] group-hover:text-white group-hover:bg-[#5b5fe0] transition-colors">
                    <service.icon className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-mono text-white/30">0{index + 1}</span>
                </div>

                <h3 className="text-xl font-bold text-[#eeece8] mb-3 group-hover:text-white transition-colors">
                  {service.title}
                </h3>

                <p className="text-white/60 text-xs sm:text-sm leading-relaxed mb-6 font-light">
                  {service.description}
                </p>

                <ul className="space-y-2 mb-8 border-t border-white/5 pt-4">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-xs text-white/70 font-light">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#5b5fe0] mr-2.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <Link
                  to={`/services#${service.id}`}
                  onMouseEnter={() => studioAudio.playHover()}
                  className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-white/60 group-hover:text-[#5b5fe0] transition-colors"
                >
                  <span>Explore Deliverables</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom View All Link */}
        <div className="mt-16 text-center">
          <Link to="/services">
            <button
              onMouseEnter={() => studioAudio.playHover()}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/15 bg-white/5 hover:bg-white hover:text-black text-white font-medium text-xs font-mono uppercase tracking-wider transition-all"
            >
              <span>View Full Services Catalog &amp; Deliverables</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>

      </div>
    </section>
  );
}
