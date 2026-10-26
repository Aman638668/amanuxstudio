import { XCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const comparisons = [
  {
    problemTitle: "The Disappearing Agency Act",
    problemDesc: "You're pitched by smooth salespeople, but once the final payment is cleared, support tickets go unanswered for weeks when a checkout breaks or plugins crash.",
    solutionTitle: "Direct 1-on-1 Developer Accountability",
    solutionDesc: "You work directly with Aman Sharma—the actual engineer writing your code. Direct WhatsApp/email access with guaranteed 24-hour turnaround, even post-launch."
  },
  {
    problemTitle: "Bloated Templates & 6-Second Load Times",
    problemDesc: "Agencies slap together 35+ unneeded plugins on a generic theme. Your site drags at 6+ seconds, destroying your ad budget and scaring away 50% of visitors.",
    solutionTitle: "Obsessive Speed & Conversion Engineering",
    solutionDesc: "Clean, bespoke code tailored to your exact business model. We optimize Core Web Vitals for sub-second speeds that rank on Google and convert visitors into revenue."
  },
  {
    problemTitle: "Junior Interns Billed at Enterprise Rates",
    problemDesc: "Paying agency overhead for fancy offices while your actual project is outsourced to inexperienced interns learning on your dime.",
    solutionTitle: "Battle-Tested Production Experience",
    solutionDesc: "Zero agency fluff, zero hidden markups. You get proven experience from someone who has built and maintained real production platforms like Fairease and Ireshh."
  },
  {
    problemTitle: "Proprietary Lock-in & Hostage Situations",
    problemDesc: "Developers who trap you in confusing custom systems, refusing to hand over full admin rights, hosting access, or code if you decide to move.",
    solutionTitle: "100% True Ownership & Full Freedom",
    solutionDesc: "You own every line of code, your domain, database, and admin access from day one. Complete documentation and zero hostage situations."
  }
];

export default function WhyChooseUs() {
  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="why-us" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="text-blue-400 font-semibold text-xs sm:text-sm uppercase tracking-widest">
              Cut Through The Noise
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold mt-2 mb-6 tracking-tight">
              Why Work With Aman UX Studio?
            </h2>
            <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Most website projects fail because of communication breakdowns, bloated code, and agencies that vanish after launch. Here is the blunt reality—and how we do things differently.
            </p>
          </div>
          
          {/* Problem vs Us Comparison Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {comparisons.map((item, index) => (
              <div 
                key={index} 
                className="rounded-2xl border border-slate-800 bg-slate-800/60 p-6 sm:p-8 flex flex-col justify-between hover:border-slate-700 transition-colors shadow-lg"
              >
                <div className="space-y-6">
                  {/* The Problem */}
                  <div className="p-4 rounded-xl bg-red-950/30 border border-red-500/20">
                    <div className="flex items-center gap-2 text-red-400 font-bold text-sm mb-2">
                      <XCircle className="h-4 w-4 flex-shrink-0" />
                      <span>The Typical Agency Frustration:</span>
                    </div>
                    <h4 className="font-bold text-white text-base mb-1">{item.problemTitle}</h4>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{item.problemDesc}</p>
                  </div>

                  {/* The Solution */}
                  <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/20">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-2">
                      <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                      <span>The Aman UX Studio Fix:</span>
                    </div>
                    <h4 className="font-bold text-white text-base mb-1">{item.solutionTitle}</h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{item.solutionDesc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Trust Banner */}
          <div className="rounded-2xl bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 p-8 sm:p-12 text-center shadow-xl">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
              Ready to Build Without the Headaches?
            </h3>
            <p className="text-sm sm:text-base text-blue-100 max-w-2xl mx-auto mb-8">
              No sales pitches, no hidden fees, and no cookie-cutter templates. Get a clean, fast website designed to grow your business.
            </p>
            <Button
              size="lg"
              onClick={scrollToContact}
              className="bg-white text-slate-900 hover:bg-slate-100 font-bold px-8 py-6 rounded-full shadow-lg transition-transform hover:scale-105"
            >
              Start Your Project With Us <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
