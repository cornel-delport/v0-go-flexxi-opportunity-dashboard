"use client";

import { useState } from "react";
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
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  Zap,
  Send,
  Eye,
  Sparkles,
  Gauge,
  Flame,
  Crosshair,
  Plane,
  CalendarRange,
  Globe,
  FileText,
  AlertCircle,
  Play,
} from "lucide-react";
import Link from "next/link";
import { use } from "react";
import type { ActivityEvent, ReviewComment, SourceType } from "@/lib/types";

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

function formatShortDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
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

// Score visualization with animated bar
function ScoreVisualization({ 
  label, 
  value, 
  icon: Icon,
  description 
}: { 
  label: string; 
  value: number; 
  icon: React.ElementType;
  description?: string;
}) {
  const getColorClass = (val: number) => {
    if (val >= 90) return { bg: "bg-success", text: "text-success", glow: "shadow-success/20" };
    if (val >= 75) return { bg: "bg-primary", text: "text-primary", glow: "shadow-primary/20" };
    if (val >= 60) return { bg: "bg-warning", text: "text-warning", glow: "shadow-warning/20" };
    return { bg: "bg-muted-foreground", text: "text-muted-foreground", glow: "" };
  };

  const colors = getColorClass(value);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${colors.bg}/10`}>
            <Icon className={`h-4 w-4 ${colors.text}`} />
          </div>
          <span className="text-sm font-medium text-foreground">{label}</span>
        </div>
        <span className={`text-2xl font-bold tabular-nums ${colors.text}`}>{value}%</span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className={`h-full rounded-full transition-all duration-500 ${colors.bg} ${colors.glow} shadow-lg`}
          style={{ width: `${value}%` }}
        />
      </div>
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
    </div>
  );
}

function TrendBadge({ trend }: { trend: "rising" | "stable" | "declining" }) {
  const config = {
    rising: { icon: TrendingUp, label: "Rising", className: "bg-success/10 text-success border-success/20" },
    stable: { icon: Minus, label: "Stable", className: "bg-muted text-muted-foreground border-border" },
    declining: { icon: TrendingDown, label: "Declining", className: "bg-destructive/10 text-destructive border-destructive/20" },
  };
  const { icon: Icon, label, className } = config[trend];

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${className}`}>
      <Icon className="h-3 w-3" />
      {label}
    </span>
  );
}

