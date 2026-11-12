import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { Link } from "react-router-dom";
import { 
  FileText, 
  Briefcase, 
  ShieldCheck, 
  Code2, 
  CreditCard, 
  AlertCircle, 
  Scale, 
  ChevronRight,
  CheckCircle2
} from "lucide-react";

export default function Terms() {
  const lastUpdated = "November 12, 2026";

  const terms = [
    {
      id: "services",
      icon: Briefcase,
      title: "1. Scope of Services",
      content: (
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          Aman UX Studio provides UI/UX design, custom web development, WordPress engineering, and performance optimization services. Specific project deliverables, turnaround timelines, and revision allowances are defined in each project proposal or service agreement agreed upon before work commences.
        </p>
      )
    },
    {
      id: "intellectual-property",
      icon: Code2,
      title: "2. Intellectual Property & Ownership",
      content: (
        <>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base mb-3">
            Upon final payment receipt, all custom design files, wireframes, code repositories, and graphics produced specifically for the client transfer entirely to the client.
          </p>
          <ul className="space-y-2 text-slate-600 dark:text-slate-300 text-sm">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
              <span>Clients maintain 100% full commercial ownership of their deployed website and deliverables.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
              <span>Aman UX Studio reserves the right to showcase non-confidential project snapshots in our portfolio case studies unless a strict non-disclosure agreement (NDA) is signed.</span>
            </li>
          </ul>
        </>
      )
    },
    {
      id: "payments",
      icon: CreditCard,
      title: "3. Payments & Milestones",
      content: (
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          Project engagements generally follow a milestone structure (e.g., 50% upfront deposit and 50% upon final delivery and client sign-off). Invoices are payable via UPI, direct bank transfer, Stripe, or authorized payment processors within 7 days of invoice issue.
        </p>
      )
    },
    {
      id: "revisions",
      icon: ShieldCheck,
      title: "4. Revisions & Approvals",
      content: (
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          We want you to be thrilled with your product. Each phase includes collaborative feedback loops and up to 2 rounds of standard design and content revisions. Additional revisions or structural scope additions outside the initial agreement are quoted transparently before execution.
        </p>
      )
    },
    {
      id: "liability",
      icon: AlertCircle,
      title: "5. Limitation of Liability",
      content: (
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          While we engineer all platforms to the highest industry standards with rigorous testing, Aman UX Studio cannot be held liable for third-party hosting downtimes, domain expiration by the client, or unauthorized modifications made to the codebase after project hand-off.
        </p>
      )
    },
    {
      id: "jurisdiction",
      icon: Scale,
      title: "6. Governing Law",
      content: (
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          These Terms of Service are governed by and construed in accordance with the laws of New Delhi, India. Any disputes arising in connection with our services will be subject to the exclusive jurisdiction of the competent courts of New Delhi.
        </p>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 font-sans flex flex-col text-slate-800 dark:text-slate-100">
      <Seo
        title="Terms of Service | Aman UX Studio"
        description="Review the terms and conditions governing UI/UX design, custom web development, and digital services delivered by Aman UX Studio."
        url="/terms"
      />

      <Navigation />

      {/* Header */}
      <header className="relative bg-[#0A0E17] text-white pt-28 pb-16 lg:py-24 border-b border-slate-800 overflow-hidden">
        <div className="container mx-auto px-6 max-w-5xl relative z-10">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm text-slate-400 font-medium mb-6">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-slate-300">Terms of Service</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-purple-500/10 text-purple-300 border border-purple-500/30 mb-4">
            <FileText className="w-3.5 h-3.5 text-purple-400" />
            Legal Agreement
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Terms of Service
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
            Standard engagement terms for design, web development, and client delivery. Last updated: {lastUpdated}.
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="flex-grow py-14 lg:py-20 bg-slate-50/50 dark:bg-slate-950">
        <div className="container mx-auto px-6 max-w-4xl space-y-8">
          {terms.map((term) => {
            const Icon = term.icon;
            return (
              <section
                key={term.id}
                id={term.id}
                className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs"
              >
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                    {term.title}
                  </h2>
                </div>
                {term.content}
              </section>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
