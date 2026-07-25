"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { JOURNEY_SECTIONS } from "@/features/galaxy/journey";
import { siteConfig } from "@/lib/constants";
import { scrollToId } from "@/hooks/useLenis";
import { cn } from "@/lib/utils";

/** Subtle offsets — kept small so a compact dock stays readable. */
const LINK_OFFSETS = [
  "translate-y-0",
  "translate-y-0.5",
  "-translate-y-0.5",
  "translate-y-1",
  "-translate-y-0.5",
  "translate-y-0.5",
  "-translate-y-1",
  "translate-y-0",
  "-translate-y-0.5",
];

/**
 * Compact bottom dock — rocky terrain feathered into the galaxy theme,
 * with clear JT / nav / Resume labels.
 */
export function Navbar() {
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
    <motion.header
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.75, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 bottom-0 z-40"
    >
      <nav
        aria-label="Main navigation"
        className="relative h-14 w-full overflow-hidden md:h-16"
      >
        {/* Terrain */}
        <div
          aria-hidden
          className="nav-terrain pointer-events-none absolute inset-x-0 bottom-0 h-[140%]"
        >
          <Image
            src="/images/nav-ground.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_45%] select-none"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(168,85,247,0.2)_0%,rgba(45,212,191,0.06)_50%,rgba(5,2,19,0.4)_100%)] mix-blend-color" />
        </div>

        {/* Soft top fade into galaxy */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-[#050213] via-[#050213]/55 to-transparent"
        />
        {/* Darken mid band so white labels stay crisp */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-black/25"
        />

        {/* Content — vertically centered in the compact bar */}
        <div className="section-pad relative z-10 flex h-full items-center">
          <div className="container-wide mx-auto flex w-full items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => scrollToId("hero")}
              aria-label="Return to launch"
              className="hidden shrink-0 cursor-pointer bg-transparent font-display text-base font-bold tracking-tight md:block md:text-lg"
              style={{
                background:
                  "linear-gradient(135deg, #f5d0fe 0%, #e879f9 40%, #2dd4bf 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 1px 4px rgba(0,0,0,0.95))",
              }}
            >
              JT
            </button>

            <ul className="scrollbar-none mx-auto flex max-w-full items-center justify-start gap-0.5 overflow-x-auto bg-transparent md:justify-center md:gap-1.5 lg:gap-2.5">
              {JOURNEY_SECTIONS.map((link, i) => {
                const isActive = active === link.id;
                return (
                  <li
                    key={link.id}
                    className={cn(
                      "shrink-0",
                      LINK_OFFSETS[i % LINK_OFFSETS.length]
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => scrollToId(link.id)}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "relative cursor-pointer whitespace-nowrap bg-transparent px-1.5 py-1 font-display text-[0.68rem] font-semibold tracking-[0.04em] transition-all duration-300 md:px-2 md:text-[0.8rem]",
                        isActive
                          ? "text-accent"
                          : "text-white hover:text-accent"
                      )}
                      style={{
                        textShadow: isActive
                          ? "0 0 14px rgba(45,212,191,1), 0 1px 4px rgba(0,0,0,1)"
                          : "0 1px 4px rgba(0,0,0,1), 0 0 10px rgba(0,0,0,0.9)",
                      }}
                    >
                      {link.id === "hero" ? "Home" : link.label}
                      {isActive && (
                        <motion.span
                          layoutId="moon-nav-underline"
                          className="absolute inset-x-1 -bottom-0.5 h-0.5 rounded-full bg-accent shadow-[0_0_10px_rgba(45,212,191,1)]"
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 32,
                          }}
                          aria-hidden
                        />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>

            <a
              href={siteConfig.resumePath}
              download
              className="hidden shrink-0 cursor-pointer items-center gap-1.5 bg-transparent font-display text-xs font-semibold text-white transition-colors hover:text-accent md:inline-flex"
              style={{
                textShadow:
                  "0 1px 4px rgba(0,0,0,1), 0 0 10px rgba(0,0,0,0.9)",
              }}
            >
              <Download className="h-3.5 w-3.5" aria-hidden />
              Resume
            </a>
          </div>
        </div>
      </nav>
    </motion.header>
  );
}
