import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => ({
	// Liferay serves CX assets at /o/<client-extension-id>
	// Use '' in dev so Local runs work from /
	base: mode === "production" ? "/o/vite-app-custom-element-liferay-cx" : "/",

	build: {
		// Avoid clashing with Gradle’s build output; keep it explicit
		outDir: "vite-build",
		// Default Rollup output is fine; hashed files land in /assets
	},

	plugins: [react()],
	server: {
		proxy: {
			// proxy Liferay endpoints while developing locally
			"/o": {
				target: "http://localhost:8080",
				changeOrigin: true,
			},
			"/api": {
				target: "http://localhost:8080",
				changeOrigin: true,
			},
		},
	},
}));
