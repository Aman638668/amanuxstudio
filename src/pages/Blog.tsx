import Navigation from "@/components/Navigation";
import PageHeader from "@/components/PageHeader";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import { Post } from "@/types/supabase";
import BlogCard from "@/components/BlogCard";
import { CURATED_BLOG_POSTS } from "@/data/blogArticles";
import { ChevronLeft, ChevronRight, Search, Sparkles, ArrowUpRight, Clock, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  "All",
  "WordPress & Performance",
  "UI/UX Design",
  "Conversion Strategy"
];

const POSTS_PER_PAGE = 6;

const Blog = () => {
  const [dbPosts, setDbPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("posts")
        .select("*, categories(id, name, slug)")
        .eq("published", true)
        .order("created_at", { ascending: false });

      if (error) {
        console.warn("Supabase fetch failed, falling back to curated articles:", error);
        setDbPosts([]);
      } else {
        setDbPosts(data || []);
      }
    } catch (err) {
      console.warn("Error fetching posts:", err);
      setDbPosts([]);
    } finally {
      setLoading(false);
    }
  };

  // Merge DB posts with Curated high-ranking articles (deduping by slug)
  const allPosts = useMemo(() => {
    const slugMap = new Map<string, Post>();

    // Add curated first as high-priority ranking articles
    CURATED_BLOG_POSTS.forEach((post) => {
      slugMap.set(post.slug, post);
    });

    // Add DB posts if not already present
    dbPosts.forEach((post) => {
      if (!slugMap.has(post.slug)) {
        slugMap.set(post.slug, post);
      }
    });

    return Array.from(slugMap.values());
  }, [dbPosts]);

  // Filter by category and search
  const filteredPosts = useMemo(() => {
    return allPosts.filter((post) => {
      const categoryName = post.categories?.name || "General";
      const matchesCategory =
        selectedCategory === "All" ||
        categoryName.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        (selectedCategory === "WordPress & Performance" &&
          (post.title.toLowerCase().includes("wordpress") || post.title.toLowerCase().includes("speed"))) ||
        (selectedCategory === "UI/UX Design" &&
          (post.title.toLowerCase().includes("ux") || post.title.toLowerCase().includes("figma") || post.title.toLowerCase().includes("design"))) ||
        (selectedCategory === "Conversion Strategy" &&
          (post.title.toLowerCase().includes("conversion") || post.title.toLowerCase().includes("cro") || post.title.toLowerCase().includes("saas")));

      const matchesSearch =
        searchQuery.trim() === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.excerpt && post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (post.meta_keywords && post.meta_keywords.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [allPosts, selectedCategory, searchQuery]);

  // Featured post is the first article (or sub-second wordpress)
  const featuredPost = filteredPosts[0] || CURATED_BLOG_POSTS[0];

  // Paginated remainder of posts
  const remainingPosts = useMemo(() => {
    // If no search or category filtering is applied, we don't repeat the featured post in the grid
    if (selectedCategory === "All" && searchQuery.trim() === "") {
      return filteredPosts.slice(1);
    }
    return filteredPosts;
  }, [filteredPosts, selectedCategory, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(remainingPosts.length / POSTS_PER_PAGE));
  const paginatedPosts = useMemo(() => {
    const from = (page - 1) * POSTS_PER_PAGE;
    return remainingPosts.slice(from, from + POSTS_PER_PAGE);
  }, [remainingPosts, page]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      window.scrollTo({ top: 380, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#09090c] text-[#eeece8] flex flex-col font-sans selection:bg-blue-600/30 selection:text-white">
      <Seo
        title="Web Design & WordPress Development Journal"
        description="Actionable guides on custom WordPress development, sub-second TTFB optimization, high-converting UI/UX systems, and Core Web Vitals from Aman UX Studio."
        url="/blog"
        keywords="web design blog, custom wordpress development, woocommerce speed, conversion rate optimization, figma to code, aman sharma"
      />

      <Navigation />

      <PageHeader
        title="The Design & Engineering Journal"
        description="In-depth technical blueprints, high-intent conversion frameworks, and performance case studies written by web developer & designer Aman Sharma."
      />

      <main className="flex-grow container mx-auto px-6 py-12 max-w-7xl">
        {/* Controls Bar: Search & Topic Filter */}
        <div className="mb-14 space-y-6">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
              {CATEGORIES.map((category) => {
                const isActive = selectedCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setPage(1);
                    }}
                    className={cn(
                      "px-4 py-2 rounded-full text-xs font-mono tracking-wider whitespace-nowrap transition-all duration-200 border",
                      isActive
                        ? "bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-900/40 font-semibold"
                        : "bg-[#0e0e14] text-[#94a3b8] border-white/10 hover:text-white hover:border-white/20"
                    )}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748b]" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPage(1);
                }}
                className="pl-10 pr-4 h-10 rounded-full bg-[#0e0e14] border-white/10 text-[#eeece8] placeholder:text-[#64748b] text-xs font-mono focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* =========================================================================
            FEATURED SPOTLIGHT ARTICLE (Editorial Magazine Hero)
           ========================================================================= */}
        {featuredPost && selectedCategory === "All" && searchQuery.trim() === "" && (
          <section className="mb-16">
            <div className="flex items-center gap-2 mb-4 text-xs font-mono uppercase tracking-widest text-blue-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Spotlight Case Study</span>
            </div>

            <Link
              to={`/blog/${featuredPost.slug}`}
              className="group block rounded-3xl bg-[#0e0e14] border border-white/10 overflow-hidden hover:border-blue-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-950/30"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                {/* Visual Half */}
                <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto overflow-hidden bg-[#14141e] min-h-[320px]">
                  {featuredPost.cover_image && (
                    <img
                      src={featuredPost.cover_image}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e14] via-transparent to-transparent lg:hidden" />
                  <div className="absolute top-5 left-5">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider font-semibold bg-black/80 backdrop-blur-md text-blue-300 border border-blue-500/30">
                      {featuredPost.categories?.name || "WordPress & Performance"}
                    </span>
                  </div>
                </div>

                {/* Editorial Content Half */}
                <div className="lg:col-span-5 p-8 sm:p-10 lg:p-12 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 text-xs font-mono text-[#94a3b8] mb-4">
                      <span>March 2026</span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-blue-400">
                        <Clock className="w-3.5 h-3.5" />
                        7 min read
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-extrabold text-[#eeece8] group-hover:text-blue-300 transition-colors leading-tight tracking-tight mb-4">
                      {featuredPost.title}
                    </h2>

                    <p className="text-[#94a3b8] text-sm sm:text-base leading-relaxed mb-6 line-clamp-3">
                      {featuredPost.excerpt}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-xs font-bold text-blue-400">
                        AS
                      </div>
                      <div>
                        <span className="block text-xs font-semibold text-[#eeece8]">Aman Sharma</span>
                        <span className="block text-[11px] text-[#64748b]">Web Developer & UI/UX</span>
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1.5 text-xs font-mono text-blue-400 group-hover:text-blue-300 font-semibold">
                      Read Blueprint
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* =========================================================================
            ARTICLES GRID
           ========================================================================= */}
        <section>
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
            <h3 className="text-lg font-bold text-[#eeece8] flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-400" />
              <span>Latest Articles</span>
              <span className="text-xs font-mono text-[#64748b] font-normal">
                ({filteredPosts.length} published)
              </span>
            </h3>
          </div>

          {paginatedPosts.length === 0 ? (
            <div className="text-center py-24 rounded-3xl bg-[#0e0e14] border border-white/10">
              <p className="text-[#94a3b8] text-sm mb-4">No articles match your criteria.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="border-white/10 text-xs font-mono hover:bg-white/5"
              >
                Reset Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {paginatedPosts.map((post) => (
                <BlogCard key={post.id || post.slug} post={post} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 pt-6">
              <Button
                variant="ghost"
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className="text-[#94a3b8] hover:text-white hover:bg-white/5 font-mono text-xs flex items-center gap-1 px-3 disabled:opacity-30"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>

              <div className="flex items-center gap-1.5 mx-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={cn(
                      "w-9 h-9 rounded-xl text-xs font-mono font-medium transition-all duration-200 border",
                      page === pageNum
                        ? "bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-900/40 scale-105"
                        : "bg-[#0e0e14] text-[#94a3b8] hover:bg-white/5 border-white/10"
                    )}
                  >
                    {pageNum}
                  </button>
                ))}
              </div>

              <Button
                variant="ghost"
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
                className="text-[#94a3b8] hover:text-white hover:bg-white/5 font-mono text-xs flex items-center gap-1 px-3 disabled:opacity-30"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
