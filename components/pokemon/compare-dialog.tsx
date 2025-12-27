'use client';

import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatsChart } from './stats-chart';
import { Separator } from '@/components/ui/separator';
import { useCompareStore } from '@/stores/compare-store';
import {
  formatPokemonName,
  formatPokemonId,
  formatHeight,
  formatWeight,
  getPokemonImageUrl,
} from '@/lib/api/pokeapi';
import { TYPE_COLORS, TYPE_BG_COLORS, type Pokemon, type PokemonTypeName } from '@/lib/types/pokemon';
import { cn } from '@/lib/utils';

const STAT_NAMES: Record<string, string> = {
  hp: 'HP',
  attack: 'Attack',
  defense: 'Defense',
  'special-attack': 'Sp. Atk',
  'special-defense': 'Sp. Def',
  speed: 'Speed',
};

interface CompareSlotProps {
  pokemon: Pokemon | null;
  slot: 1 | 2;
  onRemove: () => void;
}

function CompareSlot({ pokemon, slot, onRemove }: CompareSlotProps) {
  if (!pokemon) {
    return (
      <Card className="flex h-full flex-col items-center justify-center border-2 border-dashed">
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">Select a Pokemon</p>
          <p className="text-sm text-muted-foreground">Slot {slot}</p>
        </CardContent>
      </Card>
    );
  }

  const primaryType = pokemon.types[0]?.type.name as PokemonTypeName;

  return (
    <Card className="relative overflow-hidden">
      {/* Color accent stripe */}
      <div className={cn('absolute left-0 top-0 bottom-0 w-2', TYPE_BG_COLORS[primaryType])} />

      <CardContent className="p-4 pl-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-bold">{formatPokemonName(pokemon.name)}</h3>
              <span className="text-sm text-muted-foreground">{formatPokemonId(pokemon.id)}</span>
            </div>
            <div className="flex gap-1.5">
              {pokemon.types.map((typeSlot) => {
                const typeName = typeSlot.type.name as PokemonTypeName;
                return (
                  <Badge
                    key={typeName}
                    className={cn('capitalize text-white text-xs', TYPE_COLORS[typeName])}
                  >
                    {typeName}
                  </Badge>
                );
              })}
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onRemove} className="text-xs">
            Remove
          </Button>
        </div>

        {/* Image */}
        <div className="flex justify-center my-4">
          <div className="relative h-24 w-24 bg-muted/30 rounded-xl">
            <Image
              src={getPokemonImageUrl(pokemon.id)}
              alt={pokemon.name}
              fill
              className="object-contain p-2"
            />
          </div>
        </div>

        {/* Basic Info */}
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="text-muted-foreground text-xs">Height</span>
            <p className="font-medium">{formatHeight(pokemon.height)}</p>
          </div>
          <div>
            <span className="text-muted-foreground text-xs">Weight</span>
            <p className="font-medium">{formatWeight(pokemon.weight)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function CompareDialog() {
  const { pokemon1, pokemon2, isOpen, setIsOpen, removeFromCompare, clearCompare } =
    useCompareStore();

  // Вычисляем победителя по статам
  const getStatWinner = (statName: string): 'pokemon1' | 'pokemon2' | 'tie' => {
    if (!pokemon1 || !pokemon2) return 'tie';

    const stat1 = pokemon1.stats.find((s) => s.stat.name === statName)?.base_stat || 0;
    const stat2 = pokemon2.stats.find((s) => s.stat.name === statName)?.base_stat || 0;

    if (stat1 > stat2) return 'pokemon1';
    if (stat2 > stat1) return 'pokemon2';
    return 'tie';
  };

  const total1 = pokemon1?.stats.reduce((sum, s) => sum + s.base_stat, 0) || 0;
  const total2 = pokemon2?.stats.reduce((sum, s) => sum + s.base_stat, 0) || 0;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Compare Pokemon</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Pokemon 1 */}
          <CompareSlot
            pokemon={pokemon1}
            slot={1}
            onRemove={() => removeFromCompare(1)}
          />

          {/* Pokemon 2 */}
          <CompareSlot
            pokemon={pokemon2}
            slot={2}
            onRemove={() => removeFromCompare(2)}
          />
        </div>

        {/* Charts */}
        {pokemon1 && pokemon2 && (
          <div className="grid grid-cols-2 gap-4">
            <StatsChart
              stats={pokemon1.stats}
              type={pokemon1.types[0]?.type.name as PokemonTypeName}
              compact
            />
            <StatsChart
              stats={pokemon2.stats}
              type={pokemon2.types[0]?.type.name as PokemonTypeName}
              compact
            />
          </div>
        )}

        {/* Summary */}
        {pokemon1 && pokemon2 && (
          <>
            <Separator />

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Stat Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {pokemon1.stats.map((stat) => {
                    const winner = getStatWinner(stat.stat.name);
                    const stat1 = stat.base_stat;
                    const stat2 =
                      pokemon2.stats.find((s) => s.stat.name === stat.stat.name)
                        ?.base_stat || 0;

                    return (
                      <div
                        key={stat.stat.name}
                        className="grid grid-cols-3 items-center gap-4 text-sm"
                      >
                        <span
                          className={cn(
                            'text-right font-medium',
                            winner === 'pokemon1' && 'text-green-600'
                          )}
                        >
                          {stat1}
                        </span>
                        <span className="text-center text-muted-foreground">
                          {STAT_NAMES[stat.stat.name]}
                        </span>
                        <span
                          className={cn(
                            'font-medium',
                            winner === 'pokemon2' && 'text-green-600'
                          )}
                        >
                          {stat2}
                        </span>
                      </div>
                    );
                  })}

                  <Separator />

                  <div className="grid grid-cols-3 items-center gap-4 text-sm font-bold">
                    <span
                      className={cn(
                        'text-right',
                        total1 > total2 && 'text-green-600'
                      )}
                    >
                      {total1}
                    </span>
                    <span className="text-center">Total</span>
                    <span className={cn(total2 > total1 && 'text-green-600')}>
                      {total2}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={clearCompare}>
            Clear All
          </Button>
          <Button onClick={() => setIsOpen(false)}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
