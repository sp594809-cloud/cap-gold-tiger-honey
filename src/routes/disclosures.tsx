import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { getPublicSite } from "@/lib/cms.server";
import { UDISE } from "@/lib/site";

export const Route = createFileRoute("/disclosures")({
  loader: () => getPublicSite(),
  component: Disclosures,
});

function Disclosures() {
  const { settings } = Route.useLoaderData();
  return (
    <SiteShell settings={settings}>
      <div className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="font-display text-4xl text-navy">School facts</h1>
        <dl className="mt-8 divide-y divide-line rounded-2xl border border-line bg-surface">
          {[
            ["Legal name", "Mangaldeep Vidhyalaya"],
            ["Campus brand", settings.school_name],
            ["UDISE", UDISE],
            ["Year of establishment", settings.founded],
            ["Board", "Gujarat Secondary & Higher Secondary Education Board (GSEB)"],
            ["Type", "Co-educational · Government aided (9–12) / recognised"],
            ["Medium", "Gujarati (state listing) · English medium campus classes"],
            ["Cluster / block", "Nirnaynagar · Ranip-1 · Ahmedabad City"],
            ["PIN", "382480"],
            ["Address", settings.address],
          ].map(([k, v]) => (
            <div key={k} className="grid gap-1 px-5 py-4 sm:grid-cols-3">
              <dt className="text-sm text-muted">{k}</dt>
              <dd className="sm:col-span-2 text-sm text-ink">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </SiteShell>
  );
}
