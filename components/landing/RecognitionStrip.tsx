"use client";

import { LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";

const recognitions = [
	{
		badge: "India Today Ranking",
		icon: (
			<svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
				<path d="M12 2 15.09 8.26 22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z" strokeLinecap="round" strokeLinejoin="round" />
			</svg>
		),
		title: "India's #1 Not-for-Profit Private University",
		detail: "Ranked No. 1 for eleven consecutive years by India Today among not-for-profit private universities in India.",
	},
	{
		badge: "US Accreditation",
		icon: (
			<svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
				<circle cx="12" cy="8" r="6" strokeLinecap="round" />
				<path d="M3 20.4v-.4a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v.4" strokeLinecap="round" />
			</svg>
		),
		title: "WSCUC Accredited — Asia's Only",
		detail: "Asia's only not-for-profit university to receive WSCUC (US Regional) accreditation — the gold standard globally.",
	},
	{
		badge: "UK Certification",
		icon: (
			<svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
				<rect x="3" y="3" width="18" height="18" rx="3" />
				<path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
			</svg>
		),
		title: "QAA Certified by UK",
		detail: "Certified by the UK's Quality Assurance Agency for Higher Education — recognising international academic standards.",
	},
	{
		badge: "UGC Recognised",
		icon: (
			<svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
				<path d="M22 10v6M2 10l10-5 10 5-10 5-10-5Z" strokeLinecap="round" strokeLinejoin="round" />
				<path d="M6 12v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5" strokeLinecap="round" />
			</svg>
		),
		title: "UGC & AICTE Approved",
		detail: "Fully recognised by the University Grants Commission and AICTE, India — eligible for UPSC, CAT, GATE and all national exams.",
	},
] as const;

const trustPhrases = [
	"27,000+ on-campus placements last year",
	"Ranked Top 3% Universities Globally",
	"NAAC A++ Grade",
	"11 consecutive years India's #1 not-for-profit private university",
	"Asia's only WSCUC-accredited not-for-profit university",
	"150,000+ students across 12 universities",
	"2210 patents filed — more than any single Indian university",
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
							Accreditations &amp; rankings you can verify
						</h2>
						<p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#6C7676] md:text-base">
							Amity holds India's highest university accreditations — including the only US and UK dual accreditation in Asia — backed by 27 years of consistent rankings.
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
								whileHover={reducedMotion ? undefined : { y: -6, transition: { duration: 0.22, ease: "easeOut" } }}
								className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#E6E8EC] bg-gradient-to-b from-[#FFFDF0]/70 to-[#FFFFFF] p-5 shadow-[0_4px_16px_rgba(10,44,89,0.06)] transition-shadow hover:shadow-[0_14px_36px_rgba(10,44,89,0.14)]"
							>
								{/* Gold top-border accent */}
								<div className="absolute left-0 right-0 top-0 h-[3px] bg-gradient-to-r from-[#FACB06] via-[#FACB06]/80 to-[#FACB06]/30" aria-hidden="true" />
								{/* Source badge */}
								<span className="mb-3 self-start rounded-full border border-[#FACB06]/40 bg-[#FFFBEA] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#8A6800]">
									{item.badge}
								</span>
								{/* Icon badge — warm gold glow */}
								<m.span
									whileHover={reducedMotion ? undefined : { scale: 1.1, rotate: 4, transition: { duration: 0.2 } }}
									className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#FACB06]/30 bg-[#FFFBEA] text-[#9A6E00] shadow-[0_0_0_4px_rgba(250,203,6,0.08)]"
								>
									{item.icon}
								</m.span>
								{/* Gold divider */}
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
