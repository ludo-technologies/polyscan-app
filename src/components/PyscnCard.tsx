import Link from "next/link";
import { LINKS } from "@/lib/links";

/**
 * Mid-article aside for the first mention of pyscn. Deliberately quieter than
 * the end-of-post PostCta: one paragraph, one command, one link.
 */
export default function PyscnCard() {
	return (
		<aside
			aria-label="What is pyscn"
			className="not-prose my-8 border-l-2 border-[var(--brand-blue)] bg-[var(--bg-card)] py-4 pr-5 pl-5"
		>
			<p className="mb-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
				What is pyscn?
			</p>
			<p className="mb-3 text-sm leading-relaxed text-[var(--text-secondary)]">
				An open-source structural analyzer for Python: duplicated code,
				complexity, dead code, and dependency rules. Use it as a CLI, or as a{" "}
				<Link
					href={LINKS.pyscnBot}
					className="font-medium text-[var(--brand-blue)] hover:text-[var(--brand-blue-hover)]"
				>
					GitHub App
				</Link>{" "}
				that regularly audits your repository and reports in a GitHub issue.
			</p>
			<code className="block w-fit border border-[var(--border-subtle)] bg-[var(--bg-subtle)] px-3 py-1.5 font-mono text-sm text-[var(--text-primary)]">
				uvx pyscn analyze .
			</code>
		</aside>
	);
}
