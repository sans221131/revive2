"use client";

import { LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";
import NextImage from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "../ui/Button";
import { useEnquireModal } from "../../src/lib/enquire-context";
import { Input } from "../ui/Input";

const INDIAN_CITIES = [
	"Agra","Ahmedabad","Ajmer","Aligarh","Allahabad","Amritsar","Aurangabad",
	"Bangalore","Bareilly","Bhopal","Bhubaneswar","Chandigarh","Chennai",
	"Coimbatore","Dehradun","Delhi","Dhanbad","Faridabad","Ghaziabad",
	"Gurgaon","Guwahati","Gwalior","Hyderabad","Indore","Jabalpur","Jaipur",
	"Jalandhar","Jammu","Jodhpur","Kanpur","Kochi","Kolkata","Kota","Lucknow",
	"Ludhiana","Madurai","Mangalore","Meerut","Mumbai","Mysore","Nagpur",
	"Nashik","Noida","Patna","Pune","Raipur","Rajkot","Ranchi","Srinagar",
	"Surat","Thiruvananthapuram","Tiruchirappalli","Udaipur","Vadodara",
	"Varanasi","Vijayawada","Visakhapatnam",
];

type LeadFormValues = {
	fullName: string;
	mobile: string;
	email: string;
	city: string;
	consent: boolean;
};

type LeadFormErrors = Partial<Record<keyof LeadFormValues, string>>;
type FormStatus = "idle" | "submitting" | "success" | "error";

function validateLeadForm(values: LeadFormValues): LeadFormErrors {
	const errors: LeadFormErrors = {};
	if (!values.fullName.trim()) errors.fullName = "Please enter your full name.";
	if (values.mobile.replace(/[\s\-().+]/g, "").length < 7)
		errors.mobile = "Enter a valid mobile number.";
	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
		errors.email = "Enter a valid email address.";
	if (!values.city.trim()) errors.city = "Please select or enter your city.";
	if (!values.consent) errors.consent = "Consent is required before submission.";
	return errors;
}

/* ── Inline error helper ───────────────────────────────────────────── */
function FieldError({ id, message }: { id: string; message: string }) {
	return (
		<p id={id} role="alert" className="mt-1 flex items-center gap-1 text-xs text-[#B42318]">
			<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
				<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
			</svg>
			{message}
		</p>
	);
}

/* ── City combobox ─────────────────────────────────────────────────── */
function CityCombobox({
	value,
	onChange,
	hasError,
	errorId,
}: {
	value: string;
	onChange: (val: string) => void;
	hasError: boolean;
	errorId: string;
}) {
	const [open, setOpen] = useState(false);
	const [activeIdx, setActiveIdx] = useState(-1);
	const containerRef = useRef<HTMLDivElement>(null);
	const listRef = useRef<HTMLUListElement>(null);

	const suggestions = useMemo(() => {
		const q = value.trim().toLowerCase();
		if (!q) return [];
		return INDIAN_CITIES.filter((c) => c.toLowerCase().startsWith(q)).slice(0, 8);
	}, [value]);

	// Close on outside click / focus-leave
	useEffect(() => {
		function handler(e: MouseEvent | FocusEvent) {
			if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
				setOpen(false);
				setActiveIdx(-1);
			}
		}
		document.addEventListener("mousedown", handler);
		document.addEventListener("focusin", handler);
		return () => {
			document.removeEventListener("mousedown", handler);
			document.removeEventListener("focusin", handler);
		};
	}, []);

	// Scroll active item into view
	useEffect(() => {
		if (activeIdx >= 0 && listRef.current) {
			const item = listRef.current.children[activeIdx] as HTMLElement | undefined;
			item?.scrollIntoView({ block: "nearest" });
		}
	}, [activeIdx]);

	const pick = (city: string) => {
		onChange(city);
		setOpen(false);
		setActiveIdx(-1);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (!open || suggestions.length === 0) {
			if (e.key === "ArrowDown" && suggestions.length > 0) {
				setOpen(true);
				setActiveIdx(0);
				e.preventDefault();
			}
			return;
		}
		if (e.key === "ArrowDown") {
			setActiveIdx((i) => Math.min(i + 1, suggestions.length - 1));
			e.preventDefault();
		} else if (e.key === "ArrowUp") {
			setActiveIdx((i) => Math.max(i - 1, -1));
			e.preventDefault();
		} else if (e.key === "Enter" && activeIdx >= 0) {
			pick(suggestions[activeIdx]);
			e.preventDefault();
		} else if (e.key === "Escape") {
			setOpen(false);
			setActiveIdx(-1);
		}
	};

	const listId = "city-listbox";

	return (
		<div ref={containerRef} className="relative">
			<div className="relative">
				<Input
					id="city"
					name="city"
					autoComplete="off"
					placeholder="Type to search city…"
					required
					value={value}
					role="combobox"
					aria-autocomplete="list"
					aria-expanded={open && suggestions.length > 0}
					aria-controls={listId}
					aria-activedescendant={activeIdx >= 0 ? `city-opt-${activeIdx}` : undefined}
					aria-invalid={hasError}
					aria-describedby={hasError ? errorId : undefined}
					onChange={(e) => {
						onChange(e.target.value);
						setOpen(true);
						setActiveIdx(-1);
					}}
					onFocus={() => { if (suggestions.length > 0) setOpen(true); }}
					onKeyDown={handleKeyDown}
					className={`h-9 pr-8 text-xs${hasError ? " border-[#B42318] focus-visible:ring-[#B42318]/30" : ""}`}
				/>
				{/* Pin icon */}
				<span className="pointer-events-none absolute inset-y-0 right-2.5 flex items-center text-[#6C7676]">
					<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
						<path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z"/><circle cx="12" cy="10" r="3"/>
					</svg>
				</span>
			</div>

			{open && suggestions.length > 0 && (
				<ul
					id={listId}
					ref={listRef}
					role="listbox"
					aria-label="City suggestions"
					className="absolute z-50 mt-1 max-h-48 w-full overflow-y-auto rounded-xl border border-[#E6E8EC] bg-white py-1 shadow-[0_8px_24px_rgba(4,20,40,0.12)]"
				>
					{suggestions.map((city, i) => {
						const isActive = i === activeIdx;
						const q = value.trim();
						const match = city.slice(0, q.length);
						const rest = city.slice(q.length);
						return (
							<li
								key={city}
								id={`city-opt-${i}`}
								role="option"
								aria-selected={isActive}
								onMouseDown={() => pick(city)}
								onMouseEnter={() => setActiveIdx(i)}
								className={`flex cursor-pointer items-center gap-2 px-3 py-2 text-xs transition-colors ${
									isActive ? "bg-[#0A2C59] text-white" : "text-[#020203] hover:bg-[#F7F7F7]"
								}`}
							>
								<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0">
									<path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z"/><circle cx="12" cy="10" r="3"/>
								</svg>
								<span>
									<strong className={isActive ? "text-[#FACB06]" : "text-[#0A2C59] font-semibold"}>{match}</strong>
									{rest}
								</span>
							</li>
						);
					})}
				</ul>
			)}
		</div>
	);
}

