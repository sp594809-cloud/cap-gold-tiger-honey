import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import { getPublicSite, submitInquiry } from "@/lib/cms.server";

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
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-2">
        <div>
          <p className="text-xs font-semibold tracking-[0.18em] text-teal uppercase">Admissions</p>
          <h1 className="mt-2 font-display text-4xl text-navy">Seats open — Pre-Primary to 12</h1>
          <p className="mt-4 text-muted">{settings.tagline}.</p>
          <ul className="mt-6 space-y-2 text-sm text-ink">
            <li>Pre-Primary</li>
            <li>Classes 1 to 10</li>
            <li>Class 11 Science / Commerce</li>
          </ul>
          <img src="/campus/admission.jpg" alt="Admission poster" className="mt-8 w-full rounded-2xl border border-line" />
        </div>
        <form
          className="rounded-2xl border border-line bg-surface p-6"
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
          <h2 className="font-display text-2xl text-navy">Inquiry form</h2>
          <div className="mt-5 space-y-4">
            <div>
              <Label htmlFor="name">Parent / student name</Label>
              <Input id="name" name="name" required />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" name="phone" required />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" />
            </div>
            <div>
              <Label htmlFor="applying_for">Applying for</Label>
              <Input id="applying_for" name="applying_for" placeholder="e.g. Class 11 Science" />
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" name="message" />
            </div>
            <Button type="submit" disabled={pending} className="w-full">
              {pending ? "Sending…" : "Submit inquiry"}
            </Button>
            {status === "ok" ? <p className="text-sm text-teal">Received. The office will call you.</p> : null}
            {status === "err" ? <p className="text-sm text-danger">Could not send. Try phone instead.</p> : null}
          </div>
        </form>
      </div>
    </SiteShell>
  );
}
