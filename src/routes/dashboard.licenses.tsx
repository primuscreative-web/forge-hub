import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout, PageHeader } from "@/components/layouts";
import { SideNav } from "@/components/side-nav";
import { buyerNav } from "@/components/nav-items";
import { DataTable, StatusBadge } from "@/components/data-table";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/dashboard/licenses")({
  head: () => ({
    meta: [
      { title: "My licenses — DevForge Hub" },
      {
        name: "description",
        content: "License keys and activation limits for every product you own.",
      },
      { property: "og:title", content: "My licenses — DevForge Hub" },
      { property: "og:description", content: "Manage your license keys on DevForge Hub." },
    ],
  }),
  component: () => {
    const rows = [
      {
        id: 1,
        key: "DFH-8H2K-9F31-XZ8A",
        product: "Nexus Dashboard Pro",
        tier: "Commercial",
        activations: "1/5",
        status: "Active",
      },
      {
        id: 2,
        key: "DFH-2NN8-KK4L-98QW",
        product: "Cortex AI Agent Kit",
        tier: "Enterprise",
        activations: "3/∞",
        status: "Active",
      },
      {
        id: 3,
        key: "DFH-XY82-0A9L-P28M",
        product: "AuthForge",
        tier: "Personal",
        activations: "1/1",
        status: "Active",
      },
    ];
    return (
      <DashboardLayout side={<SideNav items={buyerNav} title="Personal" />}>
        <div className="p-6 md:p-8 max-w-[1200px]">
          <PageHeader title="Licenses" description="18 license keys across your library" />
          <DataTable
            rows={rows}
            columns={[
              {
                key: "key",
                header: "Key",
                render: (r) => (
                  <code className="text-xs bg-surface-2 px-2 py-1 rounded">{r.key}</code>
                ),
              },
              {
                key: "product",
                header: "Product",
                render: (r) => <span className="text-sm font-medium">{r.product}</span>,
              },
              {
                key: "tier",
                header: "Tier",
                render: (r) => <span className="text-sm">{r.tier}</span>,
              },
              {
                key: "activations",
                header: "Activations",
                render: (r) => <span className="text-sm">{r.activations}</span>,
              },
              { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
              {
                key: "actions",
                header: "",
                render: () => (
                  <Button variant="ghost" size="sm">
                    Copy
                  </Button>
                ),
              },
            ]}
          />
        </div>
      </DashboardLayout>
    );
  },
});
