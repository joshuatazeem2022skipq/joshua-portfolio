"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { JOURNEY_SECTIONS } from "@/features/galaxy/journey";
import { scrollToId } from "@/hooks/useLenis";
import { cn } from "@/lib/utils";

/** Fixed right-side HUD showing journey progress with clickable destinations. */
export function JourneyNav() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    JOURNEY_SECTIONS.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Journey destinations"
      className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
    >
      <ul className="flex flex-col items-end gap-3.5">
        {JOURNEY_SECTIONS.map((section) => {
          const isActive = active === section.id;
          return (
            <li key={section.id}>
              <button
                type="button"
                onClick={() => scrollToId(section.id)}
                aria-label={`Fly to ${section.label}`}
                aria-current={isActive ? "true" : undefined}
                className="group flex cursor-pointer items-center gap-2.5"
              >
                <span
                  className={cn(
                    "text-[0.6rem] uppercase tracking-[0.25em] transition-all duration-300",
                    isActive
                      ? "text-accent opacity-100"
                      : "text-muted opacity-0 group-hover:opacity-70"
                  )}
                >
                  {section.label}
                </span>
                <motion.span
                  animate={{
                    scale: isActive ? 1.4 : 1,
                    backgroundColor: isActive ? "#2dd4bf" : "#4c4470",
                  }}
                  transition={{ duration: 0.3 }}
                  className="block h-2 w-2 rounded-full shadow-[0_0_8px_rgba(45,212,191,0.6)]"
                />
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
