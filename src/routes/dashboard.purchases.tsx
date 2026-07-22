import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout, PageHeader } from "@/components/layouts";
import { SideNav } from "@/components/side-nav";
import { buyerNav } from "@/components/nav-items";
import { DataTable, StatusBadge } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/purchases")({
  head: () => ({ meta: [
    { title: "Purchases & invoices — DevForge Hub" },
    { name: "description", content: "View past orders, download invoices, and request refunds." },
    { property: "og:title", content: "Purchases & invoices — DevForge Hub" },
    { property: "og:description", content: "View past orders and download invoices." },
  ]}),
  component: () => {
    const rows = products.slice(0, 10).map((p, i) => ({ id: p.id, product: p.name, emoji: p.emoji, gradient: p.gradient, price: p.price, date: `2026-0${(i % 7) + 1}-1${i + 1}`, invoice: `INV-2026-${1000 + i}`, status: "Paid" as const }));
    return (
      <DashboardLayout side={<SideNav items={buyerNav} title="Personal" />}>
        <div className="p-6 md:p-8 max-w-[1400px]">
          <PageHeader title="Purchases & invoices" description="18 orders · $2,140 spent lifetime" actions={<Button variant="outline">Export all invoices</Button>} />
          <DataTable
            rows={rows}
            columns={[
              { key: "product", header: "Product", render: (r) => (
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-lg grid place-items-center text-base" style={{ background: r.gradient }}>{r.emoji}</div>
                  <span className="text-sm font-medium">{r.product}</span>
                </div>
              ) },
              { key: "invoice", header: "Invoice", render: (r) => <code className="text-xs">{r.invoice}</code> },
              { key: "date", header: "Date", render: (r) => <span className="text-sm">{r.date}</span> },
              { key: "amount", header: "Amount", render: (r) => <span className="text-sm font-medium">${r.price}</span> },
              { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
              { key: "invoice-dl", header: "", render: () => <Button variant="ghost" size="sm">Download</Button> },
            ]}
          />
        </div>
      </DashboardLayout>
    );
  },
});
