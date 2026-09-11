"use client";

import { motion } from "framer-motion";
import { CheckCircle2, MapPin, Sparkles } from "lucide-react";
import {
  DestinationHeader,
  DestinationSection,
  HoloPanel,
} from "@/components/shared/HoloPanel";
import { Badge } from "@/components/ui/badge";
import { experiences } from "@/lib/resume-data";

export function ExperienceSection() {
  return (
    <DestinationSection id="experience" side="left" className="min-h-[130vh]">
      <HoloPanel>
        <DestinationHeader
          index={3}
          label="Experience"
          title="Mission log — verified career record"
          description="Track record across platform engineering, full-stack architecture, and technical leadership."
        />

        <div className="relative space-y-8 before:absolute before:left-[11px] before:top-4 before:h-[calc(100%-32px)] before:w-[2px] before:bg-gradient-to-b before:from-accent before:via-neon/50 before:to-primary/20">
          {experiences.map((exp, i) => {
            const isCurrent = exp.endDate === "Present";

            return (
              <motion.article
                key={exp.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className="relative pl-9"
              >
                {/* Timeline node */}
                <span
                  className={`absolute left-0 top-1.5 flex h-6 w-6 items-center justify-center rounded-full border-2 bg-background ${
                    isCurrent
                      ? "border-emerald-400 shadow-[0_0_16px_rgba(52,211,153,0.8)]"
                      : "border-accent shadow-[0_0_12px_rgba(56,189,248,0.5)]"
                  }`}
                  aria-hidden
                >
                  <span
                    className={`h-2 w-2 rounded-full ${
                      isCurrent ? "bg-emerald-400 animate-pulse" : "bg-accent"
                    }`}
                  />
                </span>

                <div className="card-vibrant rounded-xl p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-display text-sm font-bold text-gradient-vibrant md:text-base">
                        {exp.company}
                      </span>
                      {isCurrent && (
                        <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/40 bg-emerald-950/50 px-2 py-0.5 text-[0.65rem] font-semibold text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                          Current Role
                        </span>
                      )}
                    </div>
                    <span className="rounded-md border border-card-border bg-white/[0.04] px-2.5 py-0.5 font-mono text-xs text-muted">
                      {exp.period}
                    </span>
                  </div>

                  <h3 className="mt-2 font-display text-base font-semibold text-foreground md:text-lg">
                    {exp.role}
                  </h3>
                  <p className="mt-0.5 text-xs text-muted/90 italic">
                    {exp.description}
                  </p>

                  <ul className="mt-4 space-y-2.5">
                    {exp.responsibilities.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-xs leading-relaxed text-muted md:text-sm"
                      >
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent/80" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 flex flex-wrap gap-1.5 pt-2 border-t border-white/[0.06]">
                    {exp.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        variant="outline"
                        className="text-[0.68rem] bg-white/[0.02] hover:border-accent/40 hover:text-accent transition-colors"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </HoloPanel>
    </DestinationSection>
  );
}
