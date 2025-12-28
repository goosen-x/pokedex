"use client";

import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getPokemon, getPokemonImageUrl, formatPokemonName } from "@/lib/api/pokeapi";
import { TYPE_BG_COLORS, type PokemonTypeName } from "@/lib/types/pokemon";
import { cn } from "@/lib/utils";

const FEATURED_IDS = [25, 1, 4, 7, 150, 133]; // Pikachu, Bulbasaur, Charmander, Squirtle, Mewtwo, Eevee

export function LogoCloud() {
  const { data: pokemonList } = useQuery({
    queryKey: ["logo-cloud-pokemon"],
    queryFn: async () => {
      const promises = FEATURED_IDS.map((id) => getPokemon(id));
      return Promise.all(promises);
    },
    staleTime: 1000 * 60 * 10,
  });

  return (
    <div className="mt-12 xs:mt-16">
      <p className="text-center text-muted-foreground">
        Meet some legendary Pokemon
      </p>
      <div className="mt-6 flex items-center justify-center flex-wrap gap-4">
        {pokemonList?.map((pokemon) => {
          const primaryType = pokemon.types[0]?.type.name as PokemonTypeName;
          return (
            <Link
              key={pokemon.id}
              href={`/pokemon/${pokemon.id}`}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full transition-transform hover:scale-105",
                TYPE_BG_COLORS[primaryType],
                "text-white"
              )}
            >
              <Image
                src={getPokemonImageUrl(pokemon.id)}
                alt={pokemon.name}
                width={32}
                height={32}
              />
              <span className="font-medium text-sm">
                {formatPokemonName(pokemon.name)}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
