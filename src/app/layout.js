// src/app/layout.js
import "@/app/globals.css";

export const metadata = {
  title: "Movie Recommender",
  description: "Vælg dine favoritfilm og få personlige anbefalinger",
};

export default function RootLayout({ children }) {
  return (
    <html lang="da">
      <body className="bg-gray-900">{children}</body>
    </html>
  );
}
