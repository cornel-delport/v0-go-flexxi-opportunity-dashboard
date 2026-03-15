
import { Timestamp } from 'firebase/firestore';

// Core Data
// ============================================================================

export interface UserProfile {
  id: string; // Corresponds to Firebase Auth UID
  email: string;
  displayName?: string;
  photoURL?: string;
  role: string; // Reference to a role in the 'roles' collection
  organizationId?: string; // Reference to an organization
  teamId?: string; // Reference to a team
  createdAt: Timestamp;
  updatedAt: Timestamp;
  lastLoginAt?: Timestamp;
}

export interface Role {
  id: string; // e.g., 'super_admin', 'admin', 'reviewer'
  name: string;
  description: string;
  permissions: {
    [resource: string]: string[]; // e.g., { 'opportunities': ['read', 'update'] }
  };
}

export interface Organization {
  id: string;
  name: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Team {
  id: string;
  name: string;
  organizationId: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}


// Opportunity Discovery & Review Workflow
// ============================================================================

export interface Opportunity {
  id: string;

  // Core Fields
  title: string;
  summary: string;
  recommendedAction: string;
  contentExcerpt: string;
  normalizedText: string;
  language: string; // ISO 639-1 code
  category: string;
  eventType?: string;

  // Source Information
  sourcePlatform: string; // e.g., 'reddit', 'twitter', 'facebook'
  sourceType: string; // e.g., 'post', 'comment', 'group'
  sourceUrl: string;
  sourceCommunity?: string; // e.g., subreddit, group name
  sourceAuthor?: string;

  // Location & Demographics
  targetCity?: string;
  originLocation?: string;
  destinationLocation?: string;
  country?: string; // ISO 3166-1 alpha-2 code

  // Scoring & Signals
  dateSignals: string[]; // e.g., ["mentions 'next summer'", "date is '2025-07-10'"]
  estimatedGroupSize?: number;
  groupIntentScore: number; // 0.0 - 1.0
  monetizationScore: number; // 0.0 - 1.0
  urgencyScore: number; // 0.0 - 1.0
  confidenceScore: number; // 0.0 - 1.0
  radarScore: number; // 0.0 - 1.0 - composite score for quick sorting

  // Status & Workflow
  reviewStatus: 'pending' | 'in_review' | 'approved' | 'rejected' | 'archived';
  complianceStatus: 'pending' | 'verified' | 'flagged' | 'requires_review';
  humanReviewRequired: boolean;
  assignedReviewerId?: string; // Reference to a user

  // Auditing & Provenance
  createdByService: string; // e.g., 'ingestion-worker-v1', 'manual-entry'
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface SourcePost {
  id: string;
  opportunityId: string;
  platform: string;
  url: string;
  rawContent: string;
  author: string;
  postedAt: Timestamp;
  createdAt: Timestamp;
}

export interface Review {
  id: string;
  opportunityId: string;
  reviewerId: string;
  status: 'approved' | 'rejected';
  decision: string;
  createdAt: Timestamp;
}

export interface ReviewerComment {
  id: string;
  reviewId: string;
  commenterId: string;
  text: string;
  createdAt: Timestamp;
}


// System Configuration & Operations
// ============================================================================

export interface SourceConfig {
  id: string;
  name: string;
  type: 'webhook' | 'api' | 'rss';
  url?: string;
  apiKey?: string;
  lastIngestedAt?: Timestamp;
  isActive: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface IntegrationConfig {
  id: string; // e.g., 'openai-classifier', 'google-maps-enricher'
  name: string;
  type: 'webhook' | 'openclaw' | 'enrichment' | 'ai_service' | 'pipeline';
  credentials: any; // Encrypted
  isActive: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface AuditLog {
  id: string;
  actorUserId: string;
  actorEmail: string;
  actionType: string; // e.g., 'user.login', 'role.assignment'
  entityType: string; // e.g., 'user', 'role', 'opportunity'
  entityId: string;
  oldValueSummary?: string; // JSON string or descriptive text
  newValueSummary?: string; // JSON string or descriptive text
  source: string; // e.g., 'web-app', 'api', 'system'
  ipPlaceholder?: string; // Store IP address if available
  createdAt: Timestamp;
}

export interface WebhookEvent {
  id: string;
  source: string; // e.g., 'github', 'stripe'
  eventType: string;
  payload: any;
  status: 'received' | 'processing' | 'processed' | 'failed';
  error?: string;
  createdAt: Timestamp;
}

export interface WorkerJob {
  id: string;
  jobType: string; // e.g., 'ingest-opportunity', 'enrich-data'
  payload: any;
  status: 'queued' | 'running' | 'completed' | 'failed';
  priority: number;
  result?: any;
  error?: string;
  createdAt: Timestamp;
  startedAt?: Timestamp;
  completedAt?: Timestamp;
}

export interface SystemSetting {
  id: string; // e.g., 'global_notification_email'
  value: any;
  description: string;
  updatedAt: Timestamp;
}
