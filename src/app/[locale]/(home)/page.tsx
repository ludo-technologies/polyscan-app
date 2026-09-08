import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import CommandBlock from "@/components/CommandBlock";
import FloatingAppCard from "@/components/FloatingAppCard";
import Readout from "@/components/Readout";
import Reveal from "@/components/Reveal";
import { Link as LocaleLink } from "@/i18n/navigation";
import { LINKS } from "@/lib/links";
import { localizedAlternates } from "@/lib/localized-metadata";
import { SITE_KEYWORDS } from "@/lib/seo";

type FaqItem = { q: string; a: string };
type CheckItem = { id: string; title: string; body: string };

const analyzers = [
	{
		name: "pyscn",
		language: "Python",
		command: "uvx pyscn@latest analyze .",
		links: [
			{ label: "GitHub", href: LINKS.pyscn },
			{ label: "PyPI", href: LINKS.pypi },
			{ label: "Docs", href: LINKS.docs },
		],
	},
	{
		name: "polyscan",
		language: "JS / TS · Go · Rust · C++",
		command: "npx polyscan analyze .",
		links: [
			{ label: "GitHub", href: LINKS.polyscanCli },
			{ label: "npm", href: LINKS.npm },
		],
	},
	{
		name: "core",
		language: "Go module",
		command: "go get github.com/ludo-technologies/polyscan/core",
		links: [{ label: "GitHub", href: LINKS.core }],
	},
];

const heroCommands = [
	{ label: "Python", command: "uvx pyscn@latest analyze ." },
	{
		label: "JavaScript / TypeScript / Go / Rust / C++",
		command: "npx polyscan analyze .",
	},
];

const agentCommands = [
	{ label: "pyscn Skills", command: "uvx add-skills ludo-technologies/pyscn" },
	{
		label: "polyscan Skills",
		command: "npx skills add ludo-technologies/polyscan",
	},
	{
		label: "Claude Code plugin",
		command: "claude plugin marketplace add ludo-technologies/polyscan",
	},
];

const coveredLanguages = [
	"Python",
	"TypeScript",
	"JavaScript",
	"Go",
	"Rust",
	"C++",
];

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "home" });
	const { canonical, languages } = localizedAlternates(locale, "/");
	return {
		title: t("meta.title"),
		description: t("meta.description"),
		keywords: [...SITE_KEYWORDS],
		openGraph: {
			title: t("meta.title"),
			description: t("meta.ogDescription"),
			type: "website",
		},
		alternates: { canonical, languages },
	};
}

function SectionHead({
	id,
	eyebrow,
	title,
	lede,
}: {
	id: string;
	eyebrow: string;
	title: string;
	lede?: string;
}) {
	return (
		<>
			<div className="border-t border-[var(--border-light)]">
				<div className="ruler-ticks" aria-hidden="true" />
			</div>
			<p className="mt-4 font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--text-muted)]">
				{eyebrow}
			</p>
			<h2
				id={id}
				className="type-display mt-3 mb-3 text-3xl font-bold text-[var(--text-primary)] sm:text-4xl"
			>
				{title}
			</h2>
			{lede && (
				<p className="mb-10 max-w-3xl text-[var(--text-secondary)]">{lede}</p>
			)}
		</>
	);
}

