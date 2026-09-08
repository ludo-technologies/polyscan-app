import type { Metadata } from "next";
import CommandBlock from "@/components/CommandBlock";
import FloatingAppCard from "@/components/FloatingAppCard";
import Readout from "@/components/Readout";
import Reveal from "@/components/Reveal";
import { LINKS } from "@/lib/links";

export const metadata: Metadata = {
	alternates: {
		canonical: "/",
	},
};

const checks = [
	{
		id: "DEAD",
		title: "Dead code",
		body: "Unreachable code you can safely delete, found by walking the control flow graph rather than guessing.",
	},
	{
		id: "DUP",
		title: "Duplicate code",
		body: "Copy-pasted and structurally similar code worth merging — Type 1-4 clone detection via tree edit distance.",
	},
	{
		id: "CC",
		title: "Complexity",
		body: "Functions that are hard to read and hard to test, ranked by cyclomatic complexity so you know where to start.",
	},
	{
		id: "DEP",
		title: "Dependencies",
		body: "Circular imports and unstable module dependencies, plus the module communities your codebase actually forms.",
	},
	{
		id: "CBO",
		title: "Class design",
		body: "Classes that do too much or depend on too much, measured with CBO coupling and LCOM cohesion.",
	},
];

const analyzers = [
	{
		name: "pyscn",
		language: "Python",
		body: "The original analyzer. Ships a CLI, an MCP server, and Agent Skills, and powers Polyscan.",
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
		body: "One CLI for JavaScript, TypeScript, Go, Rust, and C++. Detects each file's language by extension and lands everything in one report with one health score. Distributed on npm with prebuilt binaries — no toolchain to install.",
		command: "npx polyscan analyze .",
		links: [
			{ label: "GitHub", href: LINKS.polyscanCli },
			{ label: "npm", href: LINKS.npm },
		],
	},
	{
		name: "core",
		language: "Go module",
		body: "The language-agnostic engine behind both analyzers: APTED tree edit distance, LSH/MinHash clone indexing, CFG analysis, coupling and cohesion metrics.",
		command: "go get github.com/ludo-technologies/polyscan/core",
		links: [{ label: "GitHub", href: LINKS.core }],
	},
];

const agentSteps = [
	"Analyze the code quality of the src/ directory",
	"Find duplicate code and help me refactor it",
	"Show me complex code and help me simplify it",
];

const faqs = [
	{
		q: "What does Polyscan actually measure?",
		a: "Structure, not style. Dead code, duplicate code, cyclomatic complexity, module dependency cycles, and class coupling and cohesion — the things that make a codebase expensive to change. It is not a linter or a formatter, and it complements rather than replaces them.",
	},
	{
		q: "Why does this matter for AI-generated code?",
		a: "Coding agents produce working code quickly, but they tend to duplicate logic and grow functions rather than refactor. Those problems compound silently. Polyscan gives you and your agent a measurement to work against, so cleanup becomes a concrete task instead of a vague feeling.",
	},
	{
		q: "Do I need to install anything?",
		a: "No. uvx and npx run the analyzers directly. Both ship as single Go binaries built with tree-sitter, so a full analysis is fast enough to run on every commit.",
	},
	{
		q: "Which languages are supported?",
		a: "Python via pyscn, and JavaScript, TypeScript, Go, Rust, and C++ via polyscan. Complexity and duplicate code are measured for every language. Dead code, dependencies, and class design need the import graph and class model that only the Python and JavaScript/TypeScript backends build today, so those dimensions are left out of a Go, Rust, or C++ score rather than counted as clean.",
	},
	{
		q: "Is it open source?",
		a: "Yes, MIT licensed. The analyzers, the shared core, and the Agent Skills are all public on GitHub.",
	},
];

const FAQ_JSON_LD = JSON.stringify({
	"@context": "https://schema.org",
	"@type": "FAQPage",
	mainEntity: faqs.map(({ q, a }) => ({
		"@type": "Question",
		name: q,
		acceptedAnswer: { "@type": "Answer", text: a },
	})),
});

const SOFTWARE_JSON_LD = JSON.stringify({
	"@context": "https://schema.org",
	"@type": "SoftwareApplication",
	name: "polyscan",
	applicationCategory: "DeveloperApplication",
	operatingSystem: "macOS, Linux, Windows",
	description:
		"Open source code quality analyzers for Python, JavaScript/TypeScript, Go, Rust, and C++. Detects dead code, duplicate code, complexity, dependency cycles, and class coupling, then scores the codebase and reports what to fix first.",
	license: "https://opensource.org/licenses/MIT",
	offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
});

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

