import { QueryClient } from '@tanstack/react-query';
import { getPokemonList, getPokemon, getPokemonSpecies, getEvolutionChain, extractEvolutionChainId } from '@/lib/api/pokeapi';
import type { Pokemon } from '@/lib/types/pokemon';

const POKEMON_PER_PAGE = 251;

interface PokemonPage {
  pokemon: Pokemon[];
  nextOffset: number | null;
}

export async function prefetchPokemonList(queryClient: QueryClient) {
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['pokemon-list'],
    queryFn: async ({ pageParam = 0 }) => {
      const listResponse = await getPokemonList(POKEMON_PER_PAGE, pageParam);

      // Fetch details for each Pokemon in parallel with batching
      const pokemonDetails = await Promise.all(
        listResponse.results.map((item) => getPokemon(item.name))
      );

      return {
        pokemon: pokemonDetails,
        nextOffset: listResponse.next ? pageParam + POKEMON_PER_PAGE : null,
      } as PokemonPage;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage: PokemonPage) => lastPage.nextOffset,
    pages: 1, // Only prefetch first page
  });
}

export async function prefetchPokemonDetail(queryClient: QueryClient, id: string | number) {
  // Prefetch pokemon data, species, and evolution chain in parallel
  const pokemonPromise = queryClient.prefetchQuery({
    queryKey: ['pokemon', id],
    queryFn: () => getPokemon(id),
    staleTime: 1000 * 60 * 10,
  });

  const speciesPromise = queryClient.prefetchQuery({
    queryKey: ['pokemon-species', id],
    queryFn: async () => {
      const species = await getPokemonSpecies(id);

      // Also prefetch evolution chain
      if (species.evolution_chain?.url) {
        const evolutionId = extractEvolutionChainId(species.evolution_chain.url);
        if (evolutionId) {
          await queryClient.prefetchQuery({
            queryKey: ['evolution-chain', evolutionId],
            queryFn: () => getEvolutionChain(evolutionId),
            staleTime: 1000 * 60 * 10,
          });
        }
      }

      return species;
    },
    staleTime: 1000 * 60 * 10,
  });

  await Promise.all([pokemonPromise, speciesPromise]);
}
