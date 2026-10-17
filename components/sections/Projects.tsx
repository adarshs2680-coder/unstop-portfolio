"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Title reveal
      gsap.fromTo(
        ".projects-section .title-char",
        { y: 90, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.03,
          duration: 1.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".projects-section .split-title",
            start: "top 82%",
          },
        }
      );

      // Line
      gsap.fromTo(
        ".projects-section .section-line",
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          duration: 1.4,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: ".projects-section .section-line",
            start: "top 88%",
          },
        }
      );

      // Cards stagger in
      gsap.fromTo(
        ".projects-section .proj-card",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.09,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".projects-section .proj-grid",
            start: "top 78%",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="initiatives"
      ref={sectionRef}
      className="projects-section relative pt-10 pb-28 px-6"
    >
      <div id="projects" className="absolute -top-10" />
      {/* Subtle bg glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_60%,rgba(236,72,153,0.06),transparent)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Label */}
        <div className="flex items-center gap-4 mb-6">
          <div className="section-line h-px bg-[#ec4899] w-12" />
          <span className="text-pink-400 text-[10px] tracking-[0.35em] uppercase font-medium">
            02 / Flagship Programs
          </span>
        </div>

        {/* Title */}
        <div className="overflow-hidden mb-12">
          <div className="split-title flex flex-wrap">
            {"OUR INITIATIVES".split("").map((ch, i) => (
              <span
                key={i}
                className="title-char inline-block text-[clamp(2.75rem,6.5vw,6rem)] font-black text-white tracking-tight leading-none"
                style={{ minWidth: ch === " " ? "1.5rem" : undefined }}
              >
                {ch === " " ? "\u00A0" : ch}
              </span>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="proj-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project) => (
            <motion.article
              key={project.id}
              className="proj-card group relative rounded-2xl border border-white/5 bg-white/[0.02] p-7 overflow-hidden cursor-pointer"
              whileHover={{
                y: -10,
                borderColor: `${project.color}45`,
                transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] },
              }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 30% 30%, ${project.color}12, transparent 65%)`,
                }}
              />

              {/* Accent bar */}
              <div
                className="w-8 h-1 rounded-full mb-6 group-hover:w-20 transition-all duration-500"
                style={{ backgroundColor: project.color }}
              />

              {/* Content */}
              <h3 className="text-white font-bold text-xl mb-3 group-hover:text-white transition-colors">
                {project.title}
              </h3>

              <p className="text-white/45 text-sm leading-relaxed mb-6 group-hover:text-white/65 transition-colors duration-300">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-7">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-full text-[10px] border border-white/5 text-white/35 group-hover:border-white/10 group-hover:text-white/55 transition-all duration-300 tracking-wider uppercase"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Link row */}
              <motion.div
                className="flex items-center gap-2 text-white/25 group-hover:text-white/70 transition-colors duration-300"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-[10px] tracking-[0.2em] uppercase">
                  Explore Initiative
                </span>
                <ArrowUpRight size={12} />
              </motion.div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

