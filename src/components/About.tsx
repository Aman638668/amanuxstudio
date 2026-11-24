import { CheckCircle2, Target, Users, Zap, FileDown, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { studioAudio } from '@/lib/studio-audio';

export default function About() {
  return (
    <section id="about" className="py-24 bg-[#0c0c10] text-[#eeece8] relative border-t border-white/5">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-widest text-blue-400 mb-3">
            <span>[ 04 / ABOUT THE STUDIO ]</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-[#eeece8] tracking-tight mt-2 mb-4">
            About Aman UX Studio
          </h2>
          <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto font-normal">
            Led by Web Developer &amp; UI/UX Designer Aman Sharma, we build fast, scalable, and conversion-focused websites that drive real business growth.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl sm:text-3xl font-bold text-[#eeece8] leading-tight">
              Bridging Creative UI/UX Design with Modern Web Development.
            </h3>
            <p className="text-sm sm:text-base text-white/70 leading-relaxed font-normal">
              At Aman UX Studio, we eliminate the agency fluff. Whether building custom corporate websites like <strong className="text-white">Fairease Outsourcing</strong> and <strong className="text-white">Expertvuw Management Pvt Ltd</strong>, travel platforms like <strong className="text-white">Ticketdev Travels</strong>, or e-commerce stores like <strong className="text-white">Ireshh</strong>, every project is crafted with clean design, speed, and real business results in mind.
            </p>
            
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-[#3ddc84] flex-shrink-0 mt-0.5" />
                <span className="text-white/80 text-sm">
                  <strong className="text-white font-medium">50+ Projects Delivered</strong> across corporate, e-commerce, travel, and finance.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-[#3ddc84] flex-shrink-0 mt-0.5" />
                <span className="text-white/80 text-sm">
                  <strong className="text-white font-medium">Fast Sub-Second Speeds:</strong> Clean layouts, zero plugin bloat, and 90+ PageSpeed score.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-[#3ddc84] flex-shrink-0 mt-0.5" />
                <span className="text-white/80 text-sm">
                  <strong className="text-white font-medium">Direct Developer Communication:</strong> Work 1-on-1 with Aman Sharma with fast responses.
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                to="/resume"
                onMouseEnter={() => studioAudio.playHover()}
                className="btn-studio-primary group"
              >
                <span>View Resume &amp; Experience</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="/Aman_Sharma_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => studioAudio.playHover()}
                className="btn-studio-secondary"
              >
                <FileDown className="w-4 h-4 text-white/70" />
                <span>Download PDF</span>
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/[0.03] border border-white/10 p-6 rounded-2xl hover:border-white/20 transition-colors">
              <Target className="h-8 w-8 text-blue-400 mb-3" />
              <h4 className="text-base font-bold text-white mb-1">Conversion-First</h4>
              <p className="text-xs text-white/60 leading-relaxed">Designed to turn visitors into inquiries, calls, and paying customers.</p>
            </div>
            
            <div className="bg-white/[0.03] border border-white/10 p-6 rounded-2xl hover:border-white/20 transition-colors">
              <Zap className="h-8 w-8 text-[#3ddc84] mb-3" />
              <h4 className="text-base font-bold text-white mb-1">Fast Turnaround</h4>
              <p className="text-xs text-white/60 leading-relaxed">Quick sprints, daily updates, and on-time project completion.</p>
            </div>
            
            <div className="bg-white/[0.03] border border-white/10 p-6 rounded-2xl hover:border-white/20 transition-colors">
              <Users className="h-8 w-8 text-sky-400 mb-3" />
              <h4 className="text-base font-bold text-white mb-1">1-on-1 Partner</h4>
              <p className="text-xs text-white/60 leading-relaxed">Direct collaboration with the designer and developer building your site.</p>
            </div>
            
            <div className="bg-white/[0.03] border border-white/10 p-6 rounded-2xl hover:border-white/20 transition-colors">
              <CheckCircle2 className="h-8 w-8 text-amber-400 mb-3" />
              <h4 className="text-base font-bold text-white mb-1">100% Ownership</h4>
              <p className="text-xs text-white/60 leading-relaxed">Zero lock-in. Full access to your domain, source files, and admin panel.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
