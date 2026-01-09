
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Post, Category } from "@/types/supabase";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { format } from "date-fns";
import { ArrowLeft, Calendar, FileText, Tag } from "lucide-react";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

// Reuse BlogCard style or similar layout
const CategoryPage = () => {
    const { slug } = useParams(); // Using slug now
    const navigate = useNavigate();
    const [posts, setPosts] = useState<Post[]>([]);
    const [category, setCategory] = useState<Category | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (slug) {
            fetchCategoryAndPosts(slug);
        }
    }, [slug]);

    const fetchCategoryAndPosts = async (catSlug: string) => {
        setLoading(true);
        try {
            // First: Fetch Category by Slug to get ID and Name
            const { data: catData, error: catError } = await supabase
                .from("categories")
                .select("*")
                .eq("slug", catSlug)
                .single();

            if (catError) throw catError;
            setCategory(catData);

            if (catData) {
                // Second: Fetch Posts for this Category ID
                const { data: postsData, error: postsError } = await supabase
                    .from("posts")
                    .select("*, categories(id, name, slug)")
                    .eq("category_id", catData.id)
                    .eq("published", true)
                    .order("created_at", { ascending: false });

                if (postsError) throw postsError;
                setPosts(postsData || []);
            }

        } catch (error) {
            console.error("Error fetching category data:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-slate-900 font-sans flex flex-col">
            <Seo
                title={loading ? "Category" : (category?.name || "Category Not Found")}
                description={loading ? "Browsing category" : `Browsing all articles in ${category?.name}`}
            />
            <Navigation />

            <div className="flex-grow pt-24 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Back Button */}
                    <div className="mb-8">
                        <Button variant="ghost" onClick={() => navigate("/blog")} className="text-slate-600 dark:text-slate-400 hover:text-blue-600 -ml-4">
                            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Blog
                        </Button>
                    </div>

                    {/* Header */}
                    <div className="mb-12 text-center">
                        <div className="inline-flex items-center justify-center p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-4">
                            <Tag className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                            {loading ? "Loading..." : category?.name || "Category Not Found"}
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
                            {loading ? "" : `Browsing all articles in ${category?.name}`}
                        </p>
                    </div>

                    {/* Posts Grid */}
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="h-96 bg-slate-100 dark:bg-slate-800 rounded-2xl animate-pulse"></div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.map((post) => (
                                <Link
                                    key={post.id}
                                    to={`/blog/${post.slug}`}
                                    className="group flex flex-col bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
                                >
                                    <div className="aspect-[16/9] w-full overflow-hidden bg-slate-200 dark:bg-slate-700 relative">
                                        {post.cover_image ? (
                                            <img
                                                src={post.cover_image}
                                                alt={post.title}
                                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-slate-400">
                                                <FileText className="h-12 w-12" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-6 flex flex-col flex-1">
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                                                {category?.name}
                                            </span>
                                            <span className="text-xs text-slate-400 flex items-center">
                                                <Calendar className="h-3 w-3 mr-1" />
                                                {format(new Date(post.created_at), "MMM d, yyyy")}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                            {post.title}
                                        </h3>
                                        {post.excerpt && (
                                            <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-3 mb-4 flex-1">
                                                {post.excerpt}
                                            </p>
                                        )}
                                        <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-700/50 flex items-center text-blue-600 font-medium text-sm group-hover:translate-x-1 transition-transform">
                                            Read Article <ArrowLeft className="h-4 w-4 ml-1 rotate-180" />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}

                    {!loading && posts.length === 0 && (
                        <div className="text-center py-20 bg-slate-50 dark:bg-slate-800 rounded-3xl border border-dashed border-slate-200 dark:border-slate-700">
                            <div className="inline-flex items-center justify-center p-4 bg-slate-100 dark:bg-slate-700 rounded-full mb-4">
                                <FileText className="h-8 w-8 text-slate-400" />
                            </div>
                            <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">No articles found</h3>
                            <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-6">
                                There are no published articles in this category yet.
                            </p>
                            <Link to="/blog">
                                <button className="px-6 py-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-600 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors">
                                    View All Articles
                                </button>
                            </Link>
                        </div>
                    )}

                </div>
            </div>

            <Footer />
        </div>
    );
};

export default CategoryPage;
