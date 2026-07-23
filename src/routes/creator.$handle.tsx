import { createFileRoute, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layouts";
import { CATALOG_API_BASE_URL, resolveCreatorPage } from "@/lib/catalog-api";
import { ProductCard } from "@/components/product-card";
import { MapPin } from "lucide-react";

export const Route = createFileRoute("/creator/$handle")({ loader: async ({ params }) => { const data = await resolveCreatorPage(CATALOG_API_BASE_URL, params.handle); if (!data.creator) throw notFound(); return { creator: data.creator, creatorProducts: data.products }; }, component: CreatorProfile });

function CreatorProfile() {
  const { creator, creatorProducts } = Route.useLoaderData();
  return <SiteLayout><div className="h-40 md:h-56 gradient-hero border-b" /><div className="mx-auto max-w-[1440px] px-4 md:px-6 -mt-16 md:-mt-20 pb-16">
    <div className="flex items-end gap-4"><div className="size-24 md:size-32 rounded-3xl gradient-brand grid place-items-center text-white text-3xl font-semibold ring-4 ring-background">{creator.avatar}</div><div className="pb-2"><h1 className="text-2xl md:text-3xl font-semibold">{creator.name}</h1><p className="text-sm text-muted-foreground">@{creator.handle}</p></div></div>
    <div className="mt-8 grid gap-8 lg:grid-cols-[300px_1fr]"><aside className="card-elegant rounded-2xl p-5 h-fit"><p className="text-sm leading-6 text-muted-foreground">{creator.bio}</p>{creator.organization && <p className="mt-4 text-sm font-medium">{creator.organization}</p>}{creator.location && <p className="mt-3 flex items-center gap-2 text-xs text-muted-foreground"><MapPin className="size-3.5" />{creator.location}</p>}</aside>
      <main><div className="mb-5"><h2 className="text-xl font-semibold">Published products</h2><p className="text-sm text-muted-foreground">{creatorProducts.length} {creatorProducts.length === 1 ? "product" : "products"}</p></div>{creatorProducts.length ? <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{creatorProducts.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <div className="card-elegant rounded-2xl py-16 text-center"><h3 className="font-medium">No published products yet</h3><p className="mt-2 text-sm text-muted-foreground">This creator is preparing their first release.</p></div>}</main>
    </div>
  </div></SiteLayout>;
}
