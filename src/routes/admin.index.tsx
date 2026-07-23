import { createFileRoute, Link } from "@tanstack/react-router";
import { DashboardLayout, PageHeader, StatCard } from "@/components/layouts";
import { SideNav } from "@/components/side-nav";
import { adminNav } from "@/components/nav-items";
import { RevenueChart, TrafficChart, CategoryPie } from "@/components/charts";
import {
  DollarSign,
  Users,
  ShoppingBag,
  Package,
  ShieldAlert,
  MessageSquare,
  Activity,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "Admin — DevForge Hub" },
      { name: "description", content: "System overview: users, revenue, moderation, health." },
      { property: "og:title", content: "Admin — DevForge Hub" },
      { property: "og:description", content: "System overview for DevForge Hub administrators." },
    ],
  }),
  component: () => (
    <DashboardLayout side={<SideNav items={adminNav} title="Admin" />}>
      <div className="p-6 md:p-8 max-w-[1400px]">
        <PageHeader title="Admin dashboard" description="Platform-wide overview and health." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
          <StatCard
            label="MRR"
            value="$1.24M"
            delta="+8.2%"
            icon={<DollarSign className="size-4" />}
          />
          <StatCard
            label="Active users"
            value="248,400"
            delta="+12.1%"
            icon={<Users className="size-4" />}
          />
          <StatCard
            label="Orders (30d)"
            value="42,180"
            delta="+9.4%"
            icon={<ShoppingBag className="size-4" />}
          />
          <StatCard
            label="Products"
            value="12,480"
            delta="+184 new"
            icon={<Package className="size-4" />}
          />
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="card-elegant rounded-2xl p-6 lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium">Platform revenue</h3>
              <Badge variant="outline">Last 30 days</Badge>
            </div>
            <RevenueChart />
          </div>
          <div className="card-elegant rounded-2xl p-6">
            <h3 className="text-sm font-medium mb-4">Category mix</h3>
            <CategoryPie />
          </div>
          <div className="card-elegant rounded-2xl p-6 lg:col-span-2">
            <h3 className="text-sm font-medium mb-4">Traffic</h3>
            <TrafficChart />
          </div>
          <div className="card-elegant rounded-2xl p-6 space-y-3">
            <h3 className="text-sm font-medium">Needs attention</h3>
            <QuickLink
              to="/admin/moderation"
              icon={<ShieldAlert className="size-4" />}
              label="Moderation queue"
              value="12"
            />
            <QuickLink
              to="/admin/tickets"
              icon={<MessageSquare className="size-4" />}
              label="Support tickets"
              value="24 open"
            />
            <QuickLink
              to="/admin/reports"
              icon={<Activity className="size-4" />}
              label="User reports"
              value="8"
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  ),
});

function QuickLink({
  to,
  icon,
  label,
  value,
}: {
  to: string;
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/40 transition-colors"
    >
      <div className="size-8 rounded-lg bg-surface-2 grid place-items-center text-muted-foreground">
        {icon}
      </div>
      <span className="flex-1 text-sm">{label}</span>
      <Badge className="gradient-brand text-white border-transparent">{value}</Badge>
    </Link>
  );
}
