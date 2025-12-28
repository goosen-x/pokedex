"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Gamepad2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LogoCloud } from "./logo-cloud";

export function Hero() {
  return (
    <section className="relative w-full min-h-[calc(100vh-6rem)] flex flex-col items-center justify-center px-6 py-16 pb-24 sm:pb-16">
      <Badge variant="outline" className="px-4 py-1.5 rounded-full mb-6">
        1000+ Pokemon Available!
      </Badge>

      <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-center max-w-4xl">
        Your Ultimate{" "}
        <span className="text-gradient">Pokemon</span>{" "}
        Companion
      </h1>

      <p className="mt-6 text-lg sm:text-xl text-muted-foreground text-center max-w-2xl">
        Explore the complete Pokedex, compare Pokemon stats, learn about evolutions,
        and test your knowledge with our interactive quiz game.
      </p>

      <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto px-4 sm:px-0">
        <Link href="/pokemon" className="w-full sm:w-auto">
          <Button size="lg" className="w-full sm:w-auto rounded-full px-8">
            Explore Pokedex
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
        <Link href="/quiz" className="w-full sm:w-auto">
          <Button
            size="lg"
            variant="outline"
            className="w-full sm:w-auto rounded-full px-8"
          >
            <Gamepad2 className="mr-2 h-4 w-4" />
            Play Quiz
          </Button>
        </Link>
      </div>

      <LogoCloud />

      {/* Running Pikachu */}
      <motion.img
        src="/pikachu-run.gif"
        alt="Running Pikachu"
        className="absolute bottom-2 sm:bottom-4 left-0 z-10 pointer-events-none w-20 sm:w-24 h-auto pixelated"
        animate={{
          x: ['-80px', 'calc(100vw + 80px)'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
          repeatDelay: 3,
        }}
      />
    </section>
  );
}
