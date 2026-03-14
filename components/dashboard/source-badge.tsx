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
  instagram: {
    label: "Instagram",
    className: "bg-pink-500/20 text-pink-400",
    icon: "I",
  },
  forum: {
    label: "Forum",
    className: "bg-slate-500/20 text-slate-400",
    icon: "W",
  },
  discord: {
    label: "Discord",
    className: "bg-indigo-500/20 text-indigo-400",
    icon: "D",
  },
  telegram: {
    label: "Telegram",
    className: "bg-cyan-500/20 text-cyan-400",
    icon: "T",
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
