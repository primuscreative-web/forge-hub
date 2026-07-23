import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout, PageHeader } from "@/components/layouts";
import { SideNav } from "@/components/side-nav";
import { creatorNav } from "@/components/nav-items";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Search, Paperclip } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/creator/messages")({
  head: () => ({
    meta: [
      { title: "Messages — Creator — DevForge Hub" },
      { name: "description", content: "Chat with customers, prospects, and collaborators." },
      { property: "og:title", content: "Messages — Creator — DevForge Hub" },
      {
        property: "og:description",
        content: "Chat with customers and collaborators on DevForge Hub.",
      },
    ],
  }),
  component: Messages,
});

const threads = [
  {
    id: 1,
    name: "Elena Costa",
    init: "EC",
    last: "Thanks for the fast reply! Enterprise looks perfect.",
    time: "2m",
    unread: 2,
  },
  {
    id: 2,
    name: "Kaito Rivera",
    init: "KR",
    last: "Just bought Cortex AI Agent Kit. Amazing docs.",
    time: "1h",
    unread: 0,
  },
  {
    id: 3,
    name: "Prism Agency",
    init: "PA",
    last: "Interested in a bundle collaboration?",
    time: "5h",
    unread: 1,
  },
  {
    id: 4,
    name: "CloudForge",
    init: "CF",
    last: "Can we get a private license for our team?",
    time: "1d",
    unread: 0,
  },
  {
    id: 5,
    name: "Hana Nakamura",
    init: "HN",
    last: "Loved v2.4.0. Any plans for a mobile SDK?",
    time: "2d",
    unread: 0,
  },
];

function Messages() {
  const [selected, setSelected] = useState(1);
  const active = threads.find((t) => t.id === selected)!;
  return (
    <DashboardLayout side={<SideNav items={creatorNav} title="Creator" />}>
      <div className="p-6 md:p-8 max-w-[1400px]">
        <PageHeader title="Messages" description="12 conversations · 3 unread" />
        <div className="card-elegant rounded-2xl overflow-hidden grid md:grid-cols-[320px_1fr] h-[600px]">
          <div className="border-r border-border/60 flex flex-col">
            <div className="p-3 border-b border-border/60">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input placeholder="Search conversations..." className="pl-9 h-9 bg-surface-1" />
              </div>
            </div>
            <div className="overflow-y-auto flex-1">
              {threads.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelected(t.id)}
                  className={`w-full text-left flex items-start gap-3 p-3 border-b border-border/30 hover:bg-accent/40 transition-colors ${selected === t.id ? "bg-accent/60" : ""}`}
                >
                  <Avatar className="size-9">
                    <AvatarFallback className="gradient-brand text-white text-xs">
                      {t.init}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-medium truncate">{t.name}</span>
                      <span className="text-[10px] text-muted-foreground">{t.time}</span>
                    </div>
                    <div className="text-xs text-muted-foreground truncate">{t.last}</div>
                  </div>
                  {t.unread > 0 && (
                    <span className="size-4 rounded-full bg-primary text-[10px] font-semibold text-white grid place-items-center">
                      {t.unread}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col">
            <div className="p-4 border-b border-border/60 flex items-center gap-3">
              <Avatar className="size-9">
                <AvatarFallback className="gradient-brand text-white text-xs">
                  {active.init}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="text-sm font-medium">{active.name}</div>
                <div className="text-xs text-muted-foreground">Online now</div>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <Bubble side="left" name={active.init}>
                Hey! I'm evaluating your Nexus Dashboard Pro for our team. Does the Enterprise tier
                include private Slack support?
              </Bubble>
              <Bubble side="right" name="AL">
                Yes — Enterprise gets a private Slack channel with the core team, plus 24h SLA on
                business days.
              </Bubble>
              <Bubble side="left" name={active.init}>
                Perfect. Can we get a demo before purchasing?
              </Bubble>
              <Bubble side="right" name="AL">
                Absolutely, I'll send over a live sandbox link with sample data.
              </Bubble>
              <Bubble side="left" name={active.init}>
                {active.last}
              </Bubble>
            </div>
            <div className="p-4 border-t border-border/60 flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Paperclip className="size-4" />
              </Button>
              <Input placeholder="Type a message..." className="flex-1 h-10 bg-surface-1" />
              <Button className="gradient-brand text-white hover:opacity-90">
                <Send className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function Bubble({
  side,
  name,
  children,
}: {
  side: "left" | "right";
  name: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`flex gap-2 ${side === "right" ? "justify-end" : ""}`}>
      {side === "left" && (
        <Avatar className="size-7 shrink-0 mt-1">
          <AvatarFallback className="text-[10px] gradient-brand text-white">{name}</AvatarFallback>
        </Avatar>
      )}
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${side === "right" ? "gradient-brand text-white" : "bg-surface-2 text-foreground"}`}
      >
        {children}
      </div>
      {side === "right" && (
        <Avatar className="size-7 shrink-0 mt-1">
          <AvatarFallback className="text-[10px] gradient-brand text-white">{name}</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
