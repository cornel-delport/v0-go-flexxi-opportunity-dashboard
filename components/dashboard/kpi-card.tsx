"use client";

import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface KpiCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  trend?: "up" | "down" | "stable";
  trendValue?: string;
  icon: LucideIcon;
  iconClassName?: string;
}

export function KpiCard({
  title,
  value,
  change,
  changeType = "neutral",
  trend = "stable",
  trendValue,
  icon: Icon,
  iconClassName,
}: KpiCardProps) {
  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;

  return (
    <div className="group relative overflow-hidden rounded-xl border border-border bg-card p-5 transition-all duration-200 hover:border-primary/30 hover:bg-card/80 hover:shadow-lg hover:shadow-primary/5">
      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
      
      <div className="relative flex items-start justify-between">
        <div className="space-y-3">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {title}
          </p>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold tracking-tight text-foreground">
              {value}
            </p>
            {/* Inline trend indicator */}
            {trend && trend !== "stable" && (
              <div
                className={cn(
                  "flex items-center gap-0.5 text-xs font-medium",
                  trend === "up" && "text-success",
                  trend === "down" && "text-destructive"
                )}
              >
                <TrendIcon className="h-3.5 w-3.5" />
                {trendValue && <span>{trendValue}</span>}
              </div>
            )}
          </div>
          {change && (
            <p
              className={cn(
                "text-xs font-medium",
                changeType === "positive" && "text-success",
                changeType === "negative" && "text-destructive",
                changeType === "neutral" && "text-muted-foreground"
              )}
            >
              {change}
            </p>
          )}
        </div>
        <div
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-lg bg-secondary/80 transition-colors duration-200 group-hover:bg-primary/10",
            iconClassName
          )}
        >
          <Icon className="h-5 w-5 text-muted-foreground transition-colors duration-200 group-hover:text-primary" />
        </div>
      </div>
    </div>
  );
}
