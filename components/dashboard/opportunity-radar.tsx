"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockOpportunities } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  Music,
  Plane,
  Users,
  Waves,
  Globe,
  Building2,
  TrendingUp,
  MapPin,
  DollarSign,
  Calendar,
} from "lucide-react";
import type { Opportunity, OpportunityType } from "@/lib/types";

const categoryConfig: Record<
  OpportunityType,
  { label: string; icon: typeof Music; color: string }
> = {
  "fan-travel": { label: "Fan Travel", icon: Plane, color: "text-blue-400" },
  "concert-demand": { label: "Concert", icon: Music, color: "text-purple-400" },
  "supporter-trip": { label: "Supporter", icon: Users, color: "text-green-400" },
  "surf-trip": { label: "Surf Trip", icon: Waves, color: "text-cyan-400" },
  "expat-travel": { label: "Expat", icon: Globe, color: "text-amber-400" },
  charter: { label: "Charter", icon: Building2, color: "text-rose-400" },
};

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

// Calculate urgency based on event date proximity
function calculateUrgency(eventDate: string): number {
  const now = new Date();
  const event = new Date(eventDate);
  const daysUntil = Math.ceil(
    (event.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (daysUntil <= 14) return 95;
  if (daysUntil <= 30) return 80;
  if (daysUntil <= 60) return 60;
  if (daysUntil <= 90) return 40;
  return 20;
}

// Get bubble color based on confidence score
function getBubbleColor(confidence: number): string {
  if (confidence >= 90) return "bg-success/80 border-success";
  if (confidence >= 80) return "bg-primary/80 border-primary";
  if (confidence >= 70) return "bg-warning/80 border-warning";
  return "bg-muted/80 border-muted-foreground";
}

// Get bubble size based on group size
function getBubbleSize(groupSize: number): number {
  const minSize = 32;
  const maxSize = 80;
  const maxGroupSize = 500;
  
  const normalized = Math.min(groupSize / maxGroupSize, 1);
  return minSize + normalized * (maxSize - minSize);
}

interface RadarBubbleProps {
  opportunity: Opportunity;
  x: number;
  y: number;
  onHover: (opp: Opportunity | null) => void;
  isHovered: boolean;
}

function RadarBubble({ opportunity, x, y, onHover, isHovered }: RadarBubbleProps) {
  const size = getBubbleSize(opportunity.groupSize);
  const colorClass = getBubbleColor(opportunity.confidence);
  const config = categoryConfig[opportunity.type];
  const Icon = config.icon;

  return (
    <Link
      href={`/opportunities/${opportunity.id}`}
      className="absolute transition-all duration-300 hover:z-50"
      style={{
        left: `${x}%`,
        bottom: `${y}%`,
        transform: "translate(-50%, 50%)",
      }}
      onMouseEnter={() => onHover(opportunity)}
      onMouseLeave={() => onHover(null)}
    >
      <div
        className={cn(
          "flex items-center justify-center rounded-full border-2 transition-all duration-200",
          colorClass,
          isHovered && "scale-125 shadow-lg shadow-primary/20"
        )}
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
      >
        <Icon className={cn("h-4 w-4", config.color)} />
      </div>
    </Link>
  );
}

export function OpportunityRadar() {
  const [hoveredOpportunity, setHoveredOpportunity] = useState<Opportunity | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  // Filter opportunities
  const filteredOpportunities =
    categoryFilter === "all"
      ? mockOpportunities
      : mockOpportunities.filter((opp) => opp.type === categoryFilter);

  // Calculate positions for each opportunity
  const radarData = filteredOpportunities.map((opp) => ({
    opportunity: opp,
    x: opp.monetizationScore, // X-axis: monetization score (0-100)
    y: calculateUrgency(opp.eventDate), // Y-axis: urgency (0-100)
  }));

  return (
    <Card className="overflow-hidden border-border bg-card">
      <CardHeader className="flex flex-row items-center justify-between border-b border-border/50 bg-secondary/20 pb-4">
        <div className="space-y-1">
          <CardTitle className="text-lg font-semibold tracking-tight text-foreground">
            Opportunity Radar
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            Visualize demand by monetization potential and urgency
          </p>
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="h-9 w-[160px] border-border bg-secondary/50">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {Object.entries(categoryConfig).map(([key, config]) => (
              <SelectItem key={key} value={key}>
                {config.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex gap-4">
          {/* Radar Chart */}
          <div className="relative flex-1">
            {/* Axis Labels */}
            <div className="absolute -left-1 top-1/2 -translate-y-1/2 -rotate-90 text-xs font-medium text-muted-foreground">
              URGENCY
            </div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xs font-medium text-muted-foreground">
              MONETIZATION POTENTIAL
            </div>

            {/* Grid */}
            <div className="relative ml-6 h-80 rounded-lg border border-border bg-secondary/20">
              {/* Grid lines */}
              <div className="absolute inset-0">
                {/* Horizontal lines */}
                {[25, 50, 75].map((y) => (
                  <div
                    key={`h-${y}`}
                    className="absolute left-0 right-0 border-t border-dashed border-border/50"
                    style={{ bottom: `${y}%` }}
                  />
                ))}
                {/* Vertical lines */}
                {[25, 50, 75].map((x) => (
                  <div
                    key={`v-${x}`}
                    className="absolute bottom-0 top-0 border-l border-dashed border-border/50"
                    style={{ left: `${x}%` }}
                  />
                ))}
              </div>

              {/* Quadrant labels */}
              <div className="absolute left-2 top-2 text-[10px] font-medium text-muted-foreground/60">
                LOW VALUE / URGENT
              </div>
              <div className="absolute right-2 top-2 text-[10px] font-medium text-success/60">
                HIGH VALUE / URGENT
              </div>
              <div className="absolute bottom-2 left-2 text-[10px] font-medium text-muted-foreground/60">
                LOW VALUE / LOW URGENCY
              </div>
              <div className="absolute bottom-2 right-2 text-[10px] font-medium text-primary/60">
                HIGH VALUE / LOW URGENCY
              </div>

              {/* Bubbles */}
              {radarData.map((item) => (
                <RadarBubble
                  key={item.opportunity.id}
                  opportunity={item.opportunity}
                  x={item.x}
                  y={item.y}
                  onHover={setHoveredOpportunity}
                  isHovered={hoveredOpportunity?.id === item.opportunity.id}
                />
              ))}
            </div>

            {/* X-axis scale */}
            <div className="ml-6 mt-1 flex justify-between px-2 text-[10px] text-muted-foreground">
              <span>0%</span>
              <span>25%</span>
              <span>50%</span>
              <span>75%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Hover Details / Legend */}
          <div className="w-64 shrink-0 space-y-4">
            {hoveredOpportunity ? (
              <div className="rounded-lg border border-border bg-secondary/30 p-4">
                <h4 className="font-semibold text-foreground">
                  {hoveredOpportunity.title}
                </h4>
                <div className="mt-3 space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" />
                    {hoveredOpportunity.location}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    {formatDate(hoveredOpportunity.eventDate)}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="h-3.5 w-3.5" />
                    {hoveredOpportunity.groupSize.toLocaleString()} people
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <DollarSign className="h-3.5 w-3.5" />
                    {formatCurrency(hoveredOpportunity.estimatedRevenue)}
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  <Badge variant="outline" className="border-primary/30 text-xs">
                    {hoveredOpportunity.confidence}% confidence
                  </Badge>
                  <Badge variant="outline" className="border-success/30 text-xs">
                    {hoveredOpportunity.monetizationScore}% potential
                  </Badge>
                </div>
              </div>
            ) : (
              <div className="rounded-lg border border-dashed border-border bg-secondary/20 p-4 text-center text-sm text-muted-foreground">
                Hover over a bubble to see details
              </div>
            )}

            {/* Legend */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Categories
              </h4>
              <div className="space-y-2">
                {Object.entries(categoryConfig).map(([key, config]) => {
                  const Icon = config.icon;
                  const count = mockOpportunities.filter(
                    (o) => o.type === key
                  ).length;
                  return (
                    <div
                      key={key}
                      className="flex items-center justify-between text-sm"
                    >
                      <div className="flex items-center gap-2">
                        <Icon className={cn("h-4 w-4", config.color)} />
                        <span className="text-muted-foreground">{config.label}</span>
                      </div>
                      <span className="tabular-nums text-foreground">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Size Legend */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Bubble Size = Group Size
              </h4>
              <div className="flex items-center gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full border border-muted-foreground bg-muted/50 text-[8px] text-muted-foreground">
                  S
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-muted-foreground bg-muted/50 text-[8px] text-muted-foreground">
                  M
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-muted-foreground bg-muted/50 text-[8px] text-muted-foreground">
                  L
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-muted-foreground bg-muted/50 text-[8px] text-muted-foreground">
                  XL
                </div>
              </div>
            </div>

            {/* Color Legend */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Color = Confidence
              </h4>
              <div className="space-y-1.5">
                {[
                  { label: "90%+", color: "bg-success" },
                  { label: "80-89%", color: "bg-primary" },
                  { label: "70-79%", color: "bg-warning" },
                  { label: "<70%", color: "bg-muted" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2 text-xs">
                    <div className={cn("h-3 w-3 rounded-full", item.color)} />
                    <span className="text-muted-foreground">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
