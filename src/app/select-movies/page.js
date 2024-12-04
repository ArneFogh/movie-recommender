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
              className={`group relative px-8 py-4 rounded-xl transition-all duration-300 
      ${
        selectedMovies.length === 5
          ? "hover:scale-105 scale-100"
          : "opacity-70 cursor-not-allowed scale-95 hover:scale-95"
      }`}
            >
              {/* Animated background gradient */}
              <div
                className={`absolute inset-0 rounded-xl transition-opacity duration-300
      bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500
      ${
        selectedMovies.length === 5
          ? "opacity-20 group-hover:opacity-30"
          : "opacity-5"
      }`}
              />

              {/* Shine effect */}
              <div className="absolute inset-0 rounded-xl overflow-hidden">
                <div
                  className={`absolute inset-0 translate-x-[-100%] 
        bg-gradient-to-r from-transparent via-white/10 to-transparent
        ${selectedMovies.length === 5 ? "animate-[shimmer_2s_infinite]" : ""}`}
                />
              </div>

              {/* Glass overlay */}
              <div className="absolute inset-0 rounded-xl bg-black/20 backdrop-blur-sm" />
              <div className="absolute inset-[1px] rounded-xl bg-black/90" />

              {/* Border */}
              <div
                className={`absolute inset-0 rounded-xl border 
      transition-colors duration-300
      ${
        selectedMovies.length === 5
          ? "border-white/20 group-hover:border-white/40"
          : "border-white/5"
      }`}
              />

              {/* Button content */}
              <div className="relative flex items-center gap-2">
                <span
                  className={`text-lg font-medium transition-colors duration-300
        ${selectedMovies.length === 5 ? "text-white" : "text-gray-400"}`}
                >
                  {selectedMovies.length === 5 ? (
                    <>
                      Fortsæt
                      <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </>
                  ) : (
                    `Vælg ${5 - selectedMovies.length} film mere`
                  )}
                </span>
              </div>

              {/* Processing dots - only show when enabled */}
              {selectedMovies.length === 5 && (
                <div className="absolute -bottom-7 left-1/2 transform -translate-x-1/2">
                  <div className="flex gap-1.5">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1 h-1 rounded-full bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500"
                        style={{
                          animation: "processingPulse 1s ease infinite",
                          animationDelay: `${i * 0.2}s`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </button>
          </div>
          {isAnalyzing && <LoadingOverlay />}
        </div>
      </div>
    </main>
  );
}
