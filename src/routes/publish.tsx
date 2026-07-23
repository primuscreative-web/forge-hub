import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { SiteLayout, PageHeader } from "@/components/layouts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { creatorApi, CreatorApiError, type CreatorProductInput } from "@/lib/creator-api";
import { CATALOG_API_BASE_URL } from "@/lib/catalog-api";
import type { Category } from "@/lib/mock-data";

export const Route = createFileRoute("/publish")({
  validateSearch: (search: Record<string, unknown>): { id?: string } => typeof search.id === "string" ? { id: search.id } : {},
  component: ProductForm,
});

const types = ["saas", "template", "boilerplate", "ui_kit", "api", "sdk", "ai_agent", "prompt", "mcp", "devops", "documentation", "other"];
const slugify = (value: string) => value.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const empty: CreatorProductInput = { categoryId: "", name: "", slug: "", shortDescription: "", description: "", productType: "saas", priceCents: 0, currency: "USD", thumbnailUrl: null, gallery: [], version: "1.0.0", demoUrl: null, repositoryUrl: null, documentationUrl: null };

function ProductForm() {
  const { id } = Route.useSearch(); const navigate = useNavigate();
  const [form, setForm] = useState<CreatorProductInput>(empty); const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(Boolean(id)); const [saving, setSaving] = useState(false); const [error, setError] = useState("");
  const [price, setPrice] = useState("0");
  useEffect(() => {
    fetch(`${CATALOG_API_BASE_URL}/categories`).then((r) => r.ok ? r.json() : Promise.reject()).then(setCategories).catch(() => setError("Unable to load categories"));
    creatorApi.profile().catch((reason) => { if (reason instanceof CreatorApiError && reason.status === 404) window.location.assign("/creator"); });
    if (id) creatorApi.product(id).then((product) => { setForm(product); setPrice((product.priceCents / 100).toFixed(2)); }).catch((e) => setError(e.message)).finally(() => setLoading(false));
  }, [id]);
  const set = <K extends keyof CreatorProductInput>(key: K, value: CreatorProductInput[K]) => setForm((current) => ({ ...current, [key]: value }));
  async function save(event: FormEvent, publish: boolean) {
    event.preventDefault(); if (saving) return; setSaving(true); setError("");
    try {
      const input = { ...form, priceCents: Math.round(Number(price) * 100) };
      const product = id ? await creatorApi.updateProduct(id, input) : await creatorApi.createProduct(input);
      if (publish) { const live = await creatorApi.publishProduct(product.id); await navigate({ to: "/product/$slug", params: { slug: live.slug } }); }
      else await navigate({ to: "/creator/products" });
    } catch (reason) { setError(reason instanceof Error ? reason.message : "Unable to save product"); }
    finally { setSaving(false); }
  }
  if (loading) return <SiteLayout footer={false}><div className="p-12 text-center text-muted-foreground">Loading product…</div></SiteLayout>;
  return <SiteLayout footer={false}><div className="mx-auto max-w-4xl px-4 md:px-6 py-8"><PageHeader title={id ? "Edit product" : "Create a product"} description="Save a draft now and publish when every required field is ready." />
    <form className="card-elegant rounded-2xl p-6 space-y-6">
      <div className="grid gap-5 sm:grid-cols-2"><div><Label htmlFor="name">Name</Label><Input id="name" required minLength={2} maxLength={120} value={form.name} onChange={(e) => { set("name", e.target.value); if (!id && (!form.slug || form.slug === slugify(form.name))) set("slug", slugify(e.target.value)); }} /></div><div><Label htmlFor="slug">Slug</Label><Input id="slug" required value={form.slug} onChange={(e) => set("slug", slugify(e.target.value))} /></div></div>
      <div className="grid gap-5 sm:grid-cols-2"><div><Label>Category</Label><Select value={form.categoryId} onValueChange={(value) => set("categoryId", value)}><SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger><SelectContent>{categories.map((c) => <SelectItem key={c.slug} value={c.slug}>{c.name}</SelectItem>)}</SelectContent></Select></div><div><Label>Product type</Label><Select value={form.productType} onValueChange={(value) => set("productType", value)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{types.map((type) => <SelectItem key={type} value={type}>{type.replaceAll("_", " ")}</SelectItem>)}</SelectContent></Select></div></div>
      <div><Label htmlFor="short">Short description</Label><Input id="short" required maxLength={240} value={form.shortDescription} onChange={(e) => set("shortDescription", e.target.value)} /></div>
      <div><Label htmlFor="description">Full description</Label><Textarea id="description" required rows={9} maxLength={20000} value={form.description} onChange={(e) => set("description", e.target.value)} /></div>
      <div className="grid gap-5 sm:grid-cols-3"><div><Label htmlFor="price">Price (USD)</Label><Input id="price" type="number" min="0" step="0.01" required value={price} onChange={(e) => setPrice(e.target.value)} /><p className="mt-1 text-xs text-muted-foreground">Use 0 for a free product.</p></div><div><Label htmlFor="version">Version</Label><Input id="version" required value={form.version} onChange={(e) => set("version", e.target.value)} /></div><div><Label htmlFor="thumbnail">Thumbnail URL</Label><Input id="thumbnail" type="url" value={form.thumbnailUrl ?? ""} onChange={(e) => set("thumbnailUrl", e.target.value || null)} /></div></div>
      <div className="grid gap-5 sm:grid-cols-3"><div><Label htmlFor="demoUrl">Access or demo URL</Label><Input id="demoUrl" type="url" value={form.demoUrl ?? ""} onChange={(e) => set("demoUrl", e.target.value || null)} /></div><div><Label htmlFor="repositoryUrl">Repository URL</Label><Input id="repositoryUrl" type="url" value={form.repositoryUrl ?? ""} onChange={(e) => set("repositoryUrl", e.target.value || null)} /></div><div><Label htmlFor="documentationUrl">Documentation URL</Label><Input id="documentationUrl" type="url" value={form.documentationUrl ?? ""} onChange={(e) => set("documentationUrl", e.target.value || null)} /></div></div>
      {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
      <div className="flex flex-wrap justify-end gap-3"><Button type="button" variant="outline" disabled={saving} onClick={(e) => save(e, false)}>{saving ? "Saving…" : "Save draft"}</Button><Button type="submit" disabled={saving} onClick={(e) => save(e, true)} className="gradient-brand text-white">{saving ? "Publishing…" : "Publish product"}</Button></div>
    </form></div></SiteLayout>;
}
