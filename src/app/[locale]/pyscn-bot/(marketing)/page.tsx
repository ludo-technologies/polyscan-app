import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import AuditPanel from "@/components/pyscn-bot/AuditPanel";
import ConfigYaml from "@/components/pyscn-bot/ConfigYaml";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import { Link } from "@/i18n/navigation";
import { localizedAlternates } from "@/lib/localized-metadata";
import { isPyscnBotLoggedIn } from "@/lib/pyscn-bot-session";

const rich = { strong: (chunks: React.ReactNode) => <strong>{chunks}</strong> };

const metrics = [
	{ key: "complexity", id: "CC" },
	{ key: "deadcode", id: "DEAD" },
	{ key: "clones", id: "DUP" },
	{ key: "coupling", id: "CBO" },
] as const;

const chipClass =
	"mb-3 inline-flex border border-[var(--border-subtle)] bg-[var(--bg-subtle)] px-2 py-0.5 font-mono text-[11px] font-bold tracking-wide text-[var(--text-label)]";

const secondaryButtonClass =
	"inline-flex justify-center rounded-md border border-[var(--brand-blue)] bg-white px-5 py-2.5 text-sm font-semibold text-[var(--brand-blue)] transition-colors hover:bg-[var(--brand-blue-light)]/40";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale });
	const { canonical, languages } = localizedAlternates(locale, "/pyscn-bot");
	return {
		title: "Polyscan - Weekly Codebase Health Monitoring for GitHub",
		description: t.markup("hero.description", { strong: (chunks) => chunks }),
		alternates: { canonical, languages },
	};
}

