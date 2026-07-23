import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/layouts";
import { ProductCard } from "@/components/product-card";
import { categories, products } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/category/$slug")({
  loader: ({ params }) => {
    const category = categories.find((c) => c.slug === params.slug);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData }) => {
    const name = loaderData?.category.name ?? "Category";
    return {
      meta: [
        { title: `${name} — DevForge Hub` },
        {
          name: "description",
          content: `Browse ${name} products on DevForge Hub. Discover the best tools built by top creators.`,
        },
        { property: "og:title", content: `${name} — DevForge Hub` },
        { property: "og:description", content: `Browse ${name} products on DevForge Hub.` },
      ],
    };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { category } = Route.useLoaderData();
  const items = products.filter((p) => p.category === category.slug);
  const related = categories
    .filter((c) => c.group === category.group && c.slug !== category.slug)
    .slice(0, 8);

  return (
    <SiteLayout>
      <div className="mx-auto max-w-[1440px] px-4 md:px-6 py-10">
        <div className="text-xs text-muted-foreground mb-3">
          <Link to="/categories" className="hover:text-foreground">
            Categories
          </Link>{" "}
          / <span className="text-foreground">{category.name}</span>
        </div>
        <PageHeader
          title={category.name}
          description={`${category.count.toLocaleString()} products in ${category.group}`}
        />

        {related.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-1.5">
            {related.map((r) => (
              <Link key={r.slug} to="/category/$slug" params={{ slug: r.slug }}>
                <Badge variant="outline" className="hover:border-primary/40 cursor-pointer">
                  {r.name}
                </Badge>
              </Link>
            ))}
          </div>
        )}

        {items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {items.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="card-elegant rounded-xl p-16 text-center">
            <div className="text-lg font-medium">No products in this category yet</div>
            <p className="text-sm text-muted-foreground mt-1">
              Be the first to publish.{" "}
              <Link to="/publish" className="text-primary hover:underline">
                Publish a product →
              </Link>
            </p>
          </div>
        )}
      </div>
    </SiteLayout>
  );
}
