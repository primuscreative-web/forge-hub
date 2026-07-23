import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/layouts";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — DevForge Hub" },
      {
        name: "description",
        content: "DevForge Hub is the world's most complete marketplace for developers.",
      },
      { property: "og:title", content: "About — DevForge Hub" },
      {
        property: "og:description",
        content: "DevForge Hub is the world's most complete marketplace for developers.",
      },
    ],
  }),
  component: () => (
    <SiteLayout>
      <div className="mx-auto max-w-[900px] px-4 md:px-6 py-16 space-y-8">
        <PageHeader title="About DevForge Hub" description="Built by developers, for developers." />
        <div className="prose prose-invert max-w-none text-muted-foreground text-lg leading-relaxed">
          <p>
            DevForge Hub is the world's most complete marketplace for developers. We help creators
            earn from what they already build, and we help teams ship faster with production-grade
            tools.
          </p>
          <p>
            Founded in 2024, we now power 240,000+ developers and have paid out $24.6M to creators
            across 68 categories.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { k: "Founded", v: "2024" },
            { k: "Team", v: "42 people" },
            { k: "HQ", v: "San Francisco" },
          ].map((s) => (
            <div key={s.k} className="card-elegant rounded-2xl p-6">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">{s.k}</div>
              <div className="text-2xl font-semibold mt-1">{s.v}</div>
            </div>
          ))}
        </div>
      </div>
    </SiteLayout>
  ),
});
