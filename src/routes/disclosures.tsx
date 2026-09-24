import { createFileRoute } from "@tanstack/react-router";
import { FileText, Shield, Building2, Calendar, Users, Heart } from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { getPublicSite } from "@/lib/cms";
import { UDISE } from "@/lib/site";

export const Route = createFileRoute("/disclosures")({
  loader: () => getPublicSite(),
  component: Disclosures,
});

const FACTS = [
  ["Legal name", "Mangaldeep Vidhyalaya"],
  ["Campus brand", "Shyam International School (Mangaldeep Campus)"],
  ["UDISE code", UDISE],
  ["Year of establishment", "1987"],
  ["Board", "Gujarat Secondary & Higher Secondary Education Board (GSEB)"],
  ["Type", "Co-educational · Private aided (higher secondary)"],
  ["Medium", "Gujarati (state listing) · English-medium campus classes"],
  ["Classes offered", "Pre-Primary to Class 12 (Science & Commerce)"],
  ["Cluster / block", "Nirnaynagar · Ranip-1 · Ahmedabad City"],
  ["PIN", "382480"],
];

const DOC_CARDS = [
  {
    icon: Shield,
    title: "Affiliation & recognition",
    text: "GSEB-recognised secondary and higher secondary wing. UDISE 24070501061 lists the school as operational and co-educational.",
  },
  {
    icon: Building2,
    title: "Campus & safety",
    text: "Private building with pucca compound wall, CCTV, tap water, ramps, generator and digital boards. Regular medical check-ups for students.",
  },
  {
    icon: Users,
    title: "Parent–Teacher contact",
    text: "Open communication with parents. Inquiry form and WhatsApp channel are available for admission and day-to-day updates.",
  },
  {
    icon: Calendar,
    title: "Academic calendar",
    text: "Weekly tests in core subjects, unit tests, pre-boards and board-pattern practice from January for Classes 9–12.",
  },
  {
    icon: Heart,
    title: "Health & sanitation",
    text: "Separate boys’ and girls’ toilets, drinking water, hand-wash facilities and periodic health check correspondence with parents.",
  },
  {
    icon: FileText,
    title: "Public information",
    text: "This page summarises school facts for parents and visitors. For certified copies of documents, contact the school office.",
  },
];

function Disclosures() {
  const { settings } = Route.useLoaderData();
  return (
    <SiteShell settings={settings}>
      <div className="mx-auto max-w-6xl px-4 py-12">
        <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">Transparency</p>
        <h1 className="mt-2 font-display text-4xl text-primary-dark md:text-5xl">School facts & disclosures</h1>
        <p className="mt-4 max-w-2xl text-muted leading-relaxed">
          Clear information for parents — accurate dates, no broken links, no duplicate menus. Everything below matches
          the official UDISE record and the campus as it operates today.
        </p>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {DOC_CARDS.map((d) => (
            <article key={d.title} className="rounded-2xl border border-line bg-surface p-6 shadow-sm">
              <d.icon className="size-6 text-primary" aria-hidden />
              <h2 className="mt-4 font-display text-xl text-primary-dark">{d.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{d.text}</p>
            </article>
          ))}
        </div>

        <h2 className="mt-16 font-display text-2xl text-primary-dark">Key particulars</h2>
        <dl className="mt-6 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface">
          {FACTS.map(([k, v]) => (
            <div key={k} className="grid gap-1 px-5 py-4 sm:grid-cols-3">
              <dt className="text-sm text-muted">{k}</dt>
              <dd className="text-sm text-ink sm:col-span-2">{v}</dd>
            </div>
          ))}
          <div className="grid gap-1 px-5 py-4 sm:grid-cols-3">
            <dt className="text-sm text-muted">Address</dt>
            <dd className="text-sm text-ink sm:col-span-2">{settings.address}</dd>
          </div>
          <div className="grid gap-1 px-5 py-4 sm:grid-cols-3">
            <dt className="text-sm text-muted">Contact</dt>
            <dd className="text-sm text-ink sm:col-span-2">
              {settings.phone1} · {settings.phone2} · {settings.phone3}
              <br />
              {settings.email}
            </dd>
          </div>
        </dl>

        <p className="mt-8 text-sm text-muted">
          Official directory:{" "}
          <a
            className="text-primary underline"
            href={`https://schools.org.in/ahmedabad/${UDISE}/mangaldeep-vidhyalaya.html`}
            target="_blank"
            rel="noreferrer"
          >
            schools.org.in — Mangaldeep Vidhyalaya
          </a>
        </p>
      </div>
    </SiteShell>
  );
}
