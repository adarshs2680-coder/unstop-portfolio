"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import gsap from "gsap";
import dynamic from "next/dynamic";

// Load Three.js scene only on the client
const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
});

const words = ["WE LEARN.", "WE PREPARE.", "WE EXCEL."];

/* Split a word into animated character spans */
function SplitWord({
  word,
  className,
}: {
  word: string;
  className?: string;
}) {
  return (
    <div className="overflow-hidden">
      <div className="flex items-center justify-center flex-wrap">
        {word.split("").map((ch, i) => (
          <span
            key={i}
            className={`char inline-block ${className ?? ""}`}
            style={{ whiteSpace: ch === " " ? "pre" : undefined }}
          >
            {ch === " " ? "\u00A0" : ch}
          </span>
        ))}
      </div>
    </div>
  );
}

interface HeroProps {
  isLoaded?: boolean;
}

export default function Hero({ isLoaded = false }: HeroProps) {
  const textRef = useRef<HTMLDivElement>(null);

  // Animate headline characters only after the loader completes
  useEffect(() => {
    if (!textRef.current || !isLoaded) return;

    const chars =
      textRef.current.querySelectorAll<HTMLElement>(".char");

    const animation = gsap.fromTo(
      chars,
      { y: 110, opacity: 0, rotateX: -80 },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        stagger: 0.025,
        duration: 1.1,
        ease: "power4.out",
        delay: 0.15,
      }
    );

    return () => {
      animation.kill();
    };
  }, [isLoaded]);

  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Three.js Background */}
      <div className="absolute inset-0 z-0">
        <HeroScene />
      </div>

      {/* Radial vignette and bottom fade */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-10%,rgba(124,58,237,0.08),transparent)]" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#050505] to-transparent" />
      </div>

      {/* Hero content: hidden until the loader completes */}
      <motion.div
        initial={false}
        animate={{
          opacity: isLoaded ? 1 : 0,
          visibility: isLoaded ? "visible" : "hidden",
        }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="relative z-20 text-center px-6 max-w-6xl mx-auto"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={
            isLoaded
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 24 }
          }
          transition={{ delay: 0.2, duration: 0.7 }}
          className="inline-flex items-center gap-2.5 mb-10 px-4 py-2 rounded-full border border-pink-500/25 bg-pink-500/8 backdrop-blur-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#ec4899] animate-pulse" />
          <span className="text-pink-300 text-xs tracking-[0.25em] uppercase font-medium">
            Unstop Igniters Club · UCEK
          </span>
        </motion.div>

        {/* Animated headline */}
        <div
          ref={textRef}
          className="space-y-1"
          style={{ perspective: "1200px" }}
        >
          {words.map((word, wi) => (
            <SplitWord
              key={wi}
              word={word}
              className="text-[clamp(3rem,9vw,8rem)] font-black text-white tracking-tight leading-none"
            />
          ))}
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={
            isLoaded
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 20 }
          }
          transition={{ delay: 1.0, duration: 0.8 }}
          className="mt-10 text-white/50 text-sm md:text-base tracking-[0.28em] uppercase max-w-2xl mx-auto"
        >
          From Campus to Career · Bridging Academic Learning & Industry Placements
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={
            isLoaded
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 20 }
          }
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#about"
            className="px-8 py-3.5 rounded-full bg-white text-black text-sm font-bold tracking-wide hover:bg-[#ec4899] hover:text-white transition-all duration-300 shadow-xl shadow-white/10"
          >
            Explore Vision
          </a>

          <a
            href="#initiatives"
            className="px-8 py-3.5 rounded-full border border-white/15 text-white text-sm font-medium tracking-wide hover:border-pink-500/50 hover:bg-pink-500/10 transition-all duration-300"
          >
            Our Initiatives
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={false}
        animate={{
          opacity: isLoaded ? 1 : 0,
          visibility: isLoaded ? "visible" : "hidden",
        }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-white/25 text-[10px] tracking-[0.4em] uppercase">
          Scroll
        </span>

        <motion.div
          animate={isLoaded ? { y: [0, 7, 0] } : { y: 0 }}
          transition={{
            duration: 1.6,
            repeat: isLoaded ? Infinity : 0,
            ease: "easeInOut",
          }}
        >
          <ArrowDown size={14} className="text-white/25" />
        </motion.div>
      </motion.div>
    </section>
  );
}