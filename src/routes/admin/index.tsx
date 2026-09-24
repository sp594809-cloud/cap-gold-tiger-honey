import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getAdminBundle } from "@/lib/cms";

export const Route = createFileRoute("/admin/")({ component: AdminHome });

function AdminHome() {
  const [data, setData] = useState<Awaited<ReturnType<typeof getAdminBundle>> | null>(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    getAdminBundle()
      .then(setData)
      .catch((e: unknown) => setErr(e instanceof Error ? e.message : "Failed"));
  }, []);

  if (err) return <p className="text-danger">{err}</p>;
  if (!data) return <p className="text-muted">Loading dashboard…</p>;

  const cards = [
    { label: "News posts", n: data.news.length, to: "/admin/news" },
    { label: "Gallery photos", n: data.gallery.length, to: "/admin/gallery" },
    { label: "Inquiries", n: data.inquiries.length, to: "/admin/inquiries" },
    { label: "Toppers", n: data.toppers.length, to: "/admin/results" },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl text-navy">Dashboard</h1>
      <p className="mt-1 text-sm text-muted">Signed in as staff. Changes appear on the public website immediately.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <Link key={c.label} to={c.to} className="rounded-xl border border-line bg-surface p-5">
            <p className="text-sm text-muted">{c.label}</p>
            <p className="mt-2 font-display text-3xl tabular-nums text-navy">{c.n}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
