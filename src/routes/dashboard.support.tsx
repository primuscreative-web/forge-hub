import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout, PageHeader } from "@/components/layouts";
import { SideNav } from "@/components/side-nav";
import { buyerNav } from "@/components/nav-items";
import { DataTable, StatusBadge } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/dashboard/support")({
  head: () => ({ meta: [
    { title: "Support — DevForge Hub" },
    { name: "description", content: "Open a support ticket or check the status of an existing request." },
    { property: "og:title", content: "Support — DevForge Hub" },
    { property: "og:description", content: "Open a support ticket on DevForge Hub." },
  ]}),
  component: () => {
    const rows = [
      { id: "TKT-2411", subject: "Cannot activate license on second machine", product: "Nexus Dashboard Pro", status: "Open", updated: "2h ago" },
      { id: "TKT-2402", subject: "Question about multi-tenant setup", product: "AuthForge", status: "Resolved", updated: "3d ago" },
      { id: "TKT-2388", subject: "Refund for duplicated purchase", product: "Cortex AI Agent Kit", status: "Resolved", updated: "1w ago" },
    ];
    return (
      <DashboardLayout side={<SideNav items={buyerNav} title="Personal" />}>
        <div className="p-6 md:p-8 max-w-[1100px]">
          <PageHeader title="Support tickets" description="3 tickets total · 1 open" actions={<Button className="gradient-brand text-white"><Plus className="size-4 mr-1.5" />New ticket</Button>} />
          <DataTable
            rows={rows}
            columns={[
              { key: "id", header: "Ticket", render: (r) => <code className="text-xs">{r.id}</code> },
              { key: "subject", header: "Subject", render: (r) => <span className="text-sm font-medium">{r.subject}</span> },
              { key: "product", header: "Product", render: (r) => <span className="text-sm text-muted-foreground">{r.product}</span> },
              { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
              { key: "updated", header: "Updated", render: (r) => <span className="text-xs text-muted-foreground">{r.updated}</span> },
            ]}
          />
        </div>
      </DashboardLayout>
    );
  },
});
