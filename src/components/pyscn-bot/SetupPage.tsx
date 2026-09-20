import { useTranslations } from "next-intl";
import type { ReactNode } from "react";
import { BrandTile, brandLinkClass } from "@/components/HeaderShell";
import BotWordmark from "@/components/pyscn-bot/BotWordmark";
import LanguageSwitcher from "@/components/pyscn-bot/LanguageSwitcher";
import { Link } from "@/i18n/navigation";

const SUPPORT_EMAIL = "pyscn@ludo-tech.org";

/* Shell shared by the pages a visitor lands on mid-setup (after checkout,
   after installing the App): brand bar, status header, support footer. */
export default function SetupPage({
	eyebrow,
	title,
	lede,
	children,
}: {
	eyebrow: string;
	title: string;
	lede?: string;
	children: ReactNode;
}) {
	const t = useTranslations();

	return (
		<div className="min-h-screen">
			<nav className="border-b border-[var(--border-light)] bg-[var(--bg-body)]/90 backdrop-blur">
				<div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
					<Link href="/pyscn-bot" className={brandLinkClass}>
						<BrandTile />
						<BotWordmark className="text-xl tracking-tight" />
					</Link>
					<LanguageSwitcher />
				</div>
			</nav>

			<main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
				<header className="mb-12">
					<p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--reading-ok)]">
						● {eyebrow}
					</p>
					<h1 className="type-display mt-3 mb-3 text-balance text-4xl font-bold text-[var(--text-primary)] [word-break:auto-phrase] sm:text-5xl">
						{title}
					</h1>
					{lede && <p className="text-[var(--text-secondary)]">{lede}</p>}
				</header>

				{children}

				<footer className="mt-12 flex flex-col gap-3 border-t border-[var(--border-subtle)] pt-6 sm:flex-row sm:items-start sm:justify-between">
					<Link
						href="/pyscn-bot"
						className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--text-secondary)] transition-colors hover:text-[var(--brand-blue)]"
					>
						← {t("setup.backToHome")}
					</Link>
					<p className="text-xs leading-relaxed text-[var(--text-muted)] sm:text-right">
						{t("setup.support")}{" "}
						<a
							href={`mailto:${SUPPORT_EMAIL}`}
							className="text-[var(--brand-blue)] hover:text-[var(--brand-blue-hover)]"
						>
							{SUPPORT_EMAIL}
						</a>
						<br />
						{t("setup.feedback")}
					</p>
				</footer>
			</main>
		</div>
	);
}

/* Numbered list of setup steps */
export function SetupSteps({ children }: { children: ReactNode }) {
	return (
		<ol className="border border-[var(--border-light)] bg-[var(--bg-card)] [&>li:not(:last-child)]:border-b [&>li:not(:last-child)]:border-[var(--border-subtle)]">
			{children}
		</ol>
	);
}

export function SetupStep({
	number,
	title,
	description,
	children,
}: {
	number: string;
	title: string;
	description: string;
	children?: ReactNode;
}) {
	return (
		<li className="grid gap-x-5 gap-y-3 p-6 sm:grid-cols-[2.5rem_1fr]">
			<span className="font-mono text-[11px] text-[var(--text-muted)]">
				{number}
			</span>
			<div className="min-w-0">
				<h2 className="mb-2 text-lg font-semibold text-[var(--text-primary)]">
					{title}
				</h2>
				<p
					className={`text-sm leading-relaxed text-[var(--text-light)] ${children ? "mb-4" : ""}`}
				>
					{description}
				</p>
				{children}
			</div>
		</li>
	);
}
