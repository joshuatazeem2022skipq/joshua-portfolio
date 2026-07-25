"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function TypingEffect({
  phrases,
  className,
}: {
  phrases: string[];
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[index % phrases.length];
    const speed = deleting ? 35 : 70;

    if (!deleting && text === current) {
      const pause = setTimeout(() => setDeleting(true), 1600);
      return () => clearTimeout(pause);
    }

    if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => i + 1);
      return;
    }

    const tick = setTimeout(() => {
      setText((t) =>
        deleting ? current.slice(0, t.length - 1) : current.slice(0, t.length + 1)
      );
    }, speed);

    return () => clearTimeout(tick);
  }, [text, deleting, index, phrases]);

  return (
    <span className={cn("inline-flex items-center", className)} aria-live="polite">
      <span className="text-gradient">{text}</span>
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.7, repeat: Infinity }}
        className="ml-0.5 inline-block h-6 w-[2px] bg-neon md:h-8"
      />
    </span>
  );
}
