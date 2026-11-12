import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { Link } from "react-router-dom";
import { 
  ShieldCheck, 
  Lock, 
  Eye, 
  Database, 
  Server, 
  Mail, 
  ChevronRight, 
  CheckCircle2, 
  FileText,
  UserCheck
} from "lucide-react";

export default function Privacy() {
  const lastUpdated = "November 12, 2026";

  const sections = [
    {
      id: "introduction",
      icon: ShieldCheck,
      title: "1. Introduction & Overview",
      content: (
        <>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
            Welcome to <strong>Aman UX Studio</strong> (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;). We are committed to protecting your privacy and handling your personal information with complete transparency and care. This Privacy Policy outlines how we collect, use, safeguard, and disclose information when you visit our website (
            <a href="https://amanuxstudio.vercel.app" className="text-blue-600 hover:underline">
              https://amanuxstudio.vercel.app
            </a>
            ) or engage our UI/UX design and full-stack web development services.
          </p>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            By accessing our website or submitting information through our inquiry forms, you agree to the collection and use of information in accordance with this policy.
          </p>
        </>
      )
    },
    {
      id: "information-collected",
      icon: Eye,
      title: "2. Information We Collect",
      content: (
        <>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
            We collect only the minimum necessary information required to communicate with you, evaluate your project scope, and provide high-quality digital solutions:
          </p>
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-600" />
                Information You Provide Directly
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                When you fill out our contact form, newsletter signup, or consultation request, we collect your name, email address, phone number (optional), company name, estimated budget, and project details.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-600" />
                Technical &amp; Usage Data
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                We automatically collect anonymous browser telemetry to ensure fast load times and Core Web Vitals compliance. This includes IP address, browser type, operating system, pages visited, time spent on pages, and referring URLs.
              </p>
            </div>
          </div>
        </>
      )
    },
    {
      id: "how-we-use-information",
      icon: Database,
      title: "3. How We Use Your Information",
      content: (
        <>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
            We use your personal data strictly for legitimate business and client service purposes:
          </p>
          <ul className="space-y-2.5 text-slate-600 dark:text-slate-300 text-sm sm:text-base">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>To respond promptly to project inquiries, proposals, and discovery consultation requests.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>To deliver agreed UI/UX design deliverables, prototypes, and web development projects.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>To send UX design insights and technical newsletters (only if you opted in, with 1-click unsubscribe).</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>To protect our platform against spam, fraud, and malicious cyber attacks using reCAPTCHA.</span>
            </li>
          </ul>
        </>
      )
    },
    {
      id: "data-protection",
      icon: Lock,
      title: "4. Data Storage & Security",
      content: (
        <>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
            Security is paramount at Aman UX Studio. We enforce enterprise-grade security protocols across all infrastructure layers:
          </p>
          <div className="grid sm:grid-cols-2 gap-4 my-4">
            <div className="p-4 rounded-xl bg-purple-50/60 dark:bg-purple-950/20 border border-purple-200/60 dark:border-purple-800/60">
              <h5 className="font-bold text-purple-900 dark:text-purple-200 text-sm mb-1">Encrypted Database</h5>
              <p className="text-xs text-purple-800/80 dark:text-purple-300/80 leading-relaxed">
                Contact submissions are securely stored in Supabase with Row Level Security (RLS) and AES-256 data encryption at rest.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200/60 dark:border-blue-800/60">
              <h5 className="font-bold text-blue-900 dark:text-blue-200 text-sm mb-1">SSL/TLS In Transit</h5>
              <p className="text-xs text-blue-800/80 dark:text-blue-300/80 leading-relaxed">
                All communications and web traffic are strictly served over HTTPS with TLS 1.3 encryption.
              </p>
            </div>
          </div>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-semibold">
            We will never sell, rent, monetize, or trade your personal contact details to any third-party marketing companies.
          </p>
        </>
      )
    },
    {
      id: "third-party-services",
      icon: Server,
      title: "5. Third-Party Infrastructure",
      content: (
        <>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
            To provide robust reliability, our architecture integrates vetted industry-standard service providers:
          </p>
          <ul className="space-y-2 text-slate-600 dark:text-slate-300 text-sm">
            <li><strong>Supabase:</strong> Managed backend database and authentication infrastructure.</li>
            <li><strong>Vercel:</strong> Global CDN edge hosting and serverless deployment.</li>
            <li><strong>Google reCAPTCHA:</strong> Bot protection and spam filtering on forms.</li>
            <li><strong>Discord API:</strong> Encrypted notifications when a client sends an inquiry so our team responds rapidly.</li>
          </ul>
        </>
      )
    },
    {
      id: "your-rights",
      icon: UserCheck,
      title: "6. Your Privacy Rights (GDPR & CCPA)",
      content: (
        <>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
            Regardless of your geographic location, you retain full ownership of your personal data. You have the right to:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-600 dark:text-slate-300 text-sm">
            <li>Request a copy of any personal data we hold about you.</li>
            <li>Request the correction of inaccurate or incomplete information.</li>
            <li>Request the complete deletion of your data from our database (&ldquo;Right to be Forgotten&rdquo;).</li>
            <li>Opt out of any marketing or newsletter communications at any time.</li>
          </ul>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed mt-4 text-sm">
            To exercise any of these rights, simply email us at{" "}
            <a href="mailto:amanuxstudio@gmail.com" className="text-blue-600 font-semibold hover:underline">
              amanuxstudio@gmail.com
            </a>{" "}
            and we will process your request within 48 hours.
          </p>
        </>
      )
    },
    {
      id: "contact-us",
      icon: Mail,
      title: "7. Contact & Inquiries",
      content: (
        <>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
            If you have questions, concerns, or requests regarding this Privacy Policy or how we handle your data, please contact:
          </p>
          <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-1.5 text-sm">
            <p className="font-bold text-base text-purple-400">Aman Sharma (Aman UX Studio)</p>
            <p className="text-slate-300">Email: <a href="mailto:amanuxstudio@gmail.com" className="text-white hover:underline">amanuxstudio@gmail.com</a></p>
            <p className="text-slate-300">Phone / WhatsApp: <a href="tel:+919211104514" className="text-white hover:underline">+91 92111-04514</a></p>
            <p className="text-slate-300">Location: New Delhi, India</p>
          </div>
        </>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 font-sans flex flex-col text-slate-800 dark:text-slate-100">
      <Seo
        title="Privacy Policy | Aman UX Studio"
        description="Learn how Aman UX Studio protects your privacy, secures client project data, and adheres to GDPR and data protection standards."
        url="/privacy"
      />

      <Navigation />

      {/* Header */}
      <header className="relative bg-[#0A0E17] text-white pt-28 pb-16 lg:py-24 border-b border-slate-800 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-6 max-w-5xl relative z-10">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm text-slate-400 font-medium mb-6">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-slate-300">Privacy Policy</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-blue-500/10 text-blue-300 border border-blue-500/30 mb-4">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            Data Protection &amp; Security
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
            Transparent data practices, end-to-end security, and client confidentiality. Last updated: {lastUpdated}.
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="flex-grow py-14 lg:py-20 bg-slate-50/50 dark:bg-slate-950">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Quick Navigation Anchor Sidebar */}
            <aside className="lg:col-span-4 lg:sticky lg:top-24 hidden lg:block">
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-white mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <FileText className="w-4 h-4 text-blue-600" />
                  Policy Sections
                </div>
                <nav className="space-y-1.5 text-xs font-medium">
                  {sections.map((sec) => (
                    <a
                      key={sec.id}
                      href={`#${sec.id}`}
                      className="block px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-blue-600 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                    >
                      {sec.title}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Main Policy Content Cards */}
            <article className="lg:col-span-8 space-y-8">
              {sections.map((sec) => {
                const IconComponent = sec.icon;
                return (
                  <section
                    key={sec.id}
                    id={sec.id}
                    className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs scroll-mt-24"
                  >
                    <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
                      <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                        {sec.title}
                      </h2>
                    </div>
                    {sec.content}
                  </section>
                );
              })}
            </article>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
