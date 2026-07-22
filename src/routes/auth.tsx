import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layouts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Sparkles, Github, ChromeIcon as Chrome, Apple } from "lucide-react";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [
    { title: "Sign in — DevForge Hub" },
    { name: "description", content: "Sign in or create an account on DevForge Hub." },
    { property: "og:title", content: "Sign in — DevForge Hub" },
    { property: "og:description", content: "Sign in or create an account on DevForge Hub." },
  ]}),
  component: AuthPage,
});

function AuthPage() {
  return (
    <SiteLayout footer={false}>
      <div className="relative min-h-[calc(100vh-4rem)] grid place-items-center overflow-hidden py-12">
        <div className="absolute inset-0 gradient-hero opacity-60" />
        <div className="absolute inset-0 grid-dots opacity-40" />
        <div className="relative w-full max-w-md px-4">
          <Link to="/" className="mb-8 flex items-center gap-2 justify-center">
            <div className="flex size-9 items-center justify-center rounded-lg gradient-brand"><Sparkles className="size-4 text-white" /></div>
            <span className="font-semibold">DevForge Hub</span>
          </Link>
          <div className="card-elegant rounded-2xl p-6">
            <Tabs defaultValue="signin">
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="signin">Sign in</TabsTrigger>
                <TabsTrigger value="signup">Create account</TabsTrigger>
              </TabsList>
              <TabsContent value="signin" className="space-y-4 mt-6">
                <Providers />
                <Divider />
                <div className="space-y-2"><Label>Email</Label><Input type="email" placeholder="you@company.com" className="bg-surface-1" /></div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between"><Label>Password</Label><a href="#" className="text-xs text-primary hover:underline">Forgot?</a></div>
                  <Input type="password" placeholder="••••••••" className="bg-surface-1" />
                </div>
                <Button asChild className="w-full gradient-brand text-white hover:opacity-90 h-11"><Link to="/dashboard">Sign in</Link></Button>
              </TabsContent>
              <TabsContent value="signup" className="space-y-4 mt-6">
                <Providers />
                <Divider />
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2"><Label>First name</Label><Input placeholder="Ada" className="bg-surface-1" /></div>
                  <div className="space-y-2"><Label>Last name</Label><Input placeholder="Lovelace" className="bg-surface-1" /></div>
                </div>
                <div className="space-y-2"><Label>Email</Label><Input type="email" placeholder="you@company.com" className="bg-surface-1" /></div>
                <div className="space-y-2"><Label>Password</Label><Input type="password" placeholder="••••••••" className="bg-surface-1" /></div>
                <Button asChild className="w-full gradient-brand text-white h-11"><Link to="/dashboard">Create account</Link></Button>
                <p className="text-xs text-muted-foreground text-center">By continuing you agree to our Terms and Privacy Policy.</p>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}

function Providers() {
  return (
    <div className="grid grid-cols-3 gap-2">
      <Button variant="outline"><Github className="size-4" /></Button>
      <Button variant="outline"><Chrome className="size-4" /></Button>
      <Button variant="outline"><Apple className="size-4" /></Button>
    </div>
  );
}

function Divider() {
  return (
    <div className="relative flex items-center py-1">
      <div className="flex-grow border-t border-border/60" />
      <span className="mx-3 text-[10px] uppercase tracking-widest text-muted-foreground">or</span>
      <div className="flex-grow border-t border-border/60" />
    </div>
  );
}
