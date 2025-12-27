'use client';

import { useQuery } from '@tanstack/react-query';
import {
  getPokemon,
  getPokemonSpecies,
  getEvolutionChain,
  extractEvolutionChainId,
} from '@/lib/api/pokeapi';
import type { Pokemon, PokemonSpecies, EvolutionChain } from '@/lib/types/pokemon';

interface UsePokemonResult {
  pokemon: Pokemon | undefined;
  species: PokemonSpecies | undefined;
  evolutionChain: EvolutionChain | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

export function usePokemon(idOrName: string | number): UsePokemonResult {
  // Загрузка основных данных покемона
  const {
    data: pokemon,
    isLoading: isPokemonLoading,
    isError: isPokemonError,
    error: pokemonError,
  } = useQuery({
    queryKey: ['pokemon', idOrName],
    queryFn: () => getPokemon(idOrName),
    staleTime: 1000 * 60 * 10,
  });

  // Загрузка данных о виде
  const {
    data: species,
    isLoading: isSpeciesLoading,
    isError: isSpeciesError,
    error: speciesError,
  } = useQuery({
    queryKey: ['pokemon-species', idOrName],
    queryFn: () => getPokemonSpecies(idOrName),
    staleTime: 1000 * 60 * 10,
  });

  // Загрузка цепочки эволюции
  const evolutionChainId = species
    ? extractEvolutionChainId(species.evolution_chain.url)
    : 0;

  const {
    data: evolutionChain,
    isLoading: isEvolutionLoading,
    isError: isEvolutionError,
    error: evolutionError,
  } = useQuery({
    queryKey: ['evolution-chain', evolutionChainId],
    queryFn: () => getEvolutionChain(evolutionChainId),
    enabled: evolutionChainId > 0,
    staleTime: 1000 * 60 * 10,
  });

  const isLoading = isPokemonLoading || isSpeciesLoading || isEvolutionLoading;
  const isError = isPokemonError || isSpeciesError || isEvolutionError;
  const error = (pokemonError || speciesError || evolutionError) as Error | null;

  return {
    pokemon,
    species,
    evolutionChain,
    isLoading,
    isError,
    error,
  };
}
