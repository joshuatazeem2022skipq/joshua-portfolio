"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Expand,
  ExternalLink,
  Layers,
  TrendingUp,
  X,
  Zap,
} from "lucide-react";
import {
  DestinationHeader,
  DestinationSection,
  HoloPanel,
} from "@/components/shared/HoloPanel";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/lib/resume-data";
import type { ProjectItem } from "@/types";

const domainMap: Record<string, string> = {
  "iot-telemetry-platform": "telemetry.visibilitybots.io/live-rag",
  "enterprise-platform-migration": "mesh.autorobos.io/blue-green",
  "performance-leadership": "observability.tzldynamics.internal/latency",
  "enterprise-crm-ecommerce": "gateway.aiksol.io/payments-rbac",
};

export function ProjectsSection() {
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

  return (
    <DestinationSection id="projects" side="right" className="min-h-[140vh]">
      <HoloPanel>
        <DestinationHeader
          index={4}
          label="Projects"
          title="Production architecture case studies"
          description="High-impact system designs directly derived from verified flight record deployments. Scalable microservices, real-time telemetry, and practical AI integration."
        />

        <div className="space-y-8">
          {projects.map((project, i) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className="card-vibrant group relative overflow-hidden rounded-2xl p-5 md:p-6 transition-all duration-300"
            >
              {/* Corner tech accent */}
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-accent/10 blur-2xl group-hover:bg-accent/20 transition-all duration-500"
                aria-hidden
              />

              {/* Top metadata bar */}
              <div className="flex flex-wrap items-center justify-between gap-2.5">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/15 px-3 py-1 text-[0.7rem] font-semibold text-accent shadow-[0_0_12px_rgba(56,189,248,0.25)]">
                  <Layers className="h-3 w-3" />
                  {project.category}
                </span>
                <span className="flex items-center gap-1.5 rounded-md border border-card-border bg-white/[0.04] px-2.5 py-1 text-xs text-muted">
                  <Building2 className="h-3.5 w-3.5 text-accent" aria-hidden />
                  <strong className="text-foreground font-medium">{project.company}</strong>
                  <span className="text-muted/60">·</span>
                  <span className="font-mono text-[0.75rem]">{project.period}</span>
                </span>
              </div>

              {/* Animated Interactive Image Mockup Container */}
              {project.image && (
                <div className="mt-4 overflow-hidden rounded-xl border border-card-border bg-black/60 shadow-[0_12px_36px_rgba(0,0,0,0.6)]">
                  {/* High-Tech Terminal Window Header */}
                  <div className="flex items-center justify-between border-b border-white/[0.08] bg-white/[0.04] px-3.5 py-2">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                      <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                      <span className="ml-2 hidden font-mono text-[0.65rem] text-muted/80 sm:inline">
                        {domainMap[project.id] || "system.deployment.cloud"}
                      </span>
                    </div>

                    {project.statusBadge && (
                      <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-2.5 py-0.5 font-mono text-[0.65rem] font-medium text-emerald-300">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>{project.statusBadge}</span>
                      </div>
                    )}
                  </div>

                  {/* Image with animated scanline and zoom on hover */}
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => setActiveModalProject(project)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setActiveModalProject(project);
                      }
                    }}
                    className="group/img relative aspect-[16/9] w-full cursor-pointer overflow-hidden bg-zinc-950"
                  >
                    <Image
                      src={project.image}
                      alt={`${project.title} Preview Dashboard`}
                      fill
                      sizes="(max-width: 768px) 100vw, 800px"
                      className="object-cover object-top transition-transform duration-700 ease-out group-hover/img:scale-105"
                      priority={i === 0}
                    />

                    {/* Animated Holographic Scanline */}
                    <div className="holo-scanline" aria-hidden />

                    {/* Hover expand overlay prompt */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover/img:opacity-100">
                      <span className="inline-flex items-center gap-2 rounded-full border border-accent/60 bg-black/80 px-4 py-2 font-mono text-xs font-semibold text-accent shadow-[0_0_20px_rgba(56,189,248,0.5)]">
                        <Expand className="h-3.5 w-3.5" />
                        Click to Inspect High-Res Architecture
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Title & Role */}
              <div className="mt-5">
                <h3 className="font-display text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-gradient-vibrant md:text-2xl">
                  {project.title}
                </h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-neon">
                  {project.role}
                </p>
              </div>

              {/* Description */}
              <p className="mt-3 text-xs leading-relaxed text-muted/90 md:text-sm">
                {project.description}
              </p>

              {/* Key Impact Metrics Bar */}
              {project.metrics && project.metrics.length > 0 && (
                <div className="mt-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                  <p className="flex items-center gap-1.5 text-[0.65rem] font-bold uppercase tracking-widest text-emerald-400">
                    <TrendingUp className="h-3 w-3" />
                    Production Verified SLA & Metrics
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {project.metrics.map((m) => (
                      <span
                        key={m}
                        className="inline-flex items-center rounded-lg border border-emerald-500/30 bg-emerald-950/40 px-2.5 py-1 font-mono text-[0.7rem] font-semibold text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.15)]"
                      >
                        ✦ {m}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Architectural Highlights */}
              {project.features && (
                <div className="mt-4 space-y-2">
                  <p className="text-[0.65rem] font-bold uppercase tracking-widest text-accent">
                    Architectural Breakthroughs
                  </p>
                  <ul className="grid gap-2 sm:grid-cols-1">
                    {project.features.map((feat) => (
                      <li
                        key={feat}
                        className="flex items-start gap-2 text-xs leading-relaxed text-muted/90"
                      >
                        <Zap className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent/90" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Technologies Tag Cloud */}
              <div className="mt-5 flex flex-wrap gap-1.5 border-t border-white/[0.06] pt-3.5">
                {project.technologies.map((tech) => (
                  <Badge
                    key={tech}
                    variant="outline"
                    className="text-[0.68rem] bg-white/[0.02] hover:border-accent/50 hover:text-accent transition-colors"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </HoloPanel>

      {/* Full-Screen High-Resolution Inspection Modal */}
      <AnimatePresence>
        {activeModalProject && activeModalProject.image && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveModalProject(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-2xl border border-accent/40 bg-zinc-950 p-4 shadow-[0_0_50px_rgba(56,189,248,0.3)]"
            >
              <div className="mb-3 flex items-center justify-between border-b border-white/10 pb-2">
                <div>
                  <h4 className="font-display text-base font-bold text-foreground">
                    {activeModalProject.title}
                  </h4>
                  <p className="text-xs text-neon">{activeModalProject.company} · {activeModalProject.role}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveModalProject(null)}
                  className="rounded-lg border border-white/10 p-1.5 text-muted hover:bg-white/10 hover:text-white transition-colors"
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-white/10">
                <Image
                  src={activeModalProject.image}
                  alt={activeModalProject.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono text-xs text-muted">
                  Host: {domainMap[activeModalProject.id] || "cloud-telemetry.internal"}
                </span>
                <span className="font-mono text-xs text-emerald-300">
                  Status: {activeModalProject.statusBadge || "Verified Production Output"}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </DestinationSection>
  );
}
