import { Link, Outlet, createFileRoute, useRouterState } from "@tanstack/react-router";
import { RedirectToSignIn, UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin")({ component: AdminShell });

const LINKS = [
  { to: "/admin", label: "Dashboard", exact: true },
  { to: "/admin/news", label: "News" },
  { to: "/admin/gallery", label: "Gallery" },
  { to: "/admin/inquiries", label: "Inquiries" },
  { to: "/admin/results", label: "Results" },
  { to: "/admin/settings", label: "Settings" },
] as const;

function AdminShell() {
  const { user, isPending } = useCurrentUserState();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  if (isPending) {
    return <div className="min-h-screen bg-bg p-8 text-sm text-muted">Loading staff session…</div>;
  }
  if (!user) return <RedirectToSignIn to="/login" />;

  return (
    <div className="min-h-screen bg-bg md:grid md:grid-cols-[220px_1fr]">
      <aside className="border-b border-line bg-navy text-paper md:min-h-screen md:border-r md:border-b-0">
        <div className="flex items-center justify-between px-4 py-4 md:block">
          <p className="font-display text-lg">Mangaldeep CMS</p>
          <p className="hidden text-xs text-paper/60 md:block">Like WordPress — edit the live site</p>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-2 pb-3 md:flex-col md:px-3">
          {LINKS.map((l) => {
            const active = "exact" in l && l.exact ? pathname === l.to : pathname.startsWith(l.to);
            return (
              <Link
                key={l.to}
                to={l.to}
                className={cn(
                  "whitespace-nowrap rounded-md px-3 py-2 text-sm",
                  active ? "bg-paper/15 text-paper" : "text-paper/70 hover:bg-paper/10",
                )}
              >
                {l.label}
              </Link>
            );
          })}
          <Link to="/" className="rounded-md px-3 py-2 text-sm text-paper/50 hover:text-paper">
            View site
          </Link>
        </nav>
        <div className="hidden px-4 py-4 md:block">
          <UserButton />
        </div>
      </aside>
      <div>
        <div className="flex items-center justify-end border-b border-line bg-paper px-4 py-3 md:hidden">
          <UserButton />
        </div>
        <div className="p-4 md:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
