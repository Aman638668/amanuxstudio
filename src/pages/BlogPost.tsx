import { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { format } from "date-fns";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { toast } from "sonner";
import {
  Calendar,
  Clock,
  ListOrdered,
  ChevronRight,
  Share2,
  Twitter,
  Linkedin,
  Check,
  Copy,
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Code2,
  Layers,
  BookOpen,
  ArrowLeft,
  Mail,
  Zap,
  ShieldCheck,
  UserCheck
} from "lucide-react";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { Post } from "@/types/supabase";
import { CURATED_BLOG_POSTS } from "@/data/blogArticles";

// Helper to strip HTML/Markdown tags for meta descriptions
const stripHtml = (html: string) => {
  return html.replace(/<[^>]*>?/gm, '').replace(/[#*`_~\[\]]/g, '').trim();
};

// Calculate dynamic read time based on word count
const getReadTime = (content: string) => {
  if (!content) return "5 min read";
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
};

// Word counter
const getWordCount = (content: string) => {
  if (!content) return 0;
  return content.trim().split(/\s+/).length;
};

interface TocItem {
  id: string;
  text: string;
  level: number;
}

// Extract H2 and H3 headings for the interactive Table of Contents
const extractToc = (content: string): TocItem[] => {
  if (!content) return [];
  const lines = content.split('\n');
  const items: TocItem[] = [];

  for (const line of lines) {
    const h2Match = line.match(/^##\s+(.+)$/);
    if (h2Match) {
      const rawText = h2Match[1].trim();
      const id = rawText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      items.push({ id, text: rawText, level: 2 });
      continue;
    }

    const h3Match = line.match(/^###\s+(.+)$/);
    if (h3Match) {
      const rawText = h3Match[1].trim();
      const id = rawText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      items.push({ id, text: rawText, level: 3 });
    }
  }
  return items;
};

// Interactive Code Block Component with Copy to Clipboard & Terminal Header
const CodeBlock = ({ inline, className, children, ...props }: any) => {
  const [copied, setCopied] = useState(false);
  const match = /language-(\w+)/.exec(className || '');
  const language = match ? match[1] : '';
  const codeString = String(children).replace(/\n$/, '');

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    toast.success("Code copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  if (inline) {
    return (
      <code className="text-blue-300 bg-blue-950/40 border border-blue-500/25 px-1.5 py-0.5 rounded text-[13px] font-mono font-medium" {...props}>
        {children}
      </code>
    );
  }

  return (
    <div className="relative my-8 rounded-2xl bg-[#07080c] border border-white/10 overflow-hidden shadow-2xl group">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#0e0e14] border-b border-white/10 text-xs font-mono text-[#94a3b8]">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          <span className="ml-2 text-[11px] text-[#64748b] uppercase tracking-wider">{language || "terminal"}</span>
        </div>
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-[#94a3b8] hover:text-white transition-all text-[11px] font-mono border border-white/5"
          title="Copy code"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Text Area */}
      <pre className="p-5 overflow-x-auto text-xs sm:text-sm font-mono text-[#e2e8f0] leading-relaxed scrollbar-thin">
        <code>{children}</code>
      </pre>
    </div>
  );
};

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeHeadingId, setActiveHeadingId] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  // Scroll progress listener
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        setScrollProgress((totalScroll / windowHeight) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    fetchPost();
    window.scrollTo(0, 0);
  }, [slug]);

  // Active heading observer for ToC scroll-spy
  useEffect(() => {
    if (!post?.content) return;

    const timeout = setTimeout(() => {
      const headings = document.querySelectorAll('article h2[id], article h3[id]');
      if (headings.length === 0) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveHeadingId(entry.target.id);
            }
          });
        },
        { rootMargin: '-100px 0px -65% 0px' }
      );

      headings.forEach((h) => observer.observe(h));
      return () => observer.disconnect();
    }, 300);

    return () => clearTimeout(timeout);
  }, [post?.content]);

  const fetchPost = async () => {
    try {
      // 1. Check curated high-value articles first
      const curatedMatch = CURATED_BLOG_POSTS.find((p) => p.slug === slug);
      if (curatedMatch) {
        setPost(curatedMatch);
        // Find other curated articles for related list
        setRecentPosts(CURATED_BLOG_POSTS.filter(p => p.slug !== slug).slice(0, 3));
        setLoading(false);
        return;
      }

      // 2. Query Supabase
      const { data, error } = await supabase
        .from("posts")
        .select("*, categories(id, name, slug)")
        .eq("slug", slug)
        .single();

      if (error || !data) {
        console.warn("Post not found in database, navigating to /blog");
        navigate("/blog");
        return;
      }

      setPost(data);
      // Related posts
      setRecentPosts(CURATED_BLOG_POSTS.slice(0, 3));
    } catch (error) {
      console.error("Error fetching post:", error);
      navigate("/blog");
    } finally {
      setLoading(false);
    }
  };

  const handleShare = (platform: 'twitter' | 'linkedin' | 'copy') => {
    if (!post) return;
    const url = window.location.href;
    const text = `${post.title} — by Aman Sharma (@amanuxstudio)`;

    if (platform === 'twitter') {
      window.open(`https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      setCopiedLink(true);
      toast.success("Article link copied to clipboard!");
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      toast.error('Please enter a valid work email address');
      return;
    }

    setIsSubscribing(true);
    try {
      await fetch('/api/discord-notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Journal Subscriber',
          email: newsletterEmail,
          message: `Subscribed from: ${post?.title}`,
          title: '📰 New Journal Subscriber'
        })
      });
      toast.success("Thank you! You're subscribed to technical breakdowns and web performance insights.");
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

  const tocItems = useMemo(() => {
    return post?.content ? extractToc(post.content) : [];
  }, [post?.content]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#09090c] text-white flex flex-col justify-between font-sans">
        <Navigation />
        <div className="flex-grow flex items-center justify-center py-32">
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-xs font-mono tracking-widest text-[#94a3b8] uppercase">Loading Article...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) return null;

  const metaDescription = post.meta_description || post.excerpt || stripHtml(post.content).substring(0, 160) + "...";
  const metaTitle = post.meta_title || post.title;
  const readTime = getReadTime(post.content);
  const wordCount = getWordCount(post.content);
  const formattedDate = format(new Date(post.created_at), "MMMM d, yyyy");
  const categoryName = post.categories?.name || "Web Engineering & UI/UX";

  return (
    <div className="min-h-screen bg-[#09090c] font-sans flex flex-col text-[#eeece8] selection:bg-blue-600/30 selection:text-white relative">
      {/* Sticky Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 h-[2.5px] bg-gradient-to-r from-blue-600 via-cyan-400 to-emerald-400 z-[120] transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />

      <Seo
        title={metaTitle}
        description={metaDescription}
        image={post.cover_image || undefined}
        url={`/blog/${post.slug}`}
        type="article"
        keywords={post.meta_keywords}
        publishedTime={post.created_at}
        author="Aman Sharma"
        category={categoryName}
      />

      <div className="ambient-grain" aria-hidden="true" />
      <Navigation />

      {/* =========================================================================
          HERO SECTION: High-Craft Editorial Publication Masthead
         ========================================================================= */}
      <header className="relative pt-32 pb-14 lg:pt-36 lg:pb-16 border-b border-white/10 bg-[#09090c] overflow-hidden">
        {/* Ambient atmospheric gradients */}
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[400px] bg-blue-600/10 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-[350px] h-[300px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          
          {/* Breadcrumb Path */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-[#94a3b8] mb-8 flex-wrap">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#475569]" />
            <Link to="/blog" className="hover:text-white transition-colors">Engineering Journal</Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#475569]" />
            <span className="text-blue-400">{categoryName}</span>
          </nav>

          {/* Category Badge & Meta Metrics */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-mono uppercase tracking-wider font-semibold bg-blue-500/10 text-blue-300 border border-blue-500/30">
              <Sparkles className="w-3 h-3 text-blue-400" />
              <span>{categoryName}</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-xs font-mono text-[#94a3b8]">
              <Clock className="w-3 h-3 text-blue-400" />
              <span>{readTime}</span>
              <span className="text-white/20">•</span>
              <span>{wordCount.toLocaleString()} words</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-xs font-mono text-[#94a3b8]">
              <Calendar className="w-3 h-3 text-blue-400" />
              <span>{formattedDate}</span>
            </div>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#eeece8] leading-[1.1] mb-6 max-w-5xl">
            {post.title}
          </h1>

          {/* Subtitle / Excerpt */}
          {post.excerpt && (
            <p className="text-lg sm:text-xl text-[#94a3b8] leading-relaxed max-w-4xl font-normal mb-8">
              {post.excerpt}
            </p>
          )}

          {/* Verified Author & Credibility Row */}
          <div className="flex flex-wrap items-center justify-between gap-6 pt-6 border-t border-white/10">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-sky-500 p-0.5 shadow-lg shadow-blue-600/20">
                <div className="w-full h-full bg-[#0e0e14] rounded-[14px] flex items-center justify-center text-white font-bold text-sm font-mono">
                  AS
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#eeece8] text-sm">Aman Sharma</span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    <UserCheck className="w-3 h-3" /> Verified Author
                  </span>
                </div>
                <p className="text-xs font-mono text-[#64748b] mt-0.5">
                  Web Developer &amp; UI/UX Designer · 50+ Production Sites
                </p>
              </div>
            </div>

            {/* Quick Share Buttons */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[#64748b] uppercase tracking-wider mr-2 hidden sm:inline">Share:</span>
              <button
                onClick={() => handleShare('twitter')}
                className="w-9 h-9 rounded-xl border border-white/10 bg-[#0e0e14] text-[#94a3b8] hover:text-white hover:border-blue-500/40 flex items-center justify-center transition-all shadow-sm"
                title="Share on X"
              >
                <Twitter className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleShare('linkedin')}
                className="w-9 h-9 rounded-xl border border-white/10 bg-[#0e0e14] text-[#94a3b8] hover:text-white hover:border-blue-500/40 flex items-center justify-center transition-all shadow-sm"
                title="Share on LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleShare('copy')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-white/10 bg-[#0e0e14] text-[#94a3b8] hover:text-white hover:border-blue-500/40 transition-all text-xs font-mono shadow-sm"
                title="Copy article link"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? "Copied!" : "Copy Link"}</span>
              </button>
            </div>
          </div>

        </div>
      </header>

      {/* =========================================================================
          MAIN EDITORIAL BODY: Magazine 2-Column Split
         ========================================================================= */}
      <main className="flex-grow py-12 lg:py-20">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            {/* -------------------------------------------------------------
                LEFT / MAIN READING COLUMN (Article Flow)
               ------------------------------------------------------------- */}
            <article className="lg:col-span-8 max-w-[780px] w-full">

              {/* Framed Editorial Cover Image */}
              {post.cover_image && (
                <div className="mb-12 rounded-3xl overflow-hidden border border-white/10 bg-[#0e0e14] shadow-2xl relative group">
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#09090c]">
                    <img
                      src={post.cover_image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                      loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#09090c] via-transparent to-transparent opacity-40" />
                  </div>
                  <div className="p-4 bg-[#0e0e14] border-t border-white/5 flex items-center justify-between text-xs font-mono text-[#64748b]">
                    <span>Cover Architecture // {categoryName}</span>
                    <span className="text-blue-400 font-semibold">Aman UX Studio Research</span>
                  </div>
                </div>
              )}

              {/* Executive Summary / TL;DR Box */}
              <div className="mb-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-blue-950/20 via-[#0e0e14] to-[#09090c] border border-blue-500/30 shadow-xl relative overflow-hidden">
                <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-widest text-blue-400 mb-3">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>EXECUTIVE SUMMARY // CORE TAKEAWAYS</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#eeece8] mb-3 leading-snug">
                  What You Will Learn in This Technical Breakdown
                </h3>
                <ul className="space-y-2.5 text-sm sm:text-base text-[#cbd5e1] font-normal">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                    <span>How architectural performance choices directly impact conversion rates and organic search indexing.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                    <span>Actionable step-by-step code and server configurations tested across 50+ production deployments.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                    <span>Real-world case study benchmarks from active client platforms (Fairease, Ireshh, Expert VUW).</span>
                  </li>
                </ul>
              </div>

              {/* Enhanced ReactMarkdown Body */}
              <div className="blog-article-content space-y-6 text-base sm:text-lg leading-[1.85] text-[#cbd5e1] font-normal">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                  components={{
                    h2: ({ node, ...props }) => {
                      const headingText = String(props.children);
                      const id = headingText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                      return (
                        <div className="pt-12 mb-6">
                          <h2
                            id={id}
                            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#eeece8] tracking-tight scroll-mt-28 flex items-center leading-tight border-b border-white/10 pb-4"
                          >
                            <span className="w-2 h-7 bg-blue-500 rounded-full mr-3.5 inline-block shrink-0 shadow-md shadow-blue-500/40" />
                            <span>{props.children}</span>
                          </h2>
                        </div>
                      );
                    },
                    h3: ({ node, ...props }) => {
                      const headingText = String(props.children);
                      const id = headingText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                      return (
                        <div className="pt-8 mb-4">
                          <h3
                            id={id}
                            className="text-xl sm:text-2xl font-bold text-[#eeece8] tracking-tight scroll-mt-28 flex items-center leading-snug"
                          >
                            <span className="w-1.5 h-5 bg-cyan-400 rounded-full mr-3 inline-block shrink-0" />
                            <span>{props.children}</span>
                          </h3>
                        </div>
                      );
                    },
                    p: ({ node, ...props }) => (
                      <p className="text-base sm:text-[18px] text-[#cbd5e1] leading-[1.85] mb-6 font-normal">
                        {props.children}
                      </p>
                    ),
                    blockquote: ({ node, ...props }) => (
                      <div className="my-8 rounded-2xl bg-gradient-to-r from-blue-950/30 via-[#0e0e14] to-transparent border-l-4 border-blue-500 p-6 sm:p-7 shadow-lg">
                        <div className="flex items-start gap-4">
                          <span className="text-3xl text-blue-400 font-serif leading-none select-none">“</span>
                          <div className="text-base sm:text-lg text-[#e2e8f0] font-medium leading-relaxed not-italic">
                            {props.children}
                          </div>
                        </div>
                      </div>
                    ),
                    ul: ({ node, ...props }) => (
                      <ul className="space-y-3 my-6 pl-2">{props.children}</ul>
                    ),
                    ol: ({ node, ...props }) => (
                      <ol className="space-y-3 my-6 pl-2 list-decimal list-inside">{props.children}</ol>
                    ),
                    li: ({ node, ...props }) => (
                      <li className="flex items-start text-base sm:text-[17px] text-[#cbd5e1] leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2.5 mr-3 shrink-0" />
                        <span className="flex-1">{props.children}</span>
                      </li>
                    ),
                    strong: ({ node, ...props }) => (
                      <strong className="font-bold text-white">{props.children}</strong>
                    ),
                    em: ({ node, ...props }) => (
                      <em className="text-white/90 italic">{props.children}</em>
                    ),
                    a: ({ node, ...props }) => (
                      <a
                        {...props}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 font-medium underline underline-offset-4 hover:text-blue-300 transition-colors inline-flex items-center gap-0.5"
                      />
                    ),
                    table: ({ node, ...props }) => (
                      <div className="overflow-x-auto my-8 rounded-2xl border border-white/10 bg-[#0e0e14] shadow-xl">
                        <table className="w-full text-left text-sm text-[#cbd5e1]" {...props} />
                      </div>
                    ),
                    thead: ({ node, ...props }) => (
                      <thead className="bg-[#14141e] text-xs font-mono uppercase tracking-wider text-[#94a3b8] border-b border-white/10" {...props} />
                    ),
                    th: ({ node, ...props }) => (
                      <th className="px-5 py-3.5 font-bold" {...props} />
                    ),
                    td: ({ node, ...props }) => (
                      <td className="px-5 py-3.5 border-b border-white/5 font-normal" {...props} />
                    ),
                    code: CodeBlock,
                    hr: () => (
                      <hr className="my-12 border-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                    )
                  }}
                >
                  {post.content}
                </ReactMarkdown>
              </div>

              {/* Topic Tag Pills */}
              {post.meta_keywords && (
                <div className="mt-14 pt-8 border-t border-white/10">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#64748b] mb-4">
                    <Layers className="w-3.5 h-3.5 text-blue-400" />
                    <span>Indexed Topic Keywords</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {post.meta_keywords.split(',').map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs font-mono bg-[#0e0e14] text-[#94a3b8] px-3.5 py-1.5 rounded-xl border border-white/10 hover:border-blue-500/30 hover:text-white transition-all"
                      >
                        #{tag.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Author Bio Box */}
              <div className="mt-14 p-8 rounded-3xl bg-[#0e0e14] border border-white/10 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-mono font-bold text-lg shadow-xl shrink-0">
                  AS
                </div>
                <div className="space-y-2 flex-grow">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <h4 className="text-lg font-bold text-white">Written by Aman Sharma</h4>
                    <Link
                      to="/resume"
                      className="text-xs font-mono text-blue-400 hover:text-blue-300 inline-flex items-center gap-1"
                    >
                      View Executive Resume <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                  <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed">
                    Lead developer &amp; designer at Aman UX Studio. Specializing in high-converting custom WordPress development, sub-second WooCommerce performance, and frictionless UI/UX systems.
                  </p>
                </div>
              </div>

              {/* High-Intent Lead Magnet: Free 5-Minute Video Teardown */}
              <div className="mt-14 p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#10101c] via-[#0e0e14] to-[#09090c] border border-blue-500/30 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

                <div className="relative z-10 max-w-2xl space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-xs font-mono uppercase tracking-widest text-blue-400">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <span>Free Video Teardown for Founders</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#eeece8] leading-tight">
                    Is Your Website Leaking Sales or Loading Too Slowly?
                  </h3>

                  <p className="text-[#94a3b8] text-sm sm:text-base leading-relaxed">
                    Send me your website URL. I'll personally record a free 5-minute video teardown uncovering hidden performance bottlenecks, mobile friction, and conversion leaks.
                  </p>

                  <div className="pt-2 flex flex-wrap items-center gap-4">
                    <Link to="/contact">
                      <button className="btn-studio-primary px-6 py-3.5 text-xs font-mono inline-flex items-center gap-2">
                        <span>Claim Your Free Website Teardown</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </Link>
                    <Link to="/portfolio" className="text-xs font-mono text-[#94a3b8] hover:text-white underline underline-offset-4">
                      Explore Case Studies &rarr;
                    </Link>
                  </div>
                </div>
              </div>

            </article>

            {/* -------------------------------------------------------------
                RIGHT COLUMN: Sticky Editorial Utilities & Lead Captures
               ------------------------------------------------------------- */}
            <aside className="lg:col-span-4 space-y-8 lg:sticky lg:top-24">

              {/* 1. TABLE OF CONTENTS */}
              {tocItems.length > 0 && (
                <div className="bg-[#0e0e14] rounded-3xl border border-white/10 p-6 shadow-xl backdrop-blur-md">
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <ListOrdered className="w-4 h-4 text-blue-400" />
                      <h3 className="font-bold text-[#eeece8] text-xs font-mono uppercase tracking-wider">
                        Table of Contents
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono text-[#64748b]">{tocItems.length} Sections</span>
                  </div>

                  <nav className="space-y-1.5 text-xs font-mono max-h-[380px] overflow-y-auto pr-1 scrollbar-thin">
                    {tocItems.map((item) => {
                      const isActive = activeHeadingId === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => scrollToHeading(item.id)}
                          className={`w-full text-left px-3 py-2 rounded-xl transition-all flex items-center gap-2.5 ${
                            isActive
                              ? "bg-blue-600/20 text-blue-300 font-bold border border-blue-500/30"
                              : "text-[#94a3b8] hover:text-white hover:bg-white/5"
                          } ${item.level === 3 ? "pl-5" : ""}`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isActive ? "bg-blue-400 ring-2 ring-blue-300/40" : "bg-white/20"}`} />
                          <span className="truncate">{item.text}</span>
                        </button>
                      );
                    })}
                  </nav>
                </div>
              )}

              {/* 2. DIRECT CONSULTATION CARD */}
              <div className="rounded-3xl bg-[#0e0e14] border border-white/10 p-6 shadow-xl relative overflow-hidden">
                <div className="flex items-center gap-2 text-xs font-mono text-blue-400 uppercase tracking-wider mb-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Work Directly With Aman</span>
                </div>

                <h4 className="text-base font-bold text-white mb-2 leading-snug">
                  Need a Custom High-Performance Website?
                </h4>

                <p className="text-xs text-[#94a3b8] leading-relaxed mb-5">
                  Direct developer collaboration. Sub-second load times, bespoke designs, and zero agency overhead.
                </p>

                <Link to="/contact">
                  <button className="w-full btn-studio-primary py-2.5 text-xs font-mono inline-flex items-center justify-center gap-1.5">
                    <span>Book Studio Consultation</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </Link>
              </div>

              {/* 3. NEWSLETTER / DISCORD DISPATCH */}
              <div className="rounded-3xl bg-[#0e0e14] text-white p-6 shadow-xl border border-white/10 relative overflow-hidden">
                <div className="w-9 h-9 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center mb-3 border border-blue-500/30">
                  <Mail className="w-4 h-4" />
                </div>

                <h4 className="text-base font-bold text-[#eeece8] mb-1.5">
                  Studio Engineering Dispatches
                </h4>

                <p className="text-xs text-[#94a3b8] leading-relaxed mb-4">
                  Actionable WordPress speed breakdowns, Figma-to-code workflows, and conversion blueprints.
                </p>

                <form onSubmit={handleNewsletterSubmit} className="space-y-2.5">
                  <Input
                    type="email"
                    placeholder="Enter work email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    required
                    className="bg-[#09090c] border-white/10 text-white placeholder:text-[#64748b] text-xs font-mono h-10 rounded-xl focus:border-blue-500"
                  />
                  <Button
                    type="submit"
                    disabled={isSubscribing}
                    className="w-full h-10 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-mono font-semibold transition-all"
                  >
                    {isSubscribing ? "Subscribing..." : "Subscribe to Journal"}
                  </Button>
                </form>
              </div>

              {/* 4. RELATED ARTICLES */}
              {recentPosts.length > 0 && (
                <div className="bg-[#0e0e14] rounded-3xl border border-white/10 p-6 shadow-xl">
                  <div className="flex items-center gap-2 pb-3 mb-4 border-b border-white/10">
                    <BookOpen className="w-4 h-4 text-blue-400" />
                    <h3 className="font-bold text-[#eeece8] text-xs uppercase font-mono tracking-wider">
                      Recommended Reading
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {recentPosts.map((recent) => (
                      <Link
                        key={recent.slug}
                        to={`/blog/${recent.slug}`}
                        className="group flex gap-3.5 p-2 -mx-2 rounded-2xl hover:bg-white/5 transition-all"
                      >
                        {recent.cover_image ? (
                          <div className="w-16 h-16 shrink-0 rounded-xl overflow-hidden bg-[#14141e] border border-white/10">
                            <img
                              src={recent.cover_image}
                              alt={recent.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            />
                          </div>
                        ) : (
                          <div className="w-16 h-16 shrink-0 rounded-xl bg-blue-600/10 text-blue-400 flex items-center justify-center font-bold text-xs border border-blue-500/20">
                            <Code2 className="w-6 h-6" />
                          </div>
                        )}

                        <div className="flex-grow min-w-0">
                          <h4 className="font-bold text-[#eeece8] group-hover:text-blue-300 transition-colors line-clamp-2 text-xs leading-snug mb-1">
                            {recent.title}
                          </h4>
                          <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#64748b]">
                            <Clock className="w-3 h-3 text-blue-400" />
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

      {/* Back to All Articles Floating Strip */}
      <section className="py-8 border-t border-white/10 bg-[#07080c]">
        <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-xs font-mono text-[#94a3b8] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-blue-400" />
            <span>Return to All Journal Articles</span>
          </Link>

          <Link
            to="/contact"
            className="text-xs font-mono text-blue-400 hover:text-blue-300 inline-flex items-center gap-1 font-semibold"
          >
            <span>Have a project? Get in touch</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
