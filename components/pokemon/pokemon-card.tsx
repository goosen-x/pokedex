'use client';

import { memo, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useQueryClient } from '@tanstack/react-query';
import { Badge } from '@/components/ui/badge';
import {
  formatPokemonName,
  getPokemonImageUrl,
  getPokemon,
  getPokemonSpecies,
} from '@/lib/api/pokeapi';
import { TYPE_BG_COLORS, TYPE_COLORS, type Pokemon, type PokemonTypeName } from '@/lib/types/pokemon';
import { cn } from '@/lib/utils';

interface PokemonCardProps {
  pokemon: Pokemon;
}

export const PokemonCard = memo(function PokemonCard({ pokemon }: PokemonCardProps) {
  const primaryType = pokemon.types[0]?.type.name as PokemonTypeName;
  const queryClient = useQueryClient();

  // Prefetch Pokemon detail data on hover
  const handleMouseEnter = useCallback(() => {
    // Prefetch Pokemon details (already have basic data, but species has more)
    queryClient.prefetchQuery({
      queryKey: ['pokemon-species', pokemon.id],
      queryFn: () => getPokemonSpecies(pokemon.id),
      staleTime: 1000 * 60 * 10, // 10 minutes
    });

    // Also prefetch evolution chain data for faster detail page loading
    queryClient.prefetchQuery({
      queryKey: ['pokemon', pokemon.id],
      queryFn: () => getPokemon(pokemon.id),
      staleTime: 1000 * 60 * 10,
    });
  }, [pokemon.id, queryClient]);

  return (
    <Link href={`/pokemon/${pokemon.id}`} onMouseEnter={handleMouseEnter}>
      <div className="group relative flex items-center justify-between overflow-hidden rounded-2xl p-4 bg-card border transition-all hover:shadow-lg hover:scale-[1.02]">
        {/* Color accent stripe */}
        <div className={cn('absolute left-0 top-0 bottom-0 w-1.5 rounded-l-2xl', TYPE_BG_COLORS[primaryType])} />

        {/* Left side: Name and Types */}
        <div className="z-10 flex flex-col gap-2 pl-2">
          <h3 className="text-lg font-bold">
            {formatPokemonName(pokemon.name)}
          </h3>

          {/* Pokemon Types */}
          <div className="flex flex-wrap gap-1">
            {pokemon.types.map((typeSlot) => {
              const typeName = typeSlot.type.name as PokemonTypeName;
              return (
                <Badge
                  key={typeName}
                  className={cn(
                    'rounded-full px-2 py-0.5 text-xs capitalize text-white',
                    TYPE_COLORS[typeName]
                  )}
                >
                  {typeName}
                </Badge>
              );
            })}
          </div>
        </div>

        {/* Right side: Pokemon Image */}
        <div className="relative h-20 w-20 flex-shrink-0">
          <Image
            src={getPokemonImageUrl(pokemon.id)}
            alt={pokemon.name}
            fill
            className="object-contain transition-transform group-hover:scale-110"
            sizes="80px"
            priority={pokemon.id <= 20}
          />
        </div>
      </div>
    </Link>
  );
});
