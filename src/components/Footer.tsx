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
		<footer className="border-t border-[var(--border-light)] bg-[var(--bg-card)] [&_a]:rounded-sm [&_a]:focus-visible:outline-2 [&_a]:focus-visible:outline-offset-4 [&_a]:focus-visible:outline-[var(--brand-blue)] [&_li>a]:inline-block [&_li>a]:py-1">
			<div className="ruler-ticks" aria-hidden="true" />
			<div className="mx-auto w-full max-w-6xl px-4 pb-8 pt-14 sm:px-6 sm:pt-20">
				<div className="mb-12 flex flex-col items-start justify-between gap-6 border-b border-[var(--border-subtle)] pb-10 sm:mb-14 sm:flex-row sm:gap-12 sm:pb-12">
					<Link href="/" className="type-display inline-flex items-baseline">
						<span className="text-3xl font-bold text-[var(--text-primary)] sm:text-4xl">
							Poly
						</span>
						<span className="text-3xl font-bold text-[var(--brand-blue)] sm:text-4xl">
							scan
						</span>
					</Link>
					<p className="max-w-sm text-xl leading-relaxed tracking-tight text-[var(--text-secondary)] sm:text-2xl">
						Structural codebase health for AI-written code.
					</p>
				</div>

				<div className="mb-14 grid grid-cols-2 gap-x-6 gap-y-10 text-sm md:grid-cols-[1fr_1.4fr_1.4fr_1fr] md:gap-10 [&_h4]:text-[var(--text-secondary)]">
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

					<div className="min-w-0">
						<h4 className="mb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--text-muted)]">
							Contact
						</h4>
						<ul className="space-y-2 text-[var(--text-secondary)]">
							<li>Kanagawa, Japan</li>
							<li>
								<a
									href={`mailto:${LINKS.contactEmail}`}
									className="break-words transition-colors hover:text-[var(--brand-blue)]"
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

				<div className="flex flex-col items-start justify-between gap-3 border-t border-[var(--border-subtle)] pt-6 font-mono text-[11px] leading-relaxed text-[var(--text-secondary)] sm:flex-row sm:items-center">
					<p>© {new Date().getFullYear()} Ludo Technologies Inc.</p>
					<p>All rights reserved.</p>
				</div>
			</div>
		</footer>
	);
}
