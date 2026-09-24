import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight, BookOpen, CheckCircle2, Users, FlaskConical, Award,
  ClipboardList, Image, Phone, Newspaper, GraduationCap, Star,
} from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { getPublicSite } from "@/lib/cms.server";
import { CLASS_BANDS, FACILITIES, UDISE, YOUTUBE_CHANNEL } from "@/lib/site";

export const Route = createFileRoute("/")({
  loader: () => getPublicSite(),
  component: Home,
});

const QUICK = [
  { to: "/admissions", label: "Admissions", icon: ClipboardList, color: "bg-gold text-ink" },
  { to: "/academics", label: "Academics", icon: BookOpen, color: "bg-primary text-white" },
  { to: "/results", label: "Results", icon: Award, color: "bg-green text-white" },
  { to: "/news", label: "Notices", icon: Newspaper, color: "bg-primary-dark text-white" },
  { to: "/gallery", label: "Gallery", icon: Image, color: "bg-primary text-white" },
  { to: "/contact", label: "Contact", icon: Phone, color: "bg-green text-white" },
] as const;

const TESTIMONIALS = [
  {
    quote: "My child improved a lot in Class 11 Science. Weekly tests and personal attention made the difference.",
    name: "Parent of Class 12 Science student",
  },
  {
    quote: "Affordable fees and serious board preparation. We chose Mangaldeep for Commerce and got PR 99+ results in the batch.",
    name: "Parent of Commerce topper",
  },
  {
    quote: "Safe campus, CCTV, and teachers who know every student. That matters more than fancy buildings.",
    name: "Parent, Ranip",
  },
];

