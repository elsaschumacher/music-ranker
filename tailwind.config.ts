import type { Config } from "tailwindcss";
import daisyui from "daisyui";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", ...defaultTheme.fontFamily.sans],
        mono: ["var(--font-roboto-mono)", ...defaultTheme.fontFamily.mono],
        nineteeneightynine: ["var(--font-permanent_marker)"],
        fearless: ["var(--font-montserrat)"],
        debut: ["var(--font-dancing_script)"],
        red: ["var(--font-anton)"],
        reputation: ["var(--font-unifrakturmaguntia)"],
        lover: ["var(--font-satisfy)"],
        folkmore: ["var(--font-im)"],
        speaknow: ["var(--font-rochester)"],
        midnights: ["var(--font-arimo)"],
      },
    },
  },
  plugins: [daisyui],
};

export default config;
