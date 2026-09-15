import ReadoutFrame from "@/components/ReadoutFrame";

/* Weekly-audit readout: the bot's signature element, on the same ink surface
   as the home page Readout. Report output is shown in English in every locale,
   the same way the real GitHub Issue reads. */

const WEEKS = [
	{ id: "w1", score: 82 },
	{ id: "w2", score: 80 },
	{ id: "w3", score: 81 },
	{ id: "w4", score: 78 },
	{ id: "w5", score: 77 },
	{ id: "w6", score: 76 },
	{ id: "w7", score: 74 },
	{ id: "w8", score: 71 },
];

const FINDINGS = [
	{ over: true, text: "CC 31  api/handlers.py:214" },
	{ over: true, text: "clone group +2  services/" },
	{ over: false, text: "dead code cleared" },
];

export default function AuditPanel() {
	const last = WEEKS.length - 1;

	return (
		<ReadoutFrame
			ariaLabel="Sample weekly audit report"
			label="Weekly audit"
			badge="report #12"
			badgeHidden
		>
			<div className="border-b border-white/10 bg-[radial-gradient(ellipse_at_top_right,rgba(70,131,221,0.15),transparent_75%)] px-5 py-6 sm:px-6">
				<div className="flex items-end justify-between gap-6">
					<div>
						<span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--panel-muted)]">
							Health
						</span>
						<div className="mt-1 flex items-baseline gap-3">
							<span className="font-mono text-5xl font-medium leading-none tracking-[-0.06em]">
								{WEEKS[last].score}
							</span>
							<span className="font-mono text-xs text-[var(--panel-warn)]">
								▼ {WEEKS[last - 1].score - WEEKS[last].score} this week
							</span>
						</div>
					</div>
					<div
						className="flex h-14 items-end gap-1"
						role="img"
						aria-label={`Health score over 8 weeks, declining from ${WEEKS[0].score} to ${WEEKS[last].score}`}
					>
						{WEEKS.map((w, i) => (
							<div
								key={w.id}
								className="gauge-fill-y w-3 rounded-t-sm"
								style={{
									height: `${w.score}%`,
									animationDelay: `${i * 70}ms`,
									backgroundColor:
										i === last ? "var(--panel-warn)" : "rgba(121,184,255,0.35)",
								}}
							/>
						))}
					</div>
				</div>
			</div>

			<ul className="px-5 py-2 sm:px-6">
				{FINDINGS.map((f) => (
					<li
						key={f.text}
						className="flex items-center gap-3 border-b border-white/[0.07] py-3 font-mono text-xs last:border-b-0"
					>
						<span
							aria-hidden="true"
							className="text-[10px]"
							style={{
								color: f.over ? "var(--panel-warn)" : "var(--panel-ok)",
							}}
						>
							{f.over ? "▲" : "●"}
						</span>
						<span className="sr-only">
							{f.over ? "over threshold:" : "resolved:"}
						</span>
						{f.text}
					</li>
				))}
			</ul>

			<div className="border-t border-white/10 bg-black/20 px-5 py-4 font-mono text-[11px] text-[var(--panel-muted)] sm:px-6">
				filed as GitHub Issue · every monday
			</div>
		</ReadoutFrame>
	);
}
