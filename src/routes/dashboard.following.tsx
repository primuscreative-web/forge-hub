import { createFileRoute, Link } from "@tanstack/react-router";
import { DashboardLayout, PageHeader } from "@/components/layouts";
import { SideNav } from "@/components/side-nav";
import { buyerNav } from "@/components/nav-items";
import { creators } from "@/lib/mock-data";
import { formatCompact } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/dashboard/following")({
  head: () => ({ meta: [
    { title: "Following — DevForge Hub" },
    { name: "description", content: "Creators and organizations you follow." },
    { property: "og:title", content: "Following — DevForge Hub" },
    { property: "og:description", content: "Creators and organizations you follow." },
  ]}),
  component: () => (
    <DashboardLayout side={<SideNav items={buyerNav} title="Personal" />}>
      <div className="p-6 md:p-8 max-w-[1200px]">
        <PageHeader title="Following" description={`Following ${creators.length} creators`} />
        <div className="grid gap-3 sm:grid-cols-2">
          {creators.map((c) => (
            <div key={c.id} className="card-elegant rounded-2xl p-5 flex items-center gap-3">
              <div className="size-11 rounded-xl gradient-brand grid place-items-center text-white font-semibold">{c.avatar}</div>
              <div className="flex-1 min-w-0">
                <Link to="/creator/$handle" params={{ handle: c.handle }} className="flex items-center gap-1.5 font-medium hover:text-primary">
                  {c.name}{c.verified && <ShieldCheck className="size-3.5 text-primary" />}
                </Link>
                <div className="text-xs text-muted-foreground">{formatCompact(c.followers)} followers</div>
              </div>
              <Button variant="outline" size="sm">Following</Button>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  ),
});
