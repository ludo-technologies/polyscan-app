import { useTranslations } from "next-intl";
import { SEVERITY_TONE, TONE_COLOR } from "@/lib/dashboard/grades";
import type {
	EnterpriseRecommendation,
	RecommendationSeverity,
} from "@/lib/dashboard/types";
import { Chip, Panel, PanelTitle, Silkscreen } from "./primitives";

const SEVERITIES: RecommendationSeverity[] = [
	"critical",
	"high",
	"medium",
	"low",
];

const SEVERITY_RANK: Record<RecommendationSeverity, number> = {
	critical: 0,
	high: 1,
	medium: 2,
	low: 3,
};

export default function RecommendationList({
	recommendations,
}: {
	recommendations: EnterpriseRecommendation[];
}) {
	const t = useTranslations("dashboard");

	if (recommendations.length === 0) {
		return (
			<Panel className="p-6">
				<PanelTitle>{t("actionQueue")}</PanelTitle>
				<p className="mt-2 text-sm text-[var(--reading-ok)]">{t("noRisks")}</p>
			</Panel>
		);
	}

	const sorted = [...recommendations].sort((a, b) => {
		const bySeverity = SEVERITY_RANK[a.severity] - SEVERITY_RANK[b.severity];
		return bySeverity !== 0 ? bySeverity : a.dueDate.localeCompare(b.dueDate);
	});
	const counts = SEVERITIES.map((severity) => ({
		severity,
		count: recommendations.filter((r) => r.severity === severity).length,
	}));

	return (
		<Panel className="p-6">
			<div className="flex items-baseline justify-between gap-4">
				<PanelTitle>{t("actionQueue")}</PanelTitle>
				<span className="font-mono text-xs text-[var(--text-muted)]">
					{t("openItems", { count: recommendations.length })}
				</span>
			</div>

			<ul className="mt-5 grid grid-cols-2 gap-2 md:grid-cols-4">
				{counts.map(({ severity, count }) => (
					<li
						key={severity}
						className="border border-[var(--border-subtle)] bg-[var(--bg-subtle)] px-3 py-2"
					>
						<Silkscreen>{t(severity)}</Silkscreen>
						<p
							className="mt-1 font-mono text-lg font-semibold"
							style={{ color: TONE_COLOR[SEVERITY_TONE[severity]] }}
						>
							{count}
						</p>
					</li>
				))}
			</ul>

			<ul className="mt-6 space-y-3">
				{sorted.map((item) => (
					<li
						key={item.id}
						className="border border-[var(--border-subtle)] p-4"
						style={{
							borderLeftWidth: 3,
							borderLeftColor: TONE_COLOR[SEVERITY_TONE[item.severity]],
						}}
					>
						<div className="flex flex-wrap items-center gap-2">
							<Chip tone={SEVERITY_TONE[item.severity]}>
								{t(item.severity)}
							</Chip>
							<Chip>{item.category}</Chip>
							<span className="font-mono text-[11px] text-[var(--text-muted)]">
								{item.id}
							</span>
							{item.confidence !== undefined && (
								<span className="font-mono text-[11px] text-[var(--text-muted)]">
									conf {Math.round(item.confidence * 100)}%
								</span>
							)}
						</div>

						<p className="mt-3 text-sm font-semibold text-[var(--text-primary)]">
							{item.title}
						</p>
						<p className="mt-1 text-sm text-[var(--text-secondary)]">
							{item.suggestedAction}
						</p>

						<dl className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
							{(
								[
									["status", item.status],
									["owner", item.owner],
									["due", item.dueDate],
								] as const
							).map(([key, value]) => (
								<div key={key}>
									<dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
										{t(key)}
									</dt>
									<dd className="mt-0.5 font-mono text-xs text-[var(--text-primary)]">
										{value}
									</dd>
								</div>
							))}
						</dl>

						<p className="mt-3 break-words font-mono text-[11px] text-[var(--text-muted)]">
							{t("evidence")}: {item.raw}
						</p>
					</li>
				))}
			</ul>
		</Panel>
	);
}
