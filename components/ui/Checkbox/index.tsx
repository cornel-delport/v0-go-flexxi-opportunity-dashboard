import * as React from "react";
import { CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

const Checkbox = React.forwardRef<HTMLButtonElement, React.ComponentPropsWithoutRef<"button">>((
  { className, ...props },
  ref
) => (
  <button
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className
    )}
    {...props}
  >
    <CheckIcon className="h-4 w-4" />
  </button>
));

Checkbox.displayName = "Checkbox";

export { Checkbox };
