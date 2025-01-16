"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Info, ArrowLeft } from "lucide-react";
import ExpandedMovieModal from "@/components/ExpandedMovieModal";

const PLACEHOLDER_IMAGE = "/placeholder-movie.jpg";

const getOptimizedImageUrl = (posterUrl) => {
  if (!posterUrl || typeof posterUrl !== "string") {
    return PLACEHOLDER_IMAGE;
  }

  try {
    const baseUrl = posterUrl.split("._V1_")[0];
    if (posterUrl.includes("._V1_")) {
      return `${baseUrl}._V1_SX500.jpg`;
    }
    return PLACEHOLDER_IMAGE;
  } catch (error) {
    console.warn("Error processing image URL:", error);
    return PLACEHOLDER_IMAGE;
  }
};

const MovieCard = ({
  movie,
  isFavorite,
  onFavoriteToggle,
  onExpandMovie,
  isSelected,
}) => {
  return (
    <div
      className={`group relative ${isSelected ? "ring-2 ring-rose-500" : ""}`}
    >
      <div
        className="relative h-full rounded-xl overflow-hidden transition-all duration-300
        bg-black/20 backdrop-blur-sm border border-white/10 hover:border-white/20
        hover:scale-105 hover:shadow-2xl"
      >
        <div className="relative w-full aspect-[2/3]">
          <Image
            src={getOptimizedImageUrl(movie.poster)}
            alt={movie.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            loading="lazy"
          />
        </div>

        <div
          className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent 
          opacity-0 group-hover:opacity-100 transition-opacity duration-300
          flex flex-col justify-end p-4"
        >
          <h3 className="text-xl font-bold mb-2">{movie.title}</h3>
          <p className="text-sm text-gray-300 mb-4">
            {movie.year} • {movie.runtime}
          </p>

          <div className="flex justify-center gap-4">
            <button
              onClick={() => onExpandMovie(movie.id)}
              className="p-2 rounded-full bg-amber-500/80 hover:bg-amber-500 transition-colors backdrop-blur-sm"
            >
              <Info className="w-5 h-5 text-black" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onFavoriteToggle(movie.id);
              }}
              className={`p-2 rounded-full backdrop-blur-sm transition-colors
                ${
                  isFavorite
                    ? "bg-rose-500/80 hover:bg-rose-500"
                    : "bg-white/10 hover:bg-white/20"
                }`}
            >
              <Heart
                className="w-5 h-5"
                fill={isFavorite ? "currentColor" : "none"}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SelectedMoviesRow = ({
  selectedMovies,
  favorites,
  onFavoriteToggle,
  onExpandMovie,
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {selectedMovies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          isSelected={true}
          isFavorite={favorites.includes(movie.id)}
          onFavoriteToggle={onFavoriteToggle}
          onExpandMovie={onExpandMovie}
        />
      ))}
    </div>
  );
};

const RecommendationRow = ({
  selectedMovie,
  recommendations,
  favorites,
  onFavoriteToggle,
  onExpandMovie,
}) => {
  return (
    <div className="p-6 rounded-xl bg-black/30 backdrop-blur-xl border border-white/10">
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-4">
          Anbefalinger baseret på{" "}
          <span className="text-rose-500">{selectedMovie.title}</span>
        </h3>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {recommendations.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isFavorite={favorites.includes(movie.id)}
            onFavoriteToggle={onFavoriteToggle}
            onExpandMovie={onExpandMovie}
          />
        ))}
      </div>
    </div>
  );
};

export default function RecommendationsPage() {
  const [expandedMovie, setExpandedMovie] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [selectedMovies, setSelectedMovies] = useState([]);

  useEffect(() => {
    const storedRecommendations = localStorage.getItem("movieRecommendations");
    const storedSelectedMovies = localStorage.getItem("selectedMovies");
    if (storedRecommendations) {
      setRecommendations(JSON.parse(storedRecommendations));
    }
    if (storedSelectedMovies) {
      setSelectedMovies(JSON.parse(storedSelectedMovies));
    }
  }, []);

  const toggleFavorite = (movieId) => {
    setFavorites((prev) =>
      prev.includes(movieId)
        ? prev.filter((id) => id !== movieId)
        : [...prev, movieId]
    );
  };

  // Gruppér anbefalinger efter valgte film
  const groupedRecommendations = selectedMovies
    .map((selectedMovie) => {
      // Find anbefalinger baseret på den valgte films titel
      const movieRecommendations = recommendations
        .filter((rec) => rec.basedOn === selectedMovie.title)
        .slice(0, 5); // Vis kun 5 anbefalinger per film

      return {
        selectedMovie,
        recommendations: movieRecommendations,
      };
    })
    .filter((group) => group.recommendations.length > 0);

  if (recommendations.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center p-8">
          <h2 className="text-2xl mb-4">Ingen anbefalinger fundet</h2>
          <Link
            href="/select-movies"
            className="inline-block px-6 py-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 transition-colors"
          >
            Vælg film for at få anbefalinger
          </Link>
        </div>
      </div>
    );
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
          <div className="p-8 rounded-2xl bg-black/20 backdrop-blur-xl border border-white/5 shadow-2xl mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="font-display text-4xl md:text-5xl font-bold mb-2 tracking-tight">
                  Dine personlige
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-500 via-orange-400 to-amber-400 animate-text-shine">
                    {" "}
                    anbefalinger
                  </span>
                </h1>
                <p className="text-gray-400 text-lg">
                  Baseret på dine filmvalg har vi fundet{" "}
                  {recommendations.length} film vi tror du vil elske
                </p>
              </div>
              <Link
                href="/select-movies"
                className="group relative px-6 py-3 rounded-xl backdrop-blur-sm transition-all duration-300
                  bg-gradient-to-r from-rose-500/10 via-orange-500/10 to-amber-500/10 
                  hover:from-rose-500/20 hover:via-orange-500/20 hover:to-amber-500/20
                  border border-white/10 hover:border-white/20"
              >
                <div className="absolute inset-0 rounded-xl bg-black/20 backdrop-blur-sm -z-10" />
                <span className="flex items-center gap-2 text-white">
                  <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                  Vælg nye film
                </span>
              </Link>
            </div>
          </div>

          {/* Selected Movies Section */}
          <div className="mb-8 p-6 rounded-xl bg-black/30 backdrop-blur-xl border border-white/10">
            <h2 className="text-2xl font-bold mb-6">Dine valgte film</h2>
            <SelectedMoviesRow
              selectedMovies={selectedMovies}
              favorites={favorites}
              onFavoriteToggle={toggleFavorite}
              onExpandMovie={setExpandedMovie}
            />
          </div>

          {/* Recommendations Sections */}
          <div className="space-y-8">
            {groupedRecommendations.map((group) => (
              <RecommendationRow
                key={group.selectedMovie.id}
                selectedMovie={group.selectedMovie}
                recommendations={group.recommendations}
                favorites={favorites}
                onFavoriteToggle={toggleFavorite}
                onExpandMovie={setExpandedMovie}
              />
            ))}
          </div>

          {/* Movie Modal */}
          {expandedMovie && (
            <ExpandedMovieModal
              movie={[...recommendations, ...selectedMovies].find(
                (m) => m.id === expandedMovie
              )}
              onClose={() => setExpandedMovie(null)}
            />
          )}
        </div>
      </div>
    </main>
  );
}
