import { useTranslations } from "next-intl";
import FooterShell from "@/components/FooterShell";
import { Link } from "@/i18n/navigation";
import { LINKS } from "@/lib/links";
import BotWordmark from "./BotWordmark";
import Logo from "./icons/Logo";

const linkClass =
	"text-[var(--text-secondary)] transition-colors hover:text-[var(--brand-blue)]";

export default function BotFooter() {
	const t = useTranslations();

	return (
		<FooterShell>
			<div className="mb-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
				<Link href="/pyscn-bot" className="flex items-center gap-1">
					<Logo className="h-8 w-8" />
					<BotWordmark className="text-lg" />
				</Link>
				<ul className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-[0.15em]">
					<li>
						<a
							href={LINKS.pyscn}
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
							href={LINKS.org}
							target="_blank"
							rel="noopener noreferrer"
							className={linkClass}
						>
							{t("footer.company")}
						</a>
					</li>
				</ul>
			</div>
		</FooterShell>
	);
}
