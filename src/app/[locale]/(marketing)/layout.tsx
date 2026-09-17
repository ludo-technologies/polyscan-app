import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import type { ReactNode } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { routing } from "@/i18n/routing";
import { isPyscnBotLoggedIn } from "@/lib/pyscn-bot-session";

export default async function MarketingLayout({
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
	setRequestLocale(locale);
	const isLoggedIn = await isPyscnBotLoggedIn();

	return (
		<>
			<Header isLoggedIn={isLoggedIn} languageSwitcher />
			{children}
			<Footer />
		</>
	);
}
