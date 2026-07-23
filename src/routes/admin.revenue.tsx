import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout, PageHeader, StatCard } from "@/components/layouts";
import { SideNav } from "@/components/side-nav";
import { adminNav } from "@/components/nav-items";
import { RevenueChart, SalesBarChart, CategoryPie } from "@/components/charts";
import { DollarSign, TrendingUp, Users, ShoppingBag } from "lucide-react";

const meta = (title: string, desc: string) => ({
  meta: [
    { title: `${title} — Admin — DevForge Hub` },
    { name: "description", content: desc },
    { property: "og:title", content: `${title} — Admin` },
    { property: "og:description", content: desc },
  ],
});

export const Route = createFileRoute("/admin/revenue")({
  head: () => meta("Revenue", "Platform-wide revenue, MRR, and payout analytics."),
  component: () => (
    <DashboardLayout side={<SideNav items={adminNav} title="Admin" />}>
      <div className="p-6 md:p-8 max-w-[1400px]">
        <PageHeader title="Revenue" description="Platform-wide financial performance." />
        <div className="grid gap-4 sm:grid-cols-4 mb-6">
          <StatCard
            label="MRR"
            value="$1.24M"
            delta="+8.2%"
            icon={<DollarSign className="size-4" />}
          />
          <StatCard
            label="ARR"
            value="$14.9M"
            delta="+22%"
            icon={<TrendingUp className="size-4" />}
          />
          <StatCard
            label="Paying customers"
            value="18,420"
            delta="+4.8%"
            icon={<Users className="size-4" />}
          />
          <StatCard
            label="Orders (30d)"
            value="42,180"
            delta="+9.4%"
            icon={<ShoppingBag className="size-4" />}
          />
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="card-elegant rounded-2xl p-6 lg:col-span-2">
            <h3 className="text-sm font-medium mb-4">Revenue trend</h3>
            <RevenueChart />
          </div>
          <div className="card-elegant rounded-2xl p-6">
            <h3 className="text-sm font-medium mb-4">Category mix</h3>
            <CategoryPie />
          </div>
          <div className="card-elegant rounded-2xl p-6 lg:col-span-3">
            <h3 className="text-sm font-medium mb-4">Sales by day</h3>
            <SalesBarChart />
          </div>
        </div>
      </div>
    </DashboardLayout>
  ),
});
