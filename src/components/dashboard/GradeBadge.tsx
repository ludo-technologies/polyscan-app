import { GRADE_TONE, type Grade, TONE_COLOR } from "@/lib/dashboard/grades";

const SIZE_CLASS = {
	sm: "size-6 text-xs",
	lg: "size-12 text-xl",
} as const;

export default function GradeBadge({
	grade,
	size = "sm",
}: {
	grade: Grade;
	size?: keyof typeof SIZE_CLASS;
}) {
	const color = TONE_COLOR[GRADE_TONE[grade]];
	return (
		<span
			className={`inline-flex items-center justify-center border bg-[var(--bg-card)] font-mono font-bold ${SIZE_CLASS[size]}`}
			style={{ color, borderColor: color }}
		>
			{grade}
		</span>
	);
}
