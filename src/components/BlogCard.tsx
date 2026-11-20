import { Link } from "react-router-dom";
import { Post } from "@/types/supabase";
import { format } from "date-fns";
import { ArrowUpRight, Clock, Sparkles } from "lucide-react";

interface BlogCardProps {
  post: Post;
}

const cleanExcerpt = (text: string) => {
  return text
    .replace(/^#\s+[^\n]+\n+/, "")
    .replace(/[#*`_~\[\]]/g, "")
    .replace(/\(https?:\/\/[^\)]+\)/g, "")
    .trim();
};

const getReadingTime = (content: string) => {
  if (!content) return "5 min read";
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
};

const BlogCard = ({ post }: BlogCardProps) => {
  const excerptText =
    post.excerpt || cleanExcerpt(post.content).substring(0, 130) + "...";
  const readingTime = getReadingTime(post.content);
  const categoryName = post.categories?.name || "Web Development & UX";

  return (
    <Link to={`/blog/${post.slug}`} className="group block h-full">
      <article className="h-full flex flex-col rounded-2xl bg-[#0e0e14] border border-white/10 overflow-hidden hover:border-blue-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-950/30">
        {/* Cover Image Container */}
        {post.cover_image ? (
          <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#14141e]">
            <img
              src={post.cover_image}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e14] via-transparent to-transparent opacity-80" />
            <div className="absolute top-3.5 left-3.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider font-semibold bg-black/70 backdrop-blur-md text-blue-300 border border-blue-500/30 shadow-md">
                <Sparkles className="w-3 h-3 text-blue-400" />
                {categoryName}
              </span>
            </div>
          </div>
        ) : (
          <div className="relative w-full aspect-[16/9] bg-gradient-to-br from-[#12121c] to-[#1a1a28] p-6 flex flex-col justify-between border-b border-white/5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider font-semibold bg-blue-500/10 text-blue-300 border border-blue-500/30 w-fit">
              <Sparkles className="w-3 h-3 text-blue-400" />
              {categoryName}
            </span>
            <div className="flex items-center gap-2 text-xs font-mono text-[#94a3b8]">
              <Clock className="w-3.5 h-3.5 text-blue-400" />
              <span>{readingTime}</span>
            </div>
          </div>
        )}

        {/* Article Body */}
        <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
          <div>
            {/* Meta row when image exists */}
            {post.cover_image && (
              <div className="flex items-center gap-3 text-xs font-mono text-[#94a3b8] mb-3">
                <span className="text-[#94a3b8]">
                  {format(new Date(post.created_at), "MMM d, yyyy")}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-blue-400">
                  <Clock className="w-3 h-3" />
                  {readingTime}
                </span>
              </div>
            )}

            <h3 className="text-xl sm:text-2xl font-bold text-[#eeece8] group-hover:text-white group-hover:text-blue-300 transition-colors duration-200 leading-snug tracking-tight mb-3 line-clamp-2">
              {post.title}
            </h3>

            <p className="text-[#94a3b8] text-sm leading-relaxed line-clamp-3 mb-6">
              {excerptText}
            </p>
          </div>

          {/* Footer Action */}
          <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono font-medium">
            <span className="text-blue-400 group-hover:text-blue-300 inline-flex items-center gap-1">
              Read Article
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
            <span className="text-[#64748b]">By Aman Sharma</span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default BlogCard;
