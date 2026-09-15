import { useTranslations } from "next-intl";
import FooterShell from "@/components/FooterShell";
import { Link } from "@/i18n/navigation";
import { LINKS } from "@/lib/links";
import BotWordmark from "./BotWordmark";

const linkClass =
	"text-[var(--text-secondary)] transition-colors hover:text-[var(--brand-blue)]";

export default function BotFooter() {
	const t = useTranslations();

	return (
		<FooterShell>
			<div className="mb-12 flex flex-col items-start justify-between gap-6 border-b border-[var(--border-subtle)] pb-10 sm:mb-14 sm:flex-row sm:gap-12 sm:pb-12">
				<Link href="/pyscn-bot" className="inline-flex">
					<BotWordmark className="text-3xl sm:text-4xl" />
				</Link>
				<p className="max-w-sm text-xl leading-relaxed tracking-tight text-[var(--text-secondary)] sm:text-2xl">
					{t("footer.tagline")}
				</p>
			</div>
			<ul className="mb-14 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
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
		</FooterShell>
	);
}
