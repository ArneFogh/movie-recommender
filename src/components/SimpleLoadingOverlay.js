// src/components/SimpleLoadingOverlay.js
import React from "react";

const SimpleLoadingOverlay = () => {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-lg flex items-center justify-center z-50">
      <div className="relative p-8 rounded-2xl max-w-sm mx-4 w-full bg-black/20 backdrop-blur-xl border border-white/10 shadow-2xl">
        {/* Animated background gradient */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-rose-500/5 via-orange-500/5 to-amber-500/5 animate-gradient" />

        {/* Content container */}
        <div className="relative">
          {/* Loading animation bars */}
          <div className="flex justify-center items-end gap-1 h-16 mb-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="w-2 rounded-sm bg-gradient-to-t from-rose-500 via-orange-500 to-amber-500"
                style={{
                  animation: "processingHeight 1s ease infinite",
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>

          {/* Text */}
          <p className="text-center text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-rose-500 via-orange-400 to-amber-400 animate-text-shine">
            Henter data...
          </p>
        </div>
      </div>
    </div>
  );
};

export default SimpleLoadingOverlay;
