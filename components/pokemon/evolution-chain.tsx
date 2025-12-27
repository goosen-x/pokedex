'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { EvolutionChain as EvolutionChainType, EvolutionChainLink } from '@/lib/types/pokemon';
import { getPokemonImageUrl, formatPokemonName, extractPokemonId } from '@/lib/api/pokeapi';
import { cn } from '@/lib/utils';

interface EvolutionChainProps {
  chain: EvolutionChainType;
  currentPokemonId: number;
}

// Flatten evolution chain with triggers
function flattenEvolutionChain(
  link: EvolutionChainLink,
  result: { link: EvolutionChainLink; trigger: string }[] = [],
  isFirst = true
): { link: EvolutionChainLink; trigger: string }[] {
  const evolutionDetail = link.evolution_details[0];
  let trigger = '';

  if (evolutionDetail) {
    if (evolutionDetail.min_level) {
      trigger = `Lv. ${evolutionDetail.min_level}`;
    } else if (evolutionDetail.item) {
      trigger = formatPokemonName(evolutionDetail.item.name);
    } else if (evolutionDetail.min_happiness) {
      trigger = 'Friendship';
    } else if (evolutionDetail.trigger.name === 'trade') {
      trigger = 'Trade';
    }
  }

  result.push({ link, trigger: isFirst ? '' : trigger });

  for (const evolution of link.evolves_to) {
    flattenEvolutionChain(evolution, result, false);
  }

  return result;
}

export function EvolutionChain({ chain, currentPokemonId }: EvolutionChainProps) {
  const evolutions = flattenEvolutionChain(chain.chain);

  if (evolutions.length <= 1) {
    return (
      <p className="text-center text-muted-foreground">
        This Pokemon does not evolve.
      </p>
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-center">
      {evolutions.map((evo, index) => {
        const pokemonId = extractPokemonId(evo.link.species.url);
        const isCurrent = pokemonId === currentPokemonId;

        return (
          <div key={evo.link.species.name} className="flex items-center">
            {/* Connector with arrow and trigger */}
            {index > 0 && (
              <div className="flex items-center mx-2">
                <div className="w-4 h-0.5 bg-border" />
                <div className="flex flex-col items-center px-2">
                  <ArrowRight className="h-4 w-4 text-primary" />
                  {evo.trigger && (
                    <span className="text-[10px] text-muted-foreground mt-0.5 whitespace-nowrap">
                      {evo.trigger}
                    </span>
                  )}
                </div>
                <div className="w-4 h-0.5 bg-border" />
              </div>
            )}

            {/* Pokemon Card */}
            <Link href={`/pokemon/${pokemonId}`}>
              <div
                className={cn(
                  'flex flex-col items-center p-3 rounded-2xl border bg-card transition-all hover:bg-accent cursor-pointer',
                  isCurrent && 'border-primary border-2'
                )}
              >
                <div className="relative h-16 w-16">
                  <Image
                    src={getPokemonImageUrl(pokemonId)}
                    alt={evo.link.species.name}
                    fill
                    className="object-contain"
                    sizes="64px"
                  />
                </div>
                <span className="text-xs font-medium mt-1">
                  {formatPokemonName(evo.link.species.name)}
                </span>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
