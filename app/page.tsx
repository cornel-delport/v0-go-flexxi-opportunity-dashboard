import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Topbar } from "@/components/dashboard/topbar";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { StatusBadge, ComplianceBadge } from "@/components/dashboard/status-badge";
import { SourceBadge } from "@/components/dashboard/source-badge";
import { TypeBadge } from "@/components/dashboard/type-badge";
import {
  mockDashboardStats,
  mockOpportunities,
} from "@/lib/mock-data";
import {
  Compass,
  TrendingUp,
  Clock,
  CheckCircle,
  DollarSign,
  Target,
  ArrowUpRight,
  ExternalLink,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  OpportunityStatus,
  ComplianceStatus,
  SourceType,
  OpportunityType,
} from "@/lib/types";

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
              value={stats.opportunities.toLocaleString()}
              change="+12% from last month"
              changeType="positive"
              icon={Compass}
            />
            <KpiCard
              title="New This Week"
              value={stats.reviews}
              change="+8 from yesterday"
              changeType="positive"
              icon={TrendingUp}
            />
            <KpiCard
              title="Pending Review"
              value={stats.sources}
              change="5 high priority"
              changeType="neutral"
              icon={Clock}
            />
            <KpiCard
              title="Approved (Month)"
              value={stats.approvedThisMonth}
              change="+23% conversion"
              changeType="positive"
              icon={CheckCircle}
            />
            <KpiCard
              title="Est. Revenue"
              value={formatCurrency(stats.estimatedRevenue)}
              change="+18% from last month"
              changeType="positive"
              icon={DollarSign}
            />
            <KpiCard
              title="Avg Confidence"
              value={`${stats.avgConfidence}%`}
              change="+2% improvement"
              changeType="positive"
              icon={Target}
            />
          </div>

          {/* Recent Opportunities */}
          <Card className="border-border bg-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold text-foreground">
                Recent Opportunities
              </CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/opportunities" className="text-primary">
                  View All
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border text-left text-sm text-muted-foreground">
                      <th className="pb-3 font-medium">Opportunity</th>
                      <th className="pb-3 font-medium">Type</th>
                      <th className="pb-3 font-medium">Source</th>
                      <th className="pb-3 font-medium">Status</th>
                      <th className="pb-3 font-medium">Compliance</th>
                      <th className="pb-3 font-medium">Group Size</th>
                      <th className="pb-3 font-medium">Est. Revenue</th>
                      <th className="pb-3 font-medium">Confidence</th>
                      <th className="pb-3 font-medium"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {recentOpportunities.map((opp) => (
                      <tr
                        key={opp.id}
                        className="group text-sm hover:bg-secondary/50"
                      >
                        <td className="py-4 pr-4">
                          <div>
                            <Link
                              href={`/opportunities/${opp.id}`}
                              className="font-medium text-foreground hover:text-primary"
                            >
                              {opp.title}
                            </Link>
                            <p className="mt-0.5 text-xs text-muted-foreground">
                              {opp.location} • {formatDate(opp.eventDate)}
                            </p>
                          </div>
                        </td>
                        <td className="py-4 pr-4">
                          <TypeBadge type={opp.type as OpportunityType} />
                        </td>
                        <td className="py-4 pr-4">
                          <SourceBadge source={opp.source as SourceType} />
                        </td>
                        <td className="py-4 pr-4">
                          <StatusBadge status={opp.status as OpportunityStatus} />
                        </td>
                        <td className="py-4 pr-4">
                          <ComplianceBadge status={opp.complianceStatus as ComplianceStatus} />
                        </td>
                        <td className="py-4 pr-4 text-foreground">
                          {opp.groupSize.toLocaleString()}
                        </td>
                        <td className="py-4 pr-4 font-medium text-foreground">
                          {formatCurrency(opp.estimatedRevenue)}
                        </td>
                        <td className="py-4 pr-4">
                          <span
                            className={`
                              ${opp.confidence >= 90
                                ? "text-success"
                                : opp.confidence >= 75
                                ? "text-warning"
                                : "text-muted-foreground"}
                            `}
                          >
                            {opp.confidence}%
                          </span>
                        </td>
                        <td className="py-4">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="opacity-0 group-hover:opacity-100"
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

          {/* Quick Stats Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">
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
                    className="flex items-center justify-between"
                  >
                    <SourceBadge source={item.source} />
                    <span className="text-sm font-medium text-foreground">
                      {item.count} opportunities
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">
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
                    className="flex items-center justify-between"
                  >
                    <TypeBadge type={item.type} />
                    <span className="text-sm font-medium text-foreground">
                      {item.count}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">
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
                    className="flex items-center justify-between"
                  >
                    <StatusBadge status={item.status} />
                    <span className="text-sm font-medium text-foreground">
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
