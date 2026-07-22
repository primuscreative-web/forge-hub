import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from "@/components/ui/command";
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { LayoutDashboard, Package, Upload, Users, ShoppingBag, Settings, Sparkles, Search, Bell, CreditCard, Shield, BarChart3, Boxes } from "lucide-react";
import { products, categories } from "@/lib/mock-data";

export function CommandPalette({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, onOpenChange]);

  const go = (to: string) => { onOpenChange(false); navigate({ to }); };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search products, creators, actions..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Quick actions">
          <CommandItem onSelect={() => go("/publish")}><Upload className="size-4 mr-2" />Publish a product<CommandShortcut>N</CommandShortcut></CommandItem>
          <CommandItem onSelect={() => go("/marketplace")}><Search className="size-4 mr-2" />Browse marketplace</CommandItem>
          <CommandItem onSelect={() => go("/creator")}><LayoutDashboard className="size-4 mr-2" />Creator dashboard</CommandItem>
          <CommandItem onSelect={() => go("/dashboard")}><ShoppingBag className="size-4 mr-2" />My library</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Products">
          {products.slice(0, 6).map((p) => (
            <CommandItem key={p.id} onSelect={() => go(`/product/${p.slug}`)}>
              <span className="mr-2 text-lg">{p.emoji}</span>
              <div className="flex flex-col">
                <span className="text-sm">{p.name}</span>
                <span className="text-xs text-muted-foreground">{p.tagline}</span>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Categories">
          {categories.slice(0, 6).map((c) => (
            <CommandItem key={c.slug} onSelect={() => go(`/category/${c.slug}`)}>
              <Boxes className="size-4 mr-2" />{c.name}<span className="ml-auto text-xs text-muted-foreground">{c.count}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Navigation">
          <CommandItem onSelect={() => go("/creator/analytics")}><BarChart3 className="size-4 mr-2" />Analytics</CommandItem>
          <CommandItem onSelect={() => go("/creator/revenue")}><CreditCard className="size-4 mr-2" />Revenue & payouts</CommandItem>
          <CommandItem onSelect={() => go("/dashboard/notifications")}><Bell className="size-4 mr-2" />Notifications</CommandItem>
          <CommandItem onSelect={() => go("/settings")}><Settings className="size-4 mr-2" />Settings</CommandItem>
          <CommandItem onSelect={() => go("/admin")}><Shield className="size-4 mr-2" />Admin panel</CommandItem>
          <CommandItem onSelect={() => go("/creators")}><Users className="size-4 mr-2" />Creators</CommandItem>
          <CommandItem onSelect={() => go("/creator/products")}><Package className="size-4 mr-2" />My products</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="AI">
          <CommandItem><Sparkles className="size-4 mr-2" />Ask AI to find a product…</CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
