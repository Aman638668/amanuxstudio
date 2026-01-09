
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Category } from "@/types/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Trash2, Plus, Tag } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const CategoryManager = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [newCategoryName, setNewCategoryName] = useState("");
    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const { data, error } = await supabase
                .from("categories")
                .select("*")
                .order("name");

            if (error) throw error;
            setCategories(data || []);
        } catch (error) {
            console.error("Error fetching categories:", error);
            toast.error("Failed to load categories");
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newCategoryName.trim()) return;
        setCreating(true);

        const slug = newCategoryName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

        try {
            const { data, error } = await supabase
                .from("categories")
                .insert({ name: newCategoryName, slug })
                .select()
                .single();

            if (error) throw error;

            setCategories([...categories, data]);
            setNewCategoryName("");
            toast.success("Category created");
        } catch (error: any) {
            console.error("Error key:", error);
            toast.error(error.message || "Failed to create category");
        } finally {
            setCreating(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this category?")) return;
        try {
            const { error } = await supabase.from("categories").delete().eq("id", id);
            if (error) throw error;
            setCategories(categories.filter(c => c.id !== id));
            toast.success("Category deleted");
        } catch (error) {
            console.error("Error deleting category:", error);
            toast.error("Failed to delete category");
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm">
            <CardHeader className="border-b border-slate-200 dark:border-slate-700 px-6 py-4">
                <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-800 dark:text-white">
                    <Tag className="h-5 w-5 text-purple-600" /> Categories
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
                <form onSubmit={handleCreate} className="flex gap-4 mb-8">
                    <div className="flex-1">
                        <Input
                            placeholder="New Category Name"
                            value={newCategoryName}
                            onChange={(e) => setNewCategoryName(e.target.value)}
                            className="w-full bg-transparent border-slate-200 dark:border-slate-600 focus:border-purple-500 dark:focus:border-purple-500 text-slate-800 dark:text-white"
                        />
                    </div>
                    <Button type="submit" disabled={creating} className="bg-purple-600 hover:bg-purple-700 text-white min-w-[50px]">
                        <Plus className="h-5 w-5" />
                    </Button>
                </form>

                <div className="flex flex-wrap gap-3">
                    {categories.map((category) => (
                        <Badge
                            key={category.id}
                            variant="secondary"
                            className="pl-4 pr-2 py-1.5 flex items-center gap-2 bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-white text-sm border-0 font-medium rounded-full"
                        >
                            {category.name}
                            <button
                                onClick={() => handleDelete(category.id)}
                                className="h-6 w-6 rounded-full hover:bg-red-500 hover:text-white text-slate-400 flex items-center justify-center transition-all ml-1"
                            >
                                <Trash2 className="h-3.5 w-3.5" />
                            </button>
                        </Badge>
                    ))}
                    {categories.length === 0 && (
                        <p className="text-sm text-gray-500 italic">No categories yet. Create one above!</p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default CategoryManager;
