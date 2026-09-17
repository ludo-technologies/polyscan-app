import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import CommandBlock from "@/components/CommandBlock";
import AuditPanel from "@/components/pyscn-bot/AuditPanel";
import ConfigYaml from "@/components/pyscn-bot/ConfigYaml";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import { Link } from "@/i18n/navigation";
import { LINKS } from "@/lib/links";
import { localizedAlternates } from "@/lib/localized-metadata";
import { isPyscnBotLoggedIn } from "@/lib/pyscn-bot-session";
import { SITE_KEYWORDS } from "@/lib/seo";

type FaqItem = { q: string; a: string };
type CardItem = { id: string; title: string; body: string };

const rich = { strong: (chunks: React.ReactNode) => <strong>{chunks}</strong> };

const coveredLanguages = [
	"Python",
	"TypeScript",
	"JavaScript",
	"Go",
	"Rust",
	"C++",
];

const engineCommands = [
	{ label: "Python", command: "uvx pyscn@latest analyze ." },
	{
		label: "JavaScript / TypeScript / Go / Rust / C++",
		command: "npx polyscan analyze .",
	},
];

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
	const t = await getTranslations({ locale, namespace: "meta" });
	const { canonical, languages } = localizedAlternates(locale, "/");
	return {
		title: t("title"),
		description: t("description"),
		keywords: [...SITE_KEYWORDS],
		openGraph: {
			title: t("title"),
			description: t("ogDescription"),
			type: "website",
		},
		alternates: { canonical, languages },
	};
}

function SignalCard({ index, item }: { index: number; item: CardItem }) {
	return (
		<article className="signal-card bg-[var(--bg-card)] p-7">
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
			<p className={chipClass}>{item.id}</p>
			<h3 className="mb-1 text-lg font-semibold text-[var(--text-primary)]">
				{item.title}
			</h3>
			<p className="text-sm leading-relaxed text-[var(--text-light)]">
				{item.body}
			</p>
		</article>
	);
}

