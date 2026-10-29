import { useFormatter, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { executiveActionCopy } from "@/lib/dashboard/executive-action-copy";
import { computeExecutiveStatus } from "@/lib/dashboard/executive-status";
import { TONE_COLOR } from "@/lib/dashboard/grades";
import type { ExecutiveSummary } from "@/lib/dashboard/types";
import { PrintButton } from "./AutoPrint";
import {
	formatDelta,
	KPI_TONE,
	OVERALL_MARK,
	OVERALL_TONE,
} from "./ExecutiveSummarySection";
import { textLinkClass } from "./primitives";

const cellClass = "border-b border-[var(--border-subtle)] px-3 py-2";

function PrintHeading({ children }: { children: string }) {
	return (
		<h2 className="mb-3 text-base font-semibold text-[var(--text-primary)]">
			{children}
		</h2>
	);
}

/* One A4-ish sheet of the executive summary, for the browser's print-to-PDF. */
export default function ExecutivePrint({
	summary,
	owner,
}: {
	summary: ExecutiveSummary;
	owner: string;
}) {
	const t = useTranslations("dashboard");
	const format = useFormatter();
	const status = computeExecutiveStatus(summary);
	const overallTone = OVERALL_TONE[status.overall];
	const compliancePercent = Math.round(summary.kpis.slaComplianceRate * 100);
	const targetPercent = Math.round(summary.targets.slaComplianceTarget * 100);
	const actions = summary.priorityActions.map((item) => ({
		...item,
		...executiveActionCopy(item, t),
	}));
	const kpis = [
		{
			label: t("slaCompliance"),
			value: `${compliancePercent}%`,
			status: status.kpis.slaCompliance,
			caption: `${t("target")} ${targetPercent}%`,
		},
		{
			label: t("overdueItems"),
			value: String(summary.kpis.overdueCount),
			status: status.kpis.overdueItems,
		},
		{
			label: t("criticalOpen"),
			value: String(summary.kpis.criticalOpenCount),
			status: status.kpis.criticalOpen,
		},
		{
			label: t("avgHealthScore"),
			value: String(summary.kpis.avgHealthScore),
			status: status.kpis.avgHealthScore,
		},
		{
			label: t("repositories"),
			value: String(summary.kpis.reposTracked),
			status: status.kpis.reposTracked,
		},
	];

	return (
		<main className="min-h-screen px-4 py-8 sm:px-6">
			<div className="print-sheet mx-auto max-w-4xl border border-[var(--border-light)] bg-[var(--bg-card)] p-8">
				<div className="print-hide mb-6 flex items-center justify-between">
					<Link href="/pyscn-bot/account" className={textLinkClass}>
						← {t("backToDashboard")}
					</Link>
					<PrintButton label={t("exportPdf")} />
				</div>

				<header className="mb-6">
					<p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--text-muted)]">
						{t("enterprise")} · {owner}
					</p>
					<h1 className="type-display mt-2 text-2xl font-bold text-[var(--text-primary)]">
						{t("executiveSummary")}
					</h1>
					<p className="mt-2 font-mono text-xs text-[var(--text-secondary)]">
						{t("generatedAt")}:{" "}
						{format.dateTime(new Date(summary.generatedAt), {
							dateStyle: "medium",
							timeStyle: "short",
						})}
						{" · "}
						{t("period")}: {summary.period.from} – {summary.period.to}
					</p>
				</header>

				<div
					className="mb-6 flex items-start gap-3 border border-[var(--border-subtle)] p-3"
					style={{
						borderLeftWidth: 3,
						borderLeftColor: TONE_COLOR[overallTone],
					}}
				>
					<span
						aria-hidden="true"
						className="font-mono leading-5"
						style={{ color: TONE_COLOR[overallTone] }}
					>
						{OVERALL_MARK[status.overall]}
					</span>
					<div>
						<p className="text-sm font-semibold text-[var(--text-primary)]">
							{t(`overall.${status.overall}.title`)}
						</p>
						<p className="text-xs text-[var(--text-secondary)]">
							{t(`overall.${status.overall}.detail`)}
						</p>
					</div>
				</div>

				<section className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-5">
					{kpis.map((kpi) => (
						<div
							key={kpi.label}
							className="border border-[var(--border-subtle)] p-3"
							style={{
								borderTopWidth: 2,
								borderTopColor: TONE_COLOR[KPI_TONE[kpi.status]],
							}}
						>
							<p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
								{kpi.label}
							</p>
							<p className="mt-1 font-mono text-xl font-medium text-[var(--text-primary)]">
								{kpi.value}
							</p>
							{kpi.caption && (
								<p className="font-mono text-[10px] text-[var(--text-muted)]">
									{kpi.caption}
								</p>
							)}
						</div>
					))}
				</section>

				<section className="mb-6">
					<PrintHeading>{t("topRisks")}</PrintHeading>
					{summary.topRisks.length === 0 ? (
						<p className="text-sm text-[var(--text-secondary)]">
							{t("noTopRisks")}
						</p>
					) : (
						<table className="w-full border border-[var(--border-subtle)] text-left text-sm">
							<thead className="bg-[var(--bg-subtle)] font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-muted)]">
								<tr>
									{(
										[
											"category",
											"severity",
											"status",
											"repository",
											"owner",
											"due",
										] as const
									).map((key) => (
										<th
											key={key}
											scope="col"
											className={`${cellClass} font-normal`}
										>
											{t(key)}
										</th>
									))}
								</tr>
							</thead>
							<tbody>
								{summary.topRisks.map((risk) => (
									<tr key={`${risk.repo}:${risk.id}`}>
										<td className={cellClass}>{risk.category}</td>
										<td className={cellClass}>{t(risk.severity)}</td>
										<td className={cellClass}>{risk.status}</td>
										<td className={`${cellClass} font-mono text-xs`}>
											{risk.repo}
										</td>
										<td className={cellClass}>{risk.owner}</td>
										<td className={`${cellClass} font-mono text-xs`}>
											{risk.dueDate}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					)}
				</section>

				<section className="mb-6">
					<PrintHeading>{t("priorityActions")}</PrintHeading>
					{actions.length === 0 ? (
						<p className="text-sm text-[var(--text-secondary)]">
							{t("noPriorityActions")}
						</p>
					) : (
						<ol className="list-decimal space-y-2 pl-6 text-sm">
							{actions.map((item) => (
								<li key={item.kind}>
									<p className="font-medium text-[var(--text-primary)]">
										{item.action}
									</p>
									<p className="text-[var(--text-secondary)]">
										{t("reason")}: {item.reason}
									</p>
									<p className="font-mono text-xs text-[var(--text-muted)]">
										{t("owner")}: {item.owner} · {t("due")}: {item.dueDate}
									</p>
								</li>
							))}
						</ol>
					)}
				</section>

				<section>
					<PrintHeading>{t("trend30d")}</PrintHeading>
					<p className="text-sm text-[var(--text-primary)]">
						{t("healthDelta30d")}:{" "}
						<strong className="font-mono">
							{formatDelta(summary.trend.healthDelta30d)}
						</strong>
					</p>
					<p className="mt-2 text-sm text-[var(--text-primary)]">
						{t("gradeDowngrades")}:{" "}
						{summary.trend.gradeDowngradedRepos.length === 0
							? t("noGradeDowngrades")
							: summary.trend.gradeDowngradedRepos.join(", ")}
					</p>
				</section>
			</div>
		</main>
	);
}
