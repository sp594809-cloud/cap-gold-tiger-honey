/**
 * Server-only CMS data. Never import from route modules directly —
 * only via dynamic import inside createServerFn handlers in cms.ts.
 *
 * With no DATABASE_URL: pure in-memory / static content (no PGlite).
 * With DATABASE_URL: Postgres via getSql().
 */
import { getSql, dbSource } from "@/lib/db";
import { youtubeEmbed } from "@/lib/utils";

export type SettingsMap = Record<string, string>;

export type NewsPost = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  image_url: string;
  published: boolean;
  created_at: string;
};

export type GalleryItem = {
  id: number;
  title: string;
  image_url: string;
  category: string;
  created_at: string;
};

export type Inquiry = {
  id: number;
  name: string;
  phone: string;
  email: string;
  applying_for: string;
  message: string;
  created_at: string;
};

export type Topper = {
  id: number;
  name: string;
  score: string;
  class_name: string;
  position: string;
  year: string;
  stream: string;
};

export const DEFAULT_SETTINGS: SettingsMap = {
  school_name: "Shyam International School",
  campus_name: "Mangaldeep Campus",
  gujarati_name: "મંગલદીપ વિદ્યાલય",
  tagline: "Best education in least fees",
  address:
    "Opp. Swaminarayan Park, Opp. Vishwakarma Mandir, Ranip–Vadaj Road, Ranip, Ahmedabad – 382480",
  phone1: "9824552964",
  phone2: "9172115777",
  phone3: "7226015795",
  whatsapp: "9824552964",
  email: "mangaldeepvidhyalaya@gmail.com",
  video_url: "https://www.youtube.com/embed/NK_ocf6A1zk",
  founded: "1987",
  hours: "Monday–Saturday, 9:00 AM – 5:00 PM",
  about:
    "Mangaldeep Vidyalay (Shyam International School, Mangaldeep Campus) has served Ranip since 1987. The campus blends Gujarati-medium roots with English-medium classes, offering Pre-Primary through Class 12 Science and Commerce with a simple promise: strong teaching, close guidance, and fees families can actually afford.",
};

const DEFAULT_NEWS: Omit<NewsPost, "id" | "created_at" | "published">[] = [
  {
    title: "Admission Open 2026–27",
    slug: "admission-open-2026-27",
    excerpt:
      "Pre-Primary, Classes 1–10, and Class 11 Science & Commerce seats are open at Mangaldeep Campus.",
    body: "Admissions are open for Pre-Primary, Classes 1 to 10, and Class 11 Science / Commerce. Visit the campus near Swaminarayan Park, Ranip, or call 9824552964 / 9172115777 / 7226015795. Our focus remains the same: best education in least fees, with weekly tests, board practice, and personal attention.",
    image_url: "/campus/admission-poster.jpg",
  },
  {
    title: "Shining Stars of 12th Commerce",
    slug: "shining-stars-12th-commerce",
    excerpt:
      "Congratulations to Agarwal Ayushie (PR 99.27), Adheshra Saumya (98.26) and Chauhan Hetaksh (PR 92.43).",
    body: "A joyful moment honouring dedication, resilience and progress. Agarwal Ayushie scored PR 99.27, Adheshra Saumya scored 98.26, and Chauhan Hetaksh scored PR 92.43 in Class 12 Commerce.",
    image_url: "/campus/toppers-poster.jpg",
  },
  {
    title: "Morning Assembly at Campus",
    slug: "morning-assembly",
    excerpt:
      "Students gather each morning in the courtyard for prayer, news and the day's thought.",
    body: "The courtyard assembly remains the heartbeat of Mangaldeep Vidyalay. Students sit together for prayer, national thought, and announcements.",
    image_url: "/campus/assembly-2.jpg",
  },
];

const DEFAULT_GALLERY: Omit<GalleryItem, "id" | "created_at">[] = [
  { title: "School gate", image_url: "/campus/gate-2.jpg", category: "Campus" },
  { title: "Campus building", image_url: "/campus/building-2.jpg", category: "Campus" },
  { title: "Main entrance", image_url: "/campus/entrance-2.jpg", category: "Campus" },
  { title: "Morning assembly", image_url: "/campus/assembly-2.jpg", category: "Events" },
  { title: "Classroom moment", image_url: "/campus/classroom-award.jpg", category: "Life" },
  { title: "Commerce toppers", image_url: "/campus/toppers-poster.jpg", category: "Results" },
  { title: "Admissions open", image_url: "/campus/admission-poster.jpg", category: "Admissions" },
  { title: "Saraswati blessing", image_url: "/campus/saraswati.jpg", category: "Culture" },
];

