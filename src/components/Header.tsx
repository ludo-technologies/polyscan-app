"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import { Link as LocaleLink } from "@/i18n/navigation";
import { LINKS } from "@/lib/links";
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

const linkClass =
	"inline-flex min-h-11 items-center rounded-md px-3 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-subtle)] hover:text-[var(--brand-blue)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-blue)]";

export default function Header({
	languageSwitcher = false,
}: {
	languageSwitcher?: boolean;
}) {
	const t = useTranslations("siteHeader");
	const [menuOpen, setMenuOpen] = useState(false);
	const menuButton = useRef<HTMLButtonElement>(null);

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
		<header className="sticky top-0 z-50 border-b border-[var(--border-light)]/70 bg-[var(--bg-body)]/90 backdrop-blur-xl">
			<div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-x-4 px-4 py-3 sm:px-6 md:py-4">
				<LocaleLink
					href="/"
					onClick={() => setMenuOpen(false)}
					className="type-display inline-flex min-h-11 items-center gap-3 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-blue)]"
				>
					<span
						className="flex size-9 items-center justify-center rounded-lg bg-[var(--brand-blue)] text-white shadow-sm"
						aria-hidden="true"
					>
						<svg
							aria-hidden="true"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
						>
							<path
								d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5"
								stroke="currentColor"
								strokeWidth="1.5"
							/>
							<path
								d="M7 15V9h3v6m4 2V7h3v10"
								stroke="currentColor"
								strokeWidth="2"
							/>
						</svg>
					</span>
					<span className="text-xl font-bold tracking-tight text-[var(--text-primary)]">
						Poly<span className="text-[var(--brand-blue)]">scan</span>
					</span>
				</LocaleLink>
				<button
					ref={menuButton}
					type="button"
					aria-expanded={menuOpen}
					aria-controls="primary-navigation"
					onClick={() => setMenuOpen(!menuOpen)}
					className="inline-flex min-h-11 items-center gap-2 rounded-md border border-[var(--border-subtle)] px-3 font-mono text-xs text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-blue)] md:hidden"
				>
					{menuOpen ? t("close") : t("menu")}
					<svg
						aria-hidden="true"
						width="16"
						height="16"
						viewBox="0 0 16 16"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.5"
					>
						<path d={menuOpen ? "M4 4l8 8M12 4l-8 8" : "M2 5h12M2 11h12"} />
					</svg>
				</button>
				<nav
					id="primary-navigation"
					aria-label={t("primaryNav")}
					onKeyDown={(event) => {
						if (event.key === "Escape" && menuOpen) {
							setMenuOpen(false);
							menuButton.current?.focus();
						}
					}}
					className={`${menuOpen ? "block" : "hidden"} w-full border-t border-[var(--border-subtle)] pt-3 mt-3 md:mt-0 md:block md:w-auto md:border-0 md:pt-0`}
				>
					<ul className="flex flex-col gap-1 md:flex-row md:items-center md:gap-2">
						{navLinks.map((link) => (
							<li key={link.id}>
								{link.kind === "external" ? (
									<a
										href={link.href}
										target="_blank"
										rel="noopener noreferrer"
										onClick={() => setMenuOpen(false)}
										className={
											"accent" in link && link.accent
												? "inline-flex min-h-11 w-full items-center justify-between gap-3 rounded-md bg-[var(--brand-blue)] px-4 text-sm font-medium text-white transition-colors hover:bg-[var(--brand-blue-hover)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-blue)] md:ml-3 md:w-auto"
												: linkClass
										}
									>
										{renderLinkLabel(link)}
									</a>
								) : link.kind === "home" ? (
									<LocaleLink
										href={{ pathname: "/", hash: "analyzers" }}
										onClick={() => setMenuOpen(false)}
										className={linkClass}
									>
										{renderLinkLabel(link)}
									</LocaleLink>
								) : (
									<Link
										href="/blog"
										onClick={() => setMenuOpen(false)}
										className={linkClass}
									>
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
					</ul>
				</nav>
			</div>
		</header>
	);
}
