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
			className="fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-40 overflow-hidden rounded-xl border border-white/15 bg-[radial-gradient(ellipse_at_top_right,#174b9c,transparent_75%)] bg-[#0b1629] p-4 text-white shadow-[0_16px_48px_-12px_#0b162966] motion-safe:animate-[surface-in_650ms_250ms_both] sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-80 sm:p-5"
		>
			<button
				type="button"
				onClick={dismiss}
				aria-label="Dismiss GitHub App promotion"
				className="absolute top-1 right-1 flex size-11 items-center justify-center rounded-lg font-mono text-xl leading-none text-[#b7c6df] transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-white"
			>
				&times;
			</button>
			<div className="pr-6 sm:pr-5">
				<div className="min-w-0 flex-1">
					<p className="mb-2 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-[#81b3ff] sm:mb-3 sm:text-[10px]">
						<span
							aria-hidden="true"
							className="size-1.5 rounded-full bg-[#81b3ff] shadow-[0_0_0_4px_#81b3ff15]"
						/>
						GitHub App
					</p>
					<p className="type-display text-base font-bold tracking-tight sm:text-xl">
						Track code quality
					</p>
					<p className="mt-2 hidden text-sm leading-relaxed text-[#b7c6df] sm:block">
						Get a code quality report every week, automatically.
					</p>
				</div>
				<a
					href={LINKS.pyscnBot}
					className="mt-3 inline-flex min-h-11 w-full items-center justify-between gap-3 rounded-md bg-[var(--brand-blue)] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[var(--brand-blue-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:mt-5 sm:text-sm"
				>
					<span>Start for free</span>
					<span aria-hidden="true">&rarr;</span>
				</a>
			</div>
		</aside>
	);
}
