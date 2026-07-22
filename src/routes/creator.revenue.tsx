import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout, PageHeader, StatCard } from "@/components/layouts";
import { SideNav } from "@/components/side-nav";
import { creatorNav } from "@/components/nav-items";
import { RevenueChart } from "@/components/charts";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DollarSign, Download, Wallet, ArrowDownToLine } from "lucide-react";

export const Route = createFileRoute("/creator/revenue")({
  head: () => ({ meta: [
    { title: "Revenue & payouts — Creator — DevForge Hub" },
    { name: "description", content: "Track earnings, view payout history, and manage your payout methods." },
    { property: "og:title", content: "Revenue & payouts — Creator — DevForge Hub" },
    { property: "og:description", content: "Track earnings and manage payouts on DevForge Hub." },
  ]}),
  component: Revenue,
});

function Revenue() {
  const payouts = [
    { date: "2026-07-15", amount: 12480, method: "Stripe · **** 4242", status: "Paid" },
    { date: "2026-06-15", amount: 9840, method: "Stripe · **** 4242", status: "Paid" },
    { date: "2026-05-15", amount: 11240, method: "Stripe · **** 4242", status: "Paid" },
    { date: "2026-04-15", amount: 8920, method: "Wire transfer", status: "Paid" },
  ];
  return (
    <DashboardLayout side={<SideNav items={creatorNav} title="Creator" />}>
      <div className="p-6 md:p-8 max-w-[1400px]">
        <PageHeader
          title="Revenue & payouts"
          description="Track your earnings, payouts, and tax documents."
          actions={<Button className="gradient-brand text-white hover:opacity-90"><ArrowDownToLine className="size-4 mr-1.5" />Withdraw</Button>}
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
          <StatCard label="Available balance" value="$18,240.80" delta="Ready to withdraw" icon={<Wallet className="size-4" />} />
          <StatCard label="Pending" value="$4,120.00" delta="Clears in 3 days" icon={<DollarSign className="size-4" />} />
          <StatCard label="Lifetime earnings" value="$248,640" delta="+18% YoY" icon={<Download className="size-4" />} />
          <StatCard label="This month" value="$32,180" delta="+18.4%" icon={<DollarSign className="size-4" />} />
        </div>

        <div className="card-elegant rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium">Earnings trend</h3>
            <Badge variant="outline">Last 30 days</Badge>
          </div>
          <RevenueChart />
        </div>

        <div className="card-elegant rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-border/60 flex items-center justify-between">
            <h3 className="text-sm font-medium">Payout history</h3>
            <Button variant="outline" size="sm">Download tax documents</Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Date</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Invoice</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payouts.map((p) => (
                <TableRow key={p.date}>
                  <TableCell className="text-sm">{p.date}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{p.method}</TableCell>
                  <TableCell><Badge className="bg-success/20 text-success border-transparent">{p.status}</Badge></TableCell>
                  <TableCell className="text-right font-medium">${p.amount.toLocaleString()}.00</TableCell>
                  <TableCell className="text-right"><Button variant="ghost" size="sm">Download</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
}
