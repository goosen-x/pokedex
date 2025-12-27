'use client';

import { formatPokemonName, formatPokemonId } from '@/lib/api/pokeapi';
import type { Pokemon } from '@/lib/types/pokemon';
import { cn } from '@/lib/utils';

interface QuizResultProps {
  pokemon: Pokemon;
  isCorrect: boolean;
}

export function QuizResult({ pokemon, isCorrect }: QuizResultProps) {
  return (
    <div
      className={cn(
        'rounded-xl border-2 px-4 py-3 text-center',
        isCorrect ? 'border-green-500 bg-green-500/10' : 'border-red-500 bg-red-500/10'
      )}
    >
      <p
        className={cn(
          'text-lg font-bold',
          isCorrect ? 'text-green-500' : 'text-red-500'
        )}
      >
        {isCorrect ? 'Correct!' : 'Wrong!'}
      </p>
      <p className="text-sm text-muted-foreground">
        It&apos;s {formatPokemonName(pokemon.name)} {formatPokemonId(pokemon.id)}
      </p>
    </div>
  );
}
