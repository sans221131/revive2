"use client";

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
    ? "bg-white/92 backdrop-blur border-b border-[#E6E8EC] shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
    : "bg-transparent";
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
            {/* Brand */}
            <button
              type="button"
              onClick={() => scrollToId("top")}
              className="group flex items-center gap-3 rounded-xl px-2 py-2 focus:outline-none focus:ring-2 focus:ring-[#FACB06]/60"
              aria-label="Go to top"
            >
              {/* Simple no-image “mark” */}
              <span
                className={`grid h-9 w-9 place-items-center rounded-xl border ${
                  scrolled ? "border-[#E6E8EC]" : "border-white/20"
                }`}
              >
                <span className="text-sm font-semibold tracking-wide">A</span>
              </span>

              <span className="leading-tight text-left">
                <span className="block text-[15px] font-semibold tracking-tight">
                  Amity
                </span>
                <span className={`block text-[12px] ${subText}`}>
                  Admissions
                </span>
              </span>
            </button>

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
                className={`hidden sm:inline-flex items-center justify-center rounded-xl px-4 py-2 text-[14px] font-semibold
                  transition focus:outline-none focus:ring-2 focus:ring-[#FACB06]/60
                  ${scrolled ? "bg-[#FACB06] text-[#0A2C59] hover:bg-[#FCDD5D]" : "bg-[#FACB06] text-[#0A2C59] hover:bg-[#FCDD5D]"}
                `}
              >
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