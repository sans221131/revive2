"use client";

import { LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";
import NextImage from "next/image";
import { useEnquireModal } from "../../src/lib/enquire-context";

// ─── Icons ────────────────────────────────────────────────────────────────────

type IconProps = { className?: string };

function IconBriefcase({ className }: IconProps) {
	return (
		<svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
			<rect x="3" y="6" width="18" height="13" rx="2" />
			<path d="M9 6V4.8A1.8 1.8 0 0 1 10.8 3h2.4A1.8 1.8 0 0 1 15 4.8V6M3 12h18" strokeLinecap="round" />
		</svg>
	);
}

function IconDual({ className }: IconProps) {
	return (
		<svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
			<circle cx="8.5" cy="12" r="5.5" />
			<circle cx="15.5" cy="12" r="5.5" />
		</svg>
	);
}

function IconBarChart({ className }: IconProps) {
	return (
		<svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
			<path d="M4 20v-6M8 20V10M12 20V4M16 20v-8M20 20v-4" strokeLinecap="round" />
		</svg>
	);
}

function IconBrain({ className }: IconProps) {
	return (
		<svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
			<path d="M9.5 2A4.5 4.5 0 0 0 5 6.5v.17A4 4 0 0 0 3 10a4 4 0 0 0 2 3.46V15a3 3 0 0 0 3 3h1" strokeLinecap="round" strokeLinejoin="round" />
			<path d="M14.5 2A4.5 4.5 0 0 1 19 6.5v.17A4 4 0 0 1 21 10a4 4 0 0 1-2 3.46V15a3 3 0 0 1-3 3h-1" strokeLinecap="round" strokeLinejoin="round" />
			<path d="M9 18h6M12 15v6" strokeLinecap="round" />
		</svg>
	);
}

function IconMegaphone({ className }: IconProps) {
	return (
		<svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
			<path d="M3 11v2a7 7 0 0 0 7 7h1" strokeLinecap="round" />
			<path d="M18 4C14.5 7 10 9 5 9v6c5 0 9.5 2 13 5V4Z" strokeLinejoin="round" />
			<path d="M21 8v8" strokeLinecap="round" />
		</svg>
	);
}

function IconUsers({ className }: IconProps) {
	return (
		<svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
			<path d="M16 18v-1a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v1" strokeLinecap="round" />
			<circle cx="10" cy="8" r="3" />
			<path d="M20 18v-1a3 3 0 0 0-2.2-2.9M16 5.3a3 3 0 0 1 0 5.4" strokeLinecap="round" />
		</svg>
	);
}

function IconGlobe({ className }: IconProps) {
	return (
		<svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
			<circle cx="12" cy="12" r="9" />
			<path d="M3 12h18M12 3c2.5 2.4 3.5 6 3.5 9S14.5 18.6 12 21M12 3c-2.5 2.4-3.5 6-3.5 9S9.5 18.6 12 21" strokeLinecap="round" />
		</svg>
	);
}

function IconRocket({ className }: IconProps) {
	return (
		<svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
			<path d="M12 2C8 6 8 10 8 12l4 4c2 0 6 0 10-4-1-4-6-9-10-10Z" strokeLinejoin="round" />
			<path d="M8 12c-2 2-2 4-2 6 2 0 4 0 6-2" strokeLinejoin="round" />
			<circle cx="14" cy="10" r="1.5" fill="currentColor" stroke="none" />
		</svg>
	);
}

function IconHeart({ className }: IconProps) {
	return (
		<svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
			<path d="M12 21C12 21 3 15 3 8.5A4.5 4.5 0 0 1 12 6.4 4.5 4.5 0 0 1 21 8.5C21 15 12 21 12 21Z" strokeLinejoin="round" />
		</svg>
	);
}

// ─── Data ─────────────────────────────────────────────────────────────────────

type Course = {
	title: string;
	subtitle: string;
	tag?: string;
	tagColor?: "gold" | "blue" | "green";
	salary: string;
	skills: [string, string, string];
	description: string;
	Icon: React.FC<IconProps>;
};

const courses: Course[] = [
	{
		title: "General Management",
		subtitle: "MBA",
		tag: "Most Popular",
		tagColor: "gold",
		salary: "₹8 – 15 LPA",
		skills: ["Strategy", "Leadership", "Finance"],
		description:
			"The broadest MBA path — covers strategy, finance, marketing, and operations. Perfect for anyone who wants to lead across business functions.",
		Icon: IconBriefcase,
	},
	{
		title: "Business Analytics",
		subtitle: "MBA",
		tag: "High Demand",
		tagColor: "blue",
		salary: "₹10 – 18 LPA",
		skills: ["Python", "SQL", "BI Tools"],
		description:
			"Turn data into decisions. Master analytics tools and frameworks used by top consulting and tech firms to solve real business problems.",
		Icon: IconBarChart,
	},
	{
		title: "Data Science",
		subtitle: "MBA",
		tag: "Fastest Growing",
		tagColor: "green",
		salary: "₹12 – 22 LPA",
		skills: ["Machine Learning", "AI", "Predictive Analytics"],
		description:
			"The highest-paying MBA specialization. Bridge business thinking with ML and AI to become the data leader every organization is hiring for.",
		Icon: IconBrain,
	},
	{
		title: "Digital Marketing",
		subtitle: "MBA",
		salary: "₹7 – 14 LPA",
		skills: ["SEO & SEM", "Social Media", "Performance Analytics"],
		description:
			"Run campaigns, build brands, and drive growth across digital channels. One of the most versatile and in-demand MBA tracks today.",
		Icon: IconMegaphone,
	},
	{
		title: "HR Analytics",
		subtitle: "MBA",
		salary: "₹7 – 13 LPA",
		skills: ["People Analytics", "HR Tech", "Org Behavior"],
		description:
			"The future of HR is data-first. Learn to attract, retain, and develop talent using analytics tools and behavioral science frameworks.",
		Icon: IconUsers,
	},
	{
		title: "International Finance",
		subtitle: "MBA",
		tag: "Global Career",
		tagColor: "blue",
		salary: "₹10 – 20 LPA",
		skills: ["Forex & Derivatives", "Global Markets", "Risk Mgmt"],
		description:
			"Navigate global capital markets, cross-border M&A, and international finance strategy. A top pick for careers in banking and consulting.",
		Icon: IconGlobe,
	},
	{
		title: "Digital Entrepreneurship",
		subtitle: "MBA",
		tag: "Future-Ready",
		tagColor: "gold",
		salary: "₹8 – 16 LPA",
		skills: ["Product Thinking", "Growth Strategy", "Fundraising"],
		description:
			"Build and scale your own venture or join an early-stage startup with the playbooks, mindset, and tools founders actually use.",
		Icon: IconRocket,
	},
	{
		title: "Dual Specialization",
		subtitle: "MBA",
		salary: "₹10 – 18 LPA",
		skills: ["Cross-Functional", "Versatile Profile", "Leadership"],
		description:
			"Two specializations. One degree. Double your career options and stand out in every interview with a uniquely versatile skill set.",
		Icon: IconDual,
	},
	{
		title: "Healthcare Management",
		subtitle: "MBA",
		salary: "₹8 – 14 LPA",
		skills: ["Hospital Ops", "Health Policy", "Healthcare Finance"],
		description:
			"Lead hospitals, health-tech firms, and pharma companies. A specialized MBA built for India's fastest-growing sector.",
		Icon: IconHeart,
	},
];

// ─── Tag color map ─────────────────────────────────────────────────────────────

const tagStyles: Record<string, string> = {
	gold: "bg-[#FACB06]/15 text-[#FACB06] border-[#FACB06]/20",
	blue: "bg-[#0A2C59]/40 text-[#93b8f8] border-[#93b8f8]/20",
	green: "bg-emerald-500/10 text-emerald-300 border-emerald-400/20",
};

// ─── Card ─────────────────────────────────────────────────────────────────────

function CourseCard({
	course,
	index,
	reducedMotion,
}: {
	course: Course;
	index: number;
	reducedMotion: boolean | null;
}) {
	const { openModal } = useEnquireModal();

	return (
		<m.article
			initial={{ opacity: 0, y: reducedMotion ? 0 : 28 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, amount: 0.1 }}
			transition={{
				duration: reducedMotion ? 0.15 : 0.5,
				ease: [0.22, 1, 0.36, 1],
				delay: reducedMotion ? 0 : (index % 3) * 0.08,
			}}
			className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#FACB06]/30 hover:bg-white/[0.06] hover:shadow-[0_20px_50px_rgba(0,0,0,0.40)]"
		>
			{/* Hover radial glow */}
			<div
				aria-hidden="true"
				className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
				style={{
					background: "radial-gradient(360px 180px at 50% 0%, rgba(250,203,6,0.09), transparent 70%)",
				}}
			/>

			<div className="flex flex-1 flex-col p-5">
				{/* Top row: icon + tag */}
				<div className="mb-4 flex items-start justify-between gap-3">
					<div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-[#FACB06]/20 bg-[#FACB06]/10 text-[#FACB06] transition-all duration-300 group-hover:border-[#FACB06]/40 group-hover:bg-[#FACB06]/18">
						<course.Icon className="h-[18px] w-[18px]" />
					</div>
					{course.tag ? (
						<span
							className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] ${
								tagStyles[course.tagColor ?? "gold"]
							}`}
						>
							{course.tag}
						</span>
					) : (
						<div className="h-[22px]" aria-hidden="true" />
					)}
				</div>

				{/* Subtitle + Title */}
				<p className="mb-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#FACB06]/50">
					{course.subtitle}
				</p>
				<h3
					className="mb-3 text-[1.05rem] font-bold leading-snug text-white"
					style={{ fontFamily: "var(--font-libre-baskerville), serif" }}
				>
					{course.title}
				</h3>

				{/* Salary — #1 CRO hook for MBA seekers */}
				<div className="mb-3 flex items-center gap-2">
					<span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#FACB06]" aria-hidden="true" />
					<p className="text-[12px] font-semibold text-[#FACB06]">
						Avg. career outcome:{" "}
						<span className="text-[13px]">{course.salary}</span>
					</p>
				</div>

				{/* Description */}
				<p className="mb-4 flex-1 text-[13px] leading-relaxed text-white/48">
					{course.description}
				</p>

				{/* Skill chips */}
				<div className="mb-4 flex flex-wrap gap-1.5">
					{course.skills.map((s) => (
						<span
							key={s}
							className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10.5px] font-medium text-white/50"
						>
							{s}
						</span>
					))}
				</div>
			</div>

			{/* CTA button — full-width, prominent */}
			<button
				onClick={() => openModal()}
				aria-label={`Get free counselling for MBA in ${course.title}`}
				className="w-full border-t border-white/[0.07] bg-white/[0.03] py-3.5 text-[13px] font-semibold text-[#FACB06] transition-all duration-200 hover:bg-[#FACB06] hover:text-[#041428] active:scale-[0.98]"
			>
				Get Free Counselling →
			</button>
		</m.article>
	);
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function CoursesSection() {
	const reducedMotion = useReducedMotion();
	const { openModal } = useEnquireModal();

	return (
		<section
			id="courses"
			className="relative scroll-mt-24 overflow-hidden py-16 md:py-24"
			style={{
				background:
					"radial-gradient(circle at 14% 18%, rgba(250,203,6,0.12), transparent 38%), radial-gradient(circle at 85% 78%, rgba(10,44,89,0.38), transparent 48%), linear-gradient(160deg, #041428 0%, #071c3b 55%, #041428 100%)",
			}}
		>
			{/* Dot-grid texture */}
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-0"
				style={{
					backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
					backgroundSize: "24px 24px",
					maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 100%)",
				}}
			/>

			<div className="container-shell relative">
				<LazyMotion features={domAnimation}>

					{/* ── Urgency bar ──────────────────────────────────────────────── */}
					<m.div
						initial={{ opacity: 0, y: reducedMotion ? 0 : -10 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.6 }}
						transition={{ duration: reducedMotion ? 0.15 : 0.4, ease: "easeOut" }}
						className="mb-10 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#FACB06]/18 bg-[#FACB06]/[0.07] px-5 py-3"
					>
						<div className="flex items-center gap-2.5">
							<span className="relative flex h-2 w-2">
								<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FACB06] opacity-60" />
								<span className="relative inline-flex h-2 w-2 rounded-full bg-[#FACB06]" />
							</span>
							<span className="text-[12.5px] font-semibold text-[#FACB06]">
								Admissions Open &mdash; Jan 2026 Batch
							</span>
						</div>
						<div className="flex flex-wrap items-center gap-3 text-[11.5px] text-white/45">
							<span>96% Seats Filled</span>
							<span aria-hidden="true" className="hidden h-3 w-px bg-white/20 sm:block" />
							<span>2 Lakh+ Enrolled Learners</span>
							<span aria-hidden="true" className="hidden h-3 w-px bg-white/20 sm:block" />
							<span>QS Asia Pacific Top 10</span>
						</div>
					</m.div>

					{/* ── Heading ──────────────────────────────────────────────────── */}
					<div className="mb-12 grid gap-6 md:grid-cols-[1fr_1.35fr] md:items-end">
						<m.div
							initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.3 }}
							transition={{ duration: reducedMotion ? 0.15 : 0.48, ease: [0.22, 1, 0.36, 1] }}
						>
							<div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#FACB06]/20 bg-[#FACB06]/10 px-4 py-1.5">
								<span className="h-1.5 w-1.5 rounded-full bg-[#FACB06]" aria-hidden="true" />
								<span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#FACB06]">
									9 MBA Specializations
								</span>
							</div>
							<h2
								className="text-3xl font-bold leading-tight text-white md:text-4xl lg:text-[2.55rem]"
								style={{ fontFamily: "var(--font-libre-baskerville), serif" }}
							>
								Pick the MBA path{" "}
								<br className="hidden md:block" />
								that pays <span className="text-[#FACB06]">you back</span>
							</h2>
						</m.div>

						<m.div
							initial={{ opacity: 0, y: reducedMotion ? 0 : 14 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.3 }}
							transition={{
								duration: reducedMotion ? 0.15 : 0.42,
								ease: "easeOut",
								delay: reducedMotion ? 0 : 0.1,
							}}
						>
							<p className="text-[15px] leading-relaxed text-white/52">
								India&apos;s only QS-ranked Online MBA — 9 career-focused specializations, fully online,
								UGC-approved. Every card below shows real average salary outcomes so you can make an
								informed choice, not a hopeful one.
							</p>

							{/* Partner credit — compact badge */}
							<div className="mt-3">
								<div className="inline-flex items-center gap-3 rounded-full bg-white/[0.03] px-3 py-2 text-sm text-white/70">
									<NextImage
										src="/coursewaalalogo.png"
										alt="Coursewaala"
										width={92}
										height={30}
										className="h-5 w-auto object-contain"
										style={{ filter: "brightness(0) invert(1)" }}
										unoptimized
									/>
									<span className="leading-snug">
										Supported by <span className="font-semibold text-[#FACB06]">Coursewaala</span>
									</span>
								</div>
							</div>
						</m.div>
					</div>

					{/* ── Cards grid ───────────────────────────────────────────────── */}
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
						{courses.map((course, i) => (
							<CourseCard
								key={course.title}
								course={course}
								index={i}
								reducedMotion={reducedMotion}
							/>
						))}
					</div>

					{/* ── Bottom conversion strip ───────────────────────────────────── */}
					<m.div
						initial={{ opacity: 0, y: reducedMotion ? 0 : 18 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.4 }}
						transition={{ duration: reducedMotion ? 0.15 : 0.44, ease: "easeOut", delay: reducedMotion ? 0 : 0.12 }}
						className="mt-10 flex flex-col items-stretch gap-5 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-6 sm:flex-row sm:items-center sm:gap-8 md:p-8"
					>
						<div className="flex-1">
							<p
								className="mb-1.5 text-[1.1rem] font-bold text-white"
								style={{ fontFamily: "var(--font-libre-baskerville), serif" }}
							>
								Not sure which MBA fits your goals?
							</p>
							<p className="text-[13px] text-white/45">
								Talk to an Amity counsellor — free, 15 minutes, no commitment. They&apos;ll map the right
								specialization to your career profile.
							</p>
						</div>

						<div className="flex shrink-0 flex-col gap-3 sm:flex-row">
							<button
								onClick={() => openModal()}
								className="rounded-full bg-[#FACB06] px-7 py-3 text-[13.5px] font-semibold text-[#041428] transition-all duration-200 hover:bg-[#c8a205] hover:shadow-[0_8px_28px_rgba(250,203,6,0.32)] active:scale-[0.97]"
							>
								Book Free Counselling
							</button>
							<button
								onClick={() => openModal()}
								className="rounded-full border border-white/20 px-7 py-3 text-[13.5px] font-semibold text-white/80 transition-all duration-200 hover:border-white/40 hover:text-white active:scale-[0.97]"
							>
								Apply Now
							</button>
						</div>
					</m.div>

				</LazyMotion>
			</div>
		</section>
	);
}
