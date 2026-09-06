"use client";

import { useEffect, useState } from "react";
import { LINKS } from "@/lib/links";

const DISMISSED_KEY = "polyscan-app-card-dismissed";

export default function FloatingAppCard() {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		setIsVisible(localStorage.getItem(DISMISSED_KEY) !== "true");
	}, []);

	if (!isVisible) return null;

	function dismiss() {
		localStorage.setItem(DISMISSED_KEY, "true");
		setIsVisible(false);
	}

	return (
		<aside
			aria-label="Polyscan GitHub App"
			className="fixed inset-x-3 bottom-3 z-50 border border-[var(--border-light)] border-t-2 border-t-[var(--brand-blue)] bg-[var(--bg-card)] p-3 sm:inset-x-auto sm:right-5 sm:bottom-5 sm:w-80 sm:p-5"
		>
			<button
				type="button"
				onClick={dismiss}
				aria-label="Dismiss"
				className="absolute top-2 right-2 flex size-7 items-center justify-center font-mono text-lg leading-none text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)] sm:top-3 sm:right-3"
			>
				&times;
			</button>
			<div className="flex items-center gap-3 pr-7 sm:block sm:pr-5">
				<div className="min-w-0 flex-1">
					<p className="mb-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--brand-blue)] sm:mb-2 sm:text-[11px]">
						GitHub App
					</p>
					<p className="type-display text-sm font-bold text-[var(--text-primary)] sm:text-lg">
						Track structural decay
					</p>
					<p className="mt-1 text-xs text-[var(--text-secondary)] sm:text-sm">
						Measure your entire repository every week.
					</p>
				</div>
				<a
					href={LINKS.pyscnBot}
					className="shrink-0 border border-[var(--brand-blue)] bg-[var(--brand-blue)] px-4 py-2 text-xs font-semibold whitespace-nowrap text-white transition-colors hover:bg-[var(--brand-blue-hover)] sm:mt-4 sm:inline-flex sm:text-sm"
				>
					Start free &rarr;
				</a>
			</div>
		</aside>
	);
}
