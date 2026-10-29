import type { ExecutiveActionItem } from "./types";

/**
 * Localized title and reason of a priority action. `t` is the translator of
 * the "dashboard" namespace; the severity keys (critical, high, ...) live
 * there too.
 */
export type DashboardTranslator = (
	key: string,
	values?: Record<string, string | number>,
) => string;

export function executiveActionCopy(
	item: ExecutiveActionItem,
	t: DashboardTranslator,
): { action: string; reason: string } {
	const params = item.params ?? {};
	switch (item.kind) {
		case "resolve_critical_overdue":
			return {
				action: t("execAction.resolveCritical.title"),
				reason: t("execAction.resolveCritical.reason", {
					count: params.count ?? 0,
				}),
			};
		case "burn_down_high_overdue":
			return {
				action: t("execAction.burnHigh.title"),
				reason: t("execAction.burnHigh.reason", { count: params.count ?? 0 }),
			};
		case "recover_sla_compliance":
			return {
				action: t("execAction.recoverSla.title"),
				reason: t("execAction.recoverSla.reason", {
					current: params.currentCompliancePercent ?? 0,
					target: params.targetCompliancePercent ?? 0,
				}),
			};
		case "mitigate_top_open_risk":
			return {
				action: t("execAction.mitigateTop.title", { repo: params.repo ?? "" }),
				reason: t("execAction.mitigateTop.reason", {
					severity: params.severity ? t(params.severity) : "",
				}),
			};
		case "maintain_weekly_cadence":
			return {
				action: t("execAction.maintainCadence.title"),
				reason: t("execAction.maintainCadence.reason"),
			};
	}
}
