import type { Metadata } from "next";
import { Inter, Libre_Baskerville } from "next/font/google";
import EnquireModal from "../../components/landing/EnquireModal";
import Script from "next/script";
import { EnquireModalProvider } from "../lib/enquire-context";
import "./globals.css";

const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
	weight: ["400", "500", "600"],
	display: "swap",
});

const libreBaskerville = Libre_Baskerville({
	variable: "--font-libre-baskerville",
	subsets: ["latin"],
	weight: ["700"],
	display: "swap",
});

export const metadata: Metadata = {
	title: "Coursewaala | Official Enrollment Partner for Amity Online MBA",
	description:
		"Explore why students choose Amity: recognition, student life, outcomes, alumni stories, and admissions support in one premium, text-first experience.",
	icons: {
		icon: "/amitylogo.png",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body suppressHydrationWarning className={`${inter.variable} ${libreBaskerville.variable} antialiased`}>
				<EnquireModalProvider>
					{/* Google tag (gtag.js) */}
					<Script src="https://www.googletagmanager.com/gtag/js?id=AW-17892898232" strategy="afterInteractive" />
					<Script id="gtag-init" strategy="afterInteractive">
						{`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'AW-17892898232');`}
					</Script>
					{children}
					<EnquireModal />
				</EnquireModalProvider>
			</body>
		</html>
	);
}
