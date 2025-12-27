'use client';

import { memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import {
  formatPokemonName,
  getPokemonImageUrl,
} from '@/lib/api/pokeapi';
import { TYPE_BG_COLORS, TYPE_COLORS, type Pokemon, type PokemonTypeName } from '@/lib/types/pokemon';
import { cn } from '@/lib/utils';

interface PokemonCardProps {
  pokemon: Pokemon;
}

export const PokemonCard = memo(function PokemonCard({ pokemon }: PokemonCardProps) {
  const primaryType = pokemon.types[0]?.type.name as PokemonTypeName;

  return (
    <Link href={`/pokemon/${pokemon.id}`}>
      <div
        className={cn(
          'group relative flex items-center justify-between overflow-hidden rounded-2xl p-4 transition-all hover:shadow-lg hover:scale-[1.02]',
          TYPE_BG_COLORS[primaryType]
        )}
      >
        {/* Left side: Name and Types */}
        <div className="z-10 flex flex-col gap-2">
          <h3 className="text-lg font-bold text-white drop-shadow-sm">
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
                    'rounded-full px-2 py-0.5 text-xs capitalize text-white/90',
                    TYPE_COLORS[typeName],
                    'bg-opacity-80'
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
            className="object-contain drop-shadow-lg transition-transform group-hover:scale-110"
            sizes="80px"
            priority={pokemon.id <= 20}
          />
        </div>

        {/* Decorative pokeball pattern (subtle) */}
        <div className="pointer-events-none absolute -bottom-4 -right-4 h-24 w-24 rounded-full border-8 border-white/10" />
      </div>
    </Link>
  );
});
