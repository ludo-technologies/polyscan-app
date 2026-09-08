import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [react()],
	test: {
		environment: "jsdom",
		setupFiles: ["./vitest.setup.ts"],
		globals: true,
		server: {
			deps: {
				// next-intl's ESM build imports "next/navigation"; inline it so
				// Vite externalizes that import for Node's exports-map resolution.
				inline: ["next-intl"],
			},
		},
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
});
