import Link from "next/link";
import { getTranslations } from "next-intl/server";
import FooterShell from "@/components/FooterShell";
import { Link as LocaleLink } from "@/i18n/navigation";
import { LINKS } from "@/lib/links";
import BotWordmark from "./pyscn-bot/BotWordmark";

type FooterLink =
	| { key: string; kind: "home"; hash: string }
	/** Localized page, reached through the locale-aware link. */
	| { key: string; kind: "localized"; href: string }
	/** English-only page: never takes a locale prefix. */
	| { key: string; kind: "page"; href: string }
	| { key: string; kind: "external"; href: string };

const productLinks: FooterLink[] = [
	{ key: "features", kind: "home", hash: "features" },
	{ key: "agent", kind: "home", hash: "agent" },
	{ key: "pricing", kind: "home", hash: "pricing" },
	{ key: "faq", kind: "home", hash: "faq" },
	{ key: "howItWorks", kind: "localized", href: "/pyscn-bot/how-it-works" },
	{ key: "blog", kind: "page", href: "/blog" },
];

const resourceLinks: FooterLink[] = [
	{ key: "documentation", kind: "external", href: LINKS.docs },
	{ key: "polyscanOnGitHub", kind: "external", href: LINKS.monorepo },
	{ key: "pyscnOnGitHub", kind: "external", href: LINKS.pyscn },
	{ key: "ludoTechnologies", kind: "external", href: LINKS.org },
];

const legalLinks: FooterLink[] = [
	{ key: "privacy", kind: "localized", href: "/pyscn-bot/privacy" },
	{ key: "terms", kind: "localized", href: "/pyscn-bot/terms" },
	{ key: "sitePrivacy", kind: "page", href: "/privacy" },
	{ key: "siteTerms", kind: "page", href: "/terms" },
];

const linkClass =
	"text-[var(--text-secondary)] transition-colors hover:text-[var(--brand-blue)]";

const headingClass =
	"mb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--text-secondary)]";

export default async function Footer() {
	const t = await getTranslations("siteFooter");

	function renderLink(link: FooterLink) {
		const label = t(link.key);
		switch (link.kind) {
			case "home":
				return (
					<LocaleLink
						href={{ pathname: "/", hash: link.hash }}
						className={linkClass}
					>
						{label}
					</LocaleLink>
				);
			case "localized":
				return (
					<LocaleLink href={link.href} className={linkClass}>
						{label}
					</LocaleLink>
				);
			case "page":
				return (
					<Link href={link.href} className={linkClass}>
						{label}
					</Link>
				);
			case "external":
				return (
					<a
						href={link.href}
						target="_blank"
						rel="noopener noreferrer"
						className={linkClass}
					>
						{label}
					</a>
				);
		}
	}

	const columns = [
		{ heading: "product", links: productLinks },
		{ heading: "resources", links: resourceLinks },
		{ heading: "legal", links: legalLinks },
	];

	return (
		<FooterShell className="[&_li>a]:inline-block [&_li>a]:py-1">
			<div className="mb-12 flex flex-col items-start justify-between gap-6 border-b border-[var(--border-subtle)] pb-10 sm:mb-14 sm:flex-row sm:gap-12 sm:pb-12">
				<LocaleLink href="/" className="inline-flex">
					<BotWordmark className="text-3xl sm:text-4xl" />
				</LocaleLink>
				<p className="max-w-sm text-xl leading-relaxed tracking-tight text-[var(--text-secondary)] sm:text-2xl">
					{t("tagline")}
				</p>
			</div>

			<div className="mb-14 grid grid-cols-2 gap-x-6 gap-y-10 text-sm md:grid-cols-4 md:gap-10">
				{columns.map((column) => (
					<div key={column.heading}>
						<h4 className={headingClass}>{t(column.heading)}</h4>
						<ul className="space-y-2">
							{column.links.map((link) => (
								<li key={link.key}>{renderLink(link)}</li>
							))}
						</ul>
					</div>
				))}

				<div className="min-w-0">
					<h4 className={headingClass}>{t("contact")}</h4>
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
						<li>
							<LocaleLink href="/pyscn-bot/contact" className={linkClass}>
								{t("contactForm")}
							</LocaleLink>
						</li>
					</ul>
				</div>
			</div>
		</FooterShell>
	);
}
