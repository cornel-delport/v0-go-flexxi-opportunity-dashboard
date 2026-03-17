import { cn } from "@/lib/utils";
import type { OpportunityType } from "@/lib/types";
import {
  Plane,
  Music,
  Users,
  Briefcase, 
  Building, 
  FileText, 
  File, 
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
  consulting: {
    label: "Consulting",
    icon: Briefcase,
    className: "text-amber-400",
  },
  "full-time": {
    label: "Full-time",
    icon: Building,
    className: "text-indigo-400",
  },
  "part-time": {
    label: "Part-time",
    icon: FileText,
    className: "text-green-400",
  },
  contract: {
    label: "Contract",
    icon: File,
    className: "text-purple-400",
  },
  post: {
    label: "Post",
    icon: File,
    className: "text-gray-400",
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
