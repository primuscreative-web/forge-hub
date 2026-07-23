import { ReactNode } from "react";
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Filter, MoreHorizontal } from "lucide-react";

export type Column<T> = {
  key: string;
  header: string;
  render: (row: T) => ReactNode;
  className?: string;
};

export function DataTable<T extends { id?: string | number }>({
  columns,
  rows,
  searchable = true,
  actions,
}: {
  columns: Column<T>[];
  rows: T[];
  searchable?: boolean;
  actions?: ReactNode;
}) {
  return (
    <div className="card-elegant rounded-2xl overflow-hidden">
      {(searchable || actions) && (
        <div className="p-4 border-b border-border/60 flex flex-wrap items-center gap-3">
          {searchable && (
            <div className="relative flex-1 min-w-[220px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input placeholder="Search..." className="pl-9 h-9 bg-surface-1" />
            </div>
          )}
          <Button variant="outline" size="sm">
            <Filter className="size-3.5 mr-1.5" />
            Filters
          </Button>
          {actions}
        </div>
      )}
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            {columns.map((c) => (
              <TableHead key={c.key} className={c.className}>
                {c.header}
              </TableHead>
            ))}
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={row.id ?? i}>
              {columns.map((c) => (
                <TableCell key={c.key} className={c.className}>
                  {c.render(row)}
                </TableCell>
              ))}
              <TableCell className="text-right">
                <Button variant="ghost" size="icon" className="size-8">
                  <MoreHorizontal className="size-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export function UserCell({
  name,
  sub,
  initials,
}: {
  name: string;
  sub?: string;
  initials: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <Avatar className="size-8">
        <AvatarFallback className="gradient-brand text-white text-xs">{initials}</AvatarFallback>
      </Avatar>
      <div>
        <div className="text-sm font-medium">{name}</div>
        {sub && <div className="text-xs text-muted-foreground">{sub}</div>}
      </div>
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Active: "bg-success/20 text-success border-transparent",
    Paid: "bg-success/20 text-success border-transparent",
    Published: "bg-success/20 text-success border-transparent",
    Pending: "bg-warning/20 text-warning border-transparent",
    Draft: "bg-muted text-muted-foreground border-transparent",
    Failed: "bg-destructive/20 text-destructive border-transparent",
    Refunded: "bg-info/20 text-info border-transparent",
    Suspended: "bg-destructive/20 text-destructive border-transparent",
    Open: "bg-info/20 text-info border-transparent",
    Resolved: "bg-success/20 text-success border-transparent",
    "Under review": "bg-warning/20 text-warning border-transparent",
  };
  return <Badge className={map[status] ?? "bg-muted"}>{status}</Badge>;
}
