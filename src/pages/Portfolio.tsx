import Navigation from '@/components/Navigation';
import PageHeader from '@/components/PageHeader';
import Footer from '@/components/Footer';
import Seo from '@/components/Seo';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projects } from '@/components/Portfolio';

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Seo
        title="Client Portfolio & Case Studies"
        description="Explore production case studies including Fairease Outsourcing, Ireshh Clothing, TicketDev Travel, and Expertvuw."
        url="/portfolio"
      />
      <Navigation />
      <PageHeader
        title="Our Work & Case Studies"
        description="Real-world production websites built for measurable performance, lead generation, and business growth."
      />

      <main className="flex-grow py-16 container mx-auto px-6 max-w-6xl">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
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

        {/* Bottom CTA */}
        <div className="mt-16 text-center bg-white p-10 rounded-2xl border border-slate-200 shadow-sm max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-slate-900 mb-2">Have a Similar Project in Mind?</h3>
          <p className="text-sm text-slate-600 mb-6">
            Whether you need a full-scale e-commerce store like Ireshh or a corporate presence like Fairease, let's discuss your requirements.
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold">
              Get a Free Project Proposal <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
