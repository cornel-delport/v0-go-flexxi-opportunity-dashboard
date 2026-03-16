import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Topbar } from "@/components/dashboard/topbar";
import { SourceBadge } from "@/components/dashboard/source-badge";
import { mockSources } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Radio,
  Play,
  Pause,
  RefreshCw,
  ExternalLink,
  AlertCircle,
  CheckCircle,
  Plus,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SourceType } from "@/lib/types";

function formatDateTime(dateString: string): string {
  return new Date(dateString).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
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

const statusConfig: Record<
  string,
  {
    label: string;
    icon: React.ElementType;
    className: string;
  }
> = {
  active: {
    label: "Active",
    icon: CheckCircle,
    className: "bg-success/20 text-success",
  },
  paused: {
    label: "Paused",
    icon: Pause,
    className: "bg-warning/20 text-warning",
  },
  error: {
    label: "Error",
    icon: AlertCircle,
    className: "bg-destructive/20 text-destructive",
  },
};

export default function SourcesPage() {
  const activeSources = mockSources.filter((s) => s.status === "active");
  const totalOpportunities = mockSources.reduce(
    (acc, s) => acc + s.opportunitiesFound,
    0
  );

  return (
    <DashboardLayout>
      <Topbar
        title="Sources"
        description="Manage data sources and integrations"
      />

      <div className="flex-1 overflow-auto p-6">
        <div className="mx-auto max-w-5xl space-y-6">
          {/* Header Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 rounded-md bg-secondary px-3 py-2">
                <Radio className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-foreground">
                  {activeSources.length} Active
                </span>
              </div>
              <div className="text-sm text-muted-foreground">
                {totalOpportunities.toLocaleString()} opportunities discovered
              </div>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Source
            </Button>
          </div>

          {/* Sources Grid */}
          <div className="grid gap-4 md:grid-cols-2">
            {mockSources.map((source) => {
              const config = statusConfig[source.status];
              const StatusIcon = config.icon;

              return (
                <Card key={source.id} className="border-border bg-card">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <SourceBadge source={source.type as SourceType} />
                        <div>
                          <CardTitle className="text-base font-semibold text-foreground">
                            {source.name}
                          </CardTitle>
                        </div>
                      </div>
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium",
                          config.className
                        )}
                      >
                        <StatusIcon className="h-3 w-3" />
                        {config.label}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Last Sync</p>
                        <p className="font-medium text-foreground">
                          {getRelativeTime(source.lastSync)}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Opportunities</p>
                        <p className="font-medium text-foreground">
                          {source.opportunitiesFound.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {source.status === "active" ? (
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 border-border"
                        >
                          <Pause className="mr-1 h-4 w-4" />
                          Pause
                        </Button>
                      ) : source.status === "paused" ? (
                        <Button
                          size="sm"
                          className="flex-1 bg-success text-success-foreground hover:bg-success/90"
                        >
                          <Play className="mr-1 h-4 w-4" />
                          Resume
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          className="flex-1"
                        >
                          <RefreshCw className="mr-1 h-4 w-4" />
                          Retry
                        </Button>
                      )}
                      <Button variant="outline" size="sm" className="border-border">
                        <RefreshCw className="mr-1 h-4 w-4" />
                        Sync Now
                      </Button>
                      <Button variant="ghost" size="icon" asChild>
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>

                    {source.status === "error" && (
                      <div className="rounded-md bg-destructive/10 p-3">
                        <p className="text-sm text-destructive">
                          Connection failed. Please check API credentials.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Integration Info */}
          <Card className="border-dashed border-border bg-card/50">
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <h3 className="font-semibold text-foreground">
                  Need more sources?
                </h3>
                <p className="text-sm text-muted-foreground">
                  Connect additional platforms to expand your opportunity discovery
                </p>
              </div>
              <Button variant="outline" className="border-border">
                View Integrations
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
