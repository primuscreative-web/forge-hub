import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layouts";
import { products, getProduct, getCreator, reviews, changelog, faqs } from "@/lib/mock-data";
import { ProductCard, formatCompact } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Star,
  Download,
  Eye,
  Bookmark,
  Heart,
  Share2,
  ShieldCheck,
  ChevronRight,
  FileCode,
  Terminal,
  Package,
  GitBranch,
  Check,
  ShoppingCart,
  Play,
  ArrowRight,
  MessageSquare,
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    if (!p)
      return {
        meta: [{ title: "Product · DevForge Hub" }, { name: "robots", content: "noindex" }],
      };
    return {
      meta: [
        { title: `${p.name} — DevForge Hub` },
        { name: "description", content: p.tagline },
        { property: "og:title", content: `${p.name} — DevForge Hub` },
        { property: "og:description", content: p.tagline },
        { name: "twitter:title", content: `${p.name} — DevForge Hub` },
        { name: "twitter:description", content: p.tagline },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const creator = getCreator(product.creator);
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
  const [tier, setTier] = useState<"personal" | "commercial" | "enterprise">("commercial");

  const pricing = {
    personal: {
      name: "Personal",
      price: product.free ? 0 : Math.round(product.price * 0.5),
      features: ["1 developer", "Personal projects", "Community support", "12mo updates"],
    },
    commercial: {
      name: "Commercial",
      price: product.price,
      features: [
        "Unlimited devs",
        "Client projects",
        "Priority support",
        "12mo updates",
        "Source code",
      ],
    },
    enterprise: {
      name: "Enterprise",
      price: Math.round(product.price * 3),
      features: [
        "Unlimited projects",
        "Dedicated support",
        "Private Slack",
        "Lifetime updates",
        "Custom license",
      ],
    },
  };

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative border-b border-border/60 overflow-hidden">
        <div className="absolute inset-0 opacity-30" style={{ background: product.gradient }} />
        <div className="absolute inset-0 gradient-hero opacity-60" />
        <div className="relative mx-auto max-w-[1440px] px-4 md:px-6 py-10">
          <div className="text-xs text-muted-foreground mb-3 flex items-center gap-1.5">
            <Link to="/marketplace" className="hover:text-foreground">
              Marketplace
            </Link>
            <ChevronRight className="size-3" />
            <Link
              to="/category/$slug"
              params={{ slug: product.category }}
              className="hover:text-foreground"
            >
              {product.category}
            </Link>
            <ChevronRight className="size-3" />
            <span className="text-foreground">{product.name}</span>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_auto] items-start">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {product.trending && (
                  <Badge className="gradient-brand text-white border-transparent">Trending</Badge>
                )}
                {product.new && <Badge variant="outline">New</Badge>}
                {product.enterprise && <Badge variant="outline">Enterprise ready</Badge>}
                <Badge variant="outline">v{product.version}</Badge>
              </div>
              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">{product.name}</h1>
              <p className="mt-3 text-lg text-muted-foreground max-w-2xl">{product.tagline}</p>
              <div className="mt-5 flex flex-wrap items-center gap-5 text-sm">
                <Link
                  to="/creator/$handle"
                  params={{ handle: creator.handle }}
                  className="flex items-center gap-2 group"
                >
                  <div className="size-8 rounded-full gradient-brand grid place-items-center text-xs font-semibold text-white">
                    {creator.avatar}
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-medium group-hover:text-primary">{creator.name}</span>
                    {creator.verified && <ShieldCheck className="size-3.5 text-primary" />}
                  </div>
                </Link>
                <span className="text-muted-foreground">·</span>
                <div className="flex items-center gap-1 text-sm">
                  <Star className="size-4 fill-warning text-warning" />
                  {product.rating}{" "}
                  <span className="text-muted-foreground">({product.reviews})</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Download className="size-4" />
                  {formatCompact(product.downloads)}
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Eye className="size-4" />
                  {formatCompact(product.views)}
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm">
                <Heart className="size-4 mr-1.5" />
                Wishlist
              </Button>
              <Button variant="outline" size="sm">
                <Bookmark className="size-4 mr-1.5" />
                Save
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="size-4 mr-1.5" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1440px] px-4 md:px-6 py-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="min-w-0 space-y-8">
            {/* Gallery */}
            <div className="card-elegant rounded-2xl overflow-hidden">
              <div className="aspect-[16/9] relative" style={{ background: product.gradient }}>
                <div className="absolute inset-0 grid-dots opacity-30" />
                <div className="absolute inset-0 grid place-items-center text-[10rem]">
                  {product.emoji}
                </div>
                <button className="absolute inset-0 grid place-items-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity">
                  <div className="size-16 rounded-full glass-strong grid place-items-center">
                    <Play className="size-6 text-white fill-white ml-1" />
                  </div>
                </button>
              </div>
              <div className="grid grid-cols-5 gap-1 p-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-video rounded-lg cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
                    style={{ background: product.gradient, filter: `hue-rotate(${i * 30}deg)` }}
                  />
                ))}
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="overview">
              <TabsList className="w-full justify-start overflow-x-auto">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="docs">Documentation</TabsTrigger>
                <TabsTrigger value="reviews">Reviews ({product.reviews})</TabsTrigger>
                <TabsTrigger value="changelog">Changelog</TabsTrigger>
                <TabsTrigger value="faq">FAQ</TabsTrigger>
                <TabsTrigger value="discussions">Discussions</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-8 mt-6">
                <div className="prose prose-invert max-w-none">
                  <h2 className="text-xl font-semibold">About this product</h2>
                  <p className="text-muted-foreground leading-relaxed">{product.description}</p>
                  <p className="text-muted-foreground leading-relaxed">
                    Ship your next product in days, not months. Every module has been reviewed by
                    senior engineers, tested at scale, and ships with production-grade code you can
                    inspect line-by-line.
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold mb-3">What's included</h3>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {[
                      "Source code with commented modules",
                      "Comprehensive documentation site",
                      "Video walkthroughs",
                      "Storybook component gallery",
                      "CI/CD templates (GitHub Actions)",
                      "Docker + Docker Compose",
                      "Postman collection & OpenAPI spec",
                      "Priority support (Commercial+)",
                    ].map((f) => (
                      <div key={f} className="flex items-start gap-2 text-sm">
                        <Check className="size-4 text-success mt-0.5" />
                        {f}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold mb-3">Tech stack</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {product.tech.map((t: string) => (
                      <Badge key={t} variant="outline" className="font-mono text-xs">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold mb-3">File tree preview</h3>
                  <div className="rounded-xl bg-surface-1 border border-border/60 p-4 font-mono text-xs text-muted-foreground">
                    {[
                      "📦 nexus-dashboard-pro",
                      " ├─ 📁 apps/",
                      " │   ├─ 📁 web/         # Next.js app router",
                      " │   ├─ 📁 admin/       # Admin panel",
                      " │   └─ 📁 api/         # tRPC API",
                      " ├─ 📁 packages/",
                      " │   ├─ 📁 ui/          # 180+ components",
                      " │   ├─ 📁 db/          # Prisma schema",
                      " │   └─ 📁 auth/        # Multi-tenant auth",
                      " ├─ 📁 docs/            # MDX documentation",
                      " ├─ 📄 docker-compose.yml",
                      " └─ 📄 README.md",
                    ].map((l, i) => (
                      <div key={i} className="whitespace-pre">
                        {l}
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="docs" className="mt-6 space-y-4">
                <div className="card-elegant rounded-xl p-6">
                  <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                    <Terminal className="size-4" />
                    Installation
                  </h3>
                  <div className="rounded-lg bg-black/40 border border-border/60 p-4 font-mono text-xs space-y-1">
                    <div>
                      <span className="text-muted-foreground">$</span> npx create-devforge{" "}
                      {product.slug}
                    </div>
                    <div>
                      <span className="text-muted-foreground">$</span> cd {product.slug}
                    </div>
                    <div>
                      <span className="text-muted-foreground">$</span> pnpm install && pnpm dev
                    </div>
                  </div>
                </div>
                <div className="card-elegant rounded-xl p-6">
                  <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                    <Package className="size-4" />
                    Requirements
                  </h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>· Node.js 20+ or Bun 1.1+</li>
                    <li>· PostgreSQL 15+ (or Neon/Supabase)</li>
                    <li>· Redis 7+ (optional, for caching)</li>
                  </ul>
                </div>
                <div className="card-elegant rounded-xl p-6">
                  <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                    <FileCode className="size-4" />
                    Dependencies
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-1.5 text-xs font-mono text-muted-foreground">
                    {[
                      "next@15.0",
                      "react@19.0",
                      "tailwindcss@4.0",
                      "@tanstack/react-query@5",
                      "zod@4.0",
                      "prisma@6.0",
                      "next-auth@5.0",
                      "stripe@18.0",
                    ].map((d) => (
                      <div key={d}>{d}</div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6 space-y-6">
                <div className="grid sm:grid-cols-[220px_1fr] gap-6 card-elegant rounded-xl p-6">
                  <div className="text-center border-r border-border/60 pr-6">
                    <div className="text-5xl font-semibold">{product.rating}</div>
                    <div className="flex items-center justify-center gap-0.5 mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`size-4 ${i < Math.round(product.rating) ? "fill-warning text-warning" : "text-muted-foreground/40"}`}
                        />
                      ))}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {product.reviews} reviews
                    </div>
                  </div>
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((s) => (
                      <div key={s} className="flex items-center gap-3 text-xs">
                        <span className="w-3 text-muted-foreground">{s}</span>
                        <Progress value={s === 5 ? 82 : s === 4 ? 14 : 2} className="flex-1" />
                        <span className="w-8 text-muted-foreground text-right">
                          {s === 5 ? 82 : s === 4 ? 14 : 2}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  {reviews.map((r) => (
                    <div key={r.id} className="card-elegant rounded-xl p-5">
                      <div className="flex items-start gap-3">
                        <Avatar className="size-9">
                          <AvatarFallback className="gradient-brand text-white text-xs">
                            {r.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{r.author}</span>
                            <span className="text-xs text-muted-foreground">· {r.date}</span>
                          </div>
                          <div className="flex items-center gap-0.5 mt-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`size-3 ${i < r.rating ? "fill-warning text-warning" : "text-muted-foreground/40"}`}
                              />
                            ))}
                          </div>
                          <h4 className="text-sm font-medium mt-2">{r.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{r.body}</p>
                          <div className="mt-3 text-xs text-muted-foreground flex items-center gap-3">
                            <button className="hover:text-foreground">Helpful ({r.helpful})</button>
                            <button className="hover:text-foreground">Reply</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="changelog" className="mt-6 space-y-4">
                {changelog.map((c) => (
                  <div key={c.version} className="card-elegant rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="font-mono">
                        v{c.version}
                      </Badge>
                      <Badge
                        className={
                          c.type === "major"
                            ? "gradient-brand text-white border-transparent"
                            : c.type === "minor"
                              ? "bg-info/20 text-info border-transparent"
                              : "bg-muted border-transparent"
                        }
                      >
                        {c.type}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{c.date}</span>
                    </div>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {c.changes.map((ch, i) => (
                        <li key={i} className="flex gap-2">
                          <GitBranch className="size-3.5 mt-0.5 shrink-0" />
                          {ch}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="faq" className="mt-6">
                <Accordion type="single" collapsible className="card-elegant rounded-xl px-4">
                  {faqs.map((f, i) => (
                    <AccordionItem key={i} value={`i${i}`} className="border-border/60">
                      <AccordionTrigger className="text-sm text-left">{f.q}</AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground">
                        {f.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </TabsContent>

              <TabsContent value="discussions" className="mt-6">
                <div className="card-elegant rounded-xl p-10 text-center">
                  <MessageSquare className="size-8 text-muted-foreground mx-auto mb-3" />
                  <div className="font-medium">42 discussions</div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Ask questions, share tips, and connect with other users.
                  </p>
                  <Button className="mt-4">Start a discussion</Button>
                </div>
              </TabsContent>
            </Tabs>

            {/* Related */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Related products</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {related.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar / pricing */}
          <aside className="lg:sticky lg:top-24 h-fit space-y-4">
            <div className="card-elegant rounded-2xl p-5 space-y-4">
              <div className="flex gap-2">
                {(["personal", "commercial", "enterprise"] as const).map(
                  (t: "personal" | "commercial" | "enterprise") => (
                    <button
                      key={t}
                      onClick={() => setTier(t)}
                      className={`flex-1 rounded-lg px-3 py-1.5 text-xs font-medium border transition-colors ${tier === t ? "border-primary bg-primary/10 text-primary" : "border-border/60 text-muted-foreground hover:text-foreground"}`}
                    >
                      {pricing[t].name}
                    </button>
                  ),
                )}
              </div>
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-semibold">${pricing[tier].price}</span>
                  {product.originalPrice && tier === "commercial" && (
                    <span className="text-lg line-through text-muted-foreground">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
                {product.subscription && (
                  <div className="text-xs text-muted-foreground mt-1">
                    or ${product.subscription.monthly}/mo billed annually
                  </div>
                )}
              </div>
              <Button className="w-full gradient-brand text-white hover:opacity-90 h-11">
                <ShoppingCart className="size-4 mr-1.5" />
                {product.free ? "Download for free" : "Buy now"}
              </Button>
              <Button variant="outline" className="w-full h-11">
                Add to cart
              </Button>

              <Separator />

              <ul className="space-y-2 text-sm">
                {pricing[tier].features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className="size-4 text-success mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <Separator />

              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <Stat label="Downloads" value={formatCompact(product.downloads)} />
                <Stat label="Sales" value={formatCompact(product.sales)} />
                <Stat label="Bookmarks" value={formatCompact(product.bookmarks)} />
              </div>
            </div>

            <Link
              to="/creator/$handle"
              params={{ handle: creator.handle }}
              className="card-elegant rounded-2xl p-4 flex items-center gap-3 hover-lift hover:[&]:hover-lift-active"
            >
              <div className="size-11 rounded-xl gradient-brand grid place-items-center text-white font-semibold">
                {creator.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <span className="text-sm font-medium truncate">{creator.name}</span>
                  {creator.verified && <ShieldCheck className="size-3.5 text-primary shrink-0" />}
                </div>
                <div className="text-xs text-muted-foreground">
                  {formatCompact(creator.followers)} followers
                </div>
              </div>
              <ArrowRight className="size-4 text-muted-foreground" />
            </Link>
          </aside>
        </div>
      </div>
    </SiteLayout>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-sm font-semibold">{value}</div>
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
    </div>
  );
}