function ActivityIcon({ type }: { type: ActivityEvent["type"] }) {
  const config = {
    created: { icon: Zap, className: "bg-primary/10 text-primary border-primary/20" },
    status_change: { icon: CheckCircle, className: "bg-success/10 text-success border-success/20" },
    comment: { icon: MessageSquare, className: "bg-blue-500/10 text-blue-500 border-blue-500/20" },
    assigned: { icon: UserCheck, className: "bg-violet-500/10 text-violet-500 border-violet-500/20" },
    ai_analysis: { icon: Bot, className: "bg-primary/10 text-primary border-primary/20" },
    compliance_check: { icon: Shield, className: "bg-warning/10 text-warning border-warning/20" },
  };
  const { icon: Icon, className } = config[type];

  return (
    <div className={`flex h-9 w-9 items-center justify-center rounded-full border ${className}`}>
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

function getPlatformIcon(source: SourceType) {
  const icons: Record<SourceType, React.ReactNode> = {
    reddit: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
      </svg>
    ),
    twitter: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
    facebook: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
    instagram: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.757-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
      </svg>
    ),
    forum: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    discord: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/>
      </svg>
    ),
    telegram: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
      </svg>
    ),
  };
  return icons[source];
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function OpportunityDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const opportunity = mockOpportunities.find((opp) => opp.id === id);
  const [newComment, setNewComment] = useState("");
  const [assignTo, setAssignTo] = useState("");

  if (!opportunity) {
    return (
      <DashboardLayout>
        <Topbar title="Opportunity Not Found" />
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground" />
            <h2 className="mt-4 text-lg font-semibold">Opportunity not found</h2>
            <p className="mt-2 text-muted-foreground">The opportunity you're looking for doesn't exist.</p>
            <Button asChild className="mt-4">
              <Link href="/opportunities">Back to Opportunities</Link>
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Calculate urgency score based on event date proximity
  const eventDate = new Date(opportunity.eventDate);
  const now = new Date();
  const daysUntilEvent = Math.ceil((eventDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  const urgencyScore = daysUntilEvent <= 14 ? 95 : daysUntilEvent <= 30 ? 80 : daysUntilEvent <= 60 ? 60 : 40;

  // Derive detected signals from opportunity data
  const detectedSignals = {
    location: opportunity.location,
    eventType: opportunity.type.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase()),
    origin: "United Kingdom", // Mock data
    destination: opportunity.location.split(",")[0],
    dates: formatShortDate(opportunity.eventDate),
  };

  return (
    <DashboardLayout>
      <Topbar title="Opportunity Details" />

      <div className="flex-1 overflow-auto p-6">
        <div className="mx-auto max-w-7xl space-y-6">
          {/* Back Button & Quick Actions */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Button variant="ghost" asChild className="w-fit text-muted-foreground hover:text-foreground">
              <Link href="/opportunities">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Opportunities
              </Link>
            </Button>

            <div className="flex flex-wrap items-center gap-2">
              <Button variant="outline" size="sm" className="border-border bg-secondary/50">
                <Eye className="mr-2 h-4 w-4" />
                Monitor
              </Button>
              <Button variant="outline" size="sm" className="border-border bg-secondary/50">
                <Archive className="mr-2 h-4 w-4" />
                Archive
              </Button>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid gap-6 xl:grid-cols-3">
            {/* Left Column - Main Content */}
            <div className="space-y-6 xl:col-span-2">
              
              {/* AI Summary Card */}
              <Card className="border-border bg-card overflow-hidden">
                <CardHeader className="border-b border-border/50 bg-gradient-to-r from-primary/5 to-transparent pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/20">
                        <Sparkles className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">AI Summary</CardTitle>
                        <CardDescription>Automated opportunity analysis</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <TypeBadge type={opportunity.type} />
                      <StatusBadge status={opportunity.status} />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-3">
                    {opportunity.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {opportunity.description}
                  </p>
                  
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="flex items-center gap-3 rounded-lg bg-secondary/30 p-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary">
                        {getPlatformIcon(opportunity.source)}
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Source Platform</p>
                        <p className="font-medium capitalize text-foreground">{opportunity.source}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 rounded-lg bg-secondary/30 p-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary">
                        <Target className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Category</p>
                        <p className="font-medium text-foreground">{opportunity.type.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 rounded-lg bg-secondary/30 p-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Target City</p>
                        <p className="font-medium text-foreground">{opportunity.location.split(",")[0]}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 rounded-lg bg-secondary/30 p-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary">
                        <Users className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Est. Group Size</p>
                        <p className="font-medium text-foreground">{opportunity.groupSize.toLocaleString()} people</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Original Source Content */}
              <Card className="border-border bg-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 ring-1 ring-blue-500/20">
                        <FileText className="h-5 w-5 text-blue-500" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">Original Source Content</CardTitle>
                        <CardDescription>The post that triggered this opportunity</CardDescription>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="border-border" asChild>
                      <a href={opportunity.sourceUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View Original
                      </a>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-xl border border-border/50 bg-secondary/20 p-5">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12 border-2 border-border">
                        <AvatarImage src={opportunity.sourcePost.authorAvatar} />
                        <AvatarFallback>{opportunity.sourcePost.author.slice(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-foreground">{opportunity.sourcePost.author}</span>
                          <span className="text-muted-foreground">•</span>
                          <SourceBadge source={opportunity.source} />
                          <span className="text-muted-foreground">•</span>
                          <span className="text-sm text-muted-foreground">
                            {formatRelativeTime(opportunity.sourcePost.postedAt)}
                          </span>
                        </div>
                        <p className="mt-3 text-foreground/90 leading-relaxed whitespace-pre-wrap">
                          {opportunity.sourcePost.content}
                        </p>
                        <div className="flex items-center gap-6 mt-4 pt-4 border-t border-border/50">
                          <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                            <Heart className="h-4 w-4" />
                            {opportunity.sourcePost.engagement.likes.toLocaleString()}
                          </span>
                          <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                            <MessageSquare className="h-4 w-4" />
                            {opportunity.sourcePost.engagement.comments.toLocaleString()}
                          </span>
                          <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                            <Share2 className="h-4 w-4" />
                            {opportunity.sourcePost.engagement.shares.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Opportunity Analysis */}
              <Card className="border-border bg-card">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/20">
                      <Gauge className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Opportunity Analysis</CardTitle>
                      <CardDescription>AI-powered scoring and assessment</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <ScoreVisualization
                      label="Group Intent Score"
                      value={opportunity.demandMetrics.sentimentScore}
                      icon={Users}
                      description="Measures how serious and committed the group appears"
                    />
                    <ScoreVisualization
                      label="AI Confidence"
                      value={opportunity.confidence}
                      icon={Bot}
                      description="Overall confidence in opportunity validity"
                    />
                    <ScoreVisualization
                      label="Monetization Potential"
                      value={opportunity.monetizationScore}
                      icon={DollarSign}
                      description="Revenue potential based on group size and type"
                    />
                    <ScoreVisualization
                      label="Urgency Score"
                      value={urgencyScore}
                      icon={Flame}
                      description={`${daysUntilEvent} days until event date`}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Demand Signals */}
              <Card className="border-border bg-card">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-success/10 ring-1 ring-success/20">
                      <Crosshair className="h-5 w-5 text-success" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Detected Demand Signals</CardTitle>
                      <CardDescription>Extracted information from source content</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="flex items-start gap-3 rounded-lg border border-border/50 bg-secondary/20 p-4">
                      <MapPin className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Detected Location</p>
                        <p className="mt-1 font-semibold text-foreground">{detectedSignals.location}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 rounded-lg border border-border/50 bg-secondary/20 p-4">
                      <Target className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Event Type</p>
                        <p className="mt-1 font-semibold text-foreground">{detectedSignals.eventType}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 rounded-lg border border-border/50 bg-secondary/20 p-4">
                      <Plane className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Travel Route</p>
                        <p className="mt-1 font-semibold text-foreground">{detectedSignals.origin} → {detectedSignals.destination}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 rounded-lg border border-border/50 bg-secondary/20 p-4">
                      <CalendarRange className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Detected Dates</p>
                        <p className="mt-1 font-semibold text-foreground">{detectedSignals.dates}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 rounded-lg border border-border/50 bg-secondary/20 p-4">
                      <TrendingUp className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Growth Trend</p>
                        <div className="mt-1">
                          <TrendBadge trend={opportunity.demandMetrics.growthTrend} />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 rounded-lg border border-border/50 bg-secondary/20 p-4">
                      <Globe className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Potential Reach</p>
                        <p className="mt-1 font-semibold text-foreground">{opportunity.demandMetrics.potentialReach.toLocaleString()} users</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Revenue Projection */}
              <Card className="border-border bg-card">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-success/10 ring-1 ring-success/20">
                      <DollarSign className="h-5 w-5 text-success" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Revenue Projection</CardTitle>
                      <CardDescription>Estimated revenue based on historical data</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <div className="flex items-end justify-between mb-2">
                      <span className="text-xs text-muted-foreground">Conservative</span>
                      <span className="text-xs text-muted-foreground">Expected</span>
                      <span className="text-xs text-muted-foreground">Optimistic</span>
                    </div>
                    <div className="relative h-10 rounded-xl bg-secondary overflow-hidden">
                      <div 
                        className="absolute inset-y-0 left-0 bg-success/20 rounded-l-xl"
                        style={{ width: "100%" }}
                      />
                      <div 
                        className="absolute inset-y-0 left-0 bg-success/40"
                        style={{ width: `${(opportunity.revenueProjection.midEstimate / opportunity.revenueProjection.highEstimate) * 100}%` }}
                      />
                      <div 
                        className="absolute inset-y-0 left-0 bg-success rounded-l-xl"
                        style={{ width: `${(opportunity.revenueProjection.lowEstimate / opportunity.revenueProjection.highEstimate) * 100}%` }}
                      />
                    </div>
                    <div className="flex items-end justify-between mt-3">
                      <span className="text-lg font-semibold text-foreground">
                        {formatCurrency(opportunity.revenueProjection.lowEstimate)}
                      </span>
                      <span className="text-2xl font-bold text-success">
                        {formatCurrency(opportunity.revenueProjection.midEstimate)}
                      </span>
                      <span className="text-lg font-semibold text-foreground">
                        {formatCurrency(opportunity.revenueProjection.highEstimate)}
                      </span>
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-3 border-t border-border pt-4">
                    <div className="text-center p-3 rounded-lg bg-secondary/30">
                      <p className="text-xs text-muted-foreground">Avg. per Person</p>
                      <p className="text-xl font-bold text-foreground mt-1">
                        {formatCurrency(opportunity.revenueProjection.perPersonAverage)}
                      </p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-secondary/30">
                      <p className="text-xs text-muted-foreground">Est. Margin</p>
                      <p className="text-xl font-bold text-success mt-1">
                        {opportunity.revenueProjection.marginPercent}%
                      </p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-secondary/30">
                      <p className="text-xs text-muted-foreground">Group Size</p>
                      <p className="text-xl font-bold text-foreground mt-1">
                        {opportunity.groupSize}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Reviewer Comments */}
              <Card className="border-border bg-card">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 ring-1 ring-blue-500/20">
                      <MessageSquare className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Reviewer Comments</CardTitle>
                      <CardDescription>Team feedback and review notes</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {opportunity.reviewComments.length > 0 ? (
                    opportunity.reviewComments.map((comment) => (
                      <div key={comment.id} className="flex gap-3">
                        <CommentSentimentIndicator sentiment={comment.sentiment} />
                        <div className="flex-1 space-y-2 rounded-lg bg-secondary/20 p-4">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={comment.reviewerAvatar} />
                              <AvatarFallback>{comment.reviewer.slice(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium text-foreground">{comment.reviewer}</span>
                            <Badge variant="outline" className="text-xs capitalize">{comment.sentiment}</Badge>
                            <span className="text-xs text-muted-foreground ml-auto">
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
                    <p className="text-sm text-muted-foreground text-center py-6">
                      No comments yet. Be the first to add a review note.
                    </p>
                  )}
                  
                  {/* Add Comment */}
                  <div className="pt-4 border-t border-border/50">
                    <Textarea
                      placeholder="Add a review comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="min-h-[80px] bg-secondary/50 border-border resize-none"
                    />
                    <div className="flex justify-end mt-3">
                      <Button size="sm" disabled={!newComment.trim()}>
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
              {/* Reviewer Actions */}
              <Card className="border-border bg-card sticky top-6">
                <CardHeader className="border-b border-border/50 bg-gradient-to-r from-primary/5 to-transparent">
                  <CardTitle className="text-lg">Reviewer Actions</CardTitle>
                  <CardDescription>Take action on this opportunity</CardDescription>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <Button className="bg-success text-success-foreground hover:bg-success/90 h-12">
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Approve
                    </Button>
                    <Button variant="outline" className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground h-12">
                      <XCircle className="mr-2 h-4 w-4" />
                      Reject
                    </Button>
                  </div>
                  
                  <Button variant="outline" className="w-full border-border bg-secondary/50 h-11">
                    <Eye className="mr-2 h-4 w-4" />
                    Monitor
                  </Button>
                  
                  <Button variant="outline" className="w-full border-border bg-secondary/50 h-11">
                    <Play className="mr-2 h-4 w-4" />
                    Assign to Campaign
                  </Button>

                  <div className="pt-4 border-t border-border/50 space-y-3">
                    <label className="text-sm font-medium text-foreground">Assign to Reviewer</label>
                    <Select value={assignTo} onValueChange={setAssignTo}>
                      <SelectTrigger className="bg-secondary/50 border-border">
                        <SelectValue placeholder="Select reviewer..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sarah">Sarah Chen</SelectItem>
                        <SelectItem value="mike">Mike Johnson</SelectItem>
                        <SelectItem value="emma">Emma Williams</SelectItem>
                        <SelectItem value="david">David Brown</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="border-border bg-card">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Compliance</span>
                    <ComplianceBadge status={opportunity.complianceStatus} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Est. Revenue</span>
                    <span className="font-semibold text-success">{formatCurrency(opportunity.estimatedRevenue)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Event Date</span>
                    <span className="text-sm font-medium text-foreground">{formatShortDate(opportunity.eventDate)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Days Until Event</span>
                    <Badge variant={daysUntilEvent <= 14 ? "destructive" : daysUntilEvent <= 30 ? "secondary" : "outline"}>
                      {daysUntilEvent} days
                    </Badge>
                  </div>
                  {opportunity.assignedTo && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Assigned To</span>
                      <span className="text-sm font-medium text-foreground">{opportunity.assignedTo}</span>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Tags */}
              <Card className="border-border bg-card">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {opportunity.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-secondary/50">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Activity Timeline */}
              <Card className="border-border bg-card">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Activity Timeline</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="relative space-y-0">
                    {opportunity.activities.map((activity, index) => (
                      <div key={activity.id} className="relative flex gap-4 pb-6 last:pb-0">
                        {/* Timeline line */}
                        {index < opportunity.activities.length - 1 && (
                          <div className="absolute left-[18px] top-10 h-[calc(100%-24px)] w-px bg-border" />
                        )}
                        
                        <ActivityIcon type={activity.type} />
                        
                        <div className="flex-1 pt-1">
                          <p className="text-sm text-foreground leading-relaxed">
                            {activity.description}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-muted-foreground">{activity.user}</span>
                            <span className="text-xs text-muted-foreground">•</span>
                            <span className="text-xs text-muted-foreground">{formatRelativeTime(activity.timestamp)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
