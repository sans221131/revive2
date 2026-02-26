"use client";

import { LazyMotion, domAnimation, m, useReducedMotion, useMotionValue, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { Button } from "../ui/Button";
import { useEnquireModal } from "../../src/lib/enquire-context";

// Parses "95%" → { num: 95, suffix: "%" }, "800+" → { num: 800, suffix: "+" },
// "50K+" → { num: 50, suffix: "K+" }, "1:1" → null (static)
function parseStatValue(value: string): { num: number; suffix: string } | null {
	const match = value.match(/^(\d+(?:\.\d+)?)(.*)/);
	if (!match) return null;
	return { num: parseFloat(match[1]), suffix: match[2] };
}

function CountUp({ value, reducedMotion }: { value: string; reducedMotion: boolean | null }) {
	const parsed = parseStatValue(value);
	const ref = useRef<HTMLSpanElement>(null);
	const motionVal = useMotionValue(0);
	const hasAnimated = useRef(false);

	useEffect(() => {
		if (!parsed || reducedMotion) return;
		const el = ref.current;
		if (!el) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting && !hasAnimated.current) {
					hasAnimated.current = true;
					const controls = animate(motionVal, parsed.num, {
						duration: 1.4,
						ease: [0.22, 1, 0.36, 1],
					});
					const unsub = motionVal.on("change", (v) => {
						if (el) el.textContent = Math.round(v) + parsed.suffix;
					});
					controls.then(() => unsub());
				}
			},
			{ threshold: 0.5 },
		);
		observer.observe(el);
		return () => observer.disconnect();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (!parsed || reducedMotion) return <span>{value}</span>;
	return <span ref={ref}>0{parsed.suffix}</span>;
}

const statsIcons = [
	// graduation cap
	<svg key="a" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M22 10v6M2 10l10-5 10 5-10 5-10-5Z" strokeLinecap="round" strokeLinejoin="round" /><path d="M6 12v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5" strokeLinecap="round" /></svg>,
	// building
	<svg key="b" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 3v18M15 3v18M3 9h18M3 15h18" strokeLinecap="round" /></svg>,
	// globe
	<svg key="c" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.4 3.5 6 3.5 9S14.5 18.6 12 21M12 3c-2.5 2.4-3.5 6-3.5 9S9.5 18.6 12 21" strokeLinecap="round" /></svg>,
	// headset
	<svg key="d" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M3 18v-6a9 9 0 1 1 18 0v6" strokeLinecap="round" /><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3v5ZM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3v5Z" /></svg>,
];

const stats = [
	{ value: "95%", label: "Students engaged in career preparation pathways" },
	{ value: "800+", label: "Recruiting organizations across sectors" },
	{ value: "50K+", label: "Alumni network footprint across geographies" },
	{ value: "1:1", label: "Guidance touchpoints for admissions and student support" },
] as const;

const proofBlocks = [
	{
		icon: (
			<svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
				<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" strokeLinecap="round" strokeLinejoin="round" />
				<path d="m3.3 7 8.7 5 8.7-5M12 22V12" strokeLinecap="round" />
			</svg>
		),
		title: "Career services",
		detail: "Dedicated career teams guide students on resume development, interview preparation, and employer readiness from early semesters.",
	},
	{
		icon: (
			<svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
				<rect x="3" y="6" width="18" height="13" rx="2" />
				<path d="M9 6V4.8A1.8 1.8 0 0 1 10.8 3h2.4A1.8 1.8 0 0 1 15 4.8V6M3 12h18" strokeLinecap="round" />
			</svg>
		),
		title: "Placement assistance",
		detail: "Structured placement workflows and employer engagement create strong pathways into internships and full-time opportunities.",
	},
	{
		icon: (
			<svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
				<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" strokeLinecap="round" />
				<circle cx="9" cy="7" r="4" />
				<path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" strokeLinecap="round" />
			</svg>
		),
		title: "Alumni network reach",
		detail: "An active alumni community supports mentoring, referrals, and professional visibility for current students and graduates.",
	},
] as const;

