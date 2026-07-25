"use client";

import dynamic from "next/dynamic";

export const GalaxySceneLazy = dynamic(
  () => import("@/features/galaxy/GalaxyScene").then((m) => m.GalaxyScene),
  {
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_30%,rgba(168,85,247,0.14),transparent_60%)]" />
    ),
  }
);
