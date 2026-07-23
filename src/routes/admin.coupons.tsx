import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout, PageHeader } from "@/components/layouts";
import { SideNav } from "@/components/side-nav";
import { adminNav } from "@/components/nav-items";
import { Button } from "@/components/ui/button";
import { DataTable, StatusBadge } from "@/components/data-table";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/admin/coupons")({
  head: () => ({
    meta: [
      { title: "Coupons — Admin — DevForge Hub" },
      { name: "description", content: "Create and manage discount coupons." },
      { property: "og:title", content: "Coupons — Admin" },
      { property: "og:description", content: "Discount coupons on DevForge Hub." },
    ],
  }),
  component: () => {
    const rows = [
      {
        id: 1,
        code: "LAUNCH20",
        type: "20% off",
        uses: "184 / ∞",
        expires: "2026-12-31",
        status: "Active",
      },
      {
        id: 2,
        code: "BLACKFRIDAY",
        type: "40% off",
        uses: "0 / 5000",
        expires: "2026-11-30",
        status: "Pending",
      },
      {
        id: 3,
        code: "STUDENT10",
        type: "10% off",
        uses: "820 / ∞",
        expires: "Never",
        status: "Active",
      },
    ];
    return (
      <DashboardLayout side={<SideNav items={adminNav} title="Admin" />}>
        <div className="p-6 md:p-8 max-w-[1400px]">
          <PageHeader
            title="Coupons"
            description="Create discount codes for promotions."
            actions={
              <Button className="gradient-brand text-white">
                <Plus className="size-4 mr-1.5" />
                New coupon
              </Button>
            }
          />
          <DataTable
            rows={rows}
            columns={[
              {
                key: "c",
                header: "Code",
                render: (r) => <code className="text-sm font-semibold">{r.code}</code>,
              },
              {
                key: "t",
                header: "Discount",
                render: (r) => <span className="text-sm">{r.type}</span>,
              },
              {
                key: "u",
                header: "Uses",
                render: (r) => <span className="text-sm">{r.uses}</span>,
              },
              {
                key: "e",
                header: "Expires",
                render: (r) => <span className="text-xs text-muted-foreground">{r.expires}</span>,
              },
              { key: "st", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
            ]}
          />
        </div>
      </DashboardLayout>
    );
  },
});
