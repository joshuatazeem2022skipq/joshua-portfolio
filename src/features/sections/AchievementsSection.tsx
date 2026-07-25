"use client";

import { Award, ShieldCheck } from "lucide-react";
import {
  DestinationHeader,
  DestinationSection,
  HoloPanel,
} from "@/components/shared/HoloPanel";
import { achievements } from "@/lib/resume-data";

export function AchievementsSection() {
  return (
    <DestinationSection id="achievements" side="right">
      <HoloPanel>
        <DestinationHeader
          index={6}
          label="Achievements"
          title="The golden star"
          description="Recognition earned in production, exactly as documented on the resume."
        />
        {achievements.map((item) => (
          <div
            key={item.id}
            className="rounded-xl border border-gold/25 bg-gold/[0.06] p-5"
          >
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-gold/30 bg-gold/10 text-gold">
                <Award className="h-6 w-6" aria-hidden />
              </span>
              <div>
                <p className="flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.25em] text-gold">
                  <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
                  Key Achievement
                </p>
                <h3 className="mt-2 font-display text-lg font-semibold text-gradient-gold md:text-xl">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </HoloPanel>
    </DestinationSection>
  );
}
