import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import BotWordmark from "./BotWordmark";
import Logo from "./icons/Logo";

const linkClass =
	"text-[var(--text-secondary)] transition-colors hover:text-[var(--brand-blue)]";

export default function BotFooter() {
	const t = useTranslations();

	return (
		<footer className="border-t border-[var(--border-light)] bg-[var(--bg-card)]">
			<div className="ruler-ticks" aria-hidden="true" />
			<div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
				<div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
					<Link href="/pyscn-bot" className="flex items-center gap-1">
						<Logo className="h-8 w-8" />
						<BotWordmark className="text-lg" />
					</Link>
					<ul className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-[0.15em]">
						<li>
							<a
								href="https://github.com/ludo-technologies/pyscn"
								target="_blank"
								rel="noopener noreferrer"
								className={linkClass}
							>
								{t("footer.github")}
							</a>
						</li>
						<li>
							<Link href="/pyscn-bot/privacy" className={linkClass}>
								{t("footer.privacy")}
							</Link>
						</li>
						<li>
							<Link href="/pyscn-bot/terms" className={linkClass}>
								{t("footer.terms")}
							</Link>
						</li>
						<li>
							<Link href="/pyscn-bot/contact" className={linkClass}>
								{t("nav.contact")}
							</Link>
						</li>
						<li>
							<a
								href="https://www.ludo-tech.org/"
								target="_blank"
								rel="noopener noreferrer"
								className={linkClass}
							>
								{t("footer.company")}
							</a>
						</li>
					</ul>
				</div>
				<p className="mt-8 border-t border-[var(--border-subtle)] pt-6 text-xs text-[var(--text-muted)]">
					{t("footer.copyright")}
				</p>
			</div>
		</footer>
	);
}
