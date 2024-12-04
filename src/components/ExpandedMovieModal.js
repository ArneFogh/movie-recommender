// src/components/ExpandedMovieModal.js
import Image from "next/image";
import { Clock, Award, User, Film } from "lucide-react";

const ExpandedMovieModal = ({ movie, onClose }) => {
  if (!movie) return null;

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
                <p className="text-gray-300">{movie.cast.join(", ")}</p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold mb-2">
                  Hvorfor vi anbefaler denne film
                </h3>
                <p className="text-gray-300">{movie.recommendationReason}</p>
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
      </div>
    </div>
  );
};

export default ExpandedMovieModal;
