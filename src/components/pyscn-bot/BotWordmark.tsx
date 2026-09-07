/* Two-tone "Polyscan" wordmark, following the poly+scan treatment in
   src/components/Header.tsx. */
export default function BotWordmark({ className }: { className?: string }) {
	return (
		<span className={`type-display font-bold ${className ?? ""}`}>
			<span className="text-[var(--text-primary)]">Poly</span>
			<span className="text-[var(--brand-blue)]">scan</span>
		</span>
	);
}
