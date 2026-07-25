"use client";

import { Calendar, GraduationCap, MapPin } from "lucide-react";
import {
  DestinationHeader,
  DestinationSection,
  HoloPanel,
} from "@/components/shared/HoloPanel";
import { education } from "@/lib/resume-data";

export function EducationSection() {
  return (
    <DestinationSection id="education" side="left">
      <HoloPanel>
        <DestinationHeader
          index={5}
          label="Education"
          title="Academy records"
          description="The academic foundation behind the engineering."
        />
        {education.map((edu) => (
          <div
            key={edu.id}
            className="rounded-xl border border-card-border bg-white/[0.03] p-5"
          >
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-card-border bg-primary/15 text-accent">
                <GraduationCap className="h-6 w-6" aria-hidden />
              </span>
              <div>
                <h3 className="font-display text-lg font-semibold md:text-xl">
                  {edu.degree}
                </h3>
                <p className="mt-0.5 text-sm text-neon">({edu.field})</p>
                <p className="mt-2 text-sm text-muted">{edu.institution}</p>
                <div className="mt-3 flex flex-wrap gap-4 text-xs text-muted">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-accent" aria-hidden />
                    {edu.location}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-accent" aria-hidden />
                    {edu.period}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </HoloPanel>
    </DestinationSection>
  );
}
