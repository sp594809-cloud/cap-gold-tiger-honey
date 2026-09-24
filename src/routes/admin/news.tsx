import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import { deleteNews, getAdminBundle, saveNews, type NewsPost } from "@/lib/cms";

export const Route = createFileRoute("/admin/news")({ component: AdminNews });

const empty = {
  title: "",
  slug: "",
  excerpt: "",
  body: "",
  image_url: "/campus/assembly.jpg",
  published: true,
};

function AdminNews() {
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [form, setForm] = useState({ ...empty, id: undefined as number | undefined });
  const [msg, setMsg] = useState("");

  async function reload() {
    const d = await getAdminBundle();
    setPosts(d.news);
  }

  useEffect(() => {
    reload().catch(() => setMsg("Could not load"));
  }, []);

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
      <div>
        <h1 className="font-display text-3xl text-navy">{form.id ? "Edit post" : "New post"}</h1>
        <form
          className="mt-4 space-y-3"
          onSubmit={async (e) => {
            e.preventDefault();
            await saveNews({
              data: {
                id: form.id,
                title: form.title,
                slug: form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
                excerpt: form.excerpt,
                body: form.body,
                image_url: form.image_url,
                published: form.published,
              },
            });
            setForm({ ...empty, id: undefined });
            setMsg("Saved");
            await reload();
          }}
        >
          <div>
            <Label>Title</Label>
            <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          </div>
          <div>
            <Label>Slug</Label>
            <Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="auto from title" />
          </div>
          <div>
            <Label>Image URL</Label>
            <Input value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} />
          </div>
          <div>
            <Label>Excerpt</Label>
            <Textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />
          </div>
          <div>
            <Label>Body</Label>
            <Textarea className="min-h-40" value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} />
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => setForm({ ...form, published: e.target.checked })}
            />
            Published
          </label>
          <div className="flex gap-2">
            <Button type="submit">Save</Button>
            {form.id ? (
              <Button type="button" variant="outline" onClick={() => setForm({ ...empty, id: undefined })}>
                Cancel
              </Button>
            ) : null}
          </div>
          {msg ? <p className="text-sm text-teal">{msg}</p> : null}
        </form>
      </div>
      <div>
        <h2 className="font-display text-xl text-navy">All posts</h2>
        <ul className="mt-4 space-y-2">
          {posts.map((p) => (
            <li key={p.id} className="flex items-center justify-between gap-3 rounded-lg border border-line bg-surface px-3 py-2">
              <div>
                <p className="font-medium">{p.title}</p>
                <p className="text-xs text-muted">{p.published ? "Live" : "Draft"} · /{p.slug}</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => setForm({ ...p })}>
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={async () => {
                    await deleteNews({ data: p.id });
                    await reload();
                  }}
                >
                  Delete
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
