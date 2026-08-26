import { useState } from "react";
import {
  BanknoteIcon,
  BellIcon,
  CalendarDaysIcon,
  ClipboardListIcon,
  CreditCardIcon,
  DownloadIcon,
  FileBarChartIcon,
  FileSignatureIcon,
  LifeBuoyIcon,
  MoreHorizontalIcon,
  PlusIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  TriangleAlertIcon,
  UserPlusIcon,
} from "lucide-react";

import { Badge } from "@/components/reui/badge";
import {
  Frame,
  FrameDescription,
  FrameFooter,
  FrameHeader,
  FramePanel,
  FrameTitle,
} from "@/components/reui/frame";
import { IconTile } from "@/components/reui/icon-tile";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Mock data                                                           */
/* ------------------------------------------------------------------ */

type Kpi = {
  label: string;
  value: string;
  delta: number;
  hint: string;
  icon: typeof BanknoteIcon;
  tone: string;
  spark: number[];
};

const kpis: Kpi[] = [
  {
    label: "Total revenue",
    value: "$128,430",
    delta: 12.5,
    hint: "vs last month",
    icon: BanknoteIcon,
    tone: "text-primary",
    spark: [12, 14, 13, 18, 17, 21, 24, 22, 26, 29, 27, 32],
  },
  {
    label: "Active orders",
    value: "2,540",
    delta: 8.2,
    hint: "vs last month",
    icon: ShoppingBagIcon,
    tone: "text-info",
    spark: [20, 19, 23, 22, 26, 25, 28, 30, 29, 33, 32, 36],
  },
  {
    label: "New customers",
    value: "1,208",
    delta: 3.1,
    hint: "vs last month",
    icon: UserPlusIcon,
    tone: "text-success",
    spark: [10, 12, 11, 14, 13, 15, 14, 17, 16, 18, 20, 19],
  },
  {
    label: "Pending approvals",
    value: "23",
    delta: -2.4,
    hint: "vs last month",
    icon: ClipboardListIcon,
    tone: "text-warning",
    spark: [30, 28, 29, 26, 27, 24, 25, 22, 24, 21, 20, 19],
  },
];

const revenueByPeriod: Record<string, { label: string; value: number }[]> = {
  "7D": [
    { label: "Mon", value: 42 },
    { label: "Tue", value: 38 },
    { label: "Wed", value: 51 },
    { label: "Thu", value: 47 },
    { label: "Fri", value: 62 },
    { label: "Sat", value: 58 },
    { label: "Sun", value: 71 },
  ],
  "30D": [
    { label: "Aug 1", value: 22 },
    { label: "Aug 4", value: 27 },
    { label: "Aug 7", value: 25 },
    { label: "Aug 10", value: 32 },
    { label: "Aug 13", value: 30 },
    { label: "Aug 16", value: 38 },
    { label: "Aug 19", value: 36 },
    { label: "Aug 22", value: 44 },
    { label: "Aug 25", value: 42 },
    { label: "Aug 28", value: 49 },
  ],
  "12M": [
    { label: "Sep", value: 28 },
    { label: "Oct", value: 31 },
    { label: "Nov", value: 29 },
    { label: "Dec", value: 41 },
    { label: "Jan", value: 36 },
    { label: "Feb", value: 44 },
    { label: "Mar", value: 42 },
    { label: "Apr", value: 51 },
    { label: "May", value: 48 },
    { label: "Jun", value: 56 },
    { label: "Jul", value: 53 },
    { label: "Aug", value: 64 },
  ],
};

const categories = [
  { label: "Services", value: "$48.2k", pct: 38, color: "var(--primary)" },
  { label: "Subscriptions", value: "$33.0k", pct: 26, color: "var(--info)" },
  { label: "Hardware", value: "$26.7k", pct: 21, color: "var(--success)" },
  { label: "Consulting", value: "$19.1k", pct: 15, color: "var(--warning)" },
];

type Order = {
  id: string;
  customer: string;
  initials: string;
  date: string;
  amount: string;
  status: "Paid" | "Pending" | "Refunded" | "Overdue";
};

