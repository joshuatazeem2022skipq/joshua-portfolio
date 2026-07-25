"use client";

import { useMemo } from "react";
import * as THREE from "three";

/** Soft radial glow texture generated on the client — used by nebulae and halos. */
export function useGlowTexture(color: string) {
  return useMemo(() => {
    const size = 256;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const gradient = ctx.createRadialGradient(
      size / 2,
      size / 2,
      0,
      size / 2,
      size / 2,
      size / 2
    );
    gradient.addColorStop(0, color);
    gradient.addColorStop(0.4, color.replace(/[\d.]+\)$/, "0.25)"));
    gradient.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, [color]);
}
