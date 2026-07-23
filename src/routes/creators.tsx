import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/layouts";
import { formatCompact } from "@/components/product-card";
import { useCatalogData } from "@/lib/catalog-data";
import { Star, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/creators")({
  head: () => ({
    meta: [
      { title: "Creators — DevForge Hub" },
      {
        name: "description",
        content:
          "Discover verified creators, agencies, and organizations building on DevForge Hub.",
      },
      { property: "og:title", content: "Creators — DevForge Hub" },
      {
        property: "og:description",
        content: "Discover verified creators building on DevForge Hub.",
      },
    ],
  }),
  component: CreatorsPage,
});

function CreatorsPage() {
  const { data, loading, error } = useCatalogData();
  const creators = data?.creators ?? [];

  return (
    <SiteLayout>
      <div className="mx-auto max-w-[1440px] px-4 md:px-6 py-10">
        <PageHeader title="Creators" description="World-class engineers, agencies and studios." />
        {loading ? (
          <div className="text-sm text-muted-foreground">Loading creators…</div>
        ) : error ? (
          <div className="rounded-xl border border-border/60 bg-surface-1 p-4 text-sm text-muted-foreground">
            {error}
          </div>
        ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {creators.map((c) => (
            <Link
              key={c.id}
              to="/creator/$handle"
              params={{ handle: c.handle }}
              className="card-elegant rounded-2xl p-6 hover-lift hover:[&]:hover-lift-active"
            >
              <div className="flex items-start gap-4">
                <div className="size-14 rounded-2xl gradient-brand grid place-items-center text-white font-semibold text-lg">
                  {c.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-medium truncate">{c.name}</span>
                    {c.verified && <ShieldCheck className="size-4 text-primary shrink-0" />}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    @{c.handle} · {c.location}
                  </div>
                </div>
              </div>
              <p className="mt-3 text-sm text-muted-foreground line-clamp-2">{c.bio}</p>
              <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                <span>
                  <b className="text-foreground">{formatCompact(c.followers)}</b> followers
                </span>
                <span>
                  <b className="text-foreground">{formatCompact(c.sales)}</b> sales
                </span>
                <span className="flex items-center gap-1">
                  <Star className="size-3 fill-warning text-warning" />
                  <b className="text-foreground">{c.rating}</b>
                </span>
              </div>
              {c.organization && (
                <Badge variant="outline" className="mt-3">
                  {c.organization}
                </Badge>
              )}
            </Link>
          ))}
        </div>
        )}
      </div>
    </SiteLayout>
  );
}
