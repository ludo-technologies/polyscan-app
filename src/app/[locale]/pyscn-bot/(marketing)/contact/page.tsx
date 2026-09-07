import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ContactForm from "@/components/pyscn-bot/ContactForm";
import SubpageHeader from "@/components/pyscn-bot/SubpageHeader";
import { pyscnBotAlternates } from "@/lib/pyscn-bot-metadata";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale });
	const { canonical, languages } = pyscnBotAlternates(
		locale,
		"/pyscn-bot/contact",
	);
	return {
		title: `${t("contact.title")} - Ludo Technologies`,
		description: t("contact.description"),
		alternates: { canonical, languages },
	};
}

export default async function ContactPage() {
	const t = await getTranslations();

	return (
		<main className="pt-24 pb-16">
			<div className="mx-auto max-w-xl px-4 sm:px-6">
				<SubpageHeader
					backLabel={t("legal.backToHome")}
					eyebrow="Contact"
					title={t("contact.title")}
					lede={t("contact.description")}
				/>
				<ContactForm />
			</div>
		</main>
	);
}
