import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useNavigate, useSearchParams } from "react-router-dom";
import DashboardStats from "@/components/DashboardStats";
import PostList from "@/components/PostList";
import CategoryManager from "@/components/CategoryManager";
import DashboardLayout from "@/components/DashboardLayout";
import LeadsManager from "@/components/LeadsManager";
import SystemStatus from "@/components/SystemStatus";
import { Post } from "@/types/supabase";
import { Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("overview");

    useEffect(() => {
        const tabParam = searchParams.get("tab");
        if (tabParam) {
            setActiveTab(tabParam);
        }

        const checkAuth = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                if (!session) {
                    navigate("/login", { replace: true });
                }
            } catch (err) {
                navigate("/login", { replace: true });
            } finally {
                setLoading(false);
            }
        };

        checkAuth();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (!session) {
                navigate("/login", { replace: true });
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [navigate, searchParams]);

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        setSearchParams(tab === "overview" ? {} : { tab });
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate("/login");
    };

    const handleEditPost = (post: Post) => {
        navigate(`/dashboard/editor/${post.id}`);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-500">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
        );
    }

    return (
        <DashboardLayout activeTab={activeTab} setActiveTab={handleTabChange} onLogout={handleLogout}>
            {/* Page Header */}
            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
                        {activeTab === 'overview' && 'Dashboard Overview'}
                        {activeTab === 'posts' && 'Article & Post Management'}
                        {activeTab === 'categories' && 'Blog Categories'}
                        {activeTab === 'leads' && 'Leads & Inquiries'}
                        {activeTab === 'system' && 'System Health & Keep-Alive'}
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        {activeTab === 'overview' && 'Real-time performance analytics, visitor engagement, and quick stats.'}
                        {activeTab === 'posts' && 'Create, edit, and organize articles published on your agency blog.'}
                        {activeTab === 'categories' && 'Configure taxonomy for organizing knowledge base and articles.'}
                        {activeTab === 'leads' && 'Review client contact form submissions and newsletter signups.'}
                        {activeTab === 'system' && 'Monitor Supabase database uptime, prevent auto-pause, and test Discord alerts.'}
                    </p>
                </div>

                {activeTab === 'posts' && (
                    <Button
                        onClick={() => navigate('/dashboard/editor')}
                        className="bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all"
                    >
                        <Plus className="h-4 w-4 mr-2" /> Write New Post
                    </Button>
                )}
            </div>

            {/* Tab Contents */}
            {activeTab === 'overview' && (
                <div className="space-y-6">
                    <DashboardStats />
                </div>
            )}

            {activeTab === 'posts' && (
                <div className="rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800 p-6">
                    <PostList onEdit={handleEditPost} />
                </div>
            )}

            {activeTab === 'categories' && (
                <div className="max-w-3xl">
                    <CategoryManager />
                </div>
            )}

            {activeTab === 'leads' && (
                <LeadsManager />
            )}

            {activeTab === 'system' && (
                <SystemStatus />
            )}
        </DashboardLayout>
    );
};

export default Dashboard;
