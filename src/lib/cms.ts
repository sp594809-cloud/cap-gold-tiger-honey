/**
 * Client-safe types and defaults. Server functions live in cms.server.ts
 * (required by TanStack Start / Vite so exports resolve at build time).
 */
export type {
  SettingsMap,
  NewsPost,
  GalleryItem,
  Inquiry,
  Topper,
} from "./cms.server";

export { DEFAULT_SETTINGS } from "./cms.server";
