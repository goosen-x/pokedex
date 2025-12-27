'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { getPokemonList, getPokemon } from '@/lib/api/pokeapi';
import type { Pokemon } from '@/lib/types/pokemon';

const POKEMON_PER_PAGE = 20;

interface UsePokemonListResult {
  pokemon: Pokemon[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  hasNextPage: boolean;
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
}

export function usePokemonList(): UsePokemonListResult {
  const {
    data,
    isLoading,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['pokemon-list'],
    queryFn: async ({ pageParam = 0 }) => {
      // Получаем список
      const listResponse = await getPokemonList(POKEMON_PER_PAGE, pageParam);

      // Загружаем детали каждого покемона
      const pokemonDetails = await Promise.all(
        listResponse.results.map((item) => getPokemon(item.name))
      );

      return {
        pokemon: pokemonDetails,
        nextOffset: listResponse.next ? pageParam + POKEMON_PER_PAGE : null,
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextOffset,
    initialPageParam: 0,
    staleTime: 1000 * 60 * 10, // 10 минут
  });

  // Собираем всех покемонов из всех страниц
  const pokemon = data?.pages.flatMap((page) => page.pokemon) ?? [];

  return {
    pokemon,
    isLoading,
    isError,
    error: error as Error | null,
    hasNextPage: !!hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  };
}
