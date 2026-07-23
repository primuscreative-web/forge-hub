import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout, PageHeader } from "@/components/layouts";
import { SideNav } from "@/components/side-nav";
import { creatorNav } from "@/components/nav-items";
import { DataTable, UserCell, StatusBadge } from "@/components/data-table";

export const Route = createFileRoute("/creator/subscriptions")({
  head: () => ({
    meta: [
      { title: "Subscriptions — Creator — DevForge Hub" },
      {
        name: "description",
        content: "Manage active subscriptions across your subscription-based products.",
      },
      { property: "og:title", content: "Subscriptions — Creator — DevForge Hub" },
      { property: "og:description", content: "Manage active subscriptions on DevForge Hub." },
    ],
  }),
  component: () => {
    const rows = [
      {
        id: 1,
        name: "Prism Agency",
        init: "PA",
        plan: "Enterprise",
        product: "Nexus Dashboard Pro",
        mrr: 199,
        status: "Active",
        started: "2025-04-12",
      },
      {
        id: 2,
        name: "CloudForge",
        init: "CF",
        plan: "Commercial",
        product: "AuthForge",
        mrr: 79,
        status: "Active",
        started: "2025-06-02",
      },
      {
        id: 3,
        name: "Quantum Devs",
        init: "QD",
        plan: "Enterprise",
        product: "Cortex AI Agent Kit",
        mrr: 299,
        status: "Active",
        started: "2024-11-14",
      },
      {
        id: 4,
        name: "Hana Nakamura",
        init: "HN",
        plan: "Commercial",
        product: "Prism UI Kit",
        mrr: 29,
        status: "Pending",
        started: "2026-07-10",
      },
      {
        id: 5,
        name: "Elena Costa",
        init: "EC",
        plan: "Personal",
        product: "Voyager SaaS Boilerplate",
        mrr: 19,
        status: "Active",
        started: "2026-01-08",
      },
    ];
    return (
      <DashboardLayout side={<SideNav items={creatorNav} title="Creator" />}>
        <div className="p-6 md:p-8 max-w-[1400px]">
          <PageHeader title="Subscriptions" description="182 active · $28,420 MRR · 3.2% churn" />
          <DataTable
            rows={rows}
            columns={[
              {
                key: "user",
                header: "Customer",
                render: (r) => <UserCell name={r.name} initials={r.init} />,
              },
              {
                key: "plan",
                header: "Plan",
                render: (r) => <span className="text-sm">{r.plan}</span>,
              },
              {
                key: "product",
                header: "Product",
                render: (r) => <span className="text-sm text-muted-foreground">{r.product}</span>,
              },
              {
                key: "mrr",
                header: "MRR",
                render: (r) => <span className="text-sm font-medium">${r.mrr}</span>,
              },
              {
                key: "started",
                header: "Started",
                render: (r) => <span className="text-xs text-muted-foreground">{r.started}</span>,
              },
              { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
            ]}
          />
        </div>
      </DashboardLayout>
    );
  },
});
