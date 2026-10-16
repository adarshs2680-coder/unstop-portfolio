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

export default function About() {
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

      // ── Vision & Mission cards reveal ──
      gsap.fromTo(
        ".about-section .vm-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-section .vm-container",
            start: "top 80%",
          },
        }
      );

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
      className="about-section relative py-32 px-6 overflow-hidden"
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
        <div id="vision-mission" className="vm-container grid lg:grid-cols-2 gap-8 mb-24">
          {/* Vision Card */}
          <div className="vm-card relative rounded-3xl border border-pink-500/25 bg-gradient-to-br from-pink-950/20 via-black to-pink-950/10 p-8 md:p-10 overflow-hidden shadow-2xl shadow-pink-950/30 group hover:border-pink-500/40 transition-all duration-500">
            {/* Glow accent */}
            <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full bg-[#ec4899]/15 blur-3xl pointer-events-none group-hover:bg-[#ec4899]/25 transition-all duration-500" />

            <div className="flex items-center gap-3.5 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-white shadow-lg shadow-pink-500/30 flex-shrink-0">
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

            <p className="text-white/85 text-lg leading-relaxed font-light mb-8">
              &ldquo;To empower every engineering student at{" "}
              <span className="text-white font-semibold">UCEK</span> to become a{" "}
              <span className="text-pink-300 font-medium">confident, competent, and industry ready</span>{" "}
              professional, equipped to excel in placements and thrive in their future careers.&rdquo;
            </p>

            <div className="pt-6 border-t border-white/10 flex flex-wrap gap-4">
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
          <div className="vm-card relative rounded-3xl border border-blue-500/25 bg-gradient-to-br from-blue-950/20 via-black to-blue-950/10 p-8 md:p-10 overflow-hidden shadow-2xl shadow-blue-950/30 group hover:border-blue-500/40 transition-all duration-500">
            {/* Glow accent */}
            <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full bg-blue-500/15 blur-3xl pointer-events-none group-hover:bg-blue-500/25 transition-all duration-500" />

            <div className="flex items-center gap-3.5 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30 flex-shrink-0">
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

            <p className="text-white/80 text-base md:text-lg leading-relaxed font-light mb-4">
              At <span className="text-white font-semibold">Unstop Igniters UCEK</span>, our mission is to
              bridge the gap between academic learning and industry expectations by preparing
              students for successful placements.
            </p>

            <p className="text-white/70 text-sm md:text-base leading-relaxed font-light mb-8">
              We strive to enhance employability through{" "}
              <span className="text-blue-300 font-normal">structured placement training, soft skill development, aptitude preparation, resume building, interview guidance, and industry exposure</span>.
              Through collaborative learning and continuous skill development, we aim to help students unlock their potential and confidently navigate the transition from campus to career.
            </p>

            <div className="pt-6 border-t border-white/10 flex flex-wrap gap-4">
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

        {/* ─── Core Placement Pillars ─── */}
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

        {/* ─── Statistics & Impact ─── */}
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
      </div>
    </section>
  );
}
