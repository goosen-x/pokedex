"use client";

import Link from "next/link";
import { ArrowRight, Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { cn } from "@/lib/utils";

export function CTABanner() {
  return (
    <section className="w-full py-16 xs:py-24 px-6">
      <div className="relative max-w-screen-lg mx-auto rounded-2xl gradient-primary p-8 sm:p-12 overflow-hidden">
        {/* Animated background */}
        <AnimatedGridPattern
          numSquares={30}
          maxOpacity={0.3}
          duration={3}
          className={cn(
            "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
          )}
        />

        <div className="relative z-10 text-center text-white">
          <h2 className="text-2xl xs:text-3xl sm:text-4xl font-bold">
            Ready to Catch 'Em All?
          </h2>
          <p className="mt-4 text-white/80 max-w-xl mx-auto">
            Start your Pokemon journey today. Explore the complete Pokedex,
            compare stats, and become a Pokemon master!
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/pokemon">
              <Button
                size="lg"
                className="bg-white text-purple-600 hover:bg-white/90 rounded-full px-8"
              >
                Explore Pokedex
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/quiz">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 rounded-full px-8"
              >
                <Gamepad2 className="mr-2 h-4 w-4" />
                Play Quiz
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
