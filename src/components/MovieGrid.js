// src/components/MovieGrid.js
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
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
      {movies.map((movie) => (
        <div
          key={movie.id}
          onClick={() => handleMovieClick(movie.id)}
          className={`relative cursor-pointer transition-transform hover:scale-105 rounded-lg
            ${
              selectedMovies.includes(movie.id)
                ? "ring-4 ring-green-500"
                : "ring-2 ring-gray-600"
            }`}
        >
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full h-auto rounded-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-75 transition-opacity rounded-lg flex flex-col items-center justify-center opacity-0 hover:opacity-100">
            <h3 className="text-xl font-bold text-center px-2">
              {movie.title}
            </h3>
            <p className="text-gray-300 mt-2">{movie.genre}</p>
            <p className="text-yellow-400">★ {movie.rating}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
