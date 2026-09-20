import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ConfigYaml from "@/components/pyscn-bot/ConfigYaml";
import SetupPage, {
	SetupStep,
	SetupSteps,
} from "@/components/pyscn-bot/SetupPage";
import SubscribeForm from "@/components/pyscn-bot/SubscribeForm";
import { Link } from "@/i18n/navigation";
import { localizedAlternates } from "@/lib/localized-metadata";

/* GitHub sends setup_action=request instead of install when an organization
   member asks for the App and an owner still has to approve it */
const SETUP_ACTION_REQUEST = "request";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale });
	const { canonical, languages } = localizedAlternates(
		locale,
		"/pyscn-bot/installed",
	);
	return {
		title: `${t("installed.title")} | Polyscan`,
		alternates: { canonical, languages },
		robots: { index: false, follow: false },
	};
}

/* The GitHub App's Setup URL: where GitHub sends people after installing.
   Also where the update-email confirmation link lands (?subscription=). */
export default async function InstalledPage({
	searchParams,
}: {
	searchParams: Promise<{ setup_action?: string; subscription?: string }>;
}) {
	const t = await getTranslations();
	const { setup_action, subscription } = await searchParams;
	const requested = setup_action === SETUP_ACTION_REQUEST;
	const header = requested ? "installed.requested" : "installed";

	return (
		<SetupPage
			eyebrow={t(`${header}.eyebrow`)}
			title={t(`${header}.title`)}
			lede={requested ? t("installed.requested.description") : undefined}
		>
			<SetupSteps>
				<SetupStep
					number="01"
					title={t(
						requested
							? "installed.requested.auditTitle"
							: "installed.audit.title",
					)}
					description={t("installed.audit.description")}
				/>
				<SetupStep
					number="02"
					title={t("installed.config.title")}
					description={t("installed.config.description")}
				>
					<ConfigYaml className="border border-[var(--border-subtle)]" />
				</SetupStep>
				<SetupStep
					number="03"
					title={t("installed.prReview.title")}
					description={t("installed.prReview.description")}
				/>
			</SetupSteps>

			<p className="mt-6 text-sm leading-relaxed text-[var(--text-light)]">
				{t("installed.privateNote")}{" "}
				<Link
					href="/#pricing"
					className="text-[var(--brand-blue)] hover:text-[var(--brand-blue-hover)]"
				>
					{t("installed.pricingLink")} →
				</Link>
			</p>

			<SubscribeForm confirmResult={subscription} />
		</SetupPage>
	);
}
