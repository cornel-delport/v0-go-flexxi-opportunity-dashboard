"use client";

import { useState, useMemo } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Topbar } from "@/components/dashboard/topbar";
import { OpportunitiesFilters } from "@/components/dashboard/opportunities-filters";
import { OpportunitiesTable } from "@/components/dashboard/opportunities-table";
import { mockOpportunities } from "@/lib/mock-data";
import type { OpportunityType, OpportunityStatus, SourceType, Opportunity } from "@/lib/types";

export default function OpportunitiesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<OpportunityStatus | "all">("all");
  const [typeFilter, setTypeFilter] = useState<OpportunityType | "all">("all");
  const [sourceFilter, setSourceFilter] = useState<SourceType | "all">("all");

  const filteredOpportunities: Opportunity[] = useMemo(() => {
    return mockOpportunities.filter((opp) => {
      const matchesSearch =
        searchQuery === "" ||
        opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        opp.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        opp.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === "all" || opp.status === statusFilter;
      const matchesType = typeFilter === "all" || opp.type === typeFilter;
      const matchesSource = sourceFilter === "all" || opp.source === sourceFilter;

      return matchesSearch && matchesStatus && matchesType && matchesSource;
    });
  }, [searchQuery, statusFilter, typeFilter, sourceFilter]);

  const hasActiveFilters =
    searchQuery !== "" ||
    statusFilter !== "all" ||
    typeFilter !== "all" ||
    sourceFilter !== "all";

  const clearFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setTypeFilter("all");
    setSourceFilter("all");
  };

  return (
    <DashboardLayout>
      <Topbar
        title="Opportunities"
        description={`${filteredOpportunities.length} opportunities found`}
      />

      <div className="flex-1 overflow-auto p-6">
        <div className="mx-auto max-w-7xl space-y-6">
          <OpportunitiesFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
            typeFilter={typeFilter}
            onTypeChange={setTypeFilter}
            sourceFilter={sourceFilter}
            onSourceChange={setSourceFilter}
            onClearFilters={clearFilters}
            hasActiveFilters={hasActiveFilters}
          />

          <OpportunitiesTable opportunities={filteredOpportunities} />
        </div>
      </div>
    </DashboardLayout>
  );
}
