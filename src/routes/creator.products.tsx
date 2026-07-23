import { createFileRoute, Link } from "@tanstack/react-router";
import { DashboardLayout, PageHeader } from "@/components/layouts";
import { SideNav } from "@/components/side-nav";
import { creatorNav } from "@/components/nav-items";
import { products } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Search, Plus, Eye, Download, Star } from "lucide-react";

export const Route = createFileRoute("/creator/products")({
  head: () => ({
    meta: [
      { title: "My products — DevForge Hub" },
      { name: "description", content: "Manage all products you've published on DevForge Hub." },
      { property: "og:title", content: "My products — DevForge Hub" },
      {
        property: "og:description",
        content: "Manage all products you've published on DevForge Hub.",
      },
    ],
  }),
  component: MyProducts,
});

function MyProducts() {
  const items = products.slice(0, 12);
  return (
    <DashboardLayout side={<SideNav items={creatorNav} title="Creator" />}>
      <div className="p-6 md:p-8 max-w-[1400px]">
        <PageHeader
          title="Products"
          description={`${items.length} products · 8 published · 3 drafts · 1 scheduled`}
          actions={
            <Button asChild className="gradient-brand text-white hover:opacity-90">
              <Link to="/publish">
                <Plus className="size-4 mr-1.5" />
                New product
              </Link>
            </Button>
          }
        />

        <div className="card-elegant rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-border/60 flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[220px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input placeholder="Search products..." className="pl-9 h-9 bg-surface-1" />
            </div>
            <Button variant="outline" size="sm">
              All statuses
            </Button>
            <Button variant="outline" size="sm">
              All categories
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Product</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Version</TableHead>
                <TableHead className="text-right">Views</TableHead>
                <TableHead className="text-right">Sales</TableHead>
                <TableHead className="text-right">Revenue</TableHead>
                <TableHead className="text-right">Rating</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((p, i) => (
                <TableRow key={p.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div
                        className="size-9 rounded-lg grid place-items-center text-lg"
                        style={{ background: p.gradient }}
                      >
                        {p.emoji}
                      </div>
                      <div>
                        <div className="text-sm font-medium">{p.name}</div>
                        <div className="text-xs text-muted-foreground">{p.category}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {i < 8 ? (
                      <Badge className="bg-success/20 text-success border-transparent">
                        Published
                      </Badge>
                    ) : i < 10 ? (
                      <Badge variant="outline">Draft</Badge>
                    ) : (
                      <Badge className="bg-info/20 text-info border-transparent">Scheduled</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-xs font-mono">v{p.version}</TableCell>
                  <TableCell className="text-right text-sm">
                    <span className="inline-flex items-center gap-1">
                      <Eye className="size-3 text-muted-foreground" />
                      {p.views.toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell className="text-right text-sm">
                    <span className="inline-flex items-center gap-1">
                      <Download className="size-3 text-muted-foreground" />
                      {p.sales.toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell className="text-right text-sm font-medium">
                    ${(p.price * p.sales).toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right text-sm">
                    <span className="inline-flex items-center gap-1">
                      <Star className="size-3 fill-warning text-warning" />
                      {p.rating}
                    </span>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-8">
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link to="/product/$slug" params={{ slug: p.slug }}>
                            View public page
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Publish update</DropdownMenuItem>
                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Unpublish</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
}
