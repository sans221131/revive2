"use client";

import { LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";

const recognitions = [
	{
		icon: (
			<svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
				<path d="M12 2 15.09 8.26 22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z" strokeLinecap="round" strokeLinejoin="round" />
			</svg>
		),
		title: "Recognized Academic Framework",
		detail: "Structured curriculum planning and assessment aligned with contemporary higher-education standards.",
	},
	{
		icon: (
			<svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
				<rect x="2" y="7" width="20" height="14" rx="2" />
				<path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" strokeLinecap="round" />
				<path d="M12 12v4M10 14h4" strokeLinecap="round" />
			</svg>
		),
		title: "Industry-Aligned Exposure",
		detail: "Frequent corporate interactions, project-based training, and employability-focused preparation.",
	},
	{
		icon: (
			<svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
				<circle cx="12" cy="12" r="10" />
				<path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z" strokeLinecap="round" />
			</svg>
		),
		title: "Global Learning Environment",
		detail: "Diverse student community and international opportunities that broaden academic perspective.",
	},
	{
		icon: (
			<svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
				<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" strokeLinecap="round" />
				<circle cx="9" cy="7" r="4" />
				<path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" strokeLinecap="round" />
			</svg>
		),
		title: "Student Support Systems",
		detail: "Mentoring, academic advising, and holistic assistance from onboarding to graduation.",
	},
] as const;

const trustPhrases = [
	"Accreditation-aligned academic practices",
	"Career readiness initiatives across programs",
	"Student-first mentoring approach",
	"Strong alumni and recruiter engagement",
	"Campus ecosystem designed for all-round growth",
] as const;

const cardContainer = {
	hidden: {},
	show: {
		transition: {
			staggerChildren: 0.08,
		},
	},
};

const cardItem = {
	hidden: { opacity: 0, y: 24 },
	show: { opacity: 1, y: 0, transition: { duration: 0.42, ease: "easeOut" as const } },
};

export default function RecognitionStrip() {
	const reducedMotion = useReducedMotion();
	const marqueeItems = [...trustPhrases, ...trustPhrases];

	return (
		<section id="recognition" className="scroll-mt-24 bg-[#F7F7F7] py-10 md:py-16">
			<div className="container-shell">
				<LazyMotion features={domAnimation}>
					{/* Heading */}
					<m.div
						initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.2 }}
						transition={{ duration: reducedMotion ? 0.15 : 0.5, ease: [0.22, 1, 0.36, 1] }}
						className="mb-12 text-center"
					>
						<m.div
							initial={{ opacity: 0, scale: reducedMotion ? 1 : 0.92 }}
							whileInView={{ opacity: 1, scale: 1 }}
							viewport={{ once: true }}
							transition={{ duration: reducedMotion ? 0.15 : 0.4, ease: [0.22, 1, 0.36, 1] }}
						className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#0A2C59]/15 bg-[#0A2C59]/5 px-4 py-1.5"
					>
						<span className="h-1.5 w-1.5 rounded-full bg-[#FACB06]" aria-hidden="true" />
						<span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#0A2C59]">Why Students Trust Amity</span>
					</m.div>
					<h2
						className="text-3xl font-bold text-[#0A2C59] md:text-4xl"
						style={{ fontFamily: "var(--font-libre-baskerville), serif" }}
					>
							Recognition and trust built over years
						</h2>
						<p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#6C7676] md:text-base">
							A credible educational experience depends on standards, consistency, and outcomes — the signals students and families rely on.
						</p>
					</m.div>

					{/* Cards */}
					<m.div
						className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
						variants={reducedMotion ? undefined : cardContainer}
						initial={reducedMotion ? { opacity: 0 } : "hidden"}
						whileInView={reducedMotion ? { opacity: 1 } : "show"}
						viewport={{ once: true, amount: 0.1 }}
						transition={reducedMotion ? { duration: 0.2 } : undefined}
					>
						{recognitions.map((item) => (
							<m.div
								key={item.title}
								variants={reducedMotion ? undefined : cardItem}
								whileHover={reducedMotion ? undefined : { y: -5, transition: { duration: 0.22, ease: "easeOut" } }}
								className="group flex flex-col rounded-2xl border border-[#E6E8EC] bg-[#FFFFFF] p-5 shadow-[0_4px_16px_rgba(10,44,89,0.06)] transition-shadow hover:shadow-[0_12px_32px_rgba(10,44,89,0.12)]"
							>
								{/* Icon badge */}
								<m.span
									whileHover={reducedMotion ? undefined : { scale: 1.08, transition: { duration: 0.18 } }}
									className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#0A2C59]/10 bg-[#0A2C59]/5 text-[#0A2C59]"
								>
									{item.icon}
								</m.span>
								{/* Gold divider — animates width on card entry */}
								<m.div
									initial={{ width: 0 }}
									whileInView={{ width: 32 }}
									viewport={{ once: true }}
									transition={{ duration: reducedMotion ? 0.1 : 0.5, ease: [0.22, 1, 0.36, 1], delay: reducedMotion ? 0 : 0.18 }}
									className="mb-3 h-[2px] rounded-full bg-[#FACB06]"
								/>
								<h3
									className="font-[family-name:var(--font-libre-baskerville)] text-base font-bold leading-snug text-[#0A2C59]"
									style={{ fontFamily: "var(--font-libre-baskerville), serif" }}
								>
									{item.title}
								</h3>
								<p className="mt-2 text-sm leading-relaxed text-[#6C7676]">{item.detail}</p>
							</m.div>
						))}
					</m.div>

					{/* Marquee trust strip */}
					<m.div
						initial={{ opacity: 0, y: reducedMotion ? 0 : 12 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.3 }}
						transition={{ duration: reducedMotion ? 0.15 : 0.45, ease: [0.22, 1, 0.36, 1], delay: reducedMotion ? 0 : 0.25 }}
						className="mt-8 overflow-hidden rounded-2xl border border-[#E6E8EC] bg-[#FFFFFF] py-3"
					>
						{reducedMotion ? (
							<div className="flex flex-wrap gap-2 px-4">
								{trustPhrases.map((phrase) => (
									<span key={phrase} className="inline-flex items-center gap-1.5 rounded-full border border-[#E6E8EC] bg-[#FFFFFF] px-3 py-1 text-xs font-medium text-[#0A2C59]">
										<span className="h-1 w-1 rounded-full bg-[#FACB06]" aria-hidden="true" />
										{phrase}
									</span>
								))}
							</div>
						) : (
							<div className="marquee-track gap-3">
								{marqueeItems.map((phrase, index) => (
									<span
										key={`${phrase}-${index}`}
										className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#E6E8EC] bg-[#FFFFFF] px-4 py-1.5 text-xs font-medium text-[#0A2C59]"
									>
										<span className="h-1 w-1 shrink-0 rounded-full bg-[#FACB06]" aria-hidden="true" />
										{phrase}
									</span>
								))}
							</div>
						)}
					</m.div>
				</LazyMotion>
			</div>
		</section>
	);
}