export default async function Home() {
	const t = await getTranslations();
	const isLoggedIn = await isPyscnBotLoggedIn();
	const agentSteps = t.raw("agent.steps") as CardItem[];
	const checks = t.raw("checks.items") as CardItem[];
	const faqs = t.raw("faq.items") as FaqItem[];

	const faqJsonLd = JSON.stringify({
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: faqs.map(({ q, a }) => ({
			"@type": "Question",
			name: q,
			acceptedAnswer: { "@type": "Answer", text: a },
		})),
	});

	const softwareJsonLd = JSON.stringify({
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		name: "Polyscan",
		applicationCategory: "DeveloperApplication",
		operatingSystem: "Web",
		description: t("meta.softwareDescription"),
		offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
	});

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
				<script
					type="application/ld+json"
					// biome-ignore lint/security/noDangerouslySetInnerHtml: structured data
					dangerouslySetInnerHTML={{ __html: softwareJsonLd }}
				/>
				<script
					type="application/ld+json"
					// biome-ignore lint/security/noDangerouslySetInnerHtml: structured data
					dangerouslySetInnerHTML={{ __html: faqJsonLd }}
				/>

				<section
					id="top"
					className="home-hero relative z-10 w-full max-w-6xl px-4 pt-14 pb-16 sm:px-6 sm:pt-24 sm:pb-20"
				>
					<div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
						<div className="hero-copy min-w-0">
							<p className="hero-eyebrow">
								<span /> {t("hero.eyebrow")}
							</p>
							<h1 className="type-display mb-6 text-[2.5rem] leading-[1.05] font-bold text-[var(--text-primary)] sm:text-6xl lg:text-[4rem]">
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
							<div className="flex flex-wrap items-center gap-5">
								<Cta
									label={t("trial.hero")}
									plan="free"
									className="home-primary"
								/>
								<Link href="/pyscn-bot/how-it-works" className="home-text-link">
									{t("nav.howItWorks")} <span aria-hidden="true">→</span>
								</Link>
							</div>
						</div>

						<div className="hero-instrument min-w-0">
							<div className="instrument-orbit" aria-hidden="true" />
							<AuditPanel />
						</div>
					</div>
				</section>

				<div className="language-strip relative z-10 w-full">
					<div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-8 gap-y-4 px-4 py-6 sm:px-6">
						<span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
							{t("languageStrip.label")}
						</span>
						{coveredLanguages.map((language) => (
							<span
								key={language}
								className="text-sm font-semibold tracking-tight text-[var(--text-secondary)]"
							>
								{language}
							</span>
						))}
					</div>
				</div>

				<div className="relative z-10 w-full max-w-6xl px-4 pb-20 sm:px-6">
					<section
						data-reveal
						id="agent"
						aria-labelledby="agent-title"
						className="mt-24 scroll-mt-24"
					>
						<SectionHead
							id="agent-title"
							eyebrow={t("agent.eyebrow")}
							title={t("agent.title")}
							lede={t("agent.lede")}
						/>
						<div className="grid gap-4 lg:grid-cols-3">
							{agentSteps.map((step, index) => (
								<SignalCard key={step.id} index={index} item={step} />
							))}
						</div>
						<p className="mt-8">
							<Link href="/pyscn-bot/how-it-works" className="home-text-link">
								{t("agent.link")} <span aria-hidden="true">→</span>
							</Link>
						</p>
					</section>

					<section
						data-reveal
						aria-labelledby="diff-title"
						className="mt-20 scroll-mt-24"
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
									{(["1", "2", "3", "4"] as const).map((n) => (
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
									{(["1", "2", "3", "4"] as const).map((n) => (
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
						id="readings"
						aria-labelledby="readings-title"
						className="mt-20 scroll-mt-24"
					>
						<SectionHead
							id="readings-title"
							eyebrow={t("checks.eyebrow")}
							title={t("checks.title")}
							lede={t("checks.lede")}
						/>
						<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
							{checks.map((c, index) => (
								<SignalCard key={c.id} index={index} item={c} />
							))}
							<a
								href="#engine"
								className="signal-summary flex flex-col justify-between p-7"
							>
								<span className="font-mono text-xs uppercase tracking-widest">
									{t("checks.summaryLabel")}
								</span>
								<span className="my-6 text-4xl font-bold tracking-tight">
									{t("checks.summaryBig1")}
									<br />
									{t("checks.summaryBig2")}
								</span>
								<span className="text-sm">
									{t("checks.summaryCta")} <span aria-hidden="true">↓</span>
								</span>
							</a>
						</div>
					</section>

					<section
						data-reveal
						id="engine"
						aria-labelledby="engine-title"
						className="mt-20 scroll-mt-24"
					>
						<SectionHead
							id="engine-title"
							eyebrow={t("engine.eyebrow")}
							title={t("engine.title")}
							lede={t("engine.body")}
						/>
						<div className="grid gap-4 md:grid-cols-2">
							{engineCommands.map((c) => (
								<CommandBlock key={c.command} {...c} />
							))}
						</div>
						<div className="mt-8 flex flex-wrap gap-6">
							<a
								href={LINKS.docs}
								target="_blank"
								rel="noopener noreferrer"
								className="home-text-link"
							>
								{t("engine.docs")} <span aria-hidden="true">↗</span>
							</a>
							<a
								href={LINKS.monorepo}
								target="_blank"
								rel="noopener noreferrer"
								className="home-text-link"
							>
								{t("engine.source")} <span aria-hidden="true">↗</span>
							</a>
						</div>
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
						id="faq"
						aria-labelledby="faq-title"
						className="mt-20 scroll-mt-24"
					>
						<SectionHead
							id="faq-title"
							eyebrow={t("faq.eyebrow")}
							title={t("faq.title")}
						/>
						<div className="border border-[var(--border-light)] bg-[var(--bg-card)]">
							{faqs.map(({ q, a }) => (
								<details
									key={q}
									className="group border-b border-[var(--border-subtle)] p-5 last:border-b-0 open:bg-[var(--bg-subtle)]"
								>
									<summary className="cursor-pointer list-none text-base font-semibold text-[var(--text-primary)]">
										<span className="mr-3 font-mono text-sm text-[var(--brand-blue)]">
											Q
										</span>
										{q}
									</summary>
									<p className="mt-3 pl-6 text-sm leading-relaxed text-[var(--text-light)]">
										{a}
									</p>
								</details>
							))}
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
