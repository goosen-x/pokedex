"use client";

import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getPokemon, getPokemonImageUrl, formatPokemonName } from "@/lib/api/pokeapi";
import { TYPE_BG_COLORS, POKEMON_TYPES, type PokemonTypeName } from "@/lib/types/pokemon";
import { Skeleton } from "@/components/ui/skeleton";
import { Marquee } from "@/components/ui/marquee";
import { cn } from "@/lib/utils";

// Разнообразные покемоны разных типов (перемешаны для разнообразия цветов)
const SHOWCASE_POKEMON_ROW1 = [
  25,   // Pikachu - electric (yellow)
  6,    // Charizard - fire (orange)
  131,  // Lapras - water (blue)
  94,   // Gengar - ghost (purple)
  3,    // Venusaur - grass (teal)
  149,  // Dragonite - dragon (indigo)
  143,  // Snorlax - normal (stone)
  38,   // Ninetales - fire (orange)
  134,  // Vaporeon - water (blue)
  65,   // Alakazam - psychic (pink)
  59,   // Arcanine - fire (orange)
  130,  // Gyarados - water (blue)
  145,  // Zapdos - electric (yellow)
  248,  // Tyranitar - rock (stone)
  282,  // Gardevoir - psychic (pink)
];

const SHOWCASE_POKEMON_ROW2 = [
  150,  // Mewtwo - psychic (pink)
  9,    // Blastoise - water (blue)
  136,  // Flareon - fire (orange)
  68,   // Machamp - fighting (red)
  76,   // Golem - rock (stone)
  135,  // Jolteon - electric (yellow)
  196,  // Espeon - psychic (pink)
  197,  // Umbreon - dark (gray)
  445,  // Garchomp - dragon (indigo)
  448,  // Lucario - fighting (red)
  392,  // Infernape - fire (orange)
  395,  // Empoleon - water (blue)
  389,  // Torterra - grass (teal)
  94,   // Gengar - ghost (purple)
  212,  // Scizor - bug (lime)
];

function PokemonCard({ id }: { id: number }) {
  const { data: pokemon, isLoading } = useQuery({
    queryKey: ["pokemon", id],
    queryFn: () => getPokemon(id),
    staleTime: 1000 * 60 * 10,
  });

  if (isLoading || !pokemon) {
    return (
      <div className="flex-shrink-0 w-32 h-40 rounded-xl bg-muted flex items-center justify-center">
        <Skeleton className="w-20 h-20 rounded-full" />
      </div>
    );
  }

  const primaryType = pokemon.types[0]?.type.name as PokemonTypeName;

  return (
    <Link href={`/pokemon/${pokemon.id}`}>
      <div
        className={cn(
          "flex-shrink-0 w-32 rounded-xl p-4 text-white transition-transform hover:scale-105",
          TYPE_BG_COLORS[primaryType]
        )}
      >
        <div className="flex justify-center">
          <Image
            src={getPokemonImageUrl(pokemon.id)}
            alt={pokemon.name}
            width={80}
            height={80}
            className="drop-shadow-lg"
          />
        </div>
        <p className="text-center font-medium text-sm mt-2 truncate">
          {formatPokemonName(pokemon.name)}
        </p>
      </div>
    </Link>
  );
}

export function PokemonShowcase() {
  return (
    <section id="pokemon" className="w-full py-16 xs:py-24 overflow-hidden">
      <h2 className="text-3xl xs:text-4xl sm:text-5xl font-bold tracking-tight text-center px-6">
        Discover All Pokemon
      </h2>
      <p className="mt-4 text-center text-muted-foreground max-w-2xl mx-auto px-6">
        From classic starters to legendary creatures
      </p>

      <div className="mt-12 relative">
        <Marquee pauseOnHover className="[--duration:60s]">
          {SHOWCASE_POKEMON_ROW1.map((id) => (
            <PokemonCard key={`row1-${id}`} id={id} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:60s] mt-4">
          {SHOWCASE_POKEMON_ROW2.map((id) => (
            <PokemonCard key={`row2-${id}`} id={id} />
          ))}
        </Marquee>

        {/* Gradient overlays */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-background to-transparent" />
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/pokemon"
          className="text-primary hover:underline font-medium"
        >
          View all 1000+ Pokemon →
        </Link>
      </div>
    </section>
  );
}
