"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import {
  Compass,
  Target,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  GraduationCap,
  Briefcase,
  TrendingUp,
} from "lucide-react";
import { stats, pillars } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

/* Reusable split-title renderer */
function SectionTitle({ text, className }: { text: string; className?: string }) {
  return (
    <div className={`overflow-hidden ${className ?? ""}`}>
      <div className="split-title flex flex-wrap">
        {text.split("").map((ch, i) => (
          <span
            key={i}
            className="title-char inline-block text-[clamp(2.75rem,6.5vw,6rem)] font-black text-white tracking-tight leading-none"
            style={{ minWidth: ch === " " ? "1.25rem" : undefined }}
          >
            {ch === " " ? "\u00A0" : ch}
          </span>
        ))}
      </div>
    </div>
  );
}

interface AboutProps {
  starsAligned?: boolean;
}

export default function About({ starsAligned = false }: AboutProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // ── Title char reveal ──
      gsap.fromTo(
        ".about-section .title-char",
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.025,
          duration: 1.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".about-section .split-title",
            start: "top 85%",
          },
        }
      );

      // ── Line grow ──
      gsap.fromTo(
        ".about-section .section-line",
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          duration: 1.4,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: ".about-section .section-line",
            start: "top 88%",
          },
        }
      );

      // ── Vision & Mission cards reveal is driven exclusively when the stars align! ──

      // ── Pillars stagger ──
      gsap.fromTo(
        ".about-section .pillar-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".about-section .pillars-grid",
            start: "top 80%",
          },
        }
      );

      // ── Stat cards ──
      gsap.fromTo(
        ".about-section .stat-card",
        { y: 40, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: ".about-section .stats-grid",
            start: "top 85%",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      className="about-section relative pt-24 pb-10 px-6 overflow-hidden"
    >
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#09050e] to-[#050505] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-pink-500/5 blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Label row */}
        <div className="flex items-center gap-4 mb-6">
          <div className="section-line h-px bg-[#ec4899] w-12" />
          <span className="text-pink-400 text-[10px] tracking-[0.35em] uppercase font-semibold">
            01 / Campus to Career
          </span>
        </div>

        <SectionTitle text="ABOUT THE CLUB" className="mb-6" />

        <p className="text-white/60 text-lg md:text-xl max-w-3xl leading-relaxed mb-16">
          <span className="text-white font-semibold">Unstop Igniters Club UCEK</span>{" "}
          is a student-led career development and placement preparation initiative.
          We combine tech expertise with real-world recruitment readiness to guide
          engineering students into top-tier internships and placement offers.
        </p>

        {/* ─── Vision & Mission Dual Cards ─── */}
        {/* ─── Vision & Mission Dual Cards (Water Surface Ripple Reveal) ─── */}
        <div id="vision-mission" className="vm-container grid lg:grid-cols-2 gap-8 mb-24">
          {/* Vision Card */}
          <div
            id="vision-card"
            style={{
              clipPath: starsAligned
                ? "circle(220% at var(--rx, 56px) var(--ry, 56px))"
                : "circle(0% at var(--rx, 56px) var(--ry, 56px))",
              WebkitClipPath: starsAligned
                ? "circle(220% at var(--rx, 56px) var(--ry, 56px))"
                : "circle(0% at var(--rx, 56px) var(--ry, 56px))",
              transition:
                "clip-path 1.35s cubic-bezier(0.16, 1, 0.3, 1), -webkit-clip-path 1.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease-out, border-color 0.8s ease-out, box-shadow 0.8s ease-out",
            }}
            className={`vm-card relative rounded-3xl border p-8 md:p-10 overflow-hidden shadow-2xl group hover:border-pink-500/50 [--rx:56px] [--ry:56px] md:[--rx:64px] md:[--ry:64px] ${
              starsAligned
                ? "opacity-100 animate-water-surface border-pink-500/40 bg-gradient-to-br from-pink-950/25 via-[#070208] to-black shadow-[0_12px_60px_-10px_rgba(236,72,153,0.3)] pointer-events-auto"
                : "opacity-0 border-pink-500/10 shadow-none pointer-events-none"
            }`}
          >
            {/* ── Water Droplet Concentric Wave Ripples ── */}
            <div className="absolute top-8 left-8 md:top-10 md:left-10 w-12 h-12 pointer-events-none z-10 flex items-center justify-center">
              {starsAligned && (
                <>
                  <span className="water-droplet-crown bg-pink-400/30" />
                  <span className="water-wave-ring water-wave-1 border-pink-300" />
                  <span className="water-wave-ring water-wave-2 border-pink-400/80" />
                  <span className="water-wave-ring water-wave-3 border-pink-500/60" />
                  <span className="water-wave-ring water-wave-4 border-rose-400/40" />
                </>
              )}
            </div>

            {/* Water Caustic Light Wave */}
            <div
              className={`absolute inset-0 bg-gradient-to-r from-transparent via-pink-400/10 to-transparent pointer-events-none transition-transform duration-1000 ease-out ${
                starsAligned ? "translate-x-full" : "-translate-x-full"
              }`}
            />

            {/* Top light beam accent */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-400/60 to-transparent pointer-events-none" />

            {/* Glow accent */}
            <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full bg-[#ec4899]/15 blur-3xl pointer-events-none group-hover:bg-[#ec4899]/25 transition-all duration-500" />

            <div className="flex items-center gap-3.5 mb-6 relative z-10">
              <div
                id="vision-star-target"
                className={`w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-white flex-shrink-0 relative transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  starsAligned
                    ? "shadow-[0_0_28px_rgba(236,72,153,0.7)] scale-100 animate-water-plunge"
                    : "shadow-none scale-90"
                }`}
              >
                <Target size={24} />
              </div>
              <div>
                <span className="text-pink-400 text-[10px] tracking-[0.25em] uppercase font-bold">
                  Destination & Horizon
                </span>
                <h3 className="text-white font-black text-2xl md:text-3xl tracking-tight">
                  Our Vision
                </h3>
              </div>
            </div>

            <p className="text-white/85 text-lg leading-relaxed font-light mb-8 relative z-10">
              &ldquo;To empower every engineering student at{" "}
              <span className="text-white font-semibold">UCEK</span> to become a{" "}
              <span className="text-pink-300 font-medium">confident, competent, and industry ready</span>{" "}
              professional, equipped to excel in placements and thrive in their future careers.&rdquo;
            </p>

            <div className="pt-6 border-t border-white/10 flex flex-wrap gap-4 relative z-10">
              <div className="inline-flex items-center gap-2 text-xs text-pink-300 font-medium bg-pink-500/10 border border-pink-500/20 px-3.5 py-1.5 rounded-full">
                <GraduationCap size={14} />
                <span>Industry Ready</span>
              </div>
              <div className="inline-flex items-center gap-2 text-xs text-pink-300 font-medium bg-pink-500/10 border border-pink-500/20 px-3.5 py-1.5 rounded-full">
                <TrendingUp size={14} />
                <span>Placement Excellence</span>
              </div>
            </div>
          </div>

          {/* Mission Card */}
          <div
            id="mission-card"
            style={{
              clipPath: starsAligned
                ? "circle(220% at var(--rx, 56px) var(--ry, 56px))"
                : "circle(0% at var(--rx, 56px) var(--ry, 56px))",
              WebkitClipPath: starsAligned
                ? "circle(220% at var(--rx, 56px) var(--ry, 56px))"
                : "circle(0% at var(--rx, 56px) var(--ry, 56px))",
              transition:
                "clip-path 1.35s cubic-bezier(0.16, 1, 0.3, 1) 0.08s, -webkit-clip-path 1.35s cubic-bezier(0.16, 1, 0.3, 1) 0.08s, opacity 0.5s ease-out 0.08s, border-color 0.8s ease-out, box-shadow 0.8s ease-out",
            }}
            className={`vm-card relative rounded-3xl border p-8 md:p-10 overflow-hidden shadow-2xl group hover:border-blue-500/50 [--rx:56px] [--ry:56px] md:[--rx:64px] md:[--ry:64px] ${
              starsAligned
                ? "opacity-100 animate-water-surface border-blue-500/40 bg-gradient-to-br from-blue-950/25 via-[#02050e] to-black shadow-[0_12px_60px_-10px_rgba(59,130,246,0.3)] pointer-events-auto"
                : "opacity-0 border-blue-500/10 shadow-none pointer-events-none"
            }`}
          >
            {/* ── Water Droplet Concentric Wave Ripples ── */}
            <div className="absolute top-8 left-8 md:top-10 md:left-10 w-12 h-12 pointer-events-none z-10 flex items-center justify-center">
              {starsAligned && (
                <>
                  <span className="water-droplet-crown bg-cyan-400/30" />
                  <span className="water-wave-ring water-wave-1 border-cyan-300" />
                  <span className="water-wave-ring water-wave-2 border-blue-400/80" />
                  <span className="water-wave-ring water-wave-3 border-blue-500/60" />
                  <span className="water-wave-ring water-wave-4 border-indigo-400/40" />
                </>
              )}
            </div>

            {/* Water Caustic Light Wave */}
            <div
              className={`absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent pointer-events-none transition-transform duration-1000 ease-out ${
                starsAligned ? "translate-x-full" : "-translate-x-full"
              }`}
            />

            {/* Top light beam accent */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent pointer-events-none" />

            {/* Glow accent */}
            <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full bg-blue-500/15 blur-3xl pointer-events-none group-hover:bg-blue-500/25 transition-all duration-500" />

            <div className="flex items-center gap-3.5 mb-6 relative z-10">
              <div
                id="mission-star-target"
                className={`w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white flex-shrink-0 relative transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  starsAligned
                    ? "shadow-[0_0_28px_rgba(59,130,246,0.7)] scale-100 animate-water-plunge"
                    : "shadow-none scale-90"
                }`}
              >
                <Compass size={24} />
              </div>
              <div>
                <span className="text-blue-400 text-[10px] tracking-[0.25em] uppercase font-bold">
                  Roadmap & Action
                </span>
                <h3 className="text-white font-black text-2xl md:text-3xl tracking-tight">
                  Our Mission
                </h3>
              </div>
            </div>

            <p className="text-white/80 text-base md:text-lg leading-relaxed font-light mb-4 relative z-10">
              At <span className="text-white font-semibold">Unstop Igniters UCEK</span>, our mission is to
              bridge the gap between academic learning and industry expectations by preparing
              students for successful placements.
            </p>

            <p className="text-white/70 text-sm md:text-base leading-relaxed font-light mb-8 relative z-10">
              We strive to enhance employability through{" "}
              <span className="text-blue-300 font-normal">structured placement training, soft skill development, aptitude preparation, resume building, interview guidance, and industry exposure</span>.
              Through collaborative learning and continuous skill development, we aim to help students unlock their potential and confidently navigate the transition from campus to career.
            </p>

            <div className="pt-6 border-t border-white/10 flex flex-wrap gap-4 relative z-10">
              <div className="inline-flex items-center gap-2 text-xs text-blue-300 font-medium bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 rounded-full">
                <Briefcase size={14} />
                <span>Employability First</span>
              </div>
              <div className="inline-flex items-center gap-2 text-xs text-blue-300 font-medium bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 rounded-full">
                <Sparkles size={14} />
                <span>Campus to Career</span>
              </div>
            </div>
          </div>
        </div>
        {/*
        {/* ─── Core Placement Pillars ─── 
        <div className="mb-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-[#ec4899] text-xs font-bold uppercase tracking-[0.25em] block mb-2">
                What We Focus On
              </span>
              <h3 className="text-white font-black text-3xl md:text-4xl tracking-tight">
                Our 6 Employability Pillars
              </h3>
            </div>
            <p className="text-white/40 text-sm max-w-md">
              Everything required to conquer on-campus recruitment and off-campus opportunities in one cohesive club ecosystem.
            </p>
          </div>

          <div className="pillars-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {pillars.map((pillar, idx) => (
              <motion.div
                key={pillar.title}
                whileHover={{ y: -6, borderColor: "rgba(236,72,153,0.4)" }}
                transition={{ duration: 0.3 }}
                className="pillar-card group rounded-2xl border border-white/5 bg-white/[0.02] p-7 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-7 h-7 rounded-lg bg-pink-500/10 border border-pink-500/20 text-[#ec4899] flex items-center justify-center text-xs font-bold">
                    0{idx + 1}
                  </span>
                  <h4 className="text-white font-bold text-lg group-hover:text-pink-300 transition-colors">
                    {pillar.title}
                  </h4>
                </div>
                <p className="text-white/50 text-sm leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
         
        {/* ─── Statistics & Impact ─── 
        <div className="stats-grid grid grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((s) => (
            <div
              key={s.label}
              className="stat-card group p-7 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-pink-500/30 hover:bg-pink-500/5 transition-all duration-500"
            >
              <div className="text-4xl md:text-5xl font-black text-white mb-2 group-hover:text-[#ec4899] transition-colors">
                {s.value}
              </div>
              <div className="text-white/40 text-xs tracking-[0.2em] uppercase font-semibold">
                {s.label}
              </div>
            </div>
          ))}
        </div>
         */}
      </div>
    </section>
  );
}
