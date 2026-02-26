import Link from "next/link";

export const metadata = {
	title: "Thank You | Amity Admissions",
	description: "Your enquiry has been received. Our admissions team will be in touch shortly.",
};

export default function ThankYouPage() {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-[#041428] px-4 text-center">
			{/* Gold accent line */}
			<div className="mb-10 h-1 w-16 rounded-full bg-[#FACB06]" />

			{/* Check icon */}
			<span className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full border border-[#FACB06]/30 bg-[#FACB06]/10">
				<svg
					viewBox="0 0 24 24"
					className="h-10 w-10 text-[#FACB06]"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					aria-hidden="true"
				>
					<path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
				</svg>
			</span>

			<h1
				className="font-[family-name:var(--font-libre-baskerville)] text-3xl font-bold text-[#FFFFFF] md:text-4xl"
				style={{ fontFamily: "var(--font-libre-baskerville), serif" }}
			>
				Thank you for reaching out.
			</h1>

			<p className="mt-4 max-w-md text-base leading-relaxed text-[#FFFFFF]/65">
				Your enquiry has been received. Our admissions team will get in touch with you within 24 hours.
			</p>

			<div className="mt-10 flex flex-wrap items-center justify-center gap-4">
				<Link
					href="/"
					className="inline-flex h-11 items-center rounded-full bg-[#FACB06] px-7 text-sm font-semibold text-[#0A2C59] transition hover:bg-[#C8A205] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FACB06]/50"
				>
					← Back to Home
				</Link>
			</div>

			{/* Bottom brand mark */}
			<p className="mt-16 text-xs text-[#FFFFFF]/30">Amity University Admissions · {new Date().getFullYear()}</p>
		</div>
	);
}
