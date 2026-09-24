import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight, BookOpen, CheckCircle2, Users, FlaskConical, Award,
  ClipboardList, Image, Phone, Newspaper, Star, Shield, Laptop, Library,
} from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { getPublicSite } from "@/lib/cms";
import { CLASS_BANDS, FACILITIES, UDISE, YOUTUBE_CHANNEL } from "@/lib/site";

export const Route = createFileRoute("/")({
  loader: () => getPublicSite(),
  component: Home,
});

const QUICK = [
  { to: "/admissions", label: "Admissions", icon: ClipboardList, tone: "bg-saffron text-white" },
  { to: "/academics", label: "Academics", icon: BookOpen, tone: "bg-primary text-white" },
  { to: "/results", label: "Results", icon: Award, tone: "bg-gold text-white" },
  { to: "/news", label: "Notices", icon: Newspaper, tone: "bg-primary-dark text-white" },
  { to: "/gallery", label: "Gallery", icon: Image, tone: "bg-primary text-white" },
  { to: "/contact", label: "Contact", icon: Phone, tone: "bg-green text-white" },
] as const;

const LIFE = [
  { title: "Morning assembly", text: "Prayer, news and discipline in the open courtyard.", src: "/campus/assembly-2.jpg" },
  { title: "Classroom care", text: "Recognition, guidance and board-focused teaching.", src: "/campus/classroom-award.jpg" },
  { title: "Campus gate", text: "A welcoming entrance for students and parents.", src: "/campus/gate-2.jpg" },
  { title: "School building", text: "Classrooms, labs and open spaces together.", src: "/campus/building-2.jpg" },
  { title: "Student life", text: "Friends, focus and a safe neighbourhood campus.", src: "/campus/entrance-2.jpg" },
  { title: "Values & culture", text: "Learning with respect, tradition and confidence.", src: "/campus/saraswati.jpg" },
];

const TESTIMONIALS = [
  {
    quote: "Weekly tests and personal attention helped my child in Class 11 Science. Teachers know every student.",
    name: "Parent of Class 12 Science student",
  },
  {
    quote: "Affordable fees with serious board preparation. Commerce batch results speak for themselves.",
    name: "Parent of Commerce topper",
  },
  {
    quote: "Safe campus, CCTV, and a school that feels like family in Ranip. That matters more than fancy ads.",
    name: "Parent, Ranip",
  },
];

