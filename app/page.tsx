"use client";

// GoFlexxi Opportunity Discovery Dashboard
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Topbar } from "@/components/dashboard/topbar";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { StatusBadge, ComplianceBadge } from "@/components/dashboard/status-badge";
import { SourceBadge } from "@/components/dashboard/source-badge";
import { TypeBadge } from "@/components/dashboard/type-badge";
import { OpportunityRadar } from "@/components/dashboard/opportunity-radar";
import {
  mockDashboardStats,
  mockOpportunities,
} from "@/lib/mock-data";
import {
  Compass,
  TrendingUp,
  TrendingDown,
  Minus,
  Clock,
  CheckCircle,
  DollarSign,
  Target,
  ArrowUpRight,
  ExternalLink,
  BarChart3,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function ScoreBar({ value }: { value: number }) {
  const getColorClass = (val: number) => {
    if (val >= 90) return "bg-success";
    if (val >= 75) return "bg-primary";
    if (val >= 60) return "bg-warning";
    return "bg-muted-foreground";
  };

  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-12 overflow-hidden rounded-full bg-secondary">
        <div
          className={`h-full rounded-full ${getColorClass(value)}`}
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="text-xs font-medium text-muted-foreground">{value}%</span>
    </div>
  );
}

function TrendIndicator({ trend }: { trend: "rising" | "stable" | "declining" }) {
  if (trend === "rising") {
    return <TrendingUp className="h-3.5 w-3.5 text-success" />;
  }
  if (trend === "declining") {
    return <TrendingDown className="h-3.5 w-3.5 text-destructive" />;
  }
  return <Minus className="h-3.5 w-3.5 text-muted-foreground" />;
}

