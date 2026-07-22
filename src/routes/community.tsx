import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/layouts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, Users, Newspaper, Calendar } from "lucide-react";

export const Route = createFileRoute("/community")({
  head: () => ({ meta: [
    { title: "Community — DevForge Hub" },
    { name: "description", content: "Discussions, releases, and events from creators and buyers on DevForge Hub." },
    { property: "og:title", content: "Community — DevForge Hub" }, { property: "og:description", content: "Discussions, releases, and events." },
  ]}),
  component: () => {
    const feed = [
      { icon: Newspaper, title: "Nexus Dashboard Pro v2.4.0 released", body: "Multi-region deployment support, new billing portal, Postgres 16.", time: "2h", tag: "Release" },
      { icon: MessageSquare, title: "Best MCP server for a Postgres analytics stack?", body: "Looking for recommendations from folks running MCP in production.", time: "5h", tag: "Discussion" },
      { icon: Users, title: "AMA with Kaito Rivera", body: "Join us Friday for an AMA with one of DevForge's top creators.", time: "1d", tag: "Event" },
      { icon: Calendar, title: "DevForge Meetup · San Francisco", body: "Aug 12 · Talks from Acme Labs, Prism Agency, and CloudForge.", time: "2d", tag: "Event" },
      { icon: Newspaper, title: "Cursor Master Rules — Weekly update", body: "New rules for Rust, Elixir, and Zig codebases.", time: "3d", tag: "Release" },
    ];
    return (
      <SiteLayout>
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 py-10 grid gap-8 lg:grid-cols-[1fr_320px]">
          <div>
            <PageHeader title="Community" description="Discussions, releases, and events from across DevForge." actions={<Button className="gradient-brand text-white">New post</Button>} />
            <div className="space-y-3">
              {feed.map((f, i) => (
                <div key={i} className="card-elegant rounded-2xl p-5 flex items-start gap-4">
                  <div className="size-10 rounded-xl gradient-brand-soft grid place-items-center"><f.icon className="size-4 text-primary" /></div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1"><Badge variant="outline">{f.tag}</Badge><span className="text-xs text-muted-foreground">{f.time} ago</span></div>
                    <div className="text-sm font-medium">{f.title}</div>
                    <div className="text-sm text-muted-foreground mt-0.5">{f.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <aside className="space-y-4">
            <div className="card-elegant rounded-2xl p-5">
              <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Popular topics</div>
              <div className="flex flex-wrap gap-1.5">{["AI agents","Next.js","Supabase","Cursor","MCP","Design systems","Rust","Stripe"].map(t => <Badge key={t} variant="outline">#{t}</Badge>)}</div>
            </div>
            <div className="card-elegant rounded-2xl p-5">
              <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Upcoming events</div>
              <div className="text-sm">DevForge Meetup SF · Aug 12</div>
              <div className="text-sm">AMA · Kaito Rivera · Aug 8</div>
              <div className="text-sm">Workshop · MCP servers · Aug 20</div>
            </div>
          </aside>
        </div>
      </SiteLayout>
    );
  },
});
