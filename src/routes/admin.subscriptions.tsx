import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout, PageHeader } from "@/components/layouts";
import { SideNav } from "@/components/side-nav";
import { adminNav } from "@/components/nav-items";
import { DataTable, StatusBadge } from "@/components/data-table";

export const Route = createFileRoute("/admin/subscriptions")({
  head: () => ({ meta: [
    { title: "Subscriptions — Admin — DevForge Hub" },
    { name: "description", content: "All active subscriptions across the platform." },
    { property: "og:title", content: "Subscriptions — Admin" }, { property: "og:description", content: "All subscriptions on DevForge Hub." },
  ]}),
  component: () => {
    const rows = Array.from({ length: 10 }).map((_, i) => ({
      id: `SUB-${1000+i}`, customer: ["Prism Agency","CloudForge","Quantum Devs"][i%3],
      product: ["Nexus Dashboard Pro","AuthForge","Cortex AI Agent Kit"][i%3],
      mrr: [199, 79, 299][i%3], status: (["Active","Active","Pending"] as const)[i%3], started: `2025-0${(i%9)+1}-14`,
    }));
    return (
      <DashboardLayout side={<SideNav items={adminNav} title="Admin" />}>
        <div className="p-6 md:p-8 max-w-[1400px]">
          <PageHeader title="Subscriptions" description="1,240 active · $184k MRR" />
          <DataTable rows={rows} columns={[
            { key: "id", header: "ID", render: (r) => <code className="text-xs">{r.id}</code> },
            { key: "c", header: "Customer", render: (r) => <span className="text-sm font-medium">{r.customer}</span> },
            { key: "p", header: "Product", render: (r) => <span className="text-sm text-muted-foreground">{r.product}</span> },
            { key: "m", header: "MRR", render: (r) => <span className="text-sm font-medium">${r.mrr}</span> },
            { key: "s", header: "Started", render: (r) => <span className="text-xs text-muted-foreground">{r.started}</span> },
            { key: "st", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
          ]} />
        </div>
      </DashboardLayout>
    );
  },
});
