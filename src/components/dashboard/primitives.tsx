import type { CSSProperties, ReactNode } from "react";
import { TONE_COLOR, type Tone } from "@/lib/dashboard/grades";

/* Instrument-panel primitives shared by the dashboard pages. */

export function Silkscreen({
	children,
	className = "",
}: {
	children: ReactNode;
	className?: string;
}) {
	return (
		<p
			className={`font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--text-muted)] ${className}`}
		>
			{children}
		</p>
	);
}

/* Sharp 1px panel; `tone` adds the 2px colored top edge a reading wears. */
export function Panel({
	children,
	className = "",
	tone,
}: {
	children: ReactNode;
	className?: string;
	tone?: Tone;
}) {
	const style: CSSProperties | undefined = tone
		? { borderTopWidth: 2, borderTopColor: TONE_COLOR[tone] }
		: undefined;
	return (
		<div
			className={`border border-[var(--border-light)] bg-[var(--bg-card)] ${className}`}
			style={style}
		>
			{children}
		</div>
	);
}

export function Chip({
	children,
	tone = "neutral",
}: {
	children: ReactNode;
	tone?: Tone;
}) {
	return (
		<span
			className="inline-flex border border-[var(--border-subtle)] bg-[var(--bg-subtle)] px-2 py-0.5 font-mono text-[11px] font-bold tracking-wide"
			style={{ color: TONE_COLOR[tone] }}
		>
			{children}
		</span>
	);
}

export function PanelTitle({ children }: { children: ReactNode }) {
	return (
		<h3 className="text-base font-semibold text-[var(--text-primary)]">
			{children}
		</h3>
	);
}

export const textLinkClass =
	"font-mono text-xs uppercase tracking-[0.15em] text-[var(--text-secondary)] transition-colors hover:text-[var(--brand-blue)]";

export const primaryButtonClass =
	"inline-flex items-center justify-center border border-[var(--brand-blue)] bg-[var(--brand-blue)] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[var(--brand-blue-hover)]";

export const secondaryButtonClass =
	"inline-flex items-center border border-[var(--border-light)] bg-[var(--bg-card)] px-4 py-2 font-mono text-sm font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--brand-blue)] hover:text-[var(--brand-blue)]";
