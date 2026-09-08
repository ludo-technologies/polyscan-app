"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

type Props = {
	command: string;
	label?: string;
};

export default function CommandBlock({ command, label }: Props) {
	const t = useTranslations("home.commandBlock");
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
		<div className="min-w-0 overflow-hidden rounded-xl border border-white/10 bg-[var(--bg-ink)] shadow-[0_12px_32px_-16px_var(--bg-ink)]">
			<div className="flex min-h-12 items-center justify-between gap-3 border-b border-white/10 bg-white/[0.03] px-4">
				<div className="flex min-w-0 items-center gap-3">
					<span aria-hidden="true" className="flex shrink-0 gap-1.5">
						<span className="size-2 rounded-full bg-white/30" />
						<span className="size-2 rounded-full bg-white/20" />
						<span className="size-2 rounded-full bg-white/10" />
					</span>
					<p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-dimmed)]">
						{label || t("terminal")}
					</p>
				</div>
				<button
					type="button"
					onClick={copy}
					aria-label={t("copyAria", { command })}
					className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-md px-2 font-mono text-xs text-white/70 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--brand-blue-light)]"
				>
					<svg
						aria-hidden="true"
						width="14"
						height="14"
						viewBox="0 0 16 16"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.5"
					>
						{copied ? (
							<path d="M3 8l3 3 7-7" />
						) : (
							<>
								<rect x="5.5" y="5.5" width="8" height="8" rx="1.5" />
								<path d="M10.5 3V2.5H2.5v8H3" />
							</>
						)}
					</svg>
					<span className="min-w-[6ch]">
						{copied ? t("copied") : t("copy")}
					</span>
				</button>
			</div>
			<div className="flex items-start gap-3 px-4 py-5 sm:px-5 sm:py-6">
				{/* Wrap rather than scroll: a command clipped mid-word reads as broken
				    even though the copy button still yields the whole string. */}
				<span
					aria-hidden="true"
					className="select-none font-mono text-sm leading-7 text-[var(--brand-blue-light)]"
				>
					$
				</span>
				<code className="min-w-0 flex-1 whitespace-pre-wrap break-words font-mono text-sm leading-7 text-white">
					{command}
				</code>
			</div>
			<span role="status" className="sr-only">
				{copied ? t("copiedStatus") : ""}
			</span>
		</div>
	);
}
