"use client";

import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhone,
} from "react-icons/fa";
import { ArrowUp } from "lucide-react";
import {
  DestinationHeader,
  DestinationSection,
  HoloPanel,
} from "@/components/shared/HoloPanel";
import { ContactForm } from "@/features/contact/ContactForm";
import { personalInfo } from "@/lib/resume-data";
import { scrollToId } from "@/hooks/useLenis";

const contactItems = [
  {
    label: "Email",
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
    Icon: FaEnvelope,
  },
  {
    label: "Phone",
    value: personalInfo.phone,
    href: `tel:${personalInfo.phone.replace(/\s/g, "")}`,
    Icon: FaPhone,
  },
  {
    label: "LinkedIn",
    value: "joshua-tazeem",
    href: "https://linkedin.com/in/joshua-tazeem-4a147b239",
    Icon: FaLinkedin,
  },
  {
    label: "GitHub",
    value: "joshuatazeem2022skipq",
    href: "https://github.com/joshuatazeem2022skipq",
    Icon: FaGithub,
  },
  {
    label: "Location",
    value: personalInfo.location,
    href: "https://maps.google.com/?q=Faisalabad,Pakistan",
    Icon: FaMapMarkerAlt,
  },
];

export function ContactSection() {
  const year = new Date().getFullYear();

  return (
    <DestinationSection id="contact" side="center" className="min-h-[110vh] pb-28">
      <HoloPanel>
        <DestinationHeader
          index={6}
          label="Contact"
          title="Through the wormhole — let's talk"
          description="The journey ends where a new one begins. Reach out for platform architecture, full-stack delivery, or technical leadership."
        />

        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <ContactForm />

          <div className="space-y-2.5">
            {contactItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl border border-card-border bg-white/[0.03] p-3.5 transition-colors hover:border-accent/40"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-card-border bg-white/[0.04] text-accent">
                  <item.Icon className="h-4 w-4" aria-hidden />
                </span>
                <span>
                  <span className="block text-[0.65rem] uppercase tracking-wider text-muted">
                    {item.label}
                  </span>
                  <span className="text-sm text-foreground">{item.value}</span>
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-card-border pt-6">
          <p className="text-xs text-muted-foreground">
            © {year} {personalInfo.name} · Crafted among the stars
          </p>
          <button
            type="button"
            onClick={() => scrollToId("hero")}
            className="inline-flex cursor-pointer items-center gap-2 text-xs text-muted transition-colors hover:text-accent"
          >
            <ArrowUp className="h-4 w-4" aria-hidden />
            Return to launch
          </button>
        </div>
      </HoloPanel>
    </DestinationSection>
  );
}
