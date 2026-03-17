export type OpportunityStatus = "new" | "under-review" | "approved" | "rejected" | "archived" | "pending";
export type ComplianceStatus = "verified" | "pending" | "flagged" | "unknown";
export type SourceType = "internal" | "external" | "referral" | "reddit" | "twitter" | "facebook";
export type OpportunityType = "consulting" | "full-time" | "part-time" | "contract" | "fan-travel" | "concert-demand" | "supporter-trip" | "post";

export interface Opportunity {
  id: string;
  title: string;
  description: string;
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
  updatedAt: string;
  sourceUrl: string;
  assignedTo: string;
  tags: string[];
  summary: string;
}

export interface User {
  id: string;
  name: string | null;
  displayName?: string | null;
  photoURL?: string | null;
  email: string | null;
  avatar: string;
  role: string;
  status: "active" | "inactive" | "pending";
  lastLogin: string;
  createdAt: string;
}

export type UserRegistration = User & {
  password?: string;
};

export interface Review {
  id: string;
  opportunityId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: Date;
  status: "approved" | "rejected" | "pending";
  reviewer: string;
  opportunityTitle: string;
  notes: string;
}

export interface SourceConfig {
  id: string;
  name: string;
  type: SourceType;
  config: {
    subreddit?: string;
    url?: string;
    keywords?: string[];
  };
  createdAt: Date;
  status: "active" | "inactive";
  opportunitiesFound: number;
  lastSync: string;
  url: string;
}
