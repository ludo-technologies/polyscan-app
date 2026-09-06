import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";
import SubpageHeader from "@/components/pyscn-bot/SubpageHeader";
import { Link } from "@/i18n/navigation";
import { pyscnBotAlternates } from "@/lib/pyscn-bot-metadata";

const rich = { strong: (chunks: ReactNode) => <strong>{chunks}</strong> };
const richCodeStrong = {
	strong: (chunks: ReactNode) => <strong>{chunks}</strong>,
	code: (chunks: ReactNode) => (
		<code className="border border-[var(--border-subtle)] bg-[var(--bg-subtle)] px-1 font-mono text-[0.875em] text-[var(--text-primary)]">
			{chunks}
		</code>
	),
};

const GITHUB_APP_INSTALL_URL = "https://github.com/apps/polyscan-app";

const toolIds = {
	complexity: "CC",
	deadcode: "DEAD",
	clones: "DUP",
	coupling: "CBO",
	architecture: "DEP",
} as const;

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale });
	const { canonical, languages } = pyscnBotAlternates(
		locale,
		"/pyscn-bot/how-it-works",
	);
	return {
		title: `${t("tech.title")} - Polyscan`,
		description: t("tech.subtitle"),
		alternates: { canonical, languages },
	};
}

function Section({
	eyebrow,
	title,
	children,
}: {
	eyebrow: string;
	title: string;
	children: ReactNode;
}) {
	return (
		<section className="mb-20">
			<div className="border-t border-[var(--border-light)]">
				<div className="ruler-ticks" aria-hidden="true" />
			</div>
			<p className="mt-4 font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--text-muted)]">
				{eyebrow}
			</p>
			<h2 className="type-display mt-3 mb-6 text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">
				{title}
			</h2>
			{children}
		</section>
	);
}

function Chip({ children }: { children: ReactNode }) {
	return (
		<span className="inline-flex border border-[var(--border-subtle)] bg-[var(--bg-subtle)] px-2 py-0.5 font-mono text-[11px] font-bold tracking-wide text-[var(--text-label)]">
			{children}
		</span>
	);
}

function Prose({ children }: { children: ReactNode }) {
	return (
		<p className="mb-4 leading-relaxed text-[var(--text-light)] last:mb-0">
			{children}
		</p>
	);
}

