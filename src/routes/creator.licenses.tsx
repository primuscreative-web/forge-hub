import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout, PageHeader } from "@/components/layouts";
import { SideNav } from "@/components/side-nav";
import { creatorNav } from "@/components/nav-items";
import { DataTable, UserCell, StatusBadge } from "@/components/data-table";

export const Route = createFileRoute("/creator/licenses")({
  head: () => ({
    meta: [
      { title: "Licenses — Creator — DevForge Hub" },
      {
        name: "description",
        content: "Track issued licenses for your products and their activation status.",
      },
      { property: "og:title", content: "Licenses — Creator — DevForge Hub" },
      { property: "og:description", content: "Track issued licenses on DevForge Hub." },
    ],
  }),
  component: () => {
    const rows = [
      {
        id: 1,
        key: "DFH-8H2K-9F31-XZ8A",
        name: "Elena Costa",
        init: "EC",
        product: "Voyager SaaS Boilerplate",
        tier: "Commercial",
        status: "Active",
        issued: "2026-02-14",
      },
      {
        id: 2,
        key: "DFH-A2P0-JJ21-M4K1",
        name: "Prism Agency",
        init: "PA",
        product: "Nexus Dashboard Pro",
        tier: "Enterprise",
        status: "Active",
        issued: "2025-04-12",
      },
      {
        id: 3,
        key: "DFH-2NN8-KK4L-98QW",
        name: "Quantum Devs",
        init: "QD",
        product: "Cortex AI Agent Kit",
        tier: "Enterprise",
        status: "Active",
        issued: "2024-11-14",
      },
      {
        id: 4,
        key: "DFH-XY82-0A9L-P28M",
        name: "CloudForge",
        init: "CF",
        product: "AuthForge",
        tier: "Commercial",
        status: "Suspended",
        issued: "2025-06-02",
      },
    ];
    return (
      <DashboardLayout side={<SideNav items={creatorNav} title="Creator" />}>
        <div className="p-6 md:p-8 max-w-[1400px]">
          <PageHeader title="Licenses" description="1,284 issued licenses across all products" />
          <DataTable
            rows={rows}
            columns={[
              {
                key: "key",
                header: "License key",
                render: (r) => (
                  <code className="text-xs bg-surface-2 px-2 py-1 rounded">{r.key}</code>
                ),
              },
              {
                key: "user",
                header: "Owner",
                render: (r) => <UserCell name={r.name} initials={r.init} />,
              },
              {
                key: "product",
                header: "Product",
                render: (r) => <span className="text-sm text-muted-foreground">{r.product}</span>,
              },
              {
                key: "tier",
                header: "Tier",
                render: (r) => <span className="text-sm">{r.tier}</span>,
              },
              {
                key: "issued",
                header: "Issued",
                render: (r) => <span className="text-xs text-muted-foreground">{r.issued}</span>,
              },
              { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
            ]}
          />
        </div>
      </DashboardLayout>
    );
  },
});
