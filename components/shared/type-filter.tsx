'use client';

import { Button } from '@/components/ui/button';
import { useFilterStore } from '@/stores/filter-store';
import { TYPE_COLORS, type PokemonTypeName } from '@/lib/types/pokemon';
import { cn } from '@/lib/utils';

const POKEMON_TYPES: PokemonTypeName[] = [
  'normal',
  'fire',
  'water',
  'grass',
  'electric',
  'ice',
  'fighting',
  'poison',
  'ground',
  'flying',
  'psychic',
  'bug',
  'rock',
  'ghost',
  'dragon',
  'dark',
  'steel',
  'fairy',
];

export function TypeFilter() {
  const { selectedType, setSelectedType } = useFilterStore();

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant={selectedType === null ? 'default' : 'outline'}
        size="sm"
        onClick={() => setSelectedType(null)}
        className="text-xs"
      >
        All
      </Button>

      {POKEMON_TYPES.map((type) => (
        <Button
          key={type}
          variant="outline"
          size="sm"
          onClick={() => setSelectedType(type === selectedType ? null : type)}
          className={cn(
            'text-xs capitalize',
            selectedType === type && `${TYPE_COLORS[type]} text-white border-transparent`
          )}
        >
          {type}
        </Button>
      ))}
    </div>
  );
}
