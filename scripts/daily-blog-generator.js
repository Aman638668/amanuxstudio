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

// Topic prompts for dynamic AI generation
const AI_TOPIC_IDEAS = [
  "How to optimize mobile landing page UX for 2x checkout conversions",
  "React 19 Server Actions vs traditional REST APIs: Real-world agency comparison",
  "WordPress speed optimization: How to pass Google Core Web Vitals under 1.2s",
  "The psychology of pricing tables: How to design SaaS tier cards that convert",
  "WooCommerce performance tuning: Scaling beyond 10,000 orders without server slowdown",
  "Why your landing page is leaking revenue: Heuristic UX checklist for 2026",
  "Next.js App Router caching strategies: Eliminating slow TTFB and stale client data",
  "Form conversion rate optimization: 7 psychological tricks to stop form abandonment",
  "Micro-interactions in UI design: How subtle animations build brand trust",
  "SEO Schema markup for local businesses & corporate consulting platforms",
  "How to build high-performance e-commerce product pages that outperform Shopify",
  "Headless CMS vs Traditional WordPress: Choosing the right stack for fast growth",
  "Designing accessible web experiences: WCAG compliance without compromising beauty",
  "The anatomy of a sub-second website: DNS, Edge CDN, and asset compression",
  "Building customer trust online: 6 essential social proof patterns for new brands"
];

