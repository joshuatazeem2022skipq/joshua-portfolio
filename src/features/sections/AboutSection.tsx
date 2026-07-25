"use client";

import { motion } from "framer-motion";
import {
  DestinationHeader,
  DestinationSection,
  HoloPanel,
} from "@/components/shared/HoloPanel";
import { personalInfo, stats } from "@/lib/resume-data";

export function AboutSection() {
  return (
    <DestinationSection id="about" side="left">
      <HoloPanel>
        <DestinationHeader
          index={1}
          label="About"
          title="The architect behind the systems"
          description={personalInfo.summary}
        />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 + i * 0.07 }}
              className="rounded-xl border border-card-border bg-white/[0.03] p-4 text-center"
            >
              <p className="font-display text-2xl font-semibold text-gradient md:text-3xl">
                {stat.value}
                {stat.suffix}
              </p>
              <p className="mt-1 text-xs text-muted">{stat.label}</p>
            </motion.div>
          ))}
        </div>
        <p className="mt-6 text-sm leading-relaxed text-muted">
          Based in {personalInfo.location}, my work spans platform engineering,
          full-stack architecture, technical leadership, and frontend
          application development — with DevOps best practices woven through
          everything.
        </p>
      </HoloPanel>
    </DestinationSection>
  );
}
