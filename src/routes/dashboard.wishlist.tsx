import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout, PageHeader } from "@/components/layouts";
import { SideNav } from "@/components/side-nav";
import { buyerNav } from "@/components/nav-items";
import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/wishlist")({
  head: () => ({
    meta: [
      { title: "Wishlist — DevForge Hub" },
      { name: "description", content: "Products you love and plan to buy later." },
      { property: "og:title", content: "Wishlist — DevForge Hub" },
      { property: "og:description", content: "Products you love and plan to buy later." },
    ],
  }),
  component: () => (
    <DashboardLayout side={<SideNav items={buyerNav} title="Personal" />}>
      <div className="p-6 md:p-8 max-w-[1400px]">
        <PageHeader title="Wishlist" description="12 products saved for later" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.slice(8, 20).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  ),
});
