"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface JoshuaLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  showText?: boolean;
  interactive?: boolean;
}

const sizeMap = {
  sm: { box: 32, ring: 30, stroke: 1.5, text: "text-xs" },
  md: { box: 44, ring: 42, stroke: 1.8, text: "text-sm" },
  lg: { box: 56, ring: 54, stroke: 2.0, text: "text-base" },
  xl: { box: 72, ring: 70, stroke: 2.2, text: "text-lg" },
};

/**
 * Animated High-Tech Joshua Tazeem Architectural Brand Logo
 * Features:
 * - Precision vector monogram interlocking 'J' and 'T'
 * - Counter-rotating orbital cyber rings with dash arrays
 * - Quantum energy node core with breathing glow
 * - State-of-the-art interactive hover acceleration & chromatic flare
 */
export function JoshuaLogo({
  size = "md",
  className,
  showText = false,
  interactive = true,
}: JoshuaLogoProps) {
  const s = sizeMap[size];

  return (
    <div
      className={cn(
        "group/logo relative inline-flex items-center gap-3 select-none",
        interactive && "cursor-pointer",
        className
      )}
    >
      {/* Ambient Pulsing Back-Glow */}
      <div
        className="pointer-events-none absolute -inset-2 rounded-full bg-gradient-to-r from-accent/20 via-neon/15 to-primary/20 blur-lg transition-all duration-500 group-hover/logo:opacity-100 group-hover/logo:blur-xl opacity-60"
        aria-hidden
      />

      {/* Emblem SVG Container */}
      <div
        className="relative flex items-center justify-center"
        style={{ width: s.box, height: s.box }}
      >
        <svg
          viewBox="0 0 100 100"
          className="h-full w-full overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Vibrant Cyber Gradients */}
            <linearGradient id="jtGlowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#818cf8" />
              <stop offset="100%" stopColor="#c084fc" />
            </linearGradient>

            <linearGradient id="jtMonogramGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="40%" stopColor="#e0f2fe" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>

            <linearGradient id="ringGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#e879f9" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0.8" />
            </linearGradient>

            {/* High-Tech Glow Filter */}
            <filter id="jtFilter" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Outer Segmented Orbital Ring (Clockwise Rotation) */}
          <motion.circle
            cx="50"
            cy="50"
            r="44"
            stroke="url(#ringGrad)"
            strokeWidth={s.stroke * 1.1}
            strokeDasharray="18 10 32 14"
            strokeLinecap="round"
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 18,
              ease: "linear",
            }}
            style={{ transformOrigin: "50px 50px" }}
          />

          {/* Inner Counter-Rotating Bracket Ring */}
          <motion.circle
            cx="50"
            cy="50"
            r="37"
            stroke="rgba(56, 189, 248, 0.35)"
            strokeWidth={s.stroke * 0.8}
            strokeDasharray="6 22"
            strokeLinecap="round"
            animate={{ rotate: -360 }}
            transition={{
              repeat: Infinity,
              duration: 12,
              ease: "linear",
            }}
            style={{ transformOrigin: "50px 50px" }}
          />

          {/* Corner Cyber Nodes */}
          {[0, 90, 180, 270].map((deg) => (
            <motion.circle
              key={deg}
              cx="50"
              cy="6"
              r="2.2"
              fill="#38bdf8"
              transform={`rotate(${deg} 50 50)`}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: deg / 90 * 0.6,
                ease: "easeInOut",
              }}
              filter="url(#jtFilter)"
            />
          ))}

          {/* Central Architectural Monogram: Interlocking 'J' and 'T' */}
          <g filter="url(#jtFilter)">
            {/* Top Crossbar of 'T' with cyber bevel cuts */}
            <path
              d="M 28 29 L 72 29 L 68 35 L 32 35 Z"
              fill="url(#jtMonogramGrad)"
            />

            {/* Stem of 'T' */}
            <path
              d="M 47 35 L 53 35 L 53 62 L 47 62 Z"
              fill="url(#jtMonogramGrad)"
            />

            {/* Hook and Stem of 'J' weaving seamlessly behind and through */}
            <path
              d="M 53 36 L 59 36 L 59 64 C 59 72 52 76 43 76 C 35 76 29 71 28 64 L 35 62 C 36 66 39 69 43 69 C 48 69 52 67 52 62 L 52 40 L 47 40 Z"
              fill="url(#jtGlowGrad)"
            />

            {/* Micro Quantum Core Accent Dot */}
            <motion.circle
              cx="50"
              cy="50"
              r="2"
              fill="#ffffff"
              animate={{ scale: [1, 1.4, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </g>
        </svg>
      </div>

      {/* Optional Accompanying Typography */}
      {showText && (
        <div className="flex flex-col text-left">
          <span className="font-display font-black tracking-wider uppercase text-foreground leading-none">
            Joshua <span className="text-gradient-vibrant">Tazeem</span>
          </span>
          <span className="font-mono text-[0.62rem] uppercase tracking-widest text-accent/80 mt-1 flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Software Architect
          </span>
        </div>
      )}
    </div>
  );
}
