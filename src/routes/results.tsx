import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { getPublicSite } from "@/lib/cms.server";

export const Route = createFileRoute("/results")({
  loader: () => getPublicSite(),
  component: Results,
});

function Results() {
  const { settings, toppers } = Route.useLoaderData();
  return (
    <SiteShell settings={settings}>
      <div className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="font-display text-4xl text-navy">Shining stars</h1>
        <p className="mt-2 max-w-2xl text-muted">
          Class 12 Commerce — dedication, resilience and progress at Shyam International School, Mangaldeep Campus.
        </p>
        <img src="/campus/toppers.jpg" alt="Commerce toppers poster" className="mt-8 max-w-xl rounded-2xl border border-line" />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {toppers.map((t) => (
            <article key={t.id} className="rounded-xl border border-line bg-surface p-6">
              <p className="text-xs tracking-wide text-muted uppercase">
                {t.position} · {t.stream} · {t.year}
              </p>
              <h2 className="mt-2 font-display text-2xl text-navy">{t.name}</h2>
              <p className="mt-1 text-xl font-semibold tabular-nums text-teal">{t.score}</p>
              <p className="mt-2 text-sm text-muted">{t.class_name}</p>
            </article>
          ))}
        </div>
      </div>
    </SiteShell>
  );
}
