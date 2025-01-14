"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SimpleLoadingOverlay from "@/components/SimpleLoadingOverlay";
import LoadingOverlay from "@/components/LoadingOverlay";
import MovieGrid from "@/components/MovieGrid";
import ContinueButton from "@/components/ContinueButton";

export default function SelectMovies() {
  const router = useRouter();
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Helper funktion til at checke om et billede eksisterer
  const checkImageExists = async (url) => {
    try {
      const res = await fetch(url, { method: "HEAD" });
      return res.ok;
    } catch (error) {
      return false;
    }
  };

  // Helper funktion til at behandle film data
  const processMovieData = (movie) => {
    // Find base URL'en ved at fjerne alle størrelsesparametre
    const baseUrl = movie.poster_link.split("._V1_")[0];

    // Tilføj høj opløsning (1000px bred)
    const highResUrl = `${baseUrl}._V1_SX1000.jpg`;

    return {
      id: movie.series_title.replace(/\s+/g, "-").toLowerCase(),
      title: movie.series_title,
      poster: highResUrl,
      year: movie.released_year,
      rating: movie.imdb_rating,
      overview: movie.overview,
      director: movie.director,
      stars: movie.stars,
      genre: movie.genre,
    };
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const { database } = await import("@/config/firebase");
        const { ref, get } = await import("firebase/database");

        const moviesRef = ref(database, "movies");
        const snapshot = await get(moviesRef);

        if (snapshot.exists()) {
          const moviesData = snapshot.val();
          const allMovies = Object.values(moviesData).map(processMovieData);

          // Validér alle film-posters parallelt
          const moviesWithValidation = await Promise.all(
            allMovies.map(async (movie) => {
              const posterExists = await checkImageExists(movie.poster);
              return { ...movie, posterExists };
            })
          );

          // Filtrer film med eksisterende posters
          const validMovies = moviesWithValidation.filter(
            (movie) => movie.posterExists
          );

          // Vælg 30 tilfældige film fra de validerede film
          const shuffledMovies = [...validMovies]
            .sort(() => Math.random() - 0.5)
            .slice(0, 25);

          setMovies(shuffledMovies);
        }
      } catch (error) {
        console.error("Fejl ved hentning af film:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

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

  if (isLoading) {
    return <SimpleLoadingOverlay />;
  }

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
            <ContinueButton
              selectedMoviesCount={selectedMovies.length}
              onSubmit={handleSubmit}
              isEnabled={selectedMovies.length === 5}
            />
          </div>
          {isAnalyzing && <LoadingOverlay />}
        </div>
      </div>
    </main>
  );
}
