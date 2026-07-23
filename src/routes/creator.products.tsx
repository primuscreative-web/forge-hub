import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { DashboardLayout, PageHeader } from "@/components/layouts";
import { SideNav } from "@/components/side-nav";
import { creatorNav } from "@/components/nav-items";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { creatorApi, type CreatorProduct } from "@/lib/creator-api";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/creator/products")({ component: MyProducts });

function MyProducts() {
  const [products, setProducts] = useState<CreatorProduct[]>([]); const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true); const [error, setError] = useState(""); const [busy, setBusy] = useState("");
  const load = () => creatorApi.products().then(setProducts).catch((e) => setError(e.message)).finally(() => setLoading(false));
  useEffect(() => { void load(); }, []);
  const filtered = useMemo(() => products.filter((p) => p.name.toLowerCase().includes(query.toLowerCase())), [products, query]);
  async function action(product: CreatorProduct, kind: "publish" | "unpublish" | "delete") {
    if (kind === "delete" && !window.confirm(`Delete ${product.name}? This cannot be undone.`)) return;
    setBusy(product.id); setError("");
    try { if (kind === "publish") await creatorApi.publishProduct(product.id); else if (kind === "unpublish") await creatorApi.unpublishProduct(product.id); else await creatorApi.deleteProduct(product.id); await load(); }
    catch (e) { setError(e instanceof Error ? e.message : "Unable to update product"); } finally { setBusy(""); }
  }
  return <DashboardLayout side={<SideNav items={creatorNav} title="Creator" />}><div className="p-6 md:p-8 max-w-[1400px]">
    <PageHeader title="Products" description={`${products.length} total · ${products.filter((p) => p.status === "published").length} published · ${products.filter((p) => p.status === "draft").length} drafts · ${products.filter((p) => p.status === "unpublished").length} unpublished`} actions={<Button asChild className="gradient-brand text-white"><Link to="/publish"><Plus className="size-4 mr-1.5" />New product</Link></Button>} />
    {error && <p role="alert" className="mb-4 text-sm text-destructive">{error}</p>}
    <div className="card-elegant rounded-2xl overflow-hidden"><div className="p-4 border-b"><Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search your products…" className="max-w-sm" /></div>
      <Table><TableHeader><TableRow><TableHead>Product</TableHead><TableHead>Status</TableHead><TableHead>Price</TableHead><TableHead>Category</TableHead><TableHead>Updated</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader><TableBody>
        {filtered.map((p) => <TableRow key={p.id}><TableCell><div className="font-medium">{p.name}</div><div className="text-xs text-muted-foreground">v{p.version}</div></TableCell><TableCell><Badge variant={p.status === "published" ? "default" : "outline"}>{p.status}</Badge></TableCell><TableCell>{p.priceCents === 0 ? "Free" : `$${(p.priceCents / 100).toFixed(2)}`}</TableCell><TableCell>{p.categoryId}</TableCell><TableCell>{new Date(p.updatedAt).toLocaleDateString()}</TableCell><TableCell><div className="flex justify-end gap-2"><Button size="sm" variant="outline" asChild><Link to="/publish" search={{ id: p.id } as never}>Edit</Link></Button>{p.status === "published" && <Button size="sm" variant="outline" asChild><Link to="/product/$slug" params={{ slug: p.slug }}>View</Link></Button>}<Button size="sm" variant="outline" disabled={busy === p.id} onClick={() => action(p, p.status === "published" ? "unpublish" : "publish")}>{p.status === "published" ? "Unpublish" : "Publish"}</Button><Button size="sm" variant="destructive" disabled={busy === p.id} onClick={() => action(p, "delete")}>Delete</Button></div></TableCell></TableRow>)}
        {!loading && filtered.length === 0 && <TableRow><TableCell colSpan={6} className="py-12 text-center text-muted-foreground">No products found. Create your first draft.</TableCell></TableRow>}
      </TableBody></Table>
    </div>
  </div></DashboardLayout>;
}
