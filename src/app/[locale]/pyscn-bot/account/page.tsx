import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import AccountHeader from "@/components/dashboard/AccountHeader";
import DashboardShell from "@/components/dashboard/DashboardShell";
import ExecutiveSummarySection from "@/components/dashboard/ExecutiveSummarySection";
import GradeDistribution from "@/components/dashboard/GradeDistribution";
import HealthGauge from "@/components/dashboard/HealthGauge";
import { Panel } from "@/components/dashboard/primitives";
import RepositoryTable from "@/components/dashboard/RepositoryTable";
import {
	getAccount,
	getExecutiveReports,
	getRepositories,
} from "@/lib/dashboard/api";
import { buildExecutiveSummary } from "@/lib/dashboard/executive";
import { gradeFromScore, summarizeRepositories } from "@/lib/dashboard/grades";
import { getOrgDashboardSettings } from "@/lib/dashboard/settings";

const ENTERPRISE = "enterprise";

export const metadata: Metadata = {
	title: "Dashboard | Polyscan",
	description: "Code quality of your repositories, audited by Polyscan",
	robots: { index: false, follow: false },
};

/* The account page: plan and billing, then the audit dashboard. Enterprise
   accounts get the executive summary on top. */
export default async function AccountPage() {
	const account = await getAccount();
	const [repositories, executiveReports] = await Promise.all([
		getRepositories(),
		account.planName === ENTERPRISE ? getExecutiveReports() : null,
	]);
	const summary = summarizeRepositories(repositories);
	const executive = executiveReports
		? buildExecutiveSummary(
				executiveReports,
				getOrgDashboardSettings(account.userId),
			)
		: null;
	const t = await getTranslations("dashboard");

	return (
		<DashboardShell>
			<AccountHeader
				account={account}
				repositoriesTracked={summary.totalRepositories}
			/>

			{executive && <ExecutiveSummarySection summary={executive} />}

			<div className="mb-10 grid gap-6 md:grid-cols-2">
				<Panel className="flex flex-col items-center justify-center p-6">
					<HealthGauge
						score={summary.averageHealthScore}
						grade={gradeFromScore(summary.averageHealthScore)}
						label={t("healthScore")}
					/>
					<p className="mt-4 text-sm text-[var(--text-secondary)]">
						{t("averageAcrossAll")}
					</p>
				</Panel>
				<GradeDistribution
					distribution={summary.gradeDistribution}
					title={t("gradeDistribution")}
				/>
			</div>

			<section>
				<h2 className="text-lg font-semibold text-[var(--text-primary)]">
					{t("repositories")}
				</h2>
				<p className="mt-1 mb-4 text-sm text-[var(--text-secondary)]">
					{t("repositoriesSubtitle")}
				</p>
				<RepositoryTable repositories={repositories} />
			</section>
		</DashboardShell>
	);
}
