import {
	GRADE_TONE,
	GRADES,
	type Grade,
	TONE_COLOR,
} from "@/lib/dashboard/grades";
import { Panel, PanelTitle } from "./primitives";

export default function GradeDistribution({
	distribution,
	title,
}: {
	distribution: Record<Grade, number>;
	title: string;
}) {
	const total = GRADES.reduce((sum, grade) => sum + distribution[grade], 0);

	return (
		<Panel className="p-6">
			<PanelTitle>{title}</PanelTitle>
			<ul className="mt-5 space-y-3">
				{GRADES.map((grade) => {
					const count = distribution[grade];
					const color = TONE_COLOR[GRADE_TONE[grade]];
					return (
						<li key={grade} className="flex items-center gap-3">
							<span
								className="w-5 font-mono text-sm font-bold"
								style={{ color }}
							>
								{grade}
							</span>
							<div className="h-4 flex-1 bg-[var(--bg-subtle)]">
								<div
									className="h-full rounded-r-[4px]"
									style={{
										width: `${total > 0 ? (count / total) * 100 : 0}%`,
										backgroundColor: color,
									}}
								/>
							</div>
							<span className="w-8 text-right font-mono text-xs tabular-nums text-[var(--text-secondary)]">
								{count}
							</span>
						</li>
					);
				})}
			</ul>
		</Panel>
	);
}
