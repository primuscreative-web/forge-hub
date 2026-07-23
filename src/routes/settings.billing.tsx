import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout, PageHeader } from "@/components/layouts";
import { SideNav } from "@/components/side-nav";
import { settingsNav } from "@/components/nav-items";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard } from "lucide-react";

export const Route = createFileRoute("/settings/billing")({
  head: () => ({
    meta: [
      { title: "Billing — Settings — DevForge Hub" },
      { name: "description", content: "Payment methods, subscription tier, and invoices." },
      { property: "og:title", content: "Billing — Settings" },
      { property: "og:description", content: "Manage billing on DevForge Hub." },
    ],
  }),
  component: () => (
    <DashboardLayout side={<SideNav items={settingsNav} title="Settings" />}>
      <div className="p-6 md:p-8 max-w-[900px] space-y-6">
        <PageHeader title="Billing" description="Manage payment methods and invoices." />
        <div className="card-elegant rounded-2xl p-6 flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">
              Current plan
            </div>
            <div className="text-2xl font-semibold mt-1 gradient-text">Pro · $29/mo</div>
            <div className="text-xs text-muted-foreground mt-1">Renews Aug 15, 2026</div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Change plan</Button>
            <Button variant="ghost" className="text-destructive">
              Cancel
            </Button>
          </div>
        </div>
        <div className="card-elegant rounded-2xl p-6">
          <h3 className="text-sm font-semibold mb-4">Payment method</h3>
          <div className="flex items-center gap-3 rounded-xl border border-border/60 p-4">
            <div className="size-10 rounded-lg bg-surface-2 grid place-items-center">
              <CreditCard className="size-4" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium">Visa ending in 4242</div>
              <div className="text-xs text-muted-foreground">Expires 09/28</div>
            </div>
            <Badge variant="outline">Default</Badge>
          </div>
          <Button variant="outline" className="mt-3">
            Add payment method
          </Button>
        </div>
      </div>
    </DashboardLayout>
  ),
});
