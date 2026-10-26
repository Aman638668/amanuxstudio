import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const projects = [
  {
    title: "Fairease Outsourcing",
    category: "Corporate & BPO",
    description: "Designed and engineered the full production corporate platform for Fairease Outsourcing Pvt. Ltd. Structured interactive service showcases, quote/inquiry capture funnels, and optimized speed and on-page SEO.",
    image: "/fairease.png",
    tags: ["WordPress", "Elementor", "Corporate", "SEO", "Lead Funnel"],
    results: ["150% boost in online inquiries", "Sub-second load times", "100% mobile-responsive"],
    link: "https://fairease.in/"
  },
  {
    title: "Ireshh — Clothing Brand",
    category: "Fashion & E-Commerce",
    description: "Built the complete online clothing store from scratch (0 to 1) and managing the full website. Handled store architecture, catalog variations, online payment gateways (Cards/UPI), automated shipping, and mobile UX.",
    image: "/ireshh.png",
    tags: ["WooCommerce", "WordPress", "E-Commerce", "Payment Gateways", "Full Management"],
    results: ["Built from 0 to 1", "End-to-end full site management", "Frictionless mobile checkout"],
    link: "https://ireshh.com/"
  },
  {
    title: "TicketDev Travel",
    category: "Tour & Travels",
    description: "Designed and built a clean, responsive travel booking website featuring destination itineraries, simple inquiry forms, and WhatsApp integration for instant direct customer bookings.",
    image: "/ticketdev-travels.png",
    tags: ["Travel Website", "Booking", "SEO", "WhatsApp Integration"],
    results: ["300% sales growth", "50% mobile conversion", "99.9% uptime"],
    link: "https://ticketdevtravels.com/"
  },
  {
    title: "Friends Group",
    category: "Corporate Conglomerate",
    description: "Corporate multi-page website for a business conglomerate spanning construction, manufacturing, and trading. Integrated interactive career portal and custom content management.",
    image: "/friendsgroup.png",
    tags: ["Corporate", "Multi-business", "WordPress", "Career Portal"],
    results: ["250% brand engagement growth", "80% career interaction rate", "Consolidated 3 businesses into 1 portal"],
    link: "https://friendsgroup.co.in/"
  },
  {
    title: "Expert VUW",
    category: "Finance & Legal",
    description: "Secure, scalable web portal for a finance and legal consulting firm. Integrated advanced consultation inquiry forms, service matrices, and SEO-optimized legal articles.",
    image: "/expertvuw.png",
    tags: ["Finance", "Legal Services", "SEO", "WordPress"],
    results: ["200% increase in inquiries", "3x visibility on finance keywords", "90% faster loading time"],
    link: "https://expertvuw.in/"
  }
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Client Case Studies</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-6">
              Production Work &amp; Case Studies
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real results for real businesses. See how we've helped brands like Fairease, Ireshh, and TicketDev transform their digital presence and grow revenue.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {projects.slice(0, 3).map((project, index) => (
              <Card key={index} className="group overflow-hidden hover:shadow-xl transition-all duration-300 border border-slate-200 shadow-sm flex flex-col justify-between rounded-2xl bg-white">
                <div>
                  <div className="relative overflow-hidden h-52 bg-slate-100 border-b border-slate-100">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <a href={project.link} target="_blank" rel="noopener noreferrer">
                        <Button variant="secondary" size="sm" className="shadow-lg font-semibold">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Visit Live Website
                        </Button>
                      </a>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="secondary" className="bg-blue-50 text-blue-700 font-medium">
                        {project.category}
                      </Badge>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 mb-4 text-xs sm:text-sm leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.tags.map((tag, idx) => (
                        <Badge key={idx} variant="outline" className="text-[10px] text-slate-600">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="space-y-1.5 pt-3 border-t border-slate-100">
                      <h4 className="font-semibold text-[11px] text-slate-500 uppercase tracking-wider mb-1.5">Key Deliverables:</h4>
                      {project.results.map((result, idx) => (
                        <div key={idx} className="flex items-center text-xs text-gray-700">
                          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2 flex-shrink-0"></div>
                          {result}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </div>

                <div className="px-6 pb-6 pt-2">
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="w-full block">
                    <Button variant="outline" className="w-full text-slate-700 hover:text-blue-600 hover:border-blue-300 text-xs font-semibold">
                      Visit Website <ExternalLink className="ml-2 h-3.5 w-3.5" />
                    </Button>
                  </a>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <Link to="/portfolio">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white shadow-md">
                View All Case Studies ({projects.length})
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
