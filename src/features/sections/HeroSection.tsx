"use client";

import { motion } from "framer-motion";
import { ChevronDown, Download, Rocket } from "lucide-react";
import { personalInfo, typingPhrases } from "@/lib/resume-data";
import { siteConfig } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { TypingEffect } from "@/components/shared/TypingEffect";
import { WordReveal } from "@/components/ui/word-reveal";
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

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
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
          wordClassName="text-gradient"
        />
      </h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.32 }}
        className="relative mt-5 text-lg text-foreground/85 md:text-2xl"
      >
        {personalInfo.title}
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="relative mt-4 min-h-[2.25rem] font-display text-xl md:text-2xl"
      >
        <TypingEffect phrases={typingPhrases} />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.48 }}
        className="relative mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-muted md:text-base"
      >
        Welcome aboard. Scroll to fly through {JOURNEY_LENGTH} destinations —
        each one a chapter of {personalInfo.yearsOfExperience}+ years building
        event-driven systems that stay fast and stay up.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.56 }}
        className="relative mt-9 flex flex-wrap justify-center gap-3"
      >
        <Button size="lg" onClick={() => scrollToId("about")}>
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

      <motion.button
        type="button"
        onClick={() => scrollToId("about")}
        aria-label="Scroll to next destination"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-20 left-1/2 -translate-x-1/2 cursor-pointer text-muted transition-colors hover:text-accent md:bottom-24"
      >
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1"
        >
          <span className="text-[0.6rem] uppercase tracking-[0.3em]">
            Scroll to explore
          </span>
          <ChevronDown className="h-5 w-5" />
        </motion.span>
      </motion.button>
    </section>
  );
}

const JOURNEY_LENGTH = 6;
