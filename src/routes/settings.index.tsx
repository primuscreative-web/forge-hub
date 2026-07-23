import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout, PageHeader } from "@/components/layouts";
import { SideNav } from "@/components/side-nav";
import { settingsNav } from "@/components/nav-items";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const Route = createFileRoute("/settings/")({
  head: () => ({
    meta: [
      { title: "Settings — DevForge Hub" },
      { name: "description", content: "Manage your account, profile, and preferences." },
      { property: "og:title", content: "Settings — DevForge Hub" },
      { property: "og:description", content: "Manage your account and preferences." },
    ],
  }),
  component: () => (
    <DashboardLayout side={<SideNav items={settingsNav} title="Settings" />}>
      <div className="p-6 md:p-8 max-w-[900px] space-y-8">
        <PageHeader title="General" description="Your public profile and basic account info." />

        <Section title="Profile">
          <div className="flex items-center gap-4">
            <Avatar className="size-16">
              <AvatarFallback className="gradient-brand text-white text-xl">AL</AvatarFallback>
            </Avatar>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Upload new
              </Button>
              <Button variant="ghost" size="sm">
                Remove
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <Field label="Full name">
              <Input defaultValue="Acme Labs" className="bg-surface-1" />
            </Field>
            <Field label="Handle">
              <Input defaultValue="acme-labs" className="bg-surface-1 font-mono" />
            </Field>
          </div>
          <Field label="Bio">
            <Textarea
              rows={3}
              className="bg-surface-1"
              defaultValue="Building tools developers love."
            />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Website">
              <Input placeholder="https://" className="bg-surface-1" />
            </Field>
            <Field label="Location">
              <Input defaultValue="San Francisco" className="bg-surface-1" />
            </Field>
          </div>
        </Section>

        <Section title="Contact">
          <Field label="Email">
            <Input type="email" defaultValue="alex@acme.labs" className="bg-surface-1" />
          </Field>
          <Field label="Language">
            <Input defaultValue="English" className="bg-surface-1" />
          </Field>
        </Section>

        <div className="flex justify-end gap-2">
          <Button variant="outline">Cancel</Button>
          <Button className="gradient-brand text-white">Save changes</Button>
        </div>

        <Separator />

        <Section title="Danger zone">
          <div className="rounded-xl border border-destructive/40 bg-destructive/5 p-4 flex items-center justify-between">
            <div>
              <div className="text-sm font-medium">Delete account</div>
              <div className="text-xs text-muted-foreground">This action cannot be undone.</div>
            </div>
            <Button variant="destructive" size="sm">
              Delete account
            </Button>
          </div>
        </Section>
      </div>
    </DashboardLayout>
  ),
});

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="card-elegant rounded-2xl p-6 space-y-4">
      <h3 className="text-sm font-semibold">{title}</h3>
      {children}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm">{label}</Label>
      {children}
    </div>
  );
}
