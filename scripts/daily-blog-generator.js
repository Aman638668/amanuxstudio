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

// High-resolution tech and design cover image collection
const COVER_IMAGES = [
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=1200&q=80"
];

// Curated technical articles library (used as reliable fallback)
const FALLBACK_ARTICLES = [
  {
    title: "10 Proven UX Principles That Double E-Commerce Conversion Rates",
    slugPrefix: "ux-principles-ecommerce-conversion",
    category: "Design",
    excerpt: "Discover the critical UX tweaks—from frictionless checkout to psychological trust signals—that turn casual store visitors into repeat buyers.",
    keywords: "UX Design, E-commerce CRO, Web Development, User Experience, Conversion Rate",
    coverImage: COVER_IMAGES[8],
    content: `You can run ads, improve your SEO, and get thousands of people to your store — but if your user experience (UX) is broken, most of them will bounce before completing a purchase. 

## Your store experience has one job: eliminate friction.

Every extra second of confusion or unnecessary form input is a direct cause of abandoned carts. Here are the 10 battle-tested UX principles we apply when engineering storefronts at **Aman UX Studio**.

> ### Every extra friction point is an excuse to leave.
> A clean, trustworthy, and effortless checkout keeps shoppers moving seamlessly toward purchasing.

## The key UX optimizations for high-converting stores

### 01. Frictionless Express Checkout
Never force visitors to create a full username and password account before checking out. Enable Google Pay, Apple Pay, and UPI 1-click checkouts alongside guest checkout.

**How to implement it:**
- Set guest checkout as default.
- Reduce address and personal info inputs to a single streamlined page.
- Auto-fill city and state from postal PIN code.

### 02. Mobile-First Thumb Zone Navigation
Over 75% of e-commerce browsing happens on smartphones. If primary buttons like "Add to Cart" or "Proceed to Pay" require stretching across a 6.7-inch display, fatigue causes drop-off.

**How to implement it:**
- Anchor sticky "Add to Cart" bars at the bottom of the screen.
- Ensure tap targets are at least 48x48 pixels.
- Use bottom drawer filters instead of desktop-style sidebars.

### 03. Transparent Shipping & Delivery Timelines
Hidden costs at the payment step remain the #1 reason for cart abandonment worldwide. State shipping fees and estimated delivery dates upfront on the product page.

**How to implement it:**
- Show exact delivery date ranges ("Delivered by Thursday, Nov 15").
- Clearly badge "Free Shipping" qualifiers on the product card.
- Provide instant tracking updates via SMS or WhatsApp.

---

## Conclusion
Conversion rate optimization is an engineering discipline based on customer psychology and reduced cognitive load. If you are looking to scale your e-commerce platform, [reach out to Aman UX Studio](https://amanuxstudio.vercel.app/#contact) to start building today.`
  },
  {
    title: "Why Modern Web Apps are Migrating to TypeScript and Tailwind CSS",
    slugPrefix: "why-web-apps-migrate-typescript-tailwind",
    category: "Development",
    excerpt: "Explore how the combination of static typing with utility-first CSS has become the industry standard for fast, maintainable web applications.",
    keywords: "TypeScript, Tailwind CSS, Frontend Development, React, Web Architecture",
    coverImage: COVER_IMAGES[0],
    content: `Over the past few years, the frontend engineering ecosystem has coalesced around a unified modern stack: **TypeScript** for type safety and **Tailwind CSS** for design velocity.

## Clean architecture requires compile-time certainty.

Dynamic JavaScript offers speed at the start, but runtime bugs like \`Cannot read properties of undefined\` cause expensive production outages. TypeScript catches these errors before code ever touches production.

> ### Type safety isn't overhead — it's developer velocity.
> When types are strictly defined, developers refactor with complete confidence and zero guesswork.

## Core benefits of the TypeScript & Tailwind stack

### 01. Strict Schema & Interface Contracts
By defining explicit TypeScript interfaces for database payloads and API responses, your entire frontend team works against verified data structures.

**How to implement it:**
- Type all incoming API responses using Zod or TypeScript types.
- Avoid \`any\` types across production codebases.
- Leverage strict null checks in tsconfig.json.

### 02. Zero Context-Switching with Utility CSS
Traditional CSS requires jumping back and forth between stylesheets and components, inventing arbitrary class names. With Tailwind CSS, styling is co-located with your markup and bundle sizes stay remarkably tiny.

**How to implement it:**
- Use modern Tailwind design tokens for colors, typography, and spacing.
- Enable responsive prefixes like \`md:\` and \`lg:\` for fluid multi-device layouts.
- Eliminate unused CSS through automatic tree-shaking.

---

## Conclusion
Combining TypeScript with Tailwind CSS allows modern agencies to deliver robust, high-performance web applications in half the development time.`
  },
  {
    title: "Cracking Core Web Vitals in 2026: The Sub-Second Page Speed Guide",
    slugPrefix: "cracking-core-web-vitals-sub-second-guide",
    category: "Development",
    excerpt: "Learn how to optimize Largest Contentful Paint (LCP), Interaction to Next Paint (INP), and Cumulative Layout Shift (CLS) for top Google rankings.",
    keywords: "Core Web Vitals, Performance Optimization, INP, LCP, SEO, PageSpeed",
    coverImage: COVER_IMAGES[2],
    content: `Google's search algorithm rewards fast, responsive websites and penalizes sluggish platforms. With **INP (Interaction to Next Paint)** as an official Core Web Vital, page speed is no longer just a technical luxury—it is an essential SEO ranking requirement.

## Google measures real user experience, not synthetic metrics.

Core Web Vitals represent how real humans perceive your website's performance across 3 distinct axes: visual loading speed, layout stability, and interactive responsiveness.

> ### Every 100ms of latency costs conversions.
> Fast websites rank higher, retain visitors longer, and convert traffic into qualified inquiries at significantly higher rates.

## The 3 critical Core Web Vitals to master

### 01. Largest Contentful Paint (LCP < 2.5s)
LCP measures how fast the main visual hero element renders. Slow hero images or heavy font files are the primary culprits behind poor LCP scores.

**How to implement it:**
- Convert hero images to WebP or AVIF formats.
- Preload the primary hero image using \`<link rel="preload">\`.
- Use a high-performance Content Delivery Network (CDN) with edge caching.

### 02. Interaction to Next Paint (INP < 200ms)
INP evaluates how quickly the browser responds when a user clicks a button, opens a modal, or taps an input. Heavy JavaScript execution freezes the main browser thread.

**How to implement it:**
- Break long tasks into asynchronous chunks using \`requestIdleCallback\`.
- Debounce search and filter inputs.
- Remove redundant third-party tracking scripts.

### 03. Cumulative Layout Shift (CLS < 0.1)
CLS measures unexpected visual shifts during page load. When buttons or text jump around as banner ads or images load, visitors accidentally click the wrong element.

**How to implement it:**
- Always set explicit \`width\` and \`height\` dimensions on images and embeds.
- Reserve static containers for dynamic promotional banners.
- Preload custom web fonts to prevent FOIT (Flash of Invisible Text).

---

## Summary
Achieving 95+ PageSpeed scores requires an intentional engineering architecture from day one. Want a comprehensive Core Web Vitals audit? [Contact Aman UX Studio](https://amanuxstudio.vercel.app/#contact).`
  },
  {
    title: "The Heuristic UX Checklist: 7 Reasons Visitors Bounce from Corporate Sites",
    slugPrefix: "heuristic-ux-checklist-corporate-sites",
    category: "Design",
    excerpt: "Learn why corporate visitors bounce within 5 seconds and how to structure service matrices and lead funnels for maximum trust and engagement.",
    keywords: "Heuristic Evaluation, Corporate UX, Web Design, Lead Generation, B2B",
    coverImage: COVER_IMAGES[7],
    content: `When corporate clients visit a business website, they are not looking for decorative animations—they want to quickly answer three questions: *What do you do? Have you done it successfully for others? How do I get a quote?*

## Clarity always outperforms visual novelty.

A corporate platform must convey enterprise stability, technical credibility, and effortless communication from the very first scroll.

> ### Trust is won or lost in the first 5 seconds.
> If prospective enterprise clients cannot find verified case studies and transparent deliverables immediately, they look elsewhere.

## The essential pillars of high-converting B2B platforms

### 01. Clear, Benefit-Centric Value Propositions
Avoid vague slogans like "Empowering Tomorrow's Horizons". State your service, customer, and primary outcome in plain language.

**How to implement it:**
- Highlight your core specialty within the top 3 lines.
- Include a descriptive subheading clarifying your process.
- Show industry accreditation and verified partner badges.

### 02. Structured Service Deliverables
Prospective clients want to know exactly what is included in your scope. Don't hide deliverables behind endless generic paragraphs.

**How to implement it:**
- Use structured bullet checklists for every service package.
- Display expected project turnaround timelines.
- Add clear "Schedule Discovery Call" buttons on each service card.

### 03. Prominent Proof of Execution
Showcase real client platforms (like our work on **Fairease Outsourcing**, **Ireshh Clothing**, and **Expertvuw**) with live URLs and measurable results.

**How to implement it:**
- Include verified client logos directly beneath the hero banner.
- Highlight specific metrics: load time reductions, inquiry increases, revenue growth.
- Provide direct links to live production case studies.

---

## Conclusion
A well-engineered corporate platform acts as your hardest-working 24/7 business development manager.`
  },
  {
    title: "Next.js App Router Architecture: High-Performance Data Fetching & Caching",
    slugPrefix: "nextjs-app-router-data-fetching-caching",
    category: "Development",
    excerpt: "Master React Server Components, Route Handlers, and cache tags in Next.js to eliminate stale client states and reduce TTFB to under 150ms.",
    keywords: "Next.js, React Server Components, Web Architecture, Performance, Caching",
    coverImage: COVER_IMAGES[3],
    content: `The evolution of the Next.js App Router fundamentally changed how modern web apps handle data fetching, server-side caching, and component architecture.

## Server Components are the new baseline for full-stack frontend.

By rendering components directly on the server edge, developers can reduce JavaScript payloads shipped to client browsers by up to 60%, resulting in instantaneous navigation.

> ### Less JavaScript sent to the client means faster execution on mobile devices.
> Modern full-stack architecture balances server-side data computation with lightweight interactive islands on the client.

## Core Architectural Patterns for High-Speed Web Apps

### 01. Granular Server & Client Boundary Separation
Keep data-heavy queries in Server Components and only pass interactive triggers (buttons, dropdowns) to Client Components using the \`'use client'\` directive.

**How to implement it:**
- Co-locate database queries directly in the Page or layout component.
- Keep Client Components lean by passing data down as serialized props.
- Leverage React Suspense boundaries to stream slower queries without blocking page load.

### 02. Tag-Based On-Demand Revalidation
Instead of relying on crude time-based cache expiration, leverage Next.js \`revalidateTag\` to instantly refresh cache entries whenever database writes occur.

**How to implement it:**
- Tag fetch requests with semantic keys like \`fetch(url, { next: { tags: ['products'] } })\`.
- Trigger revalidation inside Server Actions or webhook handlers.
- Keep client TTFB consistently below 120ms across global CDN edges.

---

## Conclusion
Architecting modern Next.js platforms requires deep knowledge of edge caching and streaming. [Partner with Aman UX Studio](https://amanuxstudio.vercel.app/#contact) to build your next web platform.`
  },
  {
    title: "The Psychology of SaaS Pricing Design: Maximizing ARPU and Plan Conversions",
    slugPrefix: "psychology-saas-pricing-design-conversions",
    category: "Design",
    excerpt: "Learn how anchor pricing, decoy tiers, and progressive feature comparison matrices influence purchasing psychology and increase SaaS revenue.",
    keywords: "SaaS Pricing, UI Design, Conversion Rate Optimization, UX Heuristics, Product Design",
    coverImage: COVER_IMAGES[4],
    content: `Pricing tables are the most critical decision-making interface on any SaaS website. A poorly formatted pricing card induces analysis paralysis and kills sign-ups.

## The goal of a pricing table is cognitive ease, not exhaustive documentation.

When customers evaluate pricing options, their brains seek quick comparisons, clear recommendations, and risk mitigation.

> ### Decisive clarity drives conversion.
> High-converting pricing designs guide users toward the optimal plan without overwhelming them with unnecessary technical jargon.

## 3 Core Psychological Heuristics for Pricing Tables

### 01. The Center-Stage Recommended Anchor
Highlight your target growth plan by making it visually distinct: elevate the card with a purple accent border, a 'Most Popular' badge, and subtle vertical scaling.

**How to implement it:**
- Set the default view to Annual billing with a clear 'Save 20%' incentive tag.
- Pre-select the recommended plan button with highest visual contrast.
- Ensure the primary action button is above the mobile fold.

### 02. Chunked Feature Matrices
Rather than presenting a monolithic list of 30 bullet points, group features into 3 logical categories: Core Platform, Security & Compliance, and Dedicated Support.

**How to implement it:**
- Use tooltips for complex enterprise features to avoid card clutter.
- Provide clear visual checkmarks instead of ambiguous text.
- Include a 14-day risk-free money-back guarantee badge immediately below the CTA.

---

## Conclusion
At **Aman UX Studio**, we design and engineer conversion-focused digital products that scale. [Contact us today](https://amanuxstudio.vercel.app/#contact) to elevate your digital presence.`
  }
];

