import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Post } from "@/types/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { 
  Calendar, 
  Clock, 
  ArrowLeft, 
  Send, 
  ListOrdered, 
  Mail, 
  Target, 
  ChevronRight, 
  Share2, 
  Twitter, 
  Linkedin, 
  Check, 
  Copy,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

// Helper to strip HTML/Markdown tags for meta description
const stripHtml = (html: string) => {
  return html.replace(/<[^>]*>?/gm, '').replace(/[#*`_~\[\]]/g, '').trim();
};

// Helper to clean leading duplicate title from markdown content
const cleanMarkdownContent = (content: string) => {
  if (!content) return "";
  let cleaned = content.trim();
  // Remove leading H1 if it duplicates page title
  cleaned = cleaned.replace(/^#\s+[^\n]+\n+/, '');
  return cleaned;
};

// Calculate dynamic read time based on word count
const getReadTime = (content: string) => {
  if (!content) return "5 min read";
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
};

interface TocItem {
  id: string;
  text: string;
  number?: string;
}

// Extract H2 headings for Table of Contents
const extractToc = (content: string): TocItem[] => {
  if (!content) return [];
  const lines = content.split('\n');
  const items: TocItem[] = [];

  for (const line of lines) {
    const match = line.match(/^##\s+(.+)$/);
    if (match) {
      const rawText = match[1].trim();
      const numMatch = rawText.match(/^(\d+)[\.\)]\s*(.+)$/);
      const text = numMatch ? numMatch[2] : rawText;
      const number = numMatch ? numMatch[1].padStart(2, '0') : undefined;
      const id = rawText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      items.push({ id, text, number });
    }
  }
  return items;
};

type RecentPost = Pick<Post, "title" | "slug" | "created_at" | "cover_image" | "content">;

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [recentPosts, setRecentPosts] = useState<RecentPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeHeadingId, setActiveHeadingId] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState(false);

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  useEffect(() => {
    fetchPost();
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (post?.category_id) {
      fetchRelatedPosts(post.category_id);
    } else {
      fetchRecentPosts();
    }
  }, [slug, post?.category_id]);

  // Active heading observer for ToC scrollspy
  useEffect(() => {
    if (!post?.content) return;

    const timeout = setTimeout(() => {
      const headings = document.querySelectorAll('h2[id]');
      if (headings.length === 0) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveHeadingId(entry.target.id);
            }
          });
        },
        { rootMargin: '-80px 0px -65% 0px' }
      );

      headings.forEach((h) => observer.observe(h));
      return () => observer.disconnect();
    }, 400);

    return () => clearTimeout(timeout);
  }, [post?.content]);

  const fetchPost = async () => {
    try {
      const { data, error } = await supabase
        .from("posts")
        .select("*, categories(id, name, slug)")
        .eq("slug", slug)
        .single();

      if (error) throw error;
      setPost(data);
    } catch (error) {
      console.error("Error fetching post:", error);
      navigate("/404");
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedPosts = async (categoryId: string) => {
    const { data } = await supabase
      .from("posts")
      .select("title, slug, created_at, cover_image, content")
      .eq("published", true)
      .eq("category_id", categoryId)
      .neq("slug", slug)
      .limit(3);

    if (data && data.length > 0) {
      setRecentPosts(data);
    } else {
      fetchRecentPosts();
    }
  };

  const fetchRecentPosts = async () => {
    const { data } = await supabase
      .from("posts")
      .select("title, slug, created_at, cover_image, content")
      .eq("published", true)
      .neq("slug", slug)
      .order("created_at", { ascending: false })
      .limit(3);

    if (data) setRecentPosts(data);
  };

  const handleShare = (platform: 'twitter' | 'linkedin' | 'copy') => {
    if (!post) return;
    const url = window.location.href;
    const text = `Check out this article: ${post.title}`;

    if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      setCopiedLink(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSubscribing(true);
    try {
      await fetch('/api/discord-notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Newsletter Subscriber',
          email: newsletterEmail,
          message: `Subscribed from blog: ${post?.title}`,
          title: '📰 New Blog Newsletter Subscriber'
        })
      });
      toast.success("You're subscribed! We'll send actionable UX & dev tips.");
      setNewsletterEmail('');
    } catch (err) {
      toast.error('Could not subscribe. Please try again.');
    } finally {
      setIsSubscribing(false);
    }
  };

  const scrollToHeading = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveHeadingId(id);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0F19] text-white flex flex-col justify-center items-center">
        <div className="w-10 h-10 border-3 border-purple-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-slate-400 font-medium text-sm">Loading Article...</p>
      </div>
    );
  }

  if (!post) return null;

  const metaDescription = post.meta_description || post.excerpt || stripHtml(post.content).substring(0, 160) + "...";
  const metaTitle = post.meta_title || post.title;
  const readTime = getReadTime(post.content);
  const formattedDate = format(new Date(post.created_at), "MMM d, yyyy");
  const tocItems = extractToc(post.content);
  const categoryName = post.categories?.name || "Web & UX";

  return (
    <div className="min-h-screen bg-[#FAFBFD] dark:bg-slate-950 font-sans flex flex-col text-slate-800 dark:text-slate-100">
      <Seo
        title={metaTitle}
        description={metaDescription}
        image={post.cover_image || undefined}
        url={`/blog/${post.slug}`}
        type="article"
        keywords={post.meta_keywords}
        publishedTime={post.created_at}
        author="Aman Sharma"
      />

      <Navigation />

      {/* =========================================================================
          HERO SECTION: Dark Modern Header Matching User Mockup
         ========================================================================= */}
      <header className="relative bg-[#0B0F19] text-white pt-28 pb-16 lg:py-24 border-b border-slate-800/80 overflow-hidden">
        {/* Ambient Glow Orbs */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-10 left-10 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm text-slate-400 font-medium mb-6 flex-wrap">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <Link to="/blog" className="hover:text-white transition-colors">Blog</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-slate-300 truncate max-w-[240px] sm:max-w-md">{post.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Post Title, Excerpt & Author Info */}
            <div className="lg:col-span-7">
              {/* Category Pill Badge */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-purple-500/10 text-purple-300 border border-purple-500/30 mb-5">
                <Sparkles className="w-3 h-3 text-purple-400" />
                {categoryName}
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.15] mb-5">
                {post.title}
              </h1>

              {/* Subheading / Excerpt */}
              {post.excerpt && (
                <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl font-normal">
                  {post.excerpt}
                </p>
              )}

              {/* Author & Meta Row */}
              <div className="flex flex-wrap items-center gap-6 pt-2 border-t border-slate-800/80 text-xs sm:text-sm">
                {/* Author Avatar & Info */}
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center font-bold text-white shadow-lg ring-2 ring-purple-400/30 text-sm">
                    AS
                  </div>
                  <div>
                    <span className="block font-bold text-white leading-tight">Aman Sharma</span>
                    <span className="block text-xs text-slate-400">Web Developer &amp; UX Specialist</span>
                  </div>
                </div>

                <div className="h-6 w-px bg-slate-800 hidden sm:block" />

                {/* Read Time */}
                <div className="flex items-center gap-1.5 text-slate-300">
                  <Clock className="w-4 h-4 text-purple-400" />
                  <span>{readTime}</span>
                </div>

                {/* Published Date */}
                <div className="flex items-center gap-1.5 text-slate-300">
                  <Calendar className="w-4 h-4 text-purple-400" />
                  <span>{formattedDate}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Graphic / Mockup Showcase */}
            <div className="lg:col-span-5 hidden lg:block">
              <div className="relative group">
                <div className="absolute -inset-1.5 bg-gradient-to-r from-purple-600/40 via-blue-600/30 to-purple-800/40 rounded-3xl blur-2xl opacity-60 group-hover:opacity-80 transition duration-700" />
                
                <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-slate-900 aspect-video flex flex-col justify-between">
                  {/* Browser Mockup Top Bar */}
                  <div className="bg-slate-950/90 px-4 py-2.5 border-b border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    </div>
                    <div className="text-[11px] text-slate-400 bg-slate-900/90 px-3 py-0.5 rounded-full border border-white/5 font-mono truncate max-w-[220px]">
                      amanuxstudio.com/blog
                    </div>
                    <div className="w-10" />
                  </div>

                  {/* Visual Content */}
                  {post.cover_image ? (
                    <img
                      src={post.cover_image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950">
                      <div className="w-14 h-14 rounded-2xl bg-purple-600/20 text-purple-400 flex items-center justify-center mb-3 border border-purple-500/30">
                        <Sparkles className="w-7 h-7" />
                      </div>
                      <span className="text-white font-bold text-base mb-1">{post.title}</span>
                      <span className="text-xs text-purple-300">Engineering &amp; UX Analysis</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* =========================================================================
          MAIN BODY: Airy, Spacious 2-Column Layout
         ========================================================================= */}
      <main className="flex-grow py-14 lg:py-20">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            {/* -------------------------------------------------------------
                LEFT COLUMN (Content Body)
               ------------------------------------------------------------- */}
            <article className="lg:col-span-8 space-y-8">
              {/* Social Sharing Bar */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-200/80 dark:border-slate-800">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  <Share2 className="w-3.5 h-3.5" />
                  Share Article
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleShare('twitter')}
                    className="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-purple-600 hover:border-purple-300 flex items-center justify-center transition-all shadow-sm"
                    title="Share on X / Twitter"
                  >
                    <Twitter className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleShare('linkedin')}
                    className="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-purple-600 hover:border-purple-300 flex items-center justify-center transition-all shadow-sm"
                    title="Share on LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleShare('copy')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-purple-600 hover:border-purple-300 transition-all text-xs font-medium shadow-sm"
                    title="Copy link"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedLink ? "Copied!" : "Copy Link"}</span>
                  </button>
                </div>
              </div>

              {/* Markdown Content Area */}
              <div className="blog-content-body max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                  components={{
                    // Custom H2 with Purple Number Badges / Vertical Accent
                    h2: ({ node, ...props }) => {
                      const headingText = String(props.children);
                      const id = headingText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                      const numMatch = headingText.match(/^(\d+)[\.\)]\s*(.+)$/);

                      if (numMatch) {
                        const num = numMatch[1].padStart(2, '0');
                        const title = numMatch[2];
                        return (
                          <div className="mt-14 mb-6 pt-2">
                            <h2 id={id} className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white scroll-mt-28 flex items-center gap-3.5">
                              <span className="w-9 h-9 rounded-xl bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 font-bold text-sm flex items-center justify-center flex-shrink-0 border border-purple-200 dark:border-purple-800 shadow-sm">
                                {num}
                              </span>
                              <span className="leading-tight">{title}</span>
                            </h2>
                          </div>
                        );
                      }

                      return (
                        <h2 id={id} className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-14 mb-6 pt-2 scroll-mt-28 flex items-center leading-tight">
                          <span className="w-1.5 h-8 bg-purple-600 rounded-full mr-3.5 flex-shrink-0" />
                          <span>{props.children}</span>
                        </h2>
                      );
                    },

                    // Custom H3
                    h3: ({ node, ...props }) => (
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
                        {props.children}
                      </h3>
                    ),

                    // Airy, Non-Congested Paragraphs
                    p: ({ node, ...props }) => (
                      <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-[1.85] mb-6 font-normal">
                        {props.children}
                      </p>
                    ),

                    // Custom Purple Highlight / Callout Box
                    blockquote: ({ node, ...props }) => (
                      <div className="my-10 p-6 sm:p-7 rounded-2xl bg-purple-50/80 dark:bg-purple-950/20 border border-purple-200/80 dark:border-purple-900/50 shadow-sm flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-purple-200 dark:shadow-none">
                          <Target className="w-5 h-5" />
                        </div>
                        <div className="text-purple-950 dark:text-purple-200 text-base sm:text-lg leading-relaxed font-medium not-italic">
                          {props.children}
                        </div>
                      </div>
                    ),

                    // Unordered Lists with Purple Bullet Dots
                    ul: ({ node, ...props }) => (
                      <ul className="space-y-3.5 my-6 pl-1">
                        {props.children}
                      </ul>
                    ),

                    li: ({ node, ...props }) => (
                      <li className="flex items-start text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                        <span className="w-2 h-2 rounded-full bg-purple-600 mt-2.5 mr-3.5 flex-shrink-0" />
                        <span className="flex-1">{props.children}</span>
                      </li>
                    ),

                    // Bold text
                    strong: ({ node, ...props }) => (
                      <strong className="font-bold text-slate-900 dark:text-white">
                        {props.children}
                      </strong>
                    ),

                    // Styled Links
                    a: ({ node, ...props }) => (
                      <a
                        {...props}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-600 dark:text-purple-400 font-semibold underline underline-offset-4 hover:text-purple-800 dark:hover:text-purple-300 transition-colors"
                      />
                    ),

                    // Code Blocks
                    pre: ({ node, ...props }) => (
                      <pre className="bg-slate-950 text-slate-100 p-5 rounded-2xl overflow-x-auto my-8 border border-slate-800 text-sm font-mono shadow-lg leading-relaxed" {...props} />
                    ),

                    code: ({ node, ...props }) => (
                      <code className="text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/50 px-1.5 py-0.5 rounded text-sm font-mono font-medium" {...props} />
                    ),

                    // Tables
                    table: ({ node, ...props }) => (
                      <div className="overflow-x-auto my-8 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
                        <table {...props} className="min-w-full divide-y divide-slate-200 dark:divide-slate-800 text-sm" />
                      </div>
                    ),
                    th: ({ node, ...props }) => (
                      <th {...props} className="bg-slate-100 dark:bg-slate-800 px-5 py-3.5 text-left font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider text-xs" />
                    ),
                    td: ({ node, ...props }) => (
                      <td {...props} className="px-5 py-3.5 border-t border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300" />
                    ),

                    // Lazy Images
                    img: ({ node, ...props }) => (
                      <img {...props} loading="lazy" className="rounded-2xl shadow-md my-8 w-full object-cover max-h-[520px] border border-slate-200/80" />
                    )
                  }}
                >
                  {cleanMarkdownContent(post.content)}
                </ReactMarkdown>
              </div>

              {/* Tags / Keywords */}
              {post.meta_keywords && (
                <div className="pt-8 border-t border-slate-200/80 dark:border-slate-800">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Topic Keywords:</p>
                  <div className="flex flex-wrap gap-2">
                    {post.meta_keywords.split(',').map((tag, i) => (
                      <span key={i} className="text-xs bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-lg border border-slate-200/60 dark:border-slate-700 font-medium">
                        #{tag.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Bottom Project Inquiry CTA Box */}
              <div className="mt-12 p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-purple-900 via-indigo-950 to-slate-950 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
                
                <div className="relative z-10 max-w-2xl">
                  <span className="text-purple-300 font-semibold text-xs tracking-wider uppercase mb-2 block">
                    Have a project in mind?
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 leading-snug">
                    Turn UX Flaws into High-Converting Customer Journeys
                  </h3>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                    Whether launching a new corporate platform, an e-commerce storefront, or improving your current website conversions — let's build it right.
                  </p>
                  <Link to="/contact">
                    <Button size="lg" className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-7 py-6 rounded-xl shadow-lg shadow-purple-900/50">
                      Request a Free Consultation <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </article>

            {/* -------------------------------------------------------------
                RIGHT COLUMN (Sticky Sidebar Matching User Mockup)
               ------------------------------------------------------------- */}
            <aside className="lg:col-span-4 space-y-8 lg:sticky lg:top-24">

              {/* 1. TABLE OF CONTENTS */}
              {tocItems.length > 0 && (
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
                    <ListOrdered className="w-5 h-5 text-purple-600" />
                    <h3 className="font-bold text-slate-900 dark:text-white text-base">
                      Table of Contents
                    </h3>
                  </div>

                  <nav className="space-y-1.5 text-sm">
                    {tocItems.map((item) => {
                      const isActive = activeHeadingId === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => scrollToHeading(item.id)}
                          className={`w-full text-left px-3 py-2 rounded-xl transition-all flex items-center gap-2.5 ${
                            isActive
                              ? "bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 font-bold border border-purple-200/60 dark:border-purple-800/60"
                              : "text-slate-600 dark:text-slate-400 hover:text-purple-600 hover:bg-slate-50 dark:hover:bg-slate-800/60 font-medium"
                          }`}
                        >
                          <span className={`w-2 h-2 rounded-full flex-shrink-0 ${isActive ? "bg-purple-600" : "bg-slate-300 dark:bg-slate-600"}`} />
                          <span className="truncate">{item.text}</span>
                        </button>
                      );
                    })}
                  </nav>
                </div>
              )}

              {/* 2. NEWSLETTER / LEAD CAPTURE: "Get UX insights in your inbox" */}
              <div className="rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white p-6 sm:p-7 shadow-xl border border-slate-800 relative overflow-hidden">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center mb-4 border border-purple-500/30">
                  <Mail className="w-5 h-5" />
                </div>

                <h3 className="text-xl font-bold text-white mb-2 leading-tight">
                  Get UX insights in your inbox
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-5">
                  Actionable design tips, case studies, and conversion strategies — no spam.
                </p>

                <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      required
                      className="bg-slate-900/90 border-slate-700 text-white placeholder:text-slate-500 text-sm h-11 rounded-xl focus:border-purple-500"
                    />
                    <Button
                      type="submit"
                      disabled={isSubscribing}
                      className="h-11 px-4 bg-purple-600 hover:bg-purple-500 text-white rounded-xl shadow-md flex-shrink-0 transition-colors"
                      title="Subscribe"
                    >
                      {isSubscribing ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </form>
              </div>

              {/* 3. RELATED ARTICLES */}
              {recentPosts.length > 0 && (
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm">
                  <div className="flex items-center mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
                    <span className="w-1.5 h-5 bg-purple-600 rounded-full mr-2.5 flex-shrink-0" />
                    <h3 className="font-bold text-slate-900 dark:text-white text-base">
                      Related Articles
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {recentPosts.map((recent) => (
                      <Link
                        key={recent.slug}
                        to={`/blog/${recent.slug}`}
                        className="group flex gap-3.5 p-2 -mx-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                      >
                        {recent.cover_image ? (
                          <div className="w-16 h-16 flex-shrink-0 rounded-xl overflow-hidden bg-slate-100 border border-slate-200/60">
                            <img
                              src={recent.cover_image}
                              alt={recent.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            />
                          </div>
                        ) : (
                          <div className="w-16 h-16 flex-shrink-0 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 flex items-center justify-center font-bold text-xs border border-purple-100 dark:border-purple-900">
                            UX
                          </div>
                        )}

                        <div className="flex-grow min-w-0">
                          <h4 className="font-bold text-slate-800 dark:text-slate-100 group-hover:text-purple-600 transition-colors line-clamp-2 text-xs sm:text-sm leading-snug mb-1">
                            {recent.title}
                          </h4>
                          <div className="flex items-center gap-1 text-[11px] text-slate-400">
                            <Clock className="w-3 h-3 text-slate-400" />
                            <span>{getReadTime(recent.content)}</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

            </aside>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;
