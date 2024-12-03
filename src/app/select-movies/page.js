// src/app/select-movies/page.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LoadingOverlay from "@/components/LoadingOverlay";
import MovieGrid from "@/components/MovieGrid";
import SelectionHeader from "@/components/SelectionHeader";

const MOVIE_POSTERS = {
  "The Shawshank Redemption":
    "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg",
  "The Godfather":
    "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
  "The Dark Knight":
    "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg",
  "Pulp Fiction":
    "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
  "Fight Club":
    "https://m.media-amazon.com/images/M/MV5BMmEzNTkxYjQtZTc0MC00YTVjLTg5ZTEtZWMwOWVlYzY0NWIwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
  Inception:
    "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg",
  "The Matrix":
    "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
  Interstellar:
    "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
  "The Silence of the Lambs":
    "https://m.media-amazon.com/images/M/MV5BNjNhZTk0ZmEtNjJhMi00YzFlLWE1MmEtYzM1M2ZmMGMwMTU4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
  Gladiator:
    "https://m.media-amazon.com/images/M/MV5BMDliMmNhNDEtODUyOS00MjNlLTgxODEtN2U3NzIxMGVkZTA1L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
  "The Lord of the Rings":
    "https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_.jpg",
  "Forrest Gump":
    "https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg",
  "The Green Mile":
    "https://m.media-amazon.com/images/M/MV5BMTUxMzQyNjA5MF5BMl5BanBnXkFtZTYwOTU2NTY3._V1_.jpg",
  "Saving Private Ryan":
    "https://m.media-amazon.com/images/M/MV5BZjhkMDM4MWItZTVjOC00ZDRhLThmYTAtM2I5NzBmNmNlMzI1XkEyXkFqcGdeQXVyNDYyMDk5MTU@._V1_.jpg",
  "Jurassic Park":
    "https://m.media-amazon.com/images/M/MV5BMjM2MDgxMDg0Nl5BMl5BanBnXkFtZTgwNTM2OTM5NDE@._V1_.jpg",
  "The Departed":
    "https://m.media-amazon.com/images/I/81ZOilPKzYL._AC_UF1000,1000_QL80_.jpg",
  Goodfellas:
    "https://m.media-amazon.com/images/M/MV5BY2NkZjEzMDgtN2RjYy00YzM1LWI4ZmQtMjIwYjFjNmI3ZGEwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
  Se7en:
    "https://m.media-amazon.com/images/M/MV5BOTUwODM5MTctZjczMi00OTk4LTg3NWUtNmVhMTAzNTNjYjcyXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
  "The Usual Suspects":
    "https://m.media-amazon.com/images/M/MV5BYTViNjMyNmUtNDFkNC00ZDRlLThmMDUtZDU2YWE4NGI2ZjVmXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
  Memento:
    "https://m.media-amazon.com/images/M/MV5BZTcyNjk1MjgtOWI3Mi00YzQwLWI5MTktMzY4ZmI2NDAyNzYzXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
};

// Film data array
const movies = Object.entries(MOVIE_POSTERS).map(([title, poster], index) => ({
  id: index + 1,
  title,
  poster,
  genre: "Drama", // Du kan tilføje faktiske genrer her
  rating: 8.5 + Math.random() * 1, // Genererer random rating mellem 8.5 og 9.5
}));

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
        <h1 className="text-4xl font-bold text-center mb-8">
          Vælg dine favorit film
        </h1>

        <div className="fixed top-4 right-4 bg-gray-800 px-4 py-2 rounded-lg">
          <p className="text-lg font-semibold">
            Valgte film: {selectedMovies.length}/5
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <div
              key={movie.id}
              onClick={() => {
                setSelectedMovies((prev) => {
                  if (prev.includes(movie.id)) {
                    return prev.filter((id) => id !== movie.id);
                  }
                  if (prev.length < 5) {
                    return [...prev, movie.id];
                  }
                  return prev;
                });
              }}
              className={`relative cursor-pointer transition-transform hover:scale-105 
                ${
                  selectedMovies.includes(movie.id)
                    ? "ring-4 ring-green-500"
                    : "ring-2 ring-gray-600 hover:ring-gray-400"
                }`}
            >
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full aspect-[2/3] object-cover rounded-lg"
                style={{ maxHeight: "450px" }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-75 transition-opacity rounded-lg flex flex-col items-center justify-center opacity-0 hover:opacity-100">
                <h3 className="text-xl font-bold text-center px-2">
                  {movie.title}
                </h3>
                <p className="text-yellow-400 mt-2">
                  ★ {movie.rating.toFixed(1)}
                </p>
              </div>
            </div>
          ))}
        </div>

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
