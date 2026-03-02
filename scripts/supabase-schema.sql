-- ============================================================
-- BODA Community Board — Supabase Schema
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New Query)
-- ============================================================

-- 1. PROFILES (public user info derived from auth.users)
create table if not exists profiles (
  id         uuid primary key references auth.users(id) on delete cascade,
  nickname   text not null default '',
  avatar_url text default '',
  created_at timestamptz default now()
);

alter table profiles enable row level security;

create policy "Anyone can read profiles"
  on profiles for select
  to anon, authenticated
  using (true);

create policy "Users can update own profile"
  on profiles for update
  to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

create policy "Users can insert own profile"
  on profiles for insert
  to authenticated
  with check ((select auth.uid()) = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, nickname, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'name', new.raw_user_meta_data ->> 'full_name', '익명'),
    coalesce(new.raw_user_meta_data ->> 'avatar_url', new.raw_user_meta_data ->> 'picture', '')
  );
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();


-- 2. POSTS (경험담 — 익명 허용)
create table if not exists posts (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid references auth.users(id) on delete set null,  -- nullable for anonymous
  nickname      text default '익명',    -- display name (anonymous default)
  service_id    text not null,          -- matches BODA SERVICES[].id
  title         text not null,
  body          text not null,
  concern_type  text not null,          -- 연애/궁합, 진로/취업, ...
  method_used   text not null,          -- 전화 상담, 채팅 상담, ...
  cost_spent    text default '',        -- approximate cost text
  satisfaction  smallint not null check (satisfaction between 1 and 5),
  like_count    int default 0,
  comment_count int default 0,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

create index posts_service_id_idx  on posts using btree (service_id);
create index posts_user_id_idx     on posts using btree (user_id);
create index posts_concern_idx     on posts using btree (concern_type);
create index posts_created_at_idx  on posts using btree (created_at desc);

alter table posts enable row level security;

create policy "Anyone can read posts"
  on posts for select
  to anon, authenticated
  using (true);

create policy "Anyone can create posts"
  on posts for insert
  to anon, authenticated
  with check (true);

create policy "Authors can update own posts"
  on posts for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "Authors can delete own posts"
  on posts for delete
  to authenticated
  using ((select auth.uid()) = user_id);


-- 3. COMMENTS (댓글 — 익명 허용)
create table if not exists comments (
  id         uuid primary key default gen_random_uuid(),
  post_id    uuid references posts(id) on delete cascade not null,
  user_id    uuid references auth.users(id) on delete set null,  -- nullable for anonymous
  nickname   text default '익명',    -- display name (anonymous default)
  body       text not null,
  created_at timestamptz default now()
);

create index comments_post_id_idx on comments using btree (post_id);
create index comments_user_id_idx on comments using btree (user_id);

alter table comments enable row level security;

create policy "Anyone can read comments"
  on comments for select
  to anon, authenticated
  using (true);

create policy "Anyone can create comments"
  on comments for insert
  to anon, authenticated
  with check (true);

create policy "Authors can update own comments"
  on comments for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "Authors can delete own comments"
  on comments for delete
  to authenticated
  using ((select auth.uid()) = user_id);


-- 4. LIKES (좋아요 — 1인 1좋아요)
create table if not exists likes (
  id         uuid primary key default gen_random_uuid(),
  post_id    uuid references posts(id) on delete cascade not null,
  user_id    uuid references auth.users(id) on delete cascade not null,
  created_at timestamptz default now(),
  unique(post_id, user_id)
);

create index likes_post_id_idx on likes using btree (post_id);

alter table likes enable row level security;

create policy "Anyone can read likes"
  on likes for select
  to anon, authenticated
  using (true);

create policy "Authenticated users can like"
  on likes for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

create policy "Users can unlike"
  on likes for delete
  to authenticated
  using ((select auth.uid()) = user_id);


-- 5. FUNCTIONS: auto-update counters

-- Like count
create or replace function update_post_like_count()
returns trigger as $$
begin
  if TG_OP = 'INSERT' then
    update posts set like_count = like_count + 1 where id = NEW.post_id;
  elsif TG_OP = 'DELETE' then
    update posts set like_count = like_count - 1 where id = OLD.post_id;
  end if;
  return null;
end;
$$ language plpgsql security definer;

create trigger on_like_change
  after insert or delete on likes
  for each row execute function update_post_like_count();

-- Comment count
create or replace function update_post_comment_count()
returns trigger as $$
begin
  if TG_OP = 'INSERT' then
    update posts set comment_count = comment_count + 1 where id = NEW.post_id;
  elsif TG_OP = 'DELETE' then
    update posts set comment_count = comment_count - 1 where id = OLD.post_id;
  end if;
  return null;
end;
$$ language plpgsql security definer;

create trigger on_comment_change
  after insert or delete on comments
  for each row execute function update_post_comment_count();

-- Updated_at auto-touch
create or replace function update_updated_at()
returns trigger as $$
begin
  NEW.updated_at = now();
  return NEW;
end;
$$ language plpgsql;

create trigger posts_updated_at
  before update on posts
  for each row execute function update_updated_at();
