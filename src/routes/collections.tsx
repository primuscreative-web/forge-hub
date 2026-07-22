import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/layouts";
import { products } from "@/lib/mock-data";
import { ProductCard } from "@/components/product-card";
import { Badge } from "@/components/ui/badge";

const m = (t: string, d: string) => ({ meta: [
  { title: `${t} — DevForge Hub` }, { name: "description", content: d },
  { property: "og:title", content: `${t} — DevForge Hub` }, { property: "og:description", content: d },
]});

export const Route = createFileRoute("/collections")({
  head: () => m("Collections", "Curated bundles and collections handpicked by top creators."),
  component: () => {
    const cols = [
      { name: "Launch-a-SaaS pack", desc: "Everything to launch a SaaS in a weekend.", items: [0, 1, 4, 10], tag: "Bundle · $299" },
      { name: "AI toolkit essentials", desc: "MCP servers, agents, prompts, and rules.", items: [2, 6, 7, 15], tag: "Bundle · $199" },
      { name: "Design system starter", desc: "UI kit, icons, and Figma library.", items: [3, 8, 19], tag: "Bundle · $149" },
      { name: "Cloud infra stack", desc: "K8s, Terraform, Cloudflare templates.", items: [9, 5, 27], tag: "Bundle · $349" },
    ];
    return (
      <SiteLayout>
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 py-10">
          <PageHeader title="Collections" description="Curated bundles from DevForge Hub creators." />
          <div className="grid gap-6 lg:grid-cols-2">
            {cols.map((c) => (
              <div key={c.name} className="card-elegant rounded-2xl overflow-hidden">
                <div className="grid grid-cols-4 gap-0.5 aspect-[16/6]">
                  {c.items.slice(0, 4).map((i) => <div key={i} className="grid place-items-center text-4xl" style={{ background: products[i].gradient }}>{products[i].emoji}</div>)}
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold">{c.name}</h3>
                      <p className="text-sm text-muted-foreground mt-0.5">{c.desc}</p>
                    </div>
                    <Badge className="gradient-brand text-white border-transparent shrink-0">{c.tag}</Badge>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2 mt-5">
                    {c.items.slice(0, 2).map((i) => <ProductCard key={i} product={products[i]} />)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SiteLayout>
    );
  },
});
