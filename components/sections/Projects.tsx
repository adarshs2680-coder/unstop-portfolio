"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Calendar,
  Clock,
  Users,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Sparkles,
  RotateCw,
  RotateCcw,
  Image as ImageIcon,
  FileText,
  Video,
} from "lucide-react";
import {
  fallbackEvents,
  ClubEvent,
  getPosterImageUrl,
  getPosterCdnUrl,
} from "@/lib/events";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [events, setEvents] = useState<ClubEvent[]>(fallbackEvents);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  // Fetch live events from API route (Google Sheets CSV sync)
  useEffect(() => {
    let isSubscribed = true;
    async function loadEvents() {
      try {
        const res = await fetch("/api/events");
        if (!res.ok) return;
        const data = await res.json();
        if (isSubscribed && data.events && data.events.length > 0) {
          setEvents(data.events);
        }
      } catch {
        // Fallback already populated
      }
    }
    loadEvents();
    return () => {
      isSubscribed = false;
    };
  }, []);

  // Preload all poster images into browser cache for instant display
  useEffect(() => {
    events.forEach((ev) => {
      if (ev.posterFileId) {
        const localUrl = getPosterImageUrl(ev.posterFileId);
        if (localUrl) {
          const img = new Image();
          img.src = localUrl;
        }
      }
    });
  }, [events]);

  // GSAP Title reveal
  useGSAP(
    () => {
      gsap.fromTo(
        ".projects-section .title-char",
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.025,
          duration: 1.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".projects-section .split-title",
            start: "top 85%",
          },
        }
      );

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
    },
    { scope: sectionRef }
  );

  // Carousel navigation
  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % events.length);
  }, [events.length]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + events.length) % events.length);
  }, [events.length]);

  // Choreographed carousel cycle:
  // 1. Next card slides in & settles (front-facing)
  // 2. Card flips to show poster (750ms)
  // 3. Poster is displayed for ~2700ms (30% decrease from 3900ms)
  // 4. Card smoothly rotates back to front face (3450ms)
  // 5. Next card glides in smoothly (4150ms)
  useEffect(() => {
    const currentEvent = events[activeIndex];
    if (!currentEvent) return;

    // Reset flips of non-active cards so incoming card is front-facing
    setFlippedCards((prev) => {
      const next: Record<number, boolean> = {};
      if (prev[currentEvent.id]) {
        next[currentEvent.id] = false;
      }
      return next;
    });

    if (!isPlaying || isHovered) return;

    // Step 2: Auto-flip to show poster after card settles at center
    const flipToPosterTimer = setTimeout(() => {
      setFlippedCards((prev) => ({
        ...prev,
        [currentEvent.id]: true,
      }));
    }, 750);

    // Step 4: Auto-flip back to front face (poster shows for 2700ms: 750ms -> 3450ms)
    const flipBackTimer = setTimeout(() => {
      setFlippedCards((prev) => ({
        ...prev,
        [currentEvent.id]: false,
      }));
    }, 3450);

    // Step 5: Advance carousel smoothly after flip back completes (3450ms + 700ms = 4150ms)
    const advanceTimer = setTimeout(() => {
      nextSlide();
    }, 4150);

    return () => {
      clearTimeout(flipToPosterTimer);
      clearTimeout(flipBackTimer);
      clearTimeout(advanceTimer);
    };
  }, [activeIndex, events, isPlaying, isHovered, nextSlide]);

  const toggleFlip = (eventId: number) => {
    setFlippedCards((prev) => ({
      ...prev,
      [eventId]: !prev[eventId],
    }));
  };

  return (
    <section
      id="initiatives"
      ref={sectionRef}
      className="projects-section relative pt-8 pb-24 px-4 md:px-8 overflow-hidden"
    >
      <div id="projects" className="absolute -top-10" />

      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(236,72,153,0.06),transparent)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="section-line h-px bg-[#ec4899] w-12" />
              <span className="text-pink-400 text-[10px] tracking-[0.35em] uppercase font-semibold">
                02 / Official Initiatives & Events
              </span>
            </div>

            <div className="overflow-hidden">
              <div className="split-title flex flex-wrap">
                {"OUR INITIATIVES".split("").map((ch, i) => (
                  <span
                    key={i}
                    className="title-char inline-block text-[clamp(2.5rem,6vw,5.5rem)] font-black text-white tracking-tight leading-none"
                    style={{ minWidth: ch === " " ? "1.25rem" : undefined }}
                  >
                    {ch === " " ? "\u00A0" : ch}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Carousel Controls */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 p-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
              <button
                onClick={prevSlide}
                className="w-8 h-8 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Previous Event"
              >
                <ChevronLeft size={16} />
              </button>

              <button
                onClick={() => setIsPlaying((p) => !p)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-pink-400 hover:text-pink-300 hover:bg-pink-500/15 transition-colors"
                aria-label={isPlaying ? "Pause Carousel" : "Play Carousel"}
              >
                {isPlaying ? <Pause size={14} /> : <Play size={14} />}
              </button>

              <button
                onClick={nextSlide}
                className="w-8 h-8 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Next Event"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* ═════════════════════════════════════════════════════════════════════ */}
        {/* RECTANGULAR CONTAINER: Left to Right Carousel with Center Highlight */}
        {/* ═════════════════════════════════════════════════════════════════════ */}
        <div
          ref={containerRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative w-full rounded-3xl border border-white/10 bg-[#07070b]/90 backdrop-blur-2xl py-10 md:py-14 overflow-hidden shadow-2xl shadow-black/80"
        >
          {/* Subtle Top Glass Border Accent */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-500/40 to-transparent pointer-events-none" />

          {/* Left & Right Edge Vignette Fades */}
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-36 bg-gradient-to-r from-[#07070b] via-[#07070b]/80 to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-36 bg-gradient-to-l from-[#07070b] via-[#07070b]/80 to-transparent z-20 pointer-events-none" />

          {/* Carousel Viewport with 3D Perspective */}
          <div
            className="relative h-[430px] md:h-[470px] flex items-center justify-center select-none"
            style={{ perspective: 1400 }}
          >
            {events.map((event, index) => {
              // Calculate circular distance from activeIndex
              let offset = index - activeIndex;
              const total = events.length;

              // Wrap offset to keep nearest neighbors around center
              if (offset > total / 2) offset -= total;
              if (offset < -total / 2) offset += total;

              const isCenter = offset === 0;
              const isAdjacent = Math.abs(offset) === 1;
              const isVisible = Math.abs(offset) <= 3;

              if (!isVisible) return null;

              // Visual coordinates based on offset
              const xOffset = offset * 340;
              const zOffset = isCenter ? 60 : -Math.abs(offset) * 80;
              const rotateY = isCenter ? 0 : offset > 0 ? -12 : 12;
              const scale = isCenter ? 1.05 : isAdjacent ? 0.88 : 0.76;
              const opacity = isCenter ? 1 : isAdjacent ? 0.45 : 0.18;
              const zIndex = 30 - Math.abs(offset) * 5;

              const isFlipped = isCenter && !!flippedCards[event.id];
              const posterImageUrl = getPosterImageUrl(event.posterFileId);

              return (
                <motion.div
                  key={event.id}
                  onClick={() => {
                    if (isCenter) {
                      toggleFlip(event.id);
                    } else {
                      setActiveIndex(index);
                    }
                  }}
                  animate={{
                    x: xOffset,
                    z: zOffset,
                    scale,
                    rotateY,
                    opacity,
                  }}
                  transition={{
                    duration: 0.85,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{
                    zIndex,
                    position: "absolute",
                    transformStyle: "preserve-3d",
                  }}
                  className="w-[300px] md:w-[350px] h-[390px] md:h-[430px] cursor-pointer"
                >
                  {/* Active Center Spotlight Badge */}
                  {isCenter && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-30 px-3 py-1 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 text-white text-[9px] font-mono font-bold tracking-[0.2em] uppercase shadow-lg shadow-pink-500/40 flex items-center gap-1.5 whitespace-nowrap">
                      <Sparkles size={11} className="animate-spin" />
                      FEATURED EVENT
                    </div>
                  )}

                  {/* ═════════════════════════════════════════════════════ */}
                  {/* 3D FLIPPABLE CONTAINER                              */}
                  {/* ═════════════════════════════════════════════════════ */}
                  <div
                    className="relative w-full h-full"
                    style={{
                      transformStyle: "preserve-3d",
                      transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                      transition: "transform 0.65s cubic-bezier(0.25, 1, 0.5, 1)",
                      willChange: "transform",
                    }}
                  >
                    {/* ───────────────────────────────────────────────── */}
                    {/* FRONT FACE: Event Details                         */}
                    {/* ───────────────────────────────────────────────── */}
                    <div
                      style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                      }}
                      className={`absolute inset-0 w-full h-full rounded-3xl p-6 md:p-7 flex flex-col justify-between transition-colors duration-500 ${
                        isCenter
                          ? "border-2 border-pink-500/70 bg-gradient-to-b from-pink-950/30 via-[#0e0712] to-[#060408] shadow-[0_0_50px_rgba(236,72,153,0.35)]"
                          : "border border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
                      }`}
                    >
                      {/* Card Top: Category & Mode */}
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-4">
                          <span
                            className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase border"
                            style={{
                              borderColor: `${event.color}40`,
                              backgroundColor: `${event.color}15`,
                              color: event.color,
                            }}
                          >
                            {event.category}
                          </span>

                          <div className="flex items-center gap-1 text-[11px] font-mono text-white/50">
                            <MapPin size={11} className="text-pink-400" />
                            <span>{event.mode}</span>
                          </div>
                        </div>

                        {/* Event Title */}
                        <h3
                          className={`font-black text-xl md:text-2xl leading-snug line-clamp-2 mb-3 transition-colors ${
                            isCenter ? "text-white" : "text-white/80"
                          }`}
                        >
                          {event.title}
                        </h3>

                        {/* Event Description */}
                        <p className="text-white/55 text-xs md:text-sm leading-relaxed line-clamp-3">
                          {event.description}
                        </p>
                      </div>

                      {/* Card Middle: Metadata Badges */}
                      <div className="pt-4 border-t border-white/10 space-y-2.5">
                        <div className="flex items-center justify-between text-xs text-white/70">
                          <div className="flex items-center gap-1.5">
                            <Calendar size={13} className="text-pink-400" />
                            <span className="font-mono text-[11px]">{event.date}</span>
                          </div>

                          {event.duration && (
                            <div className="flex items-center gap-1.5">
                              <Clock size={13} className="text-amber-400" />
                              <span className="text-[11px]">{event.duration}</span>
                            </div>
                          )}
                        </div>

                        {event.participants && (
                          <div className="flex items-center gap-1.5 text-xs text-white/60">
                            <Users size={13} className="text-blue-400" />
                            <span className="text-[11px]">
                              <strong className="text-white">{event.participants}</strong>{" "}
                              Participants
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Card Bottom: Interactive Flip Prompt */}
                      {isCenter && (
                        <div className="pt-3">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFlip(event.id);
                            }}
                            className="w-full py-2 px-3 rounded-xl border border-pink-500/30 bg-pink-500/10 hover:bg-pink-500/20 text-pink-300 text-xs font-semibold flex items-center justify-center gap-2 transition-all duration-300 shadow-sm shadow-pink-900/20 group"
                          >
                            <RotateCw
                              size={13}
                              className="group-hover:rotate-180 transition-transform duration-500 text-pink-400"
                            />
                            <span>Click to Flip & View Poster</span>
                          </button>
                        </div>
                      )}
                    </div>

                    {/* ───────────────────────────────────────────────── */}
                    {/* BACK FACE: Official Poster / Creative Showcase     */}
                    {/* ───────────────────────────────────────────────── */}
                    <div
                      style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                      }}
                      className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden border-2 border-pink-500/70 bg-[#0a050f] shadow-[0_0_50px_rgba(236,72,153,0.35)] flex flex-col justify-between"
                    >
                      {posterImageUrl ? (
                        /* Case A: Event has official Poster file from Drive */
                        <div className="relative w-full h-full flex flex-col justify-between">
                          {/* Full Poster Image with smooth cover */}
                          <div className="absolute inset-0 z-0 bg-neutral-950">
                            <img
                              src={posterImageUrl}
                              alt={`${event.title} Poster`}
                              decoding="async"
                              onError={(e) => {
                                const target = e.currentTarget;
                                if (!target.dataset.fallback) {
                                  target.dataset.fallback = "true";
                                  const fallback = getPosterCdnUrl(event.posterFileId);
                                  if (fallback) target.src = fallback;
                                }
                              }}
                              className="w-full h-full object-cover object-center transition-opacity duration-300"
                            />
                            {/* Gradient overlays to guarantee readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#07040a] via-[#07040a]/40 to-black/60 pointer-events-none" />
                          </div>

                          {/* Top Controls on Back Face */}
                          <div className="relative z-10 p-4 flex items-center justify-between">
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center gap-1.5">
                              <ImageIcon size={12} className="text-pink-400" />
                              Official Poster
                            </span>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFlip(event.id);
                              }}
                              className="px-2.5 py-1 rounded-full bg-pink-500/80 hover:bg-pink-500 text-white text-[11px] font-semibold flex items-center gap-1.5 backdrop-blur-md transition-colors shadow-md"
                              aria-label="Flip back to details"
                            >
                              <RotateCcw size={12} />
                              <span>Details</span>
                            </button>
                          </div>

                          {/* Bottom Details & Links on Back Face */}
                          <div className="relative z-10 p-5 space-y-3 bg-gradient-to-t from-black/95 via-black/80 to-transparent pt-8">
                            <div>
                              <h4 className="text-white font-bold text-base leading-tight line-clamp-1">
                                {event.title}
                              </h4>
                              <p className="text-white/60 text-[11px] font-mono mt-0.5">
                                {event.date} · {event.mode}
                              </p>
                            </div>

                            {event.reelUrl && (
                              <div className="flex items-center">
                                <a
                                  href={event.reelUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="py-1.5 px-3 rounded-lg bg-pink-500/20 hover:bg-pink-500/30 border border-pink-500/40 text-pink-300 text-[11px] font-medium flex items-center justify-center gap-1.5 transition-colors"
                                >
                                  <Video size={12} />
                                  <span>Reel</span>
                                </a>
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        /* Case B: Event without direct Drive poster thumbnail (Orientation / Archive) */
                        <div className="relative w-full h-full p-6 flex flex-col justify-between bg-gradient-to-br from-[#1b0b23] via-[#0d0615] to-[#050308]">
                          {/* Ambient glow in background */}
                          <div
                            className="absolute inset-0 opacity-20 pointer-events-none"
                            style={{
                              background: `radial-gradient(circle at 50% 40%, ${event.color}, transparent 70%)`,
                            }}
                          />

                          {/* Top bar */}
                          <div className="relative z-10 flex items-center justify-between">
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-white/10 border border-white/15 text-pink-300">
                              Official Initiative
                            </span>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFlip(event.id);
                              }}
                              className="px-2.5 py-1 rounded-full bg-pink-500/80 hover:bg-pink-500 text-white text-[11px] font-semibold flex items-center gap-1.5 backdrop-blur-md transition-colors"
                            >
                              <RotateCcw size={12} />
                              <span>Details</span>
                            </button>
                          </div>

                          {/* Center Graphic */}
                          <div className="relative z-10 text-center py-4">
                            <div
                              className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center border"
                              style={{
                                borderColor: `${event.color}60`,
                                backgroundColor: `${event.color}20`,
                              }}
                            >
                              <Sparkles size={28} style={{ color: event.color }} />
                            </div>
                            <h4 className="text-white font-black text-xl leading-snug line-clamp-2">
                              {event.title}
                            </h4>
                            <p className="text-white/60 text-xs mt-2 font-mono">
                              {event.date} · {event.mode}
                            </p>
                          </div>

                          {/* Bottom Action buttons */}
                          <div className="relative z-10 space-y-2">
                            {event.reportUrl && (
                              <a
                                href={event.reportUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="w-full py-2 px-3 rounded-xl bg-pink-500/20 hover:bg-pink-500/30 border border-pink-500/40 text-pink-300 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                              >
                                <FileText size={13} />
                                <span>View Event Report</span>
                              </a>
                            )}

                            {event.reelUrl && (
                              <a
                                href={event.reelUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="w-full py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                              >
                                <Video size={13} />
                                <span>Watch Instagram Reel</span>
                              </a>
                            )}

                            {!event.reportUrl && !event.reelUrl && (
                              <div className="text-center text-white/40 text-[11px] font-mono py-1">
                                Unstop Igniters Club Official Event
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Carousel Progress & Indicator Dots */}
          <div className="mt-6 flex flex-col items-center justify-center gap-3">
            <div className="flex items-center gap-1.5 max-w-md overflow-x-auto px-4 py-1 no-scrollbar">
              {events.map((ev, i) => (
                <button
                  key={ev.id}
                  onClick={() => setActiveIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === activeIndex
                      ? "w-8 bg-pink-500 shadow-[0_0_8px_#ec4899]"
                      : "w-1.5 bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Jump to event ${i + 1}`}
                />
              ))}
            </div>

            <span className="text-[11px] font-mono text-white/40 tracking-widest uppercase">
              {activeIndex + 1} / {events.length} · {events[activeIndex]?.title}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
