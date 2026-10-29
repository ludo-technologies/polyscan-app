import { GRADE_TONE, type Grade, TONE_COLOR } from "@/lib/dashboard/grades";

const STROKE = 10;

/* Ring meter: the fill carries the grade's tone, the track is the surface's
   next step so the whole ring reads as one gauge. */
export default function HealthGauge({
	score,
	grade,
	label,
	size = 160,
}: {
	score: number;
	grade: Grade;
	label: string;
	size?: number;
}) {
	const radius = (size - STROKE * 2) / 2;
	const circumference = 2 * Math.PI * radius;
	const rounded = Math.round(score);

	return (
		<div className="relative inline-flex items-center justify-center">
			<svg
				width={size}
				height={size}
				className="-rotate-90"
				role="img"
				aria-label={`${label}: ${rounded}`}
			>
				<circle
					cx={size / 2}
					cy={size / 2}
					r={radius}
					fill="none"
					stroke="var(--bg-subtle-hover)"
					strokeWidth={STROKE}
				/>
				<circle
					cx={size / 2}
					cy={size / 2}
					r={radius}
					fill="none"
					stroke={TONE_COLOR[GRADE_TONE[grade]]}
					strokeWidth={STROKE}
					strokeDasharray={circumference}
					strokeDashoffset={circumference * (1 - Math.min(score, 100) / 100)}
				/>
			</svg>
			<div className="absolute flex flex-col items-center">
				<span className="font-mono text-4xl font-medium leading-none tracking-[-0.04em] text-[var(--text-primary)]">
					{rounded}
				</span>
				<span className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
					{label}
				</span>
			</div>
		</div>
	);
}
