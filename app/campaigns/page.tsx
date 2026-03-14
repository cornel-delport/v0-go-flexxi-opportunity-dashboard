"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Topbar } from "@/components/dashboard/topbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  MapPin,
  Users,
  Target,
  MoreVertical,
  ArrowRight,
  ArrowLeft,
  Eye,
  UserPlus,
  Trash2,
  GripVertical,
  Plane,
  Music,
  Users2,
  Waves,
  Globe,
  Building,
  TrendingUp,
  Calendar,
  DollarSign,
} from "lucide-react";
import Link from "next/link";
import type { OpportunityType } from "@/lib/types";

// Campaign stages for the Kanban board
type CampaignStage = "detected" | "under-review" | "approved" | "planning" | "launched";

interface CampaignCard {
  id: string;
  title: string;
  type: OpportunityType;
  targetCity: string;
  estimatedGroupSize: number;
  confidence: number;
  assignedOwner: string;
  assignedOwnerAvatar: string;
  stage: CampaignStage;
  eventDate: string;
  estimatedRevenue: number;
  priority: "high" | "medium" | "low";
}

// Mock campaign data
const mockCampaigns: CampaignCard[] = [
  {
    id: "camp-001",
    title: "Manchester United Away Trip - Champions League",
    type: "fan-travel",
    targetCity: "Barcelona, Spain",
    estimatedGroupSize: 250,
    confidence: 92,
    assignedOwner: "Sarah Chen",
    assignedOwnerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    stage: "planning",
    eventDate: "2026-04-15",
    estimatedRevenue: 125000,
    priority: "high",
  },
  {
    id: "camp-002",
    title: "Taylor Swift Eras Tour - Vienna",
    type: "concert-demand",
    targetCity: "Vienna, Austria",
    estimatedGroupSize: 500,
    confidence: 88,
    assignedOwner: "Marcus Johnson",
    assignedOwnerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
    stage: "approved",
    eventDate: "2026-05-20",
    estimatedRevenue: 275000,
    priority: "high",
  },
  {
    id: "camp-003",
    title: "Liverpool FC Europa League Final",
    type: "supporter-trip",
    targetCity: "Munich, Germany",
    estimatedGroupSize: 180,
    confidence: 85,
    assignedOwner: "Emma Wilson",
    assignedOwnerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    stage: "under-review",
    eventDate: "2026-05-28",
    estimatedRevenue: 95000,
    priority: "medium",
  },
  {
    id: "camp-004",
    title: "Bali Surf Camp - Summer Group",
    type: "surf-trip",
    targetCity: "Bali, Indonesia",
    estimatedGroupSize: 45,
    confidence: 78,
    assignedOwner: "Jake Morrison",
    assignedOwnerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jake",
    stage: "detected",
    eventDate: "2026-07-10",
    estimatedRevenue: 67500,
    priority: "low",
  },
  {
    id: "camp-005",
    title: "British Expat Dubai Meetup",
    type: "expat-travel",
    targetCity: "Dubai, UAE",
    estimatedGroupSize: 120,
    confidence: 82,
    assignedOwner: "Priya Patel",
    assignedOwnerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    stage: "launched",
    eventDate: "2026-04-05",
    estimatedRevenue: 84000,
    priority: "medium",
  },
  {
    id: "camp-006",
    title: "Corporate Charter - Tech Conference",
    type: "charter",
    targetCity: "Lisbon, Portugal",
    estimatedGroupSize: 200,
    confidence: 94,
    assignedOwner: "David Kim",
    assignedOwnerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    stage: "planning",
    eventDate: "2026-06-15",
    estimatedRevenue: 180000,
    priority: "high",
  },
  {
    id: "camp-007",
    title: "Coldplay World Tour - Paris Dates",
    type: "concert-demand",
    targetCity: "Paris, France",
    estimatedGroupSize: 320,
    confidence: 76,
    assignedOwner: "Sarah Chen",
    assignedOwnerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    stage: "detected",
    eventDate: "2026-08-22",
    estimatedRevenue: 160000,
    priority: "medium",
  },
  {
    id: "camp-008",
    title: "Arsenal Pre-Season USA Tour",
    type: "fan-travel",
    targetCity: "Los Angeles, USA",
    estimatedGroupSize: 150,
    confidence: 71,
    assignedOwner: "Marcus Johnson",
    assignedOwnerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
    stage: "under-review",
    eventDate: "2026-07-25",
    estimatedRevenue: 112500,
    priority: "low",
  },
  {
    id: "camp-009",
    title: "Portugal Surf Safari",
    type: "surf-trip",
    targetCity: "Nazare, Portugal",
    estimatedGroupSize: 30,
    confidence: 89,
    assignedOwner: "Emma Wilson",
    assignedOwnerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    stage: "approved",
    eventDate: "2026-09-10",
    estimatedRevenue: 45000,
    priority: "medium",
  },
  {
    id: "camp-010",
    title: "F1 Monaco Grand Prix Package",
    type: "charter",
    targetCity: "Monaco",
    estimatedGroupSize: 80,
    confidence: 96,
    assignedOwner: "David Kim",
    assignedOwnerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    stage: "launched",
    eventDate: "2026-05-24",
    estimatedRevenue: 240000,
    priority: "high",
  },
];

