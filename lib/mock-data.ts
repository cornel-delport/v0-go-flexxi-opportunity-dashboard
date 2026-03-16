import { FirestoreData } from "./firestore-data-model";

export const mockOpportunities: (FirestoreData.Opportunity & { summary: string})[] = [
  {
    id: "opp-001",
    title: "Manchester United Away Trip - Champions League",
    description: "Large group of supporters looking for organized travel to Barcelona for the Champions League quarterfinal. Active discussion with 250+ interested members.",
    status: "pending",
    source: "reddit",
    type: "post",
    createdAt: new Date("2026-03-10T08:30:00Z"),
    updatedAt: new Date("2026-03-14T10:15:00Z"),
    complianceStatus: "verified",
    sourceUrl: "https://reddit.com/r/reddevils/comments/xyz",
    eventDate: "2026-04-15",
    location: "Barcelona",
    groupSize: 250,
    estimatedRevenue: 50000,
    confidence: 0.92,
    assignedTo: "user-001",
    tags: ["football", "champions-league", "barcelona"],
    summary: "A large group of Manchester United supporters are looking for travel options to Barcelona for an upcoming Champions League match. They are a highly engaged group and represent a significant revenue opportunity."
  },
];

export const mockReviews: FirestoreData.Review[] = [
  {
    id: "rev-001",
    opportunityId: "opp-002",
    userId: "user-001",
    rating: 5,
    comment: "High potential, worth pursuing.",
    createdAt: new Date("2026-03-13T10:00:00Z"),
    status: "approved",
    reviewer: "John Doe",
    opportunityTitle: "Taylor Swift Concert",
    notes: "This is a great opportunity.",
  },
];

export const mockSources: FirestoreData.SourceConfig[] = [
  {
    id: "src-001",
    name: "Reddit Sports Travel",
    type: "reddit",
    config: { subreddit: "sportstravel" },
    createdAt: new Date(),
    status: "active",
    opportunitiesFound: 1,
    lastSync: new Date("2026-03-14T09:00:00Z").toISOString(),
    url: "https://reddit.com/r/sportstravel",
  },
];

export const mockDashboardStats = {
  opportunities: 12,
  reviews: 3,
  sources: 2,
};
