
/**
 * CMS API for routes. Uses createServerFn so the browser never imports cms.server.ts.
 * Handlers dynamically import "@/lib/cms.server" on the server only.
 */
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { authMiddleware } from "@/lib/auth/middleware";

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

export const getPublicSite = createServerFn({ method: "GET" }).handler(async () => {
  const { loadPublicSite } = await import("@/lib/cms.server");
  return loadPublicSite();
});

export const getNewsBySlug = createServerFn({ method: "GET" })
  .validator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    const { loadNewsBySlug } = await import("@/lib/cms.server");
    return loadNewsBySlug(slug);
  });

export const submitInquiry = createServerFn({ method: "POST" })
  .validator(
    z.object({
      name: z.string().min(2),
      phone: z.string().min(8),
      email: z.string(),
      applying_for: z.string(),
      message: z.string(),
    }),
  )
  .handler(async ({ data }) => {
    const { insertInquiry } = await import("@/lib/cms.server");
    await insertInquiry(data);
    return { ok: true as const };
  });

export const getAdminBundle = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async () => {
    const { loadAdminBundle } = await import("@/lib/cms.server");
    return loadAdminBundle();
  });

export const saveSettings = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(z.record(z.string(), z.string()))
  .handler(async ({ data }) => {
    const { upsertSettings } = await import("@/lib/cms.server");
    await upsertSettings(data);
    return { ok: true as const };
  });

export const saveNews = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    z.object({
      id: z.number().optional(),
      title: z.string().min(2),
      slug: z.string().min(2),
      excerpt: z.string(),
      body: z.string(),
      image_url: z.string(),
      published: z.boolean(),
    }),
  )
  .handler(async ({ data }) => {
    const { upsertNews } = await import("@/lib/cms.server");
    await upsertNews(data);
    return { ok: true as const };
  });

export const deleteNews = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((id: number) => id)
  .handler(async ({ data: id }) => {
    const { removeNews } = await import("@/lib/cms.server");
    await removeNews(id);
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
    const { insertGalleryItem } = await import("@/lib/cms.server");
    await insertGalleryItem(data);
    return { ok: true as const };
  });

export const deleteGalleryItem = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((id: number) => id)
  .handler(async ({ data: id }) => {
    const { removeGalleryItem } = await import("@/lib/cms.server");
    await removeGalleryItem(id);
    return { ok: true as const };
  });

export const deleteInquiry = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((id: number) => id)
  .handler(async ({ data: id }) => {
    const { removeInquiry } = await import("@/lib/cms.server");
    await removeInquiry(id);
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
    const { insertTopper } = await import("@/lib/cms.server");
    await insertTopper(data);
    return { ok: true as const };
  });

export const deleteTopper = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((id: number) => id)
  .handler(async ({ data: id }) => {
    const { removeTopper } = await import("@/lib/cms.server");
    await removeTopper(id);
    return { ok: true as const };
  });
