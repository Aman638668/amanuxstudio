
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Post } from "@/types/supabase";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Edit, Trash2, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const PostList = ({ onEdit }: { onEdit: (post: Post) => void }) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const { data, error } = await supabase
                .from("posts")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) throw error;
            setPosts(data || []);
        } catch (error) {
            console.error("Error fetching posts:", error);
            toast.error("Failed to load posts");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (postId: string) => {
        if (!confirm("Are you sure you want to delete this post?")) return;

        try {
            const { error } = await supabase
                .from("posts")
                .delete()
                .eq("id", postId);

            if (error) throw error;

            setPosts(posts.filter(p => p.id !== postId));
            toast.success("Post deleted successfully");
        } catch (error) {
            console.error("Error deleting post:", error);
            toast.error("Failed to delete post");
        }
    };

    if (loading) return <div className="p-4 text-center text-slate-500">Loading posts...</div>;

    return (
        <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow className="border-slate-200 dark:border-slate-700 hover:bg-transparent">
                        <TableHead className="w-[400px] text-slate-500 dark:text-slate-400 font-semibold">Title</TableHead>
                        <TableHead className="text-slate-500 dark:text-slate-400 font-semibold">Status</TableHead>
                        <TableHead className="text-slate-500 dark:text-slate-400 font-semibold">Date</TableHead>
                        <TableHead className="text-right text-slate-500 dark:text-slate-400 font-semibold">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {posts.map((post) => (
                        <TableRow key={post.id} className="border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                            <TableCell className="font-medium">
                                <span className="block text-slate-800 dark:text-gray-100 text-base">{post.title}</span>
                                <span className="block text-xs text-slate-400 truncate max-w-[300px] mt-1">{post.slug}</span>
                            </TableCell>
                            <TableCell>
                                <Badge variant={post.published ? "default" : "secondary"} className={post.published ? "bg-green-500 hover:bg-green-600" : "bg-slate-400"}>
                                    {post.published ? "Published" : "Draft"}
                                </Badge>
                            </TableCell>
                            <TableCell className="text-slate-600 dark:text-slate-300">
                                {format(new Date(post.created_at), "MMM d, yyyy")}
                            </TableCell>
                            <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                    <Button variant="ghost" size="icon" onClick={() => window.open(`/blog/${post.slug}`, '_blank')} className="text-slate-500 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                                        <ExternalLink className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" onClick={() => onEdit(post)} className="text-slate-500 hover:text-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20">
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" onClick={() => handleDelete(post.id)} className="text-slate-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                    {posts.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center text-slate-500 h-24">
                                No posts found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default PostList;
