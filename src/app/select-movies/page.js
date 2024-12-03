// src/app/select-movies/page.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LoadingOverlay from "@/components/LoadingOverlay";
import MovieGrid from "@/components/MovieGrid";
import SelectionHeader from "@/components/SelectionHeader";
import { movies } from "@/data/MoviePosters";

export default function SelectMovies() {
  const router = useRouter();
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSubmit = async () => {
    if (selectedMovies.length === 5) {
      setIsAnalyzing(true);
      try {
        // Her ville du normalt sende data til din ML backend
        await new Promise((resolve) => setTimeout(resolve, 3000));

        // Gem de valgte film i localStorage eller en anden state management løsning
        localStorage.setItem("selectedMovies", JSON.stringify(selectedMovies));

        // Naviger til anbefalingssiden
        router.push("/recommendations");
      } catch (error) {
        console.error("Fejl ved analyse af film:", error);
        alert("Der skete en fejl under analysen. Prøv venligst igen.");
      } finally {
        setIsAnalyzing(false);
      }
    }
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <SelectionHeader selectedCount={selectedMovies.length} />

        <MovieGrid
          movies={movies}
          selectedMovies={selectedMovies}
          setSelectedMovies={setSelectedMovies}
        />

        <div className="fixed bottom-8 right-8">
          <button
            onClick={handleSubmit}
            disabled={selectedMovies.length !== 5}
            className={`px-8 py-3 rounded-lg text-lg font-semibold transition-all
              ${
                selectedMovies.length === 5
                  ? "bg-green-600 hover:bg-green-700 scale-100"
                  : "bg-gray-600 cursor-not-allowed scale-95"
              }`}
          >
            {selectedMovies.length === 5
              ? "Fortsæt"
              : `Vælg ${5 - selectedMovies.length} film mere`}
          </button>
        </div>

        {isAnalyzing && <LoadingOverlay />}
      </div>
    </main>
  );
}
