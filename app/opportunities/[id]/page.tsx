import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Topbar } from "@/components/dashboard/topbar";
import { StatusBadge, ComplianceBadge } from "@/components/dashboard/status-badge";
import { SourceBadge } from "@/components/dashboard/source-badge";
import { TypeBadge } from "@/components/dashboard/type-badge";
import { mockOpportunities } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ArrowLeft,
  ExternalLink,
  Calendar,
  MapPin,
  Users,
  DollarSign,
  Target,
  TrendingUp,
  TrendingDown,
  Minus,
  MessageSquare,
  Heart,
  Share2,
  CheckCircle,
  XCircle,
  Archive,
  Clock,
  Bot,
  UserCheck,
  Shield,
  AlertTriangle,
  Zap,
  BarChart3,
  Send,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ActivityEvent, ReviewComment } from "@/lib/types";

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

function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${diffDays}d ago`;
}

function ScoreBar({ value, size = "default" }: { value: number; size?: "default" | "large" }) {
  const getColorClass = (val: number) => {
    if (val >= 90) return "bg-success";
    if (val >= 75) return "bg-primary";
    if (val >= 60) return "bg-warning";
    return "bg-muted-foreground";
  };

  return (
    <div className="flex items-center gap-3">
      <div className={`flex-1 overflow-hidden rounded-full bg-secondary ${size === "large" ? "h-3" : "h-2"}`}>
        <div
          className={`h-full rounded-full transition-all ${getColorClass(value)}`}
          style={{ width: `${value}%` }}
        />
      </div>
      <span className={`font-semibold ${getColorClass(value).replace("bg-", "text-")} ${size === "large" ? "text-xl" : "text-lg"}`}>
        {value}%
      </span>
    </div>
  );
}

function TrendBadge({ trend }: { trend: "rising" | "stable" | "declining" }) {
  const config = {
    rising: { icon: TrendingUp, label: "Rising", className: "bg-success/10 text-success" },
    stable: { icon: Minus, label: "Stable", className: "bg-muted text-muted-foreground" },
    declining: { icon: TrendingDown, label: "Declining", className: "bg-destructive/10 text-destructive" },
  };
  const { icon: Icon, label, className } = config[trend];

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${className}`}>
      <Icon className="h-3 w-3" />
      {label}
    </span>
  );
}

function ActivityIcon({ type }: { type: ActivityEvent["type"] }) {
  const config = {
    created: { icon: Zap, className: "bg-primary/10 text-primary" },
    status_change: { icon: CheckCircle, className: "bg-success/10 text-success" },
    comment: { icon: MessageSquare, className: "bg-blue-500/10 text-blue-500" },
    assigned: { icon: UserCheck, className: "bg-violet-500/10 text-violet-500" },
    ai_analysis: { icon: Bot, className: "bg-primary/10 text-primary" },
    compliance_check: { icon: Shield, className: "bg-warning/10 text-warning" },
  };
  const { icon: Icon, className } = config[type];

  return (
    <div className={`flex h-8 w-8 items-center justify-center rounded-full ${className}`}>
      <Icon className="h-4 w-4" />
    </div>
  );
}

