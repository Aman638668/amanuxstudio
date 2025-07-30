import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Globe, Search, Palette, Smartphone, ShoppingCart, BarChart3 } from 'lucide-react';

const services = [
  {
    icon: Globe,
    title: "Web Design & Development",
    description: "Custom websites and web applications built with modern technologies, responsive design, and optimal performance.",
    features: ["Responsive Design", "Wordpress Development", "CMS Integration", "Performance Optimization"]
  },
  {
    icon: Search,
    title: "SEO & Digital Marketing",
    description: "Comprehensive SEO strategies and digital marketing campaigns to increase your online visibility and drive qualified traffic.",
    features: ["Keyword Research", "On-Page SEO", "Content Marketing", "PPC Campaigns"]
  },
  {
    icon: Palette,
    title: "Branding & Design",
    description: "Complete brand identity development including logo design, brand guidelines, and visual identity systems.",
    features: ["Logo Design", "Brand Guidelines", "Visual Identity", "Print Design"]
  },
  // {
  //   icon: Smartphone,
  //   title: "Mobile App Development",
  //   description: "Native and cross-platform mobile applications for iOS and Android with seamless user experiences.",
  //   features: ["iOS Development", "Android Development", "Cross-Platform", "UI/UX Design"]
  // },
  {
    icon: ShoppingCart,
    title: "E-commerce Solutions",
    description: "Complete e-commerce platforms with secure payment processing, inventory management, and conversion optimization.",
    features: ["Online Stores", "Payment Integration", "Inventory Management", "Analytics"]
  },
  // {
  //   icon: BarChart3,
  //   title: "Analytics & Optimization",
  //   description: "Data-driven insights and continuous optimization to improve your digital performance and ROI.",
  //   features: ["Google Analytics", "Conversion Tracking", "A/B Testing", "Performance Reports"]
  // }
];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive digital solutions tailored to your business needs. From concept to launch, we've got you covered.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-2">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-3 bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <service.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 mb-2">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-700">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" className="w-full group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}