// Rich curated fallback articles if Gemini API key is not configured
const FALLBACK_ARTICLES = [
  {
    title: "10 Proven UX Principles That Double E-Commerce Conversion Rates",
    slugPrefix: "ux-principles-ecommerce-conversion",
    category: "Design",
    excerpt: "Discover the critical UX tweaks—from frictionless checkout to psychological trust signals—that turn casual store visitors into repeat buyers.",
    keywords: "UX Design, E-commerce CRO, Web Development, User Experience, Conversion Rate",
    coverImage: "https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=1200&q=80",
    content: `You can run ads, improve your SEO, and get thousands of people to your store — but if your user experience (UX) is broken, most of them will bounce before completing a purchase. 

## Your store experience has one job: eliminate friction.

Every extra second of confusion or unnecessary form input is a direct cause of abandoned carts. Here are the 10 battle-tested UX principles we apply when engineering storefronts at **Aman UX Studio**.

> ### Every extra friction point is an excuse to leave.
> A clean, trustworthy, and effortless checkout keeps shoppers moving seamlessly toward purchasing.

## The key UX optimizations for high-converting stores

### 01. Frictionless Express Checkout
Never force visitors to create a full username and password account before checking out. Enable Google Pay, Apple Pay, and UPI 1-click checkouts alongside guest checkout.

**How to fix it:**
- Set guest checkout as default.
- Reduce address and personal info inputs to a single streamlined page.
- Auto-fill city and state from postal PIN code.

### 02. Mobile-First Thumb Zone Navigation
Over 75% of e-commerce browsing happens on smartphones. If primary buttons like "Add to Cart" or "Proceed to Pay" require stretching across a 6.7-inch display, fatigue causes drop-off.

**How to fix it:**
- Anchor sticky "Add to Cart" bars at the bottom of the screen.
- Ensure tap targets are at least 48x48 pixels.
- Use bottom drawer filters instead of desktop-style sidebars.

### 03. Transparent Shipping & Delivery Timelines
Hidden costs at the payment step remain the #1 reason for cart abandonment worldwide. State shipping fees and estimated delivery dates upfront on the product page.

**How to fix it:**
- Show exact delivery date ranges ("Delivered by Thursday, Nov 15").
- Clearly badge "Free Shipping" qualifiers on the product card.
- Provide instant tracking updates via SMS or WhatsApp.

---

## Conclusion
Conversion rate optimization is an engineering discipline based on customer psychology and reduced cognitive load. If you are looking to scale your e-commerce platform, [reach out to Aman UX Studio](https://amanuxstudio.com/#contact) to start building today.
`
  },
  {
    title: "Why Modern Web Apps are Migrating to TypeScript and Tailwind CSS",
    slugPrefix: "why-web-apps-migrate-typescript-tailwind",
    category: "Development",
    excerpt: "Explore how the combination of static typing with utility-first CSS has become the industry standard for fast, maintainable web applications.",
    keywords: "TypeScript, Tailwind CSS, Frontend Development, React, Web Architecture",
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    content: `Over the past few years, the frontend engineering ecosystem has coalesced around a unified modern stack: **TypeScript** for type safety and **Tailwind CSS** for design velocity.

## Clean architecture requires compile-time certainty.

Dynamic JavaScript offers speed at the start, but runtime bugs like \`Cannot read properties of undefined\` cause expensive production outages. TypeScript catches these errors before code ever touches production.

> ### Type safety isn't overhead — it's developer velocity.
> When types are strictly defined, developers refactor with complete confidence and zero guesswork.

## Core benefits of the TypeScript & Tailwind stack

### 01. Strict Schema & Interface Contracts
By defining explicit TypeScript interfaces for database payloads and API responses, your entire frontend team works against verified data structures.

**How to fix it:**
- Type all incoming API responses using Zod or TypeScript types.
- Avoid \`any\` types across production codebases.
- Leverage strict null checks in tsconfig.json.

### 02. Zero Context-Switching with Utility CSS
Traditional CSS requires jumping back and forth between stylesheets and components, inventing arbitrary class names. With Tailwind CSS, styling is co-located with your markup and bundle sizes stay remarkably tiny.

**How to fix it:**
- Use modern Tailwind design tokens for colors, typography, and spacing.
- Enable responsive prefixes like \`md:\` and \`lg:\` for fluid multi-device layouts.
- Eliminate unused CSS through automatic tree-shaking.

---

## Conclusion
Combining TypeScript with Tailwind CSS allows modern agencies to deliver robust, high-performance web applications in half the development time.
`
  },
  {
    title: "Cracking Core Web Vitals in 2026: The Sub-Second Page Speed Guide",
    slugPrefix: "cracking-core-web-vitals-sub-second-guide",
    category: "SEO",
    excerpt: "Learn how to optimize Largest Contentful Paint (LCP), Interaction to Next Paint (INP), and Cumulative Layout Shift (CLS) for top Google rankings.",
    keywords: "Core Web Vitals, Performance Optimization, INP, LCP, SEO, PageSpeed",
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    content: `Google's search algorithm rewards fast, responsive websites and penalizes sluggish platforms. With **INP (Interaction to Next Paint)** as an official Core Web Vital, page speed is no longer just a technical luxury—it is an essential SEO ranking requirement.

## Google measures real user experience, not synthetic metrics.

Core Web Vitals represent how real humans perceive your website's performance across 3 distinct axes: visual loading speed, layout stability, and interactive responsiveness.

> ### Every 100ms of latency costs conversions.
> Fast websites rank higher, retain visitors longer, and convert traffic into qualified inquiries at significantly higher rates.

## The 3 critical Core Web Vitals to master

### 01. Largest Contentful Paint (LCP < 2.5s)
LCP measures how fast the main visual hero element renders. Slow hero images or heavy font files are the primary culprits behind poor LCP scores.

**How to fix it:**
- Convert hero images to WebP or AVIF formats.
- Preload the primary hero image using \`<link rel="preload">\`.
- Use a high-performance Content Delivery Network (CDN) with edge caching.

### 02. Interaction to Next Paint (INP < 200ms)
INP evaluates how quickly the browser responds when a user clicks a button, opens a modal, or taps an input. Heavy JavaScript execution freezes the main browser thread.

**How to fix it:**
- Break long tasks into asynchronous chunks using \`requestIdleCallback\`.
- Debounce search and filter inputs.
- Remove redundant third-party tracking scripts.

### 03. Cumulative Layout Shift (CLS < 0.1)
CLS measures unexpected visual shifts during page load. When buttons or text jump around as banner ads or images load, visitors accidentally click the wrong element.

**How to fix it:**
- Always set explicit \`width\` and \`height\` dimensions on images and embeds.
- Reserve static containers for dynamic promotional banners.
- Preload custom web fonts to prevent FOIT (Flash of Invisible Text).

---

## Summary
Achieving 95+ PageSpeed scores requires an intentional engineering architecture from day one. Want a comprehensive Core Web Vitals audit? [Contact Aman UX Studio](https://amanuxstudio.com/#contact).
`
  },
  {
    title: "The Heuristic UX Checklist: 7 Reasons Visitors Bounce from Corporate Sites",
    slugPrefix: "heuristic-ux-checklist-corporate-sites",
    category: "Design",
    excerpt: "Learn why corporate visitors bounce within 5 seconds and how to structure service matrices and lead funnels for maximum trust and engagement.",
    keywords: "Heuristic Evaluation, Corporate UX, Web Design, Lead Generation, B2B",
    coverImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    content: `When corporate clients visit a business website, they are not looking for decorative animations—they want to quickly answer three questions: *What do you do? Have you done it successfully for others? How do I get a quote?*

## Clarity always outperforms visual novelty.

A corporate platform must convey enterprise stability, technical credibility, and effortless communication from the very first scroll.

> ### Trust is won or lost in the first 5 seconds.
> If prospective enterprise clients cannot find verified case studies and transparent deliverables immediately, they look elsewhere.

## The 5 essential pillars of high-converting B2B platforms

### 01. Clear, Benefit-Centric Value Propositions
Avoid vague slogans like "Empowering Tomorrow's Horizons". State your service, customer, and primary outcome in plain language.

**How to fix it:**
- Highlight your core specialty within the top 3 lines.
- Include a descriptive subheading clarifying your process.
- Show industry accreditation and verified partner badges.

### 02. Structured Service Deliverables
Prospective clients want to know exactly what is included in your scope. Don't hide deliverables behind endless generic paragraphs.

**How to fix it:**
- Use structured bullet checklists for every service package.
- Display expected project turnaround timelines.
- Add clear "Schedule Discovery Call" buttons on each service card.

### 03. Prominent Proof of Execution
Showcase real client platforms (like our work on **Fairease Outsourcing**, **Ireshh Clothing**, and **Expertvuw**) with live URLs and measurable results.

**How to fix it:**
- Include verified client logos directly beneath the hero banner.
- Highlight specific metrics: load time reductions, inquiry increases, revenue growth.
- Provide direct links to live production case studies.

---

## Conclusion
A well-engineered corporate platform acts as your hardest-working 24/7 business development manager.
`
  }
];

