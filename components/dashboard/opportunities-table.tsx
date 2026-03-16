"use client";

import Link from "next/link";
import { ExternalLink, MoreHorizontal, Eye, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { StatusBadge, ComplianceBadge } from "./status-badge";
import { SourceBadge } from "./source-badge";
import { TypeBadge } from "./type-badge";
import type {
  Opportunity,
  OpportunityStatus,
  ComplianceStatus,
  SourceType,
  OpportunityType,
} from "@/lib/types";

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
          <tr className="border-b border-border text-left text-sm text-muted-foreground">
            <th className="p-4 font-medium">Opportunity</th>
            <th className="p-4 font-medium">Type</th>
            <th className="p-4 font-medium">Source</th>
            <th className="p-4 font-medium">Status</th>
            <th className="p-4 font-medium">Compliance</th>
            <th className="p-4 font-medium">Group Size</th>
            <th className="p-4 font-medium">Est. Revenue</th>
            <th className="p-4 font-medium">Confidence</th>
            <th className="p-4 font-medium">Created</th>
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
                <div className="max-w-[300px]">
                  <Link
                    href={`/opportunities/${opp.id}`}
                    className="font-medium text-foreground hover:text-primary"
                  >
                    {opp.title}
                  </Link>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    {opp.location} • {formatDate(opp.eventDate)}
                  </p>
                </div>
              </td>
              <td className="p-4">
                <TypeBadge type={opp.type as OpportunityType} />
              </td>
              <td className="p-4">
                <SourceBadge source={opp.source as SourceType} />
              </td>
              <td className="p-4">
                <StatusBadge status={opp.status as OpportunityStatus} />
              </td>
              <td className="p-4">
                <ComplianceBadge status={opp.complianceStatus as ComplianceStatus} />
              </td>
              <td className="p-4 text-foreground">
                {opp.groupSize.toLocaleString()}
              </td>
              <td className="p-4 font-medium text-foreground">
                {formatCurrency(opp.estimatedRevenue)}
              </td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-16 overflow-hidden rounded-full bg-secondary">
                    <div
                      className={`h-full rounded-full ${
                        opp.confidence >= 90
                          ? "bg-success"
                          : opp.confidence >= 75
                          ? "bg-warning"
                          : "bg-muted-foreground"
                      }`}
                      style={{ width: `${opp.confidence}%` }}
                    />
                  </div>
                  <span
                    className={`text-sm ${
                      opp.confidence >= 90
                        ? "text-success"
                        : opp.confidence >= 75
                        ? "text-warning"
                        : "text-muted-foreground"
                    }`}
                  >
                    {opp.confidence}%
                  </span>
                </div>
              </td>
              <td className="p-4 text-muted-foreground">
                {formatDate(opp.createdAt)}
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
