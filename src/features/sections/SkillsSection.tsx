"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Cpu,
  Brain,
  Layout,
  Server,
  Cloud,
  Terminal,
} from "lucide-react";
import {
  DestinationHeader,
  DestinationSection,
  HoloPanel,
} from "@/components/shared/HoloPanel";
import { skillCategories, skills } from "@/lib/resume-data";
import { cn } from "@/lib/utils";

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  All: Sparkles,
  "Core Architecture": Cpu,
  "AI & Data": Brain,
  Frontend: Layout,
  Backend: Server,
  "Cloud & DevOps": Cloud,
  "Tools & Methodologies": Terminal,
};

export function SkillsSection() {
  const [active, setActive] = useState<(typeof skillCategories)[number] | "All">(
    "All"
  );

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: skills.length };
    skills.forEach((s) => {
      counts[s.category] = (counts[s.category] || 0) + 1;
    });
    return counts;
  }, []);

  const filtered = useMemo(
    () => (active === "All" ? skills : skills.filter((s) => s.category === active)),
    [active]
  );

  return (
    <DestinationSection id="skills" side="right" className="min-h-[120vh]">
      <HoloPanel>
        <DestinationHeader
          index={2}
          label="Skills"
          title="The technology constellation"
          description={`${skills.length} verified production technologies spanning AI/LLM, platform engineering, distributed data, and high-performance frontend.`}
        />

        {/* Modern Cyber-Architectural Tab Filter System */}
        <div className="mb-8 rounded-2xl border border-white/10 bg-zinc-950/60 p-1.5 shadow-[0_0_25px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.08)] backdrop-blur-xl">
          <div className="flex flex-wrap gap-1.5">
            {(["All", ...skillCategories] as const).map((cat) => {
              const isSelected = active === cat;
              const Icon = categoryIcons[cat] || Sparkles;

              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActive(cat)}
                  className={cn(
                    "group relative flex cursor-pointer items-center gap-2 rounded-xl px-3.5 py-2 font-display text-xs font-semibold transition-all duration-300",
                    isSelected
                      ? "text-foreground"
                      : "text-muted hover:text-foreground"
                  )}
                >
                  {/* Sliding Active Pill Background */}
                  {isSelected && (
                    <motion.div
                      layoutId="activeCategoryPill"
                      className="absolute inset-0 rounded-xl border border-accent/60 bg-gradient-to-r from-accent/20 via-neon/15 to-primary/20 shadow-[0_0_20px_-3px_rgba(56,189,248,0.45)] backdrop-blur-md"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}

                  {/* High-Tech Category Icon */}
                  <Icon
                    className={cn(
                      "relative z-10 h-3.5 w-3.5 transition-colors duration-300",
                      isSelected
                        ? "text-accent"
                        : "text-muted/80 group-hover:text-accent"
                    )}
                  />

                  {/* Category Title */}
                  <span className="relative z-10">{cat}</span>

                  {/* Holographic Count Bubble */}
                  <span
                    className={cn(
                      "relative z-10 rounded-md px-1.5 py-0.5 font-mono text-[0.62rem] transition-colors duration-300",
                      isSelected
                        ? "bg-accent/30 text-sky-200 shadow-[0_0_8px_rgba(56,189,248,0.3)] font-bold"
                        : "bg-white/[0.06] text-muted/80 group-hover:bg-white/[0.1] group-hover:text-foreground"
                    )}
                  >
                    {categoryCounts[cat] ?? 0}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Skills Cards Grid */}
        <motion.div
          layout
          className="grid gap-3 sm:grid-cols-2 max-h-[620px] overflow-y-auto pr-1 scrollbar-none"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((skill, i) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25, delay: Math.min(i * 0.02, 0.2) }}
                className="card-vibrant group rounded-xl p-3.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="font-display text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
                    {skill.name}
                  </p>
                  <span className="font-mono text-xs text-muted group-hover:text-neon">
                    {skill.level}%
                  </span>
                </div>
                <div className="mt-1 flex items-center justify-between">
                  <span className="text-[0.65rem] uppercase tracking-wider text-accent/80 font-medium">
                    {skill.category}
                  </span>
                  <span className="text-[0.6rem] text-muted">Production Ready</span>
                </div>
                <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full rounded-full bg-gradient-to-r from-primary via-neon to-accent shadow-[0_0_8px_rgba(56,189,248,0.5)]"
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </HoloPanel>
    </DestinationSection>
  );
}
