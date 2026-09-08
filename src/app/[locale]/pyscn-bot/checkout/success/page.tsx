import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import BotWordmark from "@/components/pyscn-bot/BotWordmark";
import ConfigYaml from "@/components/pyscn-bot/ConfigYaml";
import Logo from "@/components/pyscn-bot/icons/Logo";
import LanguageSwitcher from "@/components/pyscn-bot/LanguageSwitcher";
import { Link } from "@/i18n/navigation";
import { localizedAlternates } from "@/lib/localized-metadata";

const GITHUB_APP_INSTALL_URL = "https://github.com/apps/polyscan-app";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale });
	const { canonical, languages } = localizedAlternates(
		locale,
		"/pyscn-bot/checkout/success",
	);
	return {
		title: `${t("checkout.success.title")} | Polyscan`,
		description: t("checkout.success.subtitle"),
		alternates: { canonical, languages },
		robots: { index: false, follow: false },
	};
}

export default async function CheckoutSuccessPage() {
	const t = await getTranslations();

	return (
		<div className="min-h-screen">
			<nav className="border-b border-[var(--border-light)] bg-[var(--bg-body)]/90 backdrop-blur">
				<div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
					<Link href="/pyscn-bot" className="flex items-center gap-1">
						<Logo className="h-10 w-10" />
						<BotWordmark className="text-xl" />
					</Link>
					<LanguageSwitcher />
				</div>
			</nav>

			<main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
				<header className="mb-12">
					<p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--reading-ok)]">
						● {t("checkout.success.title")}
					</p>
					<h1 className="type-display mt-3 mb-3 text-4xl font-bold text-[var(--text-primary)] sm:text-5xl">
						{t("checkout.success.subtitle")}
					</h1>
					<p className="text-[var(--text-secondary)]">
						{t("checkout.success.description")}
					</p>
				</header>

				<ol className="border border-[var(--border-light)] bg-[var(--bg-card)]">
					<li className="grid gap-x-5 gap-y-3 border-b border-[var(--border-subtle)] p-6 sm:grid-cols-[2.5rem_1fr]">
						<span className="font-mono text-[11px] text-[var(--text-muted)]">
							01
						</span>
						<div>
							<h2 className="mb-2 text-lg font-semibold text-[var(--text-primary)]">
								{t("checkout.success.step1.title")}
							</h2>
							<p className="mb-4 text-sm leading-relaxed text-[var(--text-light)]">
								{t("checkout.success.step1.description")}
							</p>
							<a
								href={GITHUB_APP_INSTALL_URL}
								className="inline-flex border border-[var(--brand-blue)] bg-[var(--brand-blue)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--brand-blue-hover)]"
							>
								{t("checkout.success.step1.button")} →
							</a>
						</div>
					</li>

					<li className="grid gap-x-5 gap-y-3 border-b border-[var(--border-subtle)] p-6 sm:grid-cols-[2.5rem_1fr]">
						<span className="font-mono text-[11px] text-[var(--text-muted)]">
							02
						</span>
						<div className="min-w-0">
							<h2 className="mb-2 text-lg font-semibold text-[var(--text-primary)]">
								{t("checkout.success.step2.title")}
							</h2>
							<p className="mb-4 text-sm leading-relaxed text-[var(--text-light)]">
								{t("checkout.success.step2.description")}
							</p>
							<ConfigYaml className="border border-[var(--border-subtle)]" />
						</div>
					</li>

					<li className="grid gap-x-5 gap-y-3 p-6 sm:grid-cols-[2.5rem_1fr]">
						<span className="font-mono text-[11px] text-[var(--text-muted)]">
							03
						</span>
						<div>
							<h2 className="mb-2 text-lg font-semibold text-[var(--text-primary)]">
								{t("checkout.success.step3.title")}
							</h2>
							<p className="text-sm leading-relaxed text-[var(--text-light)]">
								{t("checkout.success.step3.description")}
							</p>
						</div>
					</li>
				</ol>

				<footer className="mt-12 flex flex-col gap-3 border-t border-[var(--border-subtle)] pt-6 sm:flex-row sm:items-center sm:justify-between">
					<Link
						href="/pyscn-bot"
						className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--text-secondary)] transition-colors hover:text-[var(--brand-blue)]"
					>
						← {t("checkout.success.backToHome")}
					</Link>
					<p className="text-xs text-[var(--text-muted)]">
						{t("checkout.success.support")}{" "}
						<a
							href="mailto:contact@ludo-tech.org"
							className="text-[var(--brand-blue)] hover:text-[var(--brand-blue-hover)]"
						>
							contact@ludo-tech.org
						</a>
					</p>
				</footer>
			</main>
		</div>
	);
}
