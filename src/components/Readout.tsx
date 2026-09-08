type Reading = {
	id: string;
	label: string;
	value: string;
	/** Bar length as a fraction of the gauge, 0–1. */
	level: number;
	over: boolean;
};

const READINGS: Reading[] = [
	{
		id: "CC",
		label: "Cyclomatic complexity",
		value: "max 31",
		level: 0.78,
		over: true,
	},
	{ id: "DUP", label: "Duplication", value: "8.2%", level: 0.62, over: true },
	{
		id: "DEAD",
		label: "Dead code",
		value: "0 blocks",
		level: 0.04,
		over: false,
	},
	{
		id: "DEP",
		label: "Dependency cycles",
		value: "2 cycles",
		level: 0.4,
		over: true,
	},
	{
		id: "CBO",
		label: "Class coupling",
		value: "max 9",
		level: 0.3,
		over: false,
	},
];

const HEALTH = 74;

export default function Readout() {
	return (
		<figure
			aria-label="Sample pyscn analysis readout"
			className="readout-panel relative isolate min-w-0 overflow-hidden rounded-2xl border border-white/15 bg-[var(--panel-bg)] text-[var(--panel-text)] shadow-[0_24px_64px_-20px_rgba(2,8,23,0.65),inset_0_1px_0_rgba(255,255,255,0.06)] [--panel-accent:#79b8ff] [--panel-bg:#0b1425] [--panel-muted:#9cacc3] [--panel-ok:#6ee7ba] [--panel-text:#edf4ff] [--panel-warn:#fbbf77]"
		>
			<figcaption className="flex min-w-0 flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-white/[0.025] px-5 py-3.5">
				<div className="flex min-w-0 items-center gap-3">
					<div aria-hidden="true" className="flex shrink-0 gap-1.5">
						<span className="size-2 rounded-full bg-[#e98585]" />
						<span className="size-2 rounded-full bg-[#e9c078]" />
						<span className="size-2 rounded-full bg-[#79baa3]" />
					</div>
					<span className="font-mono text-[10px] tracking-wider text-[var(--panel-muted)]">
						pyscn / structural readout
					</span>
				</div>
				<span className="rounded border border-[var(--panel-accent)]/25 bg-[var(--panel-accent)]/10 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--panel-accent)]">
					Sample run
				</span>
			</figcaption>

			<div className="flex min-w-0 flex-wrap items-center gap-5 border-b border-white/10 bg-[radial-gradient(ellipse_at_top_right,rgba(70,131,221,0.15),transparent_75%)] px-5 py-6 sm:gap-7 sm:px-6">
				<div className="relative grid size-36 shrink-0 place-items-center">
					<svg
						viewBox="0 0 144 144"
						aria-hidden="true"
						className="absolute inset-0 size-full -rotate-90"
					>
						<circle
							cx="72"
							cy="72"
							r="70"
							fill="none"
							stroke="currentColor"
							className="text-white/10"
						/>
						<circle
							cx="72"
							cy="72"
							r="59"
							fill="none"
							stroke="currentColor"
							strokeWidth="7"
							className="text-white/[0.07]"
						/>
						<circle
							cx="72"
							cy="72"
							r="59"
							fill="none"
							stroke="currentColor"
							strokeWidth="7"
							strokeLinecap="round"
							pathLength="100"
							strokeDasharray="100"
							strokeDashoffset={100 - HEALTH}
							className="score-ring text-[var(--panel-accent)] motion-safe:animate-[readout-score-fill_1.2s_cubic-bezier(0.22,1,0.36,1)_both]"
						/>
					</svg>
					<div className="text-center">
						<span className="sr-only">Health score: </span>
						<span className="block font-mono text-5xl font-medium tracking-[-0.06em]">
							{HEALTH}
						</span>
						<span className="mt-1 block font-mono text-[10px] text-[var(--panel-muted)]">
							/ 100
						</span>
					</div>
				</div>
				<div className="min-w-0 flex-1 basis-36">
					<p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--panel-muted)]">
						Codebase health
					</p>
					<div className="mt-2 flex items-center gap-3">
						<p className="text-2xl font-semibold tracking-tight">Grade B</p>
						<span aria-hidden="true" className="h-px flex-1 bg-white/10" />
					</div>
					<p className="mt-2 text-xs leading-relaxed text-[var(--panel-muted)]">
						A structural snapshot.
						<br />
						See where to look next.
					</p>
					<p className="mt-4 font-mono text-[10px] text-[var(--panel-warn)]">
						{READINGS.filter((r) => r.over).length} metrics over threshold
					</p>
				</div>
			</div>

			<div className="flex items-center justify-between gap-3 px-5 pb-1 pt-4 font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--panel-muted)] sm:px-6">
				<span>Structural metrics</span>
				<span>{String(READINGS.length).padStart(2, "0")} checks</span>
			</div>
			<dl className="px-5 pb-3 sm:px-6">
				{READINGS.map((r, index) => (
					<div
						key={r.id}
						className="grid min-w-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-2.5 border-b border-white/[0.07] py-3 last:border-b-0"
					>
						<dt className="flex min-w-0 items-center gap-2.5">
							<span className="w-9 shrink-0 font-mono text-[9px] tracking-wide text-[var(--panel-muted)]">
								{r.id}
							</span>
							<span className="min-w-0 text-xs leading-relaxed">{r.label}</span>
						</dt>
						<dd className="font-mono text-xs tabular-nums">{r.value}</dd>
						<dd
							className="col-span-2 flex min-w-0 items-center gap-3"
							style={{
								color: r.over ? "var(--panel-warn)" : "var(--panel-ok)",
							}}
						>
							<div
								aria-hidden="true"
								className="h-1 min-w-0 flex-1 overflow-hidden rounded-full bg-white/[0.07]"
							>
								<div
									className="gauge-fill h-full rounded-full bg-current"
									style={{
										width: `${r.level * 100}%`,
										animationDelay: `${200 + index * 100}ms`,
									}}
								/>
							</div>
							<span className="w-28 shrink-0 text-right font-mono text-[9px]">
								{r.over ? "Over threshold" : "Within threshold"}
							</span>
						</dd>
					</div>
				))}
			</dl>

			<div className="min-w-0 border-t border-white/10 bg-black/20 px-5 py-4 sm:px-6">
				<p className="mb-2 font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--panel-muted)]">
					Run it on your codebase
				</p>
				<p className="flex min-w-0 items-start gap-2 font-mono text-[11px] leading-relaxed sm:text-xs">
					<span
						aria-hidden="true"
						className="select-none text-[var(--panel-ok)]"
					>
						$
					</span>
					<code className="min-w-0 break-words">
						uvx pyscn@latest analyze .
					</code>
				</p>
			</div>
		</figure>
	);
}
