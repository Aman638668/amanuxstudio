
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const DarkModeSwitcher = () => {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="relative m-0 block h-7.5 w-14 rounded-full bg-slate-200 dark:bg-[#5A616B]"
        >
            <div className={`absolute top-1/2 left-[3px] flex h-6 w-6 -translate-y-1/2 translate-x-0 items-center justify-center rounded-full bg-white shadow-switcher duration-75 ease-linear ${theme === 'dark' && '!right-[3px] !translate-x-full'
                }`}>
                <span className="dark:hidden">
                    <Sun className="h-4 w-4 text-slate-500" />
                </span>
                <span className="hidden dark:inline-block">
                    <Moon className="h-4 w-4 text-slate-500" />
                </span>
            </div>
        </button>
    );
};
// Re-visiting design: simpler toggle
const SimpleSwitcher = () => {
    const { theme, setTheme } = useTheme();

    return (
        <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="relative flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
        >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
    )
}

export default SimpleSwitcher;
