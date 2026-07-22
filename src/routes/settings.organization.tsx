import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout, PageHeader } from "@/components/layouts";
import { SideNav } from "@/components/side-nav";
import { settingsNav } from "@/components/nav-items";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/settings/organization")({
  head: () => ({ meta: [
    { title: "Organization — Settings — DevForge Hub" },
    { name: "description", content: "Manage your organization, teams, and members." },
    { property: "og:title", content: "Organization — Settings" }, { property: "og:description", content: "Manage your organization on DevForge Hub." },
  ]}),
  component: () => (
    <DashboardLayout side={<SideNav items={settingsNav} title="Settings" />}>
      <div className="p-6 md:p-8 max-w-[900px] space-y-6">
        <PageHeader title="Organization" description="Manage teams and members." actions={<Button className="gradient-brand text-white"><Plus className="size-4 mr-1.5" />Invite member</Button>} />
        <div className="card-elegant rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-4">
            <div className="size-14 rounded-xl gradient-brand grid place-items-center text-white font-semibold">AL</div>
            <div><div className="text-sm font-medium">Acme Labs</div><div className="text-xs text-muted-foreground">acme-labs · Enterprise plan</div></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5"><Label>Organization name</Label><Input defaultValue="Acme Labs" className="bg-surface-1" /></div>
            <div className="space-y-1.5"><Label>Handle</Label><Input defaultValue="acme-labs" className="bg-surface-1 font-mono" /></div>
          </div>
        </div>
        <div className="card-elegant rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-border/60 text-sm font-semibold">Members · 8</div>
          <div className="divide-y divide-border/40">
            {[
              { n: "Alex Chen", e: "alex@acme.labs", init: "AC", role: "Owner" },
              { n: "Priya Sharma", e: "priya@acme.labs", init: "PS", role: "Admin" },
              { n: "Marcus Weber", e: "marcus@acme.labs", init: "MW", role: "Member" },
              { n: "Yuki Tanaka", e: "yuki@acme.labs", init: "YT", role: "Member" },
            ].map((m) => (
              <div key={m.e} className="p-4 flex items-center gap-3">
                <Avatar className="size-9"><AvatarFallback className="gradient-brand text-white text-xs">{m.init}</AvatarFallback></Avatar>
                <div className="flex-1"><div className="text-sm font-medium">{m.n}</div><div className="text-xs text-muted-foreground">{m.e}</div></div>
                <Badge variant="outline">{m.role}</Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  ),
});
