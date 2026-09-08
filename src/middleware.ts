import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
	// The localized home page (/, /en, /ja, /zh) and the Polyscan App section
	// pass through next-intl's middleware. The rest of the site (/blog,
	// /privacy, /terms, etc.) must never pass through it — those pages are
	// English-only. /pyscn-bot/api/* is excluded because it's rewritten to the
	// Go backend (see next.config.ts); letting next-intl touch it would
	// locale-prefix the proxied path and break the rewrite. Paths containing a
	// dot are excluded so static assets under public/pyscn-bot/ aren't
	// locale-rewritten to /en/... and 404.
	matcher: [
		"/",
		"/(en|ja|zh)",
		"/pyscn-bot",
		"/pyscn-bot/((?!api/|.*\\..*).*)",
		"/(ja|zh)/pyscn-bot",
		"/(ja|zh)/pyscn-bot/((?!api/|.*\\..*).*)",
	],
};