export default async function PyscnBotLandingPage() {
	const t = await getTranslations();
	const isLoggedIn = await isPyscnBotLoggedIn();

	/* Unauthenticated CTAs must stay plain <a>: a locale prefix would break
	   the /pyscn-bot/api rewrite. */
	function Cta({
		label,
		plan,
		className,
	}: {
		label: string;
		plan: "free" | "pro";
		className: string;
	}) {
		return isLoggedIn ? (
			<Link href="/pyscn-bot/account" className={className}>
				{t("nav.mypage")}
			</Link>
		) : (
			<a href={`/pyscn-bot/api/auth?plan=${plan}`} className={className}>
				{label} <span aria-hidden="true">→</span>
			</a>
		);
	}

	return (
		<main className="landing-page relative flex min-h-screen flex-col items-center">
			<Reveal>
				<section
					id="top"
					className="home-hero relative z-10 w-full max-w-6xl px-4 pt-14 pb-16 sm:px-6 sm:pt-24 sm:pb-20"
				>
					<div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
						<div className="hero-copy min-w-0">
							<p className="hero-eyebrow">
								<span /> {t("hero.eyebrow")}
							</p>
							<h1 className="type-display mb-6 text-[3.5rem] leading-[0.98] font-bold text-[var(--text-primary)] sm:text-7xl lg:text-[5.25rem]">
								{t("hero.title")}
								<br />
								<span className="text-[var(--brand-blue)]">
									{t("hero.titleHighlight")}
								</span>
							</h1>
							<p className="mb-4 max-w-2xl leading-relaxed text-[var(--text-secondary)]">
								{t.rich("hero.description", rich)}
							</p>
							<p className="mb-8 max-w-2xl leading-relaxed font-semibold text-[var(--text-primary)]">
								{t("hero.freeNote")}
							</p>
							<Cta
								label={t("trial.hero")}
								plan="free"
								className="home-primary"
							/>
						</div>

						<div className="hero-instrument min-w-0">
							<div className="instrument-orbit" aria-hidden="true" />
							<AuditPanel />
						</div>
					</div>
				</section>

				<div className="relative z-10 w-full max-w-6xl px-4 pb-20 sm:px-6">
					<section
						data-reveal
						aria-labelledby="diff-title"
						className="mt-16 scroll-mt-24"
					>
						<SectionHead
							id="diff-title"
							eyebrow={t("diff.eyebrow")}
							title={t("diff.title")}
							lede={t("diff.subtitle")}
						/>
						<div className="grid gap-4 md:grid-cols-2">
							<div className="analyzer-card bg-[var(--bg-subtle)] p-6 sm:p-8">
								<h3 className="mb-5 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
									{t("diff.traditional._")}
								</h3>
								<ul className="space-y-3 text-[var(--text-secondary)]">
									{(["1", "2", "3", "4", "5"] as const).map((n) => (
										<li key={n} className="flex items-start gap-3 text-sm">
											<span
												aria-hidden="true"
												className="font-mono leading-5 text-[var(--text-dimmed)]"
											>
												−
											</span>
											<span className="leading-5">
												{t(`diff.traditional.${n}`)}
											</span>
										</li>
									))}
								</ul>
							</div>
							<div className="analyzer-card card-accent bg-[var(--bg-card)] p-6 sm:p-8">
								<h3 className="mb-5 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--brand-blue)]">
									{t("diff.pyscnBot._")}
								</h3>
								<ul className="space-y-3 text-[var(--text-primary)]">
									{(["1", "2", "3", "4", "5"] as const).map((n) => (
										<li key={n} className="flex items-start gap-3 text-sm">
											<span
												aria-hidden="true"
												className="font-mono font-bold leading-5 text-[var(--brand-blue)]"
											>
												+
											</span>
											<span className="leading-5">
												{t.rich(`diff.pyscnBot.${n}`, rich)}
											</span>
										</li>
									))}
								</ul>
							</div>
						</div>
					</section>

					<section
						data-reveal
						id="features"
						aria-labelledby="features-title"
						className="mt-20 scroll-mt-24"
					>
						<SectionHead
							id="features-title"
							eyebrow={t("features.eyebrow")}
							title={t("features.title")}
						/>
						<div className="mt-10 space-y-6">
							<article className="analyzer-card grid gap-6 overflow-hidden bg-[var(--bg-card)] p-4 md:grid-cols-2 md:items-center">
								<video
									src="/pyscn-bot/pyscn-audit-demo.mp4"
									poster="/pyscn-bot/pyscn-audit-demo-poster.jpg"
									autoPlay
									loop
									muted
									playsInline
									preload="none"
									className="w-full rounded-lg border border-[var(--border-subtle)] max-md:order-2"
								/>
								<div className="p-2 sm:p-4 max-md:order-1">
									<p className={chipClass}>AUDIT</p>
									<h3 className="mb-3 text-2xl font-bold text-[var(--text-primary)]">
										{t("features.audit.title")}
									</h3>
									<p className="leading-relaxed text-[var(--text-secondary)]">
										{t("features.audit.description")}
									</p>
								</div>
							</article>

							<article className="analyzer-card grid gap-6 overflow-hidden bg-[var(--bg-card)] p-4 md:grid-cols-2 md:items-center">
								<div className="p-2 sm:p-4">
									<p className={chipClass}>PR</p>
									<h3 className="mb-3 text-2xl font-bold text-[var(--text-primary)]">
										{t("features.pr.title")}
									</h3>
									<p className="leading-relaxed text-[var(--text-secondary)]">
										{t("features.pr.description")}
									</p>
								</div>
								{/* biome-ignore lint/performance/noImgElement: marketing asset ported as-is, not worth next/image tuning here */}
								<img
									src="/pyscn-bot/pyscn-pr-demo.png"
									alt="PR Review Demo"
									className="w-full rounded-lg border border-[var(--border-subtle)]"
								/>
							</article>

							<article className="analyzer-card grid gap-6 overflow-hidden bg-[var(--bg-card)] p-4 md:grid-cols-2 md:items-center">
								<div className="p-2 sm:p-4">
									<p className={chipClass}>YAML</p>
									<h3 className="mb-3 text-2xl font-bold text-[var(--text-primary)]">
										{t("features.config.title")}
									</h3>
									<p className="mb-5 leading-relaxed text-[var(--text-secondary)]">
										{t("features.config.description")}
									</p>
									<ul className="space-y-2 text-sm text-[var(--text-light)]">
										{(
											["option1", "option2", "option3", "option4"] as const
										).map((o) => (
											<li key={o} className="flex items-start gap-3">
												<span
													aria-hidden="true"
													className="font-mono leading-5 text-[var(--reading-ok)]"
												>
													●
												</span>
												<span className="leading-5">
													{t(`features.config.${o}`)}
												</span>
											</li>
										))}
									</ul>
								</div>
								<ConfigYaml className="h-full rounded-lg" />
							</article>
						</div>
					</section>

					<section
						data-reveal
						id="how-it-works"
						aria-labelledby="how-title"
						className="mt-20 scroll-mt-24"
					>
						<SectionHead
							id="how-title"
							eyebrow={t("how.eyebrow")}
							title={t("how.title")}
							lede={t("how.subtitle")}
						/>
						<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
							{metrics.map((m, index) => (
								<article
									key={m.key}
									className="signal-card bg-[var(--bg-card)] p-7"
								>
									<div className="signal-visual" aria-hidden="true">
										<span>{String(index + 1).padStart(2, "0")}</span>
										<div className="signal-bars">
											{[0, 1, 2, 3, 4, 5, 6, 7].map((bar) => (
												<i
													key={bar}
													style={{
														height: `${20 + ((bar * 19 + index * 13) % 70)}%`,
													}}
												/>
											))}
										</div>
									</div>
									<p className={chipClass}>{m.id}</p>
									<h3 className="mb-1 text-lg font-semibold text-[var(--text-primary)]">
										{t(`how.${m.key}.title`)}
									</h3>
									<p className="text-sm leading-relaxed text-[var(--text-light)]">
										{t(`how.${m.key}.desc`)}
									</p>
								</article>
							))}
						</div>
						<p className="mt-8">
							<Link href="/pyscn-bot/how-it-works" className="home-text-link">
								{t("tech.title")} <span aria-hidden="true">→</span>
							</Link>
						</p>
					</section>

					<section
						data-reveal
						id="pricing"
						aria-labelledby="pricing-title"
						className="mt-20 scroll-mt-24"
					>
						<SectionHead
							id="pricing-title"
							eyebrow={t("pricing.eyebrow")}
							title={t("pricing.title")}
							lede={t("pricing.subtitle")}
						/>
						<div className="grid max-w-3xl gap-4 md:grid-cols-2">
							<div className="analyzer-card flex flex-col bg-[var(--bg-card)] p-6 sm:p-8">
								<h3 className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
									{t("pricing.free._")}
								</h3>
								<div className="mb-6 flex items-baseline gap-1">
									<span className="font-mono text-4xl font-bold text-[var(--text-primary)]">
										$0
									</span>
									<span className="font-mono text-sm text-[var(--text-muted)]">
										/month
									</span>
								</div>
								<ul className="mb-8 flex-grow space-y-3">
									{(["feature1", "feature2", "feature3"] as const).map((f) => (
										<li
											key={f}
											className="flex items-start gap-3 text-sm text-[var(--text-light)]"
										>
											<span
												aria-hidden="true"
												className="font-mono leading-5 text-[var(--reading-ok)]"
											>
												●
											</span>
											<span className="leading-5">
												{t(`pricing.free.${f}`)}
											</span>
										</li>
									))}
								</ul>
								<Cta
									label={t("pricing.free.cta")}
									plan="free"
									className={secondaryButtonClass}
								/>
							</div>

							<div className="analyzer-card card-accent flex flex-col bg-[var(--bg-card)] p-6 sm:p-8">
								<div className="mb-2 flex items-baseline justify-between gap-3">
									<h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--brand-blue)]">
										{t("pricing.pro._")}
									</h3>
									<span className="border border-[var(--border-subtle)] bg-[var(--bg-subtle)] px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-[var(--text-label)]">
										{t("trial.badge")}
									</span>
								</div>
								<div className="mb-6 flex items-baseline gap-1">
									<span className="font-mono text-4xl font-bold text-[var(--text-primary)]">
										{t("pricing.pro.price")}
									</span>
									<span className="font-mono text-sm text-[var(--text-muted)]">
										{t("pricing.pro.unit")}
									</span>
								</div>
								<ul className="mb-8 flex-grow space-y-3">
									{(
										["feature1", "feature2", "feature3", "feature4"] as const
									).map((f) => (
										<li
											key={f}
											className="flex items-start gap-3 text-sm text-[var(--text-light)]"
										>
											<span
												aria-hidden="true"
												className="font-mono font-bold leading-5 text-[var(--brand-blue)]"
											>
												+
											</span>
											<span className="leading-5">{t(`pricing.pro.${f}`)}</span>
										</li>
									))}
								</ul>
								<Cta
									label={t("pricing.pro.cta.button")}
									plan="pro"
									className="home-primary justify-center"
								/>
								{!isLoggedIn && (
									<p className="mt-2 text-center font-mono text-xs text-[var(--text-muted)]">
										{t("pricing.pro.cta._")}
									</p>
								)}
							</div>
						</div>
					</section>

					<section
						data-reveal
						className="closing-panel mt-24 border border-[var(--border-light)] bg-[var(--bg-card)] p-8 sm:p-12"
					>
						<div className="border-b border-[var(--border-subtle)] pb-4">
							<p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--text-muted)]">
								{t("cta.eyebrow")}
							</p>
						</div>
						<div className="pt-6">
							<h2 className="type-display mb-3 text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">
								{t("cta.title")}
							</h2>
							<p className="mb-6 max-w-xl text-[var(--text-secondary)]">
								{t("cta.description")}
							</p>
							<Cta
								label={t("cta.button")}
								plan="free"
								className="home-primary"
							/>
						</div>
					</section>
				</div>
			</Reveal>
		</main>
	);
}
