import { cn } from "@/lib/utils";
import type { OpportunityStatus, ComplianceStatus } from "@/lib/types";

interface StatusBadgeProps {
  status: OpportunityStatus;
}

const statusConfig: Record<
  OpportunityStatus,
  { label: string; className: string }
> = {
  new: {
    label: "New",
    className: "bg-primary/20 text-primary",
  },
  "under-review": {
    label: "Under Review",
    className: "bg-warning/20 text-warning",
  },
  approved: {
    label: "Approved",
    className: "bg-success/20 text-success",
  },
  rejected: {
    label: "Rejected",
    className: "bg-destructive/20 text-destructive",
  },
  archived: {
    label: "Archived",
    className: "bg-muted text-muted-foreground",
  },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium",
        config.className
      )}
    >
      {config.label}
    </span>
  );
}

interface ComplianceBadgeProps {
  status: ComplianceStatus;
}

const complianceConfig: Record<
  ComplianceStatus,
  { label: string; className: string }
> = {
  verified: {
    label: "Verified",
    className: "bg-success/20 text-success",
  },
  pending: {
    label: "Pending",
    className: "bg-warning/20 text-warning",
  },
  flagged: {
    label: "Flagged",
    className: "bg-destructive/20 text-destructive",
  },
  unknown: {
    label: "Unknown",
    className: "bg-muted text-muted-foreground",
  },
};

export function ComplianceBadge({ status }: ComplianceBadgeProps) {
  const config = complianceConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium",
        config.className
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          status === "verified" && "bg-success",
          status === "pending" && "bg-warning",
          status === "flagged" && "bg-destructive",
          status === "unknown" && "bg-muted-foreground"
        )}
      />
      {config.label}
    </span>
  );
}
