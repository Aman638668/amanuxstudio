import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Post } from "@/types/supabase";
import BlogCard from "@/components/BlogCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const RecentBlogs = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRecentPosts();
    }, []);

    const fetchRecentPosts = async () => {
        try {
            const { data, error } = await supabase
                .from("posts")
                .select("*")
                .eq("published", true)
                .order("created_at", { ascending: false })
                .limit(3);

            if (error) throw error;
            setPosts(data || []);
        } catch (error) {
            console.error("Error fetching recent posts:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return null; // Or a loading skeleton, but null is cleaner for homepage initial load
    if (posts.length === 0) return null;

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-12">
                        <div className="text-center md:text-left mb-6 md:mb-0">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                                Recent Updates
                            </h2>
                        </div>
                        <Link to="/blog/#blog">
                            <Button variant="outline" className="group">
                                View All Posts
                                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post) => (
                            <BlogCard key={post.id} post={post} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RecentBlogs;
