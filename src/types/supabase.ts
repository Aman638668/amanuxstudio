export interface Category {
    id: string;
    name: string;
    slug: string;
    created_at: string;
}

export interface Post {
    id: string;
    created_at: string;
    title: string;
    slug: string;
    excerpt: string | null;
    content: string;
    cover_image: string | null;
    published: boolean;
    category_id?: string | null;
    categories?: Category; // For joined queries
    meta_title?: string;
    meta_description?: string;
    meta_keywords?: string;
}

export type WebsiteVisit = {
    id: string;
    page: string;
    user_agent?: string;
    ip_address?: string; // Note: You might want to hash this or not store it for privacy
    created_at: string;
};
