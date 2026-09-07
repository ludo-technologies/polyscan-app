import type { Metadata } from "next";
import Link from "next/link";
import { formatDate, getPosts } from "@/lib/posts";

export const metadata: Metadata = {
	title: "Blog — polyscan",
	description:
		"Notes on code quality, static analysis, and keeping AI-generated codebases maintainable, from the team behind pyscn and polyscan.",
	alternates: {
		canonical: "/blog",
		types: { "application/rss+xml": "/blog/feed.xml" },
	},
};

export default function BlogIndex() {
	const posts = getPosts();

	return (
		<main className="relative z-10 mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
			<p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--text-muted)]">
				Blog
			</p>
			<h1 className="type-display mt-3 mb-3 text-4xl font-bold text-[var(--text-primary)] sm:text-5xl">
				Writing
			</h1>
			<p className="mb-12 max-w-2xl text-[var(--text-secondary)]">
				Notes on code quality, static analysis, and keeping AI-generated
				codebases maintainable.
			</p>

			{posts.length === 0 ? (
				<p className="text-[var(--text-muted)]">No posts yet.</p>
			) : (
				<ul className="border border-[var(--border-light)] bg-[var(--bg-card)]">
					{posts.map((post) => (
						<li
							key={post.slug}
							className="border-b border-[var(--border-subtle)] last:border-b-0"
						>
							<Link
								href={`/blog/${post.slug}`}
								className="group block p-5 transition-colors hover:bg-[var(--bg-subtle)]"
							>
								<div className="mb-2 flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--text-muted)]">
									<time dateTime={post.date}>
										{formatDate(post.date, post.lang)}
									</time>
									{post.lang === "ja" && (
										<span className="border border-[var(--border-subtle)] px-1.5 py-0.5 tracking-normal">
											日本語
										</span>
									)}
									{post.draft && (
										<span className="border border-[var(--color-error)] px-1.5 py-0.5 text-[var(--color-error)]">
											Draft
										</span>
									)}
								</div>
								<h2 className="mb-1 text-xl font-bold text-[var(--text-primary)] transition-colors group-hover:text-[var(--brand-blue)]">
									{post.title}
								</h2>
								<p className="text-sm leading-relaxed text-[var(--text-light)]">
									{post.description}
								</p>
							</Link>
						</li>
					))}
				</ul>
			)}

			<div className="mt-12 border-t border-[var(--border-subtle)] pt-6">
				<a
					href="/blog/feed.xml"
					className="font-mono text-sm font-medium text-[var(--brand-blue)] transition-colors hover:text-[var(--brand-blue-hover)]"
				>
					RSS feed →
				</a>
			</div>
		</main>
	);
}
