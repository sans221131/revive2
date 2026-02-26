"use client";

import { LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";
import { useEnquireModal } from "../../src/lib/enquire-context";
import { Accordion, type AccordionItem } from "../ui/Accordion";
import { Button } from "../ui/Button";

const faqItems: AccordionItem[] = [
	{
		id: "faq-1",
		question: "How do I start the admission process?",
		answer: "Submit the enquiry form and an admissions counsellor will guide you through eligibility, required documents, and application steps.",
	},
	{
		id: "faq-2",
		question: "Can I receive counselling before I apply?",
		answer: "Yes. You can speak with the admissions team for program fit, timelines, and process guidance before submitting a full application.",
	},
	{
		id: "faq-3",
		question: "Is there support for career preparation?",
		answer: "Yes. Career support includes resume guidance, interview preparation, skill development sessions, and placement-oriented activities.",
	},
	{
		id: "faq-4",
		question: "What kind of student support is available on campus?",
		answer: "Students receive access to mentoring, academic advising, and wellbeing resources to ensure balanced academic progress.",
	},
	{
		id: "faq-5",
		question: "Are extracurricular opportunities available for all students?",
		answer: "Yes. Clubs, events, and sports formats are open for participation and designed to complement academic development.",
	},
	{
		id: "faq-6",
		question: "Will I be informed about fees and timelines clearly?",
		answer: "Yes. Counsellors provide a transparent overview of important timelines, process checkpoints, and fee-related guidance.",
	},
	{
		id: "faq-7",
		question: "Is the enquiry form enough to schedule a callback?",
		answer: "Yes. Once submitted, the admissions team reaches out to help you with your next steps and planning.",
	},
	{
		id: "faq-8",
		question: "Can parents join the counselling discussion?",
		answer: "Yes. Parent participation is encouraged to ensure all stakeholders have clarity before admission decisions.",
	},
	{
		id: "faq-9",
		question: "How quickly does the admissions team respond?",
		answer: "Response times are typically prompt during working hours. Submit your details and the team will connect at the earliest available window.",
	},
];

export default function FaqFooter() {
	const reducedMotion = useReducedMotion();
	const { openModal } = useEnquireModal();

	return (
		<section id="faq" className="scroll-mt-24 border-t-[3px] border-[#FACB06] bg-[#FFFFFF] pb-0 pt-10 md:pt-16">
			<div className="container-shell">
				<LazyMotion features={domAnimation}>

					{/* Section heading */}
					<m.div
						initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.2 }}
						transition={{ duration: reducedMotion ? 0.15 : 0.44, ease: [0.22, 1, 0.36, 1] }}
						className="mb-12"
					>
						<div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#0A2C59]/15 bg-[#0A2C59]/5 px-4 py-1.5">
							<span className="h-1.5 w-1.5 rounded-full bg-[#FACB06]" aria-hidden="true" />
							<span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#0A2C59]">Admissions FAQ</span>
						</div>
						<div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
							<h2
								className="text-3xl font-bold text-[#0A2C59] md:text-4xl"
								style={{ fontFamily: "var(--font-libre-baskerville), serif" }}
							>
								Frequently asked questions
							</h2>
							<p className="text-[14px] leading-relaxed text-[#6C7676] md:max-w-xs md:text-right">
								Everything you need before taking the next step.
							</p>
						</div>
						{/* Gold rule */}
						<m.div
							className="mt-6 h-px w-full bg-gradient-to-r from-[#FACB06] via-[#FACB06]/30 to-transparent"
							initial={{ scaleX: 0, originX: 0 }}
							whileInView={{ scaleX: 1 }}
							viewport={{ once: true }}
							transition={{ duration: reducedMotion ? 0.1 : 0.6, ease: [0.22, 1, 0.36, 1], delay: reducedMotion ? 0 : 0.15 }}
						/>
					</m.div>

					{/* 2-col layout: FAQ list + sticky CTA */}
					<div className="grid gap-10 md:grid-cols-[1fr_320px] md:items-start md:gap-14">

						{/* FAQ list */}
						<m.div
							initial={{ opacity: 0, y: reducedMotion ? 0 : 16 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.1 }}
							transition={{ duration: reducedMotion ? 0.15 : 0.42, ease: [0.22, 1, 0.36, 1], delay: reducedMotion ? 0 : 0.08 }}
						>
							<Accordion items={faqItems} defaultOpenId="faq-1" />
						</m.div>

						{/* Sticky CTA sidebar */}
						<m.div
							initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.2 }}
							transition={{ duration: reducedMotion ? 0.15 : 0.44, ease: [0.22, 1, 0.36, 1], delay: reducedMotion ? 0 : 0.16 }}
							className="md:sticky md:top-24"
						>
							<div className="overflow-hidden bg-[#0A2C59] p-7 text-white md:p-8">
								{/* Top gold bar */}
								<div className="mb-5 h-[3px] w-10 bg-[#FACB06]" />
								<h3
									className="text-xl font-bold leading-snug text-white md:text-2xl"
									style={{ fontFamily: "var(--font-libre-baskerville), serif" }}
								>
									Speak to an admissions counsellor
								</h3>
								<p className="mt-3 text-[13.5px] leading-relaxed text-white/65">
									Get guidance on eligibility, documents, timelines, and what to expect at every step.
								</p>
								{/* Divider */}
								<div className="my-5 h-px bg-white/10" />
								{/* Trust signals */}
								<ul className="mb-6 space-y-2.5 text-[13px] text-white/70">
									{[
										"Free, no-obligation counselling",
										"Response within working hours",
										"Parents welcome to join",
									].map((pt) => (
										<li key={pt} className="flex items-center gap-2.5">
											<span className="h-1 w-1 shrink-0 rounded-full bg-[#FACB06]" aria-hidden="true" />
											{pt}
										</li>
									))}
								</ul>
								<Button
									className="w-full justify-center rounded-full"
									size="lg"
									onClick={openModal}
								>
									Enquire Now
								</Button>
							</div>
						</m.div>

					</div>

				</LazyMotion>
			</div>

			{/* Footer */}
			<footer className="mt-14 border-t border-[#E6E8EC] bg-[#F7F7F7] py-8">
				<div className="container-shell flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
					<p className="text-sm font-semibold text-[#0A2C59]">Amity University</p>
					<div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-[#6C7676]">
						<a href="#" className="hover:text-[#0A2C59] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A2C59]/40">
							Privacy Policy
						</a>
						<span aria-hidden="true" className="text-[#E6E8EC]">|</span>
						<a href="#" className="hover:text-[#0A2C59] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A2C59]/40">
							Terms of Use
						</a>
						<span aria-hidden="true" className="text-[#E6E8EC]">|</span>
						<span>Admissions subject to eligibility criteria.</span>
					</div>
				</div>
			</footer>
		</section>
	);
}
