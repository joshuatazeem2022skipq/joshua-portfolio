"use client";

import { motion } from "framer-motion";
import {
  DestinationHeader,
  DestinationSection,
  HoloPanel,
} from "@/components/shared/HoloPanel";
import { Badge } from "@/components/ui/badge";
import { experiences } from "@/lib/resume-data";

export function ExperienceSection() {
  return (
    <DestinationSection id="experience" side="left" className="min-h-[120vh]">
      <HoloPanel>
        <DestinationHeader
          index={3}
          label="Experience"
          title="Mission log — four deployments"
          description="Every role, responsibility, and measurable outcome from the flight record."
        />

        <div className="relative space-y-6 before:absolute before:left-[7px] before:top-3 before:h-[calc(100%-24px)] before:w-px before:bg-gradient-to-b before:from-accent/70 before:via-primary/40 before:to-transparent">
          {experiences.map((exp, i) => (
            <motion.article
              key={exp.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: i * 0.06, duration: 0.6 }}
              className="relative pl-8"
            >
              <span
                className="absolute left-0 top-2 h-4 w-4 rounded-full border-2 border-accent bg-background shadow-[0_0_14px_rgba(45,212,191,0.7)]"
                aria-hidden
              />
              <p className="text-xs uppercase tracking-[0.2em] text-accent">
                {exp.period}
              </p>
              <h3 className="mt-1.5 font-display text-lg font-semibold md:text-xl">
                {exp.role}
              </h3>
              <p className="mt-0.5 text-sm text-neon">{exp.company}</p>
              <p className="mt-0.5 text-xs text-muted">{exp.description}</p>
              <ul className="mt-3 space-y-2">
                {exp.responsibilities.map((item) => (
                  <li
                    key={item}
                    className="relative pl-4 text-xs leading-relaxed text-muted before:absolute before:left-0 before:top-1.5 before:h-1 before:w-1 before:rounded-full before:bg-accent md:text-sm"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {exp.technologies.map((tech) => (
                  <Badge key={tech} variant="outline" className="text-[0.65rem]">
                    {tech}
                  </Badge>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </HoloPanel>
    </DestinationSection>
  );
}
