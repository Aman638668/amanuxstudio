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
          Aman UX Studio provides UI/UX design, custom web development, WordPress development, and speed optimization services. Specific project deliverables, turnaround timelines, and revision allowances are defined in each project proposal or service agreement agreed upon before work commences.
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
          While we build and test all websites to high quality standards, Aman UX Studio cannot be held liable for third-party hosting downtimes, domain expiration by the client, or unauthorized modifications made after project hand-off.
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
    <div className="min-h-screen bg-[#09090c] text-[#eeece8] font-sans flex flex-col selection:bg-blue-600 selection:text-white">
      <Seo
        title="Terms of Service | Aman UX Studio"
        description="Review the terms and conditions governing UI/UX design, custom web development, and digital services delivered by Aman UX Studio."
        url="/terms"
      />
      <div className="ambient-grain" aria-hidden="true" />

      <Navigation />

      {/* Header */}
      <header className="relative bg-[#09090c] text-white pt-36 pb-16 border-b border-white/10 overflow-hidden">
        <div className="container mx-auto px-6 max-w-5xl relative z-10">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-white/50 mb-6">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/30" />
            <span className="text-white/80">Terms of Service</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-4">
            <FileText className="w-3.5 h-3.5 text-blue-400" />
            Legal Agreement
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold text-[#eeece8] tracking-tight mb-4">
            Terms of Service
          </h1>
          <p className="text-white/70 text-sm sm:text-base max-w-2xl leading-relaxed font-normal">
            Standard engagement terms for design, web development, and client delivery. Last updated: {lastUpdated}.
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="flex-grow py-14 lg:py-20 bg-[#09090c]">
        <div className="container mx-auto px-6 max-w-4xl space-y-8">
          {terms.map((term) => {
            const Icon = term.icon;
            return (
              <section
                key={term.id}
                id={term.id}
                className="p-6 sm:p-8 rounded-3xl bg-white/[0.025] border border-white/10 shadow-xl"
              >
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white">
                    {term.title}
                  </h2>
                </div>
                <div className="text-white/70 text-sm leading-relaxed space-y-4">
                  {term.content}
                </div>
              </section>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
