import type {
	DashboardSummary,
	Grade,
	RecommendationSeverity,
	RepositorySummary,
} from "./types";

export type { Grade };

export const GRADES: Grade[] = ["A", "B", "C", "D", "F"];

export function gradeFromScore(score: number): Grade {
	if (score >= 80) return "A";
	if (score >= 60) return "B";
	if (score >= 40) return "C";
	if (score >= 20) return "D";
	return "F";
}

/** Reading tones from globals.css. */
export type Tone = "ok" | "blue" | "warn" | "over" | "neutral" | "muted";

export const TONE_COLOR: Record<Tone, string> = {
	ok: "var(--reading-ok)",
	blue: "var(--brand-blue)",
	warn: "var(--reading-warn)",
	over: "var(--reading-over)",
	neutral: "var(--text-primary)",
	muted: "var(--text-muted)",
};

export const GRADE_TONE: Record<Grade, Tone> = {
	A: "ok",
	B: "blue",
	C: "warn",
	D: "over",
	F: "over",
};

export const SEVERITY_TONE: Record<RecommendationSeverity, Tone> = {
	critical: "over",
	high: "warn",
	medium: "neutral",
	low: "muted",
};

export function scoreTone(score: number): Tone {
	return GRADE_TONE[gradeFromScore(score)];
}

export function summarizeRepositories(
	repositories: RepositorySummary[],
): DashboardSummary {
	const gradeDistribution: Record<Grade, number> = {
		A: 0,
		B: 0,
		C: 0,
		D: 0,
		F: 0,
	};
	let total = 0;
	for (const repo of repositories) {
		gradeDistribution[repo.grade]++;
		total += repo.healthScore;
	}
	const count = repositories.length;
	return {
		totalRepositories: count,
		averageHealthScore: count > 0 ? Math.round((total / count) * 10) / 10 : 0,
		gradeDistribution,
	};
}
