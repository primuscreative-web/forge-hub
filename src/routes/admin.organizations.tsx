import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout, PageHeader } from "@/components/layouts";
import { SideNav } from "@/components/side-nav";
import { adminNav } from "@/components/nav-items";
import { DataTable, UserCell, StatusBadge } from "@/components/data-table";
import { creators } from "@/lib/mock-data";
import { formatCompact } from "@/components/product-card";

export const Route = createFileRoute("/admin/organizations")({
  head: () => ({ meta: [
    { title: "Organizations — Admin — DevForge Hub" },
    { name: "description", content: "Manage verified organizations and teams." },
    { property: "og:title", content: "Organizations — Admin" }, { property: "og:description", content: "Organizations on DevForge Hub." },
  ]}),
  component: () => {
    const rows = creators.filter(c => c.organization).map(c => ({ ...c }));
    return (
      <DashboardLayout side={<SideNav items={adminNav} title="Admin" />}>
        <div className="p-6 md:p-8 max-w-[1400px]">
          <PageHeader title="Organizations" description={`${rows.length} organizations`} />
          <DataTable rows={rows} columns={[
            { key: "u", header: "Organization", render: (r) => <UserCell name={r.organization ?? r.name} sub={"@" + r.handle} initials={r.avatar} /> },
            { key: "loc", header: "Location", render: (r) => <span className="text-sm text-muted-foreground">{r.location}</span> },
            { key: "f", header: "Followers", render: (r) => <span className="text-sm">{formatCompact(r.followers)}</span> },
            { key: "s", header: "Sales", render: (r) => <span className="text-sm">{formatCompact(r.sales)}</span> },
            { key: "st", header: "Status", render: (r) => <StatusBadge status={r.verified ? "Active" : "Pending"} /> },
          ]} />
        </div>
      </DashboardLayout>
    );
  },
});