// Generate an AI-crafted article using Google Gemini API (100% free tier)
async function generatePostWithGemini(topic) {
  if (!GEMINI_API_KEY) return null;

  console.log(`🤖 Invoking Gemini AI for topic: "${topic}"...`);

  const prompt = `You are a Senior Full-Stack Web Developer & Lead UI/UX Architect at Aman UX Studio.
Write a comprehensive, professional, 1200+ word technical blog post about: "${topic}".

Format the output strictly as a JSON object with this exact structure:
{
  "title": "Engaging, SEO-Optimized Article Title (max 70 chars)",
  "slug": "url-friendly-slug-with-hyphens",
  "category": "One of: Design, Development, SEO, or E-Commerce",
  "excerpt": "A compelling 2-sentence summary hook explaining the problem and solution.",
  "keywords": "5 comma-separated high-volume SEO keywords",
  "content": "Full markdown content with:
  - Strong opening paragraph
  - Section 1 starting with: '## [Section Title]'
  - A blockquote formatted as: '> ### [Key takeaway phrase]\\\\n> [Explanation]'
  - Section 2 starting with: '## [Section Title]'
  - 3 to 5 structured points formatted with '### 01. [Title]', followed by description and '**How to fix it:**' bullet points
  - Practical code snippets or checklists where applicable
  - Closing summary mentioning Aman UX Studio with a link to contact"
}

Important formatting rules:
- Return ONLY valid raw JSON without any markdown code fences around the JSON.
- Never mention fictional client names other than Fairease Outsourcing, Ireshh Clothing, or Expertvuw.
- Ensure the tone is authoritative, practical, and highly actionable.`;

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.7, maxOutputTokens: 3000 }
      })
    });

    if (!res.ok) {
      console.warn(`Gemini API returned status ${res.status}`);
      return null;
    }

    const json = await res.json();
    const rawText = json.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawText) return null;

    // Clean any accidental markdown backticks around JSON
    const cleanJson = rawText.replace(/^```json\s*/, '').replace(/^```\s*/, '').replace(/\s*```$/, '').trim();
    const parsed = JSON.parse(cleanJson);

    return {
      title: parsed.title,
      slug: `${parsed.slug.replace(/[^a-z0-9-]/gi, '-').toLowerCase()}-${Date.now().toString().slice(-4)}`,
      category: parsed.category || "Development",
      excerpt: parsed.excerpt,
      keywords: parsed.keywords,
      coverImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
      content: parsed.content
    };
  } catch (err) {
    console.warn("⚠️ Could not generate post via Gemini API (falling back to curated library):", err.message);
    return null;
  }
}

async function generateAndPublishBlog() {
  console.log("🚀 Starting Daily Blog Post Automation...");

  if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error("❌ SUPABASE_URL or SUPABASE_KEY missing. Cannot publish.");
    process.exit(1);
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

  // 1. Fetch existing slugs to avoid any duplicates
  const { data: existingPosts } = await supabase
    .from("posts")
    .select("slug, title");

  const existingSlugs = new Set((existingPosts || []).map(p => p.slug));

  let postToInsert = null;

  // 2. Attempt AI generation if Gemini key is set
  if (GEMINI_API_KEY) {
    const randomTopic = AI_TOPIC_IDEAS[Math.floor(Math.random() * AI_TOPIC_IDEAS.length)];
    const aiPost = await generatePostWithGemini(randomTopic);
    if (aiPost && !existingSlugs.has(aiPost.slug)) {
      postToInsert = aiPost;
    }
  }

  // 3. Fallback to curated library
  if (!postToInsert) {
    // Filter out articles that have already been published by checking slugPrefix
    const available = FALLBACK_ARTICLES.filter(art => {
      return !existingPosts?.some(p => p.title.toLowerCase().trim() === art.title.toLowerCase().trim());
    });

    const template = available.length > 0
      ? available[Math.floor(Math.random() * available.length)]
      : FALLBACK_ARTICLES[Math.floor(Math.random() * FALLBACK_ARTICLES.length)];

    const timestamp = Date.now().toString().slice(-4);
    const slug = `${template.slugPrefix}-${timestamp}`;

    postToInsert = {
      title: template.title,
      slug: slug,
      category: template.category,
      excerpt: template.excerpt,
      keywords: template.keywords,
      coverImage: template.coverImage,
      content: template.content
    };
  }

  // 4. Find or match category in Supabase
  let categoryId = null;
  const { data: categoryData } = await supabase
    .from("categories")
    .select("id")
    .ilike("name", postToInsert.category)
    .limit(1)
    .single();

  if (categoryData) {
    categoryId = categoryData.id;
  }

  const newPost = {
    title: postToInsert.title,
    slug: postToInsert.slug,
    excerpt: postToInsert.excerpt,
    content: postToInsert.content,
    cover_image: postToInsert.coverImage,
    published: true,
    category_id: categoryId,
    meta_title: `${postToInsert.title} | Aman UX Studio`,
    meta_description: postToInsert.excerpt,
    meta_keywords: postToInsert.keywords,
    created_at: new Date().toISOString()
  };

  console.log(`📝 Inserting new post: "${newPost.title}" (${newPost.slug})...`);

  const { data: insertedPost, error: insertError } = await supabase
    .from("posts")
    .insert([newPost])
    .select()
    .single();

  if (insertError) {
    console.error("❌ Failed to insert blog post into Supabase:", insertError);
    process.exit(1);
  }

  console.log("✅ Post successfully published into Supabase!");

  // 5. Dispatch instant Discord alert
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
              url: `https://amanuxstudio.com/blog/${newPost.slug}`,
              description: newPost.excerpt,
              color: 0x8B5CF6,
              fields: [
                { name: "🔗 URL", value: `https://amanuxstudio.com/blog/${newPost.slug}` },
                { name: "📂 Category", value: postToInsert.category, inline: true },
                { name: "🏷️ Keywords", value: postToInsert.keywords, inline: true }
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

  return newPost.slug;
}

generateAndPublishBlog()
  .then((slug) => {
    console.log(`🎉 Daily Blog Automation Completed! Live at /blog/${slug}`);
  })
  .catch((err) => {
    console.error("Fatal automation error:", err);
    process.exit(1);
  });
