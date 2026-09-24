import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { getPublicSite } from "@/lib/cms.server";

export const Route = createFileRoute("/gallery")({
  loader: () => getPublicSite(),
  component: Gallery,
});

function Gallery() {
  const { settings, gallery } = Route.useLoaderData();
  return (
    <SiteShell settings={settings}>
      <div className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="font-display text-4xl text-navy">Gallery</h1>
        <p className="mt-2 text-muted">Campus, assembly, classrooms and notices from Mangaldeep Vidyalay, Ranip.</p>
        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3">
          {gallery.map((g) => (
            <figure key={g.id} className="overflow-hidden rounded-xl border border-line bg-surface">
              <img src={g.image_url} alt={g.title} className="h-48 w-full object-cover md:h-56" />
              <figcaption className="px-3 py-2 text-sm text-muted">
                {g.title} · {g.category}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </SiteShell>
  );
}
