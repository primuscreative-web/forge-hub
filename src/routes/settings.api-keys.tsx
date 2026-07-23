import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout, PageHeader } from "@/components/layouts";
import { SideNav } from "@/components/side-nav";
import { settingsNav } from "@/components/nav-items";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { KeyRound, Copy, Plus, Trash2 } from "lucide-react";

export const Route = createFileRoute("/settings/api-keys")({
  head: () => ({
    meta: [
      { title: "API keys — Settings — DevForge Hub" },
      { name: "description", content: "Create and manage API keys for programmatic access." },
      { property: "og:title", content: "API keys — Settings" },
      { property: "og:description", content: "Manage API keys on DevForge Hub." },
    ],
  }),
  component: () => {
    const keys = [
      { name: "Production", key: "dfh_live_a4kL...9F31", created: "2026-01-14", used: "2 min ago" },
      { name: "Staging", key: "dfh_test_98Kz...M4K1", created: "2025-11-02", used: "1 day ago" },
      {
        name: "Local dev",
        key: "dfh_test_qWer...P28M",
        created: "2025-08-30",
        used: "3 weeks ago",
      },
    ];
    return (
      <DashboardLayout side={<SideNav items={settingsNav} title="Settings" />}>
        <div className="p-6 md:p-8 max-w-[900px] space-y-6">
          <PageHeader
            title="API keys"
            description="Use these keys to authenticate API requests."
            actions={
              <Button className="gradient-brand text-white">
                <Plus className="size-4 mr-1.5" />
                Create key
              </Button>
            }
          />
          <div className="card-elegant rounded-2xl divide-y divide-border/40">
            {keys.map((k) => (
              <div key={k.name} className="p-4 flex items-center gap-3">
                <div className="size-10 rounded-lg bg-surface-2 grid place-items-center">
                  <KeyRound className="size-4 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{k.name}</span>
                    {k.name === "Production" && (
                      <Badge className="bg-warning/20 text-warning border-transparent">Live</Badge>
                    )}
                  </div>
                  <code className="text-xs text-muted-foreground font-mono">{k.key}</code>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    Created {k.created} · Last used {k.used}
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <Copy className="size-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-destructive">
                  <Trash2 className="size-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </DashboardLayout>
    );
  },
});
