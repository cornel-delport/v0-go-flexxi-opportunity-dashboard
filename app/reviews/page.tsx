import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Topbar } from "@/components/dashboard/topbar";
import { mockReviews } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

function formatDateTime(dateString: string): string {
  return new Date(dateString).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

const statusConfig = {
  pending: {
    label: "Pending",
    icon: Clock,
    className: "bg-warning/20 text-warning",
  },
  approved: {
    label: "Approved",
    icon: CheckCircle,
    className: "bg-success/20 text-success",
  },
  rejected: {
    label: "Rejected",
    icon: XCircle,
    className: "bg-destructive/20 text-destructive",
  },
};

export default function ReviewsPage() {
  const pendingReviews = mockReviews.filter((r) => r.status === "pending");
  const completedReviews = mockReviews.filter((r) => r.status !== "pending");

  return (
    <DashboardLayout>
      <Topbar
        title="Reviews"
        description="Manage opportunity review queue"
      />

      <div className="flex-1 overflow-auto p-6">
        <div className="mx-auto max-w-5xl space-y-8">
          {/* Stats */}
          <div className="grid gap-4 sm:grid-cols-3">
            <Card className="border-border bg-card">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-warning/20">
                  <Clock className="h-6 w-6 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {pendingReviews.length}
                  </p>
                  <p className="text-sm text-muted-foreground">Pending Reviews</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-success/20">
                  <CheckCircle className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {mockReviews.filter((r) => r.status === "approved").length}
                  </p>
                  <p className="text-sm text-muted-foreground">Approved</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-destructive/20">
                  <XCircle className="h-6 w-6 text-destructive" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {mockReviews.filter((r) => r.status === "rejected").length}
                  </p>
                  <p className="text-sm text-muted-foreground">Rejected</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pending Reviews */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">
              Pending Reviews
            </h2>
            {pendingReviews.length === 0 ? (
              <Card className="border-dashed border-border bg-card">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <CheckCircle className="h-12 w-12 text-success/50" />
                  <p className="mt-4 text-lg font-medium text-foreground">
                    All caught up!
                  </p>
                  <p className="text-sm text-muted-foreground">
                    No pending reviews at the moment
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {pendingReviews.map((review) => {
                  const config = statusConfig[review.status];
                  const StatusIcon = config.icon;

                  return (
                    <Card key={review.id} className="border-border bg-card">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2">
                              <span
                                className={cn(
                                  "inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium",
                                  config.className
                                )}
                              >
                                <StatusIcon className="h-3 w-3" />
                                {config.label}
                              </span>
                              <span className="text-sm text-muted-foreground">
                                Assigned to {review.reviewer}
                              </span>
                            </div>
                            <Link
                              href={`/opportunities/${review.opportunityId}`}
                              className="block font-medium text-foreground hover:text-primary"
                            >
                              {review.opportunityTitle}
                            </Link>
                            <div className="flex items-start gap-2 rounded-md bg-secondary/50 p-3">
                              <MessageSquare className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                              <p className="text-sm text-muted-foreground">
                                {review.notes}
                              </p>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Created {formatDateTime(review.createdAt)}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/opportunities/${review.opportunityId}`}>
                                <Eye className="mr-1 h-4 w-4" />
                                View
                              </Link>
                            </Button>
                            <Button
                              size="sm"
                              className="bg-success text-success-foreground hover:bg-success/90"
                            >
                              <CheckCircle className="mr-1 h-4 w-4" />
                              Approve
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                            >
                              <XCircle className="mr-1 h-4 w-4" />
                              Reject
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>

          {/* Completed Reviews */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">
              Recent Completed Reviews
            </h2>
            <Card className="border-border bg-card">
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {completedReviews.map((review) => {
                    const config = statusConfig[review.status];
                    const StatusIcon = config.icon;

                    return (
                      <div
                        key={review.id}
                        className="flex items-center justify-between p-4"
                      >
                        <div className="flex items-center gap-4">
                          <span
                            className={cn(
                              "inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium",
                              config.className
                            )}
                          >
                            <StatusIcon className="h-3 w-3" />
                            {config.label}
                          </span>
                          <div>
                            <Link
                              href={`/opportunities/${review.opportunityId}`}
                              className="font-medium text-foreground hover:text-primary"
                            >
                              {review.opportunityTitle}
                            </Link>
                            <p className="text-xs text-muted-foreground">
                              Reviewed by {review.reviewer} •{" "}
                              {formatDateTime(review.createdAt)}
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/opportunities/${review.opportunityId}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
