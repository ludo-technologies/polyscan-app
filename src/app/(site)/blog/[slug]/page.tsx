import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PostBody from "@/components/PostBody";
import { formatDate, getPost, getPosts } from "@/lib/posts";
import { getSiteUrl } from "@/lib/site-url";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
	return getPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params;
	const post = getPost(slug);
	if (!post) return {};

	return {
		title: `${post.title} — polyscan`,
		description: post.description,
		alternates: { canonical: `/blog/${post.slug}` },
		openGraph: {
			type: "article",
			title: post.title,
			description: post.description,
			publishedTime: post.date,
			tags: post.tags,
			url: `${getSiteUrl()}/blog/${post.slug}`,
		},
	};
}

export default async function PostPage({ params }: Props) {
	const { slug } = await params;
	const post = getPost(slug);
	if (!post) notFound();

	const jsonLd = JSON.stringify({
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		headline: post.title,
		description: post.description,
		datePublished: post.date,
		inLanguage: post.lang,
		mainEntityOfPage: `${getSiteUrl()}/blog/${post.slug}`,
		author: { "@type": "Organization", name: "Ludo Technologies Inc." },
	});

	return (
		<main className="relative z-10 mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: structured data
				dangerouslySetInnerHTML={{ __html: jsonLd }}
			/>

			<Link
				href="/blog"
				className="mb-8 inline-flex text-sm font-medium text-[var(--brand-blue)] transition-colors hover:text-[var(--brand-blue-hover)]"
			>
				← All posts
			</Link>

			<article>
				<header className="mb-10 border-b border-[var(--border-subtle)] pb-8">
					<div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-[var(--text-muted)]">
						<time dateTime={post.date}>{formatDate(post.date, post.lang)}</time>
						{post.tags.map((tag) => (
							<span
								key={tag}
								className="border border-[var(--border-subtle)] px-1.5 py-0.5 font-medium"
							>
								{tag}
							</span>
						))}
						{post.draft && (
							<span className="border border-[var(--color-error)] px-1.5 py-0.5 font-medium text-[var(--color-error)]">
								Draft
							</span>
						)}
					</div>
					<h1 className="mb-3 text-3xl font-black tracking-tight text-[var(--text-primary)] sm:text-4xl">
						{post.title}
					</h1>
					{post.description && (
						<p className="text-lg leading-relaxed text-[var(--text-secondary)]">
							{post.description}
						</p>
					)}
				</header>

				<PostBody source={post.content} />
			</article>
		</main>
	);
}
