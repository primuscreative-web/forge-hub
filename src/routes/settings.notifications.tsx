import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout, PageHeader } from "@/components/layouts";
import { SideNav } from "@/components/side-nav";
import { settingsNav } from "@/components/nav-items";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/settings/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications — Settings — DevForge Hub" },
      { name: "description", content: "Choose which emails and push notifications you receive." },
      { property: "og:title", content: "Notifications — Settings" },
      { property: "og:description", content: "Notification preferences." },
    ],
  }),
  component: () => (
    <DashboardLayout side={<SideNav items={settingsNav} title="Settings" />}>
      <div className="p-6 md:p-8 max-w-[800px] space-y-6">
        <PageHeader title="Notifications" description="Choose what you want to hear about." />
        <div className="card-elegant rounded-2xl divide-y divide-border/40">
          {[
            "New sales on my products",
            "New reviews",
            "New followers",
            "Product updates from creators I follow",
            "Weekly summary",
            "Marketing emails",
            "Security alerts",
            "Payout confirmations",
          ].map((n, i) => (
            <div key={n} className="p-5 flex items-center justify-between">
              <span className="text-sm">{n}</span>
              <Switch defaultChecked={i < 5} />
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  ),
});
