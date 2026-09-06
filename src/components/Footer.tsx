import Link from "next/link";
import { LINKS } from "@/lib/links";

const productLinks = [
	{ label: "What you get", href: "/#what-you-get" },
	{ label: "Analyzers", href: "/#analyzers" },
	{ label: "AI agents", href: "/#agents" },
	{ label: "GitHub App", href: "/#bot" },
	{ label: "Blog", href: "/blog" },
	{ label: "FAQ", href: "/#faq" },
];

const resourceLinks = [
	{ label: "Documentation", href: LINKS.docs },
	{ label: "GitHub App", href: LINKS.pyscnBot },
	{ label: "Polyscan on GitHub", href: LINKS.monorepo },
	{ label: "pyscn on GitHub", href: LINKS.pyscn },
	{ label: "Ludo Technologies", href: LINKS.org },
];

const legalLinks = [
	{ label: "Privacy Policy", href: "/privacy" },
	{ label: "Terms of Service", href: "/terms" },
];

export default function Footer() {
	return (
		<footer className="border-t border-[var(--border-light)] bg-[var(--bg-card)]">
			<div className="ruler-ticks" aria-hidden="true" />
			<div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
				<div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-center">
					<Link href="/" className="type-display inline-flex items-baseline">
						<span className="text-xl font-bold text-[var(--text-primary)]">
							poly
						</span>
						<span className="text-xl font-bold text-[var(--brand-blue)]">
							scan
						</span>
					</Link>
					<span className="hidden text-[var(--border-light)] sm:block">|</span>
					<p className="text-sm text-[var(--text-secondary)]">
						Structural codebase health for AI-written code.
					</p>
				</div>

				<div className="mb-10 grid grid-cols-2 gap-8 text-sm md:grid-cols-4">
					<div>
						<h4 className="mb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--text-muted)]">
							Product
						</h4>
						<ul className="space-y-2">
							{productLinks.map((link) => (
								<li key={link.href}>
									<Link
										href={link.href}
										className="text-[var(--text-secondary)] transition-colors hover:text-[var(--brand-blue)]"
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					<div>
						<h4 className="mb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--text-muted)]">
							Resources
						</h4>
						<ul className="space-y-2">
							{resourceLinks.map((link) => (
								<li key={link.href}>
									<a
										href={link.href}
										target="_blank"
										rel="noopener noreferrer"
										className="text-[var(--text-secondary)] transition-colors hover:text-[var(--brand-blue)]"
									>
										{link.label}
									</a>
								</li>
							))}
						</ul>
					</div>

					<div>
						<h4 className="mb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--text-muted)]">
							Contact
						</h4>
						<ul className="space-y-2 text-[var(--text-secondary)]">
							<li>Kanagawa, Japan</li>
							<li>
								<a
									href={`mailto:${LINKS.contactEmail}`}
									className="transition-colors hover:text-[var(--brand-blue)]"
								>
									{LINKS.contactEmail}
								</a>
							</li>
						</ul>
					</div>

					<div>
						<h4 className="mb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--text-muted)]">
							Legal
						</h4>
						<ul className="space-y-2">
							{legalLinks.map((link) => (
								<li key={link.href}>
									<Link
										href={link.href}
										className="text-[var(--text-secondary)] transition-colors hover:text-[var(--brand-blue)]"
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>

				<div className="flex flex-col items-center justify-between gap-2 border-t border-[var(--border-subtle)] pt-6 text-xs text-[var(--text-muted)] sm:flex-row">
					<p>© {new Date().getFullYear()} Ludo Technologies Inc.</p>
					<p>All rights reserved.</p>
				</div>
			</div>
		</footer>
	);
}
