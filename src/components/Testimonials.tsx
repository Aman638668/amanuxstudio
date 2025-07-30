import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Sarah Johnson",
    position: "CEO, TechVision Solutions",
    company: "TechVision Solutions",
    content: "Aman UX Studio transformed our online presence completely. Their team delivered a stunning website that not only looks amazing but has increased our leads by 200%. The attention to detail and professional approach made the entire process seamless.",
    rating: 5,
    avatar: "SJ"
  },
  {
    name: "Michael Chen",
    position: "Founder, GrowthHub",
    company: "GrowthHub",
    content: "Working with Aman UX Studio was a game-changer for our startup. They understood our vision perfectly and created a brand identity that truly represents who we are. The SEO work they did has put us on the first page of Google for our key terms.",
    rating: 5,
    avatar: "MC"
  },
  {
    name: "Emily Rodriguez",
    position: "Marketing Director, RetailPlus",
    company: "RetailPlus",
    content: "The e-commerce platform Aman UX Studio built for us has exceeded all expectations. Sales have tripled since launch, and the user experience is phenomenal. Their ongoing support and optimization recommendations keep us ahead of the competition.",
    rating: 5,
    avatar: "ER"
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it. Here's what business leaders have to say about working with Aman UX Studio.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <blockquote className="text-gray-700 mb-6 italic leading-relaxed">
                    "{testimonial.content}"
                  </blockquote>
                  
                  <div className="flex items-center">
                    <Avatar className="h-12 w-12 mr-4">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-blue-600 text-white font-semibold">
                        {testimonial.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-gray-900">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {testimonial.position}
                      </div>
                      <div className="text-sm text-blue-600 font-medium">
                        {testimonial.company}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}