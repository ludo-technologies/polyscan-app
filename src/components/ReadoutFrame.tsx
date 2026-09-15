import type { ReactNode } from "react";

/* Ink readout panel frame: window chrome with traffic lights, a mono label
   and a badge. Surface styling and --panel-* tokens live in .readout-panel. */
export default function ReadoutFrame({
	ariaLabel,
	label,
	badge,
	badgeHidden = false,
	children,
}: {
	ariaLabel: string;
	label: string;
	badge: string;
	/** Decorative badge (e.g. a fake report number) hidden from AT. */
	badgeHidden?: boolean;
	children: ReactNode;
}) {
	return (
		<figure aria-label={ariaLabel} className="readout-panel text-left">
			<figcaption className="flex min-w-0 flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-white/[0.025] px-5 py-3.5">
				<div className="flex min-w-0 items-center gap-3">
					<div aria-hidden="true" className="flex shrink-0 gap-1.5">
						<span className="size-2 rounded-full bg-[#e98585]" />
						<span className="size-2 rounded-full bg-[#e9c078]" />
						<span className="size-2 rounded-full bg-[#79baa3]" />
					</div>
					<span className="font-mono text-[10px] tracking-wider text-[var(--panel-muted)]">
						{label}
					</span>
				</div>
				<span
					aria-hidden={badgeHidden || undefined}
					className="rounded border border-[var(--panel-accent)]/25 bg-[var(--panel-accent)]/10 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--panel-accent)]"
				>
					{badge}
				</span>
			</figcaption>
			{children}
		</figure>
	);
}
