import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout, PageHeader } from "@/components/layouts";
import { SideNav } from "@/components/side-nav";
import { adminNav } from "@/components/nav-items";
import { categories } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/admin/categories")({
  head: () => ({ meta: [
    { title: "Categories — Admin — DevForge Hub" },
    { name: "description", content: "Manage the platform-wide category tree." },
    { property: "og:title", content: "Categories — Admin" },
    { property: "og:description", content: "Manage categories on DevForge Hub." },
  ]}),
  component: () => (
    <DashboardLayout side={<SideNav items={adminNav} title="Admin" />}>
      <div className="p-6 md:p-8 max-w-[1400px]">
        <PageHeader title="Categories" description={`${categories.length} categories`} actions={<Button className="gradient-brand text-white"><Plus className="size-4 mr-1.5" />New category</Button>} />
        <div className="card-elegant rounded-2xl divide-y divide-border/40">
          {categories.map((c) => (
            <div key={c.slug} className="p-4 flex items-center gap-4 hover:bg-accent/30">
              <div className="text-sm font-medium flex-1">{c.name}</div>
              <div className="text-xs text-muted-foreground w-40">{c.group}</div>
              <div className="text-xs text-muted-foreground w-20 text-right">{c.count}</div>
              <Button variant="ghost" size="sm">Edit</Button>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  ),
});
