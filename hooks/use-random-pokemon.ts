'use client';

import { useCallback } from 'react';
import { getPokemon, getPokemonList, formatPokemonName } from '@/lib/api/pokeapi';
import { getRandomPokemonId, GENERATIONS, TOTAL_POKEMON } from '@/lib/constants/generations';
import type { Pokemon } from '@/lib/types/pokemon';

interface UseRandomPokemonResult {
  loadRandomPokemon: (generation: number | null) => Promise<{
    pokemon: Pokemon;
    options: string[];
  }>;
}

// Cache for pokemon names by generation
const pokemonNamesCache: Record<string, string[]> = {};

async function getPokemonNamesForGeneration(generation: number | null): Promise<string[]> {
  const cacheKey = generation === null ? 'all' : String(generation);

  if (pokemonNamesCache[cacheKey]) {
    return pokemonNamesCache[cacheKey];
  }

  let start = 1;
  let end = TOTAL_POKEMON;

  if (generation !== null && GENERATIONS[generation]) {
    start = GENERATIONS[generation].start;
    end = GENERATIONS[generation].end;
  }

  const limit = end - start + 1;
  const offset = start - 1;

  const response = await getPokemonList(limit, offset);
  const names = response.results.map((p) => formatPokemonName(p.name));

  pokemonNamesCache[cacheKey] = names;
  return names;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function generateOptions(correctName: string, allNames: string[]): string[] {
  const wrongNames = allNames.filter((name) => name !== correctName);
  const shuffledWrong = shuffleArray(wrongNames);
  const selectedWrong = shuffledWrong.slice(0, 3);

  const options = [...selectedWrong, correctName];
  return shuffleArray(options);
}

export function useRandomPokemon(): UseRandomPokemonResult {
  const loadRandomPokemon = useCallback(
    async (generation: number | null) => {
      const randomId = getRandomPokemonId(generation);
      const pokemon = await getPokemon(randomId);
      const correctName = formatPokemonName(pokemon.name);

      const allNames = await getPokemonNamesForGeneration(generation);
      const options = generateOptions(correctName, allNames);

      return { pokemon, options };
    },
    []
  );

  return { loadRandomPokemon };
}
