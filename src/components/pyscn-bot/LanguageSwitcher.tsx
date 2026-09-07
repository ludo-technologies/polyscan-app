"use client";

import { useLocale } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const LANGUAGE_NAMES: Record<(typeof routing.locales)[number], string> = {
	en: "English",
	ja: "日本語",
	zh: "中文",
};

export default function LanguageSwitcher() {
	const locale = useLocale();
	const pathname = usePathname();
	const [open, setOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function onClickOutside(event: MouseEvent) {
			if (
				containerRef.current &&
				!containerRef.current.contains(event.target as Node)
			) {
				setOpen(false);
			}
		}
		document.addEventListener("click", onClickOutside);
		return () => document.removeEventListener("click", onClickOutside);
	}, []);

	return (
		<div className="relative" ref={containerRef}>
			<button
				type="button"
				onClick={() => setOpen((v) => !v)}
				className="flex min-w-[7.5rem] items-center justify-between gap-2 border border-[var(--border-light)] bg-[var(--bg-card)] px-3 py-2 font-mono text-xs text-[var(--text-secondary)] transition-colors hover:border-[var(--brand-blue)] hover:text-[var(--brand-blue)]"
				aria-expanded={open}
				aria-haspopup="true"
			>
				<span>{LANGUAGE_NAMES[locale as keyof typeof LANGUAGE_NAMES]}</span>
				<span aria-hidden="true" className="text-[10px]">
					{open ? "▲" : "▼"}
				</span>
			</button>

			{open && (
				<div className="absolute right-0 z-50 mt-1 w-full border border-[var(--border-light)] bg-[var(--bg-card)]">
					{routing.locales.map((l) => (
						<Link
							key={l}
							href={pathname}
							locale={l}
							onClick={() => setOpen(false)}
							className={`block px-3 py-2 font-mono text-xs transition-colors hover:bg-[var(--bg-subtle)] ${
								l === locale
									? "text-[var(--brand-blue)]"
									: "text-[var(--text-secondary)]"
							}`}
						>
							{LANGUAGE_NAMES[l]}
						</Link>
					))}
				</div>
			)}
		</div>
	);
}
