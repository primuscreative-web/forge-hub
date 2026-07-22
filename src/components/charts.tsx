import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import { generateRevenueSeries } from "@/lib/mock-data";

const brand = "oklch(0.68 0.19 292)";
const brand2 = "oklch(0.66 0.18 250)";
const brand3 = "oklch(0.78 0.14 210)";

export function RevenueChart({ height = 260, data }: { height?: number; data?: ReturnType<typeof generateRevenueSeries> }) {
  const series = data ?? generateRevenueSeries(30, 300);
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={series}>
        <defs>
          <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={brand} stopOpacity={0.5} />
            <stop offset="100%" stopColor={brand} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 0.06)" />
        <XAxis dataKey="date" tick={{ fontSize: 11, fill: "oklch(0.68 0.02 260)" }} axisLine={false} tickLine={false} tickFormatter={(d: string) => d.slice(5)} />
        <YAxis tick={{ fontSize: 11, fill: "oklch(0.68 0.02 260)" }} axisLine={false} tickLine={false} tickFormatter={(v: number) => `$${v}`} />
        <Tooltip contentStyle={{ background: "oklch(0.21 0.024 265)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 12, fontSize: 12 }} />
        <Area type="monotone" dataKey="revenue" stroke={brand} strokeWidth={2} fill="url(#revGrad)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function TrafficChart({ height = 220 }: { height?: number }) {
  const data = generateRevenueSeries(14, 500);
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 0.06)" />
        <XAxis dataKey="date" tick={{ fontSize: 11, fill: "oklch(0.68 0.02 260)" }} axisLine={false} tickLine={false} tickFormatter={(d: string) => d.slice(5)} />
        <YAxis tick={{ fontSize: 11, fill: "oklch(0.68 0.02 260)" }} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={{ background: "oklch(0.21 0.024 265)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 12, fontSize: 12 }} />
        <Line type="monotone" dataKey="visitors" stroke={brand2} strokeWidth={2} dot={false} />
        <Line type="monotone" dataKey="sales" stroke={brand3} strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function CategoryPie({ height = 240 }: { height?: number }) {
  const data = [
    { name: "SaaS", value: 32 },
    { name: "UI Kits", value: 18 },
    { name: "AI Agents", value: 22 },
    { name: "Infra", value: 14 },
    { name: "Other", value: 14 },
  ];
  const colors = [brand, brand2, brand3, "oklch(0.72 0.2 340)", "oklch(0.78 0.16 75)"];
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90} paddingAngle={4} strokeWidth={0}>
          {data.map((_, i) => <Cell key={i} fill={colors[i]} />)}
        </Pie>
        <Tooltip contentStyle={{ background: "oklch(0.21 0.024 265)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 12, fontSize: 12 }} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function SalesBarChart({ height = 240 }: { height?: number }) {
  const data = generateRevenueSeries(12, 400);
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 0.06)" />
        <XAxis dataKey="date" tick={{ fontSize: 11, fill: "oklch(0.68 0.02 260)" }} axisLine={false} tickLine={false} tickFormatter={(d: string) => d.slice(5)} />
        <YAxis tick={{ fontSize: 11, fill: "oklch(0.68 0.02 260)" }} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={{ background: "oklch(0.21 0.024 265)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 12, fontSize: 12 }} />
        <Bar dataKey="sales" fill={brand} radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
