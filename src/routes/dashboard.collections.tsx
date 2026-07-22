import { createFileRoute, Link } from "@tanstack/react-router";
import { DashboardLayout, PageHeader } from "@/components/layouts";
import { SideNav } from "@/components/side-nav";
import { buyerNav } from "@/components/nav-items";
import { products } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/dashboard/collections")({
  head: () => ({ meta: [
    { title: "Collections — DevForge Hub" },
    { name: "description", content: "Curate collections of your favorite products, publicly or privately." },
    { property: "og:title", content: "Collections — DevForge Hub" },
    { property: "og:description", content: "Curate collections of your favorite products." },
  ]}),
  component: () => {
    const collections = [
      { name: "SaaS starter pack", desc: "Everything for launching a SaaS in a weekend.", items: 6, cover: [0, 4, 3] },
      { name: "AI toolkit", desc: "MCP servers, prompts, agent frameworks.", items: 8, cover: [2, 7, 15] },
      { name: "Design essentials", desc: "UI kits, icons, Figma resources.", items: 5, cover: [3, 8, 19] },
      { name: "Cloud infra", desc: "Terraform, K8s, Cloudflare setups.", items: 4, cover: [9, 27, 5] },
    ];
    return (
      <DashboardLayout side={<SideNav items={buyerNav} title="Personal" />}>
        <div className="p-6 md:p-8 max-w-[1200px]">
          <PageHeader title="Collections" description="Organize your favorite products into curated sets." actions={<Button className="gradient-brand text-white"><Plus className="size-4 mr-1.5" />New collection</Button>} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {collections.map((c) => (
              <Link key={c.name} to="/collections" className="card-elegant rounded-2xl overflow-hidden hover-lift hover:[&]:hover-lift-active">
                <div className="grid grid-cols-3 gap-0.5 aspect-[16/9]">
                  {c.cover.map((i) => (
                    <div key={i} className="grid place-items-center text-3xl" style={{ background: products[i].gradient }}>{products[i].emoji}</div>
                  ))}
                </div>
                <div className="p-4">
                  <div className="text-sm font-medium">{c.name}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{c.desc}</div>
                  <div className="text-xs text-muted-foreground mt-2">{c.items} products</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </DashboardLayout>
    );
  },
});