const orders: Order[] = [
  { id: "INV-2041", customer: "Amelia Santos", initials: "AS", date: "Aug 24", amount: "$1,240.00", status: "Paid" },
  { id: "INV-2040", customer: "Marcus Chen", initials: "MC", date: "Aug 24", amount: "$860.00", status: "Paid" },
  { id: "INV-2039", customer: "Priya Sharma", initials: "PS", date: "Aug 23", amount: "$2,150.00", status: "Pending" },
  { id: "INV-2038", customer: "Jonas Weber", initials: "JW", date: "Aug 23", amount: "$430.00", status: "Paid" },
  { id: "INV-2037", customer: "Fatima Al-Rashid", initials: "FA", date: "Aug 22", amount: "$3,120.00", status: "Refunded" },
  { id: "INV-2036", customer: "Ethan Brooks", initials: "EB", date: "Aug 22", amount: "$760.00", status: "Paid" },
  { id: "INV-2035", customer: "Sofia Rossi", initials: "SR", date: "Aug 21", amount: "$1,890.00", status: "Overdue" },
  { id: "INV-2034", customer: "Liam O'Connor", initials: "LO", date: "Aug 21", amount: "$520.00", status: "Pending" },
];

const statusBadge: Record<Order["status"], { label: string; variant: "success-light" | "warning-light" | "info-light" | "destructive-light" }> = {
  Paid: { label: "Paid", variant: "success-light" },
  Pending: { label: "Pending", variant: "warning-light" },
  Refunded: { label: "Refunded", variant: "info-light" },
  Overdue: { label: "Overdue", variant: "destructive-light" },
};

const activities = [
  { id: 1, title: "New order #INV-2041 from Amelia Santos", time: "5 minutes ago", icon: ShoppingCartIcon, tone: "text-primary" },
  { id: 2, title: "Amelia Santos signed the new service contract", time: "32 minutes ago", icon: FileSignatureIcon, tone: "text-info" },
  { id: 3, title: "Weekly sales report generated", time: "2 hours ago", icon: FileBarChartIcon, tone: "text-success" },
  { id: 4, title: "Payment received — $2,150.00", time: "4 hours ago", icon: CreditCardIcon, tone: "text-primary" },
  { id: 5, title: "New support ticket #4812 opened", time: "6 hours ago", icon: LifeBuoyIcon, tone: "text-warning" },
  { id: 6, title: "Low stock alert — Wireless Sensor", time: "8 hours ago", icon: TriangleAlertIcon, tone: "text-destructive" },
];

/* ------------------------------------------------------------------ */
/* SVG chart primitives (dependency-free mockup charts)                */
/* ------------------------------------------------------------------ */

type Point = { x: number; y: number };

function toSmoothPath(points: Point[]): string {
  if (points.length < 2) return "";
  const d: string[] = [`M ${points[0].x},${points[0].y}`];
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d.push(`C ${c1x.toFixed(2)},${c1y.toFixed(2)} ${c2x.toFixed(2)},${c2y.toFixed(2)} ${p2.x},${p2.y}`);
  }
  return d.join(" ");
}

function fmtMoney(n: number): string {
  if (n >= 1000) {
    const k = n / 1000;
    return `$${Number.isInteger(k) ? k : k.toFixed(1)}k`;
  }
  return `$${n}`;
}

