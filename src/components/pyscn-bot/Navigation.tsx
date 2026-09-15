"use client";

import { useTranslations } from "next-intl";
import HeaderShell, {
	accentLinkClass,
	BrandTile,
	brandLinkClass,
	linkClass,
} from "@/components/HeaderShell";
import { Link, usePathname } from "@/i18n/navigation";
import BotWordmark from "./BotWordmark";
import LanguageSwitcher from "./LanguageSwitcher";

interface NavigationProps {
	isLoggedIn: boolean;
}

export default function Navigation({ isLoggedIn }: NavigationProps) {
	const t = useTranslations();
	const isHomePage = usePathname() === "/pyscn-bot";
	const anchor = (hash: string) =>
		isHomePage ? `#${hash}` : `/pyscn-bot#${hash}`;

	return (
		<HeaderShell
			brand={(close) => (
				<Link href="/pyscn-bot" onClick={close} className={brandLinkClass}>
					<BrandTile />
					<BotWordmark className="text-xl tracking-tight" />
				</Link>
			)}
		>
			{(close) => (
				<>
					<li>
						<a href={anchor("features")} onClick={close} className={linkClass}>
							{t("nav.features")}
						</a>
					</li>
					<li>
						<Link
							href="/pyscn-bot/how-it-works"
							onClick={close}
							className={linkClass}
						>
							{t("nav.howItWorks")}
						</Link>
					</li>
					<li>
						<a href={anchor("pricing")} onClick={close} className={linkClass}>
							{t("nav.pricing")}
						</a>
					</li>
					<li>
						<Link
							href="/pyscn-bot/contact"
							onClick={close}
							className={linkClass}
						>
							{t("nav.contact")}
						</Link>
					</li>
					<li className="md:ml-2">
						<LanguageSwitcher />
					</li>
					<li>
						{isLoggedIn ? (
							<Link
								href="/pyscn-bot/account"
								onClick={close}
								className={accentLinkClass}
							>
								{t("nav.mypage")}
							</Link>
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
