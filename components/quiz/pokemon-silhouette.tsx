'use client';

import Image from 'next/image';
import { getPokemonImageUrl } from '@/lib/api/pokeapi';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

interface PokemonSilhouetteProps {
  pokemonId: number | null;
  isRevealed: boolean;
  isLoading?: boolean;
}

export function PokemonSilhouette({
  pokemonId,
  isRevealed,
}: PokemonSilhouetteProps) {
  if (pokemonId === null) {
    return (
      <div className="flex h-64 w-64 items-center justify-center">
        <Skeleton className="h-48 w-48 rounded-full" />
      </div>
    );
  }

  return (
    <div className="relative flex h-64 w-64 items-center justify-center">
      <Image
        src={getPokemonImageUrl(pokemonId)}
        alt="Who's that Pokemon?"
        width={200}
        height={200}
        className={cn(
          'drop-shadow-xl transition-all duration-500',
          !isRevealed && 'brightness-0'
        )}
        priority
      />
    </div>
  );
}
