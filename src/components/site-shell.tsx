import type { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Phone, X, Youtube, Facebook, MapPin } from "lucide-react";
import { useState } from "react";
import type { SettingsMap } from "@/lib/cms.server";
import { FACEBOOK_PAGE, NAV, UDISE, YOUTUBE_CHANNEL } from "@/lib/site";
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
      <div className="bg-navy-deep text-paper">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-2 text-xs">
          <p className="flex items-center gap-2 text-paper/80">
            <MapPin className="size-3.5 shrink-0" />
            <span className="line-clamp-1">{settings.address}</span>
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            {phones.map((p) => (
              <a key={p} href={telLink(p)} className="inline-flex items-center gap-1 hover:text-paper">
                <Phone className="size-3.5" />
                {p}
              </a>
            ))}
            <a href={YOUTUBE_CHANNEL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1">
              <Youtube className="size-3.5" /> YouTube
            </a>
            <a href={FACEBOOK_PAGE} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1">
              <Facebook className="size-3.5" /> Facebook
            </a>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <Link to="/" className="flex items-center gap-3">
            <span className="grid size-11 shrink-0 place-items-center overflow-hidden rounded-lg bg-navy font-display text-sm font-semibold text-paper">
              SIS
            </span>
            <span className="leading-tight">
              <span className="block font-display text-lg font-semibold text-navy">{settings.school_name}</span>
              <span className="block text-xs text-muted">
                {settings.gujarati_name} · {settings.campus_name}
              </span>
            </span>
          </Link>
          <nav className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium",
                  pathname === item.to ? "bg-navy text-paper" : "text-ink hover:bg-bg",
                )}
              >
                {item.label}
              </Link>
            ))}
            <Button asChild size="sm">
              <Link to="/admissions">Apply</Link>
            </Button>
          </nav>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-md border border-line lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
        {open ? (
          <nav className="border-t border-line px-4 py-3 lg:hidden">
            <div className="flex flex-col gap-1">
              {NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-md px-3 py-3 text-sm font-medium",
                    pathname === item.to ? "bg-navy text-paper" : "hover:bg-bg",
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        ) : null}
      </header>

      <main>{children}</main>

      <footer className="mt-16 border-t border-line bg-navy text-paper">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-3">
          <div>
            <p className="font-display text-2xl">{settings.school_name}</p>
            <p className="mt-1 text-sm text-paper/70">{settings.gujarati_name}</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-paper/75">{settings.about}</p>
          </div>
          <div>
            <p className="text-sm font-semibold tracking-wide text-paper/60 uppercase">Visit</p>
            <p className="mt-3 text-sm leading-relaxed text-paper/85">{settings.address}</p>
            <p className="mt-2 text-sm text-paper/75">{settings.hours}</p>
            <p className="mt-2 text-xs text-paper/55">UDISE {UDISE} · Est. {settings.founded} · GSEB</p>
          </div>
          <div>
            <p className="text-sm font-semibold tracking-wide text-paper/60 uppercase">Connect</p>
            <div className="mt-3 flex flex-col gap-2 text-sm">
              {phones.map((p) => (
                <a key={p} href={telLink(p)} className="hover:underline">
                  {p}
                </a>
              ))}
              <a href={`mailto:${settings.email}`} className="hover:underline">
                {settings.email}
              </a>
              <Link to="/login" className="mt-2 text-paper/55 hover:text-paper">
                Staff login
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t border-paper/10 py-4 text-center text-xs text-paper/50">
          © {new Date().getFullYear()} {settings.school_name}, {settings.campus_name}, Ranip.
        </div>
      </footer>

      <a
        href={waLink(settings.whatsapp)}
        target="_blank"
        rel="noreferrer"
        className="fixed right-4 bottom-4 z-40 inline-flex h-12 items-center gap-2 rounded-full bg-navy px-4 text-sm font-medium text-paper shadow-lg"
      >
        Message us
      </a>
    </div>
  );
}
