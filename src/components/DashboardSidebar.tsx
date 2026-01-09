
import { LayoutDashboard, FileText, Settings, LogOut, Tags, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
    sidebarOpen: boolean;
    setSidebarOpen: (arg: boolean) => void;
    onLogout: () => void;
}

const DashboardSidebar = ({ sidebarOpen, setSidebarOpen, onLogout }: SidebarProps) => {
    const location = useLocation();
    const { pathname } = location;

    const menuItems = [
        { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
        { path: "/dashboard?tab=posts", label: "Manage Posts", icon: FileText }, // Using query param for tab logic if we keep it, or separate routes
        { path: "/dashboard?tab=categories", label: "Categories", icon: Tags },
    ];

    // Helper to determine active state roughly (since we used tabs inside dashboard main)
    // For 'Manage Posts', checking if query param strictly might be complex with router. 
    // Let's rely on simple matching or passed props if we refactored. 
    // For V4, let's keep it simple: matching path.
    // BUT: Dashboard Page handles tabs internally. Ideally sidebar items should switch tabs.
    // To avoid complex routing refactor NOW, I'll direct them to the dashboard and let Dashboard read URL or state.
    // Actually, let's make the Sidebar accept "activeTab" if passed, or we assume a purely routing based sidebar?
    // Let's stick to the previous prop pattern for now to avoid breaking Dashboard logic, 
    // but style it new.

    return (
        <aside
            className={`absolute left-0 top-0 z-[9999] flex h-screen w-72.5 flex-col overflow-y-hidden bg-white duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                }`}
        >
            {/* HEADER */}
            <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
                <Link to="/" className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-600 text-white font-bold text-xl">
                        A
                    </div>
                    <span className="text-2xl font-semibold text-white">Amanux</span>
                </Link>
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="block lg:hidden text-white"
                >
                    <ChevronLeft />
                </button>
            </div>

            <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
                {/* Sidebar Menu */}
                <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
                    <div>
                        <h3 className="mb-4 ml-4 text-sm font-semibold text-slate-400">MENU</h3>
                        <ul className="mb-6 flex flex-col gap-1.5">
                            {/* We need to emit events or use links. Since Dashboard controls Tabs, let's just emit for now 
                   OR use Link with state/search params.
                   For simplicity of this visual refactor, I will assume the parent passes props OR 
                   we duplicate the items logic from the parent. 
                   Actually, let's make this component DUMB and just render what it's told if possible, 
                   but the user wants a "Layout".
                   Strategy: The Layout prop drills props? Or Context?
                   Let's stick to the activeTab prop pattern for exact control.
               */}
                            {/* Reverting to Prop-based for safety, but styling match TailAdmin */}
                        </ul>
                    </div>
                </nav>
            </div>
        </aside>
    );
};
// WAait, I need to keep the Props pattern to work with Dashboard.tsx seamlessly without huge logic refactor.
// Let's rewrite strictly for style but keep interface.

export default function Sidebar({ activeTab, setActiveTab, onLogout, sidebarOpen, setSidebarOpen }: any) {
    const menuItems = [
        { id: "overview", label: "Dashboard", icon: LayoutDashboard },
        { id: "posts", label: "Manage Posts", icon: FileText },
        { id: "categories", label: "Categories", icon: Tags },
    ];

    return (
        <aside
            className={cn(
                "fixed left-0 top-0 z-[9999] flex h-screen w-72 flex-col overflow-y-hidden bg-slate-800 duration-300 ease-linear lg:static lg:translate-x-0",
                sidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}
        >
            <div className="flex items-center justify-between gap-2 px-6 py-6 lg:py-8">
                <Link to="/" className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">A</div>
                    <span className="text-xl font-bold text-white">Amanux</span>
                </Link>
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="block lg:hidden text-slate-400"
                >
                    <ChevronLeft />
                </button>
            </div>

            <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
                <nav className="mt-2 py-4 px-4 lg:px-6">
                    <div>
                        <h3 className="mb-4 ml-4 text-sm font-medium text-slate-400 uppercase tracking-wider">Menu</h3>
                        <ul className="mb-6 flex flex-col gap-2">
                            {menuItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = activeTab === item.id;
                                return (
                                    <li key={item.id}>
                                        <button
                                            onClick={() => setActiveTab && setActiveTab(item.id)}
                                            className={cn(
                                                "group relative flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium duration-300 w-full",
                                                isActive
                                                    ? "bg-slate-700 text-white"
                                                    : "text-slate-400 hover:bg-slate-700 hover:text-white"
                                            )}
                                        >
                                            <Icon className="h-5 w-5" />
                                            {item.label}
                                        </button>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>

                    <div className="mt-auto border-t border-slate-700 pt-6">
                        <button
                            onClick={onLogout}
                            className="group relative flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium duration-300 w-full text-slate-400 hover:bg-red-500/10 hover:text-red-400"
                        >
                            <LogOut className="h-5 w-5" />
                            Logout
                        </button>
                    </div>
                </nav>
            </div>
        </aside>
    )
}
