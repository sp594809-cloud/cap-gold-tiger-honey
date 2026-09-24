import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { getPublicSite } from "@/lib/cms";
import { FACEBOOK_PAGE, UDISE, YOUTUBE_CHANNEL } from "@/lib/site";

export const Route = createFileRoute("/about")({
  loader: () => getPublicSite(),
  component: About,
});

function About() {
  const { settings } = Route.useLoaderData();
  return (
    <SiteShell settings={settings}>
      <div className="mx-auto max-w-6xl px-4 py-12">
        <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">About us</p>
        <h1 className="mt-2 font-display text-4xl text-primary-dark">{settings.gujarati_name}</h1>
        <p className="mt-2 text-lg text-muted">
          {settings.school_name} · {settings.campus_name}
        </p>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <img src="/campus/building.jpg" alt="Campus" className="h-80 w-full rounded-2xl object-cover" />
          <div className="space-y-4 text-muted leading-relaxed">
            <p>{settings.about}</p>
            <p>
              Facebook still carries the founding note: <em>since 1987</em>, and “best science school in all over Ahmedabad”
              — about 400 students study science here every year. An alumnus, Bhavin Champaklal Shah, studied from Std. 1
              (1988) through Std. 12 (2000).
            </p>
            <p>
              Official UDISE code {UDISE} lists the secondary–higher secondary wing as a co-educational, Gujarati-medium,
              GSEB (state board) school in cluster Nirnaynagar / Ranip-1, Ahmedabad City. The campus is a private building
              with library, playground, tap water, internet, generator, digital boards and computers.
            </p>
            <p>
              Today the same campus also runs as <strong className="text-ink">Shyam International School (Mangaldeep Campus)</strong>{" "}
              with Pre-Primary, Classes 1–10, and Class 11 Science & Commerce — “best education in least fees.”
            </p>
          </div>
        </div>
        <dl className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Established", settings.founded],
            ["Board", "GSEB (State Board)"],
            ["UDISE", UDISE],
            ["Medium", "Gujarati & English"],
          ].map(([k, v]) => (
            <div key={k} className="rounded-xl border border-line bg-surface p-5">
              <dt className="text-xs tracking-wide text-muted uppercase">{k}</dt>
              <dd className="mt-1 font-display text-xl text-primary-dark">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-10 flex flex-wrap gap-4 text-sm">
          <a className="text-primary underline" href={YOUTUBE_CHANNEL} target="_blank" rel="noreferrer">
            YouTube channel
          </a>
          <a className="text-primary underline" href={FACEBOOK_PAGE} target="_blank" rel="noreferrer">
            Facebook page
          </a>
        </div>
      </div>
    </SiteShell>
  );
}
