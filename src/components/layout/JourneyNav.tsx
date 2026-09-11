"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Rocket } from "lucide-react";
import { JOURNEY_SECTIONS } from "@/features/galaxy/journey";
import { siteConfig } from "@/lib/constants";
import { scrollToId } from "@/hooks/useLenis";
import { JoshuaLogo } from "@/components/brand/JoshuaLogo";
import { cn } from "@/lib/utils";

/**
 * Floating Lateral Orbital Cyber-Dock
 * Clean, modern navigation placed on the side, freeing top and bottom viewports.
 */
export function JourneyNav() {
  const [active, setActive] = useState("hero");
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const allIds = ["hero", "about", "skills", "experience", "projects", "resume", "contact"];

    const updateActive = () => {
      const vh = window.innerHeight;
      let maxVisibleHeight = -1;
      let dominantId = "hero";

      for (const id of allIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const visibleTop = Math.max(0, rect.top);
        const visibleBottom = Math.min(vh, rect.bottom);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);

        if (visibleHeight > maxVisibleHeight) {
          maxVisibleHeight = visibleHeight;
          dominantId = id;
        }
      }

      setActive((prev) => (prev !== dominantId ? dominantId : prev));
    };

    updateActive();

    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive, { passive: true });
    const timer = setInterval(updateActive, 60);

    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
      clearInterval(timer);
    };
  }, []);

  return (
    <nav
      aria-label="Orbital Navigation Dock"
      className="fixed right-3.5 top-1/2 z-40 -translate-y-1/2 md:right-6"
    >
      <div className="relative flex flex-col items-center gap-3.5 rounded-full border border-white/15 bg-zinc-950/80 p-2 shadow-[0_0_35px_rgba(0,0,0,0.85),0_0_20px_rgba(56,189,248,0.18)] backdrop-blur-2xl">
        {/* Top Animated Joshua Logo Emblem */}
        <button
          type="button"
          onClick={() => scrollToId("hero")}
          aria-label="Mission Launch / Home"
          onMouseEnter={() => setHovered("hero-top")}
          onMouseLeave={() => setHovered(null)}
          className="group relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-full transition-transform duration-300 hover:scale-110"
        >
          <JoshuaLogo size="sm" interactive={false} />

          {/* Tooltip */}
          <AnimatePresence>
            {hovered === "hero-top" && (
              <motion.div
                initial={{ opacity: 0, x: 8, scale: 0.92 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 8, scale: 0.92 }}
                transition={{ duration: 0.15 }}
                className="pointer-events-none absolute right-12 flex whitespace-nowrap rounded-xl border border-accent/40 bg-zinc-950/95 px-3 py-1.5 font-mono text-[0.68rem] text-accent shadow-[0_0_20px_rgba(0,0,0,0.9)] backdrop-blur-2xl"
              >
                ✦ Mission Control · Joshua Tazeem
              </motion.div>
            )}
          </AnimatePresence>
        </button>

        <div className="h-px w-5 bg-white/10" aria-hidden />

        {/* Waypoints track with connecting line */}
        <div className="relative flex flex-col items-center gap-3.5 py-1">
          <div
            className="pointer-events-none absolute top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-accent/30 to-transparent"
            aria-hidden
          />

          {JOURNEY_SECTIONS.map((section, idx) => {
            const isActive = active === section.id;
            const isHovered = hovered === section.id;

            return (
              <div key={section.id} className="relative flex items-center">
                {/* Holographic Tooltip */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, x: 8, scale: 0.92 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: 8, scale: 0.92 }}
                      transition={{ duration: 0.15 }}
                      className="pointer-events-none absolute right-11 flex flex-col items-end whitespace-nowrap rounded-xl border border-accent/40 bg-zinc-950/95 px-3 py-2 shadow-[0_0_25px_rgba(0,0,0,0.9),0_0_15px_rgba(56,189,248,0.25)] backdrop-blur-2xl z-50"
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-[0.62rem] text-accent font-semibold">
                          [{String(idx).padStart(2, "0")}]
                        </span>
                        <span className="font-display text-xs font-bold text-foreground">
                          {section.label}
                        </span>
                      </div>
                      <span className="font-mono text-[0.62rem] text-muted mt-0.5">
                        Target: <strong className="text-white font-semibold">{section.planetName}</strong> · {section.planetDistance}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Modern Architectural Tab Waypoint Button */}
                <button
                  type="button"
                  onClick={() => scrollToId(section.id)}
                  aria-label={`Travel to ${section.label} (${section.planetName})`}
                  aria-current={isActive ? "true" : undefined}
                  onMouseEnter={() => setHovered(section.id)}
                  onMouseLeave={() => setHovered(null)}
                  className="group relative flex h-7 w-7 cursor-pointer items-center justify-center rounded-full transition-all duration-300"
                >
                  {/* Animated Active Outer Halo Ring */}
                  {isActive && (
                    <motion.span
                      layoutId="active-nav-halo"
                      className="absolute inset-0 rounded-full border border-accent/80 bg-accent/15 shadow-[0_0_16px_rgba(56,189,248,0.8)]"
                      transition={{ type: "spring", stiffness: 380, damping: 28 }}
                    />
                  )}

                  {/* Inner Node Pill */}
                  <span
                    className={cn(
                      "flex items-center justify-center rounded-full font-mono text-[0.55rem] transition-all duration-300",
                      isActive
                        ? "h-4 w-4 bg-accent font-bold text-black shadow-[0_0_10px_rgba(56,189,248,1)]"
                        : "h-2 w-2 bg-white/35 group-hover:h-3.5 group-hover:w-3.5 group-hover:bg-accent/80 group-hover:text-black group-hover:shadow-[0_0_8px_rgba(56,189,248,0.6)]"
                    )}
                  >
                    {isActive && String(idx)}
                  </span>
                </button>
              </div>
            );
          })}
        </div>

        <div className="h-px w-5 bg-white/10" aria-hidden />

        {/* Quick Resume Download Action */}
        <div className="relative flex items-center">
          <AnimatePresence>
            {hovered === "resume-btn" && (
              <motion.div
                initial={{ opacity: 0, x: 8, scale: 0.92 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 8, scale: 0.92 }}
                transition={{ duration: 0.15 }}
                className="pointer-events-none absolute right-11 whitespace-nowrap rounded-lg border border-emerald-500/40 bg-zinc-950/90 px-3 py-1.5 font-mono text-[0.68rem] text-emerald-300 shadow-[0_0_20px_rgba(0,0,0,0.9)] backdrop-blur-xl"
              >
                Download Resume (PDF)
              </motion.div>
            )}
          </AnimatePresence>

          <a
            href={siteConfig.resumePath}
            download
            aria-label="Download Official Resume PDF"
            onMouseEnter={() => setHovered("resume-btn")}
            onMouseLeave={() => setHovered(null)}
            className="group flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-950/30 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.2)] transition-all duration-300 hover:scale-110 hover:border-emerald-400 hover:bg-emerald-900/50"
          >
            <Download className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Return to Launch Action */}
        <div className="relative flex items-center">
          <AnimatePresence>
            {hovered === "launch-btn" && (
              <motion.div
                initial={{ opacity: 0, x: 8, scale: 0.92 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 8, scale: 0.92 }}
                transition={{ duration: 0.15 }}
                className="pointer-events-none absolute right-11 whitespace-nowrap rounded-lg border border-white/20 bg-zinc-950/90 px-3 py-1.5 font-mono text-[0.68rem] text-muted shadow-[0_0_20px_rgba(0,0,0,0.9)] backdrop-blur-xl"
              >
                Return to Launch Orbit
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="button"
            onClick={() => scrollToId("hero")}
            aria-label="Return to Launch Orbit"
            onMouseEnter={() => setHovered("launch-btn")}
            onMouseLeave={() => setHovered(null)}
            className="group flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-muted transition-all duration-300 hover:scale-110 hover:border-accent/40 hover:text-accent"
          >
            <Rocket className="h-3 w-3" />
          </button>
        </div>
      </div>
    </nav>
  );
}
