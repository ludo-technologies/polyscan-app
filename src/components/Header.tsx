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
import BotWordmark from "./pyscn-bot/BotWordmark";
import LanguageSwitcher from "./pyscn-bot/LanguageSwitcher";

/**
 * The one site header. `languageSwitcher` is off in the English-only tree
 * (blog, site legal), where a locale-prefixed path would 404.
 */
export default function Header({
	isLoggedIn,
	languageSwitcher = false,
}: {
	isLoggedIn: boolean;
	languageSwitcher?: boolean;
}) {
	const t = useTranslations();

	return (
		<HeaderShell
			brand={(close) => (
				<LocaleLink href="/" onClick={close} className={brandLinkClass}>
					<BrandTile />
					<BotWordmark className="text-xl tracking-tight" />
				</LocaleLink>
			)}
		>
			{(close) => (
				<>
					<li>
						<LocaleLink
							href={{ pathname: "/", hash: "features" }}
							onClick={close}
							className={linkClass}
						>
							{t("nav.features")}
						</LocaleLink>
					</li>
					<li>
						<LocaleLink
							href="/pyscn-bot/how-it-works"
							onClick={close}
							className={linkClass}
						>
							{t("nav.howItWorks")}
						</LocaleLink>
					</li>
					<li>
						<LocaleLink
							href={{ pathname: "/", hash: "pricing" }}
							onClick={close}
							className={linkClass}
						>
							{t("nav.pricing")}
						</LocaleLink>
					</li>
					<li>
						{/* The blog is English-only, so it never takes a locale prefix. */}
						<Link href="/blog" onClick={close} className={linkClass}>
							{t("nav.blog")}
						</Link>
					</li>
					<li>
						<a
							href={LINKS.docs}
							target="_blank"
							rel="noopener noreferrer"
							onClick={close}
							className={linkClass}
						>
							{t("nav.docs")}
						</a>
					</li>
					{languageSwitcher && (
						<li className="md:ml-2">
							<LanguageSwitcher />
						</li>
					)}
					<li>
						{isLoggedIn ? (
							<LocaleLink
								href="/pyscn-bot/account"
								onClick={close}
								className={accentLinkClass}
							>
								{t("nav.mypage")}
							</LocaleLink>
						) : (
							<a
								href="/pyscn-bot/api/auth?plan=free"
								className={accentLinkClass}
							>
								{t("trial.hero")}
								<span aria-hidden="true">→</span>
							</a>
						)}
					</li>
				</>
			)}
		</HeaderShell>
	);
}
