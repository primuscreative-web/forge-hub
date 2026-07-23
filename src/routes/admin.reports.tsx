import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout, PageHeader } from "@/components/layouts";
import { SideNav } from "@/components/side-nav";
import { adminNav } from "@/components/nav-items";
import { DataTable, UserCell, StatusBadge } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/admin/reports")({
  head: () => ({
    meta: [
      { title: "Reports — Admin — DevForge Hub" },
      {
        name: "description",
        content: "User-submitted reports about products, reviews, and behavior.",
      },
      { property: "og:title", content: "Reports — Admin" },
      { property: "og:description", content: "User-submitted reports for review." },
    ],
  }),
  component: () => {
    const rows = Array.from({ length: 8 }).map((_, i) => ({
      id: `RPT-${1200 + i}`,
      reporter: ["Elena Costa", "Kaito Rivera"][i % 2],
      init: ["EC", "KR"][i % 2],
      target: ["Product: Fake AI Kit", "Review: spam", "User: harassment", "Product: copyright"][
        i % 4
      ],
      reason: ["Copyright", "Spam", "Harassment", "Fraud"][i % 4],
      status: (["Open", "Under review", "Resolved"] as const)[i % 3],
      date: `Jul ${i + 10}`,
    }));
    return (
      <DashboardLayout side={<SideNav items={adminNav} title="Admin" />}>
        <div className="p-6 md:p-8 max-w-[1400px]">
          <PageHeader title="Reports" description="8 open reports" />
          <DataTable
            rows={rows}
            columns={[
              {
                key: "id",
                header: "Report",
                render: (r) => <code className="text-xs">{r.id}</code>,
              },
              {
                key: "u",
                header: "Reporter",
                render: (r) => <UserCell name={r.reporter} initials={r.init} />,
              },
              {
                key: "t",
                header: "Target",
                render: (r) => <span className="text-sm">{r.target}</span>,
              },
              {
                key: "reason",
                header: "Reason",
                render: (r) => <Badge variant="outline">{r.reason}</Badge>,
              },
              { key: "st", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
              {
                key: "d",
                header: "Date",
                render: (r) => <span className="text-xs text-muted-foreground">{r.date}</span>,
              },
            ]}
          />
        </div>
      </DashboardLayout>
    );
  },
});
