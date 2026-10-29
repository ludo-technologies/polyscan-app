import type { ExecutiveSummary } from "./types";

/** Traffic-light reading of an executive summary. */

export type ExecutiveOverallStatus = "healthy" | "warning" | "critical";
export type KpiStatus = "good" | "warn" | "bad" | "neutral";

export interface KpiStatuses {
	slaCompliance: KpiStatus;
	overdueItems: KpiStatus;
	criticalOpen: KpiStatus;
	avgHealthScore: KpiStatus;
	reposTracked: KpiStatus;
}

export interface ExecutiveStatus {
	overall: ExecutiveOverallStatus;
	kpis: KpiStatuses;
}

const SLA_WARN_THRESHOLD = 0.6;
const OVERDUE_WARN_THRESHOLD = 5;
const CRITICAL_WARN_THRESHOLD = 3;
const HEALTH_GOOD_THRESHOLD = 60;
const HEALTH_WARN_THRESHOLD = 40;

function classifySla(rate: number, target: number): KpiStatus {
	if (rate >= target) return "good";
	if (rate >= SLA_WARN_THRESHOLD) return "warn";
	return "bad";
}

function classifyCount(count: number, warnThreshold: number): KpiStatus {
	if (count === 0) return "good";
	if (count < warnThreshold) return "warn";
	return "bad";
}

function classifyHealth(score: number): KpiStatus {
	if (score >= HEALTH_GOOD_THRESHOLD) return "good";
	if (score >= HEALTH_WARN_THRESHOLD) return "warn";
	return "bad";
}

function deriveOverall(kpis: KpiStatuses): ExecutiveOverallStatus {
	const statuses = [
		kpis.slaCompliance,
		kpis.overdueItems,
		kpis.criticalOpen,
		kpis.avgHealthScore,
	];
	if (statuses.includes("bad")) return "critical";
	if (statuses.includes("warn")) return "warning";
	return "healthy";
}

export function computeExecutiveStatus(
	summary: ExecutiveSummary,
): ExecutiveStatus {
	const kpis: KpiStatuses = {
		slaCompliance: classifySla(
			summary.kpis.slaComplianceRate,
			summary.targets.slaComplianceTarget,
		),
		overdueItems: classifyCount(
			summary.kpis.overdueCount,
			OVERDUE_WARN_THRESHOLD,
		),
		criticalOpen: classifyCount(
			summary.kpis.criticalOpenCount,
			CRITICAL_WARN_THRESHOLD,
		),
		avgHealthScore: classifyHealth(summary.kpis.avgHealthScore),
		reposTracked: "neutral",
	};
	return { overall: deriveOverall(kpis), kpis };
}
