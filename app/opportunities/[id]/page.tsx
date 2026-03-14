import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Topbar } from "@/components/dashboard/topbar";
import { StatusBadge, ComplianceBadge } from "@/components/dashboard/status-badge";
import { SourceBadge } from "@/components/dashboard/source-badge";
import { TypeBadge } from "@/components/dashboard/type-badge";
import { mockOpportunities } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ExternalLink,
  Calendar,
  MapPin,
  Users,
  DollarSign,
  Target,
  Clock,
  User,
  Tag,
  CheckCircle,
  XCircle,
  Archive,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatDateTime(dateString: string): string {
  return new Date(dateString).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

interface PageProps {
  params: { id: string };
}

export default async function OpportunityDetailPage({ params }: PageProps) {
  const { id } = params;
  const opportunity = mockOpportunities.find((opp) => opp.id === id);

  if (!opportunity) {
    notFound();
  }

  return (
    <DashboardLayout>
      <Topbar title="Opportunity Details" />

      <div className="flex-1 overflow-auto p-6">
        <div className="mx-auto max-w-5xl space-y-6">
          {/* Back Button & Actions */}
          <div className="flex items-center justify-between">
            <Button variant="ghost" asChild className="text-muted-foreground">
              <Link href="/opportunities">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Opportunities
              </Link>
            </Button>

            <div className="flex items-center gap-2">
              <Button variant="outline" className="border-border">
                <Archive className="mr-2 h-4 w-4" />
                Archive
              </Button>
              <Button
                variant="outline"
                className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
              >
                <XCircle className="mr-2 h-4 w-4" />
                Reject
              </Button>
              <Button className="bg-success text-success-foreground hover:bg-success/90">
                <CheckCircle className="mr-2 h-4 w-4" />
                Approve
              </Button>
            </div>
          </div>

          {/* Header Card */}
          <Card className="border-border bg-card">
            <CardContent className="p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <TypeBadge type={opportunity.type} />
                    <StatusBadge status={opportunity.status} />
                    <ComplianceBadge status={opportunity.complianceStatus} />
                  </div>
                  <h1 className="text-2xl font-bold text-foreground">
                    {opportunity.title}
                  </h1>
                  <p className="max-w-2xl text-muted-foreground">
                    {opportunity.description}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <SourceBadge source={opportunity.source} />
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-border"
                    asChild
                  >
                    <a
                      href={opportunity.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View Source
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Details Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-border bg-card">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  Event Date
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold text-foreground">
                  {formatDate(opportunity.eventDate)}
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold text-foreground">
                  {opportunity.location}
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Users className="h-4 w-4" />
                  Group Size
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold text-foreground">
                  {opportunity.groupSize.toLocaleString()} people
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <DollarSign className="h-4 w-4" />
                  Estimated Revenue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold text-foreground">
                  {formatCurrency(opportunity.estimatedRevenue)}
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Target className="h-4 w-4" />
                  Confidence Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-secondary">
                    <div
                      className={`h-full rounded-full ${
                        opportunity.confidence >= 90
                          ? "bg-success"
                          : opportunity.confidence >= 75
                          ? "bg-warning"
                          : "bg-muted-foreground"
                      }`}
                      style={{ width: `${opportunity.confidence}%` }}
                    />
                  </div>
                  <span
                    className={`text-lg font-semibold ${
                      opportunity.confidence >= 90
                        ? "text-success"
                        : opportunity.confidence >= 75
                        ? "text-warning"
                        : "text-muted-foreground"
                    }`}
                  >
                    {opportunity.confidence}%
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <User className="h-4 w-4" />
                  Assigned To
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold text-foreground">
                  {opportunity.assignedTo || "Unassigned"}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Tags & Timestamps */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-border bg-card">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Tag className="h-4 w-4" />
                  Tags
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {opportunity.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="rounded-md bg-secondary px-2 py-1 text-sm text-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  Timeline
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Created</span>
                  <span className="text-foreground">
                    {formatDateTime(opportunity.createdAt)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Last Updated</span>
                  <span className="text-foreground">
                    {formatDateTime(opportunity.updatedAt)}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Activity Feed Placeholder */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-foreground">
                Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    action: "Status updated to Under Review",
                    user: opportunity.assignedTo || "System",
                    time: opportunity.updatedAt,
                  },
                  {
                    action: "Opportunity discovered",
                    user: "AI Scanner",
                    time: opportunity.createdAt,
                  },
                ].map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 border-l-2 border-border pl-4"
                  >
                    <div className="flex-1">
                      <p className="text-sm text-foreground">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">
                        by {activity.user} • {formatDateTime(activity.time)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
