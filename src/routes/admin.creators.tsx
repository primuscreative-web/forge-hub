import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout, PageHeader } from "@/components/layouts";
import { SideNav } from "@/components/side-nav";
import { adminNav } from "@/components/nav-items";
import { DataTable, UserCell, StatusBadge } from "@/components/data-table";
import { creators } from "@/lib/mock-data";
import { formatCompact } from "@/components/product-card";

export const Route = createFileRoute("/admin/creators")({
  head: () => ({
    meta: [
      { title: "Creators — Admin — DevForge Hub" },
      { name: "description", content: "Manage verified and pending creators." },
      { property: "og:title", content: "Creators — Admin" },
      { property: "og:description", content: "Manage verified and pending creators." },
    ],
  }),
  component: () => (
    <DashboardLayout side={<SideNav items={adminNav} title="Admin" />}>
      <div className="p-6 md:p-8 max-w-[1400px]">
        <PageHeader
          title="Creators"
          description={`${creators.length} creators · ${creators.filter((c) => c.verified).length} verified`}
        />
        <DataTable
          rows={creators.map((c) => ({ ...c }))}
          columns={[
            {
              key: "u",
              header: "Creator",
              render: (r) => <UserCell name={r.name} sub={"@" + r.handle} initials={r.avatar} />,
            },
            {
              key: "loc",
              header: "Location",
              render: (r) => <span className="text-sm text-muted-foreground">{r.location}</span>,
            },
            {
              key: "f",
              header: "Followers",
              render: (r) => <span className="text-sm">{formatCompact(r.followers)}</span>,
            },
            {
              key: "s",
              header: "Sales",
              render: (r) => <span className="text-sm">{formatCompact(r.sales)}</span>,
            },
            {
              key: "st",
              header: "Status",
              render: (r) => <StatusBadge status={r.verified ? "Active" : "Pending"} />,
            },
          ]}
        />
      </div>
    </DashboardLayout>
  ),
});
