import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, Phone } from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import { getPublicSite, submitInquiry } from "@/lib/cms";
import { telLink } from "@/lib/utils";

export const Route = createFileRoute("/admissions")({
  loader: () => getPublicSite(),
  component: Admissions,
});

function Admissions() {
  const { settings } = Route.useLoaderData();
  const [status, setStatus] = useState<"idle" | "ok" | "err">("idle");
  const [pending, setPending] = useState(false);

  return (
    <SiteShell settings={settings}>
      <div className="bg-primary-light/50 border-b border-line">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">Admissions 2026–27</p>
          <h1 className="mt-2 font-display text-4xl text-primary-dark md:text-5xl">
            Seats open — Pre-Primary to Class 12
          </h1>
          <p className="mt-3 max-w-xl text-muted">{settings.tagline}.</p>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl text-primary-dark">Who can apply?</h2>
          <ul className="mt-4 space-y-3">
            {["Pre-Primary (Playgroup, Nursery, LKG, UKG)", "Classes 1 to 10", "Class 11 Science", "Class 11 Commerce"].map(
              (t) => (
                <li key={t} className="flex items-center gap-2 text-ink">
                  <CheckCircle2 className="size-5 shrink-0 text-green" />
                  {t}
                </li>
              ),
            )}
          </ul>

          <div className="mt-8 overflow-hidden rounded-2xl border border-line shadow-md">
            <img
              src="/campus/admission-poster.jpg"
              alt="Admission open poster"
              className="w-full object-cover"
            />
          </div>

          <div className="mt-6 rounded-2xl bg-green-soft p-5">
            <p className="text-sm font-semibold text-green">Prefer to call?</p>
            <div className="mt-2 flex flex-wrap gap-3 text-sm">
              {[settings.phone1, settings.phone2, settings.phone3].filter(Boolean).map((p) => (
                <a key={p} href={telLink(p)} className="inline-flex items-center gap-1.5 font-medium text-primary-dark hover:underline">
                  <Phone className="size-4" />
                  {p}
                </a>
              ))}
            </div>
          </div>
        </div>

        <form
          className="rounded-2xl border border-line bg-paper p-6 shadow-md md:p-8"
          onSubmit={async (e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const fd = new FormData(form);
            setPending(true);
            try {
              await submitInquiry({
                data: {
                  name: String(fd.get("name") ?? ""),
                  phone: String(fd.get("phone") ?? ""),
                  email: String(fd.get("email") ?? ""),
                  applying_for: String(fd.get("applying_for") ?? ""),
                  message: String(fd.get("message") ?? ""),
                },
              });
              setStatus("ok");
              form.reset();
            } catch {
              setStatus("err");
            } finally {
              setPending(false);
            }
          }}
        >
          <h2 className="font-display text-2xl text-primary-dark">Inquiry form</h2>
          <p className="mt-1 text-sm text-muted">We will call you back soon.</p>
          <div className="mt-6 space-y-4">
            <div>
              <Label htmlFor="name">Parent / student name *</Label>
              <Input id="name" name="name" required className="mt-1.5" placeholder="Full name" />
            </div>
            <div>
              <Label htmlFor="phone">Phone number *</Label>
              <Input id="phone" name="phone" required className="mt-1.5" placeholder="10-digit mobile" />
            </div>
            <div>
              <Label htmlFor="email">Email (optional)</Label>
              <Input id="email" name="email" type="email" className="mt-1.5" placeholder="you@email.com" />
            </div>
            <div>
              <Label htmlFor="applying_for">Applying for</Label>
              <Input
                id="applying_for"
                name="applying_for"
                className="mt-1.5"
                placeholder="e.g. Class 11 Science"
              />
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" name="message" className="mt-1.5" placeholder="Any question for the office…" />
            </div>
            <Button type="submit" disabled={pending} className="w-full" size="lg" variant="accent">
              {pending ? "Sending…" : "Submit inquiry"}
            </Button>
            {status === "ok" ? (
              <p className="rounded-lg bg-green-soft px-3 py-2 text-sm text-green">
                Received. The office will call you shortly.
              </p>
            ) : null}
            {status === "err" ? (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-danger">
                Could not send. Please call us instead.
              </p>
            ) : null}
          </div>
        </form>
      </div>
    </SiteShell>
  );
}
