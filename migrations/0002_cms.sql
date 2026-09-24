create table if not exists site_settings (
  key text primary key,
  value text not null
);

create table if not exists news_posts (
  id serial primary key,
  title text not null,
  slug text not null unique,
  excerpt text not null default '',
  body text not null default '',
  image_url text not null default '',
  published boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists gallery_items (
  id serial primary key,
  title text not null,
  image_url text not null,
  category text not null default 'Campus',
  created_at timestamptz not null default now()
);

create table if not exists inquiries (
  id serial primary key,
  name text not null,
  phone text not null,
  email text not null default '',
  applying_for text not null default '',
  message text not null default '',
  created_at timestamptz not null default now()
);

create table if not exists toppers (
  id serial primary key,
  name text not null,
  score text not null,
  class_name text not null,
  position text not null,
  year text not null,
  stream text not null default ''
);
