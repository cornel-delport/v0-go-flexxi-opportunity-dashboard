import { cn } from "@/lib/utils";
import type { OpportunityType } from "@/lib/types";
import {
  Plane,
  Music,
  Users,
  Waves,
  Home,
  Ship,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface TypeBadgeProps {
  type: OpportunityType;
}

const typeConfig: Record<
  OpportunityType,
  { label: string; icon: LucideIcon; className: string }
> = {
  "fan-travel": {
    label: "Fan Travel",
    icon: Plane,
    className: "text-primary",
  },
  "concert-demand": {
    label: "Concert",
    icon: Music,
    className: "text-pink-400",
  },
  "supporter-trip": {
    label: "Supporter",
    icon: Users,
    className: "text-blue-400",
  },
  "surf-trip": {
    label: "Surf Trip",
    icon: Waves,
    className: "text-cyan-400",
  },
  "expat-travel": {
    label: "Expat",
    icon: Home,
    className: "text-amber-400",
  },
  charter: {
    label: "Charter",
    icon: Ship,
    className: "text-indigo-400",
  },
};

export function TypeBadge({ type }: TypeBadgeProps) {
  const config = typeConfig[type];
  const Icon = config.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-sm",
        config.className
      )}
    >
      <Icon className="h-4 w-4" />
      <span className="font-medium">{config.label}</span>
    </span>
  );
}
