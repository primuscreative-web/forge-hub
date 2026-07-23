import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/layouts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Upload,
  Sparkles,
  Image as ImageIcon,
  Video,
  FileCode,
  DollarSign,
  Tag,
  Eye,
  Rocket,
} from "lucide-react";
import { useState } from "react";
import { categories } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/publish")({
  head: () => ({
    meta: [
      { title: "Publish a product — DevForge Hub" },
      {
        name: "description",
        content: "Publish your product to 240,000+ developers. 90% revenue share, instant payouts.",
      },
      { property: "og:title", content: "Publish a product — DevForge Hub" },
      {
        property: "og:description",
        content: "Publish your product to 240,000+ developers on DevForge Hub.",
      },
    ],
  }),
  component: PublishWizard,
});

const steps = [
  { key: "details", label: "Details", icon: Sparkles },
  { key: "media", label: "Media", icon: ImageIcon },
  { key: "source", label: "Source & docs", icon: FileCode },
  { key: "pricing", label: "Pricing", icon: DollarSign },
  { key: "meta", label: "Categories & SEO", icon: Tag },
  { key: "preview", label: "Preview", icon: Eye },
  { key: "publish", label: "Publish", icon: Rocket },
];

function PublishWizard() {
  const [step, setStep] = useState(0);
  const [pricingModel, setPricingModel] = useState("one-time");
  const [visibility, setVisibility] = useState("public");
  const progress = ((step + 1) / steps.length) * 100;

  return (
    <SiteLayout footer={false}>
      <div className="mx-auto max-w-[1440px] px-4 md:px-6 py-8">
        <div className="mb-8">
          <PageHeader
            title="Publish a new product"
            description="A guided wizard to publish production-grade tools in minutes."
            actions={<Button variant="outline">Save as draft</Button>}
          />
          <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
            <span>
              Step {step + 1} of {steps.length}
            </span>
            <Progress value={progress} className="flex-1 h-1.5" />
            <span>{Math.round(progress)}%</span>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
          {/* Steps */}
          <aside className="hidden lg:block">
            <div className="space-y-1 sticky top-24">
              {steps.map((s, i) => {
                const done = i < step;
                const active = i === step;
                return (
                  <button
                    key={s.key}
                    onClick={() => setStep(i)}
                    className={cn(
                      "w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors text-left",
                      active
                        ? "bg-accent text-foreground"
                        : done
                          ? "text-muted-foreground hover:bg-accent/40"
                          : "text-muted-foreground/60 hover:bg-accent/40",
                    )}
                  >
                    <div
                      className={cn(
                        "size-6 rounded-full grid place-items-center text-[10px]",
                        done
                          ? "gradient-brand text-white"
                          : active
                            ? "bg-primary/20 text-primary border border-primary/40"
                            : "bg-surface-2",
                      )}
                    >
                      {done ? <Check className="size-3" /> : i + 1}
                    </div>
                    <span className="flex-1">{s.label}</span>
                  </button>
                );
              })}
            </div>
          </aside>

          {/* Panels */}
          <div className="card-elegant rounded-2xl p-6 md:p-8">
            {step === 0 && (
              <div className="space-y-6 max-w-2xl">
                <SectionTitle
                  title="Product details"
                  desc="The basics that customers will see first."
                />
                <Field label="Product name" required>
                  <Input placeholder="e.g. Nexus Dashboard Pro" className="bg-surface-1" />
                </Field>
                <Field label="URL slug" required>
                  <Input placeholder="nexus-dashboard-pro" className="bg-surface-1 font-mono" />
                </Field>
                <Field label="Tagline" required desc="One line, max 80 characters.">
                  <Input
                    placeholder="Enterprise analytics dashboard with 120+ blocks"
                    maxLength={80}
                    className="bg-surface-1"
                  />
                </Field>
                <Field label="Full description" required desc="Markdown supported.">
                  <Textarea
                    rows={6}
                    className="bg-surface-1"
                    placeholder="Write a detailed description of what customers get..."
                  />
                </Field>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-6 max-w-3xl">
                <SectionTitle title="Media" desc="Gallery, video and interactive preview." />
                <Field label="Cover image" required desc="1920×1080 recommended.">
                  <div className="rounded-xl border border-dashed border-border/70 p-10 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <ImageIcon className="size-8 mx-auto mb-2 text-muted-foreground" />
                    <div className="text-sm">
                      Drop file or <span className="text-primary">browse</span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      PNG, JPG, WEBP · up to 10MB
                    </div>
                  </div>
                </Field>
                <Field label="Gallery images" desc="Up to 12 screenshots.">
                  <div className="grid grid-cols-4 gap-2">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div
                        key={i}
                        className="aspect-video rounded-lg border border-dashed border-border/70 grid place-items-center hover:border-primary/50 cursor-pointer"
                      >
                        <Upload className="size-4 text-muted-foreground" />
                      </div>
                    ))}
                  </div>
                </Field>
                <Field label="Demo video" desc="Optional. YouTube, Vimeo, or upload MP4.">
                  <div className="flex items-center gap-2">
                    <Video className="size-4 text-muted-foreground" />
                    <Input
                      placeholder="https://youtube.com/watch?v=..."
                      className="bg-surface-1 flex-1"
                    />
                  </div>
                </Field>
                <Field label="Interactive preview URL" desc="Optional. Live sandbox for customers.">
                  <Input placeholder="https://demo.your-product.com" className="bg-surface-1" />
                </Field>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 max-w-3xl">
                <SectionTitle
                  title="Source & documentation"
                  desc="Files, repo, and docs your customers download."
                />
                <Field label="Source archive" required desc="Zip or Git repository.">
                  <div className="rounded-xl border border-dashed border-border/70 p-10 text-center cursor-pointer">
                    <FileCode className="size-8 mx-auto mb-2 text-muted-foreground" />
                    <div className="text-sm">Upload .zip or connect GitHub</div>
                    <div className="text-xs text-muted-foreground mt-1">Up to 500MB</div>
                  </div>
                </Field>
                <Field label="Repository (optional)">
                  <Input
                    placeholder="https://github.com/acme/nexus-dashboard"
                    className="bg-surface-1 font-mono"
                  />
                </Field>
                <Field label="Documentation URL">
                  <Input
                    placeholder="https://docs.your-product.com"
                    className="bg-surface-1 font-mono"
                  />
                </Field>
                <Field label="Installation command">
                  <Input
                    placeholder="npx create-devforge nexus"
                    className="bg-surface-1 font-mono"
                  />
                </Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Requirements">
                    <Textarea
                      rows={3}
                      className="bg-surface-1"
                      placeholder="Node 20+, Postgres 15+"
                    />
                  </Field>
                  <Field label="Dependencies">
                    <Textarea
                      rows={3}
                      className="bg-surface-1 font-mono"
                      placeholder="next@15, tailwindcss@4, prisma@6"
                    />
                  </Field>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 max-w-3xl">
                <SectionTitle title="Pricing & licensing" desc="Choose how customers pay." />
                <Field label="Pricing model" required>
                  <RadioGroup
                    value={pricingModel}
                    onValueChange={setPricingModel}
                    className="grid grid-cols-3 gap-2"
                  >
                    {[
                      { v: "free", t: "Free" },
                      { v: "one-time", t: "One-time" },
                      { v: "subscription", t: "Subscription" },
                    ].map((o) => (
                      <label
                        key={o.v}
                        className={cn(
                          "cursor-pointer rounded-xl border p-4 text-center transition-colors",
                          pricingModel === o.v
                            ? "border-primary bg-primary/10"
                            : "border-border/60 hover:border-border",
                        )}
                      >
                        <RadioGroupItem value={o.v} className="sr-only" />
                        <div className="text-sm font-medium">{o.t}</div>
                      </label>
                    ))}
                  </RadioGroup>
                </Field>
                <div className="grid grid-cols-3 gap-4">
                  <Field label="Personal">
                    <Input placeholder="$49" className="bg-surface-1" />
                  </Field>
                  <Field label="Commercial">
                    <Input placeholder="$149" className="bg-surface-1" />
                  </Field>
                  <Field label="Enterprise">
                    <Input placeholder="$449" className="bg-surface-1" />
                  </Field>
                </div>
                <Field label="Included licenses">
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      "Source code included",
                      "Documentation included",
                      "Updates included (12mo)",
                      "Priority support included",
                    ].map((f) => (
                      <label
                        key={f}
                        className="flex items-center gap-2 text-sm rounded-lg border border-border/60 p-3 cursor-pointer"
                      >
                        <Switch defaultChecked />
                        <span>{f}</span>
                      </label>
                    ))}
                  </div>
                </Field>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6 max-w-3xl">
                <SectionTitle title="Categories, tags & SEO" desc="Help discovery." />
                <Field label="Primary category" required>
                  <Select>
                    <SelectTrigger className="bg-surface-1">
                      <SelectValue placeholder="Choose a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.slice(0, 20).map((c) => (
                        <SelectItem key={c.slug} value={c.slug}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Tags" desc="Comma-separated. Max 10.">
                  <Input placeholder="nextjs, tailwind, saas, dashboard" className="bg-surface-1" />
                </Field>
                <Field label="Tech stack">
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      "Next.js",
                      "React",
                      "TypeScript",
                      "Tailwind CSS",
                      "Prisma",
                      "Postgres",
                      "Stripe",
                      "tRPC",
                    ].map((t) => (
                      <Badge key={t} variant="outline" className="cursor-pointer hover:bg-accent">
                        + {t}
                      </Badge>
                    ))}
                  </div>
                </Field>
                <Field label="SEO title">
                  <Input
                    placeholder="Nexus Dashboard Pro — Enterprise dashboard boilerplate"
                    className="bg-surface-1"
                  />
                </Field>
                <Field label="SEO description">
                  <Textarea
                    rows={2}
                    className="bg-surface-1"
                    placeholder="Meta description for search engines..."
                  />
                </Field>
              </div>
            )}

            {step === 5 && (
              <div className="space-y-6 max-w-3xl">
                <SectionTitle title="Preview" desc="Review your product page before publishing." />
                <div className="card-elegant rounded-2xl p-8">
                  <Badge className="gradient-brand text-white border-transparent">Preview</Badge>
                  <h2 className="text-3xl font-semibold mt-3">Your Product Name</h2>
                  <p className="text-muted-foreground mt-1">Your tagline will appear here.</p>
                  <div className="mt-6 aspect-video rounded-xl gradient-brand grid place-items-center text-white text-6xl">
                    📦
                  </div>
                  <div className="mt-6 flex items-center gap-3">
                    <span className="text-4xl font-semibold">$149</span>
                    <Button className="gradient-brand text-white">Buy now</Button>
                  </div>
                </div>
              </div>
            )}

            {step === 6 && (
              <div className="space-y-6 max-w-3xl">
                <SectionTitle title="Publish" desc="Choose visibility and publish." />
                <Field label="Visibility">
                  <RadioGroup
                    value={visibility}
                    onValueChange={setVisibility}
                    className="space-y-2"
                  >
                    {[
                      { v: "public", t: "Public", d: "Anyone can find and buy your product." },
                      { v: "unlisted", t: "Unlisted", d: "Only people with the link can access." },
                      { v: "private", t: "Private", d: "Draft — not visible to anyone." },
                    ].map((o) => (
                      <label
                        key={o.v}
                        className={cn(
                          "cursor-pointer rounded-xl border p-4 flex items-start gap-3",
                          visibility === o.v ? "border-primary bg-primary/10" : "border-border/60",
                        )}
                      >
                        <RadioGroupItem value={o.v} className="mt-1" />
                        <div>
                          <div className="text-sm font-medium">{o.t}</div>
                          <div className="text-xs text-muted-foreground">{o.d}</div>
                        </div>
                      </label>
                    ))}
                  </RadioGroup>
                </Field>
                <Field label="Schedule (optional)">
                  <Input type="datetime-local" className="bg-surface-1" />
                </Field>
                <div className="rounded-xl border border-primary/40 bg-primary/5 p-4 text-sm flex items-start gap-3">
                  <Check className="size-5 text-primary mt-0.5" />
                  <div>
                    <div className="font-medium">Ready to publish</div>
                    <div className="text-muted-foreground text-xs mt-0.5">
                      Your product will be live in about 30 seconds after review.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Nav */}
            <div className="flex items-center justify-between mt-10 pt-6 border-t border-border/60">
              <Button
                variant="outline"
                disabled={step === 0}
                onClick={() => setStep(Math.max(0, step - 1))}
              >
                <ChevronLeft className="size-4 mr-1.5" />
                Back
              </Button>
              {step < steps.length - 1 ? (
                <Button
                  className="gradient-brand text-white"
                  onClick={() => setStep(Math.min(steps.length - 1, step + 1))}
                >
                  Continue <ChevronRight className="size-4 ml-1.5" />
                </Button>
              ) : (
                <Button asChild className="gradient-brand text-white">
                  <Link to="/creator/products">
                    <Rocket className="size-4 mr-1.5" />
                    Publish product
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}

function SectionTitle({ title, desc }: { title: string; desc: string }) {
  return (
    <div>
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-sm text-muted-foreground mt-0.5">{desc}</p>
    </div>
  );
}

function Field({
  label,
  desc,
  required,
  children,
}: {
  label: string;
  desc?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm">
        {label} {required && <span className="text-destructive">*</span>}
      </Label>
      {desc && <p className="text-xs text-muted-foreground">{desc}</p>}
      {children}
    </div>
  );
}
