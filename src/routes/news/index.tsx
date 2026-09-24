import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { getPublicSite } from "@/lib/cms.server";

export const Route = createFileRoute("/news/")({
  loader: () => getPublicSite(),
  component: NewsIndex,
});

function NewsIndex() {
  const { settings, news } = Route.useLoaderData();
  return (
    <SiteShell settings={settings}>
      <div className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="font-display text-4xl text-navy">News & notices</h1>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {news.map((n) => (
            <Link key={n.id} to="/news/$slug" params={{ slug: n.slug }} className="overflow-hidden rounded-xl border border-line bg-surface">
              {n.image_url ? <img src={n.image_url} alt="" className="h-48 w-full object-cover" /> : null}
              <div className="p-5">
                <h2 className="font-display text-2xl text-navy">{n.title}</h2>
                <p className="mt-2 text-sm text-muted">{n.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </SiteShell>
  );
}
