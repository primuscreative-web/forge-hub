import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/layouts";
import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/mock-data";
import { TrendingUp } from "lucide-react";

export const Route = createFileRoute("/trending")({
  head: () => ({
    meta: [
      { title: "Trending — DevForge Hub" },
      { name: "description", content: "What developers are downloading and buying right now." },
      { property: "og:title", content: "Trending — DevForge Hub" },
      { property: "og:description", content: "What developers are downloading right now." },
    ],
  }),
  component: () => {
    const trending = products.filter((p) => p.trending);
    return (
      <SiteLayout>
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 py-10">
          <PageHeader
            title="Trending right now"
            description="Updated hourly based on downloads, sales, and engagement."
            actions={<TrendingUp className="size-5 text-primary" />}
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {trending.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </SiteLayout>
    );
  },
});
