"use client";

import React from "react";
import Link from "next/link";
import { Play } from "lucide-react";
import TextGenerateEffect from "@/components/TextGenerateEffect";

export default function LandingPage() {
  const description =
    "Udforsk en verden af film håndplukket til dig. Vores intelligente anbefalingssystem analyserer dine filmvalg og finder skjulte perler, der matcher din unikke smag.";

  return (
    <main className="min-h-screen bg-background overflow-hidden">
      {/* Background elements with subtle color */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background-lighter to-background animate-gradient" />

        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
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
                <h1 className="text-5xl md:text-6xl font-bold">
                  Find din næste
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 animate-text-shine">
                    {" "}
                    favoritfilm
                  </span>{" "}
                  på få sekunder
                </h1>
                <div className="absolute -inset-1 blur-2xl bg-blue-500/10 -z-10" />
              </div>

              {/* Product description with text generate effect */}
              <div className="mb-8">
                <TextGenerateEffect
                  words={description}
                  className="text-lg max-w-2xl mx-auto leading-relaxed"
                />
              </div>

              {/* How it works */}
              <p className="text-xl md:text-2xl mb-12 text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Vælg 5 film fra vores top 20, og vi anbefaler 10 film til dig
              </p>

              {/* CTA Button */}
              <Link
                href="/select-movies"
                className="group relative inline-flex items-center justify-center"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur-md opacity-75 group-hover:opacity-100 transition-opacity" />
                <div className="relative px-8 py-4 bg-white/10 rounded-lg border border-white/10 transition-transform group-hover:translate-y-[-2px] group-hover:translate-x-[2px]">
                  <span className="text-lg font-semibold mr-2">Kom i gang</span>
                  <Play className="inline-block w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
