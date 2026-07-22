import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/layouts";
import { categories, categoryGroups, products } from "@/lib/mock-data";
import { formatCompact } from "@/components/product-card";
import { Layers } from "lucide-react";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "All categories — DevForge Hub" },
      { name: "description", content: "Explore 70+ categories: SaaS, boilerplates, UI kits, AI agents, MCP servers, infrastructure, and more." },
      { property: "og:title", content: "All categories — DevForge Hub" },
      { property: "og:description", content: "Explore 70+ categories: SaaS, boilerplates, UI kits, AI agents, and more." },
    ],
  }),
  component: CategoriesPage,
});

function CategoriesPage() {
  return (
    <SiteLayout>
      <div className="mx-auto max-w-[1440px] px-4 md:px-6 py-10">
        <PageHeader title="All categories" description={`${categories.length} categories · ${products.length}+ products`} />
        <div className="space-y-12">
          {categoryGroups.map((g) => {
            const items = categories.filter((c) => c.group === g);
            if (!items.length) return null;
            return (
              <div key={g}>
                <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">{g}</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {items.map((c) => (
                    <Link key={c.slug} to="/category/$slug" params={{ slug: c.slug }} className="card-elegant rounded-xl p-4 hover-lift hover:[&]:hover-lift-active">
                      <div className="size-9 rounded-lg gradient-brand-soft grid place-items-center mb-3">
                        <Layers className="size-4 text-primary" />
                      </div>
                      <div className="text-sm font-medium truncate">{c.name}</div>
                      <div className="text-xs text-muted-foreground">{formatCompact(c.count)} products</div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SiteLayout>
  );
}
