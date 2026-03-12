"use client";

import Image from "next/image";
import React, { useEffect, useMemo, useRef, useState } from "react";

type NavLink = { id: string; label: string };

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;
    const onChange = () => setReduced(!!mq.matches);
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);
  return reduced;
}

export default function StickyHeader() {
  const reducedMotion = usePrefersReducedMotion();

  const links: NavLink[] = useMemo(
    () => [
      { id: "why", label: "Why Amity" },
      { id: "recognition", label: "Recognition" },
      { id: "life", label: "Student Life" },
      { id: "outcomes", label: "Outcomes" },
      { id: "faq", label: "FAQ" },
    ],
    []
  );

  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string>("why");
  const [mobileOpen, setMobileOpen] = useState(false);

  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on escape
  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  // Active section tracking
  useEffect(() => {
    const ids = links.map((l) => l.id);
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        // pick the most visible intersecting section
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];
        if (visible?.target?.id) setActiveId(visible.target.id);
      },
      {
        root: null,
        // offset for sticky header
        rootMargin: "-30% 0px -60% 0px",
        threshold: [0.1, 0.2, 0.35, 0.5, 0.65],
      }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [links]);

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const headerH = headerRef.current?.offsetHeight ?? 72;
    const y = el.getBoundingClientRect().top + window.scrollY - headerH - 12;

    window.scrollTo({
      top: y,
      behavior: reducedMotion ? "auto" : "smooth",
    });
  };

  const headerBg = scrolled
    ? "bg-white/95 backdrop-blur-md border-b border-[#E6E8EC] shadow-[0_4px_24px_rgba(10,44,89,0.08)]"
    : "bg-gradient-to-b from-black/30 to-transparent backdrop-blur-[2px]";
  const textColor = scrolled ? "text-[#0A2C59]" : "text-white";
  const subText = scrolled ? "text-[#6C7676]" : "text-white/70";

  return (
    <>
      {/* Skip link */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-xl focus:bg-white focus:px-4 focus:py-2 focus:text-[#0A2C59] focus:shadow"
      >
        Skip to content
      </a>

      <header
        ref={(n) => {
          headerRef.current = n;
        }}
        className={`fixed top-0 z-50 w-full ${headerBg}`}
      >
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className={`flex h-[72px] items-center justify-between ${textColor}`}>
            {/* Brand + Partner text (Coursewaala) */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => scrollToId("top")}
                className="group flex items-center rounded-xl px-1 py-1 focus:outline-none focus:ring-2 focus:ring-[#FACB06]/60"
                aria-label="Coursewaala | Official Enrollment Partner for Amity Online MBA — Go to top"
              >
                <Image
                  src="/amitylogo.png"
                  alt="Amity University"
                  width={160}
                  height={56}
                  className="h-12 w-auto object-contain"
                  style={{
                    filter: scrolled
                      ? "none"
                      : "brightness(0) invert(1) drop-shadow(0 1px 2px rgba(0,0,0,0.4))",
                  }}
                  priority
                  unoptimized
                />
              </button>

              {/* Partner logo + explicit partner phrase in header */}
              <div className="flex items-center gap-3">
                <div className={`rounded-md p-1 ${scrolled ? "bg-transparent" : "bg-white/10"}`}>
                  <Image
                    src="/coursewaalalogo.png"
                    alt="Coursewaala"
                    width={92}
                    height={30}
                    className="block h-6 w-auto object-contain"
                    style={{ filter: scrolled ? "none" : "brightness(0) invert(1)", opacity: 1 }}
                    unoptimized
                  />
                </div>
                <div className="text-left">
                  <div className="text-sm font-semibold text-[#0A2C59] hidden md:block">
                    Coursewaala | Official Enrollment Partner for Amity Online MBA
                  </div>
                  <div className="text-sm font-semibold text-[#0A2C59] md:hidden">
                    Coursewaala — Official Partner for Amity
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {links.map((l) => {
                const active = activeId === l.id;
                return (
                  <button
                    key={l.id}
                    type="button"
                    onClick={() => scrollToId(l.id)}
                    className={`relative rounded-xl px-3 py-2 text-[14px] font-medium transition
                      focus:outline-none focus:ring-2 focus:ring-[#FACB06]/60
                      ${scrolled ? "hover:bg-black/5" : "hover:bg-white/10"}
                    `}
                    aria-current={active ? "page" : undefined}
                  >
                    {l.label}
                    <span
                      className={`pointer-events-none absolute left-3 right-3 -bottom-1 h-[2px] rounded-full transition
                        ${active ? "bg-[#FACB06] opacity-100" : "bg-transparent opacity-0"}
                      `}
                    />
                  </button>
                );
              })}
            </nav>

            {/* Right controls */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollToId("enquire")}
                className={`hidden sm:inline-flex items-center gap-1.5 justify-center rounded-full px-5 py-2.5 text-[13px] font-bold
                  transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#FACB06]/60
                  shadow-sm hover:shadow-md hover:-translate-y-px active:translate-y-0
                  bg-[#FACB06] text-[#0A2C59] hover:bg-[#FCDD5D]
                `}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.26h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.84a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                Enquire Now
              </button>

              {/* Mobile menu */}
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className={`md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl transition
                  focus:outline-none focus:ring-2 focus:ring-[#FACB06]/60
                  ${scrolled ? "hover:bg-black/5" : "hover:bg-white/10"}
                `}
                aria-label="Open menu"
              >
                <span className="sr-only">Open menu</span>
                <div className="space-y-1">
                  <div className={`h-[2px] w-5 rounded ${scrolled ? "bg-[#0A2C59]" : "bg-white"}`} />
                  <div className={`h-[2px] w-5 rounded ${scrolled ? "bg-[#0A2C59]" : "bg-white"}`} />
                  <div className={`h-[2px] w-5 rounded ${scrolled ? "bg-[#0A2C59]" : "bg-white"}`} />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div className="md:hidden">
            <div
              className="fixed inset-0 z-50 bg-black/40"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />
            <div className="fixed top-0 left-0 right-0 z-[60] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
              <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
                <div className="flex items-center justify-between py-4">
                  <div className="text-[#0A2C59] font-semibold">Menu</div>
                  <button
                    type="button"
                    onClick={() => setMobileOpen(false)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-[#FACB06]/60"
                    aria-label="Close menu"
                  >
                    ✕
                  </button>
                </div>

                <div className="pb-5">
                  <div className="grid gap-2">
                    {links.map((l) => (
                      <button
                        key={l.id}
                        type="button"
                        onClick={() => {
                          setMobileOpen(false);
                          scrollToId(l.id);
                        }}
                        className="w-full rounded-xl border border-[#E6E8EC] px-4 py-3 text-left text-[15px] font-medium text-[#0A2C59] hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-[#FACB06]/60"
                      >
                        {l.label}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setMobileOpen(false);
                      scrollToId("enquire");
                    }}
                    className="mt-4 w-full rounded-xl bg-[#FACB06] px-4 py-3 text-[15px] font-semibold text-[#0A2C59] hover:bg-[#FCDD5D] focus:outline-none focus:ring-2 focus:ring-[#FACB06]/60"
                  >
                    Enquire Now
                  </button>

                  <p className="mt-3 text-[12px] text-[#6C7676]">
                    We’ll contact you shortly after you submit the form.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Spacer so content doesn't hide behind fixed header */}
      <div id="top" className="h-[72px]" />
    </>
  );
}