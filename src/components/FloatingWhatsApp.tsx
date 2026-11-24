import { MessageSquare, ArrowUpRight } from 'lucide-react';

export default function FloatingWhatsApp() {
  const whatsappUrl = "https://wa.me/919211104514?text=Hi%20Aman,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20website%20project.";

  return (
    <aside
      aria-label="Direct WhatsApp Contact"
      className="fixed bottom-6 right-5 sm:bottom-8 sm:right-8 z-[120] pointer-events-auto"
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2.5 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-full bg-[#0e0e14]/90 hover:bg-[#12121a] border border-emerald-500/30 hover:border-emerald-500/60 text-white shadow-2xl shadow-black/80 backdrop-blur-xl transition-all duration-300 hover:scale-105"
        title="Direct WhatsApp Inquiry (+91 92111-04514)"
      >
        {/* Pulsing Status Dot */}
        <span className="relative flex h-2.5 w-2.5 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3ddc84] opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#3ddc84]" />
        </span>

        {/* WhatsApp Icon */}
        <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-[#3ddc84] shrink-0">
          <MessageSquare className="w-3.5 h-3.5 fill-current" />
        </div>

        {/* Text Details (Responsive) */}
        <div className="flex flex-col text-left pr-1">
          <div className="flex items-center gap-1">
            <span className="text-xs font-bold text-white tracking-tight">WhatsApp Aman</span>
            <ArrowUpRight className="w-3 h-3 text-emerald-400 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </div>
          <span className="text-[10px] font-mono text-white/50 leading-none hidden sm:inline-block">
            +91 92111-04514 · Quick Reply
          </span>
        </div>
      </a>
    </aside>
  );
}
