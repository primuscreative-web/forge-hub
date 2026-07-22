import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layouts";
import { creators, products } from "@/lib/mock-data";
import { ProductCard, formatCompact } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, ShieldCheck, MapPin, Calendar, MessageCircle, UserPlus, Share2 } from "lucide-react";

export const Route = createFileRoute("/creator/$handle")({
  loader: ({ params }) => {
    const creator = creators.find((c) => c.handle === params.handle);
    if (!creator) throw notFound();
    return { creator };
  },
  head: ({ loaderData }) => {
    const c = loaderData?.creator;
    if (!c) return { meta: [{ title: "Creator · DevForge Hub" }, { name: "robots", content: "noindex" }] };
    return {
      meta: [
        { title: `${c.name} — DevForge Hub` },
        { name: "description", content: c.bio },
        { property: "og:title", content: `${c.name} — DevForge Hub` },
        { property: "og:description", content: c.bio },
      ],
    };
  },
  component: CreatorProfile,
});

function CreatorProfile() {
  const { creator } = Route.useLoaderData();
  const creatorProducts = products.filter((p) => p.creator === creator.id);

  return (
    <SiteLayout>
      {/* Cover */}
      <div className="h-40 md:h-56 gradient-hero relative border-b border-border/60">
        <div className="absolute inset-0 grid-dots opacity-40" />
      </div>

      <div className="mx-auto max-w-[1440px] px-4 md:px-6 -mt-16 md:-mt-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex items-end gap-4">
            <div className="size-24 md:size-32 rounded-3xl gradient-brand grid place-items-center text-white text-3xl font-semibold ring-4 ring-background">{creator.avatar}</div>
            <div className="pb-2">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl md:text-3xl font-semibold">{creator.name}</h1>
                {creator.verified && <ShieldCheck className="size-5 text-primary" />}
              </div>
              <div className="text-sm text-muted-foreground">@{creator.handle}</div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 pb-2">
            <Button className="gradient-brand text-white hover:opacity-90"><UserPlus className="size-4 mr-1.5" />Follow</Button>
            <Button variant="outline"><MessageCircle className="size-4 mr-1.5" />Message</Button>
            <Button variant="outline" size="icon" aria-label="Share"><Share2 className="size-4" /></Button>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[320px_1fr]">
          <aside className="space-y-4">
            <div className="card-elegant rounded-2xl p-5 space-y-4">
              <p className="text-sm text-muted-foreground">{creator.bio}</p>
              <div className="space-y-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-2"><MapPin className="size-3.5" />{creator.location}</div>
                <div className="flex items-center gap-2"><Calendar className="size-3.5" />Joined {new Date(creator.joined).toLocaleDateString("en", { month: "long", year: "numeric" })}</div>
                {creator.organization && <div className="flex items-center gap-2"><Badge variant="outline">{creator.organization}</Badge></div>}
              </div>
            </div>
            <div className="card-elegant rounded-2xl p-5 grid grid-cols-2 gap-3 text-center">
              <Stat label="Products" value={String(creatorProducts.length)} />
              <Stat label="Sales" value={formatCompact(creator.sales)} />
              <Stat label="Followers" value={formatCompact(creator.followers)} />
              <Stat label="Rating" value={String(creator.rating)} icon={<Star className="size-3 fill-warning text-warning inline" />} />
            </div>
            <div className="card-elegant rounded-2xl p-5">
              <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Achievements</div>
              <div className="flex flex-wrap gap-1.5">
                <Badge variant="outline">🏆 Top 1% seller</Badge>
                <Badge variant="outline">✨ Verified</Badge>
                <Badge variant="outline">🎯 100+ products</Badge>
                <Badge variant="outline">💎 Trusted</Badge>
              </div>
            </div>
          </aside>

          <div>
            <Tabs defaultValue="products">
              <TabsList>
                <TabsTrigger value="products">Products ({creatorProducts.length})</TabsTrigger>
                <TabsTrigger value="collections">Collections</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>
              <TabsContent value="products" className="mt-6">
                {creatorProducts.length ? (
                  <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {creatorProducts.map((p) => <ProductCard key={p.id} product={p} />)}
                  </div>
                ) : (
                  <div className="card-elegant rounded-xl p-10 text-center text-sm text-muted-foreground">No products yet.</div>
                )}
              </TabsContent>
              <TabsContent value="collections" className="mt-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  {["Full-stack essentials", "SaaS starter pack", "AI toolkit"].map((c) => (
                    <div key={c} className="card-elegant rounded-2xl p-6">
                      <div className="text-sm font-medium">{c}</div>
                      <div className="text-xs text-muted-foreground mt-1">Curated by {creator.name}</div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="reviews" className="mt-6">
                <div className="card-elegant rounded-xl p-10 text-center text-sm text-muted-foreground">4.9 average across 3,240 reviews.</div>
              </TabsContent>
              <TabsContent value="activity" className="mt-6">
                <div className="space-y-2 text-sm">
                  {["Published Nexus Dashboard Pro v2.4.0", "Released Cortex AI Agent Kit", "Reached 24,800 followers", "Received 4.9★ average rating"].map((a, i) => (
                    <div key={i} className="flex items-center gap-3 card-elegant rounded-xl p-4">
                      <div className="size-2 rounded-full bg-primary" />
                      <span className="flex-1">{a}</span>
                      <span className="text-xs text-muted-foreground">{i + 1}d ago</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}

function Stat({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return (
    <div>
      <div className="text-lg font-semibold flex items-center justify-center gap-1">{icon}{value}</div>
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
    </div>
  );
}
