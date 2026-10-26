import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
const DISCORD_WEBHOOK = process.env.DISCORD_WEBHOOK_URL;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Curated library of high-value agency & developer topics
const TOPIC_TEMPLATES = [
  {
    title: "10 Proven UX Principles That Double E-Commerce Conversion Rates",
    slugPrefix: "ux-principles-ecommerce-conversion",
    category: "Design",
    excerpt: "Discover the critical UX tweaks—from frictionless checkout to psychological trust signals—that turn casual store visitors into repeat buyers.",
    keywords: "UX Design, E-commerce CRO, Web Development, User Experience, Conversion Rate",
    coverImage: "https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=1200&q=80",
    content: `
# 10 Proven UX Principles That Double E-Commerce Conversion Rates

In digital commerce, user experience (UX) isn't just about pretty visuals—it directly dictates your bottom line. A confusing checkout or sluggish product page can kill conversions before a customer even enters their credit card.

Here are 10 battle-tested UX strategies we implement at **Aman UX Studio** to turn visitors into buyers.

---

## 1. Eliminate Checkout Friction
Every extra input field in your checkout form reduces completion rates by up to 8%. 
- Use single-page or accordion checkouts.
- Enable Google Pay, Apple Pay, and UPI express checkouts.
- Offer guest checkout prominently—never force account creation before purchasing.

## 2. Prioritize Mobile-First Thumb Zones
Over 70% of modern e-commerce browsing happens on smartphones. Ensure your "Add to Cart" and primary action buttons stay within easy reach of the user's thumb in the lower third of the screen.

\`\`\`css
/* Sticky Mobile Add-to-Cart */
.sticky-buy-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  background: #ffffff;
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.08);
  z-index: 50;
}
\`\`\`

## 3. High-Clarity Visual Hierarchy
Your value proposition must be clear within 3 seconds. Use bold typography, high-contrast CTA buttons, and high-resolution product photography with 360° or zoom previews.

## 4. Transparent Shipping & Delivery Timelines
Unexpected shipping fees at checkout are the #1 cause of cart abandonment. Display estimated delivery dates and transparent shipping costs right on the product page.

## 5. Harness Micro-Interactions for Feedback
Provide instant, rewarding visual feedback when someone adds an item to cart or applies a coupon. Small animations reassure users that the system responded to their input.

## Conclusion
Optimizing your digital store's UX is the highest ROI investment you can make in your business. Want a full UX audit of your online platform? [Reach out to Aman UX Studio today](https://amanuxstudio.com/#contact).
`
  },
  {
    title: "Why Modern Web Apps are Migrating to TypeScript and Tailwind CSS",
    slugPrefix: "why-web-apps-migrate-typescript-tailwind",
    category: "Development",
    excerpt: "Explore how the combination of static typing with utility-first CSS has become the industry standard for fast, maintainable web applications.",
    keywords: "TypeScript, Tailwind CSS, Frontend Development, React, Web Architecture",
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    content: `
# Why Modern Web Apps are Migrating to TypeScript and Tailwind CSS

Over the past few years, the frontend ecosystem has coalesced around a unified modern stack: **TypeScript** for type safety and **Tailwind CSS** for design velocity.

At **Aman UX Studio**, this combination powers our fastest, most reliable production applications. Here is why this tech stack dominates modern web development.

---

## 1. Compile-Time Confidence with TypeScript
Dynamic JavaScript is flexible, but runtime bugs like \`Cannot read properties of undefined\` cause expensive outages. TypeScript catches these errors during compilation before your code touches production.

\`\`\`typescript
interface ClientProject {
  id: string;
  name: string;
  budget: number;
  status: 'planning' | 'in_progress' | 'launched';
}

function calculateMilestone(project: ClientProject) {
  // Autocomplete and type checking ensures zero typos
  return project.status === 'launched' ? 'Complete' : 'Pending';
}
\`\`\`

## 2. Zero Context-Switching with Tailwind CSS
Traditional CSS requires jumping back and forth between style sheets and markup, inventing arbitrary class names. With Tailwind CSS:
- Styles are co-located with your components.
- Bundle sizes remain tiny thanks to automatic purge/tree-shaking.
- Responsive design and dark mode are as simple as prefixing \`md:\` or \`dark:\`.

## 3. Seamless Design System Tokens
Tailwind design tokens allow you to enforce consistent spacing, color palettes, and typography across an entire team with zero design drift.

## Ready to Modernize Your Web Stack?
If your team is looking to build a high-performance web app with React, Next.js, and TypeScript, [get in touch with Aman UX Studio](https://amanuxstudio.com/#contact) to start building today.
`
  },
  {
    title: "Core Web Vitals in 2026: The Complete Guide to Sub-Second Page Speeds",
    slugPrefix: "core-web-vitals-guide-sub-second-speed",
    category: "SEO",
    excerpt: "Learn how to optimize Largest Contentful Paint (LCP), Interaction to Next Paint (INP), and Cumulative Layout Shift (CLS) for top Google rankings.",
    keywords: "Core Web Vitals, Performance Optimization, INP, LCP, SEO, PageSpeed",
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    content: `
# Core Web Vitals in 2026: The Complete Guide to Sub-Second Page Speeds

Google's search algorithm rewards fast, responsive websites and penalizes sluggish ones. With the adoption of **INP (Interaction to Next Paint)** as an official Core Web Vital, page speed is no longer just a technical metric—it is an essential SEO ranking factor.

---

## Key Metrics to Master
1. **LCP (Largest Contentful Paint)**: How fast the main banner or heading renders (Target: < 2.5s).
2. **INP (Interaction to Next Paint)**: How quickly the UI responds to clicks, taps, or key presses (Target: < 200ms).
3. **CLS (Cumulative Layout Shift)**: Visual stability while assets load (Target: < 0.1).

## 3 High-Impact Fixes to Implement Today

### 1. Optimize and Serve Next-Gen Images
Never serve raw JPEGs or PNGs without compression. Convert your assets to **WebP** or **AVIF** and set explicit dimensions to eliminate CLS:

\`\`\`html
<img 
  src="/assets/banner.webp" 
  alt="Digital Agency Showcase" 
  width="1200" 
  height="630" 
  loading="eager" 
  fetchpriority="high"
/>
\`\`\`

### 2. Code-Split Heavy JavaScript
Prevent massive monolithic bundles by dynamically importing client-side libraries only when they are rendered on screen.

### 3. Edge Caching & Lightweight Fonts
Host your custom web fonts locally and preload your primary typeface using \`<link rel="preload">\`.

---
Need an in-depth performance audit for your website? Let **Aman UX Studio** optimize your platform for blistering speeds and top organic rankings.
`
  }
];

