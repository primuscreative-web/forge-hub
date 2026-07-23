import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout, PageHeader } from "@/components/layouts";
import { SideNav } from "@/components/side-nav";
import { settingsNav } from "@/components/nav-items";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ShieldCheck, Smartphone, KeyRound, Copy, Plus } from "lucide-react";

const m = (t: string, d: string) => ({
  meta: [
    { title: `${t} — Settings — DevForge Hub` },
    { name: "description", content: d },
    { property: "og:title", content: `${t} — Settings` },
    { property: "og:description", content: d },
  ],
});

// Appearance
export const AppearanceRoute = createFileRoute("/settings/appearance")({
  head: () => m("Appearance", "Choose theme, density, and interface preferences."),
  component: () => (
    <DashboardLayout side={<SideNav items={settingsNav} title="Settings" />}>
      <div className="p-6 md:p-8 max-w-[800px] space-y-6">
        <PageHeader title="Appearance" description="Customize how DevForge Hub looks and feels." />
        <div className="card-elegant rounded-2xl p-6 space-y-6">
          <div>
            <Label className="text-sm mb-3 block">Theme</Label>
            <RadioGroup defaultValue="dark" className="grid grid-cols-3 gap-3">
              {["dark", "light", "system"].map((t) => (
                <label
                  key={t}
                  className="cursor-pointer rounded-xl border border-border/60 p-4 has-[:checked]:border-primary has-[:checked]:bg-primary/10"
                >
                  <RadioGroupItem value={t} className="sr-only" />
                  <div
                    className="aspect-video rounded mb-2"
                    style={{
                      background:
                        t === "dark"
                          ? "oklch(0.15 0.02 265)"
                          : t === "light"
                            ? "#fff"
                            : "linear-gradient(135deg, oklch(0.15 0.02 265) 50%, #fff 50%)",
                    }}
                  />
                  <div className="text-sm font-medium capitalize">{t}</div>
                </label>
              ))}
            </RadioGroup>
          </div>
        </div>
      </div>
    </DashboardLayout>
  ),
});

export const Route = AppearanceRoute;
