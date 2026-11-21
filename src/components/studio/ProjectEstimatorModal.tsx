import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calculator, 
  X, 
  Check, 
  ArrowRight, 
  Clock, 
  Zap, 
  ShieldCheck, 
  MessageSquare, 
  Sparkles, 
  CheckCircle2, 
  Coins,
  ExternalLink,
  Layers
} from 'lucide-react';
import { studioAudio } from '@/lib/studio-audio';
import { toast } from 'sonner';

interface ProjectEstimatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyScopeToContact: (scopeText: string) => void;
}

interface ProjectType {
  id: string;
  name: string;
  category: string;
  description: string;
  basePriceUSD: number;
  basePriceINR: number;
  baseDays: number;
  icon: string;
}

interface FeatureAddon {
  id: string;
  name: string;
  desc: string;
  priceUSD: number;
  priceINR: number;
  days: number;
  popular?: boolean;
}

const PROJECT_TYPES: ProjectType[] = [
  {
    id: 'corporate',
    name: 'Corporate & B2B Website',
    category: 'Custom WordPress',
    description: 'Bespoke corporate platform with service showcases, lead funnels, and sub-second speed.',
    basePriceUSD: 850,
    basePriceINR: 32000,
    baseDays: 8,
    icon: '🏢'
  },
  {
    id: 'ecommerce',
    name: 'WooCommerce E-Commerce Store',
    category: '0-to-1 Store Build',
    description: 'Complete online storefront, product catalog, payment gateways (Cards/UPI), and friction-free checkout.',
    basePriceUSD: 1350,
    basePriceINR: 48000,
    baseDays: 14,
    icon: '🛍️'
  },
  {
    id: 'landing',
    name: 'High-Converting Landing Page',
    category: 'CRO & Speed Redesign',
    description: 'Single-page high-intent sales page engineered for maximum customer acquisition.',
    basePriceUSD: 550,
    basePriceINR: 20000,
    baseDays: 5,
    icon: '⚡'
  },
  {
    id: 'webapp',
    name: 'Full-Stack Web App / SaaS MVP',
    category: 'Next.js & Supabase',
    description: 'Custom web application with database schemas, auth, APIs, and modern UI dashboard.',
    basePriceUSD: 1950,
    basePriceINR: 72000,
    baseDays: 20,
    icon: '🚀'
  }
];

const FEATURE_ADDONS: FeatureAddon[] = [
  {
    id: 'speed',
    name: 'Sub-Second Speed Tuning (< 1.2s TTFB)',
    desc: 'Database pruning, Redis cache drop-in, and asset optimization for 90+ PageSpeed.',
    priceUSD: 200,
    priceINR: 7500,
    days: 2,
    popular: true
  },
  {
    id: 'figma',
    name: 'Figma to Pixel-Perfect Code Conversion',
    desc: 'Strict fidelity to your existing Figma designs with clean semantic Tailwind CSS.',
    priceUSD: 250,
    priceINR: 9500,
    days: 3
  },
  {
    id: 'payment',
    name: 'Payment Gateway Integration (Stripe / Razorpay)',
    desc: 'Secure checkout pipeline with UPI, Cards, NetBanking, and automated receipts.',
    priceUSD: 300,
    priceINR: 11000,
    days: 3,
    popular: true
  },
  {
    id: 'seo',
    name: 'Technical SEO & JSON-LD Schema Architecture',
    desc: 'Structured sitemaps, open-graph protocols, canonicalization, and meta tags.',
    priceUSD: 180,
    priceINR: 6500,
    days: 2
  },
  {
    id: 'whatsapp',
    name: 'Instant WhatsApp & Email Lead Alert Automation',
    desc: 'Immediate notifications sent to your phone the second a visitor submits an inquiry.',
    priceUSD: 120,
    priceINR: 4500,
    days: 1
  },
  {
    id: 'cms-training',
    name: 'Video Training & Handover Documentation',
    desc: 'Custom Loom walkthrough videos teaching your team how to edit pages without code.',
    priceUSD: 100,
    priceINR: 3500,
    days: 1
  }
];

