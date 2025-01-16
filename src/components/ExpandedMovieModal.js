// src/components/ExpandedMovieModal.js
import Image from "next/image";
import { Clock, Star, Award, Users, TrendingUp, Info } from "lucide-react";

const PLACEHOLDER_IMAGE = "/placeholder-movie.jpg";

const getOptimizedImageUrl = (posterUrl) => {
  if (!posterUrl || typeof posterUrl !== "string") {
    return PLACEHOLDER_IMAGE;
  }

  try {
    // Extract base URL without size parameters
    const baseUrl = posterUrl.split("._V1_")[0];

    // For modal we want a larger image size than grid
    if (posterUrl.includes("._V1_")) {
      return `${baseUrl}._V1_SX800.jpg`;
    }

    return PLACEHOLDER_IMAGE;
  } catch (error) {
    console.warn("Error processing image URL:", error);
    return PLACEHOLDER_IMAGE;
  }
};

const ExpandedMovieModal = ({ movie, onClose }) => {
  if (!movie) return null;

  // Convert genre string to array if it's not already
  const genres = Array.isArray(movie.genre)
    ? movie.genre
    : movie.genre.split(", ");

  // Convert stars array to string if it's an array
  const stars = Array.isArray(movie.stars)
    ? movie.stars.join(", ")
    : movie.stars;

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-background/80 backdrop-blur-xl rounded-2xl max-w-4xl w-full p-6 m-4 border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-0 right-0 p-2 text-gray-400 hover:text-white
              rounded-full hover:bg-white/10 transition-colors"
          >
            ✕
          </button>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Poster with optimized image URL */}
            <div className="md:w-1/3 relative aspect-[2/3]">
              <Image
                src={getOptimizedImageUrl(movie.poster)}
                alt={movie.title}
                fill
                className="rounded-xl object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
                quality={90}
                loading="eager"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkMj4xLy0vLi44QT04OEA6Oi0tRUlCRUpJXFxcOEdKSV9BXEFBXF3/2wBDARUXFx4aHR4eHV1fOjQ6XV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV3/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
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
                  <Star className="w-4 h-4 mr-1" />
                  {movie.rating}
                </span>
                {movie.meta_score && (
                  <>
                    <span>•</span>
                    <span className="flex items-center">
                      <Award className="w-4 h-4 mr-1" />
                      Metascore: {movie.meta_score}
                    </span>
                  </>
                )}
              </div>

              {/* Genres */}
              <div className="flex flex-wrap gap-2 mb-4">
                {genres.map((genre) => (
                  <span
                    key={genre}
                    className="px-3 py-1 rounded-full text-sm
                      bg-white/5 border border-white/10"
                  >
                    {genre}
                  </span>
                ))}
              </div>

              {/* Overview */}
              <p className="text-gray-300 mb-6">{movie.overview}</p>

              {/* Additional Info Grid */}
              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                {/* Director */}
                <div>
                  <h3 className="font-semibold flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4" />
                    Instruktør
                  </h3>
                  <p className="text-gray-300">{movie.director}</p>
                </div>

                {/* Box Office */}
                {movie.gross && (
                  <div>
                    <h3 className="font-semibold flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4" />
                      Box Office
                    </h3>
                    <p className="text-gray-300">${movie.gross}</p>
                  </div>
                )}
              </div>

              {/* Cast */}
              <div className="mb-6">
                <h3 className="font-semibold flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4" />
                  Medvirkende
                </h3>
                <p className="text-gray-300">{stars}</p>
              </div>

              {/* Certificate Info */}
              {movie.certificate && (
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <h3 className="font-semibold flex items-center gap-2 mb-2">
                    <Info className="w-4 h-4" />
                    Certifikat
                  </h3>
                  <p className="text-gray-300">{movie.certificate}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpandedMovieModal;
