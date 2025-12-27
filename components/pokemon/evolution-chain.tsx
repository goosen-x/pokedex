'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { EvolutionChain as EvolutionChainType, EvolutionChainLink } from '@/lib/types/pokemon';
import { getPokemonImageUrl, formatPokemonName, extractPokemonId } from '@/lib/api/pokeapi';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface EvolutionChainProps {
  chain: EvolutionChainType;
  currentPokemonId: number;
}

interface EvolutionStageProps {
  link: EvolutionChainLink;
  currentPokemonId: number;
}

function EvolutionStage({ link, currentPokemonId }: EvolutionStageProps) {
  const pokemonId = extractPokemonId(link.species.url);
  const isCurrent = pokemonId === currentPokemonId;

  // Получаем условие эволюции
  const evolutionDetail = link.evolution_details[0];
  let evolutionTrigger = '';

  if (evolutionDetail) {
    if (evolutionDetail.min_level) {
      evolutionTrigger = `Level ${evolutionDetail.min_level}`;
    } else if (evolutionDetail.item) {
      evolutionTrigger = formatPokemonName(evolutionDetail.item.name);
    } else if (evolutionDetail.min_happiness) {
      evolutionTrigger = 'Friendship';
    } else if (evolutionDetail.trigger.name === 'trade') {
      evolutionTrigger = 'Trade';
    }
  }

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Evolution trigger arrow */}
      {evolutionTrigger && (
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex cursor-help items-center gap-1 text-xs text-muted-foreground">
              <span className="text-lg">→</span>
              <span>{evolutionTrigger}</span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Evolution trigger: {evolutionTrigger}</p>
          </TooltipContent>
        </Tooltip>
      )}

      {/* Pokemon Card */}
      <Link href={`/pokemon/${pokemonId}`}>
        <Card
          className={cn(
            'transition-all hover:bg-accent',
            isCurrent && 'ring-2 ring-primary'
          )}
        >
          <CardContent className="flex flex-col items-center gap-2 p-3">
            <div className="relative h-20 w-20">
              <Image
                src={getPokemonImageUrl(pokemonId)}
                alt={link.species.name}
                fill
                className="object-contain"
                sizes="80px"
              />
            </div>
            <span className="text-sm font-medium capitalize">
              {formatPokemonName(link.species.name)}
            </span>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}

// Рекурсивная функция для получения всех эволюций
function flattenEvolutionChain(
  link: EvolutionChainLink,
  result: EvolutionChainLink[] = []
): EvolutionChainLink[] {
  result.push(link);

  for (const evolution of link.evolves_to) {
    flattenEvolutionChain(evolution, result);
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
    <TooltipProvider>
      <div className="flex flex-wrap items-center justify-center gap-4">
        {evolutions.map((evo) => (
          <EvolutionStage
            key={evo.species.name}
            link={evo}
            currentPokemonId={currentPokemonId}
          />
        ))}
      </div>
    </TooltipProvider>
  );
}