function CommentSentimentIndicator({ sentiment }: { sentiment: ReviewComment["sentiment"] }) {
  const config = {
    positive: { className: "bg-success", label: "Positive" },
    neutral: { className: "bg-muted-foreground", label: "Neutral" },
    concern: { className: "bg-destructive", label: "Concern" },
  };
  const { className } = config[sentiment];

  return <div className={`h-full w-1 rounded-full ${className}`} />;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function OpportunityDetailPage({ params }: PageProps) {
  const { id } = await params;
  const opportunity = mockOpportunities.find((opp) => opp.id === id);

  if (!opportunity) {
    notFound();
  }

  return (
    <DashboardLayout>
      <Topbar title="Opportunity Details" />

      <div className="flex-1 overflow-auto p-6">
        <div className="mx-auto max-w-6xl space-y-6">
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
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="space-y-3 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <TypeBadge type={opportunity.type} />
                    <StatusBadge status={opportunity.status} />
                    <ComplianceBadge status={opportunity.complianceStatus} />
                  </div>
                  <h1 className="text-2xl font-bold text-foreground">
                    {opportunity.title}
                  </h1>
                  <p className="max-w-3xl text-muted-foreground leading-relaxed">
                    {opportunity.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4" />
                      {opportunity.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4" />
                      {formatDate(opportunity.eventDate)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Users className="h-4 w-4" />
                      {opportunity.groupSize.toLocaleString()} people
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-3">
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

          {/* Main Content Grid */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Left Column - Main Info */}
            <div className="space-y-6 lg:col-span-2">
              {/* Source Post Card */}
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    Original Source Post
                  </CardTitle>
                  <CardDescription>
                    The post that triggered this opportunity detection
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10 border border-border">
                      <AvatarImage src={opportunity.sourcePost.authorAvatar} />
                      <AvatarFallback>{opportunity.sourcePost.author.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-foreground">{opportunity.sourcePost.author}</span>
                        <span className="text-xs text-muted-foreground">
                          {formatRelativeTime(opportunity.sourcePost.postedAt)}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap">
                        {opportunity.sourcePost.content}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 border-t border-border pt-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Heart className="h-4 w-4" />
                      {opportunity.sourcePost.engagement.likes.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MessageSquare className="h-4 w-4" />
                      {opportunity.sourcePost.engagement.comments.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Share2 className="h-4 w-4" />
                      {opportunity.sourcePost.engagement.shares.toLocaleString()}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Group Demand Metrics */}
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Users className="h-5 w-5 text-primary" />
                    Group Demand Analysis
                  </CardTitle>
                  <CardDescription>
                    AI-analyzed demand signals and community engagement
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="space-y-1">
                      <p className="text-xs uppercase tracking-wider text-muted-foreground">Confirmed Interest</p>
                      <p className="text-2xl font-bold text-foreground">
                        {opportunity.demandMetrics.confirmedInterest.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground">verified engaged users</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs uppercase tracking-wider text-muted-foreground">Potential Reach</p>
                      <p className="text-2xl font-bold text-foreground">
                        {opportunity.demandMetrics.potentialReach.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground">total addressable audience</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs uppercase tracking-wider text-muted-foreground">Engagement Rate</p>
                      <p className="text-2xl font-bold text-foreground">
                        {opportunity.demandMetrics.engagementRate}%
                      </p>
                      <p className="text-xs text-muted-foreground">above platform average</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs uppercase tracking-wider text-muted-foreground">Growth Trend</p>
                      <TrendBadge trend={opportunity.demandMetrics.growthTrend} />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs uppercase tracking-wider text-muted-foreground">Sentiment Score</p>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-16 overflow-hidden rounded-full bg-secondary">
                          <div
                            className="h-full rounded-full bg-success"
                            style={{ width: `${opportunity.demandMetrics.sentimentScore}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-success">
                          {opportunity.demandMetrics.sentimentScore}%
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Revenue Projection */}
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <DollarSign className="h-5 w-5 text-primary" />
                    Revenue Projection
                  </CardTitle>
                  <CardDescription>
                    Estimated revenue based on group size and historical data
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <div className="flex items-end justify-between mb-2">
                      <span className="text-xs text-muted-foreground">Low</span>
                      <span className="text-xs text-muted-foreground">Mid</span>
                      <span className="text-xs text-muted-foreground">High</span>
                    </div>
                    <div className="relative h-8 rounded-lg bg-secondary overflow-hidden">
                      <div 
                        className="absolute inset-y-0 left-0 bg-primary/20 rounded-l-lg"
                        style={{ width: "100%" }}
                      />
                      <div 
                        className="absolute inset-y-0 left-0 bg-primary/40"
                        style={{ width: `${(opportunity.revenueProjection.midEstimate / opportunity.revenueProjection.highEstimate) * 100}%` }}
                      />
                      <div 
                        className="absolute inset-y-0 left-0 bg-primary rounded-l-lg"
                        style={{ width: `${(opportunity.revenueProjection.lowEstimate / opportunity.revenueProjection.highEstimate) * 100}%` }}
                      />
                    </div>
                    <div className="flex items-end justify-between mt-2">
                      <span className="text-sm font-semibold text-foreground">
                        {formatCurrency(opportunity.revenueProjection.lowEstimate)}
                      </span>
                      <span className="text-lg font-bold text-primary">
                        {formatCurrency(opportunity.revenueProjection.midEstimate)}
                      </span>
                      <span className="text-sm font-semibold text-foreground">
                        {formatCurrency(opportunity.revenueProjection.highEstimate)}
                      </span>
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2 border-t border-border pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Avg. per Person</span>
                      <span className="font-semibold text-foreground">
                        {formatCurrency(opportunity.revenueProjection.perPersonAverage)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Est. Margin</span>
                      <span className="font-semibold text-success">
                        {opportunity.revenueProjection.marginPercent}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Reviewer Comments */}
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    Reviewer Comments
                  </CardTitle>
                  <CardDescription>
                    Team feedback and review notes
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {opportunity.reviewComments.length > 0 ? (
                    opportunity.reviewComments.map((comment) => (
                      <div key={comment.id} className="flex gap-3">
                        <CommentSentimentIndicator sentiment={comment.sentiment} />
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-7 w-7">
                              <AvatarImage src={comment.reviewerAvatar} />
                              <AvatarFallback>{comment.reviewer.slice(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium text-foreground text-sm">{comment.reviewer}</span>
                            <span className="text-xs text-muted-foreground">
                              {formatRelativeTime(comment.timestamp)}
                            </span>
                          </div>
                          <p className="text-sm text-foreground/90 leading-relaxed">
                            {comment.comment}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No comments yet. Be the first to add a review note.
                    </p>
                  )}
                  
                  {/* Add Comment Form */}
                  <div className="border-t border-border pt-4 mt-4">
                    <Textarea 
                      placeholder="Add a review comment..."
                      className="bg-secondary/50 border-border resize-none"
                      rows={3}
                    />
                    <div className="flex justify-end mt-2">
                      <Button size="sm">
                        <Send className="mr-2 h-4 w-4" />
                        Add Comment
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* AI Confidence Score */}
              <Card className="border-border bg-card">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <Target className="h-4 w-4" />
                    AI Confidence Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScoreBar value={opportunity.confidence} size="large" />
                  <p className="mt-2 text-xs text-muted-foreground">
                    Based on engagement, source credibility, and historical patterns
                  </p>
                </CardContent>
              </Card>

              {/* Monetization Potential */}
              <Card className="border-border bg-card">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <BarChart3 className="h-4 w-4" />
                    Monetization Potential
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScoreBar value={opportunity.monetizationScore} size="large" />
                  <p className="mt-2 text-xs text-muted-foreground">
                    Based on group size, revenue estimate, and conversion likelihood
                  </p>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="border-border bg-card">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Quick Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Group Size
                    </span>
                    <span className="font-semibold text-foreground">
                      {opportunity.groupSize.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      Est. Revenue
                    </span>
                    <span className="font-semibold text-foreground">
                      {formatCurrency(opportunity.estimatedRevenue)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Event Date
                    </span>
                    <span className="font-semibold text-foreground text-right text-sm">
                      {formatDate(opportunity.eventDate).split(",")[0]}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Tags */}
              <Card className="border-border bg-card">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Tags
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {opportunity.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Activity Timeline */}
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    Activity Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative space-y-4">
                    {opportunity.activities.map((activity, index) => (
                      <div key={activity.id} className="flex gap-3">
                        <div className="relative flex flex-col items-center">
                          <ActivityIcon type={activity.type} />
                          {index < opportunity.activities.length - 1 && (
                            <div className="absolute top-8 bottom-0 w-px bg-border" style={{ height: "calc(100% - 8px)" }} />
                          )}
                        </div>
                        <div className="flex-1 pb-4">
                          <p className="text-sm text-foreground">{activity.description}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <span className="text-xs text-muted-foreground">{activity.user}</span>
                            <span className="text-xs text-border">•</span>
                            <span className="text-xs text-muted-foreground">
                              {formatRelativeTime(activity.timestamp)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Timestamps */}
              <Card className="border-border bg-card">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
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
                  {opportunity.assignedTo && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Assigned To</span>
                      <span className="text-foreground">{opportunity.assignedTo}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
