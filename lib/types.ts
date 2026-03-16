import { ROLES } from "@/lib/roles";

export type OpportunityStatus = "new" | "under-review" | "approved" | "rejected" | "archived" | "pending";
export type ComplianceStatus = "verified" | "pending" | "flagged" | "unknown";
export type SourceType = "internal" | "external" | "referral" | "reddit" | "twitter" | "facebook";
export type OpportunityType = "consulting" | "full-time" | "part-time" | "contract" | "fan-travel" | "concert-demand" | "supporter-trip" | "post";

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
  name: string | null;
  displayName?: string | null;
  photoURL?: string | null;
  email: string | null;
  avatar: string;
  role: keyof typeof ROLES;
  status: "active" | "inactive" | "pending";
  lastLogin: string;
  createdAt: string;
}
