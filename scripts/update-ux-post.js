import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("Missing Supabase credentials in .env");
  process.exit(1);
}

const sb = createClient(SUPABASE_URL, SUPABASE_KEY);

const title = 'UX Flaws That Are Quietly Destroying Your Landing Page Conversions';
const excerpt = 'Great traffic means nothing when your experience gets in the way. Here are the UX mistakes costing you customers—and how to fix them.';
const meta_title = 'UX Flaws That Are Quietly Destroying Your Landing Page Conversions | Aman UX Studio';
const meta_description = excerpt;

const content = `You can run ads, improve your SEO, and get thousands of people to your landing page — but if the user experience (UX) is broken, most of them will leave without taking action. Let's look at the most common UX flaws that silently kill conversions and how you can fix them.

## Your landing page has one job.

A landing page isn't just a pretty page — it's a focused experience designed to make the user take a specific action, like signing up, booking a demo, or making a purchase. Even small UX issues can create doubt, friction, and enough resistance for users to leave.

> ### Every extra second of confusion is a reason to leave.
> A clear, simple, and trustworthy experience keeps users moving toward your goal.

## The most common UX flaws (and how to fix them)

### 01. Unclear value proposition
If users can't quickly understand what you offer and why it matters, they won't stick around.

**How to fix it:**
- Use a clear, benefit-driven headline.
- Add a short, supporting subheading.
- Show what makes you different.

### 02. Too many competing actions
Multiple CTAs and mixed goals create decision fatigue. Guide users toward one clear next step.

**How to fix it:**
- Limit the primary screen to a single main action.
- Reduce secondary links and competing navigation items.
- Ensure the CTA button is prominently styled and easy to find.

### 03. Missing trust signals & social proof
Without proof that others trust you, visitors feel hesitation before sharing details or booking.

**How to fix it:**
- Place real client logos and verified reviews near CTAs.
- Display measurable case study outcomes (e.g. Fairease, Ireshh).
- Highlight security guarantees and transparent contact info.

### 04. Form friction & unnecessary fields
Asking for too much information upfront kills high-intent visitor momentum.

**How to fix it:**
- Cut form fields down to the bare essentials (Name, Email, Message).
- Enable single-click autofill for mobile users.
- Use inline validation so users know inputs are valid in real time.

### 05. Weak CTA clarity & contrast
Generic buttons like "Submit" or "Click Here" fail to communicate value or urgency.

**How to fix it:**
- Use active, value-centric copy: "Get Free Project Proposal".
- Use high-contrast brand colors that stand out against the background.
- Keep CTA buttons sticky or easy to reach on mobile screens.

---

## How to fix them
Conversion-driven UX is not about personal taste — it is an engineering discipline based on cognitive load, clarity, and psychology. Every friction point you eliminate directly increases the percentage of visitors who convert into paying clients.
`;

const run = async () => {
  const { data, error } = await sb.from('posts').update({
    title,
    excerpt,
    meta_title,
    meta_description,
    content
  }).eq('slug', 'ux-flaws-destroying-landing-page-conversions').select();

  if (error) {
    console.error('Failed to update post:', error);
    process.exit(1);
  }
  console.log('✅ Successfully updated UX Flaws post in Supabase!', data);
};

run();
