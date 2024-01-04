/** @type {import('tailwindcss').Config} */

import tailwindConfig from "@lastfm-viewer/tailwind-config";
export default {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	presets: [tailwindConfig]
};
