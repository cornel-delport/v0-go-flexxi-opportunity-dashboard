"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Topbar } from "@/components/dashboard/topbar";
import { mockOpportunities } from "@/lib/mock-data";
import { SourceBadge } from "@/components/dashboard/source-badge";
import { TypeBadge } from "@/components/dashboard/type-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  MessageSquare,
  AlertTriangle,
  Copy,
  Flag,
  User,
  TrendingUp,
  Users,
  DollarSign,
  Calendar,
  MapPin,
  Zap,
  ChevronRight,
  Search,
  Filter,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Opportunity, OpportunityType } from "@/lib/types";

function formatDateTime(dateString: string): string {
  return new Date(dateString).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${diffDays}d ago`;
}

function ScoreBar({ value, label }: { value: number; label: string }) {
  const getColorClass = (val: number) => {
    if (val >= 90) return "bg-success";
    if (val >= 75) return "bg-primary";
    if (val >= 60) return "bg-warning";
    return "bg-muted-foreground";
  };

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium text-foreground">{value}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className={`h-full rounded-full transition-all ${getColorClass(value)}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

const reviewers = [
  { id: "sarah", name: "Sarah Chen", avatar: "SC" },
  { id: "mike", name: "Mike Johnson", avatar: "MJ" },
  { id: "emma", name: "Emma Williams", avatar: "EW" },
  { id: "david", name: "David Brown", avatar: "DB" },
];

const priorityLevels = [
  { value: "critical", label: "Critical", color: "bg-destructive text-destructive-foreground" },
  { value: "high", label: "High", color: "bg-warning text-warning-foreground" },
  { value: "medium", label: "Medium", color: "bg-primary text-primary-foreground" },
  { value: "low", label: "Low", color: "bg-muted text-muted-foreground" },
];

export default function ReviewsPage() {
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [platformFilter, setPlatformFilter] = useState<string>("all");
  const [reviewNotes, setReviewNotes] = useState("");
  const [adjustedGroupSize, setAdjustedGroupSize] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [complianceRisk, setComplianceRisk] = useState(false);
  const [priorityLevel, setPriorityLevel] = useState<string>("");

  // Filter opportunities that need review (new or under-review status)
  const reviewQueue = mockOpportunities.filter(
    (opp) => opp.status === "new" || opp.status === "under-review"
  );

  const filteredQueue = reviewQueue.filter((opp) => {
    const matchesSearch =
      opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlatform = platformFilter === "all" || opp.source === platformFilter;
    return matchesSearch && matchesPlatform;
  });

  // Stats
  const stats = {
    pendingReview: reviewQueue.filter((o) => o.status === "new").length,
    inProgress: reviewQueue.filter((o) => o.status === "under-review").length,
    approvedToday: mockOpportunities.filter((o) => o.status === "approved").length,
    rejectedToday: mockOpportunities.filter((o) => o.status === "rejected").length,
    avgReviewTime: "2.4h",
    reviewsThisWeek: 47,
  };

  const handleOpenDetail = (opp: Opportunity) => {
    setSelectedOpportunity(opp);
    setReviewNotes("");
    setAdjustedGroupSize(opp.groupSize.toString());
    setSelectedCategory(opp.type);
    setComplianceRisk(opp.complianceStatus === "flagged");
    setPriorityLevel(opp.confidence >= 90 ? "high" : opp.confidence >= 75 ? "medium" : "low");
  };

  return (
    <DashboardLayout>
      <Topbar
        title="Review Queue"
        description="Review and process incoming opportunities"
      />

      <div className="flex-1 overflow-auto p-6">
        <div className="mx-auto max-w-7xl space-y-6">
          {/* Stats Row */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
            <Card className="border-border bg-card">
              <CardContent className="flex items-center gap-3 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/20">
                  <Clock className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold tabular-nums text-foreground">
                    {stats.pendingReview}
                  </p>
                  <p className="text-xs text-muted-foreground">Pending</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardContent className="flex items-center gap-3 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
                  <Eye className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold tabular-nums text-foreground">
                    {stats.inProgress}
                  </p>
                  <p className="text-xs text-muted-foreground">In Review</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardContent className="flex items-center gap-3 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/20">
                  <CheckCircle className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold tabular-nums text-foreground">
                    {stats.approvedToday}
                  </p>
                  <p className="text-xs text-muted-foreground">Approved</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardContent className="flex items-center gap-3 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/20">
                  <XCircle className="h-5 w-5 text-destructive" />
                </div>
                <div>
                  <p className="text-2xl font-bold tabular-nums text-foreground">
                    {stats.rejectedToday}
                  </p>
                  <p className="text-xs text-muted-foreground">Rejected</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardContent className="flex items-center gap-3 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                  <Zap className="h-5 w-5 text-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold tabular-nums text-foreground">
                    {stats.avgReviewTime}
                  </p>
                  <p className="text-xs text-muted-foreground">Avg Time</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardContent className="flex items-center gap-3 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                  <TrendingUp className="h-5 w-5 text-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold tabular-nums text-foreground">
                    {stats.reviewsThisWeek}
                  </p>
                  <p className="text-xs text-muted-foreground">This Week</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search opportunities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 bg-secondary/50 pl-10 text-sm"
              />
            </div>
            <div className="flex items-center gap-3">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={platformFilter} onValueChange={setPlatformFilter}>
                <SelectTrigger className="h-9 w-[140px] border-border bg-secondary/50">
                  <SelectValue placeholder="Platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Platforms</SelectItem>
                  <SelectItem value="reddit">Reddit</SelectItem>
                  <SelectItem value="twitter">X / Twitter</SelectItem>
                  <SelectItem value="facebook">Facebook</SelectItem>
                  <SelectItem value="telegram">Telegram</SelectItem>
                  <SelectItem value="discord">Discord</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Review Queue Table */}
          <Card className="overflow-hidden border-border bg-card">
            <CardHeader className="border-b border-border/50 bg-secondary/20 pb-4">
              <CardTitle className="text-lg font-semibold tracking-tight text-foreground">
                Review Queue
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-secondary/30 text-left text-xs uppercase tracking-wider text-muted-foreground">
                      <th className="px-4 py-3 font-semibold">Opportunity</th>
                      <th className="px-4 py-3 font-semibold">Platform</th>
                      <th className="px-4 py-3 font-semibold">Category</th>
                      <th className="px-4 py-3 font-semibold">Confidence</th>
                      <th className="px-4 py-3 font-semibold">Group Intent</th>
                      <th className="px-4 py-3 font-semibold text-right">Group Size</th>
                      <th className="px-4 py-3 font-semibold">Discovered</th>
                      <th className="px-4 py-3 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {filteredQueue.map((opp) => (
                      <tr
                        key={opp.id}
                        className="group cursor-pointer text-sm transition-colors duration-150 hover:bg-primary/5"
                        onClick={() => handleOpenDetail(opp)}
                      >
                        <td className="px-4 py-4">
                          <div className="max-w-[280px]">
                            <div className="flex items-center gap-2">
                              {opp.confidence >= 85 && opp.monetizationScore >= 80 && (
                                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-warning/20">
                                  <Zap className="h-3 w-3 text-warning" />
                                </span>
                              )}
                              <span className="font-medium text-foreground">
                                {opp.title}
                              </span>
                            </div>
                            <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                              <MapPin className="h-3 w-3" />
                              <span>{opp.location}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <SourceBadge source={opp.source} />
                        </td>
                        <td className="px-4 py-4">
                          <TypeBadge type={opp.type} />
                        </td>
                        <td className="px-4 py-4">
                          <div className="w-24">
                            <ScoreBar value={opp.confidence} label="" />
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="w-24">
                            <ScoreBar value={opp.demandMetrics.sentimentScore} label="" />
                          </div>
                        </td>
                        <td className="px-4 py-4 text-right">
                          <span className="font-medium tabular-nums text-foreground">
                            {opp.groupSize.toLocaleString()}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <span className="text-muted-foreground">
                            {getRelativeTime(opp.createdAt)}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                            <Button
                              size="sm"
                              className="h-7 bg-success px-2 text-success-foreground hover:bg-success/90"
                            >
                              <CheckCircle className="h-3.5 w-3.5" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-7 border-destructive px-2 text-destructive hover:bg-destructive hover:text-destructive-foreground"
                            >
                              <XCircle className="h-3.5 w-3.5" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-7 border-border px-2"
                            >
                              <MessageSquare className="h-3.5 w-3.5" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-7 px-2 text-muted-foreground"
                            >
                              <Copy className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Reviewer Activity Summary */}
          <Card className="border-border bg-card">
            <CardHeader className="pb-4">
              <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Reviewer Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {reviewers.map((reviewer) => (
                  <div
                    key={reviewer.id}
                    className="flex items-center gap-3 rounded-lg border border-border bg-secondary/30 p-3 transition-colors hover:bg-secondary/50"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary">
                      {reviewer.avatar}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{reviewer.name}</p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <CheckCircle className="h-3 w-3 text-success" />
                          {Math.floor(Math.random() * 15) + 5}
                        </span>
                        <span className="flex items-center gap-1">
                          <XCircle className="h-3 w-3 text-destructive" />
                          {Math.floor(Math.random() * 5) + 1}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {Math.floor(Math.random() * 3) + 1}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Review Detail Panel */}
      <Sheet open={!!selectedOpportunity} onOpenChange={() => setSelectedOpportunity(null)}>
        <SheetContent className="w-full overflow-y-auto border-border bg-card sm:max-w-xl">
          {selectedOpportunity && (
            <>
              <SheetHeader className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <SheetTitle className="text-xl font-semibold text-foreground">
                      {selectedOpportunity.title}
                    </SheetTitle>
                    <SheetDescription className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5" />
                      {selectedOpportunity.location}
                    </SheetDescription>
                  </div>
                  <Button variant="outline" size="sm" asChild className="border-border">
                    <Link href={`/opportunities/${selectedOpportunity.id}`}>
                      <Eye className="mr-1.5 h-3.5 w-3.5" />
                      Full View
                    </Link>
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <SourceBadge source={selectedOpportunity.source} />
                  <TypeBadge type={selectedOpportunity.type} />
                  {selectedOpportunity.complianceStatus === "flagged" && (
                    <Badge variant="outline" className="border-destructive bg-destructive/10 text-destructive">
                      <AlertTriangle className="mr-1 h-3 w-3" />
                      Flagged
                    </Badge>
                  )}
                </div>
              </SheetHeader>

              <div className="mt-6 space-y-6">
                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg border border-border bg-secondary/30 p-3">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Users className="h-3.5 w-3.5" />
                      Group Size
                    </div>
                    <p className="mt-1 text-xl font-bold tabular-nums text-foreground">
                      {selectedOpportunity.groupSize.toLocaleString()}
                    </p>
                  </div>
                  <div className="rounded-lg border border-border bg-secondary/30 p-3">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <DollarSign className="h-3.5 w-3.5" />
                      Est. Revenue
                    </div>
                    <p className="mt-1 text-xl font-bold tabular-nums text-foreground">
                      {formatCurrency(selectedOpportunity.estimatedRevenue)}
                    </p>
                  </div>
                </div>

                {/* Scores */}
                <div className="space-y-3">
                  <ScoreBar value={selectedOpportunity.confidence} label="AI Confidence" />
                  <ScoreBar value={selectedOpportunity.monetizationScore} label="Monetization Potential" />
                  <ScoreBar value={selectedOpportunity.demandMetrics.sentimentScore} label="Group Intent" />
                </div>

                {/* Review Actions */}
                <div className="space-y-4 rounded-lg border border-border bg-secondary/20 p-4">
                  <h4 className="text-sm font-semibold text-foreground">Review Actions</h4>
                  
                  {/* Notes */}
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground">
                      Review Notes
                    </label>
                    <Textarea
                      placeholder="Add your review notes here..."
                      value={reviewNotes}
                      onChange={(e) => setReviewNotes(e.target.value)}
                      className="min-h-[80px] bg-input text-sm"
                    />
                  </div>

                  {/* Category */}
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground">
                      Category
                    </label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="bg-input">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fan-travel">Fan Travel</SelectItem>
                        <SelectItem value="concert-demand">Concert Demand</SelectItem>
                        <SelectItem value="supporter-trip">Supporter Trip</SelectItem>
                        <SelectItem value="surf-trip">Surf Trip</SelectItem>
                        <SelectItem value="expat-travel">Expat Travel</SelectItem>
                        <SelectItem value="charter">Charter</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Adjusted Group Size */}
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground">
                      Adjusted Group Size
                    </label>
                    <Input
                      type="number"
                      value={adjustedGroupSize}
                      onChange={(e) => setAdjustedGroupSize(e.target.value)}
                      className="bg-input"
                    />
                  </div>

                  {/* Priority Level */}
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground">
                      Priority Level
                    </label>
                    <Select value={priorityLevel} onValueChange={setPriorityLevel}>
                      <SelectTrigger className="bg-input">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {priorityLevels.map((level) => (
                          <SelectItem key={level.value} value={level.value}>
                            {level.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Compliance Risk */}
                  <div className="flex items-center justify-between rounded-lg border border-border bg-input p-3">
                    <div className="flex items-center gap-2">
                      <Flag className="h-4 w-4 text-destructive" />
                      <span className="text-sm font-medium text-foreground">
                        Mark Compliance Risk
                      </span>
                    </div>
                    <button
                      onClick={() => setComplianceRisk(!complianceRisk)}
                      className={cn(
                        "relative h-6 w-11 rounded-full transition-colors",
                        complianceRisk ? "bg-destructive" : "bg-secondary"
                      )}
                    >
                      <span
                        className={cn(
                          "absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-foreground transition-transform",
                          complianceRisk && "translate-x-5"
                        )}
                      />
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button className="flex-1 bg-success text-success-foreground hover:bg-success/90">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Approve
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                  >
                    <XCircle className="mr-2 h-4 w-4" />
                    Reject
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1 border-border">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Request Info
                  </Button>
                  <Button variant="outline" className="flex-1 border-border">
                    <Copy className="mr-2 h-4 w-4" />
                    Mark Duplicate
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </DashboardLayout>
  );
}
