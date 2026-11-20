import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Post } from "@/types/supabase";
import { CURATED_BLOG_POSTS } from "@/data/blogArticles";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { 
  Calendar, 
  Clock, 
  ListOrdered, 
  Mail, 
  ChevronRight, 
  Share2, 
  Twitter, 
  Linkedin, 
  Check, 
  Copy,
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Code2
} from "lucide-react";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

// Helper to strip HTML/Markdown tags for meta descriptions
const stripHtml = (html: string) => {
  return html.replace(/<[^>]*>?/gm, '').replace(/[#*`_~\[\]]/g, '').trim();
};

// Calculate dynamic read time based on word count
const getReadTime = (content: string) => {
  if (!content) return "6 min read";
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
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

    const h3Match = line.match(/^###\s+(\d+[\.\)]\s*)?(.+)$/);
    if (h3Match) {
      const numPrefix = h3Match[1] ? h3Match[1].trim() : '';
      const rawTitle = h3Match[2].trim();
      const text = numPrefix ? `${numPrefix} ${rawTitle}` : rawTitle;
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      items.push({ id, text, level: 3 });
    }
  }
  return items;
};

// Laptop illustration for visual UX cards
const AnnotatedHeroIllustration = () => {
  return (
    <div className="relative w-full max-w-lg mx-auto select-none">
      <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 via-indigo-600/10 to-blue-800/20 rounded-3xl blur-2xl opacity-75" />

      <div className="relative">
        <div className="relative rounded-t-2xl bg-[#0e0e14] border-2 border-white/10 p-2 shadow-2xl">
          <div className="rounded-xl bg-[#09090c] p-4 aspect-[16/10] flex flex-col justify-between relative overflow-hidden border border-white/5">
            <div className="flex items-center justify-between pb-2.5 border-b border-white/5">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                <div className="w-12 h-1.5 bg-white/20 rounded" />
              </div>
              <div className="flex gap-2">
                <div className="w-8 h-1 bg-white/10 rounded" />
                <div className="w-8 h-1 bg-white/10 rounded" />
                <div className="w-8 h-1 bg-white/10 rounded" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3.5 my-auto items-center">
              <div className="space-y-2">
                <div className="w-12 h-1.5 bg-blue-400 rounded" />
                <div className="w-28 h-3 bg-white/90 rounded" />
                <div className="w-24 h-2 bg-white/50 rounded" />
                <div className="w-20 h-1.5 bg-white/30 rounded" />
                <div className="w-16 h-4 bg-blue-600 rounded-md mt-2.5 flex items-center justify-center shadow-sm">
                  <div className="w-8 h-1.5 bg-white rounded" />
                </div>
              </div>
              <div className="w-full h-24 bg-[#14141e] rounded-xl border border-white/10 p-2 flex flex-col justify-between">
                <div className="w-full h-12 bg-white/5 rounded-lg flex items-center justify-center">
                  <div className="w-14 h-6 border border-dashed border-white/20 rounded flex items-center justify-center text-[#94a3b8] text-[9px] font-mono">
                    Preview
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="w-full h-1 bg-white/10 rounded" />
                  <div className="w-2/3 h-1 bg-white/10 rounded" />
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-white/5 text-[9px] text-[#64748b] font-mono">
              <span>amanuxstudio.vercel.app</span>
              <div className="w-10 h-1 bg-white/10 rounded" />
            </div>
          </div>
        </div>

        <div className="h-3.5 bg-[#14141e] rounded-b-xl border-x-2 border-b-2 border-white/10 shadow-xl relative">
          <div className="w-20 h-1 bg-white/20 rounded-full mx-auto mt-0.5" />
        </div>

        <div className="absolute -top-4 right-8 flex flex-col items-center pointer-events-none drop-shadow-md">
          <div className="bg-[#14141e] text-blue-300 text-[11px] font-mono font-bold px-3 py-1 rounded-xl shadow-xl border border-blue-500/30">
            Unfocused Navigation
          </div>
        </div>

        <div className="absolute top-20 -left-6 flex flex-col items-end pointer-events-none drop-shadow-md">
          <div className="bg-[#14141e] text-rose-300 text-[11px] font-mono font-bold px-3 py-1 rounded-xl shadow-xl border border-rose-500/30">
            Vague Value Prop
          </div>
        </div>

        <div className="absolute top-28 -right-6 flex flex-col items-start pointer-events-none drop-shadow-md">
          <div className="bg-[#14141e] text-emerald-300 text-[11px] font-mono font-bold px-3 py-1 rounded-xl shadow-xl border border-emerald-500/30">
            Clear Conversion Path
          </div>
        </div>
      </div>
    </div>
  );
};

// Sleek Browser Mockup for Tech & Code Articles
const TechBrowserMockup = ({ coverImage, title }: { coverImage?: string; title: string }) => {
  return (
    <div className="relative w-full max-w-lg mx-auto group">
      <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 via-indigo-600/10 to-blue-800/20 rounded-3xl blur-2xl opacity-75 group-hover:opacity-95 transition-opacity duration-700" />

      <div className="relative rounded-2xl bg-[#0e0e14] border border-white/10 shadow-2xl overflow-hidden backdrop-blur-xl">
        <div className="flex items-center justify-between px-4 py-3 bg-[#09090c] border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>
          <div className="px-3 py-0.5 rounded-md bg-white/5 text-[11px] font-mono text-[#94a3b8] border border-white/10 truncate max-w-[200px]">
            amanuxstudio.vercel.app
          </div>
          <div className="w-4" />
        </div>

        <div className="relative aspect-[16/10] overflow-hidden bg-[#09090c]">
          {coverImage ? (
            <img
              src={coverImage}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          ) : (
            <div className="w-full h-full p-6 flex flex-col justify-center items-center text-center">
              <Code2 className="w-12 h-12 text-blue-400 mb-3" />
              <p className="text-white font-bold text-sm">Full-Stack Solution</p>
              <p className="text-[#94a3b8] text-xs mt-1">High-Performance Production Stack</p>
            </div>
          )}

          <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md border border-white/10 text-white text-[11px] font-mono px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-lg">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Sub-150ms TTFB</span>
          </div>
          <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-md border border-white/10 text-emerald-300 text-[11px] font-mono px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-lg">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Production Verified</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Side-by-Side Wireframe Comparison graphic
const WireframeComparison = () => {
  return (
    <div className="w-full lg:w-72 bg-[#12121c] p-4 rounded-2xl border border-white/10 flex items-center justify-center gap-3 flex-shrink-0 select-none">
      <div className="relative w-28 h-24 bg-[#09090c] rounded-xl border border-white/10 p-2.5 flex flex-col justify-between shadow-xs">
        <div className="absolute -top-2.5 -right-2.5 w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center text-xs font-bold shadow-md ring-2 ring-[#09090c]">
          ✕
        </div>
        <div className="space-y-1.5">
          <div className="w-12 h-1.5 bg-white/10 rounded" />
          <div className="w-20 h-2 bg-white/20 rounded" />
          <div className="w-16 h-1.5 bg-white/10 rounded" />
        </div>
        <div className="flex gap-1 justify-center pt-1 border-t border-white/5">
          <div className="w-7 h-2 bg-white/10 rounded" />
          <div className="w-7 h-2 bg-white/10 rounded" />
        </div>
      </div>

      <ArrowRight className="w-4 h-4 text-blue-400 flex-shrink-0" />

      <div className="relative w-28 h-24 bg-[#09090c] rounded-xl border border-blue-500/40 p-2.5 flex flex-col justify-between shadow-xs ring-1 ring-blue-500/30">
        <div className="absolute -top-2.5 -right-2.5 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold shadow-md ring-2 ring-[#09090c]">
          ✓
        </div>
        <div className="space-y-1.5">
          <div className="w-16 h-2 bg-blue-500 rounded" />
          <div className="w-20 h-1.5 bg-white/20 rounded" />
          <div className="w-14 h-1.5 bg-white/10 rounded" />
        </div>
        <div className="w-full h-3 bg-blue-600 rounded flex items-center justify-center shadow-xs">
          <div className="w-8 h-1 bg-white/90 rounded" />
        </div>
      </div>
    </div>
  );
};

// Architectural Blueprint Card for Development & Technical Articles
const TechBlueprintCard = ({ number }: { number: string }) => {
  return (
    <div className="w-full lg:w-72 bg-[#12121c] p-4 rounded-2xl border border-white/10 text-[#eeece8] flex flex-col justify-between flex-shrink-0 shadow-sm font-mono text-xs select-none">
      <div className="flex items-center justify-between pb-2 border-b border-white/10">
        <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">Pillar {number}</span>
        <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Optimized
        </span>
      </div>

      <div className="py-3 space-y-2">
        <div className="flex justify-between text-[11px]">
          <span className="text-[#94a3b8]">Edge Cache:</span>
          <span className="text-blue-300 font-semibold">HIT (99.4%)</span>
        </div>
        <div className="flex justify-between text-[11px]">
          <span className="text-[#94a3b8]">Response TTFB:</span>
          <span className="text-emerald-400 font-semibold">&lt; 150ms</span>
        </div>
        <div className="flex justify-between text-[11px]">
          <span className="text-[#94a3b8]">Query Cost:</span>
          <span className="text-blue-300 font-semibold">0.02s</span>
        </div>
      </div>

      <div className="pt-2 border-t border-white/10 text-[10px] text-[#94a3b8] flex items-center justify-between">
        <span>Verified Performance</span>
        <Check className="w-3.5 h-3.5 text-emerald-400" />
      </div>
    </div>
  );
};

// Rich Structured Card for Each Key Point / Flaw
interface StructuredCardProps {
  number: string;
  title: string;
  description: string;
  actionTitle: string;
  fixes: string[];
  isDesignArticle: boolean;
}

const StructuredPointCard = ({
  number,
  title,
  description,
  actionTitle,
  fixes,
  isDesignArticle
}: StructuredCardProps) => {
  const id = `${number}-${title}`.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  return (
    <div id={id} className="scroll-mt-28 bg-[#0e0e14] border border-white/10 rounded-3xl p-6 sm:p-8 my-8 shadow-sm hover:border-blue-500/30 transition-all">
      <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
        <div className="flex-1 space-y-3.5">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-blue-600/20 text-blue-400 font-mono font-bold text-sm flex items-center justify-center flex-shrink-0 border border-blue-500/30 shadow-xs">
              {number}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-[#eeece8] leading-tight">
              {title}
            </h3>
          </div>

          {description && (
            <p className="text-[#94a3b8] text-base leading-relaxed font-normal">
              {description}
            </p>
          )}

          {fixes.length > 0 && (
            <div className="pt-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-xs font-mono font-bold mb-3">
                <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>{actionTitle || "How to implement it:"}</span>
              </div>

              <ul className="space-y-2.5 text-sm sm:text-base text-[#eeece8] pl-1">
                {fixes.map((fix, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 mr-3 flex-shrink-0" />
                    <span className="leading-relaxed text-[#cbd5e1]">{fix}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {isDesignArticle ? (
          <WireframeComparison />
        ) : (
          <TechBlueprintCard number={number} />
        )}
      </div>
    </div>
  );
};

interface ParsedSection {
  title: string;
  id: string;
  intro: string;
  quote: { title: string; text: string } | null;
  cards: {
    number: string;
    title: string;
    description: string;
    actionTitle: string;
    fixes: string[];
  }[];
}

function parseMarkdownArticle(content: string) {
  if (!content) return { intro: '', sections: [] as ParsedSection[] };

  const rawSections = content.split(/\n(?=##\s+)/);
  const intro = rawSections[0].replace(/^##\s+.*$/m, '').trim();
  const sections: ParsedSection[] = [];

  for (let i = 0; i < rawSections.length; i++) {
    const raw = rawSections[i].trim();
    if (!raw.startsWith('## ')) continue;

    const lines = raw.split('\n');
    const title = lines[0].replace(/^##\s+/, '').trim();
    const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const body = lines.slice(1).join('\n').trim();

    let quote: { title: string; text: string } | null = null;
    const quoteMatch = body.match(/>\s*###?\s*([^\n]+)\n>\s*([^\n]+(\n>[^\n]+)*)/);
    if (quoteMatch) {
      quote = {
        title: quoteMatch[1].trim(),
        text: quoteMatch[2].replace(/^>\s*/gm, '').trim()
      };
    }

    const rawCards = body.split(/\n(?=###\s+)/);
    const sectionIntro = rawCards[0].replace(/>\s*###?[\s\S]*?(?=\n\n|$)/, '').trim();

    const cards: ParsedSection['cards'] = [];

    for (let c = 1; c < rawCards.length; c++) {
      const cardRaw = rawCards[c].trim();
      const cardLines = cardRaw.split('\n');
      const h3TitleLine = cardLines[0].replace(/^###\s+/, '').trim();

      const numMatch = h3TitleLine.match(/^(\d{1,2})[\.\)]\s*(.+)/);
      const number = numMatch ? numMatch[1].padStart(2, '0') : String(c).padStart(2, '0');
      const cardTitle = numMatch ? numMatch[2].trim() : h3TitleLine;
      const cardBody = cardLines.slice(1).join('\n').trim();

      const fixHeaderMatch = cardBody.match(/\*\*(How to [^:*]+):\*\*/i);
      const actionTitle = fixHeaderMatch ? fixHeaderMatch[1] : 'How to implement it:';

      const bullets: string[] = [];
      const bulletMatches = cardBody.match(/^[-*]\s+(.+)$/gm);
      if (bulletMatches) {
        bulletMatches.forEach(b => bullets.push(b.replace(/^[-*]\s+/, '').trim()));
      }

      const desc = cardBody.split(/\*\*How to/i)[0].replace(/^[-*]\s+.+$/gm, '').trim();

      cards.push({
        number,
        title: cardTitle,
        description: desc,
        actionTitle,
        fixes: bullets
      });
    }

    sections.push({
      title,
      id,
      intro: sectionIntro,
      quote,
      cards
    });
  }

  return { intro, sections };
}

type RecentPost = Pick<Post, "title" | "slug" | "created_at" | "cover_image" | "content">;

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [recentPosts, setRecentPosts] = useState<RecentPost[]>([]);
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

  useEffect(() => {
    fetchRecentPosts();
  }, [slug]);

  // Active heading observer for ToC scrollspy
  useEffect(() => {
    if (!post?.content) return;

    const timeout = setTimeout(() => {
      const headings = document.querySelectorAll('h2[id], div[id]');
      if (headings.length === 0) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveHeadingId(entry.target.id);
            }
          });
        },
        { rootMargin: '-80px 0px -60% 0px' }
      );

      headings.forEach((h) => observer.observe(h));
      return () => observer.disconnect();
    }, 400);

    return () => clearTimeout(timeout);
  }, [post?.content]);

  const fetchPost = async () => {
    try {
      // Check curated articles first
      const curatedMatch = CURATED_BLOG_POSTS.find((p) => p.slug === slug);
      if (curatedMatch) {
        setPost(curatedMatch);
        setLoading(false);
        return;
      }

      // Query Supabase
      const { data, error } = await supabase
        .from("posts")
        .select("*, categories(id, name, slug)")
        .eq("slug", slug)
        .single();

      if (error || !data) {
        // Fallback to first curated post if slug not found
        console.warn("Post not found in database, redirecting or using fallback.");
        navigate("/blog");
        return;
      }

      setPost(data);
    } catch (error) {
      console.error("Error fetching post:", error);
      navigate("/blog");
    } finally {
      setLoading(false);
    }
  };

  const fetchRecentPosts = async () => {
    // Collect related posts from curated and DB
    const otherCurated = CURATED_BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 3);
    setRecentPosts(otherCurated);
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
          name: 'Journal Subscriber',
          email: newsletterEmail,
          message: `Subscribed from article: ${post?.title}`,
          title: '📰 New Journal Subscriber'
        })
      });
      toast.success("You're subscribed! We'll share actionable web craft & conversion tips.");
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
      <div className="min-h-screen bg-[#09090c] text-white flex flex-col justify-center items-center font-sans">
        <div className="w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-[#94a3b8] font-mono text-xs">Opening Journal...</p>
      </div>
    );
  }

  if (!post) return null;

  const metaDescription = post.meta_description || post.excerpt || stripHtml(post.content).substring(0, 160) + "...";
  const metaTitle = post.meta_title || post.title;
  const readTime = getReadTime(post.content);
  const formattedDate = format(new Date(post.created_at), "MMM d, yyyy");
  const tocItems = extractToc(post.content);
  const categoryName = post.categories?.name || "Web Development & UX";
  const isDesignArticle = categoryName.toLowerCase().includes("design") || post.slug.includes("ux");

  const { intro, sections } = parseMarkdownArticle(post.content);

  return (
    <div className="min-h-screen bg-[#09090c] font-sans flex flex-col text-[#eeece8] selection:bg-blue-600/30 selection:text-white">
      {/* Sticky Top Reading Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-[2px] bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-400 z-[100] transition-all duration-75"
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
      />

      <Navigation />

      {/* =========================================================================
          HERO SECTION: Sleek Editorial Dark Header
         ========================================================================= */}
      <header className="relative bg-[#09090c] text-[#eeece8] pt-28 pb-14 lg:py-24 border-b border-white/10 overflow-hidden">
        {/* Ambient Subtle Glow */}
        <div className="absolute top-0 right-1/4 w-[450px] h-[450px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute -bottom-10 left-10 w-[350px] h-[350px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-[#94a3b8] mb-6 flex-wrap">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#64748b]" />
            <Link to="/blog" className="hover:text-white transition-colors">Journal</Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#64748b]" />
            <span className="text-[#eeece8] truncate max-w-[240px] sm:max-w-md">{post.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Post Title, Excerpt & Author Info */}
            <div className="lg:col-span-7">
              {/* Category Pill Badge */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-mono uppercase tracking-wider font-semibold bg-blue-500/10 text-blue-300 border border-blue-500/30 mb-5">
                <Sparkles className="w-3 h-3 text-blue-400" />
                {categoryName}
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#eeece8] tracking-tight leading-[1.15] mb-5">
                {post.title}
              </h1>

              {/* Subheading / Excerpt */}
              {post.excerpt && (
                <p className="text-[#94a3b8] text-base sm:text-lg leading-relaxed mb-8 max-w-2xl font-normal">
                  {post.excerpt}
                </p>
              )}

              {/* Author & Meta Row */}
              <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-white/10 text-xs font-mono text-[#94a3b8]">
                {/* Author Avatar & Info */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600/20 border border-blue-500/40 flex items-center justify-center font-bold text-blue-400 text-sm">
                    AS
                  </div>
                  <div>
                    <span className="block font-bold text-[#eeece8] leading-tight">Aman Sharma</span>
                    <span className="block text-[11px] text-[#64748b]">Web Developer & UI/UX</span>
                  </div>
                </div>

                <div className="h-6 w-px bg-white/10 hidden sm:block" />

                {/* Read Time */}
                <div className="flex items-center gap-1.5 text-[#cbd5e1]">
                  <Clock className="w-3.5 h-3.5 text-blue-400" />
                  <span>{readTime}</span>
                </div>

                {/* Published Date */}
                <div className="flex items-center gap-1.5 text-[#cbd5e1]">
                  <Calendar className="w-3.5 h-3.5 text-blue-400" />
                  <span>{formattedDate}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Graphic Showcase */}
            <div className="lg:col-span-5 hidden lg:block">
              {post.slug.includes("ux-flaws") ? (
                <AnnotatedHeroIllustration />
              ) : (
                <TechBrowserMockup coverImage={post.cover_image || undefined} title={post.title} />
              )}
            </div>
          </div>
        </div>
      </header>

      {/* =========================================================================
          MAIN BODY: Editorial 2-Column Layout
         ========================================================================= */}
      <main className="flex-grow py-14 lg:py-20">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            {/* -------------------------------------------------------------
                LEFT COLUMN (Article Content)
               ------------------------------------------------------------- */}
            <article className="lg:col-span-8 space-y-10">
              {/* Social Sharing Bar */}
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#94a3b8]">
                  <Share2 className="w-3.5 h-3.5 text-blue-400" />
                  <span>Share Article</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleShare('twitter')}
                    className="w-9 h-9 rounded-xl border border-white/10 bg-[#0e0e14] text-[#94a3b8] hover:text-white hover:border-blue-500/40 flex items-center justify-center transition-all"
                    title="Share on X"
                  >
                    <Twitter className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleShare('linkedin')}
                    className="w-9 h-9 rounded-xl border border-white/10 bg-[#0e0e14] text-[#94a3b8] hover:text-white hover:border-blue-500/40 flex items-center justify-center transition-all"
                    title="Share on LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleShare('copy')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/10 bg-[#0e0e14] text-[#94a3b8] hover:text-white hover:border-blue-500/40 transition-all text-xs font-mono"
                    title="Copy link"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedLink ? "Copied!" : "Copy"}</span>
                  </button>
                </div>
              </div>

              {/* -------------------------------------------------------------
                  STRUCTURED ARTICLE RENDERING
                 ------------------------------------------------------------- */}
              {sections.length > 0 ? (
                <div className="space-y-12">
                  {/* Lead Introduction Paragraph */}
                  {intro && (
                    <div className="text-lg sm:text-xl text-[#cbd5e1] leading-relaxed font-normal">
                      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                        {intro}
                      </ReactMarkdown>
                    </div>
                  )}

                  {/* Render Each Major Section */}
                  {sections.map((section, sIdx) => (
                    <div key={sIdx} className="space-y-6 pt-4">
                      {/* Section H2 with Blue Vertical Accent Bar */}
                      <h2
                        id={section.id}
                        className="text-2xl sm:text-3xl font-extrabold text-[#eeece8] scroll-mt-28 flex items-center leading-tight tracking-tight pt-2"
                      >
                        <span className="w-1.5 h-7 bg-blue-600 rounded-full mr-3.5 inline-block flex-shrink-0" />
                        <span>{section.title}</span>
                      </h2>

                      {/* Section Intro Text */}
                      {section.intro && (
                        <div className="text-base sm:text-lg text-[#94a3b8] leading-[1.85] font-normal">
                          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                            {section.intro}
                          </ReactMarkdown>
                        </div>
                      )}

                      {/* Callout Quote Box */}
                      {section.quote && (
                        <div className="rounded-2xl bg-[#0e0e14] border border-blue-500/30 p-6 sm:p-7 flex items-start gap-4 my-8 shadow-sm">
                          <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center flex-shrink-0 text-xl border border-blue-500/30">
                            🎯
                          </div>
                          <div>
                            <h4 className="font-bold text-[#eeece8] text-base sm:text-lg mb-1 leading-snug">
                              {section.quote.title}
                            </h4>
                            <p className="text-[#94a3b8] text-sm sm:text-base leading-relaxed">
                              {section.quote.text}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Structured Points / Flaw Cards */}
                      {section.cards.length > 0 && (
                        <div className="space-y-6 my-8">
                          {section.cards.map((card, cIdx) => (
                            <StructuredPointCard
                              key={cIdx}
                              number={card.number}
                              title={card.title}
                              description={card.description}
                              actionTitle={card.actionTitle}
                              fixes={card.fixes}
                              isDesignArticle={isDesignArticle}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                /* Fallback to enhanced ReactMarkdown for legacy content */
                <div className="blog-content-body max-w-none space-y-6">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    components={{
                      h2: ({ node, ...props }) => {
                        const headingText = String(props.children);
                        const id = headingText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                        return (
                          <div className="pt-10 mb-6">
                            <h2 id={id} className="text-2xl sm:text-3xl font-extrabold text-[#eeece8] scroll-mt-28 flex items-center leading-tight tracking-tight">
                              <span className="w-1.5 h-7 bg-blue-600 rounded-full mr-3.5 inline-block flex-shrink-0" />
                              <span>{props.children}</span>
                            </h2>
                          </div>
                        );
                      },
                      h3: ({ node, ...props }) => (
                        <h3 className="text-xl sm:text-2xl font-bold text-[#eeece8] mt-8 mb-4">
                          {props.children}
                        </h3>
                      ),
                      p: ({ node, ...props }) => (
                        <p className="text-base sm:text-lg text-[#94a3b8] leading-[1.85] mb-6 font-normal">
                          {props.children}
                        </p>
                      ),
                      blockquote: ({ node, ...props }) => (
                        <div className="rounded-2xl bg-[#0e0e14] border border-blue-500/30 p-6 sm:p-7 flex items-start gap-4 my-8 shadow-sm">
                          <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center flex-shrink-0 text-xl border border-blue-500/30">
                            🎯
                          </div>
                          <div className="text-[#cbd5e1] text-base leading-relaxed font-medium not-italic">
                            {props.children}
                          </div>
                        </div>
                      ),
                      ul: ({ node, ...props }) => (
                        <ul className="space-y-3 my-6 pl-1">{props.children}</ul>
                      ),
                      li: ({ node, ...props }) => (
                        <li className="flex items-start text-base text-[#cbd5e1] leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 mr-3 flex-shrink-0" />
                          <span className="flex-1">{props.children}</span>
                        </li>
                      ),
                      strong: ({ node, ...props }) => (
                        <strong className="font-bold text-[#eeece8]">{props.children}</strong>
                      ),
                      a: ({ node, ...props }) => (
                        <a
                          {...props}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 underline underline-offset-4 hover:text-blue-300 transition-colors"
                        />
                      ),
                      pre: ({ node, ...props }) => (
                        <pre className="bg-[#050508] text-[#eeece8] p-5 rounded-2xl overflow-x-auto my-8 border border-white/10 text-xs font-mono shadow-lg leading-relaxed" {...props} />
                      ),
                      code: ({ node, ...props }) => (
                        <code className="text-blue-300 bg-blue-950/40 border border-blue-500/20 px-1.5 py-0.5 rounded text-xs font-mono font-medium" {...props} />
                      )
                    }}
                  >
                    {post.content}
                  </ReactMarkdown>
                </div>
              )}

              {/* Tags / Keywords */}
              {post.meta_keywords && (
                <div className="pt-8 border-t border-white/10">
                  <p className="text-xs font-mono uppercase tracking-wider text-[#64748b] mb-3">Topic Keywords:</p>
                  <div className="flex flex-wrap gap-2">
                    {post.meta_keywords.split(',').map((tag, i) => (
                      <span key={i} className="text-xs font-mono bg-[#0e0e14] text-[#94a3b8] px-3 py-1.5 rounded-lg border border-white/10">
                        #{tag.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Bottom Project Inquiry CTA Box */}
              <div className="mt-14 p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#0e0e14] via-[#12121c] to-[#09090c] border border-white/10 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
                
                <div className="relative z-10 max-w-2xl">
                  <span className="text-blue-400 font-mono text-xs tracking-wider uppercase mb-2 block">
                    Need Help Scaling Your Web Presence?
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#eeece8] mb-3 leading-snug">
                    Turn Design & Performance Into High-Converting Revenue
                  </h3>
                  <p className="text-[#94a3b8] text-sm sm:text-base leading-relaxed mb-6">
                    Whether launching a custom WordPress platform, speeding up a WooCommerce store, or building an intuitive UI/UX system — let's build something iconic.
                  </p>
                  <Link to="/contact">
                    <button className="btn-studio-primary px-6 py-3.5 text-xs font-mono inline-flex items-center gap-2">
                      Start a Project Consultation <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>
                </div>
              </div>
            </article>

            {/* -------------------------------------------------------------
                RIGHT COLUMN (Sticky Sidebar)
               ------------------------------------------------------------- */}
            <aside className="lg:col-span-4 space-y-8 lg:sticky lg:top-24">

              {/* 1. TABLE OF CONTENTS */}
              {tocItems.length > 0 && (
                <div className="bg-[#0e0e14] rounded-2xl border border-white/10 p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                    <ListOrdered className="w-4 h-4 text-blue-400" />
                    <h3 className="font-bold text-[#eeece8] text-sm uppercase font-mono tracking-wider">
                      Contents
                    </h3>
                  </div>

                  <nav className="space-y-1.5 text-xs font-mono">
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
                          <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${isActive ? "bg-blue-400 ring-2 ring-blue-300/40" : "bg-white/20"}`} />
                          <span className="truncate">{item.text}</span>
                        </button>
                      );
                    })}
                  </nav>
                </div>
              )}

              {/* 2. NEWSLETTER / LEAD CAPTURE */}
              <div className="rounded-2xl bg-[#0e0e14] text-white p-6 sm:p-7 shadow-xl border border-white/10 relative overflow-hidden">
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center mb-4 border border-blue-500/30">
                  <Mail className="w-5 h-5" />
                </div>

                <h3 className="text-lg font-bold text-[#eeece8] mb-2 leading-tight">
                  Studio Insights in Your Inbox
                </h3>
                <p className="text-[#94a3b8] text-xs leading-relaxed mb-5">
                  Actionable WordPress performance breakdowns, CRO experiments, and design tokens. No spam.
                </p>

                <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                  <div className="flex items-center gap-2">
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
                      className="h-10 px-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-md flex-shrink-0 transition-colors"
                      title="Subscribe"
                    >
                      {isSubscribing ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <ArrowUpRight className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </form>
              </div>

              {/* 3. RELATED ARTICLES */}
              {recentPosts.length > 0 && (
                <div className="bg-[#0e0e14] rounded-2xl border border-white/10 p-6 shadow-sm">
                  <div className="flex items-center mb-4 pb-3 border-b border-white/10">
                    <span className="w-1 h-4 bg-blue-600 rounded-full mr-2.5 flex-shrink-0" />
                    <h3 className="font-bold text-[#eeece8] text-sm uppercase font-mono tracking-wider">
                      Related Articles
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {recentPosts.map((recent) => (
                      <Link
                        key={recent.slug}
                        to={`/blog/${recent.slug}`}
                        className="group flex gap-3.5 p-2 -mx-2 rounded-xl hover:bg-white/5 transition-colors"
                      >
                        {recent.cover_image ? (
                          <div className="w-16 h-16 flex-shrink-0 rounded-xl overflow-hidden bg-[#14141e] border border-white/10">
                            <img
                              src={recent.cover_image}
                              alt={recent.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            />
                          </div>
                        ) : (
                          <div className="w-16 h-16 flex-shrink-0 rounded-xl bg-blue-600/10 text-blue-400 flex items-center justify-center font-bold text-xs border border-blue-500/20">
                            UX
                          </div>
                        )}

                        <div className="flex-grow min-w-0">
                          <h4 className="font-bold text-[#eeece8] group-hover:text-blue-300 transition-colors line-clamp-2 text-xs leading-snug mb-1">
                            {recent.title}
                          </h4>
                          <div className="flex items-center gap-1 text-[11px] font-mono text-[#64748b]">
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

      <Footer />
    </div>
  );
};

export default BlogPost;
