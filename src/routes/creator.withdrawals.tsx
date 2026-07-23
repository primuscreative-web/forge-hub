import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout, PageHeader, StatCard } from "@/components/layouts";
import { SideNav } from "@/components/side-nav";
import { creatorNav } from "@/components/nav-items";
import { Button } from "@/components/ui/button";
import { DataTable, StatusBadge } from "@/components/data-table";
import { Wallet, DollarSign, ArrowDownToLine } from "lucide-react";

export const Route = createFileRoute("/creator/withdrawals")({
  head: () => ({
    meta: [
      { title: "Withdrawals — Creator — DevForge Hub" },
      {
        name: "description",
        content: "Manage payout methods and withdraw your available balance instantly via Stripe.",
      },
      { property: "og:title", content: "Withdrawals — Creator — DevForge Hub" },
      {
        property: "og:description",
        content: "Manage payout methods and withdraw on DevForge Hub.",
      },
    ],
  }),
  component: () => {
    const rows = [
      { id: 1, date: "2026-07-15", method: "Stripe · **** 4242", amount: 12480, status: "Paid" },
      { id: 2, date: "2026-06-15", method: "Stripe · **** 4242", amount: 9840, status: "Paid" },
      { id: 3, date: "2026-05-15", method: "Stripe · **** 4242", amount: 11240, status: "Paid" },
      { id: 4, date: "2026-04-15", method: "Wire transfer", amount: 8920, status: "Paid" },
    ];
    return (
      <DashboardLayout side={<SideNav items={creatorNav} title="Creator" />}>
        <div className="p-6 md:p-8 max-w-[1400px]">
          <PageHeader
            title="Withdrawals"
            description="Manage payout methods and download reports."
            actions={
              <Button className="gradient-brand text-white hover:opacity-90">
                <ArrowDownToLine className="size-4 mr-1.5" />
                Withdraw $18,240.80
              </Button>
            }
          />
          <div className="grid gap-4 sm:grid-cols-3 mb-6">
            <StatCard
              label="Available balance"
              value="$18,240.80"
              icon={<Wallet className="size-4" />}
            />
            <StatCard
              label="Pending clearance"
              value="$4,120.00"
              icon={<DollarSign className="size-4" />}
            />
            <StatCard
              label="Payout method"
              value="Stripe · ****4242"
              icon={<DollarSign className="size-4" />}
            />
          </div>
          <DataTable
            rows={rows}
            columns={[
              {
                key: "date",
                header: "Date",
                render: (r) => <span className="text-sm">{r.date}</span>,
              },
              {
                key: "method",
                header: "Method",
                render: (r) => <span className="text-sm text-muted-foreground">{r.method}</span>,
              },
              {
                key: "amount",
                header: "Amount",
                render: (r) => (
                  <span className="text-sm font-medium">${r.amount.toLocaleString()}.00</span>
                ),
              },
              { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
            ]}
          />
        </div>
      </DashboardLayout>
    );
  },
});
