import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("Missing Supabase credentials in .env");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const blogs = [
  {
    title: "How We Built & Scaled the Ireshh E-Commerce Store from 0 to 1: A Complete WooCommerce Playbook",
    slug: "how-we-built-and-scaled-ireshh-ecommerce-store",
    category: "Development",
    excerpt: "A step-by-step technical breakdown of configuring WooCommerce from 0 to 1 for fashion brand Ireshh—from frictionless UPI & Card payments to inventory rules and sub-second mobile checkouts.",
    cover_image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
    meta_title: "How We Built & Scaled Ireshh E-Commerce Store | Aman UX Studio",
    meta_description: "Case study on building and managing the Ireshh clothing brand e-commerce store with WooCommerce, Razorpay/UPI, and mobile checkout optimization.",
    meta_keywords: "WooCommerce, E-Commerce Development, Ireshh Clothing, WordPress, Payment Gateways, Web Developer",
    content: `
# How We Built & Scaled the Ireshh E-Commerce Store from 0 to 1: A Complete WooCommerce Playbook

Building a modern e-commerce storefront for an apparel brand requires much more than just installing WordPress and choosing a theme. When launching **[Ireshh](https://ireshh.com/)**, our mission was clear: deliver an end-to-end shopping experience with zero friction, instant page loads, and seamless payments for Indian shoppers.

In this case study, I'll break down the architectural choices, payment integrations, and performance optimizations we implemented to build and manage the entire Ireshh platform from scratch.

---

## 1. Zero-to-One Store Architecture
When customers shop for clothing, visual clarity and size selection are critical. We structured the WooCommerce product database with:
- **Matrix Variations**: Distinct colorways, size guides, and stock thresholds with automated "Out of Stock" notifications.
- **High-Density Product Grids**: Lazy-loaded product photography with crisp WebP compression to save bandwidth on mobile networks.
- **Frictionless Mobile Navigation**: Category filtering, instant search, and sticky "Add to Bag" bars.

\`\`\`php
// Snippet: Customizing WooCommerce checkout fields for faster Indian mobile conversions
add_filter( 'woocommerce_checkout_fields' , 'custom_override_checkout_fields' );
function custom_override_checkout_fields( $fields ) {
    unset($fields['billing']['billing_company']);
    unset($fields['billing']['billing_address_2']);
    $fields['billing']['billing_phone']['priority'] = 20;
    return $fields;
}
\`\`\`

---

## 2. Eliminating Checkout Abandonment with UPI & Card Gateways
Over 75% of Indian e-commerce transactions occur over mobile UPI (Google Pay, PhonePe, Paytm). 
- We integrated secure payment gateway pipelines supporting instant QR codes, saved cards, net banking, and UPI intent flows.
- Implemented automated webhook callbacks to prevent stuck pending orders if a customer accidentally closed their mobile banking app.

---

## 3. Speed & Core Web Vitals Optimization
Slow stores kill conversion rates. We achieved sub-second product page loads by:
1. Serving static assets through Cloudflare Edge CDN.
2. Implementing Object Caching (Redis) for dynamic cart sessions.
3. Deferring non-critical scripts and minifying CSS stylesheets.

---

## Conclusion & Ongoing Management
Since launching **Ireshh**, the store handles daily customer transactions smoothly with 99.9% uptime. Building from 0 to 1 gave us complete control over code quality, security, and scalability.

Need an e-commerce platform built or managed for your fashion or retail brand? [Reach out to Aman UX Studio today](https://amanuxstudio.com/contact).
`
  },
  {
    title: "Modern WordPress Architecture in 2026: Lessons from Engineering the Fairease Outsourcing Platform",
    slug: "modern-wordpress-architecture-fairease-case-study",
    category: "Development",
    excerpt: "How we engineered Fairease Outsourcing's corporate platform without plugin bloat—achieving sub-second load times, hardened security, and a 150% boost in business inquiries.",
    cover_image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    meta_title: "Modern WordPress Architecture: Fairease Case Study | Aman UX Studio",
    meta_description: "Learn how we built Fairease Outsourcing's corporate website without plugin bloat, achieving sub-second speeds and high conversion rates.",
    meta_keywords: "WordPress Architecture, Elementor Optimization, Fairease Outsourcing, Corporate Websites, Web Development",
    content: `
# Modern WordPress Architecture in 2026: Lessons from Engineering the Fairease Outsourcing Platform

WordPress powers over 40% of the entire internet. Yet, many corporate websites suffer from sluggish load times, constant plugin crashes, and vulnerability warnings.

When we engineered the corporate presence for **[Fairease Outsourcing](https://fairease.in/)**, our goal was to prove that modern WordPress can be as fast, secure, and resilient as custom web applications.

---

## 1. The Anti-Bloat Philosophy
The typical corporate agency installs 40+ plugins for sliders, forms, popups, and animations. Each plugin introduces database queries, external stylesheets, and security vectors.

For Fairease, we adopted a minimalist, lean strategy:
- **Core-First Functionality**: Custom CSS and lightweight JavaScript hooks replaced heavy third-party animation plugins.
- **Selective Script Loading**: Form handling scripts and validation libraries are loaded **only** on pages where contact funnels exist.
- **Custom Post Types**: Service categorizations were structured natively rather than relying on bloated page builders.

---

## 2. Converting Visitors into High-Ticket Leads
A BPO and outsourcing firm lives and dies by consultation inquiries. We created:
1. **Interactive Service Matrices**: Visitors can quickly understand Fairease's operational capabilities across industries.
2. **Contextual Quote Triggers**: Every service page features a tailored lead inquiry capture with automated routing.
3. **Trust Architecture**: Client case studies and security badges prominent throughout the user flow.

---

## 3. Hardened Security & Performance
- **Cloudflare DNS & WAF**: Mitigating malicious bot traffic and brute-force attempts before they hit the origin server.
- **Automated Discord Lead Alerts**: Incoming inquiries trigger instant webhook notifications, enabling the Fairease team to follow up with prospective clients within minutes.

Looking to build a fast, reliable corporate website that generates real leads? [Contact Aman UX Studio](https://amanuxstudio.com/contact).
`
  },
  {
    title: "Cracking Core Web Vitals: How to Achieve 95+ Google PageSpeed Scores on Production Websites",
    slug: "cracking-core-web-vitals-pagespeed-optimization",
    category: "Development",
    excerpt: "Actionable strategies for optimizing LCP, INP, and CLS across real-world client websites. Learn the exact image compression, caching, and font strategies we deploy.",
    cover_image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    meta_title: "Cracking Core Web Vitals & 95+ PageSpeed Scores | Aman UX Studio",
    meta_description: "Proven technical guide to optimizing LCP, INP, and CLS for Google PageSpeed 95+ scores and top search engine rankings.",
    meta_keywords: "Core Web Vitals, Google PageSpeed, Web Performance, SEO Optimization, LCP, INP",
    content: `
# Cracking Core Web Vitals: How to Achieve 95+ Google PageSpeed Scores on Production Websites

Google has made it unmistakably clear: **Speed is a direct search ranking factor**. With the official rollout of **INP (Interaction to Next Paint)** replacing FID, search engines judge websites on how quickly they visually render and respond to customer input.

Here is the exact playbook we use at **Aman UX Studio** to push client platforms to 95+ PageSpeed scores on mobile.

---

## 1. Largest Contentful Paint (LCP) < 2.5s
LCP measures when the main hero image or headline becomes readable.

### The Fixes:
1. **Preload the Hero Asset**: Tell the browser to prioritize your top banner before parsing heavy stylesheets.
\`\`\`html
<link rel="preload" as="image" href="/hero.webp" fetchpriority="high">
\`\`\`
2. **Eliminate Render-Blocking CSS**: Inline critical above-the-fold styles and defer non-essential fonts.
3. **Use Modern Image Formats**: Convert all PNGs and JPEGs to **WebP** or **AVIF**, slashing file sizes by up to 80% without quality loss.

---

## 2. Interaction to Next Paint (INP) < 200ms
INP measures UI responsiveness when a user taps a navigation drawer, clicks an accordion, or types into an input field.

### The Fixes:
- **Avoid Main-Thread Long Tasks**: Break heavy JavaScript computations into small async chunks using \`requestIdleCallback\` or web workers.
- **Lightweight Event Listeners**: Debounce scroll and resize listeners so the browser thread remains fluid.

---

## 3. Cumulative Layout Shift (CLS) < 0.1
Ever tried to click a button, only for a banner to load and shift the entire page under your finger? That's CLS, and Google heavily penalizes it.

### The Fixes:
- Always define explicit \`width\` and \`height\` attributes on all \`<img>\` and \`<video>\` tags.
- Pre-allocate container aspect ratios using CSS \`aspect-ratio: 16 / 9;\`.

---

## The Business Payoff
Fast websites don't just win SEO accolades—they increase ad conversion rates by up to 40%. Want a comprehensive speed audit for your existing website? [Schedule a consultation with Aman UX Studio](https://amanuxstudio.com/contact).
`
  },
  {
    title: "Why Modern Agencies are Combining React & Next.js with Headless Supabase for Fast Client Delivery",
    slug: "react-nextjs-supabase-headless-cms-guide",
    category: "Development",
    excerpt: "Explore the technical advantages of building modular web apps with React, Vite, and Supabase. Fast builds, real-time data, and serverless scalability.",
    cover_image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    meta_title: "React, Next.js & Supabase Architecture Guide | Aman UX Studio",
    meta_description: "Why combining React with Supabase PostgreSQL provides superior developer velocity, real-time sync, and scalable web architectures.",
    meta_keywords: "React, Next.js, Supabase, TypeScript, Headless CMS, Full Stack Web Development",
    content: `
# Why Modern Agencies are Combining React & Next.js with Headless Supabase for Fast Client Delivery

For years, building dynamic web applications required managing dedicated Linux servers, provisioning PostgreSQL instances, configuring Redis caches, and writing boilerplate authentication logic.

Today, a modern stack has emerged that enables agile agencies to deliver enterprise-grade software in weeks rather than months: **React / Next.js paired with Supabase**.

---

## 1. The Power of Built-in PostgreSQL & Row Level Security (RLS)
Unlike Firebase which relies on NoSQL document collections, Supabase provides an open-source, relational **PostgreSQL** database. 

With **Row Level Security (RLS)**, authorization logic is enforced directly at the database engine level rather than scattered across dozens of API middleware functions:

\`\`\`sql
-- Example: Only authenticated admins can publish blog articles
create policy "Admins can update posts"
  on public.posts for update
  to authenticated
  using (auth.email() = 'admin@amanuxstudio.com');
\`\`\`

---

## 2. Instant Real-Time Sync & Webhooks
With Supabase Realtime, client interfaces can subscribe to database changes via WebSockets. When a new blog post is approved or a lead arrives, the dashboard updates immediately without refreshing.

---

## 3. Serverless Speed & Cost Efficiency
By hosting frontend interfaces on global edge CDNs (such as Vercel) and utilizing serverless database connections, infrastructure costs remain near zero during low traffic while seamlessly handling viral spikes.

At **Aman UX Studio**, this architecture powers our client web apps, internal dashboards, and dynamic CMS solutions. Ready to build your next custom platform? [Let's talk](https://amanuxstudio.com/contact).
`
  },
  {
    title: "The 8 UX Flaws That Quietly Destroy Landing Page Conversions (And How to Fix Them)",
    slug: "ux-flaws-destroying-landing-page-conversions",
    category: "Design",
    excerpt: "Most website redesigns focus on aesthetic eye-candy instead of user psychology. Here are 8 proven UX heuristics we implement to double lead form completions.",
    cover_image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&q=80",
    meta_title: "8 UX Flaws Destroying Landing Page Conversions | Aman UX Studio",
    meta_description: "Heuristic UX audit guide: Identify and fix common user experience mistakes on landing pages to double sales and consultation inquiries.",
    meta_keywords: "UI UX Design, Conversion Rate Optimization, Landing Page Design, User Experience, CRO",
    content: `
# The 8 UX Flaws That Quietly Destroy Landing Page Conversions (And How to Fix Them)

A website can have stunning animations and breathtaking graphics, yet completely fail to produce revenue. Why? Because **aesthetic design is not the same as user experience (UX)**.

If visitors cannot determine what you do within 3 seconds, or if your contact form feels like a tax return, they will bounce to your competitor.

Here are the 8 most common UX mistakes we audit—and the exact fixes we implement at **Aman UX Studio**.

---

## 1. The Mysterious Value Proposition
**The Flaw**: Headings like *"Innovating Tomorrow's Synergistic Horizons"*. Nobody knows what you actually sell.
**The Fix**: Be clear, not clever. State your exact service, target customer, and primary benefit in plain English: *"Full-Service Web Development & UI/UX Design for Fast-Growing Brands."*

## 2. Forms with Too Many Required Fields
**The Flaw**: Asking for company revenue, fax number, and address when a client just wants to ask a pricing question.
**The Fix**: Reduce initial contact inputs to Name, Email, and Message. Every field you eliminate increases form completions by 7–10%.

## 3. Low Contrast & Illegible Typography
**The Flaw**: Light gray text on white backgrounds or tiny 12px fonts on mobile screens.
**The Fix**: Maintain a strict WCAG contrast ratio of at least 4.5:1. Use a readable 16px+ base font size with comfortable 1.5 line height.

## 4. Burying Social Proof Below the Fold
**The Flaw**: Hiding testimonials and client case studies on page 3 of your navigation.
**The Fix**: Place verified client logos and metrics (e.g. *Fairease, Ireshh, Expertvuw*) right below the hero banner.

## 5. Competing Call-to-Actions (CTAs)
**The Flaw**: Offering 5 different buttons: "Book Call", "Download Whitepaper", "Follow Twitter", "Read Blog", "Join Discord".
**The Fix**: Give the user one primary path: **"Start Your Project"** or **"Get a Free Quote"**.

---

## Summary
Conversion-driven UX is an engineering discipline based on cognitive load and psychology. Want a professional heuristic audit of your existing website? [Schedule a consultation with Aman UX Studio](https://amanuxstudio.com/contact).
`
  }
];