export function ProjectEstimatorModal({
  isOpen,
  onClose,
  onApplyScopeToContact
}: ProjectEstimatorModalProps) {
  const [selectedType, setSelectedType] = useState<string>('corporate');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(['speed', 'seo']);
  const [currency, setCurrency] = useState<'USD' | 'INR'>('USD');
  const [timelineSpeed, setTimelineSpeed] = useState<'standard' | 'rush'>('standard');

  const activeProject = useMemo(() => {
    return PROJECT_TYPES.find((p) => p.id === selectedType) || PROJECT_TYPES[0];
  }, [selectedType]);

  const toggleFeature = (id: string) => {
    studioAudio.playClick(800);
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  // Calculate pricing & delivery timeline
  const calculation = useMemo(() => {
    let priceUSD = activeProject.basePriceUSD;
    let priceINR = activeProject.basePriceINR;
    let days = activeProject.baseDays;

    selectedFeatures.forEach((featId) => {
      const feat = FEATURE_ADDONS.find((f) => f.id === featId);
      if (feat) {
        priceUSD += feat.priceUSD;
        priceINR += feat.priceINR;
        days += feat.days;
      }
    });

    if (timelineSpeed === 'rush') {
      priceUSD = Math.round(priceUSD * 1.25);
      priceINR = Math.round(priceINR * 1.25);
      days = Math.max(4, Math.round(days * 0.65));
    }

    const minPriceUSD = Math.round(priceUSD * 0.95);
    const maxPriceUSD = Math.round(priceUSD * 1.15);

    const minPriceINR = Math.round(priceINR * 0.95);
    const maxPriceINR = Math.round(priceINR * 1.15);

    return {
      priceUSD,
      priceINR,
      minPriceUSD,
      maxPriceUSD,
      minPriceINR,
      maxPriceINR,
      days
    };
  }, [activeProject, selectedFeatures, timelineSpeed]);

  // Construct formatted scope text
  const generateScopeSummary = () => {
    const selectedFeatureNames = selectedFeatures
      .map((fid) => FEATURE_ADDONS.find((f) => f.id === fid)?.name)
      .filter(Boolean);

    const priceString =
      currency === 'USD'
        ? `$${calculation.minPriceUSD.toLocaleString()} – $${calculation.maxPriceUSD.toLocaleString()} USD`
        : `₹${calculation.minPriceINR.toLocaleString()} – ₹${calculation.maxPriceINR.toLocaleString()} INR`;

    return `### Project Scope Estimate (Configured via Aman UX Studio Estimator)
- **Project Foundation:** ${activeProject.name} (${activeProject.category})
- **Estimated Investment:** ${priceString}
- **Estimated Timeline:** ~${calculation.days} business days (${timelineSpeed === 'rush' ? 'Fast-Track Rush' : 'Standard Delivery'})
- **Selected Requirements:**
${selectedFeatureNames.map((name) => `  * ${name}`).join('\n')}

I would like to discuss this project with Aman Sharma.`;
  };

  const handleApplyToContact = () => {
    studioAudio.playClick(940);
    const summary = generateScopeSummary();
    onApplyScopeToContact(summary);
    onClose();
    toast.success('Your project scope has been populated into the contact form below!');
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendWhatsApp = () => {
    studioAudio.playClick(900);
    const summary = generateScopeSummary();
    const encoded = encodeURIComponent(`Hi Aman! I used the Project Estimator on your website and would like to discuss this scope:\n\n${summary}`);
    window.open(`https://wa.me/919211104514?text=${encoded}`, '_blank');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[150] bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
          className="relative w-full max-w-4xl bg-[#09090c] border border-white/15 rounded-3xl shadow-2xl text-[#eeece8] overflow-hidden my-auto font-sans"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-white/10 bg-[#0e0e14]">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center">
                <Calculator className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white leading-tight">
                  30-Second Project Scope &amp; Investment Estimator
                </h3>
                <p className="text-xs font-mono text-[#94a3b8]">
                  Transparent estimations · Direct developer pricing · Zero agency fluff
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Currency Toggle */}
              <div className="flex items-center bg-black/50 p-1 rounded-full border border-white/10 text-xs font-mono">
                <button
                  onClick={() => {
                    studioAudio.playClick(700);
                    setCurrency('USD');
                  }}
                  className={`px-2.5 py-1 rounded-full transition-all ${
                    currency === 'USD' ? 'bg-blue-600 text-white font-bold shadow' : 'text-[#94a3b8] hover:text-white'
                  }`}
                >
                  USD ($)
                </button>
                <button
                  onClick={() => {
                    studioAudio.playClick(700);
                    setCurrency('INR');
                  }}
                  className={`px-2.5 py-1 rounded-full transition-all ${
                    currency === 'INR' ? 'bg-blue-600 text-white font-bold shadow' : 'text-[#94a3b8] hover:text-white'
                  }`}
                >
                  INR (₹)
                </button>
              </div>

              <button
                onClick={() => {
                  studioAudio.playClick(500);
                  onClose();
                }}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-[#94a3b8] hover:text-white transition-colors"
                title="Close Estimator"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 space-y-8 max-h-[75vh] overflow-y-auto scrollbar-thin">
            
            {/* Step 1: Project Foundation */}
            <div>
              <div className="flex items-center justify-between mb-3.5">
                <label className="text-xs font-mono uppercase tracking-widest text-blue-400 font-semibold flex items-center gap-2">
                  <span>01 // Select Project Foundation</span>
                </label>
                <span className="text-[11px] font-mono text-[#64748b]">Select 1 core platform</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {PROJECT_TYPES.map((pt) => {
                  const isSelected = selectedType === pt.id;
                  return (
                    <div
                      key={pt.id}
                      onClick={() => {
                        studioAudio.playClick(850);
                        setSelectedType(pt.id);
                      }}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer relative ${
                        isSelected
                          ? 'bg-blue-600/15 border-blue-500 shadow-lg shadow-blue-950/50'
                          : 'bg-[#0e0e14] border-white/10 hover:border-white/20 hover:bg-white/[0.03]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{pt.icon}</span>
                          <div>
                            <h4 className="text-sm font-bold text-white">{pt.name}</h4>
                            <span className="text-[11px] font-mono text-blue-300">{pt.category}</span>
                          </div>
                        </div>
                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center shrink-0">
                            <Check className="w-3 h-3" />
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-[#94a3b8] leading-relaxed font-normal">{pt.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Technical Add-ons */}
            <div>
              <div className="flex items-center justify-between mb-3.5">
                <label className="text-xs font-mono uppercase tracking-widest text-blue-400 font-semibold flex items-center gap-2">
                  <span>02 // Core Engineering Deliverables</span>
                </label>
                <span className="text-[11px] font-mono text-[#64748b]">Choose all that apply</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {FEATURE_ADDONS.map((feat) => {
                  const isChecked = selectedFeatures.includes(feat.id);
                  return (
                    <div
                      key={feat.id}
                      onClick={() => toggleFeature(feat.id)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                        isChecked
                          ? 'bg-white/[0.06] border-blue-400/60 shadow-sm'
                          : 'bg-[#0e0e14] border-white/5 hover:border-white/15'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-md border mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
                          isChecked
                            ? 'bg-blue-600 border-blue-500 text-white'
                            : 'border-white/20 bg-white/5'
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3" />}
                      </div>

                      <div className="flex-grow min-w-0">
                        <div className="flex items-center justify-between gap-1 mb-0.5">
                          <span className="text-xs font-bold text-[#eeece8] truncate">{feat.name}</span>
                          {feat.popular && (
                            <span className="text-[9px] font-mono uppercase tracking-wider text-amber-300 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20 shrink-0">
                              Essential
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-[#94a3b8] leading-snug">{feat.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Speed of Delivery */}
            <div className="p-4 rounded-2xl bg-[#0e0e14] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-blue-400 block mb-0.5">
                  03 // Delivery Velocity
                </span>
                <p className="text-xs text-[#94a3b8]">
                  Standard allows iterative reviews; Fast-Track dedicates immediate sprint resources.
                </p>
              </div>

              <div className="flex items-center bg-black/40 p-1 rounded-xl border border-white/10 shrink-0">
                <button
                  onClick={() => {
                    studioAudio.playClick(720);
                    setTimelineSpeed('standard');
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                    timelineSpeed === 'standard' ? 'bg-white/20 text-white font-bold' : 'text-[#64748b] hover:text-white'
                  }`}
                >
                  Standard Delivery
                </button>
                <button
                  onClick={() => {
                    studioAudio.playClick(840);
                    setTimelineSpeed('rush');
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1 ${
                    timelineSpeed === 'rush' ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30' : 'text-[#64748b] hover:text-white'
                  }`}
                >
                  <Zap className="w-3 h-3 text-amber-400" />
                  <span>Fast-Track Sprint (+25%)</span>
                </button>
              </div>
            </div>

          </div>

          {/* Bottom Live Calculation & Action Strip */}
          <div className="p-6 sm:p-8 bg-[#0e0e14] border-t border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            {/* Live Pricing Breakdown */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono text-[#94a3b8]">
                <Clock className="w-3.5 h-3.5 text-blue-400" />
                <span>Estimated Timeline: <strong className="text-white">~{calculation.days} Business Days</strong></span>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-extrabold font-mono text-white tracking-tight">
                  {currency === 'USD' ? (
                    `$${calculation.minPriceUSD.toLocaleString()} – $${calculation.maxPriceUSD.toLocaleString()}`
                  ) : (
                    `₹${calculation.minPriceINR.toLocaleString()} – ₹${calculation.maxPriceINR.toLocaleString()}`
                  )}
                </span>
                <span className="text-xs font-mono text-[#64748b]">{currency}</span>
              </div>

              <p className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 shrink-0" />
                <span>Includes 1-on-1 developer collaboration &amp; 30-day post-launch warranty</span>
              </p>
            </div>

            {/* Direct Handoff CTAs */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleApplyToContact}
                className="btn-studio-primary px-5 py-3 text-xs font-mono inline-flex items-center gap-2 shadow-xl"
              >
                <span>Send Scope to Aman</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleSendWhatsApp}
                className="px-4 py-3 rounded-full bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-mono inline-flex items-center gap-1.5 transition-all"
                title="Send via WhatsApp"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp Quote</span>
              </button>
            </div>

          </div>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