async function generateAndPublishBlog() {
  console.log("🚀 Starting Daily Blog Post Automation...");

  if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error("❌ SUPABASE_URL or SUPABASE_KEY missing. Cannot publish.");
    process.exit(1);
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

  // Pick a topic randomly or cycle through
  const index = Math.floor(Math.random() * TOPIC_TEMPLATES.length);
  const template = TOPIC_TEMPLATES[index];

  const timestamp = Date.now().toString().slice(-4);
  const slug = `${template.slugPrefix}-${timestamp}`;

  // Find or link category
  let categoryId = null;
  const { data: categoryData } = await supabase
    .from("categories")
    .select("id")
    .ilike("name", template.category)
    .single();

  if (categoryData) {
    categoryId = categoryData.id;
  }

  const newPost = {
    title: `${template.title}`,
    slug: slug,
    excerpt: template.excerpt,
    content: template.content,
    cover_image: template.coverImage,
    published: true,
    category_id: categoryId,
    meta_title: `${template.title} | Aman UX Studio`,
    meta_description: template.excerpt,
    meta_keywords: template.keywords,
    created_at: new Date().toISOString()
  };

  console.log(`📝 Inserting new post: "${newPost.title}" (${slug})...`);

  const { data: insertedPost, error: insertError } = await supabase
    .from("posts")
    .insert([newPost])
    .select()
    .single();

  if (insertError) {
    console.error("❌ Failed to insert blog post:", insertError);
    process.exit(1);
  }

  console.log("✅ Post successfully published into Supabase!");

  // Dispatch Discord alert
  if (DISCORD_WEBHOOK) {
    try {
      await fetch(DISCORD_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: `📢 **New Daily Blog Published on Aman UX Studio!**`,
          embeds: [
            {
              title: newPost.title,
              url: `https://amanuxstudio.com/blog/${slug}`,
              description: newPost.excerpt,
              color: 0x10B981,
              fields: [
                { name: "🔗 URL", value: `https://amanuxstudio.com/blog/${slug}` },
                { name: "📂 Category", value: template.category, inline: true },
                { name: "🏷️ Keywords", value: template.keywords, inline: true }
              ],
              timestamp: new Date().toISOString()
            }
          ]
        })
      });
      console.log("🔔 Discord notification dispatched!");
    } catch (webhookErr) {
      console.warn("⚠️ Could not send Discord notification:", webhookErr.message);
    }
  }

  return slug;
}

generateAndPublishBlog()
  .then((slug) => {
    console.log(`🎉 Daily Blog Automation Completed! Live at /blog/${slug}`);
  })
  .catch((err) => {
    console.error("Fatal automation error:", err);
    process.exit(1);
  });
