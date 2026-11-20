import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import PageHeader from '@/components/PageHeader';
import Footer from '@/components/Footer';
import Seo from '@/components/Seo';
import { 
  Globe, 
  ShoppingCart, 
  Palette, 
  Search, 
  ShieldCheck, 
  ArrowRight, 
  Check, 
  Layers, 
  CheckCircle2, 
  Zap,
  ArrowUpRight
} from 'lucide-react';
import { studioAudio } from '@/lib/studio-audio';

const servicesList = [
  {
    id: "web-development",
    icon: Globe,
    title: "Custom Full-Stack Web Development",
    tagline: "High-performance web applications built with modern React, Next.js, and TypeScript.",
    description: "We build modern, scalable web applications from scratch without relying on sluggish templates. Ideal for startups and companies that require dynamic functionality, real-time databases, and custom user portals.",
    deliverables: [
      "Custom React & Next.js frontend with clean TypeScript",
      "Supabase / PostgreSQL database modeling & authentication",
      "API integrations (payment gateways, CRMs, webhooks)",
      "Zero-latency static generation & server-side rendering (SSR)",
      "Mobile-first responsive layouts for all device screens"
    ],
    tech: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Node.js"]
  },
  {
    id: "wordpress",
    icon: Layers,
    title: "WordPress & Elementor Development",
    tagline: "Corporate websites built for easy content management, fast speeds, and zero headaches.",
    description: "WordPress powers over 40% of the web, but poorly built sites crash and load slowly. We design and build custom WordPress and Elementor websites—like our work on Fairease and Expert VUW—ensuring fast load times and clean, reliable design.",
    deliverables: [
      "Pixel-perfect custom Elementor Pro & block layouts",
      "Bespoke PHP hooks, custom post types & taxonomies",
      "Elimination of plugin bloat (lean, hardened setups)",
      "Automated lead capture funnels (Discord, email, CRM)",
      "Easy-to-use client dashboard to edit text, images & blogs"
    ],
    tech: ["WordPress", "Elementor Pro", "PHP", "Custom CSS/JS", "MySQL", "cPanel/Hostinger"]
  },
  {
    id: "ecommerce",
    icon: ShoppingCart,
    title: "E-Commerce Solutions (WooCommerce & Shopify)",
    tagline: "High-converting online storefronts configured to maximize average order value.",
    description: "From product variations to frictionless mobile checkout, we build and manage complete e-commerce stores from 0 to 1. We ensure your store handles traffic spikes, calculates shipping accurately, and accepts cards and UPI effortlessly.",
    deliverables: [
      "End-to-end store creation & product catalog setup",
      "Payment gateway integration (Stripe, Razorpay, UPI, Cards)",
      "Automated order confirmation emails & WhatsApp alerts",
      "Conversion rate optimization (1-click checkout, upsells)",
      "Inventory, coupon & shipping rate rule configuration"
    ],
    tech: ["WooCommerce", "WordPress", "Shopify", "Payment Gateways", "Cart Optimization"]
  },
  {
    id: "ui-ux-design",
    icon: Palette,
    title: "UI/UX Design & Design Systems",
    tagline: "Interfaces designed to guide users naturally toward purchasing and inquiring.",
    description: "Great design isn't just decoration—it's functional problem-solving. We design intuitive user journeys and high-fidelity Figma prototypes that eliminate user hesitation and establish brand trust immediately.",
    deliverables: [
      "Interactive Figma wireframes and clickable prototypes",
      "Custom design systems (typography, tokens, components)",
      "User journey mapping & high-converting landing page layouts",
      "Accessibility & contrast standard compliance",
      "Asset exports ready for developers or direct implementation"
    ],
    tech: ["Figma", "UI/UX Design", "Wireframing", "Responsive Design", "Design Tokens"]
  },
  {
    id: "seo-performance",
    icon: Search,
    title: "SEO & Core Web Vitals Optimization",
    tagline: "Rank higher on Google with fast speeds and structured semantic markup.",
    description: "Google ranks fast, accessible websites. We optimize load speeds and technical on-page SEO so your website passes Core Web Vitals (LCP, INP, CLS) and gets found by customers.",
    deliverables: [
      "Sub-second load times & Google PageSpeed 90+ score",
      "JSON-LD Schema markup for rich Google search snippets",
      "Dynamic XML sitemaps, robots.txt & canonical tags",
      "Image optimization (WebP/AVIF compression & lazy loading)",
      "Comprehensive on-page keyword targeting & meta tags"
    ],
    tech: ["Google Search Console", "PageSpeed Insights", "Lighthouse", "Schema.org", "Web Vitals"]
  },
  {
    id: "maintenance-security",
    icon: ShieldCheck,
    title: "Ongoing Maintenance, Security & Hosting",
    tagline: "Proactive management so your website never goes down or gets hacked.",
    description: "Websites are living software that require ongoing attention. We manage your DNS, SSL, cloud hosting, plugin updates, and off-site database backups so you can focus on running your business.",
    deliverables: [
      "Weekly plugin, theme & core WordPress/code updates",
      "Daily off-site cloud backups with 1-click restore",
      "Cloudflare firewall, DDoS protection & SSL setup",
      "24/7 uptime monitoring & instant alert resolution",
      "Direct developer support on WhatsApp & email"
    ],
    tech: ["Cloudflare", "SSL", "Automated Backups", "Uptime Monitoring", "Security Auditing"]
  }
];

