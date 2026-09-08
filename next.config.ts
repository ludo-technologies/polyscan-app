import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const securityHeaders = [
	{ key: "X-Content-Type-Options", value: "nosniff" },
	{ key: "X-Frame-Options", value: "DENY" },
	{ key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
	{
		key: "Permissions-Policy",
		value: "camera=(), microphone=(), geolocation=()",
	},
	// Only in production: HSTS applies per host, so sending it in dev pins
	// localhost to https and makes the dev server unreachable in the browser.
	...(process.env.NODE_ENV === "production"
		? [
				{
					key: "Strict-Transport-Security",
					value: "max-age=63072000; includeSubDomains; preload",
				},
			]
		: []),
];

const pyscnBotApiOrigin = process.env.PYSCN_BOT_API_ORIGIN;
if (!pyscnBotApiOrigin) {
	throw new Error("PYSCN_BOT_API_ORIGIN is required");
}

const nextConfig: NextConfig = {
	async headers() {
		return [{ source: "/(.*)", headers: securityHeaders }];
	},
	async rewrites() {
		return [
			{
				source: "/pyscn-bot/api/:path*",
				destination: `${pyscnBotApiOrigin}/pyscn-bot/api/:path*`,
			},
		];
	},
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
