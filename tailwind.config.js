/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px"
			}
		},
		fontFamily: {
			quicksand: ["Quicksand", "sans-serif"]
		},
		colors: {
			btntextColor: "#28a745",
			buttonBorder: "#a5d6a7",
			buttonBgColor: "rgba(40, 167, 69, 0.12549019607843137)"
		}
	}
};
