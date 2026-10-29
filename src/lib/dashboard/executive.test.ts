import { describe, expect, it } from "vitest";
import { buildExecutiveSummary } from "./executive";
import { computeExecutiveStatus } from "./executive-status";
import { getOrgDashboardSettings } from "./settings";
import type { AuditReport, ExecutiveReports, RepositorySummary } from "./types";

const GENERATED_AT = "2026-10-28T09:00:00Z";
const BASELINE_AT = "2026-09-28T09:00:00Z";

function scores(
	repoName: string,
	healthScore: number,
	grade: RepositorySummary["grade"],
): RepositorySummary {
	return {
		repoName,
		periodEnd: GENERATED_AT,
		healthScore,
		grade,
		securityScore: 100,
		securityIssues: 0,
		complexityScore: healthScore,
		deadCodeScore: healthScore,
		duplicationScore: healthScore,
		couplingScore: healthScore,
		dependencyScore: healthScore,
		architectureScore: healthScore,
	};
}

function report(
	repoName: string,
	healthScore: number,
	grade: RepositorySummary["grade"],
	findings: Partial<Pick<AuditReport, "issues" | "recommendations">> = {},
): AuditReport {
	return {
		...scores(repoName, healthScore, grade),
		owner: "octocat",
		createdAt: GENERATED_AT,
		recommendations: findings.recommendations ?? [],
		issues: findings.issues ?? [],
	};
}

function reports(
	latest: AuditReport[],
	baseline: RepositorySummary[] = [],
): ExecutiveReports {
	return {
		generatedAt: GENERATED_AT,
		baselineAt: BASELINE_AT,
		latest,
		baseline,
	};
}

const settings = getOrgDashboardSettings(1);

describe("buildExecutiveSummary", () => {
	it("reports a quiet estate as healthy with the cadence action", () => {
		const summary = buildExecutiveSummary(
			reports([report("api", 85, "A")], [scores("api", 80, "A")]),
			settings,
		);

		expect(summary.period).toEqual({ from: "2026-09-28", to: "2026-10-28" });
		expect(summary.kpis).toEqual({
			slaComplianceRate: 1,
			overdueCount: 0,
			criticalOpenCount: 0,
			avgHealthScore: 85,
			reposTracked: 1,
		});
		expect(summary.trend).toEqual({
			healthDelta30d: 5,
			gradeDowngradedRepos: [],
		});
		expect(summary.priorityActions.map((a) => a.kind)).toEqual([
			"maintain_weekly_cadence",
		]);
		expect(computeExecutiveStatus(summary).overall).toBe("healthy");
	});

	it("turns stored findings into overdue risks and SLA actions", () => {
		const summary = buildExecutiveSummary(
			reports(
				[
					report("api", 30, "D", {
						issues: [
							{
								Type: "security",
								Severity: "critical",
								File: "app/auth.py",
								Line: 12,
								Description: "Hardcoded secret",
								dueDate: "2026-10-01",
							},
							{
								Type: "complexity",
								Severity: "high",
								File: "app/views.py",
								Line: 40,
								Description: "Cyclomatic complexity 31",
								dueDate: "2026-10-20",
							},
						],
						recommendations: ["Add unit tests around the payment path"],
					}),
				],
				[scores("api", 55, "C")],
			),
			settings,
		);

		expect(
			summary.topRisks.map((r) => [r.severity, r.category, r.repo]),
		).toEqual([
			["critical", "Security", "api"],
			["high", "Complexity", "api"],
			["medium", "Testing", "api"],
		]);
		// 2 of 3 risks are past their due date
		expect(summary.kpis.overdueCount).toBe(2);
		expect(summary.kpis.criticalOpenCount).toBe(1);
		expect(summary.kpis.slaComplianceRate).toBeCloseTo(0.33, 2);
		expect(summary.targetStatus.slaComplianceMet).toBe(false);
		expect(summary.trend.gradeDowngradedRepos).toEqual(["api"]);
		expect(summary.priorityActions.map((a) => a.kind)).toEqual([
			"resolve_critical_overdue",
			"burn_down_high_overdue",
			"recover_sla_compliance",
		]);
		expect(summary.priorityActions[0].dueDate).toBe("2026-10-01");
		expect(computeExecutiveStatus(summary).overall).toBe("critical");
	});

	it("ignores closed findings and repositories without a baseline", () => {
		const summary = buildExecutiveSummary(
			reports([
				report("api", 70, "B", {
					issues: [
						{
							Type: "dead_code",
							Severity: "low",
							Description: "unused helper",
							status: "resolved",
						},
					],
				}),
			]),
			settings,
		);

		expect(summary.topRisks).toEqual([]);
		expect(summary.kpis.slaComplianceRate).toBe(1);
		expect(summary.trend.healthDelta30d).toBe(0);
	});
});