export default async function HowItWorksPage() {
	const t = await getTranslations();

	const examples = [
		{
			id: "high-complexity",
			heading: t("tech.example.heading"),
			body: t.rich("tech.example.body", richCodeStrong),
			suggestion: t.rich("tech.example.suggestion", richCodeStrong),
		},
		{
			id: "code-clone",
			heading: t("tech.example2.heading"),
			body: t.rich("tech.example2.body", richCodeStrong),
			suggestion: t.rich("tech.example2.suggestion", richCodeStrong),
		},
	];

	return (
		<main className="pt-24 pb-16">
			<div className="mx-auto max-w-4xl px-4 sm:px-6">
				<SubpageHeader
					backLabel={t("tech.backToHome")}
					eyebrow="How it works"
					title={t("tech.title")}
					lede={t("tech.subtitle")}
				/>

				<Section eyebrow="Problem" title={t("tech.problem.title")}>
					<div className="max-w-3xl">
						<Prose>{t.rich("tech.problem.p1", rich)}</Prose>
						<Prose>{t("tech.problem.p2")}</Prose>
						<Prose>{t.rich("tech.problem.p3", rich)}</Prose>
					</div>
				</Section>

				<Section eyebrow="Instruments" title={t("tech.solution.title")}>
					<div className="mb-8 max-w-3xl">
						<Prose>{t.rich("tech.solution.p1", rich)}</Prose>
					</div>
					<div className="grid gap-px border border-[var(--border-light)] bg-[var(--border-light)] md:grid-cols-2">
						{(
							[
								{ key: "audit", id: "AUDIT" },
								{ key: "review", id: "PR" },
							] as const
						).map((f) => (
							<article key={f.key} className="bg-[var(--bg-card)] p-6">
								<div className="mb-3 flex items-center justify-between gap-3">
									<Chip>{f.id}</Chip>
									<span className="font-mono text-[11px] uppercase tracking-wide text-[var(--text-muted)]">
										{t(`tech.features.${f.key}.badge`)}
									</span>
								</div>
								<h3 className="mb-2 text-lg font-semibold text-[var(--text-primary)]">
									{t(`tech.features.${f.key}.title`)}
								</h3>
								<p className="text-sm leading-relaxed text-[var(--text-light)]">
									{t(`tech.features.${f.key}.desc`)}
								</p>
							</article>
						))}
					</div>
				</Section>

				<Section eyebrow="Analyzers" title={t("tech.languages.title")}>
					<div className="mb-8 max-w-3xl">
						<Prose>{t.rich("tech.languages.p1", rich)}</Prose>
					</div>
					<div className="grid gap-px border border-[var(--border-light)] bg-[var(--border-light)] md:grid-cols-3">
						{(["item1", "item2", "item3"] as const).map((item, i) => (
							<article key={item} className="bg-[var(--bg-card)] p-5">
								<p className="mb-3 font-mono text-[11px] text-[var(--text-muted)]">
									{String(i + 1).padStart(2, "0")}
								</p>
								<h3 className="mb-1 font-semibold text-[var(--text-primary)]">
									{t(`tech.languages.${item}.title`)}
								</h3>
								<p className="text-sm leading-relaxed text-[var(--text-light)]">
									{t(`tech.languages.${item}.desc`)}
								</p>
							</article>
						))}
					</div>
				</Section>

				<Section eyebrow="Readings" title={t("tech.example.title")}>
					<div className="space-y-6">
						{examples.map((example) => (
							<figure
								key={example.id}
								className="border border-[var(--border-light)] bg-[var(--bg-card)]"
							>
								<figcaption className="border-b border-[var(--border-subtle)] px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
									{t("tech.example.label")}
								</figcaption>
								<div className="p-5">
									<h3 className="mb-2 flex items-baseline gap-2 font-semibold text-[var(--text-primary)]">
										<span
											aria-hidden="true"
											className="font-mono text-xs text-[var(--reading-over)]"
										>
											▲
										</span>
										{example.heading}
									</h3>
									<p className="mb-4 text-sm leading-relaxed text-[var(--text-light)]">
										{example.body}
									</p>
									<p className="border-l-2 border-[var(--brand-blue)] bg-[var(--bg-subtle)] py-2 pr-3 pl-4 text-sm leading-relaxed text-[var(--text-light)]">
										<span className="mr-2 font-mono text-[11px] uppercase tracking-wide text-[var(--brand-blue)]">
											Suggestion
										</span>
										{example.suggestion}
									</p>
								</div>
							</figure>
						))}
					</div>
				</Section>

				<Section eyebrow="Agent" title={t("tech.agent.title")}>
					<div className="mb-8 max-w-3xl">
						<p className="mb-4 text-[var(--text-secondary)]">
							{t("tech.agent.subtitle")}
						</p>
						<Prose>{t.rich("tech.agent.p1", rich)}</Prose>
					</div>

					<figure className="mb-8 border border-[var(--border-light)] bg-[var(--bg-card)]">
						<figcaption className="border-b border-[var(--border-subtle)] px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
							{t("tech.agent.flow.title")}
						</figcaption>
						<ol className="px-5">
							{(["step1", "step2", "step3"] as const).map((step, i) => (
								<li
									key={step}
									className="grid gap-x-4 gap-y-2 border-b border-[var(--border-subtle)] py-4 sm:grid-cols-[2.5rem_1fr]"
								>
									<span className="font-mono text-[11px] text-[var(--text-muted)]">
										{String(i + 1).padStart(2, "0")}
									</span>
									<div>
										<p className="mb-2 text-sm italic text-[var(--text-secondary)]">
											&ldquo;{t(`tech.agent.flow.${step}.thought`)}&rdquo;
										</p>
										<code className="inline-block bg-[var(--bg-ink)] px-3 py-1.5 font-mono text-xs text-white/85">
											{t(`tech.agent.flow.${step}.tool`)}
										</code>
										<p className="mt-2 font-mono text-xs text-[var(--text-muted)]">
											→ {t(`tech.agent.flow.${step}.result`)}
										</p>
									</div>
								</li>
							))}
							<li className="grid gap-x-4 gap-y-2 py-4 sm:grid-cols-[2.5rem_1fr]">
								<span className="font-mono text-[11px] text-[var(--text-muted)]">
									04
								</span>
								<p className="text-sm italic text-[var(--text-secondary)]">
									&ldquo;{t("tech.agent.flow.step4.thought")}&rdquo;
								</p>
							</li>
						</ol>
						<div className="border-t border-[var(--border-subtle)] border-l-2 border-l-[var(--reading-ok)] bg-[var(--bg-subtle)] px-5 py-4">
							<p className="mb-1 font-mono text-[11px] uppercase tracking-wide text-[var(--reading-ok)]">
								{t("tech.agent.flow.result.title")}
							</p>
							<p className="text-sm leading-relaxed text-[var(--text-light)]">
								{t("tech.agent.flow.result.desc")}
							</p>
						</div>
					</figure>

					<div className="mb-8 max-w-3xl">
						<h3 className="mb-3 text-lg font-semibold text-[var(--text-primary)]">
							{t("tech.agent.logic.title")}
						</h3>
						<Prose>{t("tech.agent.logic.p1")}</Prose>
						<Prose>{t("tech.agent.logic.p2")}</Prose>
					</div>

					<div className="border border-[var(--border-light)] bg-[var(--bg-card)]">
						<p className="border-b border-[var(--border-subtle)] px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
							{t("tech.agent.tools.title")}
						</p>
						<dl>
							{(Object.keys(toolIds) as Array<keyof typeof toolIds>).map(
								(tool) => (
									<div
										key={tool}
										className="grid grid-cols-[4rem_1fr] items-baseline gap-3 border-b border-[var(--border-subtle)] px-4 py-3 last:border-b-0 sm:grid-cols-[4rem_10rem_1fr]"
									>
										<dt>
											<Chip>{toolIds[tool]}</Chip>
										</dt>
										<dd className="text-sm font-semibold text-[var(--text-primary)]">
											{t(`tech.agent.tools.${tool}.name`)}
										</dd>
										<dd className="col-span-2 text-sm text-[var(--text-light)] sm:col-span-1">
											{t(`tech.agent.tools.${tool}.desc`)}
										</dd>
									</div>
								),
							)}
						</dl>
					</div>
				</Section>

				<Section eyebrow="Security" title={t("tech.security.title")}>
					<div className="mb-8 max-w-3xl">
						<Prose>{t("tech.security.p1")}</Prose>
					</div>
					<div className="grid gap-px border border-[var(--border-light)] bg-[var(--border-light)] md:grid-cols-3">
						{(["item1", "item2", "item3"] as const).map((item, i) => (
							<article key={item} className="bg-[var(--bg-card)] p-5">
								<p className="mb-3 font-mono text-[11px] text-[var(--text-muted)]">
									{String(i + 1).padStart(2, "0")}
								</p>
								<h3 className="mb-1 font-semibold text-[var(--text-primary)]">
									{t(`tech.security.${item}.title`)}
								</h3>
								<p className="text-sm leading-relaxed text-[var(--text-light)]">
									{t(`tech.security.${item}.desc`)}
								</p>
							</article>
						))}
					</div>
					<Link
						href="/pyscn-bot/privacy"
						className="mt-6 inline-flex font-mono text-sm font-medium text-[var(--brand-blue)] transition-colors hover:text-[var(--brand-blue-hover)]"
					>
						{t("tech.security.link")} →
					</Link>
				</Section>

				<section className="border border-[var(--border-light)] border-t-2 border-t-[var(--brand-blue)] bg-[var(--bg-card)] p-6 sm:p-8">
					<p className="mb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--brand-blue)]">
						Install
					</p>
					<h2 className="type-display mb-3 text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">
						{t("tech.cta.title")}
					</h2>
					<p className="mb-6 max-w-2xl text-[var(--text-secondary)]">
						{t("tech.cta.p1")}
					</p>
					<a
						href={GITHUB_APP_INSTALL_URL}
						className="inline-flex border border-[var(--brand-blue)] bg-[var(--brand-blue)] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--brand-blue-hover)]"
					>
						{t("tech.cta.button")} →
					</a>
				</section>
			</div>
		</main>
	);
}