export default async function Home({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "home" });
	const checks = t.raw("checks.items") as CheckItem[];
	const analyzerBodies = t.raw("analyzers.items") as { body: string }[];
	const agentSteps = t.raw("agents.steps") as string[];
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
		name: "polyscan",
		applicationCategory: "DeveloperApplication",
		operatingSystem: "macOS, Linux, Windows",
		description: t("softwareDescription"),
		license: "https://opensource.org/licenses/MIT",
		offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
	});

	return (
		<main className="home-page relative flex min-h-screen flex-col items-center">
			<FloatingAppCard />
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
							<h1 className="type-display mb-6 text-[3.5rem] leading-[0.98] font-bold text-[var(--text-primary)] sm:text-7xl lg:text-[5.25rem]">
								{t("hero.title")}
								<br />
								<span className="text-[var(--brand-blue)]">
									{t("hero.titleHighlight")}
								</span>
							</h1>
							<p className="mb-4 max-w-2xl text-lg font-semibold leading-relaxed text-[var(--text-primary)] sm:text-xl">
								{t("hero.lead")}
							</p>
							<p className="mb-8 max-w-2xl leading-relaxed text-[var(--text-secondary)]">
								{t("hero.body")}
							</p>

							<div className="mb-8 flex flex-wrap items-center gap-5">
								<a href="#analyzers" className="home-primary">
									{t("hero.cta")} <span aria-hidden="true">↗</span>
								</a>
								<a
									href={LINKS.monorepo}
									target="_blank"
									rel="noopener noreferrer"
									className="home-text-link"
								>
									{t("hero.source")} <span aria-hidden="true">↗</span>
								</a>
							</div>
							<div className="grid max-w-3xl gap-4">
								{heroCommands.map((c) => (
									<CommandBlock key={c.command} {...c} />
								))}
							</div>
							<p className="mt-3 font-mono text-xs text-[var(--text-muted)]">
								{t("hero.noInstall")}
							</p>
						</div>

						<div className="hero-instrument min-w-0">
							<div className="instrument-orbit" aria-hidden="true" />
							<Readout />
							<p className="mt-5 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
								{t("hero.instrumentCaption")}
							</p>
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
						aria-labelledby="what-you-get-title"
						className="mt-24 scroll-mt-24"
						id="what-you-get"
					>
						<SectionHead
							id="what-you-get-title"
							eyebrow={t("checks.eyebrow")}
							title={t("checks.title")}
							lede={t("checks.lede")}
						/>
						<div className="checks-grid grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
							{checks.map((c, index) => (
								<article
									key={c.id}
									className="signal-card bg-[var(--bg-card)] p-7"
								>
									<div className="signal-visual" aria-hidden="true">
										<span>{String(index + 1).padStart(2, "0")}</span>
										<div className={`signal-bars signal-bars-${index}`}>
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
									<div className="mb-3 inline-flex border border-[var(--border-subtle)] bg-[var(--bg-subtle)] px-2 py-0.5 font-mono text-[11px] font-bold tracking-wide text-[var(--text-label)]">
										{c.id}
									</div>
									<h3 className="mb-1 text-lg font-semibold text-[var(--text-primary)]">
										{c.title}
									</h3>
									<p className="text-sm leading-relaxed text-[var(--text-light)]">
										{c.body}
									</p>
								</article>
							))}
							<a
								href="#analyzers"
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
									{t("checks.summaryCta")} <span aria-hidden="true">↗</span>
								</span>
							</a>
						</div>
					</section>

					<section
						data-reveal
						aria-labelledby="analyzers-title"
						className="mt-20 scroll-mt-24"
						id="analyzers"
					>
						<SectionHead
							id="analyzers-title"
							eyebrow={t("analyzers.eyebrow")}
							title={t("analyzers.title")}
							lede={t("analyzers.lede")}
						/>
						<div className="grid gap-4 lg:grid-cols-3">
							{analyzers.map((a, index) => (
								<article
									key={a.name}
									className="analyzer-card flex min-w-0 flex-col border border-[var(--border-light)] bg-[var(--bg-card)] p-6"
								>
									<div className="mb-1 flex items-baseline justify-between gap-2">
										<h3 className="font-mono text-xl font-bold text-[var(--text-primary)]">
											{a.name}
										</h3>
										<span className="font-mono text-[11px] uppercase tracking-wide text-[var(--text-muted)]">
											{a.language}
										</span>
									</div>
									<p className="mb-4 flex-1 text-sm leading-relaxed text-[var(--text-light)]">
										{analyzerBodies[index]?.body}
									</p>
									<div className="mb-4 overflow-x-auto border border-[var(--border-subtle)] bg-[var(--bg-subtle)] px-3 py-2 font-mono text-xs text-[var(--text-primary)]">
										{a.command}
									</div>
									<ul className="flex flex-wrap gap-3 font-mono text-sm">
										{a.links.map((l) => (
											<li key={l.href}>
												<a
													href={l.href}
													target="_blank"
													rel="noopener noreferrer"
													className="font-medium text-[var(--brand-blue)] transition-colors hover:text-[var(--brand-blue-hover)]"
												>
													{l.label} →
												</a>
											</li>
										))}
									</ul>
								</article>
							))}
						</div>
						<p className="mt-6 max-w-3xl font-mono text-xs text-[var(--text-muted)]">
							{t("analyzers.note")}
						</p>
					</section>

					<section
						data-reveal
						aria-labelledby="agents-title"
						className="mt-20 scroll-mt-24"
						id="agents"
					>
						<SectionHead
							id="agents-title"
							eyebrow={t("agents.eyebrow")}
							title={t("agents.title")}
							lede={t("agents.lede")}
						/>
						<div className="grid gap-6 lg:grid-cols-2">
							<div className="space-y-4">
								{agentCommands.map((c) => (
									<CommandBlock key={c.command} {...c} />
								))}
							</div>
							<div className="border border-[var(--border-light)] bg-[var(--bg-card)] p-5">
								<h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--text-muted)]">
									{t("agents.ask")}
								</h3>
								<ul className="space-y-3">
									{agentSteps.map((s) => (
										<li
											key={s}
											className="border border-[var(--border-subtle)] bg-[var(--bg-subtle)] px-4 py-3 text-sm text-[var(--text-light)]"
										>
											&ldquo;{s}&rdquo;
										</li>
									))}
								</ul>
							</div>
						</div>
					</section>

					<section
						data-reveal
						aria-labelledby="bot-title"
						className="monitoring-panel mt-20 scroll-mt-24 p-7 sm:p-12"
						id="bot"
					>
						<p className="mb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--brand-blue)]">
							{t("bot.eyebrow")}
						</p>
						<h2
							id="bot-title"
							className="type-display mb-3 text-2xl font-bold text-[var(--text-primary)] sm:text-3xl"
						>
							{t("bot.title")}
						</h2>
						<p className="mb-6 max-w-3xl text-[var(--text-secondary)]">
							{t("bot.body")}
						</p>
						<div className="flex flex-wrap gap-3">
							<LocaleLink
								href={LINKS.pyscnBot}
								className="inline-flex border border-[var(--brand-blue)] bg-[var(--brand-blue)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--brand-blue-hover)]"
							>
								{t("bot.cta")} →
							</LocaleLink>
							<a
								href={LINKS.pyscnBotRepo}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex border border-[var(--brand-blue)] bg-white px-5 py-2.5 text-sm font-semibold text-[var(--brand-blue)] transition-colors hover:bg-[var(--brand-blue-light)]/40"
							>
								{t("bot.source")}
							</a>
						</div>
					</section>

					<section
						data-reveal
						aria-labelledby="faq-title"
						className="mt-20 scroll-mt-24"
						id="faq"
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
								{t("closing.eyebrow")}
							</p>
						</div>
						<div className="pt-6">
							<h2 className="type-display mb-3 text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">
								{t("closing.title")}
							</h2>
							<p className="mb-6 max-w-xl text-[var(--text-secondary)]">
								{t("closing.body")}
							</p>
							<div className="grid max-w-2xl gap-3 sm:grid-cols-2">
								<CommandBlock command="uvx pyscn@latest analyze ." />
								<CommandBlock command="npx polyscan analyze ." />
							</div>
						</div>
					</section>
				</div>
			</Reveal>
		</main>
	);
}
