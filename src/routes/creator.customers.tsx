import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout, PageHeader } from "@/components/layouts";
import { SideNav } from "@/components/side-nav";
import { creatorNav } from "@/components/nav-items";
import { DataTable, UserCell, StatusBadge } from "@/components/data-table";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/creator/customers")({
  head: () => ({
    meta: [
      { title: "Customers — Creator — DevForge Hub" },
      {
        name: "description",
        content: "View and manage the customers who purchased your products.",
      },
      { property: "og:title", content: "Customers — Creator — DevForge Hub" },
      { property: "og:description", content: "View and manage your customers on DevForge Hub." },
    ],
  }),
  component: Customers,
});

const customers = [
  {
    id: 1,
    name: "Elena Costa",
    email: "elena@voyager.dev",
    init: "EC",
    country: "Brazil",
    spent: 1240,
    orders: 7,
    status: "Active",
    joined: "2024-02-14",
  },
  {
    id: 2,
    name: "Kaito Rivera",
    email: "kaito@sonata.io",
    init: "KR",
    country: "Japan",
    spent: 890,
    orders: 5,
    status: "Active",
    joined: "2023-01-20",
  },
  {
    id: 3,
    name: "Prism Agency",
    email: "team@prism.agency",
    init: "PA",
    country: "Portugal",
    spent: 4820,
    orders: 22,
    status: "Active",
    joined: "2022-08-30",
  },
  {
    id: 4,
    name: "CloudForge",
    email: "hello@cloudforge.io",
    init: "CF",
    country: "Ireland",
    spent: 3120,
    orders: 14,
    status: "Active",
    joined: "2023-09-12",
  },
  {
    id: 5,
    name: "Hana Nakamura",
    email: "hana@studio.jp",
    init: "HN",
    country: "Japan",
    spent: 2480,
    orders: 12,
    status: "Active",
    joined: "2022-02-18",
  },
  {
    id: 6,
    name: "Quantum Devs",
    email: "team@quantum.dev",
    init: "QD",
    country: "Remote",
    spent: 5480,
    orders: 27,
    status: "Active",
    joined: "2023-06-08",
  },
];

function Customers() {
  return (
    <DashboardLayout side={<SideNav items={creatorNav} title="Creator" />}>
      <div className="p-6 md:p-8 max-w-[1400px]">
        <PageHeader
          title="Customers"
          description="1,284 customers across your 12 products."
          actions={<Button variant="outline">Export CSV</Button>}
        />
        <DataTable
          rows={customers}
          columns={[
            {
              key: "user",
              header: "Customer",
              render: (r) => <UserCell name={r.name} sub={r.email} initials={r.init} />,
            },
            {
              key: "country",
              header: "Country",
              render: (r) => <span className="text-sm text-muted-foreground">{r.country}</span>,
            },
            {
              key: "orders",
              header: "Orders",
              render: (r) => <span className="text-sm">{r.orders}</span>,
            },
            {
              key: "spent",
              header: "Spent",
              render: (r) => (
                <span className="text-sm font-medium">${r.spent.toLocaleString()}</span>
              ),
            },
            {
              key: "joined",
              header: "Joined",
              render: (r) => <span className="text-xs text-muted-foreground">{r.joined}</span>,
            },
            { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
          ]}
        />
      </div>
    </DashboardLayout>
  );
}
