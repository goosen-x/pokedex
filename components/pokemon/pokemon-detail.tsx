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
    <div className="min-h-screen">
      {/* Colored Header Section */}
      <div
        className={cn(
          'relative px-4 pb-16 pt-4',
          TYPE_BG_COLORS[primaryType]
        )}
      >
        {/* Favorite Button */}
        <div className="mb-4 flex justify-end">
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              'text-white hover:bg-white/20',
              isSelected && 'text-red-300'
            )}
            onClick={() => addToCompare(pokemon)}
          >
            <Heart className={cn('h-6 w-6', isSelected && 'fill-current')} />
          </Button>
        </div>

        {/* Pokemon Info */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">
              {formatPokemonName(pokemon.name)}
            </h1>
            {/* Types and Genus */}
            <div className="mt-2 flex flex-wrap items-center gap-2">
              {pokemon.types.map((typeSlot) => {
                const typeName = typeSlot.type.name as PokemonTypeName;
                return (
                  <Badge
                    key={typeName}
                    className="rounded-full bg-white/25 px-3 py-1 text-xs capitalize text-white"
                  >
                    {typeName}
                  </Badge>
                );
              })}
              {species && (
                <span className="text-sm text-white/80">
                  {getEnglishGenus(species)}
                </span>
              )}
            </div>
          </div>
          <span className="text-lg font-bold text-white/80">
            {formatPokemonId(pokemon.id)}
          </span>
        </div>

        {/* Pokemon Image */}
        <div className="relative mx-auto h-48 w-48">
          <Image
            src={getPokemonImageUrl(pokemon.id)}
            alt={pokemon.name}
            fill
            className="object-contain drop-shadow-2xl"
            priority
          />
        </div>

        {/* Decorative pokeball */}
        <div className="pointer-events-none absolute -right-16 top-8 h-64 w-64 rounded-full border-[16px] border-white/10" />
      </div>

      {/* White Card with Tabs */}
      <Card className="-mt-8 rounded-t-3xl border-0 shadow-lg">
        <CardContent className="p-0">
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="grid w-full grid-cols-4 rounded-none bg-transparent p-4">
              <TabsTrigger
                value="about"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                About
              </TabsTrigger>
              <TabsTrigger
                value="stats"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                Base Stats
              </TabsTrigger>
              <TabsTrigger
                value="evolution"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                Evolution
              </TabsTrigger>
              <TabsTrigger
                value="moves"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                Moves
              </TabsTrigger>
            </TabsList>

            {/* About Tab */}
            <TabsContent value="about" className="px-6 pb-6">
              <div className="space-y-6">
                {/* Description */}
                {species && (
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {getEnglishFlavorText(species)}
                  </p>
                )}

                {/* Height & Weight Cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-muted/50 p-4">
                    <p className="text-xs text-muted-foreground">Height</p>
                    <p className="text-sm font-semibold">
                      {formatHeightImperial(pokemon.height)} ({formatHeight(pokemon.height)})
                    </p>
                  </div>
                  <div className="rounded-xl bg-muted/50 p-4">
                    <p className="text-xs text-muted-foreground">Weight</p>
                    <p className="text-sm font-semibold">
                      {formatWeightImperial(pokemon.weight)} ({formatWeight(pokemon.weight)})
                    </p>
                  </div>
                </div>

                {/* Abilities */}
                <div>
                  <p className="mb-2 text-xs text-muted-foreground">Abilities</p>
                  <p className="text-sm font-semibold">
                    {pokemon.abilities
                      .map((a) => formatPokemonName(a.ability.name) + (a.is_hidden ? ' (Hidden)' : ''))
                      .join(', ')}
                  </p>
                </div>

                {/* Breeding */}
                {species && (
                  <>
                    <h3 className="font-semibold text-foreground">Breeding</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Gender</span>
                        {genderRatio ? (
                          <div className="flex items-center gap-3">
                            <span className="text-blue-500">
                              ♂ {genderRatio.male.toFixed(1)}%
                            </span>
                            <span className="text-pink-500">
                              ♀ {genderRatio.female.toFixed(1)}%
                            </span>
                          </div>
                        ) : (
                          <span className="font-medium">Genderless</span>
                        )}
                      </div>
                      <InfoRow
                        label="Egg Groups"
                        value={species.egg_groups?.length > 0 ? formatEggGroups(species.egg_groups) : 'Unknown'}
                      />
                    </div>
                  </>
                )}
              </div>
            </TabsContent>

            {/* Stats Tab */}
            <TabsContent value="stats" className="px-6 pb-6">
              <StatsChart stats={pokemon.stats} />
            </TabsContent>

            {/* Evolution Tab */}
            <TabsContent value="evolution" className="px-6 pb-6">
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
            <TabsContent value="moves" className="px-6 pb-6">
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
          </Tabs>
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="fixed bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {pokemon.id > 1 && (
          <Link href={`/pokemon/${pokemon.id - 1}`}>
            <Button variant="outline" size="icon" className="rounded-full shadow-lg">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
        )}
        <Link href={`/pokemon/${pokemon.id + 1}`}>
          <Button variant="outline" size="icon" className="rounded-full shadow-lg">
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
    <div className="min-h-screen">
      {/* Colored Header Skeleton */}
      <div className="relative bg-muted px-4 pb-16 pt-4">
        <div className="mb-4 flex items-center justify-between">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
        <div className="mb-6">
          <Skeleton className="mb-2 h-8 w-40" />
          <div className="flex gap-2">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
        </div>
        <Skeleton className="mx-auto h-48 w-48 rounded-full" />
      </div>

      {/* Card Skeleton */}
      <Card className="-mt-8 rounded-t-3xl border-0">
        <CardContent className="p-6">
          <Skeleton className="mb-6 h-10 w-full" />
          <div className="space-y-4">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-3/4" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
