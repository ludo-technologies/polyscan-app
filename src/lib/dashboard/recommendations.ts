import type {
	BotIssue,
	BotRecommendation,
	BotStructuredRecommendation,
	EnterpriseRecommendation,
	RecommendationCategory,
	RecommendationSeverity,
} from "./types";

interface EnterpriseRecommendationSource {
	issues?: BotIssue[] | null;
	recommendations?: BotRecommendation[] | null;
}

interface RecommendationTransformOptions {
	now?: Date;
}

const CATEGORY_RULES: Array<{
	category: RecommendationCategory;
	patterns: RegExp[];
}> = [
	{
		category: "Security",
		patterns: [
			/\bsecurity\b/i,
			/\bvulnerab/i,
			/\bsecret\b/i,
			/\bcredential\b/i,
			/\bauth(entication|orization)?\b/i,
			/\btoken\b/i,
			/\binjection\b/i,
			/\bxss\b/i,
			/\bcsrf\b/i,
			/セキュリティ|脆弱|認証|認可|権限/,
		],
	},
	{
		category: "Architecture",
		patterns: [
			/\barchitecture\b/i,
			/\blayer\b/i,
			/\bboundary\b/i,
			/\bmodule\b/i,
			/\bseparation\b/i,
			/\bdependency cycle\b/i,
			/設計|アーキ|責務分離|境界/,
		],
	},
	{
		category: "Complexity",
		patterns: [
			/\bcomplex/i,
			/\bcyclomatic\b/i,
			/\bnested\b/i,
			/複雑|分岐|ネスト/,
		],
	},
	{
		category: "Dead Code",
		patterns: [
			/\bdead code\b/i,
			/\bunused\b/i,
			/\borphan\b/i,
			/未使用|不要コード|削除候補/,
		],
	},
	{
		category: "Duplication",
		patterns: [/\bduplica/i, /\bcopy[\s-]?paste\b/i, /重複|コピペ/],
	},
	{
		category: "Dependency",
		patterns: [
			/\bdependenc/i,
			/\boutdated\b/i,
			/\bversion\b/i,
			/\bpackage\b/i,
			/依存|ライブラリ/,
		],
	},
	{
		category: "Coupling",
		patterns: [/\bcoupling\b/i, /\btight coupling\b/i, /密結合/],
	},
	{
		category: "Testing",
		patterns: [
			/\btest/i,
			/\bcoverage\b/i,
			/\bunit test\b/i,
			/\bintegration test\b/i,
			/テスト|カバレッジ/,
		],
	},
	{
		category: "Performance",
		patterns: [
			/\bperformance\b/i,
			/\blatency\b/i,
			/\bslow\b/i,
			/\bcpu\b/i,
			/\bmemory\b/i,
			/性能|遅延|メモリ|CPU/,
		],
	},
	{
		category: "Maintainability",
		patterns: [
			/\bmaintainab/i,
			/\breadability\b/i,
			/\brefactor\b/i,
			/保守|可読性|リファクタ/,
		],
	},
];

const SEVERITY_RULES: Array<{
	severity: RecommendationSeverity;
	patterns: RegExp[];
}> = [
	{
		severity: "critical",
		patterns: [
			/\bcritical\b/i,
			/\bblocker\b/i,
			/\burgent\b/i,
			/\brce\b/i,
			/\bexploit\b/i,
			/致命|重大|緊急/,
		],
	},
	{
		severity: "high",
		patterns: [
			/\bhigh\b/i,
			/\bmajor\b/i,
			/\brisk\b/i,
			/\bsecurity\b/i,
			/高リスク|優先度高|要対応/,
		],
	},
	{
		severity: "medium",
		patterns: [
			/\bmedium\b/i,
			/\bmoderate\b/i,
			/\bimprove\b/i,
			/\brefactor\b/i,
			/中|改善|対応推奨/,
		],
	},
	{
		severity: "low",
		patterns: [
			/\blow\b/i,
			/\bminor\b/i,
			/\bnit\b/i,
			/\bstyle\b/i,
			/低|軽微|任意/,
		],
	},
];

const ACTION_BY_CATEGORY: Record<RecommendationCategory, string> = {
	Security:
		"Create a security fix issue, patch within SLA, and verify with a focused regression test.",
	Architecture:
		"Refactor boundaries by module and add architecture rule checks in CI.",
	Complexity:
		"Split large functions and reduce branching to lower review and defect risk.",
	"Dead Code":
		"Remove unused code paths and confirm no runtime references remain.",
	Duplication:
		"Extract shared logic into reusable modules and enforce DRY in PR review.",
	Dependency:
		"Upgrade or pin dependencies and add automated dependency monitoring.",
	Coupling:
		"Introduce interfaces/events to reduce direct coupling across modules.",
	Maintainability:
		"Prioritize readability refactors and standardize naming and structure.",
	Testing:
		"Add missing tests around risky paths and set a minimum coverage gate.",
	Performance:
		"Profile hotspots, set budgets, and optimize high-impact paths first.",
	General:
		"Create an issue with owner and due date, then track remediation in weekly review.",
};

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null;
}

