import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => (
  <input
    type={type}
    className={cn(
      "flex h-12 w-full rounded-xl border border-card-border bg-white/5 px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus-visible:border-neon/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
      className
    )}
    ref={ref}
    {...props}
  />
));
Input.displayName = "Input";

export { Input };
