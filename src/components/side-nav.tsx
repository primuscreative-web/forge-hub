import { Link, useRouterState } from "@tanstack/react-router";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type SideNavItem = {
  label: string;
  to: string;
  icon: ReactNode;
  badge?: string | number;
  group?: string;
};

export function SideNav({ items, title }: { items: SideNavItem[]; title?: string }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const groups = Array.from(new Set(items.map((i) => i.group ?? "")));

  return (
    <aside className="hidden md:block w-60 shrink-0 border-r border-border/60 h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto py-6 px-3">
      {title && <div className="px-2 mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">{title}</div>}
      <nav className="space-y-6">
        {groups.map((g) => (
          <div key={g}>
            {g && <div className="px-2 mb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/70">{g}</div>}
            <div className="space-y-0.5">
              {items.filter((i) => (i.group ?? "") === g).map((it) => {
                const active = pathname === it.to || (it.to !== "/" && pathname.startsWith(it.to));
                return (
                  <Link
                    key={it.to}
                    to={it.to}
                    className={cn(
                      "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-colors",
                      active
                        ? "bg-accent text-foreground font-medium"
                        : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
                    )}
                  >
                    <span className={cn("size-4 shrink-0", active && "text-primary")}>{it.icon}</span>
                    <span className="flex-1 truncate">{it.label}</span>
                    {it.badge != null && <span className="text-[10px] px-1.5 py-0.5 rounded bg-surface-2 text-muted-foreground">{it.badge}</span>}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
