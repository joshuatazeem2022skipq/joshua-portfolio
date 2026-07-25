"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { personalInfo } from "@/lib/resume-data";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const subject = String(data.get("subject") || "");
    const message = String(data.get("message") || "");
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    );
    window.location.href = `mailto:${personalInfo.email}?subject=${encodeURIComponent(subject)}&body=${body}`;
    setStatus("sent");
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm text-muted">
            Name
          </label>
          <Input id="name" name="name" required placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm text-muted">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
          />
        </div>
      </div>
      <div>
        <label htmlFor="subject" className="mb-2 block text-sm text-muted">
          Subject
        </label>
        <Input id="subject" name="subject" required placeholder="How can I help?" />
      </div>
      <div>
        <label htmlFor="message" className="mb-2 block text-sm text-muted">
          Message
        </label>
        <Textarea
          id="message"
          name="message"
          required
          placeholder="Tell me about your project or opportunity…"
        />
      </div>
      <Button type="submit" size="lg" className="w-full md:w-auto">
        <Send className="h-4 w-4" />
        {status === "sent" ? "Opening email…" : "Send Message"}
      </Button>
      <p className="text-xs text-muted-foreground">
        Opens your email client to reach {personalInfo.email}
      </p>
    </form>
  );
}
