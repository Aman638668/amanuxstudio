import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY;
const SITE_URL = 'https://amanuxstudio.vercel.app';

// Core Curated High-Intent Articles (Pillar content)
const CURATED_SLUGS = [
  { slug: 'sub-second-wordpress-speed-guide', lastmod: '2026-03-12T10:00:00.000Z' },
  { slug: 'why-agency-websites-fail', lastmod: '2026-03-08T10:00:00.000Z' },
  { slug: 'figma-to-wordpress-workflow', lastmod: '2026-03-05T10:00:00.000Z' },
  { slug: 'ecommerce-conversion-rate-optimization-guide', lastmod: '2026-03-01T10:00:00.000Z' },
  { slug: 'saas-landing-page-ux-guide', lastmod: '2026-02-25T10:00:00.000Z' }
];

const CURATED_CATEGORIES = [
  'wordpress-performance',
  'ui-ux-design',
  'conversion-strategy'
];

const generateSitemap = async () => {
    console.log('Generating comprehensive sitemap...');

    // 1. Static Core Pages
    const staticPages = [
        { path: '', priority: '1.0', changefreq: 'daily' },
        { path: '/services', priority: '0.9', changefreq: 'weekly' },
        { path: '/portfolio', priority: '0.9', changefreq: 'weekly' },
        { path: '/about', priority: '0.8', changefreq: 'monthly' },
        { path: '/resume', priority: '0.8', changefreq: 'monthly' },
        { path: '/blog', priority: '0.9', changefreq: 'daily' },
        { path: '/testimonials', priority: '0.8', changefreq: 'weekly' },
        { path: '/contact', priority: '0.8', changefreq: 'monthly' },
        { path: '/privacy', priority: '0.5', changefreq: 'yearly' },
        { path: '/terms', priority: '0.5', changefreq: 'yearly' }
    ];

    const postMap = new Map();
    // Add curated posts first
    CURATED_SLUGS.forEach(p => postMap.set(p.slug, p));

    const categorySet = new Set(CURATED_CATEGORIES);

    if (SUPABASE_URL && SUPABASE_KEY) {
        try {
            const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

            // Fetch DB Blog Posts
            const { data: postsData } = await supabase
                .from('posts')
                .select('slug, created_at')
                .eq('published', true);

            if (postsData) {
                postsData.forEach(p => {
                    postMap.set(p.slug, {
                        slug: p.slug,
                        lastmod: new Date(p.created_at).toISOString()
                    });
                });
            }

            // Fetch Categories
            const { data: categoriesData } = await supabase
                .from('categories')
                .select('slug');

            if (categoriesData) {
                categoriesData.forEach(c => categorySet.add(c.slug));
            }
        } catch (err) {
            console.warn('Warning: Could not fetch dynamic content from Supabase for sitemap:', err.message);
        }
    }

    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    // Add Static Pages
    staticPages.forEach(page => {
        sitemap += `
  <url>
    <loc>${SITE_URL}${page.path}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
    });

    // Add Blog Posts
    Array.from(postMap.values()).forEach(post => {
        sitemap += `
  <url>
    <loc>${SITE_URL}/blog/${post.slug}</loc>
    <lastmod>${post.lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
    });

    // Add Categories
    Array.from(categorySet).forEach(catSlug => {
        sitemap += `
  <url>
    <loc>${SITE_URL}/category/${catSlug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`;
    });

    sitemap += `
</urlset>`;

    // Determine output path (public folder)
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const publicDir = path.resolve(__dirname, '../public');

    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
    }

    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
    console.log(`Sitemap generated successfully at ${path.join(publicDir, 'sitemap.xml')}`);
};

generateSitemap().catch(err => {
    console.error('Sitemap generation error:', err);
});
