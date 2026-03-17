import { cn } from "@/lib/utils";
import type { SourceType } from "@/lib/types";

interface SourceBadgeProps {
  source: SourceType;
}

const sourceConfig: Record<
  SourceType,
  { label: string; className: string; icon: string }
> = {
  reddit: {
    label: "Reddit",
    className: "bg-orange-500/20 text-orange-400",
    icon: "R",
  },
  twitter: {
    label: "Twitter",
    className: "bg-sky-500/20 text-sky-400",
    icon: "X",
  },
  facebook: {
    label: "Facebook",
    className: "bg-blue-500/20 text-blue-400",
    icon: "F",
  },
  internal: {
    label: "Internal",
    className: "bg-slate-500/20 text-slate-400",
    icon: "I",
  },
  external: {
    label: "External",
    className: "bg-slate-500/20 text-slate-400",
    icon: "E",
  },
  referral: {
    label: "Referral",
    className: "bg-slate-500/20 text-slate-400",
    icon: "R",
  },
};

export function SourceBadge({ source }: SourceBadgeProps) {
  const config = sourceConfig[source];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium",
        config.className
      )}
    >
      <span className="flex h-4 w-4 items-center justify-center rounded text-[10px] font-bold">
        {config.icon}
      </span>
      {config.label}
    </span>
  );
}
