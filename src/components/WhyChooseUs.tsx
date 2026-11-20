import { Users, Zap, CheckCircle2, ShieldCheck, ArrowRight, MessageSquare } from 'lucide-react';
import { studioAudio } from '@/lib/studio-audio';

const studioPillars = [
  {
    num: "01",
    icon: Users,
    iconColor: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    title: "Direct 1-on-1 Collaboration",
    desc: "You collaborate directly with Aman Sharma—the actual designer and web developer building your site. No account managers, no junior interns learning on your budget, and no miscommunication.",
    typicalAgency: "Pitched by senior salespeople, then handed off to junior interns.",
    studioStandard: "Direct WhatsApp & email access with guaranteed 24-hour turnaround.",
    highlight: "Direct Developer Access"
  },
  {
    num: "02",
    icon: Zap,
    iconColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    title: "Sub-Second Speeds & Zero Bloat",
    desc: "Most agencies slap 35+ unneeded plugins on a generic theme, causing 6+ second load times that destroy ad conversion. We craft lean, clean code tailored to your exact business needs.",
    typicalAgency: "30+ unneeded plugins, slow templates, and 5+ second load times.",
    studioStandard: "Sub-second load times, clean code, and 90+ Core Web Vitals score.",
    highlight: "< 1s Average Page Load"
  },
  {
    num: "03",
    icon: CheckCircle2,
    iconColor: "text-sky-400 bg-sky-500/10 border-sky-500/20",
    title: "Proven Production Track Record",
    desc: "We bring hands-on experience building, launching, and maintaining live production platforms—including Fairease Outsourcing, Ireshh Clothing, and Expert VUW Consulting.",
    typicalAgency: "Theoretical case studies and generic cookie-cutter templates.",
    studioStandard: "50+ production websites delivered across e-commerce, corporate, and finance.",
    highlight: "Battle-Tested Experience"
  },
  {
    num: "04",
    icon: ShieldCheck,
    iconColor: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    title: "100% True Client Ownership",
    desc: "You own every single line of code, your domain, database, and admin access from day one. We believe in earning your trust through quality work, never through proprietary hostage situations.",
    typicalAgency: "Proprietary locks, withheld credentials, and monthly hostage fees.",
    studioStandard: "Full admin, hosting, and code ownership with complete hand-off documentation.",
    highlight: "Zero Vendor Lock-In"
  }
];

export default function WhyChooseUs() {
  const scrollToContact = () => {
    studioAudio.playClick(850, 0.03);
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="why-us" className="py-24 md:py-32 bg-[#09090c] text-[#eeece8] relative overflow-hidden border-t border-white/5">
      {/* Background glow accents */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-blue-400 mb-3">
              <span>[ 04 / WHY WORK WITH US ]</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#eeece8]">
              The Studio Standard.
            </h2>
          </div>
          <p className="text-white/70 max-w-md text-sm sm:text-base leading-relaxed font-normal">
            We eliminate agency bureaucracy, sluggish templates, and junior handoffs. You get direct collaboration, bespoke design, and websites engineered to convert.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {studioPillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.num}
                className="group relative rounded-3xl border border-white/10 bg-white/[0.025] hover:bg-white/[0.05] p-8 sm:p-10 transition-all duration-300 hover:border-blue-500/40 flex flex-col justify-between shadow-xl"
              >
                <div>
                  {/* Top Bar: Icon & Ghost Number */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${pillar.iconColor}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-sm text-white/30 tracking-wider">
                      {pillar.num}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl sm:text-2xl font-bold text-[#eeece8] group-hover:text-white transition-colors mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-sm sm:text-base text-white/70 leading-relaxed font-normal mb-8">
                    {pillar.desc}
                  </p>
                </div>

                {/* Agency Reality vs Studio Standard Comparison Box */}
                <div className="pt-6 border-t border-white/10 space-y-3 bg-black/20 -mx-8 sm:-mx-10 -mb-8 sm:-mb-10 p-6 sm:p-8 rounded-b-3xl">
                  <div className="flex items-start gap-2.5 text-xs text-white/50 leading-relaxed font-normal">
                    <span className="text-rose-400 font-bold shrink-0">✕ Typical Agency:</span>
                    <span>{pillar.typicalAgency}</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-white/90 leading-relaxed font-medium">
                    <span className="text-[#3ddc84] font-bold shrink-0">✓ Aman UX Studio:</span>
                    <span>{pillar.studioStandard}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust Banner */}
        <div className="rounded-3xl border border-white/15 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-8 sm:p-12 text-center backdrop-blur-xl relative overflow-hidden shadow-2xl">
          <div className="max-w-2xl mx-auto space-y-4">
            <h3 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              Ready to Build Without the Agency Hassle?
            </h3>
            <p className="text-sm sm:text-base text-white/70 leading-relaxed font-normal">
              No sales pitches, no hidden fees, and no junior handoffs. Get a free consultation and project proposal within 24 hours.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button
                onClick={scrollToContact}
                onMouseEnter={() => studioAudio.playHover()}
                className="btn-studio-primary group"
              >
                <span>Start Your Project</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <a
                href="https://wa.me/919211104514"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => studioAudio.playHover()}
                className="btn-studio-secondary"
              >
                <MessageSquare className="w-4 h-4 text-[#3ddc84]" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
