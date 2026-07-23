import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout, PageHeader } from "@/components/layouts";
import { SideNav } from "@/components/side-nav";
import { adminNav } from "@/components/nav-items";
import { DataTable, UserCell, StatusBadge } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, ShieldAlert, FileText, Activity, Server, Zap } from "lucide-react";

const m = (t: string, d: string) => ({
  meta: [
    { title: `${t} — Admin — DevForge Hub` },
    { name: "description", content: d },
    { property: "og:title", content: `${t} — Admin` },
    { property: "og:description", content: d },
  ],
});

export const TicketsRoute = createFileRoute("/admin/tickets")({
  head: () => m("Support tickets", "Open support tickets across the platform."),
  component: () => {
    const rows = Array.from({ length: 10 }).map((_, i) => ({
      id: `TKT-${2400 + i}`,
      subject: [
        "License issue",
        "Refund request",
        "Bug report",
        "Feature question",
        "Payout question",
      ][i % 5],
      user: ["Elena Costa", "Kaito Rivera", "Prism Agency", "CloudForge"][i % 4],
      init: ["EC", "KR", "PA", "CF"][i % 4],
      priority: (["High", "Medium", "Low"] as const)[i % 3],
      status: (["Open", "Under review", "Resolved"] as const)[i % 3],
      updated: `${i + 1}h ago`,
    }));
    return (
      <DashboardLayout side={<SideNav items={adminNav} title="Admin" />}>
        <div className="p-6 md:p-8 max-w-[1400px]">
          <PageHeader title="Support tickets" description="24 open · avg response 3.2h" />
          <DataTable
            rows={rows}
            columns={[
              {
                key: "id",
                header: "Ticket",
                render: (r) => <code className="text-xs">{r.id}</code>,
              },
              {
                key: "s",
                header: "Subject",
                render: (r) => <span className="text-sm font-medium">{r.subject}</span>,
              },
              {
                key: "u",
                header: "User",
                render: (r) => <UserCell name={r.user} initials={r.init} />,
              },
              {
                key: "p",
                header: "Priority",
                render: (r) => <Badge variant="outline">{r.priority}</Badge>,
              },
              { key: "st", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
              {
                key: "up",
                header: "Updated",
                render: (r) => <span className="text-xs text-muted-foreground">{r.updated}</span>,
              },
            ]}
          />
        </div>
      </DashboardLayout>
    );
  },
});

export const Route = TicketsRoute;
