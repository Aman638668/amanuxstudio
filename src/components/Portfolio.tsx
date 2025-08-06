import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, ArrowRight } from 'lucide-react';

const projects = [
  {
    title: "Expert VUW",
    category: "Finance & Legal",
    description: "Developed a secure, scalable website for a finance and legal consulting firm. Integrated advanced inquiry forms, service categorization, and SEO-optimized legal content for better visibility.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&auto=format&fit=crop&q=60",
    tags: ["Finance", "Legal Services", "SEO", "Wordpress"],
    results: ["200% increase in service inquiries", "3x visibility on finance-related keywords", "90% faster loading time"],
    link: "https://expertvuw.in/"
  },
  {
    title: "TicketDev Travel",
    category: "Tour & Travels",
    description: "Designed and built a clean, responsive travel website focused on user experience, featuring destination listings, simple inquiry forms, and WhatsApp integration for direct customer communication.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&auto=format&fit=crop&q=60",
    tags: ["Travel Website", "Booking", "SEO"],
    results: ["300% sales growth", "50% mobile conversion", "99.9% uptime"],
    link: "https://ticketdevtravels.com/"
  },
  {
    title: "Friends Group",
    category: "Corporate",
    description: "Corporate website for a multi-business conglomerate. Built an elegant multi-page site to represent their varied sectors: construction, manufacturing, and trading. Integrated career page, inquiry forms, and robust CMS.",
    image: "https://images.unsplash.com/photo-1493612276216-ee3925520721?w=500&auto=format&fit=crop&q=60",
    tags: ["Corporate", "Multi-business", "Wordpress"],
    results: ["250% brand engagement growth", "80% career page interaction rate", "Consolidated 3 businesses into 1 digital hub"],
    link: "https://friendsgroup.co.in/"
  }
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real results for real businesses. See how we've helped companies transform their digital presence and achieve remarkable growth.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {projects.map((project, index) => (
              <Card key={index} className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      <Button variant="secondary" size="sm">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Project
                      </Button>
                    </a>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      {project.category}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900">Key Results:</h4>
                    {project.results.map((result, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-700">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        {result}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
              View All Projects
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
