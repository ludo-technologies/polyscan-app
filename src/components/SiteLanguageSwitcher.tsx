"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const LANGUAGE_NAMES: Record<(typeof routing.locales)[number], string> = {
	en: "English",
	ja: "日本語",
	zh: "中文",
};

export default function SiteLanguageSwitcher() {
	const locale = useLocale();
	const pathname = usePathname();
	const t = useTranslations("siteHeader");

	return (
		<nav
			aria-label={t("languagesAria")}
			className="flex min-h-11 items-center gap-1.5 font-mono text-xs"
		>
			{routing.locales.map((l, index) => (
				<span key={l} className="flex items-center gap-1.5">
					{index > 0 && (
						<span aria-hidden="true" className="text-[var(--text-muted)]">
							/
						</span>
					)}
					<Link
						href={pathname}
						locale={l}
						aria-current={l === locale ? "page" : undefined}
						className={
							l === locale
								? "font-bold text-[var(--brand-blue)]"
								: "text-[var(--text-secondary)] transition-colors hover:text-[var(--brand-blue)]"
						}
					>
						{LANGUAGE_NAMES[l]}
					</Link>
				</span>
			))}
		</nav>
	);
}
