import { Shield, Clock, Trophy, HeadphonesIcon, Zap, Users } from 'lucide-react';

const benefits = [
  {
    icon: Shield,
    title: "Proven Track Record",
    description: "50+ successful projects with a 98% client satisfaction rate. Our portfolio speaks for itself."
  },
  {
    icon: Clock,
    title: "Fast Delivery",
    description: "We respect your timeline. Most projects delivered on time or ahead of schedule without compromising quality."
  },
  {
    icon: Trophy,
    title: "Award-Winning Design",
    description: "Our creative team has won multiple industry awards for outstanding web design and user experience."
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description: "Dedicated support team available around the clock to help you with any questions or issues."
  },
  {
    icon: Zap,
    title: "Cutting-Edge Technology",
    description: "We use the latest technologies and best practices to ensure your project is future-proof and scalable."
  },
  {
    icon: Users,
    title: "Dedicated Team",
    description: "You'll work with a dedicated team of experts who understand your business and are committed to your success."
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-slate-900 text-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Choose Aman UX Studio?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We're not just another digital agency. Here's what sets us apart and makes us the right choice for your business.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="group">
                <div className="bg-slate-800 p-8 rounded-xl hover:bg-slate-700 transition-colors duration-300 h-full">
                  <div className="bg-blue-600 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-blue-500 transition-colors">
                    <benefit.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-4">
                Ready to Transform Your Business?
              </h3>
              <p className="text-lg mb-6 text-gray-200">
                Join hundreds of satisfied clients who have already transformed their digital presence with Aman UX Studio.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">50+</div>
                  <div className="text-sm text-gray-200">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">98%</div>
                  <div className="text-sm text-gray-200">Client Satisfaction</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">2+</div>
                  <div className="text-sm text-gray-200">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">24/7</div>
                  <div className="text-sm text-gray-200">Support Available</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}