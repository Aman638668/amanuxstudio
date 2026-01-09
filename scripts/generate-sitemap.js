
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY;
const SITE_URL = 'https://amanuxstudio.com';

if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error('Error: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are required in .env file');
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const generateSitemap = async () => {
    console.log('Generating sitemap...');

    // 1. Static Pages
    const staticPages = [
        '',
        '/blog',
        '/services' // If you have services
    ];

    // 2. Fetch Blog Posts
    const { data: posts } = await supabase
        .from('posts')
        .select('slug, created_at')
        .eq('published', true);

    // 3. Fetch Categories
    const { data: categories } = await supabase
        .from('categories')
        .select('slug');

    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    // Add Static Pages
    staticPages.forEach(page => {
        sitemap += `
  <url>
    <loc>${SITE_URL}${page}</loc>
    <changefreq>weekly</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`;
    });

    // Add Blog Posts
    if (posts) {
        posts.forEach(post => {
            sitemap += `
  <url>
    <loc>${SITE_URL}/blog/${post.slug}</loc>
    <lastmod>${new Date(post.created_at).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
        });
    }

    // Add Categories
    if (categories) {
        categories.forEach(category => {
            sitemap += `
  <url>
    <loc>${SITE_URL}/category/${category.slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`;
        });
    }

    sitemap += `
</urlset>`;

    // Determine output path (public folder)
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const publicDir = path.resolve(__dirname, '../public');

    // Ensure public dir exists
    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir);
    }

    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
    console.log(`Sitemap generated successfully at ${path.join(publicDir, 'sitemap.xml')}`);
};

generateSitemap().catch(err => console.error(err));
