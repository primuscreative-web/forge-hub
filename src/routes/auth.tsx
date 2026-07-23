import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layouts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Sparkles, Github, ChromeIcon as Chrome, Apple } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — DevForge Hub" },
      { name: "description", content: "Sign in or create an account on DevForge Hub." },
      { property: "og:title", content: "Sign in — DevForge Hub" },
      { property: "og:description", content: "Sign in or create an account on DevForge Hub." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { login, register } = useAuth();
  const [signinEmail, setSigninEmail] = useState("");
  const [signinPassword, setSigninPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const finish = () => {
    const requested = new URLSearchParams(window.location.search).get("redirect");
    window.location.assign(requested?.startsWith("/") && !requested.startsWith("//") ? requested : "/dashboard");
  };

  const onLogin = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setMessage("");
    const result = await login(signinEmail, signinPassword);
    setSubmitting(false);
    if (result.ok) finish();
    else setMessage(result.message);
  };

  const onRegister = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setMessage("");
    const result = await register(signupEmail, signupPassword, `${firstName} ${lastName}`.trim());
    setSubmitting(false);
    if (result.ok) finish();
    else setMessage(result.message);
  };

  return (
    <SiteLayout footer={false}>
      <div className="relative min-h-[calc(100vh-4rem)] grid place-items-center overflow-hidden py-12">
        <div className="absolute inset-0 gradient-hero opacity-60" />
        <div className="absolute inset-0 grid-dots opacity-40" />
        <div className="relative w-full max-w-md px-4">
          <Link to="/" className="mb-8 flex items-center gap-2 justify-center">
            <div className="flex size-9 items-center justify-center rounded-lg gradient-brand">
              <Sparkles className="size-4 text-white" />
            </div>
            <span className="font-semibold">DevForge Hub</span>
          </Link>
          <div className="card-elegant rounded-2xl p-6">
            <Tabs defaultValue="signin" onValueChange={() => setMessage("")}>
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="signin">Sign in</TabsTrigger>
                <TabsTrigger value="signup">Create account</TabsTrigger>
              </TabsList>
              <TabsContent value="signin" className="mt-6">
                <form className="space-y-4" onSubmit={onLogin}>
                  <Providers />
                  <Divider />
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input type="email" required autoComplete="email" value={signinEmail} onChange={(event) => setSigninEmail(event.target.value)} placeholder="you@company.com" className="bg-surface-1" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Password</Label>
                      <span className="text-xs text-muted-foreground">Forgot?</span>
                    </div>
                    <Input type="password" required minLength={10} maxLength={128} autoComplete="current-password" value={signinPassword} onChange={(event) => setSigninPassword(event.target.value)} placeholder="••••••••" className="bg-surface-1" />
                  </div>
                  {message && <p className="text-sm text-destructive" role="alert">{message}</p>}
                  <Button type="submit" disabled={submitting} className="w-full gradient-brand text-white hover:opacity-90 h-11">
                    {submitting ? "Signing in…" : "Sign in"}
                  </Button>
                </form>
              </TabsContent>
              <TabsContent value="signup" className="mt-6">
                <form className="space-y-4" onSubmit={onRegister}>
                  <Providers />
                  <Divider />
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label>First name</Label>
                      <Input required value={firstName} onChange={(event) => setFirstName(event.target.value)} placeholder="Ada" className="bg-surface-1" />
                    </div>
                    <div className="space-y-2">
                      <Label>Last name</Label>
                      <Input required value={lastName} onChange={(event) => setLastName(event.target.value)} placeholder="Lovelace" className="bg-surface-1" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input type="email" required autoComplete="email" value={signupEmail} onChange={(event) => setSignupEmail(event.target.value)} placeholder="you@company.com" className="bg-surface-1" />
                  </div>
                  <div className="space-y-2">
                    <Label>Password</Label>
                    <Input type="password" required minLength={10} maxLength={128} autoComplete="new-password" value={signupPassword} onChange={(event) => setSignupPassword(event.target.value)} placeholder="••••••••" className="bg-surface-1" />
                  </div>
                  {message && <p className="text-sm text-destructive" role="alert">{message}</p>}
                  <Button type="submit" disabled={submitting} className="w-full gradient-brand text-white h-11">
                    {submitting ? "Creating account…" : "Create account"}
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    By continuing you agree to our Terms and Privacy Policy.
                  </p>
                </form>
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
    <div className="grid grid-cols-3 gap-2" aria-label="Social sign-in coming soon">
      <Button type="button" variant="outline" disabled><Github className="size-4" /></Button>
      <Button type="button" variant="outline" disabled><Chrome className="size-4" /></Button>
      <Button type="button" variant="outline" disabled><Apple className="size-4" /></Button>
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
