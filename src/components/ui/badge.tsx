import * as React from "react";
import { cn } from "@/lib/utils";

const Badge = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { variant?: "default" | "outline" }
>(({ className, variant = "default", ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-medium tracking-wide",
      variant === "default" &&
        "bg-primary/15 text-neon border border-primary/25",
      variant === "outline" &&
        "border border-card-border text-muted bg-white/[0.03]",
      className
    )}
    {...props}
  />
));
Badge.displayName = "Badge";

export { Badge };
