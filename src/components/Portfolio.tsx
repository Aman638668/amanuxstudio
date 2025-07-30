import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, ArrowRight } from 'lucide-react';

const projects = [
  {
    title: "TechStartup Pro",
    category: "Web Development",
    description: "Complete website redesign and development for a B2B SaaS platform, resulting in 150% increase in conversion rates.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&auto=format&fit=crop&q=60",
    tags: ["React", "Node.js", "SEO", "Analytics"],
    results: ["150% conversion increase", "40% faster load times", "60% more leads"]
  },
  {
    title: "E-commerce Empire",
    category: "E-commerce",
    description: "Full-scale e-commerce platform with custom features, payment processing, and inventory management system.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&auto=format&fit=crop&q=60",
    tags: ["E-commerce", "Payment Gateway", "Mobile App", "SEO"],
    results: ["300% sales growth", "50% mobile conversion", "99.9% uptime"]
  },
  {
    title: "Brand Revolution",
    category: "Branding",
    description: "Complete brand identity overhaul including logo design, brand guidelines, and digital asset creation.",
    image: "https://images.unsplash.com/photo-1493612276216-ee3925520721?w=500&auto=format&fit=crop&q=60",
    tags: ["Logo Design", "Brand Identity", "Print Design", "Guidelines"],
    results: ["200% brand recognition", "85% customer retention", "50% market expansion"]
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
                    <Button variant="secondary" size="sm">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Project
                    </Button>
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