function getFirstString(...values: unknown[]): string | null {
	for (const value of values) {
		if (typeof value === "string" && value.trim().length > 0) {
			return value.trim();
		}
	}
	return null;
}

function getFirstNumber(...values: unknown[]): number | null {
	for (const value of values) {
		if (typeof value === "number" && Number.isFinite(value)) {
			return value;
		}
	}
	return null;
}

function toRecommendationCategory(
	value: unknown,
): RecommendationCategory | null {
	if (typeof value !== "string") {
		return null;
	}

	switch (value.trim().toLowerCase()) {
		case "security":
			return "Security";
		case "architecture":
			return "Architecture";
		case "complexity":
			return "Complexity";
		case "dead code":
		case "dead_code":
		case "dead-code":
		case "deadcode":
			return "Dead Code";
		case "duplication":
			return "Duplication";
		case "dependency":
			return "Dependency";
		case "coupling":
			return "Coupling";
		case "maintainability":
			return "Maintainability";
		case "testing":
			return "Testing";
		case "performance":
			return "Performance";
		case "general":
			return "General";
		default:
			return null;
	}
}

function toRecommendationSeverity(
	value: unknown,
): RecommendationSeverity | null {
	if (typeof value !== "string") {
		return null;
	}

	switch (value.trim().toLowerCase()) {
		case "critical":
			return "critical";
		case "high":
			return "high";
		case "medium":
			return "medium";
		case "low":
			return "low";
		default:
			return null;
	}
}

function detectCategory(text: string): RecommendationCategory {
	for (const rule of CATEGORY_RULES) {
		if (rule.patterns.some((pattern) => pattern.test(text))) {
			return rule.category;
		}
	}
	return "General";
}

function getSeverityRank(severity: RecommendationSeverity): number {
	switch (severity) {
		case "critical":
			return 4;
		case "high":
			return 3;
		case "medium":
			return 2;
		case "low":
			return 1;
	}
}

function detectSeverity(
	text: string,
	category: RecommendationCategory,
): RecommendationSeverity {
	let detected: RecommendationSeverity = "medium";

	for (const rule of SEVERITY_RULES) {
		if (rule.patterns.some((pattern) => pattern.test(text))) {
			detected = rule.severity;
			break;
		}
	}

	if (
		category === "Security" &&
		getSeverityRank(detected) < getSeverityRank("high")
	) {
		return "high";
	}

	return detected;
}

function toDateString(date: Date): string {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
}

function formatDueDate(daysToAdd: number, now: Date): string {
	const dueDate = new Date(now);
	dueDate.setDate(dueDate.getDate() + daysToAdd);
	return toDateString(dueDate);
}

function getDueDateBySeverity(
	severity: RecommendationSeverity,
	now: Date,
): string {
	switch (severity) {
		case "critical":
			return formatDueDate(3, now);
		case "high":
			return formatDueDate(7, now);
		case "medium":
			return formatDueDate(14, now);
		case "low":
			return formatDueDate(30, now);
	}
}

function toDueDate(
	value: unknown,
	fallbackSeverity: RecommendationSeverity,
	now: Date,
): string {
	if (typeof value === "string") {
		const normalized = value.trim();
		const datePrefix = normalized.match(/^(\d{4}-\d{2}-\d{2})(?:$|T)/);
		if (datePrefix) {
			return datePrefix[1];
		}

		const parsedTime = Date.parse(normalized);
		if (!Number.isNaN(parsedTime)) {
			return toDateString(new Date(parsedTime));
		}
	}
	return getDueDateBySeverity(fallbackSeverity, now);
}

function toTitle(text: string): string {
	const normalized = text.replace(/\s+/g, " ").trim();
	if (!normalized) {
		return "Action required";
	}
	return normalized.length > 88 ? `${normalized.slice(0, 85)}...` : normalized;
}

function formatIssueEvidence(issue: BotIssue): string | null {
	const file = getFirstString(issue.file, issue.File);
	const line = getFirstNumber(issue.line, issue.Line);
	const endLine = getFirstNumber(issue.endLine, issue.EndLine);
	const details = issue.details ?? issue.Details;

	const location = file
		? `${file}${line !== null ? `:${line}` : ""}${endLine !== null && endLine !== line ? `-${endLine}` : ""}`
		: null;
	const detailsText = isRecord(details) ? JSON.stringify(details) : null;

	return getFirstString(
		issue.evidence,
		location ? `File ${location}` : null,
		detailsText ? `Details ${detailsText}` : null,
	);
}

