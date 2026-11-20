import { motion } from "framer-motion";

interface PageHeaderProps {
  title: string;
  description?: string;
  badge?: string;
}

export default function PageHeader({ title, description, badge }: PageHeaderProps) {
  return (
    <div className="relative bg-[#09090c] text-[#eeece8] pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden border-b border-white/10 font-sans">
      {/* Background radial ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-blue-600/10 via-indigo-600/5 to-transparent blur-[120px] rounded-full pointer-events-none" />

      {/* Ghost Outline Category Watermark */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 pointer-events-none select-none opacity-5">
        <span className="font-mono text-8xl md:text-[180px] font-bold text-transparent stroke-text uppercase whitespace-nowrap">
          {badge || title.split(" ")[0]}
        </span>
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-5xl text-center">
        {/* Monospace section indicator */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-xs font-mono uppercase tracking-widest text-blue-400 mb-6"
        >
          <span>[ {badge || "STUDIO DIRECTORY"} ]</span>
        </motion.div>

        {/* Display title */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#eeece8] leading-[1.1] mb-6"
        >
          {title}
        </motion.h1>

        {/* Subtitle */}
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed font-normal"
          >
            {description}
          </motion.p>
        )}
      </div>
    </div>
  );
}
