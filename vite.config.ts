import { defineConfig } from "vite";
import solid from "vite-plugin-solid";

import viteConfig from "@lastfm-viewer/vite-config/index.config";

import path from "node:path";

export default defineConfig({
	plugins: [solid(), ...viteConfig.plugins],
	define: viteConfig.define,
	build: {
		...viteConfig.build,
		lib: {
			entry: path.resolve(__dirname, "index.ts"),
			name: "@lastfm-viewer/solid",
			fileName: (format) => `index.${format}.js`
		},
		rollupOptions: {
			external: ["solidJs"],
			output: {
				globals: {
					solidJs: "solidJs"
				},
				sourcemapExcludeSources: true
			}
		}
	}
});
