import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { authMiddleware } from "@/lib/auth/middleware";
import { getSql } from "@/lib/db";
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
    body: "Admissions are open for Pre-Primary, Classes 1 to 10, and Class 11 Science / Commerce. Visit the campus near Swaminarayan Park, Ranip, or call 9824552964 / 9172115777. Our focus remains the same: best education in least fees, with weekly tests, board practice, and personal attention.",
    image_url: "/campus/admission.jpg",
  },
  {
    title: "Shining Stars of 12th Commerce",
    slug: "shining-stars-12th-commerce",
    excerpt:
      "Congratulations to Agarwal Ayushie (PR 99.27), Adheshra Saumya (98.26) and Chauhan Hetaksh (PR 92.43).",
    body: "A joyful moment honouring dedication, resilience and progress. Agarwal Ayushie scored PR 99.27, Adheshra Saumya scored 98.26, and Chauhan Hetaksh scored PR 92.43 in Class 12 Commerce. The school family congratulates every student who reached higher goals with passion and gratitude.",
    image_url: "/campus/toppers.jpg",
  },
  {
    title: "Morning Assembly at Campus",
    slug: "morning-assembly",
    excerpt:
      "Students gather each morning in the courtyard for prayer, news and the day's thought.",
    body: "The courtyard assembly remains the heartbeat of Mangaldeep Vidyalay. Students sit together for prayer, national thought, and announcements — a daily reminder that discipline and community come before textbooks.",
    image_url: "/campus/assembly.jpg",
  },
];

const DEFAULT_GALLERY: Omit<GalleryItem, "id" | "created_at">[] = [
  { title: "Main gate", image_url: "/campus/gate.jpg", category: "Campus" },
  { title: "School building", image_url: "/campus/building.jpg", category: "Campus" },
  { title: "Entrance stairs", image_url: "/campus/entrance.jpg", category: "Campus" },
  { title: "Morning assembly", image_url: "/campus/assembly.jpg", category: "Events" },
  { title: "Classroom moment", image_url: "/campus/classroom.jpg", category: "Life" },
  { title: "Commerce toppers", image_url: "/campus/toppers.jpg", category: "Results" },
  { title: "Admission notice", image_url: "/campus/admission.jpg", category: "Notices" },
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

async function seedIfEmpty() {
  const sql = await getSql();
  const count = await sql<{ n: number }>`select count(*)::int as n from site_settings`;
  if ((count[0]?.n ?? 0) > 0) return;

  for (const [key, value] of Object.entries(DEFAULT_SETTINGS)) {
    await sql`insert into site_settings (key, value) values (${key}, ${value}) on conflict (key) do nothing`;
  }
  for (const post of DEFAULT_NEWS) {
    await sql`insert into news_posts (title, slug, excerpt, body, image_url, published)
      values (${post.title}, ${post.slug}, ${post.excerpt}, ${post.body}, ${post.image_url}, true)
      on conflict (slug) do nothing`;
  }
  for (const item of DEFAULT_GALLERY) {
    await sql`insert into gallery_items (title, image_url, category)
      values (${item.title}, ${item.image_url}, ${item.category})`;
  }
  for (const t of DEFAULT_TOPPERS) {
    await sql`insert into toppers (name, score, class_name, position, year, stream)
      values (${t.name}, ${t.score}, ${t.class_name}, ${t.position}, ${t.year}, ${t.stream})`;
  }
}

function rowsToSettings(rows: { key: string; value: string }[]): SettingsMap {
  return { ...DEFAULT_SETTINGS, ...Object.fromEntries(rows.map((r) => [r.key, r.value])) };
}

export const getPublicSite = createServerFn({ method: "GET" }).handler(async () => {
  await seedIfEmpty();
  const sql = await getSql();
  const settings = await sql<{ key: string; value: string }>`select key, value from site_settings`;
  const news = await sql<NewsPost>`
    select id, title, slug, excerpt, body, image_url, published, created_at::text as created_at
    from news_posts where published = true order by created_at desc`;
  const gallery = await sql<GalleryItem>`
    select id, title, image_url, category, created_at::text as created_at
    from gallery_items order by created_at desc`;
  const toppers = await sql<Topper>`
    select id, name, score, class_name, position, year, stream from toppers order by id`;
  const map = rowsToSettings(settings);
  map.video_url = youtubeEmbed(map.video_url);
  return { settings: map, news, gallery, toppers };
});

export const getNewsBySlug = createServerFn({ method: "GET" })
  .validator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    await seedIfEmpty();
    const sql = await getSql();
    const rows = await sql<NewsPost>`
      select id, title, slug, excerpt, body, image_url, published, created_at::text as created_at
      from news_posts where slug = ${slug} and published = true limit 1`;
    return rows[0] ?? null;
  });

