import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout, PageHeader } from "@/components/layouts";
import { SideNav } from "@/components/side-nav";
import { adminNav } from "@/components/nav-items";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/admin/audit")({
  head: () => ({
    meta: [
      { title: "Audit logs — Admin — DevForge Hub" },
      { name: "description", content: "Immutable log of every administrative action." },
      { property: "og:title", content: "Audit logs — Admin" },
      { property: "og:description", content: "Every administrative action is logged." },
    ],
  }),
  component: () => {
    const rows = Array.from({ length: 15 }).map((_, i) => ({
      time: `${(i % 12) + 1}:0${i % 10} PM`,
      actor: ["admin@devforge.hub", "moderator@devforge.hub"][i % 2],
      action: [
        "Approved product",
        "Suspended user",
        "Refunded order",
        "Verified creator",
        "Changed feature flag",
        "Removed review",
      ][i % 6],
      target: [
        "Nexus Dashboard Pro",
        "user@spam.com",
        "ORD-1042",
        "kaito-r",
        "beta-checkout",
        "Review #482",
      ][i % 6],
      ip: `192.168.${i % 5}.${i * 3}`,
    }));
    return (
      <DashboardLayout side={<SideNav items={adminNav} title="Admin" />}>
        <div className="p-6 md:p-8 max-w-[1400px]">
          <PageHeader title="Audit logs" description="Immutable trail of administrative activity" />
          <div className="card-elegant rounded-2xl divide-y divide-border/40 font-mono text-xs">
            {rows.map((r, i) => (
              <div
                key={i}
                className="p-3 grid grid-cols-[100px_180px_1fr_180px_100px] gap-3 items-center hover:bg-accent/30"
              >
                <span className="text-muted-foreground">{r.time}</span>
                <span>{r.actor}</span>
                <Badge variant="outline" className="w-fit font-normal">
                  {r.action}
                </Badge>
                <span className="text-muted-foreground truncate">{r.target}</span>
                <span className="text-muted-foreground">{r.ip}</span>
              </div>
            ))}
          </div>
        </div>
      </DashboardLayout>
    );
  },
});
