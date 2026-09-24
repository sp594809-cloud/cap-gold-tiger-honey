import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { deleteTopper, getAdminBundle, saveTopper, type Topper } from "@/lib/cms";

export const Route = createFileRoute("/admin/results")({ component: AdminResults });

function AdminResults() {
  const [rows, setRows] = useState<Topper[]>([]);
  async function reload() {
    setRows((await getAdminBundle()).toppers);
  }
  useEffect(() => {
    reload().catch(() => undefined);
  }, []);

  return (
    <div>
      <h1 className="font-display text-3xl text-navy">Toppers</h1>
      <form
        className="mt-6 grid gap-3 rounded-xl border border-line bg-surface p-4 sm:grid-cols-3"
        onSubmit={async (e) => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          await saveTopper({
            data: {
              name: String(fd.get("name")),
              score: String(fd.get("score")),
              class_name: String(fd.get("class_name")),
              position: String(fd.get("position")),
              year: String(fd.get("year")),
              stream: String(fd.get("stream")),
            },
          });
          e.currentTarget.reset();
          await reload();
        }}
      >
        <div>
          <Label>Name</Label>
          <Input name="name" required />
        </div>
        <div>
          <Label>Score</Label>
          <Input name="score" required />
        </div>
        <div>
          <Label>Class</Label>
          <Input name="class_name" defaultValue="12th Commerce" />
        </div>
        <div>
          <Label>Position</Label>
          <Input name="position" defaultValue="1st" />
        </div>
        <div>
          <Label>Year</Label>
          <Input name="year" defaultValue="2024-25" />
        </div>
        <div>
          <Label>Stream</Label>
          <Input name="stream" defaultValue="Commerce" />
        </div>
        <Button type="submit" className="sm:col-span-3">
          Add topper
        </Button>
      </form>
      <ul className="mt-6 space-y-2">
        {rows.map((t) => (
          <li key={t.id} className="flex items-center justify-between rounded-lg border border-line bg-surface px-3 py-2">
            <span>
              {t.name} · {t.score} · {t.class_name}
            </span>
            <Button
              size="sm"
              variant="ghost"
              onClick={async () => {
                await deleteTopper({ data: t.id });
                await reload();
              }}
            >
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
