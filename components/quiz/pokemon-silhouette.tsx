'use client';

import Image from 'next/image';
import { getPokemonImageUrl } from '@/lib/api/pokeapi';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

interface PokemonSilhouetteProps {
  pokemonId: number | null;
  isRevealed: boolean;
  isLoading?: boolean;
  compact?: boolean;
}

export function PokemonSilhouette({
  pokemonId,
  isRevealed,
  compact = false,
}: PokemonSilhouetteProps) {
  const containerSize = compact ? 'h-44 w-44' : 'h-64 w-64';
  const imageSize = compact ? 160 : 200;
  const skeletonSize = compact ? 'h-36 w-36' : 'h-48 w-48';

  if (pokemonId === null) {
    return (
      <div className={cn('flex items-center justify-center', containerSize)}>
        <Skeleton className={cn('rounded-full', skeletonSize)} />
      </div>
    );
  }

  return (
    <div className={cn('relative flex items-center justify-center', containerSize)}>
      <Image
        src={getPokemonImageUrl(pokemonId)}
        alt="Who's that Pokemon?"
        width={imageSize}
        height={imageSize}
        className={cn(
          'drop-shadow-xl transition-all duration-500',
          !isRevealed && 'brightness-0'
        )}
        priority
      />
    </div>
  );
}
