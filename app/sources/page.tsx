"use client";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Topbar } from "@/components/dashboard/topbar";
import { mockOpportunities } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  TrendingUp,
  Users,
  MessageSquare,
  Globe,
  FileText,
  Activity,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Platform icons
function RedditIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
    </svg>
  );
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
    </svg>
  );
}

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/>
    </svg>
  );
}

// Platform data
const platforms = [
  {
    id: "reddit",
    name: "Reddit",
    icon: RedditIcon,
    color: "text-orange-500",
    bgColor: "bg-orange-500/20",
    status: "active" as const,
  },
  {
    id: "twitter",
    name: "X / Twitter",
    icon: TwitterIcon,
    color: "text-foreground",
    bgColor: "bg-foreground/20",
    status: "active" as const,
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: FacebookIcon,
    color: "text-blue-500",
    bgColor: "bg-blue-500/20",
    status: "active" as const,
  },
  {
    id: "telegram",
    name: "Telegram",
    icon: TelegramIcon,
    color: "text-sky-400",
    bgColor: "bg-sky-400/20",
    status: "active" as const,
  },
  {
    id: "discord",
    name: "Discord",
    icon: DiscordIcon,
    color: "text-indigo-400",
    bgColor: "bg-indigo-400/20",
    status: "paused" as const,
  },
  {
    id: "web",
    name: "Web Scraping",
    icon: Globe,
    color: "text-primary",
    bgColor: "bg-primary/20",
    status: "active" as const,
  },
  {
    id: "manual",
    name: "Manual Submissions",
    icon: FileText,
    color: "text-muted-foreground",
    bgColor: "bg-muted/50",
    status: "active" as const,
  },
];

// Calculate platform stats from mock data
function getPlatformStats(platformId: string) {
  const sourceMap: Record<string, string[]> = {
    reddit: ["reddit"],
    twitter: ["twitter"],
    facebook: ["facebook"],
    telegram: ["telegram"],
    discord: ["discord"],
    web: ["forum"],
    manual: ["manual"],
  };

  const sources = sourceMap[platformId] || [];
  const platformOpps = mockOpportunities.filter((opp) =>
    sources.includes(opp.source)
  );

  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  
  const thisWeek = platformOpps.filter(
    (opp) => new Date(opp.createdAt) >= weekAgo
  );

  const avgConfidence =
    platformOpps.length > 0
      ? Math.round(
          platformOpps.reduce((acc, opp) => acc + opp.confidence, 0) /
            platformOpps.length
        )
      : 0;

  const avgIntent =
    platformOpps.length > 0
      ? Math.round(
          platformOpps.reduce(
            (acc, opp) => acc + opp.demandMetrics.sentimentScore,
            0
          ) / platformOpps.length
        )
      : 0;

  return {
    total: platformOpps.length,
    thisWeek: thisWeek.length,
    avgConfidence,
    avgIntent,
  };
}

// Mock chart data for discovery over time
const chartData = [
  { day: "Mon", reddit: 12, twitter: 8, facebook: 15, telegram: 5, discord: 3, web: 7 },
  { day: "Tue", reddit: 15, twitter: 12, facebook: 10, telegram: 8, discord: 4, web: 9 },
  { day: "Wed", reddit: 8, twitter: 15, facebook: 12, telegram: 6, discord: 2, web: 11 },
  { day: "Thu", reddit: 20, twitter: 10, facebook: 18, telegram: 9, discord: 5, web: 8 },
  { day: "Fri", reddit: 18, twitter: 14, facebook: 14, telegram: 7, discord: 3, web: 12 },
  { day: "Sat", reddit: 10, twitter: 6, facebook: 8, telegram: 4, discord: 2, web: 5 },
  { day: "Sun", reddit: 8, twitter: 5, facebook: 6, telegram: 3, discord: 1, web: 4 },
];

