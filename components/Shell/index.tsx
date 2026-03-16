import * as React from "react";
import { cn } from "@/lib/utils";

interface ShellProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  children: React.ReactNode;
  layout?: "default" | "dashboard" | "auth";
}

export function Shell({ children, as: Comp = "div", layout = "default", className, ...props }: ShellProps) {
  return (
    <Comp
      className={cn(
        "grid items-start gap-8",
        layout === "default" && "container",
        layout === "dashboard" && "container",
        layout === "auth" && "flex min-h-screen items-center justify-center",
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}
