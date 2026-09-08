import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/posts";
import { getSiteUrl } from "@/lib/site-url";

const PYSCN_BOT_LOCALES = ["en", "ja", "zh"] as const;
const PYSCN_BOT_PATHS = [
	"/pyscn-bot",
	"/pyscn-bot/how-it-works",
	"/pyscn-bot/contact",
	"/pyscn-bot/privacy",
	"/pyscn-bot/terms",
];

function pyscnBotRoutes(siteUrl: string) {
	return PYSCN_BOT_LOCALES.flatMap((locale) =>
		PYSCN_BOT_PATHS.map((path) => ({
			url: `${siteUrl}${locale === "en" ? "" : `/${locale}`}${path}`,
		})),
	);
}

export default function sitemap(): MetadataRoute.Sitemap {
	const siteUrl = getSiteUrl();
	const routes = ["", "/ja", "/zh", "/blog", "/privacy", "/terms"];

	return [
		...routes.map((route) => ({ url: `${siteUrl}${route}` })),
		...pyscnBotRoutes(siteUrl),
		...getPosts()
			.filter((post) => !post.draft)
			.map((post) => ({
				url: `${siteUrl}/blog/${post.slug}`,
				lastModified: post.date,
			})),
	];
}
