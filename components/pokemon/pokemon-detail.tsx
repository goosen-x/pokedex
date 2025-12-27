'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Heart } from 'lucide-react';
import { usePokemon } from '@/hooks/use-pokemon';
import { useCompareStore } from '@/stores/compare-store';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { StatsChart } from './stats-chart';
import { EvolutionChain } from './evolution-chain';
import {
  formatPokemonName,
  formatPokemonId,
  formatHeightImperial,
  formatWeightImperial,
  formatHeight,
  formatWeight,
  getPokemonImageUrl,
  getEnglishGenus,
  getEnglishFlavorText,
  formatGenderRate,
  formatEggGroups,
} from '@/lib/api/pokeapi';
import { TYPE_BG_COLORS, TYPE_COLORS, type PokemonTypeName } from '@/lib/types/pokemon';
import { cn } from '@/lib/utils';

interface PokemonDetailProps {
  id: string;
}

export function PokemonDetail({ id }: PokemonDetailProps) {
  const { pokemon, species, evolutionChain, isLoading, isError, error } =
    usePokemon(id);
  const { addToCompare, isInCompare } = useCompareStore();

  const isSelected = pokemon ? isInCompare(pokemon.id) : false;

  if (isLoading) {
    return <PokemonDetailSkeleton />;
  }

  if (isError || !pokemon) {
    return (
      <Card className="mx-auto max-w-md border-destructive/50">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <p className="mb-4 text-lg text-destructive">
            Error loading Pokemon: {error?.message || 'Pokemon not found'}
          </p>
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  const primaryType = pokemon.types[0]?.type.name as PokemonTypeName;
  const genderRatio = species ? formatGenderRate(species.gender_rate) : null;

  return (
    <div className="container mx-auto px-4 py-6 pb-24 max-w-3xl">
      <Card className="relative overflow-hidden border">
        {/* Color accent stripe */}
        <div className={cn('absolute left-0 top-0 bottom-0 w-2', TYPE_BG_COLORS[primaryType])} />

        <CardContent className="p-6 pl-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl font-bold">{formatPokemonName(pokemon.name)}</h1>
                <span className="text-muted-foreground">{formatPokemonId(pokemon.id)}</span>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {pokemon.types.map((typeSlot) => {
                  const typeName = typeSlot.type.name as PokemonTypeName;
                  return (
                    <Badge
                      key={typeName}
                      className={cn('capitalize text-white', TYPE_COLORS[typeName])}
                    >
                      {typeName}
                    </Badge>
                  );
                })}
                {species && (
                  <span className="text-muted-foreground text-sm">• {getEnglishGenus(species)}</span>
                )}
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className={cn(isSelected && 'text-red-500')}
              onClick={() => addToCompare(pokemon)}
            >
              <Heart className={cn('h-5 w-5', isSelected && 'fill-current')} />
            </Button>
          </div>

          {/* Image + Description */}
          <div className="flex flex-col sm:flex-row gap-6 mb-6">
            <div className="relative w-32 h-32 flex-shrink-0 bg-muted/30 rounded-2xl mx-auto sm:mx-0">
              <Image
                src={getPokemonImageUrl(pokemon.id)}
                alt={pokemon.name}
                fill
                className="object-contain p-2"
                priority
              />
            </div>
            <div className="flex-1">
              {species && (
                <p className="text-sm text-muted-foreground mb-4">
                  {getEnglishFlavorText(species)}
                </p>
              )}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground text-xs">Height</p>
                  <p className="font-semibold">{formatHeight(pokemon.height)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Weight</p>
                  <p className="font-semibold">{formatWeight(pokemon.weight)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Abilities</p>
                  <p className="font-semibold text-xs">
                    {pokemon.abilities
                      .map((a) => formatPokemonName(a.ability.name) + (a.is_hidden ? ' (H)' : ''))
                      .join(', ')}
                  </p>
                </div>
                {species && (
                  <div>
                    <p className="text-muted-foreground text-xs">Egg Groups</p>
                    <p className="font-semibold text-xs">
                      {species.egg_groups?.length > 0 ? formatEggGroups(species.egg_groups) : 'Unknown'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="stats" className="w-full">
            <TabsList className="w-full justify-start bg-muted/50 p-1 rounded-lg">
              <TabsTrigger value="stats" className="rounded-md">Stats</TabsTrigger>
              <TabsTrigger value="evolution" className="rounded-md">Evolution</TabsTrigger>
              <TabsTrigger value="moves" className="rounded-md">Moves</TabsTrigger>
              <TabsTrigger value="breeding" className="rounded-md">Breeding</TabsTrigger>
            </TabsList>

            {/* Stats Tab */}
            <TabsContent value="stats" className="pt-4">
              <StatsChart stats={pokemon.stats} type={primaryType} />
            </TabsContent>

            {/* Evolution Tab */}
            <TabsContent value="evolution" className="pt-4">
              {evolutionChain ? (
                <EvolutionChain
                  chain={evolutionChain}
                  currentPokemonId={pokemon.id}
                />
              ) : (
                <p className="text-center text-muted-foreground">
                  Loading evolution data...
                </p>
              )}
            </TabsContent>

            {/* Moves Tab */}
            <TabsContent value="moves" className="pt-4">
              <p className="mb-4 text-sm text-muted-foreground">
                {pokemon.moves.length} moves available
              </p>
              <div className="flex flex-wrap gap-2">
                {pokemon.moves.slice(0, 50).map((move) => (
                  <Badge key={move.move.name} variant="outline">
                    {formatPokemonName(move.move.name)}
                  </Badge>
                ))}
                {pokemon.moves.length > 50 && (
                  <Badge variant="secondary">
                    +{pokemon.moves.length - 50} more
                  </Badge>
                )}
              </div>
            </TabsContent>

            {/* Breeding Tab */}
            <TabsContent value="breeding" className="pt-4">
              {species && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Gender Ratio</span>
                    {genderRatio ? (
                      <div className="flex items-center gap-3">
                        <span className="text-blue-500">♂ {genderRatio.male.toFixed(1)}%</span>
                        <span className="text-pink-500">♀ {genderRatio.female.toFixed(1)}%</span>
                      </div>
                    ) : (
                      <span className="font-medium">Genderless</span>
                    )}
                  </div>
                  <InfoRow
                    label="Egg Groups"
                    value={species.egg_groups?.length > 0 ? formatEggGroups(species.egg_groups) : 'Unknown'}
                  />
                  <InfoRow
                    label="Egg Cycles"
                    value={species.hatch_counter ? `${species.hatch_counter} cycles` : 'Unknown'}
                  />
                  <InfoRow
                    label="Capture Rate"
                    value={species.capture_rate ? `${species.capture_rate}` : 'Unknown'}
                  />
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="fixed bottom-6 left-1/2 flex -translate-x-1/2 gap-2 p-2 rounded-full bg-background/60 backdrop-blur-xl shadow-lg border">
        {pokemon.id > 1 && (
          <Link href={`/pokemon/${pokemon.id - 1}`}>
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
        )}
        <Link href="/pokemon">
          <Button variant="ghost" className="rounded-full px-4">
            All Pokemon
          </Button>
        </Link>
        <Link href={`/pokemon/${pokemon.id + 1}`}>
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="h-4 w-4 rotate-180" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-foreground">{value}</span>
    </div>
  );
}

function PokemonDetailSkeleton() {
  return (
    <div className="container mx-auto px-4 py-6">
      <Card className="relative overflow-hidden border">
        <div className="absolute left-0 top-0 bottom-0 w-2 bg-muted" />
        <CardContent className="p-6 pl-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <Skeleton className="h-8 w-40 mb-2" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
            </div>
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>

          {/* Image + Info */}
          <div className="flex flex-col sm:flex-row gap-6 mb-6">
            <Skeleton className="w-32 h-32 rounded-2xl mx-auto sm:mx-0" />
            <div className="flex-1 space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <div className="grid grid-cols-2 gap-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Skeleton className="h-10 w-full rounded-lg mb-4" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