const industries = ["Technology", "Banking", "Consulting", "FMCG", "Media", "Healthcare", "E-commerce", "Manufacturing"] as const;

const proofContainer = {
	hidden: {},
	show: { transition: { staggerChildren: 0.09 } },
};

const proofItem = {
	hidden: { opacity: 0, y: 20 },
	show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

export default function Outcomes() {
	const reducedMotion = useReducedMotion();
	const { openModal } = useEnquireModal();

	return (
		<section id="outcomes" className="scroll-mt-24 bg-[#F7F7F7] py-10 md:py-16">
			<div className="container-shell">
				<LazyMotion features={domAnimation}>

					{/* Heading */}
					<m.div
						initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.2 }}
						transition={{ duration: reducedMotion ? 0.15 : 0.45, ease: [0.22, 1, 0.36, 1] }}
						className="mb-12"
					>
						<div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#0A2C59]/15 bg-[#0A2C59]/5 px-4 py-1.5">
							<span className="h-1.5 w-1.5 rounded-full bg-[#FACB06]" aria-hidden="true" />
							<span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#0A2C59]">Career &amp; Placement</span>
						</div>
						<h2
							className="text-3xl font-bold text-[#0A2C59] md:text-4xl"
							style={{ fontFamily: "var(--font-libre-baskerville), serif" }}
						>
							Outcomes that matter to students and families
						</h2>
						<p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#6C7676] md:text-base">
							Amity&apos;s value is reflected in practical career support, structured placements, and long-term alumni connectivity.
						</p>
					</m.div>

					{/* Stats — horizontal rows on mobile, 4-col grid on desktop */}
					<div className="mb-8">
						{/* Mobile: stacked horizontal bars */}
						<div className="grid grid-cols-1 divide-y divide-[#E6E8EC] rounded-2xl border border-[#E6E8EC] bg-[#FFFFFF] sm:hidden">
							{stats.map((item, i) => (
								<m.div
									key={item.label}
									initial={{ opacity: 0, x: reducedMotion ? 0 : -12 }}
									whileInView={{ opacity: 1, x: 0 }}
									viewport={{ once: true, amount: 0.3 }}
									transition={{ duration: reducedMotion ? 0.15 : 0.38, ease: "easeOut", delay: reducedMotion ? 0 : i * 0.07 }}
									className="flex items-center gap-4 px-5 py-4"
								>
									<span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#0A2C59]/10 bg-[#0A2C59]/5 text-[#0A2C59]">
										{statsIcons[i]}
									</span>
									<p
										className="w-20 shrink-0 font-[family-name:var(--font-libre-baskerville)] text-3xl font-bold text-[#0A2C59]"
										style={{ fontFamily: "var(--font-libre-baskerville), serif" }}
									>
										<CountUp value={item.value} reducedMotion={!!reducedMotion} />
									</p>
									<div className="h-8 w-px shrink-0 bg-[#E6E8EC]" aria-hidden="true" />
									<p className="text-sm leading-snug text-[#6C7676]">{item.label}</p>
								</m.div>
							))}
						</div>

						{/* Desktop: 4-col card grid */}
						<div className="hidden grid-cols-4 gap-4 sm:grid">
							{stats.map((item, i) => (
								<m.div
									key={item.label}
									initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true, amount: 0.2 }}
									transition={{ duration: reducedMotion ? 0.15 : 0.4, ease: "easeOut", delay: reducedMotion ? 0 : i * 0.07 }}
									whileHover={reducedMotion ? undefined : { y: -4, transition: { duration: 0.2 } }}
									className="flex flex-col rounded-2xl border border-[#E6E8EC] bg-[#FFFFFF] p-5 shadow-[0_2px_12px_rgba(10,44,89,0.05)] transition-colors hover:border-[#0A2C59]/20 hover:shadow-[0_4px_20px_rgba(10,44,89,0.10)]"
								>
									<m.span
										whileHover={reducedMotion ? undefined : { scale: 1.08 }}
										transition={{ duration: 0.18 }}
									className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#0A2C59]/10 bg-[#0A2C59]/5 text-[#0A2C59]"
								>
									{statsIcons[i]}
								</m.span>
								<p
									className="font-[family-name:var(--font-libre-baskerville)] text-4xl font-bold text-[#0A2C59]"
									style={{ fontFamily: "var(--font-libre-baskerville), serif" }}
								>
									<CountUp value={item.value} reducedMotion={!!reducedMotion} />
								</p>
								<div className="mt-3 h-px w-full bg-[#E6E8EC]" aria-hidden="true" />
								<p className="mt-3 text-sm leading-snug text-[#6C7676]">{item.label}</p>
								</m.div>
							))}
						</div>
					</div>

					{/* Proof blocks */}
					<m.div
						className="grid gap-4 lg:grid-cols-3"
						variants={reducedMotion ? undefined : proofContainer}
						initial={reducedMotion ? { opacity: 0 } : "hidden"}
						whileInView={reducedMotion ? { opacity: 1 } : "show"}
						viewport={{ once: true, amount: 0.1 }}
						transition={reducedMotion ? { duration: 0.2 } : undefined}
					>
						{proofBlocks.map((block) => (
							<m.div
								key={block.title}
								variants={reducedMotion ? undefined : proofItem}
								whileHover={reducedMotion ? undefined : { y: -3, transition: { duration: 0.2 } }}
								className="flex h-full flex-col rounded-2xl border border-[#E6E8EC] bg-[#FFFFFF] p-6 shadow-[0_2px_12px_rgba(10,44,89,0.05)] transition-colors hover:border-[#0A2C59]/20 hover:shadow-[0_4px_20px_rgba(10,44,89,0.10)]"
							>
							<span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#0A2C59]/10 bg-[#0A2C59]/5 text-[#0A2C59]">
									{block.icon}
								</span>
								<m.div
									initial={{ width: 0 }}
									whileInView={{ width: 28 }}
									viewport={{ once: true }}
									transition={{ duration: reducedMotion ? 0.1 : 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
									className="mb-3 h-[2px] rounded-full bg-[#FACB06]"
								/>
								<h3
									className="text-lg font-bold text-[#0A2C59]"
									style={{ fontFamily: "var(--font-libre-baskerville), serif" }}
								>
									{block.title}
								</h3>
								<p className="mt-2 text-sm leading-relaxed text-[#6C7676]">{block.detail}</p>
							</m.div>
						))}
					</m.div>

					{/* Industry tags */}
					<m.div
						initial={{ opacity: 0, y: reducedMotion ? 0 : 12 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.3 }}
						transition={{ duration: reducedMotion ? 0.15 : 0.4, ease: "easeOut", delay: reducedMotion ? 0 : 0.2 }}
						className="mt-6 rounded-2xl border border-[#E6E8EC] bg-[#FFFFFF] p-5"
					>
						<p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#6C7676]">Industries represented</p>
						<div className="mt-3 flex flex-wrap gap-2">
							{industries.map((industry) => (
								<span key={industry} className="inline-flex items-center gap-1.5 rounded-full border border-[#E6E8EC] bg-[#F7F7F7] px-3 py-1 text-xs font-medium text-[#0A2C59]">
									<span className="h-1 w-1 rounded-full bg-[#FACB06]" aria-hidden="true" />
									{industry}
								</span>
							))}
						</div>
					</m.div>

				{/* Enquire CTA */}
				<m.div
					initial={{ opacity: 0, y: reducedMotion ? 0 : 14 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.3 }}
					transition={{ duration: reducedMotion ? 0.15 : 0.4, ease: "easeOut", delay: reducedMotion ? 0 : 0.1 }}
					className="mt-10 flex flex-col items-center gap-3 text-center"
				>
					<p className="text-[13px] text-[#6C7676]">Ready to start? Your counsellor is one step away.</p>
					<Button className="rounded-full" size="lg" onClick={openModal}>
						Enquire Now
					</Button>
				</m.div>

				</LazyMotion>
			</div>
		</section>
	);
}
