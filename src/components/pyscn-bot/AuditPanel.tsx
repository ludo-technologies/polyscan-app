import ReadoutFrame from "@/components/ReadoutFrame";

/* Audit-agent readout, the landing page's signature element: the weekly
   health trend, then the agent verifying analyzer findings by reading the
   code. Shown in English in every locale, like a real agent log. */

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

const TRACE = [
	{
		read: "api/handlers.py:190-262",
		confirmed: true,
		verdict: "CC 31, three jobs in one function",
	},
	{
		read: "services/user.py:45-62 + admin.py:23-40",
		confirmed: true,
		verdict: "87% clone, same validation twice",
	},
	{
		read: "core/plugins.py:1-44",
		confirmed: false,
		verdict: '"dead code" is a documented plugin hook',
	},
];

export default function AuditPanel() {
	const last = WEEKS.length - 1;

	return (
		<ReadoutFrame
			ariaLabel="Sample run of the audit agent"
			label="Audit agent"
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

			<p className="border-b border-white/[0.07] px-5 py-3 font-mono text-xs text-[var(--panel-muted)] sm:px-6">
				<span aria-hidden="true">$ </span>polyscan analyze .{" "}
				<span className="text-white/85">→ 142 findings</span>
			</p>

			<ul className="px-5 py-2 sm:px-6">
				{TRACE.map((step) => (
					<li
						key={step.read}
						className="border-b border-white/[0.07] py-3 font-mono text-xs last:border-b-0"
					>
						<p className="truncate text-[var(--panel-muted)]">
							read_file {step.read}
						</p>
						<p className="mt-1.5 flex items-baseline gap-2">
							<span
								className="shrink-0 text-[10px] uppercase tracking-[0.12em]"
								style={{
									color: step.confirmed
										? "var(--panel-warn)"
										: "var(--panel-ok)",
								}}
							>
								{step.confirmed ? "▲ confirmed" : "● dismissed"}
							</span>
							<span className="min-w-0">{step.verdict}</span>
						</p>
					</li>
				))}
			</ul>

			<div className="border-t border-white/10 bg-black/20 px-5 py-4 font-mono text-[11px] text-[var(--panel-muted)] sm:px-6">
				142 findings → 6 recommendations · filed as GitHub Issue
			</div>
		</ReadoutFrame>
	);
}
