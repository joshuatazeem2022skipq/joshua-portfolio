"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { WordReveal } from "@/components/ui/word-reveal";
import { JOURNEY_SECTIONS } from "@/features/galaxy/journey";

/** Sci-fi holographic glass panel with corner brackets and a scanline. */
export function HoloPanel({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 48, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn("holo-panel p-6 md:p-10", className)}
    >
      <span className="holo-corner holo-corner-tl" aria-hidden />
      <span className="holo-corner holo-corner-tr" aria-hidden />
      <span className="holo-corner holo-corner-bl" aria-hidden />
      <span className="holo-corner holo-corner-br" aria-hidden />
      <span className="holo-scanline" aria-hidden />
      <div className="relative">{children}</div>
    </motion.div>
  );
}

/** "DESTINATION 02 · SKILLS" style header used at every stop with planetary approach telemetry. */
export function DestinationHeader({
  index,
  label,
  title,
  description,
}: {
  index: number;
  label: string;
  title: string;
  description?: string;
}) {
  const planetMeta = JOURNEY_SECTIONS[index];

  return (
    <div className="mb-8">
      {/* Top Telemetry & Planet Vector Badges */}
      <div className="flex flex-wrap items-center justify-between gap-2.5">
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="destination-tag flex items-center gap-3"
        >
          <span className="inline-block h-px w-8 bg-accent/70" aria-hidden />
          Destination {String(index).padStart(2, "0")} · {label}
        </motion.p>

        {planetMeta && (
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-950/40 px-3 py-1 font-mono text-[0.68rem] text-sky-300 shadow-[0_0_15px_-3px_rgba(56,189,248,0.25)] backdrop-blur-md"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse" />
            <span>
              Target: <strong className="text-white font-semibold">{planetMeta.planetName}</strong>
            </span>
            <span className="text-sky-400/50">|</span>
            <span className="text-muted/80">{planetMeta.planetDistance}</span>
            <span className="hidden sm:inline text-sky-400/50">|</span>
            <span className="hidden sm:inline text-accent/90">{planetMeta.planetType}</span>
          </motion.div>
        )}
      </div>

      <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
        <WordReveal text={title} delay={0.1} wordClassName="text-gradient-vibrant" />
      </h2>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-4 max-w-2xl text-sm leading-relaxed text-muted md:text-base"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}

/** Full-viewport destination wrapper that positions its panel left/right. */
export function DestinationSection({
  id,
  side,
  children,
  className,
}: {
  id: string;
  side: "left" | "right" | "center";
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "section-pad relative flex min-h-screen items-center py-24",
        className
      )}
    >
      <div
        className={cn(
          "container-wide mx-auto flex",
          side === "left" && "justify-start",
          side === "right" && "justify-end",
          side === "center" && "justify-center"
        )}
      >
        <div
          className={cn(
            "w-full",
            side === "center" ? "max-w-4xl" : "max-w-2xl"
          )}
        >
          {children}
        </div>
      </div>
    </section>
  );
}
