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

export interface SourcePost {
  author: string;
  authorAvatar?: string;
  content: string;
  engagement: {
    likes: number;
    comments: number;
    shares: number;
  };
  postedAt: string;
}

export interface GroupDemandMetrics {
  confirmedInterest: number;
  potentialReach: number;
  engagementRate: number;
  growthTrend: "rising" | "stable" | "declining";
  sentimentScore: number;
}

export interface RevenueProjection {
  lowEstimate: number;
  midEstimate: number;
  highEstimate: number;
  perPersonAverage: number;
  marginPercent: number;
}

export interface ActivityEvent {
  id: string;
  type: "created" | "status_change" | "comment" | "assigned" | "ai_analysis" | "compliance_check";
  description: string;
  user: string;
  userAvatar?: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

export interface ReviewComment {
  id: string;
  reviewer: string;
  reviewerAvatar?: string;
  comment: string;
  sentiment: "positive" | "neutral" | "concern";
  timestamp: string;
}

export interface Opportunity {
  id: string;
  title: string;
  description: string;
  type: OpportunityType;
  status: OpportunityStatus;
  complianceStatus: ComplianceStatus;
  source: SourceType;
  sourceUrl: string;
  sourcePost: SourcePost;
  location: string;
  eventDate: string;
  groupSize: number;
  estimatedRevenue: number;
  confidence: number;
  monetizationScore: number;
  demandMetrics: GroupDemandMetrics;
  revenueProjection: RevenueProjection;
  activities: ActivityEvent[];
  reviewComments: ReviewComment[];
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