export default function Home() {
	return (
		<main className="home-page relative flex min-h-screen flex-col items-center">
			<FloatingAppCard />
			<Reveal>
				<script
					type="application/ld+json"
					// biome-ignore lint/security/noDangerouslySetInnerHtml: structured data
					dangerouslySetInnerHTML={{ __html: SOFTWARE_JSON_LD }}
				/>
				<script
					type="application/ld+json"
					// biome-ignore lint/security/noDangerouslySetInnerHtml: structured data
					dangerouslySetInnerHTML={{ __html: FAQ_JSON_LD }}
				/>

				<section
					id="top"
					className="home-hero relative z-10 w-full max-w-6xl px-4 pt-14 pb-16 sm:px-6 sm:pt-24 sm:pb-20"
				>
					<div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
						<div className="hero-copy min-w-0">
							<p className="hero-eyebrow">
								<span /> Open source. Clear signals.
							</p>
							<h1 className="type-display mb-6 text-[3.5rem] leading-[0.98] font-bold text-[var(--text-primary)] sm:text-7xl lg:text-[5.25rem]">
								Code quality,
								<br />
								<span className="text-[var(--brand-blue)]">measured.</span>
							</h1>
							<p className="mb-4 max-w-2xl text-lg font-semibold leading-relaxed text-[var(--text-primary)] sm:text-xl">
								Structural analyzers for the age of AI-written code.
							</p>
							<p className="mb-8 max-w-2xl leading-relaxed text-[var(--text-secondary)]">
								Building with Claude, Cursor, or Codex? Your agent writes code
								faster than anyone can review it. Polyscan runs structural
								analysis over the whole codebase — one command scores it and
								shows what to fix first.
							</p>

							<div className="mb-8 flex flex-wrap items-center gap-5">
								<a href="#analyzers" className="home-primary">
									Find your analyzer <span aria-hidden="true">↗</span>
								</a>
								<a
									href={LINKS.monorepo}
									target="_blank"
									rel="noopener noreferrer"
									className="home-text-link"
								>
									Explore the source <span aria-hidden="true">↗</span>
								</a>
							</div>
							<div className="grid max-w-3xl gap-4">
								<CommandBlock
									label="Python"
									command="uvx pyscn@latest analyze ."
								/>
								<CommandBlock
									label="JavaScript / TypeScript / Go / Rust / C++"
									command="npx polyscan analyze ."
								/>
							</div>
							<p className="mt-3 font-mono text-xs text-[var(--text-muted)]">
								No installation, no sign-up, no code leaves your machine.
							</p>
						</div>

						<div className="hero-instrument min-w-0">
							<div className="instrument-orbit" aria-hidden="true" />
							<Readout />
							<p className="mt-5 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
								One codebase. Five dimensions. A clear next step.
							</p>
						</div>
					</div>
				</section>

				<div className="language-strip relative z-10 w-full">
					<div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-8 gap-y-4 px-4 py-6 sm:px-6">
						<span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
							Your stack, covered
						</span>
						{["Python", "TypeScript", "JavaScript", "Go", "Rust", "C++"].map(
							(language) => (
								<span
									key={language}
									className="text-sm font-semibold tracking-tight text-[var(--text-secondary)]"
								>
									{language}
								</span>
							),
						)}
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
							eyebrow="Readings"
							title="Less guesswork. More signal."
							lede="Every analyzer scores your codebase from 0-100 with an A-F grade and generates an HTML report, looking at your code from five angles."
						/>
						<div className="checks-grid grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
							{checks.map((c, index) => (
								<article
									key={c.title}
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
									The whole picture
								</span>
								<span className="my-6 text-4xl font-bold tracking-tight">
									Structure.
									<br />
									Not just style.
								</span>
								<span className="text-sm">
									Meet your analyzer <span aria-hidden="true">↗</span>
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
							eyebrow="Instruments"
							title="One engine, one analyzer per language"
							lede="The analysis algorithms live in a shared, language-agnostic Go module. Each analyzer only implements parsing and classification, so every language is graded by the same rules."
						/>
						<div className="grid gap-4 lg:grid-cols-3">
							{analyzers.map((a) => (
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
										{a.body}
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
							Complexity and duplicate code cover every language. Dead code,
							dependencies, and class design are available for Python and
							JavaScript/TypeScript today; a dimension a language does not have
							is left out of its score rather than counted as clean.
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
							eyebrow="Agent skills"
							title="Built for coding agents"
							lede="The analyzers ship Agent Skills that teach an AI agent when and how to run each analysis — health checks, refactoring, architecture review, and CI-friendly reports. They work with Claude Code, Cursor, Codex, Gemini CLI, and others."
						/>
						<div className="grid gap-6 lg:grid-cols-2">
							<div className="space-y-4">
								<CommandBlock
									label="pyscn Skills"
									command="uvx add-skills ludo-technologies/pyscn"
								/>
								<CommandBlock
									label="polyscan Skills"
									command="npx skills add ludo-technologies/polyscan"
								/>
								<CommandBlock
									label="Claude Code plugin"
									command="claude plugin marketplace add ludo-technologies/polyscan"
								/>
							</div>
							<div className="border border-[var(--border-light)] bg-[var(--bg-card)] p-5">
								<h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--text-muted)]">
									Then just ask
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
							Continuous monitoring
						</p>
						<h2
							id="bot-title"
							className="type-display mb-3 text-2xl font-bold text-[var(--text-primary)] sm:text-3xl"
						>
							Measure it once with the CLI. Track it every week with the App.
						</h2>
						<p className="mb-6 max-w-3xl text-[var(--text-secondary)]">
							The GitHub App measures complexity, duplication, dead code, and
							dependencies across your entire repository every week. It tracks
							structural decay over time, reports what to fix first in a GitHub
							Issue, and catches new problems on pull requests. Weekly
							measurement is free for every repository.
						</p>
						<div className="flex flex-wrap gap-3">
							<a
								href={LINKS.pyscnBot}
								className="inline-flex border border-[var(--brand-blue)] bg-[var(--brand-blue)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--brand-blue-hover)]"
							>
								Start weekly measurement →
							</a>
							<a
								href={LINKS.pyscnBotRepo}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex border border-[var(--brand-blue)] bg-white px-5 py-2.5 text-sm font-semibold text-[var(--brand-blue)] transition-colors hover:bg-[var(--brand-blue-light)]/40"
							>
								Source on GitHub
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
							eyebrow="FAQ"
							title="Frequently asked questions"
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
								Run it now
							</p>
						</div>
						<div className="pt-6">
							<h2 className="type-display mb-3 text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">
								Score your codebase in one command
							</h2>
							<p className="mb-6 max-w-xl text-[var(--text-secondary)]">
								Run it on the repository you are working in right now — it takes
								seconds and installs nothing.
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
