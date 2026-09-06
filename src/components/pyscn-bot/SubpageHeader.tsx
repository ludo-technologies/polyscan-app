import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";

/* Shared header for polyscan subpages (how-it-works, contact, legal):
   back link, silkscreen eyebrow, display title, optional lede. */
export default function SubpageHeader({
	backLabel,
	eyebrow,
	title,
	lede,
}: {
	backLabel: string;
	eyebrow: string;
	title: string;
	lede?: ReactNode;
}) {
	return (
		<header className="mb-12">
			<Link
				href="/pyscn-bot"
				className="mb-8 inline-flex font-mono text-xs uppercase tracking-[0.15em] text-[var(--text-secondary)] transition-colors hover:text-[var(--brand-blue)]"
			>
				← {backLabel}
			</Link>
			<p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--text-muted)]">
				{eyebrow}
			</p>
			<h1 className="type-display mt-3 text-4xl font-bold text-[var(--text-primary)] sm:text-5xl">
				{title}
			</h1>
			{lede && (
				<p className="mt-4 max-w-2xl text-[var(--text-secondary)]">{lede}</p>
			)}
		</header>
	);
}
