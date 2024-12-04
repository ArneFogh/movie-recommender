"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Heart,
  Play,
  Info,
  Clock,
  Award,
  User,
  Film,
  ArrowLeft,
} from "lucide-react";
import { recommendedMovies } from "@/data/recommendedMovies";

export default function RecommendationsPage() {
  const [expandedMovie, setExpandedMovie] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (movieId) => {
    setFavorites((prev) =>
      prev.includes(movieId)
        ? prev.filter((id) => id !== movieId)
        : [...prev, movieId]
    );
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
                  Baseret på dine filmvalg har vi fundet 10 film vi tror du vil
                  elske
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

          {/* Movie Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            {recommendedMovies.map((movie) => (
              <div key={movie.id} className="group relative">
                {/* Movie Card */}
                <div
                  className="relative h-full rounded-xl overflow-hidden transition-all duration-300
                  bg-black/20 backdrop-blur-sm border border-white/10 hover:border-white/20
                  hover:scale-105 hover:shadow-2xl"
                >
                  {/* Poster */}
                  <div className="relative w-full aspect-[2/3]">
                    <Image
                      src={movie.poster}
                      alt={movie.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 20vw"
                    />
                  </div>

                  {/* Hover Overlay */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300
                    flex flex-col justify-end p-4"
                  >
                    <h3 className="text-xl font-bold mb-2">{movie.title}</h3>
                    <p className="text-sm text-gray-300 mb-4">
                      {movie.year} • {movie.runtime}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex justify-center gap-4">
                      <button
                        onClick={() => setExpandedMovie(movie.id)}
                        className="p-2 rounded-full bg-amber-500/80 hover:bg-amber-500 
                          transition-colors backdrop-blur-sm"
                      >
                        <Info className="w-5 h-5 text-black" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(movie.id);
                        }}
                        className={`p-2 rounded-full backdrop-blur-sm transition-colors
                          ${
                            favorites.includes(movie.id)
                              ? "bg-rose-500/80 hover:bg-rose-500"
                              : "bg-white/10 hover:bg-white/20"
                          }`}
                      >
                        <Heart
                          className="w-5 h-5"
                          fill={
                            favorites.includes(movie.id)
                              ? "currentColor"
                              : "none"
                          }
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Expanded Movie Modal */}
          {expandedMovie && (
            <div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
              onClick={() => setExpandedMovie(null)}
            >
              <div
                className="bg-background/80 backdrop-blur-xl rounded-2xl max-w-4xl w-full p-6 m-4 border border-white/10"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Content */}
                {(() => {
                  const movie = recommendedMovies.find(
                    (m) => m.id === expandedMovie
                  );
                  return (
                    <div className="relative">
                      <button
                        onClick={() => setExpandedMovie(null)}
                        className="absolute top-0 right-0 p-2 text-gray-400 hover:text-white
                          rounded-full hover:bg-white/10 transition-colors"
                      >
                        ✕
                      </button>

                      <div className="flex flex-col md:flex-row gap-6">
                        {/* Poster */}
                        <div className="md:w-1/3 relative aspect-[2/3]">
                          <Image
                            src={movie.poster}
                            alt={movie.title}
                            fill
                            className="rounded-xl object-cover"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        </div>

                        {/* Info */}
                        <div className="md:w-2/3">
                          <h2 className="text-3xl font-display font-bold mb-2">
                            {movie.title}
                          </h2>

                          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-300 mb-4">
                            <span className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {movie.runtime}
                            </span>
                            <span>•</span>
                            <span>{movie.year}</span>
                            <span>•</span>
                            <span className="flex items-center text-yellow-400">
                              ★ {movie.rating}
                            </span>
                          </div>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {movie.genre.map((g) => (
                              <span
                                key={g}
                                className="px-3 py-1 rounded-full text-sm
                                  bg-white/5 border border-white/10"
                              >
                                {g}
                              </span>
                            ))}
                          </div>

                          <p className="text-gray-300 mb-6">{movie.synopsis}</p>

                          <div className="grid sm:grid-cols-2 gap-6 mb-6">
                            <div>
                              <h3 className="font-semibold flex items-center gap-2 mb-2">
                                <User className="w-4 h-4" />
                                Instruktør
                              </h3>
                              <p className="text-gray-300">{movie.director}</p>
                            </div>
                            <div>
                              <h3 className="font-semibold flex items-center gap-2 mb-2">
                                <Award className="w-4 h-4" />
                                Priser
                              </h3>
                              <ul className="text-gray-300 text-sm space-y-1">
                                {movie.awards.map((award) => (
                                  <li key={award}>{award}</li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          <div className="mb-6">
                            <h3 className="font-semibold flex items-center gap-2 mb-2">
                              <Film className="w-4 h-4" />
                              Medvirkende
                            </h3>
                            <p className="text-gray-300">
                              {movie.cast.join(", ")}
                            </p>
                          </div>

                          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                            <h3 className="font-semibold mb-2">
                              Hvorfor vi anbefaler denne film
                            </h3>
                            <p className="text-gray-300">
                              {movie.recommendationReason}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Streaming Services */}
                      <div className="mt-6 pt-6 border-t border-white/10">
                        <h3 className="font-semibold mb-2">Se filmen på</h3>
                        <div className="flex flex-wrap gap-2">
                          {movie.streamingServices.map((service) => (
                            <span
                              key={service}
                              className="px-4 py-2 rounded-full text-sm
                                bg-white/5 border border-white/10"
                            >
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
