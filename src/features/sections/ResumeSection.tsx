"use client";

import { Download, ExternalLink, FileText, GraduationCap, Printer } from "lucide-react";
import {
  DestinationHeader,
  DestinationSection,
  HoloPanel,
} from "@/components/shared/HoloPanel";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/constants";
import { education, experiences, personalInfo, skillCategories, skills } from "@/lib/resume-data";

export function ResumeSection() {
  const edu = education[0];

  return (
    <DestinationSection id="resume" side="left" className="min-h-[110vh]">
      <HoloPanel>
        <DestinationHeader
          index={5}
          label="Resume"
          title="Verified flight manifest"
          description="Access the official resume in print, PDF view, or download formats."
        />

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg" className="glow-cyan">
            <a href={siteConfig.resumePath} download>
              <Download className="h-4 w-4" />
              Download Resume
            </a>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <a
              href={siteConfig.resumePath}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="h-4 w-4" />
              View PDF
            </a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a
              href={siteConfig.resumePath}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Printer className="h-4 w-4" />
              Print
            </a>
          </Button>
        </div>

        {/* Manifest Overview Card */}
        <div className="card-vibrant mt-8 rounded-2xl p-6">
          <div className="flex items-center gap-2 text-accent">
            <FileText className="h-4 w-4" aria-hidden />
            <p className="text-xs uppercase tracking-[0.2em] font-semibold">Executive Summary</p>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted/90">
            {personalInfo.summary}
          </p>

          {/* Education Milestone */}
          {edu && (
            <div className="mt-5 border-t border-white/[0.06] pt-4">
              <div className="flex items-center gap-2 text-accent">
                <GraduationCap className="h-4 w-4" aria-hidden />
                <p className="text-xs uppercase tracking-wider font-semibold">Education</p>
              </div>
              <p className="mt-1 text-sm font-medium text-foreground">
                {edu.institution}
              </p>
              <p className="text-xs text-muted">
                {edu.degree} ({edu.field}) · {edu.period} · {edu.location}
              </p>
            </div>
          )}

          {/* Experience Timeline Summary */}
          <div className="mt-5 border-t border-white/[0.06] pt-4">
            <p className="text-xs uppercase tracking-wider text-accent font-semibold">
              Deployment Log
            </p>
            <ul className="mt-2 space-y-2">
              {experiences.map((e) => (
                <li
                  key={e.id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs"
                >
                  <span className="font-semibold text-foreground">
                    {e.company} <span className="font-normal text-muted">— {e.role}</span>
                  </span>
                  <span className="font-mono text-muted/80">{e.period}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Core Categories Preview */}
          <div className="mt-5 border-t border-white/[0.06] pt-4">
            <p className="text-xs uppercase tracking-wider text-accent font-semibold">
              Skill Categories ({skills.length} Skills)
            </p>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {skillCategories.map((cat) => (
                <span
                  key={cat}
                  className="rounded-md border border-accent/20 bg-accent/10 px-2 py-1 text-[0.65rem] font-medium text-accent"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </div>
      </HoloPanel>
    </DestinationSection>
  );
}
