"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BackdropData {
  id: string;
  planetName: string;
  tagline: string;
  subtext: string;
  side: "left" | "right" | "center";
}

const BACKDROP_INFO: Record<string, BackdropData> = {
  about: {
    id: "about",
    planetName: "SATURN",
    tagline: "THE ARCHITECT",
    subtext: "9.5 AU · EVENT-DRIVEN MICROSERVICES & SYSTEM DESIGN",
    side: "right",
  },
  skills: {
    id: "skills",
    planetName: "JUPITER",
    tagline: "TECH CONSTELLATION",
    subtext: "5.2 AU · 30+ PRODUCTION SKILLS & DISTRIBUTED SYSTEMS",
    side: "left",
  },
  experience: {
    id: "experience",
    planetName: "NEPTUNE",
    tagline: "MISSION LOG",
    subtext: "30.1 AU · 4 PRODUCTION ROLES & SLA RELIABILITY",
    side: "right",
  },
  projects: {
    id: "projects",
    planetName: "MARS",
    tagline: "JOSHUA'S PROJECTS",
    subtext: "1.5 AU · TELEMETRY, RAG AI, AND MICROSERVICES ARCHITECTURE",
    side: "left",
  },
  resume: {
    id: "resume",
    planetName: "URANUS",
    tagline: "FLIGHT MANIFEST",
    subtext: "19.2 AU · VERIFIED CREDENTIALS & DEPLOYMENT LOG",
    side: "right",
  },
  contact: {
    id: "contact",
    planetName: "EARTH",
    tagline: "TERMINAL ORBIT",
    subtext: "1.0 AU · RETURN TO BASE & COLLABORATION",
    side: "center",
  },
};

const CHAPTER_SECTIONS = [
  { id: "hero", planet: null },
  { id: "about", planet: "about" },
  { id: "skills", planet: "skills" },
  { id: "experience", planet: "experience" },
  { id: "projects", planet: "projects" },
  { id: "resume", planet: "resume" },
  { id: "contact", planet: "contact" },
];

/**
 * Massive cinematic backdrop typography that appears behind each 3D planet.
 * - Strictly hidden on Hero (focused on Sol / The Sun).
 * - Dynamically tracks which section physically dominates the viewport.
 * - Instantly transitions between planets as you scroll (Jupiter -> Neptune -> Mars, etc.).
 */
export function PlanetBackdropWatermark() {
  const [activePlanet, setActivePlanet] = useState<string | null>(null);

  useEffect(() => {
    const evaluateDominantPlanet = () => {
      const vh = window.innerHeight;
      let maxVisibleHeight = -1;
      let winningPlanet: string | null = null;

      for (const section of CHAPTER_SECTIONS) {
        const el = document.getElementById(section.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();

        // Calculate exact visible pixels of this section on the screen
        const visibleTop = Math.max(0, rect.top);
        const visibleBottom = Math.min(vh, rect.bottom);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);

        if (visibleHeight > maxVisibleHeight) {
          maxVisibleHeight = visibleHeight;
          winningPlanet = section.planet;
        }
      }

      setActivePlanet((prev) => (prev !== winningPlanet ? winningPlanet : prev));
    };

    evaluateDominantPlanet();

    window.addEventListener("scroll", evaluateDominantPlanet, { passive: true });
    window.addEventListener("resize", evaluateDominantPlanet, { passive: true });

    // 60ms polling ensures smooth updates during Lenis inertia scrolling
    const timer = setInterval(evaluateDominantPlanet, 60);

    return () => {
      window.removeEventListener("scroll", evaluateDominantPlanet);
      window.removeEventListener("resize", evaluateDominantPlanet);
      clearInterval(timer);
    };
  }, []);

  const info = activePlanet ? BACKDROP_INFO[activePlanet] : null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
    >
      <AnimatePresence>
        {info && (
          <motion.div
            key={info.id}
            initial={{ opacity: 0, y: 25, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.96 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className={`absolute top-1/2 -translate-y-1/2 flex flex-col ${
              info.side === "left"
                ? "left-6 md:left-24 items-start text-left"
                : info.side === "right"
                ? "right-6 md:right-28 items-end text-right"
                : "left-1/2 -translate-x-1/2 items-center text-center"
            }`}
          >
            {/* Massive Planetary Outline Text */}
            <span
              className="font-display font-black leading-none tracking-tighter text-transparent"
              style={{
                fontSize: "clamp(4.5rem, 14vw, 13rem)",
                WebkitTextStroke: "1.5px rgba(56, 189, 248, 0.28)",
                textShadow: "0 0 60px rgba(56, 189, 248, 0.25)",
                filter: "drop-shadow(0 0 40px rgba(37, 99, 235, 0.3))",
              }}
            >
              {info.planetName}
            </span>

            {/* Glowing Secondary Mission Tagline */}
            <div
              className={`-mt-4 md:-mt-8 flex flex-col ${
                info.side === "right"
                  ? "items-end"
                  : info.side === "center"
                  ? "items-center"
                  : "items-start"
              }`}
            >
              <span
                className="font-display text-xl md:text-4xl font-extrabold uppercase tracking-widest text-gradient-vibrant"
                style={{
                  filter: "drop-shadow(0 0 25px rgba(56,189,248,0.6))",
                }}
              >
                ✦ {info.tagline} ✦
              </span>

              {/* Orbital Telemetry readout */}
              <span className="mt-2 font-mono text-[0.65rem] md:text-xs tracking-widest text-accent/80 uppercase">
                {info.subtext}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
