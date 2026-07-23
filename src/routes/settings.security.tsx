import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout, PageHeader } from "@/components/layouts";
import { SideNav } from "@/components/side-nav";
import { settingsNav } from "@/components/nav-items";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Smartphone, Laptop, LogOut } from "lucide-react";

export const Route = createFileRoute("/settings/security")({
  head: () => ({
    meta: [
      { title: "Security — Settings — DevForge Hub" },
      { name: "description", content: "Password, two-factor auth, active sessions, and devices." },
      { property: "og:title", content: "Security — Settings" },
      { property: "og:description", content: "Security settings and active sessions." },
    ],
  }),
  component: () => (
    <DashboardLayout side={<SideNav items={settingsNav} title="Settings" />}>
      <div className="p-6 md:p-8 max-w-[900px] space-y-6">
        <PageHeader title="Security" description="Keep your account safe." />
        <div className="card-elegant rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-semibold">Password</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Current password</Label>
              <Input type="password" className="bg-surface-1" />
            </div>
            <div className="space-y-1.5">
              <Label>New password</Label>
              <Input type="password" className="bg-surface-1" />
            </div>
          </div>
          <Button className="gradient-brand text-white">Update password</Button>
        </div>
        <div className="card-elegant rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <ShieldCheck className="size-4 text-success" />
                Two-factor authentication
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Add an extra layer of security with an authenticator app.
              </p>
            </div>
            <Badge className="bg-success/20 text-success border-transparent">Enabled</Badge>
          </div>
        </div>
        <div className="card-elegant rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-border/60">
            <h3 className="text-sm font-semibold">Active sessions</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Devices signed in to your account.
            </p>
          </div>
          <div className="divide-y divide-border/40">
            {[
              {
                icon: Laptop,
                name: "MacBook Pro · Chrome",
                where: "San Francisco, CA",
                when: "Now",
                current: true,
              },
              {
                icon: Smartphone,
                name: "iPhone 16 · Safari",
                where: "San Francisco, CA",
                when: "2 hours ago",
              },
              { icon: Laptop, name: "Linux · Firefox", where: "Berlin, DE", when: "3 days ago" },
            ].map((s, i) => (
              <div key={i} className="p-4 flex items-center gap-3">
                <div className="size-10 rounded-lg bg-surface-2 grid place-items-center text-muted-foreground">
                  <s.icon className="size-4" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium flex items-center gap-2">
                    {s.name}
                    {s.current && <Badge variant="outline">Current</Badge>}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {s.where} · {s.when}
                  </div>
                </div>
                {!s.current && (
                  <Button variant="ghost" size="sm">
                    <LogOut className="size-3.5 mr-1" />
                    Sign out
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  ),
});
