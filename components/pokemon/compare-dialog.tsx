'use client';

import Image from 'next/image';
import { X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatsChart } from './stats-chart';
import { Separator } from '@/components/ui/separator';
import { useCompareStore } from '@/stores/compare-store';
import { useIsMobile } from '@/hooks/use-media-query';
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

interface CompareSlotWithChartProps extends CompareSlotProps {
  showChart?: boolean;
}

function CompareSlot({ pokemon, slot, onRemove, showChart }: CompareSlotWithChartProps) {
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

      {/* Remove button */}
      <button
        onClick={onRemove}
        className="absolute top-2 right-2 z-10 p-1 rounded-full bg-muted/80 hover:bg-destructive hover:text-destructive-foreground transition-colors"
      >
        <X className="h-3.5 w-3.5" />
      </button>

      <CardContent className="p-4 pl-6 pr-8">
        {/* Header with image */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-base font-bold truncate">{formatPokemonName(pokemon.name)}</h3>
              <span className="text-xs text-muted-foreground">{formatPokemonId(pokemon.id)}</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {pokemon.types.map((typeSlot) => {
                const typeName = typeSlot.type.name as PokemonTypeName;
                return (
                  <Badge
                    key={typeName}
                    className={cn('capitalize text-white text-xs px-2 py-0', TYPE_COLORS[typeName])}
                  >
                    {typeName}
                  </Badge>
                );
              })}
            </div>
            {/* Basic Info */}
            <div className="flex gap-4 mt-2 text-xs">
              <div>
                <span className="text-muted-foreground">Height: </span>
                <span className="font-medium">{formatHeight(pokemon.height)}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Weight: </span>
                <span className="font-medium">{formatWeight(pokemon.weight)}</span>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative h-20 w-20 flex-shrink-0 bg-muted/30 rounded-xl">
            <Image
              src={getPokemonImageUrl(pokemon.id)}
              alt={pokemon.name}
              fill
              className="object-contain p-1"
            />
          </div>
        </div>

        {/* Chart inside card on mobile only */}
        {showChart && (
          <div className="mt-3 pt-3 border-t">
            <StatsChart
              stats={pokemon.stats}
              type={primaryType}
              compact
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

interface CompareContentProps {
  pokemon1: Pokemon | null;
  pokemon2: Pokemon | null;
  removeFromCompare: (slot: 1 | 2) => void;
  clearCompare: () => void;
  setIsOpen: (open: boolean) => void;
  isMobile: boolean;
}

function CompareContent({
  pokemon1,
  pokemon2,
  removeFromCompare,
  clearCompare,
  setIsOpen,
  isMobile,
}: CompareContentProps) {
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
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Pokemon 1 */}
        <CompareSlot
          pokemon={pokemon1}
          slot={1}
          onRemove={() => removeFromCompare(1)}
          showChart={isMobile && !!pokemon1 && !!pokemon2}
        />

        {/* Pokemon 2 */}
        <CompareSlot
          pokemon={pokemon2}
          slot={2}
          onRemove={() => removeFromCompare(2)}
          showChart={isMobile && !!pokemon1 && !!pokemon2}
        />
      </div>

      {/* Charts - only on desktop, on mobile they're inside cards */}
      {!isMobile && pokemon1 && pokemon2 && (
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
            <CardHeader className="pb-2">
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
      <div className={cn(
        "flex gap-2",
        isMobile ? "flex-row" : "justify-end"
      )}>
        <Button
          variant="outline"
          onClick={clearCompare}
          className={cn(isMobile && "flex-1")}
        >
          Clear All
        </Button>
        <Button
          onClick={() => setIsOpen(false)}
          className={cn(isMobile && "flex-1")}
        >
          Close
        </Button>
      </div>
    </div>
  );
}

export function CompareDialog() {
  const { pokemon1, pokemon2, isOpen, setIsOpen, removeFromCompare, clearCompare } =
    useCompareStore();
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent className="max-h-[90vh]">
          <DrawerHeader>
            <DrawerTitle className="text-xl">Compare Pokemon</DrawerTitle>
          </DrawerHeader>
          <div className="overflow-y-auto px-4 pb-6">
            <CompareContent
              pokemon1={pokemon1}
              pokemon2={pokemon2}
              removeFromCompare={removeFromCompare}
              clearCompare={clearCompare}
              setIsOpen={setIsOpen}
              isMobile={isMobile}
            />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Compare Pokemon</DialogTitle>
        </DialogHeader>
        <CompareContent
          pokemon1={pokemon1}
          pokemon2={pokemon2}
          removeFromCompare={removeFromCompare}
          clearCompare={clearCompare}
          setIsOpen={setIsOpen}
          isMobile={isMobile}
        />
      </DialogContent>
    </Dialog>
  );
}
