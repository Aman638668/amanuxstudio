import Navigation from '@/components/Navigation';
import PageHeader from '@/components/PageHeader';
import Footer from '@/components/Footer';
import Seo from '@/components/Seo';
import { CheckCircle2, Target, Users, Zap, ShieldCheck, ArrowRight, FileDown, Layers, Palette, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { studioAudio } from '@/lib/studio-audio';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#09090c] text-[#eeece8] flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      <Seo
        title="About Aman Sharma & Aman UX Studio"
        description="Learn about Aman Sharma and Aman UX Studio — a web development and UI/UX design studio delivering sub-second, high-converting websites for businesses worldwide."
        url="/about"
      />
      <div className="ambient-grain" aria-hidden="true" />
      <Navigation />

      <PageHeader
        badge="STUDIO PROFILE"
        title="Design Craftsmanship Meets Clean Web Development."
        description="We eliminate agency layers so you work 1-on-1 with Aman Sharma. Bespoke design, lightning-fast code, and websites engineered for actual business growth."
      />

      <main className="flex-grow py-20 container mx-auto px-6 max-w-7xl relative z-10 space-y-24">
        
        {/* Story Section */}
        <div className="grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-blue-400">
              <span>[ FOUNDER &amp; LEAD DEVELOPER ]</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#eeece8] leading-tight">
              A Studio Founded to Fix Broken Agency Models.
            </h2>
            <p className="text-base sm:text-lg text-white/70 leading-relaxed font-normal">
              Most digital agencies sell high-ticket dreams with slick account executives, only to outsource your website to junior interns who patch together 35+ bloated plugins. The result? 6-second load times, broken mobile checkouts, and silence when you need support.
            </p>
            <p className="text-base sm:text-lg text-white/70 leading-relaxed font-normal">
              At <strong className="text-white">Aman UX Studio</strong>, you work directly with me—<strong className="text-white">Aman Sharma</strong>. Every wireframe in Figma, every line of clean code, and every server deployment is hand-crafted with obsessive attention to user experience, speed, and conversion.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                to="/resume"
                onMouseEnter={() => studioAudio.playHover()}
                className="btn-studio-primary group"
              >
                <span>View Resume &amp; Background</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="/Aman_Sharma_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => studioAudio.playHover()}
                className="btn-studio-secondary"
              >
                <FileDown className="w-4 h-4 text-white/60" />
                <span>Download Resume PDF</span>
              </a>
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 shadow-2xl relative overflow-hidden space-y-6">
              <div className="flex items-center gap-4 pb-6 border-b border-white/10">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-400 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-600/30">
                  AS
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Aman Sharma</h3>
                  <p className="text-xs font-mono text-white/50 uppercase tracking-wider">Web Developer &amp; UI/UX Designer</p>
                </div>
              </div>

              <div className="space-y-3.5 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#3ddc84] shrink-0 mt-0.5" />
                  <span className="text-white/80"><strong>50+ Commercial Websites Delivered</strong> across corporate, e-commerce, and travel.</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#3ddc84] shrink-0 mt-0.5" />
                  <span className="text-white/80"><strong>Sub-Second Load Times:</strong> Zero plugin bloat, 90+ Google Core Web Vitals score.</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#3ddc84] shrink-0 mt-0.5" />
                  <span className="text-white/80"><strong>100% True Ownership:</strong> You own code, domain, database &amp; hosting credentials.</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#3ddc84] shrink-0 mt-0.5" />
                  <span className="text-white/80"><strong>Direct WhatsApp Communication:</strong> Fast 24-hour turnaround on revisions.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Studio Pillars */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6 space-y-3 hover:border-blue-500/30 transition-colors">
            <Target className="w-8 h-8 text-blue-400" />
            <h4 className="text-lg font-bold text-white">Conversion-First</h4>
            <p className="text-xs text-white/60 leading-relaxed">
              Every layout is designed with clear visual hierarchy to turn casual visitors into paying inquiries and customers.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6 space-y-3 hover:border-emerald-500/30 transition-colors">
            <Zap className="w-8 h-8 text-[#3ddc84]" />
            <h4 className="text-lg font-bold text-white">Fast Sub-Second Speeds</h4>
            <p className="text-xs text-white/60 leading-relaxed">
              Optimized Core Web Vitals, lightweight asset bundles, and lean WordPress builds that load under 1.2 seconds.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6 space-y-3 hover:border-sky-500/30 transition-colors">
            <Users className="w-8 h-8 text-sky-400" />
            <h4 className="text-lg font-bold text-white">1-on-1 Partnership</h4>
            <p className="text-xs text-white/60 leading-relaxed">
              Zero communication layers. Direct daily access to the designer and developer actually crafting your platform.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6 space-y-3 hover:border-amber-500/30 transition-colors">
            <ShieldCheck className="w-8 h-8 text-amber-400" />
            <h4 className="text-lg font-bold text-white">Zero Vendor Lock-In</h4>
            <p className="text-xs text-white/60 leading-relaxed">
              Complete admin rights, clean hand-off guides, and zero proprietary locks from day one. You own your digital assets.
            </p>
          </div>
        </div>

        {/* Technical Disciplines */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 sm:p-12 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-blue-400">[ CORE TOOLING &amp; EXPERTISE ]</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white">Battle-Tested Technologies We Master</h3>
            <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
              We select tools that offer optimal client manageability, fast performance, and zero security vulnerabilities.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: "WordPress & Elementor", role: "Custom Corporate Sites", icon: Layers },
              { name: "WooCommerce", role: "E-Commerce Stores", icon: Globe },
              { name: "UI/UX in Figma", role: "Design Systems & Wireframes", icon: Palette },
              { name: "React & Next.js", role: "Dynamic Web Applications", icon: Globe },
              { name: "Tailwind CSS", role: "Lightweight UI Layouts", icon: Layers },
              { name: "SEO & Web Vitals", role: "Google Ranking & Speed", icon: Zap },
            ].map((tool, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-white/5 bg-white/[0.02] text-center space-y-2 hover:border-white/15 transition-colors">
                <tool.icon className="w-6 h-6 mx-auto text-blue-400" />
                <div className="font-bold text-xs text-white">{tool.name}</div>
                <div className="text-[11px] text-white/50">{tool.role}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Bar */}
        <div className="rounded-3xl border border-white/15 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
          <div className="max-w-2xl mx-auto space-y-4">
            <h3 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              Ready to Upgrade Your Online Presence?
            </h3>
            <p className="text-sm sm:text-base text-white/70 leading-relaxed font-normal">
              Whether you need a bespoke corporate website, an e-commerce platform, or a conversion audit, let's talk.
            </p>
            <div className="pt-2">
              <Link to="/contact" className="btn-studio-primary group">
                <span>Start Your Project</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
