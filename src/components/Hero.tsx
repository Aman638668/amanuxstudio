import { Button } from '@/components/ui/button';
import { ArrowRight, Play, FileDown } from 'lucide-react';

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white relative overflow-hidden pt-28 md:pt-0">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-slate-900/20"></div>
        <div className="absolute inset-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-sm font-medium mb-6">
            <span>✨ Web Development &amp; Full-Stack Digital Agency</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent tracking-tight">
            Transform Your Digital Presence
          </h1>

          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Aman UX Studio creates high-converting websites, dynamic full-stack platforms, and intuitive UX/UI designs that accelerate growth for startups and growing enterprises.
          </p>

          <div className="flex flex-wrap gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-base font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-600/30"
              onClick={() => scrollToSection('contact')}
            >
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-2 border-white/80 text-white hover:bg-white hover:text-slate-900 px-8 py-6 text-base font-semibold rounded-full transition-all duration-300 bg-transparent"
              onClick={() => scrollToSection('portfolio')}
            >
              <Play className="mr-2 h-4 w-4" />
              View Our Work
            </Button>

            <a
              href="/Aman_Sharma_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold text-blue-200 hover:text-white border border-blue-400/30 rounded-full hover:bg-blue-600/20 transition-all"
            >
              <FileDown className="mr-2 h-5 w-5 text-blue-400" />
              Download Resume
            </a>
          </div>

          <div className="mt-14 text-sm text-gray-400 flex items-center justify-center gap-6 flex-wrap">
            <span>⚡ Production-Ready Delivery</span>
            <span>•</span>
            <span>🎯 98% Client Satisfaction</span>
            <span>•</span>
            <span>🛠️ React, Next.js &amp; WordPress</span>
          </div>
        </div>
      </div>
    </section>
  );
}
