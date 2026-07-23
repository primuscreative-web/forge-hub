import { createFileRoute, Link } from "@tanstack/react-router";
import { DashboardLayout, PageHeader, StatCard, EmptyState } from "@/components/layouts";
import { SideNav } from "@/components/side-nav";
import { buyerNav } from "@/components/nav-items";
import { products } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, RefreshCw, ExternalLink, Package, Star, Bell } from "lucide-react";

export const Route = createFileRoute("/dashboard/")({
  head: () => ({
    meta: [
      { title: "My library — DevForge Hub" },
      {
        name: "description",
        content: "All the products you own, downloads, updates, and licenses in one place.",
      },
      { property: "og:title", content: "My library — DevForge Hub" },
      {
        property: "og:description",
        content: "All your purchased products, updates, and licenses.",
      },
    ],
  }),
  component: Library,
});

function Library() {
  const owned = products.slice(0, 8);
  return (
    <DashboardLayout side={<SideNav items={buyerNav} title="Personal" />}>
      <div className="p-6 md:p-8 max-w-[1400px]">
        <PageHeader
          title="Your library"
          description={`${owned.length} products owned · 3 have updates`}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <StatCard label="Products owned" value="18" icon={<Package className="size-4" />} />
          <StatCard label="Total downloads" value="42" icon={<Download className="size-4" />} />
          <StatCard label="Wishlist" value="12" icon={<Star className="size-4" />} />
          <StatCard label="Updates available" value="3" icon={<Bell className="size-4" />} />
        </div>

        {owned.length ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {owned.map((p, i) => (
              <div key={p.id} className="card-elegant rounded-2xl overflow-hidden">
                <div className="aspect-[16/10] relative" style={{ background: p.gradient }}>
                  <div className="absolute inset-0 grid-dots opacity-30" />
                  <div className="absolute inset-0 grid place-items-center text-5xl">{p.emoji}</div>
                  {i < 3 && (
                    <Badge className="absolute top-2 right-2 gradient-brand text-white border-transparent">
                      Update
                    </Badge>
                  )}
                </div>
                <div className="p-4">
                  <Link
                    to="/product/$slug"
                    params={{ slug: p.slug }}
                    className="text-sm font-medium hover:text-primary transition-colors line-clamp-1"
                  >
                    {p.name}
                  </Link>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    v{p.version} · Purchased Jul 12
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <Button size="sm" className="flex-1">
                      <Download className="size-3.5 mr-1.5" />
                      Download
                    </Button>
                    <Button size="sm" variant="outline" aria-label="Open">
                      <ExternalLink className="size-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<Package className="size-6" />}
            title="No products yet"
            description="Browse the marketplace to start your library."
            action={
              <Button asChild>
                <Link to="/marketplace">Browse marketplace</Link>
              </Button>
            }
          />
        )}
      </div>
    </DashboardLayout>
  );
}
