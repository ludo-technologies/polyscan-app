import { useTranslations } from "next-intl";

/* Sample .github/polyscan.yml on the ink surface. Shared by the LP's YAML
   feature panel and the checkout success page. */
export default function ConfigYaml({ className }: { className?: string }) {
	const t = useTranslations();
	const comment = (text: string) => (
		<span className="text-white/40"># {text}</span>
	);
	const key = (name: string) => (
		<>
			<span className="text-green-400">{name}</span>
			<span className="text-white/50">:</span>
		</>
	);

	return (
		<div className={`bg-[var(--bg-ink)] p-6 sm:p-8 ${className ?? ""}`}>
			<p className="mb-4 font-mono text-xs text-white/50">
				.github/polyscan.yml
			</p>
			<pre className="overflow-x-auto font-mono text-sm leading-relaxed text-white/80">
				<code>
					{comment(t("features.config.comment.language"))}
					{"\n"}
					{key("language")} <span className="text-amber-400">ja</span>
					{"\n\n"}
					{comment(t("features.config.comment.target"))}
					{"\n"}
					{key("target_directories")}
					{"\n  "}
					<span className="text-white/50">-</span>{" "}
					<span className="text-amber-400">src/</span>
					{"\n\n"}
					{comment(t("features.config.comment.audit"))}
					{"\n"}
					{key("audit_interval")} <span className="text-amber-400">weekly</span>
					{"\n\n"}
					{comment(t("features.config.comment.pr"))}
					{"\n"}
					{key("pr_review")} <span className="text-amber-400">true</span>
				</code>
			</pre>
		</div>
	);
}
