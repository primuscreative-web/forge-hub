import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout, PageHeader } from "@/components/layouts";
import { SideNav } from "@/components/side-nav";
import { adminNav } from "@/components/nav-items";
import { DataTable, StatusBadge } from "@/components/data-table";
import { products } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/products")({
  head: () => ({
    meta: [
      { title: "Products — Admin — DevForge Hub" },
      { name: "description", content: "Moderate all products across the marketplace." },
      { property: "og:title", content: "Products — Admin" },
      { property: "og:description", content: "Moderate all products across the marketplace." },
    ],
  }),
  component: () => (
    <DashboardLayout side={<SideNav items={adminNav} title="Admin" />}>
      <div className="p-6 md:p-8 max-w-[1400px]">
        <PageHeader title="Products" description={`${products.length} products platform-wide`} />
        <DataTable
          rows={products.slice(0, 20)}
          columns={[
            {
              key: "p",
              header: "Product",
              render: (r) => (
                <div className="flex items-center gap-3">
                  <div
                    className="size-8 rounded-lg grid place-items-center text-base"
                    style={{ background: r.gradient }}
                  >
                    {r.emoji}
                  </div>
                  <div className="text-sm font-medium">{r.name}</div>
                </div>
              ),
            },
            {
              key: "cat",
              header: "Category",
              render: (r) => <span className="text-sm text-muted-foreground">{r.category}</span>,
            },
            {
              key: "price",
              header: "Price",
              render: (r) => <span className="text-sm">{r.free ? "Free" : `$${r.price}`}</span>,
            },
            {
              key: "sales",
              header: "Sales",
              render: (r) => <span className="text-sm">{r.sales.toLocaleString()}</span>,
            },
            { key: "st", header: "Status", render: () => <StatusBadge status="Published" /> },
          ]}
        />
      </div>
    </DashboardLayout>
  ),
});
