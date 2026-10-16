"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { members } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export default function Members() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Title reveal
      gsap.fromTo(
        ".members-section .title-char",
        { y: 90, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.03,
          duration: 1.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".members-section .split-title",
            start: "top 82%",
          },
        }
      );

      // Line
      gsap.fromTo(
        ".members-section .section-line",
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          duration: 1.4,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: ".members-section .section-line",
            start: "top 88%",
          },
        }
      );

      // Horizontal scroll pin
      const track = trackRef.current;
      if (!track || !sectionRef.current) return;

      const totalWidth = track.scrollWidth - sectionRef.current.offsetWidth;

      gsap.to(track, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: ".members-pin-wrapper",
          start: "top top",
          end: () => `+=${totalWidth}`,
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="members"
      ref={sectionRef}
      className="members-section relative overflow-hidden"
    >
      {/* Section header — outside the pin wrapper so it scrolls normally */}
      <div className="py-36 px-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <div className="section-line h-px bg-[#ec4899] w-12" />
          <span className="text-pink-400 text-[10px] tracking-[0.35em] uppercase font-medium">
            03 / Members
          </span>
        </div>

        <div className="overflow-hidden">
          <div className="split-title flex flex-wrap">
            {"OUR MEMBERS".split("").map((ch, i) => (
              <span
                key={i}
                className="title-char inline-block text-[clamp(3rem,7vw,7rem)] font-black text-white tracking-tight leading-none"
                style={{ minWidth: ch === " " ? "1.5rem" : undefined }}
              >
                {ch === " " ? "\u00A0" : ch}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Pinned horizontal scroll container ── */}
      <div className="members-pin-wrapper h-screen flex items-center overflow-hidden">
        {/* Gradient masks on edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-[#050505] to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-[#050505] to-transparent pointer-events-none" />

        {/* Scrolling track */}
        <div ref={trackRef} className="flex gap-6 px-12 w-max will-change-transform">
          {members.map((member) => (
            <motion.div
              key={member.id}
              className="relative w-72 flex-shrink-0 rounded-3xl border border-white/5 bg-white/[0.025] p-8 group cursor-pointer overflow-hidden"
              whileHover={{
                scale: 1.04,
                borderColor: `${member.color}45`,
                transition: { duration: 0.3 },
              }}
            >
              {/* Hover bg glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at top left, ${member.color}18, transparent 55%)`,
                }}
              />

              {/* Avatar */}
              <div
                className="relative w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-black mb-7 group-hover:scale-110 transition-transform duration-400"
                style={{
                  backgroundColor: `${member.color}18`,
                  border: `1px solid ${member.color}40`,
                }}
              >
                <span style={{ color: member.color }}>{member.initials}</span>
              </div>

              {/* Info */}
              <h3 className="text-white font-bold text-lg mb-1">{member.name}</h3>
              <p
                className="text-xs tracking-[0.2em] uppercase font-medium mb-1"
                style={{ color: member.color }}
              >
                {member.role}
              </p>
              <p className="text-white/25 text-xs mt-0.5">{member.year}</p>

              {/* Accent line */}
              <div
                className="mt-7 h-px w-8 group-hover:w-full transition-all duration-500 ease-out"
                style={{ backgroundColor: member.color }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

