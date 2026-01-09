
import { useState } from "react";
import Header from "./Header";
import DashboardSidebar from "./DashboardSidebar";
import { Toaster } from "@/components/ui/sonner";

interface LayoutProps {
    children: React.ReactNode;
    activeTab?: string;
    setActiveTab?: (tab: string) => void;
    onLogout?: () => void;
}

const DashboardLayout = ({ children, activeTab, setActiveTab, onLogout }: LayoutProps) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="dark:bg-slate-950 dark:text-slate-100 bg-slate-100 min-h-screen">
            {/* Page Wrapper */}
            <div className="flex h-screen overflow-hidden">
                {/* Sidebar */}
                <DashboardSidebar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    onLogout={onLogout}
                />

                {/* Content Area -> Wrapper */}
                <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                    {/* Header */}
                    <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                    {/* Main Content */}
                    <main>
                        <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
            <Toaster />
        </div>
    );
};

export default DashboardLayout;
