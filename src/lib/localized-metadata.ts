import { routing } from "@/i18n/routing";
import { getSiteUrl } from "@/lib/site-url";

function localizedPath(locale: string, path: string): string {
	return locale === routing.defaultLocale ? path : `/${locale}${path}`;
}

/**
 * Builds `alternates.canonical` (self-referencing, per current locale) and
 * `alternates.languages` (hreflang, one entry per supported locale plus
 * x-default) for a localized page. `path` is the unprefixed pathname, e.g.
 * "/" or "/pyscn-bot".
 */
export function localizedAlternates(locale: string, path: string) {
	const siteUrl = getSiteUrl();
	const languages: Record<string, string> = {
		"x-default": `${siteUrl}${path}`,
	};
	for (const l of routing.locales) {
		languages[l] = `${siteUrl}${localizedPath(l, path)}`;
	}
	return {
		canonical: `${siteUrl}${localizedPath(locale, path)}`,
		languages,
	};
}
