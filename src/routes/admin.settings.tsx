import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout, PageHeader } from "@/components/layouts";
import { SideNav } from "@/components/side-nav";
import { adminNav } from "@/components/nav-items";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

const m = (t: string, d: string) => ({ meta: [
  { title: `${t} — Admin — DevForge Hub` }, { name: "description", content: d },
  { property: "og:title", content: `${t} — Admin` }, { property: "og:description", content: d },
]});

export const Route = createFileRoute("/admin/settings")({
  head: () => m("System settings", "Platform configuration: fees, currency, integrations, email."),
  component: () => (
    <DashboardLayout side={<SideNav items={adminNav} title="Admin" />}>
      <div className="p-6 md:p-8 max-w-[900px]">
        <PageHeader title="System settings" description="Platform-wide configuration." actions={<Button className="gradient-brand text-white">Save changes</Button>} />
        <div className="card-elegant rounded-2xl divide-y divide-border/40">
          {[
            { title: "Platform fee", desc: "Percentage taken from each sale.", ctrl: <Input defaultValue="10%" className="w-24 bg-surface-1" /> },
            { title: "Payout schedule", desc: "How often creators are paid.", ctrl: <Input defaultValue="Monthly" className="w-40 bg-surface-1" /> },
            { title: "Default currency", desc: "Base currency for pricing.", ctrl: <Input defaultValue="USD" className="w-24 bg-surface-1" /> },
            { title: "Support email", desc: "Public support address.", ctrl: <Input defaultValue="support@devforge.hub" className="w-64 bg-surface-1" /> },
            { title: "Allow anonymous browsing", desc: "Let visitors browse without an account.", ctrl: <Switch defaultChecked /> },
            { title: "Maintenance mode", desc: "Temporarily disable the marketplace.", ctrl: <Switch /> },
          ].map((r, i) => (
            <div key={i} className="p-5 flex items-center gap-4">
              <div className="flex-1">
                <Label className="text-sm">{r.title}</Label>
                <p className="text-xs text-muted-foreground">{r.desc}</p>
              </div>
              {r.ctrl}
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  ),
});
