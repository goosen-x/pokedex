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
  fullHeight?: boolean;
}

export function PokemonSilhouette({
  pokemonId,
  isRevealed,
  compact = false,
  fullHeight = false,
}: PokemonSilhouetteProps) {
  // fullHeight mode uses 100% of container
  if (fullHeight) {
    if (pokemonId === null) {
      return (
        <div className="h-full w-full flex items-center justify-center">
          <Skeleton className="h-3/4 aspect-square rounded-full" />
        </div>
      );
    }

    return (
      <div className="relative h-full w-full flex items-center justify-center">
        <Image
          src={getPokemonImageUrl(pokemonId)}
          alt="Who's that Pokemon?"
          fill
          className={cn(
            'object-contain drop-shadow-xl transition-all duration-500',
            !isRevealed && 'brightness-0'
          )}
          priority
        />
      </div>
    );
  }

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
