
import Navigation from "@/components/Navigation";
import PageHeader from "@/components/PageHeader";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Post } from "@/types/supabase";
import BlogCard from "@/components/BlogCard";
import { toast } from "sonner";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Blog = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1); // Default to 1 to show pagination
    const POSTS_PER_PAGE = 6;

    useEffect(() => {
        fetchPosts(page);
    }, [page]);

    const fetchPosts = async (pageNumber: number) => {
        setLoading(true);
        try {
            const from = (pageNumber - 1) * POSTS_PER_PAGE;
            const to = from + POSTS_PER_PAGE - 1;

            const { data, error, count } = await supabase
                .from("posts")
                .select("*", { count: "exact" })
                .eq("published", true)
                .order("created_at", { ascending: false })
                .range(from, to);

            if (error) throw error;

            setPosts(data || []);
            if (count) {
                // Ensure at least 1 page
                setTotalPages(Math.max(1, Math.ceil(count / POSTS_PER_PAGE)));
            }
        } catch (error: any) {
            console.error("Error fetching posts:", error);
            toast.error("Failed to load blog posts");
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
            <Seo
                title="Engineering & Web Development Blog"
                description="Technical articles, architectural case studies, performance optimization guides, and conversion UX teardowns from Aman UX Studio."
                url="/blog"
            />
            <Navigation />
            <PageHeader
                title="Engineering Insights & Tech Articles"
                description="Actionable web architecture guides, Core Web Vitals optimization playbooks, and production case studies from building platforms like Fairease and Ireshh."
            />
            
            <main className="flex-grow container mx-auto px-6 py-16">
                <div className="max-w-6xl mx-auto">
                    {loading ? (
                        <div className="text-center py-20 text-slate-500 font-medium">Loading Articles...</div>
                    ) : (
                        <>
                            {posts.length === 0 ? (
                                <div className="text-center py-20 text-slate-500">No posts found.</div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                                    {posts.map((post) => (
                                        <BlogCard key={post.id} post={post} />
                                    ))}
                                </div>
                            )}

                            {/* Pagination - Always Visible */}
                            <div className="flex justify-center items-center gap-2">
                                {/* Back Button */}
                                <Button
                                    variant="ghost"
                                    onClick={() => handlePageChange(page - 1)}
                                    disabled={page === 1}
                                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-medium flex items-center gap-1 px-2"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                    Back
                                </Button>

                                {/* Page Numbers */}
                                <div className="flex items-center gap-2 mx-2">
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                                        <button
                                            key={pageNum}
                                            onClick={() => handlePageChange(pageNum)}
                                            className={cn(
                                                "w-9 h-9 rounded-lg text-sm font-medium transition-all duration-200",
                                                page === pageNum
                                                    ? "bg-blue-600 text-white shadow-md shadow-blue-200 scale-105"
                                                    : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                                            )}
                                        >
                                            {pageNum}
                                        </button>
                                    ))}
                                </div>

                                {/* Next Button */}
                                <Button
                                    variant="ghost"
                                    onClick={() => handlePageChange(page + 1)}
                                    disabled={page === totalPages}
                                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-medium flex items-center gap-1 px-2"
                                >
                                    Next
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Blog;
