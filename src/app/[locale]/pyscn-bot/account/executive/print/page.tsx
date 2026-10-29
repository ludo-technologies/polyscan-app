import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { AutoPrint } from "@/components/dashboard/AutoPrint";
import ExecutivePrint from "@/components/dashboard/ExecutivePrint";
import { redirect } from "@/i18n/navigation";
import { getAccount, getExecutiveReports } from "@/lib/dashboard/api";
import { buildExecutiveSummary } from "@/lib/dashboard/executive";
import { getOrgDashboardSettings } from "@/lib/dashboard/settings";

export const metadata: Metadata = {
	title: "Executive Summary | Polyscan",
	robots: { index: false, follow: false },
};

/* Printable executive summary; ?autoprint=1 opens the print dialog. Accounts
   outside the Enterprise plan are sent back to the dashboard. */
export default async function ExecutivePrintPage({
	searchParams,
}: {
	searchParams: Promise<{ autoprint?: string }>;
}) {
	const [account, reports, { autoprint }] = await Promise.all([
		getAccount(),
		getExecutiveReports(),
		searchParams,
	]);
	if (!reports) {
		return redirect({ href: "/pyscn-bot/account", locale: await getLocale() });
	}
	const summary = buildExecutiveSummary(
		reports,
		getOrgDashboardSettings(account.userId),
	);

	return (
		<>
			<ExecutivePrint summary={summary} owner={account.login} />
			{autoprint === "1" && <AutoPrint />}
		</>
	);
}
