import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { DashboardLayout, PageHeader, StatCard } from "@/components/layouts";
import { SideNav } from "@/components/side-nav";
import { creatorNav } from "@/components/nav-items";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { creatorApi, CreatorApiError, type CreatorProduct, type CreatorProfile } from "@/lib/creator-api";
import { FileText, PackageCheck, PackageOpen } from "lucide-react";

export const Route = createFileRoute("/creator/")({ component: CreatorDashboard });

const slugify = (value: string) => value.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function CreatorDashboard() {
  const [profile, setProfile] = useState<CreatorProfile | null>(null);
  const [products, setProducts] = useState<CreatorProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ displayName: "", slug: "", headline: "", bio: "" });

  useEffect(() => {
    creatorApi.profile().then(async (value) => {
      setProfile(value);
      setForm({ displayName: value.displayName, slug: value.slug, headline: value.headline, bio: value.bio });
      setProducts(await creatorApi.products());
    }).catch((reason) => {
      if (!(reason instanceof CreatorApiError && reason.status === 404)) setError(reason.message);
    }).finally(() => setLoading(false));
  }, []);

  async function activate(event: FormEvent) {
    event.preventDefault(); setSaving(true); setError("");
    try { setProfile(await creatorApi.createProfile(form)); }
    catch (reason) { setError(reason instanceof Error ? reason.message : "Unable to create creator profile"); }
    finally { setSaving(false); }
  }

  async function updateProfile(event: FormEvent) {
    event.preventDefault(); setSaving(true); setError("");
    try { const value = await creatorApi.updateProfile(form); setProfile(value); setEditing(false); }
    catch (reason) { setError(reason instanceof Error ? reason.message : "Unable to update creator profile"); }
    finally { setSaving(false); }
  }

  if (loading) return <DashboardLayout side={<SideNav items={creatorNav} title="Creator" />}><div className="p-8 text-muted-foreground">Loading creator profile…</div></DashboardLayout>;

  if (!profile) return (
    <DashboardLayout side={<SideNav items={creatorNav} title="Creator" />}>
      <div className="p-6 md:p-8 max-w-3xl">
        <PageHeader title="Become a creator" description="Create your public profile and start publishing products." />
        <form onSubmit={activate} className="card-elegant rounded-2xl p-6 space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div><Label htmlFor="displayName">Public name</Label><Input id="displayName" required minLength={2} maxLength={80} value={form.displayName} onChange={(e) => setForm({ ...form, displayName: e.target.value, slug: form.slug || slugify(e.target.value) })} /></div>
            <div><Label htmlFor="slug">Public slug</Label><Input id="slug" required pattern="[a-z0-9]+(?:-[a-z0-9]+)*" value={form.slug} onChange={(e) => setForm({ ...form, slug: slugify(e.target.value) })} /></div>
          </div>
          <div><Label htmlFor="headline">Headline</Label><Input id="headline" required minLength={2} maxLength={120} value={form.headline} onChange={(e) => setForm({ ...form, headline: e.target.value })} /></div>
          <div><Label htmlFor="bio">Biography</Label><Textarea id="bio" required minLength={10} maxLength={2000} rows={6} value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} /></div>
          {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
          <Button disabled={saving} className="gradient-brand text-white">{saving ? "Saving…" : "Activate creator profile"}</Button>
        </form>
      </div>
    </DashboardLayout>
  );

  const published = products.filter((p) => p.status === "published").length;
  const drafts = products.filter((p) => p.status === "draft").length;
  const unpublished = products.filter((p) => p.status === "unpublished").length;
  return (
    <DashboardLayout side={<SideNav items={creatorNav} title="Creator" />}>
      <div className="p-6 md:p-8 max-w-[1400px]">
        <PageHeader title={`Welcome, ${profile.displayName}`} description="Manage your public creator profile and products." actions={<Button asChild className="gradient-brand text-white"><Link to="/publish">Create product</Link></Button>} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Total products" value={String(products.length)} icon={<PackageOpen className="size-4" />} />
          <StatCard label="Published" value={String(published)} icon={<PackageCheck className="size-4" />} />
          <StatCard label="Drafts" value={String(drafts)} icon={<FileText className="size-4" />} />
          <StatCard label="Unpublished" value={String(unpublished)} icon={<PackageOpen className="size-4" />} />
        </div>
        <div className="mt-8 card-elegant rounded-2xl p-6">
          <div className="flex items-center justify-between"><div><h2 className="font-semibold">Public profile</h2><p className="text-sm text-muted-foreground">devforge hub / creator / {profile.slug}</p></div><Button variant="outline" onClick={() => setEditing(!editing)}>{editing ? "Cancel" : "Edit profile"}</Button></div>
          {editing ? <form onSubmit={updateProfile} className="mt-5 space-y-4"><div className="grid gap-4 sm:grid-cols-2"><div><Label>Public name</Label><Input required value={form.displayName} onChange={(e) => setForm({ ...form, displayName: e.target.value })} /></div><div><Label>Slug</Label><Input required value={form.slug} onChange={(e) => setForm({ ...form, slug: slugify(e.target.value) })} /></div></div><div><Label>Headline</Label><Input required value={form.headline} onChange={(e) => setForm({ ...form, headline: e.target.value })} /></div><div><Label>Biography</Label><Textarea required minLength={10} value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} /></div>{error && <p className="text-sm text-destructive">{error}</p>}<Button disabled={saving}>{saving ? "Saving…" : "Save profile"}</Button></form> : <div className="mt-4"><p className="font-medium">{profile.headline}</p><p className="mt-2 text-sm text-muted-foreground">{profile.bio}</p></div>}
        </div>
        <div className="mt-8 card-elegant rounded-2xl p-6">
          <div className="flex items-center justify-between"><div><h2 className="font-semibold">Recent products</h2><p className="text-sm text-muted-foreground">Your real catalog activity.</p></div><Button variant="outline" asChild><Link to="/creator/products">Manage all</Link></Button></div>
          <div className="mt-5 space-y-3">{products.slice(0, 5).map((product) => <div key={product.id} className="flex items-center justify-between rounded-xl border p-4"><div><p className="font-medium">{product.name}</p><p className="text-xs text-muted-foreground">Updated {new Date(product.updatedAt).toLocaleDateString()}</p></div><Badge variant={product.status === "published" ? "default" : "outline"}>{product.status}</Badge></div>)}{products.length === 0 && <div className="py-10 text-center text-muted-foreground">No products yet. Create your first draft to get started.</div>}</div>
        </div>
      </div>
    </DashboardLayout>
  );
}
