
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Post } from "@/types/supabase";
import { format } from "date-fns";

interface BlogCardProps {
    post: Post;
}

const cleanExcerpt = (text: string) => {
    return text
        .replace(/^#\s+[^\n]+\n+/, '')
        .replace(/[#*`_~\[\]]/g, '')
        .replace(/\(https?:\/\/[^\)]+\)/g, '')
        .trim();
};

const BlogCard = ({ post }: BlogCardProps) => {
    const excerptText = post.excerpt || cleanExcerpt(post.content).substring(0, 140) + "...";

    return (
        <Link to={`/blog/${post.slug}`}>
            <Card className="h-full hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                {post.cover_image && (
                    <div className="w-full h-48 overflow-hidden bg-slate-100">
                        <img
                            src={post.cover_image}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                    </div>
                )}
                <CardHeader>
                    <CardTitle className="line-clamp-2 leading-snug">{post.title}</CardTitle>
                    <CardDescription>
                        {format(new Date(post.created_at), "MMM d, yyyy")}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-600 line-clamp-3 text-sm leading-relaxed">
                        {excerptText}
                    </p>
                </CardContent>
                <CardFooter>
                    <span className="text-primary font-medium hover:underline">Read more</span>
                </CardFooter>
            </Card>
        </Link>
    );
};

export default BlogCard;