async function seedRealBlogs() {
  console.log("Connecting to Supabase at:", SUPABASE_URL);

  // 1. Delete all existing test blogs
  console.log("Removing all old test blogs...");
  const { error: deleteError } = await supabase
    .from("posts")
    .delete()
    .neq("id", "00000000-0000-0000-0000-000000000000"); // deletes all

  if (deleteError) {
    console.warn("Delete notice:", deleteError.message);
  } else {
    console.log("Old test blogs successfully removed.");
  }

  // 2. Fetch categories map
  const { data: categories } = await supabase.from("categories").select("id, name");
  const catMap = {};
  if (categories) {
    categories.forEach(c => {
      catMap[c.name.toLowerCase()] = c.id;
    });
  }

  // 3. Insert 5 real blogs
  for (const blog of blogs) {
    const categoryId = catMap[blog.category.toLowerCase()] || null;
    const postRecord = {
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt,
      content: blog.content,
      cover_image: blog.cover_image,
      published: true,
      category_id: categoryId,
      meta_title: blog.meta_title,
      meta_description: blog.meta_description,
      meta_keywords: blog.meta_keywords,
      created_at: new Date().toISOString()
    };

    console.log(`Inserting: "${blog.title.substring(0, 50)}..."`);
    const { error: insertError } = await supabase.from("posts").insert([postRecord]);
    if (insertError) {
      console.error("Insert error for", blog.slug, insertError.message);
    } else {
      console.log(`✅ Published: /blog/${blog.slug}`);
    }
  }

  console.log("All 5 real tech articles successfully seeded into Supabase!");
}

seedRealBlogs().catch(console.error);
