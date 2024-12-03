// src/app/recommendations/page.js
"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, Play, Info, Clock, Award, User, Film } from "lucide-react";
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
    <main className="min-h-screen bg-gray-900 text-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              Dine personlige anbefalinger
            </h1>
            <p className="text-gray-400">
              Baseret på dine filmvalg har vi fundet 10 film vi tror du vil
              elske
            </p>
          </div>
          <Link
            href="/select-movies"
            className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg transition-colors"
          >
            Vælg nye film
          </Link>
        </div>

        {/* Film grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {recommendedMovies.map((movie) => (
            <div key={movie.id} className="relative group">
              {/* Film plakat */}
              <div
                className="relative cursor-pointer transition-transform hover:scale-105 
                ring-2 ring-gray-600 hover:ring-gray-400 rounded-lg"
              >
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full aspect-[2/3] object-cover rounded-lg"
                />

                {/* Hover overlay */}
                <div
                  className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-75 
                  transition-opacity rounded-lg flex flex-col items-center justify-center opacity-0 
                  group-hover:opacity-100"
                >
                  <h3 className="text-xl font-bold text-center px-2 mb-2">
                    {movie.title}
                  </h3>
                  <p className="text-sm text-gray-300 mb-4">
                    {movie.year} • {movie.runtime}
                  </p>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => setExpandedMovie(movie.id)}
                      className="bg-yellow-500 hover:bg-yellow-600 p-2 rounded-full 
                        transition-colors"
                    >
                      <Info className="w-6 h-6 text-black" />
                    </button>
                    <button
                      onClick={() => toggleFavorite(movie.id)}
                      className={`p-2 rounded-full transition-colors
                        ${
                          favorites.includes(movie.id)
                            ? "bg-red-500 hover:bg-red-600"
                            : "bg-gray-500 hover:bg-gray-600"
                        }`}
                    >
                      <Heart
                        className="w-6 h-6"
                        fill={
                          favorites.includes(movie.id) ? "currentColor" : "none"
                        }
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Expanderet film information */}
              {expandedMovie === movie.id && (
                <div
                  className="fixed inset-0 bg-black bg-opacity-75 flex items-center 
                  justify-center p-4 z-50"
                >
                  <div className="bg-gray-800 rounded-xl max-w-3xl p-6 m-4 relative">
                    <button
                      onClick={() => setExpandedMovie(null)}
                      className="absolute top-4 right-4 text-gray-400 hover:text-white"
                    >
                      ✕
                    </button>

                    <div className="flex gap-6">
                      <img
                        src={movie.poster}
                        alt={movie.title}
                        className="w-64 rounded-lg"
                      />
                      <div className="flex-1">
                        <h2 className="text-3xl font-bold mb-2">
                          {movie.title}
                        </h2>
                        <div className="flex items-center mb-4 text-sm text-gray-300">
                          <Clock className="w-4 h-4 mr-1" />
                          <span className="mr-3">{movie.runtime}</span>
                          <span className="mr-3">•</span>
                          <span className="mr-3">{movie.year}</span>
                          <span className="mr-3">•</span>
                          <span className="text-yellow-400">★</span>
                          <span className="ml-1">{movie.rating}</span>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {movie.genre.map((g) => (
                            <span
                              key={g}
                              className="bg-gray-700 px-3 py-1 rounded-full text-sm"
                            >
                              {g}
                            </span>
                          ))}
                        </div>

                        <p className="text-gray-300 mb-4">{movie.synopsis}</p>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <h3 className="font-semibold flex items-center mb-2">
                              <User className="w-4 h-4 mr-2" />
                              Instruktør
                            </h3>
                            <p className="text-gray-300">{movie.director}</p>
                          </div>
                          <div>
                            <h3 className="font-semibold flex items-center mb-2">
                              <Award className="w-4 h-4 mr-2" />
                              Priser
                            </h3>
                            <ul className="text-gray-300 text-sm">
                              {movie.awards.map((award) => (
                                <li key={award}>{award}</li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="mb-4">
                          <h3 className="font-semibold flex items-center mb-2">
                            <Film className="w-4 h-4 mr-2" />
                            Medvirkende
                          </h3>
                          <p className="text-gray-300">
                            {movie.cast.join(", ")}
                          </p>
                        </div>

                        <div className="border-t border-gray-700 pt-4 mt-4">
                          <h3 className="font-semibold mb-2">
                            Hvorfor vi anbefaler denne film
                          </h3>
                          <p className="text-gray-300">
                            {movie.recommendationReason}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h3 className="font-semibold mb-2">Se filmen på</h3>
                      <div className="flex flex-wrap gap-2">
                        {movie.streamingServices.map((service) => (
                          <span
                            key={service}
                            className="bg-gray-700 px-3 py-1 rounded-full text-sm"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
