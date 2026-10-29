export interface TrendPoint {
	date: string;
	value: number;
}

const WIDTH = 640;
const HEIGHT = 200;
const PAD = { top: 16, right: 44, bottom: 28, left: 36 };
const TICKS = [0, 25, 50, 75, 100];
const HIT_RADIUS = 12;

/* Single-series line of a 0-100 score over time, server-rendered SVG. The
   newest reading is labeled directly; every point names itself on hover and
   the table twin below carries the rest for assistive tech. */
export default function TrendChart({
	points,
	title,
	dateLabel,
	valueLabel,
}: {
	points: TrendPoint[];
	title: string;
	dateLabel: string;
	valueLabel: string;
}) {
	const plotWidth = WIDTH - PAD.left - PAD.right;
	const plotHeight = HEIGHT - PAD.top - PAD.bottom;
	const x = (index: number) =>
		points.length > 1
			? PAD.left + (index * plotWidth) / (points.length - 1)
			: PAD.left + plotWidth / 2;
	const y = (value: number) =>
		PAD.top + ((100 - Math.max(0, Math.min(value, 100))) / 100) * plotHeight;

	const coords = points.map((p, i) => [x(i), y(p.value)] as const);
	const line = coords.map(([px, py]) => `${px},${py}`).join(" ");
	const last = points.length - 1;
	const baseline = y(0);

	return (
		<figure className="overflow-x-auto">
			<svg
				viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
				className="h-auto w-full min-w-[560px]"
				role="img"
				aria-label={title}
			>
				{TICKS.map((tick) => (
					<g key={tick}>
						<line
							x1={PAD.left}
							x2={WIDTH - PAD.right}
							y1={y(tick)}
							y2={y(tick)}
							stroke="var(--border-subtle)"
							strokeWidth={1}
						/>
						<text
							x={PAD.left - 8}
							y={y(tick) + 3}
							textAnchor="end"
							fontSize={10}
							fontFamily="var(--font-mono), monospace"
							fill="var(--text-muted)"
						>
							{tick}
						</text>
					</g>
				))}

				{points.length > 1 && (
					<path
						d={`M${line.replace(/ /g, " L")} L${coords[last][0]},${baseline} L${coords[0][0]},${baseline} Z`}
						fill="var(--brand-blue)"
						fillOpacity={0.08}
					/>
				)}
				{points.length > 1 && (
					<polyline
						points={line}
						fill="none"
						stroke="var(--brand-blue)"
						strokeWidth={2}
						strokeLinejoin="round"
						strokeLinecap="round"
					/>
				)}

				{points.length > 0 && (
					<>
						<circle
							cx={coords[last][0]}
							cy={coords[last][1]}
							r={5}
							fill="var(--brand-blue)"
							stroke="var(--bg-card)"
							strokeWidth={2}
						/>
						<text
							x={coords[last][0] + 10}
							y={coords[last][1] + 4}
							fontSize={11}
							fontWeight={600}
							fontFamily="var(--font-mono), monospace"
							fill="var(--text-primary)"
						>
							{points[last].value}
						</text>
					</>
				)}

				{points.map((p, i) => (
					<circle
						key={p.date}
						cx={coords[i][0]}
						cy={coords[i][1]}
						r={HIT_RADIUS}
						fill="transparent"
					>
						<title>{`${p.date}: ${p.value}`}</title>
					</circle>
				))}

				{points.length > 0 && (
					<text
						x={coords[0][0]}
						y={HEIGHT - 8}
						textAnchor={points.length > 1 ? "start" : "middle"}
						fontSize={10}
						fontFamily="var(--font-mono), monospace"
						fill="var(--text-muted)"
					>
						{points[0].date}
					</text>
				)}
				{points.length > 1 && (
					<text
						x={coords[last][0]}
						y={HEIGHT - 8}
						textAnchor="end"
						fontSize={10}
						fontFamily="var(--font-mono), monospace"
						fill="var(--text-muted)"
					>
						{points[last].date}
					</text>
				)}
			</svg>

			<table className="sr-only">
				<caption>{title}</caption>
				<thead>
					<tr>
						<th scope="col">{dateLabel}</th>
						<th scope="col">{valueLabel}</th>
					</tr>
				</thead>
				<tbody>
					{points.map((p) => (
						<tr key={p.date}>
							<td>{p.date}</td>
							<td>{p.value}</td>
						</tr>
					))}
				</tbody>
			</table>
		</figure>
	);
}
