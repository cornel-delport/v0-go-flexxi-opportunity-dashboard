import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const avatarVariants = cva(
  "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
  {
    variants: {
      variant: {
        default: "",
        small: "h-8 w-8",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface AvatarProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof avatarVariants> {
  src: string;
  name: string;
}

const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  ({ src, name, className, variant, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(avatarVariants({ variant }), className)}
        {...props}
      >
        <img src={src} alt={name} className="aspect-square h-full w-full" />
      </span>
    );
  }
);

Avatar.displayName = "Avatar";

export { Avatar };
