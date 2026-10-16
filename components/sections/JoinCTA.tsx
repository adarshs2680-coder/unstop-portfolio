"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Zap } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const perks = [
  "Open to All Branches & Years",
  "Mock Drives & Resume Audits",
  "Direct Senior & Industry Mentorship",
];

export default function JoinCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-15%" });

  useGSAP(
    () => {
      // Giant BG text scale-in
      gsap.fromTo(
        ".cta-bg-word",
        { scale: 0.7, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 2.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  const fadeUp = (delay: number) => ({
    hidden: { opacity: 0, y: 55 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay,
        duration: 0.9,
        ease: "easeOut" as const,
      },
    },
  });

  return (
    <section
      id="join"
      ref={sectionRef}
      className="cta-section-inner relative py-48 px-6 overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-violet-950/12 to-[#050505] pointer-events-none" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(124,58,237,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,.6) 1px, transparent 1px)",
          backgroundSize: "65px 65px",
        }}
      />

      {/* Glowing orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-violet-600/6 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-blue-600/8 blur-[80px] pointer-events-none" />

      {/* Giant BG text */}
      <div className="cta-bg-word absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="text-[22vw] font-black text-white/[0.018] whitespace-nowrap leading-none">
          JOIN US
        </span>
      </div>

      {/* Content */}
      <div className="relative max-w-5xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          variants={fadeUp(0)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="inline-flex items-center gap-2.5 mb-10 px-5 py-2 rounded-full border border-pink-500/25 bg-pink-500/8"
        >
          <Zap size={11} className="text-[#ec4899]" />
          <span className="text-pink-300 text-[10px] tracking-[0.28em] uppercase font-medium">
            Applications Open · 2025–26
          </span>
        </motion.div>

        {/* Headline line 1 */}
        <motion.h2
          variants={fadeUp(0.1)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-[clamp(4rem,12vw,10rem)] font-black text-white leading-none"
        >
          JOIN THE
        </motion.h2>

        {/* Headline line 2 — gradient */}
        <motion.h2
          variants={fadeUp(0.22)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-[clamp(4rem,12vw,10rem)] font-black leading-none mb-14"
          style={{
            background:
              "linear-gradient(135deg, #ec4899 0%, #f9a8d4 50%, #ec4899 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundSize: "200% auto",
          }}
        >
          MOVEMENT.
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp(0.34)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-white/60 text-lg md:text-xl max-w-xl mx-auto mb-14 leading-relaxed"
        >
          Bridge the gap between academic learning and industry expectations.
          Join Unstop Igniters UCEK and accelerate your campus to career transition.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp(0.46)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <motion.a
            href="#"
            className="group flex items-center gap-3 px-10 py-4 rounded-full bg-[#ec4899] text-white font-semibold text-sm tracking-wide hover:bg-[#f472b6] transition-all duration-300"
            whileHover={{
              scale: 1.06,
              boxShadow: "0 24px 60px rgba(236,72,153,0.45)",
            }}
            whileTap={{ scale: 0.97 }}
          >
            Apply to Join
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform duration-300"
            />
          </motion.a>

          <motion.a
            href="#vision-mission"
            className="flex items-center gap-3 px-10 py-4 rounded-full border border-white/10 text-white font-medium text-sm tracking-wide hover:border-pink-500/40 hover:bg-pink-500/5 transition-all duration-300"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Our Mission
          </motion.a>
        </motion.div>

        {/* Perks row */}
        <motion.div
          variants={fadeUp(0.58)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-wrap items-center justify-center gap-6"
        >
          {perks.map((p) => (
            <div key={p} className="flex items-center gap-2 text-white/40 text-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-[#ec4899] flex-shrink-0" />
              {p}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
