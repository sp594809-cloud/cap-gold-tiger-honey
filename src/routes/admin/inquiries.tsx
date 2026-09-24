import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { deleteInquiry, getAdminBundle, type Inquiry } from "@/lib/cms.server";

export const Route = createFileRoute("/admin/inquiries")({ component: AdminInquiries });

function AdminInquiries() {
  const [rows, setRows] = useState<Inquiry[]>([]);
  async function reload() {
    setRows((await getAdminBundle()).inquiries);
  }
  useEffect(() => {
    reload().catch(() => undefined);
  }, []);

  return (
    <div>
      <h1 className="font-display text-3xl text-navy">Admission inquiries</h1>
      <div className="mt-6 overflow-x-auto rounded-xl border border-line bg-surface">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-paper text-muted">
            <tr>
              <th className="px-3 py-2 font-medium">Name</th>
              <th className="px-3 py-2 font-medium">Phone</th>
              <th className="px-3 py-2 font-medium">Class</th>
              <th className="px-3 py-2 font-medium">Message</th>
              <th className="px-3 py-2 font-medium" />
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td className="px-3 py-6 text-muted" colSpan={5}>
                  No inquiries yet.
                </td>
              </tr>
            ) : (
              rows.map((r) => (
                <tr key={r.id} className="border-t border-line">
                  <td className="px-3 py-2">{r.name}</td>
                  <td className="px-3 py-2">{r.phone}</td>
                  <td className="px-3 py-2">{r.applying_for}</td>
                  <td className="px-3 py-2 text-muted">{r.message}</td>
                  <td className="px-3 py-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={async () => {
                        await deleteInquiry({ data: r.id });
                        await reload();
                      }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
