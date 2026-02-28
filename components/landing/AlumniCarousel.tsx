"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { LazyMotion, domAnimation, m, AnimatePresence, useReducedMotion } from "framer-motion";
import { Button } from "../ui/Button";
import { useEnquireModal } from "../../src/lib/enquire-context";

const stories = [
  {
    quote:
      "The academic structure gave me consistency, while the campus ecosystem pushed me to lead teams and take ownership early.",
    name: "Rhea Sharma",
    initials: "RS",
    role: "Senior Analyst, Global Consulting Firm",
    year: "Class of 2021",
  },
  {
    quote:
      "Career support was practical and continuous. Mock interviews, mentoring, and employer sessions made me placement-ready.",
    name: "Arjun Verma",
    initials: "AV",
    role: "Management Trainee, Leading FMCG Group",
    year: "Class of 2022",
  },
  {
    quote:
      "What stood out was the balance of academics and student activities. It helped me build confidence and communication.",
    name: "Megha Iyer",
    initials: "MI",
    role: "Product Associate, Fintech Company",
    year: "Class of 2020",
  },
  {
    quote:
      "The alumni network and placement guidance opened strong opportunities. I entered industry with clarity and preparation.",
    name: "Karan Malhotra",
    initials: "KM",
    role: "Business Development Executive, Tech Enterprise",
    year: "Class of 2023",
  },
] as const;

const AUTO_ADVANCE_MS = 8000;

