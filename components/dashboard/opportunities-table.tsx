"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  ExternalLink,
  MoreHorizontal,
  Eye,
  CheckCircle,
  XCircle,
  TrendingUp,
  TrendingDown,
  Minus,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Send,
  Copy,
  AlertTriangle,
  Flame,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StatusBadge, ComplianceBadge } from "./status-badge";
import { TypeBadge } from "./type-badge";
import { cn } from "@/lib/utils";
import type { Opportunity, SourceType, OpportunityType, ComplianceStatus } from "@/lib/types";

interface OpportunitiesTableProps {
  opportunities: Opportunity[];
}

type SortField =
  | "title"
  | "type"
  | "source"
  | "status"
  | "groupSize"
  | "revenue"
  | "confidence"
  | "monetization"
  | "eventDate";
type SortDirection = "asc" | "desc";

const ITEMS_PER_PAGE_OPTIONS = [10, 25, 50, 100];

// Platform icons with proper styling
const platformIcons: Record<SourceType, { icon: React.ReactNode; color: string; bg: string }> = {
  reddit: {
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
      </svg>
    ),
    color: "text-orange-400",
    bg: "bg-orange-500/20",
  },
  twitter: {
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    color: "text-sky-400",
    bg: "bg-sky-500/20",
  },
  facebook: {
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
    color: "text-blue-400",
    bg: "bg-blue-500/20",
  },
  instagram: {
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.757-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
      </svg>
    ),
    color: "text-pink-400",
    bg: "bg-pink-500/20",
  },
  forum: {
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M12 2C6.486 2 2 5.589 2 10c0 2.908 1.897 5.516 5 6.934V22l5.34-4.005C17.697 17.852 22 14.32 22 10c0-4.411-4.486-8-10-8zm0 14h-.333L9 18v-2.417l-.641-.247C5.67 14.301 4 12.256 4 10c0-3.309 3.589-6 8-6s8 2.691 8 6-3.589 6-8 6z" />
      </svg>
    ),
    color: "text-slate-400",
    bg: "bg-slate-500/20",
  },
  discord: {
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
      </svg>
    ),
    color: "text-indigo-400",
    bg: "bg-indigo-500/20",
  },
  telegram: {
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
    color: "text-cyan-400",
    bg: "bg-cyan-500/20",
  },
};

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

