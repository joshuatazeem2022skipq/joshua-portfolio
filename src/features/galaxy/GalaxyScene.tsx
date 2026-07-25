"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars, useTexture } from "@react-three/drei";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { CAMERA_CURVE, JOURNEY_SECTIONS, WAYPOINTS } from "./journey";
import { useGlowTexture } from "./useGlowTexture";
import {
  EarthHome,
  GoldenVenus,
  JupiterPlanet,
  MarsBelt,
  NeptuneStation,
  RealMoon,
  SaturnPlanet,
  UranusBeacon,
} from "./Planets";

/* ------------------------------------------------------------------ */
/* Scroll-driven camera flying along the journey curve                  */
/* ------------------------------------------------------------------ */
function CameraRig() {
  const { camera } = useThree();
  const anchors = useRef<number[]>([]);
  const lookTarget = useRef(new THREE.Vector3(0, 0, -10));

  useEffect(() => {
    const measure = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      anchors.current = JOURNEY_SECTIONS.map((section) => {
        const el = document.getElementById(section.id);
        if (!el || max <= 0) return 0;
        const center = el.offsetTop + el.offsetHeight / 2 - window.innerHeight / 2;
        return THREE.MathUtils.clamp(center / max, 0, 1);
      });
    };
    measure();
    window.addEventListener("resize", measure);
    const t = setTimeout(measure, 500);
    return () => {
      window.removeEventListener("resize", measure);
      clearTimeout(t);
    };
  }, []);

  useFrame((state, delta) => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const progress = max > 0 ? THREE.MathUtils.clamp(window.scrollY / max, 0, 1) : 0;

    const a = anchors.current;
    let u = progress;
    if (a.length === JOURNEY_SECTIONS.length) {
      let seg = 0;
      while (seg < a.length - 2 && progress > a[seg + 1]) seg++;
      const span = Math.max(a[seg + 1] - a[seg], 0.0001);
      const local = THREE.MathUtils.clamp((progress - a[seg]) / span, 0, 1);
      u = (seg + local) / (a.length - 1);
    }
    u = THREE.MathUtils.clamp(u, 0, 1);

    const target = CAMERA_CURVE.getPoint(u);
    const ahead = CAMERA_CURVE.getPoint(Math.min(u + 0.04, 1));

    const px = state.pointer.x * 0.8;
    const py = state.pointer.y * 0.5;

    camera.position.x = THREE.MathUtils.damp(camera.position.x, target.x + px, 3, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, target.y + py, 3, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, target.z + 2, 3, delta);

    lookTarget.current.x = THREE.MathUtils.damp(lookTarget.current.x, ahead.x + px * 0.4, 3, delta);
    lookTarget.current.y = THREE.MathUtils.damp(lookTarget.current.y, ahead.y + py * 0.4, 3, delta);
    lookTarget.current.z = THREE.MathUtils.damp(lookTarget.current.z, ahead.z, 3, delta);
    camera.lookAt(lookTarget.current);
  });

  return null;
}

/* ------------------------------------------------------------------ */
/* Milky Way skybox — real star field photograph                        */
/* ------------------------------------------------------------------ */
function MilkyWay() {
  const map = useTexture("/textures/2k_stars_milky_way.jpg");
  return (
    <mesh scale={[-1, 1, 1]} rotation={[0, Math.PI / 3, 0.2]}>
      <sphereGeometry args={[190, 48, 48]} />
      <meshBasicMaterial
        map={map}
        side={THREE.BackSide}
        fog={false}
        color="#9a93b8"
      />
    </mesh>
  );
}

