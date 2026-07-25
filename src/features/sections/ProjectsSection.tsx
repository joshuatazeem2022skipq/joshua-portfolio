"use client";

import { motion } from "framer-motion";
import { Building2 } from "lucide-react";
import {
  DestinationHeader,
  DestinationSection,
  HoloPanel,
} from "@/components/shared/HoloPanel";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/lib/resume-data";

export function ProjectsSection() {
  return (
    <DestinationSection id="projects" side="right" className="min-h-[120vh]">
      <HoloPanel>
        <DestinationHeader
          index={4}
          label="Projects"
          title="Artifacts recovered from the field"
          description="Production case studies — each one maps directly to a role on the resume. No invented cargo."
        />

        <div className="space-y-5">
          {projects.map((project, i) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: i * 0.06, duration: 0.6 }}
              className="group rounded-xl border border-card-border bg-white/[0.03] p-5 transition-colors hover:border-neon/40"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <Badge>{project.category}</Badge>
                <span className="flex items-center gap-1.5 text-xs text-muted">
                  <Building2 className="h-3.5 w-3.5 text-accent" aria-hidden />
                  {project.company} · {project.period}
                </span>
              </div>
              <h3 className="mt-3 font-display text-lg font-semibold md:text-xl">
                {project.title}
              </h3>
              <p className="mt-0.5 text-xs text-neon">{project.role}</p>
              <p className="mt-2 text-xs leading-relaxed text-muted md:text-sm">
                {project.description}
              </p>
              {project.metrics && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.metrics.map((m) => (
                    <span
                      key={m}
                      className="rounded-md border border-accent/30 bg-accent/10 px-2 py-0.5 text-[0.65rem] text-accent"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              )}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.technologies.map((tech) => (
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
