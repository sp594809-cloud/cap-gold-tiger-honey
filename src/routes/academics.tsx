import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { getPublicSite } from "@/lib/cms";
import { CLASS_BANDS, FACILITIES } from "@/lib/site";

export const Route = createFileRoute("/academics")({
  loader: () => getPublicSite(),
  component: Academics,
});

function Academics() {
  const { settings } = Route.useLoaderData();
  return (
    <SiteShell settings={settings}>
      <div className="mx-auto max-w-6xl px-4 py-12">
        <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">Academics</p>
        <h1 className="mt-2 font-display text-4xl text-primary-dark">GSEB classroom, science-first coaching</h1>
        <p className="mt-4 max-w-2xl text-muted">
          Weekly tests in core subjects, unit tests every two months, semester exams, and board-atmosphere
          pre-boards from January. Teachers stay after class until the doubt is gone.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {CLASS_BANDS.map((c) => (
            <article key={c.name} className="rounded-xl border border-line bg-surface p-6">
              <h2 className="font-display text-2xl text-primary-dark">{c.name}</h2>
              <p className="mt-2 text-sm text-muted">{c.detail}</p>
            </article>
          ))}
        </div>
        <h2 className="mt-14 font-display text-3xl text-primary-dark">Campus facilities</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {FACILITIES.map((f) => (
            <li key={f.title} className="rounded-xl border border-line bg-paper p-5">
              <p className="font-medium text-primary-dark">{f.title}</p>
              <p className="mt-1 text-sm text-muted">{f.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </SiteShell>
  );
}
