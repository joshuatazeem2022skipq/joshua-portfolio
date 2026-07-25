"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Skiper-UI-style staggered word reveal — each word blurs and slides in.
 * Gradient styles must be applied per-word (not on the parent) so
 * background-clip:text stays visible on nested spans.
 */
export function WordReveal({
  text,
  className,
  wordClassName,
  delay = 0,
  animateOnView = true,
}: {
  text: string;
  className?: string;
  /** Applied to each word — use for text-gradient / text-gradient-gold */
  wordClassName?: string;
  delay?: number;
  animateOnView?: boolean;
}) {
  const words = text.split(" ").filter(Boolean);

  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.06, delayChildren: delay },
    },
  };

  const word = {
    hidden: { opacity: 0, y: "0.55em", filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <motion.span
      variants={container}
      initial="hidden"
      {...(animateOnView
        ? { whileInView: "visible", viewport: { once: true, margin: "-10%" } }
        : { animate: "visible" })}
      className={cn("inline", className)}
      aria-label={text}
    >
      {words.map((w, i) => (
        <motion.span
          key={`${w}-${i}`}
          variants={word}
          className={cn(
            "inline-block will-change-transform",
            wordClassName
          )}
          aria-hidden
        >
          {w}
          {i < words.length - 1 ? "\u00A0" : null}
        </motion.span>
      ))}
    </motion.span>
  );
}