export const submitInquiry = createServerFn({ method: "POST" })
  .validator(
    z.object({
      name: z.string().min(2).max(80),
      phone: z.string().min(7).max(20),
      email: z.string().max(120).optional(),
      applying_for: z.string().max(60).optional(),
      message: z.string().max(800).optional(),
    }),
  )
  .handler(async ({ data }) => {
    const sql = await getSql();
    await sql`insert into inquiries (name, phone, email, applying_for, message)
      values (${data.name.trim()}, ${data.phone.trim()}, ${data.email?.trim() ?? ""}, ${data.applying_for?.trim() ?? ""}, ${data.message?.trim() ?? ""})`;
    return { ok: true as const };
  });

export const getAdminBundle = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async () => {
    await seedIfEmpty();
    const sql = await getSql();
    const settings = await sql<{ key: string; value: string }>`select key, value from site_settings`;
    const news = await sql<NewsPost>`
      select id, title, slug, excerpt, body, image_url, published, created_at::text as created_at
      from news_posts order by created_at desc`;
    const gallery = await sql<GalleryItem>`
      select id, title, image_url, category, created_at::text as created_at
      from gallery_items order by created_at desc`;
    const inquiries = await sql<Inquiry>`
      select id, name, phone, email, applying_for, message, created_at::text as created_at
      from inquiries order by created_at desc`;
    const toppers = await sql<Topper>`
      select id, name, score, class_name, position, year, stream from toppers order by id`;
    return {
      settings: rowsToSettings(settings),
      news,
      gallery,
      inquiries,
      toppers,
    };
  });

export const saveSettings = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(z.record(z.string(), z.string()))
  .handler(async ({ data }) => {
    const sql = await getSql();
    for (const [key, value] of Object.entries(data)) {
      await sql`insert into site_settings (key, value) values (${key}, ${value})
        on conflict (key) do update set value = excluded.value`;
    }
    return { ok: true as const };
  });

const newsInput = z.object({
  id: z.number().optional(),
  title: z.string().min(3),
  slug: z.string().min(2),
  excerpt: z.string(),
  body: z.string(),
  image_url: z.string(),
  published: z.boolean(),
});

export const saveNews = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(newsInput)
  .handler(async ({ data }) => {
    const sql = await getSql();
    if (data.id) {
      await sql`update news_posts set title = ${data.title}, slug = ${data.slug}, excerpt = ${data.excerpt},
        body = ${data.body}, image_url = ${data.image_url}, published = ${data.published} where id = ${data.id}`;
    } else {
      await sql`insert into news_posts (title, slug, excerpt, body, image_url, published)
        values (${data.title}, ${data.slug}, ${data.excerpt}, ${data.body}, ${data.image_url}, ${data.published})`;
    }
    return { ok: true as const };
  });

export const deleteNews = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((id: number) => id)
  .handler(async ({ data: id }) => {
    const sql = await getSql();
    await sql`delete from news_posts where id = ${id}`;
    return { ok: true as const };
  });

export const saveGalleryItem = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    z.object({
      title: z.string().min(2),
      image_url: z.string().min(2),
      category: z.string().min(2),
    }),
  )
  .handler(async ({ data }) => {
    const sql = await getSql();
    await sql`insert into gallery_items (title, image_url, category)
      values (${data.title}, ${data.image_url}, ${data.category})`;
    return { ok: true as const };
  });

export const deleteGalleryItem = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((id: number) => id)
  .handler(async ({ data: id }) => {
    const sql = await getSql();
    await sql`delete from gallery_items where id = ${id}`;
    return { ok: true as const };
  });

export const deleteInquiry = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((id: number) => id)
  .handler(async ({ data: id }) => {
    const sql = await getSql();
    await sql`delete from inquiries where id = ${id}`;
    return { ok: true as const };
  });

export const saveTopper = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    z.object({
      name: z.string().min(2),
      score: z.string().min(1),
      class_name: z.string().min(1),
      position: z.string().min(1),
      year: z.string().min(1),
      stream: z.string(),
    }),
  )
  .handler(async ({ data }) => {
    const sql = await getSql();
    await sql`insert into toppers (name, score, class_name, position, year, stream)
      values (${data.name}, ${data.score}, ${data.class_name}, ${data.position}, ${data.year}, ${data.stream})`;
    return { ok: true as const };
  });

export const deleteTopper = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((id: number) => id)
  .handler(async ({ data: id }) => {
    const sql = await getSql();
    await sql`delete from toppers where id = ${id}`;
    return { ok: true as const };
  });