export default function DashboardPage() {
  const stats = mockDashboardStats;
  const recentOpportunities = mockOpportunities.slice(0, 5);

  return (
    <DashboardLayout>
      <Topbar
        title="Dashboard"
        description="Overview of your opportunity discovery pipeline"
      />

      <div className="flex-1 overflow-auto p-6">
        <div className="mx-auto max-w-7xl space-y-6">
          {/* KPI Cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            <KpiCard
              title="Total Opportunities"
              value={stats.totalOpportunities.toLocaleString()}
              change="+12% from last month"
              changeType="positive"
              trend="up"
              trendValue="12%"
              icon={Compass}
            />
            <KpiCard
              title="New This Week"
              value={stats.newThisWeek}
              change="+8 from yesterday"
              changeType="positive"
              trend="up"
              trendValue="8"
              icon={TrendingUp}
            />
            <KpiCard
              title="Pending Review"
              value={stats.pendingReview}
              change="5 high priority"
              changeType="neutral"
              trend="stable"
              icon={Clock}
            />
            <KpiCard
              title="Approved (Month)"
              value={stats.approvedThisMonth}
              change="+23% conversion"
              changeType="positive"
              trend="up"
              trendValue="23%"
              icon={CheckCircle}
            />
            <KpiCard
              title="Est. Revenue"
              value={formatCurrency(stats.estimatedRevenue)}
              change="+18% from last month"
              changeType="positive"
              trend="up"
              trendValue="18%"
              icon={DollarSign}
            />
            <KpiCard
              title="Avg Confidence"
              value={`${stats.avgConfidence}%`}
              change="+2% improvement"
              changeType="positive"
              trend="up"
              trendValue="2%"
              icon={Target}
            />
          </div>

          {/* Recent Opportunities */}
          <Card className="overflow-hidden border-border bg-card transition-all duration-200 hover:border-border/80">
            <CardHeader className="flex flex-row items-center justify-between border-b border-border/50 bg-secondary/20 pb-4">
              <div className="space-y-1">
                <CardTitle className="text-lg font-semibold tracking-tight text-foreground">
                  Recent Opportunities
                </CardTitle>
                <p className="text-xs text-muted-foreground">
                  Latest discovered opportunities from all sources
                </p>
              </div>
              <Button variant="outline" size="sm" asChild className="gap-1.5 border-border bg-secondary/50 hover:bg-secondary hover:text-primary">
                <Link href="/opportunities">
                  View All
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-secondary/30 text-left text-xs uppercase tracking-wider text-muted-foreground">
                      <th className="px-4 py-3 font-semibold">Opportunity</th>
                      <th className="px-4 py-3 font-semibold">Type</th>
                      <th className="px-4 py-3 font-semibold">Source</th>
                      <th className="px-4 py-3 font-semibold">Status</th>
                      <th className="px-4 py-3 font-semibold">Compliance</th>
                      <th className="px-4 py-3 font-semibold text-right">Group</th>
                      <th className="px-4 py-3 font-semibold text-right">Revenue</th>
                      <th className="px-4 py-3 font-semibold">Confidence</th>
                      <th className="px-4 py-3 font-semibold">Monetization</th>
                      <th className="px-4 py-3 font-semibold">Trend</th>
                      <th className="px-4 py-3 font-semibold"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {recentOpportunities.map((opp) => (
                      <tr
                        key={opp.id}
                        className="group text-sm transition-colors duration-150 hover:bg-primary/5"
                      >
                        <td className="px-4 py-4">
                          <div>
                            <Link
                              href={`/opportunities/${opp.id}`}
                              className="font-medium text-foreground transition-colors hover:text-primary"
                            >
                              {opp.title}
                            </Link>
                            <p className="mt-1 text-xs text-muted-foreground">
                              {opp.location} • {formatDate(opp.eventDate)}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <TypeBadge type={opp.type} />
                        </td>
                        <td className="px-4 py-4">
                          <SourceBadge source={opp.source} />
                        </td>
                        <td className="px-4 py-4">
                          <StatusBadge status={opp.status} />
                        </td>
                        <td className="px-4 py-4">
                          <ComplianceBadge status={opp.complianceStatus} />
                        </td>
                        <td className="px-4 py-4 text-right tabular-nums font-medium text-foreground">
                          {opp.groupSize.toLocaleString()}
                        </td>
                        <td className="px-4 py-4 text-right tabular-nums font-semibold text-foreground">
                          {formatCurrency(opp.estimatedRevenue)}
                        </td>
                        <td className="px-4 py-4">
                          <ScoreBar value={opp.confidence} />
                        </td>
                        <td className="px-4 py-4">
                          <ScoreBar value={opp.monetizationScore} />
                        </td>
                        <td className="px-4 py-4">
                          <TrendIndicator trend={opp.demandMetrics.growthTrend} />
                        </td>
                        <td className="px-4 py-4">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
                            asChild
                          >
                            <Link href={`/opportunities/${opp.id}`}>
                              <ExternalLink className="h-4 w-4" />
                            </Link>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Opportunity Radar */}
          <OpportunityRadar />

          {/* Quick Stats Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="group border-border bg-card transition-all duration-200 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
              <CardHeader className="pb-3">
                <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Top Sources This Week
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { source: "facebook" as const, count: 45 },
                  { source: "reddit" as const, count: 38 },
                  { source: "twitter" as const, count: 24 },
                ].map((item) => (
                  <div
                    key={item.source}
                    className="flex items-center justify-between rounded-lg p-2 transition-colors hover:bg-secondary/50"
                  >
                    <SourceBadge source={item.source} />
                    <span className="text-sm font-semibold tabular-nums text-foreground">
                      {item.count}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="group border-border bg-card transition-all duration-200 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
              <CardHeader className="pb-3">
                <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Popular Categories
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { type: "fan-travel" as const, count: 156 },
                  { type: "concert-demand" as const, count: 89 },
                  { type: "supporter-trip" as const, count: 67 },
                ].map((item) => (
                  <div
                    key={item.type}
                    className="flex items-center justify-between rounded-lg p-2 transition-colors hover:bg-secondary/50"
                  >
                    <TypeBadge type={item.type} />
                    <span className="text-sm font-semibold tabular-nums text-foreground">
                      {item.count}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="group border-border bg-card transition-all duration-200 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
              <CardHeader className="pb-3">
                <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Review Queue
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { status: "new" as const, count: 24 },
                  { status: "under-review" as const, count: 14 },
                  { status: "approved" as const, count: 67 },
                ].map((item) => (
                  <div
                    key={item.status}
                    className="flex items-center justify-between rounded-lg p-2 transition-colors hover:bg-secondary/50"
                  >
                    <StatusBadge status={item.status} />
                    <span className="text-sm font-semibold tabular-nums text-foreground">
                      {item.count}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
