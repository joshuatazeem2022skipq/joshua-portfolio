"use client";

import { Download, ExternalLink, FileText, Printer } from "lucide-react";
import {
  DestinationHeader,
  DestinationSection,
  HoloPanel,
} from "@/components/shared/HoloPanel";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/constants";
import { experiences, personalInfo, skills } from "@/lib/resume-data";

export function ResumeSection() {
  return (
    <DestinationSection id="resume" side="left">
      <HoloPanel>
        <DestinationHeader
          index={7}
          label="Resume"
          title="The flight manifest"
          description="The complete record — view it, download it, or print it."
        />

        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <a href={siteConfig.resumePath} download>
              <Download className="h-4 w-4" />
              Download
            </a>
          </Button>
          <Button asChild variant="secondary">
            <a
              href={siteConfig.resumePath}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="h-4 w-4" />
              View PDF
            </a>
          </Button>
          <Button asChild variant="outline">
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

        <div className="mt-6 rounded-xl border border-card-border bg-white/[0.03] p-5">
          <div className="flex items-center gap-2 text-accent">
            <FileText className="h-4 w-4" aria-hidden />
            <p className="text-xs uppercase tracking-[0.2em]">Quick summary</p>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            {personalInfo.summary}
          </p>
          <p className="mt-4 text-xs uppercase tracking-wider text-accent">
            Experience
          </p>
          <ul className="mt-2 space-y-1 text-sm text-muted">
            {experiences.map((e) => (
              <li key={e.id}>
                {e.company} — {e.role} ({e.period})
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs uppercase tracking-wider text-accent">
            Top skills
          </p>
          <p className="mt-2 text-sm text-muted">
            {skills
              .slice()
              .sort((a, b) => b.level - a.level)
              .slice(0, 10)
              .map((s) => s.name)
              .join(" · ")}
          </p>
        </div>
      </HoloPanel>
    </DestinationSection>
  );
}