// Active communities data
const activeCommunities = [
  { name: "r/reddevils", platform: "reddit", opportunities: 45, trend: "+12%" },
  { name: "r/LiverpoolFC", platform: "reddit", opportunities: 38, trend: "+8%" },
  { name: "@SwiftiesUK", platform: "twitter", opportunities: 32, trend: "+24%" },
  { name: "British Expats Portugal", platform: "facebook", opportunities: 28, trend: "+15%" },
  { name: "Coldplay Asia Tours", platform: "telegram", opportunities: 22, trend: "+18%" },
  { name: "Tech Golf Events", platform: "discord", opportunities: 18, trend: "+5%" },
  { name: "Magic Seaweed Forum", platform: "web", opportunities: 15, trend: "+10%" },
  { name: "Away Day Organizers", platform: "facebook", opportunities: 14, trend: "+7%" },
];

const statusConfig = {
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
  const totalOpportunities = mockOpportunities.length;
  const activePlatforms = platforms.filter((p) => p.status === "active").length;

  // Calculate max value for chart scaling
  const maxChartValue = Math.max(
    ...chartData.flatMap((d) => [d.reddit, d.twitter, d.facebook, d.telegram, d.discord, d.web])
  );

  return (
    <DashboardLayout>
      <Topbar
        title="Sources"
        description="Monitor opportunity discovery across platforms"
      />

      <div className="flex-1 overflow-auto p-6">
        <div className="mx-auto max-w-7xl space-y-6">
          {/* Header Stats */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 rounded-lg bg-secondary px-4 py-2">
                <Radio className="h-4 w-4 animate-pulse text-success" />
                <span className="text-sm font-medium text-foreground">
                  {activePlatforms} Active Platforms
                </span>
              </div>
              <div className="text-sm text-muted-foreground">
                {totalOpportunities.toLocaleString()} total opportunities discovered
              </div>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Source
            </Button>
          </div>

          {/* Platform Cards Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {platforms.map((platform) => {
              const stats = getPlatformStats(platform.id);
              const config = statusConfig[platform.status];
              const StatusIcon = config.icon;
              const PlatformIcon = platform.icon;

              return (
                <Card
                  key={platform.id}
                  className="group border-border bg-card transition-all duration-200 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "flex h-10 w-10 items-center justify-center rounded-lg",
                            platform.bgColor
                          )}
                        >
                          <PlatformIcon className={cn("h-5 w-5", platform.color)} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">
                            {platform.name}
                          </h3>
                          <span
                            className={cn(
                              "inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-xs font-medium",
                              config.className
                            )}
                          >
                            <StatusIcon className="h-3 w-3" />
                            {config.label}
                          </span>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <div className="rounded-lg bg-secondary/50 p-2">
                        <p className="text-xs text-muted-foreground">Total</p>
                        <p className="text-lg font-bold tabular-nums text-foreground">
                          {stats.total}
                        </p>
                      </div>
                      <div className="rounded-lg bg-secondary/50 p-2">
                        <p className="text-xs text-muted-foreground">This Week</p>
                        <p className="text-lg font-bold tabular-nums text-foreground">
                          {stats.thisWeek}
                        </p>
                      </div>
                      <div className="rounded-lg bg-secondary/50 p-2">
                        <p className="text-xs text-muted-foreground">Avg Confidence</p>
                        <p className="text-lg font-bold tabular-nums text-foreground">
                          {stats.avgConfidence}%
                        </p>
                      </div>
                      <div className="rounded-lg bg-secondary/50 p-2">
                        <p className="text-xs text-muted-foreground">Avg Intent</p>
                        <p className="text-lg font-bold tabular-nums text-foreground">
                          {stats.avgIntent}%
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex gap-2">
                      {platform.status === "active" ? (
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 border-border"
                        >
                          <Pause className="mr-1 h-3.5 w-3.5" />
                          Pause
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          className="flex-1 bg-success text-success-foreground hover:bg-success/90"
                        >
                          <Play className="mr-1 h-3.5 w-3.5" />
                          Resume
                        </Button>
                      )}
                      <Button variant="outline" size="sm" className="border-border">
                        <RefreshCw className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Discovery Chart */}
          <Card className="border-border bg-card">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-foreground">
                  Opportunity Discovery Over Time
                </CardTitle>
                <div className="flex items-center gap-4 text-xs">
                  {[
                    { key: "reddit", color: "bg-orange-500" },
                    { key: "twitter", color: "bg-foreground" },
                    { key: "facebook", color: "bg-blue-500" },
                    { key: "telegram", color: "bg-sky-400" },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center gap-1.5">
                      <div className={cn("h-2.5 w-2.5 rounded-full", item.color)} />
                      <span className="capitalize text-muted-foreground">{item.key}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative h-64">
                {/* Y-axis labels */}
                <div className="absolute left-0 top-0 flex h-full w-8 flex-col justify-between text-right text-xs text-muted-foreground">
                  <span>{maxChartValue}</span>
                  <span>{Math.round(maxChartValue * 0.75)}</span>
                  <span>{Math.round(maxChartValue * 0.5)}</span>
                  <span>{Math.round(maxChartValue * 0.25)}</span>
                  <span>0</span>
                </div>
                
                {/* Chart area */}
                <div className="ml-10 flex h-full items-end justify-between gap-2">
                  {chartData.map((data, index) => (
                    <div key={index} className="flex flex-1 flex-col items-center gap-1">
                      <div className="flex h-52 w-full items-end justify-center gap-0.5">
                        <div
                          className="w-2 rounded-t bg-orange-500 transition-all hover:opacity-80"
                          style={{ height: `${(data.reddit / maxChartValue) * 100}%` }}
                          title={`Reddit: ${data.reddit}`}
                        />
                        <div
                          className="w-2 rounded-t bg-foreground transition-all hover:opacity-80"
                          style={{ height: `${(data.twitter / maxChartValue) * 100}%` }}
                          title={`Twitter: ${data.twitter}`}
                        />
                        <div
                          className="w-2 rounded-t bg-blue-500 transition-all hover:opacity-80"
                          style={{ height: `${(data.facebook / maxChartValue) * 100}%` }}
                          title={`Facebook: ${data.facebook}`}
                        />
                        <div
                          className="w-2 rounded-t bg-sky-400 transition-all hover:opacity-80"
                          style={{ height: `${(data.telegram / maxChartValue) * 100}%` }}
                          title={`Telegram: ${data.telegram}`}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">{data.day}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Active Communities */}
          <Card className="border-border bg-card">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold text-foreground">
                    Most Active Communities
                  </CardTitle>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Top sources generating opportunities this month
                  </p>
                </div>
                <Button variant="outline" size="sm" className="border-border">
                  <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {activeCommunities.map((community, index) => {
                  const platform = platforms.find((p) => p.id === community.platform);
                  const PlatformIcon = platform?.icon || Globe;

                  return (
                    <div
                      key={index}
                      className="group flex items-center justify-between rounded-lg border border-border bg-secondary/30 p-3 transition-colors hover:bg-secondary/50"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "flex h-8 w-8 items-center justify-center rounded-lg",
                            platform?.bgColor || "bg-muted"
                          )}
                        >
                          <PlatformIcon className={cn("h-4 w-4", platform?.color || "text-muted-foreground")} />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {community.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {community.opportunities} opportunities
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className="border-success/30 bg-success/10 text-success"
                      >
                        <TrendingUp className="mr-1 h-3 w-3" />
                        {community.trend}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Integration CTA */}
          <Card className="border-dashed border-border bg-card/50">
            <CardContent className="flex items-center justify-between p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20">
                  <Activity className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    Expand Your Radar
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Connect additional platforms to discover more opportunities
                  </p>
                </div>
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
