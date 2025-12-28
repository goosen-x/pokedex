'use client';

import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getPokemonByType, getPokemon } from '@/lib/api/pokeapi';
import type { Pokemon, PokemonTypeName } from '@/lib/types/pokemon';

const POKEMON_PER_PAGE = 24;

interface UsePokemonByTypeResult {
  pokemon: Pokemon[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  hasNextPage: boolean;
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
  totalCount: number;
}

export function usePokemonByType(type: PokemonTypeName | null): UsePokemonByTypeResult {
  // Сначала загружаем список имён покемонов данного типа (кэшируется)
  const typeListQuery = useQuery({
    queryKey: ['pokemon-type-list', type],
    queryFn: () => getPokemonByType(type!),
    enabled: !!type,
    staleTime: 1000 * 60 * 30, // 30 минут — список типов меняется редко
  });

  const pokemonNames = typeListQuery.data ?? [];
  const totalCount = pokemonNames.length;

  // Затем загружаем детали покемонов с пагинацией
  const {
    data,
    isLoading: isLoadingDetails,
    isError: isErrorDetails,
    error: errorDetails,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['pokemon-by-type-details', type, pokemonNames],
    queryFn: async ({ pageParam = 0 }) => {
      // Пагинация: берём срез списка
      const startIndex = pageParam;
      const endIndex = Math.min(startIndex + POKEMON_PER_PAGE, pokemonNames.length);
      const pageNames = pokemonNames.slice(startIndex, endIndex);

      // Загружаем детали каждого покемона
      const pokemonDetails = await Promise.all(
        pageNames.map((name) => getPokemon(name))
      );

      const nextOffset = endIndex < pokemonNames.length ? endIndex : null;

      return {
        pokemon: pokemonDetails,
        nextOffset,
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextOffset,
    initialPageParam: 0,
    enabled: !!type && pokemonNames.length > 0, // Запрос только после загрузки списка
    staleTime: 1000 * 60 * 10, // 10 минут
  });

  // Собираем всех покемонов из всех страниц
  const pokemon = data?.pages.flatMap((page) => page.pokemon) ?? [];

  const isLoading = typeListQuery.isLoading || (typeListQuery.isSuccess && isLoadingDetails);
  const isError = typeListQuery.isError || isErrorDetails;
  const error = typeListQuery.error || errorDetails;

  return {
    pokemon,
    isLoading,
    isError,
    error: error as Error | null,
    hasNextPage: !!hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    totalCount,
  };
}
