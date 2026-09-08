import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import Analytics from "@/components/Analytics";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { routing } from "@/i18n/routing";
import { archivo, jetbrains } from "@/lib/fonts";
import { SITE_KEYWORDS } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";
import "../globals.css";

export const metadata: Metadata = {
	metadataBase: new URL(getSiteUrl()),
	title: "Polyscan — Structural codebase health for AI-written code",
	description:
		"Measure complexity, duplication, dead code, dependencies, and class design across your entire codebase. Run it once with the open-source CLI or track structural decay every week with the GitHub App.",
	keywords: [...SITE_KEYWORDS],
	openGraph: {
		title: "Polyscan — Structural codebase health for AI-written code",
		description:
			"Measure your whole codebase once with the open-source CLI, then track structural decay every week with the GitHub App.",
		type: "website",
	},
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
};

// Root layout for the English-only site tree (/, /blog, /privacy, /terms).
// The localized tree (home page, pyscn-bot) has its own root layout in
// app/[locale]/layout.tsx that renders the html lang attribute per locale.
export default async function SiteRootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	// Enables static rendering for this subtree (the tree is English-only).
	setRequestLocale(routing.defaultLocale);
	const messages = await getMessages();

	return (
		<html lang="en">
			<body className={`${archivo.variable} ${jetbrains.variable} antialiased`}>
				<Analytics />
				<NextIntlClientProvider messages={messages}>
					<Header />
					{children}
					<Footer />
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
