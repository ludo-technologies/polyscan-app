import { useTranslations } from "next-intl";
import type { ReactNode } from "react";

/**
 * Shared frame for every footer: top rule, ruler ticks, container, and the
 * copyright row. The site and pyscn-bot footers supply their own link layouts.
 */
export default function FooterShell({
	children,
	className = "",
}: {
	children: ReactNode;
	className?: string;
}) {
	const t = useTranslations("siteFooter");

	return (
		<footer
			className={`border-t border-[var(--border-light)] bg-[var(--bg-card)] [&_a]:rounded-sm [&_a]:focus-visible:outline-2 [&_a]:focus-visible:outline-offset-4 [&_a]:focus-visible:outline-[var(--brand-blue)] ${className}`}
		>
			<div className="ruler-ticks" aria-hidden="true" />
			<div className="mx-auto w-full max-w-6xl px-4 pb-8 pt-12 sm:px-6">
				{children}
				<div className="flex flex-col items-start justify-between gap-3 border-t border-[var(--border-subtle)] pt-6 font-mono text-[11px] leading-relaxed text-[var(--text-secondary)] sm:flex-row sm:items-center">
					<p>© {new Date().getFullYear()} Ludo Technologies Inc.</p>
					<p>{t("allRightsReserved")}</p>
				</div>
			</div>
		</footer>
	);
}
