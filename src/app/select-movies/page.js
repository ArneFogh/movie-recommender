"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LoadingOverlay from "@/components/LoadingOverlay";
import MovieGrid from "@/components/MovieGrid";
import { movies } from "@/data/MoviePosters";

export default function SelectMovies() {
  const router = useRouter();
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSubmit = async () => {
    if (selectedMovies.length === 5) {
      setIsAnalyzing(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        localStorage.setItem("selectedMovies", JSON.stringify(selectedMovies));
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
    <main className="min-h-screen bg-background overflow-hidden">
      {/* Background elements */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background-lighter to-background animate-gradient" />

        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-rose-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
        </div>

        <div className="absolute inset-0 bg-[linear-gradient(to_right,#232323_1px,transparent_1px),linear-gradient(to_bottom,#232323_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10" />
      </div>

      {/* Main content */}
      <div className="relative z-10 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12 p-8 rounded-2xl bg-black/20 backdrop-blur-xl border border-white/5 shadow-2xl">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              Vælg dine
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-500 via-orange-400 to-amber-400 animate-text-shine">
                {" "}
                favoritfilm
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-2">
              Vælg mellem 5-10 film for at få personlige anbefalinger
            </p>
            <p className="text-lg text-gray-400">
              Valgte film: {selectedMovies.length}/5
            </p>
          </div>

          {/* Movie Grid Section */}
          <div className="p-8 rounded-2xl bg-black/20 backdrop-blur-xl border border-white/5 shadow-2xl mb-20">
            <MovieGrid
              movies={movies}
              selectedMovies={selectedMovies}
              setSelectedMovies={setSelectedMovies}
            />
          </div>

          {/* Continue Button */}
          <div className="fixed bottom-8 right-8 z-20">
            <button
              onClick={handleSubmit}
              disabled={selectedMovies.length !== 5}
              className={`relative px-8 py-4 rounded-xl backdrop-blur-sm transition-all duration-300
                ${
                  selectedMovies.length === 5
                    ? "bg-gradient-to-r from-rose-500/20 via-orange-500/20 to-amber-500/20 hover:from-rose-500/30 hover:via-orange-500/30 hover:to-amber-500/30 text-white scale-100"
                    : "bg-gray-800/50 text-gray-400 cursor-not-allowed scale-95"
                }
                font-semibold text-lg shadow-xl border border-white/10 hover:border-white/20`}
            >
              <div className="absolute inset-0 rounded-xl bg-black/20 backdrop-blur-sm -z-10" />
              {selectedMovies.length === 5
                ? "Fortsæt"
                : `Vælg ${5 - selectedMovies.length} film mere`}
            </button>
          </div>

          {isAnalyzing && <LoadingOverlay />}
        </div>
      </div>
    </main>
  );
}
