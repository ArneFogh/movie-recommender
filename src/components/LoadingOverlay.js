// src/components/LoadingOverlay.js
export default function LoadingOverlay({ variant = "bars" }) {
  // Vælg mellem "circles", "bars", eller "pulse"
  const loadingAnimations = {
    // Roterende cirkler der følger hinanden
    circles: (
      <div className="relative w-20 h-20 mx-auto mb-8">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className={`absolute inset-0 rounded-full border-2 border-transparent
              border-t-rose-500 border-r-orange-500
              animate-[spin_1.5s_linear_infinite]`}
            style={{
              animationDelay: `${-i * 0.2}s`,
              padding: `${i * 8}px`,
            }}
          />
        ))}
      </div>
    ),

    // Gradient bars der pulserer
    bars: (
      <div className="flex justify-center gap-2 mb-8">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-2 rounded-full bg-gradient-to-t from-rose-500 via-orange-500 to-amber-500 animate-pulse"
            style={{
              height: "40px",
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
      </div>
    ),

    // Pulserende ring med gradient
    pulse: (
      <div className="relative w-24 h-24 mx-auto mb-8">
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-rose-500 via-orange-500 to-amber-500 animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_infinite]" />
        <div className="absolute inset-2 rounded-full bg-background" />
        <div
          className="absolute inset-4 rounded-full bg-gradient-to-tr from-rose-500 via-orange-500 to-amber-500 animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_infinite]"
          style={{ animationDelay: "-0.5s" }}
        />
        <div className="absolute inset-6 rounded-full bg-background" />
        <div className="absolute inset-8 rounded-full bg-gradient-to-tr from-rose-500 via-orange-500 to-amber-500 animate-spin" />
      </div>
    ),
  };

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
          {/* Loading Animation */}
          {loadingAnimations[variant]}

          {/* Text Content */}
          <h2
            className="text-2xl font-display font-bold mb-4 text-center
            bg-clip-text text-transparent bg-gradient-to-r from-rose-500 via-orange-400 to-amber-400 animate-text-shine"
          >
            Analyserer dine valg
          </h2>

          <div className="space-y-4">
            <p className="text-gray-300 text-center">
              Vi finder de perfekte film til dig baseret på:
            </p>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500/50" />
                Genre præferencer og tematiske ligheder
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500/50" />
                Ratings mønstre og populæritet
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500/50" />
                Instruktør og skuespiller overlap
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500/50" />
                Visuelle og narrativ stil
              </li>
            </ul>
          </div>

          {/* Processing Status */}
          <div className="mt-6 text-center">
            <p
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full 
              bg-white/5 border border-white/10 text-gray-300"
            >
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              Bearbejder data...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
