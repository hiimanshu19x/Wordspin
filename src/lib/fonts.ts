import { Newsreader, Inter, Cormorant_Garamond } from "next/font/google";

export const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  style: ["normal", "italic"],
  weight: ["300", "400", "500", "600"],
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const celesse = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-celesse",
  display: "swap",
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});