const trustPoints = [
	{
		icon: (
			<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
				<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
			</svg>
		),
		label: "Recognized institution with established academic standards",
	},
	{
		icon: (
			<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
				<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
				<polyline points="22 4 12 14.01 9 11.01" />
			</svg>
		),
		label: "Career preparation integrated throughout student life",
	},
	{
		icon: (
			<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
				<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
				<circle cx="9" cy="7" r="4" />
				<path d="M23 21v-2a4 4 0 0 0-3-3.87" />
				<path d="M16 3.13a4 4 0 0 1 0 7.75" />
			</svg>
		),
		label: "Mentoring and support from admission to graduation",
	},
];

const stats = [
	{ value: "30+", label: "Years of Excellence" },
	{ value: "175+", label: "Programs Offered" },
	{ value: "100K+", label: "Alumni Worldwide" },
];

export default function HeroLead() {
	const reducedMotion = useReducedMotion();
	const { openModal } = useEnquireModal();
	const [imageLoaded, setImageLoaded] = useState(false);
	const [formValues, setFormValues] = useState<LeadFormValues>({
		fullName: "",
		mobile: "",
		email: "",
		city: "",
		consent: false,
	});
	const [errors, setErrors] = useState<LeadFormErrors>({});
	const router = useRouter();
	const [formStatus, setFormStatus] = useState<FormStatus>("idle");

	const buttonLabel = useMemo(() => {
		return formStatus === "submitting" ? "Submitting…" : "Submit Enquiry";
	}, [formStatus]);

	const submitLead = async () => {
		setFormStatus("submitting");
		setErrors({});
		try {
			const response = await fetch("/api/leads", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name: formValues.fullName.trim(),
					phone: formValues.mobile.trim(),
					email: formValues.email.trim(),
					city: formValues.city.trim(),
				}),
			});
			if (!response.ok) {
				const payload = (await response.json().catch(() => null)) as { message?: string } | null;
				throw new Error(payload?.message ?? "Unable to submit right now.");
			}
			router.push("/thank-you");
		} catch (error) {
			setFormStatus("error");
			setErrors((current) => ({
				...current,
				email: error instanceof Error ? error.message : "Something went wrong.",
			}));
		}
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (formStatus === "submitting") return;
		const validationErrors = validateLeadForm(formValues);
		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
			setFormStatus("idle");
			return;
		}
		await submitLead();
	};

	return (
		<section
			id="top"
			aria-labelledby="hero-heading"
				className="relative section-shell scroll-mt-20 pb-28 pt-24 text-[#FFFFFF] md:pb-32 md:pt-28 overflow-hidden"
		>
			{/* Hero background image */}
			<NextImage
				src="/hero.webp"
				alt=""
				fill
				className="object-cover object-center"
				priority
				unoptimized
				aria-hidden="true"
				onLoad={() => setImageLoaded(true)}
			/>
			{/* Dark overlay */}
			<div className="absolute inset-0 bg-gradient-to-br from-[#041428]/85 via-[#0A2C59]/75 to-[#041428]/80" aria-hidden="true" />
			{/* Gold glow */}
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(250,203,6,0.18),transparent_40%)]" aria-hidden="true" />
			{/* Animated shimmer sweep */}
			<div className="hero-shimmer" aria-hidden="true" />

			<div
				className={`container-shell relative z-10 transition-opacity duration-700 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
			>
				<LazyMotion features={domAnimation}>
					<div className="grid items-start gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">

						{/* ── Left: copy ─────────────────────────────────────────── */}
						<m.div
							initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
							whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.2 }}
							transition={{ duration: reducedMotion ? 0.2 : 0.5, ease: "easeOut" }}
						>
							{/* Eyebrow */}
							<div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#FACB06]/40 bg-[#FACB06]/10 px-4 py-1.5">
								<span className="h-1.5 w-1.5 rounded-full bg-[#FACB06]" aria-hidden="true" />
								<span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#FACB06]">
									Admissions Open · 2026–27
								</span>
							</div>

							{/* Heading */}
							<h1
								id="hero-heading"
								className="max-w-2xl text-3xl font-bold leading-[1.18] md:text-4xl lg:text-[2.75rem]"
							>
								An institution built for
								<span className="relative ml-2 whitespace-nowrap text-[#FACB06]">
									serious ambition.
									<span
										className="pointer-events-none absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-[#FACB06]/35"
										aria-hidden="true"
									/>
								</span>
							</h1>

							{/* Body */}
							<p className="mt-4 max-w-lg text-sm leading-relaxed text-[#FFFFFF]/80 md:text-base">
								From recognized programs to structured student support, Amity offers a disciplined learning environment built for long-term outcomes.
							</p>

							{/* Stats row */}
							<div className="mt-6 grid grid-cols-3 gap-4 border-t border-[#FFFFFF]/12 pt-5">
								{stats.map((s) => (
									<div key={s.label}>
										<p className="text-xl font-bold text-[#FACB06] md:text-2xl">{s.value}</p>
										<p className="mt-0.5 text-xs leading-snug text-[#FFFFFF]/65">{s.label}</p>
									</div>
								))}
							</div>

							{/* Trust bullets */}
							<ul className="mt-5 space-y-2" aria-label="Key features">
								{trustPoints.map((point) => (
									<li key={point.label} className="flex items-start gap-3">
										<span className="mt-[1px] shrink-0 text-[#FACB06]">{point.icon}</span>
										<span className="text-sm leading-relaxed text-[#FFFFFF]/80">{point.label}</span>
									</li>
								))}
							</ul>

							{/* CTAs */}
							<div className="mt-6 flex flex-wrap gap-3">
								<Button onClick={openModal} size="lg" className="rounded-full px-7">
									Enquire Now
								</Button>
							</div>

						</m.div>

						{/* ── Right: enquiry form ─────────────────────────────────── */}
						<m.section
							id="enquire"
							aria-labelledby="form-heading"
							className="scroll-mt-24"
							initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 28 }}
							whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.15 }}
							transition={{ duration: reducedMotion ? 0.2 : 0.5, ease: "easeOut", delay: reducedMotion ? 0 : 0.12 }}
						>
							{/* Card */}
							<div className="overflow-hidden rounded-2xl border border-[#E6E8EC] bg-[#FFFFFF] shadow-[0_8px_40px_rgba(4,20,40,0.18)]">

								{/* Gold top accent */}
								<div className="h-[3px] w-full bg-[#FACB06]" aria-hidden="true" />

								<div className="p-4 md:p-5">
									{/* Form header */}
									<div className="mb-3 border-b border-[#E6E8EC] pb-3">
										<p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6C7676]">
											Admissions Enquiry
										</p>
										<h2
											id="form-heading"
											className="text-lg font-bold leading-snug text-[#0A2C59] md:text-xl"
										>
											Speak with an admissions counsellor
										</h2>
										<p className="mt-1 text-xs text-[#6C7676]">
											Get application guidance, eligibility support, and next-step clarity.
										</p>
									</div>

									<form className="space-y-3" noValidate onSubmit={handleSubmit}>
										{/* Full Name */}
										<div>
											<label htmlFor="fullName" className="mb-1 block text-xs font-medium text-[#0A2C59]">
												Full Name <span className="text-[#B42318]" aria-hidden="true">*</span>
											</label>
											<Input
												id="fullName"
												name="fullName"
												placeholder="e.g. Priya Sharma"
												required
												value={formValues.fullName}
												onChange={(e) => setFormValues((v) => ({ ...v, fullName: e.target.value }))}
												aria-invalid={Boolean(errors.fullName)}
												aria-describedby={errors.fullName ? "fullName-error" : undefined}
													className={`h-9 text-xs${errors.fullName ? " border-[#B42318] focus-visible:ring-[#B42318]/30" : ""}`}
											/>
												{errors.fullName && <FieldError id="fullName-error" message={errors.fullName} />}
										</div>

										{/* Mobile */}
										<div>
											<label htmlFor="mobile" className="mb-1 block text-xs font-medium text-[#0A2C59]">
												Mobile Number <span className="text-[#B42318]" aria-hidden="true">*</span>
											</label>
											<Input
												id="mobile"
												name="mobile"
												inputMode="tel"
												placeholder="+91 98765 43210"
												required
												value={formValues.mobile}
												onChange={(e) => setFormValues((v) => ({ ...v, mobile: e.target.value }))}
												aria-invalid={Boolean(errors.mobile)}
												aria-describedby={errors.mobile ? "mobile-error" : undefined}
													className={`h-9 text-xs${errors.mobile ? " border-[#B42318] focus-visible:ring-[#B42318]/30" : ""}`}
											/>
												{errors.mobile && <FieldError id="mobile-error" message={errors.mobile} />}
										</div>

										{/* Email */}
										<div>
											<label htmlFor="email" className="mb-1 block text-xs font-medium text-[#0A2C59]">
												Email Address <span className="text-[#B42318]" aria-hidden="true">*</span>
											</label>
											<Input
												id="email"
												name="email"
												type="email"
												placeholder="you@example.com"
												required
												value={formValues.email}
												onChange={(e) => setFormValues((v) => ({ ...v, email: e.target.value }))}
												aria-invalid={Boolean(errors.email)}
												aria-describedby={errors.email ? "email-error" : undefined}
													className={`h-9 text-xs${errors.email ? " border-[#B42318] focus-visible:ring-[#B42318]/30" : ""}`}
											/>
												{errors.email && <FieldError id="email-error" message={errors.email} />}
										</div>

										{/* City */}
										<div>
											<label htmlFor="city" className="mb-1 block text-xs font-medium text-[#0A2C59]">
												City <span className="text-[#B42318]" aria-hidden="true">*</span>
											</label>
												<CityCombobox
													value={formValues.city}
													onChange={(val) => setFormValues((v) => ({ ...v, city: val }))}
													hasError={Boolean(errors.city)}
													errorId="city-error"
												/>
											{errors.city && <FieldError id="city-error" message={errors.city} />}
										</div>

										{/* Divider */}
										<div className="border-t border-[#E6E8EC]" aria-hidden="true" />

										{/* Consent */}
										<div>
											<label className="flex cursor-pointer items-start gap-2.5 text-xs text-[#6C7676]">
												<input
													type="checkbox"
													checked={formValues.consent}
													onChange={(e) => setFormValues((v) => ({ ...v, consent: e.target.checked }))}
													className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-[#E6E8EC] accent-[#0A2C59] focus-visible:ring-2 focus-visible:ring-[#0A2C59]/40"
												/>
												<span>I agree to be contacted by the admissions team regarding my enquiry.</span>
											</label>
											{errors.consent && <FieldError id="consent-error" message={errors.consent} />}
										</div>

										{/* Submit */}
										<Button
											type="submit"
												size="md"
											className="w-full rounded-xl transition-transform hover:-translate-y-0.5"
											disabled={formStatus === "submitting"}
										>
											{formStatus === "submitting" ? (
												<span className="flex items-center gap-2">
													<svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
													{buttonLabel}
												</span>
											) : buttonLabel}
										</Button>

										{/* Status messages */}
										{formStatus === "success" && (
											<div role="status" className="flex items-start gap-3 rounded-xl border border-[#12B76A]/25 bg-[#F0FDF6] px-4 py-3">
												<svg className="mt-0.5 shrink-0 text-[#12B76A]" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
												<p className="text-sm text-[#0A2C59]">
													Thank you. Your enquiry has been received. Our admissions team will contact you shortly.
												</p>
											</div>
										)}
										{formStatus === "error" && (
											<div role="alert" className="flex items-start gap-3 rounded-xl border border-[#B42318]/25 bg-[#FFF5F5] px-4 py-3">
												<svg className="mt-0.5 shrink-0 text-[#B42318]" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
												<p className="text-sm text-[#B42318]">
													We could not submit your enquiry right now. Please try again or contact us directly.
												</p>
											</div>
										)}

										{/* Trust footer */}
										{formStatus !== "success" && (
											<div className="flex items-center justify-center gap-1.5 text-xs text-[#6C7676]">
												<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
												<span>Your information is secure and will not be shared.</span>
											</div>
										)}
									</form>
								</div>
							</div>
						</m.section>

					</div>
				</LazyMotion>
			</div>

		{/* ── Full-width stat bar — bridges hero into next section ── */}
		<div className="absolute bottom-0 left-0 right-0 z-10 border-t border-white/8 bg-[#020E1E]/60 backdrop-blur-md">
			<div className="container-shell">
				<div className={`grid grid-cols-3 divide-x divide-white/8 transition-all duration-700 ${imageLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
					style={{ transitionDelay: "0.5s" }}
				>
					{[
						{ label: "India Today Ranking", value: "#1 Private Uni", sub: "11 consecutive years" },
						{ label: "On-campus placements", value: "27,000+", sub: "students placed last year" },
						{ label: "Hiring partners", value: "800+ companies", sub: "across all sectors" },
					].map((item) => (
						<div key={item.label} className="px-4 py-3 md:px-6 md:py-4">
							<p className="text-[9px] font-semibold uppercase tracking-[0.13em] text-white/40">{item.label}</p>
							<p className="mt-0.5 text-sm font-bold text-[#FACB06] md:text-base">{item.value}</p>
							<p className="text-[9px] text-white/30">{item.sub}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	</section>
	);
}