// Discover live trending tech topics from Google Trends RSS, Google News Tech RSS, and Dev.to
async function fetchTrendingTechTopics() {
  const topics = [];
  const techKeywords = [
    'ai', 'model', 'software', 'app', 'web', 'react', 'next.js', 'vue', 'angular',
    'typescript', 'javascript', 'python', 'cloud', 'aws', 'google', 'apple', 'microsoft',
    'meta', 'nvidia', 'intel', 'amd', 'chip', 'cyber', 'security', 'data', 'database',
    'code', 'developer', 'linux', 'server', 'browser', 'chrome', 'api', 'ux', 'ui', 'design',
    'performance', 'speed', 'devops', 'git', 'fullstack', 'frontend', 'backend', 'open source',
    'agent', 'llm', 'framework', 'saas', 'architecture'
  ];

  const excludedKeywords = [
    'doctor', 'longevity', 'health', 'diet', 'movie', 'trailer', 'box office', 'actor',
    'singer', 'album', 'song', 'nfl', 'nba', 'football', 'baseball', 'cricket', 'murder',
    'police', 'crime', 'election', 'senate', 'politics', 'arrest', 'storm', 'weather'
  ];

  // 1. Google News Technology RSS
  try {
    const res = await fetch('https://news.google.com/rss/headlines/section/topic/TECHNOLOGY?hl=en-US&gl=US&ceid=US:en', { signal: AbortSignal.timeout(6000) });
    if (res.ok) {
      const xml = await res.text();
      const items = xml.split('<item>').slice(1);
      for (const it of items) {
        const rawTitle = it.match(/<title>(.*?)<\/title>/)?.[1];
        if (!rawTitle) continue;
        const cleanTitle = rawTitle
          .replace(/\s*-\s*[^-\n]+$/, '') // Strip publication suffix
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'")
          .replace(/&amp;/g, '&')
          .replace(/&lt;.*?&gt;/g, '')
          .trim();
        const lower = cleanTitle.toLowerCase();
        const isTech = techKeywords.some(k => lower.includes(k));
        const isExcluded = excludedKeywords.some(k => lower.includes(k));
        if (isTech && !isExcluded && cleanTitle.length > 15) {
          topics.push({
            title: cleanTitle,
            source: 'Google News Technology',
            category: 'Development'
          });
        }
      }
    }
  } catch (err) {
    console.warn("⚠️ Google News Tech fetch notice:", err.message);
  }

  // 2. Dev.to Community Trending API
  try {
    const res = await fetch('https://dev.to/api/articles?per_page=15&top=1', { signal: AbortSignal.timeout(6000) });
    if (res.ok) {
      const data = await res.json();
      for (const art of data) {
        if (art.title && art.title.length > 15) {
          const isDesign = art.tag_list?.some(t => ['design', 'ui', 'ux', 'css', 'frontend'].includes(t));
          topics.push({
            title: art.title.trim(),
            source: 'Dev.to Community',
            category: isDesign ? 'Design' : 'Development'
          });
        }
      }
    }
  } catch (err) {
    console.warn("⚠️ Dev.to fetch notice:", err.message);
  }

  // 3. Google Trends Search RSS (Filtered for Tech Keywords)
  try {
    const res = await fetch('https://trends.google.com/trending/rss?geo=US', { signal: AbortSignal.timeout(6000) });
    if (res.ok) {
      const xml = await res.text();
      const items = xml.split('<item>').slice(1);
      for (const it of items) {
        const query = it.match(/<title>(.*?)<\/title>/)?.[1] || '';
        const newsTitle = it.match(/<ht:news_item_title>(.*?)<\/ht:news_item_title>/)?.[1] || '';
        const combined = `${query} ${newsTitle}`.toLowerCase();
        const isTech = techKeywords.some(k => combined.includes(k));
        const isExcluded = excludedKeywords.some(k => combined.includes(k));
        if (isTech && !isExcluded) {
          const raw = newsTitle || query;
          const clean = raw
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'")
            .replace(/&amp;/g, '&')
            .trim();
          if (clean && clean.length > 15) {
            topics.push({
              title: clean,
              source: `Google Trends (${query})`,
              category: 'Development'
            });
          }
        }
      }
    }
  } catch (err) {
    console.warn("⚠️ Google Trends fetch notice:", err.message);
  }

  return topics;
}

