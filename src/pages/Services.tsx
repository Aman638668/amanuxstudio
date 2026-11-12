import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import PageHeader from '@/components/PageHeader';
import Footer from '@/components/Footer';
import Seo from '@/components/Seo';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Globe, 
  ShoppingCart, 
  Palette, 
  Search, 
  ShieldCheck, 
  Cpu, 
  ArrowRight, 
  Check, 
  Layers, 
  CheckCircle2, 
  Clock, 
  Zap, 
  Smartphone 
} from 'lucide-react';

const servicesList = [
  {
    id: "web-development",
    icon: Globe,
    title: "Custom Full-Stack Web Development",
    tagline: "High-performance web applications built with modern React, Next.js, and TypeScript.",
    description: "We build modern, scalable web applications from scratch without relying on sluggish templates. Ideal for startups and companies that require dynamic functionality, real-time databases, and custom user portals.",
    deliverables: [
      "Custom React / Next.js architecture with clean TypeScript",
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
    title: "WordPress & Elementor Engineering",
    tagline: "Corporate platforms built for easy marketing management, enterprise speed, and zero headaches.",
    description: "WordPress powers over 40% of the web, but poorly built sites crash and load slowly. We engineer custom WordPress and Elementor architectures—like our work on Fairease and Expertvuw—ensuring lightning-fast load times and bulletproof security.",
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
    title: "SEO Architecture & Core Web Vitals Tuning",
    tagline: "Dominate search rankings with sub-second speeds and structured semantic markup.",
    description: "Google ranks fast, accessible websites. We perform in-depth speed tuning and technical on-page SEO to ensure your platform passes Core Web Vitals (LCP, INP, CLS) and gets found by target buyers.",
    deliverables: [
      "Sub-second load times & Google PageSpeed 90+ targets",
      "JSON-LD Schema markup for rich Google search snippets",
      "Dynamic XML sitemaps, robots.txt & canonical tag architecture",
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
    desc: "We analyze your target audience, business goals, and competitors to determine the exact technical stack and sitemap required."
  },
  {
    number: "02",
    title: "UI/UX Wireframing",
    desc: "We map out user flows and craft interactive Figma designs so you can experience the look and feel before coding begins."
  },
  {
    number: "03",
    title: "Clean-Code Engineering",
    desc: "We build your platform using clean, maintainable code—whether custom React/Next.js or hardened WordPress/WooCommerce."
  },
  {
    number: "04",
    title: "QA & Performance Tuning",
    desc: "Rigorous cross-browser testing, mobile responsiveness checks, and Core Web Vitals optimization to guarantee sub-second speeds."
  },
  {
    number: "05",
    title: "Launch & Proactive Support",
    desc: "We handle domain DNS cutover, SSL, search engine indexing, and provide ongoing direct developer maintenance."
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
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Seo
        title="Services & Digital Engineering Solutions"
        description="Comprehensive web development, custom WordPress, WooCommerce e-commerce, UI/UX design, and Core Web Vitals speed optimization by Aman UX Studio."
        url="/services"
      />
      <Navigation />
      <PageHeader
        title="Our Services & Technical Solutions"
        description="End-to-end digital craftsmanship tailored to your business goals. From high-converting e-commerce stores to scalable custom web apps."
      />

      <main className="flex-grow py-16 container mx-auto px-6 max-w-6xl">
        {/* Intro Banner */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-blue-600 font-semibold text-xs sm:text-sm uppercase tracking-wider">
            What We Do
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 mb-4">
            Everything You Need to Build, Launch &amp; Scale
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            No cookie-cutter templates or unneeded bloat. Every service is delivered with obsessive attention to user experience, clean code, and business conversion.
          </p>
        </div>

        {/* Detailed Services Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-24">
          {servicesList.map((service) => {
            const Icon = service.icon;
            return (
              <Card 
                key={service.id} 
                id={service.id} 
                className="scroll-mt-28 border border-slate-200 bg-white shadow-sm hover:shadow-xl transition-all duration-300 rounded-2xl flex flex-col justify-between overflow-hidden"
              >
                <div className="p-8">
                  <div className="h-12 w-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 shadow-inner">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-blue-600 mb-4">
                    {service.tagline}
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <div className="space-y-2.5 pt-4 border-t border-slate-100 mb-6">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">Key Deliverables:</h4>
                    {service.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-start text-xs sm:text-sm text-slate-700">
                        <Check className="h-4 w-4 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {service.tech.map((t, idx) => (
                      <Badge key={idx} variant="outline" className="text-[10px] text-slate-600 bg-slate-50">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500">Custom Scope &amp; Fast Delivery</span>
                  <Link to="/contact">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs">
                      Discuss This Service <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Process Section */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-blue-600 font-semibold text-xs uppercase tracking-wider">Our Proven Methodology</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 mb-3">
              How We Take Projects From Concept to Launch
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              A transparent, 5-step roadmap ensuring on-time delivery with zero technical surprises.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {processSteps.map((step, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative flex flex-col justify-between">
                <div>
                  <div className="text-2xl font-black text-blue-600/30 font-mono mb-3">
                    {step.number}
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm mb-2">
                    {step.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Card */}
        <div className="rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 p-8 sm:p-14 text-white text-center shadow-xl">
          <h3 className="text-2xl sm:text-4xl font-extrabold mb-4">
            Have a Project in Mind? Let's Talk.
          </h3>
          <p className="text-sm sm:text-base text-blue-100 max-w-2xl mx-auto mb-8 leading-relaxed">
            Whether you need a full corporate rebuild like Fairease, a custom e-commerce storefront, or a high-performance web app, we provide free consultation and transparent proposals within 24 hours.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 font-bold px-8 py-6 rounded-full shadow-lg">
                Get a Free Consultation &amp; Proposal <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/portfolio">
              <Button size="lg" variant="outline" className="border-white/70 text-white hover:bg-white hover:text-slate-900 font-semibold px-8 py-6 rounded-full bg-transparent">
                View Past Case Studies
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
