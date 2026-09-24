import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteShell } from "@/components/site-shell";
import { getPublicSite } from "@/lib/cms";

export const Route = createFileRoute("/gallery")({
  loader: () => getPublicSite(),
  component: Gallery,
});

function Gallery() {
  const { settings, gallery } = Route.useLoaderData();
  const [filter, setFilter] = useState<string>("All");

  // One photo per image path (guards against any leftover duplicates)
  const unique = useMemo(() => {
    const seen = new Set<string>();
    return gallery.filter((g) => {
      if (seen.has(g.image_url)) return false;
      seen.add(g.image_url);
      return true;
    });
  }, [gallery]);

  const categories = useMemo(() => {
    const set = new Set(unique.map((g) => g.category));
    return ["All", ...Array.from(set)];
  }, [unique]);

  const items = filter === "All" ? unique : unique.filter((g) => g.category === filter);

  return (
    <SiteShell settings={settings}>
      <div className="border-b border-line bg-cream">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
          <p className="text-xs font-semibold tracking-widest text-saffron uppercase sm:text-sm">
            Campus
          </p>
          <h1 className="mt-1 text-2xl font-bold text-primary-dark sm:text-3xl md:text-4xl">
            View campus
          </h1>
          <p className="mt-2 max-w-xl text-sm text-muted sm:text-base">
            A look at Mangaldeep Vidyalay — gate, building, assembly, classrooms and school life in Ranip.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
        {/* Category chips */}
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setFilter(c)}
              className={
                filter === c
                  ? "rounded-full bg-primary px-3.5 py-1.5 text-xs font-semibold text-white sm:text-sm"
                  : "rounded-full border border-line bg-paper px-3.5 py-1.5 text-xs font-medium text-muted hover:border-primary/40 hover:text-primary sm:text-sm"
              }
            >
              {c}
            </button>
          ))}
        </div>

        {/* Masonry-style grid */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((g, i) => (
            <figure
              key={`${g.image_url}-${g.id}`}
              className={`group relative overflow-hidden rounded-2xl border border-line bg-paper shadow-sm transition hover:shadow-md ${
                i === 0 ? "sm:col-span-2 sm:row-span-1" : ""
              }`}
            >
              <img
                src={g.image_url}
                alt={g.title}
                className={`w-full object-cover transition duration-500 group-hover:scale-[1.03] ${
                  i === 0 ? "h-56 sm:h-72" : "h-48 sm:h-56"
                }`}
                loading="lazy"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary-dark/90 via-primary-dark/50 to-transparent px-4 pb-3 pt-10">
                <p className="text-sm font-semibold text-white">{g.title}</p>
                <p className="text-xs text-white/75">{g.category}</p>
              </figcaption>
            </figure>
          ))}
        </div>

        {items.length === 0 ? (
          <p className="mt-10 text-center text-sm text-muted">No photos in this category yet.</p>
        ) : null}

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            to="/admissions"
            className="rounded-full bg-saffron px-5 py-2.5 text-sm font-semibold text-white hover:bg-saffron/90"
          >
            Apply Now
          </Link>
          <Link
            to="/"
            className="rounded-full border border-line bg-paper px-5 py-2.5 text-sm font-medium text-ink hover:bg-cream"
          >
            Back to home
          </Link>
        </div>
      </div>
    </SiteShell>
  );
}
