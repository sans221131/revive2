"use client";

import { LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";
import NextImage from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { useEnquireModal } from "../../src/lib/enquire-context";
import { cx } from "../ui/cx";

type NavLink = {
	id: "why" | "recognition" | "life" | "outcomes" | "faq";
	label: string;
};

export default function StickyHeader() {
	const reducedMotion = useReducedMotion();
	const { openModal } = useEnquireModal();
	const links = useMemo<NavLink[]>(
		() => [
			{ id: "why", label: "Why Amity" },
			{ id: "recognition", label: "Recognition" },
			{ id: "life", label: "Student Life" },
			{ id: "outcomes", label: "Outcomes" },
			{ id: "faq", label: "FAQ" },
		],
		[],
	);

	const [scrolled, setScrolled] = useState(false);
	const [activeId, setActiveId] = useState<NavLink["id"]>("why");
	const [menuOpen, setMenuOpen] = useState(false);
	const headerRef = useRef<HTMLElement>(null);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 20);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	useEffect(() => {
		const sections = links
			.map((link) => document.getElementById(link.id))
			.filter((element): element is HTMLElement => Boolean(element));

		if (!sections.length) {
			return;
		}

		const observer = new IntersectionObserver(
			(entries) => {
				const next = entries
					.filter((entry) => entry.isIntersecting)
					.sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];

				if (next?.target.id) {
					setActiveId(next.target.id as NavLink["id"]);
				}
			},
			{
				rootMargin: "-35% 0px -50% 0px",
				threshold: [0.2, 0.35, 0.5],
			},
		);

		sections.forEach((section) => observer.observe(section));
		return () => observer.disconnect();
	}, [links]);

	useEffect(() => {
		if (!menuOpen) {
			return;
		}

		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setMenuOpen(false);
			}
		};

		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, [menuOpen]);

	useEffect(() => {
		if (!menuOpen) {
			return;
		}
		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = previousOverflow;
		};
	}, [menuOpen]);

	const scrollTo = (id: string) => {
		const target = document.getElementById(id);
		if (!target) {
			return;
		}
		const headerHeight = headerRef.current?.offsetHeight ?? 72;
		const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 12;
		window.scrollTo({ top, behavior: reducedMotion ? "auto" : "smooth" });
	};

	return (
		<>
			<a
				href="#main-content"
				className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[120] focus:rounded-lg focus:bg-white focus:px-3 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#0A2C59] focus:shadow"
			>
				Skip to content
			</a>

			<header
				ref={headerRef}
				className="fixed left-0 top-0 z-[110] w-full bg-[#041428]/95 backdrop-blur-md border-b border-white/10"
			>
				<div className="mx-auto max-w-[1200px] px-4 sm:px-6">
					<div className="flex h-[72px] items-center justify-between">

						{/* ── Logo only – no text ── */}
						<button
							type="button"
							onClick={() => scrollTo("top")}
							className="rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FACB06]/70"
							aria-label="Back to top"
						>
							<NextImage
								src="/amitylogo.png"
								alt="Amity University"
								width={180}
								height={60}
								className="h-11 w-auto object-contain"
								priority
								unoptimized
							/>
						</button>

						{/* ── Desktop nav ── */}
						<nav aria-label="Primary" className="hidden items-center gap-0.5 md:flex">
							{links.map((link) => {
								const isActive = activeId === link.id;
								return (
									<button
										key={link.id}
										type="button"
										onClick={() => scrollTo(link.id)}
										aria-current={isActive ? "page" : undefined}
										className={cx(
											"relative rounded-lg px-3.5 py-2 text-[13.5px] font-medium transition-all duration-150",
											"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FACB06]/70",
											scrolled
												? "text-[#0A2C59] hover:bg-[#F0F4FA]"
											: "text-white/85 hover:text-white hover:bg-white/10",
										isActive && (scrolled ? "font-semibold text-[#0A2C59]" : "font-semibold text-white"),
										)}
									>
										{link.label}
										{isActive && (
											<span
												className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-[#FACB06]"
												aria-hidden="true"
											/>
										)}
									</button>
								);
							})}
						</nav>

						{/* ── Right: CTA + hamburger ── */}
						<div className="flex items-center gap-2">
							<button
								type="button"
								onClick={openModal}
								className={cx(
									"hidden sm:inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-bold",
									"transition-all duration-200 hover:-translate-y-px active:translate-y-0",
									"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FACB06]/70",
									"bg-[#FACB06] text-[#0A2C59] shadow-md hover:bg-[#FFD633] hover:shadow-lg",
								)}
							>
								Enquire Now
							</button>

							<button
								type="button"
								onClick={() => setMenuOpen(true)}
							className="inline-flex h-10 w-10 items-center justify-center rounded-lg transition md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FACB06]/70 text-white hover:bg-white/10"
								aria-label="Open menu"
							>
								<svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
									<path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
								</svg>
							</button>
						</div>
					</div>
				</div>
			</header>

			{/* ── Mobile drawer ── */}
			{menuOpen && (
				<LazyMotion features={domAnimation}>
					<div className="fixed inset-0 z-[130] md:hidden" role="dialog" aria-modal="true" aria-label="Mobile menu">
						<button
							type="button"
							onClick={() => setMenuOpen(false)}
							className="absolute inset-0 bg-black/50 backdrop-blur-sm"
							aria-label="Close menu"
						/>
						<m.div
							initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -16 }}
							animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
							transition={{ duration: reducedMotion ? 0.12 : 0.22, ease: [0.22, 1, 0.36, 1] }}
							className="relative overflow-hidden rounded-b-3xl bg-white shadow-[0_20px_60px_rgba(10,44,89,0.18)]"
						>
							<div className="h-[3px] w-full bg-[#FACB06]" aria-hidden="true" />
							<div className="px-5 pb-6 pt-4">
								<div className="mb-5 flex items-center justify-between">
									<div className={`rounded-md p-1 ${scrolled ? "bg-transparent" : "bg-white/10"}`}>
										<NextImage
											src="/coursewaalalogo.png"
											alt="Coursewaala"
											width={140}
											height={48}
											className="h-9 w-auto object-contain"
											style={{ filter: scrolled ? "none" : "brightness(0) invert(1)" }}
											unoptimized
										/>
									</div>
									<button
										type="button"
										onClick={() => setMenuOpen(false)}
										className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#E6E8EC] text-[#0A2C59] hover:bg-[#F7F7F7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A2C59]/30"
										aria-label="Close menu"
									>
										<svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
											<path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" />
										</svg>
									</button>
								</div>
								<div className="grid gap-1.5">
									{links.map((link) => (
										<button
											key={link.id}
											type="button"
											onClick={() => { setMenuOpen(false); scrollTo(link.id); }}
											className={cx(
												"flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-[14px] font-medium",
												"transition hover:bg-[#F0F4FA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A2C59]/30",
												activeId === link.id ? "bg-[#F0F4FA] font-semibold text-[#0A2C59]" : "text-[#444]",
											)}
										>
											{activeId === link.id && (
												<span className="h-4 w-[3px] shrink-0 rounded-full bg-[#FACB06]" aria-hidden="true" />
											)}
											{link.label}
										</button>
									))}
								</div>
								<button
									type="button"
									onClick={() => { setMenuOpen(false); openModal(); }}
									className="mt-4 w-full rounded-xl bg-[#FACB06] py-3 text-[14px] font-bold text-[#0A2C59] transition hover:bg-[#FFD633] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FACB06]/70"
								>
									Enquire Now
								</button>
							</div>
						</m.div>
					</div>
				</LazyMotion>
			)}
		</>
	);
}
