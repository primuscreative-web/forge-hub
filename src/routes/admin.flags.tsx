import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout, PageHeader } from "@/components/layouts";
import { SideNav } from "@/components/side-nav";
import { adminNav } from "@/components/nav-items";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/admin/flags")({
  head: () => ({
    meta: [
      { title: "Feature flags — Admin — DevForge Hub" },
      {
        name: "description",
        content: "Toggle features safely, target audiences, and roll out incrementally.",
      },
      { property: "og:title", content: "Feature flags — Admin" },
      { property: "og:description", content: "Toggle features safely." },
    ],
  }),
  component: () => {
    const flags = [
      {
        name: "ai-search",
        label: "AI search",
        desc: "Semantic search across products and docs.",
        on: true,
        rollout: 100,
      },
      {
        name: "beta-checkout",
        label: "Beta checkout",
        desc: "New Stripe Checkout flow with Apple Pay.",
        on: true,
        rollout: 25,
      },
      {
        name: "mcp-marketplace",
        label: "MCP marketplace",
        desc: "Dedicated section for MCP servers.",
        on: true,
        rollout: 100,
      },
      {
        name: "subscriptions-v2",
        label: "Subscriptions v2",
        desc: "New pricing model with annual billing.",
        on: false,
        rollout: 0,
      },
      {
        name: "creator-analytics-v3",
        label: "Analytics v3",
        desc: "Real-time creator analytics.",
        on: true,
        rollout: 60,
      },
    ];
    return (
      <DashboardLayout side={<SideNav items={adminNav} title="Admin" />}>
        <div className="p-6 md:p-8 max-w-[1000px]">
          <PageHeader
            title="Feature flags"
            description="Ship features safely with gradual rollout."
          />
          <div className="card-elegant rounded-2xl divide-y divide-border/40">
            {flags.map((f) => (
              <div key={f.name} className="p-5 flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{f.label}</span>
                    <code className="text-xs bg-surface-2 px-1.5 py-0.5 rounded">{f.name}</code>
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">{f.desc}</div>
                </div>
                <Badge variant="outline">{f.rollout}% rollout</Badge>
                <Switch defaultChecked={f.on} />
              </div>
            ))}
          </div>
        </div>
      </DashboardLayout>
    );
  },
});
