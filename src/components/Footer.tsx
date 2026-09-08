import Link from "next/link";
import { getTranslations } from "next-intl/server";
import FooterShell from "@/components/FooterShell";
import { Link as LocaleLink } from "@/i18n/navigation";
import { LINKS } from "@/lib/links";

type FooterLink =
	| { key: string; kind: "home"; hash: string }
	| { key: string; kind: "page"; href: string }
	| { key: string; kind: "external"; href: string };

const productLinks: FooterLink[] = [
	{ key: "whatYouGet", kind: "home", hash: "what-you-get" },
	{ key: "analyzers", kind: "home", hash: "analyzers" },
	{ key: "aiAgents", kind: "home", hash: "agents" },
	{ key: "githubApp", kind: "home", hash: "bot" },
	{ key: "blog", kind: "page", href: "/blog" },
	{ key: "faq", kind: "home", hash: "faq" },
];

const resourceLinks: FooterLink[] = [
	{ key: "documentation", kind: "external", href: LINKS.docs },
	{ key: "githubApp", kind: "external", href: LINKS.pyscnBot },
	{ key: "polyscanOnGitHub", kind: "external", href: LINKS.monorepo },
	{ key: "pyscnOnGitHub", kind: "external", href: LINKS.pyscn },
	{ key: "ludoTechnologies", kind: "external", href: LINKS.org },
];

const legalLinks: { key: string; href: string }[] = [
	{ key: "privacy", href: "/privacy" },
	{ key: "terms", href: "/terms" },
];

export default async function Footer() {
	const t = await getTranslations("siteFooter");

	return (
		<FooterShell className="[&_li>a]:inline-block [&_li>a]:py-1">
			<div className="mb-12 flex flex-col items-start justify-between gap-6 border-b border-[var(--border-subtle)] pb-10 sm:mb-14 sm:flex-row sm:gap-12 sm:pb-12">
				<LocaleLink
					href="/"
					className="type-display inline-flex items-baseline"
				>
					<span className="text-3xl font-bold text-[var(--text-primary)] sm:text-4xl">
						Poly
					</span>
					<span className="text-3xl font-bold text-[var(--brand-blue)] sm:text-4xl">
						scan
					</span>
				</LocaleLink>
				<p className="max-w-sm text-xl leading-relaxed tracking-tight text-[var(--text-secondary)] sm:text-2xl">
					{t("tagline")}
				</p>
			</div>

			<div className="mb-14 grid grid-cols-2 gap-x-6 gap-y-10 text-sm md:grid-cols-[1fr_1.4fr_1.4fr_1fr] md:gap-10 [&_h4]:text-[var(--text-secondary)]">
				<div>
					<h4 className="mb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--text-muted)]">
						{t("product")}
					</h4>
					<ul className="space-y-2">
						{productLinks.map((link) => (
							<li key={link.key}>
								{link.kind === "home" ? (
									<LocaleLink
										href={{ pathname: "/", hash: link.hash }}
										className="text-[var(--text-secondary)] transition-colors hover:text-[var(--brand-blue)]"
									>
										{t(link.key)}
									</LocaleLink>
								) : link.kind === "page" ? (
									<Link
										href={link.href}
										className="text-[var(--text-secondary)] transition-colors hover:text-[var(--brand-blue)]"
									>
										{t(link.key)}
									</Link>
								) : null}
							</li>
						))}
					</ul>
				</div>

				<div>
					<h4 className="mb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--text-muted)]">
						{t("resources")}
					</h4>
					<ul className="space-y-2">
						{resourceLinks.map((link) =>
							link.kind === "external" ? (
								<li key={link.key}>
									<a
										href={link.href}
										target="_blank"
										rel="noopener noreferrer"
										className="text-[var(--text-secondary)] transition-colors hover:text-[var(--brand-blue)]"
									>
										{t(link.key)}
									</a>
								</li>
							) : null,
						)}
					</ul>
				</div>

				<div className="min-w-0">
					<h4 className="mb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--text-muted)]">
						{t("contact")}
					</h4>
					<ul className="space-y-2 text-[var(--text-secondary)]">
						<li>{t("location")}</li>
						<li>
							<a
								href={`mailto:${LINKS.contactEmail}`}
								className="break-words transition-colors hover:text-[var(--brand-blue)]"
							>
								{LINKS.contactEmail}
							</a>
						</li>
					</ul>
				</div>

				<div>
					<h4 className="mb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--text-muted)]">
						{t("legal")}
					</h4>
					<ul className="space-y-2">
						{legalLinks.map((link) => (
							<li key={link.key}>
								<Link
									href={link.href}
									className="text-[var(--text-secondary)] transition-colors hover:text-[var(--brand-blue)]"
								>
									{t(link.key)}
								</Link>
							</li>
						))}
					</ul>
				</div>
			</div>
		</FooterShell>
	);
}
