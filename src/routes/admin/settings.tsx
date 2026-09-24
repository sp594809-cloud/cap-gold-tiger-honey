import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import { DEFAULT_SETTINGS, getAdminBundle, saveSettings, type SettingsMap } from "@/lib/cms";

export const Route = createFileRoute("/admin/settings")({ component: AdminSettings });

const FIELDS: { key: keyof typeof DEFAULT_SETTINGS; label: string; area?: boolean }[] = [
  { key: "school_name", label: "School name" },
  { key: "campus_name", label: "Campus name" },
  { key: "gujarati_name", label: "Gujarati name" },
  { key: "tagline", label: "Tagline" },
  { key: "founded", label: "Founded" },
  { key: "hours", label: "Hours" },
  { key: "address", label: "Address", area: true },
  { key: "phone1", label: "Phone 1" },
  { key: "phone2", label: "Phone 2" },
  { key: "phone3", label: "Phone 3" },
  { key: "whatsapp", label: "WhatsApp" },
  { key: "email", label: "Email" },
  { key: "video_url", label: "YouTube video or embed URL" },
  { key: "about", label: "About text", area: true },
];

function AdminSettings() {
  const [form, setForm] = useState<SettingsMap>(DEFAULT_SETTINGS);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    getAdminBundle()
      .then((d) => setForm(d.settings))
      .catch(() => undefined);
  }, []);

  return (
    <form
      className="max-w-2xl space-y-4"
      onSubmit={async (e) => {
        e.preventDefault();
        await saveSettings({ data: form });
        setMsg("Settings saved");
      }}
    >
      <h1 className="font-display text-3xl text-navy">Site settings</h1>
      {FIELDS.map((f) => (
        <div key={f.key}>
          <Label>{f.label}</Label>
          {f.area ? (
            <Textarea value={form[f.key] ?? ""} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} />
          ) : (
            <Input value={form[f.key] ?? ""} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} />
          )}
        </div>
      ))}
      <Button type="submit">Save settings</Button>
      {msg ? <p className="text-sm text-teal">{msg}</p> : null}
    </form>
  );
}