const DEFAULT_TOPPERS: Omit<Topper, "id">[] = [
  {
    name: "Agarwal Ayushie",
    score: "PR 99.27",
    class_name: "12th Commerce",
    position: "1st",
    year: "2024-25",
    stream: "Commerce",
  },
  {
    name: "Adheshra Saumya",
    score: "98.26",
    class_name: "12th Commerce",
    position: "2nd",
    year: "2024-25",
    stream: "Commerce",
  },
  {
    name: "Chauhan Hetaksh",
    score: "PR 92.43",
    class_name: "12th Commerce",
    position: "3rd",
    year: "2024-25",
    stream: "Commerce",
  },
];

const now = () => new Date().toISOString();

/** In-memory store when no database is configured. */
const memory = {
  settings: { ...DEFAULT_SETTINGS } as SettingsMap,
  news: DEFAULT_NEWS.map((n, i) => ({
    ...n,
    id: i + 1,
    published: true,
    created_at: now(),
  })) as NewsPost[],
  gallery: DEFAULT_GALLERY.map((g, i) => ({
    ...g,
    id: i + 1,
    created_at: now(),
  })) as GalleryItem[],
  toppers: DEFAULT_TOPPERS.map((t, i) => ({ ...t, id: i + 1 })) as Topper[],
  inquiries: [] as Inquiry[],
  nextId: 100,
};

const useMemory = () => dbSource === "none";

export async function seedIfEmpty() {
  if (useMemory()) return;
  const sql = await getSql();
  const count = await sql<{ n: number }>`select count(*)::int as n from site_settings`;
  if ((count[0]?.n ?? 0) > 0) return;

  for (const [key, value] of Object.entries(DEFAULT_SETTINGS)) {
    await sql`insert into site_settings (key, value) values (${key}, ${value}) on conflict (key) do nothing`;
  }
  for (const n of DEFAULT_NEWS) {
    await sql`insert into news_posts (title, slug, excerpt, body, image_url, published)
      values (${n.title}, ${n.slug}, ${n.excerpt}, ${n.body}, ${n.image_url}, true)
      on conflict (slug) do nothing`;
  }
  for (const g of DEFAULT_GALLERY) {
    await sql`insert into gallery_items (title, image_url, category)
      values (${g.title}, ${g.image_url}, ${g.category})`;
  }
  for (const t of DEFAULT_TOPPERS) {
    await sql`insert into toppers (name, score, class_name, position, year, stream)
      values (${t.name}, ${t.score}, ${t.class_name}, ${t.position}, ${t.year}, ${t.stream})`;
  }
}

export async function loadPublicSite() {
  if (useMemory()) {
    const settings = { ...memory.settings };
    if (settings.video_url) {
      settings.video_url = youtubeEmbed(settings.video_url) || settings.video_url;
    }
    return {
      settings,
      news: memory.news.filter((n) => n.published),
      gallery: [...memory.gallery],
      toppers: [...memory.toppers],
    };
  }
  await seedIfEmpty();
  const sql = await getSql();
  const rows = await sql<{ key: string; value: string }>`select key, value from site_settings`;
  const map: SettingsMap = { ...DEFAULT_SETTINGS };
  for (const r of rows) map[r.key] = r.value;
  if (map.video_url) map.video_url = youtubeEmbed(map.video_url) || map.video_url;

  const news = await sql<NewsPost>`
    select id, title, slug, excerpt, body, image_url, published, created_at::text as created_at
    from news_posts where published = true order by created_at desc`;
  const gallery = await sql<GalleryItem>`
    select id, title, image_url, category, created_at::text as created_at
    from gallery_items order by id desc`;
  const toppers = await sql<Topper>`
    select id, name, score, class_name, position, year, stream from toppers order by id`;

  return { settings: map, news, gallery, toppers };
}

export async function loadNewsBySlug(slug: string) {
  if (useMemory()) {
    return memory.news.find((n) => n.slug === slug) ?? null;
  }
  await seedIfEmpty();
  const sql = await getSql();
  const rows = await sql<NewsPost>`
    select id, title, slug, excerpt, body, image_url, published, created_at::text as created_at
    from news_posts where slug = ${slug} limit 1`;
  return rows[0] ?? null;
}

export async function insertInquiry(data: {
  name: string;
  phone: string;
  email: string;
  applying_for: string;
  message: string;
}) {
  if (useMemory()) {
    memory.inquiries.unshift({
      id: memory.nextId++,
      ...data,
      created_at: now(),
    });
    console.log("[cms] Inquiry (memory only, no DB):", data.name, data.phone);
    return;
  }
  const sql = await getSql();
  await sql`insert into inquiries (name, phone, email, applying_for, message)
    values (${data.name}, ${data.phone}, ${data.email}, ${data.applying_for}, ${data.message})`;
}

