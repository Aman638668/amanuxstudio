-- 1. Create leads table for persisting contact submissions & newsletter signups
create table if not exists public.leads (
  id uuid default gen_random_uuid() primary key,
  name text,
  email text not null,
  message text,
  title text default 'Website Contact Form',
  status text default 'new',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Enable Row Level Security (RLS)
alter table public.leads enable row level security;

-- 3. Anyone (public / anon) can insert new leads from the website
create policy "Anyone can insert leads"
  on public.leads for insert
  with check (true);

-- 4. Only authenticated users (Admin) can view, update, and delete leads
create policy "Authenticated users can manage leads"
  on public.leads for all
  to authenticated
  using (true);
