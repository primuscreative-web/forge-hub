import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout, PageHeader } from "@/components/layouts";
import { SideNav } from "@/components/side-nav";
import { adminNav } from "@/components/nav-items";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { products } from "@/lib/mock-data";
import { ShieldAlert, Check, X } from "lucide-react";

export const Route = createFileRoute("/admin/moderation")({
  head: () => ({
    meta: [
      { title: "Moderation queue — Admin — DevForge Hub" },
      {
        name: "description",
        content: "Approve or reject pending products, reviews, and creator applications.",
      },
      { property: "og:title", content: "Moderation — Admin" },
      { property: "og:description", content: "Approve or reject content submitted for review." },
    ],
  }),
  component: () => {
    const items = products.slice(0, 6);
    return (
      <DashboardLayout side={<SideNav items={adminNav} title="Admin" />}>
        <div className="p-6 md:p-8 max-w-[1200px]">
          <PageHeader title="Moderation queue" description="12 items awaiting review" />
          <div className="space-y-3">
            {items.map((p) => (
              <div key={p.id} className="card-elegant rounded-2xl p-5 flex items-center gap-4">
                <div
                  className="size-12 rounded-lg grid place-items-center text-2xl"
                  style={{ background: p.gradient }}
                >
                  {p.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{p.name}</span>
                    <Badge variant="outline">Pending review</Badge>
                  </div>
                  <div className="text-xs text-muted-foreground truncate">{p.tagline}</div>
                  <div className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
                    <ShieldAlert className="size-3" />
                    Submitted 2 hours ago
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <X className="size-3.5 mr-1" />
                    Reject
                  </Button>
                  <Button size="sm" className="gradient-brand text-white">
                    <Check className="size-3.5 mr-1" />
                    Approve
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DashboardLayout>
    );
  },
});
