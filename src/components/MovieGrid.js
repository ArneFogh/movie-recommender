// MovieGrid.js
import Image from "next/image";

export default function MovieGrid({
  movies,
  selectedMovies,
  setSelectedMovies,
}) {
  const handleMovieClick = (movieId) => {
    setSelectedMovies((prev) => {
      if (prev.includes(movieId)) {
        return prev.filter((id) => id !== movieId);
      }
      if (prev.length < 5) {
        return [...prev, movieId];
      }
      return prev;
    });
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {movies.map((movie) => (
        <div
          key={movie.id}
          onClick={() => handleMovieClick(movie.id)}
          className={`relative cursor-pointer transition-all duration-300 group backdrop-blur-sm
            ${
              selectedMovies.includes(movie.id)
                ? "ring-2 ring-rose-500/50 scale-105"
                : "ring-1 ring-white/10 hover:ring-white/30"
            }
            rounded-xl overflow-hidden`}
        >
          {/* Poster Container */}
          <div className="aspect-[2/3] relative">
            <Image
              src={movie.poster}
              alt={movie.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
              priority={movie.id <= 5} // Priority loading for first 5 images
            />

            {/* Selection Overlay */}
            {selectedMovies.includes(movie.id) && (
              <div className="absolute inset-0 bg-rose-500/10 backdrop-blur-sm" />
            )}

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-lg font-bold text-white mb-1 line-clamp-2">
                  {movie.title}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400">★</span>
                  <span className="text-gray-200">
                    {movie.rating.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Selection Indicator */}
          {selectedMovies.includes(movie.id) && (
            <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-rose-500 flex items-center justify-center">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
