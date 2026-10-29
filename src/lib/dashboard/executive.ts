import { toEnterpriseRecommendations } from "./recommendations";
import type {
	ExecutiveActionItem,
	ExecutiveReports,
	ExecutiveRiskItem,
	ExecutiveSummary,
	Grade,
	OrgDashboardSettings,
	RecommendationSeverity,
	RepositorySummary,
} from "./types";

/**
 * The executive summary: SLA compliance, overdue and critical counts, top
 * risks and the actions they imply, computed from every repository's latest
 * report and from where each one stood 30 days earlier.
 */

const CLOSED_STATUS_SET = new Set([
	"done",
	"closed",
	"resolved",
	"mitigated",
	"complete",
	"completed",
]);

const SEVERITY_SORT_ORDER: Record<RecommendationSeverity, number> = {
	critical: 0,
	high: 1,
	medium: 2,
	low: 3,
};

const GRADE_RANK: Record<Grade, number> = {
	A: 5,
	B: 4,
	C: 3,
	D: 2,
	F: 1,
};

const SLA_RECOVERY_DAYS = 7;
const CADENCE_DAYS = 7;

export function toDateString(value: Date): string {
	const year = value.getFullYear();
	const month = String(value.getMonth() + 1).padStart(2, "0");
	const day = String(value.getDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
}

function addDays(value: Date, days: number): Date {
	const next = new Date(value);
	next.setDate(next.getDate() + days);
	return next;
}

function roundToOneDecimal(value: number): number {
	return Math.round(value * 10) / 10;
}

function isClosedStatus(status: string): boolean {
	return CLOSED_STATUS_SET.has(status.trim().toLowerCase());
}

function parseDateOrFallback(value: string, fallback: string): string {
	const normalized = value.trim();
	const match = normalized.match(/^(\d{4}-\d{2}-\d{2})/);
	if (match) {
		return match[1];
	}
	const parsed = Date.parse(normalized);
	if (Number.isNaN(parsed)) {
		return fallback;
	}
	return toDateString(new Date(parsed));
}

function buildPriorityActions(
	openRisks: ExecutiveRiskItem[],
	overdueRisks: ExecutiveRiskItem[],
	slaComplianceRate: number,
	slaComplianceTarget: number,
	limit: number,
	now: Date,
): ExecutiveActionItem[] {
	const actions: ExecutiveActionItem[] = [];
	const actionableOwner = (items: ExecutiveRiskItem[]): string =>
		items.find((item) => item.owner !== "Unassigned")?.owner ?? "Unassigned";
	const earliestDue = (items: ExecutiveRiskItem[]): string =>
		items.map((item) => item.dueDate).sort()[0];

	const criticalOverdue = overdueRisks.filter(
		(item) => item.severity === "critical",
	);
	if (criticalOverdue.length > 0) {
		actions.push({
			owner: actionableOwner(criticalOverdue),
			dueDate: earliestDue(criticalOverdue),
			kind: "resolve_critical_overdue",
			params: { count: criticalOverdue.length },
		});
	}

	const highOverdue = overdueRisks.filter((item) => item.severity === "high");
	if (highOverdue.length > 0) {
		actions.push({
			owner: actionableOwner(highOverdue),
			dueDate: earliestDue(highOverdue),
			kind: "burn_down_high_overdue",
			params: { count: highOverdue.length },
		});
	}

	if (slaComplianceRate < slaComplianceTarget) {
		actions.push({
			owner: "Unassigned",
			dueDate: toDateString(addDays(now, SLA_RECOVERY_DAYS)),
			kind: "recover_sla_compliance",
			params: {
				currentCompliancePercent: Math.round(slaComplianceRate * 100),
				targetCompliancePercent: Math.round(slaComplianceTarget * 100),
			},
		});
	}

	if (actions.length === 0 && openRisks.length > 0) {
		const topRisk = openRisks[0];
		actions.push({
			owner: topRisk.owner,
			dueDate: topRisk.dueDate,
			kind: "mitigate_top_open_risk",
			params: { repo: topRisk.repo, severity: topRisk.severity },
		});
	}

	if (actions.length === 0) {
		actions.push({
			owner: "Unassigned",
			dueDate: toDateString(addDays(now, CADENCE_DAYS)),
			kind: "maintain_weekly_cadence",
		});
	}

	return actions.slice(0, limit);
}

export function buildExecutiveSummary(
	reports: ExecutiveReports,
	settings: OrgDashboardSettings,
): ExecutiveSummary {
	const now = new Date(reports.generatedAt);
	const today = toDateString(now);
	const periodFrom = toDateString(new Date(reports.baselineAt));

	const baselineByRepo = new Map<string, RepositorySummary>(
		reports.baseline.map((row) => [row.repoName, row]),
	);

	const risks: ExecutiveRiskItem[] = [];
	const seenRiskKeys = new Set<string>();
	for (const report of reports.latest) {
		const recommendations = toEnterpriseRecommendations(
			{ issues: report.issues, recommendations: report.recommendations },
			{ now },
		);

		for (const recommendation of recommendations) {
			const dueDate = parseDateOrFallback(recommendation.dueDate, today);
			const riskKey = `${report.repoName}:${recommendation.id}:${recommendation.title}:${dueDate}`;
			if (seenRiskKeys.has(riskKey)) {
				continue;
			}
			seenRiskKeys.add(riskKey);

			risks.push({
				id: recommendation.id,
				category: recommendation.category,
				severity: recommendation.severity,
				title: recommendation.title,
				repo: report.repoName,
				dueDate,
				status: recommendation.status,
				owner: recommendation.owner,
			});
		}
	}

	const openRisks = risks
		.filter((risk) => !isClosedStatus(risk.status))
		.sort((a, b) => {
			const bySeverity =
				SEVERITY_SORT_ORDER[a.severity] - SEVERITY_SORT_ORDER[b.severity];
			if (bySeverity !== 0) {
				return bySeverity;
			}
			const byDueDate = a.dueDate.localeCompare(b.dueDate);
			if (byDueDate !== 0) {
				return byDueDate;
			}
			return a.id.localeCompare(b.id);
		});

	const overdueRisks = openRisks.filter((risk) => risk.dueDate < today);

	const slaComplianceRate =
		risks.length > 0 ? (risks.length - overdueRisks.length) / risks.length : 1;

	const avgHealthScore =
		reports.latest.length > 0
			? roundToOneDecimal(
					reports.latest.reduce((sum, report) => sum + report.healthScore, 0) /
						reports.latest.length,
				)
			: 0;

	const criticalOpenCount = openRisks.filter(
		(risk) => risk.severity === "critical",
	).length;

	let totalHealthDelta = 0;
	let healthDeltaCount = 0;
	const gradeDowngradedRepos = new Set<string>();
	for (const report of reports.latest) {
		const baseline = baselineByRepo.get(report.repoName);
		if (!baseline) {
			continue;
		}

		totalHealthDelta += report.healthScore - baseline.healthScore;
		healthDeltaCount++;

		if (GRADE_RANK[report.grade] < GRADE_RANK[baseline.grade]) {
			gradeDowngradedRepos.add(report.repoName);
		}
	}

	const healthDelta30d =
		healthDeltaCount > 0
			? roundToOneDecimal(totalHealthDelta / healthDeltaCount)
			: 0;

	return {
		generatedAt: reports.generatedAt,
		period: { from: periodFrom, to: today },
		kpis: {
			slaComplianceRate: roundToOneDecimal(slaComplianceRate * 100) / 100,
			overdueCount: overdueRisks.length,
			criticalOpenCount,
			avgHealthScore,
			reposTracked: reports.latest.length,
		},
		topRisks: openRisks.slice(0, settings.executive.topRisksLimit),
		priorityActions: buildPriorityActions(
			openRisks,
			overdueRisks,
			slaComplianceRate,
			settings.kpi.slaComplianceTarget,
			settings.executive.priorityActionsLimit,
			now,
		),
		trend: {
			healthDelta30d,
			gradeDowngradedRepos: [...gradeDowngradedRepos].sort(),
		},
		targets: {
			slaDays: settings.kpi.slaDays,
			slaComplianceTarget: settings.kpi.slaComplianceTarget,
		},
		targetStatus: {
			slaComplianceMet: slaComplianceRate >= settings.kpi.slaComplianceTarget,
		},
	};
}
