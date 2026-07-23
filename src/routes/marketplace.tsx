import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/layouts";
import { ProductCard } from "@/components/product-card";
import { useCatalogData } from "@/lib/catalog-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, SlidersHorizontal, LayoutGrid, List, Star } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export const Route = createFileRoute("/marketplace")({
  head: () => ({
    meta: [
      { title: "Marketplace — DevForge Hub" },
      {
        name: "description",
        content:
          "Browse 12,480+ developer products across 70+ categories. Filter by price, tech stack, license, and more.",
      },
      { property: "og:title", content: "Marketplace — DevForge Hub" },
      {
        property: "og:description",
        content: "Browse 12,480+ developer products across 70+ categories.",
      },
    ],
  }),
  component: MarketplacePage,
});

function MarketplacePage() {
  const [q, setQ] = useState("");
  const [debouncedQ, setDebouncedQ] = useState("");
  const [sort, setSort] = useState("popular");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [priceMax, setPriceMax] = useState([500]);
  const [selected, setSelected] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    free: false,
    paid: false,
    os: false,
    premium: false,
    enterprise: false,
  });
  const productQuery = useMemo(
    () => ({ q: debouncedQ, categories: selected, sort }),
    [debouncedQ, selected, sort],
  );
  const { data, loading, error } = useCatalogData(productQuery);
  const products = data?.products ?? [];
  const categories = data?.categories ?? [];

  useEffect(() => {
    const timeout = window.setTimeout(() => setDebouncedQ(q), 250);
    return () => window.clearTimeout(timeout);
  }, [q]);

  const filtered = useMemo(() => {
    let list = products.slice();
    if (q)
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q.toLowerCase()) ||
          p.tagline.toLowerCase().includes(q.toLowerCase()),
      );
    if (selected.length) list = list.filter((p) => selected.includes(p.category));
    if (filters.free) list = list.filter((p) => p.free);
    if (filters.paid) list = list.filter((p) => !p.free);
    if (filters.os) list = list.filter((p) => p.openSource);
    if (filters.premium) list = list.filter((p) => p.premium);
    if (filters.enterprise) list = list.filter((p) => p.enterprise);
    list = list.filter((p) => p.price <= priceMax[0]);
    if (sort === "popular") list.sort((a, b) => b.sales - a.sales);
    if (sort === "new") list.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
    if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    return list;
  }, [products, q, sort, priceMax, selected, filters]);

  const toggleCat = (slug: string) =>
    setSelected((s) => (s.includes(slug) ? s.filter((c) => c !== slug) : [...s, slug]));

  return (
    <SiteLayout>
      <div className="mx-auto max-w-[1440px] px-4 md:px-6 py-10">
        <PageHeader
          title="Marketplace"
          description={`${filtered.length} of ${products.length} products across ${categories.length} categories.`}
        />

        {loading ? (
          <div className="text-sm text-muted-foreground">Loading catalog…</div>
        ) : error ? (
          <div className="rounded-xl border border-border/60 bg-surface-1 p-4 text-sm text-muted-foreground">
            {error}
          </div>
        ) : (
        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          {/* Filters */}
          <aside className="space-y-6">
            <div className="card-elegant rounded-xl p-5 space-y-5">
              <div className="flex items-center gap-2 text-sm font-medium">
                <SlidersHorizontal className="size-4" />
                Filters
              </div>

              <FilterGroup title="Product type">
                {[
                  { k: "free", label: "Free" },
                  { k: "paid", label: "Paid" },
                  { k: "os", label: "Open source" },
                  { k: "premium", label: "Premium" },
                  { k: "enterprise", label: "Enterprise" },
                ].map((f) => (
                  <label key={f.k} className="flex items-center gap-2 text-sm cursor-pointer">
                    <Checkbox
                      checked={filters[f.k as keyof typeof filters]}
                      onCheckedChange={(v) => setFilters({ ...filters, [f.k]: !!v })}
                    />
                    {f.label}
                  </label>
                ))}
              </FilterGroup>

              <FilterGroup title={`Price · up to $${priceMax[0]}`}>
                <Slider value={priceMax} onValueChange={setPriceMax} max={500} step={10} />
              </FilterGroup>

              <FilterGroup title="Rating">
                {[4.5, 4.0, 3.5].map((r) => (
                  <label key={r} className="flex items-center gap-2 text-sm cursor-pointer">
                    <Checkbox />
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`size-3 ${i < Math.floor(r) ? "fill-warning text-warning" : "text-muted-foreground/40"}`}
                        />
                      ))}
                    </div>
                    <span className="text-muted-foreground">& up</span>
                  </label>
                ))}
              </FilterGroup>

              <FilterGroup title="Categories">
                <div className="max-h-64 overflow-y-auto pr-2 space-y-1.5">
                  {categories.slice(0, 30).map((c) => (
                    <label key={c.slug} className="flex items-center gap-2 text-sm cursor-pointer">
                      <Checkbox
                        checked={selected.includes(c.slug)}
                        onCheckedChange={() => toggleCat(c.slug)}
                      />
                      <span className="flex-1 truncate">{c.name}</span>
                      <span className="text-[10px] text-muted-foreground">{c.count}</span>
                    </label>
                  ))}
                </div>
              </FilterGroup>
            </div>
          </aside>

          {/* Grid */}
          <div className="min-w-0 space-y-5">
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative flex-1 min-w-[240px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search products, tags, tech…"
                  className="pl-9 h-10 bg-surface-1"
                />
              </div>
              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger className="w-44 h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most popular</SelectItem>
                  <SelectItem value="new">Newest</SelectItem>
                  <SelectItem value="rating">Top rated</SelectItem>
                  <SelectItem value="price-asc">Price · low to high</SelectItem>
                  <SelectItem value="price-desc">Price · high to low</SelectItem>
                </SelectContent>
              </Select>
              <Tabs value={view} onValueChange={(v) => setView(v as "grid" | "list")}>
                <TabsList>
                  <TabsTrigger value="grid">
                    <LayoutGrid className="size-4" />
                  </TabsTrigger>
                  <TabsTrigger value="list">
                    <List className="size-4" />
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {selected.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-xs text-muted-foreground mr-1">Active:</span>
                {selected.map((s) => (
                  <Badge
                    key={s}
                    variant="outline"
                    className="gap-1 cursor-pointer"
                    onClick={() => toggleCat(s)}
                  >
                    {categories.find((c) => c.slug === s)?.name}
                    <span className="text-xs">×</span>
                  </Badge>
                ))}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelected([])}
                  className="h-6 text-xs"
                >
                  Clear all
                </Button>
              </div>
            )}

            {filtered.length === 0 ? (
              <div className="card-elegant rounded-xl p-16 text-center">
                <div className="text-lg font-medium">{products.length === 0 ? "No published products yet" : "No products found"}</div>
                <p className="text-sm text-muted-foreground mt-1">
                  {products.length === 0 ? "Be the first creator to publish." : "Try adjusting your filters or search."}
                </p>
                {products.length === 0 && <Button asChild className="mt-5"><Link to="/creator">Open Creator Dashboard</Link></Button>}
              </div>
            ) : view === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {filtered.map((p) => (
                  <Link
                    key={p.id}
                    to="/product/$slug"
                    params={{ slug: p.slug }}
                    className="flex items-center gap-4 card-elegant rounded-xl p-4 hover-lift hover:[&]:hover-lift-active"
                  >
                    <div
                      className="size-16 rounded-lg grid place-items-center text-3xl"
                      style={{ background: p.gradient }}
                    >
                      {p.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium">{p.name}</div>
                      <div className="text-xs text-muted-foreground truncate">{p.tagline}</div>
                    </div>
                    <div className="hidden md:flex items-center gap-1 text-xs text-muted-foreground">
                      <Star className="size-3 fill-warning text-warning" />
                      {p.rating} · {p.sales} sales
                    </div>
                    <div className="font-semibold text-sm">{p.free ? "Free" : `$${p.price}`}</div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
        )}
      </div>
    </SiteLayout>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {title}
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}
