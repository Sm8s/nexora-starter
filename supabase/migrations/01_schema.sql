-- Align NEXORA schema to Supabase auth.users (UUID) and add profiles

-- PROFILES: 1:1 zu auth.users
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique,
  name text,
  role text default 'user',
  created_at timestamptz default now()
);

-- Pages
create table if not exists public.pages (
  id serial primary key,
  slug text unique,
  title text,
  content text,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  deleted_at timestamptz
);

-- Posts (author_id -> auth.users)
create table if not exists public.posts (
  id serial primary key,
  slug text unique,
  title text,
  body text,
  status text default 'draft',
  author_id uuid references auth.users(id) on delete set null,
  scheduled_at timestamptz,
  published_at timestamptz
);

create table if not exists public.post_tags (
  post_id int references public.posts(id) on delete cascade,
  tag text,
  primary key (post_id, tag)
);

-- Learning
create table if not exists public.areas (
  id serial primary key,
  name text unique not null
);

create table if not exists public.tasks (
  id serial primary key,
  area_id int references public.areas(id) on delete set null,
  title text,
  difficulty int default 1,
  hint text,
  solution text,
  created_at timestamptz default now()
);

create table if not exists public.progress (
  user_id uuid references auth.users(id) on delete cascade,
  task_id int references public.tasks(id) on delete cascade,
  state text default 'todo',
  updated_at timestamptz default now(),
  primary key (user_id, task_id)
);

-- Media
create table if not exists public.media (
  id serial primary key,
  user_id uuid references auth.users(id) on delete set null,
  filename text,
  url text,
  created_at timestamptz default now()
);

-- Menus
create table if not exists public.menus (
  id serial primary key,
  label text,
  url text,
  parent_id int,
  position int
);

-- Audit Log
create table if not exists public.audit_log (
  id serial primary key,
  user_id uuid references auth.users(id) on delete set null,
  action text,
  entity text,
  entity_id text,
  detail text,
  ip text,
  ua text,
  created_at timestamptz default now()
);

-- Comments & Notifications
create table if not exists public.comments (
  id serial primary key,
  entity text,
  entity_id int,
  user_id uuid references auth.users(id) on delete set null,
  body text,
  created_at timestamptz default now()
);

create table if not exists public.notifications (
  id serial primary key,
  user_id uuid references auth.users(id) on delete cascade,
  type text,
  payload jsonb,
  read_at timestamptz,
  created_at timestamptz default now()
);

-- Events (analytics)
create table if not exists public.events (
  id serial primary key,
  user_id uuid references auth.users(id) on delete set null,
  type text,
  payload jsonb,
  created_at timestamptz default now()
);
