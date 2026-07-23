import { Link } from "@tanstack/react-router";
import { Star, Download, TrendingUp, Sparkles as SparklesIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/lib/mock-data";
import { getCreator } from "@/lib/mock-data";

export function ProductCard({
  product,
  size = "md",
}: {
  product: Product;
  size?: "sm" | "md" | "lg";
}) {
  const creator = product.creatorName
    ? { name: product.creatorName, avatar: product.creatorName.split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase() }
    : getCreator(product.creator);
  return (
    <Link
      to="/product/$slug"
      params={{ slug: product.slug }}
      className="group card-elegant rounded-2xl overflow-hidden hover-lift hover:[&]:hover-lift-active block"
    >
      <div
        className={`relative overflow-hidden ${size === "sm" ? "aspect-[16/10]" : "aspect-[16/10]"}`}
      >
        <div className="absolute inset-0" style={{ background: product.gradient }} />
        <div className="absolute inset-0 grid-dots opacity-40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-6xl drop-shadow-2xl transition-transform duration-500 group-hover:scale-110">
            {product.emoji}
          </div>
        </div>
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {product.trending && (
            <Badge className="bg-black/50 backdrop-blur border-white/10 text-white gap-1">
              <TrendingUp className="size-3" />
              Trending
            </Badge>
          )}
          {product.new && (
            <Badge className="bg-black/50 backdrop-blur border-white/10 text-white gap-1">
              <SparklesIcon className="size-3" />
              New
            </Badge>
          )}
          {product.free && (
            <Badge className="bg-success/90 border-transparent text-success-foreground">Free</Badge>
          )}
        </div>
        <div className="absolute top-3 right-3">
          <Badge
            variant="outline"
            className="glass text-white/90 border-white/10 text-[10px] uppercase tracking-wider"
          >
            v{product.version}
          </Badge>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div className="space-y-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-sm leading-tight line-clamp-1 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
              <Star className="size-3 fill-warning text-warning" />
              {product.rating}
            </div>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2 min-h-[2rem]">
            {product.tagline}
          </p>
        </div>

        <div className="flex flex-wrap gap-1">
          {product.tech.slice(0, 3).map((t) => (
            <span
              key={t}
              className="rounded-md bg-surface-2 px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground border border-border/40"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border/40">
          <div className="flex items-center gap-1.5 min-w-0">
            <div className="size-5 rounded-full gradient-brand grid place-items-center text-[9px] font-semibold text-white shrink-0">
              {creator.avatar}
            </div>
            <span className="text-xs text-muted-foreground truncate">{creator.name}</span>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1 text-muted-foreground">
              <Download className="size-3" />
              {formatCompact(product.downloads)}
            </span>
            {product.free ? (
              <span className="font-semibold text-success">Free</span>
            ) : (
              <div className="flex items-baseline gap-1">
                {product.originalPrice && (
                  <span className="text-[10px] line-through text-muted-foreground">
                    ${product.originalPrice}
                  </span>
                )}
                <span className="font-semibold">${product.price}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export function formatCompact(n: number) {
  if (n >= 1e6) return (n / 1e6).toFixed(1) + "M";
  if (n >= 1e3) return (n / 1e3).toFixed(1) + "K";
  return String(n);
}
