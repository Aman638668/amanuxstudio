import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Globe, Search, Palette, ShoppingCart, Layers, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    id: "web-development",
    icon: Globe,
    title: "Custom Full-Stack Web Development",
    description: "Custom web applications and interactive portals built with modern React, Next.js, TypeScript, and Supabase.",
    features: ["Modern React & Next.js", "TypeScript & Supabase", "Custom API Integrations", "Sub-second Load Times"]
  },
  {
    id: "wordpress",
    icon: Layers,
    title: "WordPress & Elementor Engineering",
    description: "Clean, hardened corporate websites like Fairease and Expertvuw with zero plugin bloat and easy client editing.",
    features: ["Custom Elementor Pro", "Zero Plugin Bloat", "Lead Capture Funnels", "Bulletproof Security"]
  },
  {
    id: "ecommerce",
    icon: ShoppingCart,
    title: "E-Commerce Solutions (WooCommerce & Shopify)",
    description: "End-to-end online storefronts built from 0 to 1 with UPI/Card payments, automated shipping, and high conversion rates.",
    features: ["0 to 1 Store Architecture", "Payment Gateways (UPI/Cards)", "Automated Shipping & Orders", "Frictionless Mobile Checkout"]
  },
  {
    id: "ui-ux-design",
    icon: Palette,
    title: "UI/UX Design & Wireframing",
    description: "User journey mapping and high-fidelity Figma prototypes designed to eliminate user hesitation and drive conversions.",
    features: ["Interactive Figma Prototypes", "Design Systems & Tokens", "Conversion-focused Layouts", "Mobile-First Design"]
  },
  {
    id: "seo-performance",
    icon: Search,
    title: "SEO Architecture & Speed Tuning",
    description: "Technical on-page SEO, rich schema markup, and Core Web Vitals optimization to rank higher on Google.",
    features: ["Core Web Vitals 90+", "JSON-LD Schema Markup", "Dynamic XML Sitemaps", "Keyword Optimization"]
  },
  {
    id: "maintenance-security",
    icon: ShieldCheck,
    title: "Ongoing Maintenance & Hosting",
    description: "Proactive care, DNS & SSL management, automated cloud backups, and uptime monitoring so your website never fails.",
    features: ["Weekly Core & Plugin Updates", "Daily Cloud Backups", "Cloudflare & SSL Setup", "24/7 Uptime Monitoring"]
  }
];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">What We Do</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-6">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive digital engineering and design solutions tailored to your business needs. From concept to 0-to-1 launch, we've got you covered.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Card key={service.id} className="group hover:shadow-xl transition-all duration-300 border border-slate-200/80 shadow-md hover:-translate-y-2 flex flex-col justify-between bg-white rounded-2xl">
                <div>
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto mb-4 p-3 bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                      <service.icon className="h-8 w-8 text-blue-600 group-hover:text-white transition-colors" />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900 mb-2">
                      <Link to={`/services#${service.id}`} className="hover:text-blue-600 transition-colors">
                        {service.title}
                      </Link>
                    </CardTitle>
                    <CardDescription className="text-gray-600 text-sm leading-relaxed">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-xs text-gray-700">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2.5 flex-shrink-0"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </div>
                
                <div className="p-6 pt-0">
                  <Link to={`/services#${service.id}`} className="w-full block">
                    <Button variant="outline" className="w-full group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-colors text-xs font-semibold">
                      Explore Service Details <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>

          {/* Bottom View All Link */}
          <div className="mt-12 text-center">
            <Link to="/services">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md">
                View All Services &amp; Deliverables <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
