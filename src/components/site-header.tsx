import { Link } from "@tanstack/react-router";
import {
  Search,
  Bell,
  ShoppingBag,
  Menu,
  Command,
  Sparkles,
  LayoutDashboard,
  Package,
  Users,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState } from "react";
import { CommandPalette } from "./command-palette";
import { useAuth } from "@/lib/auth";

const nav = [
  { label: "Marketplace", to: "/marketplace" },
  { label: "Categories", to: "/categories" },
  { label: "Creators", to: "/creators" },
  { label: "Collections", to: "/collections" },
  { label: "Community", to: "/community" },
  { label: "Learning", to: "/learning" },
];

export function SiteHeader() {
  const [cmdkOpen, setCmdkOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border/60 glass-strong">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center gap-4 px-4 md:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72">
              <nav className="mt-8 flex flex-col gap-1">
                {nav.map((n) => (
                  <Link
                    key={n.to}
                    to={n.to}
                    className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent"
                  >
                    {n.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="relative flex size-8 items-center justify-center rounded-lg gradient-brand ring-brand">
              <Sparkles className="size-4 text-white" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-sm font-semibold tracking-tight">DevForge</span>
              <span className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                Hub
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1 ml-4">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                activeProps={{
                  className: "rounded-md px-3 py-1.5 text-sm text-foreground bg-accent",
                }}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex-1" />

          <button
            onClick={() => setCmdkOpen(true)}
            className="hidden md:flex items-center gap-2 h-9 w-72 rounded-lg border border-border/60 bg-surface-1/60 px-3 text-sm text-muted-foreground hover:border-primary/40 transition-colors"
          >
            <Search className="size-4" />
            <span className="flex-1 text-left">Search products…</span>
            <kbd className="flex items-center gap-0.5 rounded border border-border/60 bg-background/50 px-1.5 py-0.5 text-[10px] font-mono">
              <Command className="size-3" />K
            </kbd>
          </button>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setCmdkOpen(true)}
            aria-label="Search"
          >
            <Search className="size-5" />
          </Button>

          <Button
            asChild
            size="sm"
            className="hidden md:inline-flex gradient-brand text-white hover:opacity-90"
          >
            <Link to="/publish">
              <Upload className="size-4 mr-1.5" />
              Publish
            </Link>
          </Button>

          <NotificationsMenu />
          <UserMenu />
        </div>
      </header>

      <CommandPalette open={cmdkOpen} onOpenChange={setCmdkOpen} />
    </>
  );
}

function NotificationsMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Notifications" className="relative">
          <Bell className="size-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled>No notifications yet</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function UserMenu() {
  const { user, loading, logout } = useAuth();
  if (loading) return <div className="size-8" aria-hidden="true" />;
  if (!user) {
    return (
      <Button asChild variant="outline" size="sm">
        <Link to="/auth">Sign in</Link>
      </Button>
    );
  }
  const initials = user.displayName
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 rounded-full outline-none focus-visible:ring-2 ring-primary ring-offset-2 ring-offset-background">
          <Avatar className="size-8 border border-border/60">
            <AvatarFallback className="gradient-brand text-white text-xs font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex flex-col">
          <span className="text-sm font-medium">{user.displayName}</span>
          <span className="text-xs text-muted-foreground">{user.email}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/creator" className="flex items-center gap-2">
            <LayoutDashboard className="size-4" />
            Creator dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/dashboard" className="flex items-center gap-2">
            <ShoppingBag className="size-4" />
            My library
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/creator/products" className="flex items-center gap-2">
            <Package className="size-4" />
            My products
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/admin" className="flex items-center gap-2">
            <Users className="size-4" />
            Admin panel
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/settings">Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => void logout()}>
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
