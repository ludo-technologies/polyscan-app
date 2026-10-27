import { useFormatter, useTranslations } from "next-intl";
import type { AccountInfo } from "@/lib/dashboard/types";
import {
	primaryButtonClass,
	Silkscreen,
	secondaryButtonClass,
	textLinkClass,
} from "./primitives";

/* Who is signed in, what they pay for, and the links that change it. The
   auth/billing links are plain anchors: they are rewritten to the Go
   backend and must not take a locale prefix. */
export default function AccountHeader({
	account,
	repositoriesTracked,
}: {
	account: AccountInfo;
	repositoriesTracked: number;
}) {
	const t = useTranslations("dashboard");
	const format = useFormatter();

	return (
		<header className="mb-10 flex flex-col gap-6 border border-[var(--border-light)] bg-[var(--bg-card)] p-5 sm:flex-row sm:items-start sm:justify-between">
			<div className="flex items-center gap-4">
				{/* biome-ignore lint/performance/noImgElement: external GitHub avatar URL, not a local/optimizable asset */}
				<img
					src={`https://github.com/${account.login}.png`}
					alt=""
					width={56}
					height={56}
					className="size-14 border border-[var(--border-subtle)]"
				/>
				<div>
					<h1 className="font-mono text-xl font-bold text-[var(--text-primary)]">
						{account.login}
					</h1>
					<p className="mt-1 text-sm text-[var(--text-secondary)]">
						{t("repositoriesTracked", { count: repositoriesTracked })}
					</p>
				</div>
			</div>

			<div className="sm:text-right">
				<Silkscreen>{t("plan")}</Silkscreen>
				<div className="mt-2 flex items-baseline gap-3 sm:justify-end">
					<span
						className="font-mono text-2xl font-bold"
						style={{
							color: account.isPaid
								? "var(--brand-blue)"
								: "var(--text-primary)",
						}}
					>
						{account.planName.toUpperCase()}
					</span>
					{account.updatedAt && (
						<span className="font-mono text-xs text-[var(--text-muted)]">
							{t("since")}{" "}
							{format.dateTime(new Date(account.updatedAt), {
								dateStyle: "medium",
							})}
						</span>
					)}
				</div>
				<div className="mt-4 flex flex-wrap items-center gap-3 sm:justify-end">
					{!account.isPaid && (
						<a
							href="/pyscn-bot/api/auth?plan=pro"
							className={primaryButtonClass}
						>
							{t("upgradeToPro")} →
						</a>
					)}
					{account.hasStripeSubscription && (
						<a
							href="/pyscn-bot/api/billing-portal"
							className={secondaryButtonClass}
							title={t("manageSubscriptionNote")}
						>
							{t("manageSubscription")} →
						</a>
					)}
					<a href="/pyscn-bot/api/logout" className={textLinkClass}>
						{t("logout")}
					</a>
				</div>
			</div>
		</header>
	);
}
