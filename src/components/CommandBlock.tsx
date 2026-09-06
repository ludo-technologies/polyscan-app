"use client";

import { useState } from "react";

type Props = {
	command: string;
	label?: string;
};

export default function CommandBlock({ command, label }: Props) {
	const [copied, setCopied] = useState(false);

	async function copy() {
		try {
			await navigator.clipboard.writeText(command);
			setCopied(true);
			setTimeout(() => setCopied(false), 1600);
		} catch {
			// Clipboard is unavailable (insecure context, denied permission) — the
			// command is still selectable, so there is nothing to recover from.
		}
	}

	return (
		<div>
			{label && (
				<p className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
					{label}
				</p>
			)}
			<div className="flex items-start gap-2 border border-[var(--bg-ink)] bg-[var(--bg-ink)] px-4 py-3">
				{/* Wrap rather than scroll: a command clipped mid-word reads as broken
				    even though the copy button still yields the whole string. */}
				<code className="flex-1 break-words font-mono text-sm leading-6 text-white">
					<span className="mr-2 select-none text-[var(--text-dimmed)]">$</span>
					{command}
				</code>
				<button
					type="button"
					onClick={copy}
					aria-label={`Copy "${command}" to clipboard`}
					className="shrink-0 border border-white/20 px-2 py-1 font-mono text-xs text-white/70 transition-colors hover:border-white/50 hover:text-white"
				>
					{copied ? "copied" : "copy"}
				</button>
			</div>
		</div>
	);
}
