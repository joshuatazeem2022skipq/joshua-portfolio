"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { planetPosition } from "./journey";

/* ------------------------------------------------------------------ */
/* Helpers                                                              */
/* ------------------------------------------------------------------ */

/** Hook to cull planets when camera is far away — prevents bleeding into previous/next sections */
function usePlanetVisibility(pos: THREE.Vector3, maxDist = 18.5) {
  const { camera } = useThree();
  const group = useRef<THREE.Group>(null);

  useFrame(() => {
    if (group.current) {
      const dist = camera.position.distanceTo(pos);
      group.current.visible = dist < maxDist;
    }
  });

  return group;
}

/** Ring geometry with radial UVs so a ring strip texture maps correctly. */
function useRingGeometry(inner: number, outer: number) {
  return useMemo(() => {
    const geometry = new THREE.RingGeometry(inner, outer, 128);
    const pos = geometry.attributes.position;
    const uv = geometry.attributes.uv;
    const v = new THREE.Vector3();
    const mid = (inner + outer) / 2;
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos as THREE.BufferAttribute, i);
      uv.setXY(i, v.length() < mid ? 0 : 1, 1);
    }
    return geometry;
  }, [inner, outer]);
}

/** Soft fresnel-style atmosphere shell. */
function Atmosphere({
  radius,
  color,
  opacity = 0.12,
}: {
  radius: number;
  color: string;
  opacity?: number;
}) {
  return (
    <mesh scale={1.05}>
      <sphereGeometry args={[radius, 48, 48]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={opacity}
        side={THREE.BackSide}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

/** Key light that makes each planet readable against deep space. */
function PlanetLight({ color = "#fff7ed" }: { color?: string }) {
  return (
    <>
      <pointLight position={[6, 3, 8]} intensity={140} distance={45} color={color} />
      <pointLight position={[-5, -2, -4]} intensity={22} distance={30} color="#7c3aed" />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* About — Saturn with clean natural ring system                        */
/* ------------------------------------------------------------------ */
export function SaturnPlanet({ index }: { index: number }) {
  const pos = useMemo(() => planetPosition(index), [index]);
  const group = usePlanetVisibility(pos, 18.5);
  const [map, ringMap] = useTexture([
    "/textures/2k_saturn.jpg",
    "/textures/2k_saturn_ring_alpha.png",
  ]);
  const planet = useRef<THREE.Mesh>(null);
  const ringGeometry = useRingGeometry(2.7, 4.6);

  useFrame(({ clock }) => {
    if (planet.current) planet.current.rotation.y = clock.elapsedTime * 0.05;
  });

  return (
    <group ref={group} position={pos} rotation={[0.12, 0, -0.18]}>
      <mesh ref={planet}>
        <sphereGeometry args={[2.1, 64, 64]} />
        <meshStandardMaterial map={map} roughness={0.9} metalness={0} />
      </mesh>
      <Atmosphere radius={2.1} color="#fcd9a8" opacity={0.08} />
      <mesh rotation={[-Math.PI / 2.15, 0, 0]} geometry={ringGeometry}>
        <meshStandardMaterial
          map={ringMap}
          transparent
          side={THREE.DoubleSide}
          roughness={0.9}
          depthWrite={false}
        />
      </mesh>
      <PlanetLight />
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Skills — Jupiter (Pristine gas giant, no artificial clutter)        */
/* ------------------------------------------------------------------ */
export function JupiterPlanet({ index }: { index: number }) {
  const pos = useMemo(() => planetPosition(index), [index]);
  const group = usePlanetVisibility(pos, 18.5);
  const map = useTexture("/textures/2k_jupiter.jpg");
  const planet = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (planet.current) planet.current.rotation.y = clock.elapsedTime * 0.06;
  });

  return (
    <group ref={group} position={pos}>
      <mesh ref={planet} rotation={[0.05, 0, 0.08]}>
        <sphereGeometry args={[2.2, 64, 64]} />
        <meshStandardMaterial map={map} roughness={0.85} metalness={0} />
      </mesh>
      <Atmosphere radius={2.2} color="#fde3c0" opacity={0.09} />
      <PlanetLight color="#fff1d6" />
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Experience — Neptune (Sleek deep-blue ice giant)                    */
/* ------------------------------------------------------------------ */
export function NeptuneStation({ index }: { index: number }) {
  const pos = useMemo(() => planetPosition(index), [index]);
  const group = usePlanetVisibility(pos, 18.5);
  const map = useTexture("/textures/2k_neptune.jpg");
  const planet = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (planet.current) planet.current.rotation.y = clock.elapsedTime * 0.06;
  });

  return (
    <group ref={group} position={pos}>
      <mesh ref={planet}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial map={map} roughness={0.75} metalness={0} />
      </mesh>
      <Atmosphere radius={2} color="#60a5fa" opacity={0.15} />
      <PlanetLight color="#dbeafe" />
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Projects — Mars (Red Planet, only visible when approaching)         */
/* ------------------------------------------------------------------ */
export function MarsBelt({ index }: { index: number }) {
  const pos = useMemo(() => planetPosition(index), [index]);
  const group = usePlanetVisibility(pos, 18.5);
  const map = useTexture("/textures/2k_mars.jpg");
  const planet = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (planet.current) planet.current.rotation.y = clock.elapsedTime * 0.05;
  });

  return (
    <group ref={group} position={pos}>
      <mesh ref={planet} rotation={[0.1, 0, 0.15]}>
        <sphereGeometry args={[1.9, 64, 64]} />
        <meshStandardMaterial map={map} roughness={0.92} metalness={0} />
      </mesh>
      <Atmosphere radius={1.9} color="#fdba74" opacity={0.09} />
      <PlanetLight color="#ffedd5" />
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Education — The Moon (Clean natural lunar surface)                  */
/* ------------------------------------------------------------------ */
export function RealMoon({ index }: { index: number }) {
  const pos = useMemo(() => planetPosition(index), [index]);
  const group = usePlanetVisibility(pos, 25);
  const map = useTexture("/textures/2k_moon.jpg");
  const moon = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (moon.current) moon.current.rotation.y = clock.elapsedTime * 0.04;
  });

  return (
    <group ref={group} position={pos}>
      <mesh ref={moon}>
        <sphereGeometry args={[1.9, 64, 64]} />
        <meshStandardMaterial map={map} roughness={1} metalness={0} />
      </mesh>
      <Atmosphere radius={1.9} color="#e2e8f0" opacity={0.05} />
      <PlanetLight color="#f1f5f9" />
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Venus — Golden planet with rich atmospheric haze                     */
/* ------------------------------------------------------------------ */
export function GoldenVenus({ index }: { index: number }) {
  const pos = useMemo(() => planetPosition(index), [index]);
  const group = usePlanetVisibility(pos, 25);
  const map = useTexture("/textures/2k_venus_atmosphere.jpg");
  const planet = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (planet.current) planet.current.rotation.y = clock.elapsedTime * 0.05;
  });

  return (
    <group ref={group} position={pos}>
      <mesh ref={planet}>
        <sphereGeometry args={[1.7, 64, 64]} />
        <meshStandardMaterial map={map} roughness={0.8} metalness={0} />
      </mesh>
      <Atmosphere radius={1.7} color="#fbbf24" opacity={0.12} />
      <PlanetLight color="#fef3c7" />
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Resume — Uranus (Pure pristine cyan ice giant)                      */
/* ------------------------------------------------------------------ */
export function UranusBeacon({ index }: { index: number }) {
  const pos = useMemo(() => planetPosition(index), [index]);
  const group = usePlanetVisibility(pos, 18.5);
  const map = useTexture("/textures/2k_uranus.jpg");
  const planet = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (planet.current) planet.current.rotation.y = clock.elapsedTime * 0.05;
  });

  return (
    <group ref={group} position={pos}>
      <mesh ref={planet} rotation={[0, 0, Math.PI / 2.2]}>
        <sphereGeometry args={[1.8, 64, 64]} />
        <meshStandardMaterial map={map} roughness={0.7} metalness={0} />
      </mesh>
      <Atmosphere radius={1.8} color="#67e8f9" opacity={0.12} />
      <PlanetLight color="#cffafe" />
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Contact — Earth (Photorealistic with live cloud layer)               */
/* ------------------------------------------------------------------ */
export function EarthHome({ index }: { index: number }) {
  const pos = useMemo(() => {
    const p = planetPosition(index);
    return new THREE.Vector3(p.x, p.y + 0.5, p.z - 3);
  }, [index]);
  const group = usePlanetVisibility(pos, 18.5);
  const [map, cloudMap] = useTexture([
    "/textures/2k_earth_daymap.jpg",
    "/textures/2k_earth_clouds.jpg",
  ]);
  const earth = useRef<THREE.Mesh>(null);
  const clouds = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (earth.current) earth.current.rotation.y = t * 0.04;
    if (clouds.current) clouds.current.rotation.y = t * 0.055;
  });

  return (
    <group ref={group} position={pos} rotation={[0.1, 0, 0.2]}>
      <mesh ref={earth}>
        <sphereGeometry args={[2.2, 64, 64]} />
        <meshStandardMaterial map={map} roughness={0.85} metalness={0} />
      </mesh>
      <mesh ref={clouds} scale={1.015}>
        <sphereGeometry args={[2.2, 64, 64]} />
        <meshStandardMaterial
          map={cloudMap}
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <Atmosphere radius={2.2} color="#60a5fa" opacity={0.16} />
      <PlanetLight color="#eff6ff" />
    </group>
  );
}