export async function loadAdminBundle() {
  if (useMemory()) {
    return {
      settings: { ...memory.settings },
      news: [...memory.news],
      gallery: [...memory.gallery],
      inquiries: [...memory.inquiries],
      toppers: [...memory.toppers],
    };
  }
  await seedIfEmpty();
  const sql = await getSql();
  const rows = await sql<{ key: string; value: string }>`select key, value from site_settings`;
  const map: SettingsMap = { ...DEFAULT_SETTINGS };
  for (const r of rows) map[r.key] = r.value;

  const news = await sql<NewsPost>`
    select id, title, slug, excerpt, body, image_url, published, created_at::text as created_at
    from news_posts order by created_at desc`;
  const gallery = await sql<GalleryItem>`
    select id, title, image_url, category, created_at::text as created_at
    from gallery_items order by id desc`;
  const inquiries = await sql<Inquiry>`
    select id, name, phone, email, applying_for, message, created_at::text as created_at
    from inquiries order by created_at desc`;
  const toppers = await sql<Topper>`
    select id, name, score, class_name, position, year, stream from toppers order by id`;

  return { settings: map, news, gallery, inquiries, toppers };
}

export async function upsertSettings(entries: Record<string, string>) {
  if (useMemory()) {
    Object.assign(memory.settings, entries);
    return;
  }
  const sql = await getSql();
  for (const [key, value] of Object.entries(entries)) {
    await sql`insert into site_settings (key, value) values (${key}, ${value})
      on conflict (key) do update set value = excluded.value`;
  }
}

export async function upsertNews(data: {
  id?: number;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  image_url: string;
  published: boolean;
}) {
  if (useMemory()) {
    if (data.id) {
      const i = memory.news.findIndex((n) => n.id === data.id);
      if (i >= 0) memory.news[i] = { ...memory.news[i], ...data };
    } else {
      memory.news.unshift({
        id: memory.nextId++,
        ...data,
        created_at: now(),
      });
    }
    return;
  }
  const sql = await getSql();
  if (data.id) {
    await sql`update news_posts set title = ${data.title}, slug = ${data.slug}, excerpt = ${data.excerpt},
      body = ${data.body}, image_url = ${data.image_url}, published = ${data.published} where id = ${data.id}`;
  } else {
    await sql`insert into news_posts (title, slug, excerpt, body, image_url, published)
      values (${data.title}, ${data.slug}, ${data.excerpt}, ${data.body}, ${data.image_url}, ${data.published})`;
  }
}

export async function removeNews(id: number) {
  if (useMemory()) {
    memory.news = memory.news.filter((n) => n.id !== id);
    return;
  }
  const sql = await getSql();
  await sql`delete from news_posts where id = ${id}`;
}

export async function insertGalleryItem(data: {
  title: string;
  image_url: string;
  category: string;
}) {
  if (useMemory()) {
    memory.gallery.unshift({
      id: memory.nextId++,
      ...data,
      created_at: now(),
    });
    return;
  }
  const sql = await getSql();
  await sql`insert into gallery_items (title, image_url, category)
    values (${data.title}, ${data.image_url}, ${data.category})`;
}

export async function removeGalleryItem(id: number) {
  if (useMemory()) {
    memory.gallery = memory.gallery.filter((g) => g.id !== id);
    return;
  }
  const sql = await getSql();
  await sql`delete from gallery_items where id = ${id}`;
}

export async function removeInquiry(id: number) {
  if (useMemory()) {
    memory.inquiries = memory.inquiries.filter((i) => i.id !== id);
    return;
  }
  const sql = await getSql();
  await sql`delete from inquiries where id = ${id}`;
}

export async function insertTopper(data: {
  name: string;
  score: string;
  class_name: string;
  position: string;
  year: string;
  stream: string;
}) {
  if (useMemory()) {
    memory.toppers.push({ id: memory.nextId++, ...data });
    return;
  }
  const sql = await getSql();
  await sql`insert into toppers (name, score, class_name, position, year, stream)
    values (${data.name}, ${data.score}, ${data.class_name}, ${data.position}, ${data.year}, ${data.stream})`;
}

export async function removeTopper(id: number) {
  if (useMemory()) {
    memory.toppers = memory.toppers.filter((t) => t.id !== id);
    return;
  }
  const sql = await getSql();
  await sql`delete from toppers where id = ${id}`;
}
