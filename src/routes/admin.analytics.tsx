import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout, PageHeader, StatCard } from "@/components/layouts";
import { SideNav } from "@/components/side-nav";
import { adminNav } from "@/components/nav-items";
import { RevenueChart, TrafficChart, CategoryPie, SalesBarChart } from "@/components/charts";
import { Users, Eye, TrendingUp, DollarSign } from "lucide-react";

const m = (t: string, d: string) => ({
  meta: [
    { title: `${t} — Admin — DevForge Hub` },
    { name: "description", content: d },
    { property: "og:title", content: `${t} — Admin` },
    { property: "og:description", content: d },
  ],
});

export const Route = createFileRoute("/admin/analytics")({
  head: () => m("Analytics", "Platform-wide analytics: traffic, conversion, engagement."),
  component: () => (
    <DashboardLayout side={<SideNav items={adminNav} title="Admin" />}>
      <div className="p-6 md:p-8 max-w-[1400px]">
        <PageHeader
          title="Analytics"
          description="Platform-wide traffic, engagement, and conversion."
        />
        <div className="grid gap-4 sm:grid-cols-4 mb-6">
          <StatCard
            label="Visitors"
            value="1.24M"
            delta="+14%"
            icon={<Users className="size-4" />}
          />
          <StatCard label="Pageviews" value="8.42M" delta="+9%" icon={<Eye className="size-4" />} />
          <StatCard
            label="Conversion"
            value="3.8%"
            delta="+0.4pp"
            icon={<TrendingUp className="size-4" />}
          />
          <StatCard label="AOV" value="$142" delta="+$8" icon={<DollarSign className="size-4" />} />
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="card-elegant rounded-2xl p-6 lg:col-span-2">
            <h3 className="text-sm font-medium mb-4">Revenue</h3>
            <RevenueChart />
          </div>
          <div className="card-elegant rounded-2xl p-6">
            <h3 className="text-sm font-medium mb-4">Categories</h3>
            <CategoryPie />
          </div>
          <div className="card-elegant rounded-2xl p-6">
            <h3 className="text-sm font-medium mb-4">Traffic</h3>
            <TrafficChart />
          </div>
          <div className="card-elegant rounded-2xl p-6 lg:col-span-2">
            <h3 className="text-sm font-medium mb-4">Sales</h3>
            <SalesBarChart />
          </div>
        </div>
      </div>
    </DashboardLayout>
  ),
});
