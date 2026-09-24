import type { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Menu, Phone, X, Youtube, Facebook, MapPin, GraduationCap,
  Clock, MessageCircle,
} from "lucide-react";
import { useState } from "react";
import type { SettingsMap } from "@/lib/cms.server";
import { FACEBOOK_PAGE, NAV, YOUTUBE_CHANNEL } from "@/lib/site";
import { cn, telLink, waLink } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function SiteShell({
  settings,
  children,
}: {
  settings: SettingsMap;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const phones = [settings.phone1, settings.phone2, settings.phone3].filter(Boolean);

  return (
    <div className="min-h-screen bg-bg">
      {/* Prominent top contact bar */}
      <div className="bg-primary-dark text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-2.5 text-sm sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <p className="flex items-center gap-1.5">
              <MapPin className="size-4 shrink-0 text-gold" />
              <span className="line-clamp-1">{settings.address}</span>
            </p>
            <p className="flex items-center gap-1.5 text-white/90">
              <Clock className="size-4 shrink-0 text-gold" />
              <span>{settings.hours || "Mon–Sat, 9:00 AM – 5:00 PM"}</span>
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-medium">
            {phones.map((p) => (
              <a key={p} href={telLink(p)} className="inline-flex items-center gap-1.5 hover:text-gold">
                <Phone className="size-4" />
                {p}
              </a>
            ))}
            <a
              href={waLink(settings.whatsapp || settings.phone1)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-green px-2.5 py-0.5 text-white hover:brightness-110"
            >
              <MessageCircle className="size-3.5" />
              WhatsApp
            </a>
            <a href={YOUTUBE_CHANNEL} target="_blank" rel="noreferrer" className="hidden items-center gap-1 sm:inline-flex hover:text-gold">
              <Youtube className="size-4" /> YouTube
            </a>
            <a href={FACEBOOK_PAGE} target="_blank" rel="noreferrer" className="hidden items-center gap-1 sm:inline-flex hover:text-gold">
              <Facebook className="size-4" /> Facebook
            </a>
          </div>
        </div>
      </div>

      {/* Admissions banner */}
      <div className="bg-gold text-ink">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-2 text-sm font-semibold">
          <span>🎓 Admissions Open 2026–27 — Pre-Primary to Class 12 (Science &amp; Commerce)</span>
          <Link to="/admissions" className="rounded-lg bg-primary-dark px-3 py-1 text-white hover:bg-primary">
            Apply Now →
          </Link>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-line bg-paper shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <Link to="/" className="flex min-w-0 items-center gap-3">
            <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-primary text-white shadow-md shadow-primary/30">
              <GraduationCap className="size-6" />
            </span>
            <span className="min-w-0 leading-tight">
              <span className="block truncate text-base font-bold text-primary-dark sm:text-lg">
                {settings.school_name}
              </span>
              <span className="block truncate text-xs text-muted sm:text-sm">
                {settings.gujarati_name} · Mangaldeep Campus
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-0.5 lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-semibold transition",
                  pathname === item.to
                    ? "bg-primary text-white"
                    : "text-ink hover:bg-primary-light hover:text-primary",
                )}
              >
                {item.label}
              </Link>
            ))}
            <Button asChild size="sm" className="ml-2 bg-gold font-bold text-ink hover:bg-gold/90">
              <Link to="/admissions">Apply Now</Link>
            </Button>
          </nav>

          <button
            type="button"
            className="grid size-12 place-items-center rounded-xl border-2 border-primary bg-primary-light text-primary lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>

        {/* Visible mobile menu */}
        {open ? (
          <nav className="border-t border-line bg-paper px-4 py-4 lg:hidden">
            <div className="flex flex-col gap-1">
              {NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-xl px-4 py-3.5 text-base font-semibold",
                    pathname === item.to ? "bg-primary text-white" : "bg-bg text-ink hover:bg-primary-light",
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/admissions"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-xl bg-gold px-4 py-4 text-center text-base font-bold text-ink"
              >
                Apply Now — Admission 2026–27
              </Link>
            </div>
          </nav>
        ) : null}
      </header>

      <main>{children}</main>

      <footer className="mt-12 border-t border-line bg-primary-dark text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-lg bg-white/15">
                <GraduationCap className="size-5" />
              </span>
              <div>
                <p className="text-lg font-bold">{settings.school_name}</p>
                <p className="text-sm text-white/70">{settings.gujarati_name}</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/85">
              <strong className="text-gold">Mangaldeep Vidyalay</strong> is the established campus brand
              (since 1987). Classes also run under{" "}
              <strong className="text-white">Shyam International School (Mangaldeep Campus)</strong> —
              same location, same teachers, Pre-Primary to Class 12.
            </p>
          </div>
          <div>
            <p className="text-xs font-bold tracking-wider text-gold uppercase">Visit</p>
            <p className="mt-3 text-sm leading-relaxed text-white/90">{settings.address}</p>
            <p className="mt-2 text-sm text-white/75">{settings.hours}</p>
          </div>
          <div>
            <p className="text-xs font-bold tracking-wider text-gold uppercase">Contact</p>
            <div className="mt-3 flex flex-col gap-2 text-sm font-medium">
              {phones.map((p) => (
                <a key={p} href={telLink(p)} className="hover:text-gold">{p}</a>
              ))}
              <a href={`mailto:${settings.email}`} className="hover:text-gold">{settings.email}</a>
              <Link to="/login" className="mt-2 text-white/50 hover:text-white">Staff login</Link>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 py-4 text-center text-xs text-white/50">
          © {new Date().getFullYear()} Mangaldeep Vidyalay / Shyam International School, Ranip, Ahmedabad.
        </div>
      </footer>

      <a
        href={waLink(settings.whatsapp || settings.phone1)}
        target="_blank"
        rel="noreferrer"
        className="fixed right-4 bottom-4 z-40 inline-flex h-14 items-center gap-2 rounded-full bg-green px-5 text-base font-bold text-white shadow-lg shadow-green/40"
      >
        <MessageCircle className="size-5" />
        WhatsApp
      </a>
    </div>
  );
}
