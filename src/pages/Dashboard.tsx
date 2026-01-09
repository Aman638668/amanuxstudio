
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useNavigate, useSearchParams } from "react-router-dom";
import DashboardStats from "@/components/DashboardStats";
import PostList from "@/components/PostList";
import CategoryManager from "@/components/CategoryManager";
import DashboardLayout from "@/components/DashboardLayout";
import { Post } from "@/types/supabase";
import { FileText, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("overview");

    useEffect(() => {
        // syncing tab state with url param
        const tabParam = searchParams.get("tab");
        if (tabParam) {
            setActiveTab(tabParam);
        }

        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                navigate("/login");
            }
            setLoading(false);
        };
        checkAuth();
    }, [navigate, searchParams]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate("/login");
    };

    const handleEditPost = (post: Post) => {
        navigate(`/dashboard/editor/${post.id}`);
    };

    if (loading) return <div className="min-h-screen bg-slate-100 flex items-center justify-center text-slate-500">Loading...</div>;

    return (
        <DashboardLayout activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout}>
            {/* Header / Breadcrumb substitute */}
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
                        {activeTab === 'overview' && 'Dashboard Overview'}
                        {activeTab === 'posts' && 'Manage Posts'}
                        {activeTab === 'categories' && 'Categories'}
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        {activeTab === 'overview' && 'Welcome back, Admin'}
                        {activeTab === 'posts' && 'View and manage all your blog posts'}
                        {activeTab === 'categories' && 'Manage blog categories'}
                    </p>
                </div>

                {activeTab === 'posts' && (
                    <Button
                        onClick={() => navigate('/dashboard/editor')}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        <Plus className="h-4 w-4 mr-2" /> New Post
                    </Button>
                )}
            </div>

            {activeTab === 'overview' && (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-1 md:gap-6 xl:grid-cols-1 2xl:gap-7.5">
                    <DashboardStats />
                </div>
            )}

            {activeTab === 'posts' && (
                <div className="rounded-sm border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800 px-5 pt-6 pb-2.5 sm:px-7.5 xl:pb-1">
                    <PostList onEdit={handleEditPost} />
                </div>
            )}

            {activeTab === 'categories' && (
                <div className="max-w-2xl">
                    <CategoryManager />
                </div>
            )}
        </DashboardLayout>
    );
};

export default Dashboard;
