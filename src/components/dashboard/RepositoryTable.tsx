import { useFormatter, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { RepositorySummary } from "@/lib/dashboard/types";
import { LINKS } from "@/lib/links";
import GradeBadge from "./GradeBadge";
import { Panel } from "./primitives";

const headClass =
	"px-4 py-3 font-mono text-[11px] font-normal uppercase tracking-[0.15em] text-[var(--text-muted)]";
const numberClass =
	"px-4 py-3 text-center font-mono text-sm tabular-nums text-[var(--text-primary)]";

export default function RepositoryTable({
	repositories,
}: {
	repositories: RepositorySummary[];
}) {
	const t = useTranslations("dashboard");
	const format = useFormatter();

	if (repositories.length === 0) {
		return (
			<Panel className="p-8 text-center">
				<p className="text-[var(--text-secondary)]">{t("noReports")}</p>
				<p className="mt-2 text-sm text-[var(--text-muted)]">
					{t("installApp")}{" "}
					<a
						href={LINKS.appInstall}
						className="text-[var(--brand-blue)] hover:text-[var(--brand-blue-hover)]"
					>
						GitHub →
					</a>
				</p>
			</Panel>
		);
	}

	return (
		<Panel className="overflow-x-auto">
			<table className="w-full">
				<thead>
					<tr className="border-b border-[var(--border-light)] bg-[var(--bg-subtle)]">
						<th scope="col" className={`${headClass} text-left`}>
							{t("repository")}
						</th>
						<th scope="col" className={`${headClass} text-center`}>
							{t("grade")}
						</th>
						<th scope="col" className={`${headClass} text-center`}>
							{t("health")}
						</th>
						<th
							scope="col"
							className={`${headClass} hidden text-center md:table-cell`}
						>
							{t("complexity")}
						</th>
						<th
							scope="col"
							className={`${headClass} hidden text-center md:table-cell`}
						>
							{t("deadCode")}
						</th>
						<th
							scope="col"
							className={`${headClass} hidden text-center lg:table-cell`}
						>
							{t("duplication")}
						</th>
						<th
							scope="col"
							className={`${headClass} hidden text-center lg:table-cell`}
						>
							{t("security")}
						</th>
						<th
							scope="col"
							className={`${headClass} hidden text-center lg:table-cell`}
						>
							{t("architecture")}
						</th>
						<th scope="col" className={`${headClass} text-right`}>
							{t("lastReport")}
						</th>
					</tr>
				</thead>
				<tbody>
					{repositories.map((repo) => (
						<tr
							key={repo.repoName}
							className="border-b border-[var(--border-subtle)] transition-colors last:border-b-0 hover:bg-[var(--bg-subtle)]"
						>
							<td className="px-4 py-3">
								<Link
									href={`/pyscn-bot/account/repo/${encodeURIComponent(repo.repoName)}`}
									className="font-medium text-[var(--brand-blue)] hover:text-[var(--brand-blue-hover)]"
								>
									{repo.repoName}
								</Link>
							</td>
							<td className="px-4 py-3 text-center">
								<GradeBadge grade={repo.grade} />
							</td>
							<td className={numberClass}>{repo.healthScore}</td>
							<td className={`${numberClass} hidden md:table-cell`}>
								{repo.complexityScore}
							</td>
							<td className={`${numberClass} hidden md:table-cell`}>
								{repo.deadCodeScore}
							</td>
							<td className={`${numberClass} hidden lg:table-cell`}>
								{repo.duplicationScore}
							</td>
							<td className={`${numberClass} hidden lg:table-cell`}>
								<div className="leading-tight">
									<div>{repo.securityScore}</div>
									<div
										className="font-sans text-[11px]"
										style={{
											color:
												repo.securityIssues > 0
													? "var(--reading-over)"
													: "var(--text-muted)",
										}}
									>
										{t("issueCount", { count: repo.securityIssues })}
									</div>
								</div>
							</td>
							<td className={`${numberClass} hidden lg:table-cell`}>
								{repo.architectureScore}
							</td>
							<td className="px-4 py-3 text-right font-mono text-xs text-[var(--text-muted)]">
								{format.dateTime(new Date(repo.periodEnd), {
									dateStyle: "medium",
								})}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</Panel>
	);
}
