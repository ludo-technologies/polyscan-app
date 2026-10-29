import { scoreTone, TONE_COLOR, type Tone } from "@/lib/dashboard/grades";
import { Panel, Silkscreen } from "./primitives";

/* One metric as a meter: reading, then the 0-100 track under it. */
export default function ScoreCard({
	label,
	score,
	caption,
	captionTone = "muted",
}: {
	label: string;
	score: number;
	caption?: string;
	captionTone?: Tone;
}) {
	const color = TONE_COLOR[scoreTone(score)];

	return (
		<Panel className="p-4">
			<Silkscreen>{label}</Silkscreen>
			<div className="mt-2 flex items-baseline gap-1.5">
				<span className="font-mono text-2xl font-medium" style={{ color }}>
					{score}
				</span>
				<span className="font-mono text-xs text-[var(--text-muted)]">
					/ 100
				</span>
			</div>
			<div className="mt-3 h-1.5 bg-[var(--bg-subtle)]">
				<div
					className="h-full"
					style={{
						width: `${Math.max(0, Math.min(score, 100))}%`,
						backgroundColor: color,
					}}
				/>
			</div>
			{caption && (
				<p
					className="mt-2 font-mono text-[11px]"
					style={{ color: TONE_COLOR[captionTone] }}
				>
					{caption}
				</p>
			)}
		</Panel>
	);
}