function ScoreBar({
  value,
  label,
  variant = "default",
}: {
  value: number;
  label: string;
  variant?: "default" | "confidence" | "monetization";
}) {
  const getColorClass = (val: number) => {
    if (val >= 90) return "bg-emerald-500";
    if (val >= 75) return "bg-primary";
    if (val >= 60) return "bg-amber-500";
    return "bg-slate-500";
  };

  const getGradient = (val: number) => {
    if (variant === "confidence") {
      if (val >= 90) return "from-emerald-500 to-emerald-400";
      if (val >= 75) return "from-teal-500 to-teal-400";
      if (val >= 60) return "from-amber-500 to-amber-400";
      return "from-slate-500 to-slate-400";
    }
    if (variant === "monetization") {
      if (val >= 90) return "from-violet-500 to-purple-400";
      if (val >= 75) return "from-blue-500 to-blue-400";
      if (val >= 60) return "from-sky-500 to-sky-400";
      return "from-slate-500 to-slate-400";
    }
    return getColorClass(val);
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-2 min-w-[110px]">
            <div className="h-2 w-16 overflow-hidden rounded-full bg-secondary">
              <div
                className={cn(
                  "h-full rounded-full transition-all bg-gradient-to-r",
                  getGradient(value)
                )}
                style={{ width: `${value}%` }}
              />
            </div>
            <span
              className={cn(
                "text-xs font-semibold tabular-nums w-9 text-right",
                value >= 90
                  ? "text-emerald-400"
                  : value >= 75
                  ? "text-primary"
                  : value >= 60
                  ? "text-amber-400"
                  : "text-muted-foreground"
              )}
            >
              {value}%
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent side="top" className="bg-popover border-border">
          <p className="text-xs">
            {label}: <span className="font-semibold">{value}%</span>
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

function TrendIndicator({ trend }: { trend: "rising" | "stable" | "declining" }) {
  if (trend === "rising") {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="flex items-center justify-center rounded-full bg-emerald-500/10 p-1.5 text-emerald-400">
              <TrendingUp className="h-3.5 w-3.5" />
            </span>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p className="text-xs">Demand Rising</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
  if (trend === "declining") {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="flex items-center justify-center rounded-full bg-red-500/10 p-1.5 text-red-400">
              <TrendingDown className="h-3.5 w-3.5" />
            </span>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p className="text-xs">Demand Declining</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="flex items-center justify-center rounded-full bg-slate-500/10 p-1.5 text-slate-400">
            <Minus className="h-3.5 w-3.5" />
          </span>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p className="text-xs">Demand Stable</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

function PlatformBadge({ source }: { source: SourceType }) {
  const config = platformIcons[source];
  const labels: Record<SourceType, string> = {
    reddit: "Reddit",
    twitter: "X/Twitter",
    facebook: "Facebook",
    instagram: "Instagram",
    forum: "Forum",
    discord: "Discord",
    telegram: "Telegram",
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors",
              config.bg,
              config.color
            )}
          >
            {config.icon}
            <span className="hidden sm:inline">{labels[source]}</span>
          </span>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p className="text-xs">Source: {labels[source]}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

function HighPriorityIndicator() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="ml-1.5 inline-flex items-center">
            <Flame className="h-3.5 w-3.5 text-orange-500 animate-pulse" />
          </span>
        </TooltipTrigger>
        <TooltipContent side="top" className="bg-orange-500/90 border-orange-600">
          <p className="text-xs font-medium text-white">High Priority</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

function SortableHeader({
  label,
  field,
  currentSort,
  currentDirection,
  onSort,
  align = "left",
}: {
  label: string;
  field: SortField;
  currentSort: SortField;
  currentDirection: SortDirection;
  onSort: (field: SortField) => void;
  align?: "left" | "right";
}) {
  const isActive = currentSort === field;

  return (
    <button
      onClick={() => onSort(field)}
      className={cn(
        "group flex items-center gap-1 text-xs font-semibold uppercase tracking-wider transition-colors hover:text-foreground",
        align === "right" && "ml-auto",
        isActive ? "text-primary" : "text-muted-foreground"
      )}
    >
      {label}
      <span
        className={cn(
          "transition-opacity",
          isActive ? "opacity-100" : "opacity-0 group-hover:opacity-50"
        )}
      >
        {isActive ? (
          currentDirection === "asc" ? (
            <ArrowUp className="h-3.5 w-3.5" />
          ) : (
            <ArrowDown className="h-3.5 w-3.5" />
          )
        ) : (
          <ArrowUpDown className="h-3.5 w-3.5" />
        )}
      </span>
    </button>
  );
}

export function OpportunitiesTable({ opportunities }: OpportunitiesTableProps) {
  // Sorting state
  const [sortField, setSortField] = useState<SortField>("eventDate");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  // Column filter state
  const [columnSourceFilter, setColumnSourceFilter] = useState<SourceType | "all">("all");
  const [columnTypeFilter, setColumnTypeFilter] = useState<OpportunityType | "all">("all");
  const [columnComplianceFilter, setColumnComplianceFilter] = useState<ComplianceStatus | "all">("all");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Filter and sort opportunities
  const processedOpportunities = useMemo(() => {
    let filtered = opportunities.filter((opp) => {
      const matchesSource = columnSourceFilter === "all" || opp.source === columnSourceFilter;
      const matchesType = columnTypeFilter === "all" || opp.type === columnTypeFilter;
      const matchesCompliance = columnComplianceFilter === "all" || opp.complianceStatus === columnComplianceFilter;
      return matchesSource && matchesType && matchesCompliance;
    });

    // Sort
    filtered.sort((a, b) => {
      let comparison = 0;
      switch (sortField) {
        case "title":
          comparison = a.title.localeCompare(b.title);
          break;
        case "type":
          comparison = a.type.localeCompare(b.type);
          break;
        case "source":
          comparison = a.source.localeCompare(b.source);
          break;
        case "status":
          comparison = a.status.localeCompare(b.status);
          break;
        case "groupSize":
          comparison = a.groupSize - b.groupSize;
          break;
        case "revenue":
          comparison = a.estimatedRevenue - b.estimatedRevenue;
          break;
        case "confidence":
          comparison = a.confidence - b.confidence;
          break;
        case "monetization":
          comparison = a.monetizationScore - b.monetizationScore;
          break;
        case "eventDate":
          comparison = new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime();
          break;
      }
      return sortDirection === "asc" ? comparison : -comparison;
    });

    return filtered;
  }, [opportunities, columnSourceFilter, columnTypeFilter, columnComplianceFilter, sortField, sortDirection]);

  // Pagination calculations
  const totalPages = Math.ceil(processedOpportunities.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedOpportunities = processedOpportunities.slice(startIndex, endIndex);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  // Determine if opportunity is high priority
  const isHighPriority = (opp: Opportunity) => {
    return (
      opp.confidence >= 85 &&
      opp.monetizationScore >= 80 &&
      opp.demandMetrics.growthTrend === "rising" &&
      opp.groupSize >= 50
    );
  };

  // Reset to page 1 when filters change
  const handleSourceFilterChange = (value: string) => {
    setColumnSourceFilter(value as SourceType | "all");
    setCurrentPage(1);
  };

  const handleTypeFilterChange = (value: string) => {
    setColumnTypeFilter(value as OpportunityType | "all");
    setCurrentPage(1);
  };

  const handleComplianceFilterChange = (value: string) => {
    setColumnComplianceFilter(value as ComplianceStatus | "all");
    setCurrentPage(1);
  };

  const hasColumnFilters =
    columnSourceFilter !== "all" || columnTypeFilter !== "all" || columnComplianceFilter !== "all";

  if (opportunities.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/50 py-16">
        <div className="rounded-full bg-secondary p-3 mb-4">
          <AlertTriangle className="h-6 w-6 text-muted-foreground" />
        </div>
        <p className="text-lg font-medium text-foreground">No opportunities found</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Try adjusting your filters or search query
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Column Filters */}
      <div className="flex flex-wrap items-center gap-3 rounded-lg border border-border bg-card/50 p-3">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Column Filters:
        </span>

        <Select value={columnSourceFilter} onValueChange={handleSourceFilterChange}>
          <SelectTrigger className="h-8 w-[140px] border-border bg-secondary/50 text-xs">
            <SelectValue placeholder="Platform" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Platforms</SelectItem>
            <SelectItem value="reddit">Reddit</SelectItem>
            <SelectItem value="twitter">X/Twitter</SelectItem>
            <SelectItem value="facebook">Facebook</SelectItem>
            <SelectItem value="instagram">Instagram</SelectItem>
            <SelectItem value="discord">Discord</SelectItem>
            <SelectItem value="telegram">Telegram</SelectItem>
            <SelectItem value="forum">Forums</SelectItem>
          </SelectContent>
        </Select>

        <Select value={columnTypeFilter} onValueChange={handleTypeFilterChange}>
          <SelectTrigger className="h-8 w-[140px] border-border bg-secondary/50 text-xs">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="fan-travel">Fan Travel</SelectItem>
            <SelectItem value="concert-demand">Concert Demand</SelectItem>
            <SelectItem value="supporter-trip">Supporter Trip</SelectItem>
            <SelectItem value="surf-trip">Surf Trip</SelectItem>
            <SelectItem value="expat-travel">Expat Travel</SelectItem>
            <SelectItem value="charter">Charter</SelectItem>
          </SelectContent>
        </Select>

        <Select value={columnComplianceFilter} onValueChange={handleComplianceFilterChange}>
          <SelectTrigger className="h-8 w-[140px] border-border bg-secondary/50 text-xs">
            <SelectValue placeholder="Compliance" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="verified">Verified</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="flagged">Flagged</SelectItem>
            <SelectItem value="unknown">Unknown</SelectItem>
          </SelectContent>
        </Select>

        {hasColumnFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setColumnSourceFilter("all");
              setColumnTypeFilter("all");
              setColumnComplianceFilter("all");
              setCurrentPage(1);
            }}
            className="h-8 text-xs text-muted-foreground hover:text-destructive"
          >
            <XCircle className="mr-1 h-3.5 w-3.5" />
            Clear
          </Button>
        )}

        <div className="ml-auto flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            {processedOpportunities.length} results
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-secondary/30">
              <th className="px-4 py-3">
                <SortableHeader
                  label="Opportunity"
                  field="title"
                  currentSort={sortField}
                  currentDirection={sortDirection}
                  onSort={handleSort}
                />
              </th>
              <th className="px-4 py-3">
                <SortableHeader
                  label="Category"
                  field="type"
                  currentSort={sortField}
                  currentDirection={sortDirection}
                  onSort={handleSort}
                />
              </th>
              <th className="px-4 py-3">
                <SortableHeader
                  label="Platform"
                  field="source"
                  currentSort={sortField}
                  currentDirection={sortDirection}
                  onSort={handleSort}
                />
              </th>
              <th className="px-4 py-3">
                <SortableHeader
                  label="Status"
                  field="status"
                  currentSort={sortField}
                  currentDirection={sortDirection}
                  onSort={handleSort}
                />
              </th>
              <th className="px-4 py-3">
                <SortableHeader
                  label="Group"
                  field="groupSize"
                  currentSort={sortField}
                  currentDirection={sortDirection}
                  onSort={handleSort}
                  align="right"
                />
              </th>
              <th className="px-4 py-3">
                <SortableHeader
                  label="Revenue"
                  field="revenue"
                  currentSort={sortField}
                  currentDirection={sortDirection}
                  onSort={handleSort}
                  align="right"
                />
              </th>
              <th className="px-4 py-3">
                <SortableHeader
                  label="Confidence"
                  field="confidence"
                  currentSort={sortField}
                  currentDirection={sortDirection}
                  onSort={handleSort}
                />
              </th>
              <th className="px-4 py-3">
                <SortableHeader
                  label="Monetization"
                  field="monetization"
                  currentSort={sortField}
                  currentDirection={sortDirection}
                  onSort={handleSort}
                />
              </th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Trend
              </th>
              <th className="px-4 py-3 w-12"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {paginatedOpportunities.map((opp) => {
              const highPriority = isHighPriority(opp);
              return (
                <tr
                  key={opp.id}
                  className={cn(
                    "group text-sm transition-colors duration-150",
                    highPriority
                      ? "bg-orange-500/5 hover:bg-orange-500/10"
                      : "hover:bg-primary/5"
                  )}
                >
                  <td className="px-4 py-4">
                    <div className="max-w-[280px]">
                      <div className="flex items-center">
                        <Link
                          href={`/opportunities/${opp.id}`}
                          className="font-medium text-foreground transition-colors hover:text-primary"
                        >
                          {opp.title}
                        </Link>
                        {highPriority && <HighPriorityIndicator />}
                      </div>
                      <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{opp.location}</span>
                        <span className="text-border">•</span>
                        <span>{formatDate(opp.eventDate)}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <TypeBadge type={opp.type} />
                  </td>
                  <td className="px-4 py-4">
                    <PlatformBadge source={opp.source} />
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-col gap-1.5">
                      <StatusBadge status={opp.status} />
                      <ComplianceBadge status={opp.complianceStatus} />
                    </div>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <span className="font-semibold tabular-nums text-foreground">
                      {opp.groupSize.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <span className="font-bold tabular-nums text-foreground">
                      {formatCurrency(opp.estimatedRevenue)}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <ScoreBar value={opp.confidence} label="AI Confidence" variant="confidence" />
                  </td>
                  <td className="px-4 py-4">
                    <ScoreBar value={opp.monetizationScore} label="Monetization Potential" variant="monetization" />
                  </td>
                  <td className="px-4 py-4">
                    <TrendIndicator trend={opp.demandMetrics.growthTrend} />
                  </td>
                  <td className="px-4 py-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100 data-[state=open]:opacity-100"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuLabel className="text-xs text-muted-foreground">
                          Actions
                        </DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                          <Link href={`/opportunities/${opp.id}`} className="cursor-pointer">
                            <Eye className="mr-2 h-4 w-4" />
                            View Opportunity
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Open Source
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-primary">
                          <Send className="mr-2 h-4 w-4" />
                          Send to Review
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="mr-2 h-4 w-4" />
                          Mark Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-emerald-500">
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Approve
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <XCircle className="mr-2 h-4 w-4" />
                          Reject
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-lg border border-border bg-card/50 p-3">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Rows per page:</span>
          <Select
            value={itemsPerPage.toString()}
            onValueChange={(value) => {
              setItemsPerPage(Number(value));
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="h-8 w-[70px] border-border bg-secondary/50 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ITEMS_PER_PAGE_OPTIONS.map((option) => (
                <SelectItem key={option} value={option.toString()}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className="text-xs text-muted-foreground">
            {startIndex + 1}-{Math.min(endIndex, processedOpportunities.length)} of{" "}
            {processedOpportunities.length}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 border-border"
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 border-border"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex items-center gap-1 px-2">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum: number;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "default" : "ghost"}
                  size="icon"
                  className={cn(
                    "h-8 w-8 text-xs",
                    currentPage === pageNum && "bg-primary text-primary-foreground"
                  )}
                  onClick={() => setCurrentPage(pageNum)}
                >
                  {pageNum}
                </Button>
              );
            })}
          </div>

          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 border-border"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 border-border"
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
