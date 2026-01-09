
import { motion } from "framer-motion";

interface PageHeaderProps {
    title: string;
    description?: string;
    bgImage?: string; // Optional custom background
}

export default function PageHeader({ title, description, bgImage }: PageHeaderProps) {
    return (
        <div className="relative bg-slate-900 text-white py-32 overflow-hidden">
            {/* Background with Overlay */}
            <div className="absolute inset-0 z-0">
                {/* Gradient Overlay Removed to fix banding artifacts */}
                {bgImage ? (
                    <img src={bgImage} alt={title} className="w-full h-full object-cover opacity-30" />
                ) : (
                    // Default Abstract Pattern (No Image)
                    <div className="w-full h-full opacity-30">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,#3b82f6,transparent_50%)]" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,#1e293b,transparent_50%)]" />
                    </div>
                )}
            </div>

            <div className="absolute inset-0 pt-20 flex items-center justify-center opacity-10">
                <h1 className="text-9xl font-bold text-white select-none blur-[2px]">{title.split(" ")[0]}</h1>
            </div>

            <div className="container mx-auto px-6 relative z-20 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent"
                >
                    {title}
                </motion.h1>
                {description && (
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto"
                    >
                        {description}
                    </motion.p>
                )}
            </div>
        </div>
    );
}
