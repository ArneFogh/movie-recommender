// src/components/ContinueButton.js
import React from "react";

const ContinueButton = ({ selectedMoviesCount, onSubmit, isEnabled }) => {
  return (
    <button
      onClick={onSubmit}
      disabled={!isEnabled}
      className={`group relative px-8 py-4 rounded-xl transition-all duration-300 
        ${
          isEnabled
            ? "hover:scale-105 scale-100"
            : "opacity-70 cursor-not-allowed scale-95 hover:scale-95"
        }`}
    >
      {/* Animated background gradient */}
      <div
        className={`absolute inset-0 rounded-xl transition-opacity duration-300
          bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500
          ${isEnabled ? "opacity-20 group-hover:opacity-30" : "opacity-5"}`}
      />

      {/* Shine effect */}
      <div className="absolute inset-0 rounded-xl overflow-hidden">
        <div
          className={`absolute inset-0 translate-x-[-100%] 
            bg-gradient-to-r from-transparent via-white/10 to-transparent
            ${isEnabled ? "animate-[shimmer_2s_infinite]" : ""}`}
        />
      </div>

      {/* Glass overlay */}
      <div className="absolute inset-0 rounded-xl bg-black/20 backdrop-blur-sm" />
      <div className="absolute inset-[1px] rounded-xl bg-black/90" />

      {/* Border */}
      <div
        className={`absolute inset-0 rounded-xl border 
          transition-colors duration-300
          ${
            isEnabled
              ? "border-white/20 group-hover:border-white/40"
              : "border-white/5"
          }`}
      />

      {/* Button content */}
      <div className="relative flex items-center gap-2">
        <span
          className={`text-lg font-medium transition-colors duration-300
            ${isEnabled ? "text-white" : "text-gray-400"}`}
        >
          {isEnabled ? (
            <>
              Fortsæt
              <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </>
          ) : (
            `Vælg ${5 - selectedMoviesCount} film mere`
          )}
        </span>
      </div>

      {/* Processing dots - only show when enabled */}
      {isEnabled && (
        <div className="absolute -bottom-7 left-1/2 transform -translate-x-1/2">
          <div className="flex gap-1.5">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-1 h-1 rounded-full bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500"
                style={{
                  animation: "processingPulse 1s ease infinite",
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            ))}
          </div>
        </div>
      )}
    </button>
  );
};

export default ContinueButton;
