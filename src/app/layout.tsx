import type { Metadata } from "next";
import { Inter, Libre_Baskerville } from "next/font/google";
import EnquireModal from "../../components/landing/EnquireModal";
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
	title: "Amity Admissions | Recognized, Career-Focused, Student-First",
	description:
		"Explore why students choose Amity: recognition, student life, outcomes, alumni stories, and admissions support in one premium, text-first experience.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<link rel="icon" href="/favicon.svg" type="image/svg+xml"></link>
			</head>
			<body className={`${inter.variable} ${libreBaskerville.variable} antialiased`}>
				<EnquireModalProvider>
					{children}
					<EnquireModal />
				</EnquireModalProvider>
			</body>
		</html>
	);
}
