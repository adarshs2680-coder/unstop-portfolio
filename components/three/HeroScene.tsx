"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

/* ------------------------------------------------------------------ */
/* Floating particle field                                              */
/* ------------------------------------------------------------------ */
function ParticleField() {
  const ref = useRef<THREE.Points>(null!);
  const { mouse } = useThree();

  const positions = useMemo(() => {
    const count = 2500;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 0] = (Math.random() - 0.5) * 22;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 22;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = t * 0.04 + mouse.x * 0.15;
    ref.current.rotation.x = t * 0.015 + mouse.y * 0.07;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ec4899"
        size={0.045}
        sizeAttenuation
        depthWrite={false}
        opacity={0.65}
      />
    </Points>
  );
}

/* ------------------------------------------------------------------ */
/* Secondary particle field (blue accent)                              */
/* ------------------------------------------------------------------ */
function ParticleFieldB() {
  const ref = useRef<THREE.Points>(null!);

  const positions = useMemo(() => {
    const count = 800;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 0] = (Math.random() - 0.5) * 18;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 18;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = -t * 0.03;
    ref.current.rotation.x = -t * 0.01;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#3b82f6"
        size={0.035}
        sizeAttenuation
        depthWrite={false}
        opacity={0.4}
      />
    </Points>
  );
}

/* ------------------------------------------------------------------ */
/* Wireframe floating geometries                                       */
/* ------------------------------------------------------------------ */
/*
function FloatingShapes() {
  const torus = useRef<THREE.Mesh>(null!);
  const ico = useRef<THREE.Mesh>(null!);
  const oct = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (torus.current) {
      torus.current.rotation.x = t * 0.25;
      torus.current.rotation.y = t * 0.18;
      torus.current.position.y = Math.sin(t * 0.4) * 0.4;
    }
    if (ico.current) {
      ico.current.rotation.x = -t * 0.18;
      ico.current.rotation.z = t * 0.28;
      ico.current.position.y = Math.cos(t * 0.35) * 0.5;
    }
    if (oct.current) {
      oct.current.rotation.y = t * 0.38;
      oct.current.rotation.x = t * 0.12;
      oct.current.position.y = Math.sin(t * 0.55 + 1.2) * 0.3;
    }
  });

  return (
    <>
      <mesh ref={torus} position={[3.2, 0.2, -3.5]}>
        <torusKnotGeometry args={[0.85, 0.22, 120, 16]} />
        <meshStandardMaterial
          color="#7c3aed"
          wireframe
          transparent
          opacity={0.28}
        />
      </mesh>

      <mesh ref={ico} position={[-3.8, 1, -4.5]}>
        <icosahedronGeometry args={[1.1, 1]} />
        <meshStandardMaterial
          color="#2563eb"
          wireframe
          transparent
          opacity={0.22}
        />
      </mesh>

      <mesh ref={oct} position={[0.5, -2.2, -5]}>
        <octahedronGeometry args={[0.9, 0]} />
        <meshStandardMaterial
          color="#a78bfa"
          wireframe
          transparent
          opacity={0.2}
        />
      </mesh>
    </>
  );
}
*/
/* ------------------------------------------------------------------ */
/* Export                                                               */
/* ------------------------------------------------------------------ */
export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[8, 8, 8]} intensity={2} color="#7c3aed" />
      <pointLight position={[-8, -8, -8]} intensity={1} color="#2563eb" />
      <ParticleField />
      <ParticleFieldB />
     {/* <FloatingShapes /> */}
    </Canvas>
  );
}

