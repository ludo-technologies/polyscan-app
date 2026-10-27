import type { Metadata } from "next";
import { getFormatter, getTranslations } from "next-intl/server";
import DashboardShell from "@/components/dashboard/DashboardShell";
import GradeBadge from "@/components/dashboard/GradeBadge";
import HealthGauge from "@/components/dashboard/HealthGauge";
import {
	Panel,
	PanelTitle,
	textLinkClass,
} from "@/components/dashboard/primitives";
import RecommendationList from "@/components/dashboard/RecommendationList";
import ScoreCard from "@/components/dashboard/ScoreCard";
import TrendChart from "@/components/dashboard/TrendChart";
import { Link } from "@/i18n/navigation";
import { getRepository } from "@/lib/dashboard/api";
import { toEnterpriseRecommendations } from "@/lib/dashboard/recommendations";

type Params = Promise<{ repo: string }>;

export async function generateMetadata({
	params,
}: {
	params: Params;
}): Promise<Metadata> {
	const { repo } = await params;
	return {
		title: `${decodeURIComponent(repo)} | Polyscan`,
		robots: { index: false, follow: false },
	};
}

/* One repository: latest scores, their trend, and the findings as an action
   queue. */
export default async function RepositoryPage({ params }: { params: Params }) {
	const { repo } = await params;
	const { report, history } = await getRepository(decodeURIComponent(repo));
	const t = await getTranslations("dashboard");
	const format = await getFormatter();
	const formatDate = (iso: string) =>
		format.dateTime(new Date(iso), { dateStyle: "medium" });
	const recommendations = toEnterpriseRecommendations({
		issues: report.issues,
		recommendations: report.recommendations,
	});
	const metrics = [
		["complexity", report.complexityScore],
		["deadCode", report.deadCodeScore],
		["duplication", report.duplicationScore],
		["coupling", report.couplingScore],
		["dependency", report.dependencyScore],
		["architecture", report.architectureScore],
	] as const;

	return (
		<DashboardShell>
			<Link
				href="/pyscn-bot/account"
				className={`${textLinkClass} mb-8 inline-flex`}
			>
				← {t("backToDashboard")}
			</Link>

			<header className="mb-8">
				<div className="flex items-center gap-4">
					<h1 className="font-mono text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">
						{report.repoName}
					</h1>
					<GradeBadge grade={report.grade} size="lg" />
				</div>
				<p className="mt-2 font-mono text-xs text-[var(--text-muted)]">
					{t("lastReport")}: {formatDate(report.periodEnd)}
				</p>
			</header>

			<div className="mb-8 grid gap-6 lg:grid-cols-3">
				<Panel className="flex items-center justify-center p-6">
					<HealthGauge
						score={report.healthScore}
						grade={report.grade}
						label={t("healthScore")}
					/>
				</Panel>
				<Panel className="min-w-0 p-6 lg:col-span-2">
					<PanelTitle>{t("healthScoreTrend")}</PanelTitle>
					<div className="mt-4">
						<TrendChart
							title={t("healthScoreTrend")}
							dateLabel={t("lastReport")}
							valueLabel={t("healthScore")}
							points={history.map((entry) => ({
								date: formatDate(entry.periodEnd),
								value: entry.healthScore,
							}))}
						/>
					</div>
				</Panel>
			</div>

			<section className="mb-8">
				<h2 className="mb-4 text-lg font-semibold text-[var(--text-primary)]">
					{t("metrics")}
				</h2>
				<div className="grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-7">
					<ScoreCard
						label={t("security")}
						score={report.securityScore}
						caption={t("issueCount", { count: report.securityIssues })}
						captionTone={report.securityIssues > 0 ? "over" : "muted"}
					/>
					{metrics.map(([key, score]) => (
						<ScoreCard key={key} label={t(key)} score={score} />
					))}
				</div>
			</section>

			<RecommendationList recommendations={recommendations} />
		</DashboardShell>
	);
}
