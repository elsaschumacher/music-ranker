import type { Metadata } from "next";
import {
  Inter,
  Permanent_Marker,
  Dancing_Script,
  Montserrat,
  Anton,
  UnifrakturMaguntia,
  Satisfy,
  IM_Fell_DW_Pica,
  Rochester,
  Arimo,
} from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const permanent_marker = Permanent_Marker({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-permanent_marker",
  display: "swap",
  adjustFontFallback: false,
});

const dancing_script = Dancing_Script({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dancing_script",
  display: "swap",
  adjustFontFallback: false,
});

const montserrat = Montserrat({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  adjustFontFallback: false,
});

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
  adjustFontFallback: false,
});

const unifrakturmaguntia = UnifrakturMaguntia({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-unifrakturmaguntia",
  display: "swap",
  adjustFontFallback: false,
});

const satisfy = Satisfy({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-satisfy",
  display: "swap",
  adjustFontFallback: false,
});

const im = IM_Fell_DW_Pica({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-im",
  display: "swap",
  adjustFontFallback: false,
});

const rochester = Rochester({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-rochester",
  display: "swap",
  adjustFontFallback: false,
});

const arimo = Arimo({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-arimo",
  display: "swap",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: "Swiftie Song Ranker",
  description: "Swiftie Song Ranker",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          inter.variable,
          permanent_marker.variable,
          dancing_script.variable,
          montserrat.variable,
          anton.variable,
          unifrakturmaguntia.variable,
          satisfy.variable,
          im.variable,
          rochester.variable,
          arimo.variable,
          "font-sans"
        )}
      >
        {children}
      </body>
    </html>
  );
}
