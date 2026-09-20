import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import SetupPage, {
	PrReviewSteps,
	SetupStep,
	SetupSteps,
} from "@/components/pyscn-bot/SetupPage";
import { localizedAlternates } from "@/lib/localized-metadata";

const GITHUB_APP_INSTALL_URL = "https://github.com/apps/polyscan-app";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale });
	const { canonical, languages } = localizedAlternates(
		locale,
		"/pyscn-bot/checkout/success",
	);
	return {
		title: `${t("checkout.success.title")} | Polyscan`,
		description: t("checkout.success.subtitle"),
		alternates: { canonical, languages },
		robots: { index: false, follow: false },
	};
}

export default async function CheckoutSuccessPage() {
	const t = await getTranslations();

	return (
		<SetupPage
			eyebrow={t("checkout.success.title")}
			title={t("checkout.success.subtitle")}
			lede={t("checkout.success.description")}
		>
			<SetupSteps>
				<SetupStep
					number="01"
					title={t("checkout.success.step1.title")}
					description={t("checkout.success.step1.description")}
				>
					<a
						href={GITHUB_APP_INSTALL_URL}
						className="inline-flex border border-[var(--brand-blue)] bg-[var(--brand-blue)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--brand-blue-hover)]"
					>
						{t("checkout.success.step1.button")} →
					</a>
				</SetupStep>
				<PrReviewSteps from={2} />
			</SetupSteps>
		</SetupPage>
	);
}
