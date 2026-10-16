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

  // Calibrated sequence orchestration:
  // 0ms → 350ms  : Lasers shoot inward across screen (0ms to 350ms)
  // 350ms → 500ms: Lasers stream inside center point and vanish
  // 500ms        : Detonation flash & shockwave; LOGO reveals
  // 850ms        : Logo begins smooth flight to top-left Navbar
  // 1500ms       : Sequence finishes; Navbar takes over and Hero appears
  useEffect(() => {
    // 500ms: Laser fully absorbed → impact flash & logo reveal
    const impactTimer = setTimeout(() => {
      setPhase("impact");
    }, 500);

    // 850ms: Docking sequence begins
    const dockTimer = setTimeout(() => {
      setPhase("docking");
    }, 850);

    // 1500ms: Complete and hand over to Navbar
    const completeTimer = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 1500);

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
      transition={{ delay: 0.2, duration: 0.4, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] bg-[#000000] flex items-center justify-center overflow-hidden pointer-events-none select-none"
    >
      {/* ── Background subtle golden ambiance ── */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.09)_0%,transparent_70%)] pointer-events-none" />

      {/* ── Left Half Container: Laser shoots inward (0ms to 350ms) and streams INTO center ── */}
      {phase === "approaching" && (
        <div className="absolute left-0 right-1/2 top-0 bottom-0 overflow-hidden pointer-events-none z-10">
          <motion.div
            initial={{ x: "-60vw" }}
            animate={{ x: ["-60vw", "0%", "105%"] }}
            transition={{
              duration: 0.5,
              times: [0, 0.7, 1], // reaches center exactly at 0.70 * 0.50s = 0.35s (350ms)
              ease: ["easeIn", "linear"],
            }}
            className="absolute right-0 top-1/2 -translate-y-1/2 h-[3.5px] md:h-[4.5px] w-[280px] md:w-[440px] pointer-events-none"
          >
            {/* Laser body */}
            <div className="w-full h-full bg-gradient-to-r from-transparent via-[#f59e0b] to-white shadow-[0_0_15px_#fbbf24,0_0_30px_#f59e0b,0_0_55px_rgba(245,158,11,0.85)] rounded-full" />
            {/* Leading spark head */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3.5 h-3.5 md:w-4 md:h-4 rounded-full bg-white shadow-[0_0_18px_#ffffff,0_0_35px_#fbbf24,0_0_60px_#f59e0b]" />
          </motion.div>
        </div>
      )}

      {/* ── Right Half Container: Laser shoots inward (0ms to 350ms) and streams INTO center ── */}
      {phase === "approaching" && (
        <div className="absolute left-1/2 right-0 top-0 bottom-0 overflow-hidden pointer-events-none z-10">
          <motion.div
            initial={{ x: "60vw" }}
            animate={{ x: ["60vw", "0%", "-105%"] }}
            transition={{
              duration: 0.5,
              times: [0, 0.7, 1], // reaches center exactly at 0.70 * 0.50s = 0.35s (350ms)
              ease: ["easeIn", "linear"],
            }}
            className="absolute left-0 top-1/2 -translate-y-1/2 h-[3.5px] md:h-[4.5px] w-[280px] md:w-[440px] pointer-events-none"
          >
            {/* Laser body */}
            <div className="w-full h-full bg-gradient-to-l from-transparent via-[#f59e0b] to-white shadow-[0_0_15px_#fbbf24,0_0_30px_#f59e0b,0_0_55px_rgba(245,158,11,0.85)] rounded-full" />
            {/* Leading spark head */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-3.5 h-3.5 md:w-4 md:h-4 rounded-full bg-white shadow-[0_0_18px_#ffffff,0_0_35px_#fbbf24,0_0_60px_#f59e0b]" />
          </motion.div>
        </div>
      )}

      {/* ── Center Singularity Core: Flares up as lasers strike center at 350ms ── */}
      {phase === "approaching" && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.2, 1.6], opacity: [0, 0.9, 1] }}
          transition={{ delay: 0.32, duration: 0.18 }}
          className="absolute w-7 h-7 rounded-full bg-white shadow-[0_0_25px_#ffffff,0_0_50px_#fbbf24,0_0_80px_#f59e0b] pointer-events-none z-20"
        />
      )}

      {/* ── Central Collision Detonation Flash Burst (at 500ms) ── */}
      <AnimatePresence>
        {phase === "impact" && (
          <motion.div
            key="collision-flash"
            initial={{ scale: 0.2, opacity: 1 }}
            animate={{ scale: [0.2, 2.6, 0], opacity: [1, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.32, ease: "easeOut" }}
            className="absolute w-28 h-28 rounded-full bg-white shadow-[0_0_70px_#ffffff,0_0_120px_#fbbf24,0_0_180px_#f59e0b] pointer-events-none z-30"
          />
        )}
      </AnimatePresence>

      {/* ── Circular Expanding Golden Shockwave ── */}
      <AnimatePresence>
        {phase === "impact" && (
          <motion.div
            key="shockwave"
            initial={{ scale: 0.3, opacity: 1 }}
            animate={{ scale: 3.2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="absolute w-[280px] h-[280px] rounded-full border-2 border-[#fbbf24] shadow-[0_0_80px_rgba(245,158,11,0.9),inset_0_0_30px_rgba(251,191,36,0.6)] pointer-events-none z-20"
          />
        )}
      </AnimatePresence>

      {/* ── Revealed Logo Unit (Appears immediately at collision detonation) ── */}
      {phase !== "approaching" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.2, x: 0, y: 0 }}
          animate={
            phase === "docking"
              ? {
                  x: targetPos.x,
                  y: targetPos.y,
                  scale: targetPos.scale,
                  opacity: 1,
                }
              : {
                  x: 0,
                  y: 0,
                  scale: [0.2, 1.1, 1.0],
                  opacity: 1,
                }
          }
          transition={
            phase === "docking"
              ? { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
              : { duration: 0.25, ease: "easeOut" }
          }
          className="relative w-[280px] h-[280px] md:w-[320px] md:h-[320px] flex items-center justify-center will-change-transform z-20"
        >
          <div className="relative w-full h-full rounded-2xl md:rounded-full overflow-hidden shadow-[0_0_60px_rgba(245,158,11,0.4)]">
            <Image
              src="/logo.jpg"
              alt="Unstop Igniters Club UCEK"
              fill
              sizes="320px"
              className="object-contain"
              priority
            />
          </div>
        </motion.div>
      )}

      {/* ── Subtitle Badge ── */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={
          phase === "approaching" || phase === "impact"
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: -10 }
        }
        transition={{ duration: 0.25 }}
        className="absolute bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-amber-500/25 bg-amber-500/10 backdrop-blur-md"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] animate-pulse" />
        <span className="text-[10px] tracking-[0.3em] uppercase font-semibold text-amber-200">
          Unstop Igniters Club · UCEK
        </span>
      </motion.div>
    </motion.div>
  );
}
