
-- 1. Create Categories Table
create table if not exists public.categories (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  slug text not null unique,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Add category_id to posts table
alter table public.posts 
add column if not exists category_id uuid references public.categories(id);

-- 3. Enable Realtime for specific tables
-- Note: You usually need to enable this in the Supabase Dashboard (Database -> Replication), 
-- but we can try to set the publication here if permissions allow.
alter publication supabase_realtime add table website_visits;

-- 4. RLS for Categories
alter table public.categories enable row level security;

create policy "Categories are viewable by everyone"
  on public.categories for select
  using ( true );

create policy "Authenticated users can insert categories"
  on public.categories for insert
  to authenticated
  with check ( true );

create policy "Authenticated users can update categories"
  on public.categories for update
  to authenticated
  using ( true );

create policy "Authenticated users can delete categories"
  on public.categories for delete
  to authenticated
  using ( true );

-- 5. Insert Default Categories
insert into public.categories (name, slug) values
('Development', 'development'),
('Design', 'design'),
('Tutorials', 'tutorials')
on conflict (slug) do nothing;
