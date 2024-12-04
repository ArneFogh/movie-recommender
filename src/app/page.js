"use client";

import React from "react";
import TextGenerateEffect from "@/components/TextGenerateEffect";
import AnimatedButton from "@/components/AnimatedButton";

export default function LandingPage() {
  const description =
    "Udforsk en verden af film håndplukket til dig. Vores intelligente anbefalingssystem analyserer dine filmvalg og finder skjulte perler, der matcher din unikke smag.";

  return (
    <main className="min-h-screen bg-background overflow-hidden">
      {/* Background elements med varme farver */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background-lighter to-background animate-gradient" />

        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-rose-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
        </div>

        <div className="absolute inset-0 bg-[linear-gradient(to_right,#232323_1px,transparent_1px),linear-gradient(to_bottom,#232323_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10" />
      </div>

      {/* Main content */}
      <div className="relative z-10">
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="p-8 rounded-2xl bg-black/20 backdrop-blur-xl border border-white/5 shadow-2xl">
              {/* Main heading */}
              <div className="relative inline-block mb-6">
                <h1 className="font-display text-5xl md:text-6xl font-bold tracking-tight">
                  Find din næste
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-500 via-orange-400 to-amber-400 animate-text-shine">
                    {" "}
                    favoritfilm
                  </span>{" "}
                  på få sekunder
                </h1>
                <div className="absolute -inset-1 blur-2xl bg-rose-500/10 -z-10" />
              </div>

              {/* Product description with text generate effect */}
              <div className="mb-8">
                <TextGenerateEffect
                  words={description}
                  className="text-lg max-w-2xl mx-auto leading-relaxed"
                />
              </div>

              {/* How it works */}
              <p className="text-xl md:text-2xl mb-12 text-gray-300 max-w-2xl mx-auto leading-relaxed font-display">
                Vælg 5 film fra vores top 20, og vi anbefaler 10 film til dig
              </p>

              {/* New Animated Button */}
              <div className="flex justify-center">
                <AnimatedButton href="/select-movies">
                  Kom i gang
                </AnimatedButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