function AreaChart({ data, className }: { data: { label: string; value: number }[]; className?: string }) {
  const w = 800;
  const h = 240;
  const pad = { top: 16, right: 8, bottom: 28, left: 8 };
  const values = data.map((d) => d.value);
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const yMax = max + range * 0.2;
  const yMin = Math.max(0, min - range * 0.15);

  const innerW = w - pad.left - pad.right;
  const innerH = h - pad.top - pad.bottom;
  const stepX = innerW / (data.length - 1);

  const points: Point[] = data.map((d, i) => ({
    x: pad.left + i * stepX,
    y: pad.top + innerH - ((d.value - yMin) / (yMax - yMin)) * innerH,
  }));

  const linePath = toSmoothPath(points);
  const areaPath = `${linePath} L ${points[points.length - 1].x},${pad.top + innerH} L ${points[0].x},${pad.top + innerH} Z`;
  const gridCount = 4;
  const last = points[points.length - 1];

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={cn("w-full", className)} role="img" aria-label="Revenue over time">
      <defs>
        <linearGradient id="area-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.28" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
        </linearGradient>
      </defs>

      {Array.from({ length: gridCount + 1 }).map((_, i) => {
        const y = pad.top + (innerH / gridCount) * i;
        const val = yMax - ((yMax - yMin) / gridCount) * i;
        return (
          <g key={i}>
            <line x1={pad.left} x2={w - pad.right} y1={y} y2={y} stroke="var(--border)" strokeDasharray="3 3" />
            <text x={w - pad.right} y={y - 4} textAnchor="end" className="fill-muted-foreground" fontSize="10">
              {`$${Math.round(val)}k`}
            </text>
          </g>
        );
      })}

      <path d={areaPath} fill="url(#area-fill)" />
      <path
        d={linePath}
        fill="none"
        stroke="var(--primary)"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
      <circle cx={last.x} cy={last.y} r={4} fill="var(--primary)" stroke="var(--card)" strokeWidth={2} />

      {data.map((d, i) =>
        i % Math.ceil(data.length / 8) === 0 ? (
          <text key={i} x={points[i].x} y={h - 8} textAnchor="middle" className="fill-muted-foreground" fontSize="10">
            {d.label}
          </text>
        ) : null
      )}
    </svg>
  );
}

function Sparkline({ data, positive, className }: { data: number[]; positive: boolean; className?: string }) {
  const w = 96;
  const h = 28;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data.map((v, i) => ({
    x: (i / (data.length - 1)) * w,
    y: h - 2 - ((v - min) / range) * (h - 4),
  }));
  const d = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={cn("h-7 w-24", className)} aria-hidden="true">
      <path
        d={d}
        fill="none"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        className={positive ? "stroke-success" : "stroke-destructive"}
      />
    </svg>
  );
}

