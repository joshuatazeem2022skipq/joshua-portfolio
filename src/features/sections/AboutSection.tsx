"use client";

import { motion } from "framer-motion";
import { GraduationCap, Cpu, Network, ShieldCheck, Users } from "lucide-react";
import {
  DestinationHeader,
  DestinationSection,
  HoloPanel,
} from "@/components/shared/HoloPanel";
import { education, personalInfo, stats } from "@/lib/resume-data";

const pillars = [
  {
    icon: Network,
    title: "Event-Driven Microservices",
    description:
      "Telemetry ingestion via OpenRemote, Redis pub/sub messaging, and independent write/read scaling with WebSockets.",
  },
  {
    icon: Cpu,
    title: "Practical AI & RAG Systems",
    description:
      "Enterprise chatbot integration with Retrieval-Augmented Generation for natural querying of domain knowledge.",
  },
  {
    icon: ShieldCheck,
    title: "High Availability & Scalability",
    description:
      "Docker blue-green containerization, automated health-check rollbacks, and upgraded production resilience.",
  },
  {
    icon: Users,
    title: "Leadership & Mentorship",
    description:
      "Guiding engineering teams through architecture reviews, Agile ceremonies, and high automated test coverage.",
  },
];

export function AboutSection() {
  const edu = education[0];

  return (
    <DestinationSection id="about" side="left" className="min-h-[115vh]">
      <HoloPanel>
        <DestinationHeader
          index={1}
          label="About"
          title="The architect behind the systems"
          description={personalInfo.summary}
        />

        {/* Dynamic Metric Grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 + i * 0.07 }}
              className="card-vibrant group rounded-xl p-4 text-center"
            >
              <p className="font-display text-2xl font-bold text-gradient-vibrant md:text-3xl">
                {stat.value}
                {stat.suffix}
              </p>
              <p className="mt-1 text-[0.7rem] uppercase tracking-wider text-muted group-hover:text-accent transition-colors">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Architecture Pillars Grid */}
        <div className="mt-8">
          <p className="text-xs uppercase tracking-[0.25em] text-accent">
            Core Architectural Focus
          </p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.05 }}
                className="rounded-xl border border-card-border bg-white/[0.02] p-3.5 transition-all hover:border-accent/30 hover:bg-white/[0.04]"
              >
                <div className="flex items-center gap-2.5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-accent/20 bg-accent/10 text-accent">
                    <pillar.icon className="h-4 w-4" />
                  </span>
                  <h4 className="font-display text-xs font-semibold text-foreground">
                    {pillar.title}
                  </h4>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-muted">
                  {pillar.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </HoloPanel>
    </DestinationSection>
  );
}
