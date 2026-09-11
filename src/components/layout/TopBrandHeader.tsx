"use client";

import { motion } from "framer-motion";
import { JoshuaLogo } from "@/components/brand/JoshuaLogo";
import { scrollToId } from "@/hooks/useLenis";

/**
 * Top-left floating architectural emblem badge.
 * Provides instant brand identity with animated vector logo and quick jump to Hero.
 */
export function TopBrandHeader() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="fixed left-4 top-4 z-40 md:left-6 md:top-6"
    >
      <button
        type="button"
        onClick={() => scrollToId("hero")}
        aria-label="Mission Launch / Joshua Tazeem Portfolio"
        className="group flex items-center gap-3 rounded-full border border-white/10 bg-zinc-950/75 py-1.5 pl-2 pr-4 shadow-[0_0_30px_rgba(0,0,0,0.8),0_0_15px_rgba(56,189,248,0.12)] backdrop-blur-2xl transition-all duration-300 hover:border-accent/40 hover:bg-zinc-900/85 hover:shadow-[0_0_25px_rgba(56,189,248,0.25)]"
      >
        {/* Animated Joshua Vector Emblem */}
        <JoshuaLogo size="sm" interactive={false} />

        {/* Brand Text & Live Telemetry Status */}
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5">
            <span className="font-display text-xs font-bold tracking-tight text-foreground group-hover:text-gradient-vibrant transition-colors">
              Joshua Tazeem
            </span>
            <span className="text-[0.6rem] text-accent/60 font-mono">·</span>
            <span className="font-mono text-[0.6rem] tracking-wider text-muted group-hover:text-accent transition-colors hidden sm:inline">
              ARCHITECT
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[0.58rem] font-mono text-emerald-400/90">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            <span>SYSTEMS ONLINE</span>
          </div>
        </div>
      </button>
    </motion.header>
  );
}
