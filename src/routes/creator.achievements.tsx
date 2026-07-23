import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout, PageHeader } from "@/components/layouts";
import { SideNav } from "@/components/side-nav";
import { creatorNav } from "@/components/nav-items";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Award, TrendingUp, Star, Users, DollarSign, ShieldCheck, Trophy, Zap } from "lucide-react";

export const Route = createFileRoute("/creator/achievements")({
  head: () => ({
    meta: [
      { title: "Achievements — Creator — DevForge Hub" },
      {
        name: "description",
        content: "Track your creator milestones, ranking, and unlock new perks.",
      },
      { property: "og:title", content: "Achievements — Creator — DevForge Hub" },
      { property: "og:description", content: "Track your creator milestones on DevForge Hub." },
    ],
  }),
  component: () => {
    const unlocked = [
      { icon: Trophy, name: "Top 1% Seller", desc: "You're in the top 1% of creators by revenue." },
      {
        icon: ShieldCheck,
        name: "Verified Creator",
        desc: "Your identity and payouts are verified.",
      },
      { icon: Star, name: "5-Star Streak", desc: "50 five-star reviews in a row." },
      { icon: DollarSign, name: "$100k Earned", desc: "You've earned over $100,000 lifetime." },
      { icon: Users, name: "10k Followers", desc: "10,000+ developers follow you." },
      { icon: Zap, name: "Lightning Publisher", desc: "10 releases in a single month." },
    ];
    const locked = [
      { icon: Award, name: "1M Downloads", desc: "1,000,000 lifetime downloads.", progress: 84 },
      {
        icon: TrendingUp,
        name: "Enterprise Elite",
        desc: "50 enterprise licenses sold.",
        progress: 60,
      },
    ];
    return (
      <DashboardLayout side={<SideNav items={creatorNav} title="Creator" />}>
        <div className="p-6 md:p-8 max-w-[1200px]">
          <PageHeader title="Achievements" description="Your creator milestones and ranking." />
          <div className="card-elegant rounded-2xl p-6 mb-8 flex items-center gap-6">
            <div className="size-20 rounded-2xl gradient-brand grid place-items-center text-white">
              <Trophy className="size-10" />
            </div>
            <div className="flex-1">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Ranking</div>
              <div className="text-3xl font-semibold">
                #12{" "}
                <span className="text-sm text-muted-foreground font-normal">of 3,240 creators</span>
              </div>
              <div className="text-sm text-success mt-1">↑ Up 4 spots this month</div>
            </div>
          </div>

          <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">
            Unlocked · 24
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-8">
            {unlocked.map((a) => (
              <div key={a.name} className="card-elegant rounded-2xl p-5">
                <div className="size-10 rounded-xl gradient-brand-soft grid place-items-center mb-3">
                  <a.icon className="size-5 text-primary" />
                </div>
                <div className="text-sm font-medium">{a.name}</div>
                <div className="text-xs text-muted-foreground mt-1">{a.desc}</div>
              </div>
            ))}
          </div>

          <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">
            In progress
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {locked.map((a) => (
              <div key={a.name} className="card-elegant rounded-2xl p-5">
                <div className="flex items-start gap-3">
                  <div className="size-10 rounded-xl bg-surface-2 grid place-items-center">
                    <a.icon className="size-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{a.name}</div>
                    <div className="text-xs text-muted-foreground">{a.desc}</div>
                    <div className="mt-3 flex items-center gap-2">
                      <Progress value={a.progress} className="flex-1" />
                      <span className="text-xs text-muted-foreground">{a.progress}%</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DashboardLayout>
    );
  },
});
