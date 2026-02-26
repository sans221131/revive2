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
      className="relative scroll-mt-24 overflow-hidden bg-[#F7F7F7] py-10 md:py-16"
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
            className="mb-12 flex flex-wrap items-end justify-between gap-4 border-b border-[#E6E8EC] pb-8"
          >
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#0A2C59]/15 bg-[#0A2C59]/5 px-4 py-1.5">
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
            <span
              className="text-sm text-[#6C7676]"
              style={{ fontFamily: "var(--font-libre-baskerville), serif" }}
              aria-live="polite"
            >
              <span className="text-[#0A2C59]">{String(index + 1).padStart(2, "0")}</span>
              {" / "}
              {String(total).padStart(2, "0")}
            </span>
          </m.div>

          {/* Quote stage */}
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
            {/* Quote stage */}
            <AnimatePresence mode="wait" initial={false}>
              <m.div
                key={index}
                id="alumni-carousel-panel"
                role="group"
                aria-roledescription="slide"
                aria-label={`Story ${index + 1} of ${total}`}
                initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.99 }}
                animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
                exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -14, scale: 0.99 }}
                transition={{ duration: reducedMotion ? 0.12 : 0.38, ease: [0.22, 1, 0.36, 1] }}
              >
                <blockquote className="relative max-w-4xl pl-0 pt-8">
                  {/* Decorative quote mark — pinned, doesn't push content */}
                  <span
                    className="pointer-events-none absolute -top-2 left-0 select-none leading-none text-[#0A2C59]/10"
                    aria-hidden="true"
                    style={{
                      fontFamily: "var(--font-libre-baskerville), serif",
                      fontSize: "clamp(72px, 10vw, 112px)",
                      lineHeight: 1,
                    }}
                  >
                    &ldquo;
                  </span>
                  <p
                    className="text-2xl font-medium leading-[1.55] text-[#0A2C59] md:text-3xl lg:text-[2rem]"
                    style={{ fontFamily: "var(--font-libre-baskerville), serif" }}
                  >
                    {activeStory.quote}
                  </p>
                </blockquote>

                <div className="mt-10 flex items-center gap-5">
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center text-sm font-bold text-[#0A2C59]"
                    style={{ background: "#FACB06", borderRadius: "50%" }}
                    aria-hidden="true"
                  >
                    {activeStory.initials}
                  </div>
                  <div>
                    <p className="text-base font-semibold text-[#0A2C59]">{activeStory.name}</p>
                    <p className="text-sm text-[#6C7676]">{activeStory.role}</p>
                  </div>
                  <span className="ml-auto hidden text-xs font-semibold uppercase tracking-[0.16em] text-[#0A2C59]/30 md:block">
                    {activeStory.year}
                  </span>
                </div>
              </m.div>
            </AnimatePresence>

            {/* Name-tab navigation */}
            <div
              className="mt-14 flex flex-wrap items-end justify-between gap-y-3 border-t border-[#E6E8EC] pt-7"
              role="tablist"
              aria-label="Select alumni story"
            >
              <div className="flex flex-wrap gap-x-8 gap-y-3">
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
                          className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#FACB06]"
                          transition={{ duration: reducedMotion ? 0 : 0.28, ease: "easeOut" }}
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {!reducedMotion && !paused && (
                <div className="flex items-center self-end pb-2">
                  <div className="relative h-[1.5px] w-16 overflow-hidden bg-[#0A2C59]/15">
                    <m.div
                      key={`progress-${index}`}
                      className="absolute inset-y-0 left-0 bg-[#FACB06]/60"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: AUTO_ADVANCE_MS / 1000, ease: "linear" }}
                    />
                  </div>
                </div>
              )}
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
