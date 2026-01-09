
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Post } from "@/types/supabase";

interface CreatePostFormProps {
    postToEdit?: Post | null;
    onSuccess?: () => void;
    onCancel?: () => void;
}

const CreatePostForm = ({ postToEdit, onSuccess, onCancel }: CreatePostFormProps) => {
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [excerpt, setExcerpt] = useState("");
    const [content, setContent] = useState("");
    const [coverImage, setCoverImage] = useState("");
    const [published, setPublished] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (postToEdit) {
            setTitle(postToEdit.title);
            setSlug(postToEdit.slug);
            setExcerpt(postToEdit.excerpt || "");
            setContent(postToEdit.content);
            setCoverImage(postToEdit.cover_image || "");
            setPublished(postToEdit.published);
        } else {
            resetForm();
        }
    }, [postToEdit]);

    const resetForm = () => {
        setTitle("");
        setSlug("");
        setExcerpt("");
        setContent("");
        setCoverImage("");
        setPublished(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (postToEdit) {
                // Update existing post
                const { error } = await supabase
                    .from("posts")
                    .update({
                        title,
                        slug,
                        excerpt,
                        content,
                        cover_image: coverImage,
                        published,
                    })
                    .eq("id", postToEdit.id);

                if (error) throw error;
                toast.success("Post updated successfully");
            } else {
                // Create new post
                const { error } = await supabase.from("posts").insert({
                    title,
                    slug,
                    excerpt,
                    content,
                    cover_image: coverImage,
                    published,
                });

                if (error) throw error;
                toast.success("Post created successfully");
                resetForm();
            }

            onSuccess?.();
        } catch (error: any) {
            console.error("Error saving post:", error);
            toast.error(error.message || "Failed to save post");
        } finally {
            setLoading(false);
        }
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        setTitle(newTitle);
        if (!postToEdit && !slug) {
            setSlug(newTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""));
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>{postToEdit ? "Edit Post" : "Create New Post"}</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input id="title" value={title} onChange={handleTitleChange} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="slug">Slug</Label>
                            <Input id="slug" value={slug} onChange={(e) => setSlug(e.target.value)} required />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="coverImage">Cover Image URL</Label>
                        <Input id="coverImage" value={coverImage} onChange={(e) => setCoverImage(e.target.value)} placeholder="https://example.com/image.jpg" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="excerpt">Excerpt</Label>
                        <Textarea id="excerpt" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={3} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="content">Content (Markdown supported)</Label>
                        <div className="min-h-[200px] border rounded-md p-2">
                            <textarea
                                id="content"
                                className="w-full h-full min-h-[200px] bg-transparent outline-none resize-y font-mono text-sm"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="published"
                            checked={published}
                            onCheckedChange={(checked) => setPublished(checked as boolean)}
                        />
                        <Label htmlFor="published">Publish immediately</Label>
                    </div>

                    <div className="flex space-x-2">
                        <Button type="submit" disabled={loading} className="w-full">
                            {loading ? "Saving..." : (postToEdit ? "Update Post" : "Create Post")}
                        </Button>
                        {postToEdit && (
                            <Button type="button" variant="outline" onClick={onCancel}>
                                Cancel
                            </Button>
                        )}
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};

export default CreatePostForm;
