import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { deleteGalleryItem, getAdminBundle, saveGalleryItem, type GalleryItem } from "@/lib/cms.server";
import { CAMPUS_IMAGES } from "@/lib/site";

export const Route = createFileRoute("/admin/gallery")({ component: AdminGallery });

function AdminGallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);

  async function reload() {
    setItems((await getAdminBundle()).gallery);
  }
  useEffect(() => {
    reload().catch(() => undefined);
  }, []);

  return (
    <div>
      <h1 className="font-display text-3xl text-navy">Gallery</h1>
      <form
        className="mt-6 grid gap-3 rounded-xl border border-line bg-surface p-4 sm:grid-cols-4"
        onSubmit={async (e) => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          await saveGalleryItem({
            data: {
              title: String(fd.get("title")),
              image_url: String(fd.get("image_url")),
              category: String(fd.get("category") || "Campus"),
            },
          });
          e.currentTarget.reset();
          await reload();
        }}
      >
        <div className="sm:col-span-1">
          <Label>Title</Label>
          <Input name="title" required />
        </div>
        <div className="sm:col-span-1">
          <Label>Category</Label>
          <Input name="category" defaultValue="Campus" />
        </div>
        <div className="sm:col-span-2">
          <Label>Image URL (or pick below)</Label>
          <Input name="image_url" list="campus-imgs" required />
          <datalist id="campus-imgs">
            {CAMPUS_IMAGES.map((c) => (
              <option key={c.src} value={c.src} />
            ))}
          </datalist>
        </div>
        <Button type="submit" className="sm:col-span-4">
          Add photo
        </Button>
      </form>
      <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
        {items.map((g) => (
          <figure key={g.id} className="overflow-hidden rounded-lg border border-line bg-surface">
            <img src={g.image_url} alt={g.title} className="h-32 w-full object-cover" />
            <figcaption className="flex items-center justify-between px-2 py-2 text-xs">
              <span>{g.title}</span>
              <button
                type="button"
                className="text-danger"
                onClick={async () => {
                  await deleteGalleryItem({ data: g.id });
                  await reload();
                }}
              >
                Remove
              </button>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
