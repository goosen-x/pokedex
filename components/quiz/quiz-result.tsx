'use client';

import { formatPokemonName, formatPokemonId } from '@/lib/api/pokeapi';
import type { Pokemon } from '@/lib/types/pokemon';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface QuizResultProps {
  pokemon: Pokemon;
  isCorrect: boolean;
}

export function QuizResult({ pokemon, isCorrect }: QuizResultProps) {
  return (
    <Card
      className={cn(
        'border-2',
        isCorrect ? 'border-green-500 bg-green-500/10' : 'border-red-500 bg-red-500/10'
      )}
    >
      <CardContent className="py-4 text-center">
        <p
          className={cn(
            'text-2xl font-bold',
            isCorrect ? 'text-green-500' : 'text-red-500'
          )}
        >
          {isCorrect ? 'Correct!' : 'Wrong!'}
        </p>
        <p className="mt-2 text-lg text-muted-foreground">
          It&apos;s {formatPokemonName(pokemon.name)} {formatPokemonId(pokemon.id)}
        </p>
      </CardContent>
    </Card>
  );
}
