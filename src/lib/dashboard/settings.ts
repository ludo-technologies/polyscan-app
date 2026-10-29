import type { OrgDashboardSettings, RecommendationSeverity } from "./types";

/**
 * Per-organization SLA targets for the executive summary. Set
 * DASHBOARD_SETTINGS_JSON for every account, or
 * DASHBOARD_SETTINGS_BY_ACCOUNT_JSON ({"<github id>": {...}}) per account;
 * accounts without an entry get the defaults.
 */

const DEFAULT_ORG_DASHBOARD_SETTINGS: OrgDashboardSettings = {
	kpi: {
		slaDays: {
			critical: 3,
			high: 7,
			medium: 14,
			low: 30,
		},
		slaComplianceTarget: 0.8,
	},
	executive: {
		topRisksLimit: 5,
		priorityActionsLimit: 3,
	},
};

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null;
}

function requireRecord(value: unknown, path: string): Record<string, unknown> {
	if (!isRecord(value)) {
		throw new Error(`Invalid org_dashboard_settings: "${path}" must be object`);
	}
	return value;
}

function requireNumber(value: unknown, path: string): number {
	if (typeof value !== "number" || !Number.isFinite(value)) {
		throw new Error(`Invalid org_dashboard_settings: "${path}" must be number`);
	}
	return value;
}

function requireIntegerInRange(
	value: unknown,
	path: string,
	min: number,
	max: number,
): number {
	const numeric = requireNumber(value, path);
	if (!Number.isInteger(numeric) || numeric < min || numeric > max) {
		throw new Error(
			`Invalid org_dashboard_settings: "${path}" must be integer ${min}-${max}`,
		);
	}
	return numeric;
}

function requireRatio(value: unknown, path: string): number {
	const numeric = requireNumber(value, path);
	if (numeric < 0 || numeric > 1) {
		throw new Error(
			`Invalid org_dashboard_settings: "${path}" must be between 0 and 1`,
		);
	}
	return numeric;
}

function parseSlaDays(value: unknown): Record<RecommendationSeverity, number> {
	const raw = requireRecord(value, "kpi.slaDays");
	return {
		critical: requireIntegerInRange(
			raw.critical,
			"kpi.slaDays.critical",
			1,
			365,
		),
		high: requireIntegerInRange(raw.high, "kpi.slaDays.high", 1, 365),
		medium: requireIntegerInRange(raw.medium, "kpi.slaDays.medium", 1, 365),
		low: requireIntegerInRange(raw.low, "kpi.slaDays.low", 1, 365),
	};
}

export function parseSettings(value: unknown): OrgDashboardSettings {
	const root = requireRecord(value, "settings_json");
	const kpi = requireRecord(root.kpi, "kpi");
	const executive = requireRecord(root.executive, "executive");

	return {
		kpi: {
			slaDays: parseSlaDays(kpi.slaDays),
			slaComplianceTarget: requireRatio(
				kpi.slaComplianceTarget,
				"kpi.slaComplianceTarget",
			),
		},
		executive: {
			topRisksLimit: requireIntegerInRange(
				executive.topRisksLimit,
				"executive.topRisksLimit",
				1,
				20,
			),
			priorityActionsLimit: requireIntegerInRange(
				executive.priorityActionsLimit,
				"executive.priorityActionsLimit",
				1,
				20,
			),
		},
	};
}

function parseJsonEnvValue(value: string, envName: string): unknown {
	try {
		return JSON.parse(value);
	} catch {
		throw new Error(`Invalid JSON in ${envName}`);
	}
}

export function getOrgDashboardSettings(
	accountId: number,
): OrgDashboardSettings {
	const byAccount = process.env.DASHBOARD_SETTINGS_BY_ACCOUNT_JSON;
	if (byAccount) {
		const root = requireRecord(
			parseJsonEnvValue(byAccount, "DASHBOARD_SETTINGS_BY_ACCOUNT_JSON"),
			"DASHBOARD_SETTINGS_BY_ACCOUNT_JSON",
		);
		const key = String(accountId);
		if (key in root) {
			return parseSettings(root[key]);
		}
	}

	const forAll = process.env.DASHBOARD_SETTINGS_JSON;
	if (forAll) {
		return parseSettings(parseJsonEnvValue(forAll, "DASHBOARD_SETTINGS_JSON"));
	}

	return DEFAULT_ORG_DASHBOARD_SETTINGS;
}
