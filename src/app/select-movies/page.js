"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import SimpleLoadingOverlay from "@/components/SimpleLoadingOverlay";
import LoadingOverlay from "@/components/LoadingOverlay";
import MovieGrid from "@/components/MovieGrid";
import ContinueButton from "@/components/ContinueButton";
import {
  getRecommendations,
  processRecommendations,
} from "@/services/movieService";

export default function SelectMovies() {
  const router = useRouter();
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 10;

  // Flyt data processering til en memoized funktion
  const processMovieData = useCallback((movie) => {
    const baseUrl = movie.poster_link.split("._V1_")[0];
    const highResUrl = `${baseUrl}._V1_SX500.jpg`;

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
  }, []);

  // Flyt billede validering til en separat funktion
  const validateImage = useCallback(async (url) => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const res = await fetch(url, {
        method: "HEAD",
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      return res.ok;
    } catch (error) {
      return false;
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchMovies = async () => {
      try {
        const { database } = await import("@/config/firebase");
        const { ref, get } = await import("firebase/database");

        const moviesRef = ref(database, "movies");
        const snapshot = await get(moviesRef);

        if (snapshot.exists() && isMounted) {
          const moviesData = snapshot.val();
          const processedMovies =
            Object.values(moviesData).map(processMovieData);

          // Validér alle film-posters parallelt med timeout
          const moviesWithValidation = await Promise.all(
            processedMovies.map(async (movie) => {
              const posterExists = await validateImage(movie.poster);
              return { ...movie, posterExists };
            })
          );

          // Filtrer og shuffle - vi gør dette hver gang for at få et nyt udvalg
          if (isMounted) {
            const validMovies = moviesWithValidation
              .filter((movie) => movie.posterExists)
              .sort(() => Math.random() - 0.5)
              .slice(0, 30);

            setMovies(validMovies);
          }
        }
      } catch (error) {
        console.error("Fejl ved hentning af film:", error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchMovies();

    return () => {
      isMounted = false;
    };
  }, [processMovieData, validateImage]);

  const handleSubmit = async () => {
    if (selectedMovies.length === 5) {
      setIsAnalyzing(true);
      try {
        // Get selected movie titles
        const selectedTitles = selectedMovies
          .map((movieId) => movies.find((m) => m.id === movieId)?.title)
          .filter(Boolean);

        // Get recommendations from ML model
        const recommendationsData = await getRecommendations(selectedTitles);

        // Process and store recommendations
        const processedRecommendations =
          processRecommendations(recommendationsData);
        localStorage.setItem(
          "movieRecommendations",
          JSON.stringify(processedRecommendations)
        );

        router.push("/recommendations");
      } catch (error) {
        console.error("Error analyzing movies:", error);
        // Log mere detaljeret fejlinformation
        if (error.response) {
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
        }
        alert(
          `Der skete en fejl under analysen: ${error.message}. Check browser console for detaljer.`
        );
      } finally {
        setIsAnalyzing(false);
      }
    }
  };

  // Beregn hvilke film der skal vises på den aktuelle side
  const currentMovies = movies.slice(
    (currentPage - 1) * moviesPerPage,
    currentPage * moviesPerPage
  );

  if (isLoading) {
    return <SimpleLoadingOverlay />;
  }

  return (
    <main className="min-h-screen bg-background overflow-hidden">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background-lighter to-background animate-gradient" />
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-rose-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#232323_1px,transparent_1px),linear-gradient(to_bottom,#232323_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10" />
      </div>

      <div className="relative z-10 py-8 px-4">
        <div className="max-w-7xl mx-auto">
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

          <div className="p-8 rounded-2xl bg-black/20 backdrop-blur-xl border border-white/5 shadow-2xl mb-20">
            <MovieGrid
              movies={currentMovies}
              selectedMovies={selectedMovies}
              setSelectedMovies={setSelectedMovies}
            />

            {/* Pagination */}
            <div className="mt-8 flex justify-center gap-4">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg bg-white/10 disabled:opacity-50"
              >
                Forrige
              </button>
              <span className="px-4 py-2">
                Side {currentPage} af {Math.ceil(movies.length / moviesPerPage)}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.min(prev + 1, Math.ceil(movies.length / moviesPerPage))
                  )
                }
                disabled={
                  currentPage === Math.ceil(movies.length / moviesPerPage)
                }
                className="px-4 py-2 rounded-lg bg-white/10 disabled:opacity-50"
              >
                Næste
              </button>
            </div>
          </div>

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
