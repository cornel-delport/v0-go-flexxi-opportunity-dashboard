export type OpportunityType =
  | "fan-travel"
  | "concert-demand"
  | "supporter-trip"
  | "surf-trip"
  | "expat-travel"
  | "charter";

export type OpportunityStatus =
  | "new"
  | "under-review"
  | "approved"
  | "rejected"
  | "archived";

export type ComplianceStatus = "verified" | "pending" | "flagged" | "unknown";

export type SourceType =
  | "reddit"
  | "twitter"
  | "facebook"
  | "instagram"
  | "forum"
  | "discord"
  | "telegram";

export interface Opportunity {
  id: string;
  title: string;
  description: string;
  type: OpportunityType;
  status: OpportunityStatus;
  complianceStatus: ComplianceStatus;
  source: SourceType;
  sourceUrl: string;
  location: string;
  eventDate: string;
  groupSize: number;
  estimatedRevenue: number;
  confidence: number;
  createdAt: string;
  updatedAt: string;
  assignedTo?: string;
  tags: string[];
}

export interface Review {
  id: string;
  opportunityId: string;
  opportunityTitle: string;
  reviewer: string;
  status: "pending" | "approved" | "rejected";
  notes: string;
  createdAt: string;
}

export interface Source {
  id: string;
  name: string;
  type: SourceType;
  status: "active" | "paused" | "error";
  lastSync: string;
  opportunitiesFound: number;
  url: string;
}

export interface DashboardStats {
  totalOpportunities: number;
  newThisWeek: number;
  pendingReview: number;
  approvedThisMonth: number;
  estimatedRevenue: number;
  avgConfidence: number;
}
