import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout, PageHeader } from "@/components/layouts";
import { SideNav } from "@/components/side-nav";
import { settingsNav } from "@/components/nav-items";
import { Button } from "@/components/ui/button";
import { Github, Chrome, Slack } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/settings/connected")({
  head: () => ({
    meta: [
      { title: "Connected accounts — Settings — DevForge Hub" },
      { name: "description", content: "Link GitHub, Stripe, Slack, and other providers." },
      { property: "og:title", content: "Connected accounts" },
      { property: "og:description", content: "Manage connected accounts on DevForge Hub." },
    ],
  }),
  component: () => {
    const accounts = [
      { icon: Github, name: "GitHub", desc: "Sync repos and publish updates.", connected: true },
      { icon: Chrome, name: "Google", desc: "Sign in with Google.", connected: true },
      { icon: Slack, name: "Slack", desc: "Get notifications in Slack.", connected: false },
    ];
    return (
      <DashboardLayout side={<SideNav items={settingsNav} title="Settings" />}>
        <div className="p-6 md:p-8 max-w-[900px] space-y-6">
          <PageHeader
            title="Connected accounts"
            description="Link third-party services to your account."
          />
          <div className="card-elegant rounded-2xl divide-y divide-border/40">
            {accounts.map((a) => (
              <div key={a.name} className="p-5 flex items-center gap-4">
                <div className="size-10 rounded-lg bg-surface-2 grid place-items-center">
                  <a.icon className="size-5" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium">{a.name}</div>
                  <div className="text-xs text-muted-foreground">{a.desc}</div>
                </div>
                {a.connected ? (
                  <>
                    <Badge className="bg-success/20 text-success border-transparent">
                      Connected
                    </Badge>
                    <Button variant="ghost" size="sm">
                      Disconnect
                    </Button>
                  </>
                ) : (
                  <Button variant="outline" size="sm">
                    Connect
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </DashboardLayout>
    );
  },
});
