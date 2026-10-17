"use client";

import { useEffect, useRef, useState } from "react";

interface HelicalStarsProps {
  isLoaded: boolean;
  onAlignChange?: (aligned: boolean) => void;
}

interface TrailPoint {
  x: number;
  y: number;
  alpha: number;
  size: number;
}

export default function HelicalStars({ isLoaded, onAlignChange }: HelicalStarsProps) {
  const [mounted, setMounted] = useState(false);
  const onAlignChangeRef = useRef(onAlignChange);

  useEffect(() => {
    onAlignChangeRef.current = onAlignChange;
  }, [onAlignChange]);

  // Star positions and state
  const posRef = useRef({
    star1: { x: 0, y: 0, z: 0, scale: 1 },
    star2: { x: 0, y: 0, z: 0, scale: 1 },
    progress: 0,
    targetProgress: 0,
    scrollFade: 1,
    hasImpacted: false,
  });

  // Stardust trails
  const trail1Ref = useRef<TrailPoint[]>([]);
  const trail2Ref = useRef<TrailPoint[]>([]);

  // DOM elements refs for direct 60fps transform updates
  const star1ElRef = useRef<HTMLDivElement>(null);
  const star2ElRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shockwave1Ref = useRef<HTMLDivElement>(null);
  const shockwave2Ref = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, currentX: 0, currentY: 0 });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    let animId: number;
    let clock = 0;
    let lastTrailTime = 0;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    // Track mouse for 3D parallax synchronization with Three.js particle field
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Handle canvas resize
    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    // Compute scroll progress tied to the About section Vision/Mission cards
    const updateScrollProgress = () => {
      const scrollY = window.scrollY;
      const targetEl = document.getElementById("vision-mission");
      const vh = window.innerHeight;

      if (!targetEl) {
        posRef.current.targetProgress = 0;
        return;
      }

      const rect = targetEl.getBoundingClientRect();
      const elementDocTop = rect.top + scrollY;

      // Arrival point: when Vision/Mission cards reach upper-mid viewport (40% from top)
      const arrivalScroll = Math.max(100, elementDocTop - vh * 0.42);

      // Normalized progress: 0 at top of page, 1 at arrival
      const rawProgress = Math.max(0, scrollY / arrivalScroll);
      posRef.current.targetProgress = Math.min(1.0, rawProgress);

      // Fade out if user scrolls way past About section into next sections
      const leaveScroll = elementDocTop + rect.height + vh * 0.2;
      if (scrollY > leaveScroll) {
        const fadeProgress = (scrollY - leaveScroll) / (vh * 0.5);
        posRef.current.scrollFade = Math.max(0, 1 - fadeProgress);
      } else {
        posRef.current.scrollFade = 1;
      }
    };

    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    updateScrollProgress();

    // ── Main Animation Loop (60/120 fps) ──
    const loop = (timestamp: number) => {
      clock += 0.016;
      const state = posRef.current;

      // Smooth mouse parallax interpolation
      const mouse = mouseRef.current;
      mouse.currentX += (mouse.x - mouse.currentX) * 0.05;
      mouse.currentY += (mouse.y - mouse.currentY) * 0.05;

      // Smooth, slow lerp on scroll progress for gentle, majestic motion
      state.progress += (state.targetProgress - state.progress) * 0.04;
      const p = state.progress;

      const vw = window.innerWidth;
      const vh = window.innerHeight;

      // ── Rotation Synchronized with Three.js Particle Field ──
      // In HeroScene: ref.current.rotation.y = t * 0.04 + mouse.x * 0.15;
      //              ref.current.rotation.x = t * 0.015 + mouse.y * 0.07;
      const rotY = clock * 0.04 + mouse.currentX * 0.15;
      const rotX = clock * 0.015 + mouse.currentY * 0.07;

      const cx = vw / 2;
      const cy = vh / 2;

      // Orbital radius around the screen perimeter (never obscuring text)
      const radiusX = Math.min(vw * 0.42, 600);
      const radiusY = Math.min(vh * 0.36, 320);

      // Star 1 (Pink/Vision): Rotating in 3D orbit around center with the particles
      const theta1 = rotY;
      const heroX1 = cx + Math.cos(theta1) * radiusX;
      const heroY1 = cy + Math.sin(theta1) * radiusY * 0.45 + rotX * 60;

      // Star 2 (Blue/Mission): Rotating 180 degrees opposite in the particle field
      const theta2 = rotY + Math.PI;
      const heroX2 = cx + Math.cos(theta2) * radiusX;
      const heroY2 = cy + Math.sin(theta2) * radiusY * 0.45 - rotX * 60;

      // ── Target Positions in About Us (Vision/Mission Card Targets) ──
      const vTarget = document.getElementById("vision-star-target");
      const mTarget = document.getElementById("mission-star-target");

      let targetX1 = vw * 0.32;
      let targetY1 = vh * 0.48;
      let targetX2 = vw * 0.68;
      let targetY2 = vh * 0.48;

      if (vTarget) {
        const r1 = vTarget.getBoundingClientRect();
        targetX1 = r1.left + r1.width / 2;
        targetY1 = r1.top + r1.height / 2;
      }
      if (mTarget) {
        const r2 = mTarget.getBoundingClientRect();
        targetX2 = r2.left + r2.width / 2;
        targetY2 = r2.top + r2.height / 2;
      }

      // ── Base Linear Interpolation Between Hero and Target ──
      const baseX1 = (1 - p) * heroX1 + p * targetX1;
      const baseY1 = (1 - p) * heroY1 + p * targetY1;

      const baseX2 = (1 - p) * heroX2 + p * targetX2;
      const baseY2 = (1 - p) * heroY2 + p * targetY2;

      // Envelope: 0 at top (Hero), 0 at bottom (Cards), maximum during mid-scroll
      const envelope = Math.sin(Math.PI * Math.min(1, Math.max(0, p)));

      // ── Slow, Gentle, Organic Wandering Movement Downward ──
      // Low-frequency gentle broad curves for a slow, majestic descent
      const maxWander = Math.min(140, Math.max(50, vw * 0.14));

      // Star 1: slow broad cosmic curves
      const randX1 =
        Math.sin(p * 2.6) * maxWander * 0.75 +
        Math.cos(p * 4.8) * maxWander * 0.25 +
        Math.sin(clock * 0.35) * 6;
      const randY1 =
        Math.cos(p * 2.4) * 25 +
        Math.sin(p * 4.2) * 12 +
        Math.cos(clock * 0.3) * 5;

      // Star 2: slow independent gentle curves
      const randX2 =
        Math.cos(p * 2.8 + 1.4) * maxWander * 0.75 +
        Math.sin(p * 5.1 + 0.9) * maxWander * 0.25 +
        Math.cos(clock * 0.35 + 1.2) * 6;
      const randY2 =
        Math.sin(p * 2.6 + 1.2) * 25 +
        Math.cos(p * 4.5 + 0.7) * 12 +
        Math.sin(clock * 0.3 + 1.0) * 5;

      // Final coordinates: smoothly and slowly converge to targets as p -> 1
      const x1 = baseX1 + envelope * randX1;
      const y1 = baseY1 + envelope * randY1;
      const z1 = Math.sin(p * 2.5 + clock * 0.3);
      // Scaled down by 20% (0.8x of previous size)
      const scale1 = (1 + z1 * 0.18) * 0.8;

      const x2 = baseX2 + envelope * randX2;
      const y2 = baseY2 + envelope * randY2;
      const z2 = Math.cos(p * 2.8 + clock * 0.35);
      // Scaled down by 20% (0.8x of previous size)
      const scale2 = (1 + z2 * 0.18) * 0.8;

      state.star1 = { x: x1, y: y1, z: z1, scale: scale1 };
      state.star2 = { x: x2, y: y2, z: z2, scale: scale2 };

      // ── Update Stardust Particles Trail ──
      if (timestamp - lastTrailTime > 40 && p > 0.04 && p < 0.98) {
        lastTrailTime = timestamp;
        trail1Ref.current.push({
          x: x1,
          y: y1,
          alpha: 0.85,
          size: (2.2 + Math.random() * 1.8) * 0.8,
        });
        trail2Ref.current.push({
          x: x2,
          y: y2,
          alpha: 0.85,
          size: (2.2 + Math.random() * 1.8) * 0.8,
        });

        // Limit trail length
        if (trail1Ref.current.length > 25) trail1Ref.current.shift();
        if (trail2Ref.current.length > 25) trail2Ref.current.shift();
      }

      // ── Draw Stardust on Canvas ──
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw Star 1 (Pink) Trail
        for (let i = 0; i < trail1Ref.current.length; i++) {
          const pt = trail1Ref.current[i];
          pt.alpha *= 0.94;
          if (pt.alpha > 0.02) {
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, pt.size * pt.alpha, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(236, 72, 153, ${pt.alpha * 0.7 * state.scrollFade})`;
            ctx.shadowColor = "#f472b6";
            ctx.shadowBlur = 6;
            ctx.fill();
          }
        }

        // Draw Star 2 (Blue) Trail
        for (let i = 0; i < trail2Ref.current.length; i++) {
          const pt = trail2Ref.current[i];
          pt.alpha *= 0.94;
          if (pt.alpha > 0.02) {
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, pt.size * pt.alpha, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(59, 130, 246, ${pt.alpha * 0.7 * state.scrollFade})`;
            ctx.shadowColor = "#38bdf8";
            ctx.shadowBlur = 6;
            ctx.fill();
          }
        }
      }

      // ── Direct Transform Updates for 60fps Star DOM ──
      // In Hero (p < 0.2), keep z-index below Hero text (z-20) so text is never masked
      const star1Z = p < 0.2 ? "12" : z1 > 0 ? "35" : "25";
      const star2Z = p < 0.2 ? "12" : z2 > 0 ? "35" : "25";

      // Disappear when aligning with cards (p >= 0.86); smoothly reappear when scrolling back up
      const alignFade = Math.max(0, 1 - Math.max(0, p - 0.86) / 0.05);
      const starFinalOpacity = state.scrollFade * alignFade;
      const displayScale1 = scale1 * Math.max(0.15, alignFade);
      const displayScale2 = scale2 * Math.max(0.15, alignFade);

      if (star1ElRef.current) {
        star1ElRef.current.style.transform = `translate3d(${x1}px, ${y1}px, 0) translate(-50%, -50%) scale(${displayScale1})`;
        star1ElRef.current.style.zIndex = star1Z;
        star1ElRef.current.style.opacity = `${starFinalOpacity}`;
      }

      if (star2ElRef.current) {
        star2ElRef.current.style.transform = `translate3d(${x2}px, ${y2}px, 0) translate(-50%, -50%) scale(${displayScale2})`;
        star2ElRef.current.style.zIndex = star2Z;
        star2ElRef.current.style.opacity = `${starFinalOpacity}`;
      }

      // ── Touchdown Detonation / Shockwave & Card Alignment Trigger ──
      const isAligned = p >= 0.88;
      if (isAligned !== state.hasImpacted) {
        state.hasImpacted = isAligned;
        if (onAlignChangeRef.current) {
          onAlignChangeRef.current(isAligned);
        }
        if (isAligned) {
          // Trigger impact shockwave pulse
          if (shockwave1Ref.current) {
            shockwave1Ref.current.classList.remove("animate-ping-once");
            void shockwave1Ref.current.offsetWidth;
            shockwave1Ref.current.classList.add("animate-ping-once");
          }
          if (shockwave2Ref.current) {
            shockwave2Ref.current.classList.remove("animate-ping-once");
            void shockwave2Ref.current.offsetWidth;
            shockwave2Ref.current.classList.add("animate-ping-once");
          }
        }
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", updateScrollProgress);
      window.removeEventListener("resize", handleResize);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-30 transition-opacity duration-1000 ${
        isLoaded ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Canvas for sparkling stardust trail */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* ═════════════════════════════════════════════════════════════════════════ */}
      {/* STAR 1: OUR VISION (Radiant Hot Pink / Rose / Gold Celestial Star)       */}
      {/* ═════════════════════════════════════════════════════════════════════════ */}
      <div
        ref={star1ElRef}
        className="absolute top-0 left-0 will-change-transform flex items-center justify-center select-none"
        style={{ transform: "translate3d(-9999px, -9999px, 0)" }}
      >
        {/* Soft Concentric Atmospheric Glow */}
        <div className="absolute w-16 h-16 rounded-full bg-pink-500/25 blur-xl pointer-events-none animate-pulse" />
        <div className="absolute w-8 h-8 rounded-full bg-rose-400/35 blur-md pointer-events-none" />

        {/* Compact Symmetrical Star Twinkle */}
        <div className="absolute w-7 h-7 flex items-center justify-center pointer-events-none animate-[spin_32s_linear_infinite]">
          <div className="absolute w-7 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_6px_#ec4899]" />
          <div className="absolute h-7 w-[1.5px] bg-gradient-to-b from-transparent via-white to-transparent shadow-[0_0_6px_#ec4899]" />
        </div>

        {/* Intense Pure-White Star Nucleus */}
        <div className="relative w-3 h-3 rounded-full bg-white shadow-[0_0_12px_3px_#ec4899,0_0_20px_6px_#f472b6] flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-pink-100" />
        </div>

        {/* Orbiting Stardust Spark */}
        <div className="absolute w-6 h-6 rounded-full animate-[spin_10s_linear_infinite] pointer-events-none">
          <div className="w-1 h-1 rounded-full bg-pink-200 shadow-[0_0_6px_#fff]" />
        </div>

        {/* Arrival Shockwave Ring */}
        <div
          ref={shockwave1Ref}
          className="absolute w-16 h-16 rounded-full border-2 border-pink-400/80 pointer-events-none opacity-0 scale-0 transition-transform duration-700"
        />
      </div>

      {/* ═════════════════════════════════════════════════════════════════════════ */}
      {/* STAR 2: OUR MISSION (Radiant Electric Blue / Cyan Celestial Star)        */}
      {/* ═════════════════════════════════════════════════════════════════════════ */}
      <div
        ref={star2ElRef}
        className="absolute top-0 left-0 will-change-transform flex items-center justify-center select-none"
        style={{ transform: "translate3d(-9999px, -9999px, 0)" }}
      >
        {/* Soft Concentric Atmospheric Glow */}
        <div className="absolute w-16 h-16 rounded-full bg-blue-500/25 blur-xl pointer-events-none animate-pulse" />
        <div className="absolute w-8 h-8 rounded-full bg-cyan-400/35 blur-md pointer-events-none" />

        {/* Compact Symmetrical Star Twinkle */}
        <div className="absolute w-7 h-7 flex items-center justify-center pointer-events-none animate-[spin_32s_linear_infinite_reverse]">
          <div className="absolute w-7 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_6px_#38bdf8]" />
          <div className="absolute h-7 w-[1.5px] bg-gradient-to-b from-transparent via-white to-transparent shadow-[0_0_6px_#38bdf8]" />
        </div>

        {/* Intense Pure-White Star Nucleus */}
        <div className="relative w-3 h-3 rounded-full bg-white shadow-[0_0_12px_3px_#38bdf8,0_0_20px_6px_#3b82f6] flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-100" />
        </div>

        {/* Orbiting Stardust Spark */}
        <div className="absolute w-6 h-6 rounded-full animate-[spin_10s_linear_infinite] pointer-events-none">
          <div className="w-1 h-1 rounded-full bg-cyan-200 shadow-[0_0_6px_#fff]" />
        </div>

        {/* Arrival Shockwave Ring */}
        <div
          ref={shockwave2Ref}
          className="absolute w-16 h-16 rounded-full border-2 border-cyan-400/80 pointer-events-none opacity-0 scale-0 transition-transform duration-700"
        />
      </div>
    </div>
  );
}

