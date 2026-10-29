import type { ReactNode } from "react";
import { BrandTile, brandLinkClass } from "@/components/HeaderShell";
import BotWordmark from "@/components/pyscn-bot/BotWordmark";
import LanguageSwitcher from "@/components/pyscn-bot/LanguageSwitcher";
import { Link } from "@/i18n/navigation";

/* Frame of the signed-in pages: brand bar, then a wide instrument bench. */
export default function DashboardShell({ children }: { children: ReactNode }) {
	return (
		<div className="min-h-screen">
			<nav className="border-b border-[var(--border-light)] bg-[var(--bg-body)]/90 backdrop-blur">
				<div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
					<Link href="/" className={brandLinkClass}>
						<BrandTile />
						<BotWordmark className="text-xl tracking-tight" />
					</Link>
					<LanguageSwitcher />
				</div>
			</nav>
			<main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
				{children}
			</main>
		</div>
	);
}