function Home() {
  const { settings, news, gallery, toppers } = Route.useLoaderData();

  return (
    <SiteShell settings={settings}>
      {/* HERO — Adani full-bleed style */}
      <section className="relative min-h-[70vh] overflow-hidden md:min-h-[78vh]">
        <img
          src="/campus/assembly-2.jpg"
          alt="Morning assembly at Mangaldeep Vidyalay"
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/95 via-primary-dark/80 to-primary-dark/40" />
        <div className="relative mx-auto flex min-h-[70vh] max-w-6xl flex-col justify-center px-4 py-16 md:min-h-[78vh] md:py-24">
          <p className="inline-flex w-fit items-center rounded-full bg-saffron px-4 py-1.5 text-sm font-bold text-white shadow-md">
            Admissions Open 2026–27
          </p>
          <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl">
            {settings.gujarati_name}
          </h1>
          <p className="mt-3 text-xl font-semibold text-white/95 sm:text-2xl">
            Shyam International School
            <span className="font-medium text-white/75"> · Mangaldeep Campus</span>
          </p>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">
            A trusted Ranip school since <strong className="text-saffron-soft">1987</strong>. GSEB · Pre-Primary to Class 12
            · Science &amp; Commerce. {settings.tagline}.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-full bg-saffron px-8 text-base font-bold text-white shadow-lg hover:bg-saffron/90">
              <Link to="/admissions">Start Your Journey</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full border-2 border-white/60 bg-white/10 text-base font-semibold text-white hover:bg-white/20">
              <Link to="/gallery">View Campus</Link>
            </Button>
          </div>
          <p className="mt-6 text-sm text-white/55">UDISE {UDISE} · Opp. Swaminarayan Park, Ranip</p>
        </div>
      </section>

      {/* Quick links — GIIS/Podar parent tasks */}
      <section className="relative z-10 -mt-8 px-4">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {QUICK.map((q) => (
            <Link
              key={q.to}
              to={q.to}
              className={`flex flex-col items-center gap-2 rounded-2xl px-3 py-5 text-center shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl ${q.tone}`}
            >
              <q.icon className="size-7" />
              <span className="text-sm font-bold">{q.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Big stats — Adani / GIIS numbers band */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { value: "1987", label: "Year established", icon: Award },
            { value: "Pre–12", label: "All class levels", icon: Users },
            { value: "~400", label: "Science students / year", icon: FlaskConical },
            { value: "99.27", label: "Top Commerce PR", icon: Star },
          ].map((s) => (
            <div key={s.label} className="rounded-3xl border border-line bg-paper p-6 text-center shadow-sm">
              <s.icon className="mx-auto size-8 text-primary" />
              <p className="mt-3 text-3xl font-extrabold text-primary-dark md:text-4xl">{s.value}</p>
              <p className="mt-1 text-sm font-medium text-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why us — Adani “Who We Are” */}
      <section className="bg-cream py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <p className="text-sm font-bold tracking-widest text-saffron uppercase">Who we are</p>
              <h2 className="mt-2 text-3xl font-extrabold text-primary-dark md:text-4xl">
                Why families choose Mangaldeep
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted">
                {settings.about}
              </p>
              <div className="mt-5 rounded-2xl border border-primary/15 bg-paper p-5 text-sm leading-relaxed text-ink shadow-sm">
                <strong className="text-primary-dark">One campus, two names.</strong> Official records list{" "}
                <em>Mangaldeep Vidhyalaya</em> (UDISE {UDISE}). Day-to-day branding for Pre-Primary to 12 also uses{" "}
                <em>Shyam International School (Mangaldeep Campus)</em> — same teachers, same address in Ranip.
              </div>
              <ul className="mt-6 space-y-3">
                {[
                  "Weekly tests & board-style papers",
                  "CCTV-covered safe campus",
                  "Library, computer lab & science coaching",
                  "Best education in least fees",
                ].map((t) => (
                  <li key={t} className="flex items-center gap-3 text-base font-medium text-ink">
                    <CheckCircle2 className="size-5 shrink-0 text-green" />
                    {t}
                  </li>
                ))}
              </ul>
              <Button asChild className="mt-6 rounded-full" size="lg">
                <Link to="/about">
                  Learn more about us <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <img src="/campus/building.jpg" alt="Building" className="h-48 w-full rounded-3xl object-cover shadow-md md:h-56" />
              <img src="/campus/assembly.jpg" alt="Assembly" className="mt-8 h-48 w-full rounded-3xl object-cover shadow-md md:h-56" />
              <img src="/campus/classroom.jpg" alt="Classroom" className="h-48 w-full rounded-3xl object-cover shadow-md md:h-56" />
              <img src="/campus/entrance.jpg" alt="Entrance" className="mt-8 h-48 w-full rounded-3xl object-cover shadow-md md:h-56" />
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum bands — Adani grade cards */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <p className="text-sm font-bold tracking-widest text-saffron uppercase">Learning</p>
        <h2 className="mt-2 text-3xl font-extrabold text-primary-dark md:text-4xl">Curriculum pathway</h2>
        <p className="mt-2 max-w-2xl text-muted">From first steps to board exams — clear stages on one campus.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CLASS_BANDS.map((c) => (
            <div
              key={c.name}
              className="group rounded-3xl border border-line bg-paper p-6 shadow-sm transition hover:border-primary/30 hover:shadow-md"
            >
              <div className="mb-3 grid size-12 place-items-center rounded-2xl bg-primary-light text-primary">
                <BookOpen className="size-6" />
              </div>
              <h3 className="text-lg font-bold text-primary-dark">{c.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{c.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Facilities highlights — Podar key highlights */}
      <section className="bg-primary-dark py-16 text-white">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-sm font-bold tracking-widest text-saffron-soft uppercase">Campus</p>
          <h2 className="mt-2 text-3xl font-extrabold md:text-4xl">Key highlights</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Library, title: "Library & book bank", text: "Thousands of titles for board and competitive study." },
              { icon: Laptop, title: "Computer & ICT lab", text: "Desktops, internet and digital class support." },
              { icon: FlaskConical, title: "Science coaching", text: "~400 students prepare science each year." },
              { icon: Award, title: "Commerce excellence", text: "Recent toppers with PR 99.27 in Class 12." },
              { icon: Shield, title: "Safe campus", text: "CCTV, compound wall, medical check-ups." },
              { icon: Users, title: "Courtyard assembly", text: "Daily prayer and announcements together." },
            ].map((f) => (
              <div key={f.title} className="rounded-3xl bg-white/10 p-6 backdrop-blur-sm">
                <f.icon className="size-8 text-saffron-soft" />
                <h3 className="mt-4 text-lg font-bold">{f.title}</h3>
                <p className="mt-2 text-sm text-white/80">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Toppers — SSIS brightening stars */}
      <section className="bg-saffron-soft py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-bold tracking-widest text-saffron uppercase">Results</p>
              <h2 className="mt-2 text-3xl font-extrabold text-primary-dark md:text-4xl">Our shining stars</h2>
            </div>
            <Link to="/results" className="font-bold text-primary hover:underline">
              All results →
            </Link>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {toppers.map((t, i) => (
              <article key={t.id} className="overflow-hidden rounded-3xl bg-paper shadow-lg">
                <div className="bg-gradient-to-r from-primary to-primary-dark px-5 py-3 text-center text-sm font-bold text-white">
                  {t.position} · {t.year}
                </div>
                <div className="p-8 text-center">
                  <div className="mx-auto mb-4 grid size-16 place-items-center rounded-full bg-saffron text-2xl font-extrabold text-white shadow-md">
                    {i + 1}
                  </div>
                  <h3 className="text-xl font-extrabold text-primary-dark">{t.name}</h3>
                  <p className="mt-3 text-4xl font-extrabold text-saffron">{t.score}</p>
                  <p className="mt-2 text-sm font-medium text-muted">{t.class_name}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-8 overflow-hidden rounded-3xl border border-line shadow-md">
            <img src="/campus/toppers-poster.jpg" alt="Toppers poster" className="w-full object-cover" />
          </div>
        </div>
      </section>

      {/* Life at school — Adani photo cards */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <p className="text-sm font-bold tracking-widest text-saffron uppercase">School life</p>
        <h2 className="mt-2 text-3xl font-extrabold text-primary-dark md:text-4xl">A place to grow</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {LIFE.map((card) => (
            <article key={card.title} className="group overflow-hidden rounded-3xl border border-line bg-paper shadow-sm transition hover:shadow-lg">
              <div className="overflow-hidden">
                <img
                  src={card.src}
                  alt={card.title}
                  className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-primary-dark">{card.title}</h3>
                <p className="mt-2 text-sm text-muted">{card.text}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button asChild variant="outline" size="lg" className="rounded-full border-primary text-primary">
            <Link to="/gallery">View all photos</Link>
          </Button>
        </div>
      </section>

      {/* Testimonials — GIIS parents */}
      <section className="bg-cream py-16">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-sm font-bold tracking-widest text-saffron uppercase">Parents</p>
          <h2 className="mt-2 text-3xl font-extrabold text-primary-dark md:text-4xl">What families say</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <blockquote key={t.name} className="rounded-3xl bg-paper p-6 shadow-md">
                <div className="mb-3 flex gap-1 text-gold">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <Star key={n} className="size-4 fill-gold" />
                  ))}
                </div>
                <p className="text-base leading-relaxed text-ink">&ldquo;{t.quote}&rdquo;</p>
                <footer className="mt-4 text-sm font-bold text-muted">— {t.name}</footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* News — Adani stories */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold tracking-widest text-saffron uppercase">Stories</p>
            <h2 className="mt-2 text-3xl font-extrabold text-primary-dark md:text-4xl">Events &amp; notices</h2>
          </div>
          <Link to="/news" className="font-bold text-primary hover:underline">
            View all →
          </Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {news.slice(0, 3).map((n) => (
            <Link
              key={n.id}
              to="/news/$slug"
              params={{ slug: n.slug }}
              className="group overflow-hidden rounded-3xl border border-line bg-paper shadow-sm transition hover:shadow-lg"
            >
              {n.image_url ? (
                <img src={n.image_url} alt="" className="h-48 w-full object-cover transition duration-500 group-hover:scale-105" />
              ) : null}
              <div className="p-5">
                <h3 className="text-lg font-bold text-primary-dark group-hover:text-primary">{n.title}</h3>
                <p className="mt-2 line-clamp-3 text-sm text-muted">{n.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Video lower — Adani style */}
      <section className="bg-primary-dark py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 md:grid-cols-2">
          <div className="overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
            <iframe
              title="Campus film"
              src={settings.video_url}
              className="aspect-video w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="text-white">
            <p className="text-sm font-bold tracking-widest text-saffron-soft uppercase">Campus film</p>
            <h2 className="mt-2 text-3xl font-extrabold md:text-4xl">See life at Mangaldeep</h2>
            <p className="mt-4 text-base text-white/80">
              Assemblies, classrooms and daily moments from our YouTube channel — the real feel of Ranip’s long-running science campus.
            </p>
            <Button asChild size="lg" className="mt-6 rounded-full bg-saffron font-bold text-white hover:bg-saffron/90">
              <a href={YOUTUBE_CHANNEL} target="_blank" rel="noreferrer">
                Open YouTube
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Enrol CTA — Adani Enrol Now */}
      <section className="bg-saffron py-16">
        <div className="mx-auto max-w-3xl px-4 text-center text-white">
          <h2 className="text-3xl font-extrabold md:text-4xl">Enrol now for 2026–27</h2>
          <p className="mx-auto mt-4 max-w-lg text-base text-white/90">
            Pre-Primary, Classes 1–10, Class 11 Science &amp; Commerce. Fill the inquiry form or WhatsApp the office today.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="rounded-full bg-white px-8 font-bold text-saffron hover:bg-cream">
              <Link to="/admissions">Apply Now</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full border-2 border-white font-semibold text-white hover:bg-white/15">
              <Link to="/contact">Ask us</Link>
            </Button>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