function DonutChart({ data }: { data: { label: string; value: string; pct: number; color: string }[] }) {
  const size = 168;
  const stroke = 18;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  let offset = 0;

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="size-42 -rotate-90" aria-hidden="true">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth={stroke} className="stroke-muted" />
      {data.map((d, i) => {
        const len = (d.pct / 100) * c;
        const el = (
          <circle
            key={i}
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            strokeWidth={stroke}
            stroke={d.color}
            strokeDasharray={`${len} ${c - len}`}
            strokeDashoffset={-offset}
            strokeLinecap="round"
          />
        );
        offset += len;
        return el;
      })}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Dashboard                                                           */
/* ------------------------------------------------------------------ */

export default function DashboardPage() {
  const [period, setPeriod] = useState("30D");
  const series = revenueByPeriod[period];
  const periodTotal = series.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6">
      {/* Header */}
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-muted-foreground">Tuesday, 26 August 2026</p>
          <h1 className="font-heading text-2xl font-semibold tracking-tight">Good morning, Alex</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Here's what's happening across BuzMag today.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline">
            <CalendarDaysIcon aria-hidden="true" />
            Aug 1 – Aug 26
          </Button>
          <Button variant="outline">
            <DownloadIcon aria-hidden="true" />
            Export
          </Button>
          <Button>
            <PlusIcon aria-hidden="true" />
            New report
          </Button>
          <Button variant="ghost" size="icon" aria-label="Notifications">
            <BellIcon aria-hidden="true" />
          </Button>
          <Avatar>
            <AvatarFallback className="bg-primary/10 text-primary">AX</AvatarFallback>
          </Avatar>
        </div>
      </header>

      {/* KPI cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => (
          <Card key={kpi.label}>
            <CardContent className="flex flex-col gap-4">
              <div className="flex items-start justify-between gap-3">
                <IconTile variant="soft" className={kpi.tone} aria-hidden="true">
                  <kpi.icon />
                </IconTile>
                <Badge variant={kpi.delta >= 0 ? "success-light" : "destructive-light"}>
                  {kpi.delta >= 0 ? <TrendingUpIcon aria-hidden="true" /> : <TrendingDownIcon aria-hidden="true" />}
                  {Math.abs(kpi.delta)}%
                </Badge>
              </div>
              <div className="space-y-1.5">
                <p className="text-xs text-muted-foreground">{kpi.label}</p>
                <p className="text-2xl font-medium tabular-nums tracking-tight">{kpi.value}</p>
              </div>
              <div className="flex items-end justify-between gap-3">
                <p className="text-xs text-muted-foreground">{kpi.hint}</p>
                <Sparkline data={kpi.spark} positive={kpi.delta >= 0} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue chart + category donut */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Tabs value={period} onValueChange={setPeriod} className="xl:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Revenue overview</CardTitle>
              <CardDescription>Income across all sales channels</CardDescription>
              <CardAction>
                <TabsList>
                  <TabsTrigger value="7D">7D</TabsTrigger>
                  <TabsTrigger value="30D">30D</TabsTrigger>
                  <TabsTrigger value="12M">12M</TabsTrigger>
                </TabsList>
              </CardAction>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col gap-5">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="text-3xl font-semibold tabular-nums tracking-tight">
                    {fmtMoney(periodTotal * 1000)}
                  </p>
                  <div className="mt-1.5 flex items-center gap-1.5">
                    <Badge variant="success-light">
                      <TrendingUpIcon aria-hidden="true" />
                      8.4%
                    </Badge>
                    <span className="text-xs text-muted-foreground">vs previous period</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-primary" aria-hidden="true" />
                    Revenue
                  </span>
                </div>
              </div>
              {Object.keys(revenueByPeriod).map((key) => (
                <TabsContent key={key} value={key} className="flex-1">
                  <AreaChart data={revenueByPeriod[key]} />
                </TabsContent>
              ))}
            </CardContent>
          </Card>
        </Tabs>

        <Card className="h-full">
          <CardHeader>
            <CardTitle>Sales by category</CardTitle>
            <CardDescription>Share of revenue this month</CardDescription>
            <CardAction>
              <DropdownMenu>
                <DropdownMenuTrigger render={<Button variant="ghost" size="icon" aria-label="More options" />}>
                  <MoreHorizontalIcon aria-hidden="true" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-44">
                  <DropdownMenuItem>View details</DropdownMenuItem>
                  <DropdownMenuItem>Download report</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive">Remove</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardAction>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col gap-6">
            <div className="relative mx-auto">
              <DonutChart data={categories} />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-2xl font-semibold tabular-nums tracking-tight">$127k</p>
                <p className="text-xs text-muted-foreground">Total sales</p>
              </div>
            </div>
            <div className="mt-auto space-y-3">
              {categories.map((c) => (
                <div key={c.label} className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full" style={{ backgroundColor: c.color }} aria-hidden="true" />
                    <span className="text-xs text-muted-foreground">{c.label}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-medium tabular-nums">{c.value}</span>
                    <span className="w-8 text-right text-xs text-muted-foreground tabular-nums">{c.pct}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Orders table + activity feed */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Recent orders</CardTitle>
            <CardDescription>Latest transactions across all channels</CardDescription>
            <CardAction>
              <Button variant="outline" size="sm">
                <DownloadIcon aria-hidden="true" />
                Export
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent className="px-0 pb-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2.5">
                        <Avatar size="sm" className="bg-muted">
                          <AvatarFallback className="text-[0.6rem] text-muted-foreground">
                            {order.initials}
                          </AvatarFallback>
                        </Avatar>
                        <span>{order.customer}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{order.date}</TableCell>
                    <TableCell className="text-right font-medium tabular-nums">{order.amount}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant={statusBadge[order.status].variant}>{statusBadge[order.status].label}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Frame className="h-full">
          <FramePanel className="h-full">
            <FrameHeader>
              <FrameTitle>Recent activity</FrameTitle>
              <FrameDescription>What happened in the last 24 hours</FrameDescription>
            </FrameHeader>
            <div className="space-y-4">
              {activities.map((item) => (
                <div key={item.id} className="flex items-start gap-3">
                  <IconTile variant="soft" size="sm" className={item.tone} aria-hidden="true">
                    <item.icon />
                  </IconTile>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium leading-relaxed">{item.title}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <FrameFooter>
              <Button variant="ghost" size="sm" className="w-full">
                View all activity
              </Button>
            </FrameFooter>
          </FramePanel>
        </Frame>
      </div>
    </div>
  );
}