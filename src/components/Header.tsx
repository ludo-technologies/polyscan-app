"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Link as LocaleLink } from "@/i18n/navigation";
import { LINKS } from "@/lib/links";
import HeaderShell, {
	accentLinkClass,
	BrandTile,
	brandLinkClass,
	linkClass,
} from "./HeaderShell";
import SiteLanguageSwitcher from "./SiteLanguageSwitcher";

type NavLink =
	| { id: "analyzers"; kind: "home" }
	| { id: "blog"; kind: "blog" }
	| { id: "docs"; kind: "external"; href: string }
	| { id: "github"; kind: "external"; href: string; accent: true };

// "blog" intentionally uses the default locale prefix: the blog is
// English-only, so a locale-prefixed path like /ja/blog would 404.
const navLinks: NavLink[] = [
	{ id: "analyzers", kind: "home" },
	{ id: "blog", kind: "blog" },
	{ id: "docs", kind: "external", href: LINKS.docs },
	{ id: "github", kind: "external", href: LINKS.monorepo, accent: true },
];

export default function Header({
	languageSwitcher = false,
}: {
	languageSwitcher?: boolean;
}) {
	const t = useTranslations("siteHeader");

	function renderLinkLabel(link: NavLink) {
		return (
			<>
				{t(`nav.${link.id}`)}
				{link.kind === "external" && "accent" in link && (
					<svg
						aria-hidden="true"
						width="14"
						height="14"
						viewBox="0 0 16 16"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.5"
					>
						<path d="M4 12l8-8M4 4h8v8" />
					</svg>
				)}
			</>
		);
	}

	return (
		<HeaderShell
			brand={(close) => (
				<LocaleLink
					href="/"
					onClick={close}
					className={`type-display ${brandLinkClass}`}
				>
					<BrandTile />
					<span className="text-xl font-bold tracking-tight text-[var(--text-primary)]">
						Poly<span className="text-[var(--brand-blue)]">scan</span>
					</span>
				</LocaleLink>
			)}
		>
			{(close) => (
				<>
					{navLinks.map((link) => (
						<li key={link.id}>
							{link.kind === "external" ? (
								<a
									href={link.href}
									target="_blank"
									rel="noopener noreferrer"
									onClick={close}
									className={
										"accent" in link && link.accent
											? accentLinkClass
											: linkClass
									}
								>
									{renderLinkLabel(link)}
								</a>
							) : link.kind === "home" ? (
								<LocaleLink
									href={{ pathname: "/", hash: "analyzers" }}
									onClick={close}
									className={linkClass}
								>
									{renderLinkLabel(link)}
								</LocaleLink>
							) : (
								<Link href="/blog" onClick={close} className={linkClass}>
									{renderLinkLabel(link)}
								</Link>
							)}
						</li>
					))}
					{languageSwitcher && (
						<li className="md:ml-2">
							<SiteLanguageSwitcher />
						</li>
					)}
				</>
			)}
		</HeaderShell>
	);
}
