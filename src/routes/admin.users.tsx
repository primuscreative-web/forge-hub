import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout, PageHeader } from "@/components/layouts";
import { SideNav } from "@/components/side-nav";
import { adminNav } from "@/components/nav-items";
import { DataTable, UserCell, StatusBadge } from "@/components/data-table";

export const Route = createFileRoute("/admin/users")({
  head: () => ({
    meta: [
      { title: "Users — Admin — DevForge Hub" },
      { name: "description", content: "Search, filter, and manage all platform users." },
      { property: "og:title", content: "Users — Admin" },
      { property: "og:description", content: "Search, filter, and manage all platform users." },
    ],
  }),
  component: () => {
    const rows = Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      name: [
        "Elena Costa",
        "Kaito Rivera",
        "Hana Nakamura",
        "Prism Agency",
        "CloudForge",
        "Quantum Devs",
      ][i % 6],
      init: ["EC", "KR", "HN", "PA", "CF", "QD"][i % 6],
      email: `user${i + 100}@company.com`,
      role: i % 5 === 0 ? "Creator" : "Buyer",
      spent: 200 + i * 84,
      status: i % 7 === 0 ? "Suspended" : "Active",
      joined: `2025-0${(i % 9) + 1}-1${(i % 9) + 1}`,
    }));
    return (
      <DashboardLayout side={<SideNav items={adminNav} title="Admin" />}>
        <div className="p-6 md:p-8 max-w-[1400px]">
          <PageHeader title="Users" description="248,400 total · +2,140 new this month" />
          <DataTable
            rows={rows}
            columns={[
              {
                key: "u",
                header: "User",
                render: (r) => <UserCell name={r.name} sub={r.email} initials={r.init} />,
              },
              {
                key: "r",
                header: "Role",
                render: (r) => <span className="text-sm">{r.role}</span>,
              },
              {
                key: "s",
                header: "Spent",
                render: (r) => <span className="text-sm">${r.spent}</span>,
              },
              {
                key: "j",
                header: "Joined",
                render: (r) => <span className="text-xs text-muted-foreground">{r.joined}</span>,
              },
              { key: "st", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
            ]}
          />
        </div>
      </DashboardLayout>
    );
  },
});
