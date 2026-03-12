"use client";

import { AnimatePresence, LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { INDIAN_CITIES } from "../../src/lib/cities";
import { useEnquireModal } from "../../src/lib/enquire-context";

/* ─────────────────────────────────────────
   Tiny city combobox for the modal step
───────────────────────────────────────── */
function ModalCityCombobox({
	value,
	onChange,
	hasError,
}: {
	value: string;
	onChange: (v: string) => void;
	hasError?: boolean;
}) {
	const [query, setQuery] = useState(value);
	const [open, setOpen] = useState(false);
	const [cursor, setCursor] = useState(-1);
	const listRef = useRef<HTMLUListElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	const suggestions = query.trim().length
		? INDIAN_CITIES.filter((c) => c.toLowerCase().startsWith(query.trim().toLowerCase())).slice(0, 8)
		: [];

	useEffect(() => {
		if (cursor >= 0 && listRef.current) {
			const el = listRef.current.children[cursor] as HTMLLIElement | undefined;
			el?.scrollIntoView({ block: "nearest" });
		}
	}, [cursor]);

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
				setOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const select = (city: string) => {
		setQuery(city);
		onChange(city);
		setOpen(false);
		setCursor(-1);
	};

	const matchLen = query.trim().length;

	return (
		<div ref={containerRef} className="relative">
			<div className="relative">
				<span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#6C7676]">
					<svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
						<path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Z" />
						<circle cx="12" cy="9" r="2.5" />
					</svg>
				</span>
				<input
					ref={inputRef}
					type="text"
					role="combobox"
					aria-autocomplete="list"
					aria-expanded={open && suggestions.length > 0}
					aria-haspopup="listbox"
					aria-activedescendant={cursor >= 0 ? `modal-city-opt-${cursor}` : undefined}
					value={query}
					onChange={(e) => {
						setQuery(e.target.value);
						onChange(e.target.value);
						setOpen(true);
						setCursor(-1);
					}}
					onFocus={() => setOpen(true)}
					onKeyDown={(e) => {
						if (!open || !suggestions.length) return;
						if (e.key === "ArrowDown") {
							e.preventDefault();
							setCursor((p) => Math.min(p + 1, suggestions.length - 1));
						} else if (e.key === "ArrowUp") {
							e.preventDefault();
							setCursor((p) => Math.max(p - 1, 0));
						} else if (e.key === "Enter" && cursor >= 0) {
							e.preventDefault();
							select(suggestions[cursor]);
						} else if (e.key === "Escape") {
							setOpen(false);
						}
					}}
					placeholder="Type your city…"
					className={`w-full rounded-xl border pl-9 pr-4 py-3 text-sm text-[#020203] placeholder-[#6C7676] outline-none transition focus:ring-2 ${
						hasError
							? "border-red-400 bg-red-50 focus:ring-red-300"
							: "border-[#E6E8EC] bg-[#F7F7F7] focus:border-[#FACB06] focus:ring-[#FACB06]/30"
					}`}
				/>
			</div>
			{open && suggestions.length > 0 && (
				<ul
					ref={listRef}
					role="listbox"
					aria-label="City suggestions"
					className="absolute z-10 mt-1 max-h-48 w-full overflow-y-auto rounded-xl border border-[#E6E8EC] bg-white py-1 shadow-lg"
				>
					{suggestions.map((city, idx) => (
						<li
							key={city}
							id={`modal-city-opt-${idx}`}
							role="option"
							aria-selected={idx === cursor}
							onMouseDown={(e) => {
								e.preventDefault();
								select(city);
							}}
							className={`cursor-pointer px-4 py-2.5 text-sm transition ${
								idx === cursor ? "bg-[#FACB06]/15 text-[#0A2C59]" : "text-[#020203] hover:bg-[#F7F7F7]"
							}`}
						>
							<span className="font-semibold text-[#0A2C59]">{city.slice(0, matchLen)}</span>
							{city.slice(matchLen)}
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

/* ─────────────────────────────────────────
   Step data
───────────────────────────────────────── */
type FormValues = { name: string; phone: string; email: string; city: string };

type Step = {
	key: keyof FormValues;
	label: string;
	question: string;
	hint: string;
	type: "text" | "tel" | "email" | "city";
	validate: (v: string) => string | null;
};

const STEPS: Step[] = [
	{
		key: "name",
		label: "Full Name",
		question: "What's your full name?",
		hint: "As it appears on your official ID",
		type: "text",
		validate: (v) => (v.trim().length < 2 ? "Please enter your full name" : null),
	},
	{
		key: "phone",
		label: "Mobile Number",
		question: "Your mobile number?",
		hint: "We'll send you admission details on WhatsApp",
		type: "tel",
		validate: (v) =>
			v.replace(/[\s\-().+]/g, "").length >= 7 ? null : "Enter a valid mobile number",
	},
	{
		key: "email",
		label: "Email Address",
		question: "Your email address?",
		hint: "For brochure and updates — we don't spam",
		type: "email",
		validate: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? null : "Enter a valid email address"),
	},
	{
		key: "city",
		label: "City",
		question: "Which city are you from?",
		hint: "Helps us connect you with the nearest Amity campus",
		type: "city",
		validate: (v) => (v.trim().length < 2 ? "Please select or enter your city" : null),
	},
];

/* ─────────────────────────────────────────
   Progress dots
───────────────────────────────────────── */
function ProgressDots({ current, total }: { current: number; total: number }) {
	return (
		<div className="flex items-center gap-2">
			{Array.from({ length: total }).map((_, i) => (
				<span
					key={i}
					className={`inline-block rounded-full transition-all duration-300 ${
						i < current
							? "h-2 w-2 bg-[#FACB06]"
							: i === current
								? "h-2 w-6 bg-[#FACB06]"
								: "h-2 w-2 bg-[#E6E8EC]"
					}`}
				/>
			))}
		</div>
	);
}

/* ─────────────────────────────────────────
   Main modal
───────────────────────────────────────── */
type Direction = 1 | -1;

export default function EnquireModal() {
	const { open, closeModal } = useEnquireModal();
	const router = useRouter();
	const reducedMotion = useReducedMotion();

	const [step, setStep] = useState(0);
	const [direction, setDirection] = useState<Direction>(1);
	const [values, setValues] = useState<FormValues>({ name: "", phone: "", email: "", city: "" });
	const [error, setError] = useState<string | null>(null);
	const [submitting, setSubmitting] = useState(false);
	const [done, setDone] = useState(false);

	// Lock body scroll while open
	useEffect(() => {
		if (!open) return;
		const prev = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = prev;
		};
	}, [open]);

	// Reset on open
	useEffect(() => {
		if (open) {
			setStep(0);
			setDirection(1);
			setValues({ name: "", phone: "", email: "", city: "" });
			setError(null);
			setDone(false);
		}
	}, [open]);

	// Escape key
	useEffect(() => {
		if (!open) return;
		const handler = (e: KeyboardEvent) => {
			if (e.key === "Escape") closeModal();
		};
		window.addEventListener("keydown", handler);
		return () => window.removeEventListener("keydown", handler);
	}, [open, closeModal]);

	const current = STEPS[step];

	const advance = async () => {
		const err = current.validate(values[current.key]);
		if (err) {
			setError(err);
			return;
		}
		setError(null);

		if (step < STEPS.length - 1) {
			setDirection(1);
			setStep((s) => s + 1);
		} else {
			// Submit
			setSubmitting(true);
			try {
				const res = await fetch("/api/leads", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						name: values.name,
						phone: values.phone,
						email: values.email,
						city: values.city,
					}),
				});
				if (!res.ok) throw new Error("Failed");
				router.push("/thank-you");
			} catch {
				setError("Something went wrong. Please try again.");
			} finally {
				setSubmitting(false);
			}
		}
	};

	const goBack = () => {
		if (step === 0) return;
		setDirection(-1);
		setStep((s) => s - 1);
		setError(null);
	};

	// Slide variants
	const variants = {
		enter: (dir: Direction) => ({
			x: reducedMotion ? 0 : dir * 48,
			opacity: 0,
		}),
		center: { x: 0, opacity: 1 },
		exit: (dir: Direction) => ({
			x: reducedMotion ? 0 : dir * -48,
			opacity: 0,
		}),
	};

	const inputRef = useRef<HTMLInputElement>(null);
	useEffect(() => {
		const id = setTimeout(() => inputRef.current?.focus(), 180);
		return () => clearTimeout(id);
	}, [step, open]);

	return (
		<LazyMotion features={domAnimation}>
			<AnimatePresence>
				{open && (
					<>
						{/* Backdrop */}
						<m.div
							key="backdrop"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: reducedMotion ? 0.1 : 0.22 }}
							className="fixed inset-0 z-[140] bg-[#041428]/80 backdrop-blur-md"
							onClick={closeModal}
							aria-hidden="true"
						/>

						{/* Dialog card */}
						<m.div
							key="dialog"
							role="dialog"
							aria-modal="true"
							aria-label="Enquiry form"
							initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 20 }}
							animate={reducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
							exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 12 }}
							transition={{ duration: reducedMotion ? 0.12 : 0.28, ease: [0.22, 1, 0.36, 1] }}
							className="fixed inset-0 z-[141] flex items-center justify-center px-4"
							onClick={(e) => e.stopPropagation()}
						>
							<div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-[0_32px_64px_rgba(4,20,40,0.45)]">
								{/* Gold top accent */}
								<div className="h-1 w-full bg-[#FACB06]" />

								{/* Header */}
								<div className="flex items-start justify-between px-7 pt-6 pb-2">
									{/* Left: Coursewaala eyebrow + title */}
									<div className="flex items-start gap-4">
											<div>
												<p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#FACB06]">
													Coursewaala
												</p>
												<div className="mt-1 text-sm text-[#6C7676]">Official Enrollment Partner for Amity Online MBA</div>
											</div>
									</div>

									{/* Right: close button */}
									<button
										type="button"
										onClick={closeModal}
										className="ml-4 mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#E6E8EC] text-[#6C7676] transition hover:bg-[#F7F7F7] hover:text-[#0A2C59] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A2C59]/40"
										aria-label="Close"
									>
										<svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
											<path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" />
										</svg>
									</button>
								</div>

								{/* Progress */}
								{!done && (
									<div className="px-7 pb-4">
										<ProgressDots current={step} total={STEPS.length} />
										<p className="mt-1.5 text-xs text-[#6C7676]">
											Step {step + 1} of {STEPS.length}
										</p>
									</div>
								)}

								{/* Step content */}
								<div className="relative overflow-hidden px-7 pb-7">
									<AnimatePresence mode="wait" custom={direction}>
										{done ? (
											<m.div
												key="success"
												initial={{ opacity: 0, scale: 0.9 }}
												animate={{ opacity: 1, scale: 1 }}
												transition={{ duration: reducedMotion ? 0.1 : 0.38, ease: [0.22, 1, 0.36, 1] }}
												className="py-8 text-center"
											>
												<span className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#FACB06]/15">
													<svg viewBox="0 0 24 24" className="h-8 w-8 text-[#0A2C59]" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
														<path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
													</svg>
												</span>
												<h3
													className="font-[family-name:var(--font-libre-baskerville)] text-xl font-bold text-[#0A2C59]"
													style={{ fontFamily: "var(--font-libre-baskerville), serif" }}
												>
													You're all set!
												</h3>
												<p className="mt-2 text-sm text-[#6C7676]">
													Thank you, {values.name.split(" ")[0]}. Our admissions team will reach out within 24 hours.
												</p>
												<button
													type="button"
													onClick={closeModal}
													className="mt-6 inline-flex h-10 items-center rounded-full bg-[#FACB06] px-6 text-sm font-semibold text-[#0A2C59] transition hover:bg-[#C8A205] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FACB06]/50"
												>
													Done
												</button>
											</m.div>
										) : (
											<m.div
												key={step}
												custom={direction}
												variants={variants}
												initial="enter"
												animate="center"
												exit="exit"
												transition={{ duration: reducedMotion ? 0.1 : 0.26, ease: [0.22, 1, 0.36, 1] }}
											>
												<p
													className="mb-1 font-[family-name:var(--font-libre-baskerville)] text-lg font-bold text-[#0A2C59]"
													style={{ fontFamily: "var(--font-libre-baskerville), serif" }}
												>
													{current.question}
												</p>
												<p className="mb-4 text-xs text-[#6C7676]">{current.hint}</p>

												{current.type === "city" ? (
													<ModalCityCombobox
														value={values.city}
														onChange={(v) => setValues((prev) => ({ ...prev, city: v }))}
														hasError={!!error}
													/>
												) : (
													<input
														ref={inputRef}
														type={current.type}
														value={values[current.key]}
														onChange={(e) => {
															setValues((prev) => ({ ...prev, [current.key]: e.target.value }));
															setError(null);
														}}
														onKeyDown={(e) => {
															if (e.key === "Enter") advance();
														}}
														placeholder={
															current.type === "tel"
																? "e.g. 98765 43210"
																: current.type === "email"
																	? "e.g. you@email.com"
																	: "Type here…"
														}
														className={`w-full rounded-xl border px-4 py-3 text-sm text-[#020203] placeholder-[#6C7676] outline-none transition focus:ring-2 ${
															error
																? "border-red-400 bg-red-50 focus:ring-red-300"
																: "border-[#E6E8EC] bg-[#F7F7F7] focus:border-[#FACB06] focus:ring-[#FACB06]/30"
														}`}
													/>
												)}

												{/* Error */}
												{error && (
													<div className="mt-2 flex items-center gap-1.5 text-xs text-red-500">
														<svg viewBox="0 0 20 20" className="h-3.5 w-3.5 shrink-0 fill-red-500" aria-hidden="true">
															<path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-9 3a1 1 0 1 0 2 0 1 1 0 0 0-2 0Zm1-7a1 1 0 0 0-1 1v3a1 1 0 1 0 2 0V7a1 1 0 0 0-1-1Z" clipRule="evenodd" />
														</svg>
														{error}
													</div>
												)}

												{/* Actions */}
												<div className="mt-5 flex items-center justify-between gap-3">
													{step > 0 ? (
														<button
															type="button"
															onClick={goBack}
															className="inline-flex h-10 items-center gap-1.5 rounded-full border border-[#E6E8EC] px-4 text-sm font-medium text-[#0A2C59] transition hover:bg-[#F7F7F7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A2C59]/30"
														>
															<svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
																<path d="M12 4 6 10l6 6" strokeLinecap="round" strokeLinejoin="round" />
															</svg>
															Back
														</button>
													) : (
														<span />
													)}

													<button
														type="button"
														onClick={advance}
														disabled={submitting}
														className="inline-flex h-10 items-center gap-1.5 rounded-full bg-[#FACB06] px-5 text-sm font-semibold text-[#0A2C59] transition hover:bg-[#C8A205] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FACB06]/50 disabled:opacity-60"
													>
														{submitting ? (
															<>
																<svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
																	<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
																	<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4Z" />
																</svg>
																Submitting…
															</>
														) : step < STEPS.length - 1 ? (
															<>
																Continue
																<svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
																	<path d="M8 4l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
																</svg>
															</>
														) : (
															"Submit →"
														)}
													</button>
												</div>
											</m.div>
										)}
									</AnimatePresence>
								</div>
							</div>

						</m.div>
					</>
				)}
			</AnimatePresence>
		</LazyMotion>
	);
}
