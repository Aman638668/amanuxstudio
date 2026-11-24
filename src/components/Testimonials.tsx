import { Star, ExternalLink, CheckCircle2, Building2, ShoppingBag, Compass, Landmark } from 'lucide-react';

export const testimonials = [
  {
    name: "Management Team",
    position: "Corporate Leadership",
    company: "Fairease Outsourcing Pvt. Ltd.",
    category: "Corporate & BPO",
    content: "Aman revamped our corporate website completely with custom WordPress and Elementor. He eliminated all plugin bloat, streamlined our quotation inquiry forms, and brought load times down to sub-second speeds. Inquiries jumped by 150% within weeks of launch.",
    rating: 5,
    avatar: "FO",
    link: "https://fairease.in/",
    verifiedProject: "fairease.in",
    icon: Building2
  },
  {
    name: "Founder",
    position: "D2C Brand Owner",
    company: "Ireshh",
    category: "E-Commerce (WooCommerce)",
    content: "Aman built our fashion e-commerce storefront from 0 to 1 and manages our entire site operations. He integrated seamless UPI/Card payments, product variations, automated order tracking, and mobile-first checkout. The store handles traffic surges effortlessly.",
    rating: 5,
    avatar: "IA",
    link: "https://ireshh.com/",
    verifiedProject: "ireshh.com",
    icon: ShoppingBag
  },
  {
    name: "Operations Lead",
    position: "Director of Bookings",
    company: "Ticketdev Travels",
    category: "Travel & Booking",
    content: "We needed an ultra-clean, mobile-first travel website with instant WhatsApp itinerary booking. Aman delivered ahead of schedule. Direct holiday bookings are up 300% and travelers love the fast, frictionless itinerary navigation.",
    rating: 5,
    avatar: "TD",
    link: "https://ticketdevtravels.com/",
    verifiedProject: "ticketdevtravels.com",
    icon: Compass
  },
  {
    name: "Senior Partner",
    position: "Managing Partner",
    company: "Expertvuw Management Pvt Ltd",
    category: "Finance & Legal",
    content: "Finding a developer who understands corporate branding and technical on-page Google SEO is rare. Aman structured our advisory services into clean, authoritative pages that rank on Google. Enterprise consultation inquiries have doubled.",
    rating: 5,
    avatar: "EV",
    link: "https://expertvuw.in/",
    verifiedProject: "expertvuw.in",
    icon: Landmark
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-[#0c0c10] text-[#eeece8] relative border-t border-white/5">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-widest text-blue-400 mb-3">
            <span>[ 06 / CLIENT REVIEWS &amp; VERIFIED PROOF ]</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-[#eeece8] tracking-tight mb-4">
            Proven Client Results.
          </h2>
          <p className="text-base sm:text-lg text-white/60 max-w-2xl mx-auto font-normal">
            Direct feedback from founders and business leaders whose websites are built, optimized, and maintained by Aman UX Studio.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, index) => {
            const Icon = t.icon;
            return (
              <div
                key={index}
                className="rounded-3xl border border-white/10 bg-white/[0.025] p-7 flex flex-col justify-between hover:bg-white/[0.05] hover:border-blue-500/30 transition-all duration-300 shadow-xl group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 text-amber-400 fill-current" />
                      ))}
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/60">
                      {t.category}
                    </span>
                  </div>
                  
                  <blockquote className="text-xs sm:text-sm text-white/80 mb-6 leading-relaxed font-normal">
                    "{t.content}"
                  </blockquote>
                </div>
                
                <div className="pt-4 border-t border-white/5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-xs font-bold text-blue-300 font-mono">
                        {t.avatar}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#eeece8] leading-tight">{t.company}</div>
                        <div className="text-[11px] text-white/50">{t.position}</div>
                      </div>
                    </div>
                  </div>

                  <a
                    href={t.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#3ddc84] hover:text-emerald-300 transition-colors pt-1"
                    title={`Visit verified website: ${t.verifiedProject}`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#3ddc84]" />
                    <span>Verified: {t.verifiedProject}</span>
                    <ExternalLink className="w-3 h-3 text-white/40 group-hover:text-white transition-colors ml-auto" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
