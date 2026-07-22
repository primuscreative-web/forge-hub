import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout, PageHeader } from "@/components/layouts";
import { SideNav } from "@/components/side-nav";
import { buyerNav } from "@/components/nav-items";
import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/bookmarks")({
  head: () => ({ meta: [
    { title: "Bookmarks — DevForge Hub" },
    { name: "description", content: "Bookmarked products, articles, and discussions." },
    { property: "og:title", content: "Bookmarks — DevForge Hub" },
    { property: "og:description", content: "Bookmarked products on DevForge Hub." },
  ]}),
  component: () => (
    <DashboardLayout side={<SideNav items={buyerNav} title="Personal" />}>
      <div className="p-6 md:p-8 max-w-[1400px]">
        <PageHeader title="Bookmarks" description="24 items bookmarked" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.slice(4, 16).map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </DashboardLayout>
  ),
});
