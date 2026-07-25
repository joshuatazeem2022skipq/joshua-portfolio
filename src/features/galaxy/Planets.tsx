"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Sparkles, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { planetPosition } from "./journey";

/* ------------------------------------------------------------------ */
/* Helpers                                                              */
/* ------------------------------------------------------------------ */

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
  opacity = 0.14,
}: {
  radius: number;
  color: string;
  opacity?: number;
}) {
  return (
    <mesh scale={1.06}>
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
      <pointLight position={[6, 3, 8]} intensity={140} distance={40} color={color} />
      <pointLight position={[-5, -2, -4]} intensity={18} distance={25} color="#7c3aed" />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* About — Saturn with real ring system                                 */
/* ------------------------------------------------------------------ */
export function SaturnPlanet({ index }: { index: number }) {
  const pos = useMemo(() => planetPosition(index), [index]);
  const [map, ringMap] = useTexture([
    "/textures/2k_saturn.jpg",
    "/textures/2k_saturn_ring_alpha.png",
  ]);
  const planet = useRef<THREE.Mesh>(null);
  const ringGeometry = useRingGeometry(2.7, 4.6);

  useFrame(({ clock }) => {
    if (planet.current) planet.current.rotation.y = clock.elapsedTime * 0.06;
  });

  return (
    <group position={pos} rotation={[0.12, 0, -0.18]}>
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
/* Skills — Jupiter with constellation web                              */
/* ------------------------------------------------------------------ */
export function JupiterPlanet({ index }: { index: number }) {
  const pos = useMemo(() => planetPosition(index), [index]);
  const map = useTexture("/textures/2k_jupiter.jpg");
  const planet = useRef<THREE.Mesh>(null);
  const web = useRef<THREE.Group>(null);

  const satellites = useMemo(() => {
    const pts: { p: THREE.Vector3; s: number; c: string }[] = [];
    const colors = ["#2dd4bf", "#e879f9", "#c084fc", "#fbbf24"];
    for (let i = 0; i < 12; i++) {
      const phi = Math.acos(-1 + (2 * i) / 12);
      const theta = Math.sqrt(12 * Math.PI) * phi;
      pts.push({
        p: new THREE.Vector3(
          3.4 * Math.cos(theta) * Math.sin(phi),
          3.4 * Math.sin(theta) * Math.sin(phi),
          3.4 * Math.cos(phi)
        ),
        s: 0.06 + (i % 3) * 0.03,
        c: colors[i % colors.length],
      });
    }
    return pts;
  }, []);

  const lines = useMemo(() => {
    const positions: number[] = [];
    satellites.forEach((a, i) => {
      const nearest = satellites
        .map((b, j) => ({ j, d: a.p.distanceTo(b.p) }))
        .filter(({ j }) => j !== i)
        .sort((x, y) => x.d - y.d)
        .slice(0, 2);
      nearest.forEach(({ j }) => {
        positions.push(a.p.x, a.p.y, a.p.z);
        positions.push(satellites[j].p.x, satellites[j].p.y, satellites[j].p.z);
      });
    });
    return new Float32Array(positions);
  }, [satellites]);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (planet.current) planet.current.rotation.y = t * 0.1;
    if (web.current) web.current.rotation.y = t * 0.08;
  });

  return (
    <group position={pos}>
      <mesh ref={planet} rotation={[0.05, 0, 0.08]}>
        <sphereGeometry args={[2.2, 64, 64]} />
        <meshStandardMaterial map={map} roughness={0.85} metalness={0} />
      </mesh>
      <Atmosphere radius={2.2} color="#fde3c0" opacity={0.07} />
      <group ref={web}>
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[lines, 3]} />
          </bufferGeometry>
          <lineBasicMaterial
            color="#2dd4bf"
            transparent
            opacity={0.25}
            blending={THREE.AdditiveBlending}
          />
        </lineSegments>
        {satellites.map((s, i) => (
          <mesh key={i} position={s.p}>
            <sphereGeometry args={[s.s, 12, 12]} />
            <meshStandardMaterial
              color={s.c}
              emissive={s.c}
              emissiveIntensity={2.6}
              toneMapped={false}
            />
          </mesh>
        ))}
      </group>
      <PlanetLight />
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Experience — Neptune orbital outpost                                 */
/* ------------------------------------------------------------------ */
export function NeptuneStation({ index }: { index: number }) {
  const pos = useMemo(() => planetPosition(index), [index]);
  const map = useTexture("/textures/2k_neptune.jpg");
  const planet = useRef<THREE.Mesh>(null);
  const ring = useRef<THREE.Mesh>(null);
  const probe = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (planet.current) planet.current.rotation.y = t * 0.09;
    if (ring.current) {
      ring.current.rotation.x = t * 0.2;
      ring.current.rotation.y = t * 0.15;
    }
    if (probe.current) {
      probe.current.position.x = Math.cos(t * 0.6) * 3.2;
      probe.current.position.z = Math.sin(t * 0.6) * 3.2;
      probe.current.position.y = Math.sin(t * 0.9) * 0.5;
    }
  });

  return (
    <group position={pos}>
      <mesh ref={planet}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial map={map} roughness={0.75} metalness={0} />
      </mesh>
      <Atmosphere radius={2} color="#60a5fa" opacity={0.12} />
      <mesh ref={ring}>
        <torusGeometry args={[2.9, 0.018, 12, 96]} />
        <meshStandardMaterial
          color="#2dd4bf"
          emissive="#2dd4bf"
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>
      <mesh ref={probe}>
        <sphereGeometry args={[0.1, 12, 12]} />
        <meshStandardMaterial
          color="#fbbf24"
          emissive="#fbbf24"
          emissiveIntensity={3.2}
          toneMapped={false}
        />
      </mesh>
      <PlanetLight color="#dbeafe" />
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Projects — Mars with asteroid belt                                   */
/* ------------------------------------------------------------------ */
export function MarsBelt({ index }: { index: number }) {
  const pos = useMemo(() => planetPosition(index), [index]);
  const map = useTexture("/textures/2k_mars.jpg");
  const planet = useRef<THREE.Mesh>(null);
  const belt = useRef<THREE.Group>(null);

  const asteroids = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => {
        const angle = (i / 30) * Math.PI * 2;
        const radius = 3 + Math.sin(i * 12.9898) * 0.6;
        return {
          position: [
            Math.cos(angle) * radius,
            Math.sin(i * 78.233) * 0.5,
            Math.sin(angle) * radius,
          ] as [number, number, number],
          scale: 0.06 + Math.abs(Math.sin(i * 3.7)) * 0.14,
          rotation: [i * 1.3, i * 2.1, i * 0.7] as [number, number, number],
        };
      }),
    []
  );

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (planet.current) planet.current.rotation.y = t * 0.08;
    if (belt.current) belt.current.rotation.y = t * 0.06;
  });

  return (
    <group position={pos}>
      <mesh ref={planet} rotation={[0.1, 0, 0.15]}>
        <sphereGeometry args={[1.9, 64, 64]} />
        <meshStandardMaterial map={map} roughness={0.95} metalness={0} />
      </mesh>
      <Atmosphere radius={1.9} color="#fdba74" opacity={0.07} />
      <group ref={belt} rotation={[0.3, 0, 0.1]}>
        {asteroids.map((a, i) => (
          <mesh key={i} position={a.position} scale={a.scale} rotation={a.rotation}>
            <dodecahedronGeometry args={[1, 0]} />
            <meshStandardMaterial color="#8a7968" roughness={1} flatShading />
          </mesh>
        ))}
      </group>
      <Sparkles count={20} scale={7} size={1.2} speed={0.2} color="#fdba74" />
      <PlanetLight color="#ffedd5" />
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Education — the Moon with an orbiting satellite                      */
/* ------------------------------------------------------------------ */
export function RealMoon({ index }: { index: number }) {
  const pos = useMemo(() => planetPosition(index), [index]);
  const map = useTexture("/textures/2k_moon.jpg");
  const moon = useRef<THREE.Mesh>(null);
  const sat = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (moon.current) moon.current.rotation.y = t * 0.05;
    if (sat.current) sat.current.rotation.y = t * 0.5;
  });

  return (
    <group position={pos}>
      <mesh ref={moon}>
        <sphereGeometry args={[1.9, 64, 64]} />
        <meshStandardMaterial map={map} roughness={1} metalness={0} />
      </mesh>
      <group ref={sat}>
        <mesh position={[2.8, 0.35, 0]}>
          <boxGeometry args={[0.18, 0.08, 0.28]} />
          <meshStandardMaterial
            color="#e2e8f0"
            emissive="#2dd4bf"
            emissiveIntensity={1.8}
            toneMapped={false}
            metalness={0.8}
          />
        </mesh>
      </group>
      <PlanetLight color="#f1f5f9" />
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Achievements — golden Venus wrapped in light                         */
/* ------------------------------------------------------------------ */
export function GoldenVenus({ index }: { index: number }) {
  const pos = useMemo(() => planetPosition(index), [index]);
  const map = useTexture("/textures/2k_venus_atmosphere.jpg");
  const planet = useRef<THREE.Mesh>(null);
  const ring = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (planet.current) planet.current.rotation.y = t * 0.07;
    if (ring.current) {
      ring.current.rotation.z = t * 0.4;
      ring.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.5) * 0.2;
    }
  });

  return (
    <group position={pos}>
      <mesh ref={planet}>
        <sphereGeometry args={[1.7, 64, 64]} />
        <meshStandardMaterial map={map} roughness={0.8} metalness={0} />
      </mesh>
      <Atmosphere radius={1.7} color="#fbbf24" opacity={0.12} />
      <mesh ref={ring}>
        <torusGeometry args={[2.5, 0.016, 12, 96]} />
        <meshStandardMaterial
          color="#fde68a"
          emissive="#fbbf24"
          emissiveIntensity={2.2}
          toneMapped={false}
        />
      </mesh>
      <Sparkles count={30} scale={5.5} size={1.6} speed={0.3} color="#fde68a" />
      <PlanetLight color="#fef3c7" />
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Resume — Uranus with holographic data rings                          */
/* ------------------------------------------------------------------ */
export function UranusBeacon({ index }: { index: number }) {
  const pos = useMemo(() => planetPosition(index), [index]);
  const map = useTexture("/textures/2k_uranus.jpg");
  const planet = useRef<THREE.Mesh>(null);
  const rings = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (planet.current) planet.current.rotation.y = t * 0.08;
    if (rings.current) {
      rings.current.children.forEach((child, i) => {
        child.position.y = ((t * 0.5 + i * 1.4) % 4.2) - 2.1;
        const mesh = child as THREE.Mesh;
        const mat = mesh.material as THREE.MeshStandardMaterial;
        mat.opacity = 1 - Math.abs(child.position.y) / 2.4;
      });
    }
  });

  return (
    <group position={pos}>
      <mesh ref={planet} rotation={[0, 0, Math.PI / 2.2]}>
        <sphereGeometry args={[1.8, 64, 64]} />
        <meshStandardMaterial map={map} roughness={0.7} metalness={0} />
      </mesh>
      <Atmosphere radius={1.8} color="#67e8f9" opacity={0.1} />
      <group ref={rings}>
        {[0, 1, 2].map((i) => (
          <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[2.3, 0.012, 8, 64]} />
            <meshStandardMaterial
              color="#2dd4bf"
              emissive="#2dd4bf"
              emissiveIntensity={2.2}
              toneMapped={false}
              transparent
            />
          </mesh>
        ))}
      </group>
      <PlanetLight color="#cffafe" />
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Contact — Earth with live cloud layer, journey's end                 */
/* ------------------------------------------------------------------ */
export function EarthHome({ index }: { index: number }) {
  const pos = useMemo(() => {
    const p = planetPosition(index);
    return new THREE.Vector3(p.x, p.y + 0.5, p.z - 3);
  }, [index]);
  const [map, cloudMap] = useTexture([
    "/textures/2k_earth_daymap.jpg",
    "/textures/2k_earth_clouds.jpg",
  ]);
  const earth = useRef<THREE.Mesh>(null);
  const clouds = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (earth.current) earth.current.rotation.y = t * 0.05;
    if (clouds.current) clouds.current.rotation.y = t * 0.07;
  });

  return (
    <group position={pos} rotation={[0.1, 0, 0.2]}>
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
      <Float speed={1.6} floatIntensity={0.5}>
        <mesh position={[3.2, 1.2, 0.5]}>
          <sphereGeometry args={[0.07, 12, 12]} />
          <meshStandardMaterial
            color="#e879f9"
            emissive="#e879f9"
            emissiveIntensity={3}
            toneMapped={false}
          />
        </mesh>
      </Float>
      <Sparkles count={25} scale={7} size={1.4} speed={0.25} color="#93c5fd" />
      <PlanetLight color="#eff6ff" />
    </group>
  );
}