// Generate an AI-crafted article using Google Gemini API
async function generatePostWithGemini(topicItem) {
  if (!GEMINI_API_KEY) return null;

  console.log(`🤖 Invoking Gemini AI for trending topic: "${topicItem.title}" (${topicItem.source})...`);

  const prompt = `You are a Senior Full-Stack Web Developer & Lead UI/UX Architect at Aman UX Studio (https://amanuxstudio.vercel.app).
Write a comprehensive, professional, 1,200+ word technical blog post about this trending technology development:
"${topicItem.title}" (Discovered via: ${topicItem.source}).

The post must bridge this trending tech topic with practical engineering, UI/UX architecture, performance optimizations, and business value.

Format your output strictly using this delimiter structure:
---METADATA---
title: Engaging, SEO-Optimized Article Title (max 70 chars)
slug: url-friendly-slug-with-hyphens
category: ${topicItem.category || 'Development'}
excerpt: A compelling 2-sentence summary hook explaining the problem, the tech trend, and the strategic solution.
keywords: 5 comma-separated high-volume SEO keywords
---CONTENT---
Full markdown content:
- Strong opening paragraph introducing the trend and why it matters to engineers and product owners
- Section 1 starting with: '## [Section Title]'
- A blockquote formatted as: '> ### [Key takeaway phrase]\\n> [Actionable explanation]'
- Section 2 starting with: '## [Section Title]'
- 3 to 5 structured points formatted with '### 01. [Title]', followed by detailed explanation and '**How to implement it:**' bullet points
- Practical code snippets, checklists, or architectural patterns
- Section 3: Strategic takeaways for modern web applications
- Closing summary mentioning Aman UX Studio with a link to contact: [reach out to Aman UX Studio](https://amanuxstudio.vercel.app/#contact)

Important rules:
- Start directly with '---METADATA---'. Do not output conversational filler.
- Do not invent fictional client names other than Fairease Outsourcing, Ireshh Clothing, or Expertvuw.
- Ensure the tone is authoritative, practical, and highly actionable.`;

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${GEMINI_API_KEY}`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.7, maxOutputTokens: 8192 }
      })
    });

    if (!res.ok) {
      console.warn(`Gemini API returned status ${res.status}`);
      return null;
    }

    const json = await res.json();
    const rawText = json.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawText || !rawText.includes('---CONTENT---')) {
      console.warn("⚠️ Output did not include ---CONTENT--- delimiter");
      return null;
    }

    const [metaSection, ...contentParts] = rawText.split('---CONTENT---');
    const content = contentParts.join('---CONTENT---').trim();

    const titleMatch = metaSection.match(/title:\s*(.*)/i);
    const slugMatch = metaSection.match(/slug:\s*(.*)/i);
    const catMatch = metaSection.match(/category:\s*(.*)/i);
    const excerptMatch = metaSection.match(/excerpt:\s*(.*)/i);
    const keywordsMatch = metaSection.match(/keywords:\s*(.*)/i);

    const title = titleMatch ? titleMatch[1].trim().replace(/^["']|["']$/g, '') : topicItem.title;
    const rawSlug = slugMatch ? slugMatch[1].trim() : title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const slug = `${rawSlug.replace(/[^a-z0-9-]/gi, '-').toLowerCase()}-${Date.now().toString().slice(-4)}`;
    const category = catMatch ? catMatch[1].trim() : topicItem.category || "Development";
    const excerpt = excerptMatch ? excerptMatch[1].trim() : `Discover how ${title} impacts modern software architecture and digital platforms.`;
    const keywords = keywordsMatch ? keywordsMatch[1].trim() : "Web Development, UI UX, Cloud Architecture, Frontend, Performance";

    const randomCover = COVER_IMAGES[Math.floor(Math.random() * COVER_IMAGES.length)];

    return {
      title,
      slug,
      category,
      excerpt,
      keywords,
      coverImage: randomCover,
      content
    };
  } catch (err) {
    console.warn("⚠️ Could not generate post via Gemini API:", err.message);
    return null;
  }
}

async function generateAndPublishBlog() {
  console.log("🚀 Starting Autonomous Daily Blog Engine...");

  if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error("❌ SUPABASE_URL or SUPABASE_KEY missing. Cannot publish.");
    process.exit(1);
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

  // 1. Fetch existing slugs and titles from Supabase to prevent duplicate topics
  const { data: existingPosts } = await supabase
    .from("posts")
    .select("slug, title");

  const existingSlugs = new Set((existingPosts || []).map(p => p.slug));
  const existingTitles = (existingPosts || []).map(p => p.title.toLowerCase().trim());

  // 2. Discover live trending tech topics from Google Trends, Google News Tech & Dev.to
  console.log("🔍 Scanning Google Trends, Google News Tech, and Dev.to for trending tech topics...");
  const liveTrends = await fetchTrendingTechTopics();
  console.log(`📡 Discovered ${liveTrends.length} live trending tech candidates.`);

  // Filter out any candidates that have already been published
  const availableTrends = liveTrends.filter(t => {
    const tLower = t.title.toLowerCase().trim();
    return !existingTitles.some(et => et.includes(tLower) || tLower.includes(et));
  });

  let postToInsert = null;

  // 3. Attempt dynamic AI generation if GEMINI_API_KEY is present
  if (GEMINI_API_KEY && availableTrends.length > 0) {
    const chosenTopic = availableTrends[Math.floor(Math.random() * availableTrends.length)];
    console.log(`🔥 Selected Trending Tech Topic: "${chosenTopic.title}" (${chosenTopic.source})`);

    const aiPost = await generatePostWithGemini(chosenTopic);
    if (aiPost && !existingSlugs.has(aiPost.slug)) {
      postToInsert = aiPost;
    }
  }

  // 4. Fallback to curated technical articles if AI is inactive or unavailable
  if (!postToInsert) {
    console.log("📚 Selecting from high-converting curated technical library...");
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

  // 5. Match or assign category in Supabase
  let categoryId = null;
  const { data: categoryData } = await supabase
    .from("categories")
    .select("id")
    .ilike("name", postToInsert.category)
    .limit(1)
    .single();

  if (categoryData) {
    categoryId = categoryData.id;
  } else {
    // Default to 'Development' category if specific category is not found
    const { data: defaultCat } = await supabase
      .from("categories")
      .select("id")
      .ilike("name", "Development")
      .limit(1)
      .single();
    if (defaultCat) categoryId = defaultCat.id;
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

  console.log(`📝 Publishing post: "${newPost.title}" (${newPost.slug})...`);

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

  // 6. Dispatch Discord webhook alert
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
              url: `https://amanuxstudio.vercel.app/blog/${newPost.slug}`,
              description: newPost.excerpt,
              color: 0x8B5CF6,
              fields: [
                { name: "🔗 URL", value: `https://amanuxstudio.vercel.app/blog/${newPost.slug}` },
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
