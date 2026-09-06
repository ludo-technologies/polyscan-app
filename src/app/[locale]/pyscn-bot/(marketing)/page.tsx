import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import AuditPanel from "@/components/pyscn-bot/AuditPanel";
import { Link } from "@/i18n/navigation";
import { pyscnBotAlternates } from "@/lib/pyscn-bot-metadata";
import { isPyscnBotLoggedIn } from "@/lib/pyscn-bot-session";

const rich = { strong: (chunks: React.ReactNode) => <strong>{chunks}</strong> };

const metricIds = {
	complexity: "CC",
	deadcode: "DEAD",
	clones: "DUP",
	coupling: "CBO",
} as const;

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale });
	const { canonical, languages } = pyscnBotAlternates(locale, "/pyscn-bot");
	return {
		title: "Polyscan - Weekly Codebase Health Monitoring for GitHub",
		description: t.markup("hero.description", { strong: (chunks) => chunks }),
		alternates: { canonical, languages },
	};
}

function Silkscreen({ children }: { children: React.ReactNode }) {
	return (
		<p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--text-muted)]">
			{children}
		</p>
	);
}

function SectionRule() {
	return (
		<div className="border-t border-[var(--border-light)]">
			<div className="ruler-ticks" aria-hidden="true" />
		</div>
	);
}

