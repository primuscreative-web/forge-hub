import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout, PageHeader } from "@/components/layouts";
import { SideNav } from "@/components/side-nav";
import { creatorNav } from "@/components/nav-items";
import { reviews, products } from "@/lib/mock-data";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/creator/reviews")({
  head: () => ({
    meta: [
      { title: "Reviews — Creator — DevForge Hub" },
      {
        name: "description",
        content: "Read and respond to reviews across your published products.",
      },
      { property: "og:title", content: "Reviews — Creator — DevForge Hub" },
      { property: "og:description", content: "Read and respond to reviews on DevForge Hub." },
    ],
  }),
  component: Reviews,
});

function Reviews() {
  const all = [...reviews, ...reviews].map((r, i) => ({
    ...r,
    product: products[i % products.length].name,
  }));
  return (
    <DashboardLayout side={<SideNav items={creatorNav} title="Creator" />}>
      <div className="p-6 md:p-8 max-w-[1200px]">
        <PageHeader title="Reviews" description="4.9★ across 3,240 reviews · 92% five-star" />
        <div className="space-y-4">
          {all.map((r, i) => (
            <div key={i} className="card-elegant rounded-xl p-5">
              <div className="flex items-start gap-3">
                <Avatar className="size-9">
                  <AvatarFallback className="gradient-brand text-white text-xs">
                    {r.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{r.author}</span>
                    <span className="text-xs text-muted-foreground">
                      on {r.product} · {r.date}
                    </span>
                  </div>
                  <div className="flex items-center gap-0.5 mt-0.5">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star
                        key={j}
                        className={`size-3 ${j < r.rating ? "fill-warning text-warning" : "text-muted-foreground/40"}`}
                      />
                    ))}
                  </div>
                  <h4 className="text-sm font-medium mt-2">{r.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{r.body}</p>
                  <div className="mt-3 flex items-center gap-2">
                    <Button size="sm" variant="outline">
                      Reply
                    </Button>
                    <Button size="sm" variant="ghost">
                      Report
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
