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
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Globe,
  Layers,
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

// Laptop illustration with the 3 callout annotations matching user's design image
const AnnotatedHeroIllustration = () => {
  return (
    <div className="relative w-full max-w-lg mx-auto select-none">
      {/* Background ambient purple/blue glow */}
      <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/30 via-indigo-600/20 to-purple-800/30 rounded-3xl blur-2xl opacity-75" />

      <div className="relative">
        {/* Laptop Screen Body */}
        <div className="relative rounded-t-2xl bg-slate-900 border-2 border-slate-700/80 p-2 shadow-2xl">
          <div className="rounded-xl bg-[#0F172A] p-4 aspect-[16/10] flex flex-col justify-between relative overflow-hidden border border-slate-800">
            {/* Screen Top Bar / Nav */}
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-800/80">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                <div className="w-12 h-1.5 bg-slate-700 rounded" />
              </div>
              <div className="flex gap-2">
                <div className="w-8 h-1 bg-slate-700 rounded" />
                <div className="w-8 h-1 bg-slate-700 rounded" />
                <div className="w-8 h-1 bg-slate-700 rounded" />
              </div>
            </div>

            {/* Screen Content: Hero Wireframe Layout */}
            <div className="grid grid-cols-2 gap-3.5 my-auto items-center">
              <div className="space-y-2">
                <div className="w-12 h-1.5 bg-purple-400 rounded" />
                <div className="w-28 h-3 bg-slate-200 rounded" />
                <div className="w-24 h-2 bg-slate-400 rounded" />
                <div className="w-20 h-1.5 bg-slate-500 rounded" />
                <div className="w-16 h-4 bg-purple-600 rounded-md mt-2.5 flex items-center justify-center shadow-sm">
                  <div className="w-8 h-1.5 bg-white rounded" />
                </div>
              </div>
              {/* Graphic Wireframe Window */}
              <div className="w-full h-24 bg-slate-800/80 rounded-xl border border-slate-700 p-2 flex flex-col justify-between">
                <div className="w-full h-12 bg-slate-700/50 rounded-lg flex items-center justify-center">
                  <div className="w-14 h-6 border border-dashed border-slate-600 rounded flex items-center justify-center text-slate-400 text-[9px] font-mono">
                    Mockup Preview
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="w-full h-1 bg-slate-600 rounded" />
                  <div className="w-2/3 h-1 bg-slate-600 rounded" />
                </div>
              </div>
            </div>

            {/* Screen Bottom Bar */}
            <div className="flex justify-between items-center pt-2 border-t border-slate-800/50 text-[9px] text-slate-500 font-mono">
              <span>amanuxstudio.vercel.app</span>
              <div className="w-10 h-1 bg-slate-700 rounded" />
            </div>
          </div>
        </div>

        {/* Laptop Base */}
        <div className="h-3.5 bg-slate-800 rounded-b-xl border-x-2 border-b-2 border-slate-700 shadow-xl relative">
          <div className="w-20 h-1 bg-slate-600 rounded-full mx-auto mt-0.5" />
        </div>

        {/* --- ANNOTATION 1: Top Confusing Navigation --- */}
        <div className="absolute -top-4 right-8 flex flex-col items-center pointer-events-none drop-shadow-md">
          <div className="bg-white text-slate-900 text-[11px] font-bold px-3 py-1 rounded-xl shadow-xl border border-slate-200">
            Confusing Navigation
          </div>
          <svg className="w-7 h-8 text-white -mt-1" viewBox="0 0 28 32" fill="none">
            <path d="M14 0 C14 16, 4 22, 2 30" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
            <path d="M0 26 L2 30 L6 27" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>

        {/* --- ANNOTATION 2: Bottom-Left Weak CTA --- */}
        <div className="absolute top-20 -left-6 flex flex-col items-end pointer-events-none drop-shadow-md">
          <div className="bg-white text-slate-900 text-[11px] font-bold px-3 py-1 rounded-xl shadow-xl border border-slate-200">
            Weak CTA
          </div>
          <svg className="w-8 h-8 text-white -mr-2" viewBox="0 0 32 32" fill="none">
            <path d="M0 12 C16 12, 22 20, 28 26" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
            <path d="M22 26 L28 26 L26 20" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>

        {/* --- ANNOTATION 3: Bottom-Right Unclear Value --- */}
        <div className="absolute top-28 -right-6 flex flex-col items-start pointer-events-none drop-shadow-md">
          <div className="bg-white text-slate-900 text-[11px] font-bold px-3 py-1 rounded-xl shadow-xl border border-slate-200">
            Unclear Value
          </div>
          <svg className="w-8 h-8 text-white -ml-2" viewBox="0 0 32 32" fill="none">
            <path d="M32 12 C16 12, 10 20, 4 26" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
            <path d="M10 26 L4 26 L6 20" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
};

// Sleek Browser Window Device Frame for Tech & Code Articles
const TechBrowserMockup = ({ coverImage, title }: { coverImage?: string; title: string }) => {
  return (
    <div className="relative w-full max-w-lg mx-auto group">
      {/* Glow */}
      <div className="absolute -inset-2 bg-gradient-to-r from-purple-600/30 via-indigo-600/20 to-blue-600/30 rounded-3xl blur-2xl opacity-75 group-hover:opacity-95 transition-opacity duration-700" />

      <div className="relative rounded-2xl bg-slate-900/95 border border-slate-700/80 shadow-2xl overflow-hidden backdrop-blur-xl">
        {/* macOS Traffic Lights Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-950/80 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/90" />
            <div className="w-3 h-3 rounded-full bg-amber-500/90" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/90" />
          </div>
          <div className="px-3 py-0.5 rounded-md bg-slate-800/80 text-[11px] font-mono text-slate-400 border border-slate-700/50 truncate max-w-[200px]">
            amanuxstudio.vercel.app
          </div>
          <div className="w-4" />
        </div>

        {/* Mockup Preview Area */}
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
          {coverImage ? (
            <img
              src={coverImage}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          ) : (
            <div className="w-full h-full p-6 flex flex-col justify-center items-center text-center">
              <Code2 className="w-12 h-12 text-purple-400 mb-3" />
              <p className="text-white font-bold text-sm">Full-Stack Architecture</p>
              <p className="text-slate-400 text-xs mt-1">High-Performance Production Stack</p>
            </div>
          )}

          {/* Floating Pill Badges */}
          <div className="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur-md border border-slate-700/70 text-slate-200 text-[11px] font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-lg">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Sub-150ms TTFB</span>
          </div>
          <div className="absolute top-3 right-3 bg-purple-950/90 backdrop-blur-md border border-purple-700/70 text-purple-200 text-[11px] font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-lg">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-300" />
            <span>Production Ready</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Side-by-Side Wireframe Comparison graphic (✕ Bad vs ✓ Good) for UX Flaw Cards
const WireframeComparison = () => {
  return (
    <div className="w-full lg:w-72 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 flex items-center justify-center gap-3 flex-shrink-0 select-none">
      {/* Bad Wireframe Box */}
      <div className="relative w-28 h-24 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-2.5 flex flex-col justify-between shadow-xs">
        <div className="absolute -top-2.5 -right-2.5 w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center text-xs font-bold shadow-md ring-2 ring-white dark:ring-slate-900">
          ✕
        </div>
        <div className="space-y-1.5">
          <div className="w-12 h-1.5 bg-slate-200 dark:bg-slate-700 rounded" />
          <div className="w-20 h-2 bg-slate-300 dark:bg-slate-600 rounded" />
          <div className="w-16 h-1.5 bg-slate-200 dark:bg-slate-700 rounded" />
        </div>
        <div className="flex gap-1 justify-center pt-1 border-t border-slate-100 dark:border-slate-800">
          <div className="w-7 h-2 bg-slate-200 dark:bg-slate-700 rounded" />
          <div className="w-7 h-2 bg-slate-200 dark:bg-slate-700 rounded" />
        </div>
      </div>

      {/* Arrow Indicator */}
      <ArrowRight className="w-4 h-4 text-purple-600 flex-shrink-0" />

      {/* Good Wireframe Box */}
      <div className="relative w-28 h-24 bg-white dark:bg-slate-900 rounded-xl border border-purple-200 dark:border-purple-800/80 p-2.5 flex flex-col justify-between shadow-xs ring-1 ring-purple-500/20">
        <div className="absolute -top-2.5 -right-2.5 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold shadow-md ring-2 ring-white dark:ring-slate-900">
          ✓
        </div>
        <div className="space-y-1.5">
          <div className="w-16 h-2 bg-purple-600 rounded" />
          <div className="w-20 h-1.5 bg-slate-300 dark:bg-slate-600 rounded" />
          <div className="w-14 h-1.5 bg-slate-200 dark:bg-slate-700 rounded" />
        </div>
        <div className="w-full h-3 bg-purple-600 rounded flex items-center justify-center shadow-xs">
          <div className="w-8 h-1 bg-white/90 rounded" />
        </div>
      </div>
    </div>
  );
};

// Architectural Blueprint Card for Development & Technical Articles
const TechBlueprintCard = ({ number }: { number: string }) => {
  return (
    <div className="w-full lg:w-72 bg-gradient-to-br from-slate-900 to-indigo-950 p-4 rounded-2xl border border-slate-800 text-slate-200 flex flex-col justify-between flex-shrink-0 shadow-sm font-mono text-xs select-none">
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <span className="text-[10px] text-purple-400 font-bold uppercase tracking-wider">Pattern {number}</span>
        <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Optimized
        </span>
      </div>

      <div className="py-3 space-y-2">
        <div className="flex justify-between text-[11px]">
          <span className="text-slate-400">Edge Cache:</span>
          <span className="text-purple-300 font-semibold">HIT (99.4%)</span>
        </div>
        <div className="flex justify-between text-[11px]">
          <span className="text-slate-400">Response TTFB:</span>
          <span className="text-emerald-400 font-semibold">&lt; 120ms</span>
        </div>
        <div className="flex justify-between text-[11px]">
          <span className="text-slate-400">Type Contract:</span>
          <span className="text-blue-300 font-semibold">Strict Zod</span>
        </div>
      </div>

      <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-400 flex items-center justify-between">
        <span>Verified Architecture</span>
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
    <div id={id} className="scroll-mt-28 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-6 sm:p-8 my-8 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
        
        {/* Left Column: Content */}
        <div className="flex-1 space-y-3.5">
          {/* Header row with Number Badge */}
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300 font-bold text-sm flex items-center justify-center flex-shrink-0 shadow-xs">
              {number}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-tight">
              {title}
            </h3>
          </div>

          {/* Description */}
          {description && (
            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
              {description}
            </p>
          )}

          {/* Green Action / Checklist Badge */}
          {fixes.length > 0 && (
            <div className="pt-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-bold mb-3">
                <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <span>{actionTitle || "How to implement it:"}</span>
              </div>

              {/* Actionable Bullet Points with clean dots */}
              <ul className="space-y-2.5 text-base sm:text-lg text-slate-700 dark:text-slate-300 pl-1">
                {fixes.map((fix, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-600 dark:bg-purple-400 mt-2.5 mr-3 flex-shrink-0" />
                    <span className="leading-relaxed">{fix}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right Column: Visual Wireframe or Technical Blueprint */}
        {isDesignArticle ? (
          <WireframeComparison />
        ) : (
          <TechBlueprintCard number={number} />
        )}

      </div>
    </div>
  );
};

// Data structure parsed from article markdown
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
  trailingText: string;
}

function parseMarkdownArticle(content: string) {
  if (!content) return { intro: '', sections: [] as ParsedSection[] };

  // Split into major sections divided by '## '
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

    // Check for blockquote callout: '> ### [Key takeaway]\n> [Explanation]'
    let quote: { title: string; text: string } | null = null;
    const quoteMatch = body.match(/>\s*###?\s*([^\n]+)\n>\s*([^\n]+(\n>[^\n]+)*)/);
    if (quoteMatch) {
      quote = {
        title: quoteMatch[1].trim(),
        text: quoteMatch[2].replace(/^>\s*/gm, '').trim()
      };
    }

    // Check for H3 cards: '### 01. ...' or '### ...'
    const rawCards = body.split(/\n(?=###\s+)/);
    let sectionIntro = rawCards[0].replace(/>\s*###?[\s\S]*?(?=\n\n|$)/, '').trim();

    const cards: ParsedSection['cards'] = [];
    let trailingText = '';

    for (let c = 1; c < rawCards.length; c++) {
      const cardRaw = rawCards[c].trim();
      const cardLines = cardRaw.split('\n');
      const h3TitleLine = cardLines[0].replace(/^###\s+/, '').trim();

      const numMatch = h3TitleLine.match(/^(\d{1,2})[\.\)]\s*(.+)/);
      const number = numMatch ? numMatch[1].padStart(2, '0') : String(c).padStart(2, '0');
      const cardTitle = numMatch ? numMatch[2].trim() : h3TitleLine;
      const cardBody = cardLines.slice(1).join('\n').trim();

      // Look for 'How to implement it:' or 'How to fix it:'
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
      cards,
      trailingText
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
  const categoryName = post.categories?.name || "UX DESIGN";

  const isDesignArticle = categoryName.toLowerCase().includes("design") || post.slug.includes("ux");
  const isUxFlawsPost = post.slug === 'ux-flaws-destroying-landing-page-conversions' || post.slug === 'ux-flaws' || post.slug.startsWith('ux-flaws');

  // Parse structured article sections
  const { intro, sections } = parseMarkdownArticle(post.content);

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
          HERO SECTION: Sleek Modern Header Matching User Mockup
         ========================================================================= */}
      <header className="relative bg-[#0A0E17] text-white pt-28 pb-16 lg:py-24 border-b border-slate-800/80 overflow-hidden">
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
                    <span className="block text-xs text-slate-400">UX Designer at AmanUX Studio</span>
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
              {isUxFlawsPost ? (
                <AnnotatedHeroIllustration />
              ) : (
                <TechBrowserMockup coverImage={post.cover_image} title={post.title} />
              )}
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
            <article className="lg:col-span-8 space-y-10">
              {/* Social Sharing Bar */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-200/80 dark:border-slate-800">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  <Share2 className="w-3.5 h-3.5" />
                  Share Article
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleShare('twitter')}
                    className="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-purple-600 hover:border-purple-300 flex items-center justify-center transition-all shadow-xs"
                    title="Share on X / Twitter"
                  >
                    <Twitter className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleShare('linkedin')}
                    className="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-purple-600 hover:border-purple-300 flex items-center justify-center transition-all shadow-xs"
                    title="Share on LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleShare('copy')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-purple-600 hover:border-purple-300 transition-all text-xs font-medium shadow-xs"
                    title="Copy link"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedLink ? "Copied!" : "Copy Link"}</span>
                  </button>
                </div>
              </div>

              {/* -------------------------------------------------------------
                  STRUCTURED ARTICLE RENDERING (Spacious, Card-Based Layout)
                 ------------------------------------------------------------- */}
              {sections.length > 0 ? (
                <div className="space-y-12">
                  {/* Lead Introduction Paragraph */}
                  {intro && (
                    <div className="text-lg sm:text-xl text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                        {intro}
                      </ReactMarkdown>
                    </div>
                  )}

                  {/* Render Each Major Section */}
                  {sections.map((section, sIdx) => (
                    <div key={sIdx} className="space-y-6 pt-4">
                      {/* Section H2 with Purple Vertical Accent Bar */}
                      <h2
                        id={section.id}
                        className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white scroll-mt-28 flex items-center leading-tight tracking-tight pt-2"
                      >
                        <span className="w-2 h-8 bg-purple-600 rounded-full mr-3.5 inline-block flex-shrink-0" />
                        <span>{section.title}</span>
                      </h2>

                      {/* Section Intro Text */}
                      {section.intro && (
                        <div className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-[1.85] font-normal">
                          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                            {section.intro}
                          </ReactMarkdown>
                        </div>
                      )}

                      {/* Target Callout Box (Blockquote) */}
                      {section.quote && (
                        <div className="rounded-3xl bg-[#F5F3FF] dark:bg-purple-950/25 border border-[#DDD6FE] dark:border-purple-900/50 p-6 sm:p-7 flex items-start gap-4 my-8 shadow-sm">
                          <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 flex items-center justify-center flex-shrink-0 text-2xl shadow-xs">
                            🎯
                          </div>
                          <div>
                            <h4 className="font-extrabold text-purple-950 dark:text-purple-200 text-base sm:text-lg mb-1 leading-snug">
                              {section.quote.title}
                            </h4>
                            <p className="text-purple-800/90 dark:text-purple-300/80 text-sm sm:text-base leading-relaxed">
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
                            <h2 id={id} className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white scroll-mt-28 flex items-center leading-tight tracking-tight">
                              <span className="w-2 h-8 bg-purple-600 rounded-full mr-3.5 inline-block flex-shrink-0" />
                              <span>{props.children}</span>
                            </h2>
                          </div>
                        );
                      },
                      h3: ({ node, ...props }) => (
                        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
                          {props.children}
                        </h3>
                      ),
                      p: ({ node, ...props }) => (
                        <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-[1.85] mb-6 font-normal">
                          {props.children}
                        </p>
                      ),
                      blockquote: ({ node, ...props }) => (
                        <div className="rounded-3xl bg-[#F5F3FF] dark:bg-purple-950/25 border border-[#DDD6FE] dark:border-purple-900/50 p-6 sm:p-7 flex items-start gap-4 my-8 shadow-sm">
                          <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 flex items-center justify-center flex-shrink-0 text-2xl shadow-xs">
                            🎯
                          </div>
                          <div className="text-purple-950 dark:text-purple-200 text-base sm:text-lg leading-relaxed font-medium not-italic">
                            {props.children}
                          </div>
                        </div>
                      ),
                      ul: ({ node, ...props }) => (
                        <ul className="space-y-3 my-6 pl-1">{props.children}</ul>
                      ),
                      li: ({ node, ...props }) => (
                        <li className="flex items-start text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                          <span className="w-2 h-2 rounded-full bg-purple-600 mt-2.5 mr-3.5 flex-shrink-0" />
                          <span className="flex-1">{props.children}</span>
                        </li>
                      ),
                      strong: ({ node, ...props }) => (
                        <strong className="font-bold text-slate-900 dark:text-white">{props.children}</strong>
                      ),
                      a: ({ node, ...props }) => (
                        <a
                          {...props}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-600 dark:text-purple-400 font-semibold underline underline-offset-4 hover:text-purple-800 transition-colors"
                        />
                      ),
                      pre: ({ node, ...props }) => (
                        <pre className="bg-slate-950 text-slate-100 p-5 rounded-2xl overflow-x-auto my-8 border border-slate-800 text-sm font-mono shadow-lg leading-relaxed" {...props} />
                      ),
                      code: ({ node, ...props }) => (
                        <code className="text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/50 px-1.5 py-0.5 rounded text-sm font-mono font-medium" {...props} />
                      )
                    }}
                  >
                    {post.content}
                  </ReactMarkdown>
                </div>
              )}

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
              <div className="mt-14 p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-purple-900 via-indigo-950 to-slate-950 text-white shadow-xl relative overflow-hidden">
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
                <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm">
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
                              ? "bg-purple-100 dark:bg-purple-950/70 text-purple-900 dark:text-purple-200 font-bold border border-purple-200/80 dark:border-purple-800/80 shadow-xs"
                              : "text-slate-600 dark:text-slate-400 hover:text-purple-600 hover:bg-slate-50 dark:hover:bg-slate-800/60 font-medium"
                          } ${item.level === 3 ? "pl-6 text-xs sm:text-sm" : ""}`}
                        >
                          <span className={`w-2 h-2 rounded-full flex-shrink-0 ${isActive ? "bg-purple-600 ring-2 ring-purple-300" : "bg-slate-300 dark:bg-slate-600"}`} />
                          <span className="truncate">{item.text}</span>
                        </button>
                      );
                    })}
                  </nav>
                </div>
              )}

              {/* 2. NEWSLETTER / LEAD CAPTURE: "Get UX insights in your inbox" */}
              <div className="rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white p-6 sm:p-7 shadow-xl border border-slate-800 relative overflow-hidden">
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
                        <ArrowUpRight className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </form>
              </div>

              {/* 3. RELATED ARTICLES */}
              {recentPosts.length > 0 && (
                <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm">
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
                          <div className="w-16 h-16 flex-shrink-0 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/60">
                            <img
                              src={recent.cover_image}
                              alt={recent.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            />
                          </div>
                        ) : (
                          <div className="w-16 h-16 flex-shrink-0 rounded-2xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 flex items-center justify-center font-bold text-xs border border-purple-100 dark:border-purple-900">
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
