import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function youtubeEmbed(url: string): string {
  const raw = url.trim();
  if (raw.includes("youtube.com/embed/")) return raw;
  const match = raw.match(/(?:youtu\.be\/|v=)([A-Za-z0-9_-]{6,})/);
  if (match?.[1]) return `https://www.youtube.com/embed/${match[1]}`;
  return raw;
}

export function waLink(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  const withCc = digits.startsWith("91") ? digits : `91${digits}`;
  return `https://wa.me/${withCc}`;
}

export function telLink(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  return `tel:+91${digits.startsWith("91") ? digits.slice(2) : digits}`;
}
