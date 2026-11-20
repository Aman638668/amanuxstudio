import { CheckCircle2, Target, Users, Zap, FileDown, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { studioAudio } from '@/lib/studio-audio';

export default function About() {
  return (
    <section id="about" className="py-24 bg-[#0c0c10] text-[#eeece8] relative border-t border-white/5">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-widest text-[#5b5fe0] mb-3">
            <span>[ 04 / STUDIO IDENTITY &amp; PHILOSOPHY ]</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-[#eeece8] tracking-tight mt-2 mb-4">
            Boutique Agility. Enterprise Execution.
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto font-light">
            Led by Web Developer Aman Sharma, Aman UX Studio engineers high-velocity digital platforms that transform visitors into revenue.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl sm:text-3xl font-bold text-[#eeece8] leading-tight">
              Bridging High-Craft UI with Rock-Solid Engineering.
            </h3>
            <p className="text-sm sm:text-base text-white/70 leading-relaxed font-light">
              At Aman UX Studio, we eliminate the agency fluff. Whether architecting custom corporate flagships like <strong className="text-white">Fairease Outsourcing</strong> and <strong className="text-white">Expert VUW</strong>, e-commerce brands like <strong className="text-white">Ireshh</strong>, or bespoke full-stack React platforms, every line of code is written with speed, conversion, and longevity in mind.
            </p>
            
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-[#3ddc84] flex-shrink-0 mt-0.5" />
                <span className="text-white/80 text-sm font-light">
                  <strong className="text-white font-medium">50+ Production Platforms</strong> delivered across e-commerce, BPO, logistics, and consulting.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-[#3ddc84] flex-shrink-0 mt-0.5" />
                <span className="text-white/80 text-sm font-light">
                  <strong className="text-white font-medium">Sub-Second Load Times:</strong> Obsessive Core Web Vitals tuning and minimal asset payloads.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-[#3ddc84] flex-shrink-0 mt-0.5" />
                <span className="text-white/80 text-sm font-light">
                  <strong className="text-white font-medium">Direct Developer Access:</strong> No junior intermediaries or outsourced account reps.
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-4">
              <Link to="/resume">
                <button
                  onMouseEnter={() => studioAudio.playHover()}
                  className="btn-studio-primary group"
                  data-cursor="Resume"
                >
                  <span>View Background &amp; Credentials</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </Link>
              <a
                href="/Aman_Sharma_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button
                  onMouseEnter={() => studioAudio.playHover()}
                  className="btn-studio-secondary"
                >
                  <FileDown className="w-4 h-4 mr-1 text-white/60" />
                  <span>PDF Resume</span>
                </button>
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/[0.03] border border-white/10 p-6 rounded-2xl hover:border-white/20 transition-colors">
              <Target className="h-8 w-8 text-blue-400 mb-3" />
              <h4 className="text-base font-bold text-white mb-1">Conversion-First</h4>
              <p className="text-xs text-white/50 leading-relaxed">Built to turn ad traffic and organic visits into booked meetings and sales.</p>
            </div>
            
            <div className="bg-white/[0.03] border border-white/10 p-6 rounded-2xl hover:border-white/20 transition-colors">
              <Zap className="h-8 w-8 text-[#3ddc84] mb-3" />
              <h4 className="text-base font-bold text-white mb-1">High Velocity</h4>
              <p className="text-xs text-white/50 leading-relaxed">Rapid sprints, transparent daily commits, and guaranteed turnaround.</p>
            </div>
            
            <div className="bg-white/[0.03] border border-white/10 p-6 rounded-2xl hover:border-white/20 transition-colors">
              <Users className="h-8 w-8 text-[#a9abff] mb-3" />
              <h4 className="text-base font-bold text-white mb-1">1-on-1 Partner</h4>
              <p className="text-xs text-white/50 leading-relaxed">Direct collaboration with the architect writing your production code.</p>
            </div>
            
            <div className="bg-white/[0.03] border border-white/10 p-6 rounded-2xl hover:border-white/20 transition-colors">
              <CheckCircle2 className="h-8 w-8 text-amber-400 mb-3" />
              <h4 className="text-base font-bold text-white mb-1">100% Freedom</h4>
              <p className="text-xs text-white/50 leading-relaxed">Zero lock-in. Full access to source code, domains, and hosting credentials.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
