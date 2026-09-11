"use client";

import { motion } from "framer-motion";
import { ChevronDown, Download, Rocket } from "lucide-react";
import { personalInfo, typingPhrases } from "@/lib/resume-data";
import { siteConfig } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { TypingEffect } from "@/components/shared/TypingEffect";
import { WordReveal } from "@/components/ui/word-reveal";
import { JoshuaLogo } from "@/components/brand/JoshuaLogo";
import { scrollToId } from "@/hooks/useLenis";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="section-pad relative flex min-h-screen flex-col items-center justify-center text-center"
    >
      {/* Readability scrim between the galaxy and the hero copy */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_62%_55%_at_50%_46%,rgba(5,2,19,0.82),rgba(5,2,19,0.35)_60%,transparent_100%)]"
      />

      {/* Live availability indicator */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="relative mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3.5 py-1 text-xs font-medium text-emerald-300 shadow-[0_0_20px_-4px_rgba(16,185,129,0.3)] backdrop-blur-md"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        <span>Open to Software Architect & Platform Engineering Roles</span>
      </motion.div>

      {/* Animated Joshua Logo Brand Emblem */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.08, duration: 0.6 }}
        className="relative my-2 flex items-center justify-center"
      >
        <JoshuaLogo size="lg" />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12 }}
        className="destination-tag relative"
      >
        Mission Control · {personalInfo.location}
      </motion.p>

      <h1 className="relative mt-6 font-display text-5xl font-semibold leading-[1.02] tracking-tight text-foreground md:text-8xl">
        <WordReveal
          text={personalInfo.firstName}
          delay={0.2}
          animateOnView={false}
        />{" "}
        <WordReveal
          text={personalInfo.lastName}
          delay={0.35}
          animateOnView={false}
          wordClassName="text-gradient-vibrant"
        />
      </h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.32 }}
        className="relative mt-5 max-w-3xl text-lg font-medium text-foreground/90 md:text-2xl"
      >
        {personalInfo.title}
      </motion.p>

      {/* Core focus capability pills */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.36 }}
        className="relative mt-4 flex flex-wrap justify-center gap-2"
      >
        {["✦ SaaS & Platform Architecture", "✦ Event-Driven Microservices", "✦ Practical AI & RAG Integration"].map(
          (tag) => (
            <span
              key={tag}
              className="rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-[0.7rem] font-medium tracking-wide text-accent backdrop-blur-sm"
            >
              {tag}
            </span>
          )
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="relative mt-5 min-h-[2.25rem] font-display text-xl md:text-2xl"
      >
        <TypingEffect phrases={typingPhrases} />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.48 }}
        className="relative mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-muted md:text-base"
      >
        Welcome aboard. Fly through the flight record of architecting event-driven microservices,
        real-time telemetry systems, and practical AI/LLM platforms engineered for continuous scalability,
        robust optimization, and upgraded production reliability.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.56 }}
        className="relative mt-9 flex flex-wrap justify-center gap-3"
      >
        <Button size="lg" onClick={() => scrollToId("about")} className="glow-neon">
          <Rocket className="h-4 w-4" />
          Begin Journey
        </Button>
        <Button asChild size="lg" variant="secondary">
          <a href={siteConfig.resumePath} download>
            <Download className="h-4 w-4" />
            Download Resume
          </a>
        </Button>
      </motion.div>

      {/* Scroll indicator positioned safely in flow below buttons */}
      <motion.button
        type="button"
        onClick={() => scrollToId("about")}
        aria-label="Scroll to next destination"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="relative mt-12 cursor-pointer text-muted transition-colors hover:text-accent focus:outline-none"
      >
        <motion.span
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1.5"
        >
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.3em] text-accent/85">
            Scroll to explore
          </span>
          <ChevronDown className="h-4 w-4 text-accent" />
        </motion.span>
      </motion.button>
    </section>
  );
}

const JOURNEY_LENGTH = 6;
