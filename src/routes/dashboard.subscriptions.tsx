import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout, PageHeader } from "@/components/layouts";
import { SideNav } from "@/components/side-nav";
import { buyerNav } from "@/components/nav-items";
import { DataTable, StatusBadge } from "@/components/data-table";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/dashboard/subscriptions")({
  head: () => ({ meta: [
    { title: "My subscriptions — DevForge Hub" },
    { name: "description", content: "Manage your active subscriptions across purchased products." },
    { property: "og:title", content: "My subscriptions — DevForge Hub" },
    { property: "og:description", content: "Manage active subscriptions on DevForge Hub." },
  ]}),
  component: () => {
    const rows = [
      { id: 1, product: "Nexus Dashboard Pro", plan: "Commercial", price: 79, renews: "2026-08-12", status: "Active" },
      { id: 2, product: "Cortex AI Agent Kit", plan: "Enterprise", price: 299, renews: "2026-08-01", status: "Active" },
      { id: 3, product: "Prism UI Kit", plan: "Personal", price: 29, renews: "2026-08-22", status: "Active" },
    ];
    return (
      <DashboardLayout side={<SideNav items={buyerNav} title="Personal" />}>
        <div className="p-6 md:p-8 max-w-[1200px]">
          <PageHeader title="Subscriptions" description="$407/mo across 3 active subscriptions" />
          <DataTable
            rows={rows}
            columns={[
              { key: "product", header: "Product", render: (r) => <span className="text-sm font-medium">{r.product}</span> },
              { key: "plan", header: "Plan", render: (r) => <span className="text-sm">{r.plan}</span> },
              { key: "price", header: "Price", render: (r) => <span className="text-sm">${r.price}/mo</span> },
              { key: "renews", header: "Renews", render: (r) => <span className="text-sm text-muted-foreground">{r.renews}</span> },
              { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
              { key: "actions", header: "", render: () => <Button variant="ghost" size="sm">Manage</Button> },
            ]}
          />
        </div>
      </DashboardLayout>
    );
  },
});
