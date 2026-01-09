-- Create posts table
create table public.posts (
  id uuid not null default gen_random_uuid (),
  title text not null,
  slug text not null,
  content text not null,
  excerpt text null,
  cover_image text null,
  published boolean not null default false,
  created_at timestamp with time zone not null default now(),
  constraint posts_pkey primary key (id),
  constraint posts_slug_key unique (slug)
);

-- Create website_visits table
create table public.website_visits (
  id uuid not null default gen_random_uuid (),
  page text not null,
  user_agent text null,
  ip_address text null,
  created_at timestamp with time zone not null default now(),
  constraint website_visits_pkey primary key (id)
);

-- Set up Row Level Security (RLS)
alter table public.posts enable row level security;
alter table public.website_visits enable row level security;

-- Policies for posts
-- Anyone can read published posts
create policy "Public posts are viewable by everyone" on public.posts
  for select
  using (published = true);

-- Admins can do everything (Assuming you will use Supabase Auth for admin)
-- For simplicity in this demo, we might need a better admin check.
-- A simple way is to allow authenticated users to do everything if you are the only user.
create policy "Authenticated users can manage posts" on public.posts
  for all
  using (auth.role() = 'authenticated');

-- Policies for website_visits
-- Anyone can insert visits (anon)
create policy "Anyone can insert visits" on public.website_visits
  for insert
  with check (true);

-- Only authenticated users can view visits
create policy "Authenticated users can view visits" on public.website_visits
  for select
  using (auth.role() = 'authenticated');
