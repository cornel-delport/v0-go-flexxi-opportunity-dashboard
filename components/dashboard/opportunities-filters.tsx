"use client";

import { Search, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { OpportunityType, OpportunityStatus, SourceType } from "@/lib/types";

interface OpportunitiesFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  statusFilter: OpportunityStatus | "all";
  onStatusChange: (value: OpportunityStatus | "all") => void;
  typeFilter: OpportunityType | "all";
  onTypeChange: (value: OpportunityType | "all") => void;
  sourceFilter: SourceType | "all";
  onSourceChange: (value: SourceType | "all") => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

export function OpportunitiesFilters({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  typeFilter,
  onTypeChange,
  sourceFilter,
  onSourceChange,
  onClearFilters,
  hasActiveFilters,
}: OpportunitiesFiltersProps) {
  return (
    <div className="flex flex-col gap-4 rounded-lg border border-border bg-card p-4 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search opportunities..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="bg-input pl-9"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Filter className="h-4 w-4 text-muted-foreground" />

        <Select
          value={statusFilter}
          onValueChange={(value) =>
            onStatusChange(value as OpportunityStatus | "all")
          }
        >
          <SelectTrigger className="w-[140px] bg-input">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="under-review">Under Review</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={typeFilter}
          onValueChange={(value) =>
            onTypeChange(value as OpportunityType | "all")
          }
        >
          <SelectTrigger className="w-[140px] bg-input">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="fan-travel">Fan Travel</SelectItem>
            <SelectItem value="concert-demand">Concert</SelectItem>
            <SelectItem value="supporter-trip">Supporter Trip</SelectItem>
            <SelectItem value="surf-trip">Surf Trip</SelectItem>
            <SelectItem value="expat-travel">Expat Travel</SelectItem>
            <SelectItem value="charter">Charter</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={sourceFilter}
          onValueChange={(value) =>
            onSourceChange(value as SourceType | "all")
          }
        >
          <SelectTrigger className="w-[140px] bg-input">
            <SelectValue placeholder="Source" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sources</SelectItem>
            <SelectItem value="reddit">Reddit</SelectItem>
            <SelectItem value="twitter">Twitter</SelectItem>
            <SelectItem value="facebook">Facebook</SelectItem>
            <SelectItem value="instagram">Instagram</SelectItem>
            <SelectItem value="forum">Forum</SelectItem>
            <SelectItem value="discord">Discord</SelectItem>
            <SelectItem value="telegram">Telegram</SelectItem>
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="mr-1 h-4 w-4" />
            Clear
          </Button>
        )}
      </div>
    </div>
  );
}
