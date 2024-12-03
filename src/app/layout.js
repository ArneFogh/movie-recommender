// src/app/layout.js
import "@/app/globals.css";
import { Playfair_Display, Manrope } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

export const metadata = {
  title: "Movie Recommender",
  description: "Vælg dine favoritfilm og få personlige anbefalinger",
};

export default function RootLayout({ children }) {
  return (
    <html lang="da" className={`${playfair.variable} ${manrope.variable}`}>
      <body className="bg-gray-900 font-sans">{children}</body>
    </html>
  );
}