/* ------------------------------------------------------------------ */
/* Real textured Sun — placed far from the hero text                    */
/* ------------------------------------------------------------------ */
function RealSun() {
  const map = useTexture("/textures/2k_sun.jpg");
  const sun = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (sun.current) sun.current.rotation.y = clock.elapsedTime * 0.03;
  });

  return (
    <group position={[-16, 7, -34]}>
      <mesh ref={sun}>
        <sphereGeometry args={[4.2, 64, 64]} />
        <meshStandardMaterial
          map={map}
          emissiveMap={map}
          emissive="#ffffff"
          emissiveIntensity={1.25}
          toneMapped={false}
        />
      </mesh>
      <mesh scale={1.25}>
        <sphereGeometry args={[4.2, 32, 32]} />
        <meshBasicMaterial
          color="#fb923c"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <pointLight color="#fff1d6" intensity={220} distance={90} decay={1.6} />
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Spiral galaxy — thousands of colored particles                       */
/* ------------------------------------------------------------------ */
function SpiralGalaxy({ count }: { count: number }) {
  const points = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const inner = new THREE.Color("#fde68a");
    const mid = new THREE.Color("#c084fc");
    const outer = new THREE.Color("#2dd4bf");
    const branches = 4;

    for (let i = 0; i < count; i++) {
      const radius = Math.pow(Math.random(), 1.6) * 16;
      const branch = ((i % branches) / branches) * Math.PI * 2;
      const spin = radius * 0.32;
      const spread = () =>
        Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 1.4;

      pos[i * 3] = Math.cos(branch + spin) * radius + spread();
      pos[i * 3 + 1] = spread() * 0.4;
      pos[i * 3 + 2] = Math.sin(branch + spin) * radius + spread();

      const t = radius / 16;
      const c =
        t < 0.4
          ? inner.clone().lerp(mid, t / 0.4)
          : mid.clone().lerp(outer, (t - 0.4) / 0.6);
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, [count]);

  useFrame(({ clock }) => {
    if (points.current) points.current.rotation.y = clock.elapsedTime * 0.02;
  });

  return (
    <points ref={points} position={[22, -11, -60]} rotation={[0.55, 0, 0.25]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.9}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ------------------------------------------------------------------ */
/* Cosmic dust along the whole flight path                              */
/* ------------------------------------------------------------------ */
function CosmicDust({ count }: { count: number }) {
  const points = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const depth = Math.abs(WAYPOINTS[WAYPOINTS.length - 1].z) + 30;
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 34;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 22;
      pos[i * 3 + 2] = -Math.random() * depth + 8;
    }
    return pos;
  }, [count]);

  useFrame(({ clock }) => {
    if (points.current)
      points.current.rotation.z = Math.sin(clock.elapsedTime * 0.03) * 0.02;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#a78bfa"
        size={0.05}
        sizeAttenuation
        transparent
        opacity={0.45}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ------------------------------------------------------------------ */
/* Nebula sprites                                                       */
/* ------------------------------------------------------------------ */
function Nebula({
  color,
  position,
  scale,
  opacity = 0.26,
}: {
  color: string;
  position: [number, number, number];
  scale: number;
  opacity?: number;
}) {
  const texture = useGlowTexture(color);
  return (
    <sprite position={position} scale={[scale, scale, 1]}>
      <spriteMaterial
        map={texture}
        transparent
        opacity={opacity}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </sprite>
  );
}

/* ------------------------------------------------------------------ */
/* Scene assembly                                                       */
/* ------------------------------------------------------------------ */
function SceneContent({ mobile }: { mobile: boolean }) {
  return (
    <>
      <color attach="background" args={["#050213"]} />
      <fog attach="fog" args={["#050213", 16, 80]} />
      <ambientLight intensity={0.32} />

      <MilkyWay />
      <Stars radius={120} depth={100} count={mobile ? 1800 : 3500} factor={3} fade speed={0.5} />
      <SpiralGalaxy count={mobile ? 3000 : 6500} />
      <CosmicDust count={mobile ? 400 : 900} />

      <Nebula color="rgba(168, 85, 247, 0.85)" position={[-24, 10, -48]} scale={40} opacity={0.2} />
      <Nebula color="rgba(45, 212, 191, 0.8)" position={[26, -7, -80]} scale={46} opacity={0.22} />
      <Nebula color="rgba(232, 121, 249, 0.85)" position={[-24, -5, -118]} scale={44} opacity={0.22} />
      <Nebula color="rgba(251, 191, 36, 0.55)" position={[20, 11, -148]} scale={36} opacity={0.18} />

      <RealSun />
      <SaturnPlanet index={1} />
      <JupiterPlanet index={2} />
      <NeptuneStation index={3} />
      <MarsBelt index={4} />
      <RealMoon index={5} />
      <GoldenVenus index={6} />
      <UranusBeacon index={7} />
      <EarthHome index={8} />

      <CameraRig />

      <EffectComposer multisampling={0}>
        <Bloom
          mipmapBlur
          intensity={mobile ? 0.55 : 0.75}
          luminanceThreshold={1}
          luminanceSmoothing={0.25}
        />
        <Vignette eskil={false} offset={0.12} darkness={0.78} />
      </EffectComposer>
    </>
  );
}

export function GalaxyScene() {
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const mobile = useMediaQuery("(max-width: 768px)");

  if (reduceMotion) {
    return (
      <div
        aria-hidden
        className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_30%_20%,rgba(168,85,247,0.18),transparent_55%),radial-gradient(ellipse_at_75%_70%,rgba(45,212,191,0.12),transparent_50%)]"
      />
    );
  }

  return (
    <div className="fixed inset-0 -z-10" aria-hidden>
      <Canvas
        dpr={[1, mobile ? 1.3 : 1.7]}
        camera={{ position: [0, 0, 2], fov: 50, near: 0.1, far: 260 }}
        gl={{ antialias: false, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <SceneContent mobile={mobile} />
        </Suspense>
      </Canvas>
    </div>
  );
}
