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
    <section id="testimonials" className="py-24 bg-[#0c0c10] text-[#eeece8] relative border-t border-white/5">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-widest text-blue-400 mb-3">
            <span>[ 05 / CLIENT REVIEWS ]</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-[#eeece8] tracking-tight mb-4">
            What Our Clients Say.
          </h2>
          <p className="text-base sm:text-lg text-white/60 max-w-2xl mx-auto font-normal">
            Direct feedback from founders and business owners who partner with Aman UX Studio for their websites.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 flex flex-col justify-between hover:bg-white/[0.04] transition-all"
            >
              <div>
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-amber-400 fill-current" />
                  ))}
                </div>
                
                <blockquote className="text-sm text-white/75 mb-6 leading-relaxed font-light italic">
                  "{t.content}"
                </blockquote>
              </div>
              
              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                <div className="w-10 h-10 rounded-full bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-xs font-bold text-blue-300">
                  {t.avatar}
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#eeece8]">{t.name}</div>
                  <div className="text-xs text-white/50">{t.position}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
