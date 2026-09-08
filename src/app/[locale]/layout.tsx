import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import type { ReactNode } from "react";
import Analytics from "@/components/Analytics";
import { routing } from "@/i18n/routing";
import { archivo, jetbrains } from "@/lib/fonts";
import { getSiteUrl } from "@/lib/site-url";
import "../globals.css";

export const metadata: Metadata = {
	metadataBase: new URL(getSiteUrl()),
};

// Unknown locales (e.g. /feed.xml, /nonexistent) 404 immediately instead of
// rendering the tree and crashing with a static-to-dynamic error.
export const dynamicParams = false;

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}

// Root layout for the localized tree (home page, pyscn-bot). Renders the html
// lang attribute per locale; the English-only site tree (blog, privacy, terms)
// has its own root layout in app/(site)/layout.tsx.
export default async function LocaleRootLayout({
	children,
	params,
}: {
	children: ReactNode;
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	if (!hasLocale(routing.locales, locale)) {
		notFound();
	}

	// Enables static rendering for this subtree.
	setRequestLocale(locale);

	const messages = await getMessages();

	return (
		<html lang={locale}>
			<body className={`${archivo.variable} ${jetbrains.variable} antialiased`}>
				<Analytics />
				<NextIntlClientProvider messages={messages}>
					{children}
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
