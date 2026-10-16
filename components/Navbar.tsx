"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, ChevronRight, Zap } from "lucide-react";
import { navLinks } from "@/lib/data";

interface NavbarProps {
  isLoaded?: boolean;
}

export default function Navbar({ isLoaded = true }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  // Close when user starts scrolling anywhere
  useEffect(() => {
    let lastY = typeof window !== "undefined" ? window.scrollY : 0;

    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 40);

      // If user scrolls while menu is open, retract vertically back up into logo
      if (isOpen && Math.abs(currentY - lastY) > 6) {
        setIsOpen(false);
      }
      lastY = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  // Close if clicked outside
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Do not render in DOM until loader sequence completes
  if (!isLoaded) return null;

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed top-5 left-5 z-50 pointer-events-none"
    >
      <div
        ref={navRef}
        className="pointer-events-auto flex flex-col items-start"
      >
        {/* ── Logo Trigger Capsule ── */}
        <motion.button
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle vertical navigation menu"
          className={`flex items-center gap-3 p-1.5 pr-4 rounded-2xl md:rounded-full border backdrop-blur-2xl transition-all duration-300 shadow-2xl focus:outline-none select-none ${
            isOpen
              ? "bg-black/95 border-pink-500/50 shadow-pink-950/40 ring-2 ring-pink-500/20"
              : scrolled
              ? "bg-black/85 border-white/10 shadow-black/80"
              : "bg-black/65 border-white/10 hover:border-pink-500/40 hover:bg-black/80"
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.96 }}
        >
          {/* Logo Icon */}
          <div className="relative w-11 h-11 flex-shrink-0 rounded-xl md:rounded-full overflow-hidden border border-white/10 bg-black">
            <Image
              src="/logo.jpg"
              alt="Unstop Igniters Club UCEK"
              fill
              sizes="44px"
              className="object-contain"
              priority
            />
          </div>

          {/* Club Title */}
          <div className="flex flex-col text-left pr-2">
            <div className="flex items-center gap-1.5">
              <span className="text-white font-black text-xs tracking-wider">
                IGNITERS
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#ec4899] animate-pulse" />
            </div>
            <span className="text-[#ec4899] text-[9px] tracking-[0.2em] uppercase font-semibold">
              UCEK · unstop
            </span>
          </div>
        </motion.button>

        {/* ── Vertical Downward Drop Dashboard ── */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="vertical-dropdown"
              initial={{ opacity: 0, y: -16, scale: 0.94, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -14, scale: 0.94, filter: "blur(6px)" }}
              transition={{ type: "spring", stiffness: 360, damping: 28 }}
              style={{ transformOrigin: "top left" }}
              className="mt-2.5 w-64 md:w-72 rounded-3xl border border-pink-500/30 bg-black/95 backdrop-blur-2xl p-3 shadow-2xl shadow-pink-950/40 overflow-hidden"
            >
              {/* Dropdown Header */}
              <div className="flex items-center justify-between px-3 py-2 mb-1 border-b border-white/5">
                <div className="flex items-center gap-1.5 text-[10px] tracking-[0.25em] uppercase font-bold text-pink-400">
                  <Zap size={11} />
                  <span>Navigation</span>
                </div>
                <span className="text-[9px] text-white/30 tracking-wider">UCEK</span>
              </div>

              {/* Vertical Menu Links */}
              <nav className="flex flex-col gap-1 py-1">
                {navLinks.map((link, idx) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * idx, duration: 0.2 }}
                    className="group flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs uppercase tracking-[0.16em] font-medium text-white/70 hover:text-white hover:bg-white/[0.08] hover:border-pink-500/30 border border-transparent transition-all duration-200"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-[#ec4899] group-hover:scale-125 transition-all" />
                      <span>{link.label}</span>
                    </div>
                    <ChevronRight
                      size={13}
                      className="text-white/25 group-hover:text-pink-300 group-hover:translate-x-1 transition-all"
                    />
                  </motion.a>
                ))}
              </nav>

              {/* Divider & Apply Button */}
              <div className="pt-2 mt-1 border-t border-white/10">
                <motion.a
                  href="#join"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl bg-[#ec4899] hover:bg-[#f472b6] text-white text-xs font-bold tracking-[0.16em] uppercase transition-all duration-300 shadow-lg shadow-pink-500/30 group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span>Apply Now</span>
                  <ArrowUpRight
                    size={14}
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  />
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
