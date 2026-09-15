/* Section opener shared by the landing pages: rule + ruler ticks, silkscreen
   eyebrow, display title, optional lede. */
export default function SectionHead({
	id,
	eyebrow,
	title,
	lede,
}: {
	id: string;
	eyebrow: string;
	title: string;
	lede?: string;
}) {
	return (
		<>
			<div className="border-t border-[var(--border-light)]">
				<div className="ruler-ticks" aria-hidden="true" />
			</div>
			<p className="mt-4 font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--text-muted)]">
				{eyebrow}
			</p>
			<h2
				id={id}
				className="type-display mt-3 mb-3 text-3xl font-bold text-[var(--text-primary)] sm:text-4xl"
			>
				{title}
			</h2>
			{lede && (
				<p className="mb-10 max-w-3xl text-[var(--text-secondary)]">{lede}</p>
			)}
		</>
	);
}
