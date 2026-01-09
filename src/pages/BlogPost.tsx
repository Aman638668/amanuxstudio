import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Post } from "@/types/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { Calendar, User, ArrowLeft, Send } from "lucide-react";
import { toast } from "sonner";
import ReCAPTCHA from "react-google-recaptcha";

// Helper to strip HTML tags for meta description
const stripHtml = (html: string) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
};

// Helper to add lazy loading to images in content
const optimizeContent = (html: string) => {
    return html.replace(/<img /g, '<img loading="lazy" ');
};

type RecentPost = Pick<Post, "title" | "slug" | "created_at" | "cover_image">;

const BlogPost = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState<Post | null>(null);
    const [recentPosts, setRecentPosts] = useState<RecentPost[]>([]);
    const [loading, setLoading] = useState(true);

    // Form State
    const [contactName, setContactName] = useState("");
    const [contactEmail, setContactEmail] = useState("");
    const [contactMessage, setContactMessage] = useState("");

    useEffect(() => {
        fetchPost();
    }, [slug]);

    useEffect(() => {
        if (post?.category_id) {
            fetchRelatedPosts(post.category_id);
        } else {
            fetchRecentPosts();
        }
    }, [slug, post?.category_id]);

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
            .select("title, slug, created_at, cover_image")
            .eq("published", true)
            .eq("category_id", categoryId)
            .neq("slug", slug) // Exclude current
            .limit(6);

        if (data && data.length > 0) {
            setRecentPosts(data);
        } else {
            fetchRecentPosts(); // Fallback if no related
        }
    };

    const fetchRecentPosts = async () => {
        const { data } = await supabase
            .from("posts")
            .select("title, slug, created_at, cover_image")
            .eq("published", true)
            .neq("slug", slug)
            .order("created_at", { ascending: false })
            .limit(6);

        if (data) setRecentPosts(data);
    };

    const handleShare = (platform: 'twitter' | 'facebook' | 'linkedin' | 'copy') => {
        if (!post) return;
        const url = window.location.href;
        const text = `Check out this article: ${post.title}`;

        if (platform === 'twitter') window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
        if (platform === 'facebook') window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        if (platform === 'linkedin') window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        if (platform === 'copy') {
            navigator.clipboard.writeText(url);
            toast.success("Link copied to clipboard!");
        }
    };

    const recaptchaRef = useRef<ReCAPTCHA>(null);
    const [captchaVal, setCaptchaVal] = useState<string | null>(null);

    const onCaptchaChange = (token: string | null) => {
        if (token) {
            setCaptchaVal(token);
            submitMockForm(token);
        }
    };

    const submitMockForm = async (token: string) => {
        const submitButton = document.querySelector('#contact-submit') as HTMLButtonElement;
        if (submitButton) {
            submitButton.innerHTML = "Sending...";
            submitButton.disabled = true;
        }

        try {
            const response = await fetch('/api/discord-notify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: contactName,
                    email: contactEmail,
                    message: contactMessage,
                    title: `Blog Inquiry: ${post?.title || "General"}`,
                    token: token
                })
            });

            if (response.ok) {
                toast.success("Request sent! We'll be in touch.");
                setContactName("");
                setContactEmail("");
                setContactMessage("");
                setCaptchaVal(null);
                recaptchaRef.current?.reset();
            } else {
                toast.error("Failed to send message. Please try again.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong.");
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.innerHTML = "Send Request";
            }
        }
    };

    const handleContactSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        recaptchaRef.current?.execute();
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center text-slate-500">Loading Article...</div>;
    if (!post) return null;

    const metaDescription = post.meta_description || post.excerpt || stripHtml(post.content).substring(0, 160) + "...";
    const metaTitle = post.meta_title || post.title;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans flex flex-col">
            <Seo
                title={metaTitle}
                description={metaDescription}
                image={post.cover_image || undefined}
                url={`/blog/${post.slug}`}
                type="article"
                keywords={post.meta_keywords}
                publishedTime={post.created_at}
                author="Aman UX Studio"
            />
            <Navigation />

            <div className="flex-grow pt-24 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Breadcrumb / Back */}
                    <div className="mb-8 flex items-center justify-between">
                        <Button variant="ghost" onClick={() => navigate("/blog")} className="text-slate-600 dark:text-slate-400 hover:text-blue-600 -ml-4">
                            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Blog
                        </Button>
                        <div className="flex gap-2">
                            <Button variant="outline" size="icon" onClick={() => handleShare('twitter')} className="rounded-full w-8 h-8"><span className="sr-only">Twitter</span><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg></Button>
                            <Button variant="outline" size="icon" onClick={() => handleShare('facebook')} className="rounded-full w-8 h-8"><span className="sr-only">Facebook</span><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg></Button>
                            <Button variant="outline" size="icon" onClick={() => handleShare('linkedin')} className="rounded-full w-8 h-8"><span className="sr-only">LinkedIn</span><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg></Button>
                            <Button variant="outline" size="icon" onClick={() => handleShare('copy')} className="rounded-full w-8 h-8 opacity-70 hover:opacity-100"><span className="sr-only">Copy Link</span><svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg></Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                        {/* LEFT COLUMN: Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Header Section */}
                            <div>
                                {post.categories && (
                                    <Link
                                        to={`/category/${post.categories.slug}`}
                                        className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 text-xs font-semibold tracking-wide uppercase mb-4 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                                    >
                                        {post.categories.name}
                                    </Link>
                                )}
                                {!post.categories && (
                                    <span className="inline-block py-1 px-3 rounded-full bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 text-xs font-semibold tracking-wide uppercase mb-4">
                                        Article
                                    </span>
                                )}

                                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight mb-6">
                                    {post.title}
                                </h1>

                                <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm mb-8 border-b border-slate-200 dark:border-slate-800 pb-8">
                                    <div className="flex items-center mr-6">
                                        <span className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center mr-2">
                                            <User className="h-4 w-4" />
                                        </span>
                                        <span>AmanUX Team</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Calendar className="h-4 w-4 mr-2" />
                                        {format(new Date(post.created_at), "MMMM d, yyyy")}
                                    </div>
                                </div>
                            </div>

                            {/* Featured Image */}
                            {post.cover_image && (
                                <div className="rounded-2xl overflow-hidden shadow-lg mb-10 aspect-video relative group">
                                    <img
                                        src={post.cover_image}
                                        alt={post.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}

                            {/* Content Body */}
                            <article className="prose prose-lg dark:prose-invert prose-slate max-w-none prose-headings:scroll-mt-24 prose-img:rounded-xl">
                                <div dangerouslySetInnerHTML={{ __html: optimizeContent(post.content) }} />
                            </article>

                            {/* Tags / Keywords (if any) */}
                            {post.meta_keywords && (
                                <div className="pt-8 border-t border-slate-100 dark:border-slate-800">
                                    <p className="text-sm font-bold text-slate-900 dark:text-white mb-3">Tags:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {post.meta_keywords.split(',').map((tag, i) => (
                                            <span key={i} className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-1 rounded">#{tag.trim()}</span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>


                        {/* RIGHT COLUMN: Sidebar */}
                        <div className="space-y-8 lg:sticky lg:top-24 lg:h-fit">

                            {/* Contact/Lead Form */}
                            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 border border-slate-100 dark:border-slate-700">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Request a Quote</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
                                    Interested in our services? Fill out the form below.
                                </p>

                                <form onSubmit={handleContactSubmit} className="space-y-4">
                                    {/* ... form inputs remain same ... */}
                                    <div className="space-y-1">
                                        <Label htmlFor="name" className="text-xs font-bold uppercase text-slate-500">Name</Label>
                                        <Input
                                            id="name"
                                            placeholder="Your full name"
                                            value={contactName}
                                            onChange={(e) => setContactName(e.target.value)}
                                            className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="email" className="text-xs font-bold uppercase text-slate-500">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="you@company.com"
                                            value={contactEmail}
                                            onChange={(e) => setContactEmail(e.target.value)}
                                            className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="message" className="text-xs font-bold uppercase text-slate-500">Message</Label>
                                        <Textarea
                                            id="message"
                                            placeholder="How can we help?"
                                            rows={3}
                                            value={contactMessage}
                                            onChange={(e) => setContactMessage(e.target.value)}
                                            className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700"
                                            required
                                        />
                                    </div>

                                    <div className="flex justify-center">
                                        <ReCAPTCHA
                                            ref={recaptchaRef}
                                            sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY || "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"}
                                            size="invisible"
                                            onChange={onCaptchaChange}
                                        />
                                    </div>

                                    <Button id="contact-submit" type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-5">
                                        Send Request <Send className="ml-2 h-4 w-4" />
                                    </Button>
                                </form>
                            </div>

                            {/* Related Blogs */}
                            <div className="max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center sticky top-0 bg-slate-50 dark:bg-slate-900 py-2 z-10">
                                    <span className="w-1 h-6 bg-blue-600 rounded-full mr-3"></span>
                                    {recentPosts.length > 0 && post?.category_id ? "Related Articles" : "Recent Articles"}
                                </h3>
                                <div className="space-y-4">
                                    {recentPosts.map((recent) => (
                                        <Link
                                            key={recent.slug}
                                            to={`/blog/${recent.slug}`}
                                            className="group flex gap-4 bg-white dark:bg-slate-800 p-3 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700 hover:border-blue-200 dark:hover:border-blue-900 transition-colors"
                                        >
                                            {recent.cover_image && (
                                                <div className="w-20 h-20 flex-shrink-0 rounded-md overflow-hidden">
                                                    <img src={recent.cover_image} alt={recent.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                                                </div>
                                            )}
                                            <div className="flex-grow">
                                                <h4 className="font-semibold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 transition-colors line-clamp-2 text-sm leading-snug mb-1">
                                                    {recent.title}
                                                </h4>
                                                <div className="text-xs text-slate-400">
                                                    {format(new Date(recent.created_at), "MMM d, yyyy")}
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                    {recentPosts.length === 0 && <p className="text-slate-500 text-sm">No related posts found.</p>}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default BlogPost;
