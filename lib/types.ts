import { Role } from "@/lib/roles";

export type OpportunityStatus = "new" | "under-review" | "approved" | "rejected" | "archived";
export type ComplianceStatus = "verified" | "pending" | "flagged" | "unknown";
export type SourceType = "internal" | "external" | "referral";
export type OpportunityType = "consulting" | "full-time" | "part-time" | "contract";

export interface Opportunity {
  id: string;
  title: string;
  location: string;
  eventDate: string;
  type: OpportunityType;
  source: SourceType;
  status: OpportunityStatus;
  complianceStatus: ComplianceStatus;
  groupSize: number;
  estimatedRevenue: number;
  confidence: number;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: Role;
  status: "active" | "inactive" | "pending";
  lastLogin: string;
  createdAt: string;
}
