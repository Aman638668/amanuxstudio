import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Seo from '@/components/Seo';
import { FileDown, Printer, Mail, Phone, MapPin, Github, Linkedin, ExternalLink, Briefcase, GraduationCap, Code2, Globe, Sparkles } from 'lucide-react';

export default function ResumePage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#09090c] text-[#eeece8] flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      <Seo
        title="Resume & Experience - Aman Sharma"
        description="Web Developer & UI/UX Designer with 2+ years of production experience building high-converting platforms like Fairease, Ireshh, and Expert VUW."
        url="/resume"
      />
      <div className="ambient-grain print:hidden" aria-hidden="true" />
      <div className="print:hidden">
        <Navigation />
      </div>

      <main className="flex-grow pt-32 pb-20 px-4 sm:px-6 container mx-auto max-w-7xl">
        {/* Top Action Bar */}
        <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden bg-[#0e0e14] border border-white/10 p-5 rounded-3xl shadow-xl">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-blue-400 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CURRICULUM VITAE</span>
            </div>
            <h1 className="text-xl font-bold text-[#eeece8]">Aman Sharma — Executive Resume</h1>
            <p className="text-xs font-mono text-[#94a3b8]">Web Developer &amp; UI/UX Specialist · 50+ Websites Delivered</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="btn-studio-secondary btn-studio-sm font-mono"
            >
              <Printer className="mr-1.5 h-3.5 w-3.5 text-white/60" />
              <span>Print CV</span>
            </button>
            <a
              href="/Aman_Sharma_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-studio-primary btn-studio-sm font-semibold font-mono"
            >
              <FileDown className="mr-1.5 h-3.5 w-3.5" />
              <span>Download PDF</span>
            </a>
          </div>
        </div>

        {/* Paper Document Container */}
        <div className="bg-[#0e0e14] rounded-3xl shadow-2xl border border-white/10 p-8 sm:p-12 print:p-0 print:shadow-none print:border-none print:bg-white text-[#eeece8] print:text-black">
          
          {/* Header */}
          <div className="text-center pb-8 border-b border-white/10 print:border-black/20 mb-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight uppercase text-white print:text-black mb-2">
              Aman Sharma
            </h1>
            <p className="text-base font-semibold text-blue-400 print:text-blue-700 mb-4 font-mono">
              Web Developer | Full-Stack &amp; WordPress Specialist
            </p>

            <div className="flex flex-wrap justify-center items-center gap-y-2 gap-x-4 text-xs sm:text-sm text-[#94a3b8] print:text-gray-700">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-blue-400 print:text-gray-500" /> New Delhi, India
              </span>
              <span className="text-white/20 print:text-gray-400">•</span>
              <a href="tel:+919211104514" className="flex items-center gap-1.5 font-semibold text-white print:text-black hover:text-blue-400 transition-colors">
                <Phone className="h-3.5 w-3.5 text-blue-400 print:text-gray-500" /> +91 92111-04514
              </a>
              <span className="text-white/20 print:text-gray-400">•</span>
              <a href="mailto:1704amansharma@gmail.com" className="flex items-center gap-1.5 text-white/90 print:text-gray-900 hover:text-blue-400 transition-colors">
                <Mail className="h-3.5 w-3.5 text-blue-400 print:text-gray-500" /> 1704amansharma@gmail.com
              </a>
              <span className="text-white/20 print:text-gray-400">•</span>
              <a href="https://github.com/Aman638668" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-white/90 print:text-gray-900 hover:text-blue-400 transition-colors">
                <Github className="h-3.5 w-3.5 text-blue-400 print:text-gray-500" /> GitHub
              </a>
              <span className="text-white/20 print:text-gray-400">•</span>
              <a href="https://www.linkedin.com/in/aman-sharma-4b772124a/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-white/90 print:text-gray-900 hover:text-blue-400 transition-colors">
                <Linkedin className="h-3.5 w-3.5 text-blue-400 print:text-gray-500" /> LinkedIn
              </a>
            </div>
          </div>

          {/* About Me */}
          <section className="mb-8">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-blue-400 print:text-blue-800 border-b border-white/10 print:border-black/20 pb-2 mb-3 font-mono">
              About Me
            </h2>
            <p className="text-sm leading-relaxed text-[#cbd5e1] print:text-gray-800 text-justify font-normal">
              Web Developer with 2+ years of hands-on experience in building and deploying responsive production websites and full-stack web applications. Proficient in modern JavaScript/TypeScript (React, Next.js), WordPress, WooCommerce, Elementor Pro, API integrations, and databases (PostgreSQL, Supabase). Proven experience configuring production websites from 0 to 1, including <strong className="text-white print:text-black">Fairease Outsourcing</strong>, <strong className="text-white print:text-black">Ireshh Clothing</strong>, and <strong className="text-white print:text-black">Expertvuw</strong>. Currently pursuing a BCA through Online Manipal University.
            </p>
          </section>

          {/* Technical Skills */}
          <section className="mb-8">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-blue-400 print:text-blue-800 border-b border-white/10 print:border-black/20 pb-2 mb-4 flex items-center gap-2 font-mono">
              <Code2 className="h-4 w-4 text-blue-400 print:text-blue-700" /> Technical Skills
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs sm:text-sm">
              <div className="p-4 bg-white/[0.025] print:bg-gray-50 rounded-2xl border border-white/5 print:border-gray-200">
                <span className="font-bold text-white print:text-black block mb-1">Languages &amp; Core</span>
                <span className="text-[#94a3b8] print:text-gray-700">JavaScript (ES6+), TypeScript, HTML5, CSS3, PHP, SQL</span>
              </div>
              <div className="p-4 bg-white/[0.025] print:bg-gray-50 rounded-2xl border border-white/5 print:border-gray-200">
                <span className="font-bold text-white print:text-black block mb-1">Frontend Development</span>
                <span className="text-[#94a3b8] print:text-gray-700">React, Next.js, Tailwind CSS, shadcn/ui, Bootstrap, Mobile-First Design</span>
              </div>
              <div className="p-4 bg-white/[0.025] print:bg-gray-50 rounded-2xl border border-white/5 print:border-gray-200">
                <span className="font-bold text-white print:text-black block mb-1">WordPress &amp; E-Commerce</span>
                <span className="text-[#94a3b8] print:text-gray-700">WordPress, WooCommerce, Elementor Pro, Payment Gateways (Razorpay/Stripe), Theme Customization</span>
              </div>
              <div className="p-4 bg-white/[0.025] print:bg-gray-50 rounded-2xl border border-white/5 print:border-gray-200">
                <span className="font-bold text-white print:text-black block mb-1">Backend &amp; Databases</span>
                <span className="text-[#94a3b8] print:text-gray-700">Node.js, Express, PostgreSQL, Supabase, Prisma ORM, REST APIs</span>
              </div>
              <div className="p-4 bg-white/[0.025] print:bg-gray-50 rounded-2xl border border-white/5 print:border-gray-200">
                <span className="font-bold text-white print:text-black block mb-1">AI &amp; Automation</span>
                <span className="text-[#94a3b8] print:text-gray-700">Discord Webhooks, GitHub Actions (CI/CD), OpenAI, Google Gemini, Groq</span>
              </div>
              <div className="p-4 bg-white/[0.025] print:bg-gray-50 rounded-2xl border border-white/5 print:border-gray-200">
                <span className="font-bold text-white print:text-black block mb-1">DevOps &amp; Infrastructure</span>
                <span className="text-[#94a3b8] print:text-gray-700">Git, GitHub, Vite, Vercel, Hostinger, cPanel, Cloudflare DNS, SSL &amp; Domain Setup</span>
              </div>
            </div>
          </section>

          {/* Featured Projects */}
          <section className="mb-8">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-blue-400 print:text-blue-800 border-b border-white/10 print:border-black/20 pb-2 mb-4 flex items-center gap-2 font-mono">
              <Globe className="h-4 w-4 text-blue-400 print:text-blue-700" /> Featured Commercial &amp; SaaS Projects
            </h2>

            <div className="space-y-4">
              {/* Fairease */}
              <div className="border-l-2 border-blue-500 pl-4 py-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                  <h3 className="font-bold text-base text-white print:text-black">
                    Fairease Outsourcing — Corporate Outsourcing Platform
                  </h3>
                  <a href="https://fairease.in/" target="_blank" rel="noopener noreferrer" className="text-xs text-blue-400 print:text-blue-700 hover:underline inline-flex items-center gap-1 font-mono font-medium">
                    fairease.in <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
                <div className="text-xs font-mono text-blue-300 print:text-blue-800 mb-1.5">
                  Tech: WordPress, Elementor, Custom CSS/JS, Contact Lead Funnel, SEO, Performance
                </div>
                <p className="text-xs sm:text-sm text-[#cbd5e1] print:text-gray-700 leading-relaxed font-normal">
                  Designed and developed the full production corporate platform for Fairease Outsourcing Pvt. Ltd. Structured interactive service showcases, quote/inquiry capture funnels, mobile responsiveness, SSL security, and core web vitals optimization.
                </p>
              </div>

              {/* Ireshh */}
              <div className="border-l-2 border-emerald-500 pl-4 py-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                  <h3 className="font-bold text-base text-white print:text-black">
                    Ireshh — E-Commerce Clothing Brand Platform
                  </h3>
                  <a href="https://ireshh.com/" target="_blank" rel="noopener noreferrer" className="text-xs text-emerald-400 print:text-emerald-700 hover:underline inline-flex items-center gap-1 font-mono font-medium">
                    ireshh.com <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
                <div className="text-xs font-mono text-emerald-300 print:text-emerald-800 mb-1.5">
                  Tech: WordPress, WooCommerce, Payment Gateways (Cards &amp; UPI), Inventory &amp; Variations, Hosting
                </div>
                <p className="text-xs sm:text-sm text-[#cbd5e1] print:text-gray-700 leading-relaxed font-normal">
                  Built and launched the complete e-commerce store from scratch (0 to 1) for fashion apparel brand Ireshh. Configured product variations, payment gateway integrations, automated shipping calculators, mobile checkout, and ongoing maintenance.
                </p>
              </div>

              {/* Expertvuw */}
              <div className="border-l-2 border-sky-500 pl-4 py-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                  <h3 className="font-bold text-base text-white print:text-black">
                    Expertvuw — Finance &amp; Legal Consulting Portal
                  </h3>
                  <a href="https://expertvuw.in/" target="_blank" rel="noopener noreferrer" className="text-xs text-sky-400 print:text-sky-700 hover:underline inline-flex items-center gap-1 font-mono font-medium">
                    expertvuw.in <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
                <div className="text-xs font-mono text-sky-300 print:text-sky-800 mb-1.5">
                  Tech: WordPress, Elementor Pro, Responsive Web Design, Lead Capture Pipelines, SEO, Cloudflare
                </div>
                <p className="text-xs sm:text-sm text-[#cbd5e1] print:text-gray-700 leading-relaxed font-normal">
                  Designed and launched the production portal for finance and legal consultancy firm Expertvuw. Built high-converting consultation inquiry funnels, structured service showcases, optimized Core Web Vitals for lightning-fast speeds (&lt;1.2s), and achieved top Google rankings for finance keywords.
                </p>
              </div>

              {/* WebTruly */}
              <div className="border-l-2 border-indigo-500 pl-4 py-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                  <h3 className="font-bold text-base text-white print:text-black">
                    WebTruly — AI Chatbot SaaS Platform
                  </h3>
                  <span className="text-xs font-mono text-[#94a3b8] print:text-gray-500">Full-Stack SaaS</span>
                </div>
                <div className="text-xs font-mono text-indigo-300 print:text-indigo-800 mb-1.5">
                  Tech: Next.js, React, TypeScript, NestJS, Node.js, LangChain, OpenAI, Gemini, Groq, PostgreSQL, Redis
                </div>
                <p className="text-xs sm:text-sm text-[#cbd5e1] print:text-gray-700 leading-relaxed font-normal">
                  AI chatbot platform for businesses. Built website-content crawling/processing, AI model integrations, authentication, database schemas, background jobs, payment pipelines, and dashboard interfaces.
                </p>
              </div>

              {/* StaffLoop */}
              <div className="border-l-2 border-amber-500 pl-4 py-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                  <h3 className="font-bold text-base text-white print:text-black">
                    StaffLoop — Full-Stack Workforce SaaS
                  </h3>
                  <span className="text-xs font-mono text-[#94a3b8] print:text-gray-500">Full-Stack SaaS</span>
                </div>
                <div className="text-xs font-mono text-amber-300 print:text-amber-800 mb-1.5">
                  Tech: Next.js, React, TypeScript, Tailwind CSS, Prisma, PostgreSQL, Supabase, Node.js, Zod
                </div>
                <p className="text-xs sm:text-sm text-[#cbd5e1] print:text-gray-700 leading-relaxed font-normal">
                  Full-stack SaaS application featuring modular React/Next.js interfaces, secure server actions, database operations with Prisma &amp; Supabase, strict schema validation with Zod, and automated email notifications.
                </p>
              </div>
            </div>
          </section>

          {/* Professional Experience */}
          <section className="mb-8">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-blue-400 print:text-blue-800 border-b border-white/10 print:border-black/20 pb-2 mb-4 flex items-center gap-2 font-mono">
              <Briefcase className="h-4 w-4 text-blue-400 print:text-blue-700" /> Professional Experience
            </h2>

            <div className="space-y-5 text-xs sm:text-sm">
              <div>
                <div className="flex flex-col sm:flex-row justify-between sm:items-baseline gap-1 mb-1.5">
                  <h3 className="font-bold text-white print:text-black text-sm sm:text-base">
                    Freelance Web Developer — Fairease Outsourcing &amp; Expertvuw
                  </h3>
                  <span className="text-xs font-mono text-[#94a3b8] print:text-gray-600">Nov 2024 – Present</span>
                </div>
                <ul className="list-disc ml-5 space-y-1 text-[#cbd5e1] print:text-gray-700 font-normal">
                  <li>Designed and deployed the corporate website for <strong className="text-white print:text-black">Fairease Outsourcing</strong> (<a href="https://fairease.in/" target="_blank" className="underline text-blue-400 print:text-blue-700">fairease.in</a>) and multiple production sites for Expertvuw.</li>
                  <li>Implemented high-converting lead capture funnels, responsive UI layouts, and seamless user experiences.</li>
                  <li>Managed cloud hosting, domain DNS configurations, SSL certificates, backups, and security hardening.</li>
                </ul>
              </div>

              <div>
                <div className="flex flex-col sm:flex-row justify-between sm:items-baseline gap-1 mb-1.5">
                  <h3 className="font-bold text-white print:text-black text-sm sm:text-base">
                    Website Designer — Elion Technologies &amp; Consulting Pvt. Ltd.
                  </h3>
                  <span className="text-xs font-mono text-[#94a3b8] print:text-gray-600">Apr 2025 – Present</span>
                </div>
                <ul className="list-disc ml-5 space-y-1 text-[#cbd5e1] print:text-gray-700 font-normal">
                  <li>Redesigned and updated existing website pages according to company specifications.</li>
                  <li>Implemented page layouts and content updates using WordPress, HTML, and CSS.</li>
                  <li>Managed regular blog publishing, performance checks, and ongoing website troubleshooting.</li>
                </ul>
              </div>

              <div>
                <div className="flex flex-col sm:flex-row justify-between sm:items-baseline gap-1 mb-1.5">
                  <h3 className="font-bold text-white print:text-black text-sm sm:text-base">
                    Web Developer / Co-Founder — Psinizo
                  </h3>
                  <span className="text-xs font-mono text-[#94a3b8] print:text-gray-600">Jul 2024 – Sep 2024</span>
                </div>
                <ul className="list-disc ml-5 space-y-1 text-[#cbd5e1] print:text-gray-700 font-normal">
                  <li>Designed and developed the e-commerce marketplace platform connecting consumers with local clothing shops.</li>
                  <li>Configured hosting, domain environments, payment gateway integrations, and basic SEO.</li>
                </ul>
              </div>

              <div>
                <div className="flex flex-col sm:flex-row justify-between sm:items-baseline gap-1 mb-1.5">
                  <h3 className="font-bold text-white print:text-black text-sm sm:text-base">
                    Web Development Intern — IT Solution And Services
                  </h3>
                  <span className="text-xs font-mono text-[#94a3b8] print:text-gray-600">Jul 2023 – Mar 2024</span>
                </div>
                <ul className="list-disc ml-5 space-y-1 text-[#cbd5e1] print:text-gray-700 font-normal">
                  <li>Developed website pages and customized Elementor components for client projects, including Davrath and Friends Group.</li>
                  <li>Assisted with hosting setup, domain records, content updates, and cross-browser testing.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Education */}
          <section>
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-blue-400 print:text-blue-800 border-b border-white/10 print:border-black/20 pb-2 mb-3 flex items-center gap-2 font-mono">
              <GraduationCap className="h-4 w-4 text-blue-400 print:text-blue-700" /> Education
            </h2>
            <div className="flex justify-between items-baseline text-xs sm:text-sm">
              <div>
                <h3 className="font-bold text-white print:text-black">Bachelor of Computer Applications (BCA)</h3>
                <p className="text-[#94a3b8] print:text-gray-600">Online Manipal University</p>
              </div>
              <span className="text-xs font-mono text-[#64748b] print:text-gray-500">Pursuing 2026 – Present</span>
            </div>
          </section>

        </div>
      </main>

      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
}
