"use client";

import { LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";
import { Button } from "../ui/Button";
import { useEnquireModal } from "../../src/lib/enquire-context";

type IconProps = {
	className?: string;
};

function IconBook({ className }: IconProps) {
	return (
		<svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
			<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16.5H6.5A2.5 2.5 0 0 0 4 22V5.5Z" strokeLinecap="round" strokeLinejoin="round" />
			<path d="M8 7h7M8 11h8M8 15h5" strokeLinecap="round" />
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

function IconUsers({ className }: IconProps) {
	return (
		<svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
			<path d="M16 18v-1a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v1" strokeLinecap="round" />
			<circle cx="10" cy="8" r="3" />
			<path d="M20 18v-1a3 3 0 0 0-2.2-2.9M16 5.3a3 3 0 0 1 0 5.4" strokeLinecap="round" />
		</svg>
	);
}

function IconBriefcase({ className }: IconProps) {
	return (
		<svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
			<rect x="3" y="6" width="18" height="13" rx="2" />
			<path d="M9 6V4.8A1.8 1.8 0 0 1 10.8 3h2.4A1.8 1.8 0 0 1 15 4.8V6M3 12h18" strokeLinecap="round" />
		</svg>
	);
}

function IconShield({ className }: IconProps) {
	return (
		<svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
			<path d="M12 3 5 6v6.5c0 4.2 2.7 6.9 7 8.5 4.3-1.6 7-4.3 7-8.5V6l-7-3Z" strokeLinejoin="round" />
			<path d="m9 12 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);
}

function IconSpark({ className }: IconProps) {
	return (
		<svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
			<path d="m12 3 1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3Z" strokeLinejoin="round" />
			<path d="m19 15 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15ZM5 14l.8 2.2L8 17l-2.2.8L5 20l-.8-2.2L2 17l2.2-.8L5 14Z" strokeLinejoin="round" />
		</svg>
	);
}

const pillars = [
	{
		title: "Academic Discipline",
		description: "Structured pedagogy, clear assessment systems, and faculty-guided academic progression.",
		Icon: IconBook,
	},
	{
		title: "Global Perspective",
		description: "International exposure opportunities that broaden learning and improve professional adaptability.",
		Icon: IconGlobe,
	},
	{
		title: "Student Mentorship",
		description: "Dedicated support from advisors and mentors for academic planning and growth decisions.",
		Icon: IconUsers,
	},
	{
		title: "Career Integration",
		description: "Career preparedness embedded through projects, workshops, and placement-oriented guidance.",
		Icon: IconBriefcase,
	},
	{
		title: "Reliable Governance",
		description: "Process-driven academic operations with consistent quality checks and transparent standards.",
		Icon: IconShield,
	},
	{
		title: "Holistic Development",
		description: "Balanced development through academics, leadership opportunities, and extracurricular engagement.",
		Icon: IconSpark,
	},
] as const;

const keywords = ["Excellence", "Exposure", "Mentorship", "Careers", "Trust", "Growth"] as const;

export default function PillarsGrid() {
	const reducedMotion = useReducedMotion();
	const { openModal } = useEnquireModal();

	return (
		<section id="why" className="relative scroll-mt-24 overflow-hidden bg-[#F7F7F7] py-10 md:py-16">
			{/* subtle premium background texture */}
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-0"
				style={{
					background:
						"radial-gradient(900px 300px at 10% 10%, rgba(250,203,6,0.10), transparent 55%), radial-gradient(900px 300px at 90% 0%, rgba(10,44,89,0.08), transparent 50%)",
				}}
			/>

			<div className="container-shell relative">
				<LazyMotion features={domAnimation}>
					{/* Heading */}
					<div className="mb-10 grid gap-6 md:mb-12 md:grid-cols-[1fr_1.5fr] md:items-end">
						<m.div
							initial={{ opacity: 0, y: reducedMotion ? 0 : 18 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.3 }}
							transition={{ duration: reducedMotion ? 0.15 : 0.46, ease: [0.22, 1, 0.36, 1] }}
						>
							<div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#0A2C59]/15 bg-white/40 px-4 py-1.5 backdrop-blur">
								<span className="h-1.5 w-1.5 rounded-full bg-[#FACB06]" aria-hidden="true" />
								<span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#0A2C59]">Six Core Pillars</span>
							</div>

							<h2
								className="text-3xl font-bold leading-tight text-[#0A2C59] md:text-4xl lg:text-[2.6rem]"
								style={{ fontFamily: "var(--font-libre-baskerville), serif" }}
							>
								Why students{" "}
								<br className="hidden md:block" />
								choose Amity
							</h2>
						</m.div>

						<m.div
							initial={{ opacity: 0, y: reducedMotion ? 0 : 12 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.3 }}
							transition={{ duration: reducedMotion ? 0.15 : 0.4, ease: "easeOut", delay: reducedMotion ? 0 : 0.1 }}
							className="md:pb-1"
						>
							<p className="text-[15px] leading-relaxed text-[#6C7676]">
								A premium academic environment is built on systems that support outcomes, not only admissions. These pillars define that experience.
							</p>
						</m.div>
					</div>

					{/* Pillars */}
					<ul className="space-y-4 md:space-y-0">
						{pillars.map((pillar, i) => {
							const num = String(i + 1).padStart(2, "0");
							const isLast = i === pillars.length - 1;

							return (
								<m.li
									key={pillar.title}
									initial={{ opacity: 0, y: reducedMotion ? 0 : 18 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true, amount: 0.2 }}
									transition={{
										duration: reducedMotion ? 0.15 : 0.44,
										ease: [0.22, 1, 0.36, 1],
										delay: reducedMotion ? 0 : i * 0.06,
									}}
									className={[
										// Mobile: card
										"group relative rounded-2xl border border-[#0A2C59]/10 bg-white/60 p-5 shadow-[0_1px_0_rgba(10,44,89,0.06)] backdrop-blur",
										"transition-all duration-300",
										"hover:border-[#0A2C59]/16 hover:bg-white/75 hover:shadow-[0_8px_30px_rgba(10,44,89,0.10)]",
										"active:scale-[0.99]",
										// Desktop: row list
										"md:rounded-none md:border-0 md:bg-transparent md:p-0 md:shadow-none md:backdrop-blur-0 md:active:scale-100",
										isLast ? "md:pt-7 md:pb-0" : "md:border-b md:border-[#0A2C59]/[0.07] md:py-7 md:hover:bg-white/70",
									].join(" ")}
								>
									{/* Desktop gold number */}
									<div className="hidden w-14 shrink-0 items-start pt-0.5 md:flex md:w-20">
										<span
											className="text-3xl font-bold leading-none tracking-tight text-[#FACB06] transition-opacity duration-300 group-hover:opacity-100 md:text-4xl"
											style={{ fontFamily: "var(--font-libre-baskerville), serif", opacity: 0.78 }}
											aria-hidden="true"
										>
											{num}
										</span>
									</div>

									{/* Desktop vertical separator */}
									<div
										className="hidden w-px shrink-0 self-stretch bg-[#FACB06]/20 transition-colors duration-300 group-hover:bg-[#FACB06]/50 md:block"
										aria-hidden="true"
									/>

									{/* Content */}
									<div className="flex flex-1 flex-col justify-center md:flex-row md:items-center md:gap-8 md:pl-8">
										{/* Left column */}
										<div className="flex-1">
											<div className="flex items-start justify-between gap-3">
												<div className="flex items-start gap-3">
													{/* Icon chip */}
													<span className="mt-0.5 grid h-10 w-10 place-items-center rounded-xl border border-[#0A2C59]/10 bg-white/70 text-[#0A2C59]/70 transition-colors duration-300 group-hover:text-[#FACB06] md:h-9 md:w-9 md:rounded-full">
														<pillar.Icon className="h-[18px] w-[18px]" />
													</span>

													<div>
														<h3
															className="text-lg font-bold leading-snug text-[#0A2C59] md:text-xl"
															style={{ fontFamily: "var(--font-libre-baskerville), serif" }}
														>
															{pillar.title}
														</h3>

														{/* Mobile chips */}
														<div className="mt-2 flex flex-wrap items-center gap-2 md:hidden">
															<span className="rounded-full bg-[#FACB06]/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0A2C59]">
																{num}
															</span>
															<span className="rounded-full border border-[#0A2C59]/10 bg-white/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0A2C59]/60">
																{keywords[i]}
															</span>
														</div>
													</div>
												</div>

												{/* Desktop keyword (far right is kept below; this is just spacing safety) */}
											</div>

											{/* Underline */}
											<m.div
												className="mt-3 h-[2px] rounded-full bg-[#FACB06]"
												initial={{ width: 0 }}
												whileInView={{ width: 40 }}
												viewport={{ once: true }}
												transition={{
													duration: reducedMotion ? 0.1 : 0.5,
													ease: [0.22, 1, 0.36, 1],
													delay: reducedMotion ? 0 : i * 0.06 + 0.18,
												}}
											/>

											<p className="mt-3 text-[14px] leading-relaxed text-[#6C7676] md:hidden">
												{pillar.description}
											</p>
										</div>

										{/* Description — desktop only, right column */}
										<p className="hidden flex-1 text-[14.5px] leading-relaxed text-[#6C7676] md:block">
											{pillar.description}
										</p>

										{/* Keyword tag — desktop only, far right */}
										<div className="hidden w-28 shrink-0 items-center justify-end md:flex">
											<span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0A2C59]/20 transition-colors duration-300 group-hover:text-[#FACB06]/70">
												{keywords[i]}
											</span>
										</div>
									</div>
								</m.li>
							);
						})}
					</ul>

				{/* Enquire CTA */}
				<m.div
					initial={{ opacity: 0, y: reducedMotion ? 0 : 14 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.3 }}
					transition={{ duration: reducedMotion ? 0.15 : 0.4, ease: "easeOut", delay: reducedMotion ? 0 : 0.1 }}
					className="mt-10 flex flex-col items-center gap-3 border-t border-[#0A2C59]/[0.07] pt-10 text-center"
				>
					<p className="text-[13px] text-[#6C7676]">Built on these six commitments — begin your journey today.</p>
					<Button className="rounded-full" size="lg" onClick={openModal}>
						Enquire Now
					</Button>
				</m.div>

				</LazyMotion>
			</div>
		</section>
	);
}