function fromIssue(
	issue: BotIssue,
	index: number,
	now: Date,
): EnterpriseRecommendation | null {
	const titleSource = getFirstString(
		issue.title,
		issue.Description,
		issue.description,
		issue.recommendation,
		issue.suggestedAction,
	);
	const evidence = formatIssueEvidence(issue);
	const categoryHint = getFirstString(issue.category, issue.Type, issue.type);
	const severityHint = getFirstString(issue.severity, issue.Severity);
	const contextText = [titleSource, evidence].filter(Boolean).join(" / ");

	if (!contextText) {
		return null;
	}

	const category =
		toRecommendationCategory(categoryHint) ?? detectCategory(contextText);
	const severity =
		toRecommendationSeverity(severityHint) ??
		detectSeverity(contextText, category);
	const suggestedAction = getFirstString(
		issue.suggestedAction,
		issue.recommendation,
		ACTION_BY_CATEGORY[category],
	);
	const status = getFirstString(issue.status, "New") ?? "New";
	const owner = getFirstString(issue.owner, "Unassigned") ?? "Unassigned";
	const ruleId = getFirstString(issue.ruleId);
	const confidence =
		typeof issue.confidence === "number" && Number.isFinite(issue.confidence)
			? Math.max(0, Math.min(1, issue.confidence))
			: undefined;

	return {
		id: ruleId
			? `REC-${ruleId}`
			: `REC-ISS-${String(index + 1).padStart(3, "0")}`,
		raw: evidence ?? contextText,
		title: toTitle(titleSource ?? contextText),
		severity,
		category,
		suggestedAction: suggestedAction ?? ACTION_BY_CATEGORY[category],
		status,
		owner,
		dueDate: toDueDate(issue.dueDate, severity, now),
		ruleId: ruleId ?? undefined,
		confidence,
	};
}

function fromRecommendation(
	recommendation: BotRecommendation,
	index: number,
	now: Date,
): EnterpriseRecommendation | null {
	if (typeof recommendation === "string") {
		const normalized = recommendation.trim();
		if (!normalized) {
			return null;
		}

		const category = detectCategory(normalized);
		const severity = detectSeverity(normalized, category);
		return {
			id: `REC-${String(index + 1).padStart(3, "0")}`,
			raw: normalized,
			title: toTitle(normalized),
			severity,
			category,
			suggestedAction: ACTION_BY_CATEGORY[category],
			status: "New",
			owner: "Unassigned",
			dueDate: getDueDateBySeverity(severity, now),
		};
	}

	if (!isRecord(recommendation)) {
		return null;
	}

	const structured = recommendation as BotStructuredRecommendation;
	const text = getFirstString(
		structured.title,
		structured.recommendation,
		structured.evidence,
	);

	if (!text) {
		return null;
	}

	const category =
		toRecommendationCategory(structured.category) ?? detectCategory(text);
	const severity =
		toRecommendationSeverity(structured.severity) ??
		detectSeverity(text, category);
	const ruleId = getFirstString(structured.ruleId);
	const confidence =
		typeof structured.confidence === "number" &&
		Number.isFinite(structured.confidence)
			? Math.max(0, Math.min(1, structured.confidence))
			: undefined;

	return {
		id: ruleId ? `REC-${ruleId}` : `REC-${String(index + 1).padStart(3, "0")}`,
		raw: structured.evidence?.trim() || text,
		title: toTitle(structured.title ?? text),
		severity,
		category,
		suggestedAction:
			getFirstString(structured.suggestedAction, structured.recommendation) ??
			ACTION_BY_CATEGORY[category],
		status: getFirstString(structured.status, "New") ?? "New",
		owner: getFirstString(structured.owner, "Unassigned") ?? "Unassigned",
		dueDate: toDueDate(structured.dueDate, severity, now),
		ruleId: ruleId ?? undefined,
		confidence,
	};
}

export function toEnterpriseRecommendations(
	source: EnterpriseRecommendationSource | BotRecommendation[],
	options: RecommendationTransformOptions = {},
): EnterpriseRecommendation[] {
	const normalized = Array.isArray(source)
		? { recommendations: source }
		: source;
	const now = options.now ?? new Date();

	const issues = Array.isArray(normalized.issues) ? normalized.issues : [];
	const fromIssues = issues
		.map((issue, index) => fromIssue(issue, index, now))
		.filter(
			(recommendation): recommendation is EnterpriseRecommendation =>
				recommendation !== null,
		);

	const recommendations = Array.isArray(normalized.recommendations)
		? normalized.recommendations
		: [];
	const fromRecommendations = recommendations
		.map((recommendation, index) =>
			fromRecommendation(recommendation, index, now),
		)
		.filter(
			(recommendation): recommendation is EnterpriseRecommendation =>
				recommendation !== null,
		);

	// Prioritize issue-derived items, then append recommendation-derived items.
	const merged = [...fromIssues, ...fromRecommendations];
	const seen = new Set<string>();

	return merged.filter((recommendation) => {
		const key = recommendation.ruleId
			? `rule:${recommendation.ruleId}`
			: `text:${recommendation.title.toLowerCase()}|${recommendation.raw.toLowerCase()}`;

		if (seen.has(key)) {
			return false;
		}
		seen.add(key);
		return true;
	});
}
