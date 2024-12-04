// src/components/LoadingOverlay.js
export default function LoadingOverlay() {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-lg flex items-center justify-center z-50">
      <div
        className="relative p-8 rounded-2xl max-w-md mx-4 w-full
        bg-black/20 backdrop-blur-xl border border-white/10 shadow-2xl"
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-rose-500/5 via-orange-500/5 to-amber-500/5 animate-gradient" />

        {/* Content container */}
        <div className="relative">
          {/* Processing Visualization */}
          <div className="flex flex-col gap-2 mb-8">
            {/* Main processing bars */}
            <div className="flex justify-center items-end gap-[3px] h-24">
              {[...Array(24)].map((_, i) => (
                <div
                  key={i}
                  className="w-1.5 rounded-sm bg-gradient-to-t from-rose-500 via-orange-500 to-amber-500"
                  style={{
                    height: "8px",
                    animation: "processingHeight 0.8s ease infinite",
                    animationDelay: `${i * 0.03}s`,
                  }}
                >
                  <div
                    className="w-full h-full rounded-sm"
                    style={{
                      background:
                        "linear-gradient(to top, transparent, rgba(255,255,255,0.2))",
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Secondary processing indicators */}
            <div className="flex justify-center gap-1 h-8">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 rounded-sm bg-gradient-to-t from-rose-500/40 via-orange-500/40 to-amber-500/40"
                  style={{
                    height: "4px",
                    animation: "processingHeight 1.2s ease infinite",
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Text Content */}
          <h2
            className="text-2xl font-display font-bold mb-4 text-center
            bg-clip-text text-transparent bg-gradient-to-r from-rose-500 via-orange-400 to-amber-400 animate-text-shine"
          >
            Træner model
          </h2>

          <div className="space-y-4">
            <p className="text-gray-300 text-center">
              Vores AI analyserer dine valg gennem flere lag:
            </p>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center gap-2">
                <div
                  className="w-1.5 h-3 rounded-sm bg-gradient-to-t from-rose-500 via-orange-500 to-amber-500"
                  style={{ animation: "processingPulse 2s ease infinite" }}
                />
                Beregner genre-vægtning og mønstre
              </li>
              <li className="flex items-center gap-2">
                <div
                  className="w-1.5 h-3 rounded-sm bg-gradient-to-t from-rose-500 via-orange-500 to-amber-500"
                  style={{
                    animation: "processingPulse 2s ease infinite",
                    animationDelay: "0.5s",
                  }}
                />
                Analyserer narrative præferencer
              </li>
              <li className="flex items-center gap-2">
                <div
                  className="w-1.5 h-3 rounded-sm bg-gradient-to-t from-rose-500 via-orange-500 to-amber-500"
                  style={{
                    animation: "processingPulse 2s ease infinite",
                    animationDelay: "1s",
                  }}
                />
                Behandler meta-data korrelationer
              </li>
              <li className="flex items-center gap-2">
                <div
                  className="w-1.5 h-3 rounded-sm bg-gradient-to-t from-rose-500 via-orange-500 to-amber-500"
                  style={{
                    animation: "processingPulse 2s ease infinite",
                    animationDelay: "1.5s",
                  }}
                />
                Optimerer anbefalings-algoritme
              </li>
            </ul>
          </div>

          {/* Processing Status */}
          <div className="mt-6 text-center">
            <p
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full 
              bg-white/5 border border-white/10 text-gray-300"
            >
              <span className="flex gap-1">
                {[...Array(4)].map((_, i) => (
                  <span
                    key={i}
                    className="w-1 h-3 rounded-sm bg-gradient-to-t from-rose-500 via-orange-500 to-amber-500"
                    style={{
                      animation: "processingPulse 1s ease infinite",
                      animationDelay: `${i * 0.25}s`,
                    }}
                  />
                ))}
              </span>
              Processing
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
