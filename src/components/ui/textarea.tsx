import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    className={cn(
      "flex min-h-[140px] w-full rounded-xl border border-card-border bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus-visible:border-neon/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
      className
    )}
    ref={ref}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export { Textarea };
