import { LayoutDashboard, FileText, Tags, LogOut, ChevronLeft, Inbox, Activity, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface SidebarProps {
    activeTab?: string;
    setActiveTab?: (tab: string) => void;
    onLogout?: () => void;
    sidebarOpen: boolean;
    setSidebarOpen: (arg: boolean) => void;
}

export default function DashboardSidebar({ activeTab = "overview", setActiveTab, onLogout, sidebarOpen, setSidebarOpen }: SidebarProps) {
    const menuItems = [
        { id: "overview", label: "Overview", icon: LayoutDashboard },
        { id: "posts", label: "Manage Posts", icon: FileText },
        { id: "categories", label: "Categories", icon: Tags },
        { id: "leads", label: "Leads & Inquiries", icon: Inbox },
        { id: "system", label: "System Health & Pings", icon: Activity },
    ];

    return (
        <aside
            className={cn(
                "fixed left-0 top-0 z-[9999] flex h-screen w-72 flex-col overflow-y-hidden bg-slate-900 border-r border-slate-800 duration-300 ease-linear lg:static lg:translate-x-0",
                sidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
            )}
        >
            {/* Header */}
            <div className="flex items-center justify-between gap-2 px-6 py-6 border-b border-slate-800">
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="h-9 w-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:scale-105 transition-transform">
                        A
                    </div>
                    <div>
                        <span className="text-lg font-bold text-white block leading-tight">Aman UX Studio</span>
                        <span className="text-xs text-slate-400 block">Admin Dashboard</span>
                    </div>
                </Link>
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="block lg:hidden text-slate-400 hover:text-white p-1"
                    aria-label="Close Sidebar"
                >
                    <ChevronLeft className="h-6 w-6" />
                </button>
            </div>

            {/* Menu */}
            <div className="flex flex-col flex-1 justify-between overflow-y-auto px-4 py-6">
                <div>
                    <h3 className="mb-3 px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Management
                    </h3>
                    <ul className="space-y-1.5">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = activeTab === item.id;
                            return (
                                <li key={item.id}>
                                    <button
                                        onClick={() => {
                                            if (setActiveTab) setActiveTab(item.id);
                                            setSidebarOpen(false);
                                        }}
                                        className={cn(
                                            "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium duration-200 w-full transition-all text-left",
                                            isActive
                                                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                                                : "text-slate-300 hover:bg-slate-800 hover:text-white"
                                        )}
                                    >
                                        <Icon className="h-5 w-5 flex-shrink-0" />
                                        <span>{item.label}</span>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                {/* Bottom Actions */}
                <div className="space-y-2 pt-6 border-t border-slate-800">
                    <Link
                        to="/"
                        target="_blank"
                        className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                    >
                        <ExternalLink className="h-4 w-4 text-slate-400" />
                        <span>View Live Website</span>
                    </Link>

                    <button
                        onClick={onLogout}
                        className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors w-full"
                    >
                        <LogOut className="h-4 w-4" />
                        <span>Log Out</span>
                    </button>
                </div>
            </div>
        </aside>
    );
}
