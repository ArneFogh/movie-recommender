// src/app/page.js
"use client";

import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <div className="h-96 relative flex items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
        <div className="text-center z-10">
          <h1 className="text-5xl font-bold mb-6">
            Find din næste favoritfilm på få sekunder
          </h1>
          <p className="text-xl mb-8">
            Vælg 5 film fra vores top 20, og vi anbefaler 10 film til dig
          </p>
          <Link
            href="/select-movies"
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition-colors"
          >
            Kom i gang
          </Link>
        </div>
      </div>
    </main>
  );
}
