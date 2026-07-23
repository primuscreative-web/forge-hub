import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/layouts";
import { creators } from "@/lib/mock-data";
import { formatCompact } from "@/components/product-card";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/organizations")({
  head: () => ({
    meta: [
      { title: "Organizations — DevForge Hub" },
      {
        name: "description",
        content: "Agencies, studios, and companies publishing on DevForge Hub.",
      },
      { property: "og:title", content: "Organizations — DevForge Hub" },
      { property: "og:description", content: "Agencies and studios on DevForge Hub." },
    ],
  }),
  component: () => {
    const orgs = creators.filter((c) => c.organization);
    return (
      <SiteLayout>
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 py-10">
          <PageHeader
            title="Organizations"
            description={`${orgs.length} verified organizations building on DevForge.`}
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {orgs.map((o) => (
              <Link
                key={o.id}
                to="/creator/$handle"
                params={{ handle: o.handle }}
                className="card-elegant rounded-2xl p-6 hover-lift hover:[&]:hover-lift-active"
              >
                <div className="flex items-start gap-4">
                  <div className="size-14 rounded-2xl gradient-brand grid place-items-center text-white text-lg font-semibold">
                    {o.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-medium truncate">{o.organization}</span>
                      {o.verified && <ShieldCheck className="size-4 text-primary shrink-0" />}
                    </div>
                    <div className="text-xs text-muted-foreground">{o.location}</div>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{o.bio}</p>
                    <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{formatCompact(o.followers)} followers</span>
                      <span>·</span>
                      <span>{formatCompact(o.sales)} sales</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </SiteLayout>
    );
  },
});
