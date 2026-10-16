"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface IntroLoaderProps {
  onComplete: () => void;
}

export default function IntroLoader({ onComplete }: IntroLoaderProps) {
  // Animation phases: "approaching" | "impact" | "docking" | "done"
  const [phase, setPhase] = useState<"approaching" | "impact" | "docking" | "done">("approaching");
  const [targetPos, setTargetPos] = useState({ x: 0, y: 0, scale: 0.155 });

  // Calculate exact vector to the top-left Navbar logo
  useEffect(() => {
    const calcTarget = () => {
      // Navbar logo sits at: top-5 (20px), left-5 (20px)
      // Logo container: padding 6px + half of 44px icon = 48px from (0,0) of viewport
      const targetCenterX = 48;
      const targetCenterY = 48;

      const viewportCenterX = window.innerWidth / 2;
      const viewportCenterY = window.innerHeight / 2;

      const deltaX = -(viewportCenterX - targetCenterX);
      const deltaY = -(viewportCenterY - targetCenterY);

      // Center logo is 280px, navbar logo is 44px
      const scale = 44 / 280;

      setTargetPos({ x: deltaX, y: deltaY, scale });
    };

    calcTarget();
    window.addEventListener("resize", calcTarget);
    return () => window.removeEventListener("resize", calcTarget);
  }, []);

  // Sequence orchestration
  useEffect(() => {
    // Phase 1: Pieces approach from left & right (0 -> 900ms)
    const impactTimer = setTimeout(() => {
      setPhase("impact");
    }, 950);

    // Phase 2: Impact shockwave & pause (950ms -> 1450ms)
    const dockTimer = setTimeout(() => {
      setPhase("docking");
    }, 1450);

    // Phase 3: Docking finishes at ~2250ms
    const completeTimer = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 2250);

    return () => {
      clearTimeout(impactTimer);
      clearTimeout(dockTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  if (phase === "done") return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === "docking" ? 0 : 1 }}
      transition={{ delay: 0.35, duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] bg-[#000000] flex items-center justify-center overflow-hidden pointer-events-none select-none"
    >
      {/* ── Subtle background vignette ── */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.08)_0%,transparent_70%)] pointer-events-none" />

      {/* ── Impact shockwave ring ── */}
      <AnimatePresence>
        {phase === "impact" && (
          <motion.div
            key="shockwave"
            initial={{ scale: 0.4, opacity: 1 }}
            animate={{ scale: 2.8, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="absolute w-[280px] h-[280px] rounded-full border-2 border-[#ec4899] shadow-[0_0_80px_rgba(236,72,153,0.8)] pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* ── Master Logo Assembling Unit ── */}
      <motion.div
        animate={
          phase === "docking"
            ? {
                x: targetPos.x,
                y: targetPos.y,
                scale: targetPos.scale,
              }
            : phase === "impact"
            ? {
                scale: [1, 1.08, 1],
                transition: { duration: 0.35, ease: "easeOut" },
              }
            : { x: 0, y: 0, scale: 1 }
        }
        transition={
          phase === "docking"
            ? { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
            : undefined
        }
        className="relative w-[280px] h-[280px] md:w-[320px] md:h-[320px] flex items-center justify-center will-change-transform"
      > 
        {/* ── Left Cut Piece ── */}
        <motion.div
          initial={{ x: "-120vw", rotate: -15, opacity: 0 }}
          animate={
            phase === "approaching"
              ? { x: 0, rotate: 0, opacity: 1 }
              : { x: 0, rotate: 0, opacity: phase === "impact" || phase === "docking" ? 0 : 1 }
          }
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 z-10"
        >
          <Image
            src="/logo-piece-left1.png"
            alt="Left Logo Piece"
            fill
            sizes="320px"
            className="object-contain"
            style={{ mixBlendMode: "screen" }}
            priority
          />
        </motion.div>

        {/* ── Right Cut Piece ── */}
        <motion.div
          initial={{ x: "120vw", rotate: 15, opacity: 0 }}
          animate={
            phase === "approaching"
              ? { x: 0, rotate: 0, opacity: 1 }
              : { x: 0, rotate: 0, opacity: phase === "impact" || phase === "docking" ? 0 : 1 }
          }
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 z-10"
        >
          <Image
            src="/logo-piece-right1.png"
            alt="Right Logo Piece"
            fill
            sizes="320px"
            className="object-contain"
            style={{ mixBlendMode: "screen" }}
            priority
          />
        </motion.div>

        {/* ── Unified Complete Logo (Reveals at Impact & Docks Flawlessly) ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={
            phase === "impact" || phase === "docking"
              ? { opacity: 1, scale: 1 }
              : { opacity: 0, scale: 0.96 }
          }
          transition={{ duration: 0.2 }}
          className="absolute inset-0 z-20 rounded-2xl md:rounded-full overflow-hidden"
        >
          <Image
            src="/logo.jpg"
            alt="Unstop Igniters Club UCEK"
            fill
            sizes="320px"
            className="object-contain"
            priority
          />
        </motion.div>
      </motion.div>

      {/* ── Minimal Progress / Slogan Subtitle ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={
          phase === "approaching" || phase === "impact"
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: -10 }
        }
        transition={{ duration: 0.4 }}
        className="absolute bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-pink-500/20 bg-pink-500/5 backdrop-blur-md"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#ec4899] animate-pulse" />
        <span className="text-[10px] tracking-[0.3em] uppercase font-semibold text-pink-300">
          Unstop Igniters Club · UCEK
        </span>
      </motion.div>
    </motion.div>
  );
}

