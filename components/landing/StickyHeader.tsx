"use client";

import { LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "../ui/Button";
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
				className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[120] focus:rounded-lg focus:bg-[#FFFFFF] focus:px-3 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#0A2C59] focus:shadow"
			>
				Skip to content
			</a>

			<header
				ref={headerRef}
				className={cx(
					"fixed left-0 top-0 z-[110] w-full transition-all duration-300",
					scrolled
						? "border-b border-[#E6E8EC] bg-[#FFFFFF]/95 shadow-[0_12px_30px_rgba(2,2,3,0.08)] backdrop-blur"
						: "bg-transparent",
				)}
			>
				<div className="container-shell">
					<div className="flex h-[72px] items-center justify-between">
						<button
							type="button"
							onClick={() => scrollTo("top")}
							className={cx(
								"inline-flex items-center gap-3 rounded-xl px-2 py-2 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FACB06]/70",
								scrolled ? "text-[#0A2C59]" : "text-[#FFFFFF]",
							)}
							aria-label="Back to top"
						>
							<span
								className={cx(
									"inline-flex h-9 w-9 items-center justify-center rounded-xl border text-sm font-bold",
									scrolled ? "border-[#E6E8EC]" : "border-[#FFFFFF]/30",
								)}
							>
								A
							</span>
							<span className="leading-tight">
								<span className="block text-[14px] font-semibold tracking-[0.01em]">Amity</span>
								<span className={cx("block text-[12px]", scrolled ? "text-[#6C7676]" : "text-[#FFFFFF]/70")}>Admissions</span>
							</span>
						</button>

						<nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
							{links.map((link) => {
								const isActive = activeId === link.id;
								return (
									<button
										key={link.id}
										type="button"
										onClick={() => scrollTo(link.id)}
										aria-current={isActive ? "page" : undefined}
										className={cx(
											"rounded-full px-3 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FACB06]/70",
											scrolled ? "text-[#0A2C59] hover:bg-[#F7F7F7]" : "text-[#FFFFFF] hover:bg-[#FFFFFF]/10",
											isActive && "font-semibold",
										)}
									>
										{link.label}
									</button>
								);
							})}
						</nav>

						<div className="flex items-center gap-2">
							<Button
								className="hidden rounded-full sm:inline-flex"
								onClick={openModal}
								aria-label="Open enquiry form"
							>
								Enquire Now
							</Button>
							<button
								type="button"
								onClick={() => setMenuOpen(true)}
								className={cx(
									"inline-flex h-10 w-10 items-center justify-center rounded-lg transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FACB06]/70 md:hidden",
									scrolled ? "text-[#0A2C59] hover:bg-[#F7F7F7]" : "text-[#FFFFFF] hover:bg-[#FFFFFF]/10",
								)}
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

			{menuOpen && (
				<LazyMotion features={domAnimation}>
					<div className="fixed inset-0 z-[130] md:hidden" role="dialog" aria-modal="true" aria-label="Mobile menu">
						<button
							type="button"
							onClick={() => setMenuOpen(false)}
							className="absolute inset-0 bg-[#020203]/45"
							aria-label="Close menu overlay"
						/>
						<m.div
							initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -20 }}
							animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
							transition={{ duration: reducedMotion ? 0.16 : 0.24, ease: "easeOut" }}
							className="relative rounded-b-3xl border-b border-[#E6E8EC] bg-[#FFFFFF] px-4 pb-6 pt-3 shadow-[0_18px_40px_rgba(2,2,3,0.14)]"
						>
							<div className="container-shell px-0">
								<div className="mb-4 flex items-center justify-between">
									<p className="text-sm font-semibold text-[#0A2C59]">Navigation</p>
									<button
										type="button"
										onClick={() => setMenuOpen(false)}
										className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#E6E8EC] text-[#0A2C59] hover:bg-[#F7F7F7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A2C59]/40"
										aria-label="Close menu"
									>
										<svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
											<path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" />
										</svg>
									</button>
								</div>
								<div className="grid gap-2">
									{links.map((link) => (
										<button
											key={link.id}
											type="button"
											onClick={() => {
												setMenuOpen(false);
												scrollTo(link.id);
											}}
											className="w-full rounded-xl border border-[#E6E8EC] px-4 py-3 text-left text-sm font-medium text-[#0A2C59] hover:bg-[#F7F7F7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A2C59]/40"
										>
											{link.label}
										</button>
									))}
								</div>
								<Button
									className="mt-3 w-full"
									onClick={() => {
										setMenuOpen(false);
										openModal();
									}}
								>
									Enquire Now
								</Button>
							</div>
						</m.div>
					</div>
				</LazyMotion>
			)}
		</>
	);
}
