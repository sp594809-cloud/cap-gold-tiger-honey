import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { getNewsBySlug, getPublicSite } from "@/lib/cms";

export const Route = createFileRoute("/news/$slug")({
  loader: async ({ params }) => {
    const [post, site] = await Promise.all([getNewsBySlug({ data: params.slug }), getPublicSite()]);
    if (!post) throw notFound();
    return { post, settings: site.settings };
  },
  component: NewsPost,
});

function NewsPost() {
  const { post, settings } = Route.useLoaderData();
  return (
    <SiteShell settings={settings}>
      <article className="mx-auto max-w-3xl px-4 py-12">
        <Link to="/news" className="text-sm text-teal hover:underline">
          All news
        </Link>
        <h1 className="mt-4 font-display text-4xl text-navy">{post.title}</h1>
        {post.image_url ? (
          <img src={post.image_url} alt="" className="mt-6 w-full rounded-2xl object-cover" />
        ) : null}
        <p className="mt-8 whitespace-pre-wrap leading-relaxed text-muted">{post.body}</p>
      </article>
    </SiteShell>
  );
}
