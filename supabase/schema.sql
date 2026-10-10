-- Portfolio schema
create table if not exists public.projects (
  id            uuid        primary key default gen_random_uuid(),
  title         text        not null,
  category      text        not null,
  thumbnail_url text,
  video_url     text,
  description   text,
  is_featured   boolean     not null default false,
  display_order integer     not null default 0,
  created_at    timestamptz not null default now()
);

create table if not exists public.blog_posts (
  id              uuid        primary key default gen_random_uuid(),
  title           text        not null,
  slug            text        not null unique,
  content         text,
  excerpt         text,
  cover_image_url text,
  published       boolean     not null default false,
  created_at      timestamptz not null default now()
);

alter table public.projects   enable row level security;
alter table public.blog_posts enable row level security;

drop policy if exists "Public can read projects" on public.projects;
create policy "Public can read projects"
  on public.projects for select to anon, authenticated using (true);

drop policy if exists "Public can read published blog posts" on public.blog_posts;
create policy "Public can read published blog posts"
  on public.blog_posts for select to anon, authenticated using (published = true);
