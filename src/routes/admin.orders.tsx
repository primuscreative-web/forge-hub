import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout, PageHeader } from "@/components/layouts";
import { SideNav } from "@/components/side-nav";
import { adminNav } from "@/components/nav-items";
import { DataTable, UserCell, StatusBadge } from "@/components/data-table";

export const Route = createFileRoute("/admin/orders")({
  head: () => ({ meta: [
    { title: "Orders — Admin — DevForge Hub" },
    { name: "description", content: "Every order across the platform." },
    { property: "og:title", content: "Orders — Admin" },
    { property: "og:description", content: "Every order across the platform." },
  ]}),
  component: () => {
    const rows = Array.from({ length: 12 }).map((_, i) => ({
      id: `ORD-${1000 + i}`, buyer: ["Elena Costa","Kaito Rivera","Prism Agency","CloudForge"][i%4],
      init: ["EC","KR","PA","CF"][i%4], product: ["Nexus Dashboard Pro","AuthForge","Prism UI Kit","Cortex AI Agent Kit"][i%4],
      amount: [149, 249, 89, 399][i%4], date: `2026-07-${(i%28)+1}`, status: (["Paid","Paid","Refunded","Paid"] as const)[i%4],
    }));
    return (
      <DashboardLayout side={<SideNav items={adminNav} title="Admin" />}>
        <div className="p-6 md:p-8 max-w-[1400px]">
          <PageHeader title="Orders" description="42,180 orders in the last 30 days" />
          <DataTable rows={rows} columns={[
            { key: "id", header: "Order", render: (r) => <code className="text-xs">{r.id}</code> },
            { key: "b", header: "Buyer", render: (r) => <UserCell name={r.buyer} initials={r.init} /> },
            { key: "p", header: "Product", render: (r) => <span className="text-sm">{r.product}</span> },
            { key: "a", header: "Amount", render: (r) => <span className="text-sm font-medium">${r.amount}</span> },
            { key: "d", header: "Date", render: (r) => <span className="text-xs text-muted-foreground">{r.date}</span> },
            { key: "st", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
          ]} />
        </div>
      </DashboardLayout>
    );
  },
});
