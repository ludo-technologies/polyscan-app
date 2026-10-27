/**
 * Dashboard data shapes. The JSON ones mirror the Go backend's
 * usecase/dashboard package (polyscan-backend); the rest are derived here.
 */

export type Grade = "A" | "B" | "C" | "D" | "F";
export type RecommendationSeverity = "critical" | "high" | "medium" | "low";
export type RecommendationCategory =
	| "Security"
	| "Architecture"
	| "Complexity"
	| "Dead Code"
	| "Duplication"
	| "Dependency"
	| "Coupling"
	| "Maintainability"
	| "Testing"
	| "Performance"
	| "General";

/** Shape of GET /pyscn-bot/api/account (webauth.AccountInfo). */
export interface AccountInfo {
	userId: number;
	login: string;
	planName: string; // "free" | "pro" | "team" | "enterprise"
	isPaid: boolean;
	updatedAt: string | null;
	hasStripeSubscription: boolean;
}

export interface BotStructuredRecommendation {
	ruleId?: string;
	title?: string;
	severity?: string;
	category?: string;
	evidence?: string;
	recommendation?: string;
	suggestedAction?: string;
	confidence?: number;
	status?: string;
	owner?: string;
	dueDate?: string;
}

export type BotRecommendation = string | BotStructuredRecommendation;

/**
 * One stored finding. The backend marshals entity.AuditIssue without json
 * tags, so the keys are capitalized; the lowercase variants cover older rows.
 */
export interface BotIssue {
	ruleId?: string;
	title?: string;
	severity?: string;
	category?: string;
	evidence?: string;
	recommendation?: string;
	suggestedAction?: string;
	confidence?: number;
	status?: string;
	owner?: string;
	dueDate?: string;
	File?: string;
	Line?: number;
	EndLine?: number;
	Type?: string;
	Severity?: string;
	Description?: string;
	Details?: Record<string, unknown>;
	file?: string;
	line?: number;
	endLine?: number;
	type?: string;
	description?: string;
	details?: Record<string, unknown>;
}

export interface EnterpriseRecommendation {
	id: string;
	raw: string;
	title: string;
	severity: RecommendationSeverity;
	category: RecommendationCategory;
	suggestedAction: string;
	status: string;
	owner: string;
	dueDate: string;
	ruleId?: string;
	confidence?: number;
}

/** One report's scores: the repository list rows and the trend history. */
export interface RepositorySummary {
	repoName: string;
	periodEnd: string;
	healthScore: number;
	grade: Grade;
	securityScore: number;
	securityIssues: number;
	complexityScore: number;
	deadCodeScore: number;
	duplicationScore: number;
	couplingScore: number;
	dependencyScore: number;
	architectureScore: number;
}

export interface AuditReport extends RepositorySummary {
	owner: string;
	recommendations: BotRecommendation[];
	issues: BotIssue[];
	createdAt: string;
}

export interface RepositoryDetail {
	report: AuditReport;
	history: RepositorySummary[];
}

export interface ExecutiveReports {
	generatedAt: string;
	baselineAt: string;
	latest: AuditReport[];
	baseline: RepositorySummary[];
}

export interface DashboardSummary {
	totalRepositories: number;
	averageHealthScore: number;
	gradeDistribution: Record<Grade, number>;
}

export interface OrgDashboardSettings {
	kpi: {
		slaDays: Record<RecommendationSeverity, number>;
		slaComplianceTarget: number;
	};
	executive: {
		topRisksLimit: number;
		priorityActionsLimit: number;
	};
}

export interface ExecutiveKpis {
	slaComplianceRate: number;
	overdueCount: number;
	criticalOpenCount: number;
	avgHealthScore: number;
	reposTracked: number;
}

export interface ExecutiveRiskItem {
	id: string;
	category: RecommendationCategory;
	severity: RecommendationSeverity;
	title: string;
	repo: string;
	dueDate: string;
	status: string;
	owner: string;
}

export type ExecutiveActionKind =
	| "resolve_critical_overdue"
	| "burn_down_high_overdue"
	| "recover_sla_compliance"
	| "mitigate_top_open_risk"
	| "maintain_weekly_cadence";

export interface ExecutiveActionItem {
	owner: string;
	dueDate: string;
	kind: ExecutiveActionKind;
	params?: {
		count?: number;
		currentCompliancePercent?: number;
		targetCompliancePercent?: number;
		repo?: string;
		severity?: RecommendationSeverity;
	};
}

export interface ExecutiveSummary {
	generatedAt: string;
	period: {
		from: string;
		to: string;
	};
	kpis: ExecutiveKpis;
	topRisks: ExecutiveRiskItem[];
	priorityActions: ExecutiveActionItem[];
	trend: {
		healthDelta30d: number;
		gradeDowngradedRepos: string[];
	};
	targets: {
		slaDays: Record<RecommendationSeverity, number>;
		slaComplianceTarget: number;
	};
	targetStatus: {
		slaComplianceMet: boolean;
	};
}