export default function AlumniCarousel() {
  const reducedMotion = useReducedMotion();
  const { openModal } = useEnquireModal();
  const total = stories.length;

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const activeStory = useMemo(() => stories[index], [index]);

  const goPrev = useCallback(() => setIndex((c) => (c - 1 + total) % total), [total]);
  const goNext = useCallback(() => setIndex((c) => (c + 1) % total), [total]);

  useEffect(() => {
    if (reducedMotion || !AUTO_ADVANCE_MS || paused) return;
    const t = window.setInterval(goNext, AUTO_ADVANCE_MS);
    return () => window.clearInterval(t);
  }, [paused, reducedMotion, goNext]);

  const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === "ArrowLeft") goPrev();
    if (e.key === "ArrowRight") goNext();
  };

  return (
    <section
      id="alumni"
      className="relative scroll-mt-24 overflow-hidden bg-white py-10 md:py-16"
      aria-labelledby="alumni-heading"
    >
      <div className="container-shell relative">
        <LazyMotion features={domAnimation}>

          {/* Header row */}
          <m.div
            initial={{ opacity: 0, y: reducedMotion ? 0 : 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: reducedMotion ? 0.15 : 0.46, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10 flex flex-wrap items-center justify-between gap-4"
          >
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#0A2C59]/15 bg-[#0A2C59]/5 px-4 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FACB06]" aria-hidden="true" />
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#0A2C59]">Alumni Experiences</span>
              </div>
              <h2
                id="alumni-heading"
                className="text-3xl font-bold text-[#0A2C59] md:text-4xl"
                style={{ fontFamily: "var(--font-libre-baskerville), serif" }}
              >
                Alumni stories
              </h2>
            </div>
            {/* Arrow nav */}
            <div className="flex items-center gap-2" aria-label="Carousel navigation">
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous story"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E6E8EC] bg-white text-[#0A2C59]/50 transition-all hover:border-[#FACB06] hover:bg-[#FACB06] hover:text-[#0A2C59] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A2C59]/30"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
              <span className="min-w-[3rem] text-center text-sm text-[#6C7676]" aria-live="polite">
                <span className="font-semibold text-[#0A2C59]">{String(index + 1).padStart(2, "0")}</span>
                <span className="mx-1 text-[#E6E8EC]">/</span>
                {String(total).padStart(2, "0")}
              </span>
              <button
                type="button"
                onClick={goNext}
                aria-label="Next story"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E6E8EC] bg-white text-[#0A2C59]/50 transition-all hover:border-[#FACB06] hover:bg-[#FACB06] hover:text-[#0A2C59] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A2C59]/30"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            </div>
          </m.div>

          {/* Quote card */}
          <div
            className="outline-none"
            tabIndex={0}
            onKeyDown={onKeyDown}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
            role="region"
            aria-roledescription="carousel"
            aria-label="Alumni stories carousel"
          >
            <AnimatePresence mode="wait" initial={false}>
              <m.div
                key={index}
                id="alumni-carousel-panel"
                role="group"
                aria-roledescription="slide"
                aria-label={`Story ${index + 1} of ${total}`}
                initial={reducedMotion ? { opacity: 0 } : { opacity: 0, x: 24 }}
                animate={reducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
                exit={reducedMotion ? { opacity: 0 } : { opacity: 0, x: -24 }}
                transition={{ duration: reducedMotion ? 0.12 : 0.34, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden rounded-2xl bg-gradient-to-br from-[#0F3468] via-[#0A2C59] to-[#051830] shadow-[0_20px_60px_rgba(4,20,40,0.35)]"
              >
                {/* Gold top bar */}
                <div className="h-[3px] w-full bg-gradient-to-r from-[#FACB06] via-[#FACB06]/80 to-transparent" aria-hidden="true" />
                {/* Subtle inner glow top-left */}
                <div className="pointer-events-none absolute left-0 top-0 h-48 w-48 rounded-full bg-[#FACB06]/[0.06] blur-3xl" aria-hidden="true" />

                <div className="grid md:grid-cols-[1fr_auto]">
                  {/* Quote */}
                  <blockquote className="relative overflow-hidden border-l-[3px] border-[#FACB06]/50 px-8 pb-10 pt-8 md:px-12 md:pb-12 md:pt-10">
                    {/* Watermark quote mark — purely decorative, sits behind text */}
                    <span
                      className="pointer-events-none absolute -top-4 left-4 select-none leading-none text-[#FACB06]/[0.07] md:left-8"
                      aria-hidden="true"
                      style={{
                        fontFamily: "var(--font-libre-baskerville), serif",
                        fontSize: "clamp(140px, 18vw, 220px)",
                        lineHeight: 1,
                      }}
                    >
                      &ldquo;
                    </span>
                    <p
                      className="relative z-10 text-xl font-medium italic leading-[1.75] text-white md:text-2xl lg:text-[1.65rem]"
                      style={{ fontFamily: "var(--font-libre-baskerville), serif" }}
                    >
                      {activeStory.quote}
                    </p>

                    {/* Author row */}
                    <div className="mt-8 flex items-center gap-4 border-t border-white/10 pt-6">
                      <div
                        className="relative flex h-12 w-12 shrink-0 items-center justify-center text-sm font-bold text-[#0A2C59] shadow-[0_0_0_3px_rgba(250,203,6,0.3)]"
                        style={{ borderRadius: "50%" }}
                        aria-hidden="true"
                      >
                        <span className="absolute inset-0 rounded-full bg-[#FACB06]" />
                        <span className="relative z-10">{activeStory.initials}</span>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">{activeStory.name}</p>
                        <p className="mt-0.5 text-xs text-white/50">{activeStory.role}</p>
                        {/* Stars */}
                        <div className="mt-1 flex gap-0.5" aria-label="5 stars">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <svg key={i} width="10" height="10" viewBox="0 0 24 24" fill="#FACB06" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                          ))}
                        </div>
                      </div>
                      <div className="ml-auto text-right">
                        <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#FACB06]/50">
                          {activeStory.year}
                        </span>
                        <span className="mt-1 block text-[9px] font-medium uppercase tracking-[0.12em] text-white/20">Verified Alumni</span>
                      </div>
                    </div>
                  </blockquote>

                  {/* Side accent — desktop only */}
                  <div className="hidden w-48 flex-col items-center justify-center gap-3 border-l border-white/8 bg-gradient-to-b from-white/[0.05] to-transparent px-8 md:flex">
                    <span
                      className="font-bold leading-none"
                      aria-hidden="true"
                      style={{ fontFamily: "var(--font-libre-baskerville), serif", fontSize: "5.5rem", color: "rgba(250,203,6,0.18)", textShadow: "0 0 30px rgba(250,203,6,0.15)" }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="h-px w-8 bg-[#FACB06]/20" />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/25">of {String(total).padStart(2, "0")}</span>
                    {/* Progress */}
                    {!reducedMotion && !paused && (
                      <div className="mt-3 h-[2px] w-10 overflow-hidden rounded-full bg-white/10">
                        <m.div
                          key={`progress-${index}`}
                          className="h-full bg-[#FACB06]/70"
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: AUTO_ADVANCE_MS / 1000, ease: "linear" }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </m.div>
            </AnimatePresence>

            {/* Name-tab navigation */}
            <div
              className="mt-6 flex flex-wrap gap-x-8 gap-y-3"
              role="tablist"
              aria-label="Select alumni story"
            >
              {stories.map((story, i) => {
                const isActive = i === index;
                return (
                  <button
                    key={story.name}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setIndex(i)}
                    className="group relative pb-2 focus:outline-none"
                    aria-label={`Story by ${story.name}`}
                  >
                    <span
                      className={`text-[13px] font-semibold tracking-wide transition-colors duration-200 ${
                        isActive ? "text-[#0A2C59]" : "text-[#0A2C59]/30 group-hover:text-[#0A2C59]/70"
                      }`}
                    >
                      {story.name}
                    </span>
                    {isActive && (
                      <m.span
                        layoutId="activeNameBar"
                        className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-[#FACB06]"
                        transition={{ duration: reducedMotion ? 0 : 0.28, ease: "easeOut" }}
                        aria-hidden="true"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Enquire CTA */}
          <m.div
            initial={{ opacity: 0, y: reducedMotion ? 0 : 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: reducedMotion ? 0.15 : 0.4, ease: "easeOut", delay: reducedMotion ? 0 : 0.1 }}
            className="mt-10 flex flex-col items-center gap-3 text-center"
          >
            <p className="text-[13px] text-[#6C7676]">Join thousands of Amity graduates. Start your application today.</p>
            <Button className="rounded-full" size="lg" onClick={openModal}>
              Enquire Now
            </Button>
          </m.div>

        </LazyMotion>
      </div>
    </section>
  );
}
