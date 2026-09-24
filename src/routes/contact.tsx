import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { getPublicSite } from "@/lib/cms.server";
import { FACEBOOK_PAGE, YOUTUBE_CHANNEL } from "@/lib/site";
import { telLink } from "@/lib/utils";

export const Route = createFileRoute("/contact")({
  loader: () => getPublicSite(),
  component: Contact,
});

function Contact() {
  const { settings } = Route.useLoaderData();
  const phones = [settings.phone1, settings.phone2, settings.phone3].filter(Boolean);
  return (
    <SiteShell settings={settings}>
      <div className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="font-display text-4xl text-primary-dark">Get in touch</h1>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-line bg-surface p-6">
            <p className="text-sm text-muted">Address</p>
            <p className="mt-2 text-ink">{settings.address}</p>
            <p className="mt-4 text-sm text-muted">Hours</p>
            <p className="mt-1">{settings.hours}</p>
            <p className="mt-4 text-sm text-muted">Phone</p>
            <div className="mt-1 flex flex-col gap-1">
              {phones.map((p) => (
                <a key={p} href={telLink(p)} className="text-primary hover:underline">
                  {p}
                </a>
              ))}
            </div>
            <p className="mt-4 text-sm text-muted">Email</p>
            <a href={`mailto:${settings.email}`} className="text-primary hover:underline">
              {settings.email}
            </a>
            <div className="mt-6 flex gap-4 text-sm">
              <a href={YOUTUBE_CHANNEL} className="text-primary underline" target="_blank" rel="noreferrer">
                YouTube
              </a>
              <a href={FACEBOOK_PAGE} className="text-primary underline" target="_blank" rel="noreferrer">
                Facebook
              </a>
            </div>
          </div>
          <img src="/campus/gate.jpg" alt="School gate" className="h-80 w-full rounded-2xl object-cover" />
        </div>
      </div>
    </SiteShell>
  );
}
