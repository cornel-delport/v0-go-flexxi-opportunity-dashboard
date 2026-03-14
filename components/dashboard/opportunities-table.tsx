"use client";

import Link from "next/link";
import { ExternalLink, MoreHorizontal, Eye, CheckCircle, XCircle, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { StatusBadge, ComplianceBadge } from "./status-badge";
import { SourceBadge } from "./source-badge";
import { TypeBadge } from "./type-badge";
import type { Opportunity } from "@/lib/types";

interface OpportunitiesTableProps {
  opportunities: Opportunity[];
}

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
  colorClass = "bg-primary"
}: { 
  value: number; 
  label: string;
  colorClass?: string;
}) {
  const getColorClass = (val: number) => {
    if (val >= 90) return "bg-success";
    if (val >= 75) return "bg-primary";
    if (val >= 60) return "bg-warning";
    return "bg-muted-foreground";
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-2 min-w-[100px]">
            <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className={`h-full rounded-full transition-all ${colorClass === "bg-primary" ? getColorClass(value) : colorClass}`}
                style={{ width: `${value}%` }}
              />
            </div>
            <span className="text-xs font-medium text-muted-foreground w-8 text-right">
              {value}%
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{label}: {value}%</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

function TrendIndicator({ trend }: { trend: "rising" | "stable" | "declining" }) {
  if (trend === "rising") {
    return (
      <span className="flex items-center text-success">
        <TrendingUp className="h-3 w-3" />
      </span>
    );
  }
  if (trend === "declining") {
    return (
      <span className="flex items-center text-destructive">
        <TrendingDown className="h-3 w-3" />
      </span>
    );
  }
  return (
    <span className="flex items-center text-muted-foreground">
      <Minus className="h-3 w-3" />
    </span>
  );
}

export function OpportunitiesTable({ opportunities }: OpportunitiesTableProps) {
  if (opportunities.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-16">
        <p className="text-lg font-medium text-foreground">No opportunities found</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Try adjusting your filters or search query
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full">
        <thead className="bg-secondary/50">
          <tr className="border-b border-border text-left text-xs text-muted-foreground uppercase tracking-wider">
            <th className="p-4 font-medium">Opportunity</th>
            <th className="p-4 font-medium">Type</th>
            <th className="p-4 font-medium">Source</th>
            <th className="p-4 font-medium">Status</th>
            <th className="p-4 font-medium text-right">Group</th>
            <th className="p-4 font-medium text-right">Revenue</th>
            <th className="p-4 font-medium">Confidence</th>
            <th className="p-4 font-medium">Monetization</th>
            <th className="p-4 font-medium">Trend</th>
            <th className="p-4 font-medium"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border bg-card">
          {opportunities.map((opp) => (
            <tr
              key={opp.id}
              className="group text-sm transition-colors hover:bg-secondary/30"
            >
              <td className="p-4">
                <div className="max-w-[280px]">
                  <Link
                    href={`/opportunities/${opp.id}`}
                    className="font-medium text-foreground hover:text-primary transition-colors"
                  >
                    {opp.title}
                  </Link>
                  <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{opp.location}</span>
                    <span className="text-border">•</span>
                    <span>{formatDate(opp.eventDate)}</span>
                  </div>
                </div>
              </td>
              <td className="p-4">
                <TypeBadge type={opp.type} />
              </td>
              <td className="p-4">
                <SourceBadge source={opp.source} />
              </td>
              <td className="p-4">
                <div className="flex flex-col gap-1">
                  <StatusBadge status={opp.status} />
                  <ComplianceBadge status={opp.complianceStatus} />
                </div>
              </td>
              <td className="p-4 text-right">
                <span className="font-medium text-foreground">
                  {opp.groupSize.toLocaleString()}
                </span>
              </td>
              <td className="p-4 text-right">
                <span className="font-semibold text-foreground">
                  {formatCurrency(opp.estimatedRevenue)}
                </span>
              </td>
              <td className="p-4">
                <ScoreBar value={opp.confidence} label="AI Confidence" />
              </td>
              <td className="p-4">
                <ScoreBar value={opp.monetizationScore} label="Monetization Potential" />
              </td>
              <td className="p-4">
                <TrendIndicator trend={opp.demandMetrics.growthTrend} />
              </td>
              <td className="p-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="opacity-0 group-hover:opacity-100"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/opportunities/${opp.id}`}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Open Source
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-success">
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
          ))}
        </tbody>
      </table>
    </div>
  );
}
