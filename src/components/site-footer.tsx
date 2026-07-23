import { Link } from "@tanstack/react-router";
import { Sparkles, Github, Twitter, Youtube } from "lucide-react";

const groups = [
  {
    title: "Marketplace",
    links: [
      { label: "Browse all", to: "/marketplace" },
      { label: "Categories", to: "/categories" },
      { label: "Trending", to: "/trending" },
      { label: "New releases", to: "/marketplace?sort=new" },
      { label: "Free products", to: "/marketplace?filter=free" },
      { label: "Bundles", to: "/collections" },
    ],
  },
  {
    title: "Creators",
    links: [
      { label: "Publish a product", to: "/publish" },
      { label: "Creator dashboard", to: "/creator" },
      { label: "Verified creators", to: "/creators" },
      { label: "Organizations", to: "/organizations" },
      { label: "Payout guide", to: "/learning" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Careers", to: "/about" },
      { label: "Press kit", to: "/about" },
      { label: "Blog", to: "/community" },
      { label: "Contact", to: "/about" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", to: "/learning" },
      { label: "API reference", to: "/learning" },
      { label: "Status", to: "/about" },
      { label: "Changelog", to: "/community" },
      { label: "Community", to: "/community" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 mt-24">
      <div className="mx-auto max-w-[1440px] px-4 md:px-6 py-16">
        <div className="grid gap-10 md:grid-cols-6">
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg gradient-brand">
                <Sparkles className="size-4 text-white" />
              </div>
              <span className="text-sm font-semibold">DevForge Hub</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              The world's most complete marketplace for developers. Ship faster with
              production-ready tools.
            </p>
            <div className="flex items-center gap-2">
              <a
                href="#"
                aria-label="GitHub"
                className="rounded-md p-2 hover:bg-accent text-muted-foreground hover:text-foreground"
              >
                <Github className="size-4" />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="rounded-md p-2 hover:bg-accent text-muted-foreground hover:text-foreground"
              >
                <Twitter className="size-4" />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="rounded-md p-2 hover:bg-accent text-muted-foreground hover:text-foreground"
              >
                <Youtube className="size-4" />
              </a>
            </div>
          </div>
          {groups.map((g) => (
            <div key={g.title}>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                {g.title}
              </h4>
              <ul className="space-y-2.5">
                {g.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-6 border-t border-border/60 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-muted-foreground">
            © 2026 DevForge Hub, Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <Link to="/about" className="hover:text-foreground">
              Privacy
            </Link>
            <Link to="/about" className="hover:text-foreground">
              Terms
            </Link>
            <Link to="/about" className="hover:text-foreground">
              Cookies
            </Link>
            <Link to="/about" className="hover:text-foreground">
              Security
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
