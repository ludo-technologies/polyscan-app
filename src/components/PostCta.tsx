import Link from "next/link";
import { LINKS } from "@/lib/links";

export default function PostCta() {
	return (
		<aside
			aria-label="Try pyscn"
			className="mt-14 border border-[var(--border-subtle)] p-6 sm:p-8"
		>
			<p className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
				Try it on your repository
			</p>
			<h2 className="mb-3 text-xl font-bold tracking-tight text-[var(--text-primary)]">
				See what Ruff, mypy, and pytest miss
			</h2>
			<p className="mb-4 leading-relaxed text-[var(--text-secondary)]">
				pyscn reports duplicated code, complexity, dead code, and dependency
				violations in Python. It runs as a CLI, as an MCP server your agent can
				call mid-session, and as a GitHub App that comments on every pull
				request.
			</p>
			<pre className="mb-5 overflow-x-auto border border-[var(--border-subtle)] px-4 py-3 font-mono text-sm text-[var(--text-primary)]">
				<code>pip install pyscn && pyscn check .</code>
			</pre>
			<div className="flex flex-wrap gap-3">
				<Link
					href={LINKS.pyscnBot}
					className="inline-flex min-h-11 items-center gap-2 bg-[var(--brand-blue)] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[var(--brand-blue-hover)]"
				>
					Install the GitHub App <span aria-hidden="true">&rarr;</span>
				</Link>
				<a
					href={LINKS.pyscn}
					target="_blank"
					rel="noopener noreferrer"
					className="inline-flex min-h-11 items-center border border-[var(--border-subtle)] px-4 py-2 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:border-[var(--brand-blue)]"
				>
					pyscn on GitHub
				</a>
			</div>
		</aside>
	);
}