export default async function PyscnBotLandingPage() {
	const t = await getTranslations();
	const isLoggedIn = await isPyscnBotLoggedIn();

	return (
		<>
			{/* Hero */}
			<section className="pt-28 pb-16 sm:pt-36 sm:pb-20">
				<div className="mx-auto grid w-full max-w-6xl items-start gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
					<div>
						<h1 className="type-display mb-5 text-4xl font-bold leading-tight text-[var(--text-primary)] sm:text-5xl">
							{t("hero.title")}
							<br />
							<span className="text-[var(--brand-blue)]">
								{t("hero.titleHighlight")}
							</span>
						</h1>
						<p className="mb-8 max-w-2xl leading-relaxed text-[var(--text-secondary)]">
							{t.rich("hero.description", rich)}
						</p>

						{isLoggedIn ? (
							<Link
								href="/pyscn-bot/account"
								className="inline-flex border border-[var(--brand-blue)] bg-[var(--brand-blue)] px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-[var(--brand-blue-hover)]"
							>
								{t("nav.mypage")}
							</Link>
						) : (
							<a
								href="/pyscn-bot/api/auth?plan=free"
								className="inline-flex border border-[var(--brand-blue)] bg-[var(--brand-blue)] px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-[var(--brand-blue-hover)]"
							>
								{t("trial.hero")} →
							</a>
						)}
						<p className="mt-4 max-w-xl text-sm text-[var(--text-muted)]">
							{t("hero.freeNote")}
						</p>
					</div>

					<AuditPanel />
				</div>
			</section>

			{/* Differentiator */}
			<section className="py-16 sm:py-20">
				<div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
					<SectionRule />
					<div className="mt-4 mb-12">
						<Silkscreen>Measurements, not opinions</Silkscreen>
						<h2 className="type-display mt-3 mb-3 text-3xl font-bold text-[var(--text-primary)] sm:text-4xl">
							{t("diff.title")}
						</h2>
						<p className="max-w-2xl text-[var(--text-secondary)]">
							{t("diff.subtitle")}
						</p>
					</div>

					<div className="grid gap-px border border-[var(--border-light)] bg-[var(--border-light)] md:grid-cols-2">
						<div className="bg-[var(--bg-subtle)] p-6 sm:p-8">
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

						<div className="border-t-2 border-t-[var(--brand-blue)] bg-[var(--bg-card)] p-6 sm:p-8">
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
				</div>
			</section>

			{/* Features */}
			<section id="features" className="scroll-mt-24 py-16 sm:py-20">
				<div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
					<SectionRule />
					<div className="mt-4 mb-12">
						<Silkscreen>Instruments</Silkscreen>
						<h2 className="type-display mt-3 text-3xl font-bold text-[var(--text-primary)] sm:text-4xl">
							{t("features.title")}
						</h2>
					</div>

					<div className="space-y-8">
						{/* Weekly Audit */}
						<div className="grid gap-px border border-[var(--border-light)] bg-[var(--border-light)] md:grid-cols-2">
							<div className="bg-[var(--bg-card)] p-4 max-md:order-2">
								<video
									src="/pyscn-bot/pyscn-audit-demo.mp4"
									poster="/pyscn-bot/pyscn-audit-demo-poster.jpg"
									autoPlay
									loop
									muted
									playsInline
									preload="none"
									className="w-full border border-[var(--border-subtle)]"
								>
									<track kind="captions" />
								</video>
							</div>
							<div className="bg-[var(--bg-card)] p-6 sm:p-8 max-md:order-1">
								<p className="mb-3 inline-flex border border-[var(--border-subtle)] bg-[var(--bg-subtle)] px-2 py-0.5 font-mono text-[11px] font-bold tracking-wide text-[var(--text-label)]">
									AUDIT
								</p>
								<h3 className="mb-3 text-2xl font-bold text-[var(--text-primary)]">
									{t("features.audit.title")}
								</h3>
								<p className="leading-relaxed text-[var(--text-secondary)]">
									{t("features.audit.description")}
								</p>
							</div>
						</div>

						{/* PR Review */}
						<div className="grid gap-px border border-[var(--border-light)] bg-[var(--border-light)] md:grid-cols-2">
							<div className="bg-[var(--bg-card)] p-6 sm:p-8">
								<p className="mb-3 inline-flex border border-[var(--border-subtle)] bg-[var(--bg-subtle)] px-2 py-0.5 font-mono text-[11px] font-bold tracking-wide text-[var(--text-label)]">
									PR
								</p>
								<h3 className="mb-3 text-2xl font-bold text-[var(--text-primary)]">
									{t("features.pr.title")}
								</h3>
								<p className="leading-relaxed text-[var(--text-secondary)]">
									{t("features.pr.description")}
								</p>
							</div>
							<div className="bg-[var(--bg-card)] p-4">
								{/* biome-ignore lint/performance/noImgElement: marketing asset ported as-is, not worth next/image tuning here */}
								<img
									src="/pyscn-bot/pyscn-pr-demo.png"
									alt="PR Review Demo"
									className="w-full border border-[var(--border-subtle)]"
								/>
							</div>
						</div>

						{/* YAML Configuration */}
						<div className="grid gap-px border border-[var(--border-light)] bg-[var(--border-light)] md:grid-cols-2">
							<div className="bg-[var(--bg-card)] p-6 sm:p-8">
								<p className="mb-3 inline-flex border border-[var(--border-subtle)] bg-[var(--bg-subtle)] px-2 py-0.5 font-mono text-[11px] font-bold tracking-wide text-[var(--text-label)]">
									YAML
								</p>
								<h3 className="mb-3 text-2xl font-bold text-[var(--text-primary)]">
									{t("features.config.title")}
								</h3>
								<p className="mb-5 leading-relaxed text-[var(--text-secondary)]">
									{t("features.config.description")}
								</p>
								<ul className="space-y-2 text-sm text-[var(--text-light)]">
									{(["option1", "option2", "option3", "option4"] as const).map(
										(o) => (
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
										),
									)}
								</ul>
							</div>
							<div className="bg-[var(--bg-ink)] p-6 sm:p-8">
								<p className="mb-4 font-mono text-xs text-white/50">
									.github/polyscan.yml
								</p>
								<pre className="overflow-x-auto font-mono text-sm leading-relaxed text-gray-300">
									<code>
										<span className="text-gray-500">
											# {t("features.config.comment.language")}
										</span>
										{"\n"}
										<span className="text-green-400">language</span>
										<span className="text-gray-400">:</span>{" "}
										<span className="text-amber-400">ja</span>
										{"\n\n"}
										<span className="text-gray-500">
											# {t("features.config.comment.target")}
										</span>
										{"\n"}
										<span className="text-green-400">target_directories</span>
										<span className="text-gray-400">:</span>
										{"\n  "}
										<span className="text-gray-400">-</span>{" "}
										<span className="text-amber-400">src/</span>
										{"\n\n"}
										<span className="text-gray-500">
											# {t("features.config.comment.audit")}
										</span>
										{"\n"}
										<span className="text-green-400">audit_interval</span>
										<span className="text-gray-400">:</span>{" "}
										<span className="text-amber-400">weekly</span>
										{"\n\n"}
										<span className="text-gray-500">
											# {t("features.config.comment.pr")}
										</span>
										{"\n"}
										<span className="text-green-400">pr_review</span>
										<span className="text-gray-400">:</span>{" "}
										<span className="text-amber-400">true</span>
									</code>
								</pre>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* How It Works */}
			<section id="how-it-works" className="scroll-mt-24 py-16 sm:py-20">
				<div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
					<SectionRule />
					<div className="mt-4 mb-12">
						<Silkscreen>Readings</Silkscreen>
						<h2 className="type-display mt-3 mb-3 text-3xl font-bold text-[var(--text-primary)] sm:text-4xl">
							{t("how.title")}
						</h2>
						<p className="max-w-2xl text-[var(--text-secondary)]">
							{t("how.subtitle")}
						</p>
					</div>

					<div className="grid gap-px border border-[var(--border-light)] bg-[var(--border-light)] sm:grid-cols-2 lg:grid-cols-4">
						{(["complexity", "deadcode", "clones", "coupling"] as const).map(
							(m) => (
								<article key={m} className="bg-[var(--bg-card)] p-5">
									<p className="mb-3 inline-flex border border-[var(--border-subtle)] bg-[var(--bg-subtle)] px-2 py-0.5 font-mono text-[11px] font-bold tracking-wide text-[var(--text-label)]">
										{metricIds[m]}
									</p>
									<h3 className="mb-1 text-lg font-semibold text-[var(--text-primary)]">
										{t(`how.${m}.title`)}
									</h3>
									<p className="text-sm leading-relaxed text-[var(--text-light)]">
										{t(`how.${m}.desc`)}
									</p>
								</article>
							),
						)}
					</div>

					<div className="mt-8">
						<Link
							href="/pyscn-bot/how-it-works"
							className="inline-flex border border-[var(--border-light)] bg-[var(--bg-card)] px-5 py-2.5 font-mono text-sm font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--brand-blue)] hover:text-[var(--brand-blue)]"
						>
							{t("tech.title")} →
						</Link>
					</div>
				</div>
			</section>

			{/* Pricing */}
			<section id="pricing" className="scroll-mt-24 py-16 sm:py-20">
				<div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
					<SectionRule />
					<div className="mt-4 mb-12">
						<Silkscreen>Pricing</Silkscreen>
						<h2 className="type-display mt-3 mb-3 text-3xl font-bold text-[var(--text-primary)] sm:text-4xl">
							{t("pricing.title")}
						</h2>
						<p className="text-[var(--text-secondary)]">
							{t("pricing.subtitle")}
						</p>
					</div>

					<div className="mx-auto grid max-w-3xl gap-px border border-[var(--border-light)] bg-[var(--border-light)] md:grid-cols-2">
						{/* Free */}
						<div className="flex flex-col bg-[var(--bg-card)] p-6 sm:p-8">
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
										<span className="leading-5">{t(`pricing.free.${f}`)}</span>
									</li>
								))}
							</ul>
							{isLoggedIn ? (
								<Link
									href="/pyscn-bot/account"
									className="block border border-[var(--border-light)] bg-[var(--bg-card)] px-6 py-3 text-center font-semibold text-[var(--text-primary)] transition-colors hover:border-[var(--brand-blue)] hover:text-[var(--brand-blue)]"
								>
									{t("nav.mypage")}
								</Link>
							) : (
								<a
									href="/pyscn-bot/api/auth?plan=free"
									className="block border border-[var(--border-light)] bg-[var(--bg-card)] px-6 py-3 text-center font-semibold text-[var(--text-primary)] transition-colors hover:border-[var(--brand-blue)] hover:text-[var(--brand-blue)]"
								>
									{t("pricing.free.cta")}
								</a>
							)}
						</div>

						{/* Pro */}
						<div className="flex flex-col border-t-2 border-t-[var(--brand-blue)] bg-[var(--bg-card)] p-6 sm:p-8">
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
							<div>
								{isLoggedIn ? (
									<Link
										href="/pyscn-bot/account"
										className="block border border-[var(--brand-blue)] bg-[var(--brand-blue)] px-6 py-3 text-center font-semibold text-white transition-colors hover:bg-[var(--brand-blue-hover)]"
									>
										{t("nav.mypage")}
									</Link>
								) : (
									<a
										href="/pyscn-bot/api/auth?plan=pro"
										className="block border border-[var(--brand-blue)] bg-[var(--brand-blue)] px-6 py-3 text-center font-semibold text-white transition-colors hover:bg-[var(--brand-blue-hover)]"
									>
										{t("pricing.pro.cta.button")}
									</a>
								)}
								<p className="mt-2 text-center font-mono text-xs text-[var(--text-muted)]">
									{isLoggedIn ? "" : t("pricing.pro.cta._")}
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* CTA */}
			<section className="py-16 sm:py-20">
				<div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
					<div className="border border-[var(--border-light)] bg-[var(--bg-card)] p-8 sm:p-12">
						<Silkscreen>Install</Silkscreen>
						<h2 className="type-display mt-3 mb-4 text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">
							{t("cta.title")}
						</h2>
						<p className="mb-8 max-w-2xl text-[var(--text-secondary)]">
							{t("cta.description")}
						</p>
						{isLoggedIn ? (
							<Link
								href="/pyscn-bot/account"
								className="inline-flex border border-[var(--brand-blue)] bg-[var(--brand-blue)] px-8 py-3.5 font-semibold text-white transition-colors hover:bg-[var(--brand-blue-hover)]"
							>
								{t("nav.mypage")}
							</Link>
						) : (
							<a
								href="/pyscn-bot/api/auth?plan=free"
								className="inline-flex border border-[var(--brand-blue)] bg-[var(--brand-blue)] px-8 py-3.5 font-semibold text-white transition-colors hover:bg-[var(--brand-blue-hover)]"
							>
								{t("cta.button")} →
							</a>
						)}
					</div>
				</div>
			</section>
		</>
	);
}
