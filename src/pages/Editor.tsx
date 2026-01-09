
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Category } from "@/types/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { Save, Eye, Calendar, ArrowLeft } from "lucide-react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";

const Editor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(id ? true : false);
    const [saving, setSaving] = useState(false);

    // Form State
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [excerpt, setExcerpt] = useState("");
    const [content, setContent] = useState("");
    const [coverImage, setCoverImage] = useState("");
    const [published, setPublished] = useState(false);
    const [categoryId, setCategoryId] = useState<string>("");
    const [createdAt, setCreatedAt] = useState<string>(new Date().toISOString());

    // SEO State
    const [metaTitle, setMetaTitle] = useState("");
    const [metaDesc, setMetaDesc] = useState("");
    const [metaKeywords, setMetaKeywords] = useState("");

    // Data State
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        fetchCategories();
        if (id) {
            fetchPost(id);
        }
    }, [id]);

    const fetchCategories = async () => {
        const { data } = await supabase.from("categories").select("*").order("name");
        setCategories(data || []);
    };

    const fetchPost = async (postId: string) => {
        try {
            const { data, error } = await supabase.from("posts").select("*").eq("id", postId).single();
            if (error) throw error;
            if (data) {
                setTitle(data.title);
                setSlug(data.slug);
                setExcerpt(data.excerpt || "");
                setContent(data.content);
                setCoverImage(data.cover_image || "");
                setPublished(data.published);
                setCategoryId(data.category_id || "");
                setCreatedAt(data.created_at);

                // SEO
                setMetaTitle(data.meta_title || "");
                setMetaDesc(data.meta_description || "");
                setMetaKeywords(data.meta_keywords || "");
            }
        } catch (error) {
            console.error("Error fetching post:", error);
            toast.error("Failed to load post");
            navigate("/dashboard");
        } finally {
            setLoading(false);
        }
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleTitleBlur = () => {
        // Generate slug only if it's empty (first time)
        // This satisfies "only once" and "after title finish"
        if (!slug && title) {
            const generatedSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
            setSlug(generatedSlug);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            // Ensure slug exists if user didn't trigger blur
            let finalSlug = slug;
            if (!finalSlug && title) {
                finalSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
                setSlug(finalSlug);
            }

            const postData = {
                title,
                slug: finalSlug,
                excerpt,
                content,
                cover_image: coverImage,
                published,
                category_id: categoryId || null,
                created_at: createdAt,
                meta_title: metaTitle,
                meta_description: metaDesc,
                meta_keywords: metaKeywords
            };

            if (id) {
                const { error } = await supabase.from("posts").update(postData).eq("id", id);
                if (error) throw error;
                toast.success("Post updated successfully");
            } else {
                const { error } = await supabase.from("posts").insert(postData);
                if (error) throw error;
                toast.success("Post created successfully");
                navigate("/dashboard");
            }
        } catch (error: any) {
            console.error("Error saving post:", error);
            toast.error(error.message || "Failed to save");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading Editor...</div>;

    return (
        <DashboardLayout>
            <form onSubmit={handleSave} className="flex flex-col lg:flex-row gap-6">

                {/* LEFT COLUMN - MAIN EDITOR */}
                <div className="flex-1 space-y-6">
                    <div className="flex items-center justify-between mb-4">
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => navigate("/dashboard?tab=posts")}
                            className="text-gray-500"
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Posts
                        </Button>
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                            {id ? "Edit Post" : "Add New Post"}
                        </h1>
                    </div>

                    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                        <div className="mb-4">
                            <Input
                                value={title}
                                onChange={handleTitleChange}
                                onBlur={handleTitleBlur}
                                placeholder="Add title"
                                className="text-2xl font-bold border-gray-200 dark:border-slate-600 h-14 px-4 bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400"
                            />
                        </div>

                        {/* TinyMCE / WP Style Editor Container */}
                        <div className="editor-container bg-white dark:bg-slate-800 rounded-md">
                            <ReactQuill
                                theme="snow"
                                value={content}
                                onChange={setContent}
                                modules={{
                                    toolbar: [
                                        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                                        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                                        ['link', 'image', 'video'],
                                        ['clean']
                                    ],
                                }}
                                className="h-[500px] mb-12 dark:text-white"
                            />
                        </div>
                    </div>

                    {/* Excerpt Box */}
                    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                        <h3 className="font-semibold mb-3 text-gray-700 dark:text-slate-200">Excerpt</h3>
                        <Textarea
                            value={excerpt}
                            onChange={(e) => setExcerpt(e.target.value)}
                            className="bg-transparent border-gray-300 dark:border-slate-600 text-slate-900 dark:text-white focus:border-purple-500"
                            rows={3}
                        />
                    </div>
                </div>


                {/* RIGHT COLUMN - SIDEBAR META BOXES */}
                <div className="w-full lg:w-80 space-y-6">

                    {/* PUBLISH META BOX */}
                    <Card className="rounded-lg shadow-sm border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                        <CardHeader className="border-b border-gray-100 dark:border-slate-700 py-3 px-4">
                            <CardTitle className="text-sm font-bold uppercase text-gray-500 dark:text-slate-400">Publish</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 space-y-4">
                            <div className="space-y-2">
                                <Label className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase">Status</Label>
                                <select
                                    value={published ? "true" : "false"}
                                    onChange={(e) => setPublished(e.target.value === "true")}
                                    className="w-full rounded-md border border-gray-300 dark:border-slate-600 bg-transparent px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="false" className="dark:bg-slate-800">Draft</option>
                                    <option value="true" className="dark:bg-slate-800">Published</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase">Publish Date</Label>
                                <Input
                                    type="date"
                                    value={createdAt ? format(new Date(createdAt), "yyyy-MM-dd") : ""}
                                    onChange={(e) => setCreatedAt(new Date(e.target.value).toISOString())}
                                    className="dark:bg-slate-900 border-gray-300 dark:border-slate-600"
                                />
                            </div>

                            <div className="pt-4 flex flex-col gap-2">
                                <Button type="submit" disabled={saving} className="w-full bg-blue-600 hover:bg-blue-700 font-bold text-white">
                                    {saving ? "Saving..." : "Save Changes"}
                                </Button>
                                {id && (
                                    <Button type="button" variant="ghost" className="w-full text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 text-sm h-8">
                                        Move to Trash
                                    </Button>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* SEO SETTINGS BOX */}
                    <Card className="rounded-lg shadow-sm border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                        <CardHeader className="border-b border-gray-100 dark:border-slate-700 py-3 px-4">
                            <CardTitle className="text-sm font-bold uppercase text-gray-500 dark:text-slate-400">SEO Settings</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 space-y-3">
                            <div className="space-y-1">
                                <Label className="text-xs font-bold text-gray-500 dark:text-slate-400">Meta Title</Label>
                                <Input
                                    value={metaTitle}
                                    onChange={(e) => setMetaTitle(e.target.value)}
                                    placeholder="Custom page title..."
                                    className="bg-gray-50 dark:bg-slate-900 border-gray-200 dark:border-slate-700"
                                />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-xs font-bold text-gray-500 dark:text-slate-400">Meta Description</Label>
                                <Textarea
                                    value={metaDesc}
                                    onChange={(e) => setMetaDesc(e.target.value)}
                                    placeholder="Summary for search engines..."
                                    className="bg-gray-50 dark:bg-slate-900 border-gray-200 dark:border-slate-700"
                                    rows={3}
                                />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-xs font-bold text-gray-500 dark:text-slate-400">Keywords (Comma separated)</Label>
                                <Input
                                    value={metaKeywords}
                                    onChange={(e) => setMetaKeywords(e.target.value)}
                                    placeholder="seo, web design, react..."
                                    className="bg-gray-50 dark:bg-slate-900 border-gray-200 dark:border-slate-700"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* CATEGORIES META BOX */}
                    <Card className="rounded-lg shadow-sm border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                        <CardHeader className="border-b border-gray-100 dark:border-slate-700 py-3 px-4">
                            <CardTitle className="text-sm font-bold uppercase text-gray-500 dark:text-slate-400">Categories</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 max-h-60 overflow-y-auto">
                            {categories.map((cat) => (
                                <div key={cat.id} className="flex items-center space-x-2 mb-2">
                                    <Checkbox
                                        id={cat.id}
                                        checked={categoryId === cat.id}
                                        onCheckedChange={() => setCategoryId(cat.id)}
                                        className="rounded-sm border-gray-300 text-blue-600 focus:ring-blue-500 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                                    />
                                    <Label htmlFor={cat.id} className="text-sm font-medium text-gray-700 dark:text-slate-300 cursor-pointer">
                                        {cat.name}
                                    </Label>
                                </div>
                            ))}
                            {categories.length === 0 && <p className="text-sm text-gray-400">No categories found.</p>}
                        </CardContent>
                    </Card>

                    {/* SETTINGS / SLUG / IMAGE */}
                    <Card className="rounded-lg shadow-sm border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                        <CardHeader className="border-b border-gray-100 dark:border-slate-700 py-3 px-4">
                            <CardTitle className="text-sm font-bold uppercase text-gray-500 dark:text-slate-400">Featured Image</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 space-y-3">
                            {coverImage && (
                                <div className="mb-2 rounded-md overflow-hidden border border-gray-200 dark:border-slate-700">
                                    <img src={coverImage} alt="Cover" className="w-full h-32 object-cover" />
                                </div>
                            )}
                            <Input
                                placeholder="Image URL..."
                                value={coverImage}
                                onChange={(e) => setCoverImage(e.target.value)}
                                className="bg-gray-50 dark:bg-slate-900 border-gray-200 dark:border-slate-700 text-slate-900 dark:text-white"
                            />
                        </CardContent>
                    </Card>

                    <Card className="rounded-lg shadow-sm border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                        <CardContent className="p-4">
                            <Label className="text-xs font-bold text-gray-500 dark:text-slate-500 uppercase mb-2 block">Slug</Label>
                            <Input
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
                                className="bg-gray-50 dark:bg-slate-900 border-gray-200 dark:border-slate-700 text-slate-900 dark:text-white"
                            />
                        </CardContent>
                    </Card>

                </div>
            </form>
        </DashboardLayout>
    );
};

export default Editor;
