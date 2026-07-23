import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/layouts";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Play, FileText } from "lucide-react";

export const Route = createFileRoute("/learning")({
  head: () => ({
    meta: [
      { title: "Learning — DevForge Hub" },
      {
        name: "description",
        content: "Guides, courses, and documentation to help you ship faster.",
      },
      { property: "og:title", content: "Learning — DevForge Hub" },
      { property: "og:description", content: "Guides and documentation." },
    ],
  }),
  component: () => {
    const lessons = [
      { t: "How to publish your first product", d: "12m read · Getting started", i: FileText },
      { t: "Setting up Stripe payouts", d: "8m read · Money", i: FileText },
      { t: "Building great product pages", d: "Video · 24m", i: Play },
      { t: "SEO for your product page", d: "10m read · Marketing", i: FileText },
      { t: "Managing versions and updates", d: "6m read · Publishing", i: FileText },
      { t: "Getting verified on DevForge", d: "5m read · Profile", i: FileText },
      { t: "API reference & webhooks", d: "Docs · 40+ endpoints", i: BookOpen },
      { t: "Building an MCP server", d: "Video · 32m", i: Play },
    ];
    return (
      <SiteLayout>
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 py-10">
          <PageHeader
            title="Learning"
            description="Guides, courses, and docs to help you ship faster."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {lessons.map((l) => (
              <div
                key={l.t}
                className="card-elegant rounded-2xl p-5 hover-lift hover:[&]:hover-lift-active cursor-pointer"
              >
                <div className="size-10 rounded-xl gradient-brand-soft grid place-items-center mb-3">
                  <l.i className="size-4 text-primary" />
                </div>
                <div className="text-sm font-medium">{l.t}</div>
                <div className="text-xs text-muted-foreground mt-1">{l.d}</div>
              </div>
            ))}
          </div>
        </div>
      </SiteLayout>
    );
  },
});
