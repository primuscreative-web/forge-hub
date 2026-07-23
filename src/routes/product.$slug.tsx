import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layouts";
import { CATALOG_API_BASE_URL, resolveProductPage } from "@/lib/catalog-api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ExternalLink } from "lucide-react";

export const Route = createFileRoute("/product/$slug")({
  loader: async ({ params }) => { const data = await resolveProductPage(CATALOG_API_BASE_URL, params.slug); if (!data.product || !data.creator) throw notFound(); return data; },
  component: ProductPage,
});

function ProductPage() {
  const data = Route.useLoaderData();
  const product = data.product!;
  const creator = data.creator!;
  const live = product as typeof product & { thumbnailUrl?: string; demoUrl?: string; repositoryUrl?: string; documentationUrl?: string; productType?: string };
  const freeAccess = product.free && live.demoUrl;
  return <SiteLayout><div className="mx-auto max-w-6xl px-4 md:px-6 py-10">
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <main><div className="aspect-[16/8] overflow-hidden rounded-3xl border bg-muted">{live.thumbnailUrl ? <img src={live.thumbnailUrl} alt="" className="h-full w-full object-cover" /> : <div className="h-full grid place-items-center text-7xl" style={{ background: product.gradient }}>{product.emoji}</div>}</div>
        <div className="mt-8 flex flex-wrap items-center gap-3"><Badge variant="outline">{product.category}</Badge>{live.productType && <Badge variant="secondary">{live.productType.replaceAll("_", " ")}</Badge>}<span className="text-xs text-muted-foreground">Version {product.version}</span></div>
        <h1 className="mt-4 text-3xl md:text-5xl font-semibold tracking-tight">{product.name}</h1><p className="mt-3 text-lg text-muted-foreground">{product.tagline}</p>
        <section className="mt-10 card-elegant rounded-2xl p-6"><h2 className="text-xl font-semibold">About this product</h2><p className="mt-4 whitespace-pre-wrap leading-7 text-muted-foreground">{product.description}</p></section>
        {(live.repositoryUrl || live.documentationUrl) && <section className="mt-6 flex flex-wrap gap-3">{live.repositoryUrl && <Button variant="outline" asChild><a href={live.repositoryUrl} target="_blank" rel="noreferrer">Repository <ExternalLink className="ml-2 size-4" /></a></Button>}{live.documentationUrl && <Button variant="outline" asChild><a href={live.documentationUrl} target="_blank" rel="noreferrer">Documentation <ExternalLink className="ml-2 size-4" /></a></Button>}</section>}
      </main>
      <aside className="space-y-5"><div className="card-elegant rounded-2xl p-6 sticky top-24"><div className="text-3xl font-semibold">{product.free ? "Free" : `$${product.price.toFixed(2)}`}</div><p className="mt-2 text-sm text-muted-foreground">{product.free ? "Available directly from the creator." : "Price shown for reference. Payments are not active yet."}</p>
        {freeAccess ? <Button asChild className="mt-5 w-full gradient-brand text-white"><a href={live.demoUrl} target="_blank" rel="noreferrer">Access product <ExternalLink className="ml-2 size-4" /></a></Button> : <Button className="mt-5 w-full" disabled>{product.free ? "Access link unavailable" : "Compra indisponível temporariamente"}</Button>}
      </div><Link to="/creator/$handle" params={{ handle: creator.handle }} className="card-elegant rounded-2xl p-5 flex items-center gap-3 hover:border-primary/40"><Avatar><AvatarFallback>{creator.avatar}</AvatarFallback></Avatar><div><p className="font-medium">{creator.name}</p><p className="text-xs text-muted-foreground">@{creator.handle}</p></div></Link></aside>
    </div>
  </div></SiteLayout>;
}
