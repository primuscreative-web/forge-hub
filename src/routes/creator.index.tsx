import { createFileRoute, Link } from "@tanstack/react-router";
import { DashboardLayout, PageHeader, StatCard } from "@/components/layouts";
import { SideNav } from "@/components/side-nav";
import { creatorNav } from "@/components/nav-items";
import { RevenueChart, TrafficChart } from "@/components/charts";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { products } from "@/lib/mock-data";
import {
  DollarSign,
  ShoppingBag,
  Users,
  Eye,
  ArrowUpRight,
  TrendingUp,
  Star,
  Download,
} from "lucide-react";

export const Route = createFileRoute("/creator/")({
  head: () => ({
    meta: [
      { title: "Creator Dashboard — DevForge Hub" },
      {
        name: "description",
        content: "Track revenue, sales, followers, and analytics across all your products.",
      },
      { property: "og:title", content: "Creator Dashboard — DevForge Hub" },
      {
        property: "og:description",
        content: "Track revenue, sales, and analytics across all your products.",
      },
    ],
  }),
  component: CreatorDashboard,
});

function CreatorDashboard() {
  const topProducts = products.slice(0, 5);
  return (
    <DashboardLayout side={<SideNav items={creatorNav} title="Creator" />}>
      <div className="p-6 md:p-8 max-w-[1400px]">
        <PageHeader
          title="Good afternoon, Acme Labs"
          description="Here's what's happening across your 12 products."
          actions={
            <Button asChild className="gradient-brand text-white hover:opacity-90">
              <Link to="/publish">Publish new</Link>
            </Button>
          }
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Revenue (30d)"
            value="$48,240"
            delta="+18.4%"
            icon={<DollarSign className="size-4" />}
          />
          <StatCard
            label="Sales"
            value="1,284"
            delta="+12.2%"
            icon={<ShoppingBag className="size-4" />}
          />
          <StatCard
            label="Followers"
            value="24,802"
            delta="+4.8%"
            icon={<Users className="size-4" />}
          />
          <StatCard
            label="Visitors"
            value="82,140"
            delta="+9.1%"
            icon={<Eye className="size-4" />}
          />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="card-elegant rounded-2xl p-6 lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-medium">Revenue over time</h3>
                <p className="text-xs text-muted-foreground">Last 30 days</p>
              </div>
              <Badge variant="outline" className="text-success border-success/40">
                +18.4%
              </Badge>
            </div>
            <RevenueChart />
          </div>
          <div className="card-elegant rounded-2xl p-6">
            <div className="mb-4">
              <h3 className="text-sm font-medium">Traffic & conversions</h3>
              <p className="text-xs text-muted-foreground">Last 14 days</p>
            </div>
            <TrafficChart />
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="card-elegant rounded-2xl p-6 lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium">Top performing products</h3>
              <Link
                to="/creator/products"
                className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
              >
                View all <ArrowUpRight className="size-3" />
              </Link>
            </div>
            <div className="space-y-2">
              {topProducts.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/40 transition-colors"
                >
                  <div
                    className="size-10 rounded-lg grid place-items-center text-xl"
                    style={{ background: p.gradient }}
                  >
                    {p.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{p.name}</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Star className="size-3 fill-warning text-warning" />
                        {p.rating}
                      </span>
                      <span className="flex items-center gap-1">
                        <Download className="size-3" />
                        {p.downloads.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold">
                      ${((p.price * p.sales) / 30).toFixed(0)}
                    </div>
                    <div className="text-xs text-success flex items-center gap-1 justify-end">
                      <TrendingUp className="size-3" />
                      +12%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card-elegant rounded-2xl p-6">
            <h3 className="text-sm font-medium mb-4">Recent activity</h3>
            <div className="space-y-3">
              {[
                { t: "New sale on Nexus Dashboard Pro", s: "$149 · 2m ago", c: "text-success" },
                { t: "5★ review on AuthForge", s: "18m ago" },
                { t: "New follower: Kaito Rivera", s: "1h ago" },
                { t: "Cortex AI Agent v2.4.0 published", s: "3h ago" },
                { t: "Payout $12,480 processed", s: "1d ago", c: "text-info" },
              ].map((a, i) => (
                <div key={i} className="flex items-start gap-3 text-sm">
                  <div className={`size-2 mt-1.5 rounded-full ${a.c ?? "bg-muted-foreground"}`} />
                  <div className="flex-1 min-w-0">
                    <div className="truncate">{a.t}</div>
                    <div className="text-xs text-muted-foreground">{a.s}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
