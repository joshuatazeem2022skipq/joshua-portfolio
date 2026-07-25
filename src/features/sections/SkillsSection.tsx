"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  DestinationHeader,
  DestinationSection,
  HoloPanel,
} from "@/components/shared/HoloPanel";
import { skillCategories, skills } from "@/lib/resume-data";
import { cn } from "@/lib/utils";

export function SkillsSection() {
  const [active, setActive] = useState<(typeof skillCategories)[number] | "All">(
    "All"
  );

  const filtered = useMemo(
    () =>
      (active === "All"
        ? skills
        : skills.filter((s) => s.category === active)
      ).slice(0, 12),
    [active]
  );

  return (
    <DestinationSection id="skills" side="right">
      <HoloPanel>
        <DestinationHeader
          index={2}
          label="Skills"
          title="The technology constellation"
          description={`${skills.length}+ production-proven skills across frontend, backend, data, and DevOps.`}
        />

        <div className="mb-6 flex flex-wrap gap-2">
          {(["All", ...skillCategories] as const).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              className={cn(
                "cursor-pointer rounded-lg border px-3 py-1.5 text-xs transition-colors",
                active === cat
                  ? "border-accent/60 bg-accent/10 text-foreground"
                  : "border-card-border bg-white/[0.03] text-muted hover:text-foreground"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {filtered.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: Math.min(i * 0.04, 0.3) }}
              className="rounded-xl border border-card-border bg-white/[0.03] p-4"
            >
              <div className="flex items-baseline justify-between gap-2">
                <p className="font-display text-sm font-medium">{skill.name}</p>
                <span className="text-xs text-muted">{skill.level}%</span>
              </div>
              <p className="mt-0.5 text-[0.65rem] uppercase tracking-wider text-accent">
                {skill.category}
              </p>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full rounded-full bg-gradient-to-r from-primary via-neon to-accent"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </HoloPanel>
    </DestinationSection>
  );
}
