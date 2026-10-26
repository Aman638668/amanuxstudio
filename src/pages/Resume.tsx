import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Seo from '@/components/Seo';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileDown, Printer, Mail, Phone, MapPin, Github, Linkedin, ExternalLink, Briefcase, GraduationCap, Code2, Globe } from 'lucide-react';

export default function ResumePage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col font-sans">
      <Seo
        title="Resume & Experience - Aman Sharma"
        description="Full-stack & WordPress Web Developer with 2+ years of production experience building high-converting platforms like Fairease and Ireshh."
        url="/resume"
      />
      <div className="print:hidden">
        <Navigation />
      </div>

      <main className="flex-grow pt-28 pb-20 px-4 sm:px-6 container mx-auto max-w-5xl">
        {/* Top Action Bar */}
        <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Aman Sharma — Curriculum Vitae</h1>
            <p className="text-xs text-slate-500">Web Developer | Full-Stack &amp; WordPress Specialist</p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrint}
              className="border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200"
            >
              <Printer className="mr-2 h-4 w-4" /> Print
            </Button>
            <a href="/Aman_Sharma_Resume.pdf" target="_blank" rel="noopener noreferrer">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
                <FileDown className="mr-2 h-4 w-4" /> Download PDF
              </Button>
            </a>
          </div>
        </div>

        {/* Paper Document Container */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8 sm:p-12 print:p-0 print:shadow-none print:border-none print:bg-white text-slate-800 dark:text-slate-100">
          
          {/* Header */}
          <div className="text-center pb-8 border-b-2 border-slate-900 dark:border-slate-100 mb-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight uppercase text-slate-900 dark:text-white mb-2">
              Aman Sharma
            </h1>
            <p className="text-base font-semibold text-blue-600 dark:text-blue-400 mb-4">
              Web Developer | Full-Stack &amp; WordPress Specialist
            </p>

            <div className="flex flex-wrap justify-center items-center gap-y-2 gap-x-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-slate-400" /> New Delhi, India
              </span>
              <span>•</span>
              <a href="tel:+919211104514" className="flex items-center gap-1 font-semibold text-slate-900 dark:text-white hover:text-blue-600">
                <Phone className="h-3.5 w-3.5 text-slate-400" /> +91 92111-04514
              </a>
              <span>•</span>
              <a href="mailto:1704amansharma@gmail.com" className="flex items-center gap-1 hover:text-blue-600">
                <Mail className="h-3.5 w-3.5 text-slate-400" /> 1704amansharma@gmail.com
              </a>
              <span>•</span>
              <a href="https://github.com/Aman638668" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-blue-600">
                <Github className="h-3.5 w-3.5 text-slate-400" /> GitHub
              </a>
              <span>•</span>
              <a href="https://www.linkedin.com/in/aman-sharma-4b772124a/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-blue-600">
                <Linkedin className="h-3.5 w-3.5 text-slate-400" /> LinkedIn
              </a>
            </div>
          </div>

          {/* About Me */}
          <section className="mb-8">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-1 mb-3">
              About Me
            </h2>
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 text-justify">
              Web Developer with 2+ years of hands-on experience in building and deploying responsive production websites and full-stack web applications. Proficient in modern JavaScript/TypeScript (React, Next.js), WordPress, WooCommerce, Elementor Pro, API integrations, and database architectures (PostgreSQL, Supabase). Proven experience configuring production websites from 0 to 1, including <strong>Fairease Outsourcing</strong>, <strong>Ireshh Clothing</strong>, and <strong>Expertvuw</strong>. Currently pursuing a BCA through Online Manipal University.
            </p>
          </section>

          {/* Technical Skills */}
          <section className="mb-8">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-1 mb-3 flex items-center gap-2">
              <Code2 className="h-4 w-4 text-blue-600" /> Technical Skills
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                <span className="font-bold text-slate-900 dark:text-white block mb-1">Languages &amp; Core</span>
                <span className="text-slate-600 dark:text-slate-300">JavaScript (ES6+), TypeScript, HTML5, CSS3, PHP, SQL</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                <span className="font-bold text-slate-900 dark:text-white block mb-1">Frontend Development</span>
                <span className="text-slate-600 dark:text-slate-300">React, Next.js, Tailwind CSS, shadcn/ui, Bootstrap, Mobile-First Design</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                <span className="font-bold text-slate-900 dark:text-white block mb-1">WordPress &amp; E-Commerce</span>
                <span className="text-slate-600 dark:text-slate-300">WordPress, WooCommerce, Elementor Pro, Payment Gateways (Razorpay/Stripe), Theme Customization</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                <span className="font-bold text-slate-900 dark:text-white block mb-1">Backend &amp; Databases</span>
                <span className="text-slate-600 dark:text-slate-300">Node.js, Express, PostgreSQL, Supabase, Prisma ORM, REST APIs</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                <span className="font-bold text-slate-900 dark:text-white block mb-1">AI &amp; Automation</span>
                <span className="text-slate-600 dark:text-slate-300">Discord Webhooks, GitHub Actions (CI/CD), OpenAI, Google Gemini, Groq</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                <span className="font-bold text-slate-900 dark:text-white block mb-1">DevOps &amp; Infrastructure</span>
                <span className="text-slate-600 dark:text-slate-300">Git, GitHub, Vite, Vercel, Hostinger, cPanel, Cloudflare DNS, SSL &amp; Domain Setup</span>
              </div>
            </div>
          </section>

          {/* Featured Projects */}
          <section className="mb-8">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-1 mb-4 flex items-center gap-2">
              <Globe className="h-4 w-4 text-blue-600" /> Featured Commercial &amp; SaaS Projects
            </h2>

            <div className="space-y-5">
              {/* Fairease */}
              <div className="border-l-2 border-blue-600 pl-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">
                    Fairease Outsourcing — Corporate Outsourcing Platform
                  </h3>
                  <a href="https://fairease.in/" target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline inline-flex items-center gap-1 font-medium">
                    fairease.in <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
                <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">
                  Tech: WordPress, Elementor, Custom CSS/JS, Contact Lead Funnel, SEO, Performance
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Designed and developed the full production corporate platform for Fairease Outsourcing Pvt. Ltd. Structured interactive service showcases, quote/inquiry capture funnels, mobile responsiveness, SSL security, and core web vitals optimization.
                </p>
              </div>

              {/* Ireshh */}
              <div className="border-l-2 border-emerald-600 pl-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">
                    Ireshh — E-Commerce Clothing Brand Platform
                  </h3>
                  <a href="https://ireshh.com/" target="_blank" rel="noopener noreferrer" className="text-xs text-emerald-600 hover:underline inline-flex items-center gap-1 font-medium">
                    ireshh.com <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
                <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
                  Tech: WordPress, WooCommerce, Payment Gateways (Cards &amp; UPI), Inventory &amp; Variations, Hosting
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Engineered the complete e-commerce store from scratch (0 to 1) for fashion apparel brand Ireshh. Configured product variations, payment gateway integrations, automated shipping calculators, mobile checkout, and ongoing maintenance.
                </p>
              </div>

              {/* Expertvuw */}
              <div className="border-l-2 border-indigo-600 pl-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">
                    Expertvuw — Finance &amp; Legal Consulting Portal
                  </h3>
                  <a href="https://expertvuw.in/" target="_blank" rel="noopener noreferrer" className="text-xs text-indigo-600 hover:underline inline-flex items-center gap-1 font-medium">
                    expertvuw.in <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
                <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-1">
                  Tech: WordPress, Elementor Pro, Responsive Architecture, Lead Capture Pipelines, SEO, Cloudflare
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Engineered and deployed the production portal for finance and legal consultancy firm Expertvuw. Built high-converting consultation inquiry funnels, structured service matrices, optimized Core Web Vitals for lightning-fast speeds (&lt;1.2s), and achieved top Google rankings for finance keywords.
                </p>
              </div>

              {/* WebTruly */}
              <div className="border-l-2 border-purple-600 pl-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">
                    WebTruly — AI Chatbot SaaS Platform
                  </h3>
                  <span className="text-xs text-slate-400">Full-Stack SaaS</span>
                </div>
                <div className="text-xs font-semibold text-purple-600 dark:text-purple-400 mb-1">
                  Tech: Next.js, React, TypeScript, NestJS, Node.js, LangChain, OpenAI, Gemini, Groq, PostgreSQL, Redis
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  AI chatbot platform for businesses. Engineered website-content crawling/processing, AI model integrations, authentication, database schemas, background jobs, payment pipelines, and dashboard interfaces.
                </p>
              </div>

              {/* StaffLoop */}
              <div className="border-l-2 border-amber-600 pl-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">
                    StaffLoop — Full-Stack Workforce SaaS
                  </h3>
                  <span className="text-xs text-slate-400">Full-Stack SaaS</span>
                </div>
                <div className="text-xs font-semibold text-amber-600 dark:text-amber-400 mb-1">
                  Tech: Next.js, React, TypeScript, Tailwind CSS, Prisma, PostgreSQL, Supabase, Node.js, Zod
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Full-stack SaaS application featuring modular React/Next.js interfaces, secure server actions, database operations with Prisma &amp; Supabase, strict schema validation with Zod, and automated email notifications.
                </p>
              </div>
            </div>
          </section>

          {/* Professional Experience */}
          <section className="mb-8">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-1 mb-4 flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-blue-600" /> Professional Experience
            </h2>

            <div className="space-y-5 text-xs sm:text-sm">
              <div>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                    Freelance Web Developer — Fairease Outsourcing &amp; Expertvuw
                  </h3>
                  <span className="text-xs text-slate-500 font-medium">Nov 2024 – Present</span>
                </div>
                <ul className="list-disc ml-5 space-y-1 text-slate-600 dark:text-slate-300">
                  <li>Engineered and deployed the corporate website for <strong>Fairease Outsourcing</strong> (<a href="https://fairease.in/" target="_blank" className="underline">fairease.in</a>) and multiple production sites for Expertvuw.</li>
                  <li>Implemented high-converting lead capture funnels, responsive UI layouts, and seamless user experiences.</li>
                  <li>Managed cloud hosting, domain DNS configurations, SSL certificates, backups, and security hardening.</li>
                </ul>
              </div>

              <div>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                    Website Designer — Elion Technologies &amp; Consulting Pvt. Ltd.
                  </h3>
                  <span className="text-xs text-slate-500 font-medium">Apr 2025 – Present</span>
                </div>
                <ul className="list-disc ml-5 space-y-1 text-slate-600 dark:text-slate-300">
                  <li>Redesigned and updated existing website pages according to company specifications.</li>
                  <li>Implemented page layouts and content updates using WordPress, HTML, and CSS.</li>
                  <li>Managed regular blog publishing, performance checks, and ongoing website troubleshooting.</li>
                </ul>
              </div>

              <div>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                    Web Developer / Co-Founder — Psinizo
                  </h3>
                  <span className="text-xs text-slate-500 font-medium">Jul 2024 – Sep 2024</span>
                </div>
                <ul className="list-disc ml-5 space-y-1 text-slate-600 dark:text-slate-300">
                  <li>Designed and developed the e-commerce marketplace platform connecting consumers with local clothing shops.</li>
                  <li>Configured hosting, domain environments, payment gateway integrations, and basic SEO.</li>
                </ul>
              </div>

              <div>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                    Web Development Intern — IT Solution And Services
                  </h3>
                  <span className="text-xs text-slate-500 font-medium">Jul 2023 – Mar 2024</span>
                </div>
                <ul className="list-disc ml-5 space-y-1 text-slate-600 dark:text-slate-300">
                  <li>Developed website pages and customized Elementor components for client projects, including Davrath and Friends Group.</li>
                  <li>Assisted with hosting setup, domain records, content updates, and cross-browser testing.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Education */}
          <section>
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-1 mb-3 flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-blue-600" /> Education
            </h2>
            <div className="flex justify-between items-baseline text-xs sm:text-sm">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white">Bachelor of Computer Applications (BCA)</h3>
                <p className="text-slate-600 dark:text-slate-400">Online Manipal University</p>
              </div>
              <span className="text-xs text-slate-500">Pursuing 2026 – Present</span>
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
