import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout, PageHeader } from "@/components/layouts";
import { SideNav } from "@/components/side-nav";
import { adminNav } from "@/components/nav-items";
import { DataTable, UserCell, StatusBadge } from "@/components/data-table";
import { creators, reviews } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";

const m = (t: string, d: string) => ({ meta: [
  { title: `${t} — Admin — DevForge Hub` }, { name: "description", content: d },
  { property: "og:title", content: `${t} — Admin` }, { property: "og:description", content: d },
]});

export const Route = createFileRoute("/admin/reviews")({
  head: () => m("Reviews — Admin", "Moderate reviews across all products."),
  component: () => {
    const rows = reviews.map((r, i) => ({ id: i, author: r.author, init: r.avatar, product: "Nexus Dashboard Pro", rating: r.rating, body: r.body, status: (["Active","Under review"] as const)[i%2] }));
    return (
      <DashboardLayout side={<SideNav items={adminNav} title="Admin" />}>
        <div className="p-6 md:p-8 max-w-[1400px]">
          <PageHeader title="Reviews" description="Moderate reviews across all products." />
          <DataTable rows={rows} columns={[
            { key: "a", header: "Author", render: (r) => <UserCell name={r.author} initials={r.init} /> },
            { key: "p", header: "Product", render: (r) => <span className="text-sm">{r.product}</span> },
            { key: "r", header: "Rating", render: (r) => <Badge variant="outline">{r.rating}★</Badge> },
            { key: "b", header: "Review", render: (r) => <span className="text-sm text-muted-foreground line-clamp-1 max-w-md">{r.body}</span> },
            { key: "st", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
          ]} />
        </div>
      </DashboardLayout>
    );
  },
});
