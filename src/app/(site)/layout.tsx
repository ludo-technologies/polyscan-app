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
	title: "Polyscan — Your whole codebase, audited every week",
	description:
		"Polyscan audits your whole GitHub repository every week. Open-source static analysis finds candidate problems, an AI agent reads the actual code to check the important ones, and up to ten recommendations arrive as a GitHub Issue.",
	keywords: [...SITE_KEYWORDS],
	openGraph: {
		title: "Polyscan — Your whole codebase, audited every week",
		description:
			"Static analysis finds candidate problems across the whole repository, an AI agent checks the important ones against the code, and up to ten recommendations arrive as a GitHub Issue every week.",
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
					{/* This tree is static, so it cannot read the session cookie. */}
					<Header isLoggedIn={false} />
					{children}
					<Footer />
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
