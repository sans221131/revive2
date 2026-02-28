"use client";

import { LazyMotion, domAnimation, m, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";
import React, { useMemo, useState } from "react";
import { Tabs } from "../ui/Tabs";
import { Button } from "../ui/Button";
import { useEnquireModal } from "../../src/lib/enquire-context";

type LifeTabId = "facilities" | "clubs" | "sports" | "events" | "support";

type LifeTabContent = {
	title: string;
	points: string[];
	stats: string[];
	checklist: string[];
	image: string;
	imageAlt: string;
};

const tabIcons: Record<LifeTabId, React.ReactNode> = {
	facilities: (
		<svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
			<path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5Z" strokeLinecap="round" strokeLinejoin="round" />
			<path d="M9 21V12h6v9" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	),
	clubs: (
		<svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
			<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" strokeLinecap="round" />
			<circle cx="9" cy="7" r="4" />
			<path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" strokeLinecap="round" />
		</svg>
	),
	sports: (
		<svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
			<circle cx="12" cy="12" r="9" />
			<path d="M12 3a14.5 14.5 0 0 0 0 18M3 12a14.5 14.5 0 0 0 18 0" strokeLinecap="round" />
		</svg>
	),
	events: (
		<svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
			<rect x="3" y="4" width="18" height="18" rx="2" />
			<path d="M16 2v4M8 2v4M3 10h18" strokeLinecap="round" />
			<path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" strokeLinecap="round" strokeWidth="2.5" />
		</svg>
	),
	support: (
		<svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
			<path d="M3 18v-6a9 9 0 1 1 18 0v6" strokeLinecap="round" />
			<path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3v5ZM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3v5Z" />
		</svg>
	),
};

const tabLabels: Array<{ id: LifeTabId; label: string; icon: React.ReactNode }> = [
	{ id: "facilities", label: "Facilities", icon: tabIcons.facilities },
	{ id: "clubs", label: "Clubs", icon: tabIcons.clubs },
	{ id: "sports", label: "Sports", icon: tabIcons.sports },
	{ id: "events", label: "Events", icon: tabIcons.events },
	{ id: "support", label: "Support", icon: tabIcons.support },
];

const tabContent: Record<LifeTabId, LifeTabContent> = {
	facilities: {
		title: "Campus facilities built for focused academic life",
		points: [
			"Well-equipped learning spaces for lectures, tutorials, and collaborative study.",
			"Dedicated labs and practical environments aligned with discipline requirements.",
			"Resource-rich libraries with quiet reading zones and digital access support.",
			"Student zones for independent project work and peer collaboration.",
			"Comfortable campus services designed for long academic days.",
		],
		stats: ["Modern library infrastructure", "Multiple study zones", "Lab-first pedagogy"],
		checklist: ["Academic resource access", "Extended study spaces", "Technology-enabled learning"],
		image: "/campus.webp",
		imageAlt: "Amity University campus facilities",
	},
	clubs: {
		title: "Student clubs that build leadership and confidence",
		points: [
			"Domain and interest-based clubs for communication, management, and innovation.",
			"Peer-led initiatives with faculty oversight for quality and consistency.",
			"Opportunities to manage teams, deliver events, and present ideas.",
			"Cross-discipline collaboration to improve networking and real-world readiness.",
			"Participation pathways for beginners as well as experienced contributors.",
		],
		stats: ["Cross-domain communities", "Peer leadership opportunities", "Year-round activities"],
		checklist: ["Leadership exposure", "Communication practice", "Portfolio-building projects"],
		image: "/clubs.webp",
		imageAlt: "Students participating in Amity clubs and group activities",
	},
	sports: {
		title: "Sports culture that supports discipline and wellbeing",
		points: [
			"Structured sports participation for fitness, resilience, and teamwork.",
			"Access to indoor and outdoor formats based on student interest.",
			"Inter-house and inter-college formats encouraging healthy competition.",
			"Coaching support and regular practice routines for committed students.",
			"Balanced scheduling to align sports involvement with academics.",
		],
		stats: ["Competitive participation tracks", "Indoor and outdoor options", "Wellbeing-oriented routines"],
		checklist: ["Physical fitness support", "Teamwork development", "Performance mindset"],
		image: "/sports.jpg",
		imageAlt: "Amity students engaged in sports activities",
	},
	events: {
		title: "Events ecosystem with strong student participation",
		points: [
			"Academic, cultural, and professional events scheduled through the year.",
			"Expert talks and sessions to expose students to industry expectations.",
			"Institutional festivals that combine creativity with organizational responsibility.",
			"Presentation and competition platforms for confidence and visibility.",
			"Collaborative event planning across student groups and departments.",
		],
		stats: ["Continuous event calendar", "Industry interactions", "Student-led execution"],
		checklist: ["Public speaking opportunities", "Team event ownership", "Exposure to external experts"],
		image: "/scene.webp",
		imageAlt: "Amity University events and campus scene",
	},
	support: {
		title: "Student support designed for sustained progress",
		points: [
			"Academic advising for coursework decisions and progression planning.",
			"Counselling and wellbeing support for balanced student development.",
			"Placement and career guidance available through structured touchpoints.",
			"Administrative support channels that reduce process friction.",
			"Mentor access to help students navigate academic and career milestones.",
		],
		stats: ["Academic mentoring system", "Wellbeing support access", "Career guidance touchpoints"],
		checklist: ["Guided academic planning", "Counsellor access", "Career preparation support"],
		image: "/support.jpg",
		imageAlt: "Amity student support and counselling services",
	},
};

export default function StudentLifeTabs() {
	const reducedMotion = useReducedMotion();		 const { openModal } = useEnquireModal();	const [activeTab, setActiveTab] = useState<LifeTabId>("facilities");
	const [openAccordion, setOpenAccordion] = useState<LifeTabId | null>("facilities");
	const content = useMemo(() => tabContent[activeTab], [activeTab]);

	const toggleAccordion = (id: LifeTabId) =>
		setOpenAccordion((prev) => (prev === id ? null : id));

	return (
		<section id="life" className="scroll-mt-24 bg-[#F7F7F7] py-10 md:py-16">
			<div className="container-shell">
				<LazyMotion features={domAnimation}>
				<m.div
					initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.2 }}
					transition={{ duration: reducedMotion ? 0.15 : 0.45, ease: [0.22, 1, 0.36, 1] }}
					className="mb-12"
				>
					<div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#0A2C59]/15 bg-[#0A2C59]/5 px-4 py-1.5">
						<span className="h-1.5 w-1.5 rounded-full bg-[#FACB06]" aria-hidden="true" />
						<span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#0A2C59]">Campus Life</span>
					</div>
					<h2
						className="text-3xl font-bold text-[#0A2C59] md:text-4xl"
						style={{ fontFamily: "var(--font-libre-baskerville), serif" }}
					>
						Student life and facilities
					</h2>
					<p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#6C7676] md:text-base">
						A complete university experience goes beyond classrooms. Explore the environments and systems that shape day-to-day student growth.
					</p>
				</m.div>

				{/* ── Mobile accordion (hidden md+) ── */}
				<div className="md:hidden">
					<div className="space-y-2">
						{tabLabels.map((tab, idx) => {
							const isOpen = openAccordion === tab.id;
							const c = tabContent[tab.id];
							return (
								<m.div
									key={tab.id}
									initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true, amount: 0.1 }}
									transition={{ duration: reducedMotion ? 0.15 : 0.3, ease: "easeOut", delay: reducedMotion ? 0 : idx * 0.05 }}
									className={`overflow-hidden rounded-2xl border transition-colors duration-200 ${isOpen ? "border-[#0A2C59]/20 shadow-[0_4px_18px_rgba(10,44,89,0.08)]" : "border-[#E6E8EC]"}`}
								>
									{/* Accordion trigger */}
									<button
										type="button"
										aria-expanded={isOpen}
										aria-controls={`accordion-${tab.id}`}
										onClick={() => toggleAccordion(tab.id)}
										className="flex w-full items-center gap-3 bg-[#FFFFFF] px-4 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A2C59]/30"
									>
										<span
											className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-colors duration-200 ${isOpen ? "border-[#0A2C59]/20 bg-[#0A2C59] text-[#FFFFFF]" : "border-[#E6E8EC] bg-[#F7F7F7] text-[#0A2C59]"}`}
										>
											{tabIcons[tab.id]}
										</span>
										<span
											className="flex-1 font-semibold text-[#0A2C59]"
											style={{ fontFamily: "var(--font-libre-baskerville), serif" }}
										>
											{tab.label}
										</span>
										<m.span
											animate={{ rotate: isOpen ? 180 : 0 }}
											transition={{ duration: reducedMotion ? 0 : 0.22, ease: "easeOut" }}
											className="shrink-0 text-[#6C7676]"
											aria-hidden="true"
										>
											<svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
												<path d="M6 9l6 6 6-6" />
											</svg>
										</m.span>
									</button>

									{/* Accordion body */}
									<AnimatePresence initial={false}>
										{isOpen && (
											<m.div
												id={`accordion-${tab.id}`}
												key="body"
												initial={{ height: 0, opacity: 0 }}
												animate={{ height: "auto", opacity: 1 }}
												exit={{ height: 0, opacity: 0 }}
												transition={{ duration: reducedMotion ? 0.1 : 0.3, ease: [0.22, 1, 0.36, 1] }}
												style={{ overflow: "hidden" }}
											>
												<div className="border-t border-[#E6E8EC] px-4 pb-5 pt-4">
													{/* Tab photo */}
													<div className="mb-4 overflow-hidden rounded-xl border border-[#E6E8EC]">
														<Image
															src={c.image}
															alt={c.imageAlt}
															width={560}
															height={240}
															className="h-[140px] w-full object-cover"
														/>
													</div>
													{/* Gold divider + title */}
													<div className="mb-4 h-[2px] w-6 rounded-full bg-[#FACB06]" />
													<p
														className="mb-4 text-sm font-bold leading-snug text-[#0A2C59]"
														style={{ fontFamily: "var(--font-libre-baskerville), serif" }}
													>
														{c.title}
													</p>

													{/* Bullet points */}
													<ul className="mb-4 space-y-2.5">
														{c.points.map((point) => (
															<li key={point} className="flex gap-2.5 text-sm leading-relaxed text-[#6C7676]">
																<span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#FACB06]" aria-hidden="true" />
																<span>{point}</span>
															</li>
														))}
													</ul>

													{/* Highlights + checklist inline */}
													<div className="grid grid-cols-2 gap-3">
														<div className="rounded-xl border border-[#E6E8EC] bg-[#F7F7F7] p-3">
															<p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#0A2C59]/50">Highlights</p>
															<div className="space-y-1.5">
																{c.stats.map((stat) => (
																	<div key={stat} className="flex items-start gap-1.5">
																		<span className="mt-[5px] h-1 w-1 shrink-0 rounded-full bg-[#FACB06]" aria-hidden="true" />
																		<span className="text-[11px] font-medium leading-snug text-[#0A2C59]">{stat}</span>
																	</div>
																))}
															</div>
														</div>
														<div className="rounded-xl border border-[#0A2C59]/10 bg-[#0A2C59]/[0.03] p-3">
															<p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#0A2C59]/50">You get</p>
															<ul className="space-y-1.5">
																{c.checklist.map((item) => (
																	<li key={item} className="flex items-start gap-1.5">
																		<span className="mt-0.5 inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-[#0A2C59] text-[#FFFFFF]">
																			<svg viewBox="0 0 24 24" className="h-2 w-2" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
																				<path d="M5 13l4 4L19 7" />
																			</svg>
																		</span>
																		<span className="text-[11px] font-medium leading-snug text-[#0A2C59]">{item}</span>
																	</li>
																))}
															</ul>
														</div>
													</div>
												</div>
											</m.div>
										)}
									</AnimatePresence>
								</m.div>
							);
						})}
					</div>
				</div>

				{/* ── Desktop tabs (hidden below md) ── */}
				<div className="hidden md:block">
				<Tabs tabs={tabLabels} active={activeTab} onChange={setActiveTab} />

					<AnimatePresence mode="wait" initial={false}>
					<m.div
						key={activeTab}
						id={`panel-${activeTab}`}
						role="tabpanel"
						aria-labelledby={`tab-${activeTab}`}
						initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
						animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
						exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
						transition={{ duration: reducedMotion ? 0.16 : 0.3, ease: "easeOut" }}
						className="mt-5"
					>
						{/* Card */}
						<div className="overflow-hidden rounded-2xl border border-[#E6E8EC] bg-[#FFFFFF] shadow-[0_6px_32px_rgba(10,44,89,0.10)]">

							{/* Hero image with overlay + title */}
							<div className="relative h-[220px] w-full overflow-hidden">
								<Image
									src={content.image}
									alt={content.imageAlt}
									fill
									className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
									sizes="(max-width: 1200px) 100vw, 1200px"
									unoptimized
								/>
								{/* Gradient overlay */}
								<div className="absolute inset-0 bg-gradient-to-t from-[#041428]/80 via-[#041428]/30 to-transparent" />
								{/* Gold top accent */}
								<div className="absolute top-0 left-0 right-0 h-[3px] bg-[#FACB06]" aria-hidden="true" />
								{/* Icon + title on image */}
								<div className="absolute bottom-0 left-0 right-0 p-6 flex items-end gap-4">
									<span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FACB06] text-[#0A2C59]">
										{tabIcons[activeTab]}
									</span>
									<div>
										<m.div
											initial={{ width: 0 }}
											animate={{ width: 24 }}
											transition={{ duration: reducedMotion ? 0.1 : 0.4, ease: [0.22, 1, 0.36, 1] }}
											className="mb-1.5 h-[2px] rounded-full bg-[#FACB06]"
										/>
										<h3
											className="text-xl font-bold leading-snug text-white md:text-2xl"
											style={{ fontFamily: "var(--font-libre-baskerville), serif" }}
										>
											{content.title}
										</h3>
									</div>
								</div>
							</div>

							{/* Body: 3-column grid */}
							<div className="grid gap-0 md:grid-cols-[1fr_220px_200px] divide-x divide-[#E6E8EC]">
								{/* Left: bullet points */}
								<div className="p-6">
									<ul className="space-y-3">
										{content.points.map((point, i) => (
											<m.li
												key={point}
												initial={reducedMotion ? {} : { opacity: 0, x: -8 }}
												animate={{ opacity: 1, x: 0 }}
												transition={{ duration: reducedMotion ? 0.1 : 0.28, ease: "easeOut", delay: reducedMotion ? 0 : i * 0.05 }}
												className="flex gap-3 text-sm leading-relaxed text-[#6C7676]"
											>
												<span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#FACB06]" aria-hidden="true" />
												<span>{point}</span>
											</m.li>
										))}
									</ul>
								</div>

								{/* Mid: highlights */}
								<div className="p-6 bg-[#F7F9FC]">
									<p className="mb-4 text-[10px] font-bold uppercase tracking-[0.15em] text-[#0A2C59]/50">Highlights</p>
									<div className="space-y-3">
										{content.stats.map((stat) => (
											<div key={stat} className="flex items-start gap-2.5">
												<span className="mt-[3px] h-4 w-4 shrink-0 inline-flex items-center justify-center rounded-full bg-[#FACB06]" aria-hidden="true">
													<svg viewBox="0 0 24 24" className="h-2.5 w-2.5" fill="none" stroke="#0A2C59" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 13l4 4L19 7"/></svg>
												</span>
												<span className="text-[13px] font-medium leading-snug text-[#0A2C59]">{stat}</span>
											</div>
										))}
									</div>
								</div>

								{/* Right: what you get */}
								<div className="p-6 bg-[#0A2C59]/[0.03]">
									<p className="mb-4 text-[10px] font-bold uppercase tracking-[0.15em] text-[#0A2C59]/50">What you get</p>
									<ul className="space-y-3">
										{content.checklist.map((item) => (
											<li key={item} className="flex items-start gap-2.5">
												<span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#0A2C59] text-white">
													<svg viewBox="0 0 24 24" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
														<path d="M5 13l4 4L19 7" />
													</svg>
												</span>
												<span className="text-[13px] font-medium leading-snug text-[#0A2C59]">{item}</span>
											</li>
												))}
									</ul>
								</div>
							</div>
						</div>
					</m.div>
					</AnimatePresence>
				</div>{/* end desktop tabs */}

				{/* Enquire CTA */}
				<m.div
					initial={{ opacity: 0, y: reducedMotion ? 0 : 14 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.3 }}
					transition={{ duration: reducedMotion ? 0.15 : 0.4, ease: "easeOut", delay: reducedMotion ? 0 : 0.1 }}
					className="mt-10 flex flex-col items-center gap-3 text-center"
				>
					<p className="text-[13px] text-[#6C7676]">Interested in life at Amity? Talk to an admissions counsellor.</p>
					<Button className="rounded-full" size="lg" onClick={openModal}>
						Enquire Now
					</Button>
				</m.div>

				</LazyMotion>
			</div>
		</section>
	);
}