const stages: { id: CampaignStage; label: string; color: string }[] = [
  { id: "detected", label: "Detected", color: "bg-muted-foreground" },
  { id: "under-review", label: "Under Review", color: "bg-warning" },
  { id: "approved", label: "Approved", color: "bg-primary" },
  { id: "planning", label: "Campaign Planning", color: "bg-chart-2" },
  { id: "launched", label: "Launched", color: "bg-success" },
];

const typeIcons: Record<OpportunityType, typeof Plane> = {
  "fan-travel": Plane,
  "concert-demand": Music,
  "supporter-trip": Users2,
  "surf-trip": Waves,
  "expat-travel": Globe,
  charter: Building,
};

const typeLabels: Record<OpportunityType, string> = {
  "fan-travel": "Fan Travel",
  "concert-demand": "Concert",
  "supporter-trip": "Supporter Trip",
  "surf-trip": "Surf Trip",
  "expat-travel": "Expat Travel",
  charter: "Charter",
};

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

function getConfidenceColor(score: number): string {
  if (score >= 90) return "text-success";
  if (score >= 80) return "text-primary";
  if (score >= 70) return "text-warning";
  return "text-muted-foreground";
}

function getPriorityBadge(priority: "high" | "medium" | "low") {
  const styles = {
    high: "bg-destructive/20 text-destructive border-destructive/30",
    medium: "bg-warning/20 text-warning border-warning/30",
    low: "bg-muted text-muted-foreground border-border",
  };
  return styles[priority];
}

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<CampaignCard[]>(mockCampaigns);
  const [draggedCard, setDraggedCard] = useState<string | null>(null);

  const getCampaignsByStage = (stage: CampaignStage) => {
    return campaigns.filter((c) => c.stage === stage);
  };

  const moveCampaign = (campaignId: string, newStage: CampaignStage) => {
    setCampaigns((prev) =>
      prev.map((c) => (c.id === campaignId ? { ...c, stage: newStage } : c))
    );
  };

  const getStageIndex = (stage: CampaignStage) => {
    return stages.findIndex((s) => s.id === stage);
  };

  const handleDragStart = (e: React.DragEvent, campaignId: string) => {
    setDraggedCard(campaignId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, targetStage: CampaignStage) => {
    e.preventDefault();
    if (draggedCard) {
      moveCampaign(draggedCard, targetStage);
      setDraggedCard(null);
    }
  };

  const totalRevenue = campaigns.reduce((sum, c) => sum + c.estimatedRevenue, 0);
  const launchedCount = campaigns.filter((c) => c.stage === "launched").length;
  const planningCount = campaigns.filter((c) => c.stage === "planning").length;

  return (
    <DashboardLayout>
      <Topbar />
      <main className="flex-1 overflow-auto">
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                Campaigns
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Track opportunities through execution stages
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-6 rounded-lg border border-border bg-card px-4 py-2">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Total Pipeline</p>
                  <p className="text-lg font-bold text-foreground">
                    {formatCurrency(totalRevenue)}
                  </p>
                </div>
                <div className="h-8 w-px bg-border" />
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Launched</p>
                  <p className="text-lg font-bold text-success">{launchedCount}</p>
                </div>
                <div className="h-8 w-px bg-border" />
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Planning</p>
                  <p className="text-lg font-bold text-primary">{planningCount}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Kanban Board */}
          <div className="flex gap-4 overflow-x-auto pb-4">
            <TooltipProvider delayDuration={0}>
              {stages.map((stage) => {
                const stageCards = getCampaignsByStage(stage.id);
                const stageRevenue = stageCards.reduce(
                  (sum, c) => sum + c.estimatedRevenue,
                  0
                );

                return (
                  <div
                    key={stage.id}
                    className="flex w-[320px] shrink-0 flex-col"
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, stage.id)}
                  >
                    {/* Column Header */}
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`h-2.5 w-2.5 rounded-full ${stage.color}`} />
                        <h3 className="text-sm font-semibold text-foreground">
                          {stage.label}
                        </h3>
                        <Badge
                          variant="secondary"
                          className="ml-1 h-5 min-w-[20px] justify-center px-1.5 text-xs"
                        >
                          {stageCards.length}
                        </Badge>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {formatCurrency(stageRevenue)}
                      </span>
                    </div>

                    {/* Column Content */}
                    <div className="flex flex-1 flex-col gap-3 rounded-xl border border-border/50 bg-secondary/20 p-3 min-h-[500px]">
                      {stageCards.map((campaign) => {
                        const TypeIcon = typeIcons[campaign.type];
                        const stageIndex = getStageIndex(campaign.stage);
                        const canMoveLeft = stageIndex > 0;
                        const canMoveRight = stageIndex < stages.length - 1;

                        return (
                          <Card
                            key={campaign.id}
                            draggable
                            onDragStart={(e) => handleDragStart(e, campaign.id)}
                            className={`group cursor-grab border-border bg-card transition-all duration-200 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 active:cursor-grabbing ${
                              draggedCard === campaign.id ? "opacity-50" : ""
                            }`}
                          >
                            <CardContent className="p-4">
                              {/* Header Row */}
                              <div className="mb-3 flex items-start justify-between">
                                <div className="flex items-center gap-2">
                                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-secondary">
                                    <TypeIcon className="h-4 w-4 text-muted-foreground" />
                                  </div>
                                  <Badge
                                    variant="outline"
                                    className={`text-[10px] ${getPriorityBadge(campaign.priority)}`}
                                  >
                                    {campaign.priority}
                                  </Badge>
                                </div>
                                <div className="flex items-center gap-1">
                                  <GripVertical className="h-4 w-4 text-muted-foreground/50 opacity-0 transition-opacity group-hover:opacity-100" />
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-7 w-7 opacity-0 transition-opacity group-hover:opacity-100"
                                      >
                                        <MoreVertical className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem asChild>
                                        <Link href={`/opportunities/${campaign.id}`}>
                                          <Eye className="mr-2 h-4 w-4" />
                                          View Details
                                        </Link>
                                      </DropdownMenuItem>
                                      <DropdownMenuItem>
                                        <UserPlus className="mr-2 h-4 w-4" />
                                        Reassign Owner
                                      </DropdownMenuItem>
                                      <DropdownMenuSeparator />
                                      {canMoveLeft && (
                                        <DropdownMenuItem
                                          onClick={() =>
                                            moveCampaign(
                                              campaign.id,
                                              stages[stageIndex - 1].id
                                            )
                                          }
                                        >
                                          <ArrowLeft className="mr-2 h-4 w-4" />
                                          Move to {stages[stageIndex - 1].label}
                                        </DropdownMenuItem>
                                      )}
                                      {canMoveRight && (
                                        <DropdownMenuItem
                                          onClick={() =>
                                            moveCampaign(
                                              campaign.id,
                                              stages[stageIndex + 1].id
                                            )
                                          }
                                        >
                                          <ArrowRight className="mr-2 h-4 w-4" />
                                          Move to {stages[stageIndex + 1].label}
                                        </DropdownMenuItem>
                                      )}
                                      <DropdownMenuSeparator />
                                      <DropdownMenuItem className="text-destructive focus:text-destructive">
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        Remove
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                              </div>

                              {/* Title */}
                              <h4 className="mb-2 line-clamp-2 text-sm font-semibold leading-tight text-foreground">
                                {campaign.title}
                              </h4>

                              {/* Location & Date */}
                              <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  {campaign.targetCity}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {formatDate(campaign.eventDate)}
                                </span>
                              </div>

                              {/* Stats Row */}
                              <div className="mb-3 grid grid-cols-3 gap-2 rounded-lg bg-secondary/50 p-2">
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <div className="text-center">
                                      <Users className="mx-auto mb-0.5 h-3.5 w-3.5 text-muted-foreground" />
                                      <p className="text-xs font-semibold tabular-nums text-foreground">
                                        {campaign.estimatedGroupSize}
                                      </p>
                                    </div>
                                  </TooltipTrigger>
                                  <TooltipContent>Estimated Group Size</TooltipContent>
                                </Tooltip>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <div className="text-center">
                                      <Target className="mx-auto mb-0.5 h-3.5 w-3.5 text-muted-foreground" />
                                      <p
                                        className={`text-xs font-semibold tabular-nums ${getConfidenceColor(
                                          campaign.confidence
                                        )}`}
                                      >
                                        {campaign.confidence}%
                                      </p>
                                    </div>
                                  </TooltipTrigger>
                                  <TooltipContent>AI Confidence Score</TooltipContent>
                                </Tooltip>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <div className="text-center">
                                      <DollarSign className="mx-auto mb-0.5 h-3.5 w-3.5 text-muted-foreground" />
                                      <p className="text-xs font-semibold tabular-nums text-foreground">
                                        {(campaign.estimatedRevenue / 1000).toFixed(0)}k
                                      </p>
                                    </div>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    {formatCurrency(campaign.estimatedRevenue)}
                                  </TooltipContent>
                                </Tooltip>
                              </div>

                              {/* Confidence Bar */}
                              <div className="mb-3">
                                <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                                  <span>Confidence</span>
                                  <span className={getConfidenceColor(campaign.confidence)}>
                                    {campaign.confidence}%
                                  </span>
                                </div>
                                <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                                  <div
                                    className={`h-full rounded-full transition-all duration-500 ${
                                      campaign.confidence >= 90
                                        ? "bg-success"
                                        : campaign.confidence >= 80
                                        ? "bg-primary"
                                        : campaign.confidence >= 70
                                        ? "bg-warning"
                                        : "bg-muted-foreground"
                                    }`}
                                    style={{ width: `${campaign.confidence}%` }}
                                  />
                                </div>
                              </div>

                              {/* Footer - Owner */}
                              <div className="flex items-center justify-between border-t border-border/50 pt-3">
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-6 w-6 border border-border">
                                    <AvatarImage src={campaign.assignedOwnerAvatar} />
                                    <AvatarFallback className="text-[10px]">
                                      {campaign.assignedOwner
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span className="text-xs text-muted-foreground">
                                    {campaign.assignedOwner}
                                  </span>
                                </div>
                                <Badge
                                  variant="outline"
                                  className="text-[10px] border-border/50"
                                >
                                  {typeLabels[campaign.type]}
                                </Badge>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}

                      {stageCards.length === 0 && (
                        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed border-border/50 p-4">
                          <p className="text-xs text-muted-foreground">
                            No campaigns in this stage
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </TooltipProvider>
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
}