function Home() {
  const { settings, news, gallery, toppers } = Route.useLoaderData();

  return (
    <SiteShell settings={settings}>
      {/* HERO */}
      <section className="relative overflow-hidden bg-primary-dark">
        <img
          src="/campus/assembly-2.jpg"
          alt="Students at morning assembly"
          className="absolute inset-0 size-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark via-primary-dark/90 to-primary-dark/55" />
        <div className="relative mx-auto max-w-6xl px-4 py-12 md:py-20">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-gold px-3 py-1 text-sm font-bold text-ink">
              Admissions Open 2026–27
            </span>
            <h1 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
              {settings.gujarati_name}
            </h1>
            <p className="mt-2 text-xl font-semibold text-white sm:text-2xl">
              Shyam International School
              <span className="font-normal text-white/80"> · Mangaldeep Campus</span>
            </p>
            <p className="mt-4 text-base leading-relaxed text-white/90 sm:text-lg">
              One campus, two names: <strong className="text-gold">Mangaldeep Vidyalay</strong> (since 1987)
              and <strong className="text-white">Shyam International School</strong>. GSEB · Pre-Primary to Class 12
              Science &amp; Commerce · {settings.tagline}.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-gold text-base font-bold text-ink hover:bg-gold/90">
                <Link to="/admissions">Apply Now</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 border-white/50 bg-white/10 text-base font-semibold text-white hover:bg-white/20">
                <Link to="/gallery">Campus photos</Link>
              </Button>
            </div>
            <p className="mt-4 text-sm text-white/60">UDISE {UDISE} · Ranip, Ahmedabad</p>
          </div>
        </div>
      </section>

      {/* Quick-access tiles */}
      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {QUICK.map((q) => (
              <Link
                key={q.to}
                to={q.to}
                className={`flex flex-col items-center gap-2 rounded-2xl px-3 py-4 text-center shadow-sm transition hover:scale-[1.02] hover:shadow-md ${q.color}`}
              >
                <q.icon className="size-7" />
                <span className="text-sm font-bold">{q.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-beige">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-4 py-8 md:grid-cols-4">
          {[
            { icon: GraduationCap, value: "Since 1987", label: "Years of teaching" },
            { icon: Users, value: "Pre-Pri → 12", label: "All class levels" },
            { icon: FlaskConical, value: "~400", label: "Science students / year" },
            { icon: Award, value: "PR 99.27", label: "Top Commerce 2024–25" },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-3 rounded-2xl bg-paper px-4 py-4 shadow-sm">
              <s.icon className="size-9 shrink-0 text-primary" />
              <div>
                <p className="text-lg font-bold text-primary-dark sm:text-xl">{s.value}</p>
                <p className="text-xs text-muted sm:text-sm">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Identity + about */}
      <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-sm font-bold tracking-wide text-primary uppercase">Who we are</p>
            <h2 className="mt-2 text-2xl font-bold text-primary-dark sm:text-3xl">
              Mangaldeep Vidyalay &amp; Shyam International School
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              {settings.about}
            </p>
            <p className="mt-4 rounded-xl border border-primary/20 bg-primary-light p-4 text-sm leading-relaxed text-ink">
              <strong>Same campus, same team.</strong> Official records list{" "}
              <em>Mangaldeep Vidhyalaya</em> (UDISE {UDISE}). Day-to-day branding for Pre-Primary to 12
              also uses <em>Shyam International School (Mangaldeep Campus)</em> — one school family in Ranip.
            </p>
            <ul className="mt-5 space-y-2">
              {["Weekly tests & board-style papers", "CCTV & safe campus", "Library, computer lab, science coaching", "Best education in least fees"].map(
                (t) => (
                  <li key={t} className="flex items-center gap-2 text-base text-ink">
                    <CheckCircle2 className="size-5 shrink-0 text-green" />
                    {t}
                  </li>
                ),
              )}
            </ul>
            <Button asChild variant="link" className="mt-4 px-0 text-base font-semibold text-primary">
              <Link to="/about">
                Full school story <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <img src="/campus/gate-2.jpg" alt="Main gate" className="h-40 w-full rounded-2xl object-cover shadow-md sm:h-48" />
            <img src="/campus/building-2.jpg" alt="Building" className="mt-6 h-40 w-full rounded-2xl object-cover shadow-md sm:h-48" />
            <img src="/campus/entrance-2.jpg" alt="Entrance" className="h-40 w-full rounded-2xl object-cover shadow-md sm:h-48" />
            <img src="/campus/classroom-award.jpg" alt="Classroom" className="mt-6 h-40 w-full rounded-2xl object-cover shadow-md sm:h-48" />
          </div>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FACILITIES.map((f) => (
            <div key={f.title} className="rounded-2xl border border-line bg-paper p-5 shadow-sm">
              <p className="text-base font-bold text-primary-dark">{f.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Toppers */}
      <section className="bg-gold-soft py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-bold tracking-wide text-gold uppercase">Results</p>
              <h2 className="mt-1 text-2xl font-bold text-primary-dark sm:text-3xl">
                Class 12 Commerce toppers
              </h2>
            </div>
            <Link to="/results" className="text-base font-bold text-primary hover:underline">
              All results →
            </Link>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {toppers.map((t, i) => (
              <article key={t.id} className="overflow-hidden rounded-2xl bg-paper shadow-md">
                <div className="bg-primary px-4 py-2 text-center text-sm font-bold text-white">
                  {t.position} · {t.year}
                </div>
                <div className="p-6 text-center">
                  <div className="mx-auto mb-3 grid size-14 place-items-center rounded-full bg-gold text-xl font-bold text-ink">
                    {i + 1}
                  </div>
                  <h3 className="text-lg font-bold text-primary-dark">{t.name}</h3>
                  <p className="mt-2 text-3xl font-bold text-gold">{t.score}</p>
                  <p className="mt-1 text-sm text-muted">{t.class_name}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-6 overflow-hidden rounded-2xl border border-line shadow-md">
            <img src="/campus/toppers-poster.jpg" alt="Toppers poster" className="w-full object-cover" />
          </div>
        </div>
      </section>

      {/* Classes */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">What we teach</h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CLASS_BANDS.map((c) => (
            <div key={c.name} className="rounded-2xl border border-line bg-paper p-5 shadow-sm">
              <p className="font-bold text-primary">{c.name}</p>
              <p className="mt-1 text-sm text-muted">{c.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Activity photo cards */}
      <section className="border-t border-line bg-paper py-12">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">School life</h2>
            <Link to="/gallery" className="text-base font-bold text-primary hover:underline">
              Gallery →
            </Link>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { src: "/campus/assembly-2.jpg", title: "Morning assembly", text: "Prayer, news and daily discipline in the courtyard." },
              { src: "/campus/classroom-award.jpg", title: "Classroom moments", text: "Recognition and encouragement every day." },
              { src: "/campus/entrance-2.jpg", title: "Campus entrance", text: "A welcoming gate for students and parents." },
              { src: "/campus/building.jpg", title: "School building", text: "Classrooms, labs and open spaces together." },
              { src: "/campus/admission-poster.jpg", title: "Admissions open", text: "Pre-Primary to 12 — Science & Commerce." },
              { src: "/campus/saraswati.jpg", title: "Values & culture", text: "Learning with respect and tradition." },
            ].map((card) => (
              <article key={card.title} className="overflow-hidden rounded-2xl border border-line bg-bg shadow-sm">
                <img src={card.src} alt={card.title} className="h-44 w-full object-cover" loading="lazy" />
                <div className="p-4">
                  <h3 className="font-bold text-primary-dark">{card.title}</h3>
                  <p className="mt-1 text-sm text-muted">{card.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-primary-light py-12">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">What parents say</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <blockquote key={t.name} className="rounded-2xl bg-paper p-5 shadow-sm">
                <div className="mb-2 flex gap-0.5 text-gold">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <Star key={n} className="size-4 fill-gold" />
                  ))}
                </div>
                <p className="text-base leading-relaxed text-ink">&ldquo;{t.quote}&rdquo;</p>
                <footer className="mt-3 text-sm font-semibold text-muted">— {t.name}</footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* News */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">Notices &amp; news</h2>
          <Link to="/news" className="text-base font-bold text-primary hover:underline">
            All news →
          </Link>
        </div>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {news.slice(0, 3).map((n) => (
            <Link
              key={n.id}
              to="/news/$slug"
              params={{ slug: n.slug }}
              className="overflow-hidden rounded-2xl border border-line bg-paper shadow-sm transition hover:shadow-md"
            >
              {n.image_url ? (
                <img src={n.image_url} alt="" className="h-40 w-full object-cover" />
              ) : null}
              <div className="p-4">
                <h3 className="font-bold text-primary-dark">{n.title}</h3>
                <p className="mt-2 line-clamp-3 text-sm text-muted">{n.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Video lower on page */}
      <section className="border-t border-line bg-beige py-12">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 md:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border border-line bg-primary-dark shadow-md">
            <iframe
              title="School activities"
              src={settings.video_url}
              className="aspect-video w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div>
            <p className="text-sm font-bold tracking-wide text-primary uppercase">Campus film</p>
            <h2 className="mt-2 text-2xl font-bold text-primary-dark sm:text-3xl">
              See school life on video
            </h2>
            <p className="mt-3 text-base text-muted">
              Assemblies, classrooms and daily life at Mangaldeep Campus — from our official YouTube channel.
            </p>
            <Button asChild className="mt-6" size="lg">
              <a href={YOUTUBE_CHANNEL} target="_blank" rel="noreferrer">
                Open YouTube channel
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-12">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">Ready to join?</h2>
          <p className="mx-auto mt-3 max-w-lg text-base text-white/90">
            Pre-Primary, Classes 1–10, Class 11 Science &amp; Commerce. Fill the form or WhatsApp us today.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="bg-gold text-base font-bold text-ink hover:bg-gold/90">
              <Link to="/admissions">Apply Now</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-2 border-white text-base font-semibold text-white hover:bg-white/15">
              <Link to="/contact">Contact office</Link>
            </Button>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
