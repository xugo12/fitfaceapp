-- Enable Row Level Security (RLS)
-- alter table auth.users enable row level security; -- SKIPPED: Managed by Supabase


-- Create Profiles Table (Public User Data)
create table public.profiles (
  id uuid references auth.users(id) on delete cascade not null primary key,
  email text,
  name text,
  role text default 'member',
  photo_url text,
  streak int default 0,
  subscription_status text default 'active',
  completed_days jsonb default '[]'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create Modules Table
create table public.modules (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  category text,
  level text,
  duration text,
  cover_url text,
  "order" int,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create Lessons Table
create table public.lessons (
  id uuid default gen_random_uuid() primary key,
  module_id uuid references public.modules(id) on delete cascade not null,
  title text not null,
  video_url text,
  duration text,
  description text,
  completed_by jsonb default '[]'::jsonb, 
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create Posts Table (Community)
create table public.posts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  text text,
  likes int default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS Policies (Simple for now: read all, write authenticated)
alter table public.profiles enable row level security;
alter table public.modules enable row level security;
alter table public.lessons enable row level security;
alter table public.posts enable row level security;

create policy "Public profiles are viewable by everyone" on public.profiles for select using (true);
create policy "Users can insert own profile" on public.profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

create policy "Modules are viewable by everyone" on public.modules for select using (true);
create policy "Admins can insert modules" on public.modules for insert with check (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

create policy "Lessons are viewable by everyone" on public.lessons for select using (true);
create policy "Admins can insert lessons" on public.lessons for insert with check (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

create policy "Posts are viewable by everyone" on public.posts for select using (true);
create policy "Authenticated users can insert posts" on public.posts for insert with check (auth.role() = 'authenticated');
