import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout, PageHeader, StatCard } from "@/components/layouts";
import { SideNav } from "@/components/side-nav";
import { creatorNav } from "@/components/nav-items";
import { RevenueChart, TrafficChart, CategoryPie, SalesBarChart } from "@/components/charts";
import { BarChart3, Eye, TrendingUp, Users } from "lucide-react";

export const Route = createFileRoute("/creator/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics — Creator — DevForge Hub" },
      {
        name: "description",
        content:
          "Deep analytics for your products: views, downloads, conversions, revenue, and customer segments.",
      },
      { property: "og:title", content: "Analytics — Creator — DevForge Hub" },
      { property: "og:description", content: "Deep analytics for your products on DevForge Hub." },
    ],
  }),
  component: Analytics,
});

function Analytics() {
  return (
    <DashboardLayout side={<SideNav items={creatorNav} title="Creator" />}>
      <div className="p-6 md:p-8 max-w-[1400px]">
        <PageHeader
          title="Analytics"
          description="Insights across all your products, updated in real-time."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
          <StatCard
            label="Total views"
            value="248,400"
            delta="+14.2%"
            icon={<Eye className="size-4" />}
          />
          <StatCard
            label="Unique visitors"
            value="82,140"
            delta="+8.6%"
            icon={<Users className="size-4" />}
          />
          <StatCard
            label="Conversion rate"
            value="4.8%"
            delta="+0.4pp"
            icon={<TrendingUp className="size-4" />}
          />
          <StatCard
            label="Avg. order value"
            value="$147"
            delta="+$12"
            icon={<BarChart3 className="size-4" />}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="card-elegant rounded-2xl p-6 lg:col-span-2">
            <h3 className="text-sm font-medium mb-1">Revenue</h3>
            <p className="text-xs text-muted-foreground mb-4">Last 30 days</p>
            <RevenueChart />
          </div>
          <div className="card-elegant rounded-2xl p-6">
            <h3 className="text-sm font-medium mb-1">Revenue by category</h3>
            <p className="text-xs text-muted-foreground mb-4">This month</p>
            <CategoryPie />
          </div>
          <div className="card-elegant rounded-2xl p-6 lg:col-span-2">
            <h3 className="text-sm font-medium mb-1">Sales by day</h3>
            <p className="text-xs text-muted-foreground mb-4">Last 12 days</p>
            <SalesBarChart />
          </div>
          <div className="card-elegant rounded-2xl p-6">
            <h3 className="text-sm font-medium mb-1">Traffic sources</h3>
            <p className="text-xs text-muted-foreground mb-4">Last 14 days</p>
            <TrafficChart />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
