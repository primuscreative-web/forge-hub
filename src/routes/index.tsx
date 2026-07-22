import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layouts";
import { ProductCard, formatCompact } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { products, categories, creators } from "@/lib/mock-data";
import { ArrowRight, Sparkles, TrendingUp, Award, Zap, Play, Star, Check, Layers, Bot, Palette, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DevForge Hub — The complete marketplace for developers" },
      { name: "description", content: "Discover 12,480+ SaaS, boilerplates, UI kits, AI agents, and MCP servers. Ship faster with production-ready tools built by top creators." },
      { property: "og:title", content: "DevForge Hub — The complete marketplace for developers" },
      { property: "og:description", content: "Discover 12,480+ SaaS, boilerplates, UI kits, AI agents, and MCP servers built by top creators." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const featured = products.filter((p) => p.featured).slice(0, 8);
  const trending = products.filter((p) => p.trending).slice(0, 4);
  const topCategories = categories.slice(0, 12);
  const topCreators = creators.slice(0, 6);

  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 grid-dots opacity-40" />
        <div className="relative mx-auto max-w-[1440px] px-4 md:px-6 pt-20 pb-24 md:pt-32 md:pb-40">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto animate-fade-in-up">
            <Link to="/community" className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs mb-6 hover:border-primary/40">
              <span className="rounded-full gradient-brand px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-white">New</span>
              <span className="text-muted-foreground">Introducing MCP Marketplace</span>
              <ArrowRight className="size-3" />
            </Link>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05]">
              The complete marketplace<br />
              <span className="gradient-text">built for developers</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Buy, sell and discover 12,480+ production-grade tools. Boilerplates, UI kits, AI agents, MCP servers, and everything in between.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" className="gradient-brand text-white hover:opacity-90 h-12 px-6">
                <Link to="/marketplace">Explore marketplace <ArrowRight className="ml-1.5 size-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 px-6 border-border/60">
                <Link to="/publish"><Play className="mr-1.5 size-4" />Start selling</Link>
              </Button>
            </div>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-2"><Check className="size-3.5 text-success" />No platform fees for first year</div>
              <div className="flex items-center gap-2"><Check className="size-3.5 text-success" />90% revenue share</div>
              <div className="flex items-center gap-2"><Check className="size-3.5 text-success" />Instant payouts via Stripe</div>
            </div>
          </div>

          {/* Stats bar */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {[
              { label: "Products", value: "12,480" },
              { label: "Creators", value: "3,240" },
              { label: "Downloads", value: "8.4M" },
              { label: "Paid out", value: "$24.6M" },
            ].map((s) => (
              <div key={s.label} className="glass rounded-2xl p-6 text-center">
                <div className="text-3xl md:text-4xl font-semibold gradient-text">{s.value}</div>
                <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MARQUEE / logos */}
      <section className="border-y border-border/40 py-8 overflow-hidden">
        <div className="text-center text-xs uppercase tracking-widest text-muted-foreground mb-6">Trusted by teams at</div>
        <div className="flex gap-16 animate-marquee whitespace-nowrap">
          {[..."Vercel Stripe Linear Framer Notion GitHub Cloudflare Supabase Shopify Figma Discord Anthropic".split(" "), ..."Vercel Stripe Linear Framer Notion GitHub Cloudflare Supabase Shopify Figma Discord Anthropic".split(" ")].map((brand, i) => (
            <div key={i} className="text-2xl font-semibold tracking-tight text-muted-foreground/60">{brand}</div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <Section title="Browse by category" description="70+ categories covering every layer of the stack." action={<Link to="/categories" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">All categories <ArrowRight className="size-3" /></Link>}>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {topCategories.map((c) => (
            <Link key={c.slug} to="/category/$slug" params={{ slug: c.slug }} className="card-elegant rounded-xl p-4 hover-lift hover:[&]:hover-lift-active">
              <div className="size-9 rounded-lg gradient-brand-soft grid place-items-center mb-3">
                <Layers className="size-4 text-primary" />
              </div>
              <div className="text-sm font-medium">{c.name}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{formatCompact(c.count)} products</div>
            </Link>
          ))}
        </div>
      </Section>

      {/* FEATURED */}
      <Section title="Featured this week" description="Handpicked by the DevForge editorial team." icon={<Sparkles className="size-4 text-primary" />} action={<Link to="/marketplace" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">See all <ArrowRight className="size-3" /></Link>}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </Section>

      {/* TRENDING */}
      <Section title="Trending right now" icon={<TrendingUp className="size-4 text-primary" />} description="What developers are downloading today.">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {trending.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </Section>

      {/* CREATORS */}
      <Section title="Featured creators" icon={<Award className="size-4 text-primary" />} description="World-class engineers and studios building on DevForge." action={<Link to="/creators" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">Browse creators <ArrowRight className="size-3" /></Link>}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {topCreators.map((c) => (
            <Link key={c.id} to="/creator/$handle" params={{ handle: c.handle }} className="card-elegant rounded-2xl p-5 hover-lift hover:[&]:hover-lift-active flex items-center gap-4">
              <div className="size-14 rounded-xl gradient-brand grid place-items-center text-white font-semibold">{c.avatar}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-medium truncate">{c.name}</span>
                  {c.verified && <ShieldCheck className="size-3.5 text-primary shrink-0" />}
                </div>
                <div className="text-xs text-muted-foreground truncate">{c.bio}</div>
                <div className="mt-1.5 flex items-center gap-3 text-[11px] text-muted-foreground">
                  <span>{formatCompact(c.followers)} followers</span>
                  <span>·</span>
                  <span>{formatCompact(c.sales)} sales</span>
                  <span>·</span>
                  <span className="flex items-center gap-0.5"><Star className="size-3 fill-warning text-warning" />{c.rating}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* AI Bento */}
      <Section title="Made for the AI era" description="MCP servers, Cursor rules, Claude skills, prompts, and agent frameworks." icon={<Bot className="size-4 text-primary" />}>
        <div className="grid gap-4 md:grid-cols-3">
          <BentoTile large gradient={products[2].gradient} title="Cortex AI Agent Kit" tag="AI Agents" href={`/product/${products[2].slug}`} emoji="🤖" desc="Production-ready multi-agent framework used by 4,200+ teams." />
          <BentoTile gradient={products[6].gradient} title="Cursor Master Rules" tag="Cursor Rules" href={`/product/${products[6].slug}`} emoji="🎯" desc="500+ curated rules." />
          <BentoTile gradient={products[7].gradient} title="MCP Data Gateway" tag="MCP" href={`/product/${products[7].slug}`} emoji="🔌" desc="Universal MCP server for any DB." />
          <BentoTile gradient={products[15].gradient} title="Claude Skills Vault" tag="Claude" href={`/product/${products[15].slug}`} emoji="🧠" desc="300+ engineering skills for Claude." />
          <BentoTile gradient={products[30].gradient} title="Codex Prompts Library" tag="Prompts" href={`/product/${products[30].slug}`} emoji="📝" desc="800+ engineering prompts." />
          <BentoTile gradient={products[23].gradient} title="Automate Everything" tag="Automation" href={`/product/${products[23].slug}`} emoji="⚙️" desc="200+ workflow templates." />
        </div>
      </Section>

      {/* Sell CTA */}
      <section className="mx-auto max-w-[1440px] px-4 md:px-6 py-24">
        <div className="relative overflow-hidden card-elegant rounded-3xl p-8 md:p-16 text-center">
          <div className="absolute inset-0 gradient-hero opacity-60" />
          <div className="relative">
            <Badge className="gradient-brand text-white border-transparent">For creators</Badge>
            <h2 className="mt-4 text-3xl md:text-5xl font-semibold tracking-tight max-w-3xl mx-auto">Start earning from what you already build.</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">Keep 90% of every sale. Get paid on demand. Reach 240,000 developers already on the platform.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="gradient-brand text-white hover:opacity-90 h-12 px-6"><Link to="/publish">Publish your first product</Link></Button>
              <Button asChild size="lg" variant="outline" className="h-12 px-6"><Link to="/creator">See creator dashboard</Link></Button>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Section({ title, description, icon, action, children }: { title: string; description?: string; icon?: React.ReactNode; action?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="mx-auto max-w-[1440px] px-4 md:px-6 py-14">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            {icon && <div className="size-8 rounded-lg gradient-brand-soft grid place-items-center">{icon}</div>}
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{title}</h2>
          </div>
          {description && <p className="mt-1 text-sm text-muted-foreground max-w-xl">{description}</p>}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

function BentoTile({ title, desc, tag, href, emoji, gradient, large }: { title: string; desc: string; tag: string; href: string; emoji: string; gradient: string; large?: boolean }) {
  return (
    <Link to={href} className={`group relative overflow-hidden rounded-2xl card-elegant hover-lift hover:[&]:hover-lift-active ${large ? "md:row-span-2 md:col-span-1" : ""}`}>
      <div className="absolute inset-0 opacity-60" style={{ background: gradient }} />
      <div className="absolute inset-0 grid-dots opacity-30" />
      <div className="relative p-6 flex flex-col h-full min-h-48">
        <Badge className="w-fit glass border-white/10 text-white/90">{tag}</Badge>
        <div className={`mt-auto ${large ? "text-8xl" : "text-6xl"} drop-shadow-2xl transition-transform duration-500 group-hover:scale-110`}>{emoji}</div>
        <div className="mt-4">
          <div className="text-lg font-semibold text-white drop-shadow">{title}</div>
          <div className="text-sm text-white/70">{desc}</div>
        </div>
      </div>
    </Link>
  );
}
