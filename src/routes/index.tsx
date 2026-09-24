import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { getPublicSite } from "@/lib/cms.server";
import { CLASS_BANDS, FACILITIES, YOUTUBE_CHANNEL } from "@/lib/site";

export const Route = createFileRoute("/")({
  loader: () => getPublicSite(),
  component: Home,
});

function Home() {
  const { settings, news, gallery, toppers } = Route.useLoaderData();
  const slides = gallery.slice(0, 4);

  return (
    <SiteShell settings={settings}>
      <section className="relative min-h-[70vh] overflow-hidden bg-navy">
        <img
          src="/campus/assembly.jpg"
          alt="Mangaldeep Vidyalay assembly"
          className="absolute inset-0 size-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy/70 to-navy/30" />
        <div className="relative mx-auto flex min-h-[70vh] max-w-6xl flex-col justify-end px-4 py-16">
          <p className="text-sm tracking-[0.2em] text-paper/70 uppercase">Since {settings.founded} · Ranip, Ahmedabad</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl leading-tight font-semibold text-paper md:text-6xl">
            {settings.gujarati_name}
          </h1>
          <p className="mt-2 font-display text-2xl text-paper/90 md:text-3xl">{settings.school_name}</p>
          <p className="mt-4 max-w-xl text-base text-paper/80">{settings.tagline}. GSEB Science & Commerce. Pre-Primary to Class 12.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/admissions">Admission inquiry</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-paper/30 bg-paper/10 text-paper hover:bg-paper/20">
              <a href={YOUTUBE_CHANNEL} target="_blank" rel="noreferrer">
                Watch campus film
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2">
        <div>
          <p className="text-xs font-semibold tracking-[0.18em] text-teal uppercase">About campus</p>
          <h2 className="mt-2 font-display text-3xl text-navy">A neighbourhood school with board-level science.</h2>
          <p className="mt-4 text-muted leading-relaxed">{settings.about}</p>
          <Button asChild variant="link" className="mt-4 px-0">
            <Link to="/about">
              Our story <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2">
          {FACILITIES.map((f) => (
            <li key={f.title} className="rounded-xl border border-line bg-surface p-5">
              <p className="font-medium text-navy">{f.title}</p>
              <p className="mt-1 text-sm text-muted">{f.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-navy py-16 text-paper">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 md:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border border-paper/10 bg-navy-deep">
            <iframe
              title="School activities"
              src={settings.video_url}
              className="aspect-video w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-paper/55 uppercase">Campus film</p>
            <h2 className="mt-2 font-display text-3xl">School activities at Mangaldeep Vidyalay</h2>
            <p className="mt-4 text-paper/75 leading-relaxed">
              Watch the official campus film from our YouTube channel — assemblies, classrooms and the daily life of Ranip’s long-running science school.
            </p>
            <Button asChild className="mt-6 bg-paper text-navy hover:bg-bg">
              <a href={YOUTUBE_CHANNEL} target="_blank" rel="noreferrer">
                Open YouTube channel
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-teal uppercase">Shining stars</p>
            <h2 className="mt-2 font-display text-3xl text-navy">Class 12 Commerce toppers</h2>
          </div>
          <Link to="/results" className="text-sm font-medium text-teal hover:underline">
            All results
          </Link>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {toppers.map((t) => (
            <article key={t.id} className="rounded-xl border border-line bg-surface p-6">
              <p className="text-xs tracking-wide text-muted uppercase">{t.position} · {t.year}</p>
              <h3 className="mt-2 font-display text-2xl text-navy">{t.name}</h3>
              <p className="mt-1 text-lg font-semibold tabular-nums text-teal">{t.score}</p>
              <p className="mt-2 text-sm text-muted">{t.class_name}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-8">
        <h2 className="font-display text-3xl text-navy">What we teach</h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CLASS_BANDS.map((c) => (
            <div key={c.name} className="rounded-xl border border-line bg-paper p-5">
              <p className="font-medium text-navy">{c.name}</p>
              <p className="mt-1 text-sm text-muted">{c.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-3xl text-navy">News</h2>
          <Link to="/news" className="text-sm font-medium text-teal hover:underline">
            All news
          </Link>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {news.slice(0, 3).map((n) => (
            <Link key={n.id} to="/news/$slug" params={{ slug: n.slug }} className="overflow-hidden rounded-xl border border-line bg-surface">
              {n.image_url ? (
                <img src={n.image_url} alt="" className="h-40 w-full object-cover" />
              ) : null}
              <div className="p-5">
                <h3 className="font-display text-xl text-navy">{n.title}</h3>
                <p className="mt-2 line-clamp-3 text-sm text-muted">{n.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-3xl text-navy">Gallery</h2>
          <Link to="/gallery" className="text-sm font-medium text-teal hover:underline">
            Open gallery
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          {slides.map((g) => (
            <img key={g.id} src={g.image_url} alt={g.title} className="h-36 w-full rounded-lg object-cover md:h-44" />
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
