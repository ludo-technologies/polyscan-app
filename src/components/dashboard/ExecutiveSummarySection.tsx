import { useFormatter, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { executiveActionCopy } from "@/lib/dashboard/executive-action-copy";
import {
	computeExecutiveStatus,
	type ExecutiveOverallStatus,
	type KpiStatus,
} from "@/lib/dashboard/executive-status";
import {
	gradeFromScore,
	SEVERITY_TONE,
	TONE_COLOR,
	type Tone,
} from "@/lib/dashboard/grades";
import type { ExecutiveSummary } from "@/lib/dashboard/types";
import {
	Chip,
	Panel,
	PanelTitle,
	primaryButtonClass,
	Silkscreen,
} from "./primitives";

export const KPI_TONE: Record<KpiStatus, Tone> = {
	good: "ok",
	warn: "warn",
	bad: "over",
	neutral: "neutral",
};

export const OVERALL_TONE: Record<ExecutiveOverallStatus, Tone> = {
	healthy: "ok",
	warning: "warn",
	critical: "over",
};

export const OVERALL_MARK: Record<ExecutiveOverallStatus, string> = {
	healthy: "●",
	warning: "▲",
	critical: "●",
};

export function formatDelta(delta: number): string {
	return delta > 0 ? `+${delta}` : String(delta);
}

function KpiTile({
	label,
	value,
	status,
	caption,
	captionTone,
}: {
	label: string;
	value: string;
	status: KpiStatus;
	caption?: string;
	captionTone?: Tone;
}) {
	const tone = KPI_TONE[status];
	return (
		<Panel className="p-4" tone={tone}>
			<Silkscreen>{label}</Silkscreen>
			<p
				className="mt-2 font-mono text-2xl font-medium"
				style={{ color: TONE_COLOR[tone] }}
			>
				{value}
			</p>
			{caption && (
				<p
					className="mt-1 font-mono text-[11px]"
					style={{ color: TONE_COLOR[captionTone ?? "muted"] }}
				>
					{caption}
				</p>
			)}
		</Panel>
	);
}

/* The Enterprise brief at the top of the dashboard: status, five KPIs, the
   open risks that drive them, the actions they imply, and the 30-day drift. */
export default function ExecutiveSummarySection({
	summary,
}: {
	summary: ExecutiveSummary;
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
	const deltaTone: Tone = summary.trend.healthDelta30d >= 0 ? "ok" : "over";

	return (
		<section id="executive-summary" className="mb-12">
			<Panel
				tone={overallTone}
				className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
			>
				<div className="flex items-start gap-3">
					<span
						aria-hidden="true"
						className="font-mono text-lg leading-6"
						style={{ color: TONE_COLOR[overallTone] }}
					>
						{OVERALL_MARK[status.overall]}
					</span>
					<div>
						<p className="font-semibold text-[var(--text-primary)]">
							{t(`overall.${status.overall}.title`)}
						</p>
						<p className="mt-0.5 text-sm text-[var(--text-secondary)]">
							{t(`overall.${status.overall}.detail`)}
						</p>
					</div>
				</div>
				<Link
					href={{
						pathname: "/pyscn-bot/account/executive/print",
						query: { autoprint: "1" },
					}}
					className={primaryButtonClass}
				>
					{t("exportPdf")} →
				</Link>
			</Panel>

			<div className="mt-8 mb-6">
				<Silkscreen>{t("enterprise")}</Silkscreen>
				<h2 className="type-display mt-2 text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">
					{t("executiveSummary")}
				</h2>
				<p className="mt-2 font-mono text-xs text-[var(--text-muted)]">
					{t("generatedAt")}:{" "}
					{format.dateTime(new Date(summary.generatedAt), {
						dateStyle: "medium",
						timeStyle: "short",
					})}
					{" · "}
					{t("period")}: {summary.period.from} – {summary.period.to}
				</p>
			</div>

			<div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
				<KpiTile
					label={t("slaCompliance")}
					value={`${compliancePercent}%`}
					status={status.kpis.slaCompliance}
					caption={`${t("target")} ${targetPercent}% · ${summary.targetStatus.slaComplianceMet ? t("targetMet") : t("targetUnmet")}`}
					captionTone={summary.targetStatus.slaComplianceMet ? "ok" : "over"}
				/>
				<KpiTile
					label={t("overdueItems")}
					value={String(summary.kpis.overdueCount)}
					status={status.kpis.overdueItems}
				/>
				<KpiTile
					label={t("criticalOpen")}
					value={String(summary.kpis.criticalOpenCount)}
					status={status.kpis.criticalOpen}
				/>
				<KpiTile
					label={t("avgHealthScore")}
					value={`${summary.kpis.avgHealthScore} (${gradeFromScore(summary.kpis.avgHealthScore)})`}
					status={status.kpis.avgHealthScore}
				/>
				<KpiTile
					label={t("repositories")}
					value={String(summary.kpis.reposTracked)}
					status={status.kpis.reposTracked}
				/>
			</div>

			<div className="mt-6 grid items-start gap-6 xl:grid-cols-2">
				<Panel className="p-6">
					<PanelTitle>{t("topRisks")}</PanelTitle>
					{summary.topRisks.length === 0 ? (
						<p className="mt-3 text-sm text-[var(--text-secondary)]">
							{t("noTopRisks")}
						</p>
					) : (
						<ul className="mt-4 space-y-3">
							{summary.topRisks.map((risk) => (
								<li
									key={`${risk.repo}:${risk.id}`}
									className="border border-[var(--border-subtle)] p-4"
									style={{
										borderLeftWidth: 3,
										borderLeftColor: TONE_COLOR[SEVERITY_TONE[risk.severity]],
									}}
								>
									<div className="flex flex-wrap items-center gap-2">
										<Chip tone={SEVERITY_TONE[risk.severity]}>
											{t(risk.severity)}
										</Chip>
										<Chip>{risk.category}</Chip>
										<span className="font-mono text-[11px] text-[var(--text-muted)]">
											{risk.repo}
										</span>
									</div>
									<p className="mt-2 text-sm font-medium text-[var(--text-primary)]">
										{risk.title}
									</p>
									<p className="mt-2 font-mono text-[11px] text-[var(--text-muted)]">
										{t("status")}: {risk.status} · {t("owner")}: {risk.owner} ·{" "}
										{t("due")}: {risk.dueDate}
									</p>
								</li>
							))}
						</ul>
					)}
				</Panel>

				<Panel className="p-6" tone="blue">
					<PanelTitle>{t("priorityActions")}</PanelTitle>
					{actions.length === 0 ? (
						<p className="mt-3 text-sm text-[var(--text-secondary)]">
							{t("noPriorityActions")}
						</p>
					) : (
						<ol className="mt-4 space-y-3">
							{actions.map((item, index) => (
								<li
									key={item.kind}
									className="grid gap-x-4 border border-[var(--border-subtle)] p-4 sm:grid-cols-[2rem_1fr]"
								>
									<span className="font-mono text-[11px] text-[var(--brand-blue)]">
										{String(index + 1).padStart(2, "0")}
									</span>
									<div>
										<p className="font-semibold text-[var(--text-primary)]">
											{item.action}
										</p>
										<p className="mt-1 text-sm text-[var(--text-secondary)]">
											{item.reason}
										</p>
										<p className="mt-2 font-mono text-[11px] text-[var(--text-muted)]">
											{t("owner")}: {item.owner} · {t("due")}: {item.dueDate}
										</p>
									</div>
								</li>
							))}
						</ol>
					)}
				</Panel>
			</div>

			<div className="mt-6 grid gap-6 lg:grid-cols-2">
				<Panel className="p-6" tone={deltaTone}>
					<Silkscreen>{t("healthDelta30d")}</Silkscreen>
					<p
						className="mt-2 font-mono text-3xl font-medium"
						style={{ color: TONE_COLOR[deltaTone] }}
					>
						{formatDelta(summary.trend.healthDelta30d)}
					</p>
				</Panel>
				<Panel className="p-6">
					<Silkscreen>{t("gradeDowngrades")}</Silkscreen>
					{summary.trend.gradeDowngradedRepos.length === 0 ? (
						<p className="mt-2 text-sm text-[var(--reading-ok)]">
							{t("noGradeDowngrades")}
						</p>
					) : (
						<ul className="mt-2 space-y-1">
							{summary.trend.gradeDowngradedRepos.map((repo) => (
								<li
									key={repo}
									className="font-mono text-sm text-[var(--text-primary)]"
								>
									<span
										aria-hidden="true"
										className="mr-2 text-[var(--reading-warn)]"
									>
										▼
									</span>
									{repo}
								</li>
							))}
						</ul>
					)}
				</Panel>
			</div>
		</section>
	);
}