const processSteps = [
  {
    number: "01",
    title: "Discovery & Strategy",
    desc: "We analyze your target market, competitors, and conversion objectives to define sitemap and tech architecture."
  },
  {
    number: "02",
    title: "UI/UX Wireframing",
    desc: "We map user journeys and create interactive Figma designs so you experience the look and feel before code starts."
  },
  {
    number: "03",
    title: "Clean Web Development",
    desc: "We build your website using lean, maintainable code—whether modern React/Next.js or tailored WordPress."
  },
  {
    number: "04",
    title: "QA & Performance Tuning",
    desc: "Rigorous cross-browser testing, mobile responsiveness audits, and sub-second Core Web Vitals tuning."
  },
  {
    number: "05",
    title: "Launch & Direct Support",
    desc: "We handle domain DNS cutover, SSL certification, search engine indexing, and provide direct developer maintenance."
  }
];

export default function ServicesPage() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 120);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-[#09090c] text-[#eeece8] flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      <Seo
        title="Services & Web Design Solutions"
        description="Comprehensive web development, custom WordPress, WooCommerce e-commerce, UI/UX design in Figma, and Core Web Vitals speed optimization by Aman UX Studio."
        url="/services"
      />
      <div className="ambient-grain" aria-hidden="true" />
      <Navigation />

      <PageHeader
        badge="STUDIO DISCIPLINES"
        title="End-to-End Web Design & Development."
        description="Everything you need to launch, scale, and convert online. Built with clean code, sub-second speed, and zero agency bloat."
      />

      <main className="flex-grow py-20 container mx-auto px-6 max-w-6xl relative z-10 space-y-24">
        
        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {servicesList.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                id={service.id}
                className="scroll-mt-28 rounded-3xl border border-white/10 bg-white/[0.025] hover:bg-white/[0.045] p-8 sm:p-10 flex flex-col justify-between hover:border-blue-500/40 transition-all duration-300 shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-xs text-white/30">0{index + 1}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-mono text-blue-400 mb-4">
                    {service.tagline}
                  </p>
                  <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-normal mb-6">
                    {service.description}
                  </p>

                  <div className="space-y-2 pt-4 border-t border-white/5 mb-6">
                    <div className="text-xs font-mono uppercase tracking-wider text-white/50 mb-3">Key Deliverables:</div>
                    {service.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-start text-xs sm:text-sm text-white/80">
                        <Check className="h-4 w-4 text-[#3ddc84] mr-2 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {service.tech.map((t, idx) => (
                      <span key={idx} className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-white/60">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs font-mono text-white/40">Custom Scope &amp; Fast Delivery</span>
                  <Link
                    to="/contact"
                    className="btn-studio-primary btn-studio-sm font-semibold"
                  >
                    <span>Discuss Project</span>
                    <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* 5-Step Methodology */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 sm:p-12 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-blue-400">[ METHODOLOGY ]</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white">How We Take Projects From Concept to Launch</h3>
            <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
              A transparent, 5-step roadmap ensuring on-time delivery with zero technical surprises.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {processSteps.map((step, idx) => (
              <div key={idx} className="p-5 rounded-2xl border border-white/5 bg-white/[0.02] space-y-2 hover:border-white/15 transition-colors">
                <div className="text-2xl font-black text-blue-500/30 font-mono">
                  {step.number}
                </div>
                <h4 className="font-bold text-white text-sm">
                  {step.title}
                </h4>
                <p className="text-xs text-white/60 leading-relaxed font-normal">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Bar */}
        <div className="rounded-3xl border border-white/15 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
          <div className="max-w-2xl mx-auto space-y-4">
            <h3 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              Have a Website in Mind? Let's Talk.
            </h3>
            <p className="text-sm sm:text-base text-white/70 leading-relaxed font-normal">
              Whether you need a custom corporate website, an e-commerce storefront, or speed tuning, we provide free consultation and transparent proposals within 24 hours.
            </p>
            <div className="flex flex-wrap gap-4 justify-center pt-2">
              <Link to="/contact" className="btn-studio-primary group">
                <span>Get a Free Consultation &amp; Proposal</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/portfolio" className="btn-studio-secondary">
                <span>View Past Case Studies</span>
              </Link>
            </div>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
