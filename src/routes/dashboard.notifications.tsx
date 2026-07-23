import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout, PageHeader } from "@/components/layouts";
import { SideNav } from "@/components/side-nav";
import { buyerNav } from "@/components/nav-items";
import { notifications } from "@/lib/mock-data";
import { Bell, DollarSign, MessageSquare, Star, UserPlus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/dashboard/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications — DevForge Hub" },
      {
        name: "description",
        content: "Sales, reviews, followers, updates, and system notifications.",
      },
      { property: "og:title", content: "Notifications — DevForge Hub" },
      { property: "og:description", content: "Sales, reviews, followers, and updates." },
    ],
  }),
  component: () => {
    const icon = (t: string) =>
      t === "sale"
        ? DollarSign
        : t === "review"
          ? Star
          : t === "follower"
            ? UserPlus
            : t === "message"
              ? MessageSquare
              : t === "update"
                ? Sparkles
                : Bell;
    return (
      <DashboardLayout side={<SideNav items={buyerNav} title="Personal" />}>
        <div className="p-6 md:p-8 max-w-[900px]">
          <PageHeader
            title="Notifications"
            description="3 unread · 24 total this week"
            actions={<Button variant="outline">Mark all as read</Button>}
          />
          <div className="card-elegant rounded-2xl divide-y divide-border/40">
            {notifications.map((n) => {
              const Icon = icon(n.type);
              return (
                <div
                  key={n.id}
                  className="p-4 flex items-start gap-3 hover:bg-accent/30 transition-colors"
                >
                  <div
                    className={`size-10 rounded-xl grid place-items-center ${n.unread ? "gradient-brand-soft" : "bg-surface-2"}`}
                  >
                    <Icon
                      className={`size-4 ${n.unread ? "text-primary" : "text-muted-foreground"}`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{n.title}</span>
                      {n.unread && <span className="size-1.5 rounded-full bg-brand-purple" />}
                    </div>
                    <div className="text-xs text-muted-foreground">{n.body}</div>
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0">{n.time}</span>
                </div>
              );
            })}
          </div>
        </div>
      </DashboardLayout>
    );
  },
});
